# Training Material Design

Cập nhật 2026-09-30. Bản nháp, dành cho **DevOps**.

Tài liệu này mô tả phải làm material như thế nào: xuất phát từ đâu, theo nguyên tắc nào, buổi sharing nói gì, material gồm những gì, và khi nào thì coi là sẵn sàng. Còn ai làm, làm khi nào và phối hợp với Training ra sao thì nằm ở tài liệu Kit Rollout and Training Plan (giai đoạn 1 và 4). Hình thức buổi sharing, thời lượng từng phần và bảng module × role cũng nằm ở mục 2 của tài liệu đó.

## 1. Hiện trạng

**Kit** chạy trên Kiro, gồm bốn tầng:

1. Core steering: luật bất biến, luôn được nạp.
2. Skill và template theo từng loại tài liệu.
3. Project overlay: hồ sơ dự án và mã domain, mỗi dự án tự điền.
4. Hook: ví dụ chặn ghi giá trị có dạng secret.

Kit được phân phối bằng cách copy vào repo dự án. Khi nâng cấp chỉ chép lại phần core; project overlay không bị động tới.

**Material** hiện chỉ có các trang Confluence rời, mỗi trang cho một module. Chưa có trang tổng quan, chưa có bài sharing, chưa có slide. Việc đầu tiên là rà các trang này: trang nào dùng lại được, trang nào trùng lặp, còn thiếu gì, chỗ nào đã lệch so với kit hiện tại.

| Phần | Confluence hiện có | Bản live | Bản chi tiết |
|---|---|---|---|
| Tổng quan kit | Chưa có | Chưa có | Chưa có |
| API spec | Trang rời | Chưa có | Chưa có |
| Sequence diagram | Trang rời | Chưa có | Chưa có |
| Test case | Trang rời | Chưa có | Chưa có |
| Unit test code | Trang rời | Chưa có | Chưa có |
| Overlay | Chưa có | Chưa có | Chưa có |

## 2. Nguyên tắc thiết kế

1. **Viết cho mọi role.** Người nghe gồm cả PM và BA, không chỉ dev. Nói về kit ở mức ai cũng hiểu; chi tiết kỹ thuật để ở bản chi tiết.
2. **Bản live ngắn, bản chi tiết đầy đủ.** Bản live chỉ giữ những gì cần nói trong 60 phút. Mọi thứ khác (cài đặt, ví dụ đầy đủ, giới hạn, FAQ) nằm ở bản chi tiết.
3. **Không demo.** Ví dụ trong slide dùng ảnh chụp tĩnh, lấy từ lần chạy thật trên dự án mẫu. Người học tự thử sau buổi, theo bản chi tiết.
4. **Mọi module dùng một khuôn.** Module bổ sung chỉ cần thêm một trang theo khuôn đó và vài slide, không phải thiết kế lại.
5. **Sửa ở một chỗ.** Phần dùng chung chỉ nằm ở trang gốc; trang module không chép lại.
6. **Material đi theo version của kit.** Mỗi trang ghi rõ nó đúng với bản kit nào.

## 3. Outline bài sharing

**Phần 1 — Kit là gì, vì sao cần kit** (phần chính):

1. **Vấn đề khi dùng AI bằng prompt tự viết:**
   - AI đoán khi thiếu thông tin;
   - bỏ sót nhánh bất thường;
   - đứt traceability giữa các tài liệu;
   - viết câu mơ hồ, không kiểm được.

   Ngoài ra, mỗi người một kiểu nên kết quả không lặp lại được và không review được theo cùng một chuẩn.
2. **Kit giải quyết thế nào:** bốn tầng, mỗi tầng chặn loại lỗi nào. Material giải thích phương pháp; kit là thứ thực sự chạy trong repo và ràng buộc hành vi của AI.
3. **Nguyên tắc vận hành:**
   - AI dừng lại hỏi thay vì tự quyết; điểm chưa rõ được ghi thành câu hỏi mở có đánh số để người chốt.
   - Test viết cho code cũ phải phân biệt Confirmed và Characterisation.
   - Review phải có số liệu (số mục checklist đã quét, phân loại NG / cần xác nhận / OK); `Zero NG` không có nghĩa là AI đã duyệt thay người.
   - Golden rules: không sửa code production để pass test; ưu tiên test public behavior; coverage là tín hiệu, không phải mục tiêu; luôn ghi open question.
4. **Governance:** dữ liệu nào không được đưa vào, ai duyệt output, tool nào được phép dùng (theo quy tắc dữ liệu đã chốt ở bước 0.5). Hook chặn secret là lưới an toàn cuối cùng, không thay được sự cẩn thận của người dùng.
5. **Một vòng đầu cuối bằng ảnh chụp tĩnh:** input → output → câu hỏi mở → báo cáo review.

**Phần 2 — Các module.** Mở đầu bằng bảng module × role. Sau đó mỗi module trả lời bốn câu hỏi:

