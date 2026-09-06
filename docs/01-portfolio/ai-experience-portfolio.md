# AI Engineering Experience Portfolio — LLM, Agent, RAG, MCP

> Tài liệu chứng minh năng lực qua các sản phẩm tôi đã tự thiết kế, xây dựng và vận hành. Mỗi repo bên dưới là code chạy thật (có test, CI, release), không phải demo. Mục tiêu: đối chiếu trực tiếp với các nhiệm vụ điển hình của một AI Engineer trong dự án — đánh giá solution, đề xuất tích hợp AI (RAG, LLM, Agent), triển khai PoC, xây dựng guild/training.

## 1. Ma trận năng lực × sản phẩm

| Năng lực | Sản phẩm chứng minh |
|---|---|
| **MCP / tool integration** | 3 MCP servers (Jira/Confluence/Slack), my-db-mate (MCP server), my-crew (MCP client qua LangGraph) |
| **Multi-agent orchestration** | my-crew (LangGraph task DAG, peer review, autopilot), my-db-mate (parallel sub-investigations) |
| **RAG & retrieval engineering** | my-notebook (hybrid BM25+vector, contextual retrieval), my-db-mate (semantic layer + governed metrics), my-kioku |
| **AI safety & governance** | my-crew (Action Gateway), my-db-mate (read-only choke point, SQL AST validation), my-notebook (privacy-by-architecture) |
| **Cost engineering** | my-db-mate (3 lớp budget BigQuery), my-crew (budget tracker, routing funnel 4× rẻ hơn), my-notebook (inference $0 on-device) |
| **Local/private inference** | my-notebook (MLX on-device), my-db-mate (Ollama), my-kioku |
| **Eval & verification** | my-db-mate (NL→SQL eval harness, self-consistency voting), my-notebook (retrieval eval harness), my-crew (blind-graded pairwise) |
| **Sản phẩm hóa** | Cả 8 repo: npm/PyPI/app distributable, CI, changelog, tài liệu song ngữ |

## 2. Nhóm nền tảng tích hợp — 3 MCP servers

**Repo:** `jira-cloud-mcp-server` (npm `mcp-jira-cloud-server`, 47 tools) · `confluence-cloud-mcp-server` (11 tools) · `slack-browser-mcp-server` (13 tools)

Ba MCP server TypeScript tự viết, nối AI agent vào bộ ba công cụ phổ biến nhất của các dự án offshore (Jira + Confluence + Slack với khách JP). Kỹ thuật đáng chú ý:

- **Thiết kế contract cho AI làm client**: JSON envelope thống nhất `{ok, data, meta}` / `{ok:false, error:{code, message, hint}}` trên cả 3 server — mỗi lỗi kèm `hint` để agent tự phục hồi (self-healing tool use). Đây là bài học thiết kế API-cho-agent, khác API-cho-người.
- **Slack qua browser token** (xoxc/xoxd) — giải pháp cho workspace doanh nghiệp không cho cài app: không cần admin duyệt, agent nhìn đúng phạm vi user thật.
- Đã kiểm chứng E2E: một workflow chạy xuyên 3 server thật (Jira → Confluence → Slack song ngữ JP/EN) rồi tự dọn artifact.

