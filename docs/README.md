# AI Workspace Docs for Offshore Teams

Tài liệu tôi chuẩn bị cho việc đưa AI agent vào một dự án offshore, dùng được cho bất kỳ đơn vị tương tự: năng lực đã có, bộ công cụ đang chạy, và concept triển khai ở quy mô doanh nghiệp. Tên file và tiêu đề bằng tiếng Anh, nội dung tiếng Việt.

## Thứ tự đọc

| # | Nhóm | Trả lời câu hỏi | Bắt đầu từ |
|---|---|---|---|
| 1 | [`01-portfolio/`](01-portfolio/) | Tôi đã xây và vận hành những gì, chứng minh được năng lực nào | [AI Engineering Experience Portfolio](01-portfolio/ai-experience-portfolio.md) |
| 2 | [`02-ai-toolkit/`](02-ai-toolkit/) | Bộ công cụ nào dùng được ngay cho team, hoạt động ra sao, chạy trên harness nào | [AI Toolkit for Offshore Teams](02-ai-toolkit/01-ai-toolkit-offshore-team.md) |
| 3 | [`03-ai-ready-enterprise/`](03-ai-ready-enterprise/) | Muốn agent chạy tin cậy trong doanh nghiệp thì tổ chức dữ liệu, giao diện và vận hành thế nào | [README của bộ concept](03-ai-ready-enterprise/README.md) |

Nhóm 1 là *bằng chứng*, nhóm 2 là *công cụ đã có*, nhóm 3 là *cách tổ chức để công cụ đó chạy được ở quy mô công ty*. Mỗi nhóm đọc độc lập được; chỗ nào cần chi tiết thì link sang nhau, không kể lại.

## Nhóm 1: Portfolio

| Tài liệu | Nội dung |
|---|---|
| [AI Engineering Experience Portfolio](01-portfolio/ai-experience-portfolio.md) | 8 sản phẩm chạy thật (MCP servers, my-db-mate, my-crew, my-notebook, my-dandori, my-kioku, scan-to-ebook) đối chiếu với nhiệm vụ AI Engineer điển hình |

## Nhóm 2: AI Toolkit

| # | Tài liệu | Nội dung |
|---|---|---|
| 01 | [AI Toolkit for Offshore Teams](02-ai-toolkit/01-ai-toolkit-offshore-team.md) | Mindset Context Engineering, cấu trúc project folder, Claude Code + MK + 3 MCP server, 10 workflow skill cho dev và PM/PO/BrSE, lộ trình nhân bản |
| 02 | [MK Kit Introduction](02-ai-toolkit/02-mk-kit-introduction.md) | Bên trong bộ MK: agents, skills, hooks, rules; vòng đời một session; lệnh hay dùng; lưu ý nâng cấp |
| 03 | [Agent Kit Portability: Claude Code, Kiro, OpenCode](02-ai-toolkit/03-agent-kit-multi-harness-kiro-opencode.md) | Cách chạy bộ MK trên Kiro và OpenCode; kiến trúc một nguồn nhiều đích; phần Kiro đã kiểm chứng trên CLI 2.21 engine v2 |
| 04 | [Kiro + MK Kit for the Dev Team: Decision Brief](02-ai-toolkit/04-kiro-mk-kit-decision-brief.md) | Cho lãnh đạo và tech lead khi khách hàng yêu cầu Kiro: Kiro trần hay Kiro + MK, 5 lý do, rủi ro, pilot 2 tuần với 4 chỉ số |
| 05 | [Kiro + MK Kit: Engineering Guide](02-ai-toolkit/05-kiro-mk-kit-engineering-guide.md) | Cài, dùng, bảo trì MK trên Kiro: kiến trúc, 10 lệnh, hook qua adapter, biến môi trường, việc còn lại trước pilot, giới hạn |
| 06 | [MK Observe: Agent Activity Metrics Across Harnesses](02-ai-toolkit/06-mk-observe-agent-metrics.md) | Đo agent làm việc thế nào trên Claude Code, OpenCode, Kiro từ log sẵn có: bốn chiều điểm, token theo model, mức dùng kit, insights, sức khoẻ hook, store bền, daemon; nguồn số cho bốn chỉ số pilot Kiro |
| 07 | [MK Observe 1.3: Token Usage, Kit Adoption and Insights](02-ai-toolkit/07-mk-observe-1-3-token-adoption-insights.md) | Thay đổi so với bản 1.2: token theo model thay cho chi phí, đo mức dùng kit, tab Insights, cách nâng cấp, nhịp đọc hằng tuần cho quản lý |

## Nhóm 3: AI-Ready Enterprise

Bộ concept ba trụ cột (harness sẵn có, dữ liệu AI-ready, giao diện cho agent), chia hai nhánh: `leadership/` cho người ra quyết định, `engineering/` cho người làm, kèm playbook từng nguồn dữ liệu và diagram. Thứ tự đọc theo vai trò nằm trong [README của bộ](03-ai-ready-enterprise/README.md).

## Đọc theo vai trò

| Bạn là | Đọc |
|---|---|
| Lãnh đạo, người duyệt ngân sách | Nhóm 3 `leadership/`, rồi nhóm 1 mục 1 và 10; nếu khách hàng yêu cầu Kiro, thêm nhóm 2 tài liệu 04 |
| Tech lead, PM kỹ thuật | Nhóm 2 tài liệu 01 và 04, nhóm 3 `leadership/` rồi `engineering/` 01, 09, 03, 04; người sở hữu kit đọc thêm nhóm 2 tài liệu 06 và 07 |
| Kỹ sư sắp dùng bộ kit | Nhóm 2 theo thứ tự 01, 02, 03; dự án dùng Kiro đọc thêm 05; muốn xem số liệu phiên của mình đọc 06 |
| Kỹ sư dữ liệu, người vận hành agent | Nhóm 3 `engineering/` và `engineering/sources/` |

## Quy ước

- Tên file và tiêu đề H1 tiếng Anh, nội dung tiếng Việt, tiền tố số cho thứ tự đọc.
- Mỗi thông tin sống ở một chỗ, tài liệu khác link tới thay vì lặp lại.
- Diagram trong nhóm 3 sinh từ spec JSON bằng archify; sửa spec rồi render lại, không sửa tay HTML/SVG.
- Case study không chứa giá trị đo, tình trạng sức khỏe, tên, địa điểm hay định danh kênh.
