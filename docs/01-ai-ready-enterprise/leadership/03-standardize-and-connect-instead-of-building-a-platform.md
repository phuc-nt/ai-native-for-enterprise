# Proposal: Standardize and Connect Instead of Building an AI Platform

*Dành cho lãnh đạo, người duyệt ngân sách và kiến trúc sư ở bất kỳ tổ chức nào đang cân nhắc xây một AI platform nội bộ. 15 phút đọc. Cập nhật 2026-09-28.*

Nhiều tổ chức đang đứng trước cùng một câu hỏi: muốn đưa AI agent vào công việc ở quy mô toàn tổ chức thì nên **tự xây một platform tập trung có harness riêng**, hay **chuẩn hoá tài sản nội bộ rồi nối vào harness có sẵn**. Tài liệu này đề xuất cách thứ hai.

[Proposal ba trụ cột](01-three-pillars-proposal.md) nói cách đưa agent vào một pilot. Tài liệu này áp cùng nguyên tắc đó vào quyết định đầu tư của cả tổ chức.

## 1. Bối cảnh chung, 2025–2026

**Harness đã thành hàng hoá, và các vendor chạy đua theo tháng.** Claude Code, Codex CLI, Gemini CLI, GitHub Copilot, Cursor, Kiro, cùng các dự án open source như OpenCode và goose, gần như tháng nào cũng ra feature mới: subagent, skill, hook, sandbox, chế độ headless, SDK để nhúng, agent chạy trên cloud. Ở phần chung này, không đội nội bộ nào đuổi kịp tốc độ đó.

**Các "ổ cắm" đã được chuẩn hoá.**

- **MCP** (Model Context Protocol) do Anthropic công bố cuối 2024 và đã thành chuẩn chung để nối agent với tool và dữ liệu. Tháng 12/2025, MCP cùng AGENTS.md (của OpenAI) và goose (của Block) được chuyển về Agentic AI Foundation thuộc Linux Foundation. Thành viên hạng cao nhất gồm AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft và OpenAI.
- **Agent Skills**, tức một thư mục chứa `SKILL.md`, được công bố thành chuẩn mở cũng trong tháng 12/2025. Chuẩn này đã được nhiều harness hỗ trợ: Claude Code, Codex, Gemini CLI, GitHub Copilot, Cursor, VS Code, OpenCode.
- **Hệ quả:** tài sản viết theo các chuẩn này gắn được vào nhiều harness. Muốn sở hữu phần tích hợp thì không còn phải sở hữu harness.

**Harness chạy được ở mọi nơi.** Cùng một harness có thể chạy tương tác trong IDE hay terminal, chạy headless trong CI, được nhúng qua SDK, hoặc chạy thành agent trên cloud của vendor. "Tool cá nhân" hay "hệ thống tập trung" giờ chỉ khác nhau ở cách triển khai, không còn là hai loại sản phẩm.

**Doanh nghiệp vẫn khó ra kết quả, và nguyên nhân không nằm ở model.** Báo cáo *The GenAI Divide* của MIT NANDA (2025) ghi nhận:

- Khoảng 95% tổ chức trong mẫu chưa thấy lợi nhuận đo được từ generative AI.
- Nguyên nhân chính theo nhóm tác giả: workflow giòn, agent thiếu khả năng học ngữ cảnh, không khớp với công việc hằng ngày.
- Giải pháp mua hoặc hợp tác với bên chuyên môn thành công khoảng 67%. Giải pháp tự xây nội bộ chỉ đạt khoảng một phần ba mức đó.

Đây là báo cáo sơ bộ, mẫu không lớn, nên chỉ đọc như một tín hiệu. Tín hiệu đó trùng với quan sát thực tế: dự án AI thường chết ở dữ liệu và ở phần nối vào quy trình, hiếm khi chết ở model.

**Rủi ro mới: skill thành chuỗi cung ứng.** Khi skill thành chuẩn chung, nó cũng thành một đường tấn công. Các nghiên cứu năm 2026 đã chỉ ra cách tấn công qua skill, kể cả bằng tổ hợp nhiều skill mà từng cái riêng lẻ đều qua được kiểm tra. Vì vậy kit cần được quản trị như code.

## 2. Ba khái niệm, giải thích nhanh

### 2.1 Harness

Harness là phần bao quanh LLM để nó thành agent làm được việc. Nó gồm agent loop gọi tool, quản lý session và context, nạp chỉ dẫn và skill, MCP client, permission, hook, sandbox, và lưu transcript. Bản thân LLM chỉ sinh văn bản; harness biến văn bản đó thành hành động.

