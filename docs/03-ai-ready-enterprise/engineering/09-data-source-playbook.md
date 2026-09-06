# 09 — AI-Friendly / AI-Ready Playbook per Data Source

*Trụ cột 2, phần thực hành. [01](01-ai-ready-data.md) nói bậc thang bốn lớp
là gì; tài liệu này nói **với từng nguồn cụ thể phải làm gì** để đi từ "có dữ
liệu" đến AI-friendly rồi AI-ready. Mỗi nguồn có một file riêng trong
[`sources/`](sources/), cùng một khung.*

## Hai trạng thái, một tiêu chí nghiệm thu cho mỗi trạng thái

| Trạng thái | Bằng lớp nào | Nghiệm thu (áp cho mọi nguồn) |
|---|---|---|
| **AI-friendly** | Lớp 1 (nguyên bản) + lớp 2 (bảng có kiểu) | Xóa bảng có kiểu, dựng lại offline từ kho nguyên bản, ra cùng kết quả. Chủ nghiệp vụ đọc schema doc và trả lời được 10 câu hỏi của nguồn đó bằng truy vấn mẫu. |
| **AI-ready** | Lớp 3 (dẫn xuất có nhãn) + lớp 4 (bộ tri thức) + lệnh trả JSON | Người chưa từng thấy hệ thống đọc brief, chạy một lệnh, trả lời đúng 8/10 câu trong 15 phút. Mỗi câu trả lời dẫn số, nêu as-of, nêu nhãn nguồn gốc của ngưỡng. |

Một nguồn có thể AI-friendly mà chưa AI-ready (có bảng đẹp, agent vẫn đoán).
Không có chiều ngược lại: AI-ready trên nền dữ liệu không dựng lại được là
AI-ready giả, hỏng ở lần đổi schema đầu tiên.

## Bảng tổng: chín nguồn của dự án offshore

