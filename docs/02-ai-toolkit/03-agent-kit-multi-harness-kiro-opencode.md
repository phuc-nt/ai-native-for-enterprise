# Agent Kit Portability: Claude Code, Kiro, OpenCode

Điều tra ngày 2026-09-06, cập nhật cùng ngày sau khi kiểm chứng Kiro thực tế. Câu hỏi: bộ agent kit MK hiện tối ưu cho Claude Code, làm sao chạy được trên **Kiro** (khi khách hàng yêu cầu làm harness chính), **Claude Code** (harness gốc của kit) và **OpenCode** (đề xuất harness mã nguồn mở) mà không duy trì ba bản sao.

Mức tin cậy của từng nhận định: **[đã thử]** = đã chạy thử thực tế, **[source]** = đọc mã nguồn OpenCode bản clone 2026-08-08, **[docs]** = tài liệu chính thức kiro.dev / opencode.ai, **[chưa kiểm chứng]** = chưa có điều kiện thử.

> Bản đầu của tài liệu này viết phần Kiro theo tài liệu schema **v3**. Thực tế `kiro-cli 2.21.1` chạy **engine v2** mặc định; `--v3` là early release, từ chối agent v2 và bỏ qua file hook rời. Toàn bộ phần Kiro dưới đây đã viết lại theo v2 sau khi dựng và chạy bản Kiro của kit (14 lượt chạy, đọc log phiên và log hook). Cách dùng chi tiết ở [Kiro + MK Kit: Engineering Guide](05-kiro-mk-kit-engineering-guide.md); lý do và pilot ở [Decision Brief](04-kiro-mk-kit-decision-brief.md).

---

## 1. Kết luận nhanh

| | Claude Code | OpenCode 1.18 | Kiro CLI 2.21 (engine v2) |
|---|---|---|---|
| Đọc `.claude/skills/` tại chỗ | có | **có, đủ 39 skill [đã thử]** | không, sinh wrapper `.kiro/skills/mk-*/` [đã thử] |
| Đọc `CLAUDE.md` | có | có, khi không có `AGENTS.md` [source] | không, đọc `AGENTS.md`, `README.md` và `.kiro/steering/` [đã thử] |
| Đọc `.claude/rules/*.md` | có | không, khai báo `instructions` [source] | không, chuyển thành steering; CLI nạp hết, bỏ qua `inclusion` [đã thử] |
| Đọc `.claude/agents/*.md` | có | không, cần `.opencode/agents/*.md` [source] | không, cần `.kiro/agents/*.json`; file `.md` bị từ chối [đã thử] |
| Hook JSON stdin | có | không, viết plugin TS [source] | có, khai trong agent JSON; chặn bằng exit 2 [đã thử] |
| `.mcp.json` | có | không, khối `mcp` trong `opencode.json` [source] | `.kiro/settings/mcp.json` cùng format [docs] |
| Gọi skill bằng `/tên` | có | không, model tự gọi tool `skill` | có, chỉ ở chế độ tương tác [đã thử] |
| Subagent | có | có, tool `task` | có, `use_subagent`, agent con chạy hook riêng [đã thử] |

**Đề xuất, đã thực hiện cho Kiro:** giữ `.claude/` là **nguồn sự thật và nơi chạy thật**. OpenCode chỉ cần một lớp mỏng viết tay (`opencode.json` + agents + commands + 1 plugin). Kiro dùng một **script sinh** `.kiro/` từ `.claude/` và một adapter hook; `.claude/` được ship cùng vì wrapper và adapter trỏ về đó. Không sửa tay trong `.kiro/`.

Ba việc từng cần làm trước khi cam kết với khách đã xong: cài Kiro CLI và chạy thử trên repo mẫu, xác nhận contract stdin/exit code của hook, xác nhận tên skill `mk-cook` được chấp nhận. Kết quả ở mục 3.1 và 6.

---

## 2. Bộ kit hiện có, nhìn theo lớp

Kiểm kê từ `.claude/` của workspace này.

