# Kiro + MK Kit: Decision and Engineering Guide

Dành cho lãnh đạo đơn vị, tech lead và kỹ sư của một dự án mà khách hàng yêu cầu Kiro. Cập nhật 2026-09-06.

Phần A (mục 1 đến 5) cho người ra quyết định, đọc trong mười phút. Phần B (mục 6 trở đi) cho người cài, dùng và bảo trì. Đọc trước [MK Kit Introduction](02-mk-kit-introduction.md) để biết bộ kit gồm gì trên Claude Code; kiến trúc "một nguồn, nhiều đích" và OpenCode ở [Agent Kit Portability](03-agent-kit-multi-harness-kiro-opencode.md).

Căn cứ: bản Kiro của bộ MK đã dựng và chạy thật trên `kiro-cli 2.21.1` (engine v2 mặc định, gói cá nhân, model `auto`), 14 lượt chạy trên một project mẫu, đọc log phiên từ cơ sở dữ liệu của Kiro và log hook của kit. Chỗ nào chưa thử sẽ ghi **[chưa kiểm chứng]**.

---

## Phần A. Quyết định

## 1. Kết luận trong 30 giây

Tình huống: khách hàng yêu cầu **Kiro** (AWS) làm harness chính cho team dev. Câu hỏi cần quyết không phải "dùng Kiro hay không", mà là **dùng Kiro trần hay Kiro bọc trong bộ quy trình MK** mà team đã có trên Claude Code.

Kiro mặc định là một trợ lý code tốt nhưng **không mang theo quy trình**: mỗi kỹ sư tự nhớ luật, không có chốt chặn trước khi AI đọc hay ghi file, không có trí nhớ giữa các phiên, đầu ra mỗi người một kiểu.

Bọc Kiro bằng bộ MK giữ nguyên model, license và cách gõ lệnh của Kiro, nhưng thêm:

- Luật của team nạp tự động mỗi lượt, và Kiro nâng chúng thành chỉ thị bắt buộc.
- Chốt chặn chạy trước mỗi tool call: AI không đọc được `.env`, thư mục sinh ra khi đóng gói, không quét toàn repo.
- Cùng một bộ kỹ năng (fix, test, review, plan, ship…) và trợ lý chuyên trách cho cả team.
- Trạng thái phiên được ghi lại, phiên sau tiếp tục đúng chỗ dở.
- Báo cáo và kế hoạch rơi đúng thư mục, đúng tên, audit được.

Giá phải trả: một lệnh cài, thêm khoảng 0,1 đến 0,2 giây mỗi prompt và khoảng 4 KB context mỗi lượt.

**Đề xuất:** pilot một team, một repo, hai tuần; đo bốn chỉ số ở mục 4 rồi quyết định mở rộng.

---

## 2. Năm lý do, nhìn từ phía quản lý

**Kiểm soát rủi ro nằm ở tầng hệ thống, không phụ thuộc AI "nhớ".** Với Kiro trần, AI có đọc file bí mật hay không tuỳ model có nghe lời hay không. Với MK, hook chặn đường dẫn chạy trước mỗi tool call; đường dẫn cấm thì tool không chạy, Kiro báo lý do và model tự đổi hướng. Đã kiểm chứng: lệnh quét toàn repo bị chặn, model tự thu hẹp về thư mục nguồn. Chính sách bảo mật dữ liệu là file cấu hình trong repo, review được, bắt buộc được.

**Chất lượng đồng đều giữa các kỹ sư.** "Sửa bug", "chạy test", "review code" cho cùng một cấu trúc đầu ra vì đi qua cùng một skill. Kỹ sư mới vào dùng ngay quy trình của người giỏi nhất, không phụ thuộc ai viết prompt hay hơn.

**Tri thức không thất thoát khi đóng terminal.** Mỗi phiên kết thúc, kit ghi lại việc đã làm và việc còn dở; phiên sau đọc lại. Đã kiểm chứng: mở phiên mới, hỏi "còn gì chưa làm", AI trả lời đúng mà không cần đọc lại file. Báo cáo test, kế hoạch, review lưu vào `plans/` theo quy ước đặt tên, là dấu vết audit khi cần truy vì sao một thay đổi được đưa vào.