Một agent làm việc thật gồm năm phần:

| Phần | Là gì | Ai có |
|---|---|---|
| LLM | Model sinh câu trả lời và quyết định gọi tool | Vendor |
| Harness | Agent loop, tool, session, permission, transcript | Vendor, open source |
| Kit | Skill, workflow, template, checklist, connector, guardrail của tổ chức | **Chỉ tổ chức** |
| Data source | Tài liệu, code, dữ liệu dự án đã chuẩn hoá, có phân quyền | **Chỉ tổ chức** |
| Infrastructure | Nơi chạy, LLM gateway, log | Cloud có sẵn, tổ chức cấu hình |

Một cách so sánh dễ nhớ: LLM giống CPU, harness giống hệ điều hành, còn kit và data source giống ứng dụng và dữ liệu nghiệp vụ. Không doanh nghiệp nào tự viết hệ điều hành chỉ để chạy phần mềm kế toán của mình.

Năng lực chi tiết của harness và tiêu chí chọn harness ở [engineering/02](../engineering/02-harness-and-frontends.md).

### 2.2 Harness cá nhân

Đây là harness mỗi người chạy trên máy mình, trong IDE hoặc terminal: Claude Code, Kiro, Cursor, GitHub Copilot, Codex CLI. Người dùng ra lệnh, xem kết quả, sửa rồi chạy tiếp.

- **Điểm mạnh:** năng lực tốt nhất thị trường, cập nhật nhanh, kỹ sư đã quen dùng, và agent chỉ có đúng quyền của người dùng.
- **Điểm hay bị chê:**
  - kết quả phụ thuộc kỹ năng prompt của từng người;
  - mỗi người một cấu hình;
  - log nằm trên máy cá nhân;
  - khó nhìn chi phí tập trung;
  - việc nào người cũng phải dẫn dắt từng bước.

Phần lớn các điểm yếu trên đến từ việc **thiếu kit, data source và governance dùng chung**, không đến từ bản thân harness. Khi được cấp kit chuẩn và chạy headless trên server, harness vẫn là harness đó.

### 2.3 Platform tập trung

Đây là một hệ thống nội bộ chạy trên server hoặc cloud, phục vụ cả tổ chức. Bản thiết kế thường gồm năm phần:

1. **Knowledge base, context engine:** index tài liệu và code, RAG, vector DB, RBAC.
2. **Multi-agent orchestration:** chuỗi agent chuyên trách từng khâu công việc.
3. **Integration:** nối tới issue tracker, wiki, source control và các hệ thống khác.
4. **Governance:** RBAC, audit trail, cost dashboard, human gate.
5. **Chat UI hoặc portal** riêng.

Động cơ xây platform đều chính đáng: muốn kết quả đồng đều, muốn kiểm soát, muốn tự động hoá cao hơn mức một người ngồi prompt.

Vấn đề là bản thiết kế **gộp những thứ khác bản chất vào một khối**:

- Phần 1 và 3 là tài sản chỉ tổ chức mới có.
- Phần 4 phần lớn mua hoặc cấu hình được.
- Phần 2 và 5 chính là **viết lại harness**.

### 2.4 So sánh nhanh

| | Harness cá nhân, không có kit | Platform tập trung, harness tự viết | Đề xuất: harness có sẵn, kit, data, governance mỏng |
|---|---|---|---|
| Năng lực agent | Tốt nhất, theo vendor | Tự viết, luôn đi sau | Tốt nhất, theo vendor |
| Kết quả đồng đều | Phụ thuộc người | Đồng đều | Đồng đều nhờ kit |
| Dữ liệu tổ chức | Mỗi người tự tìm | Tập trung | Tập trung, truy cập qua connector |
| Governance | Rời rạc | Tập trung | Tập trung ở gateway và policy |
| Tự động hoá end-to-end | Không, khi chỉ dùng tương tác | Có | Có: chạy headless, dừng ở approval gate |
| Chi phí xây | Gần như không | Cao và kéo dài | Vừa phải, dồn vào phần tạo khác biệt |
| Khi vendor ra feature mới | Có ngay | Phải tự làm lại | Có ngay |
| Phụ thuộc vào | Vendor | Chính hệ thống tự viết | Chuẩn mở; đổi harness được |

## 3. Đề xuất

**Tập trung và chuẩn hoá thứ bên ngoài không có: dữ liệu và quy trình. Nối chúng tới mọi harness qua connector theo chuẩn mở. Harness và LLM thì mua, hoặc dùng bản open source.**

