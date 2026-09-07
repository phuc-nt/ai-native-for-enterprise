# Enterprise AI Adoption: Ready-Made Harness · AI-Ready Data · Agent Interfaces

Bộ tài liệu trình bày concept tôi đề xuất cho việc đưa AI agent vào vận hành
thật ở công ty, và cách kiểm chứng nó bằng một hệ thống đang chạy. Concept gói
trong ba trụ cột:

1. **Harness sẵn có** — dùng Claude Code, OpenClaw, OpenCode… làm hạ tầng
   agent; cấu hình, không tự viết.
2. **Dữ liệu AI-friendly, AI-ready** — biến nơi lưu tri thức (Jira, Confluence,
   Slack, Git, DB hệ thống khách, spec Nhật, biên bản họp, và ngữ cảnh trong
   đầu PM/BrSE) thành thứ agent dùng được ngay, có nguồn gốc.
3. **Kết nối và giao diện** — CLI, MCP, API với hợp đồng hẹp, trả JSON kèm ngữ
   cảnh, tách đọc/ghi.

Ba động từ: **mua** harness, **xây** dữ liệu, **nối** bằng giao diện hẹp. Thứ
tự đầu tư ngược với thứ tự kể chuyện: **dữ liệu → giao diện → harness**.

Bộ này là nền chung cho cả hai mục tiêu trong [docs/README.md](../README.md):
với team dev (nhóm 02) nó là cách tổ chức tri thức dự án để [bộ công cụ đã
có](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md) chạy tin cậy; với tính năng AI cho khách
(nhóm 03) nó là khung kiến trúc, bảo mật và nghiệm thu của một agent chạy trên
dữ liệu thật. Bằng chứng năng lực ở [Hồ sơ kinh nghiệm AI
Engineering](../00-foundations/ai-experience-portfolio.md).

## Đọc gì, theo vai trò

| Bạn là | Đọc | Thời gian |
|---|---|---|
| Lãnh đạo, quản lý đơn vị, người duyệt ngân sách | [`leadership/`](leadership/) — 2 tài liệu | 20 phút |
| Kỹ sư dữ liệu, kỹ sư tích hợp, người vận hành agent | [`engineering/`](engineering/) — 9 tài liệu + playbook từng nguồn | 3 giờ |
| Cả hai (PM kỹ thuật, tech lead) | `leadership/` trước, rồi `engineering/` 01, 09, 03, 04 | 1 giờ |
| Người làm một nguồn cụ thể (Jira, Slack, spec Nhật…) | `engineering/` 01, 09, rồi file nguồn đó trong [`engineering/sources/`](engineering/sources/) | 30 phút |

Hai nhánh không lặp nhau: nhánh lãnh đạo nói *vì sao, quyết định gì, tốn gì,
rủi ro gì*; nhánh kỹ thuật nói *làm thế nào, nghiệm thu bằng gì*. Chỗ nào
cần chi tiết, nhánh lãnh đạo link sang nhánh kỹ thuật thay vì kể lại.

### Nhánh lãnh đạo

| # | Tài liệu | Trả lời |
|---|---|---|
| 01 | [Proposal: Enterprise AI Adoption on Three Pillars](leadership/01-three-pillars-proposal.md) | Vấn đề là gì, làm gì, không làm gì, vì sao tin được, cần quyết định gì |
| 02 | [Roadmap, Resources, Governance and Risks](leadership/02-roadmap-resources-risks.md) | Sáu giai đoạn pilot, vai trò, ai sở hữu gì, rủi ro và KPI |

### Nhánh kỹ thuật

| # | Tài liệu | Trụ cột |
|---|---|---|
| 01 | [AI-Friendly and AI-Ready Data](engineering/01-ai-ready-data.md) | 2 |
| 02 | [Harness and Frontends](engineering/02-harness-and-frontends.md) | 1 |
| 03 | [Interfaces for Agents](engineering/03-agent-interfaces.md) | 3 |
| 04 | [Design Patterns](engineering/04-design-patterns.md) | 1·2·3 |
| 05 | [Technical Security](engineering/05-technical-security.md) | 1·3 |
| 06 | [Operations and the Improvement Loop](engineering/06-operations-and-improvement-loop.md) | 1 |
| 07 | [Phase-by-Phase Acceptance](engineering/07-phase-acceptance.md) | 1·2·3 |
| 08 | [Case Study: Personal Health Coach](engineering/08-case-study-health-coach.md) | ví dụ xuyên suốt |
| 09 | [AI-Friendly / AI-Ready Playbook per Data Source](engineering/09-data-source-playbook.md) | 2 |

### Playbook từng nguồn (`engineering/sources/`)

