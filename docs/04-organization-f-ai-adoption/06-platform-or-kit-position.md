# Position: Invest in Kits and Data, Not a New Harness

Cập nhật 2026-09-28. Đọc sau [README](README.md). Tài liệu lưu **một đề xuất chưa được duyệt**: tổ chức F nên đầu tư vào đâu khi muốn nâng automation level của AI trong phát triển phần mềm. Người đọc dự kiến là người quyết định phân bổ nguồn lực giữa các team AI của tổ chức, và team kit.

Tên riêng của sản phẩm, hệ thống, chuẩn tài liệu và công cụ nội bộ đã được thay bằng mô tả chung. Bản tổng quát cho mọi tổ chức, không gắn với bối cảnh này: [Standardize and Connect Instead of Building an AI Platform](../01-ai-ready-enterprise/leadership/03-standardize-and-connect-instead-of-building-a-platform.md).

## 1. Bối cảnh

### 1.1 Mục tiêu tự động hoá của tổ chức F

Tổ chức F đặt mục tiêu "AI-First" cho cả Ops và Dev. Automation level được đo trên thang năm mức:

| Mức | Tên | Nghĩa | Ai dẫn dắt |
|---|---|---|---|
| L5 | Autonomous | Nhận mục tiêu, AI tự lập kế hoạch, tự làm, tự báo cáo | AI |
| L4 | Approval | AI tự đề xuất và làm cả chuỗi việc, người chỉ duyệt | AI |
| L3 | Collaborative | AI vừa làm vừa hỏi người, ra sản phẩm cụ thể từ mục tiêu còn mơ hồ | Ranh giới |
| L2 | Instructed | AI làm theo chỉ thị cụ thể | Người |
| L1 | Assistive | AI hỗ trợ từng thao tác nhỏ | Người |

Với phía Dev, mục tiêu kỳ sau là: basic design và detail design đạt **L3** (AI cùng viết, cùng review nội dung), coding/unit test và testing đạt **L4** (AI tự sinh draft, tự chạy, người approve). Planning và requirements definition giữ ở mức thấp hơn.

### 1.2 Hai team được giao

| Team | Việc được giao |
|---|---|
| Team platform | Xây một **Centralized AI Dev Platform** (gọi tắt: platform) chạy trên cloud, phục vụ toàn tổ chức |
| Team kit | Làm **kit** (skill, workflow, connector) cho các harness phổ biến như Claude Code, Kiro |

### 1.3 Platform được mô tả thế nào

Kiến trúc gồm bốn layer:

1. **Context engine và knowledge base**: quản lý context dự án tập trung (RAG, vector DB), index toàn bộ spec (SRS, basic design, detail design theo chuẩn tài liệu của tổ chức), source code knowledge graph trên nhiều chục repo với quy mô hàng triệu LOC, RBAC theo dự án và role.
2. **Multi-agent orchestration**: chuỗi agent chuyên trách từng khâu: requirements analysis → design → code generation → review → test generation và execution.
3. **Integration qua MCP**: nối hai chiều với Jira, GitHub, Confluence, tool UI/UX design, tool monitoring, và một module test automation chuyên dụng.
4. **Governance và quality gate**: quy trình 3-layer Generate → Verify → Approve (human gate); guardrail chống prompt injection, sandbox; full audit trail; cost dashboard LLM theo dự án và user.

Mười ba feature chia hai nhóm:
- **Nhóm common**: Q&A có citation, code search và reverse engineering code legacy, human gate, RBAC, cost dashboard.
- **Nhóm development lifecycle**: requirements definition (sinh SRS), sinh basic design và detail design, code generation kèm unit test, automated code review, test case design, automated test execution kèm evidence pack, giao trọn một feature bằng một lệnh (spec → ticket → code → test → draft PR), change impact analysis giữa các service.

Tài liệu của platform lập luận rằng một IDE harness như Kiro, **kể cả khi đã nối knowledge base**, vẫn khác về bản chất:

| Tiêu chí | IDE harness (theo tài liệu platform) | Platform (theo tài liệu platform) |
|---|---|---|
| Automation level | L3: interactive, dev prompt từng bước (turn-by-turn) | L4: tự chain SRS → code → test → PR, người chỉ review/approve |
| Deployment | Tool cá nhân, phụ thuộc kỹ năng prompt từng người | Tập trung trên cloud, gắn vào CI/CD, Jira, GitHub |
| Task scope | Task rời rạc | End-to-end delivery |
| System scope | Single repo, active files | Multi-repo, change impact map giữa các service |
| Quality gate | Không có human gate bắt buộc, thiếu audit log tập trung | 3-layer quality gate, audit trail, RBAC |
| Tích hợp tool chuyên sâu | Giới hạn trong môi trường test local | Điều phối module test automation của doanh nghiệp |

Kết luận của tài liệu đó: IDE harness là "trợ lý cá nhân của lập trình viên", còn platform là "dây chuyền sản xuất phần mềm tự động".