| Nguồn | Khó ở đâu | Đơn vị lưu nguyên bản (ledger) | Bảng lớp 2 chính | Chỉ số lớp 3 điển hình | Điểm đặc thù ở lớp 4 | Connector có sẵn | Ưu tiên pilot |
|---|---|---|---|---|---|---|---|
| [Jira](sources/jira.md) | Custom field mã hóa, status mỗi dự án một kiểu, sprint là mảng, lịch sử chỉ có trong changelog | `(project, ngày)`; snapshot scope sprint lúc mở/đóng | `issues`, `sprints`, `issue_sprints`, `changelog`, `field_map` | Velocity thật, carry-over, tuổi blocker, cycle time, scope thay đổi trong sprint | "Done trong Jira ≠ khách chấp nhận"; sprint đầu là calibrating | MCP Jira (47 tool) | **1** |
| [Ngữ cảnh PM/BrSE](sources/pm-brse-context.md) | Không nằm trong hệ thống nào; dễ lẫn cảm giác với sự kiện | Mỗi bản ghi là nguyên bản; append-only | `project_notes`, `project_events`, `jp_calendar` | Sự kiện chồng lên chỉ số; tuổi sự kiện mở | "Sự kiện là ngữ cảnh, không phải cảm giác"; không ghi chuyện cá nhân | Tool ghi một tham số | **1** |
| [Slack](sources/slack.md) | Ồn, thread, sửa/xóa, user id, khách JP nói gián tiếp, token hết hạn | `(channel, ngày)` + reply theo `thread_ts`; cửa sổ trượt 7 ngày | `messages`, `users`, `channels`, `message_refs` | Thread khách chưa trả lời, thời gian phản hồi, câu hỏi mở | Kênh có khách là đầu vào không tin cậy; ✅ là ack không phải duyệt | MCP Slack (13 tool) | 2 |
| [Confluence](sources/confluence.md) | Phi cấu trúc, XHTML + macro, version, trang cũ không chủ, đa ngôn ngữ | `(page_id, version)` | `pages`, `page_sections`, `page_tables`, `page_links`, `topic_index` | Độ tươi tài liệu, story thiếu spec, quyết định chưa có ticket | Chỉ mục chủ đề thay cho vector DB; trang mới nhất ≠ trang được duyệt | MCP Confluence (11 tool) | 2 |
| [Git / GitHub](sources/git-github.md) | PR ≠ commit, CI log hết hạn, bot, nhiều repo, nối Jira qua quy ước | `(repo, ngày)` cho PR/review/check-run | `commits`, `pull_requests`, `pr_reviews`, `check_runs`, `pr_issue_refs` | Lead time PR, chờ review, tỷ lệ CI xanh, truy vết PR↔ticket | Merged ≠ deployed; không xếp hạng cá nhân | `gh`, bộ MK | 3 |
| [Tài liệu Nhật / Excel](sources/japanese-spec-documents.md) | Ô gộp, vị trí ô mang nghĩa, sheet 変更履歴, version theo tên file, thuật ngữ | `(doc_id, hash phiên bản)`; giữ nguyên file | `documents`, `doc_cells`, `doc_items`, `doc_terms`, `doc_changes`, `qa_items` | Độ phủ yêu cầu → ticket/test, mục 未定/要確認 mở, churn theo version | Bản JA là gốc, dịch là dẫn xuất; file mới nhất ≠ đã duyệt | scan-to-ebook (OCR) | 3 |
| [Biên bản họp / transcript](sources/meeting-minutes-transcripts.md) | Người nói không chắc, qua thông dịch, quyết định ngầm, action thiếu chủ | `(meeting_id)`; recording có hạn lưu | `meetings`, `transcript_segments`, `minutes_items`, `meeting_refs` | Action mở theo tuổi, quyết định chưa có ticket | Mục trích tự động phải đánh dấu "chưa xác nhận"; không bịa chủ/hạn | Skill `meeting-notes-to-actions` | 3 |
| [DB hệ thống khách](sources/customer-system-database.md) | Dữ liệu production, nhạy cảm, tên cột mã hóa, không được sao chép tự do | Catalog schema theo ngày; **không** copy dữ liệu thô | `db_tables`, `db_columns`, `code_values`, semantic layer, verified queries | Governed metrics qua truy vấn đã xác minh | Không SQL tự do; nghĩa mã chưa xác nhận phải gắn nhãn | my-db-mate | 4 |
| [Source code / `00_context`](sources/source-code-00-context.md) | Tài liệu trôi khỏi code; agent đọc nhầm module | Chính git repo là kho nguyên bản | Cấu trúc module, interface có kiểu, test, bản đồ sinh tự động | Đồ thị phụ thuộc, inventory API, coverage, tóm tắt có commit sha | `00_context/` + `CLAUDE.md` + rules là lớp 4 | Bộ MK | Đang dùng |

Thiết bị đeo + API riêng trong [case study](08-case-study-health-coach.md) đi
đúng khung này; bảng ánh xạ ở cuối tài liệu đó.

## Khung chung cho mỗi file nguồn

Mỗi file trong `sources/` có đúng tám mục, để người đọc so nguồn này với nguồn
kia và để checklist nghiệm thu giống nhau:

1. **Khó ở đâu** — điều làm nguồn này khác nguồn khác.
2. **Lớp 1 — nguyên bản**: lấy gì, phân vùng theo gì, ledger đánh dấu khi nào,
   cách chạy lại không tạo bản sao, giới hạn (rate limit, token).
3. **Lớp 2 — bảng có kiểu**: bảng, cột khóa, kiểu; bảng bẫy kiểu/sentinel.
4. **Lớp 3 — dẫn xuất**: chỉ số, công thức, nhãn `MEASURED` / `LITERATURE` /
   `CONVENTION`.