| Layer | Nội dung | Tổ chức làm gì |
|---|---|---|
| Harness, LLM | Claude Code, Codex, Kiro, Copilot, OpenCode…; model của vendor | Mua và cấu hình; cho phép dùng hơn một harness |
| Connector | CLI, MCP server, `SKILL.md`, `AGENTS.md` | **Xây**, theo chuẩn mở |
| Kit (quy trình AI-ready) | Skill, workflow, template, checklist, guardrail | **Xây**, tập trung, có owner |
| Data source AI-ready | Document index, code graph, dữ liệu dự án, định nghĩa chỉ số | **Xây**, tập trung, có RBAC |
| Governance | LLM gateway, telemetry, policy, human gate | Mua hoặc cấu hình; chỉ tự làm phần mỏng |

Cụ thể là năm việc sau.

### 3.1 Chuẩn hoá dữ liệu thành data source AI-ready

Tri thức hiện nằm rải rác trong wiki, issue tracker, chat, source code, spec, biên bản họp và trong đầu người làm lâu năm. Việc chính là đưa nó về dạng agent dùng được ngay:

- có cấu trúc, có nguồn gốc, có phân quyền;
- kèm một bộ tri thức nói rõ câu hỏi nào trả lời ở đâu và dữ liệu *không* nói được gì.

Code graph nhiều repo, index tài liệu thiết kế và định nghĩa chỉ số của tổ chức đều thuộc layer này. Đây là phần nên tập trung nhất, vì để từng team tự làm thì vừa trùng lặp vừa lệch nhau. Cách làm theo bốn lớp ở [engineering/01](../engineering/01-ai-ready-data.md); cách làm cho từng nguồn ở [engineering/09](../engineering/09-data-source-playbook.md).

### 3.2 Chuẩn hoá quy trình thành kit AI-ready

Quy trình chuẩn của tổ chức (template tài liệu, coding convention, checklist review, quy trình release, cách viết test case) hiện được viết cho người đọc. Việc cần làm là viết lại chúng thành skill và workflow cho agent đọc. Mỗi skill làm một việc và ghi rõ input, output, chỗ dừng lại hỏi người, và tiêu chí hoàn thành.

Kit được quản lý như code:

- sống trong git, có owner, review, version và changelog;
- phát hành qua một kit registry nội bộ;
- chứa luôn guardrail: permission, hook, sandbox, deny list cho các thao tác phá huỷ.

Kit là chỗ biến "kết quả phụ thuộc kỹ năng prompt" thành "kết quả theo quy trình của tổ chức".

### 3.3 Connector trung lập với harness

Mỗi hệ thống nội bộ được phơi ra cho agent qua một interface hẹp:

- CLI hoặc MCP server;
- trả JSON kèm ngữ cảnh;
- đọc và ghi tách riêng;
- xác thực bằng quyền của người gọi.

Connector viết một lần là dùng được cho mọi harness hỗ trợ MCP hoặc gọi được shell. Nguyên tắc thiết kế ở [engineering/03](../engineering/03-agent-interfaces.md).

Kit cũng cần tách **core trung lập** và **adapter mỏng cho từng harness**, vì file rule, format hook và cách chọn agent vẫn khác nhau giữa các harness. Mô hình này đã được áp dụng thực tế, xem [Agent Kit Portability](../../02-ai-in-sdlc/03-agent-kit-multi-harness-kiro-opencode.md).

### 3.4 Governance mỏng, dùng chung

Những gì cấp quản lý thật sự cần (audit, cost, chính sách dữ liệu, human gate) đều không đòi hỏi một harness riêng:

- **LLM gateway** đứng giữa mọi harness và model của vendor. Nó ghi cost theo user và dự án, log request, giới hạn các model được dùng, và giữ dữ liệu trong vùng cho phép.
- **Telemetry:** thu log và metric từ các harness về một chỗ, hoặc thu transcript định kỳ. Một số harness đã xuất telemetry theo OpenTelemetry.
- **Policy phát hành cùng kit:** permission, hook, sandbox được cấu hình sẵn, không để từng người tự đặt.
- **Human gate đặt ở chỗ đã có sẵn:** PR review, branch protection, approval trong CI.

### 3.5 Harness và LLM: mua, và chạy ở đâu cũng được

Chọn một đến hai harness chuẩn cho tổ chức, nhưng giữ tài sản ở định dạng mở để có thể đổi harness.

Khi cần tự động hoá cao hơn, cho chính harness đó chạy headless trên server hoặc trong CI, dùng cùng kit và data source, và dừng ở một approval gate cuối. Các harness phổ biến đều đã hỗ trợ việc này:

