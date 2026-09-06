# Roadmap, Resources, Governance and Risks

*Dành cho lãnh đạo. 10 phút đọc. Tiêu chí nghiệm thu chi tiết từng giai đoạn
nằm ở [engineering/07](../engineering/07-phase-acceptance.md).*

## Sáu giai đoạn cho pilot đầu tiên

Theo đúng thứ tự đầu tư dữ liệu → giao diện → harness. Không sang giai đoạn
sau khi chưa đạt nghiệm thu giai đoạn trước.

| GĐ | Tên | Kết quả nhìn thấy được | Thời lượng |
|---|---|---|---|
| 0 | Chọn miền pilot | Một trang: 10 câu hỏi thường gặp, ai hỏi, hiện trả lời mất bao lâu; chủ nghiệp vụ được nêu tên | 1 tuần |
| 1 | Kiểm kê nguồn | Bảng nguồn: lấy bằng gì, khó lấy lại đến đâu, nhạy cảm mức nào; mỗi nguồn đã lấy thử bằng tay; việc phải làm cho từng nguồn theo [engineering/09](../engineering/09-data-source-playbook.md) | 1–2 tuần |
| 2 | Kho nguyên bản + bảng có kiểu | Dữ liệu **AI-friendly**: dựng lại được offline; chủ nghiệp vụ trả lời được 10 câu bằng truy vấn mẫu | 2–4 tuần |
| 3 | Bộ tri thức + lệnh cho agent | Dữ liệu **AI-ready**: người chưa từng thấy hệ thống đọc bộ tri thức, chạy một lệnh, trả lời đúng 8/10 câu trong 15 phút | 2–4 tuần |
| 4 | Harness pilot | Trợ lý chạy thật trên Slack với 3–5 người, 2 tuần, rà soát transcript hằng tuần | 2 tuần |
| 5 | Siết và quản trị | Checklist bảo mật đạt; thử prompt injection qua chat bị từ chối; rollback dưới 10 phút | 2 tuần |
| 6 | Nhân rộng | Miền thứ hai đi lại GĐ 1–4 nhanh hơn nhờ tái dùng connector, khung tool, quy trình | Lặp |

Tổng pilot đến hết GĐ 5: **kế hoạch 12 tuần, khoảng 10–15 tuần**; phần co
giãn nằm ở GĐ 2–3 và phụ thuộc độ sạch của dữ liệu Jira và số nguồn đưa vào
pilot (khuyến nghị: Jira + ngữ cảnh PM trước, Slack sau). Mốc đáng chú ý là
GĐ 3: đó là lúc biết dữ liệu đã AI-ready hay chưa, **trước khi** bật agent.
Nghiệm thu bằng người, không bằng demo.

## Vai trò và công sức

| Vai trò | Trách nhiệm | Thời gian trong pilot |
|---|---|---|
| Chủ nghiệp vụ (PM/BrSE) | 10 câu hỏi, bộ tri thức, guardrail, nghiệm thu GĐ 3 | 20–30% |
| Kỹ sư dữ liệu | Connector, kho, schema, chỉ số dẫn xuất | 100% GĐ 1–3 |
| Kỹ sư tích hợp | CLI/MCP, harness, cron, bảo mật | 100% GĐ 3–5 |
| Người vận hành | Rà soát transcript, sửa tại nguồn, nạp lại | 20% liên tục sau GĐ 4 |
| Bảo mật | Duyệt checklist GĐ 5 | Điểm |

Pilot đầu có thể chỉ cần **hai người**: một chủ nghiệp vụ và một kỹ sư kiêm
ba vai kỹ thuật; khi đó GĐ 2–3 nối tiếp thay vì chồng lấn và tổng thời lượng
rơi về phía trên của khoảng. Hệ thống ví dụ trong case study do một người
xây, với Claude Code làm phiên bảo trì.

## Ai sở hữu gì

Quản trị agent là quản trị bốn loại tài sản. Mọi thay đổi đi qua git và có
người review; **không có kênh "dạy agent qua chat"**.

