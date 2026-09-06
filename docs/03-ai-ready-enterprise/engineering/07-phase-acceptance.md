# 07 — Phase-by-Phase Acceptance

*Lộ trình, thời lượng, vai trò và rủi ro ở
[leadership/02](../leadership/02-roadmap-resources-risks.md). Tài liệu này chỉ
nói **làm gì** và **nghiệm thu bằng gì** ở mỗi giai đoạn.*

## GĐ 0 — Chọn miền pilot

Chọn theo ba tiêu chí: câu hỏi lặp lại hằng ngày; dữ liệu có nhưng khó với
tới; có một người sẵn sàng làm chủ nghiệp vụ.

Đầu ra: một trang ghi 10 câu hỏi thường gặp nhất, ai hỏi, hiện trả lời bằng
cách nào, mất bao lâu.

**Nghiệm thu:** chủ nghiệp vụ được nêu tên; 10 câu hỏi có ưu tiên.

## GĐ 1 — Kiểm kê nguồn

Với mỗi nguồn: cách truy cập (API, export, DB, file), tần suất đổi, giới hạn
(rate limit, token hết hạn), **khó lấy lại đến đâu**, phân loại nhạy cảm.

Đừng quên nguồn "con người": ngữ cảnh mà PM/BrSE biết nhưng không hệ thống nào
lưu — sẽ thành bảng ngữ cảnh ở GĐ 2.

**Nghiệm thu:** bảng kiểm kê theo mẫu ở
[09](09-data-source-playbook.md#kiểm-kê-nguồn-gđ-1--mẫu-một-dòng-cho-mỗi-nguồn);
mỗi nguồn có một cách lấy đã thử bằng tay ít nhất một lần; thứ tự đưa nguồn
vào pilot đã chốt.

## GĐ 2 — Kho nguyên bản và bảng có kiểu

- Connector idempotent, raw-first, ledger sau thành công (P1, P2).
- Bảng có kiểu, định danh gốc, schema doc có truy vấn mẫu (P7).
- Bảng ngữ cảnh append-only (P5, P6).
- Lệnh `reparse` offline.

**Nghiệm thu:** xóa toàn bộ bảng có kiểu, chạy `reparse` không mạng, ra cùng
kết quả. Chủ nghiệp vụ đọc schema doc và trả lời được 10 câu hỏi bằng truy vấn
mẫu.

## GĐ 3 — Lớp dẫn xuất, bộ tri thức, lệnh cho agent

- Công thức dẫn xuất tiến về trước, mỗi công thức có nhãn nguồn gốc (P3, P4).
- Brief: voice, data map, ngữ cảnh, guardrail, playbook (lớp 4 ở
  [01](01-ai-ready-data.md)).
- `sync --json` kèm ngữ cảnh; `--status`; tool ghi một tham số (P8–P11).

**Nghiệm thu:** một người *chưa từng thấy hệ thống* đọc brief, chạy
`sync --json`, trả lời đúng 8/10 câu hỏi trong 15 phút. Không đạt thì lỗi ở
brief hoặc lệnh, sửa rồi thử lại. Đây là bài kiểm tra "AI-ready" bằng người,
làm **trước khi** bật agent.

## GĐ 4 — Harness pilot

- Chọn harness theo checklist ở [02](02-harness-and-frontends.md); cấu hình kênh,
  pairing/allowlist, tool allowlist.
- File chỉ dẫn harness mỏng trỏ tới brief (P13).
- Hai cron: đồng bộ đêm, brief sáng (P15).
- 3–5 người dùng thật, 2 tuần.
- Phiên bảo trì bằng Claude Code trên cùng bộ tri thức để rà soát transcript.

**Nghiệm thu:** 2 tuần chạy; rà soát transcript hằng tuần; mọi sai lệch đã
phân loại; ít nhất một vòng sửa-reindex-xác minh đã đóng.

## GĐ 5 — Siết và quản trị

- Checklist bảo mật ở [05](05-technical-security.md) đạt hết.
- Bảng "ai sở hữu gì" được ký.
- Vòng cải tiến có nhịp và có chủ ([06](06-operations-and-improvement-loop.md)).
- Chỉ số vận hành có dashboard tối thiểu (có thể chỉ là một truy vấn SQL chạy
  tay).

**Nghiệm thu:** một cuộc thử prompt injection qua kênh (yêu cầu đổi cấu hình,
xin token) bị từ chối; rotate bí mật không gián đoạn; rollback brief bằng git
revert + reindex trong dưới 10 phút.

## GĐ 6 — Nhân rộng

- Miền thứ hai đi lại GĐ 1–4, tái dùng connector framework, khung tool, quy
  trình.
- Khi có harness/client thứ hai: bọc CLI thành MCP; khi tách máy: API
  ([03](03-agent-interfaces.md)).
- Nhiều agent hẹp thay vì một agent toàn quyền; mỗi agent một allowlist và một
  view dữ liệu.

**Nghiệm thu:** miền thứ hai đạt GĐ 3 nhanh hơn miền đầu; phần dùng lại được
liệt kê rõ.
