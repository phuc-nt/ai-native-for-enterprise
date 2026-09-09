# Rollout Plan

Cập nhật 2026-09-09. Đọc trước [Work Sequence](04-work-sequence.md). Đây là chặng 5: đưa material tới team dự án và biết được nó có ăn hay không.

## 1. Gói bàn giao cho một team

Một cây trang Confluence, trang gốc gắn link tới mọi thứ còn lại kể cả thứ nằm trong repo. Team nhận cây này chứ không nhận file rời. Phần dùng chung để ở trang chung của DevOps rồi nhúng vào, để sửa một chỗ là cả hai team thấy.

Nội dung cây theo bảng material ở [04](04-work-sequence.md) chặng 4. Riêng phần của team: đường dẫn repo, tên project, template đầu ra, tên người phụ trách.

## 2. Bảy bước đưa vào một team

| Bước | Ra cái gì | Coi là xong khi |
|---|---|---|
| 1. Khảo sát | Hồ sơ team, artifact mẫu, rule, số nền | Người phụ trách xác nhận |
| 2. Tuỳ biến kit | Khu vực riêng của team | Bốn việc chạy trên task thật |
| 3. Soạn và bàn giao material | Cây Confluence đầy đủ | Người phụ trách đi hết cây trên máy mình, link mở được, bài chạy được |
| 4. Triển khai kiến thức | Cả team qua buổi mở đầu và hands-on | Từng người đạt bốn điều kiện ở mục 3 |
| 5. Áp dụng có hỗ trợ | Output thật có AI tham gia | Mỗi việc có ít nhất một output được duyệt |
| 6. Theo dõi | Bảng một trang | Cập nhật đều |
| 7. Đánh giá | Quyết định với từng việc: chuẩn hoá, sửa, hay dừng | Có quyết định thành văn |

## 3. Thế nào là "đã triển khai"

Bốn điều kiện, xét theo từng người, không xét theo lớp học:

1. Tool chạy được trên máy của họ, có khu vực riêng của team.
2. Đã tự tay làm một lần bài hands-on đúng việc của mình, ra output khớp khuôn.
3. Nói được ba nguyên tắc governance: dữ liệu nào không đưa vào, ai duyệt output, tool nào được phép.
4. Biết hỏi ở đâu khi tắc.

Người phụ trách kiểm và ký danh sách. Ai vắng thì có buổi dạy bù, không bỏ qua.

## 4. Đo bằng gì

Bốn chiều, ghi cùng một bảng, so với số nền thu ở chặng khảo sát:

| Chiều | Nguồn số |
|---|---|
| Mức dùng | MK Observe trên máy; usage của Rovo |
| Output được duyệt | Người phụ trách đếm: bao nhiêu output có AI tham gia được duyệt, bao nhiêu bị trả |
| Công sức | Giờ làm bốn loại việc, so với số nền |
| Chất lượng | Số chỉ trích ở review, lỗi trên nghìn dòng, coverage tại chốt pha |

Đo tại chốt pha, không đo theo sprint, vì team chạy waterfall.

## 5. Đường lùi

| Nếu | Thì |
|---|---|
| License về muộn | Dạy phần mindset và governance trước, hoãn hands-on; không dồn cả hai vào tuần cuối |
| Artifact mẫu về muộn | Dựng khu vực team bằng mẫu chung, chấp nhận output chưa khớp template, sửa sau khi có mẫu thật |
| Việc sinh thiết kế chưa ra đúng khuôn | Thu hẹp còn ba việc: test case, code, unit test. Ba việc này đủ để chứng minh giá trị |
| Một team bận bàn giao đúng đợt | Cho lệch pha, làm xong team này rồi tới team kia, dùng lại khu vực team đã dựng |
| MCP được bật giữa chừng | Đổi đầu nối trong skill, không đổi quy trình và không đổi material |
| Người phụ trách không có giờ | Giảm còn một việc mỗi team, đổi hỗ trợ tại chỗ thành buổi hỏi đáp định kỳ |

## 6. Sau mốc cuối tháng 10 sẽ có

- Mỗi team một cây material đã bàn giao, có người giữ.
- Bốn việc dev chạy được trên task thật của cả hai team, có bảng theo dõi.
- Guide Confluence cũ đã hợp nhất vào kit, không còn hai hệ song song.
- Báo cáo triển khai một trang, và dàn ý playbook để làm tiếp ở giai đoạn sau.

**Câu hỏi mở**

- Cây material đặt ở không gian của DevOps hay của từng team? Ảnh hưởng quyền sửa và cách nhúng trang chung.
- Đợt này lấy bao nhiêu team làm pilot? Bộ tài liệu đang giả định hai team, lệch pha nhau.
