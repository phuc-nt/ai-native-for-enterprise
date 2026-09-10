# Roles and Tooling

Cập nhật 2026-09-10. Đọc trước [Context and Direction](01-context-and-direction.md). Tài liệu này là matrix **role → task → tool**, phải có trước khi hoàn thiện material vì nó quyết định module nào viết cho ai.

Ba tool khả dụng: **Kiro** (agent làm việc trong repo, chạy bộ **MK** — xem [03](03-mk-kit-and-existing-guides.md)), **Rovo** (AI trong Jira/Confluence), **M365 Copilot** (Teams, Mail, Calendar, Office).

## 1. Vùng của từng tool

| Tool | Vùng | Giới hạn |
|---|---|---|
| **Kiro + MK** | Repo: code, test, tài liệu kỹ thuật cạnh code | **Chưa có MCP nối Atlassian.** Không tự đọc ghi Jira, Confluence; tạm nối bằng CLI chạy tại máy với token cá nhân |
| **Rovo** | Jira, Confluence: ticket, tài liệu, báo cáo | Không thấy repo, không thấy Teams và Mail |
| **M365 Copilot** | Teams, Outlook Mail, Calendar, Word, Excel, PowerPoint | Không thấy repo, không thấy Jira và Confluence |

Ba vùng gần như không chồng nhau, nên quy tắc chọn tool đơn giản: **việc sống ở đâu thì dùng tool của chỗ đó.** Chỗ duy nhất phải bắc cầu là Kiro với Atlassian, hiện đi qua CLI.

## 2. Điểm mạnh và điểm yếu

| Tool | Mạnh | Yếu | Dùng tốt nhất cho |
|---|---|---|---|
| **Kiro + MK** | Đọc và sửa được cả repo, không chỉ một file. Chạy được lệnh nên tự kiểm chứng: build, chạy test rồi sửa tiếp. Có MK nên đi theo quy trình có bước, nạp rule của team, ra đúng khuôn. Đo được bằng MK Observe | Chưa nối Atlassian. Phải cài đặt trên từng máy, có ngưỡng học. Cần khu vực riêng của team mới ra đúng template. Tốn credit theo mức dùng | Bốn việc lõi: sinh thiết kế, test case, code, unit test |
| **Rovo** | Ở sẵn trong Jira và Confluence, không phải cài gì. Thấy toàn bộ ticket và tài liệu cũ, trả lời có dẫn nguồn. Ai có license là dùng được ngay | Không thấy code nên không kiểm chứng được điều nó nói về hệ thống. Chỉ hỏi đáp và soạn thảo, không có quy trình nhiều bước. Chất lượng tiếng Nhật chưa kiểm chứng | Tra cứu, tóm tắt, báo cáo dựa trên dữ liệu Jira và Confluence |
| **M365 Copilot** | Có transcript họp Teams, nội dung Mail và Calendar — thứ không hệ nào khác có. Soạn thảo Office tốt. Người dùng đã quen giao diện | Không thấy repo lẫn Jira. Không tự động hoá được quy trình dự án. Nội dung họp với khách nhạy cảm, cần rõ chính sách trước khi dùng rộng | Biên bản họp, mail khách, slide, biểu mẫu |

Ghi chú: đánh giá dựa trên tài liệu sản phẩm và kinh nghiệm dùng MK, chưa chạy thử trên artifact của team nào, nên phần khoảng cách ở mục 4 là **[chưa kiểm chứng]** cho tới bước khảo sát ở [04](04-work-sequence.md) chặng 2.

## 3. Matrix role, task, tool

