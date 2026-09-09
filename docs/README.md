# AI Workspace Docs for Offshore Teams

Tài liệu tôi chuẩn bị cho hai mục tiêu công việc, dùng được cho bất kỳ đơn vị tương tự. Tên file và tiêu đề bằng tiếng Anh, nội dung tiếng Việt.

| Mục tiêu | Là gì | Ưu tiên |
|---|---|---|
| **Mục tiêu 1** | Giúp team dev của các dự án dùng AI hiệu quả trong mọi công đoạn SDLC | Hiện tại |
| **Mục tiêu 2** | Đề xuất, tư vấn, thiết kế tính năng AI cho sản phẩm và hệ thống của khách hàng | Chuẩn bị nền tảng song song |

## Bốn nhóm tài liệu

| # | Nhóm | Phục vụ | Trả lời câu hỏi | Trạng thái |
|---|---|---|---|---|
| 00 | [`00-foundations/`](00-foundations/) | Cả hai | Tôi đã xây gì, tin vào nguyên tắc nào, mindset nào đứng sau mọi thứ còn lại | Portfolio và mindset xong; 1 tài liệu giữ chỗ |
| 01 | [`01-ai-ready-enterprise/`](01-ai-ready-enterprise/) | Cả hai | Muốn agent chạy tin cậy trên dữ liệu và hệ thống thật thì tổ chức dữ liệu, giao diện, harness, vận hành thế nào | Xong |
| 02 | [`02-ai-in-sdlc/`](02-ai-in-sdlc/) | Mục tiêu 1 | Bộ công cụ nào dùng được ngay cho team dev, hoạt động ra sao, chạy trên harness nào, đo thế nào, role nào dùng tool nào | 6 tài liệu xong; 2 giữ chỗ |
| 03 | [`03-ai-features-for-clients/`](03-ai-features-for-clients/) | Mục tiêu 2 | Từ vấn đề của khách đi tới proposal, mẫu giải pháp, đánh giá chất lượng, chi phí | Toàn bộ giữ chỗ |

Hai nhóm đầu là *nền chung*, hai nhóm sau là *cách làm cho từng mục tiêu*. Mỗi nhóm đọc độc lập được; chỗ nào cần chi tiết thì link sang nhau, không kể lại. Tài liệu giữ chỗ có dòng đầu ghi **Chưa viết** kèm vai trò dự kiến.

## Đọc theo mục tiêu

**Mục tiêu 1, team dev dùng AI trong SDLC**

1. [Context Engineering Mindset](00-foundations/context-engineering-mindset.md), rồi [AI Toolkit for Offshore Teams](02-ai-in-sdlc/01-ai-toolkit-offshore-team.md): bức tranh tổng thể, bộ công cụ, use case theo vai trò.
2. [MK Kit Introduction](02-ai-in-sdlc/02-mk-kit-introduction.md): bộ quy trình bên trong hoạt động ra sao.
3. Tuỳ harness của dự án: [Agent Kit Portability](02-ai-in-sdlc/03-agent-kit-multi-harness-kiro-opencode.md), và [Kiro + MK Kit](02-ai-in-sdlc/04-kiro-mk-kit-guide.md) khi khách yêu cầu Kiro.
4. [MK Observe](02-ai-in-sdlc/05-mk-observe-agent-metrics.md): đo agent và mức dùng kit bằng số.
5. Khi đơn vị dùng cả Rovo lẫn Kiro: [Role, Task and Tool Mapping](02-ai-in-sdlc/08-role-task-tool-mapping-rovo-kiro-mk.md) chia việc của từng role cho Rovo, Kiro + MK và workflow skill.
6. Khi mở rộng sang tri thức dự án (Jira, Confluence, Slack, spec, biên bản họp): nhóm 01, bắt đầu từ [playbook từng nguồn](01-ai-ready-enterprise/engineering/09-data-source-playbook.md).