- Claude Code có chế độ non-interactive, Agent SDK và tích hợp GitHub Actions.
- Kiro CLI có chế độ `--no-interactive`, đã chạy thử thực tế ([Kiro + MK Kit](../../02-ai-in-sdlc/04-kiro-mk-kit-guide.md)).

## 4. Vì sao không tự viết harness

- **Tốc độ.** Vendor và cộng đồng open source ra feature theo tháng. Harness tự viết phải đuổi theo mãi, và mỗi lần đuổi là công sức không tạo ra khác biệt.
- **Phép thử mất giá.** Với từng hạng mục, hỏi: *"Nếu quý sau vendor ra đúng thứ này, khoản đầu tư của mình có mất trắng không?"*
  - Agent loop, orchestration, chat UI: **mất**.
  - Data source, kit theo quy trình riêng, connector tới hệ thống nội bộ: **không mất**, vì bên ngoài không có.
- **Automation level là tính chất của workflow, không phải của tool.** Cùng một harness:
  - dừng hỏi người ở mỗi bước thì đó là mức cộng tác;
  - chạy trọn một chuỗi skill rồi trình kết quả ở approval gate cuối thì đó là mức AI dẫn dắt, người duyệt.

  "Dây chuyền tự động" là kit chạy headless, không phải một loại sản phẩm khác.
- **Chuẩn mở đã khiến harness thay thế được.** Lock-in lớn nhất hiện nay không phải harness của vendor, mà là một harness tự viết chỉ đội làm ra nó bảo trì được.
- **Người dùng sẽ so sánh.** Kỹ sư đã dùng harness tốt ở nơi khác. Harness nội bộ phải cạnh tranh trải nghiệm với sản phẩm của vendor lớn; thua là mất adoption, dù đã đầu tư bao nhiêu.
- **Chi phí cơ hội.** Người giỏi nhất bị dồn vào phần không tạo khác biệt, trong khi dữ liệu và quy trình, phần chỉ tổ chức làm được, bị bỏ đói. Báo cáo ở mục 1 cho thấy chính phần đó quyết định thành bại.

## 5. Lo ngại chính đáng về harness, và cách đáp ứng mà không cần tự viết platform

| Lo ngại | Cách đáp ứng |
|---|---|
| Kết quả phụ thuộc kỹ năng prompt của từng người | Kit: skill kích hoạt từ ngôn ngữ tự nhiên hoặc lệnh slash, mang sẵn quy trình chuẩn |
| Không làm được end-to-end, chỉ làm từng việc nhỏ | Skill chain, chạy headless trong CI, approval gate cuối |
| Không nhìn được nhiều repo, nhiều hệ thống | Code graph và index tài liệu là data source, phơi ra qua MCP hoặc CLI |
| Không có audit tập trung | LLM gateway, telemetry, thu transcript |
| Chi phí không kiểm soát được | Budget theo user và dự án ở gateway; admin console của vendor |
| Dữ liệu nhạy cảm | RBAC ở data source; connector dùng quyền người gọi; gateway giới hạn model được dùng; model chạy trong vùng cho phép hoặc tự host |
| Chạy tự động thì nguy hiểm | Guardrail là một phần của kit. Kinh nghiệm thực tế cho thấy prompt không kích hoạt skill nào mới là prompt dễ gây phá huỷ. API của hệ thống đích cũng có thể không chặn một thao tác xoá dù đối tượng đang được dùng, nên không thể trông vào hệ thống đích tự bảo vệ |
| Mỗi harness một định dạng | Core trung lập và adapter mỏng; không hứa portable 100% |

Khi các lo ngại này đã được đáp ứng, phần thật sự cần xây tập trung chỉ còn **data layer, kit registry và governance layer**. Đó vẫn là một platform, nhưng là **platform của tài sản**, không phải platform của harness.

## 6. Khi nào nên tự làm nhiều hơn

Đề xuất này không tuyệt đối. Có bốn trường hợp:

- **Người dùng phần lớn không phải kỹ sư, quy mô lớn, cần một chat UI chung.** Dùng sản phẩm chat doanh nghiệp của vendor, hoặc harness đa kênh có sẵn như OpenClaw, nối vào cùng connector và data source. Chỉ tự làm một lớp giao diện mỏng khi không sản phẩm nào đáp ứng.
- **Môi trường cách ly hoàn toàn (air-gapped)** mà không harness thương mại nào được phép dùng. Bắt đầu từ harness open source tự host và model tự host, không viết từ đầu.
- **Agent là sản phẩm bán cho khách.** Đây là bài toán khác: dùng Agent SDK hoặc framework để dựng sản phẩm. Kit và data source vẫn dùng lại được.
- **Harness thiếu một năng lực bắt buộc.** Vá bằng hook, plugin, MCP server, hoặc đóng góp cho dự án open source. Viết harness mới là lựa chọn cuối cùng.

