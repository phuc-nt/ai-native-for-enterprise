# Source: Source Code and `00_context/`

*Khung tám mục theo [09](../09-data-source-playbook.md). Đây là nguồn đã
"AI-ready" hằng ngày bằng bộ MK; ghi lại để thấy cùng một khung áp cho
codebase. Chi tiết cách tổ chức ở
[bộ công cụ, mục 3](../../../02-ai-toolkit/01-ai-toolkit-offshore-team.md#3-tổ-chức-project-folder--00_context--chuẩn-mk).*

## 1. Khó ở đâu

- Tài liệu trôi khỏi code; agent tin tài liệu hơn tin code hoặc ngược lại.
- Repo lớn: agent đọc nhầm module, đoán convention, lặp lại abstraction đã có.
- "Tri thức" nằm ở người review: vì sao module này tách, vì sao không dùng
  thư viện kia.
- Bí mật và dữ liệu khách lẫn trong repo (fixture, `.env`).

## 2. Lớp 1 — nguyên bản

Chính git repo: verbatim, versioned, dựng lại được. Không cần kho riêng.
Việc duy nhất: `.mkignore`/`.gitignore` chặn bí mật và dữ liệu khách khỏi cả
git lẫn tầm nhìn của agent.

## 3. Lớp 2 — codebase AI-friendly

Checklist (tương đương "bảng có kiểu"):

- [ ] Cấu trúc thư mục nói lên ranh giới; file quá 200 dòng được tách theo
      mối quan tâm; tên file kebab-case dài, tự mô tả để grep/glob ra.
- [ ] Interface có kiểu (TypeScript, schema zod/JSON schema ở biên); hợp đồng
      public nằm một chỗ.
- [ ] Test là spec chạy được; test đặt cạnh hành vi, đặt tên theo hành vi.
- [ ] Một lệnh build, một lệnh test, một lệnh lint; chạy được từ cwd gốc.
- [ ] `README.md` nói cách chạy; `docs/code-standards.md`,
      `docs/system-architecture.md` nói vì sao.
- [ ] Không định danh nội bộ bị "dịch": tên miền nghiệp vụ trong code khớp
      thuật ngữ gốc (JA/EN) trong spec, ánh xạ ghi ở `00_context/reference.md`.

## 4. Lớp 3 — bản đồ sinh tự động

| Sản phẩm | Cách sinh | Nhãn |
|---|---|---|
| Đồ thị phụ thuộc module | Tool phân tích import, chạy trong CI | `MEASURED` tại commit sha |
| Inventory API / tool (ví dụ 47/11/13 tool của 3 MCP server) | Sinh từ schema, không viết tay | `MEASURED` |
| Coverage, kích thước file, số file > 200 dòng | CI | `MEASURED`; ngưỡng 200 là `CONVENTION` |
| `docs/codebase-summary.md` | Sinh/ cập nhật bằng skill `docs`, ghi commit sha | Dẫn xuất; **không** viết tay lâu dài |

Mọi bản đồ mang `as_of = commit sha`; cũ hơn HEAD nhiều commit thì agent nói.

## 5. Lớp 4 — `00_context/` + rules

| Thành phần | Trả lời câu gì | Tương đương brief |
|---|---|---|
| `00_context/requirements.md` | Xây gì, cho ai, không xây gì | Profile + guardrail |
| `00_context/implementation-guide.md` | Làm thế nào ở repo này: stack, pattern, quy ước, cách test | Playbook |
| `00_context/reference.md` | Định danh cố định: project key Jira, space Confluence, kênh Slack, thuật ngữ, ngưỡng | Data map; skill đọc mặc định từ đây |
| `CLAUDE.md` + `.claude/rules/` | Startup workflow, task lifecycle, quality gates, documentation rules | Rules |
| `docs/code-standards.md`, `system-architecture.md`, `project-roadmap.md` | Chuẩn, kiến trúc, hướng đi | Depth files |

Guardrail: code là sự thật khi tài liệu và code khác nhau; agent nêu khác biệt
thay vì chọn im lặng. Không ghi bí mật vào `reference.md`. `CLAUDE.md` mỏng,
trỏ đi; không chép nội dung skill vào.

Playbook: vòng `/mk:brainstorm → /mk:plan → /mk:cook → /mk:review-pr`; plan và
report trong `plans/`; docs cập nhật khi hành vi công khai đổi.

## 6. Lệnh và tool

Bộ MK là tool. Hook (`session-init`, `dev-rules-reminder`, gates) là "lệnh
đọc brief trước" được ép bằng harness thay vì nhắc bằng lời.

## 7. Nghiệm thu

- AI-friendly: người mới clone, chạy build/test bằng README trong 30 phút;
  `grep` theo tên nghiệp vụ ra đúng module.
- AI-ready: giao `/mk:plan` một task cỡ trung; plan gọi đúng module, đúng
  convention, không hỏi lại điều đã có trong `00_context/`; `/mk:review-pr`
  bắt được vi phạm `code-standards.md` mà không cần nhắc.

## 8. Bẫy

- `codebase-summary.md` viết tay rồi trôi.
- `CLAUDE.md` dài hàng trăm dòng; agent bỏ qua.
- Fixture chứa dữ liệu khách thật.
- Tài liệu kiến trúc mô tả điều đã định làm, không phải điều đã làm.
