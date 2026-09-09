# Role, Task and Tool Mapping: Rovo, Kiro + MK

Dành cho người được giao chuẩn hoá cách dùng AI cho một đơn vị nhiều dự án theo mô hình resource center (khách Nhật, đội offshore Việt Nam), nơi PM, PL, PMO, BrSE, BA, developer, tester, QA, architect và comtor dùng chung Jira, Confluence và Slack. Cập nhật 2026-09-09, chiều: bổ sung hiện trạng công cụ của đơn vị.

Đọc trước [AI Toolkit for Offshore Teams](01-ai-toolkit-offshore-team.md) để biết bộ MK và 10 workflow skill; [Kiro + MK Kit](04-kiro-mk-kit-guide.md) để biết bản Kiro của kit. Tiền đề của tài liệu này, theo hiện trạng đơn vị: Jira và Confluence là **Cloud**; đã chọn **Rovo** cho Jira/Confluence và **Kiro** (gói Pro hoặc Pro+ theo nhu cầu) cho việc trong repo, **không dùng Rovo Dev**; Kiro chạy **với bộ MK**; Kiro **chưa được bật MCP** (đơn vị đang hoàn thiện cơ chế quản lý), nên Kiro nói chuyện với Jira và Confluence qua **CLI tự dựng**, chạy tại máy từng người với personal API token; Slack chưa rõ đường nối. Chi tiết và lộ trình chuyển sang MCP ở mục 6. Facts về Rovo và Kiro lấy từ tài liệu công khai đến 2026-09; chỗ nào chưa tự chạy thử ghi **[chưa kiểm chứng]**.

---

## 1. Kết luận 30 giây

Chia tool theo **nơi công việc sống**, không theo chức danh:

| Công việc sống ở đâu | Tool | Ví dụ |
|---|---|---|
| Trong Jira, Confluence, Slack; không đụng repo | **Rovo** (Search, Chat, Agents, AI trong Jira/Confluence) | Tóm tắt yêu cầu, viết user story, tóm tắt họp, tìm tri thức, hỏi trạng thái sprint |
| Trong repo: code, test, CI, tài liệu kỹ thuật | **Kiro + MK** (skill lõi của kit) | Plan, cook, test, review, fix, security, docs |
| Xuyên hai thế giới: từ ticket hoặc thread ra code, từ code ra ticket hoặc báo cáo | **MK workflow skill trên Kiro, gọi CLI Jira/Confluence** (MCP khi được bật) | Story → test case lên Confluence; finding review → Jira bug; sprint → báo cáo song ngữ lên Slack |

Ba hệ quả:

- **Role không đụng repo** (PM, PMO, comtor, phần lớn BA) dùng Rovo là chính; không cần cài Kiro.
- **Role đụng repo** (developer, tester, architect, một phần QA) dùng Kiro + MK là chính; dùng Rovo để đọc ngữ cảnh Jira/Confluence khi cần hỏi đáp tự do ngoài những gì CLI trả về.
- **PL và BrSE** đứng giữa: Rovo cho giao tiếp và tri thức, MK workflow skill cho việc lặp lại mỗi ngày hoặc mỗi sprint (standup, sprint report, status update).

Một use case chỉ có **một tool chính**. Khi cả hai làm được, chọn tool ở nơi đầu ra sẽ được dùng: đầu ra là trang Confluence hoặc ticket thì Rovo; đầu ra là file trong repo thì Kiro.

## 2. Ba công cụ, nhìn từ người dùng cuối

