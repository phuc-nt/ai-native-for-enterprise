# Kit Rollout and Training Plan

Cập nhật 2026-09-30. Bản nháp, **chưa có deadline**: cột Deadline để trống cho người lập lịch điền.

Plan chung để đưa agent kit của DevOps (gọi tắt là kit) tới từng project team. Người đọc: DevOps, Training, PM và người phụ trách của các team, phía khách. Hình thức rollout:

- **Một buổi sharing online, tối đa 60 phút, có record, không demo**, cho toàn bộ thành viên dự án, phủ tất cả module đã xong.
- **Module bổ sung không mở buổi mới.** Module được phát hành cùng bản kit mới, kèm tài liệu giải thích.
- **Rollout theo từng project team**, lần lượt. Team sau dùng lại bài học của team trước.
- **Đo từ ngày đầu.** Team chốt mức giờ tham chiếu của cách làm cũ trước khi dùng kit.

Hai tài liệu đi kèm:

- **Training Material Design** (dành cho DevOps): hiện trạng kit và material, outline chi tiết của bài sharing, cấu trúc material, tiêu chí sẵn sàng.
- **Effectiveness Data Collection**: survey sau buổi, report định kỳ của PM, các chỉ số dùng để đánh giá.

## 1. Vai trò

| Bên | Chịu trách nhiệm |
|---|---|
| **DevOps** | Xây và cải thiện kit; thiết kế bài sharing và sản xuất material; host buổi sharing; phân tích dữ liệu monitoring; cải thiện kit và material theo dữ liệu đó; support team dự án suốt quá trình sử dụng |
| **Training** | Liên lạc với các bên; sắp xếp lịch; tổ chức buổi online và record; đốc thúc các bên đúng hạn; làm report định kỳ về hiệu quả của training program |
| **Project team** (PM, người phụ trách, thành viên) | Bảo đảm kit được dùng trong công việc thật; tự giữ overlay; PM nộp report định kỳ; mỗi team cử một **người phụ trách** làm đầu mối với DevOps |
| **Phía khách** (bên quản lý license Kiro) | Cấp license; cung cấp usage log theo account, session log nếu được; quyết định dữ liệu nào được phép dùng |

**RACI** (R: người làm, A: chịu trách nhiệm cuối cùng, C: được hỏi ý kiến, I: được thông báo)

| Việc | DevOps | Training | PM | Thành viên | Phía khách |
|---|---|---|---|---|---|
| Xây, cải thiện, phát hành kit | R, A | I | I | I | |
| Thiết kế bài sharing, sản xuất material | R, A | C | I | | |
| Lập và giữ lịch rollout | C | R, A | C | I | |
| Liên lạc, đốc thúc các bên | | R, A | | | |
| Host buổi sharing | R, A (nội dung) | R (lịch, mời, điểm danh, record) | I | | |
| Cài kit, điền và giữ overlay | C | | A | R (người phụ trách) | |
| Dùng kit trong task thật | C | | A | R | |
| Report định kỳ của PM | I | I | R, A | C | |
| Cung cấp usage log, session log | I | C (đầu mối xin) | | | R, A |
| Support trong khi dùng | R, A | | I | C | |
| Phân tích dữ liệu monitoring | R, A | I | I | | |
| Report định kỳ về hiệu quả chương trình | C | R, A | I | | I |
| Share module bổ sung tới các team | R (tài liệu) | R, A (thông báo, theo dõi) | I | I | |
| Quyết định chuẩn hoá, sửa hay dừng một module | R | R | C | | *(người duyệt: xác nhận)* |

## 2. Buổi sharing (tóm tắt)

Buổi dành cho **toàn bộ thành viên dự án**: dev, tester, BA/BrSE, PM. Mỗi role dùng những module khác nhau, nhưng ai cũng cần nắm tổng thể kit và biết phần nào mình dùng được. Link bản chi tiết của material được gửi kèm thư mời.

