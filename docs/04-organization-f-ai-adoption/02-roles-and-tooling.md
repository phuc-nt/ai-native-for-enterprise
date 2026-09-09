# Roles and Tooling

Cập nhật 2026-09-09. Đọc trước [Context and Direction](01-context-and-direction.md). Tài liệu này là bảng **role → việc đặc trưng → tool đề xuất**, phải có trước khi hoàn thiện material vì nó quyết định module nào viết cho ai.

Tool khả dụng cho team dự án: **Kiro** (agent làm việc trong repo) và **Rovo** (AI trong Jira/Confluence). Bộ **MK** chạy trên Kiro, cung cấp lớp quy trình — xem [03](03-mk-kit-and-existing-guides.md).

## 1. Quy tắc chọn tool

Chọn theo **nơi việc sống**, không theo sở thích:

| Việc sống ở đâu | Tool | Ví dụ |
|---|---|---|
| Trong repo: code, test, tài liệu kỹ thuật cạnh code | Kiro + MK | Sinh code, sinh unit test, sinh thiết kế chi tiết từ code hiện có |
| Trong Jira/Confluence: ticket, tài liệu, báo cáo | Rovo | Tóm tắt yêu cầu, soạn báo cáo tuần, tra tài liệu cũ |
| Xuyên hai bên | Kiro + MK gọi CLI ra Jira/Confluence | Sinh test case từ story rồi đăng ngược lên Confluence |

## 2. Bốn việc dev — lõi của đợt này

| Việc | Ai | Đầu vào thật | Đầu ra phải khớp | Tool | Khoảng cách hiện tại |
|---|---|---|---|---|---|
| **1. Sinh thiết kế chi tiết và tài liệu API** | Dev lead, architect | Yêu cầu, thiết kế cơ bản, code hiện có | Thiết kế theo template khách, thường song ngữ, có mục bắt buộc | Kiro + MK | **Xa nhất.** MK có bước thiết kế giải pháp nhưng đầu ra là kế hoạch cho agent, không phải tài liệu nộp khách. Cần khuôn của team |
| **2. Sinh test case** | Tester, BrSE | Tài liệu thiết kế, story | Đặc tả test theo template team, độ mịn theo quy ước | Kiro + MK, có thể đăng lên Confluence | Trung bình. MK có luồng từ story sang test case; cần đổi đầu vào sang tài liệu thiết kế và đổi khuôn đầu ra |
| **3. Sinh code** | Developer | Thiết kế chi tiết, code hiện có, coding standard | Code qua được review và build | Kiro + MK | **Gần nhất.** MK vốn mạnh ở đây; chủ yếu cần nạp rule của team |
| **4. Sinh unit test** | Developer | Code đã viết, ngưỡng coverage, framework test | Unit test chạy được, đạt ngưỡng | Kiro + MK | Trung bình. MK thiên về chạy test; cần thêm chế độ sinh test theo đặc tả |

Đánh giá khoảng cách dựa trên nội dung skill, chưa chạy trên artifact của team nào, nên **[chưa kiểm chứng]** cho tới bước khảo sát ở [04](04-work-sequence.md) chặng 2.

## 3. Các role khác — đề xuất tool và việc

Đợt này chỉ dừng ở bảng đề xuất, chưa làm hands-on.

| Role | Việc đặc trưng AI hoá được | Tool đề xuất |
|---|---|---|
| PM, PL, PMO | Báo cáo tiến độ, tóm tắt trạng thái epic, chuẩn bị họp | Rovo |
| BA | Tóm tắt yêu cầu, soát mâu thuẫn giữa tài liệu, phác thảo tiêu chí chấp nhận | Rovo; Kiro khi cần đối chiếu code |
| BrSE, Comtor | Soạn bản song ngữ, chuẩn hoá thuật ngữ, tóm tắt thread trao đổi | Rovo |
| Tester ngoài bốn việc lõi | Rà phủ test, sinh dữ liệu thử, soạn báo cáo lỗi | Rovo cho tài liệu; Kiro cho phần cạnh code |
| Architect | So sánh phương án, rà ảnh hưởng thay đổi lên hệ thống | Kiro + MK |
| QA, Training | Soát tài liệu theo chuẩn, soạn nội dung đào tạo | Rovo |
| Mọi role | Tra cứu tài liệu cũ trong Confluence | Rovo |

**Câu hỏi mở**

- License Rovo cấp cho toàn bộ thành viên hay chỉ role dùng Jira/Confluence nhiều? Ảnh hưởng tới bảng trên.
- Có role nào bị cấm dùng AI theo hợp đồng với khách không?