1. **Input:** cần có gì trước khi gọi. Thiếu input thì kit ghi câu hỏi, không đoán.
2. **Output:** ra tài liệu hoặc code gì, theo template nào, nằm ở đâu.
3. **Kích hoạt đúng:** câu gọi mẫu có nêu rõ tên skill hoặc loại tài liệu, vì câu nói tự nhiên không bảo đảm skill được kích hoạt. Kèm dấu hiệu để nhận biết skill đã chạy thật. Prompt không kích hoạt skill nào là prompt dễ ra kết quả sai nhất.
4. **Workflow bên trong (sơ qua):** đọc input → sinh output theo template → tự review theo checklist → ghi câu hỏi mở → báo cáo.

**Phần 3 — Tự chủ overlay:**

- Overlay khác core ở đâu, và vì sao nâng cấp kit không động tới overlay.
- Các nhóm thông tin trong hồ sơ dự án: lệnh build và test, quy ước traceability, mã domain, ranh giới dữ liệu, người review.
- Ai giữ overlay (người phụ trách), và khi nào phải cập nhật: thêm domain, đổi lệnh build, đổi người review, khách đổi template.
- Sau khi sửa, kiểm tra lại bằng script kiểm tra cài đặt.

**Phần 4 — Sau buổi làm gì:** kiểm tra máy theo bản chi tiết; chạy task thật đầu tiên, có DevOps review; report gì và vì sao; hỏi ở đâu; module bổ sung sẽ đến bằng cách nào.

## 4. Hai bản material

| Bản | Dạng | Dùng khi | Nội dung |
|---|---|---|---|
| **Bản live** | Slide | Trình bày trong buổi sharing | Theo đúng outline ở mục 3; ví dụ dùng ảnh chụp tĩnh; mỗi slide module có cùng bốn câu hỏi |
| **Bản chi tiết** | Cây Confluence, kèm record của buổi | Đọc sau buổi; cho người vắng mặt; cho người mới vào dự án | Xem cấu trúc bên dưới |

**Cấu trúc bản chi tiết:**

- **Trang gốc:** kit là gì, vì sao cần kit, nguyên tắc vận hành, governance, cài đặt và kiểm tra máy, hỏi ở đâu, record của buổi sharing.
- **Mỗi module một trang, theo khuôn chung:** input, output, cách kích hoạt đúng, workflow bên trong, ví dụ input và output, cách review output, giới hạn đã biết, FAQ.
- **Trang overlay:** từng mục trong hồ sơ dự án (ngôn ngữ, thư mục nguồn và test, lệnh build và test, quy ước traceability, thư mục đầu ra, mã domain, ranh giới dữ liệu, người review và bằng chứng phê duyệt, input chuẩn); ví dụ đã điền sẵn; khi nào cập nhật; lỗi điền hay gặp.
- **FAQ và troubleshooting:** cập nhật sau mỗi kỳ, từ channel hỏi đáp và issue log.

## 5. Tiêu chí sẵn sàng

**Trước buổi sharing đầu tiên**, cần có đủ:

1. Bản kit có version, kèm release note và hướng dẫn nâng cấp.
2. Bản live, không quá 60 phút khi trình bày thử.
3. Bản chi tiết: trang gốc, bốn trang module theo khuôn chung, trang overlay, FAQ và troubleshooting.
4. Ví dụ input và output cho từng module, chạy thật trên dự án mẫu.
5. Đã dry-run online với một người không soạn material: đúng thời lượng, đã thử record.

**Trước khi phát hành một module bổ sung**, cần có đủ:

1. Module nằm trong một bản kit có version, kèm release note ghi rõ team cần làm gì khi nâng cấp.
2. Module đã chạy đầu cuối ít nhất một lần trên dự án mẫu hoặc task thật, và output khớp template của khách.
3. Trang module trong bản chi tiết, theo khuôn chung.
4. Hướng dẫn điền mục mới trong overlay, nếu module cần.
5. Slide của module đã được thêm vào bản live, cho các team onboard sau.

## 6. Rủi ro về material

| Nếu | Thì |
|---|---|
| 60 phút không đủ, nhiều câu hỏi còn treo | Trả lời trên channel, đưa vào FAQ; phần nào bị hỏi nhiều thì bổ sung vào bản chi tiết và rút gọn phần khác của bản live cho team sau |
| Không được dùng ảnh chụp từ artifact thật | Mọi ví dụ lấy từ dự án mẫu (bước 1.4) |
| Module mới làm lệch nội dung đã có | Khi phát hành module mới, rà lại trang gốc và trang overlay |
| Survey cho thấy một phần khó hiểu | Sửa phần đó trong bản live trước buổi của team kế tiếp |

## Câu hỏi mở

- Bản chi tiết đặt ở không gian Confluence của DevOps hay của từng team?
