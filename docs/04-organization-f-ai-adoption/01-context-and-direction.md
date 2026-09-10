# Context and Direction

Cập nhật 2026-09-09. Đọc trước [README](README.md).

## 1. Tổ chức F muốn gì

Tổ chức F đặt hai hướng song song cho năm tài khoá: **tạo giá trị nhanh hơn** (ý tưởng → PoC → MVP) và **phát triển hiệu quả hơn** (thủ công → tự động → AI). Cụ thể thành ba mục tiêu chiến lược; chỉ tiêu số nằm ở tài liệu nội bộ, không chép vào đây.

| Mục tiêu | Trọng tâm liên quan tới task |
|---|---|
| Hiện thực hoá giá trị | Nhiều PoC hơn, PoC ra MVP nhanh hơn |
| Tiến hoá DevOps | AI trong SDLC: sinh test case, tự động hoá unit test, giảm công sức thiết kế và phát triển |
| Phát triển nhân lực | Đội ngũ AI-ready; phần lớn team phát triển có **hiểu biết chung và quy trình chuẩn** về làm việc có AI; use case được chuẩn hoá trên Confluence |

**Team DevOps** là đầu mối chuyển ba mục tiêu này thành việc thật, phụ trách AI adoption, cải tiến SDLC, tooling và tự động hoá. Lộ trình của team gồm bốn giai đoạn: khảo sát và PoC; **AI hoá SDLC**; AI hoá testing; đánh giá và mở rộng. Song song là chương trình đào tạo AI toàn tổ chức ba giai đoạn: nền tảng, **AI trong công việc thật**, chia sẻ case study.

## 2. Task này thực chất là gì

Task thuộc giai đoạn hai của chương trình đào tạo: soạn tài liệu đào tạo AI gắn với công việc thật. Nhưng tên task gây hiểu nhầm ở hai chỗ:

- **Không phải làm slide.** Tài liệu chỉ có giá trị khi team dự án làm được việc thật bằng AI sau khi đọc. Nên phải kèm định hướng cách tiến hành: tool nào cho việc nào, ai cấp license, team chuẩn bị gì, đo bằng gì.
- **Không dừng ở hướng dẫn thao tác.** Guide kiểu "cài Kiro, dán prompt này" giúp người ta chạy được một lần, không giúp cả team làm giống nhau. Phải lên tới mức **quy trình chuẩn dùng được lặp lại** — xem [03](03-mk-kit-and-existing-guides.md).

Deliverable task đòi: role mapping, work mapping, tool mapping, use case mapping, ít nhất năm prompt template, governance guide, hands-on theo role, playbook. Bộ tài liệu này sắp xếp lại thành thứ tự làm được: [02](02-roles-and-tooling.md) lo mapping, [03](03-mk-kit-and-existing-guides.md) lo công cụ và prompt, [04](04-work-sequence.md) lo thứ tự việc, [05](05-rollout-plan.md) lo bàn giao.

## 3. Năm lựa chọn định hướng

| Lựa chọn | Vì sao |
|---|---|
| **Bốn việc dev là lõi**: Design (tài liệu API), Test case, Code, Unit test | Bốn việc này nằm thẳng trong mục tiêu tiến hoá DevOps. Làm được bốn việc thì prompt template, hands-on và playbook đều rút ra từ đó, không phải bịa |
| **Chia tool theo nơi việc sống**: repo dùng Kiro, Jira/Confluence dùng Rovo, họp và mail dùng M365 Copilot | Ba vùng gần như không chồng nhau. Một việc một tool chính, tránh mỗi người một kiểu |
| **Nâng guide hiện có thành skill trong MK**, không giữ hai hệ song song | Prompt instruction đã viết chính là ruột của skill; giữ riêng thì mỗi người dán một kiểu, sửa một chỗ không lan ra được |
| **MK tách lõi dùng chung và khu vực của từng team** | Quy trình giống nhau, nhưng template và rule mỗi team mỗi khác. Đợt này chỉ định hình, chưa sửa kit |
| **Dạy trên artifact thật, đo tại chốt pha** | Bài tập giả thì học xong không dùng được. Đo tại chốt pha vì team chạy waterfall, không có sprint |

Bốn việc nối thành chuỗi: thiết kế cơ bản → **sinh thiết kế và tài liệu API** → **sinh code** → **sinh unit test**, với **sinh test case** rẽ nhánh từ thiết kế. Đầu ra việc trước là đầu vào việc sau, nên khuôn đầu ra phải khớp template của team ngay từ việc đầu.

## 4. Phạm vi đợt này

| Trong phạm vi | Ngoài phạm vi |
|---|---|
| Bốn việc dev, chạy được trên artifact thật của team | Sinh test script tự động, review tự động: giai đoạn sau |
| Bảng role và tool đề xuất cho mọi role | Hands-on cho role ngoài dev: đợt sau |
| Hợp nhất guide Confluence đã có vào MK | Viết lại toàn bộ kit; đợt này chỉ định hình lõi và khu vực team |
| Nối Kiro với Jira/Confluence bằng CLI | Bật MCP, dùng Slack: chờ phía khách quyết |
| Governance ở mức tối thiểu đủ để dùng | Chính sách AI đầy đủ cấp tổ chức |

## 5. Nguyên tắc governance tối thiểu

- Không đưa dữ liệu định danh khách hàng, khoá, thông tin xác thực vào prompt.
- Output có AI tham gia vẫn phải qua người duyệt như output người viết; AI không phải người ký.
- Tool được phép: Kiro, Rovo, M365 Copilot. Tool khác phải hỏi trước.
- Ghi lại việc nào đã dùng AI, để đo được và để giải thích được khi khách hỏi.

**Câu hỏi mở**

- Khu vực riêng của từng team đặt trong repo dự án hay repo do DevOps giữ?
- Tài liệu API tách riêng hay là một mục trong thiết kế chi tiết? Ảnh hưởng tới khuôn đầu ra của việc đầu tiên.