## 2. Đề xuất

Một agent làm việc thật gồm bốn phần: **harness + LLM + kit + infrastructure**. Platform, xét cho cùng, cũng là bốn phần này, chỉ khác ở chỗ tự viết lại harness.

Đề xuất:

1. **Harness và LLM thì mua.** Chọn harness tốt, LLM tốt từ vendor lớn hoặc open source đang phát triển nhanh.
2. **Doanh nghiệp đầu tư vào thứ bên ngoài không có**: trích xuất tài nguyên nội bộ thành **kit AI-ready** (skill, workflow, template, checklist, connector, guardrail) và **data source AI-ready** (document index, code graph, dữ liệu dự án có RBAC).
3. **Kit và data source viết trung lập với harness.** Gắn vào harness nào cũng được. Khi lên cloud, chính harness đó chạy headless trên server, dùng lại nguyên các tài nguyên này.
4. **Platform thu hẹp lại, không dừng hẳn**: giữ data layer và governance layer, bỏ phần tự viết lại orchestration layer.

Hướng này khớp với thứ tự đầu tư **data → interface → harness** trong [proposal ba trụ cột](../01-ai-ready-enterprise/leadership/01-three-pillars-proposal.md): model đổi được trong một dòng cấu hình; dữ liệu và dây nối thì không ai làm thay được.

## 3. Vì sao không tự viết harness

- **Tốc độ.** Vendor harness lớn và cộng đồng open source ra feature theo tháng: subagent, skill, hook, sandbox, chạy headless, SDK. Một harness tự viết phải đuổi theo mãi, và mỗi lần đuổi là công sức không tạo ra khác biệt.
- **Phép thử mất giá.** Với mỗi hạng mục, hỏi: *"Nếu quý sau vendor ra đúng feature này, khoản đầu tư của mình có mất trắng không?"*
  - Agent orchestration layer, chat UI: **mất**.
  - Code graph của hệ thống nội bộ, template theo chuẩn tài liệu của tổ chức, checklist review, connector tới tool nội bộ: **không mất**, vì bên ngoài không có.
- **Automation level là tính chất của workflow, không phải của tool.** Cùng một harness, cho dừng hỏi người ở mỗi bước thì là L3; cho chạy trọn một chuỗi skill rồi trình draft ở approval gate cuối thì là L4.

## 4. Bảng so sánh của platform đang so sai đối tượng

Bảng ở mục 1.3 đặt **harness dùng tương tác trong IDE** cạnh **một platform chạy trên server**. Tức là nó so hai cách triển khai, không so harness với platform. Nếu so harness chạy headless kèm kit với platform tự viết, từng dòng đổi như sau:

| Dòng | Thực tế |
|---|---|
| L3 so với L4 | Như mục 3: automation level do workflow quyết định. Agent kit hiện chủ động dừng để hỏi người (L3) vì đó là design choice, không phải do harness giới hạn |
| Tool cá nhân so với cloud | Harness hiện nay chạy được trên server: Claude Code có chế độ non-interactive, Agent SDK và tích hợp GitHub Actions; Kiro CLI có chế độ `--no-interactive`, đã chạy thử thực tế ([Kiro + MK Kit](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md)) |
| Task rời so với end-to-end | "Một lệnh giao trọn feature" là một skill chain workflow, tức phần kit. Kit hiện đã có lệnh slash cho từng loại tài liệu |
| Single repo so với multi-repo | Đây là vấn đề **dữ liệu**. Code graph nhiều repo phơi ra qua CLI hoặc MCP thì harness nào cũng dùng được. Dòng này ủng hộ đề xuất, không bác nó |
| Không có gate, không có audit | Human gate đã có: PR review, branch protection, hook của harness. **Audit tập trung là khoảng trống thật** (Kiro lưu session log local trên máy từng người), nhưng lấp bằng một layer mỏng: LLM gateway, telemetry của harness, thu log về một chỗ |
| Không tích hợp tool chuyên sâu | Nối tool qua CLI hoặc MCP chính là connector trong kit. CLI cho Jira và Confluence đã chứng minh cách này khi MCP chưa được bật |

Kết luận "trợ lý cá nhân" so với "dây chuyền sản xuất" vì vậy không đứng vững: cùng một harness có thể là cả hai, tuỳ nó chạy ở đâu và chạy workflow nào.

## 5. Bốn layer của platform, tách theo bản chất

| Layer | Bản chất | Nên làm gì |
|---|---|---|
| 1. Context engine và knowledge base | **Data source AI-ready** | **Làm.** Đây là tài sản bên ngoài không có |
| 2. Multi-agent orchestration | **Viết lại harness** | **Không làm.** Dùng subagent, skill chain, headless của harness có sẵn |
| 3. Integration | **Connector trong kit** | **Làm**, viết trung lập với harness (CLI hoặc MCP) |
| 4. Governance, quality gate | Shared infrastructure | **Mua hoặc cấu hình**: gate qua GitHub, guardrail qua hook và sandbox của harness, cost và audit qua LLM gateway hoặc console của vendor |

