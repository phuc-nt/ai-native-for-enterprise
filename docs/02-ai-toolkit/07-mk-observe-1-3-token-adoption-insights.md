# MK Observe 1.3: Token Usage, Kit Adoption and Insights

Thông báo thay đổi cho tech lead và người sở hữu kit trong team. Cập nhật 2026-09-06.

Đọc trước: [MK Observe: Agent Activity Metrics Across Harnesses](06-mk-observe-agent-metrics.md) để biết observe là gì và cách cài; tài liệu đó đã cập nhật theo bản 1.3, người chưa từng dùng observe đọc thẳng nó là đủ. Tài liệu này chỉ nói **những gì mới so với bản 1.2**, vì sao đổi, và phải làm gì để nâng cấp.

Căn cứ: kit `my-agent-kit-lite` v2.10.0, skill `observe` v1.3.0, đã chạy trên một máy tham chiếu có cả ba harness và 30 ngày dữ liệu. Số liệu ví dụ bên dưới lấy từ máy đó, chỉ để minh hoạ cách đọc.

---

## 1. Ba thay đổi, đọc trong một phút

1. **Không còn cột chi phí.** Observe lưu **số token thô theo từng model** cho mỗi run (input, output, cache read, cache write, reasoning, số lần gọi API). Con số harness tự báo (USD của OpenCode, credit của Kiro) giữ riêng, có nhãn. Muốn ra tiền thì nhân token với bảng giá của hợp đồng mình. Bản 1.2 ước tính USD theo giá niêm yết API, sai với tài khoản gói cố định và lệch ngay khi giá đổi.
2. **Đo mức độ dùng kit.** Observe đọc catalogue kit đã cài trong từng project (tên, version, skill, agent, hook) và trả lời: bao nhiêu phần trăm run có dùng kit, thành phần nào dùng nhiều, thành phần nào chưa ai dùng, project nào chưa cài hoặc đang chạy bản cũ.
3. **Insights cho quản lý.** Một bộ luật ngưỡng chạy trên toàn bộ số liệu và in ra phát hiện có mức độ, bằng chứng, gợi ý và id run đứng sau. Mở tab Insights là thấy việc cần xử lý trước.

Kèm theo: khối **Workflow & outcomes** (prompt ngắn, số lần lái lại, marathon, compaction, lỗi API, commit, push, PR, test chạy và test fail, file sửa nhiều, heatmap giờ làm) và tab **Usage** (token theo model, harness, project, tuần).

Không đổi: bốn chiều điểm, cách xếp hạng, store bền, daemon, các lệnh CLI cũ. Node 18 vẫn là yêu cầu duy nhất.

---

## 2. Vì sao bỏ chi phí, và tính chi phí thế nào

Ba harness ghi tiền theo ba cách khác nhau: Claude Code không ghi tiền, chỉ ghi token; OpenCode tự tính USD; Kiro ghi credit. Một cột "cost" chung buộc observe phải mang bảng giá riêng, và bảng đó sai với mọi team dùng gói cố định, hợp đồng doanh nghiệp, hoặc gateway riêng. Token thì mọi harness đều có (Kiro sẽ có, xem mục 7) và không phụ thuộc hợp đồng.

Observe giữ cho mỗi run:

| Trường | Nội dung |
|---|---|
| `tokens` | tổng input, output, cacheRead, cacheWrite, reasoning của run |
| `models` | cùng các số đó **theo từng model**, cộng số lần gọi API |
| `reported` | con số harness tự báo, kèm đơn vị: `{value, unit: "usd"}` của OpenCode, `{value, unit: "credit"}` của Kiro |

Chi phí của một khoảng thời gian, một project, một model:

```
chi phí = Σ theo model ( input × p_in + output × p_out + cacheRead × p_cache_read + cacheWrite × p_cache_write )
```

Bảng token theo model lấy ở tab Usage, khối "Usage by model" của `stats`, hoặc `export --json` (trường `usage.byModel`). Dạng bảng, ví dụ minh hoạ 30 ngày trên máy tham chiếu:

| Model | Run | Input | Output | Cache read | Cache write | Cache hit |
|---|---|---|---|---|---|---|
| model mạnh A | 19 | 53 k | 10,4 M | 2,83 G | 66 M | 97,7 % |
| model mạnh B | 13 | 54 k | 8,1 M | 3,08 G | 77 M | 97,5 % |
| model đời trước | 9 | 422 k | 3,2 M | 1,87 G | 49 M | 97,4 % |
| model mở qua gateway (OpenCode) | 3 | 4,2 M | 171 k | 75 M | 0 | 94,7 % |
| … | | | | | | |

Điền giá của hợp đồng vào bốn cột đơn giá là ra tiền. Cache hit thấp là dấu hiệu prompt hệ thống đổi liên tục hoặc phiên quá ngắn, chi phí input sẽ cao dù token không đổi.

