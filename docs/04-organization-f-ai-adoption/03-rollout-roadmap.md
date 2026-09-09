# Rollout Roadmap

Cập nhật 2026-09-09. Đọc trước [Enablement Framework](02-enablement-framework.md). Lịch cho hai team đi qua bảy bước, mốc cứng **2026-10-31**: cả hai team hoàn thành bước triển khai kiến thức.

## 1. Giả định

- Hai team, gọi là A và B, cả hai waterfall. Pha hiện tại, số người, role lấy ở tuần khảo sát.
- Team A đi trước, team B lệch một tuần để tái dùng kit và tài liệu.
- Kiro Pro hoặc Pro+, MCP chưa bật; CLI Jira/Confluence với token cá nhân; Rovo giả định dùng thoải mái; không Rovo Dev; Slack mặc định chưa có.
- Sau mốc 31/10, áp dụng, theo dõi và đánh giá tiếp trong tháng 11 và 12.

## 2. Lịch

| Tuần | Team A | Team B | Chung |
|---|---|---|---|
| 09–12/09 | Chốt PL, champion | Chốt PL, champion | Spec CLI; xác nhận gói Kiro; bật theo dõi usage Rovo |
| 15–19/09 | Khảo sát | Khảo sát | CLI chuẩn hoá; dựng bản Kiro đầy đủ của kit |
| 22–26/09 | Tuỳ biến kit A | | Chuyển ba skill ưu tiên sang CLI |
| 29/09–03/10 | Tài liệu theo role | Tuỳ biến kit B từ kit A | Buổi mở đầu chung; bắt đầu pilot Rovo với PM, BA, BrSE, comtor |
| 06–10/10 | **Triển khai** | Tài liệu theo role | Sửa module theo phản hồi A |
| 13–17/10 | Áp dụng, theo dõi | **Triển khai** | Bảng theo dõi một trang |
| 20–24/10 | Áp dụng | Áp dụng, theo dõi | Dạy bù; rút prompt template |
| 27–31/10 | Áp dụng | Áp dụng | **Chốt mốc**: kiểm bốn điều kiện, báo cáo triển khai |
| 11/2026 | Áp dụng đủ bốn tuần, theo dõi | Như A | Chuyển thêm skill sang CLI theo nhu cầu |
| 12/2026 | Đánh giá | Đánh giá | Use case chuẩn hoá lên Confluence; playbook v1; đóng góp ngược kit chung |

## 3. Ba cổng quyết định

| Ngày | Hỏi | Nếu không đạt |
|---|---|---|
| 19/09 | Hai hồ sơ team được PL ký, đủ artifact? | Lùi cả lịch một tuần, mất tuần dạy bù |
| 03/10 | Module A chạy trơn trên máy champion, kit B v0.1 có? | Dồn triển khai B sang tuần 20–24/10 |
| 17/10 | PL B ký danh sách bốn điều kiện, A có output AI đầu tiên được duyệt? | Dùng tuần 20–31/10 để dạy bù, không thêm use case |

## 4. Đường lùi

- **CLI trễ**: dạy Kiro trong repo và Rovo trước; module cần CLI dạy ở tuần 20–24/10. Mốc vẫn đạt vì điều kiện một chỉ đòi tool chạy.
- **Team vào tuần bàn giao đúng lúc triển khai**: đổi thứ tự A và B.
- **MCP được bật giữa chừng**: không đổi lịch, chuyển sau 31/10.
- **Slack không có**: skill báo cáo dừng ở Confluence, dán link tay. Đã là mặc định.

## 5. Cần từ lãnh đạo và PL

| Cần | Từ ai | Khi nào |
|---|---|---|
| Tên champion, pha hiện tại, tuần bàn giao của mỗi team | PL | 12/09 |
| Hai buổi khảo sát, mỗi team hai giờ | PL và champion | 15–19/09 |
| Nửa ngày cho toàn team trong tuần triển khai | PL | 06–10/10 và 13–17/10 |
| Task thật cho từng role trong bốn tuần áp dụng | PL | Từ 13/10 |
| Quyết định chính sách: gói Rovo, đường Slack, dùng artifact khách cho hands-on | Lãnh đạo, admin | Trước 03/10 |

## 6. Sau 31/10 sẽ có

- Hai team dùng được Kiro + kit của team và Rovo trên việc thật, có bảng theo dõi hằng tuần.
- Kit của hai team có phiên bản, kèm ghi chú khác kit chung ở đâu.
- Bộ module theo role, prompt template rút từ hands-on đã chạy, báo cáo triển khai một trang.
- Tháng 12: báo cáo đánh giá, use case chuẩn hoá, playbook v1 cho team tiếp theo.

**Câu hỏi mở**

- Team nào đang gần tuần bàn giao trong tháng 10? Quyết định thứ tự A và B.
- Sau hai team này, team thứ ba bắt đầu khi nào và ai giữ kit?
