# Effectiveness Data Collection

Cập nhật 2026-09-29. Bản nháp.

Để biết kit và buổi sharing có hiệu quả không, project team cung cấp đúng hai thứ:

1. **Survey sau buổi live sharing:** mỗi người điền một lần, khoảng 3 phút.
2. **Report định kỳ của PM:** mỗi kỳ một bảng, mỗi task một dòng.

Ngoài ra, phía khách cung cấp **usage log** theo account (mục 4). Những số máy lấy được (usage log, output trong repo, kết quả CI) thì DevOps tự lấy, không hỏi team. Số liệu chỉ dùng để cải tiến kit và training, **không dùng để đánh giá cá nhân**. Report tổng hợp không nêu tên người.

## 1. Survey sau buổi live sharing

Người dự live điền trong ngày diễn ra buổi. Người xem record điền ngay sau khi xem. Không ghi tên.

| # | Câu hỏi | Cách trả lời |
|---|---|---|
| 1 | Vai trò của bạn | Dev / Tester / BA / BrSE / PM / Khác |
| 2 | Bạn tham gia thế nào | Dự live / Xem record |
| 3 | Nội dung có rõ ràng không | 1–5 |
| 4 | Có hữu ích cho công việc của bạn không | 1–5 |
| 5 | Bạn tự tin tự dùng được phần kit dành cho role của mình không | 1–5 |
| 6 | Khi thiếu thông tin đầu vào, kit sẽ làm gì? | a. Tự đoán giá trị hợp lý · **b. Ghi câu hỏi mở để người chốt** · c. Dừng và báo lỗi |
| 7 | Cách gọi nào chắc chắn kích hoạt đúng skill? | a. "Làm giúp tôi tài liệu này" · **b. Câu có nêu rõ tên skill hoặc loại tài liệu** |
| 8 | Báo cáo review của AI ghi `Zero NG` nghĩa là gì? | a. Output đã được duyệt · **b. AI không thấy lỗi, người vẫn phải review** |
| 9 | Dự án đổi lệnh build thì ai sửa gì? | a. Báo DevOps sửa kit · **b. Người phụ trách sửa overlay của team** |
| 10 | Phần nào bạn còn chưa rõ nhất | Tổng quan kit / API spec / Sequence diagram / Test case / Unit test code / Overlay / Không có |
| 11 | Góp ý (tuỳ chọn) | Một câu |

Câu 6–9 là câu hỏi kiểm tra hiểu bài; đáp án in đậm. DevOps cập nhật danh sách ở câu 10 mỗi khi có module bổ sung.

## 2. Report định kỳ của PM

Nộp cuối mỗi kỳ, theo nhịp đã chốt trong Kit Rollout and Training Plan (tuần hoặc tháng). PM chịu trách nhiệm; người điền có thể là người phụ trách hoặc thành viên.

**Phần chung**, mỗi kỳ một lần:

| Trường | Nội dung |
|---|---|
| Kỳ, team | |
| Pha hiện tại của dự án | Ví dụ: basic design, detail design, coding, test |
| Version kit đang dùng | |
| Số thành viên đã có account Kiro | Để đối chiếu với usage log |
| Cần hỗ trợ gì | Một câu, hoặc "không" |

**Phần task.** Chỉ ghi task thuộc loại việc mà kit đã có module. Task nào thuộc loại đó cũng ghi, **kể cả task không dùng kit**.

| Trường | Nội dung |
|---|---|
| Mã task | Jira key hoặc mã WBS |
| Loại việc | API spec / Sequence diagram / Test case / Unit test code (thêm loại mới khi có module bổ sung) |
| Cỡ | Số API / số luồng / số case / số method được test |
| Cách làm | Dùng kit / Dùng AI khác / Không dùng AI |
| Lý do không dùng kit | Chọn một: Task không hợp · Thiếu input (spec, thiết kế cha) · Kit ra kết quả sai hoặc thiếu · Chưa quen, không kịp học · Tool khác nhanh hơn · Máy hoặc license lỗi · Khác (ghi rõ) |
| Giờ thực tế | Tổng giờ, gồm cả giờ review và sửa output của AI |
| Giờ ước tính nếu làm cách cũ | Ước lượng theo mức giờ tham chiếu mà team đã chốt khi onboard |
| Kết quả review | Duyệt lần đầu / Bị trả lại N lần / Chưa review |
| Vấn đề gặp phải (tuỳ chọn) | Một câu |

