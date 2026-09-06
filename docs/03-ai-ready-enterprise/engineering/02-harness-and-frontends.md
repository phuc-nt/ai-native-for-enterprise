# 02 — Harness and Frontends

*Trụ cột 1. Harness là hạ tầng mua sẵn, không viết. Lý do ở
[leadership/01](../leadership/01-three-pillars-proposal.md).*

## Harness là gì

Phần bao quanh model để nó thành agent chạy được: vòng lặp gọi tool, quản lý
phiên và ngữ cảnh, gateway tới kênh chat, lịch chạy, bộ nhớ dài hạn, ghi
transcript, quản lý quyền tool. Phần này **giống nhau ở mọi doanh nghiệp** và
đã có nhiều bản mã nguồn mở tốt. Coi nó như web server hay message queue:
chọn, cấu hình, nâng cấp.

## Harness cho gì miễn phí

| Năng lực | Nếu tự viết | Harness đã có |
|---|---|---|
| Vòng lặp agent (model ↔ tool) | Vài tuần, sai ở edge case | Có, kèm retry, giới hạn, streaming |
| Phiên và ngữ cảnh | Tóm tắt, cắt, `/new`… | Có; kèm nạp lại chỉ dẫn mỗi phiên |
| Kênh chat (Slack, Teams, Telegram, web) | Mỗi kênh một tháng | Có sẵn nhiều kênh, kèm pairing / allowlist |
| Lịch chạy (cron) | Cron + gửi kết quả về kênh | Có; mỗi job một phiên cách ly |
| Bộ nhớ dài hạn | Vector store, index | Có; lệnh `memory index` |
| Transcript / audit | Log riêng | Có; SQLite với mọi tool call và kết quả |
| Quyền tool, sandbox | Rất khó làm đúng | Có: allowlist, exec policy, media guard |
| Skill / tool packaging | Convention riêng | Có: thư mục skill + `SKILL.md`; MCP client |

## Ba harness, ba vai

| Harness | Mạnh ở | Dùng cho | Đã dùng ở đâu |
|---|---|---|---|
| **Claude Code** | Làm việc trong repo, skill, subagent, plan/review, MCP client | Phiên **tương tác của kỹ sư và PM** (bộ MK, 10 workflow skill); phiên **bảo trì** agent: sửa dữ liệu, tool, brief; rà soát transcript | Hằng ngày với MK; trong ví dụ coach là skill đọc cùng brief |
| **OpenClaw** | Gateway đa kênh, cron, agent chạy nền 24/7, bộ nhớ, transcript SQLite | Agent **đối diện người dùng** qua chat, không người trông | Coach trên Telegram: chat + cron sáng + cron đêm; dự án: trợ lý PM trên Slack |
| **OpenCode** | Mã nguồn mở, nhiều model, terminal-first, tự host | Thay thế/đối chiếu Claude Code khi dự án không dùng Anthropic hoặc cần tự host | Chưa dùng trong ví dụ; đã kiểm chứng nạp nguyên bộ skill MK từ `.claude/skills` — xem [Agent Kit Portability](../../02-ai-toolkit/03-agent-kit-multi-harness-kiro-opencode.md) |
| **Kiro** | IDE + CLI của AWS, spec-driven, Powers, xác thực IAM Identity Center | Khi khách hàng chuẩn hoá trên AWS và yêu cầu Kiro | Dự án sắp tới; bộ MK đã có bản Kiro chạy được trên CLI 2.21 (engine v2), xem [Kiro + MK Kit](../../02-ai-toolkit/04-kiro-mk-kit-guide.md) |

Điểm quan trọng: **hai mặt tiền, một bộ não**. Trong ví dụ, OpenClaw agent và
Claude Code skill đều đọc cùng `coach-brief.md`, gọi cùng `sync --json`, ghi
cùng bảng. Đổi harness không đổi tri thức.

## Hai chế độ dùng tool, hai mức tin cậy

Cần nói rõ vì bộ MCP hiện có (Jira/Confluence/Slack) nối *thẳng* vào hệ thống
nguồn:

| Chế độ | Ai chạy | Agent chạm gì | Quyền |
|---|---|---|---|
| **Tương tác** | Kỹ sư/PM mở Claude Code, gọi MCP | Hệ thống nguồn trực tiếp | Thừa hưởng đúng quyền người đó (browser token Slack là ví dụ rõ nhất); người xem kết quả trước khi gửi đi |
| **Nền, 24/7** | OpenClaw cron / chat không người trông | Kho đã chuẩn hóa qua CLI hẹp | Chỉ đọc kho + ghi bảng ngữ cảnh; connector dùng tài khoản kỹ thuật, chạy tách phiên |

Cùng một MCP server phục vụ cả hai: ở chế độ tương tác nó là tool của agent; ở
chế độ nền nó là *connector* đổ dữ liệu vào lớp 1 theo lịch. Không cho agent
nền gọi thẳng MCP nguồn với quyền rộng.

## Phần nào là của mình

Harness không biết gì về nghiệp vụ. Phần của mình gồm đúng ba thứ:

1. **Bộ tri thức** (lớp 4 ở [01](01-ai-ready-data.md)) — trong git.
2. **Tool / giao diện** (CLI, MCP, API — [03](03-agent-interfaces.md)) —
   trong git.
3. **File chỉ dẫn cho từng harness** — mỏng, chỉ trỏ tới (1) và mô tả cách gọi
   (2) trên máy đó.

Tách (3) khỏi (1) là quyết định đáng nhấn mạnh:

- Brief là **nguồn sự thật duy nhất**, nằm trong repo dự án, có review.
- `AGENTS.md` của OpenClaw là **file cục bộ máy** (đường dẫn tuyệt đối, tên
  lệnh, lưu ý vận hành của chính harness đó), nằm trong workspace của harness
  — một git repo riêng. Nó bắt đầu bằng "đọc brief trước tiên".
- Skill của Claude Code cũng chỉ là một `SKILL.md` mỏng trỏ tới brief. Với dự
  án phần mềm, `CLAUDE.md` + `00_context/` đóng đúng vai này.

Khi brief đổi, cả hai mặt tiền đổi theo. Khi harness nâng cấp, chỉ (3) cần xem
lại.

## Cấu hình harness: những gì đã học

| Chủ đề | Bài học | Chi tiết |
|---|---|---|
| Phiên cách ly cho cron | Mỗi cron job chạy trong phiên riêng, không dùng chung ngữ cảnh chat | Tránh cron "nhớ" câu chuyện dở dang; kết quả deterministic hơn |
| Nạp chỉ dẫn mỗi phiên | Agent đọc brief ở đầu phiên, không dựa vào bộ nhớ đã tóm tắt | Sửa brief là có hiệu lực ngay; không có "nhớ tạm" để bị nhồi |
| Nạp lại chỉ mục sau khi sửa | Sau khi sửa file trong workspace: `openclaw memory index --agent <tên> --force` | Quên bước này = agent vẫn thấy bản cũ |
| Nâng cấp harness có thể siết quyền | Bản mới thêm media guard: đính kèm phải nằm trong workspace | Sửa bằng symlink có kiểm soát, không tắt guard |
| Model rẻ đủ dùng khi tri thức tốt | Coach chạy trên một model nhỏ, nhanh | Brief + truy vấn mẫu gánh phần "thông minh"; model chỉ đọc và diễn đạt |
| Đường dẫn tương đối là bẫy | Agent hình thành thói quen `cd … && …` với đường dẫn tương đối, kéo dài đến khi `/new` | Tool chạy được bằng đường dẫn tuyệt đối từ mọi cwd; ghi rõ trong file chỉ dẫn |

## Tiêu chí chọn harness

- [ ] Có kênh nhân viên đang dùng (Slack/Teams), pairing hoặc allowlist.
- [ ] Cron với phiên cách ly; gửi kết quả về kênh.
- [ ] Transcript truy vấn được (SQLite/DB), có tool call và kết quả.
- [ ] Quyền tool: allowlist, exec policy, giới hạn đường dẫn.
- [ ] Chỉ dẫn dạng file trong workspace, nạp lại mỗi phiên.
- [ ] Tự host được, dữ liệu không rời hạ tầng của mình.
- [ ] Đổi model được (rẻ cho chat, mạnh cho bảo trì).
- [ ] Có MCP client để nối tool chuẩn.

Thiếu điều nào thì vá bằng cấu hình hoặc chọn harness khác — không viết harness
mới.