| Role | Task đặc trưng | Tool | Ghi chú |
|---|---|---|---|
| **Developer** | Sinh code từ thiết kế chi tiết | Kiro + MK | Lõi đợt này |
| | Sinh unit test | Kiro + MK | Lõi; guide Confluence hiện có gộp vào skill |
| | Tự review trước khi tạo PR | Kiro + MK | |
| | Cập nhật trạng thái ticket | Rovo | Kiro chưa với tới Jira |
| **Dev lead, Architect** | Sinh thiết kế chi tiết và tài liệu API | Kiro + MK | Lõi; khoảng cách xa nhất |
| | So sánh phương án, rà ảnh hưởng thay đổi | Kiro + MK | |
| | Review thiết kế của thành viên | Kiro + MK | Đọc được code hiện có nên bắt được sai lệch |
| **Tester** | Sinh test case từ tài liệu thiết kế | Kiro + MK, đăng lên Confluence qua CLI | Lõi; guide hiện có gộp vào skill |
| | Sinh dữ liệu thử | Kiro + MK | |
| | Soạn báo cáo lỗi, rà phủ test | Rovo | Việc sống trong Jira |
| **BA** | Tóm tắt yêu cầu, soát mâu thuẫn giữa tài liệu | Rovo | |
| | Phác thảo tiêu chí chấp nhận | Rovo | |
| | Đối chiếu yêu cầu với code hiện có | Kiro + MK | Việc hiếm nhưng chỉ Kiro làm được |
| **BrSE, Comtor** | Soạn bản song ngữ tài liệu dự án | Rovo | |
| | Tóm tắt cuộc họp với khách | M365 Copilot | Họp trên Teams, Copilot có transcript |
| | Soạn và trả lời mail khách | M365 Copilot | |
| | Chuẩn hoá thuật ngữ | Rovo | |
| **PM, PL** | Báo cáo tiến độ, tóm tắt trạng thái epic | Rovo | Số liệu nằm trong Jira |
| | Chuẩn bị nội dung họp, biên bản họp | M365 Copilot | |
| | Soạn mail báo cáo cho khách | M365 Copilot | |
| | Sắp lịch, tìm slot họp | M365 Copilot | |
| **PMO** | Tổng hợp báo cáo nhiều dự án | Rovo | |
| | Soạn tài liệu quản trị, biểu mẫu | M365 Copilot | Word, Excel |
| **QA, Training** | Soát tài liệu theo chuẩn | Rovo | Tài liệu ở Confluence |
| | Soạn nội dung đào tạo, slide | M365 Copilot | PowerPoint |
| **Mọi role** | Tra cứu tài liệu cũ | Rovo | |
| | Tìm lại nội dung đã trao đổi trong họp và mail | M365 Copilot | |

Ba điểm rút ra:

- **BrSE và PM dùng cả ba tool**, vì họ đứng giữa khách và team nên việc rải khắp ba vùng. Muốn đo hiệu quả M365 Copilot thì đo ở hai role này.
- **Bốn việc lõi nằm gọn trong Kiro + MK**, không đụng Rovo lẫn Copilot, nên việc thiếu MCP không chặn mục tiêu cuối tháng 10.
- **Chỗ đau duy nhất là Kiro với Atlassian**: tester đăng test case lên Confluence, developer cập nhật Jira. Hiện đi qua CLI; khi MCP được bật thì đổi đầu nối, không đổi quy trình và không phải sửa material.

## 4. Bốn việc lõi — chi tiết

| Việc | Ai | Đầu vào thật | Đầu ra phải khớp | Khoảng cách hiện tại |
|---|---|---|---|---|
| **1. Sinh thiết kế chi tiết và tài liệu API** | Dev lead, architect | Yêu cầu, thiết kế cơ bản, code hiện có | Thiết kế theo template khách, thường song ngữ, có mục bắt buộc | **Xa nhất.** MK có bước thiết kế giải pháp nhưng đầu ra là kế hoạch cho agent, không phải tài liệu nộp khách. Cần khuôn của team |
| **2. Sinh test case** | Tester, BrSE | Tài liệu thiết kế, story | Đặc tả test theo template team, độ mịn theo quy ước | Trung bình. MK có luồng từ story sang test case; cần đổi đầu vào sang tài liệu thiết kế và đổi khuôn đầu ra |
| **3. Sinh code** | Developer | Thiết kế chi tiết, code hiện có, coding standard | Code qua được review và build | **Gần nhất.** MK vốn mạnh ở đây; chủ yếu cần nạp rule của team |
| **4. Sinh unit test** | Developer | Code đã viết, ngưỡng coverage, framework test | Unit test chạy được, đạt ngưỡng | Trung bình. MK thiên về chạy test; cần thêm chế độ sinh test theo đặc tả |

**Câu hỏi mở**

- M365 Copilot đã cấp cho những role nào? Nếu chỉ một phần thì matrix phải cắt bớt.
- Có ràng buộc nào cấm đưa nội dung họp với khách vào Copilot không? Transcript họp nhạy cảm hơn ticket.
- License Rovo cấp cho toàn bộ thành viên hay chỉ role dùng Jira và Confluence nhiều?