**Chi phí dự đoán được.** Chi phí đo trên các lượt chạy thật nằm trong khoảng 0,07 đến 0,86 credit mỗi tác vụ; nặng nhất là chạy test và viết báo cáo. Hook thêm dưới 0,2 giây mỗi prompt, không đáng kể so với thời gian model suy nghĩ.

**Không bị khoá vào một công cụ.** Cùng bộ kit chạy trên Claude Code, Kiro và OpenCode. Khách hàng đổi harness, team không phải đổi quy trình. Toàn bộ kit là file văn bản trong repo, sở hữu hoàn toàn.

---

## 3. So sánh trực tiếp

| Hạng mục | Kiro mặc định | Kiro + MK (agent `mk`) |
|---|---|---|
| Luật của team | Không có sẵn, tự viết steering từ đầu | 4 file rule + 1 steering về cơ chế kit, nạp mỗi lượt |
| Hook | Không có | 5 sự kiện, 7 hook script: khởi tạo phiên, nhắc luật, chặn đường dẫn, ghi trạng thái, hai gate tuỳ chọn |
| Chặn đường dẫn | Không | Trước mỗi tool call, kể cả bên trong subagent |
| Kỹ năng | Không, prompt tay từng lần | 29 skill của bản lite; 9 skill quan trọng nhúng toàn văn; gợi ý tự động theo từ khoá |
| Trợ lý chuyên trách | Không định nghĩa | 12 subagent (planner, tester, code-reviewer…) có hook riêng |
| Trí nhớ giữa phiên | Không | Ghi trạng thái lúc kết thúc, đọc lại lúc khởi động |
| Quy ước đầu ra | Tuỳ model | Báo cáo, kế hoạch theo naming trong cấu hình kit, đúng thư mục `plans/` |
| Chọn agent | Gõ `--agent` mỗi lần | Cấu hình workspace đặt `mk` làm mặc định, `kiro-cli chat` là đủ |
| Model cho subagent | Một model cho tất cả | Map theo vai trò: model nhẹ cho việc nhẹ, model mạnh cho việc nặng |

Kit gốc viết cho Claude Code. Một adapter duy nhất dịch payload của Kiro sang payload Claude Code để các hook gốc chạy **không cần sửa**. Khi kit gốc nâng cấp, bản Kiro chỉ cần dựng lại bằng script.

---

## 4. Pilot đề xuất và cách đo

1. **Tuần 0, một ngày.** Bổ sung 10 skill tích hợp và cấu hình MCP vào bản Kiro (mục 11); chọn một team và một repo đang hoạt động; cài kit, commit `.kiro/` và `.claude/`. Từ đây `kiro-cli chat` tự dùng agent `mk`.
2. **Tuần 1 và 2.** Team làm việc bình thường. Đào tạo chỉ cần một trang 10 lệnh (mục 8).
3. **Cuối tuần 2.** Đọc bốn chỉ số rồi quyết định mở rộng, bật thêm gate, hoặc dừng.

| Chỉ số | Kỳ vọng sau 2 tuần | Lấy từ đâu |
|---|---|---|
| Số lần hook chặn truy cập file cấm | Lớn hơn 0 | `grep -c '"decision":"block"' .claude/hooks/.logs/hook-log.jsonl` |
| Tỷ lệ tác vụ test và review có báo cáo trong `plans/reports/` | Trên 80% | đếm `plans/reports/*-report.md` theo quy ước tên trong `.mk.json` |
| Credit trung bình mỗi tác vụ | Trong khoảng 0,1 đến 1,0 | `/usage` trong phiên, hoặc bảng `conversations_v2` trong DB của Kiro |
| Thời gian kỹ sư mới làm được tác vụ đầu tiên đúng quy trình | Dưới 1 giờ | Quan sát |

