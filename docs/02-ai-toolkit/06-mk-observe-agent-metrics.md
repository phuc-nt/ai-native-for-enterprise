# MK Observe: Agent Activity Metrics Across Harnesses

Dành cho tech lead và người sở hữu kit trong team. Cập nhật 2026-09-06.

Đọc trước: [MK Kit Introduction](02-mk-kit-introduction.md) để biết hook và log hook của kit là gì, và [Agent Kit Portability](03-agent-kit-multi-harness-kiro-opencode.md) mục 1 để biết ba harness mà bộ MK chạy trên đó. Tài liệu này trả lời câu hỏi còn bỏ ngỏ ở hai tài liệu Kiro: bốn chỉ số pilot trong [Decision Brief, mục 5](04-kiro-mk-kit-decision-brief.md#5-lộ-trình-pilot-đề-xuất) và [Engineering Guide, mục 9](05-kiro-mk-kit-engineering-guide.md#9-đo-lường-cho-pilot) lấy từ đâu mà không phải đếm tay.

Căn cứ: skill `observe` v1.3.0, đi kèm kit `my-agent-kit-lite` từ v2.10.0, đã chạy thật trên một máy tham chiếu có cả ba harness và 30 ngày dữ liệu. Chỗ nào chưa thử sẽ ghi **[chưa kiểm chứng]**. Ai đã dùng bản 1.2 chỉ cần đọc phần khác biệt và cách nâng cấp ở [MK Observe 1.3](07-mk-observe-1-3-token-adoption-insights.md).

> **Phiên bản kit.** Workspace mẫu trong [MK Kit Introduction](02-mk-kit-introduction.md) đang ở kit v2.4.0, bản Kiro dựng từ v2.6.1. Cả hai chưa có skill này. Muốn dùng phải nâng kit lên v2.10.0 trở lên, hoặc chỉ chép thư mục skill `observe` vào `.claude/skills/` để không đè tuỳ biến; hai cách ở [MK Observe 1.3, mục 5](07-mk-observe-1-3-token-adoption-insights.md#5-nâng-cấp). Từ kit v2.7.0 log hook ghi thêm id phiên và tên harness, nhờ đó số liệu hook ghép chính xác vào từng run; kit cũ hơn vẫn đọc được nhưng ghép theo cửa sổ thời gian.

---

## 1. Kết luận trong 30 giây

Team dùng AI agent qua ba harness nhưng không trả lời được các câu hỏi cơ bản: tuần này đốt bao nhiêu token với model nào, team có thật sự dùng kit không, agent tự làm được bao nhiêu phần trước khi phải can thiệp, code nó viết có được giữ lại không, hook của kit có còn chạy không. Mỗi harness ghi log phiên một kiểu, và Claude Code xoá transcript sau 30 ngày.

`observe` là một skill trong bộ MK giải quyết đúng việc đó:

- Đọc log phiên mà harness **đã sẵn ghi**, không cần bật gì thêm trong lúc làm việc.
- Chuẩn hoá về một mô hình run chung, chấm điểm theo bốn chiều với công thức hiện rõ.
- Đếm token theo từng model, không quy ra tiền; chi phí = token × bảng giá của hợp đồng, do người đọc tính.
- Đo mức độ dùng kit (lệnh, skill, agent, hook, version kit theo project) và rút ra phát hiện có bằng chứng cho tech lead.
- Lưu kết quả đã xử lý vào **store riêng** trên máy, nên số liệu còn nguyên khi harness dọn log.
- Hiện qua terminal hoặc web UI cục bộ; chạy ngầm dưới dạng dịch vụ cấp máy, mở UI là có số ngay.
- Không gọi LLM, không gửi gì ra ngoài máy, chỉ đọc log của harness.

Điều kiện: Node.js 18 trở lên, là thứ kit đã yêu cầu sẵn cho hook.

---

## 2. Cơ chế hoạt động

```
  Claude Code                 OpenCode                    Kiro CLI
  ~/.claude/projects/         ~/.local/share/opencode/    ~/Library/Application Support/
    <slug>/*.jsonl              opencode.db                 kiro-cli/data.sqlite3
        │                           │                           │
        └──────────── collector (chỉ đọc) ──────────────────────┘
                              │
                     mô hình run chung  ◄── hook-log.jsonl của kit (mỗi project)
                              │
                       chấm điểm (metrics)
                              │
                 store ~/.mk-observe/store/  ◄── nguồn cho mọi phân tích
                              │
              ┌───────────────┴───────────────┐
        terminal (stats/runs/run)        web UI (serve / daemon)
```

Ba cách chạy:

| Cách | Ai khởi động | Điều gì xảy ra |
|---|---|---|
| `stats`, `runs`, `run <id>`, `export` | kỹ sư, hoặc agent khi được hỏi | quét một lượt, ghi store, in ra, thoát |
| `serve` | kỹ sư | UI cho một project; thu thập khi có request, cache 15 giây; tắt cùng terminal |
| `daemon install` | kỹ sư, một lần mỗi máy | copy skill sang `~/.mk-observe/app/observe`, đăng ký dịch vụ cấp user (launchd trên macOS, `systemd --user` trên Linux) chạy `serve --all`; khởi động cùng login, tự chạy lại nếu chết, làm mới mỗi 60 giây ở `nice 10` |

Không có gì kích hoạt từ phiên làm việc của agent: không hook, không prompt, không LLM. Daemon chỉ parse lại một transcript khi size hoặc mtime đổi; file không đổi chỉ giữ metadata trong RAM.

### Nguồn dữ liệu và độ phủ

| Harness | Đọc từ | Token / harness tự báo | Can thiệp của người | Hook của kit |
|---|---|---|---|---|
| Claude Code | `~/.claude/projects/<cwd-slug>/*.jsonl` | token theo model từ mỗi lần gọi API; không có số tiền | tool bị từ chối, ngắt giữa chừng | `.claude/hooks/.logs/hook-log.jsonl` |
| OpenCode | `~/.local/share/opencode/opencode.db` | token theo model (có reasoning); USD do OpenCode tự ghi, giữ ở Harness-reported | chỉ có ngắt tool call | không, kit không ship hook cho OpenCode |
| Kiro CLI | `~/Library/Application Support/kiro-cli/data.sqlite3` (đường dẫn macOS; Linux **[chưa kiểm chứng]**) | trường token có trong schema nhưng kiro-cli ≤ 2.21 để null; credit Kiro tự ghi, giữ ở Harness-reported | tool use bị huỷ | `hook-log.jsonl` qua adapter của kit |

Thiếu dữ liệu thì hiện `n/a` hoặc điểm trung tính kèm lý do trong công thức, không bao giờ giả thành 0.

---

## 3. Cài đặt và vận hành

Skill nằm ở `.claude/skills/observe/` trong bất kỳ project đã cài kit đủ phiên bản. Mọi lệnh chạy qua `node`.

```bash
# lần đầu trên mỗi máy: dịch vụ cấp máy cho mọi project
node .claude/skills/observe/scripts/observe.cjs daemon install
#   thêm --skill nếu muốn /mk:observe có trong mọi project (symlink ~/.claude/skills/observe)
#   thêm --in-place nếu muốn chạy thẳng từ checkout thay vì bản copy

node .claude/skills/observe/scripts/observe.cjs daemon status     # đã cài? đang chạy? pid, version bản copy
node .claude/skills/observe/scripts/observe.cjs daemon log        # 40 dòng log cuối
node .claude/skills/observe/scripts/observe.cjs daemon uninstall  # gỡ dịch vụ + bản copy, giữ store

# dùng hằng ngày
open http://127.0.0.1:3467/                                        # UI, chọn project hoặc "All projects"
node .claude/skills/observe/scripts/observe.cjs stats --days 14   # bản terminal của UI
node .claude/skills/observe/scripts/observe.cjs runs              # mỗi run một dòng
node .claude/skills/observe/scripts/observe.cjs run <id-prefix>   # timeline một run
node .claude/skills/observe/scripts/observe.cjs store status      # store đang giữ gì
```

Tuỳ chọn: `--cwd <project>`, `--all`, `--days N` (mặc định 30), `--harness claude-code,opencode,kiro`, `--json`, `--port`, `--interval <giây>`, `--no-open`.

Trên Kiro, skill gọi bằng `/mk-observe` theo quy ước đặt tên wrapper ở [Engineering Guide, mục 3](05-kiro-mk-kit-engineering-guide.md); wrapper này chưa có trong bản Kiro hiện tại **[chưa kiểm chứng]**. Lệnh `node` ở trên chạy được ở mọi harness vì không phụ thuộc slash command.

### Các đường dẫn trên máy

| Đường dẫn | Chứa gì |
|---|---|
| `~/.mk-observe/app/observe/` | bản copy của skill mà dịch vụ chạy, kèm `.installed.json` ghi nguồn, ngày, version |
| `~/.mk-observe/store/index.json` | một dòng tóm tắt mỗi run: điểm, đếm, thống kê hook |
| `~/.mk-observe/store/runs/<id>.json` | run đầy đủ kèm timeline sự kiện |
| `~/.mk-observe/daemon.log` | stdout/stderr của dịch vụ |
| `~/Library/LaunchAgents/local.mk-observe.plist` | định nghĩa dịch vụ trên macOS |
| `~/.config/systemd/user/mk-observe.service` | định nghĩa dịch vụ trên Linux |

Đổi chỗ store bằng biến môi trường `MK_OBSERVE_STORE=/đường/dẫn`.

### Nâng cấp kit

Dịch vụ chạy từ bản copy, nên sau khi cập nhật kit phải chạy lại `daemon install`. `daemon status` sẽ báo khi bản copy cũ hơn kit trong project hiện tại.

---

## 4. Đọc số liệu

Bốn chiều, mỗi chiều 0 đến 100, trọng số bằng nhau, điểm tổng là trung bình cộng. Mọi con số đều kèm công thức và danh sách id run đứng sau nó.

| Chiều | Câu hỏi | Công thức |
|---|---|---|
| Acceptance | Code có được giữ lại không? | `100 × (1 − số edit bị từ chối / số edit)`; từ chối = Write/Edit lỗi hoặc bị hook chặn |
| Success | Việc có xong không? | `100 × số run done / số run đã kết thúc`; done = không còn tool call treo và checklist hoàn tất |
| Autonomy | Tự chạy hay phải cứu? | `100 × (1 − số can thiệp / số lượt người gõ)`; can thiệp = hỏi quyền, từ chối tool, ngắt |
| Reliability | Ổn định hay chập chờn? | `100 × (1 − trung bình(tỷ lệ tool lỗi, tỷ lệ hook chặn, tỷ lệ run bỏ dở))` |

Xếp hạng là **phân vị trong chính tập đang so** (harness, agent, model, project hoặc run): A ≥ p80, B ≥ p60, C ≥ p40, D ≥ p20. Dưới 5 thành viên thì dùng ngưỡng tĩnh (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60) và đánh dấu `*` chưa hiệu chuẩn. Dưới 5 run thì gắn cờ độ tin cậy thấp.

Mỗi run còn có dấu vân tay hành vi: độ dài prompt (ngắn ≤ 20 từ, vừa ≤ 250, dài), cỡ task theo token đầu vào (S/M/L), vòng lặp retry (3 lỗi liên tiếp cùng một tool), subagent đã gọi, lệnh slash và skill đã dùng, số compaction và lỗi API, commit/push/PR, lệnh test và kết quả, file đã sửa, báo cáo ghi vào `plans/`, checklist hoàn tất bao nhiêu. Checklist ở đây là quy ước `- [x] / - [ ] / - [~]` mô tả ở [Engineering Guide, mục 3](05-kiro-mk-kit-engineering-guide.md).

### Token và model

Observe **không quy token ra tiền**. Mỗi run lưu số token thô theo từng model (input, output, cache read, cache write, reasoning, số lần gọi API) lấy thẳng từ transcript Claude Code và db OpenCode. Con số harness tự báo (USD của OpenCode, credit của Kiro) giữ riêng ở cột **Harness-reported**, không cộng vào đâu. Khi cần chi phí, người đọc lấy bảng token theo model nhân với bảng giá của hợp đồng mình tại thời điểm đó:

```
chi phí = Σ theo model ( input × p_in + output × p_out + cacheRead × p_cache_read + cacheWrite × p_cache_write )
```

Cách này đúng cho mọi harness, mọi nhà cung cấp, và không lỗi thời khi giá đổi. Tab **Usage** (hoặc khối Usage by model trong `stats`) chia token theo model, theo harness, theo project và theo tuần, kèm tỷ lệ cache hit của từng model.

### Mức độ dùng kit và phát hiện

Một run được tính là **dùng kit** khi nó gõ lệnh slash của kit (`/mk:…` hoặc lệnh trùng tên skill trong `.claude/skills/` của project), đọc `SKILL.md`, gọi Skill tool, hoặc spawn subagent. Observe đọc catalogue đã cài của từng project (`.claude/metadata.json` tên và version, thư mục skills, agents, hooks trong `settings.json`) và cho ra: tỷ lệ run dùng kit, lệnh/skill/agent/hook theo tần suất, agent của kit so với agent có sẵn của harness, thành phần **chưa dùng lần nào**, mức dùng theo project kèm version kit, và theo tuần.

Khối **Workflow & outcomes** đếm những gì log phiên cho phép đếm: băng độ dài prompt, số lần lái lại mỗi run, thời lượng và số tool call trung vị, run marathon (hơn 4 giờ hoặc hơn 250 tool call), compaction, lỗi API, model bị đổi giữa chừng, heatmap thứ × giờ, file bị sửa nhiều nhất, lỗi theo từng tool; và kết quả: `git commit`, `git push`, link PR, lệnh test (npm/pnpm/yarn/bun test, pytest, go test, cargo test, jest, vitest…) và số lần test fail, run sửa nhiều file mà có chạy test, báo cáo ghi vào `plans/`.

Tab **Insights** chạy một bộ luật ngưỡng trên các con số đó. Mỗi phát hiện có mức (`bad` / `warn` / `info` / `good`), bằng chứng, gợi ý và id run đứng sau. Các luật hiện có:

| Nhóm | Luật |
|---|---|
| Adoption | tỷ lệ run dùng kit dưới 30 % (tốt nếu trên 70 %); project đang hoạt động mà chưa cài kit; project chạy kit cũ hơn bản mới nhất thấy trên máy (so theo tên kit); skill/agent chưa dùng; lệnh slash ngoài kit |
| Workflow | prompt ngắn trên 40 %; trung bình trên 5 lần lái lại; compaction ở trên 25 % run; run marathon; subagent dưới 10 % |
| Outcomes | run sửa nhiều file mà chạy test dưới 30 %; test fail trên 30 %; số commit/push/PR làm mốc |
| Reliability | tool có tỷ lệ lỗi trên 20 % với ít nhất 20 lần gọi; hook crash hoặc p95 trên 2 giây; vòng lặp retry từ 10 %; run bỏ dở trên 20 %; lỗi API trên 10 % run |
| Usage | một model chiếm từ 80 % token; cache hit dưới 50 %; đổi model trên 30 % run; ngoài giờ trên 30 % |
| Điểm | chiều yếu nhất dưới 60 |

Luật tỷ lệ chỉ bật khi có từ 5 run. Ngưỡng là số thường trong `scripts/lib/metrics.cjs`, hàm `buildInsights`, chỉnh theo team. Với hook crash, observe phân biệt crash thật với **unresolved path** (`Cannot find module …/.claude/hooks/x.cjs`): phiên được mở từ thư mục con của nơi cài kit, nên hook không hề chạy và không có gì bảo vệ phiên đó.

### Sức khoẻ kit

Tab Kit health trong UI: số lần chạy, số lần chặn, số lần crash và thời gian của từng hook (từ `hook-log.jsonl`, cộng cả lỗi hook do harness tự báo, gán về đúng tên hook), skill đã dùng, subagent đã gọi, báo cáo đã viết. Một hook có crash lớn hơn 0 hoặc không chạy lần nào chính là phát hiện cần xử lý.

---

## 5. Dùng cho pilot Kiro

Bốn chỉ số pilot trong [Decision Brief, mục 5](04-kiro-mk-kit-decision-brief.md#5-lộ-trình-pilot-đề-xuất) đối chiếu với `observe`:

| Chỉ số pilot | `observe` cho gì | Còn phải làm tay |
|---|---|---|
| Số lần hook chặn truy cập file cấm | Tab Kit health, cột chặn của hook `scout-block`; tỷ lệ chặn cũng đi vào Reliability | Không |
| Tỷ lệ tác vụ test và review có báo cáo trong `plans/reports/` | Dấu vân tay "báo cáo ghi vào `plans/`" trên từng run; lọc run theo skill `test`, `code-review` | Không |
| Credit trung bình mỗi tác vụ | Cột Harness-reported của run Kiro (credit Kiro tự ghi trong `usage_info`); tab Usage cộng theo project và theo tuần | Không; chỉ khi cần token (không phải credit) thì Kiro chưa ghi |
| Thời gian kỹ sư mới làm được tác vụ đúng quy trình | Không đo trực tiếp; có thể xem Success và Autonomy của run đầu tiên của người đó | Quan sát |

Ngoài bốn chỉ số trên, ba con số đáng đưa vào báo cáo cuối pilot: tỷ lệ run có chủ động dùng kit, Autonomy theo harness (Kiro + MK có phải hỏi người nhiều hơn Claude Code + MK không) và hook không crash lần nào trong suốt hai tuần.

Bộ chỉ số này đo **agent phát triển phần mềm** trên máy kỹ sư. Chỉ số vận hành cho **agent nghiệp vụ** chạy trên dữ liệu doanh nghiệp là chuyện khác, xem [Operations and Improvement Loop](../03-ai-ready-enterprise/engineering/06-operations-and-improvement-loop.md).

---

## 6. Store bền

Mỗi lượt chạy, dù là CLI hay daemon, ghi những gì đã xử lý vào store. Phân tích luôn dựng từ store; collector chỉ thêm hoặc ghi đè run mà nguồn đã đổi. Run mất nguồn được gắn nhãn **archived** và vẫn được tính, trong UI có nhãn riêng.

Số đo trên máy tham chiếu, để ước lượng tài nguyên:

| Chỉ số | Giá trị |
|---|---|
| Run trong store | 71 (58 top-level), 25 project |
| Dung lượng store | 28 MB |
| Lần làm mới đầu tiên sau khi cài | 12 giây |
| Làm mới khi không có gì đổi | 0,1 đến 1,2 giây |
| Heap giữ lại của daemon | khoảng 6 MB |
| RSS của daemon sau khi parse xong | khoảng 200 MB, V8 chưa trả trang về hệ điều hành |

Store không tự dọn. Muốn giới hạn thì chạy `store prune --days N` định kỳ. CLI và daemon dùng chung store an toàn: index được merge khi ghi, không đè lên nhau.

---

## 7. Giới hạn cần biết trước

- Observe **không tính tiền**. Nó chỉ lưu token theo model và con số harness tự báo; cột chi phí là việc của người đọc với bảng giá của mình. Với tài khoản gói cố định, token vẫn là thước đo đúng để so project và model với nhau.
- Kiro ghi credit vào `usage_info` (observe đọc và hiện ở Harness-reported) nhưng để trống các trường token trong kiro-cli ≤ 2.21. Token của Kiro vì thế chưa so được với hai harness kia cho đến khi CLI ghi.
- Catalogue kit gộp mọi project trên máy, kể cả project cài kit full. Danh sách "skill chưa dùng" vì thế đọc theo từng tên kit, không lấy con số tổng làm kết luận.
- "Dùng kit" suy từ dấu vết trong log (lệnh slash, đọc `SKILL.md`, subagent). Run mà hook của kit chạy ngầm nhưng người dùng không gọi thành phần nào vẫn tính là không dùng kit; đó là chủ ý, vì câu hỏi là team có chủ động dùng kit không.
- OpenCode không ghi lại việc hỏi quyền, chỉ có ngắt tool call. Autonomy của OpenCode vì thế có xu hướng cao hơn thực tế.
- Kit health chỉ có dữ liệu ở project **đã cài kit**, vì hook-log nằm trong `.claude/hooks/.logs/` của từng project. OpenCode không có hook của kit.
- Store chứa 300 ký tự đầu của prompt và đường dẫn file mà agent chạm vào. Nó nằm trong home của người dùng, không rời máy, nhưng khi bàn giao máy hoặc chia sẻ export phải coi nó là dữ liệu nội bộ. Với repo của khách hàng, cần hỏi trước khi export ra ngoài máy.
- Mới hỗ trợ launchd và `systemd --user`. Trên Windows chạy `serve --all --no-open` bằng scheduler của mình.

---

## 8. Kiểm tra sau khi cài

Chạy lần lượt, kỳ vọng ghi bên cạnh.

```bash
node .claude/skills/observe/scripts/observe.cjs daemon status
#   installed: true / running: true (pid ...) / app: ~/.mk-observe/app/observe v1.3.0

curl -s http://127.0.0.1:3467/api/health
#   {"ok":true,"mode":"daemon", ... "refreshes":N>0, "store":{"runs":...}}

node .claude/skills/observe/scripts/observe.cjs store status
#   runs: N, projects: M, size: ... MB, last saved: vừa xong

node .claude/skills/observe/scripts/observe.cjs stats --all --days 7
#   bảng By harness / By agent / By model, mỗi dòng có grade và 4 chiều,
#   rồi Usage by model, Adoption, Workflow & outcomes, Insights

curl -s 'http://127.0.0.1:3467/api/analysis?days=7' | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const a=JSON.parse(s);console.log(a.insights.length+" insights, "+a.usage.byModel.length+" models, kit share "+a.adoption.kitShare+"%")})'
#   ví dụ: 12 insights, 11 models, kit share 41.4%
```

Mở `http://127.0.0.1:3467/`, chọn "All projects", bấm một dòng trong tab Runs để thấy timeline. Nếu UI báo "daemon is collecting for the first time", đợi vài giây, nó tự thử lại.

---

## 9. Sơ đồ mã nguồn cho người bảo trì

Tất cả nằm trong `.claude/skills/observe/scripts/`, Node thuần, không dependency.

| File | Vai trò |
|---|---|
| `observe.cjs` | CLI: parse tham số, điều phối lệnh |
| `lib/collect-claude.cjs` | parse transcript jsonl, cache theo size/mtime, chỉ giữ stub cho file không đổi |
| `lib/collect-opencode.cjs`, `lib/collect-kiro.cjs` | truy vấn sqlite, dựng run |
| `lib/collect-hooklog.cjs` | đọc `hook-log.jsonl`, ghép vào run theo id phiên hoặc cửa sổ thời gian |
| `lib/collect.cjs` | gộp collector, liệt kê project của mọi harness, đọc catalogue kit của project (`kitInventory`) |
| `lib/model.cjs` | mô hình run và từ vựng sự kiện dùng chung |
| `lib/metrics.cjs` | tóm tắt run, bốn chiều, xếp hạng phân vị, usage/adoption/workflow, luật insight (`buildInsights`) |
| `lib/store.cjs` | store bền (schema v2): upsert theo sourceKey, archived, prune, merge khi ghi; dòng v1 được tóm tắt lại từ nguồn ở lượt đầu |
| `lib/pipeline.cjs` | collect → summarize → persist → analyze; điểm vào duy nhất cho CLI và server |
| `lib/server.cjs` | HTTP server, API `/api/analysis`, `/api/projects`, `/api/runs/:id`, `/api/health`, vòng làm mới nền |
| `lib/daemon.cjs` | copy app, launchd/systemd, status |
| `lib/sqlite.cjs`, `lib/report.cjs` | `node:sqlite` với fallback CLI `sqlite3`; bảng terminal |
| `ui/index.html` | web UI một file, không cần bước đóng gói |

Muốn thêm harness mới: viết một `collect-<tên>.cjs` trả về run theo `model.cjs` kèm `sourceKey`, đăng ký trong `collect.cjs` và thêm dòng độ phủ trong `metrics.cjs`. Không phải đụng vào chấm điểm, store hay UI.

## Câu hỏi mở

1. Nâng workspace mẫu từ kit v2.4.0 lên v2.10.0 sẽ đè 10 skill tích hợp và rules đã sửa; cần một lần nâng thử có backup trước khi bảo team làm theo.
2. Bản Kiro dựng từ v2.6.1 chưa có skill này; sau khi dựng lại từ kit mới, wrapper `/mk-observe` có cần đưa vào danh sách skill nhúng toàn văn không, hay để `node` gọi thẳng là đủ?
3. Kiro ghi credit nhưng để trống token (kiro-cli ≤ 2.21). Có cần theo dõi release note của Kiro để bật so sánh token giữa harness, hay credit là đủ cho pilot?
4. Trên máy kỹ sư do khách hàng quản lý, dịch vụ chạy nền và store chứa 300 ký tự đầu của prompt có được phép không? Cùng loại câu hỏi với việc cho hook chạy Node trong repo của khách ở Decision Brief.
5. Team dùng Windows cần scheduler riêng cho daemon; chưa có hướng dẫn kiểm chứng.
