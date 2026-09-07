# Source: Japanese Documents (仕様書, 設計書) — Excel, Word, PDF

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 3.
Nguồn đặc thù nhất của dự án offshore JP.*

## 1. Khó ở đâu

- Spec là Excel: mỗi sheet một màn hình/chức năng, ô gộp, vị trí ô mang nghĩa
  (cột "備考" ở J, "項番" ở B), shape/textbox chứa chữ, hình chụp màn hình.
- Version theo tên file (`…_v1.2_最終_修正2.xlsx`) và sheet 変更履歴; không có
  hệ thống version thật.
- Thuật ngữ: một khái niệm ba cách gọi (JA/EN/VI); bản dịch VI thường được
  đọc thay bản gốc.
- 半角/全角, Shift-JIS legacy, ngày kiểu 令和.
- Đây là **dữ liệu của khách**: ràng buộc lưu trữ và mô hình được nhìn gì
  quyết định trước.

## 2. Lớp 1 — nguyên bản

| Việc | Cách làm |
|---|---|
| Lấy gì | File nguyên bản (bytes) + `sha256` + metadata nhận: từ đâu (Slack ts / Confluence attachment / email), ai gửi, ngày nhận |
| Phân vùng | `(doc_id, version_hash)`; `doc_id` do team đặt một lần cho một "dòng tài liệu" (ví dụ spec màn hình đăng nhập), version là hash |
| Ledger | `(doc, doc_id, version_hash)` sau khi trích xong cells và items |
| Idempotent | Hash trùng = bỏ qua; đổi tên file không tạo version mới |
| Giới hạn | Không đưa file gốc lên bất kỳ dịch vụ ngoài; OCR/LLM chạy trong ranh giới đã duyệt; thư mục gốc ngoài git |

## 3. Lớp 2 — bảng có kiểu

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `documents` | `doc_id`, `title`, `doc_type` (基本設計 / 詳細設計 / テスト仕様 / 質問票 / WBS), `version_label`, `version_hash`, `received_at`, `received_from`, `source_ref`, `lang` | `version_label` là chuỗi trên tên file/sheet, chỉ để hiển thị |
| `doc_sheets` | `doc_id`, `version_hash`, `sheet_name`, `order`, `kind` (spec / 変更履歴 / 目次 / other) | Tên sheet giữ nguyên JA |
| `doc_cells` | `doc_id`, `version_hash`, `sheet_name`, `row`, `col`, `value`, `merged_range`, `is_shape` | Bản sao **trung thực**; textbox/shape là dòng riêng |
| `doc_items` | `doc_id`, `version_hash`, `sheet_name`, `item_id` (項番 gốc), `field_name` (tên cột gốc JA), `value`, `cell_ref` | Một "mục" của spec = một dòng với đủ cột; `cell_ref` là bằng chứng |
| `doc_changes` | `doc_id`, `version_hash`, `change_no`, `date`, `author`, `description`, `affected_items` | Từ sheet 変更履歴 + diff cells |
| `doc_terms` | `term_ja`, `reading`, `term_en`, `term_vi`, `definition`, `source_doc`, `label` | Glossary; `label` = `LITERATURE` nếu từ tài liệu khách, `CONVENTION` nếu team tự dịch |
| `doc_ocr` | `doc_id`, `version_hash`, `sheet_name`, `image_ref`, `text`, `engine`, `confidence` | Chữ trong ảnh; luôn tách bảng, luôn có nhãn OCR |
| `qa_items` | `qa_id`, `doc_id`, `item_id`, `question`, `asked_at`, `asked_by`, `answer`, `answered_at`, `answer_source`, `state` | Append-only; 質問票 dạng bảng |

Bẫy:

| Điểm | Bẫy | Quy ước |
|---|---|---|
| Excel → CSV | Mất ô gộp và vị trí → mất nghĩa | Luôn qua `doc_cells` có `merged_range` |
| Dịch trước | Bản VI thành nguồn | `doc_items.value` giữ JA; dịch nằm ở bảng dẫn xuất có nhãn |
| Tên file | Coi `v1.2` là bản mới nhất | Sắp theo `received_at` + `doc_changes`; hash là định danh |
| 未定 / 要確認 / TBD | Đọc là giá trị | Sentinel; đếm thành "mục mở" |
| Ngày 令和 | Parse hỏng lặng lẽ | Chuẩn hóa ISO ở cột thêm, giữ chuỗi gốc |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Độ phủ yêu cầu | % `doc_items` (loại yêu cầu/chức năng) có `xref` tới issue Jira và tới test case | `MEASURED` |
| Mục mở | Số item có sentinel 未定/要確認/TBD theo version | `MEASURED` |
| Churn theo version | Số item đổi giữa hai version liên tiếp / tổng | `MEASURED` |
| Câu hỏi khách chưa trả lời | `qa_items.state = open` theo tuổi | `MEASURED`; đỏ > 5 ngày làm việc là `CONVENTION` |
| Bản dịch VI/EN của item | Sinh từ `doc_items` | Dẫn xuất, gắn `translated_from` + engine; **không thay** JA |

## 5. Lớp 4 — bộ tri thức

Data map:

| Câu hỏi | Bảng | Cách trả lời |
|---|---|---|
| Mục 3.2.1 của spec X nói gì | `doc_items` theo `doc_id` + `item_id` | Nguyên văn JA + dịch có nhãn + `sheet!cell` + version |
| v1.1 → v1.2 đổi gì | `doc_changes` + diff `doc_cells` | Liệt kê item, dẫn 変更履歴 nếu có; nêu item đổi mà 変更履歴 không ghi |
| Yêu cầu nào chưa có ticket/test | `coverage` view | Danh sách item_id |
| Thuật ngữ Y nghĩa là gì | `doc_terms` | Định nghĩa + nguồn + nhãn |
| Khách đã trả lời câu hỏi Z chưa | `qa_items` | Trạng thái, nguồn trả lời |

Guardrail (tài liệu **không** nói được gì):

- File mới nhất ≠ đã được khách duyệt; bằng chứng duyệt nằm ở biên bản hoặc
  thư của khách, ghi vào `documents.approved_ref` bởi người.
- Text OCR không phải nguyên văn; luôn kèm nhãn và `confidence`.
- Khi JA và bản dịch khác nhau, JA thắng; agent nói rõ khi thấy khác.
- Mục 未定 phải được liệt kê, không được điền giả định.
- Không suy ra hành vi hệ thống từ hình chụp màn hình nếu spec chữ không nói.

Playbook: gặp điều spec không nói → agent tạo nháp câu hỏi (`log-qa`), BrSE
biên tập và gửi khách qua kênh chính thức; câu trả lời ghi lại có
`answer_source`. Không có vòng "agent tự hỏi khách".

## 6. Lệnh và tool

```text
docs_jp: {
  status: ok,
  docs_received_since_last_sync: n,
  open_items_total: n,
  open_qa_items: [ { qa_id, doc_id, item_id, age_days } ],
  uncovered_requirements: n
}
```

Tool đọc hẹp: `doc --id <doc_id> --item <item_id> [--version <hash>]`,
`doc-diff --id <doc_id> --from <hash> --to <hash>`.
Tool ghi một tham số: `log-qa 'doc=…; item=…; question=…'`,
`answer-qa 'qa=…; answer=…; source=…'`.

| Chế độ | Dùng gì |
|---|---|
| Tương tác | Pipeline trích xuất (openpyxl cho cells; OCR bằng vision LLM theo cách của scan-to-ebook, chạy trong ranh giới đã duyệt); BrSE rà `doc_items` sau mỗi version |
| Nền | Agent đọc `doc`, `doc-diff`, `coverage`; ghi `log-qa` nháp |

## 7. Nghiệm thu

- AI-friendly: xóa `doc_items`, dựng lại từ `doc_cells` offline; BrSE chọn 10
  item ngẫu nhiên, `cell_ref` trỏ đúng ô; diff hai version khớp 変更履歴 (và
  liệt kê được chỗ 変更履歴 bỏ sót).
- AI-ready: BrSE hỏi 10 câu về spec đang làm; agent đúng ≥ 8 với trích dẫn
  `sheet!cell`; hai câu về mục 未定 được trả lời "chưa quyết định, câu hỏi
  Q-xx đang mở".

## 8. Bẫy

- Chuyển Excel sang CSV/Markdown rồi vứt file gốc.
- Dịch cả spec sang VI làm "nguồn" cho team và agent.
- Đưa file khách vào vector DB hay dịch vụ hosted chưa được duyệt.
- Coi tên file là version.
- Agent tự trả lời thay khách cho mục 未定.