Ba dòng đầu, cộng sức khoẻ hook và tỷ lệ team chủ động dùng kit, đọc được tự động bằng skill đo lường của kit; xem [MK Observe, mục 5](05-mk-observe-agent-metrics.md#5-dùng-cho-pilot-kiro). Hook ổn định hay không: không có dòng lỗi trong `hook-log.jsonl`; khi kiểm chứng, 45 hook liên tiếp chạy không lỗi.

Nếu dừng: xoá `.kiro/` và `.claude/`, repo không còn dấu vết gì.

---

## 5. Cần quyết định gì hôm nay

1. Đồng ý pilot theo mục 4, chỉ định team, repo và người sở hữu kit.
2. Xác nhận với khách: Kiro CLI hay IDE, phiên bản nào, có bật engine v3 chưa. Câu trả lời quyết định bản kit nào được dựng.
3. Xác nhận gói Kiro và ai trả: chạy nền cho CI cần gói Pro trở lên.
4. Chốt nơi lưu mã nguồn bản Kiro của kit (hiện nằm ngoài repo này, chưa vào git) để đơn vị triển khai sở hữu và dựng lại được.

---

## Phần B. Kỹ thuật

## 6. Kiến trúc một câu

`.claude/` **vẫn là nơi chạy thật** của kit (skill toàn văn, rules, 7 hook gốc không sửa, cấu hình). `.kiro/` là **lớp vỏ sinh tự động** để Kiro nhìn thấy kit: wrapper skill, steering, agent JSON, cấu hình mặc định. Một adapter duy nhất `.claude/hooks/adapters/kiro.cjs` dịch sự kiện của Kiro sang payload Claude Code, gọi hook gốc, dịch kết quả ngược lại.

Hệ quả thực tế: **phải commit cả `.kiro/` lẫn `.claude/`** vào repo dự án. Không sửa tay trong `.kiro/`; sửa ở nguồn rồi dựng lại (mục 12).

```
repo-du-an/
├── AGENTS.md                      Kiro tự nạp; mô tả kit + tool mapping + quy ước checklist
├── .claude/                       runtime của kit
│   ├── skills/<dir>/SKILL.md      29 skill toàn văn (bản lite v2.6.1)
│   ├── rules/*.md                 5 rules
│   ├── hooks/*.cjs                7 hook gốc, giữ nguyên
│   ├── hooks/adapters/kiro.cjs    adapter Kiro → Claude Code
│   ├── hooks/.logs/               hook-log.jsonl, kiro-session.json, transcript tổng hợp
│   ├── .mk.json, .mkignore        cấu hình kit, danh sách đường dẫn cấm
└── .kiro/
    ├── skills/mk-<name>/SKILL.md  29 wrapper, thành slash command /mk-<name>
    ├── steering/mk-*.md           4 rules + mk-kit.md, inclusion: always
    ├── agents/mk.json             orchestrator, khai báo hook
    ├── agents/<12 subagent>.json  planner, tester, code-reviewer… mỗi agent có hook riêng
    ├── agents/prompts/*.md        system prompt từng agent
    ├── settings/cli.json          {"chat.defaultAgent": "mk"}
    └── hooks/mk-hooks.json        chỉ cho IDE / engine v3, chưa kiểm chứng
```

Steering `mk-kit.md` nói cơ chế kit: skill là `/mk-<name>`, subagent gọi bằng `use_subagent`, bảng tool mapping, quy ước checklist, "một tool call một lần trên đường dẫn lạ". Tổng steering luôn được nạp, khoảng 4 KB mỗi lượt. Wrapper skill giữ `name`, `description`, body trỏ về `.claude/skills/<dir>/SKILL.md` và thêm dòng `Request / arguments: $ARGUMENTS`.

---

## 7. Cài đặt

Yêu cầu: Node 18 trở lên (hook chạy bằng Node), Kiro CLI đã đăng nhập.

```bash
# từ thư mục mã nguồn bản Kiro của kit
./kiro-init.sh /path/to/repo             # cài mới
./kiro-init.sh /path/to/repo --force     # cập nhật, giữ .mk.json, hooks/.logs, settings/cli.json
./kiro-init.sh /path/to/repo --dry-run   # xem sẽ chép gì
./kiro-init.sh /path/to/repo --no-default  # không đặt mk làm agent mặc định

cd /path/to/repo
kiro-cli agent validate --path .kiro/agents/mk.json   # phải báo valid
kiro-cli chat                                          # phiên đầu tiên
```

Tự kiểm tra: lượt đầu tiên phải thấy khối `Session Information` do hook bơm vào. Không thấy nghĩa là hook không chạy; nguyên nhân thường gặp là đang dùng agent built-in `kiro_default` (agent built-in không chạy hook) hoặc `settings/cli.json` chưa có. Chạy `kiro-cli chat --agent mk` để chắc.

Đưa vào git: `.kiro/`, `.claude/`, `AGENTS.md`. Bỏ qua `.claude/hooks/.logs/` nếu không muốn commit log phiên.

---

## 8. Dùng hằng ngày: 10 lệnh cho team

Gõ trong phiên tương tác. Tên skill dùng gạch ngang `/mk-…` (Claude Code dùng `/mk:…`, cùng một skill).

| Việc | Lệnh |
|---|---|
| Bắt đầu, hỏi kit có gì | `kiro-cli chat` rồi hỏi "kit này có gì?" |
| Sửa bug | `/mk-fix mô tả lỗi` |
| Chạy test, có báo cáo | `/mk-test` |
| Lập kế hoạch | `/mk-plan mô tả tính năng` |
| Làm cả vòng plan → code → test → review | `/mk-cook mô tả tính năng` |
| Review code trước PR | `/mk-code-review` |
| Commit đúng chuẩn | `/mk-git commit` |
| Ship: test, review, PR | `/mk-ship` |
| Cập nhật docs sau khi đổi code | `/mk-docs` |
| Xem việc còn dở từ phiên trước | hỏi "còn gì chưa làm?" |

Ba khác biệt so với Claude Code cần nói với team ngày đầu:

1. **Slash chỉ có ở chế độ tương tác.** Chạy `--no-interactive` mà gõ `/mk-test` thì Kiro hiểu là lệnh CLI. Headless viết câu tự nhiên: "Use the mk-test skill to run the suite". Gợi ý skill theo từ khoá (Kit hint) sẽ dẫn model đến đúng skill.
2. **Không có TodoWrite.** Kit theo dõi tiến độ qua **quy ước checklist**: cuối câu trả lời có `- [x] xong`, `- [ ] còn`, `- [~] đang làm`; việc nhiều lượt thì ghi thêm `plans/checklist.md`. Adapter đọc hai chỗ đó để ghi trạng thái phiên. Steering `mk-kit.md` đã dặn model làm vậy.
3. **Skill không tự kích hoạt** như Claude Code. Kiro chỉ nạp skill khi gọi slash hoặc khi model đọc wrapper. Hook `userPromptSubmit` bù bằng một dòng gợi ý: gõ "fix", "bug", "test", "plan", "review"… sẽ nhận "Kit hint: consider /mk-fix". Tắt bằng `MK_KIRO_NO_ROUTER=1`.

---

## 9. Hook chạy thế nào trên Kiro

Kiro engine v2 chỉ nhận hook **khai báo trong file agent JSON**, không đọc `.kiro/hooks/*.json`. Vì vậy `mk.json` và 12 agent con đều mang khối `hooks`. Adapter nhận payload Kiro qua stdin, dựng payload Claude Code, gọi hook gốc.

| Sự kiện Kiro | Hook gốc được gọi | Ghi chú |
|---|---|---|
| `agentSpawn` | `session-init` (agent `mk`) hoặc `subagent-init --agent <tên>` (agent con) | Bơm khối Session Information; đầu ra đến model nhưng Kiro không lưu vào lịch sử |
| `userPromptSubmit` | `dev-rules-reminder`, `simplify-gate`, `workflow-artifact-gate`, thêm Kit hint | stdout thành `additional_context`; Kiro tự thêm câu "you must follow…" nên rules thành chỉ thị bắt buộc |
| `preToolUse` (không matcher) | `scout-block` | Chạy cho mọi tool, kể cả trong subagent. Chặn = exit 2 + lý do ở stderr; Kiro không chạy tool và báo lý do cho model |
| `postToolUse` matcher `use_subagent`, `fs_write` | `session-state` | Adapter dựng transcript tổng hợp: checklist → TodoWrite, lời gọi subagent → Task |
| `stop` | `session-state` | Ghi `~/.claude/session-states/<hash>/latest.md`, phiên sau đọc lại |

Một agent con trông như sau (rút gọn):

```json
{
  "name": "planner",
  "description": "<giữ nguyên, Kiro chọn subagent theo trường này>",
  "prompt": "file://./prompts/planner.md",
  "tools": ["read", "write", "shell", "web_fetch", "web_search", "subagent"],
  "resources": ["file://AGENTS.md", "file://README.md",
                "file://.kiro/steering/**/*.md", "skill://.kiro/skills/*/SKILL.md"],
  "model": "claude-sonnet-4.5",
  "hooks": {
    "agentSpawn": [{"command": "node .claude/hooks/adapters/kiro.cjs subagent-init --agent planner"}],
    "preToolUse": [{"command": "node .claude/hooks/adapters/kiro.cjs scout-block"}],
    "stop":       [{"command": "node .claude/hooks/adapters/kiro.cjs session-state --agent planner"}]
  }
}
```

Agent `mk` (orchestrator) dùng `tools: ["@builtin"]`, `allowedTools: ["read","subagent"]`, và mang thêm `userPromptSubmit` và `postToolUse`. `memory: project` của Claude Code không có tương đương, bỏ.

Điểm khác Claude Code đáng nhớ khi viết hook mới:

- Matcher là **tên tool chính xác**, không phải regex; `fs_write|execute_bash` không kích hoạt gì.
- Quyết định chặn chỉ qua **exit code 2**; JSON `{"decision":"block"}` trên stdout bị bỏ qua.
- Payload không có `session_id`; adapter tự cấp một id theo cwd và lưu ở `.claude/hooks/.logs/kiro-session.json`.
- Tên tool ở agent chính: `fs_read, fs_write, execute_bash, glob, grep, use_subagent, web_fetch, web_search`. Bên trong subagent: `read, write, shell, summary`. Adapter đã map cả hai bộ về `Read/Write/Bash/Task…` của Claude Code.
- Tag năng lực trong `tools` của agent: `read, write, shell, web_fetch, web_search, subagent, @builtin`. Không có tag `web`.

Log để debug: `.claude/hooks/.logs/hook-log.jsonl` (mỗi lần hook chạy một dòng), `MK_KIRO_DEBUG=1` ghi payload thô vào `kiro-raw.jsonl`.

---

## 10. Cấu hình và biến môi trường

| Biến / khoá | Tác dụng | Mặc định |
|---|---|---|
| `MK_KIRO_SOFT_BLOCK=1` | Hook chặn chỉ cảnh báo, không dừng tool. Adapter tự bật khi phát hiện CI | Tắt |
| `MK_KIRO_NO_ROUTER=1` | Tắt Kit hint theo từ khoá | Tắt |
| `MK_KIRO_DEBUG=1` | Ghi payload thô của Kiro | Tắt |
| `MK_SIMPLIFY_DISABLED=1` | Tắt simplify-gate cho phiên này | |
| `MK_WORKFLOW_ARTIFACT_GATE_DISABLED=1` | Tắt workflow-artifact-gate cho phiên này | |
| `.claude/.mk.json` → `simplify.gate.enabled: true` | Bật gate chặn ship/merge khi diff lớn chưa simplify | Tắt |
| `.claude/.mk.json` → `hooks.workflow-artifact-gate: true` | Bật gate yêu cầu artifact review trước finalize | Tắt |
| `.claude/.mkignore` | Danh sách đường dẫn `scout-block` chặn | node_modules, dist, .git, .env… |

Model cho subagent: bản dựng map `haiku → claude-haiku-4.5`, `sonnet → claude-sonnet-4.5`, `opus/inherit → auto`. Gói Kiro của dự án quyết định model nào thực sự khả dụng; sửa map trong script dựng (mục 12) nếu cần.

Permission: v2 khai `allowedTools` trong từng agent JSON; khối `permission` trong `.mk.json` không có tác dụng trên Kiro.

Bảo mật: `scout-block` là chốt chặn thực, không phải lời dặn. Đã kiểm chứng `glob **/*.js` bị chặn và model tự thu hẹp về `src/**/*.js`. Chính sách `.mkignore` là file trong repo, review qua PR như code.

---

## 11. Việc còn lại trước pilot với bộ toolkit đầy đủ

Bản Kiro được dựng từ **bản lite gốc**, không phải từ bản cài đầy đủ đã bổ sung skill tích hợp ([AI Toolkit for Offshore Teams](01-ai-toolkit-offshore-team.md)). Ba khác biệt phải xử lý, ước 1 đến 2 ngày:

1. **10 skill Jira/Confluence/Slack** (danh sách ở [AI Toolkit for Offshore Teams, mục 6](01-ai-toolkit-offshore-team.md#6-use-case--mk-làm-xương-sống-workflow-skill-nối-ra-ngoài)) chưa có wrapper. Cách làm: chạy script dựng với nguồn là `.claude/skills/` của bản cài đầy đủ thay vì bản lite; script sinh wrapper cho mọi thư mục có `SKILL.md`. Ước nửa ngày kể cả chạy thử một skill.
2. **Ba MCP server** chưa được chuyển. Bản Kiro bỏ `.mcp.json` có chủ đích. Cần viết `.kiro/settings/mcp.json` (key `mcpServers`, cùng format, thêm `autoApprove` cho tool chỉ đọc) và bật MCP cho agent `mk` **[chưa kiểm chứng]**: theo tài liệu Kiro, agent JSON cần `includeMcpJson: true` hoặc khai `mcpServers` trực tiếp. Credential đi qua biến môi trường máy, không qua file trong repo. Khi tổ chức chưa bật MCP cho Kiro, đường tạm là CLI in ra cùng envelope để skill giữ nguyên logic; xem [Tool Mapping by Role, mục 6](../04-organization-f-ai-adoption/01-tool-mapping-by-role.md#6-đường-kỹ-thuật).
3. **Rules đã tuỳ biến trong bản cài đầy đủ** (bản lite v2.4.0 cộng chỉnh sửa) khác bản lite v2.6.1 mà bản Kiro dùng. Quyết định lấy bản nào làm nguồn rồi dựng lại một lần; không ghép tay.

Ngoài ra: script Python trong 7 skill (`sequential-thinking`, `docs-seeker`…) chưa chạy thử trên Kiro; venv của kit độc lập với harness nên khả năng cao chạy được, cần một lần xác nhận. Nếu khách làm việc theo spec Kiro, `mk:plan` nên có tuỳ chọn xuất `.kiro/specs/<slug>/requirements.md`, `design.md`, `tasks.md`; chưa làm.

---

## 12. Dựng lại kit khi nguồn thay đổi

```bash
cd <thư mục nguồn bản Kiro của kit>
python3 build_kiro_kit.py            # đọc bản lite, sinh kit/.claude và kit/.kiro
python3 build_kiro_kit.py --no-inline  # wrapper mỏng cho cả 9 skill tier-1
strip-identity/scripts/verify.sh kit/.claude && strip-identity/scripts/verify.sh kit/.kiro
for f in kit/.kiro/agents/*.json; do kiro-cli agent validate --path "$f"; done
./kiro-init.sh /path/to/repo --force
```

Mặc định 9 skill dùng nhiều nhất (scout, test, fix, cook, docs, git, ship, plan, code-review) được **nhúng toàn văn** vào wrapper để model không phải đọc thêm file; 20 skill còn lại là wrapper mỏng trỏ về `.claude/skills/`. Skill `archify` giữ tên `/archify`.

Trước mỗi lần dựng, kiểm tra hai điều: `kiro-cli --version` vẫn là engine v2 (nếu Kiro đổi mặc định sang v3, agent JSON hiện tại bị từ chối, script dựng cần thêm chế độ v3), và bản lite nguồn ở phiên bản nào. Phân phối hiện là script chép file; đóng thành Power để cài từ một URL là bước sau pilot.

---

## 13. Rủi ro và giới hạn đã biết

| Vấn đề | Mức / ảnh hưởng | Đối ứng |
|---|---|---|
| Kit chỉ chạy trên engine v2 của Kiro CLI (mặc định hiện nay). Engine v3 (early release) từ chối agent v2, bỏ qua `.kiro/hooks/*.json` | Trung bình; kit không chạy trên v3 | Script dựng thêm chế độ v3 khi Kiro đổi mặc định. Hỏi khách đang chuẩn hoá phiên bản nào |
| Kiro headless chết khi hook chặn 1 trong 2 tool gọi song song (lỗi Bedrock "Expected toolResult blocks") | Trung bình, chỉ CI và chạy nền | Steering dặn "một tool call một lần khi chạm đường dẫn lạ"; `MK_KIRO_SOFT_BLOCK=1` trong CI đổi chặn thành cảnh báo. Phiên tương tác tự phục hồi |
| Kiro IDE dùng file hook riêng (dạng v3), khác CLI | Hai cấu hình song song | `.kiro/hooks/mk-hooks.json` có sẵn nhưng chưa kiểm chứng trên IDE |
| Bản Kiro chưa gồm 10 skill tích hợp và MCP của bộ toolkit | Trung bình; 1 đến 2 ngày trước pilot | Mục 11 |
| `session-state` ghi vào `~/.claude/session-states/` dùng chung với Claude Code | Cùng repo mở bằng hai harness sẽ ghi đè nhau | Chấp nhận trong pilot; tách thư mục là việc của bản lite |
| Hook thêm 50 đến 100 ms mỗi tool call, 0,1 đến 0,2 s mỗi prompt, khoảng 4 KB context mỗi lượt | Thấp | Chấp nhận; cửa sổ context của Kiro là 1M token |
| Gợi ý skill theo từ khoá có thể gợi thừa | Thấp | `MK_KIRO_NO_ROUTER=1` hoặc gọi thẳng `/mk-…` |
| Hai gate chất lượng (simplify, review artifact) tắt mặc định | Thấp | Bật trong `.mk.json` khi team sẵn sàng (mục 10) |
| Slash `/mk-…` chỉ dùng được ở chế độ tương tác | Thấp | Headless dùng câu tự nhiên, Kit hint dẫn đúng chỗ |
| Đầu ra `agentSpawn` không lưu vào lịch sử hội thoại của Kiro | Không xem lại được trong log | Xem `hook-log.jsonl` |
| Thông báo chặn glob rộng in `Pattern: undefined` | Cosmetic | Đã báo về bản lite |
| Cần một người sở hữu kit trong team | Trung bình | Nêu rõ vai trò từ đầu pilot. Kit là file văn bản, không cần hạ tầng |

## Câu hỏi mở

1. Khách có cho phép cài hook chạy lệnh cục bộ (Node) trong repo của họ không? Toàn bộ chốt chặn dựa vào điều này.
2. Khách dùng Kiro IDE song song CLI không? Nếu có, phải kiểm chứng `.kiro/hooks/mk-hooks.json` trên IDE và chấp nhận hai cấu hình.
3. Khách làm việc theo spec của Kiro hay theo `plans/` của MK? Ảnh hưởng nơi lưu kế hoạch và báo cáo.
4. `includeMcpJson` trong agent JSON v2 có đủ để agent `mk` thấy ba MCP server không, hay phải khai `mcpServers` trực tiếp? Cần một lần thử.
