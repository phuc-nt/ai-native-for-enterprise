# 01 — AI-Friendly and AI-Ready Data

*Trụ cột 2. Vì sao đây là trụ cột tốn công nhất: xem
[leadership/01](../leadership/01-three-pillars-proposal.md). Tài liệu này nói làm
thế nào.*

Hai từ hay bị dùng lẫn. Tách rõ vì chúng đòi hỏi việc khác nhau và có tiêu chí
nghiệm thu khác nhau.

| | AI-friendly | AI-ready |
|---|---|---|
| Định nghĩa | Máy **đọc được**: có cấu trúc, có kiểu, có tài liệu, dựng lại được | Agent **dùng được ngay**: biết hỏi gì ở đâu, ngưỡng nào tin được, dữ liệu không nói được gì |
| Sản phẩm | Bảng có schema, cột giữ tên gốc, đơn vị rõ, giá trị đặc biệt rõ | Brief ngắn + data map + truy vấn mẫu + guardrail + nhãn nguồn gốc |
| Người làm | Kỹ sư dữ liệu | Người hiểu nghiệp vụ, viết cho agent đọc |
| Kiểm tra | Dựng lại từ kho nguyên bản, không cần mạng, ra cùng kết quả | Agent mới, phiên mới, trả lời đúng câu hỏi thường gặp mà không cần ai nhắc |
| Hỏng thế nào | Cột tên `f3`, đơn vị lẫn, `null` và `0` lẫn nhau | Bảng có nhưng agent đoán tên cột, bịa ngưỡng, kể lại số cũ trong trí nhớ |

Trong bối cảnh dự án offshore, nguồn điển hình là Jira (issue, sprint, board),
Confluence (spec, report, meeting note), Slack (trao đổi với khách JP), Git
(PR, CI), DB của hệ thống khách, tài liệu Nhật dạng Excel/Word, biên bản họp
và transcript, và ngữ cảnh chỉ PM/BrSE biết. Ba MCP server trong
[bộ công cụ](../../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md) là *connector* tới ba nguồn
đầu; bậc thang dưới đây là cách biến những gì connector lấy về thành thứ agent
dùng được lặp lại, không phụ thuộc phiên. Việc cụ thể cho **từng nguồn** ở
[09 — playbook theo nguồn](09-data-source-playbook.md).

## Bậc thang bốn lớp

![Bậc thang tri thức: từ nguồn thô đến AI-ready](../diagrams/enterprise-ai-knowledge-ladder.dataflow.svg)

[Bản tương tác](../diagrams/enterprise-ai-knowledge-ladder.dataflow.html)

| Lớp | Tên | Chứa gì | Tính chất | Trong ví dụ coach | Trong dự án offshore |
|---|---|---|---|---|---|
| 1 | **Nguyên bản (raw)** | Payload đúng như nguồn trả về, kèm nguồn + ngày | Bền vững, không sửa, không xóa | Mỗi ngày mỗi endpoint một dòng JSON verbatim; ledger `(nguồn, ngày)` | Kết quả JQL/CQL và Slack thread lưu nguyên JSON theo ngày |
| 2 | **Bảng có kiểu (parsed)** | Cột có kiểu, tên khớp trường gốc, schema có tài liệu | Dựng lại được từ lớp 1, offline | Bảng sleep, HRV, activity… tên cột giữ nguyên theo nguồn | `issues`, `sprints`, `transitions`, `messages`; tên trường theo Jira/Slack |
| 3 | **Dẫn xuất (derived)** | Chỉ số tính từ lớp 2 theo công thức có nguồn gốc | Tính lại được; tiến về trước theo ngày | Điểm phục hồi, tải luyện tập, xu hướng 7 ngày | Velocity thật, carry-over, tuổi blocker, tỷ lệ bug/story theo sprint |
| 4 | **Bộ tri thức (curated)** | Brief cho agent: data map, truy vấn mẫu, ngưỡng, guardrail, playbook | Versioned trong git, đọc lại mỗi phiên | `coach-brief.md` + file "depth" có trích dẫn | Brief của bộ phận PMO; `00_context/` của từng dự án |