Nếu task đã có trên Jira, có thể thêm label hoặc field cho *loại việc* và *cách làm* rồi export, thay vì điền tay.

## 3. Từ hai bản này tính ra gì

| Chỉ số | Cách tính | Nguồn |
|---|---|---|
| Tỷ lệ tiếp cận | Người dự live hoặc xem record / thành viên dự án | Điểm danh, survey câu 2 |
| Mức hài lòng | Điểm trung bình câu 3–5 | Survey |
| Mức hiểu bài | Tỷ lệ trả lời đúng câu 6–9 | Survey |
| **Tỷ lệ dùng kit** | Task dùng kit / tổng task đã ghi | Report của PM |
| **Giờ tiết kiệm** | (Giờ ước tính cách cũ − giờ thực tế) / giờ ước tính cách cũ, tính trên các task dùng kit | Report của PM |
| **Tỷ lệ duyệt lần đầu** | Task dùng kit được duyệt lần đầu / task dùng kit đã review; so với task không dùng kit | Report của PM |

Ba chỉ số in đậm là chỉ số chính. Training dùng các chỉ số này, cùng các chỉ số ở mục 4, cho report định kỳ.

**Cách đọc:**

- Chưa đủ 5 task dùng kit đã review cho một loại việc thì ghi "chưa đủ mẫu", chưa kết luận.
- Ngưỡng gợi ý để chuẩn hoá một module: tỷ lệ dùng kit ≥ 60%; giờ tiết kiệm ≥ 20%; tỷ lệ duyệt lần đầu không thấp hơn task không dùng kit. Người duyệt chốt lại ngưỡng trước khi dùng.
- Survey cao nhưng tỷ lệ dùng kit thấp: rào cản nằm ở công việc thật, không nằm ở buổi sharing. Xem cột lý do không dùng kit.

## 4. Kết hợp report của PM với usage log

**Phía khách cung cấp:** credit (hoặc token) theo account, theo ngày; thêm số phiên nếu có. Training xin và nhận, DevOps phân tích theo cùng kỳ với report của PM.

**Giới hạn:** usage log không phân biệt phiên nào có dùng kit. Vì vậy chỉ ghép ở mức team và kỳ, không gán credit cho từng task. Bảng account ↔ người chỉ DevOps giữ, không đưa vào report.

| Thấy được gì | Cách tính | Dùng để |
|---|---|---|
| **Người dùng thật** | Account có credit trong kỳ / thành viên đã có account | Biết adoption theo đầu người; account không dùng thì hỗ trợ người đó hoặc cân nhắc thu hồi license |
| **Chi phí mỗi task dùng kit** | Credit của team trong kỳ / số task dùng kit (credit này gồm cả phần dùng ngoài kit nên là mức trần) | So sánh giữa các loại việc, giữa các team, giữa các bản kit |
| **Credit đổi được bao nhiêu giờ** | Giờ tiết kiệm của kỳ / credit của kỳ | Trả lời câu hỏi "có đáng tiền không" |
| **Độ tin của report** | So sánh số task khai "dùng kit" với credit của team | Credit gần 0 mà khai dùng kit nhiều: report có thể khai thừa. Credit cao mà ít task dùng kit: AI đang được dùng cho việc ngoài các module |
| **Nhu cầu module mới** | Credit cao ở kỳ có ít task thuộc loại việc kit phủ | Xem team dùng AI cho việc gì, đưa vào thứ tự ưu tiên module bổ sung |
| **Xu hướng** | Credit mỗi task qua các kỳ | Tăng dần: prompt dài, phiên không làm mới, hoặc skill nạp thừa context, nên cần sửa kit. Giảm dần: người dùng đã quen |

## Câu hỏi mở

- Phía khách cung cấp usage log ở mức nào: theo account, theo ngày, có số phiên không? Bao lâu một lần?

- Nhịp report là tuần hay tháng?
- Mức giờ tham chiếu cho cách làm cũ lấy từ số liệu dự án trước, hay để PM và người phụ trách ước lượng?
- Task có được quản lý trên Jira để export thay cho việc điền tay không?
- Ai chốt các ngưỡng ở mục 3?
