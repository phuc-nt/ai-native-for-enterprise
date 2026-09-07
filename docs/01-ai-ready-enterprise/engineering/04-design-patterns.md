# 04 — Design Patterns

Mười lăm mẫu đã dùng thật trong hệ thống ví dụ, cộng một mẫu (P16) rút từ
việc nối nhiều nguồn của dự án offshore, xếp theo trụ cột. Mỗi mẫu: vấn đề →
cách làm → anti-pattern.

## Trụ cột 2 — Dữ liệu

### P1. Raw-first ingest

- **Vấn đề:** nguồn khó lấy lại; parse hỏng làm mất dữ liệu.
- **Cách làm:** ghi payload nguyên bản trước, parse sau; parse là hàm thuần
  chạy offline; có lệnh `reparse` cho toàn bộ kho.
- **Minh họa:** đổi schema ba lần, không lần nào phải gọi lại API.
- **Anti-pattern:** ETL ghi thẳng vào bảng đích.

### P2. Ledger đánh dấu sau khi thành công

- **Vấn đề:** lần chạy sau không biết ngày nào đã xong, ngày nào hỏng dở.
- **Cách làm:** bảng ledger `(nguồn, ngày, trạng thái)`; đánh dấu *sau* khi
  parse thành công; connector bỏ qua ngày đã đánh dấu.
- **Anti-pattern:** đánh dấu ngay khi tải xong; hoặc dùng "ngày mới nhất trong
  bảng" làm điểm resume.

### P3. Dẫn xuất tiến về trước (forward-only recurrence)

- **Vấn đề:** chỉ số kiểu trung bình trượt / baseline bị tính lại toàn bộ mỗi
  ngày, chậm và đổi giá trị quá khứ.
- **Cách làm:** giá trị ngày N tính từ ngày N-1 và dữ liệu ngày N; lưu lại;
  quá khứ bất biến trừ khi reparse có chủ đích.
- **Anti-pattern:** tính lại cả lịch sử trong mỗi lượt hỏi.

### P4. Nhãn nguồn gốc MEASURED / LITERATURE / CONVENTION

- **Vấn đề:** ngưỡng trong prompt không ai dám đổi, không ai biết từ đâu.
- **Cách làm:** mọi ngưỡng, công thức, quy tắc mang một trong ba nhãn; nhãn
  nằm ngay cạnh con số trong tài liệu công thức và trong brief.
- **Anti-pattern:** "kinh nghiệm cho thấy…" không nguồn.

### P5. Ngữ cảnh người dùng nói ra là dữ liệu chính

- **Vấn đề:** ngữ cảnh chỉ sống trong phiên chat; harness tóm tắt sai.
- **Cách làm:** bảng ghi chú và bảng sự kiện (ví dụ `self_reports` /
  `athlete_events`; dự án: `project_notes` / `project_events`); ghi qua tool;
  sync trả về sự kiện đang mở; brief bảo "query, don't remember".
- **Quy tắc kèm:** *một sự kiện là ngữ cảnh, không phải cảm giác*.
- **Anti-pattern:** để agent "nhớ" bằng bộ nhớ phiên.

### P6. Append-only cho dữ liệu ngữ cảnh

- **Vấn đề:** sửa/xóa làm mất dấu vết và làm lớp dẫn xuất đổi ngược quá khứ.
- **Cách làm:** chỉ thêm bản ghi hoặc đóng bản ghi cũ; sai thì ghi bổ sung.
- **Anti-pattern:** `UPDATE` để "sửa lại cho đúng".

### P7. Giữ định danh gốc của nguồn

- **Vấn đề:** dịch tên cột làm mất đối chiếu; grep không ra.
- **Cách làm:** tên bảng, cột, trường JSON, log giữ tiếng Anh đúng như nguồn;
  hội thoại với người dùng tiếng Việt (hoặc JP). Ghi thành rule để agent không
  "dịch giúp".
- **Anti-pattern:** cột `so_ngay_tre`.

### P16. Khóa nối chéo nguồn (`xref`)