## 7. Rủi ro của chính đề xuất

| Rủi ro | Cách giảm |
|---|---|
| Portability không trọn vẹn | Adapter mỏng; đo phần phải sửa khi chạy kit trên harness thứ hai |
| License dùng trong IDE không nhất thiết cho phép chạy headless trong CI, có thể phải có tài khoản API riêng | Làm rõ điều khoản và chi phí ngay từ đầu |
| Phụ thuộc vendor LLM | Gateway cho phép đổi model; data và kit không gắn với model nào |
| Kit bị bỏ mặc không cập nhật, hoặc trùng lặp | Mỗi skill có owner; phát hành qua registry; đo mức dùng và gỡ skill không ai dùng |
| Chuỗi cung ứng skill: skill độc hại, skill bên ngoài chưa review | Chỉ cài từ registry nội bộ; review như code; chỉ nhận skill từ các nguồn đã duyệt |
| Công sức làm guardrail bị đánh giá thấp | Tính guardrail vào phạm vi kit ngay từ đầu |
| Chuẩn hoá dữ liệu tốn công, lâu thấy kết quả | Bắt đầu từ một quy trình và một hai nguồn có câu hỏi lặp lại hằng ngày; đo trước và sau |

## 8. Lộ trình gợi ý

| Giai đoạn | Thời lượng gợi ý | Việc | Đầu ra |
|---|---|---|---|
| 0. Nền | 2–4 tuần | Chọn 1–2 harness chuẩn; dựng LLM gateway; đặt policy permission cơ bản | Mọi người dùng harness qua gateway, có log và cost |
| 1. Pilot | 1–3 tháng | Chọn một quy trình lặp lại nhiều và 1–2 nguồn dữ liệu; làm kit, connector, data source; cho một team dùng | Số đo trước và sau: thời gian, lỗi review, mức dùng |
| 2. Tự động hoá | 1–2 tháng | Chạy cùng kit headless trong CI với approval gate; chạy kit trên harness thứ hai | Một chuỗi việc do AI dẫn dắt, người duyệt; danh sách phần phải sửa ở adapter |
| 3. Mở rộng | Liên tục | Kit registry có owner, review, version; thêm nguồn dữ liệu theo playbook | Danh mục kit và data source dùng chung |

Chỉ số nên theo dõi:

- tỉ lệ công việc chạy qua kit;
- thời gian và số lỗi review so với làm tay;
- số harness dùng chung một kit;
- cost trên mỗi đầu việc;
- số lần guardrail chặn một thao tác.

Vai trò, công sức và rủi ro của một pilot cụ thể ở [leadership/02](02-roadmap-resources-risks.md).

## 9. Cần quyết định gì

1. **Nguyên tắc đầu tư:** harness và LLM thì mua hoặc cấu hình; ngân sách xây dồn vào data, kit và connector.
2. **Owner:** ai sở hữu data source, ai sở hữu kit registry, ai sở hữu gateway và dữ liệu audit.
3. **Chuẩn định dạng:** MCP cho connector; `SKILL.md` và `AGENTS.md` cho kit; kit tách core trung lập và adapter.
4. **Ràng buộc dữ liệu:** model nào được xem dữ liệu nào, dữ liệu phải ở lại vùng nào. Quyết định việc này trước khi chọn harness.
5. **Pilot:** chọn quy trình và nguồn dữ liệu nào, đo bằng chỉ số nào.

## Nguồn

- Linux Foundation, [Linux Foundation Announces the Formation of the Agentic AI Foundation (AAIF)](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), 12/2025.
- TechCrunch, [OpenAI, Anthropic, and Block join new Linux Foundation effort to standardize the AI agent era](https://techcrunch.com/2025/12/09/openai-anthropic-and-block-join-new-linux-foundation-effort-to-standardize-the-ai-agent-era/), 12/2025.
- [Agent Skills specification](https://agentskills.io); tổng quan: Firecrawl, [Agent Skills Explained](https://www.firecrawl.dev/blog/agent-skills).
- Virtualization Review, [MIT Report Finds Most AI Business Investments Fail, Reveals 'GenAI Divide'](https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx), 08/2025.
- arXiv, [Formal Analysis and Supply Chain Security for Agentic AI Skills](https://arxiv.org/pdf/2603.00195), 2026.
- arXiv, [CompoSkill: Compositional Skill Chain Attacks from Individually Scanner-Passing LLM Agent Skills](https://arxiv.org/pdf/2608.16246), 2026.