| Lớp | Thành phần | Số lượng | Phụ thuộc Claude Code |
|---|---|---|---|
| Chỉ dẫn | `CLAUDE.md` gốc, `.claude/rules/*.md` | 1 + 5 | Thấp: markdown thuần, chỉ nhắc tên tool ở vài chỗ |
| Skill | `.claude/skills/*/SKILL.md` + `references/`, `scripts/` | 39 (7 có script Python) | Trung bình: 12 skill nhắc `TaskCreate`, `AskUserQuestion`, `Task(...)`, `subagent_type`, `TodoWrite` |
| Agent | `.claude/agents/*.md` | 11 | Cao: frontmatter `tools:` là danh sách tên tool Claude, `model: opus`, `memory: project` |
| Hook | `.claude/hooks/*.cjs` gắn qua `settings.json` | 7 hook, 6 sự kiện | Rất cao: đọc JSON stdin theo format Claude Code, trả exit code / JSON |
| MCP | `.mcp.json` (`mcpServers`) | tuỳ dự án | Thấp: format chuẩn MCP |
| Cấu hình MK | `.mk.json`, `.mkignore`, `statusline.cjs`, `scripts/` | | Rất cao: statusline và session-state chỉ Claude Code có |

Tên skill dùng namespace `mk:cook`, `mk:plan`, trong khi thư mục là `cook`, `mk-plan`. Điểm này quan trọng ở mục 5.

Sự kiện hook đang dùng và mục đích:

| Hook | Sự kiện Claude Code | Làm gì |
|---|---|---|
| `session-init.cjs` | SessionStart | Nạp `.mk.json`, phát hiện project, đẩy context |
| `subagent-init.cjs` | SubagentStart | Bơm ~200 token context cho subagent |
| `dev-rules-reminder.cjs` | UserPromptSubmit | Nhắc rules, đường dẫn plans/docs, quy ước đặt tên |
| `simplify-gate.cjs` | UserPromptSubmit | Chặn ship/merge khi diff lớn chưa simplify |
| `workflow-artifact-gate.cjs` | UserPromptSubmit | Kiểm tra artifact review trước finalize |
| `scout-block.cjs` | PreToolUse | Chặn Bash/Read/Edit chạm thư mục trong `.mkignore` |
| `session-state.cjs` | Stop, SubagentStop, PostToolUse | Lưu tiến độ, làm mới statusline |

---

## 3. Ba harness, năng lực liên quan

### 3.1 Kiro

Nói phiên bản trước, schema sau. Mọi dòng dưới đây đúng với `kiro-cli 2.21.1`, engine v2 mặc định [đã thử]. Tài liệu trên kiro.dev phần lớn viết theo v3 và IDE, nên đọc docs mà không thử sẽ sai ở đúng những chỗ quan trọng.