| Phần | Thời lượng (đề xuất) | Nội dung |
|---|---|---|
| 1. Kit là gì, vì sao cần kit | 25 phút | Phần chính: vấn đề khi dùng prompt tự viết, bốn tầng của kit, nguyên tắc vận hành, governance |
| 2. Các module | 16 phút | Mỗi module 4 phút: input, output, cách kích hoạt đúng, workflow bên trong |
| 3. Tự chủ overlay | 7 phút | Overlay là gì, ai giữ, khi nào cập nhật |
| 4. Sau buổi làm gì | 4 phút | Kiểm tra máy, task thật đầu tiên, report, hỏi ở đâu, module bổ sung đến bằng cách nào |
| Hỏi đáp | 8 phút | Câu chưa kịp trả lời được trả lời trên channel |

**Module và role dùng chính (đề xuất):**

| Module | Role | Trạng thái |
|---|---|---|
| API spec | Dev, BrSE | Xong |
| Sequence diagram | Dev | Xong |
| Test case | Tester, BA/BrSE | Xong |
| Unit test code | Dev | Xong |
| Detail design | Dev, BrSE | Kế tiếp |
| Code | Dev | Kế tiếp |
| Automation test | Tester | Kế tiếp |

## 3. Công việc theo giai đoạn

- Giai đoạn 0 và 1 làm một lần.
- Giai đoạn 2 lặp lại cho mỗi team.
- Giai đoạn 3 chạy liên tục.
- Giai đoạn 4 lặp lại cho mỗi module bổ sung.
- Giai đoạn 5 làm tại mỗi mốc đánh giá.

```
0. Chuẩn bị chương trình ─┐
                          ├─▶ 2. Onboard + sharing team A ─▶ team B ─▶ ...
1. Thiết kế bài sharing,  ┘          │
   sản xuất material                 ├── 3. Monitoring định kỳ (liên tục)
                                     │
   4. Module bổ sung: kit version mới + tài liệu giải thích ─▶ share tới các team đã onboard
                                     ▼
                              5. Đánh giá tại mốc
```

### Giai đoạn 0 — Chuẩn bị chương trình

| # | Việc | PIC | Hỗ trợ | Output | Deadline |
|---|---|---|---|---|---|
| 0.1 | Chốt danh sách project team, thứ tự rollout, người phụ trách mỗi team | Training | PM các team | Lịch rollout (mục 4) có tên team và người phụ trách | |
| 0.2 | Chốt nhịp report (tuần hay tháng); chốt mẫu report định kỳ của PM và của Training | Training | DevOps | Các mẫu report đã chốt | |
| 0.3 | Xin phía khách usage log theo account (credit hoặc token theo ngày), và session log nếu được; chốt định dạng, tần suất, người gửi | Training | DevOps nêu yêu cầu kỹ thuật | Thoả thuận thành văn | |
| 0.4 | Xác nhận license Kiro cho thành viên các team trong đợt đầu | Training | Phía khách cấp | Danh sách account đã cấp | |
| 0.5 | Xác nhận quy tắc dữ liệu: dữ liệu nào không được đưa vào Kiro, ảnh chụp từ artifact thật có được dùng trong material không | Training | DevOps soạn đề xuất, phía khách quyết | Quy tắc thành văn, đưa vào material | |
| 0.6 | Chốt công cụ họp online và nơi lưu record: ai được xem, lưu bao lâu | Training | | Quy ước record | |
| 0.7 | Dựng kênh support: channel hỏi đáp, trang FAQ, issue log cho kit; chốt thời gian phản hồi | DevOps | Training thông báo | Kênh và issue log hoạt động | |
| 0.8 | Phát hành kit bản đầu có version, release note và hướng dẫn nâng cấp | DevOps | | Bản kit v1 | |
| 0.9 | Dựng form survey sau buổi | Training | DevOps duyệt câu hỏi kiểm tra | Form survey | |
| 0.10 | Gửi thông báo kick-off tới PM các team: mục tiêu, lịch, việc team cần làm, dữ liệu cần report | Training | DevOps | Thông báo đã gửi, PM xác nhận | |