Mỗi lớp chỉ phụ thuộc lớp dưới. Sai ở lớp nào sửa ở lớp đó rồi chạy lại từ đó
lên; **không bao giờ phải lấy lại dữ liệu từ nguồn** vì lớp 1 còn nguyên.

Ánh xạ hai trạng thái lên bậc thang: **AI-friendly = lớp 1 + 2** đạt nghiệm
thu (dựng lại offline, chủ nghiệp vụ trả lời được bằng truy vấn mẫu);
**AI-ready = lớp 3 + 4** cộng một lệnh trả JSON, nghiệm thu bằng người mới
(GĐ 3 ở [07](07-phase-acceptance.md)). Lớp 3 thuộc về AI-ready vì
"ngưỡng nào tin được" là câu hỏi của agent, không phải của máy đọc.

## Lớp 1: lưu nguyên bản trước, xử lý sau

Nguồn thường khó lấy lại: API giới hạn tần suất, phiên đăng nhập hết hạn
(cookie thiết bị đeo trong ví dụ; browser token Slack trong dự án), con người
trả lời một lần. Vì vậy:

- Connector **ghi payload xuống kho trước**, rồi mới parse. Parse hỏng chỉ tốn
  một lần chạy lại; lấy lại dữ liệu có thể là không thể.
- Ledger chỉ đánh dấu `(nguồn, ngày)` **sau khi parse thành công**, để lần
  chạy sau biết bỏ qua ngày nào và làm lại ngày nào.
- Connector idempotent: chạy hai lần trong ngày không tạo bản sao.

*Minh họa:* hệ thống ví dụ có lệnh `reparse` chạy hoàn toàn offline trên kho
nguyên bản. Đổi schema ba lần trong dự án, không lần nào phải gọi lại API.

## Lớp 2: máy đọc được

Checklist AI-friendly cho mỗi bảng:

- [ ] Tên bảng, tên cột **giữ nguyên định danh gốc** của nguồn. Không dịch.
      Dịch làm mất khả năng đối chiếu và grep.
- [ ] Mỗi cột có: kiểu, đơn vị, ý nghĩa của `null`, giá trị đặc biệt
      (sentinel), khóa chính.
- [ ] Có ít nhất một **truy vấn mẫu** đúng cho bảng đó, viết sẵn trong tài liệu
      schema.
- [ ] Bảng dựng lại được từ lớp 1 bằng một lệnh, không cần mạng.
- [ ] Chỉ số do nguồn tính sẵn (ví dụ story point "done" theo Jira) được
      **lưu để đối chiếu**, không dùng làm nguồn của lớp 3.

## Lớp 3: dẫn xuất có nguồn gốc

Con số agent trích dẫn phải **tính lại được từ dữ liệu đã lưu** theo công thức
có ghi nguồn. Ba nhãn nguồn gốc dùng xuyên suốt:

| Nhãn | Nghĩa | Ví dụ coach | Ví dụ dự án |
|---|---|---|---|
| `MEASURED` | Đo từ dữ liệu của chính người dùng / dự án này | Baseline 30 ngày của một chỉ số | Velocity trung bình 6 sprint gần nhất của team này |
| `LITERATURE` | Từ tài liệu, chuẩn ngành; có trích dẫn | Ngưỡng theo hướng dẫn chuyên môn | Ngưỡng từ quy trình chất lượng công ty, có link |
| `CONVENTION` | Quy ước nội bộ, chọn vì hợp lý, có thể đổi | Cửa sổ 7/28 ngày | "Blocker quá 3 ngày là đỏ" |

Agent đọc nhãn để biết nên nói "đo được" hay "theo quy ước". Người bảo trì đọc
nhãn để biết cái gì được phép đổi tự do.

Lớp dẫn xuất chạy **tiến về trước** (forward-only): giá trị ngày N tính từ
ngày N-1 và dữ liệu ngày N; không nhìn tương lai, không tính lại toàn bộ lịch
sử mỗi lần hỏi.

## Lớp 4: AI-ready — bộ tri thức

Đây là thứ phân biệt "có dữ liệu" và "agent dùng được". Một brief tốt trả lời
năm câu:

1. **Bạn là ai, nói với ai, giọng thế nào** (voice). Với khách JP: song ngữ,
   kính ngữ, không làm mềm trạng thái.
2. **Hỏi gì ở đâu** (data map): mỗi câu hỏi thường gặp → bảng nào → truy vấn
   mẫu nào. *"Query, don't recall."*
3. **Ngữ cảnh người dùng đã nói** nằm ở bảng nào (không trong trí nhớ phiên).
4. **Dữ liệu KHÔNG nói được gì** (guardrail): nguồn X không đo được Y; chỉ số Z
   còn hiệu chỉnh khi chưa đủ N sprint/ngày.
5. **Quyết định thế nào** (playbook): ngưỡng, quy tắc, thứ tự ưu tiên, kèm
   nhãn nguồn gốc.

*Minh họa:* brief của coach có các mục Voice → Profile → Data map (kèm "truy
vấn sẵn sàng hằng ngày, copy đừng viết lại") → Ngữ cảnh người dùng đã nói →
Guardrail → Playbook → Rules. Toàn bộ trong git, là **nguồn sự thật duy
nhất**; file chỉ dẫn của từng harness chỉ trỏ tới nó.

Đối chiếu với thứ tôi đang dùng cho dự án phần mềm: `00_context/` (requirements,
implementation guide, reference) chính là lớp 4 cho *codebase*; brief nghiệp
vụ là lớp 4 cho *dữ liệu vận hành*. Cùng nguyên lý: AI đọc folder trước khi
đọc prompt. Với nguồn là DB, semantic layer + verified queries + governed
metrics của my-db-mate là lớp 4 dạng có công cụ hỗ trợ.

### Ngữ cảnh người dùng nói ra là dữ liệu chính

Điểm dễ bỏ sót nhất. PM nói "tuần này khách đang review lại scope", "team
thiếu 2 người đến giữa tháng" — đó là ngữ cảnh quyết định cách đọc mọi con số
sau đó. Nếu chỉ nằm trong bộ nhớ phiên, nó mất ở phiên sau hoặc bị harness tóm
tắt sai.

Cách làm trong ví dụ: bảng `self_reports` (cảm nhận, tự báo) và
`athlete_events` (sự kiện có ngày bắt đầu/kết thúc, trạng thái mở/đóng). Agent
ghi qua tool ghi một tham số; **không bao giờ sửa hay xóa**, chỉ thêm hoặc
đóng. Quy tắc gắn liền: *"một sự kiện là ngữ cảnh, không phải cảm giác"*.

Ánh xạ sang dự án: `project_notes` (ghi chú của PM về ngày/tuần) và
`project_events` (scope review, nghỉ lễ JP, thiếu người, release freeze) —
cùng cấu trúc, cùng quy tắc. Lệnh sync trả về sự kiện đang mở mỗi lượt, agent
không cần nhớ.

## Anti-pattern hay gặp

| Anti-pattern | Hậu quả | Thay bằng |
|---|---|---|
| Nhồi hết Confluence vào vector DB rồi "RAG" | Agent trích đoạn nhưng không biết đoạn nào đúng, số nào mới | Bậc thang bốn lớp; RAG chỉ cho tài liệu phi cấu trúc thật sự |
| Dịch tên trường cho "dễ hiểu" | Mất đối chiếu với nguồn; grep hỏng | Giữ định danh gốc, giải thích trong schema doc |
| Để agent tự viết JQL/SQL mỗi lượt | Đoán tên trường, quên sentinel, sai đơn vị | Truy vấn mẫu trong brief; lệnh trả JSON kèm ngữ cảnh |
| Parse trực tiếp từ API vào bảng | Parse hỏng = mất dữ liệu | Raw-first, ledger sau parse |
| Ngưỡng nằm trong prompt, không có nguồn | Không ai biết đổi được không | Nhãn MEASURED / LITERATURE / CONVENTION |
| Ngữ cảnh trong bộ nhớ phiên | Mất sau `/new`; harness tóm tắt sai | Bảng ngữ cảnh append-only, ghi qua tool |