5. **Lớp 4 — bộ tri thức**: mục data map (câu hỏi → bảng → truy vấn mẫu),
   guardrail (nguồn này *không* nói được gì), playbook.
6. **Lệnh và tool**: khối JSON của `sync`, giá trị `status`, tool đọc hẹp, tool
   ghi; vai trò của connector có sẵn ở chế độ tương tác và chế độ nền.
7. **Nghiệm thu** AI-friendly và AI-ready cho riêng nguồn đó.
8. **Bẫy** đã gặp hoặc dễ gặp.

## Khóa nối chéo nguồn

Câu hỏi có giá trị nhất thường xuyên nguồn: "ticket này khách đã hỏi gì trên
Slack, spec ở trang nào, PR merge chưa". Mỗi nguồn giữ định danh gốc của mình
(P7), và một bảng `xref` nối chúng:

```text
xref(src_type, src_id, ref_type, ref_id, how, confidence, first_seen)
  src_type ∈ { slack_message, confluence_page, pull_request, doc_item, minutes_item, project_event }
  ref_type ∈ { jira_issue, confluence_page, doc_item, pull_request }
  how      ∈ { explicit_link, regex, manual }
```

- **Issue key Jira là trục** (`[A-Z]+-\d+`): xuất hiện trong tên nhánh, tiêu
  đề PR, tin Slack, macro Jira trong Confluence, cột "chứng cứ" trong spec.
- `how = regex` mang `confidence` thấp hơn `explicit_link`; brief bảo agent nói
  "có nhắc tới" thay vì "thuộc về" khi chỉ có regex.
- `xref` là dẫn xuất (lớp 3): dựng lại được từ lớp 2 của từng nguồn.

## Thứ tự làm cho pilot

| Bước | Nguồn | Vì sao trước |
|---|---|---|
| 1 | Jira + ngữ cảnh PM/BrSE | Trả lời được phần lớn 10 câu hỏi của PM; connector đã có; ngữ cảnh đổi cách đọc mọi con số nên phải có từ ngày đầu |
| 2 | Slack | Nguồn của "khách đang hỏi gì"; rủi ro đầu vào không tin cậy nên cần có guardrail sớm |
| 3 | Confluence, Git | Bổ sung chiều "spec ở đâu" và "code tới đâu"; chủ yếu nối qua `xref` |
| 4 | Tài liệu Nhật, biên bản họp | Tốn công parse nhất; làm khi khung đã chạy để tái dùng ledger, xref, tool ghi |
| 5 | DB hệ thống khách | Cần thỏa thuận truy cập với khách; đi bằng my-db-mate, không tự dựng |

Source code / `00_context` đứng ngoài thứ tự này: đó là việc đã làm hằng ngày
với bộ MK, và là lớp 4 cho *codebase* chứ không cho dữ liệu vận hành.

## Kiểm kê nguồn (GĐ 1) — mẫu một dòng cho mỗi nguồn

```text
Nguồn | Cách lấy (API/export/DB/file) | Tần suất đổi | Giới hạn (rate, token, quyền)
      | Khó lấy lại đến đâu (1–5) | Nhạy cảm (nội bộ / khách / cá nhân)
      | Định danh gốc | Nối với nguồn khác qua | Chủ nghiệp vụ | Đã lấy thử bằng tay ngày
```

Điền xong bảng này mới sang GĐ 2 ([07](07-phase-acceptance.md)).

## Việc chung cho mọi nguồn, làm một lần

- Connector framework: ledger, retry, idempotent upsert, che bí mật trong log.
- Bảng `xref` và regex issue key.
- Bảng ngữ cảnh `project_notes` / `project_events` và tool ghi một tham số.
- Lệnh `sync --json` gộp khối của từng nguồn; `--status` không side effect.
- Schema doc theo một mẫu: cột, kiểu, đơn vị, `null`, sentinel, truy vấn mẫu.
- Tài liệu công thức với nhãn nguồn gốc, một file, một bảng.