- **Vấn đề:** câu hỏi có giá trị nhất xuyên nguồn ("ticket này khách hỏi gì,
  spec ở đâu, PR merge chưa"); mỗi nguồn giữ định danh riêng, agent tự ghép
  bằng tìm kiếm và ghép sai.
- **Cách làm:** một bảng `xref(src_type, src_id, ref_type, ref_id, how,
  confidence)` dựng lại được từ lớp 2 của từng nguồn; issue key Jira là trục;
  `how` phân biệt link tường minh với regex; brief bảo agent nói "có nhắc tới"
  khi chỉ có regex. Chi tiết ở [09](09-data-source-playbook.md).
- **Anti-pattern:** agent tìm toàn văn qua ba hệ thống mỗi lượt để tự ghép.

## Trụ cột 3 — Giao diện

### P8. Một lệnh trả JSON kèm ngữ cảnh

- **Vấn đề:** agent phải chuỗi nhiều lệnh, quên bước, không biết dữ liệu cũ.
- **Cách làm:** `sync --json` = ingest + tính lại + trạng thái + as-of + ngữ
  cảnh mở (xem [03](03-agent-interfaces.md)).
- **Anti-pattern:** REST đầy đủ CRUD cho agent tự ghép.

### P9. Degraded không phải failed

- **Vấn đề:** token hết hạn làm agent "không trả lời được".
- **Cách làm:** `ok: true, status: token_expired`; agent trả lời từ kho với
  as-of, nhắc người dùng đúng một lần; `ok: false` chỉ khi kho hỏng.
- **Minh họa:** cron sáng vẫn gửi brief khi nguồn không lấy được, ghi rõ
  "dữ liệu tới ngày X".
- **Anti-pattern:** exception → im lặng.

### P10. Probe chỉ đọc

- **Vấn đề:** để biết "có dữ liệu mới không" phải chạy cả ingest.
- **Cách làm:** `--status` không side effect; dùng cho cron kiểm tra, health
  check, và agent khi chỉ cần biết trạng thái.
- **Anti-pattern:** một lệnh làm tất cả, kể cả khi chỉ muốn nhìn.

### P11. Tool ghi một tham số, ngữ pháp chặt

- **Vấn đề:** shell tách tham số ở dấu cách/ký tự đặc biệt; agent viết sai
  quoting. Sự cố thật đã xảy ra với một script nhiều tham số.
- **Cách làm:** mọi script ghi nhận đúng một chuỗi bọc nháy đơn, parse bên
  trong bằng ngữ pháp `key=value; key=value`; trả JSON.
- **Anti-pattern:** `log-event --kind X --start Y --summary "..."`.

### P12. Đính kèm qua marker, không qua đường dẫn tự do

- **Vấn đề:** agent gửi file từ đường dẫn bất kỳ = rủi ro rò rỉ; media guard
  của harness chặn.
- **Cách làm:** lệnh tạo biểu đồ ghi vào thư mục harness cho phép, in
  `MEDIA: <path>`; harness đính kèm.
- **Anti-pattern:** tắt media guard "cho tiện".

## Trụ cột 1 — Harness

### P13. Hai mặt tiền mỏng, một bộ não

- **Vấn đề:** mỗi harness một bản chỉ dẫn, trôi dạt.
- **Cách làm:** brief trong repo dự án là nguồn sự thật; `AGENTS.md` của
  OpenClaw và `SKILL.md` của Claude Code chỉ trỏ tới brief và mô tả cách gọi
  tool trên máy đó.
- **Anti-pattern:** copy brief vào prompt của từng harness.

### P14. Chỉ dẫn trong git, đọc lại mỗi phiên

- **Vấn đề:** "nhắc trong chat" chỉ sống hết phiên; nhắc nhiều lần vẫn quên.
- **Cách làm:** sửa brief → commit → `memory index --force` → phiên kế tiếp có
  hiệu lực. Không có cơ chế "dạy trong chat".
- **Anti-pattern:** tin rằng agent sẽ nhớ.

### P15. Phiên cách ly cho cron, transcript làm bằng chứng

- **Vấn đề:** cron dùng chung ngữ cảnh chat → kết quả phụ thuộc câu chuyện dở
  dang; không biết agent đã làm gì.
- **Cách làm:** mỗi job một phiên; harness ghi transcript vào SQLite; người
  bảo trì truy vấn định kỳ (xem [06](06-operations-and-improvement-loop.md)).
- **Anti-pattern:** log riêng do agent tự "báo cáo".

## Bảng tra nhanh

| Mẫu | Trụ cột | Mức khó | Giá trị |
|---|---|---|---|
| P1 Raw-first | Dữ liệu | Thấp | Rất cao |
| P2 Ledger sau thành công | Dữ liệu | Thấp | Cao |
| P3 Forward-only | Dữ liệu | Trung bình | Trung bình |
| P4 Nhãn nguồn gốc | Dữ liệu | Thấp | Cao |
| P5 Ngữ cảnh là dữ liệu | Dữ liệu | Trung bình | Rất cao |
| P6 Append-only | Dữ liệu | Thấp | Cao |
| P7 Định danh gốc | Dữ liệu | Thấp | Cao |
| P16 Khóa nối chéo nguồn | Dữ liệu | Trung bình | Rất cao |
| P8 Một lệnh kèm ngữ cảnh | Giao diện | Trung bình | Rất cao |
| P9 Degraded ≠ failed | Giao diện | Thấp | Cao |
| P10 Probe chỉ đọc | Giao diện | Thấp | Trung bình |
| P11 Ghi một tham số | Giao diện | Thấp | Cao |
| P12 Marker media | Giao diện | Thấp | Trung bình |
| P13 Hai mặt tiền một não | Harness | Thấp | Rất cao |
| P14 Chỉ dẫn trong git | Harness | Thấp | Rất cao |
| P15 Cron cách ly + transcript | Harness | Thấp | Cao |

Bắt đầu pilot với P1, P4, P5, P8, P9, P13, P14 — đủ để có một agent tin được.
Thêm P16 ngay khi nguồn thứ hai vào.
