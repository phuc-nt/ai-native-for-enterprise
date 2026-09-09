# Enablement Framework

Cập nhật 2026-09-09. Đọc trước [Tool Mapping by Role](01-tool-mapping-by-role.md). Tài liệu này trả lời: **từ lúc có kit và tool đến lúc một team dự án dùng được trong việc thật, đi qua bước nào, ai làm, xong khi nào.**

## 1. Vì sao phải tuỳ biến kit trước khi dạy

Kit MK viết cho quy trình chung. Team waterfall làm với khách có output cố định theo pha, template do khách quy định, coding standard và luồng duyệt riêng, thuật ngữ và ngôn ngữ giao tiếp riêng. Dạy kit nguyên bản thì output AI không nộp được, người dùng phải chép tay sang template và bỏ ngay tuần đầu.

Bốn lớp tuỳ biến, từ ít công đến nhiều công:

| Lớp | Tuỳ biến gì | Xong khi |
|---|---|---|
| Ngữ cảnh | Khách, hệ thống, thuật ngữ, ngôn ngữ, quy ước giao tiếp | Agent trả lời đúng về dự án mà không cần nhắc |
| Rule | Coding standard, naming, review checklist, quy tắc tài liệu của team | Output qua review của team không sửa về hình thức |
| Template | Output thật của từng pha làm khuôn cho skill | Output AI dán thẳng vào template khách |
| Skill | Cắt skill không dùng, chuyển workflow skill sang CLI, thêm skill cho output đặc thù | Ba task thật của team chạy hết bằng skill |

Kết quả là **kit của team**, sống trong repo của team, có phiên bản. Team sau bắt đầu từ kit của team trước.

## 2. Bảy bước

| Bước | Ra gì | Xong khi | Thời lượng |
|---|---|---|---|
| 1. Khảo sát team | Hồ sơ team một trang; kho artifact mẫu; số nền cho ba việc tốn thời gian nhất | PL xác nhận | 1 tuần |
| 2. Tuỳ biến kit | Kit của team v0.1 | Ba task thật chạy hết bằng skill, champion ký | 1–2 tuần |
| 3. Soạn tài liệu theo role | Một module 90 phút cho mỗi role: 15 phút quy tắc, 60 phút làm trên artifact thật, 15 phút xem lại; prompt template rút ra | Champion chạy thử trơn | 1 tuần |
| 4. Triển khai kiến thức | Từng người đạt bốn điều kiện ở mục 3 | 100% đạt hoặc PL ký ngoại lệ | 1 tuần |
| 5. Áp dụng có hỗ trợ | Output thật có AI tham gia; kit v0.2 | Mỗi role có một output thật được duyệt | 2–4 tuần |
| 6. Theo dõi | Bảng một trang, bốn chiều: mức dùng, output được duyệt, công sức, chất lượng và tuân thủ | Cập nhật mỗi tuần | Liên tục |
| 7. Đánh giá và quyết định | Với từng use case: chuẩn hoá, sửa, hay dừng; đóng góp ngược lên kit chung | Có quyết định thành văn | 1 tuần |

Ba bước đầu là chuẩn bị, bước bốn là mốc, ba bước cuối là dùng thật. Không để trống tuần nào giữa bước 4 và 5.

## 3. "Đã triển khai" nghĩa là gì

Đếm người dùng được, không đếm buổi đã dạy. Một người được tính là đã triển khai khi:

1. Tool chạy trên máy của họ: Kiro với kit của team, CLI với token cá nhân, Rovo mở được.
2. Hoàn thành một bài hands-on của đúng role mình, output khớp template.
3. Nói được ba quy tắc governance: dữ liệu nào không đưa vào AI, output nào phải người duyệt, credential giữ ở đâu.
4. Biết nơi hỏi: champion, kênh hỗ trợ, tài liệu kit của team.

## 4. Ai làm gì

| Vai trò | Làm gì | Thời gian |
|---|---|---|
| Chủ chương trình | Chạy bảy bước, giữ lịch, viết tài liệu, báo cáo | Toàn thời gian trong đợt |
| Người giữ kit | Tuỳ biến kit, chuyển skill sang CLI, hỗ trợ kỹ thuật | Nửa thời gian hai bước đầu |
| Champion, 1–2 người mỗi team | Cung cấp artifact, thử trước, dạy lại, giữ office hours | 2–4 giờ mỗi tuần |
| PL hoặc PM | Duyệt phạm vi, chọn task thật, ký tiêu chí ra | 1 giờ mỗi tuần |
| Thành viên | Học, làm hands-on, dùng thật, phản hồi | Nửa ngày cộng thời gian dùng thật |

Không có champion thì không bắt đầu với team đó.

## 5. Bám pha waterfall

- Dạy module của **pha hiện tại và pha kế tiếp**; tránh tuần bàn giao.
- **Phase gate là điểm đo**: số nền lấy ở gate trước, số sau lấy ở gate sau.
- Việc AI đỡ được nhiều nhất theo pha: yêu cầu → rút từ biên bản và bảng hỏi đáp; thiết kế → nháp theo template; coding → code và review theo rule; test → sinh test case và unit test; mọi pha → báo cáo và biên bản.

## 6. Ba nguyên tắc

1. Đào tạo trên artifact thật của team, không trên ví dụ chung.
2. Kit đi trước tài liệu: không viết hướng dẫn cho thứ chưa chạy trên máy champion.
3. Mỗi bước có người quyết định và tiêu chí ra.

**Câu hỏi mở**

- Ai giữ kit của team khi chủ chương trình rút: mỗi team một người hay một người chung?
- Hands-on trên artifact của khách có cần xin phép khách không?