**Mục tiêu 2, tính năng AI cho khách hàng**

1. [Context Engineering Mindset](00-foundations/context-engineering-mindset.md) mục 3 và 5, [Engineering Principles for AI Systems](00-foundations/engineering-principles-for-ai-systems.md) *(giữ chỗ)* và [Portfolio](00-foundations/ai-experience-portfolio.md) mục 9 và 10: nguyên tắc và bằng chứng mang vào proposal.
2. Nhóm 01 theo thứ tự [leadership](01-ai-ready-enterprise/leadership/) rồi [engineering](01-ai-ready-enterprise/engineering/) 01, 03, 04, 05, 06, 07: khung kiến trúc và nghiệm thu cho một tính năng AI chạy trên dữ liệu thật; [case study](01-ai-ready-enterprise/engineering/08-case-study-health-coach.md) là một agent nghiệp vụ hoàn chỉnh.
3. Nhóm 03 khi đã viết: [quy trình tư vấn](03-ai-features-for-clients/01-consulting-process-from-problem-to-proposal.md), [catalogue mẫu giải pháp](03-ai-features-for-clients/02-solution-pattern-catalogue.md), [đánh giá tính năng LLM](03-ai-features-for-clients/03-llm-feature-evaluation.md), [mô hình chi phí](03-ai-features-for-clients/04-cost-model-and-model-selection.md), [mẫu proposal](03-ai-features-for-clients/05-proposal-template.md).

**Dùng chung cho cả hai:** [Context Engineering Mindset](00-foundations/context-engineering-mindset.md) là tài liệu đọc đầu tiên; ba trụ cột và thứ tự đầu tư dữ liệu → giao diện → harness trong [proposal ba trụ cột](01-ai-ready-enterprise/leadership/01-three-pillars-proposal.md); ba MCP server vừa là công cụ cho team vừa là mẫu giao diện hẹp cho agent.

## Đọc theo vai trò

| Bạn là | Đọc |
|---|---|
| Lãnh đạo, người duyệt ngân sách | Nhóm 01 `leadership/`, rồi Portfolio mục 1 và 10; đơn vị dùng Rovo và Kiro đọc thêm nhóm 02 tài liệu 08 mục 1 đến 3; nếu khách hàng yêu cầu Kiro, thêm [Kiro + MK Kit](02-ai-in-sdlc/04-kiro-mk-kit-guide.md) phần A |
| Tech lead, PM kỹ thuật | Nhóm 02 tài liệu 01, 04 và 08, nhóm 01 `leadership/` rồi `engineering/` 01, 09, 03, 04; người sở hữu kit đọc thêm nhóm 02 tài liệu 05 |
| Kỹ sư sắp dùng bộ kit | Nhóm 02 theo thứ tự 01, 02, 03; dự án dùng Kiro đọc thêm 04 phần B; muốn xem số liệu phiên của mình đọc 05 |
| Kỹ sư dữ liệu, người vận hành agent | Nhóm 01 `engineering/` và `engineering/sources/` |
| Người chuẩn bị proposal tính năng AI cho khách | Lộ trình mục tiêu 2 ở trên |

## Quy ước

- Tên file và tiêu đề H1 tiếng Anh, nội dung tiếng Việt, tiền tố số cho thứ tự đọc.
- Mỗi thông tin sống ở một chỗ, tài liệu khác link tới thay vì lặp lại.
- Tài liệu giữ chỗ mở đầu bằng khối trích dẫn **Chưa viết**, ghi mục tiêu phục vụ, người đọc, câu hỏi sẽ trả lời và nguồn có sẵn để rút; khi viết xong thì bỏ khối đó.
- Diagram trong nhóm 01 sinh từ spec JSON bằng archify; sửa spec rồi render lại, không sửa tay HTML/SVG.
- Case study không chứa giá trị đo, tình trạng sức khỏe, tên, địa điểm hay định danh kênh.
