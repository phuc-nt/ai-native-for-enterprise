# 08 — Case Study: Personal Health Coach (Anonymized)

Hệ thống thật đang chạy, dùng làm ví dụ xuyên suốt bộ tài liệu. Nó nhỏ nhưng
có đủ mọi vấn đề của một triển khai doanh nghiệp: nguồn khó lấy, phiên đăng
nhập hết hạn, ngữ cảnh chỉ người dùng biết, ràng buộc dữ liệu không được rời
máy, agent chạy 24/7 không người trông.

Tài liệu giữ kiến trúc, hợp đồng và con số về thành phần; bỏ mọi giá trị đo,
kết quả xét nghiệm, tình trạng sức khỏe, tên, địa điểm và định danh kênh.

## Bài toán

Một người muốn có coach sức khỏe cá nhân đọc được dữ liệu từ thiết bị đeo
(giấc ngủ, HRV, nhịp tim nghỉ, hoạt động…), kết hợp với những gì người đó tự
khai (cảm nhận, sự kiện như đi công tác/ốm/thi đấu) và giấy tờ y tế; trả lời
qua chat mỗi sáng và khi được hỏi. Ràng buộc cứng: **dữ liệu không rời máy cá
nhân**.

## Thành phần

| Trụ cột | Thành phần | Ghi chú |
|---|---|---|
| Nguồn | API riêng của thiết bị đeo | Phiên đăng nhập hết hạn định kỳ; giới hạn ngày/lần; đã thử SSO tự động và bỏ |
| Nguồn | Người dùng qua chat | Cảm nhận, sự kiện |
| Nguồn | Giấy tờ y tế PDF | Chỉ vào máy bằng đường vật lý; không qua kênh chat |
| Dữ liệu L1 | Kho nguyên bản SQLite | Mỗi (endpoint, ngày) một payload; ledger `(nguồn, ngày)` |
| Dữ liệu L2 | Bảng có kiểu | Tên cột tiếng Anh theo nguồn; schema doc có truy vấn mẫu |
| Dữ liệu L2 | `self_reports`, `athlete_events` | Append-only; sự kiện có `state` mở/đóng |
| Dữ liệu L3 | Lớp dẫn xuất | Điểm phục hồi (calibrating khi chưa đủ đêm HRV), tải cấp tính/mạn tính, xu hướng; công thức có nhãn nguồn gốc |
| Dữ liệu L3 | Lớp lâm sàng | Dẫn xuất từ PDF cục bộ; thư mục gốc gitignored |
| Dữ liệu L4 | `coach-brief.md` + depth files | Voice → Profile → Data map → Ngữ cảnh → Guardrail → Lâm sàng → Playbook → Rules; có trích dẫn |
| Giao diện | `sync --json`, `sync --status` | Một lệnh; degraded ≠ failed; JSON kèm ngữ cảnh |
| Giao diện | Script ghi một tham số | Ghi self-report, mở/đóng sự kiện; trả JSON |
| Giao diện | Script biểu đồ | Ghi vào workspace harness, in `MEDIA:` |
| Harness | OpenClaw agent | Kênh chat; model nhỏ nhanh; cron đêm + cron sáng; transcript SQLite; `memory index` |
| Harness | Claude Code skill | Cùng brief; dùng để hỏi trực tiếp và làm phiên bảo trì |
| Chỉ dẫn | `AGENTS.md` (workspace OpenClaw, repo riêng) | Đường dẫn tuyệt đối, cách gọi tool, "đọc brief trước", rule an toàn kênh |

## Hợp đồng `sync --json` (hình dạng)

```text
latest_date, data_age_hours, last_ingest_at, days_in_archive,
status ∈ { ok, cookie_expired, no_cookie },
recovery { calibrating, hrv_nights, hrv_nights_required, score, reason },
athlete_events[] { id, kind, state, date_start, date_end, summary }
```

`ok: true` với `status: cookie_expired` là trạng thái bình thường vài ngày mỗi
tháng; coach vẫn trả lời từ kho và nói rõ as-of.

## Một lượt cron sáng (rút gọn từ transcript)

1. Phiên cách ly mở; agent đọc `AGENTS.md` → đọc brief.
2. Gọi `sync --json`; nhận trạng thái, as-of, chỉ số phục hồi, sự kiện mở.
3. Chạy "truy vấn sẵn sàng hằng ngày" copy từ brief.
4. Soạn brief sáng: kết luận ngắn, dẫn con số, ghi as-of, nhắc sự kiện đang mở
   nếu ảnh hưởng cách đọc số; có biểu đồ thì in `MEDIA:`.
5. Harness gửi về kênh, ghi transcript.

## Con số về hệ thống

| Hạng mục | Số lượng |
|---|---|
| Lớp dữ liệu | 4 |
| Endpoint nguồn được lưu nguyên bản | hơn 10 |
| Cron job | 2 |
| Mặt tiền (harness) | 2 |
| Nguồn sự thật cho chỉ dẫn | 1 file |
| Tool ghi cho agent | 2 script (self-report; mở/đóng sự kiện), mỗi script 1 tham số |
| Nhãn nguồn gốc | 3 |
| Sự cố kỹ thuật đáng ghi trong khoảng 1 tháng vận hành | 7 (xem [06](06-operations-and-improvement-loop.md)) |
| Sự cố cần đổi model để sửa | 0 |

Người xây: một người, với Claude Code làm phiên bảo trì.

## Ánh xạ sang dự án offshore

| Trong ví dụ | Trong dự án |
|---|---|
| Thiết bị đeo + API riêng | Jira/Confluence/Slack và DB hệ thống khách |
| Cookie hết hạn | Browser token Slack, tài khoản kỹ thuật hết hạn |
| Giấy tờ y tế PDF | Spec, biên bản, tài liệu quét của khách |
| `self_reports` | Ghi chú của PM/BrSE về ngày/tuần |
| `athlete_events` (mở/đóng) | Sự kiện dự án: scope review, thiếu người, release freeze, nghỉ lễ JP |
| Điểm phục hồi, tải luyện tập | Velocity thật, carry-over, tuổi blocker, tỷ lệ bug/story |
| `calibrating` | "Chưa đủ dữ liệu để kết luận" — sprint đầu của dự án mới |
| `coach-brief.md` | Brief nghiệp vụ của PMO; `00_context/` của từng dự án |
| MEASURED / LITERATURE / CONVENTION | Đo từ dữ liệu dự án / chuẩn công ty / quy ước nội bộ |
| Coach trên kênh chat cá nhân | Trợ lý bộ phận trên Slack |
| Cron sáng | Daily report cho PM và khách |
| Phiên bảo trì Claude Code | Chính bộ MK đang dùng hằng ngày |
| "Dữ liệu không rời máy" | "Dữ liệu khách không rời VPC dự án" |
| Media guard | DLP cho đính kèm gửi khách |

## Điều sẽ làm khác nếu bắt đầu lại

- Viết bảng ngữ cảnh từ ngày đầu thay vì sau vài tuần; nó đổi cách đọc mọi con
  số.
- Đặt quy tắc "tool ghi một tham số" trước khi viết script đầu tiên.
- Ghi đường dẫn tuyệt đối vào file chỉ dẫn harness ngay từ đầu.
- Lên lịch rà soát transcript cùng lúc bật cron, không đợi thấy sai.