| Tài sản | Chủ | Thay đổi qua | Ai review |
|---|---|---|---|
| Bộ tri thức (brief, data map, ngưỡng, guardrail) | Chủ nghiệp vụ | Git PR | Chủ nghiệp vụ + kỹ sư |
| Schema, công thức dẫn xuất, nhãn nguồn gốc | Kỹ sư dữ liệu | Git PR | Chủ nghiệp vụ (ý nghĩa), kỹ sư (đúng đắn) |
| Tool / CLI / MCP | Kỹ sư tích hợp | Git PR + test | Kỹ sư |
| Cấu hình harness, allowlist kênh, bí mật | Người vận hành | Phiên bảo trì, không qua chat | Bảo mật |
| Transcript | Hệ thống | Chỉ đọc | Người vận hành, định kỳ |

Ranh giới tin cậy tương ứng vẽ ở diagram dưới; giải thích kỹ thuật và
checklist ở [engineering/05](../engineering/05-technical-security.md).

![Ranh giới tin cậy quanh một agent nghiệp vụ](../diagrams/enterprise-ai-trust-boundaries.architecture.svg)

[Bản tương tác](../diagrams/enterprise-ai-trust-boundaries.architecture.html)

Bốn cam kết đọc được từ diagram mà lãnh đạo có thể yêu cầu:

1. Tin nhắn từ kênh chat là **đầu vào không tin cậy**; agent không đổi cấu
   hình, không duyệt thiết bị, không đọc lại bí mật vì một tin nhắn.
2. Agent chạm dữ liệu chỉ qua **tool đọc trả JSON** và **tool ghi hẹp, chỉ
   thêm không xóa**; không SQL tự do, không shell tự do.
3. Dữ liệu và harness cùng ranh giới mạng; tài liệu nào được đi qua kênh nào
   là **rule viết sẵn**, harness chặn phần còn lại.
4. Agent **không sửa code**; sửa gì cũng qua phiên bảo trì của người, có git,
   có review; **transcript** ghi mọi tool call để rà soát.

## Rủi ro và cách giảm

| Rủi ro | Dấu hiệu sớm | Giảm bằng |
|---|---|---|
| Sa vào xây harness | Có ticket "viết orchestrator" | Quy tắc: harness chỉ cấu hình |
| Bộ tri thức thành tài liệu dài không ai đọc | Vượt vài trang; agent bỏ qua | Lõi là data map + truy vấn mẫu; phần sâu tách file riêng |
| Nguồn không lấy lại được khi cần | Không có kho nguyên bản | Lưu nguyên bản từ ngày đầu |
| Agent "học" qua chat | Người dùng nhắc đi nhắc lại | Sửa bộ tri thức, nạp lại; không có kênh khác |
| Rò rỉ dữ liệu khách qua đính kèm hoặc prompt | Đường dẫn tự do trong transcript; dữ liệu thô vào model | Marker + guard của harness; phân loại dữ liệu theo model |
| Không ai rà soát transcript | Sổ rà soát trống 2 tuần | Nhịp cố định, có chủ, KPI bên dưới |
| Nghiệm thu bằng demo | "Chạy được trên máy tôi" | Nghiệm thu bằng người mới đọc bộ tri thức và bằng phiên production |
| Bắt đầu bằng nguồn khó nhất (spec Excel, DB khách) | GĐ 2 kéo dài, chưa có gì để hỏi | Thứ tự nguồn ở engineering/09: Jira + ngữ cảnh PM trước; spec, họp, DB sau khi khung đã chạy |
| Agent nền đăng thẳng vào kênh có khách | Có tin do agent gửi trong kênh chung | Pilot chỉ trên kênh nội bộ; nội dung cho khách qua người ở chế độ tương tác |

## KPI theo dõi sau khi bật agent

| KPI | Nguồn | Ý nghĩa |
|---|---|---|
| Tỷ lệ câu hỏi trong 10 câu được trả lời đúng, có dẫn số | Rà soát transcript | Giá trị nghiệp vụ |
| Thời gian PM tổng hợp báo cáo ngày/tuần trước và sau | Chủ nghiệp vụ ghi | Tiết kiệm thật |
| Số lượt trả lời không nói rõ dữ liệu tính đến lúc nào | Transcript | Guardrail bị bỏ |
| Tuổi dữ liệu trung bình khi trả lời | JSON của lệnh sync | Connector có ổn không |
| Số sai lệch mỗi tuần theo loại (dữ liệu / chỉ dẫn / tool) | Sổ rà soát | Xu hướng chất lượng; kỳ vọng giảm |
| Số sự cố cần đổi model | Sổ rà soát | Kỳ vọng bằng 0; nếu khác 0, tri thức chưa đủ |
