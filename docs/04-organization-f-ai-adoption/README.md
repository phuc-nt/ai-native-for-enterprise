# Organization F: AI Adoption

Nhóm tài liệu này không còn là lý thuyết chung: đây là **định hướng cho một task cụ thể** của tổ chức F, gọi là tổ chức F để ẩn tên. Task: **soạn tài liệu đào tạo AI giai đoạn 2**, do **team DevOps** chịu trách nhiệm, thực chất là đưa AI vào công việc thật của hai team dự án và chuẩn hoá cách dùng. Sản phẩm bàn giao là **một cây trang Confluence cho mỗi team**, trang gốc gắn link tới module, template, checklist và khu vực team trong repo. Bộ tài liệu trả lời ba câu: **hướng làm là gì, phạm vi tới đâu, việc phải làm gồm gì và ai làm.** Chưa đi vào chi tiết kỹ thuật, chưa chỉnh bộ MK.

## Hiện trạng làm tiền đề

| Hạng mục | Hiện trạng |
|---|---|
| Jira, Confluence | Cloud |
| AI trong Jira/Confluence | Rovo; gói chưa xác nhận, giả định dùng thoải mái |
| Agent viết code | Kiro, Pro hoặc Pro+ theo nhu cầu; **không dùng Rovo Dev**, không Copilot |
| Bộ quy trình trên Kiro | MK; phải tuỳ biến theo từng team trước khi dùng |
| Kiro nối Jira/Confluence | CLI tự dựng tại máy từng người, token cá nhân; **MCP chưa được bật** |
| Slack | Chưa rõ; dự phòng CLI chứng thực bằng cookie trình duyệt |
| Team pilot | Hai team dự án, cả hai waterfall |
| Mốc | 2026-10-31: hai team hoàn thành bước triển khai kiến thức |

## Bốn tài liệu

| # | Tài liệu | Trả lời |
|---|---|---|
| 01 | [Direction and Scope](01-direction-and-scope.md) | Hướng làm, phạm vi trong và ngoài, deliverable của task ứng với thứ sẽ làm ra, cách đưa vào team |
| 02 | [Four Core Use Cases](02-four-core-use-cases.md) | Bốn việc của team dev được AI hoá: sinh thiết kế, sinh test case, sinh code, sinh unit test; role khác ở dạng ý tưởng |
| 03 | [Artifacts, Work Items and PIC](03-work-items-and-pic.md) | Bộ material bàn giao trên Confluence và các artifact khác: cái nào DevOps làm, cái nào team dự án làm, cái nào phối hợp; việc làm ra chúng, mỗi việc có PIC |
| 04 | [Rollout Roadmap](04-rollout-roadmap.md) | Hai team đi qua các việc đó theo tuần đến mốc, ba cổng quyết định, đường lùi |

Đọc theo thứ tự. Nền chung nằm ở [nhóm 02](../02-ai-in-sdlc/): bộ MK ở [AI Toolkit](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md), bản Kiro ở [Kiro + MK Kit](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md), cách đo ở [MK Observe](../02-ai-in-sdlc/05-mk-observe-agent-metrics.md).

## Điều cần được duyệt

1. Phạm vi: bốn use case của team dev là lõi; role khác chỉ nhận bảng ý tưởng trong đợt này (01, mục 2).
2. Hướng kit: MK chia thành lõi dùng chung và khu vực của từng team; đợt này chỉ định hình, chưa sửa kit (01, mục 1).
3. Danh sách artifact và phân công theo ba bên ở tài liệu 03, đặc biệt team dự án phải nộp artifact mẫu và số nền trước 2026-09-19, phía khách phải quyết trước 2026-10-03.
4. Lịch hai team lệch pha một tuần với ba cổng quyết định (04).