**Liên hệ thực tế dự án:** đây chính là hạ tầng cho auto-reporting, test case generation, code review khép vòng vào Jira/Confluence/Slack — đã có sẵn, không phải xây từ đầu. Chi tiết thiết kế (validation, error classification) và 10 workflow skill dùng chúng: [AI Toolkit for Offshore Teams, mục 4 và 6](../02-ai-toolkit/01-ai-toolkit-offshore-team.md#4-topology).

## 3. my-db-mate — Chat với database, BI tự host

**Bài toán:** thay thế Tableau bằng "hỏi đáp tự nhiên → SQL thật, read-only, có governance" trên 7 engine DB (Postgres, MySQL, MSSQL, SQLite, BigQuery, DuckDB, D1). TypeScript, Next.js, Vercel AI SDK, Drizzle.

Kỹ thuật LLM/agent đã triển khai:

- **Agentic tool-use loop** thay vì RAG pipeline cứng: agent tự khám phá schema, tự sửa SQL lỗi, tự hỏi lại khi mơ hồ. Chế độ "investigate": plan → query → observe → refine, có **parallel sub-investigations** (tách câu hỏi rộng thành 2–4 vòng agent chạy song song chung một budget rồi tổng hợp).
- **Semantic layer + RAG có kiểm soát**: glossary, schema annotation, verified queries, governed metrics — hybrid keyword + vector retrieval, embeddings đa ngôn ngữ chạy local.
- **Self-consistency voting**: 2–3 bản SQL viết lại ở nhiệt độ thấp, chạy thật và so kết quả; lệch nhau thì hiện diff cho người quyết.
- **Verify tầng deterministic** (không tốn thêm LLM call): phát hiện JOIN fan-out, kiểm tra độ phủ khoảng ngày, đối chiếu độ lớn với lịch sử metric — cảnh báo được bơm ngược vào agent giữa vòng lặp.
- **An toàn bằng kiến trúc**: mọi query qua một choke point duy nhất — read-only connection → SQL AST validation → denylist hàm theo dialect → row cap → audit log. Cùng một cổng phục vụ chat, MCP, cron, share link.
- **Cost governance BigQuery 3 lớp**: dry-run + confirm, `maximumBytesBilled` per-job, ngân sách byte/ngày cấp phát nguyên tử.
- **Eval harness** NL→SQL chấm bằng execution + structural match; test an toàn SQL kiểu adversarial gate trong CI (58 file Vitest, 3 workflow GitHub Actions).

**Liên hệ thực tế dự án:** mẫu hoàn chỉnh cho proposal "AI truy vấn dữ liệu nội bộ có governance" — đúng dạng solution RAG/Agent trên hệ thống khách hàng, kèm sẵn lời giải cho các câu hỏi enterprise sẽ bị hỏi: an toàn, chi phí, audit.

## 4. my-crew — Multi-agent PM tự hành (LangGraph)

**Bài toán:** một "đội" agent tự động làm việc của PM/Scrum Master — đọc Jira, GitHub, Confluence, Slack; viết report, cảnh báo rủi ro, theo dõi OKR theo lịch riêng; điều khiển từ Telegram. Python 3.12, LangGraph + LangChain + langchain-mcp-adapters, FastAPI, PyPI (`uvx my-crew`).

Kỹ thuật đã triển khai:

- **Task decomposition đa agent**: một câu tiếng Việt → DAG nhiệm vụ nhiều agent có peer review từng bước; fan-out song song bắt buộc cho brief nhiều thực thể.
- **Action Gateway — an toàn bằng kiến trúc**: mọi hành động ghi đi qua một cổng: hard-deny lớp A (mất dữ liệu, lộ credential — hard-code, LLM không bao giờ chạm tới) → trust-mode routing → kill-switch → dry-run → rate-limit → dedup → audit log. Default-deny theo allowlist.
- **Nhiều tầng runtime**: native graph, tool-calling, ReAct loop, và deep-agent chạy trong Docker sandbox có reaper/teardown; mỗi agent một subprocess cách ly.
- **Memory phân lớp xuyên agent**: consolidation, daily notes, memory mirror giữa các agent anh em (tích hợp my-kioku làm provider).
- **Autopilot có kiểm soát**: AI là người phê duyệt cuối — kế hoạch tự confirm, khi kẹt thì retry → LLM đề xuất phương án thay thế qua luồng amendment có hash-guard → chấp nhận/bỏ, tất cả bounded và audited.
- **LLM-as-judge** cho phát hiện kẹt, reflection, chấm chéo; **cost engineering đo được**: budget tracker + routing funnel (mặc định 1 agent, chỉ leo thang lên team khi có tín hiệu cấu trúc) — nhanh hơn 3.6–7×, rẻ ~4×, thắng blind-grading pairwise. Khảo sát 5–6 thực thể hết $0.02–0.05.
- Trưởng thành: ~300 file pytest, CI + release workflow, tài liệu PDR/kiến trúc/security/go-live checklist song ngữ, engineering journal ghi cả các finding adversarial review.

**Liên hệ thực tế dự án:** bằng chứng trực tiếp cho "Agent trong hệ thống" ở mức production-minded — trả lời sẵn các câu hỏi khó nhất của khách JP về agent tự hành: kiểm soát hành động ghi, audit, chi phí, và cách đo chất lượng.

## 5. my-notebook — NotebookLM clone chạy hoàn toàn on-device

**Bài toán:** RAG có trích dẫn cho môi trường không được dùng cloud AI (chính phủ/văn phòng) — tiếng Việt là công dân hạng nhất. Swift 6/SwiftUI cho macOS + iOS, inference MLX (Metal GPU) với Qwen3/Gemma quantized, kiến trúc 5 SPM package.

Kỹ thuật đã triển khai:

- **Hybrid retrieval**: BM25 + dense vector, rank fusion, query router chọn chiến lược; 2 tầng retrieval (chunk + section summary tự sinh).
- **Anthropic Contextual Retrieval**: sinh `contextPrefix` cho từng chunk trước khi embed, có tracking staleness.
- **Citation-grounded generation**: câu trả lời gắn marker `[N]` resolve về đúng span ký tự trong tài liệu gốc (chunk mang `charStart/charEnd`) — attribution kiểm chứng được, không phải trích dẫn trang trí.
- **Structured generation** có schema-validate + version cho 5 loại artifact học tập (summary, quiz, flashcard, mindmap, infographic).
- **On-device inference thực dụng**: model gating theo RAM, streaming tách reasoning token, indexing 2 tốc độ (embed nhanh dùng ngay, enrichment chạy nền song song với chat).
- **NLP tiếng Việt**: OCR PDF scan (Apple Vision), chuẩn hóa không dấu, xử lý font TCVN3 cũ.
- Có retrieval eval harness + ~20 XCTest suite (E2E chat pipeline, hybrid index, citations…).

**Liên hệ thực tế dự án:** phương án cho ràng buộc bảo mật kiểu JP enterprise — khi mọi phương án cloud AI (kể cả private cloud) đều không được phép, vẫn có đường RAG on-device; đồng thời là bằng chứng hiểu sâu retrieval engineering (không chỉ gọi API vector DB).

## 6. my-dandori — Outer harness quản trị fleet AI coding agent

**Bài toán:** biến việc dùng AI coding agent ad-hoc thành một *đội có quản trị* — một binary Go duy nhất bọc quanh Claude Code (và mọi CLI agent): **CAPTURE** (ghi lại mọi run), **GOVERN** (guardrail realtime + audit chống giả mạo), **LEARN** (chấm điểm A–F, ROI, leaderboard). Go 1.26, ~390 file / 17 package, tích hợp sẵn Jira, Confluence, Slack, GitHub.

Kỹ thuật đã triển khai:

- **Policy-as-code trên từng tool-call của agent**: hook PreToolUse/PostToolUse của Claude Code → chuỗi guardrail: kill switch → sandbox scope → block rules → phát hiện secret/PII → budget → risk score → approval gate. Fail-closed mặc định.
- **Human-in-the-loop qua Slack**: hành động nhạy cảm chờ duyệt bằng reaction ✅/❌, có timeout bounded.
- **Audit chống giả mạo**: hash-chain ký Ed25519, checkpoint neo ngoài máy (git-committed); mọi con số trên dashboard truy vết được về đúng run sinh ra nó (`/provenance`).
- **Đo lường agent như đo người**: grade A–F có hệ quả (autonomy band `supervised|gated|trusted`), ROI, cost-per-agent, attribution ±lines theo agent, revert rate; khoảng tin cậy Wilson cho insight chi phí theo model.
- **Knowledge flywheel**: khai thác practice từ run tốt → AI draft skill → phân phối skill có hash-pin + chữ ký (chống supply-chain RCE — một lỗ RCE thật đã bị bắt và vá trong review) → đo adoption. Đây chính là cơ chế "guild + training" chạy bằng dữ liệu.
- **Vòng khép kín**: điểm thấp → flag → tự tạo Jira ticket → hạ autonomy band. Cost-aware routing: budget gate chỉ chặn model đắt, gợi ý `/model` rẻ hơn.
- Console 2 persona: view điều hành tiếng Việt cho CEO + 13 trang kỹ thuật cho operator. UI server-rendered không build step.
- Trưởng thành: CI GitHub Actions, ~160 file test Go + 6 kịch bản E2E, changelog v1–v15 trong đó mỗi version ghi lại một vòng red-team (v15: 3 reviewer, 25 finding); threat model ghi trung thực cả giới hạn.

**Liên hệ thực tế dự án:** đây là mảnh ghép mà mọi kế hoạch "đưa AI vào SDLC" đều thiếu — *ai giám sát agent?* Dandori là câu trả lời tôi đã xây xong: guardrail, audit, chấm điểm, ROI, và flywheel đào tạo — dùng đúng bộ Jira/Confluence/Slack của dự án.

## 7. my-kioku — Hệ thống memory cho agent, markdown-first

**Bài toán:** bộ nhớ dài hạn cho agent mà *người dùng sở hữu dữ liệu*: vault Obsidian markdown là database (wikilink + frontmatter là source of truth), SQLite FTS5 chỉ là index vứt được — rebuild 100% từ vault. TypeScript/Bun, npm package, 1 dependency runtime duy nhất.

Kỹ thuật đáng chú ý:

- **Tách deterministic-engine / LLM-judgement**: lệnh `reflect` thuần code, không LLM — phát hiện entity chưa phân loại, fact bị thay thế, trend tâm trạng… và emit `suggested_actions` truy vết được; agent cron chỉ làm phần phán đoán. Retrieval không dùng vector (FTS5 + mở rộng theo entity-link + filter quan hệ/thời gian) — một quyết định anti-RAG có chủ đích, đúng chỗ.
- **Phòng thủ trước model nhỏ không đáng tin**: quy tắc append-only (không cho LLM viết lại quá khứ — sinh ra từ một benchmark live bắt được model sửa entry cũ), assertion từ chối mọi edit làm đổi nguyên văn lời người dùng.
- **Context engineering cho agent host**: `init --skill` sinh SKILL.md protocol, SessionStart hook nạp `recall --digest`, cron đêm chạy `reflect`. Đã tích hợp làm memory provider cho my-crew.
- Xử lý tiếng Việt: suy luận ngày tháng từ ngôn ngữ tự nhiên ("hôm 12/4", "tuần trước") đặt trong engine deterministic.
- 45 file test + 4 harness mô phỏng agent thật (gọi Qwen qua OpenRouter), release semver, ~1.200 dòng docs.

**Liên hệ thực tế dự án:** kinh nghiệm thiết kế memory & context cho agent — lớp quyết định chất lượng khi agent chạy dài hơi trong dự án; và tư duy chọn *không* dùng RAG/vector khi bài toán không cần.

## 8. scan-to-ebook — Pipeline OCR bằng vision LLM ở quy mô thật

**Bài toán:** biến ảnh chụp/scan sách giấy (kể cả quốc ngữ 1917, tiếng Nhật tategaki dọc) thành EPUB sạch. Python thuần stdlib (zero runtime dependency), đã chạy hàng chục nghìn trang, đạt 0 lỗi OCR trên corpus khó.

Kỹ thuật đáng chú ý:

- **Context pre-pass** (kỹ thuật đắt giá nhất): một call multi-image trên 15 trang mẫu rút ra title/tác giả/thuật ngữ/tên riêng + chính tả chuẩn/quy ước footnote/layout/`pages_per_image`… lưu thành `context.json` sửa tay được, bơm vào prompt của *mọi* trang — few-shot/context engineering bảo đảm nhất quán xuyên trang. Prompt rule có điều kiện: chỉ thêm rule khi sách cần (thơ, spread 2 trang…).
- **Failure-mode engineering quanh model không ổn định**: backoff 4 lần cho lỗi transient, nhưng normalizer `_error_class` tự dừng sớm khi cùng một loại lỗi lặp 2 lần (lỗi deterministic — retry là phí tiền); trang trắng thật được placeholder không tính là fail; trang chết có placeholder đánh dấu để pass sau bỏ qua.
- **Chọn model bằng bằng chứng, không bằng cảm tính**: benchmark có số liệu (model chọn rẻ hơn ~15×, ~$0.003/trang, 0 lỗi đọc; quy tắc thành văn cấm hạ xuống model rẻ hơn nữa cho ngôn ngữ có dấu — 7.5 lỗi/trang, 75% sai dấu tiếng Việt).
- **Cost governance**: `--smoke` OCR 10 trang → ước tính chi phí toàn cuốn → confirm; sổ chi phí `cost.json` từng cuốn; sample EPUB công khai kèm giá từng cuốn.
- **Pipeline filesystem-as-queue**: 5 stage độc lập, resume mọi điểm, ghi atomic — không DB, không daemon. Kèm contract riêng cho agent (`docs/agents.md`, `doctor --json`, exit code ổn định).

**Liên hệ thực tế dự án:** mẫu PoC "vision LLM trong pipeline sản xuất" hoàn chỉnh — từ prompt engineering, xử lý lỗi model, đến chi phí đo được. Đúng dạng bài sẽ gặp khi đề xuất AI xử lý tài liệu/bản vẽ/scan trong hệ thống khách hàng.

## 9. Chủ đề xuyên suốt — triết lý kỹ thuật

Bốn nguyên tắc lặp lại có chủ đích trên cả 8 sản phẩm — cũng là những gì tôi sẽ mang vào proposal cho khách hàng:

1. **An toàn bằng kiến trúc, không bằng prompt.** Action Gateway (my-crew), guardrail chain + audit ký số (dandori), read-only choke point + AST validation (db-mate), local-only by design (my-notebook). LLM không bao giờ là tuyến phòng thủ cuối.
2. **Deterministic ở lõi, LLM ở biên.** Việc phải-đúng nằm trong code (verify layer của db-mate, `reflect` của kioku, hard-deny lớp A của my-crew); model chỉ làm phán đoán. Thiết kế luôn giả định model không đáng tin (verbatim assertion, hash-pin distribution, error-class early-abort).
3. **Chi phí là hạng mục kỹ thuật số một.** Budget 3 lớp BigQuery, routing funnel đo được 4× rẻ hơn, smoke-run ước giá trước khi chạy, ROI per-agent — mọi giải pháp đều trả lời được "tốn bao nhiêu" bằng số liệu.
4. **Interface cho agent là first-class.** JSON envelope ổn định + `hint` phục hồi, docs "for agents" riêng, exit code ổn định — nhất quán từ MCP server tới CLI.

## 10. Đối chiếu nhiệm vụ AI Engineer điển hình

| Nhiệm vụ | Bằng chứng sẵn có |
|---|---|
| Nghiên cứu GenAI cho gen Code, UT, Design, Test Case | Bộ MK (skill test/review/plan), skill sinh test case từ AC → Confluence; dandori đo chất lượng code do agent sinh (attribution, revert rate) |
| Đánh giá solution, viết Proposal (RAG, LLM, Agent) | 8 sản phẩm phủ đủ phổ: RAG có citation (my-notebook), semantic layer + agent (db-mate), multi-agent (my-crew), governance (dandori) — mỗi cái là một proposal đã được chứng minh bằng code chạy |
| Pair cùng team offshore tối ưu AI trong dự án | Bộ công cụ nhân bản được ([AI Toolkit for Offshore Teams](../02-ai-toolkit/01-ai-toolkit-offshore-team.md)); dandori knowledge flywheel biến practice tốt thành skill phân phối có kiểm soát |
| PoC thực tế → guild, training | scan-to-ebook & 3 MCP là PoC đã thành sản phẩm; skill/SKILL.md chính là guild dạng sống; console song ngữ cho stakeholder không kỹ thuật |

**Ghi chú trung thực về độ chín:** my-crew, my-db-mate, my-dandori có CI + test dày (lần lượt ~300 pytest / 58 Vitest / ~160 Go test); my-kioku có release semver + 45 test nhưng chưa có CI; scan-to-ebook thử lửa nhiều nhất (hàng chục nghìn trang) nhưng chưa publish PyPI; my-notebook đang ở giai đoạn sớm nhất (0.1.0, chưa CI).