> Nếu chỉ cần con số nhanh cho OpenCode hoặc Kiro thì cột **Harness-reported** đã là số harness tự tính, không cần công thức. Với pilot Kiro, đây chính là nguồn cho chỉ số "credit trung bình mỗi tác vụ" trong [Decision Brief, mục 5](04-kiro-mk-kit-decision-brief.md#5-lộ-trình-pilot-đề-xuất).

---

## 3. Mức độ dùng kit được đo ra sao

Một run **dùng kit** khi nó có ít nhất một trong bốn dấu vết:

- gõ lệnh slash của kit: `/mk:…` (trên Kiro là `/mk-…`), hoặc lệnh trùng tên một skill trong `.claude/skills/` của project (ví dụ `/cook`, `/fix`)
- đọc một file `SKILL.md`
- gọi Skill tool
- spawn subagent

Hook chạy ngầm **không** tính là dùng kit. Câu hỏi đặt ra là team có chủ động gọi kit không, chứ không phải kit có được cài không.

Catalogue lấy từ `.claude/metadata.json` (tên kit, version), thư mục `skills/`, `agents/`, và hook khai trong `settings.json` của từng project có kit. Từ đó observe cho:

| Câu hỏi | Chỗ xem |
|---|---|
| Bao nhiêu phần trăm run dùng kit, theo tuần | Insights, khối Adoption; Overview có ô "Kit used" |
| Lệnh, skill, agent, hook nào dùng nhiều | Insights, bảng Skills / Agents / Commands |
| Agent của kit hay agent có sẵn của harness được gọi nhiều hơn | Insights, cột Kit agents / Harness agents |
| Thành phần nào chưa ai dùng trong cửa sổ thời gian | Insights, khối "Never used" |
| Project nào chưa cài kit, project nào chạy bản cũ | Insights, bảng Projects (cột Kit, Version, Hook log) |

Ví dụ minh hoạ: 24 trên 58 run dùng kit (41 %), 3 project đang hoạt động chưa cài kit, 8 project chạy kit cũ hơn bản mới nhất trên máy. Với một team mới nhận kit, con số đầu tiên đáng theo dõi theo tuần là tỷ lệ này.

---

## 4. Insights: luật, mức độ, cách đọc

Mỗi phát hiện có mức `bad` / `warn` / `info` / `good`, một dòng bằng chứng, một dòng gợi ý và tối đa 20 id run để bấm vào timeline. Sắp xếp bad trước.

Sáu nhóm luật (Adoption, Workflow, Outcomes, Reliability, Usage, Điểm) và ngưỡng mặc định của từng luật liệt kê trong [MK Observe, mục 4](06-mk-observe-agent-metrics.md#4-đọc-số-liệu), không lặp lại ở đây.

Luật tỷ lệ chỉ bật khi có từ 5 run. Ngưỡng là số thường trong `scripts/lib/metrics.cjs`, hàm `buildInsights`; team chỉnh theo mình rồi ghi lại lý do.

Một phát hiện đáng nói riêng: **hook crash vì unresolved path**. Khi Claude Code báo `Cannot find module …/.claude/hooks/x.cjs`, nghĩa là phiên được mở từ thư mục con của nơi cài kit, hook không hề chạy, phiên đó không có gì bảo vệ. Observe tách loại này khỏi crash thật và ghi rõ trong gợi ý. Đây là lỗi cách dùng, không phải lỗi hook, và là thứ đầu tiên nên dặn team khi bàn giao kit.

Ví dụ đầu ra, minh hoạ:

```
[BAD]  kit         Hook scout-block crashed 7×
[WARN] adoption    3 active project(s) without the kit installed
[WARN] workflow    70.7% of runs start from a short prompt (≤ 20 words)
[WARN] workflow    Average 41 steering messages per run
[WARN] kit         Hook session-state crashed 183× (183 unresolved path)
[WARN] reliability Retry loops in 15.5% of runs
[INFO] adoption    97 of 116 kit skills never used in 30 days
[INFO] outcomes    280 commits · 69 pushes · 2 PRs recorded
```

---

## 5. Nâng cấp

Chỉ skill `observe` đổi giữa kit v2.9.2 và v2.10.0, nên có hai cách:

```bash
# cách 1: nâng cả kit (đè tuỳ biến trong .claude/, backup trước, xem tài liệu 02)
npx my-agent-kit-lite init /path/to/project --upgrade --force

# cách 2: chỉ thay skill observe, không đụng phần còn lại
rm -rf /path/to/project/.claude/skills/observe
cp -R <checkout-kit>/claude/skills/observe /path/to/project/.claude/skills/observe

# sau đó, một lần mỗi máy: dịch vụ chạy từ bản copy nên phải cài lại
node .claude/skills/observe/scripts/observe.cjs daemon install
```

Cách 2 hợp với workspace mẫu của tài liệu 02, nơi 10 skill tích hợp và rules đã sửa không nên bị đè.

Store tự chuyển sang schema v2 ở lượt làm mới đầu tiên:

- run mà transcript còn trên máy được tóm tắt lại từ nguồn, có đủ token theo model
- run mà nguồn đã bị harness dọn giữ nguyên tóm tắt cũ (không có token theo model), vẫn được tính điểm và đếm
- không cần xoá store, không mất gì

Kiểm tra sau khi nâng:

```bash
node .claude/skills/observe/scripts/observe.cjs daemon status
#   app: ~/.mk-observe/app/observe v1.3.0, running: true

curl -s 'http://127.0.0.1:3467/api/analysis?days=7' | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const a=JSON.parse(s);console.log(a.insights.length+" insights, "+a.usage.byModel.length+" models, kit share "+a.adoption.kitShare+"%")})'
#   ví dụ: 12 insights, 11 models, kit share 41.4%

open 'http://127.0.0.1:3467/?tab=insights'
```

Nếu `daemon status` còn báo v1.2.1 thì bước `daemon install` chưa chạy lại.

---

## 6. Nhịp đọc hằng tuần cho người quản lý

Mười phút mỗi tuần, chế độ "All projects", cửa sổ 7 ngày:

1. **Insights**, đọc từ trên xuống. Mức `bad` xử lý trong tuần. Mức `warn` về workflow (prompt ngắn, lái lại nhiều) là đề tài cho buổi chia sẻ cách dùng agent.
2. **Insights, bảng Projects.** Project chưa cài kit hoặc bản cũ: nhắc nâng. Project có kit nhưng cột Hook log trống: kit cài rồi nhưng chưa phiên nào chạy qua hook, thường do mở harness sai thư mục.
3. **Insights, khối Never used.** Skill chưa ai dùng sau vài tuần: hoặc team chưa biết, hoặc nên bỏ khỏi bản kit của team. Cả hai đều là quyết định đáng làm.
4. **Usage.** Model nào ăn token, project nào ăn token, cache hit có tụt không. Nhân bảng giá khi cần báo cáo tiền.
5. **Overview.** Bốn chiều theo harness và agent, như trước.

Số nên ghi lại theo tuần để thấy xu hướng: tỷ lệ run dùng kit, tỷ lệ prompt ngắn, số lần lái lại trung bình, tỷ lệ run sửa nhiều mà có test, tổng token theo model. Với pilot Kiro hai tuần, năm số này bổ sung cho bốn chỉ số ở Decision Brief và nên có trong báo cáo cuối pilot.

---

## 7. Giới hạn cần biết

- Kiro ghi credit nhưng để trống các trường token trong kiro-cli 2.21 trở về trước. Credit của Kiro có ở Harness-reported; token của Kiro chưa so được với hai harness kia cho đến khi CLI ghi.
- Catalogue gộp mọi project trên máy, kể cả project cài kit đầy đủ hoặc kit khác tên. Con số "skill chưa dùng" đọc theo từng tên kit, không lấy tổng làm kết luận.
- "Dùng kit" suy từ dấu vết trong log. Run chỉ có hook chạy ngầm không được tính, đó là chủ ý.
- Lệnh slash chỉ nhận khi đứng đầu prompt. Lệnh gõ giữa câu không đếm.
- Luật insight là ngưỡng cố định, không học từ dữ liệu. Chúng chỉ ra chỗ đáng nhìn, không thay cho việc đọc timeline của run.
- Store vẫn chứa 300 ký tự đầu của prompt và đường dẫn file. Quy tắc bảo mật như tài liệu 06.

---

## 8. Việc đề nghị team làm

1. Nâng observe lên 1.3.0 trên máy của người sở hữu kit trước, chạy `daemon install`, xác nhận `daemon status` báo v1.3.0.
2. Điền bảng giá của hợp đồng vào một sheet cạnh bảng token theo model; thống nhất ai giữ sheet đó.
3. Mở tab Insights lần đầu và ghi lại baseline của năm số ở mục 6.
4. Sửa ngay lỗi unresolved path nếu có: mở harness từ đúng thư mục gốc của project.
5. Sau hai tuần, quyết định ngưỡng nào cần chỉnh trong `buildInsights` và skill nào bỏ khỏi bản kit của team.

Mã nguồn và release: `my-agent-kit-lite` v2.10.0, CHANGELOG mục 2.10.0 liệt kê đủ trường mới.

## Câu hỏi mở

1. Ai giữ bảng giá của hợp đồng và có được phép chia sẻ số tiền quy đổi với khách hàng không? Token thì trung tính, tiền thì không.
2. Ngưỡng insight mặc định lấy từ một máy tham chiếu; team cần bao nhiêu tuần dữ liệu trước khi chỉnh, và ai duyệt thay đổi trong `buildInsights`?
3. Tỷ lệ "dùng kit" tính cả subagent và Skill tool của harness. Trên Kiro, nơi skill gọi qua wrapper `/mk-…`, dấu vết này có được nhận đủ không? **[chưa kiểm chứng]**
4. Bảng "Never used" gợi ý cắt skill khỏi bản kit của team; ai quyết, và có cắt trên bản Kiro dựng lại không?