| | Rovo | Kiro | MK trên Kiro |
|---|---|---|---|
| Là gì | AI của Atlassian trong Jira, Confluence, JSM, Slack, Teams: Search, Chat, Agents dựng bằng Rovo Studio, Rovo Dev cho code | IDE và CLI của AWS cho agent viết code: spec, steering, hook, MCP | Bộ quy trình của đơn vị cài lên Kiro: 29 skill lõi, 10 workflow skill Jira/Confluence/Slack, rule, hook chặn, subagent |
| Mạnh ở | Ngữ cảnh toàn bộ Jira/Confluence có sẵn, không cài gì; agent chạy từ automation rule hoặc transition | Làm việc trong repo với quy trình spec → task; hook và steering ép kỷ luật | Cùng quy trình cho mọi người; quality gate; nối tracker và chat vào vòng dev |
| Yếu ở | Không biết repo (Rovo Dev nằm ngoài phạm vi); tiếng Nhật chưa có tài liệu chính thức; tiêu credit theo lượt | MCP chưa được bật trong đơn vị; đọc Jira/Confluence qua CLI tự dựng; slash chỉ ở chế độ tương tác | 10 workflow skill viết cho MCP, phải chuyển sang gọi CLI; credential nằm ở máy từng người |
| Ai dùng | Mọi role có tài khoản Atlassian | Role có repo | Role có repo, cộng PL và BrSE cho workflow báo cáo |
| Cấp phép | Có trong gói Jira/Confluence Cloud, tính bằng credit theo tháng: Standard 25, Premium 70, Enterprise 150 credit mỗi người; Chat và Agent khoảng 10 credit một lượt. Gói của đơn vị chưa xác nhận, **giả định dùng thoải mái** | Pro (1.000 credit) hoặc Pro+ (2.000 credit) theo nhu cầu từng người | Kèm kit, không phí riêng |

Ba điểm về Rovo cần nói với người quyết định trước khi hứa với team:

1. **Cloud.** Đơn vị dùng Jira và Confluence Cloud nên Rovo dùng được đầy đủ, không vướng câu chuyện Data Center. Rovo đọc theo quyền của từng người dùng.
2. **Credit.** Giả định hiện tại là dùng thoải mái, nhưng Rovo vẫn tính credit theo gói và mỗi lượt Chat hoặc Agent tiêu khoảng 10 credit. Việc đầu tiên khi pilot: xác nhận gói và bật theo dõi usage trong Atlassian admin để biết giả định có đúng không trước khi kéo cả đơn vị vào.
3. **Tiếng Nhật.** Không có tài liệu chính thức về chất lượng agent tiếng Nhật; cộng đồng còn đang xin i18n cho agent. Pilot với BrSE và comtor phải đo trước khi chuẩn hoá.

## 3. Nguyên tắc chọn tool

1. **Đầu ra ở đâu, tool ở đó.** Trang Confluence và ticket Jira: Rovo. File trong repo: Kiro + MK. Cả hai: MK workflow skill.
2. **Việc lặp lại theo lịch thì thành skill, không thành prompt.** Standup, sprint report, status update, test case từ story: đã có skill, chạy một lệnh, số liệu chỉ lấy từ Jira đã đọc. Prompt template dùng cho việc không lặp.
3. **Một agent code duy nhất.** Đơn vị đã quyết Kiro only, không dùng Rovo Dev. Mọi việc trong repo, kể cả review và sinh test, đi qua Kiro + MK để có một chuẩn, một bộ log và một chỗ đo.
4. **Dữ liệu khách chỉ đi qua đường đã duyệt.** Rovo đọc Jira/Confluence theo đúng quyền của người dùng, không huấn luyện model bằng dữ liệu khách, pin được data residency về region Nhật. Kiro đọc repo trên máy dev và gọi Jira, Confluence qua CLI với personal API token của chính người đó; hook `scout-block` của MK chặn `.env` và đường dẫn cấm trước mỗi tool call.
5. **Đo bằng số trước khi mở rộng.** Rovo: admin usage của Atlassian. Kiro + MK: [MK Observe](05-mk-observe-agent-metrics.md) cho tỷ lệ chấp nhận, thành công, tự chủ, tin cậy và mức dùng kit.

## 4. Mapping theo role

Mỗi bảng: task đặc thù của role, phần AI làm được, tool chính, và cụ thể dùng gì. Skill MK gọi `/mk-<tên>` trên Kiro (`/mk:<tên>` trên Claude Code).

