# Direction and Scope

Cập nhật 2026-09-09. Đọc trước [README](README.md) để biết hiện trạng.

## 1. Hướng làm

Năm lựa chọn định hướng, mỗi lựa chọn một câu vì sao.

| Lựa chọn | Vì sao |
|---|---|
| **Lấy bốn việc của team dev làm lõi**: sinh thiết kế, sinh test case, sinh code, sinh unit test | Đây là bốn việc nằm thẳng trong KPI về giảm công sức thiết kế, phát triển, unit test và về test case do AI sinh. Làm được bốn việc này thì tài liệu đào tạo, prompt template, hands-on và playbook đều rút ra từ đó |
| **Chia tool theo nơi việc sống**: việc trong repo dùng Kiro + MK; việc trong Jira/Confluence dùng Rovo; việc xuyên hai bên dùng workflow skill của MK gọi CLI | Rovo không thấy repo, Kiro không hỏi đáp tự do trên Confluence; một use case một tool chính, tránh hai chuẩn |
| **Kiro là agent code duy nhất** | Một chuẩn, một bộ log, một chỗ đo; không Rovo Dev, không Copilot trong đợt này |
| **MK chia thành lõi dùng chung và khu vực của từng team** | Kit gốc viết cho quy trình chung. Team waterfall có template khách, coding standard, luồng duyệt riêng. Nếu sửa thẳng skill theo từng team thì mất khả năng nâng cấp. Hướng đúng: lõi (skill, hook, rule chung) do DevOps giữ và đóng băng theo phiên bản; khu vực team (ngữ cảnh dự án, rule, template đầu ra, cấu hình) do champion của team giữ; skill tìm khuôn trong khu vực team trước, không có thì dùng mặc định. **Đợt này chỉ định hình, chưa sửa kit** |
| **Đào tạo trên artifact thật, đo tại phase gate** | Hands-on trên ví dụ chung thì tuần sau không ai dùng. Waterfall có gate sẵn: số nền lấy ở gate trước, số sau lấy ở gate sau, không dựng phép đo riêng |

Mô hình đích của bốn việc lõi là một chuỗi: **thiết kế → code → unit test**, với **test case** rẽ nhánh từ thiết kế. Đầu ra của việc trước là đầu vào của việc sau, nên khuôn đầu ra phải khớp template của team ngay từ việc đầu.

## 2. Phạm vi

| Trong phạm vi | Ngoài phạm vi đợt này |
|---|---|
| Bốn use case của team dev, cho developer, dev lead hoặc architect, tester | API spec generation: gộp vào sinh thiết kế nếu team có tài liệu API, không tách riêng |
| Hai team dự án waterfall, đến bước triển khai kiến thức trước 2026-10-31; áp dụng và đánh giá đến hết tháng 12 | Team thứ ba trở đi |
| Role ngoài dev: bảng ý tưởng dùng Rovo, chưa pilot, chưa hands-on | Pilot Rovo có đo cho PM, BA, BrSE, comtor: chỉ chạy thăm dò nếu còn thời gian |
| Kiro + MK với CLI Jira/Confluence; Rovo trong gói hiện có | MCP trong Kiro, Slack, Rovo Dev, Copilot |
| Định hình lõi và khu vực team của MK | Sửa kit theo hướng đó: làm sau khi duyệt |
| Governance tối thiểu: dữ liệu vào và không vào AI, tool được phép, người duyệt output gửi khách | Policy toàn đơn vị: do phía khách và lãnh đạo ban hành, DevOps chỉ đề xuất |

## 3. Deliverable của task ứng với thứ sẽ làm ra

| Deliverable task đòi | Sẽ làm ra | Rút từ đâu |
|---|---|---|
| Role mapping, work mapping, tool mapping | Bảng role dev chi tiết theo bốn việc; role khác một dòng mỗi role | [02](02-four-core-use-cases.md) |
| Use case mapping | Bốn use case lõi có đầu vào, đầu ra, tool, cách đo; bảng ý tưởng role khác | [02](02-four-core-use-cases.md) |
| Prompt template, ít nhất năm | Bốn template từ bốn use case dev, một cho Rovo (tóm tắt họp hoặc báo cáo tuần) | Hands-on đã chạy |
| Governance guide | Trang trả lời bốn câu: dữ liệu vào, dữ liệu không vào, tool được phép, quy tắc bảo mật | Việc ở [03](03-work-items-and-pic.md), luồng A và E |
| Hands-on theo role | Bốn bài trên artifact thật: dev lead sinh thiết kế, dev sinh code và unit test, tester sinh test case | Khảo sát team |
| Playbook | Gộp: quy trình bốn việc, checklist, prompt template, governance, kit của team | Cuối đợt |

## 4. Cách đưa vào một team

Bảy bước, mỗi bước có đầu ra và điều kiện xong. Chi tiết việc và PIC ở [03](03-work-items-and-pic.md).

| Bước | Ra gì | Xong khi |
|---|---|---|
| 1. Khảo sát team | Hồ sơ team một trang; artifact mẫu của bốn việc; số nền | PL xác nhận |
| 2. Tuỳ biến kit theo team | Khu vực team v0.1: ngữ cảnh, rule, template, cấu hình | Bốn việc chạy trên task thật, champion ký |
| 3. Soạn module theo role | Module 90 phút mỗi việc: 15 phút quy tắc, 60 phút làm trên artifact thật, 15 phút xem lại | Champion chạy thử trơn |
| 4. Triển khai kiến thức | Từng người đạt bốn điều kiện ở dưới | 100% hoặc PL ký ngoại lệ |
| 5. Áp dụng có hỗ trợ | Output thật có AI tham gia; khu vực team v0.2 | Mỗi việc có một output thật được duyệt |
| 6. Theo dõi | Bảng một trang: mức dùng, output được duyệt, công sức, chất lượng | Cập nhật mỗi tuần |
| 7. Đánh giá | Với từng use case: chuẩn hoá, sửa, hay dừng | Có quyết định thành văn |

**Một người "đã triển khai"** khi: tool chạy trên máy của họ; hoàn thành một hands-on của đúng việc mình; nói được ba quy tắc governance; biết nơi hỏi. Đếm người dùng được, không đếm buổi đã dạy.

## 5. Nguyên tắc governance đợt này

- Dữ liệu đi đường đã duyệt: Rovo đọc theo quyền người dùng; Kiro đọc repo và gọi CLI bằng token cá nhân của chính người đó.
- Output gửi khách phải có người duyệt; AI viết nháp, người ký.
- Token, cookie không vào repo, không vào log; hook của MK chặn credential và đường dẫn cấm.
- Đo từ ngày đầu: MK Observe cho Kiro, usage trong Atlassian admin cho Rovo.

## 6. Đường kỹ thuật

CLI Jira/Confluence in ra cùng envelope JSON mà skill MK đã quen, nên skill giữ nguyên logic, chỉ đổi lời gọi. Khi Kiro được bật MCP thì chuyển sang Atlassian MCP Server chính thức; cùng CLI bọc thành MCP server được mà không sửa skill lần nữa. Slack chưa có: skill báo cáo dừng ở Confluence, dán link tay.

**Câu hỏi mở**

- Khu vực team đặt trong repo dự án hay trong repo riêng của DevOps rồi đồng bộ sang? Quyết định ai được sửa và cách nâng cấp lõi.
- API spec generation gộp vào sinh thiết kế được không, hay team có tài liệu API riêng cần khuôn riêng?