### Giai đoạn 1 — Thiết kế bài sharing và sản xuất material

DevOps làm theo tài liệu Training Material Design. Training tham gia ở những bước ghi bên dưới.

| # | Việc | PIC | Hỗ trợ | Output | Deadline |
|---|---|---|---|---|---|
| 1.1 | Rà các trang Confluence rời hiện có | DevOps | | Bảng rà soát | |
| 1.2 | Thiết kế bài sharing, chốt outline | DevOps | Training góp ý hình thức, thời lượng | Outline đã chốt | |
| 1.3 | Chốt khuôn trang module, dùng lại cho mọi module bổ sung | DevOps | | Khuôn trang module | |
| 1.4 | Chạy kit trên dự án mẫu để lấy ví dụ và ảnh chụp | DevOps | | Bộ ví dụ và ảnh chụp | |
| 1.5 | Làm bản chi tiết (cây Confluence) | DevOps | | Bản chi tiết | |
| 1.6 | Làm bản live (slide) | DevOps | Training góp ý | Slide | |
| 1.7 | Soạn FAQ và troubleshooting bản đầu | DevOps | | Trang FAQ | |
| 1.8 | Dry-run online với một người không soạn material, bấm giờ, thử record, rồi sửa material | DevOps | Training tham gia | Material đạt tiêu chí sẵn sàng | |

### Giai đoạn 2 — Onboard và sharing cho một project team

| # | Việc | PIC | Hỗ trợ | Output | Deadline |
|---|---|---|---|---|---|
| 2.1 | Họp với PM và người phụ trách: pha hiện tại của dự án, loại việc sắp tới, ai sẽ dùng module nào | DevOps | Training sắp lịch | Hồ sơ team một trang | |
| 2.2 | Chốt mức giờ tham chiếu của cách làm cũ cho từng loại việc mà các module phủ (lấy từ dự án trước nếu có) | PM | Người phụ trách; DevOps đưa mẫu | Bảng giờ tham chiếu | |
| 2.3 | Cài kit vào repo dự án, điền overlay lần đầu, chạy script kiểm tra cài đặt tới khi hết lỗi | Người phụ trách | DevOps | Repo sẵn sàng, ghi lại version kit | |
| 2.4 | Tổ chức buổi sharing (mục 2) | DevOps | Training: lịch, mời, điểm danh, record | Buổi đã diễn ra, danh sách tham dự, record | |
| 2.5 | Đăng record vào bản chi tiết; gửi survey sau buổi | Training | | Record đã đăng, kết quả survey | |
| 2.6 | Mỗi người tự kiểm tra máy theo hướng dẫn trong bản chi tiết: Kiro đăng nhập được; workspace đã trust (nếu chưa, hook im lặng không chạy); `python3` có trên PATH; thử hook chặn một giá trị giả dạng secret | Thành viên | DevOps kiểm, xử lý máy lỗi | Danh sách máy đạt | |
| 2.7 | Mỗi người có role dùng module chạy module đó trên một task thật (chưa có task phù hợp thì dùng ví dụ trong bản chi tiết); output đầu tiên được review cùng DevOps | Thành viên | DevOps | Output thật đầu tiên được duyệt | |
| 2.8 | Kiểm bốn điều kiện "đã triển khai" (bên dưới) cho từng người; người vắng buổi xem record, đọc bản chi tiết, rồi hỏi đáp 30 phút với người phụ trách | Người phụ trách | DevOps | Danh sách người đạt, có ký xác nhận | |
| 2.9 | PM xác nhận cam kết monitoring: nhịp report định kỳ, người điền | PM | Training đốc thúc | Cam kết thành văn | |

**Bốn điều kiện "đã triển khai"**, xét cho từng người:

1. Kit chạy được trên máy người đó; repo của team đã có kit và overlay.
2. Đã tự tạo ít nhất một output bằng module đúng role, khớp khuôn và đã qua review.
3. Nói được ba nguyên tắc governance: dữ liệu nào không đưa vào, ai duyệt output, tool nào được phép.
4. Biết hỏi ở đâu khi bị tắc.

Người có role chưa dùng module nào (ví dụ PM) chỉ xét điều 3 và 4.

### Giai đoạn 3 — Monitoring định kỳ

Chạy liên tục mỗi kỳ, theo nhịp đã chốt ở 0.2. Nội dung report và cách tính chỉ số nằm ở tài liệu Effectiveness Data Collection.

| # | Việc | PIC | Hỗ trợ | Output | Deadline |
|---|---|---|---|---|---|
| 3.1 | Nộp report định kỳ của PM | PM | Người phụ trách, thành viên | Report định kỳ của PM | |
| 3.2 | Nhắc bên còn thiếu report | Training | | Report đủ, đúng hạn | |
| 3.3 | Gửi usage log theo account | Phía khách | Training nhận, chuyển DevOps | Usage log của kỳ | |
| 3.4 | Ghép report của PM với usage log và dữ liệu từ repo; phân tích, ghi vấn đề và đề xuất sửa | DevOps | | Bản phân tích của kỳ | |
| 3.5 | Tổng hợp report định kỳ về hiệu quả chương trình, gửi các bên liên quan | Training | DevOps cấp bản phân tích | Report định kỳ của Training | |
| 3.6 | Họp review ngắn: đọc số, chốt việc sửa kit và material, điều chỉnh lịch | Training chủ trì | DevOps; PM khi cần | Danh sách action có PIC | |

### Giai đoạn 4 — Module bổ sung và cải tiến

Không mở buổi sharing mới cho module bổ sung. Module đến tay các team dưới dạng kit version mới kèm tài liệu giải thích.

| # | Việc | PIC | Hỗ trợ | Output | Deadline |
|---|---|---|---|---|---|
| 4.1 | Xây module mới: detail design, code, automation test, theo thứ tự ưu tiên | DevOps | | Skill, template, hook của module | |
| 4.2 | Chạy thử module trên dự án mẫu hoặc task thật của một team đã onboard | DevOps | Người phụ trách của team đó | Output chạy thử, danh sách chỗ còn lệch | |
| 4.3 | Viết trang module trong bản chi tiết; thêm slide module vào bản live | DevOps | | Module đạt tiêu chí sẵn sàng | |
| 4.4 | Phát hành kit bản mới; release note có link tới trang module | DevOps | | Bản kit mới | |
| 4.5 | Share tới các team đã onboard: thông báo, link tài liệu, hạn nâng cấp; thu xác nhận đã nâng cấp | Training | PM các team | Lịch rollout (mục 4) cập nhật | |
| 4.6 | Nâng kit trong repo, chạy script kiểm tra cài đặt, bổ sung overlay nếu module mới cần | Người phụ trách | DevOps khi cần | Repo ở bản mới | |
| 4.7 | *(Tuỳ chọn)* Buổi hỏi đáp online 30 phút, có record, chỉ khi team yêu cầu hoặc survey, issue log cho thấy cần | DevOps | Training sắp lịch | Buổi hỏi đáp | |
| 4.8 | Sửa kit và material theo issue log và phân tích của giai đoạn 3; phát hành bản vá theo cùng quy trình 4.4 | DevOps | | Bản vá, issue đã đóng | |

### Giai đoạn 5 — Đánh giá tại mốc

