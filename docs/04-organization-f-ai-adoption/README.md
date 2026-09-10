# Organization F: AI Adoption

Nhóm này là **định hướng cho một task thật**, không phải lý thuyết chung. Tổ chức gọi là **tổ chức F** để ẩn tên: một trung tâm nguồn lực chung giữa phía khách và phía offshore, nhiều team dự án dùng chung quy trình và hoạt động đào tạo. Task: **soạn tài liệu đào tạo AI giai đoạn 2**, do **team DevOps** chịu trách nhiệm.

Tên task nói "soạn tài liệu", nhưng làm xong tài liệu không có nghĩa là xong việc. Muốn tài liệu dùng được thì phải đồng thời định hướng cách tiến hành: dùng tool gì cho việc gì, ai cấp license, team dự án chuẩn bị gì, đo bằng gì. Bộ tài liệu này là phần định hướng đó.

**Mục tiêu trước mắt**: cuối tháng 10 có đủ material để rollout cho các team dự án ở bốn việc **Design (tài liệu API), Test case, Code, Unit test**.

## Năm tài liệu

| # | Tài liệu | Trả lời |
|---|---|---|
| 01 | [Context and Direction](01-context-and-direction.md) | Tổ chức muốn gì, task thực chất là gì, năm lựa chọn định hướng, phạm vi đợt này |
| 02 | [Roles and Tooling](02-roles-and-tooling.md) | Vùng và điểm mạnh yếu của ba tool; matrix role, task, tool; bốn việc dev là lõi |
| 03 | [MK Kit and Existing Guides](03-mk-kit-and-existing-guides.md) | MK là gì, vì sao dùng MK thay vì dừng ở prompt instruction, hợp nhất guide Confluence đã có vào MK thế nào |
| 04 | [Work Sequence and Dependencies](04-work-sequence.md) | Thứ tự việc theo năm chặng: ai làm, chờ ai, cần input gì, ra output gì |
| 05 | [Rollout Plan](05-rollout-plan.md) | Đưa material tới team dự án: gói bàn giao, điều kiện coi là đã triển khai, cách đo, đường lùi |

Nền chung ở [nhóm 02](../02-ai-in-sdlc/): [AI Toolkit](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md), [MK Kit Introduction](../02-ai-in-sdlc/02-mk-kit-introduction.md), [Kiro + MK Kit](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md), [MK Observe](../02-ai-in-sdlc/05-mk-observe-agent-metrics.md).

## Hiện trạng làm tiền đề

| Hạng mục | Hiện trạng |
|---|---|
| Tool AI cho team dự án | **Kiro** (repo), **Rovo** (Jira/Confluence), **M365 Copilot** (Teams, Mail, Calendar, Office) |
| Bộ MK | Có sẵn từ trước, không phải tài sản do tổ chức F cấp; đưa vào dùng như bộ quy trình chạy trên Kiro |
| Jira, Confluence | Cloud; MCP chưa được bật, tạm nối bằng CLI chạy tại máy từng người với token cá nhân |
| Guide đã có | DevOps đã soạn vài trang Confluence hướng dẫn dùng Kiro cho unit test và test case, mức **cài đặt + prompt instruction**, chưa thành bộ công cụ |
| Mốc | Cuối tháng 10: đủ material để rollout bốn việc |

## Điều cần được duyệt

1. Phạm vi: bốn việc dev là lõi; role khác chỉ nhận bảng đề xuất tool và ý tưởng (01).
2. Hướng công cụ: nâng guide prompt hiện có thành skill trong MK, thay vì giữ hai hệ song song (03).
3. Phía khách cấp license Kiro và Rovo cho thành viên team dự án, và xác nhận M365 Copilot cấp tới role nào; team DevOps đã có sẵn để research (04, chặng 1).
4. Team dự án cử người và nộp artifact mẫu trước khi DevOps tuỳ biến kit (04, chặng 2).