Cùng khung tám mục: khó ở đâu → lớp 1–4 → lệnh/tool → nghiệm thu → bẫy.

| Nguồn | File | Ưu tiên pilot |
|---|---|---|
| Jira | [jira.md](engineering/sources/jira.md) | 1 |
| Ngữ cảnh PM/BrSE | [pm-brse-context.md](engineering/sources/pm-brse-context.md) | 1 |
| Slack | [slack.md](engineering/sources/slack.md) | 2 |
| Confluence | [confluence.md](engineering/sources/confluence.md) | 2 |
| Git / GitHub | [git-github.md](engineering/sources/git-github.md) | 3 |
| Tài liệu Nhật (Excel/Word/PDF) | [japanese-spec-documents.md](engineering/sources/japanese-spec-documents.md) | 3 |
| Biên bản họp / transcript | [meeting-minutes-transcripts.md](engineering/sources/meeting-minutes-transcripts.md) | 3 |
| DB hệ thống khách | [customer-system-database.md](engineering/sources/customer-system-database.md) | 4 |
| Source code / `00_context` | [source-code-00-context.md](engineering/sources/source-code-00-context.md) | đang dùng |

## Ví dụ xuyên suốt

Toàn bộ concept được kiểm chứng trên một hệ thống tôi đang chạy thật: một
coach sức khỏe cá nhân đọc dữ liệu thiết bị đeo, trả lời qua Telegram, chạy
trên OpenClaw, bảo trì bằng Claude Code. Nó nhỏ, nhưng có đủ mọi vấn đề của
doanh nghiệp: nguồn khó lấy, phiên đăng nhập hết hạn, ngữ cảnh chỉ người dùng
biết, dữ liệu không được rời máy, agent phải chạy 24/7 không người trông.

Tài liệu chỉ giữ kiến trúc, hợp đồng và bài học; **không** chứa giá trị đo,
tình trạng sức khỏe, tên, địa điểm hay định danh kênh.

## Diagram

Vẽ bằng bộ archify (spec JSON → HTML tương tác → SVG). Sửa spec rồi render
lại, không sửa tay HTML/SVG. Chrome của bản tương tác là tiếng Anh, nội dung
tiếng Việt.

| Diagram | Dùng trong | Spec | Xem |
|---|---|---|---|
| Ba trụ cột | leadership/01 | [json](diagrams/enterprise-ai-three-pillars.architecture.json) | [svg](diagrams/enterprise-ai-three-pillars.architecture.svg) · [html](diagrams/enterprise-ai-three-pillars.architecture.html) |
| Bậc thang tri thức bốn lớp | engineering/01 | [json](diagrams/enterprise-ai-knowledge-ladder.dataflow.json) | [svg](diagrams/enterprise-ai-knowledge-ladder.dataflow.svg) · [html](diagrams/enterprise-ai-knowledge-ladder.dataflow.html) |
| Một lượt hỏi-đáp của agent | engineering/03 | [json](diagrams/enterprise-ai-agent-turn.sequence.json) | [svg](diagrams/enterprise-ai-agent-turn.sequence.svg) · [html](diagrams/enterprise-ai-agent-turn.sequence.html) |
| Ranh giới tin cậy | leadership/02, engineering/05 | [json](diagrams/enterprise-ai-trust-boundaries.architecture.json) | [svg](diagrams/enterprise-ai-trust-boundaries.architecture.svg) · [html](diagrams/enterprise-ai-trust-boundaries.architecture.html) |
| Vòng cải tiến từ transcript | engineering/06 | [json](diagrams/enterprise-ai-improvement-loop.workflow.json) | [svg](diagrams/enterprise-ai-improvement-loop.workflow.svg) · [html](diagrams/enterprise-ai-improvement-loop.workflow.html) |

## Gợi ý trình bày 20 phút cho lãnh đạo

| Phút | Nội dung | Tài liệu |
|---|---|---|
| 0–3 | Dự án AI chết ở dữ liệu, không ở model | leadership/01 §Vấn đề |
| 3–8 | Ba trụ cột, thứ tự đầu tư, điều không làm | leadership/01 + diagram ba trụ cột |
| 8–10 | Vì sao không chỉ dùng AI có sẵn của từng công cụ | leadership/01 §AI có sẵn |
| 10–12 | Vì sao tin được: công cụ đã chạy trên hệ thống thật, agent nền đang chạy; điều pilot phải chứng minh | leadership/01 §Bằng chứng |
| 12–17 | Lộ trình, vai trò, rủi ro | leadership/02 |
| 17–20 | Cần quyết định gì hôm nay | leadership/01 §Quyết định |
