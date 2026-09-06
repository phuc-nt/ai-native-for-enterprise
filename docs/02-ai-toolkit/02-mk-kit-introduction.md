# MK Kit Introduction

> Tài liệu cho team dùng workspace mẫu. Cập nhật: 2026-09-06, dựa trên hiện trạng cài đặt thực tế.
> Đọc sau [AI Toolkit for Offshore Teams](01-ai-toolkit-offshore-team.md): tài liệu đó nói bộ công cụ dùng để làm gì, tài liệu này nói bộ MK bên trong hoạt động ra sao. Muốn chạy MK trên Kiro hoặc OpenCode, xem [Agent Kit Portability](03-agent-kit-multi-harness-kiro-opencode.md); dự án dùng Kiro đọc thẳng [Kiro + MK Kit: Engineering Guide](05-kiro-mk-kit-engineering-guide.md), ở đó slash command là `/mk-*` thay vì `/mk:*`.

## Bộ MK là gì

**MK** (my-agent-kit-lite, v2.4.0) là một bộ "trang bị" cho Claude Code, cài vào project dưới dạng **file thuần** — không có server, không có binary, không có magic. Claude Code mặc định không có memory giữa các session, không có workflow chuẩn, không có domain knowledge; bộ MK bù đắp bằng 4 lớp:

| Lớp | Là gì | Trả lời câu hỏi |
|---|---|---|
| **Agents** (11) | Định nghĩa vai trò chuyên gia (planner, tester, code-reviewer...) mà Claude spawn ra làm subagent | *Ai* làm việc này? |
| **Skills** (39) | Gói kiến thức + quy trình, gọi bằng slash command `/mk:*` hoặc tự kích hoạt | Làm *như thế nào*? |
| **Hooks** (7) | Script `.cjs` chạy tự động theo sự kiện của Claude Code (session start, trước tool call...) | Cái gì *tự động* xảy ra? |
| **Rules** (5) | File markdown quy định luật làm việc, được nạp vào context mỗi session | *Luật* nào phải theo? |