**Ba trên bốn layer của chính platform đã trùng với đề xuất này.** Phần tự viết lại harness dồn vào layer 2, cộng thêm chat UI.

## 6. Mười ba feature, xếp theo loại công việc

| Loại | Feature | Ai làm |
|---|---|---|
| Skill hoặc workflow | Requirements definition (sinh SRS); sinh basic design và detail design; code generation kèm unit test; automated code review; test case design; giao trọn feature bằng một lệnh | Team kit |
| Data source kèm skill | Code search và reverse engineering code legacy; change impact analysis giữa các service; Q&A có citation | Team platform làm data, team kit làm skill dùng data |
| Governance, CI | Human gate; RBAC; cost dashboard; automated test execution kèm evidence pack | Mua hoặc cấu hình, CI đính evidence pack vào PR |

Không feature nào bắt buộc phải có harness tự viết. Agent kit cho tài liệu waterfall hiện có đã có bản đầu cho basic design, detail design, API spec, test case và unit test cho code có sẵn ([Kiro + MK Kit, mục 12c](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md)).

## 7. Điểm yếu của đề xuất và cách bù

| Điểm yếu | Cách bù |
|---|---|
| **"Gắn vào harness nào cũng được" chỉ đúng phần lớn, không trọn vẹn.** Định dạng skill đang dần chung, nhưng file rule/steering, format hook, cách chọn agent khác nhau giữa các harness | Kit tách **core trung lập + adapter mỏng cho từng harness**, như mô hình đã áp dụng ở [Agent Kit Portability](../02-ai-in-sdlc/03-agent-kit-multi-harness-kiro-opencode.md). Không hứa "100% portable" |
| **Governance tập trung là nhu cầu thật của cấp quản lý.** Bỏ trống thì platform thắng ở đúng chỗ này | Đưa ra phương án cụ thể: LLM gateway cho cost và audit, telemetry của harness, dựng trên dịch vụ có sẵn |
| **L4 chạy trên server cần license khác.** License dùng trong IDE không nhất thiết cho phép chạy trong CI; có thể cần API key hoặc tài khoản LLM trên cloud | Nêu chi phí và thủ tục này ngay từ đầu, không để phát hiện muộn |
| **Chạy tự động không người giám sát cần guardrail, và việc này tốn công.** Kinh nghiệm thật: prompt không kích hoạt skill nào là prompt dễ gây phá hoại; một thao tác xoá qua API có thể không bị hệ thống đích chặn dù đối tượng đang dùng | Team kit nhận luôn **cấu hình guardrail** (permission, hook, sandbox, deny list) như một phần của kit |
| **Bằng chứng còn mỏng.** Hơn một nửa số skill của agent kit chưa chạy trên dự án thật | Chạy PoC trên một hệ thống có sẵn trước khi trình (mục 9) |

## 8. Phân vai đề xuất

| Hạng mục | Team platform | Team kit | Mua hoặc cấu hình |
|---|---|---|---|
| Spec index, multi-repo code graph, RBAC dữ liệu | ✓ | | |
| Expose data qua CLI hoặc MCP | ✓ | dùng | |
| Skill, workflow, template, checklist | | ✓ | |
| Connector tới tool nội bộ | | ✓ | |
| Guardrail (permission, hook, sandbox) | | ✓ | |
| Adapter cho từng harness | | ✓ | |
| Harness, LLM | | | ✓ |
| LLM gateway (cost, audit), telemetry | cấu hình | | ✓ |
| Human gate, evidence pack trên PR | | workflow | GitHub, CI |

Cách chia này giữ việc cho cả hai team, tránh phần viết lại harness, và cả hai cùng tạo ra thứ dùng lại được ở mọi harness, kể cả khi sau này lên cloud.

## 9. Bằng chứng cần có trước khi trình

1. Chạy chuỗi basic design → detail design → unit test trên **một hệ thống có sẵn** của team dự án, ghi thời gian và số lỗi review so với làm tay.
2. Chạy cùng chuỗi đó **headless** một lần, có approval gate cuối, để chứng minh mức L4 không cần harness tự viết.
3. Chạy cùng kit trên **hai harness**, ghi phần phải sửa ở adapter.
4. Dựng thử một LLM gateway ghi cost và log theo user, đủ để trả lời câu hỏi governance.

## Câu hỏi mở

- Team platform đã đầu tư tới đâu ở orchestration layer? Nếu đã nhiều, phần nào chuyển sang data layer được?
- Điều khoản license của harness hiện dùng có cho chạy headless trong CI không, hay cần tài khoản API riêng?
- Yêu cầu về data residency và LLM được phép dùng của phía khách có loại trừ harness nào không?
- Ai sở hữu LLM gateway và dữ liệu audit: team platform, team infra, hay đơn vị governance?
