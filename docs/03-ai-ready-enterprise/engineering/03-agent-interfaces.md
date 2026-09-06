# 03 — Interfaces for Agents

*Trụ cột 3.* Giao diện cho agent khác giao diện cho lập trình viên. Lập trình
viên đọc tài liệu một lần rồi nhớ; agent đọc lại mỗi phiên và sẽ đoán khi
thiếu. Vì vậy giao diện tốt cho agent là **hẹp, có ngữ cảnh, và trả về thứ
dùng được ngay**.

## Một lượt hỏi-đáp

![Một lượt hỏi-đáp qua harness và giao diện dữ liệu](../diagrams/enterprise-ai-agent-turn.sequence.svg)

[Bản tương tác](../diagrams/enterprise-ai-agent-turn.sequence.html)

Ba pha:

1. **Định tuyến** — harness nhận tin từ kênh, gắn vào agent và phiên.
2. **Tiếp đất** — agent đọc brief trước, gọi lệnh sync trả JSON kèm ngữ cảnh,
   rồi mới truy vấn theo mẫu trong brief nếu cần thêm.
3. **Trả lời** — kết luận + bằng chứng + thời điểm dữ liệu (as-of); harness ghi
   transcript và gửi về kênh.

Không có bước "agent mò trong kho": mọi thứ agent chạm vào đều được brief hoặc
lệnh dẫn tới.

## Ba loại giao diện

| Loại | Khi nào | Ưu | Nhược |
|---|---|---|---|
| **CLI một lệnh trả JSON** | Mặc định cho mọi harness có exec; dữ liệu cùng máy | Không server, không auth riêng, test bằng tay, transcript ghi nguyên lệnh | Chỉ cục bộ; nhiều lệnh = nhiều thứ phải nhớ |
| **MCP server** | Nhiều harness/client cần cùng tool; muốn tool tự mô tả schema | Chuẩn, harness tự khám phá tool; kiểm soát tham số bằng schema | Thêm một tiến trình; debug khó hơn CLI |
| **API (HTTP)** | Dữ liệu ở máy khác; nhiều đội dùng; cần auth/RBAC tập trung | Quen thuộc; tích hợp hạ tầng hiện có | Dễ thành "API mở để agent tự mò"; cần rate limit, audit riêng |

Thứ tự khuyến nghị: **CLI trước** (rẻ, minh bạch, đủ cho pilot) → bọc thành
**MCP** khi có harness/client thứ hai → mở **API** khi có đội thứ hai hoặc dữ
liệu tách máy. Cùng một hàm lõi, ba lớp vỏ.