- Bề mặt: IDE (fork VS Code), CLI (`kiro-cli`, tiền thân Amazon Q Developer CLI), Web, Mobile. CLI có hai engine: **v2 mặc định**, **v3 early release** bật bằng `kiro-cli --v3`. v3 từ chối agent JSON của v2 và không đọc `.kiro/hooks/*.json` [đã thử]. IDE dùng file hook riêng dạng giống v3 [docs].
- Chỉ dẫn: CLI nạp **toàn bộ** `.kiro/steering/*.md`, bỏ qua `inclusion` [đã thử]. Tự nạp thêm `AGENTS.md`, `README.md`, `AmazonQ.md` ở gốc repo và `~/.kiro/skills/*` [đã thử]. Không đọc `CLAUDE.md`.
- Skill: `.kiro/skills/<name>/SKILL.md`, `name` trùng tên thư mục, chỉ chữ thường, số, gạch ngang [đã thử]. Skill thành slash command **chỉ trong phiên tương tác**; headless (`--no-interactive`) coi `/x` là lệnh CLI, phải viết "Use the mk-x skill…" [đã thử]. Custom agent phải khai `resources: ["skill://.kiro/skills/*/SKILL.md"]` mới thấy skill [đã thử]. Skill không tự kích hoạt theo ngữ cảnh như Claude Code.
- Agent: **chỉ JSON** `.kiro/agents/<name>.json`; `.md` bị `kiro-cli agent validate` từ chối [đã thử]. `tools` là tag năng lực `read, write, shell, web_fetch, web_search, subagent, @builtin` (không có `web`) [đã thử]. `prompt` nhận `file://` [đã thử]. Agent built-in `kiro_default` không chạy hook; muốn `kiro-cli chat` không tham số dùng agent của kit, đặt `.kiro/settings/cli.json` = `{"chat.defaultAgent":"mk"}` (theo workspace) [đã thử].
- Subagent: gọi qua tool `use_subagent` (`InvokeSubagents`, mảng `{agent_name, query}`), trả `summaries[{taskDescription, contextSummary, taskResult}]`; agent con chạy hook `agentSpawn / preToolUse / stop` của chính nó; tên tool bên trong agent con đổi thành `read, write, shell, summary` [đã thử].
- Hook: khai trong khối `hooks` của agent JSON, sự kiện camelCase `agentSpawn, userPromptSubmit, preToolUse, postToolUse, stop` [đã thử]. `matcher` là **tên tool chính xác**, không phải regex [đã thử]. Chặn bằng **exit code 2 + stderr**; JSON `decision` trên stdout bị bỏ qua [đã thử]. stdout của `userPromptSubmit` thành `additional_context` và Kiro tự thêm câu "you must follow…" [đã thử, đọc từ DB phiên]. Payload không có `session_id` [đã thử]. Tên tool ở agent chính: `fs_read, fs_write, execute_bash, glob, grep, use_subagent, web_fetch, web_search, code, introspect, use_aws…` [đã thử].
- MCP: `.kiro/settings/mcp.json` và `~/.kiro/settings/mcp.json`, key `mcpServers`, field như Claude Code cộng `disabled`, `autoApprove`, `disabledTools`; biến môi trường `${VAR}` [docs]. Agent v2 bật MCP qua `includeMcpJson` hoặc khai `mcpServers` trực tiếp [chưa kiểm chứng].
- Permission: v2 dùng `allowedTools` trong agent JSON [đã thử]. `permissions.yaml` ngoài repo và `permissions.rules` là v3 [docs].
- Spec: `.kiro/specs/<feature>/{requirements,design,tasks}.md` [docs]. Điểm Kiro có mà hai harness kia không có sẵn.
- Power: gói skill + MCP + steering theo chuẩn Agent Plugins, cài từ marketplace hoặc URL [docs].
- Chạy nền: `kiro-cli chat --no-interactive`, `--output-format stream-json`; `KIRO_API_KEY` cần gói Pro trở lên [docs]. Cửa sổ context 1M token; gói Free chạy model `auto` [đã thử].
- Lỗi đã gặp: headless chết khi hook chặn 1 trong 2 tool gọi song song trong cùng lượt (Bedrock báo thiếu `toolResult`); phiên tương tác tự phục hồi [đã thử].

### 3.2 OpenCode

- Bản đã thử: 1.18.20, có đối chiếu với mã nguồn clone ngày 2026-08-08. MIT, phát hành gần như hằng ngày. Bản V2 beta đổi API plugin và cấu trúc permission, chưa phải mặc định.
- Tương thích Claude Code có chủ đích [source `session/instruction.ts`, `skill/index.ts`]: đọc `CLAUDE.md` khi không có `AGENTS.md`, đọc `~/.claude/CLAUDE.md`, quét `.claude/skills/` và `~/.claude/skills/`. Tắt bằng `OPENCODE_DISABLE_CLAUDE_CODE*`.
- **Đã thử:** `opencode debug skill` trong workspace này liệt kê đủ 39 skill của kit, kể cả tên có dấu hai chấm như `mk:cook`. Regex tên trong tài liệu chặt hơn thực tế, nên không dựa vào việc này lâu dài.
- Không đọc `.claude/agents`, `.claude/commands`, `settings.json`, `.mcp.json` [source]. Agent và command đọc từ `.opencode/{agent,agents}/*.md` và `.opencode/{command,commands}/*.md`, cả số ít lẫn số nhiều [source `config/agent.ts`, `config/command.ts`].
- Plugin `.opencode/plugins/*.ts` với hook: `tool.execute.before` (throw để chặn), `tool.execute.after`, `chat.message`, `chat.params`, `permission.ask`, `command.execute.before`, `shell.env`, `experimental.chat.system.transform`, `experimental.session.compacting`, cộng event bus `session.*`, `file.edited` [source `packages/plugin/src/index.ts`].
- Tool có sẵn: `task`, `question`, `todowrite/todoread`, `skill`, `webfetch`, `websearch`, `lsp`, `apply_patch` [source `src/tool/`]. Tức là tương đương `Task`, `AskUserQuestion`, `TodoWrite` của Claude Code, chỉ khác tên.
- Permission khai báo: `permission.bash` theo glob lệnh, `permission.skill`, `permission.task`, `external_directory`, `.env` bị chặn đọc mặc định [source docs].
- Model: Anthropic qua API key hoặc **Amazon Bedrock** (IAM). Đăng nhập bằng gói Claude Pro/Max đã bị gỡ từ 02/2026 sau khi Anthropic cấm dùng OAuth thuê bao trong tool bên thứ ba. Với đơn vị và khách hàng đã chuẩn hoá trên AWS, đi Bedrock.
- Chạy nền: `opencode run --agent --format json`, `opencode serve` + SDK, GitHub Action chạy trên runner của mình. Đặt `share: "disabled"` cho doanh nghiệp.