### 4.1 PM, project manager

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Nắm trạng thái nhiều dự án, trả lời khách nhanh | Tổng hợp từ Jira, Confluence | Rovo | Rovo Chat hỏi theo project; Rovo Search xuyên space |
| Báo cáo tuần và cuối sprint cho khách | Kéo số từ sprint, viết song ngữ | MK | `sprint-report-to-confluence-slack`: Confluence page + Slack Block Kit Nhật Anh |
| Daily standup | Nhóm việc theo người, quét blocker | MK | `daily-standup-report` |
| Đánh giá hiệu suất team theo sprint | Velocity, carry-over, completion | MK | `team-performance-report`; không xếp hạng cá nhân |
| Ước lượng phản hồi yêu cầu mới của khách | Phân rã, trade-off | MK hoặc Rovo | `/mk-brainstorm` khi có repo; Rovo Chat trên Confluence yêu cầu khi chưa có |
| Quyết định phạm vi sprint | Thêm bớt issue, chuyển trạng thái | MK | `jira-sprint-management` |

### 4.2 PL, project leader hoặc team lead

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Phân rã yêu cầu thành epic, story | Từ thread hoặc trang yêu cầu ra ticket | MK | `slack-thread-to-jira-epic`; Rovo "viết user story" trong Jira khi nguồn là Confluence |
| Lập kế hoạch kỹ thuật cho tính năng | Plan chia phase có acceptance criteria | MK | `/mk-plan`, đầu ra `plans/`; dự án làm theo spec Kiro thì dùng spec và hook Sync AIDLC Tasks to Jira đẩy task lên Jira |
| Review code của team | Review theo code standards, evidence | MK | `/mk-code-review`, `/mk-review-pr` |
| Đưa finding review vào tracker | Tạo bug hoặc task theo severity | MK | `code-review-findings-to-jira` |
| Triage bug từ nhiều nguồn | Ghép lịch sử Jira với thảo luận Slack | MK | `cross-tracker-bug-triage` |
| Retro | Chỉ số từ git | MK | `/mk-retro` |

### 4.3 PMO

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Theo dõi KPI và tiến độ toàn đơn vị | Tổng hợp xuyên project | Rovo | Rovo Chat với JQL do agent sinh; dashboard Jira vẫn là nguồn số |
| Chuẩn hoá quy trình, template | Soạn và rà trang chuẩn | Rovo | AI trong Confluence: draft, tóm tắt, so sánh phiên bản |
| Báo cáo định kỳ cho lãnh đạo | Gom số từ nhiều dự án | MK | `team-performance-report` chạy theo từng project, PMO tổng hợp |
| Quản lý biên bản họp và action | Ghi chú, tạo task, theo dõi | Rovo hoặc MK | Rovo agent tóm tắt họp trong Confluence; `meeting-notes-to-actions` khi cần tạo Jira task và xác nhận vào Slack |
| Theo dõi mức dùng AI của các team | Số liệu phiên agent | MK Observe | Kit adoption và bốn chỉ số theo project |

### 4.4 BrSE, bridge engineer

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Đọc và làm rõ spec tiếng Nhật | Tóm tắt, liệt kê điểm mơ hồ, câu hỏi cho khách | Rovo | Rovo Chat trên trang spec; xem [playbook spec tiếng Nhật](../01-ai-ready-enterprise/engineering/sources/japanese-spec-documents.md) khi đưa spec vào bộ tri thức |
| Chuyển trao đổi với khách thành ticket | Thread → epic, story, trang yêu cầu | MK | `slack-thread-to-jira-epic` |
| Status update cho khách bằng kính ngữ | Tiến độ epic, rủi ro, phương án | MK | `stakeholder-status-update` (進捗, 課題, 対応方針) |
| Trả lời hỏi đáp kỹ thuật của khách | Tìm quyết định cũ, lý do thiết kế | Rovo | Rovo Search trong Confluence và Jira comment |
| Xác nhận yêu cầu đã vào code chưa | Đối chiếu acceptance criteria với PR | MK | `/mk-review-pr` với story làm ngữ cảnh |