| # | Việc | PIC | Hỗ trợ | Output | Deadline |
|---|---|---|---|---|---|
| 5.1 | Tổng hợp số liệu tại mốc theo từng cặp module × team | DevOps | Training | Bảng số tại mốc | |
| 5.2 | Viết report đánh giá chương trình | Training | DevOps | Report tại mốc | |
| 5.3 | Với từng module, đề xuất một trong ba: chuẩn hoá vào quy trình, sửa rồi thử tiếp, hay dừng | DevOps, Training | PM | Quyết định thành văn *(người duyệt: xác nhận)* | |
| 5.4 | Plan training tiếp: team nào cần buổi bổ sung, phần nào của material cần làm lại, nhu cầu mới | Training | DevOps | Plan kỳ sau | |

## 4. Lịch rollout

Training điền và giữ bảng này. Mỗi ô là ngày dự kiến / ngày thực tế. Ba cột module bổ sung ghi ngày team đã nâng lên kit bản có module đó.

| Team | Người phụ trách | Cài kit + overlay | Buổi sharing | Output thật đầu tiên | Detail design | Code | Automation test |
|---|---|---|---|---|---|---|---|
| Team 1 | | | | | | | |
| Team 2 | | | | | | | |
| Team 3 | | | | | | | |

## 5. Support

| Kênh | Dùng khi | Ai trả lời |
|---|---|---|
| Bản chi tiết và record | Tra cứu trước khi hỏi | — |
| Channel hỏi đáp | Câu hỏi cách dùng, lỗi cài đặt, câu hỏi chưa kịp trả lời trong buổi | DevOps, trong thời gian phản hồi đã chốt ở 0.7 |
| Issue log | Kit ra sai, thiếu tính năng, material sai | DevOps phân loại, nêu bản sẽ sửa |
| Review output đầu tiên | Lần đầu mỗi người dùng kit trên task thật | DevOps cùng người dùng |
| FAQ | Câu hỏi lặp lại từ hai lần trở lên | DevOps cập nhật sau mỗi kỳ |

## 6. Rủi ro và đường lùi

| Nếu | Thì |
|---|---|
| License về muộn | Vẫn tổ chức buổi sharing, vì buổi không cần máy; lùi bước 2.6, 2.7 tới khi có license |
| Người học chỉ nghe, không đọc bản chi tiết | Bước 2.6, 2.7 buộc mỗi người tự làm theo bản chi tiết; người phụ trách kiểm ở bước 2.8 |
| Có người vắng buổi | Xem record, đọc bản chi tiết, hỏi đáp 30 phút với người phụ trách; vẫn phải đạt bốn điều kiện |
| Team không tự giữ được overlay | DevOps cùng người phụ trách rà overlay một lần sau kỳ đầu; lỗi điền hay gặp được đưa vào bản chi tiết |
| Người phụ trách không có giờ | PM phân lại người phụ trách; DevOps tạm nhận phần cài đặt và review |
| PM không có thời gian điền report | Người phụ trách điền thay, PM xác nhận; nếu task có trên Jira thì export thay cho điền tay |
| Phía khách không cung cấp được usage log hoặc session log | Dựa vào report của PM và dữ liệu trong repo; không suy ra mức dùng khi thiếu usage log |
| Các team chạy các bản kit khác nhau | Report ghi version kit; release note nói rõ bản nào bắt buộc nâng cấp |
| Tài liệu giải thích module bổ sung không đủ để team tự dùng | Mở buổi hỏi đáp 4.7; DevOps sửa tài liệu theo câu hỏi nhận được |
| Team không có task phù hợp với module trong kỳ | Chuyển sang module khác hợp với pha hiện tại; không ép dùng để có số |
| Kết quả kém ở một module | Dừng giới thiệu module đó cho team mới, sửa theo 4.8, thử lại với team đã có |

## Câu hỏi mở

- Record lưu ở đâu, ai được xem, lưu bao lâu? Phía khách có yêu cầu gì về việc record không?
- Nhịp report là tuần hay tháng? Có thể dùng tuần trong tháng đầu của mỗi team, sau đó chuyển sang tháng.
- Ai là người duyệt các quyết định ở 5.3?
- Người phụ trách của mỗi team có được tính giờ cho việc giữ overlay, hỗ trợ và điền report không?
