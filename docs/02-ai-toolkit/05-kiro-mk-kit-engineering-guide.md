# Kiro + MK Kit: Engineering Guide

Dành cho tech lead và kỹ sư sẽ cài, dùng và bảo trì bộ MK trên Kiro. Cập nhật 2026-09-06.

Đọc trước: [MK Kit Introduction](02-mk-kit-introduction.md) để biết bộ kit gồm gì trên Claude Code, và [Agent Kit Portability](03-agent-kit-multi-harness-kiro-opencode.md) mục 1 và 5 để biết kiến trúc "một nguồn, nhiều đích". Lý do nên dùng và lộ trình pilot ở [Decision Brief](04-kiro-mk-kit-decision-brief.md).

Mọi điều dưới đây đã chạy thử trên `kiro-cli 2.21.1` (engine v2 mặc định, gói cá nhân, model `auto`). Chỗ nào chưa thử sẽ ghi **[chưa kiểm chứng]**.

---

## 1. Kiến trúc một câu

`.claude/` **vẫn là nơi chạy thật** của kit (skill toàn văn, rules, 7 hook gốc không sửa, cấu hình). `.kiro/` là **lớp vỏ sinh tự động** để Kiro nhìn thấy kit: wrapper skill, steering, agent JSON, cấu hình mặc định. Một adapter duy nhất `.claude/hooks/adapters/kiro.cjs` dịch sự kiện của Kiro sang payload Claude Code, gọi hook gốc, dịch kết quả ngược lại.

Hệ quả thực tế: **phải commit cả `.kiro/` lẫn `.claude/`** vào repo dự án. Không sửa tay trong `.kiro/`; sửa ở nguồn rồi dựng lại (mục 7).

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

---

## 2. Cài đặt

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

## 3. Dùng hằng ngày: 10 lệnh cho team

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

## 4. Hook chạy thế nào trên Kiro

Kiro engine v2 chỉ nhận hook **khai báo trong file agent JSON**, không đọc `.kiro/hooks/*.json`. Vì vậy `mk.json` và 12 agent con đều mang khối `hooks`. Adapter nhận payload Kiro qua stdin, dựng payload Claude Code, gọi hook gốc.

| Sự kiện Kiro | Hook gốc được gọi | Ghi chú |
|---|---|---|
| `agentSpawn` | `session-init` (agent `mk`) hoặc `subagent-init --agent <tên>` (agent con) | Bơm khối Session Information; đầu ra đến model nhưng Kiro không lưu vào lịch sử |
| `userPromptSubmit` | `dev-rules-reminder`, `simplify-gate`, `workflow-artifact-gate`, thêm Kit hint | stdout thành `additional_context`; Kiro tự thêm câu "you must follow…" nên rules thành chỉ thị bắt buộc |
| `preToolUse` (không matcher) | `scout-block` | Chạy cho mọi tool, kể cả trong subagent. Chặn = exit 2 + lý do ở stderr; Kiro không chạy tool và báo lý do cho model |
| `postToolUse` matcher `use_subagent`, `fs_write` | `session-state` | Adapter dựng transcript tổng hợp: checklist → TodoWrite, lời gọi subagent → Task |
| `stop` | `session-state` | Ghi `~/.claude/session-states/<hash>/latest.md`, phiên sau đọc lại |

Điểm khác Claude Code đáng nhớ khi viết hook mới:

- Matcher là **tên tool chính xác**, không phải regex; `fs_write|execute_bash` không kích hoạt gì.
- Quyết định chặn chỉ qua **exit code 2**; JSON `{"decision":"block"}` trên stdout bị bỏ qua.
- Payload không có `session_id`; adapter tự cấp một id theo cwd và lưu ở `.claude/hooks/.logs/kiro-session.json`.
- Tên tool ở agent chính: `fs_read, fs_write, execute_bash, glob, grep, use_subagent, web_fetch, web_search`. Bên trong subagent: `read, write, shell, summary`. Adapter đã map cả hai bộ về `Read/Write/Bash/Task…` của Claude Code.
- Tag năng lực trong `tools` của agent: `read, write, shell, web_fetch, web_search, subagent, @builtin`. Không có tag `web`.

Log để debug: `.claude/hooks/.logs/hook-log.jsonl` (mỗi lần hook chạy một dòng), `MK_KIRO_DEBUG=1` ghi payload thô vào `kiro-raw.jsonl`.

---

## 5. Cấu hình và biến môi trường

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

Model cho subagent: bản dựng map `haiku → claude-haiku-4.5`, `sonnet → claude-sonnet-4.5`, `opus/inherit → auto`. Gói Kiro của dự án quyết định model nào thực sự khả dụng; sửa map trong script dựng (mục 7) nếu cần.

Bảo mật: `scout-block` là chốt chặn thực, không phải lời dặn. Đã kiểm chứng `glob **/*.js` bị chặn và model tự thu hẹp về `src/**/*.js`. Chính sách `.mkignore` là file trong repo, review qua PR như code.

---

## 6. Việc còn lại trước pilot với bộ toolkit đầy đủ

Bản Kiro được dựng từ **bản lite gốc**, không phải từ bản cài đầy đủ đã bổ sung skill tích hợp ([AI Toolkit for Offshore Teams](01-ai-toolkit-offshore-team.md)). Ba khác biệt phải xử lý:

1. **10 skill Jira/Confluence/Slack** (`daily-standup-report`, `jira-sprint-management`, `sprint-report-to-confluence-slack`… danh sách ở [AI Toolkit for Offshore Teams, mục 6](01-ai-toolkit-offshore-team.md#6-use-case--mk-làm-xương-sống-workflow-skill-nối-ra-ngoài)) chưa có wrapper. Cách làm: chạy script dựng với nguồn là `.claude/skills/` của bản cài đầy đủ thay vì bản lite; script sinh wrapper cho mọi thư mục có `SKILL.md`. Ước nửa ngày kể cả chạy thử một skill.
2. **Ba MCP server** chưa được chuyển. Bản Kiro bỏ `.mcp.json` có chủ đích. Cần viết `.kiro/settings/mcp.json` (key `mcpServers`, cùng format, thêm `autoApprove` cho tool chỉ đọc) và bật MCP cho agent `mk` **[chưa kiểm chứng]**: theo tài liệu Kiro, agent JSON cần `includeMcpJson: true` hoặc khai `mcpServers` trực tiếp. Credential đi qua biến môi trường máy, không qua file trong repo.
3. **Rules đã tuỳ biến trong bản cài đầy đủ** (bản lite v2.4.0 cộng chỉnh sửa) khác bản lite v2.6.1 mà bản Kiro dùng. Quyết định lấy bản nào làm nguồn rồi dựng lại một lần; không ghép tay.

Ngoài ra: script Python trong 7 skill (`sequential-thinking`, `docs-seeker`…) chưa chạy thử trên Kiro; venv của kit độc lập với harness nên khả năng cao chạy được, cần một lần xác nhận.

---

## 7. Dựng lại kit khi nguồn thay đổi

```bash
cd <thư mục nguồn bản Kiro của kit>
python3 build_kiro_kit.py            # đọc bản lite, sinh kit/.claude và kit/.kiro
python3 build_kiro_kit.py --no-inline  # wrapper mỏng cho cả 9 skill tier-1
strip-identity/scripts/verify.sh kit/.claude && strip-identity/scripts/verify.sh kit/.kiro
for f in kit/.kiro/agents/*.json; do kiro-cli agent validate --path "$f"; done
./kiro-init.sh /path/to/repo --force
```

Mặc định 9 skill dùng nhiều nhất (scout, test, fix, cook, docs, git, ship, plan, code-review) được **nhúng toàn văn** vào wrapper để model không phải đọc thêm file; 20 skill còn lại là wrapper mỏng trỏ về `.claude/skills/`. Skill `archify` giữ tên `/archify`.

Trước mỗi lần dựng, kiểm tra hai điều: `kiro-cli --version` vẫn là engine v2 (nếu Kiro đổi mặc định sang v3, agent JSON hiện tại bị từ chối, script dựng cần thêm chế độ v3), và bản lite nguồn ở phiên bản nào.

---

## 8. Giới hạn đã biết

| Vấn đề | Ảnh hưởng | Cách xử lý |
|---|---|---|
| Kiro headless chết khi hook chặn 1 trong 2 tool gọi song song (lỗi Bedrock "Expected toolResult blocks") | CI, chạy nền | Steering đã dặn "một tool call một lần khi chạm đường dẫn lạ"; đặt `MK_KIRO_SOFT_BLOCK=1` trong CI. Phiên tương tác tự phục hồi |
| Engine v3 (`kiro-cli --v3`) từ chối agent v2, bỏ qua `.kiro/hooks/*.json` | Kit không chạy trên v3 | Chờ Kiro chốt schema; hỏi khách phiên bản chuẩn hoá |
| Kiro IDE dùng file hook riêng (dạng v3), khác CLI | Hai cấu hình song song | `.kiro/hooks/mk-hooks.json` có sẵn nhưng chưa kiểm chứng trên IDE |
| `session-state` ghi vào `~/.claude/session-states/` dùng chung với Claude Code | Cùng repo mở bằng hai harness sẽ ghi đè nhau | Chấp nhận trong pilot; tách thư mục là việc của bản lite |
| Thông báo chặn glob rộng in `Pattern: undefined` | Chỉ là cosmetic | Đã báo về bản lite |
| Khối `permission` trong `.mk.json` không có tác dụng trên Kiro | Permission phải khai trong agent JSON | Dùng `allowedTools` của từng agent |
| Hook thêm 50–100 ms mỗi tool call, 0,1–0,2 s mỗi prompt, ~4 KB context mỗi lượt | Không đáng kể | |
| Đầu ra `agentSpawn` không lưu vào lịch sử hội thoại của Kiro | Không xem lại được trong log | Xem `hook-log.jsonl` |

---

## 9. Đo lường cho pilot

| Chỉ số | Lệnh / nơi xem |
|---|---|
| Số lần chặn | `grep -c '"decision":"block"' .claude/hooks/.logs/hook-log.jsonl` |
| Tác vụ có báo cáo | đếm `plans/reports/*-report.md` theo quy ước tên trong `.mk.json` |
| Credit mỗi lượt | metadata lượt chạy trong DB của Kiro (`~/Library/Application Support/kiro-cli/data.sqlite3`, bảng `conversations_v2`) hoặc `/usage` trong phiên |
| Hook có ổn định không | không có dòng lỗi trong `hook-log.jsonl`; 45 hook liên tiếp đã chạy không lỗi khi kiểm chứng |

## Câu hỏi mở

1. `includeMcpJson` trong agent JSON v2 có đủ để agent `mk` thấy ba MCP server không, hay phải khai `mcpServers` trực tiếp? Cần một lần thử.
2. Khách dùng Kiro IDE song song CLI không? Nếu có, phải kiểm chứng `.kiro/hooks/mk-hooks.json` trên IDE và chấp nhận hai cấu hình.
3. Mã nguồn bản Kiro của kit hiện nằm ngoài git; đưa vào repo nội bộ nào của đơn vị để dựng lại được về sau?