### 3.3 Claude Code

Giữ nguyên, là harness gốc của kit. Lưu ý duy nhất: những gì viết thêm cho Kiro/OpenCode không được làm hỏng Claude Code, nên `.kiro/` và `.opencode/` phải nằm ngoài đường quét của Claude Code và được `.gitignore`/`.mkignore` xử lý đúng.

---

## 4. Bảng ánh xạ từng thành phần

Cột Kiro ghi cách bản Kiro của kit đang làm [đã thử], trừ chỗ ghi khác.

| Thành phần trong `.claude/` | OpenCode | Kiro | Cách xử lý |
|---|---|---|---|
| `CLAUDE.md` | Đọc tại chỗ. Nên thêm `AGENTS.md` mỏng trỏ tới nó để không phụ thuộc fallback | `AGENTS.md` ở gốc (Kiro tự nạp) mô tả kit, tool mapping, quy ước checklist | Sinh từ template |
| `.claude/rules/*.md` | `opencode.json` → `"instructions": [".claude/rules/*.md"]` | `.kiro/steering/mk-<tên>.md`, `inclusion: always` (CLI bỏ qua trường này) | Copy nguyên văn khi sinh |
| `skills/*/SKILL.md` | Đọc tại chỗ | `.kiro/skills/mk-<tên>/SKILL.md` là **wrapper** trỏ về `.claude/skills/<dir>/`; 9 skill hay dùng nhúng toàn văn | Tên gốc trong `.claude/` không đổi |
| `agents/*.md` | Sinh `.opencode/agents/<tên>.md`: `mode: subagent`, `tools` → map `permission`, `model` → id đầy đủ | `.kiro/agents/<tên>.json`: `tools` → tag năng lực, `prompt: file://./prompts/<tên>.md`, `resources` steering + skill, `model` map theo bảng | Cùng một bộ chuyển, hai template |
| Slash command `/mk:cook` | Không có. Sinh `.opencode/commands/mk-cook.md` với body "nạp skill mk:cook, tham số `$ARGUMENTS`" | `/mk-cook` từ wrapper, chỉ tương tác; headless viết câu tự nhiên | Người dùng gõ `/mk-cook` thay vì `/mk:cook` ở hai harness mới |
| Hook PreToolUse `scout-block` | `permission.bash` + `permission.read/edit` theo glob cho phần tĩnh; plugin `tool.execute.before` gọi lại `scout-block.cjs` cho phần động | `preToolUse` không matcher trong mọi agent JSON → adapter → `scout-block.cjs`; chặn = exit 2 | Adapter map tên tool Kiro về tên Claude Code |
| Hook UserPromptSubmit (3 hook) | Plugin `chat.message` nối stdout hook vào parts, hoặc `experimental.chat.system.transform` | `userPromptSubmit` → adapter gọi cả ba, thêm Kit hint theo từ khoá | stdout thành `additional_context` bắt buộc |
| Hook SessionStart | Plugin event `session.created` | `agentSpawn` của agent `mk` → `session-init` | |
| Hook Stop | Plugin event `session.idle` | `stop` → `session-state` | |
| Hook SubagentStart/Stop | Không có sự kiện riêng [chưa kiểm chứng] | `agentSpawn` / `stop` của từng agent con → `subagent-init`, `session-state --agent` | Kiro tốt hơn dự đoán ban đầu |
| Hook PostToolUse | Plugin `tool.execute.after` | `postToolUse` matcher `use_subagent`, `fs_write` → `session-state` với transcript tổng hợp | Thay TodoWrite bằng quy ước checklist |
| `.mcp.json` | Chuyển thành khối `mcp` (`type: local`, `command: [..]`, `environment`) | `.kiro/settings/mcp.json`, thêm `autoApprove` nếu muốn [docs] | Chưa làm trong bản Kiro hiện tại |
| `.mk.json`, `.mkignore` | Bỏ | Giữ nguyên trong `.claude/`, hook gốc vẫn đọc | Khối `permission` không tác dụng trên Kiro |
| statusline | Không có. Bỏ | Không có. Bỏ | Chỉ Claude Code |
| `plans/` + `mk:plan` | Giữ nguyên, skill chạy được | Giữ `plans/`; ánh xạ sang `.kiro/specs/` khi khách yêu cầu | Quyết định theo khách |

