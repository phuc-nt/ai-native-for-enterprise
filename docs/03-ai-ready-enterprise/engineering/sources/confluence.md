# Source: Confluence

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 2.*

## 1. Khó ở đâu

- Phi cấu trúc: body là XHTML "storage format" đầy macro (Jira, status, expand,
  table), không phải văn bản sạch.
- Mỗi trang nhiều version; trang mới nhất không có nghĩa là trang được duyệt.
- Cây trang lộn xộn: bản nháp, bản copy, trang cũ không chủ. Cùng chủ đề có
  ba trang nói ba kiểu.
- Đa ngôn ngữ: spec JA của khách, bản dịch VI, báo cáo EN; bản nào là gốc?
- Bảng trong trang chứa dữ liệu có cấu trúc thật (decision log, kết quả test,
  danh sách API) mà tìm kiếm toàn văn làm mất.

## 2. Lớp 1 — nguyên bản

| Việc | Cách làm |
|---|---|
| Lấy gì | Body storage format + metadata (space, title, version, author, ancestors, labels) mỗi `(page_id, version)`; danh sách attachment (metadata, không tải file trừ khi thuộc [tài liệu Nhật](japanese-spec-documents.md)) |
| Phân vùng | Theo space, mỗi ngày CQL `lastmodified >= -1d`; lần đầu backfill theo cây |
| Ledger | `(confluence, page_id, version)` sau khi parse xong sections; version cũ không lấy lại |
| Idempotent | `(page_id, version)` là khóa; trang bị xóa ghi tombstone, không xóa dòng |
| Giới hạn | Token; trang rất dài (>1 MB) parse riêng; space của khách chỉ đọc |

## 3. Lớp 2 — bảng có kiểu

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `pages` | `id`, `space_key`, `title`, `version`, `created`, `last_updated`, `author_accountId`, `parent_id`, `labels`, `url`, `lang` | `lang` suy ra từ label/space, ghi cách suy |
| `page_sections` | `page_id`, `version`, `section_path` (heading gốc, không dịch), `order`, `text_md`, `hash` | XHTML → Markdown bằng bộ chuyển **tất định**; macro giữ marker `[jira:KEY]`, `[status:GREEN]`, `[expand]` |
| `page_tables` | `page_id`, `version`, `table_index`, `row`, `col`, `header`, `cell_text` | Bảng trong trang là dữ liệu, không phải văn |
| `page_links` | `from_page_id`, `to_kind` (page / jira / url), `to_id` | Đổ vào `xref` |
| `attachments` | `page_id`, `filename`, `media_type`, `size`, `version`, `sha256` | Excel/Word đi sang nguồn tài liệu Nhật |
| `topic_index` | `topic`, `page_id`, `section_path`, `role` (authoritative / draft / obsolete / translation_of), `owner`, `reviewed_at` | **Bảng do người soạn**, versioned trong git; là trái tim của AI-ready cho Confluence |

Bẫy:

| Điểm | Bẫy | Quy ước |
|---|---|---|
| Heading | Dịch heading để "dễ đọc" → mất khớp với trang | `section_path` giữ nguyên văn; slug là cột thêm |
| Macro status | `GREEN` trong macro là trạng thái lúc viết, không phải hiện tại | Marker giữ, brief nhắc "trạng thái tại version N" |
| Trang dịch | Bản VI được xem là spec | `role = translation_of` trỏ về trang JA; JA thắng khi khác |
| Version | Lấy body mới nhất rồi đè | Mỗi version một dòng; diff giữa version là dẫn xuất |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Độ tươi trang authoritative | Ngày kể từ `last_updated` của trang `role = authoritative` | `MEASURED` |
| Trang authoritative "cũ" | Quá 90 ngày với spec đang triển khai | `CONVENTION` |
| Story thiếu spec | Issue loại story trong sprint không có `xref` tới trang authoritative | `MEASURED` |
| Quyết định chưa có ticket | Dòng trong `page_tables` của trang decision log không có issue key | `MEASURED` |
| Diff giữa hai version | So `page_sections.hash` theo `section_path` | `MEASURED` |

## 5. Lớp 4 — bộ tri thức

Data map:

| Câu hỏi | Bảng | Cách trả lời |
|---|---|---|
| Spec của tính năng X ở đâu | `topic_index` | Trả `page_id`, `section_path`, `role`, version; **không** tìm toàn văn trước |
| Nội dung mục Y của trang Z | `page_sections` qua tool `page --id --section` | Trích nguyên văn kèm version, as-of |
| Quyết định về Y là gì, khi nào | `page_tables` trang decision log | Dẫn dòng bảng |
| Trang này đổi gì so với bản khách đã xem | Diff version | Liệt kê section đổi |

Guardrail (Confluence **không** nói được gì):

- Trang tồn tại ≠ khách đồng ý; version mới nhất ≠ đã duyệt. Trạng thái duyệt
  nằm ở `topic_index.role` hoặc ở biên bản họp, không ở bản thân trang.
- Meeting note không phải quyết định trừ khi nằm trong bảng decision.
- Khi hai trang mâu thuẫn: authoritative thắng draft; cùng role thì version mới
  hơn, và **nói rõ có mâu thuẫn**.
- Tìm toàn văn chỉ là fallback; mọi trích dẫn phải có `page_id` + version.

Playbook: câu hỏi không có trong `topic_index` → agent trả lời "chưa được lập
chỉ mục", đề nghị chủ nghiệp vụ thêm một dòng; không đoán từ tìm kiếm.

## 6. Lệnh và tool

```text
confluence: {
  status: ok | token_expired,
  data_age_hours,
  pages_changed_since_last_sync: n,
  stale_authoritative_pages: [ { page_id, title, days } ],
  stories_without_spec: n
}
```

Tool đọc hẹp: `page --id <id> [--section <path>] [--version <n>]` trả JSON
`{page_id, version, section_path, text_md, as_of}`.

| Chế độ | Dùng gì |
|---|---|
| Tương tác | MCP Confluence: `searchPages`, `createPage`, `updatePage` (CONFLICT → version + 1); skill `sprint-report-to-confluence-slack`, `meeting-notes-to-actions` |
| Nền | Connector đổ lớp 1; agent đọc `topic_index` và `page`; **ghi** chỉ với mẫu cố định (trang báo cáo sinh tự động) vào space nội bộ, không vào space của khách |

## 7. Nghiệm thu

- AI-friendly: xóa `page_sections`/`page_tables`, dựng lại offline; 20 trang
  ngẫu nhiên có Markdown đọc được và bảng còn nguyên hàng cột.
- AI-ready: BrSE nêu 10 tính năng, agent trả đúng trang authoritative cho ≥ 8
  trong dưới một phút mỗi câu, có `page_id` + version; với 2 câu ngoài chỉ mục,
  agent nói "chưa lập chỉ mục" thay vì đoán.

## 8. Bẫy

- Nhồi cả space vào vector DB rồi RAG: trích được đoạn, không biết đoạn nào
  còn hiệu lực. `topic_index` nhỏ và có chủ thắng index lớn không chủ.
- Bỏ qua version: agent dẫn nội dung khách chưa từng thấy.
- Coi attachment Excel là "văn bản đính kèm"; nó là nguồn riêng.
- Để agent nền tạo/sửa trang trong space của khách.
