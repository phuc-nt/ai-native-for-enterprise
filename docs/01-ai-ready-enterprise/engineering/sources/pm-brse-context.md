# Source: PM / BrSE Context

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 1,
làm cùng Jira từ ngày đầu. Nguyên lý ở [01 §Ngữ cảnh người dùng nói ra](../01-ai-ready-data.md#ngữ-cảnh-người-dùng-nói-ra-là-dữ-liệu-chính).*

## 1. Khó ở đâu

- Không nằm trong hệ thống nào: "khách đang review lại scope", "team thiếu 2
  người đến giữa tháng", "tuần sau khách nghỉ Obon". Mọi con số phải đọc qua
  lăng kính này.
- Dễ mất: nói trong chat, harness tóm tắt sai, phiên mới quên.
- Dễ lẫn cảm giác ("tuần này căng") với sự kiện ("release freeze 12–15").
- Chạm dữ liệu con người: lý do nghỉ, xung đột, đánh giá cá nhân — không phải
  thứ để agent lưu.
- PM không viết dài; nếu tốn hơn 20 giây thì không ai ghi.

## 2. Lớp 1 — nguyên bản

Mỗi bản ghi là nguyên bản: ai nói, khi nào, nguyên văn. Không có "parse".

| Việc | Cách làm |
|---|---|
| Ghi bằng gì | Tool một tham số: `log-event 'kind=…; start=…; end=…; summary=…'`, `close-event <id>`, `log-note 'scope=…; text=…'` |
| Ai ghi | PM/BrSE qua chế độ tương tác hoặc qua chat với agent; agent **không tự mở sự kiện** từ tin nhắn Slack của khách (đầu vào không tin cậy), chỉ đề xuất để PM xác nhận |
| Ledger | Không cần; append-only là ledger |
| Idempotent | Mỗi lần gọi một bản ghi; ghi trùng thì đóng bản thừa, không xóa |

## 3. Lớp 2 — bảng

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `project_events` | `id`, `kind`, `state` (open / closed), `date_start`, `date_end`, `summary`, `scope` (project / sprint / team), `said_by`, `created_at`, `closed_at`, `source_ref` | Append-only; `kind` thuộc danh sách đóng |
| `project_notes` | `id`, `scope`, `text`, `said_by`, `created_at`, `tags` | Ghi chú tự do về ngày/tuần; không phải sự kiện |
| `event_kinds` | `kind`, `meaning`, `typical_effect` | Danh sách `CONVENTION`, versioned trong git |
| `jp_calendar` | `date`, `name`, `kind` (national / customer_fiscal / customer_freeze) | `LITERATURE` (lịch công bố) + phần khách báo |

Danh sách `kind` khởi điểm: `scope_review`, `staffing_gap`, `release_freeze`,
`jp_holiday`, `customer_escalation`, `dependency_wait`, `environment_down`,
`contract_change`, `onboarding`. Thêm kind qua PR, không thêm tự do.

Bẫy:

| Điểm | Bẫy | Quy ước |
|---|---|---|
| Cảm giác | "Team mệt" thành sự kiện | Sự kiện có ngày bắt đầu và có thể đóng; cảm giác là `project_notes` |
| Cá nhân | "A nghỉ vì việc gia đình" | Ghi `staffing_gap` với số người, không lý do, không tên nếu không cần |
| Sửa | `UPDATE` cho đúng | Đóng bản cũ, mở bản mới |
| Sự kiện mãi mở | Quên đóng | Chỉ số "mở quá 30 ngày" ở [06](../06-operations-and-improvement-loop.md) |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Sự kiện chồng lên chỉ số | Với mỗi sprint/tuần, danh sách event có khoảng ngày giao nhau | `MEASURED` (giao nhau), không phải nhân quả |
| Chênh lệch "có giải thích" | Sprint lệch baseline mà có event giao nhau | Gợi ý liên hệ; brief cấm nói "vì" |
| Tuổi sự kiện mở | Ngày kể từ `date_start` với `state = open` | `MEASURED`; 30 ngày là `CONVENTION` |
| Ngày làm việc | Ngày lịch trừ `jp_calendar` và lịch VN | Dùng cho mọi "quá N ngày làm việc" ở các nguồn khác |

## 5. Lớp 4 — bộ tri thức

Mục "Ngữ cảnh người dùng đã nói" trong brief:

- **Query, don't recall**: mọi lượt đọc `project_events` mở từ `sync --json`;
  không dựa vào trí nhớ phiên.
- Khi trả lời về bất kỳ chỉ số nào, kiểm tra sự kiện giao nhau và nêu chúng
  **như ngữ cảnh**, không như lý do: "carry-over 40%, cao hơn baseline; trong
  sprint có sự kiện `staffing_gap` (2 người, 5–15)".
- Sự kiện không đổi trạng thái: Delayed vẫn là Delayed, kèm ngữ cảnh.
- Nhắc PM xác nhận sự kiện mở quá 30 ngày; đề xuất đóng, không tự đóng.
- Từ Slack/họp, agent **đề xuất** sự kiện (kind, ngày, nguồn); PM xác nhận
  bằng `log-event`.

Guardrail: không lưu đánh giá cá nhân, lý do sức khỏe/gia đình, nội dung nhân
sự; nếu PM nói ra, agent ghi dạng đã tối giản (`staffing_gap; n=1`) và nói rõ
đã lược.

## 6. Lệnh và tool

```text
context: {
  project_events: [ { id, kind, state, date_start, date_end, summary, scope } ],   // chỉ open
  events_open_over_30d: n,
  notes_last_7d: n
}
```

Tool ghi: `log-event`, `close-event`, `log-note` — một tham số, append-only,
trả JSON bản ghi vừa tạo. Có ở cả hai chế độ; ở chế độ nền chỉ PM trong
allowlist được gọi qua chat.

## 7. Nghiệm thu

- AI-friendly: bảng có schema doc; `event_kinds` được PM đọc và đồng ý; không
  bản ghi nào bị sửa (kiểm tra bằng trigger hoặc quyền).
- AI-ready: sau 2 tuần pilot, mọi bất thường trong retro sprint đều có một sự
  kiện tương ứng hoặc một dòng "không rõ nguyên nhân"; PM xác nhận 5 sự kiện
  đang mở còn đúng; khi được hỏi velocity, agent nhắc sự kiện giao nhau mà
  không dùng chữ "vì".

## 8. Bẫy

- Để ngữ cảnh trong bộ nhớ phiên hoặc trong `AGENTS.md`.
- Agent tự mở sự kiện từ tin nhắn khách.
- Danh sách `kind` phình ra thành 40 loại.
- Ghi chuyện cá nhân "cho đầy đủ".
- Dùng sự kiện để làm mềm trạng thái với khách.