Đây là **bản team edition**: đủ vòng dev **design → code → test → review → PR** cho engineer, cộng lớp product/process (plan, backlog, retro, brainstorm, research) cho PM/PO/SM. Bản cài đầy đủ trong workspace mẫu còn được **bổ sung 10 skill tích hợp Jira/Slack/Confluence** (thêm ngày 2026-08-17), mô tả từng skill và chuỗi tool ở [AI Toolkit for Offshore Teams, mục 6](01-ai-toolkit-offshore-team.md#6-use-case--mk-làm-xương-sống-workflow-skill-nối-ra-ngoài).

## Cấu trúc folder

```
project-workspace/
├── CLAUDE.md            ← Điểm vào: Claude Code đọc file này ĐẦU TIÊN mỗi session
├── AGENTS.md            ← Bản tương đương cho tool khác (Codex, Copilot, Cursor)
├── docs/                ← Tài liệu dự án (file này nằm ở đây)
└── .claude/             ← Toàn bộ nội dung kit
    ├── settings.json    ← Đăng ký hooks: sự kiện nào chạy script nào
    ├── metadata.json    ← Version kit (2.4.0) + danh sách file cần xóa khi upgrade
    ├── .mk.json         ← Config kit: naming convention cho plan, locale, đường dẫn
    ├── .mkignore        ← Chặn AI đọc các thư mục/file nhạy cảm (kiểu .gitignore)
    ├── statusline.cjs   ← Render dòng trạng thái dưới terminal Claude Code
    ├── agents/          ← 11 file .md định nghĩa agent (frontmatter: model, tools, description)
    ├── skills/          ← 39 thư mục skill, mỗi cái có SKILL.md
    ├── hooks/           ← 7 script .cjs + lib/ + tests
    ├── rules/           ← 5 file luật làm việc
    ├── schemas/         ← JSON schema validate .mk.json và SKILL.md
    └── scripts/         ← Script tiện ích dùng chung
```

### Vai trò từng folder chính

**`CLAUDE.md` (root)** — cấu hình cao nhất. Claude Code tự đọc nó khi khởi động; nó trỏ tiếp sang `.claude/rules/`. Muốn thay đổi hành vi toàn cục (thêm tech stack, convention riêng của team) thì sửa file này.

**`.claude/agents/`** — mỗi file `.md` là một "chuyên gia". Ví dụ `planner` nghiên cứu và lập kế hoạch, `fullstack-developer` viết code, `tester` chạy và xác minh test, `code-reviewer` review, `code-simplifier` tinh giản code, `git-manager` commit/push theo conventional commits. Nhóm product có `project-manager`, `brainstormer`, `researcher`, `docs-manager`, `ui-ux-designer`. *Tại sao tách vai trò?* Mỗi subagent có context riêng, chỉ mang theo tool và kiến thức cần cho việc của nó — kết quả ổn định hơn một agent "biết tuốt".

**`.claude/skills/`** — mỗi thư mục là một quy trình đóng gói. `SKILL.md` chứa frontmatter (name, description) + hướng dẫn chi tiết. Claude đọc description để quyết định khi nào kích hoạt; user gọi trực tiếp bằng `/mk:<tên-skill>`. *Tại sao không nhét hết vào CLAUDE.md?* Skill chỉ nạp vào context khi cần — tiết kiệm token và tránh nhiễu.

**`.claude/hooks/`** — automation tầng harness. Khác với agents/skills (Claude *chọn* dùng), hooks do Claude Code *bắt buộc* chạy theo sự kiện — Claude không thể bỏ qua. Đây là tầng enforcement.

**`.claude/rules/`** — luật được inject vào context: `primary-workflow.md` (luồng chính), `development-rules.md` (quy tắc code), `documentation-management.md` (quản lý docs/plans), `review-audit-self-decision.md` (tự quyết khi review).

## Cách hoạt động với Claude Code

### 1. Vòng đời một session

```
 claude (khởi động)
    │
    ├─ Claude Code đọc CLAUDE.md → nạp rules
    ├─ [SessionStart] session-init.cjs: detect project, nạp config,
    │                 ghi env vars, khôi phục trạng thái phiên trước
    ▼
 User gõ prompt
    │
    ├─ [UserPromptSubmit] 3 hook chạy TRƯỚC khi Claude thấy prompt:
    │     • dev-rules-reminder  → nhắc lại rules + plan context
    │     • simplify-gate       → chặn "ship/merge/pr" nếu diff lớn chưa simplify
    │     • workflow-artifact-gate → chặn finalize nếu /mk:cook, /mk:fix
    │                              thiếu artifact review (JSON)
    ▼
 Claude làm việc (gọi tools, spawn subagents)
    │
    ├─ [PreToolUse]    scout-block.cjs   → chặn đọc file/thư mục trong .mkignore
    ├─ [SubagentStart] subagent-init.cjs → tiêm context gọn (~200 token) cho subagent
    ├─ [SubagentStop / PostToolUse / Stop]
    │                  session-state.cjs → lưu tiến độ ra file + cập nhật statusline
    ▼
 Kết thúc turn — trạng thái đã persist, session sau đọc lại được
```

*Tại sao cần gates?* Vì LLM có xu hướng "nhiệt tình ship". `simplify-gate` và `workflow-artifact-gate` là chốt chặn cứng: code chưa qua simplify/review thì lệnh ship bị hook chặn lại, không phụ thuộc vào việc Claude "nhớ" luật hay không.

### 2. Luồng làm việc chính — ví dụ `/mk:cook`

```
/mk:cook "thêm login bằng Google OAuth"
    │
    ├─ 1. planner            → nghiên cứu codebase, viết plan (plans/)
    ├─ 2. fullstack-developer → implement theo từng phase của plan
    ├─ 3. tester             → chạy test, xác minh coverage
    ├─ 4. code-reviewer      → review, xuất artifact JSON findings
    │        (workflow-artifact-gate kiểm artifact này trước khi cho finalize)
    └─ 5. sẵn sàng /mk:ship  → git-manager commit / push / PR
```

Mỗi bước là một subagent riêng; agent chính chỉ điều phối. Kết quả trung gian (plan, findings) ghi ra file trong `plans/` nên session sau đọc tiếp được.

### 3. Lệnh hay dùng

| Lệnh | Việc |
|---|---|
| `/mk:cook "feature"` | Pipeline đầy đủ: plan → code → test → review |
| `/mk:fix "bug"` | Chẩn đoán root-cause + fix, cùng pipeline |
| `/mk:plan "task"` | Chỉ lập plan (planner + ui-ux-designer) |
| `/mk:test` | Chạy + xác minh test |
| `/mk:code-review` | Review code hiện tại, xuất artifact JSON |
| `/mk:ship` | Finalize → commit → push |
| `/mk:review-pr <#>` | Review PR GitHub |
| `/mk:vibe "idea"` | Vibe-coding pipeline nhanh |
| `/mk:watzup` | Quét cross-branch: ai đang làm gì, tiếp theo là gì |
| `/mk:retro` | Retrospective từ git metrics |
| `/mk:brainstorm` · `/mk:research` | Ideation / research cho PdM, PO |

## Lưu ý hiện trạng

- Repo đã `git init`; `.gitignore` dạng whitelist chỉ publish `docs/`. Bộ kit trong `.claude/` và output trung gian trong `plans/` **không** lên git — muốn chia sẻ kit cho máy khác thì cài bằng `npx my-agent-kit-lite init .` rồi chép 10 skill tích hợp và rules đã sửa sang tay.
- `/mk:ship`, `/mk:git`, `/mk:retro`, `/mk:review-pr` hoạt động trên repo này, nhưng commit chỉ chứa thay đổi trong `docs/`.
- Nâng cấp kit: `npx my-agent-kit-lite init . --upgrade --force` (đọc `metadata.json` để xóa file cũ trước khi copy). **Lưu ý:** upgrade sẽ đè các tùy biến — backup 10 skill tích hợp và rules đã sửa trước khi chạy.
