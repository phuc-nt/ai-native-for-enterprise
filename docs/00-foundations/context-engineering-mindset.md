# Context Engineering Mindset

Nền tư duy chung cho cả hai mục tiêu: team dev dùng AI trong SDLC và tính năng AI cho sản phẩm của khách. Viết lại từ bài đã đăng công khai [Context Engineering: từ Vibe Coder đến AI Orchestrator](https://phucnt.substack.com/p/context-engineering-tu-vibe-coder), giữ câu chuyện và khung ba bước, mở rộng sang agent chạy trong sản phẩm. Cập nhật 2026-09-07.

Đọc trước tiên trong bộ `docs/`; không cần biết bộ kit hay ba trụ cột.

---

## 1. Kết luận 30 giây

Chất lượng đầu ra của một agent phụ thuộc vào **ngữ cảnh nó nhận được** nhiều hơn vào câu prompt. Context engineering là cách xây một môi trường để agent luôn nhận **đúng thông tin, vào đúng lúc, với đúng luật hành xử**, thay vì mỗi lần phải nhắc bài từ đầu.

Khác biệt giữa hai cách làm:

| | Vibe coder | AI orchestrator |
|---|---|---|
| Bắt đầu | Mở agent, gõ yêu cầu, hy vọng | Dành thời gian đầu xây ngữ cảnh, rồi mới giao việc |
| Mỗi phiên | Nhắc lại bối cảnh, sửa lại hướng | Agent tự đọc trạng thái, tự biết việc tiếp theo |
| Chất lượng | Dao động theo phiên và theo người | Ổn định, lặp lại được, người mới dùng được ngay |
| Người làm gì | Sửa từng đoạn code AI viết | Thiết kế ngữ cảnh, đặt luật, nghiệm thu |

Mọi thứ trong bộ tài liệu này là **phiên bản mở rộng của cùng một ý**: bộ kit ở nhóm 02 là context engineering cho cả team thay vì một người; ba trụ cột ở nhóm 01 là context engineering cho agent chạy trên dữ liệu doanh nghiệp thay vì trên một repo.

## 2. Câu chuyện gốc

Một dự án cuối tuần: MCP server cho Confluence Data Center với 11 tool.

**Lần một, vibe coding.** Mở agent lên và bắt đầu: "Tôi cần một MCP server cho Confluence, có 11 tool." Agent hỏi 11 tool là gì, tôi lục trí nhớ trả lời dần. Sau 5 ngày: 4 trên 11 tool, codebase đầy nợ kỹ thuật, mỗi ngày mất vài giờ chỉ để nhắc lại bối cảnh cho phiên mới.

**Lần hai, context engineering.** Dành 2 giờ đầu xây "bộ não" cho agent bằng một hệ tài liệu và một file luật, trước khi viết dòng code nào:

```
docs/
├── 00_context/                  # trí nhớ dài hạn của agent
│   ├── requirements.md          # mục tiêu, phạm vi, tiêu chí thành công
│   ├── implementation-guide.md  # kiến trúc, pattern, cấu trúc API client
│   └── reference.md             # tham chiếu: tool ↔ endpoint, định danh dự án
├── 01_plan/
│   └── project-roadmap.md       # trạng thái hiện tại, việc tiếp theo
└── 02_implement/
    └── sprint-*.md              # task, tiêu chí nghiệm thu, tiến độ
```

Phiên mới bắt đầu bằng một câu: "Đọc toàn bộ `docs/` để nắm bối cảnh." Agent trả lời đúng roadmap, đúng kiến trúc trong implementation guide, và hỏi có bắt đầu sprint 1 chưa. Sau 3 ngày: 11 trên 11 tool, chất lượng đủ để xuất bản thành gói npm.

Cái làm nên khác biệt không phải model tốt hơn hay prompt hay hơn. Nó là **quy trình được viết ra thành thứ agent đọc được**, thứ vibe coder thường bỏ qua.

## 3. Ngữ cảnh gồm gì

Ngữ cảnh không phải một khối văn bản dán vào đầu prompt. Nó có bốn thành phần, mỗi thành phần có nơi sống và nhịp thay đổi riêng. Cột phải cho thấy cùng thành phần đó là gì khi agent không viết code mà chạy trong sản phẩm của khách.

| Thành phần | Trả lời câu hỏi | Agent viết code (mục tiêu 1) | Agent trong sản phẩm (mục tiêu 2) |
|---|---|---|---|
| **Tri thức dài hạn** | Dự án hoặc nghiệp vụ này là gì, quy ước ra sao | `docs/00_context/`, code standards, kiến trúc | Bộ tri thức đã chưng cất từ dữ liệu thật, lớp 4 của [bậc thang tri thức](../01-ai-ready-enterprise/engineering/01-ai-ready-data.md#bậc-thang-bốn-lớp) |
| **Luật hành xử** | Được làm gì, không được làm gì, thế nào là xong | `CLAUDE.md`, rules, hook chặn | System prompt, guardrail, lõi deterministic quyết định thay LLM ở chỗ cần chắc |
| **Trạng thái hiện tại** | Đang ở đâu, vừa làm gì, tiếp theo là gì | roadmap, `plans/`, report phiên trước | Memory của agent, trạng thái người dùng, lượt hội thoại trước |
| **Công cụ và giao diện** | Với tay tới đâu, qua đường nào | MCP server, lệnh dòng lệnh, test suite | [Giao diện hẹp cho agent](../01-ai-ready-enterprise/engineering/03-agent-interfaces.md): lệnh đọc, tool ghi có hợp đồng |

Hai quy tắc đi kèm bảng này:

- **Agent đọc ngữ cảnh trước khi đọc prompt.** Ở repo, đó là startup workflow: vào phiên đọc roadmap và context trước. Ở sản phẩm, đó là một lượt agent nạp tri thức và trạng thái người dùng trước khi nhìn vào câu hỏi.
- **Mỗi thành phần sống ở một chỗ.** Tri thức dài hạn không sửa tuỳ tiện; trạng thái cập nhật mỗi ngày; luật thay đổi hiếm và có duyệt. Trộn ba thứ vào một file là cách nhanh nhất để ngữ cảnh thối rữa.

## 4. Ba bước (thực ra là hai)

### Bước 1. Xây trí nhớ dài hạn cho agent

Đừng tự viết hết. Dùng chính AI để xây ngữ cảnh cho AI:

1. **Requirements.** Cho một model suy luận đóng vai product manager, brainstorm với nó tới khi có bản yêu cầu đủ rõ về mục tiêu, phạm vi, tiêu chí thành công.
2. **Tài liệu kỹ thuật.** Giao requirements cho một agent có tìm kiếm web; nó đề xuất kiến trúc, pattern, và sinh phần còn lại của `00_context/`.
3. **Tham chiếu.** Những thứ chỉ dự án này có: định danh, endpoint, quy ước đặt tên, ai duyệt cái gì. Đây là phần AI không tự biết và cũng là phần hay bị bỏ quên nhất.

Với sản phẩm của khách, bước này là toàn bộ trụ cột dữ liệu: kiểm kê nguồn, lưu nguyên bản, dẫn xuất có nguồn gốc, chưng cất thành bộ tri thức. Nó tốn nhiều hơn 2 giờ, nhưng cùng bản chất: **trước khi hỏi agent, hãy chắc là có thứ đúng để nó đọc.**

### Bước 2. Đặt luật hành xử

Một file luật gốc mà harness luôn nạp (`CLAUDE.md` với Claude Code, file tương đương với harness khác). Bốn khối tối thiểu, đủ để agent hành xử như kỹ sư có kỷ luật thay vì thực tập sinh:

```markdown
## Startup workflow (mỗi phiên)
1. Kiểm tra môi trường dự án.
2. Đọc docs/01_plan/project-roadmap.md để biết trạng thái và việc đang tập trung.
3. Tham chiếu requirements.md và implementation-guide.md khi cần.

## Task lifecycle
1. Nhận task từ sprint hiện tại hoặc yêu cầu của người dùng.
2. Một task một lúc, không nhảy việc.
3. Hiện thực có xử lý lỗi.
4. Cập nhật test suite cho mọi tính năng mới. Bắt buộc.
5. Mọi test phải pass trước khi đánh dấu xong.
6. Commit sạch theo quy ước; cập nhật sprint và roadmap.

## Quality gates
- Build thành công. Toàn bộ test pass. Không hỏng tính năng cũ.
- Không commit dữ liệu nhạy cảm.
- Tài liệu cập nhật kèm kết quả test.

## Luật tài liệu
- 00_context/: không sửa khi chưa được duyệt.
- roadmap: cập nhật khi đổi trạng thái lớn. sprint: cập nhật hằng ngày.
- Mỗi thông tin sống ở một chỗ; link thay vì lặp; trạng thái hiện lên đầu.
```

Với sản phẩm, "luật" là thứ không nên giao cho prompt nếu có thể giao cho kiến trúc: gateway kiểm quyền trước khi tool ghi chạy, ngân sách token chặn từ ngoài, lõi deterministic quyết định và LLM chỉ diễn đạt. Xem bốn nguyên tắc ở [Engineering Principles for AI Systems](engineering-principles-for-ai-systems.md) và [Portfolio, mục 9](ai-experience-portfolio.md#9-chủ-đề-xuyên-suốt--triết-lý-kỹ-thuật).

### Bước 3. Không có bước 3

Nói với agent: "Bạn biết phải làm gì rồi đấy." Nó đọc roadmap, chọn việc tiếp theo, làm theo lifecycle, dừng ở quality gate. Việc của người lúc này là **nghiệm thu**, không phải nhắc bài.

## 5. Cùng mindset, hai mục tiêu

Đặt cạnh nhau để thấy cùng một khung:

| Khái niệm | Team dev dùng AI trong SDLC | Tính năng AI cho khách |
|---|---|---|
| Xây trí nhớ dài hạn | `00_context/` + docs chuẩn, [AI Toolkit mục 3](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md#3-tổ-chức-project-folder--00_context--chuẩn-mk) | Trụ cột dữ liệu, [bậc thang bốn lớp](../01-ai-ready-enterprise/engineering/01-ai-ready-data.md) |
| Đặt luật | `CLAUDE.md`, rules, hook của [bộ MK](../02-ai-in-sdlc/02-mk-kit-introduction.md) | Guardrail, gateway, [bảo mật kỹ thuật](../01-ai-ready-enterprise/engineering/05-technical-security.md) |
| Startup workflow | Phiên mới đọc roadmap và context | [Một lượt hỏi đáp](../01-ai-ready-enterprise/engineering/03-agent-interfaces.md#một-lượt-hỏi-đáp): nạp tri thức và trạng thái trước câu hỏi |
| Quality gate | Test pass, review pass, không lộ secret | Bộ eval, [nghiệm thu theo giai đoạn](../01-ai-ready-enterprise/engineering/07-phase-acceptance.md) |
| Vòng cải tiến | Đọc số liệu phiên bằng [MK Observe](../02-ai-in-sdlc/05-mk-observe-agent-metrics.md) | [Rà soát transcript và phân loại sai lệch](../01-ai-ready-enterprise/engineering/06-operations-and-improvement-loop.md) |
| Nhân bản | Kit cài vào repo mới bằng một lệnh | Cùng bộ tri thức và giao diện phục vụ nhiều harness và nhiều mặt tiền |

Điểm khác đáng chú ý: với team dev, ngữ cảnh chủ yếu là **văn bản do người viết** và agent chỉ đọc. Với sản phẩm, ngữ cảnh chủ yếu là **dữ liệu sinh ra từ vận hành**, phải có đường ống để nó luôn mới, có nguồn gốc, và có người chịu trách nhiệm. Đó là lý do nhóm 01 dành phần lớn cho dữ liệu trước khi nói tới agent.

## 6. Dấu hiệu thiếu ngữ cảnh

Gặp một trong các dấu hiệu dưới đây thì sửa ngữ cảnh trước, đừng sửa prompt hay đổi model:

| Dấu hiệu | Thiếu gì | Sửa ở đâu |
|---|---|---|
| Mỗi phiên phải giải thích lại dự án | Tri thức dài hạn | Viết `00_context/` hoặc bộ tri thức; agent tự đọc |
| Agent làm đúng nhưng không đúng cách của dự án | Luật hành xử | Rules, code standards, hook; với sản phẩm là guardrail |
| Agent bịa số liệu, bịa tên, bịa endpoint | Tham chiếu và giao diện | Cho nó lệnh đọc có hợp đồng thay vì để nó đoán |
| Hai người dùng cùng kit ra hai chất lượng | Startup workflow không được ép | Đưa bước đọc ngữ cảnh vào luật, không dựa vào thói quen |
| Token và chi phí tăng mà kết quả không tốt hơn | Ngữ cảnh thừa, không phân lớp | Tách dài hạn, trạng thái, luật; nạp theo nhu cầu thay vì nạp hết |
| Không biết agent tốt lên hay xấu đi | Không có vòng đo | Log phiên, chỉ số, rà transcript định kỳ |

## 7. Giới hạn

- Khung gốc kiểm chứng trên dự án nhỏ, có test suite rõ, một người vận hành. Cỡ team và nhiều dự án cần chuẩn hoá và công cụ: đó là bộ kit ở nhóm 02.
- Ở sản phẩm của khách, hai giờ đầu thành vài tuần đầu, và phần khó nhất chuyển từ "viết tài liệu" sang "tổ chức dữ liệu và quyền truy cập". Đường đi và nghiệm thu ở nhóm 01.
- Ngữ cảnh tốt không thay được model đủ mạnh cho việc cần suy luận, nhưng model mạnh không bù được ngữ cảnh sai. Đầu tư vào ngữ cảnh trước, chọn model sau.

## 8. Đi tiếp

- Mục tiêu 1: [AI Toolkit for Offshore Teams](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md) từ mục 3, rồi [MK Kit Introduction](../02-ai-in-sdlc/02-mk-kit-introduction.md).
- Mục tiêu 2: [Proposal ba trụ cột](../01-ai-ready-enterprise/leadership/01-three-pillars-proposal.md), rồi `engineering/` của nhóm 01 theo số thứ tự.
- Cả hai: [Engineering Principles for AI Systems](engineering-principles-for-ai-systems.md) khi đã viết.

---

**Câu hỏi mở**

- Khối luật mẫu ở mục 4 là bản rút gọn từ bài gốc; bộ MK đã thay nó bằng rules module hoá. Có nên giữ khối này làm "khung tối thiểu khi dự án không cài kit", hay bỏ để tránh hai chuẩn?
- Cột "agent trong sản phẩm" ở mục 3 chưa có ví dụ chạy thật ngoài case study coach; khi có tính năng đầu tiên cho khách, bổ sung ví dụ ẩn danh.