### 4.5 BA, business analyst

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Tổng hợp yêu cầu từ nhiều nguồn | Requirement summary có nguồn | Rovo | Rovo Chat chế độ deep research trên Confluence và Jira |
| Viết user story và acceptance criteria | Draft theo template | Rovo | AI trong Jira; sửa tay rồi mới đưa vào sprint |
| Rà tính nhất quán giữa spec và story | Tìm mâu thuẫn, thiếu sót | Rovo | Rovo Chat so sánh hai trang |
| Từ story ra test case để BA duyệt | Test case theo AC, truy vết 1:1 | MK | `jira-story-test-case-generation`, tester chạy, BA duyệt trên Confluence |
| Phân tích khả thi với repo hiện có | Trade-off dựa trên code thật | MK | `/mk-brainstorm`, `/mk-research` cùng developer |

### 4.6 Developer

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Hiểu ticket và ngữ cảnh trước khi code | Đọc story, comment, trang liên quan | Kiro + CLI | Kiro gọi CLI Jira/Confluence đọc ticket và trang liên quan; hỏi đáp tự do thì Rovo Chat |
| Thiết kế chi tiết từ yêu cầu | Plan, design có phase | MK | `/mk-plan`; đầu ra là design doc trong `plans/` hoặc spec Kiro |
| Viết code theo plan | Từng phase, quality gate | MK | `/mk-cook` |
| Unit test | Sinh và chạy test, coverage | MK | `/mk-test`; quality gate của `cook` không đóng task khi test fail |
| Sửa bug | Chứng minh nguyên nhân rồi sửa | MK | `/mk-fix`; `cross-tracker-bug-triage` khi cần lịch sử |
| Tự review trước khi mở PR | Review theo code standards | MK | `/mk-code-review` |
| Commit, PR | Conventional commit, quét secret | MK | `/mk-git commit`, `/mk-ship` |
| Cập nhật tài liệu kỹ thuật | Sinh docs từ code | MK | `/mk-docs` |
| Đưa PR vào Jira, báo Slack | Cập nhật story, thông báo | MK | `code-review-findings-to-jira` sau review |

### 4.7 Tester

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Sinh test case từ story | Happy, boundary, negative; truy vết AC | MK | `jira-story-test-case-generation` lên Confluence, link ngược story |
| Sinh test case khi không có repo | Từ story trong Jira | Rovo | Rovo agent sinh test case trong Jira (có sẵn hoặc dựng bằng Rovo Studio) |
| Viết test script tự động | Từ test case ra script trong repo test | MK | `/mk-cook` với test case làm plan; `/mk-test` chạy |
| Review unit test của developer | Độ phủ, case thiếu | MK | `/mk-code-review` tập trung test |
| Báo cáo test cuối sprint | Số pass, fail, bug mở | MK | `/mk-test` báo cáo; `sprint-report-to-confluence-slack` mục test |
| Triage bug lặp | Bug cũ, thảo luận cũ | MK | `cross-tracker-bug-triage` |

