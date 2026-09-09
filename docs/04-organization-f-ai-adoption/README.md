# Organization F: AI Adoption

Nhóm tài liệu này khác ba nhóm trước: không còn là lý thuyết chung mà là **đề xuất cho một tổ chức cụ thể**, gọi là tổ chức F, với công cụ đã chọn, ràng buộc đã biết và mốc thời gian thật. Viết ở mức tổng quan để đem đi đề xuất; chi tiết từng phần bổ sung sau khi được duyệt.

## Hiện trạng làm tiền đề

| Hạng mục | Hiện trạng |
|---|---|
| Jira, Confluence | Cloud |
| AI trong Jira/Confluence | Rovo; gói chưa xác nhận, giả định dùng thoải mái |
| Agent viết code | Kiro, gói Pro hoặc Pro+ theo nhu cầu; **không dùng Rovo Dev** |
| Bộ quy trình trên Kiro | MK (skill, rule, hook, subagent), phải tuỳ biến theo từng team |
| Kiro nối Jira/Confluence | CLI tự dựng, chạy tại máy từng người với token cá nhân; **MCP chưa được bật** |
| Slack | Chưa rõ; dự phòng CLI chứng thực bằng cookie trình duyệt |
| Team pilot | Hai team dự án, cả hai waterfall |
| Mốc | 2026-10-31: hai team hoàn thành bước triển khai kiến thức |

## Ba tài liệu

| # | Tài liệu | Trả lời | Đọc khi |
|---|---|---|---|
| 01 | [Tool Mapping by Role](01-tool-mapping-by-role.md) | Role nào dùng Rovo, role nào dùng Kiro + MK, việc nào đi qua workflow skill | Cần quyết định cấp tool cho ai |
| 02 | [Enablement Framework](02-enablement-framework.md) | Từ kit và tool đến team dùng được trong việc thật: bảy bước, ai làm, xong khi nào | Cần duyệt cách làm |
| 03 | [Rollout Roadmap](03-rollout-roadmap.md) | Hai team đi qua bảy bước ra sao để kịp mốc; cần gì từ lãnh đạo và PL | Cần duyệt lịch và nguồn lực |

Đọc theo thứ tự 01, 02, 03. Nền tảng chung nằm ở [nhóm 02](../02-ai-in-sdlc/): bộ MK ở [AI Toolkit](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md), bản Kiro ở [Kiro + MK Kit](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md), cách đo ở [MK Observe](../02-ai-in-sdlc/05-mk-observe-agent-metrics.md).

## Điều cần được duyệt

1. Chia tool theo nơi việc sống (01, mục 1) và nguyên tắc Kiro là agent code duy nhất.
2. Khung bảy bước và định nghĩa "đã triển khai" bằng bốn điều kiện trên từng người (02, mục 3).
3. Lịch hai team lệch pha một tuần với ba cổng quyết định (03), cùng nguồn lực: mỗi team một đến hai champion, PL một giờ mỗi tuần, thành viên nửa ngày trong tuần đào tạo.
4. Ba việc chính sách: xác nhận gói Rovo, đường Slack, quyền dùng artifact của khách cho hands-on.
