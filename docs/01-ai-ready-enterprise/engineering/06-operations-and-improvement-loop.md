# 06 — Operations and the Improvement Loop

Agent lên production không phải điểm kết thúc; đó là lúc mới có dữ liệu để cải
tiến. Nguyên tắc: **transcript là bằng chứng, sửa ở nguồn, production chứng
minh**.

![Vòng cải tiến agent từ transcript](../diagrams/enterprise-ai-improvement-loop.workflow.svg)

[Bản tương tác](../diagrams/enterprise-ai-improvement-loop.workflow.html)

| Bước | Ai | Làm gì | Đầu ra |
|---|---|---|---|
| Phiên chạy thật | Harness | Cron hoặc chat, mỗi phiên cách ly | Transcript (tool call + kết quả + lời đáp) |
| Rà soát | Người bảo trì | Truy vấn transcript kể từ lần trước; đọc tool call, không đọc lời kể | Danh sách sai lệch |
| Phân loại | Người bảo trì | Mỗi sai lệch rơi vào đúng **một** trong ba: dữ liệu, chỉ dẫn, tool | Nguyên nhân + chỗ sửa |
| Sửa tại nguồn | Người bảo trì + Claude Code | Sửa brief / schema / công thức / tool trong git, commit | Commit |
| Nạp lại chỉ mục | Người bảo trì | `memory index --force` cho harness | Agent thấy bản mới |
| Xác minh | Production | Phiên chạy thật kế tiếp (cron sáng hôm sau, hoặc lượt chat thật) | Đóng hoặc mở lại |
| Ghi nhận, bỏ qua | Người bảo trì | Trượt suy luận đơn lẻ không thành luật; ghi lại để thấy nếu lặp | Ghi chú |

## Rà soát transcript: làm thế nào

Harness lưu transcript trong SQLite (bảng `transcript_events` hoặc tương
đương). Quy trình đã dùng:

1. Truy vấn mọi phiên kể từ mốc lần trước; lọc tool call và kết quả.
2. Với mỗi phiên hỏi ba câu: agent có **đọc brief trước** không; có **gọi
   đúng lệnh** với đúng cú pháp không; kết luận có **khớp dữ liệu** lệnh trả về
   không.
3. Ghi sai lệch kèm trích dẫn transcript (không kèm nội dung nhạy cảm khi đưa
   vào tài liệu).
4. Phân loại → sửa → reindex → chờ phiên thật.

Nhịp: sau mỗi thay đổi lớn rà soát ngay; ổn định thì hằng tuần. Việc này hợp
với `/mk:retro` và report trong `reports/` — cùng thói quen, khác đối tượng:
retro cho con người, rà soát transcript cho agent.

## Phân loại sai lệch

| Loại | Dấu hiệu | Sửa ở |
|---|---|---|
| **Dữ liệu** | Số đúng nhưng ý nghĩa sai; cột thiếu tài liệu; sentinel bị đọc thành giá trị | Schema doc, công thức, nhãn nguồn gốc |
| **Chỉ dẫn** | Agent gọi đúng tool nhưng kết luận vượt dữ liệu; quên as-of; nhầm cảm nhận với sự kiện | Brief (guardrail, playbook, rule) |
| **Tool** | Gọi sai cú pháp, quoting hỏng, đường dẫn tương đối, thiếu trạng thái degraded | CLI/script, file chỉ dẫn harness |
| **Không sửa** | Một lần diễn đạt vụng, không lặp | Ghi nhận |

Kỷ luật: **một sai lệch, một nguyên nhân, một chỗ sửa**. Nếu thấy phải sửa cả
ba chỗ, thường là chưa tìm đúng nguyên nhân.

## Sự cố đã gặp và bài học

Bảy sự cố kỹ thuật trong khoảng một tháng vận hành hệ thống ví dụ. Không sự cố
nào sửa bằng cách đổi model.

| Sự cố (ẩn danh) | Loại | Bài học → mẫu |
|---|---|---|
| Script ghi nhiều tham số; shell tách sai khi có dấu cách và ký tự đặc biệt | Tool | Mọi tool ghi nhận một tham số bọc nháy đơn (P11) |
| Harness nâng cấp thêm media guard; đính kèm ngoài workspace bị chặn | Tool | Marker + symlink có kiểm soát; không tắt guard (P12) |
| Agent hình thành thói quen `cd … && …` với đường dẫn tương đối, tiếp diễn đến khi phiên mới | Tool + chỉ dẫn | Tool chạy bằng đường dẫn tuyệt đối; ghi vào file chỉ dẫn; thói quen sống hết phiên |
| Cảm nhận của người dùng bị ghi thành sự kiện | Chỉ dẫn | Quy tắc "sự kiện là ngữ cảnh, không phải cảm giác" viết vào brief (P5) |
| Nguồn không lấy được nhưng cron vẫn phải gửi brief | Tool | Degraded ≠ failed; as-of luôn có (P9) |
| Sửa file chỉ dẫn xong agent vẫn thấy bản cũ | Vận hành | Reindex là bước bắt buộc, ghi vào quy trình (P14) |
| Tài liệu bảo trì bắt đầu chứa định danh kênh | Quản trị | Che định danh trong mọi output; rule cho phiên bảo trì |

Điểm chung: hầu hết sự cố được sửa bằng **một dòng trong brief hoặc một ràng
buộc trong tool**.

## Cron: hai job đủ cho một agent

| Job | Giờ | Phiên | Làm gì |
|---|---|---|---|
| Đồng bộ đêm | Sau nửa đêm | Cách ly | `sync` lấy dữ liệu mới, tính lại lớp dẫn xuất; degraded thì ghi nhận, không làm phiền |
| Brief sáng | Đầu ngày | Cách ly | Đọc brief → `sync --json` → truy vấn mẫu → gửi tóm tắt kèm as-of và ngữ cảnh mở |

Bản cho dự án: "đồng bộ Jira/Slack đêm" và "báo cáo đầu ngày cho PM/BrSE" —
cùng khung, và trùng đúng phần việc mà workflow skill `daily-standup-report`
đang làm ở chế độ tương tác.

## Chỉ số vận hành nên theo dõi

| Chỉ số | Nguồn | Vì sao |
|---|---|---|
| Tỷ lệ phiên đọc brief trước khi gọi tool | Transcript | Phát hiện agent "đi tắt" |
| Tỷ lệ tool call lỗi cú pháp | Transcript | Phát hiện tool khó dùng |
| Số lượt trả lời không có as-of | Transcript | Guardrail bị bỏ |
| `data_age_hours` trung bình khi trả lời | JSON của sync | Connector có ổn không |
| Số sự kiện ngữ cảnh mở quá 30 ngày | Bảng ngữ cảnh | Ngữ cảnh mốc, cần đóng |
| Số sai lệch mỗi tuần theo loại | Sổ rà soát | Xu hướng chất lượng |