### 4.8 QA, quality assurance quy trình

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Audit tuân thủ quy trình của dự án | Đối chiếu artifact với checklist | Rovo | Rovo Chat trên Confluence: tìm thiếu artifact, so với chuẩn |
| Review chất lượng tài liệu | Tính đầy đủ, nhất quán | Rovo | AI trong Confluence |
| Rà bảo mật code định kỳ | STRIDE, OWASP, secret | MK | `/mk-security`, `/mk-security-scan` |
| Đo chất lượng theo sprint | Tỷ lệ bug, carry-over | MK | `team-performance-report` |
| Đo mức dùng AI và chất lượng phiên agent | Bốn chỉ số, kit adoption | MK Observe | Đọc hằng tuần theo [nhịp đọc](05-mk-observe-agent-metrics.md#6-nhịp-đọc-hằng-tuần-cho-người-quản-lý) |

### 4.9 Architect

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Đánh giá phương án kiến trúc | Trade-off, rủi ro, chi phí | MK | `/mk-brainstorm`, `/mk-research`, `/mk-sequential-thinking` |
| Viết và duy trì system architecture | Sinh và cập nhật từ code | MK | `/mk-docs`; `docs/system-architecture.md` |
| Review design của team | Đối chiếu với chuẩn kiến trúc | Rovo hoặc MK | Rovo Chat trên trang design; `/mk-code-review` khi design đã thành code |
| Chuẩn hoá code standards cho nhiều dự án | Rút chuẩn từ repo | MK | `/mk-docs` sinh `code-standards.md`; `review-pr` dùng làm thước |
| Thiết kế giao diện cho agent đọc hệ thống khách | Lệnh đọc, tool ghi có hợp đồng | Nhóm 01 | [Agent Interfaces](../01-ai-ready-enterprise/engineering/03-agent-interfaces.md) |

### 4.10 Comtor, communicator và biên phiên dịch

| Task đặc thù | AI làm được | Tool | Cụ thể |
|---|---|---|---|
| Dịch tài liệu Nhật Việt Anh | Bản nháp dịch, giữ thuật ngữ | Rovo | AI trong Confluence; cần từ điển thuật ngữ dự án trong Confluence để agent bám |
| Tóm tắt họp với khách | Quyết định, action, câu hỏi mở | Rovo hoặc MK | Rovo tóm tắt; `meeting-notes-to-actions` khi cần tạo task |
| Soạn thư và thông báo kính ngữ | Draft theo mẫu | Rovo | Rovo Chat với template kính ngữ của đơn vị |
| Giữ nhất quán thuật ngữ giữa spec và code | Tra chéo | Rovo | Rovo Search |

Chất lượng tiếng Nhật của Rovo chưa có tài liệu chính thức. Comtor là role cần pilot sớm và đo bằng tỷ lệ bản nháp dùng được không sửa lớn.

## 5. Use case chung của đơn vị và tool tương ứng

| Use case | Tool chính | Cụ thể | Đo bằng |
|---|---|---|---|
| Generate requirement summary | Rovo | Rovo Chat trên trang yêu cầu và ticket liên quan | Thời gian BrSE, BA đọc spec; số câu hỏi làm rõ tìm được |
| Generate design | MK | `/mk-plan` từ story; xuất spec Kiro nếu dự án theo spec | Effort design so với baseline |
| Review design | Rovo, MK | Rovo Chat trên trang design; `/mk-code-review` khi đã có code | Số lỗi thiết kế phát hiện trước code |
| Generate test case | MK, Rovo | `jira-story-test-case-generation`; Rovo agent trong Jira khi không có repo | Tỷ lệ test case do AI sinh được duyệt |
| Generate unit test | MK | `/mk-test` trong vòng `cook` | Coverage; tỷ lệ dự án có UT tự động |
| Code review | MK | `/mk-code-review`, `/mk-review-pr`, `code-review-findings-to-jira` | Finding được chấp nhận; thời gian review |
| Meeting summary | Rovo, MK | Rovo trong Confluence; `meeting-notes-to-actions` | Action item không sót; thời gian viết biên bản |
| Weekly report | MK | `sprint-report-to-confluence-slack`, `stakeholder-status-update` | Thời gian PM, BrSE mỗi tuần |

## 6. Tiền đề kỹ thuật: Kiro + MK nối Jira, Confluence, Slack

### 6.1 Hiện trạng

| Hạng mục | Hiện trạng | Hệ quả |
|---|---|---|
| Jira, Confluence | Cloud | Mọi đường nối (CLI, MCP chính thức, MCP của kit) đều khả dụng về kỹ thuật |
| Kiro | Pro hoặc Pro+; **MCP chưa được bật**, đơn vị đang hoàn thiện cơ chế quản lý | Không dùng được MCP server nào trong Kiro lúc này; nối ra ngoài chỉ bằng lệnh shell |
| Đường nối đang có | **CLI tự dựng** cho Jira và Confluence, chạy tại máy từng người, personal API token | Kiro gọi CLI như một lệnh shell; skill MK gọi CLI thay vì tool MCP |
| Slack | Chưa rõ admin cho gì | Dự phòng: CLI tự dựng, chứng thực bằng cookie trình duyệt của chính người dùng |
| Rovo Dev | Không dùng | Kiro là agent code duy nhất |

### 6.2 Cách skill MK dùng CLI thay MCP

10 workflow skill của kit được viết cho ba MCP server của kit, mọi tool trả cùng một envelope `{ok, data, meta}` hoặc `{ok: false, error: {code, message, hint}}`. Cách chuyển ít tốn nhất là **để CLI in ra đúng envelope đó** dưới dạng JSON, mỗi lệnh CLI tương ứng một tool: ví dụ `jira issue get KEY-1`, `jira search --jql "..."`, `confluence page create --space X --title Y --body-file z.md`. Khi đó phần logic của skill giữ nguyên, chỉ đổi dòng "gọi tool" thành "chạy lệnh và đọc JSON". Lợi thêm: CLI test được ngoài Kiro, và khi MCP được bật thì cùng CLI có thể bọc thành MCP server stdio mà không sửa skill lần nữa.

Quy tắc cho CLI:

- Token cá nhân đọc từ biến môi trường hoặc keychain của máy, không có trong repo, không in ra log. Hook `scout-block` của kit chặn `.env` vẫn giữ.
- CLI chỉ đọc mặc định; lệnh ghi (tạo issue, tạo trang, chuyển trạng thái) có cờ `--yes` và in ra bản xem trước khi không có cờ. Skill báo cáo dùng bản xem trước để người duyệt trước khi ghi.
- Mọi lệnh ghi nhận `--dry-run`, để hands-on trong đào tạo chạy trên project thật mà không tạo rác.
- Log lệnh đã chạy vào file cục bộ, để MK Observe và người audit đọc lại được.

### 6.3 Slack

Chưa có quyết định của admin. Hai khả năng:

| Đường | Là gì | Điều kiện | Lưu ý |
|---|---|---|---|
| Slack MCP Server chính thức | Server remote của Slack, GA 2026-02, quyền theo người dùng | Admin Slack duyệt **và** Kiro được bật MCP | Đường đúng về lâu dài; hiện chưa đi được vì cả hai điều kiện đều chưa có |
| CLI tự dựng, chứng thực bằng cookie trình duyệt | Dùng phiên đăng nhập của chính người dùng, không cài app | Admin đồng ý về chính sách | Cùng cách với server Slack của kit, đã chạy end-to-end; không có audit tập trung, cookie phải được bảo vệ như mật khẩu; chỉ dùng cho pilot và cho lệnh đọc cộng gửi tin vào kênh của team |

Nếu admin không đồng ý cả hai, các skill báo cáo vẫn chạy được: bỏ bước gửi Slack, người dùng dán link Confluence vào kênh bằng tay. Đây là cấu hình mặc định an toàn cho pilot.

### 6.4 Khi Kiro được bật MCP

Khi cơ chế quản lý MCP của đơn vị xong, thứ tự chuyển:

1. **Atlassian Rovo MCP Server** chính thức tại `mcp.atlassian.com`: OAuth 2.1, quyền theo người dùng, admin allowlist, audit log; không phải chạy gì thêm. Tên tool khác với CLI nên cần bảng map; nếu CLI đã in đúng envelope thì bọc CLI thành MCP server stdio là bước trung gian không tốn công.
2. **Slack MCP Server** chính thức, nếu admin duyệt.
3. Cấu hình ở `.kiro/settings/mcp.json`, agent `mk` cần `includeMcpJson: true` **[chưa kiểm chứng]**; headless chạy với `--require-mcp-startup` để phiên dừng ngay khi server không lên.

### 6.5 Việc cụ thể trước pilot

1. Dựng lại bản Kiro từ bản cài đầy đủ của kit để có wrapper cho 10 workflow skill.
2. Chuẩn hoá đầu ra CLI Jira/Confluence theo envelope của kit; bổ sung `--dry-run` và bản xem trước cho lệnh ghi.
3. Sửa 10 skill: đổi lời gọi tool sang lệnh CLI, giữ nguyên logic và kỷ luật số liệu. Bắt đầu từ ba skill dùng nhiều nhất: `jira-story-test-case-generation`, `sprint-report-to-confluence-slack` (bỏ bước Slack nếu chưa có), `daily-standup-report`.
4. Chạy thử trên project thật với `--dry-run`, rồi chạy thật một lần và dọn artifact.
5. Ghi bảng map lệnh CLI ↔ tool MCP chính thức để chuyển sau.

Một tính năng sẵn có của Kiro đáng dùng ngay: hook **Sync AIDLC Tasks to Jira** đẩy task từ spec lên Jira, gắn nhãn `aidlc-synced`, chạy lại thì hỏi bỏ qua hay cập nhật từng issue. Một chiều spec → Jira; không có chiều ngược. Cần xác nhận hook này hoạt động khi MCP tắt **[chưa kiểm chứng]**.

## 7. Governance tối thiểu để bắt đầu

| Câu hỏi | Trả lời cho pilot |
|---|---|
| Dữ liệu nào được đưa vào AI | Dữ liệu đã nằm trong Jira, Confluence, Slack và repo của dự án, qua tool đã duyệt. Rovo đọc theo quyền người dùng. Kiro đọc repo và MCP đã khai |
| Dữ liệu nào không | Credential và personal API token, cookie phiên, dữ liệu cá nhân của người dùng cuối, dữ liệu khách nằm ngoài hệ thống dự án |
| Tool nào được phép | Rovo trong gói Atlassian của đơn vị; Kiro Pro hoặc Pro+; CLI Jira/Confluence do đơn vị dựng. Không bật MCP trong Kiro cho tới khi có cơ chế quản lý; không cài extension ngoài danh sách |
| Model chạy ở đâu | Rovo: Atlassian Cloud, model Anthropic hoặc OpenAI do Atlassian vận hành, không huấn luyện bằng dữ liệu khách, data residency pin được. Kiro: model Claude và Nova trên Bedrock, router `auto` mặc định, code và prompt không dùng huấn luyện; gói Free chạy ở US East, gói Enterprise chọn region, SSO qua IAM Identity Center |
| Ai chịu trách nhiệm đầu ra | Người chạy tool. AI sinh bản nháp; story, test case, báo cáo phải có người duyệt trước khi gửi khách |
| Log để audit | Rovo audit log của Atlassian admin; Kiro + MK: log phiên và hook của kit, đọc bằng MK Observe |

Chi tiết cho hệ thống chạy trên dữ liệu khách ở [Technical Security](../01-ai-ready-enterprise/engineering/05-technical-security.md).

## 8. Đề xuất triển khai

1. **Tuần 1 đến 2.** Bật Rovo cho PM, PMO, BA, BrSE, comtor trên một project; xác nhận gói, bật theo dõi usage, đo chất lượng tiếng Nhật với comtor. Song song dựng wrapper Kiro cho 10 workflow skill và chuyển skill sang CLI theo mục 6.5.
2. **Tuần 3 đến 6.** Pilot Kiro + MK với một team dev theo [pilot đề xuất](04-kiro-mk-kit-guide.md#4-pilot-đề-xuất-và-cách-đo); tester dùng `jira-story-test-case-generation`; PL chạy `sprint-report-to-confluence-slack` thay báo cáo tay.
3. **Tuần 7 đến 8.** Đọc MK Observe và Rovo usage; chốt danh sách use case đủ tốt để thành chuẩn; viết prompt template cho việc không lặp; viết hands-on theo bảng ở mục 4, mỗi role một bài trên chính ticket của họ.
4. Tài liệu đào tạo theo role lấy bảng ở mục 4 làm khung; quy trình từ soạn tài liệu đến team áp dụng và đo ở [Team Enablement and Training](07-team-enablement-and-training.md).

---

**Câu hỏi mở**

- Gói Atlassian thực tế là gì? Giả định "dùng thoải mái" phải được xác nhận bằng usage sau hai tuần pilot.
- Admin Slack cho đường nào: MCP chính thức, CLI bằng cookie, hay không đường nào? Quyết định các skill báo cáo có bước gửi Slack hay dừng ở Confluence.
- Khi nào cơ chế quản lý MCP của Kiro xong? Quyết định thời điểm chuyển từ CLI sang Atlassian MCP Server.
- Hook Sync AIDLC Tasks to Jira của Kiro có chạy khi MCP tắt không?
- Chất lượng tiếng Nhật của Rovo với BrSE và comtor: cần một tuần pilot có đo trước khi đưa vào chuẩn.
