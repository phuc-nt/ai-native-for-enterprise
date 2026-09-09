# Rollout Roadmap

Cập nhật 2026-09-09. Đọc trước [Artifacts, Work Items and PIC](03-work-items-and-pic.md); mã việc A1, D2 và mã artifact M0, T2 lấy từ đó. Lịch cho hai team đến mốc cứng **2026-10-31**: cả hai team hoàn thành bước triển khai kiến thức cho bốn use case dev.

## 1. Giả định

- Hai team, gọi là A và B, cả hai waterfall. Pha hiện tại, số người, role lấy ở tuần khảo sát.
- Team A đi trước, team B lệch một tuần để tái dùng kit và tài liệu.
- Bốn use case dev là lõi; role khác chỉ nhận bảng ý tưởng. Kiro Pro hoặc Pro+, MCP chưa bật; CLI Jira/Confluence với token cá nhân; Rovo giả định dùng thoải mái; không Rovo Dev; Slack mặc định chưa có.
- Sau mốc 31/10, áp dụng, theo dõi và đánh giá tiếp trong tháng 11 và 12.

## 2. Lịch

| Tuần | Team A | Team B | Chung |
|---|---|---|---|
| 09–12/09 | Chốt PL, champion (C1) | Chốt PL, champion (C1) | Duyệt phạm vi (A1); spec CLI (B1) |
| 15–19/09 | Khảo sát, nộp T2 T3 T4 (C2–C5) | Khảo sát, nộp T2 T3 T4 (C2–C5) | CLI v1 (B1); bản Kiro đầy đủ (B2); gói Rovo, Kiro (A2, A3) |
| 22–26/09 | Khu vực team A, chạy thử bốn việc (D1, D2) | | Khung cây material (E1); định hướng lõi và khu vực team (B3); cho phép artifact (A4) |
| 29/09–03/10 | Bốn module A (E4); **bàn giao material A** (E8) | Khu vực team B, chạy thử (D3, D4) | Skill test case qua CLI (B4); M1, M2, M3, M7, M8, M9 (E2, E3, E6, E7); A5, A6 |
| 06–10/10 | **Triển khai** (F1–F3) | Bốn module B (E4); **bàn giao material B** (E8) | Đo bật trên máy (B5); bảng ý tưởng role khác (E5) |
| 13–17/10 | Áp dụng (F4, F5) | **Triển khai** (F1–F3) | Theo dõi hằng tuần bắt đầu (G1) |
| 20–24/10 | Áp dụng | Áp dụng (F4, F5) | Dạy bù (F6); năm prompt template M5 (E9) |
| 27–31/10 | Áp dụng, T5 v0.2 (D5) | Áp dụng | **Chốt mốc**: báo cáo triển khai R1 (G2); dàn ý playbook (E10) |
| 11/2026 | Áp dụng đủ bốn tuần, theo dõi | Như A | Chuyển thêm skill sang CLI theo nhu cầu; sửa kit theo định hướng B3 nếu đã duyệt |
| 12/2026 | Đánh giá (G3) | Đánh giá (G3) | Use case chuẩn hoá, đóng góp ngược lõi (G4); playbook v1 (G5) |

## 3. Ba cổng quyết định

| Ngày | Hỏi | Nếu không đạt |
|---|---|---|
| 19/09 | Hai hồ sơ team được PL ký; T2, T3, T4 đủ? | Lùi cả lịch một tuần, mất tuần dạy bù |
| 03/10 | Champion A xác nhận đã nhận cây material, mọi link mở được, bài chạy được; khu vực team B v0.1 có? | Dồn triển khai B sang tuần 20–24/10 |
| 17/10 | PL B ký danh sách bốn điều kiện, A có output AI đầu tiên được duyệt? | Dùng tuần 20–31/10 để dạy bù, không thêm use case |

## 4. Đường lùi

- **CLI trễ**: dạy ba việc trong repo trước (thiết kế, code, unit test); module sinh test case dạy ở tuần 20–24/10 với đầu vào là file thiết kế cục bộ, chưa đăng Confluence.
- **Sinh thiết kế chưa khớp template sau chạy thử D2**: thu hẹp việc 1 thành nháp từng mục theo khuôn, người ghép; không kéo ba việc còn lại.
- **Team vào tuần bàn giao đúng lúc triển khai**: đổi thứ tự A và B.
- **MCP được bật giữa chừng**: không đổi lịch, chuyển sau 31/10.
- **Slack không có**: skill báo cáo dừng ở Confluence, dán link tay. Đã là mặc định.

## 5. Cần từ lãnh đạo và PL

| Cần | Từ ai | Khi nào |
|---|---|---|
| Tên champion, pha hiện tại, tuần bàn giao của mỗi team | PL | 12/09 |
| Hai buổi khảo sát, mỗi team hai giờ; nộp artifact mẫu, rule, số nền (T2, T3, T4) | PL và champion | 15–19/09 |
| Nửa ngày cho toàn team trong tuần triển khai | PL | 06–10/10 và 13–17/10 |
| Task thật cho từng role trong bốn tuần áp dụng | PL | Từ 13/10 |
| Quyết định A1 đến A6 | Phía khách, lãnh đạo | Trước 03/10 |

## 6. Sau 31/10 sẽ có

- Mỗi team một cây material trên Confluence, M0 đến M9, đã bàn giao và champion giữ.
- Hai team dùng được Kiro + khu vực team T5 của mình trên bốn việc thật, có bảng theo dõi M8 hằng tuần.
- Định hướng lõi và khu vực team của MK (K3) sẵn sàng để duyệt sửa kit.
- Báo cáo triển khai R1; dàn ý playbook R4.
- Tháng 12: báo cáo đánh giá, use case chuẩn hoá, playbook v1 cho team tiếp theo.

**Câu hỏi mở**

- Team nào đang gần tuần bàn giao trong tháng 10? Quyết định thứ tự A và B.
- Sau hai team này, team thứ ba bắt đầu khi nào và ai giữ kit?