---

## 5. Kiến trúc: một nguồn, nhiều đích

```
.claude/                  nguồn sự thật và runtime, ship cùng mọi harness
├── CLAUDE.md, rules/, skills/, agents/, settings.json, .mk.json, .mkignore
├── hooks/*.cjs           7 hook gốc, một bản duy nhất
└── hooks/adapters/       kiro.cjs (đã có); opencode plugin gọi lại tương tự

.opencode/                lớp mỏng, phần lớn viết tay một lần (chưa làm)
├── opencode.json         instructions, permission, mcp, share, provider bedrock
├── agents/*.md           sinh từ .claude/agents
├── commands/mk-*.md      sinh từ skills có user-invocable: true
└── plugins/mk-bridge.ts  gọi lại các hook .cjs qua stdin JSON giả lập Claude Code

.kiro/                    sinh hoàn toàn bằng build_kiro_kit.py (đã có)
├── steering/mk-*.md      4 rules + mk-kit.md (cơ chế kit, tool mapping, checklist)
├── skills/mk-*/          wrapper, 9 skill nhúng toàn văn
├── agents/*.json         mk + 12 subagent, mỗi file mang khối hooks
├── agents/prompts/*.md   system prompt
├── settings/cli.json     mk làm agent mặc định
└── hooks/mk-hooks.json   chỉ IDE / v3, chưa kiểm chứng
AGENTS.md                 Kiro tự nạp
```

Bốn nguyên tắc:

1. **Không sửa tay trong thư mục sinh.** Mọi thay đổi vào `.claude/`, chạy lại script. Thêm một check trong CI: sinh lại và `git diff --exit-code`.
2. **Skill viết trung tính về harness.** Trong SKILL.md, thay tên tool Claude bằng hành vi: "giao cho subagent planner" thay vì `Task(planner)`, "hỏi người dùng" thay vì `AskUserQuestion`, "ghi todo" thay vì `TaskCreate`. Sửa dần 12 skill có nhắc tool, ưu tiên `cook`, `fix`, `mk-plan`, `project-management`, `scout`.
3. **Steering làm cầu tạm** cho phần chưa sửa: bảng tool mapping trong `mk-kit.md` và `AGENTS.md` ("Read/Glob/Grep → fs_read/glob/grep, Task(agent) → use_subagent, TaskCreate/TodoWrite không có tương đương"). Rẻ, gỡ bỏ được khi skill đã trung tính.
4. **Hook chỉ có một bản.** Các file `.cjs` giữ nguyên. Adapter nhận sự kiện của harness, dựng JSON theo format Claude Code, gọi hook gốc, dịch kết quả ngược lại. Với Kiro việc này đã xong và chạy ổn định.

**Tên skill, đã chốt:** giữ `mk:cook` trong `.claude/` cho Claude Code, wrapper `mk-cook` cho Kiro (và command `mk-cook` cho OpenCode). Lý do: không đụng thói quen và tham chiếu chéo hiện có, wrapper tự ghi rõ "đọc `.claude/skills/cook/`" nên hai tên không gây nhầm. Tài liệu hướng dẫn ghi cả hai dạng một lần ở đầu.

---

## 6. Việc cụ thể cho Kiro, đã làm

**Steering.** Bốn rules copy nguyên văn thành `mk-<tên>.md`; thêm `mk-kit.md` nói cơ chế kit: skill là `/mk-<name>`, subagent gọi bằng `use_subagent`, tool mapping, quy ước checklist, "một tool call một lần trên đường dẫn lạ", tự kiểm tra hook có chạy. Tổng steering luôn được nạp, khoảng 4 KB mỗi lượt.