Ba MCP server Jira/Confluence/Slack là ví dụ đã có của bước thứ hai, và hợp
đồng của chúng đã theo đúng nguyên tắc dưới đây: envelope thống nhất
`{ok, data, meta}` / `{ok:false, error:{code, message, hint}}`, `hint` để agent
tự phục hồi, zod validate ở biên, tham số đồng nhất giữa các server. Xem
[bộ công cụ](../../02-ai-toolkit/01-ai-toolkit-offshore-team.md#4-topology).

## Hợp đồng của lệnh sync

Lệnh quan trọng nhất trong ví dụ là `sync --json`. Nó làm ba việc trong một
lần gọi và trả một JSON:

```text
{
  "ok": true | false,
  "status": "ok" | "cookie_expired" | "no_cookie",
  "latest_date": "...",          // ngày mới nhất có dữ liệu
  "data_age_hours": ...,         // dữ liệu cũ bao nhiêu giờ
  "last_ingest_at": "...",
  "days_in_archive": ...,
  "recovery": {                  // chỉ số dẫn xuất, đã tính sẵn
    "calibrating": bool, "hrv_nights": n, "hrv_nights_required": n,
    "score": ..., "reason": "..."
  },
  "athlete_events": [            // ngữ cảnh đang mở do người dùng khai
    { "id", "kind", "state", "date_start", "date_end", "summary" }
  ]
}
```

(Giá trị đã lược; chỉ giữ hình dạng.) Bản cho dự án: `status` ∈
`{ok, token_expired, no_token}`, `latest_sprint`, `data_age_hours`, khối chỉ số
sprint, và `project_events[]` đang mở.

Các nguyên tắc rút ra:

| Nguyên tắc | Nghĩa | Vì sao |
|---|---|---|
| **Một lệnh, đủ ngữ cảnh** | Ingest + tính lại + trạng thái + ngữ cảnh mở trong một JSON | Agent không phải chuỗi ba bốn lệnh và không quên bước nào |
| **Degraded không phải failed** | `ok: true` kèm `status: cookie_expired` khi không lấy được dữ liệu mới nhưng kho vẫn dùng được | Agent vẫn trả lời từ dữ liệu cũ, nói rõ as-of; chỉ `ok: false` khi kho hỏng thật |
| **As-of luôn có mặt** | `latest_date`, `data_age_hours` | Agent bắt buộc nói dữ liệu cũ bao lâu, không giả vờ realtime |
| **Trạng thái hiệu chỉnh** | `calibrating`, `n/required` | Agent biết khi nào không được kết luận |
| **Ngữ cảnh mở đi kèm** | Sự kiện đang mở | Agent không cần nhớ; mỗi lượt đều thấy |
| **Probe chỉ đọc tách riêng** | `--status` không ingest, không ghi | Health-check, cron kiểm tra, và khi chỉ cần biết "dữ liệu có mới không" |

Envelope này khớp với envelope của 3 MCP server: `ok` + `data` + `meta`, lỗi
có `code`/`hint`. Một chiến lược parse cho mọi tool.

## Hợp đồng của tool ghi

Tool ghi nguy hiểm hơn tool đọc, nên hẹp hơn:

- **Đúng một tham số**, là một chuỗi có ngữ pháp chặt, bọc trong nháy đơn.
  Hình dạng: `log-event 'kind=scope_review; start=YYYY-MM-DD; summary=...'`.
  Một tham số vì shell tách tham số là nguồn lỗi đã gặp thật (xem
  [06](06-operations-and-improvement-loop.md)).
- **Append-only**: thêm bản ghi mới hoặc đóng bản ghi cũ (`close-event id`).
  Không `UPDATE`, không `DELETE`. Sai thì ghi bổ sung.
- **Trả JSON** xác nhận bản ghi vừa tạo, để agent trích lại cho người dùng.
- **Không SQL/JQL tự do** cho agent nền. Cần truy vấn mới thì thêm truy vấn
  mẫu vào brief hoặc thêm lệnh.

Với tool ghi ra **hệ thống nguồn** (tạo issue Jira, post Slack cho khách), thêm
một mức: agent nền chỉ được ghi khi có mẫu cố định và người duyệt, hoặc để
việc đó cho chế độ tương tác nơi người xem trước khi gửi.

## Đính kèm và media

Khi agent cần gửi biểu đồ/ảnh về kênh, không cho agent đường dẫn tự do. Lệnh
tạo biểu đồ ghi file vào thư mục harness kiểm soát và in một marker
(`MEDIA: <đường dẫn>`); harness nhận marker và đính kèm. Media guard chặn mọi
đường dẫn ngoài workspace — đây là tính năng, không phải lỗi.

## Checklist thiết kế một giao diện cho agent

- [ ] Một câu hỏi thường gặp → một lệnh/tool; tên lệnh nói rõ nó trả gì.
- [ ] Trả JSON; có `ok`, `status`, as-of.
- [ ] Trạng thái suy giảm (degraded) khác trạng thái lỗi.
- [ ] Ngữ cảnh cần để diễn giải đi kèm trong kết quả.
- [ ] Đọc và ghi tách thành tool riêng; ghi nhận một tham số, append-only.
- [ ] Lỗi có `code` và `hint` để agent tự phục hồi.
- [ ] Chạy được bằng đường dẫn tuyệt đối từ bất kỳ cwd nào.
- [ ] Có `--status` hoặc tương đương, không side effect.
- [ ] Ví dụ gọi và ví dụ kết quả nằm trong brief, không chỉ trong `--help`.
- [ ] Transcript ghi lại nguyên lệnh và nguyên kết quả.