**Skill.** Wrapper giữ `name`, `description`; body nói "skill gốc ở `.claude/skills/<dir>/SKILL.md`, đường dẫn tương đối tính từ đó, gặp `/mk-*` khác thì đọc wrapper tương ứng", thêm dòng `Request / arguments: $ARGUMENTS`. Chín skill hay dùng nhúng toàn văn để model không phải đọc thêm.

**Agent.** Một agent con trông như sau (rút gọn):

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

`model: opus` và `inherit` map sang `auto`; `memory: project` không có tương đương, bỏ. Agent `mk` (orchestrator) dùng `tools: ["@builtin"]`, `allowedTools: ["read","subagent"]`, và mang thêm `userPromptSubmit` (ba hook nhắc/gate) và `postToolUse` (session-state).

**Hook.** Không có file hook rời cho CLI v2. `.kiro/hooks/mk-hooks.json` vẫn được sinh cho IDE / v3 với schema `{"version":"v1","hooks":[{name,trigger,matcher,action,timeout}]}` nhưng **chưa kiểm chứng**; khi khách dùng IDE phải thử riêng.

**MCP.** Chưa chuyển. Việc phải làm khi dùng bản toolkit đầy đủ: `.kiro/settings/mcp.json` cho Jira, Confluence, Slack với `autoApprove` cho tool chỉ đọc, và bật MCP cho agent `mk` (mục 6 của Engineering Guide).

**Permission.** v2 khai `allowedTools` trong từng agent JSON. Khối `permission` trong `.mk.json` không có tác dụng.

**Spec.** Chưa làm. Nếu khách làm việc theo spec Kiro, `mk:plan` nên có tuỳ chọn xuất `.kiro/specs/<slug>/requirements.md`, `design.md`, `tasks.md`.

**Phân phối.** Hiện là script `kiro-init.sh` chép `.claude/`, `.kiro/`, `AGENTS.md` vào repo đích. Đóng thành Power để cài từ một URL là bước sau.

---

## 7. Việc cụ thể cho OpenCode

Đã đủ điều kiện làm ngay, không chờ gì.

`opencode.json` tối thiểu:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [".claude/rules/*.md"],
  "share": "disabled",
  "provider": { "amazon-bedrock": { /* region, profile */ } },
  "permission": {
    "bash": { "*": "ask", "git status*": "allow", "git diff*": "allow", "git log*": "allow",
              "rm -rf *": "deny" },
    "external_directory": "ask"
  },
  "mcp": {
    "jira": { "type": "local", "command": ["node", "path/to/jira-mcp"], "environment": { "ATLASSIAN_TOKEN": "{env:ATLASSIAN_TOKEN}" } }
  }
}
```

Thêm `AGENTS.md` một dòng trỏ tới `CLAUDE.md` để không lệ thuộc fallback (bản Kiro đã có `AGENTS.md` đầy đủ, dùng chung được). Agents sinh vào `.opencode/agents/` với `mode: subagent`, `tools` chuyển thành `permission` (`edit: deny`, `bash: deny` cho agent chỉ đọc). Commands `mk-*.md` sinh từ skill có `user-invocable: true`, body: "Load skill `mk:x` and execute it with arguments: $ARGUMENTS". Một plugin `mk-bridge.ts` gọi lại hook gốc theo đúng cách adapter Kiro đang làm; phần chặn thư mục của `scout-block` có thể chuyển hẳn sang `permission.read/edit/bash` khai báo, nhanh hơn plugin.

Việc chưa chắc: `experimental.chat.system.transform` có nhận nội dung prompt của lượt hiện tại không, ảnh hưởng tới `simplify-gate` và `workflow-artifact-gate` vốn đọc câu người dùng gõ. Thay thế an toàn là hook `chat.message`, có `parts` của tin nhắn.

---

## 8. Lộ trình

| Bước | Việc | Trạng thái |
|---|---|---|
| 0 | Cài Kiro CLI, chụp payload hook, thử skill đổi tên, thử subagent | **Xong.** Kết quả ở mục 3.1 |
| 1 | Script dựng `.kiro/` từ bản lite, adapter hook, installer | **Xong** trên bản lite v2.6.1; 14 lượt chạy thử |
| 2 | Dựng lại từ bản toolkit đầy đủ: thêm 10 skill Jira/Confluence/Slack, `mcp.json`, chốt bản rules | Chưa, 1–2 ngày, trước pilot |
| 3 | Pilot 1 team / 1 repo / 2 tuần, đo 4 chỉ số | Chờ quyết định |
| 4 | OpenCode: `opencode.json`, agents, commands, plugin cầu hook, Bedrock | Chưa, 1–2 ngày, khi cần |
| 5 | Sửa 12 skill cho trung tính về harness | Rải trong 2 tuần |
| 6 | Chạy headless ba harness trên cùng kịch bản, so kết quả | Cần Kiro Pro |
| 7 | Đóng Power, hướng dẫn cài cho đội khách; chế độ v3 cho script dựng khi Kiro đổi mặc định | Sau pilot |

---

## 9. Rủi ro và điểm chưa kiểm chứng

- **Kiro v2 và v3 lệch nhau.** Kit chạy trên v2 mặc định. Khi Kiro chuyển mặc định sang v3, agent JSON hiện tại bị từ chối và hook chuyển sang file rời. Script dựng cần thêm chế độ v3 khi đó. Hỏi khách phiên bản IDE và CLI đang chuẩn hoá.
- **Headless chết khi chặn trong batch song song.** Lỗi của Kiro, không phải kit. Steering giảm xác suất, `MK_KIRO_SOFT_BLOCK=1` trong CI loại bỏ hẳn nhưng khi đó chặn thành cảnh báo.
- **IDE chưa thử.** Hook cho IDE nằm ở file rời dạng v3; nếu khách dùng IDE song song CLI thì có hai cấu hình phải giữ đồng bộ.
- **Bản Kiro chưa có phần tích hợp.** 10 skill Jira/Confluence/Slack và 3 MCP server phải dựng thêm (bước 2).
- **Mất statusline.** Tiện ích của Claude Code, không phải chức năng lõi. Session-state thì giữ được nhờ adapter.
- **`session-state` ghi thư mục dùng chung với Claude Code.** Cùng repo mở bằng hai harness sẽ ghi đè nhau. Chấp nhận trong pilot.
- **Xác thực OpenCode.** Không dùng plugin OAuth thuê bao Claude, vi phạm điều khoản Anthropic. Đi Bedrock hoặc API key doanh nghiệp.
- **Headless Kiro cần gói trả phí.** Chạy agent nền (kịch bản OpenClaw trong bộ tài liệu AI-ready) trên Kiro cần Pro trở lên; hoặc chạy nền bằng OpenCode và để Kiro cho tương tác.

---

## 10. Nguồn đã đối chiếu

Kiro: thực nghiệm trên `kiro-cli 2.21.1` (báo cáo kiểm chứng của bản Kiro kit, 14 lượt chạy, đọc DB phiên và `hook-log.jsonl`); `kiro.dev/docs/steering`, `/docs/skills`, `/docs/custom-agents`, `/docs/custom-agents/subagents`, `/docs/hooks`, `/docs/mcp/configuration`, `/docs/permissions`, `/docs/powers`, `/docs/cli/v3`, `/docs/cli/headless`, `/changelog/cli/2-18`. OpenCode: mã nguồn `anomalyco/opencode` clone 2026-08-08 (`session/instruction.ts`, `skill/index.ts`, `config/agent.ts`, `config/command.ts`, `packages/plugin/src/index.ts`, `docs/*.mdx`), lệnh `opencode debug skill` và `opencode debug config` trên bản 1.18.20. Hướng dẫn cộng đồng Claude Code → Kiro chỉ dùng để đối chiếu.

## Câu hỏi mở

1. ~~Khách chuẩn hoá Kiro IDE hay CLI, phiên bản nào, có bật v3 chưa?~~ Vẫn phải hỏi khách, nhưng kit đã sẵn cho CLI v2; câu trả lời quyết định có cần chế độ v3 và kiểm chứng IDE hay không.
2. ~~Chọn phương án tên skill A hay B?~~ Đã chốt: giữ tên gốc, wrapper `mk-`.
3. Khách có làm việc theo spec Kiro không, để quyết định `mk:plan` xuất `plans/` hay `.kiro/specs/`?
4. Mô hình chạy trên Kiro do khách hàng trả (gói nào) hay đơn vị triển khai trả; ảnh hưởng headless và giới hạn credit.
