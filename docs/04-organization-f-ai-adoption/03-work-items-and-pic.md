# Artifacts, Work Items and PIC

Cập nhật 2026-09-09. Đọc trước [Direction and Scope](01-direction-and-scope.md) và [Four Core Use Cases](02-four-core-use-cases.md). Tài liệu này có hai phần: **artifact** là thứ phải tồn tại khi xong, **việc** là cách làm ra chúng. Ba bên:

- **DevOps**: team DevOps, chủ task.
- **Team dự án**: PL, champion và thành viên của mỗi team pilot.
- **Phía khách**: người có quyền về công cụ, chính sách và artifact của dự án. Chỗ chưa chắc đúng người đánh dấu *(xác nhận)*.

**Phối hợp** nghĩa là hai bên cùng làm ra, ghi rõ ai làm phần nào. Tuần ghi theo [Rollout Roadmap](04-rollout-roadmap.md).

## 1. Artifact

### 1.1 Bộ material bàn giao cho team dự án

Material là **một cây trang Confluence**, trang gốc gắn link tới mọi thứ còn lại, kể cả thứ nằm trong repo. Team dự án nhận cây này, không nhận file rời. Mỗi team có một cây riêng, phần chung dùng include từ trang chung của DevOps để sửa một chỗ.

| Mã | Artifact | Nội dung | Chủ | Phần của bên kia |
|---|---|---|---|---|
| M0 | Trang gốc material của team | Đọc theo role: mỗi role thấy đúng module, template, checklist của mình; link tới M1 đến M9, khu vực team T5, kênh hỏi | DevOps | Champion kiểm tra link và thứ tự đọc |
| M1 | Buổi mở đầu | Mindset, governance tóm tắt, cách hỏi; slide và trang ghi lại | DevOps | |
| M2 | Governance guide | Dữ liệu vào, dữ liệu không vào, tool được phép, quy tắc bảo mật, người duyệt output gửi khách | DevOps soạn | Phía khách ban hành |
| M3 | Hướng dẫn cài đặt và kiểm tra máy | Kiro với khu vực team, CLI với token cá nhân, Rovo; lệnh kiểm tra nhanh; ba lỗi hay gặp | DevOps | Champion điền đường dẫn repo, tên project, space của team |
| M4 | Bốn module hands-on | Một trang mỗi việc: quy tắc 15 phút, bài làm 60 phút trên artifact thật, xem lại 15 phút; lỗi hay gặp | **Phối hợp**: DevOps viết phần quy tắc, các bước, lỗi | Champion cung cấp artifact từ T2, chạy thử, xác nhận output khớp template |
| M5 | Năm prompt template | Bốn từ bốn việc dev, một cho Rovo; mỗi trang có prompt, điều kiện dùng, output mẫu đã duyệt | **Phối hợp**: DevOps viết | Champion góp output đã duyệt từ T8 |
| M6 | Bảng ý tưởng cho role ngoài dev | AI làm được gì cho role của bạn, tool nào, chưa pilot | DevOps | |
| M7 | Checklist "đã triển khai" | Bốn điều kiện, mẫu danh sách để PL ký, mẫu ngoại lệ | DevOps làm mẫu | PL và champion điền, ký |
| M8 | Bảng theo dõi một trang | Bốn chiều: mức dùng, output được duyệt, công sức, chất lượng; cập nhật tuần | DevOps làm mẫu và điền số từ MK Observe, usage Rovo | Champion điền số output được duyệt và bị trả |
| M9 | Nơi hỏi | Tên champion, giờ office hours, kênh, câu hỏi thường gặp bổ sung dần | **Phối hợp**: DevOps dựng | Champion giữ và bổ sung |

### 1.2 Artifact team dự án phải làm ra

Nằm trong không gian Confluence và repo của team. Không có T1 đến T4 thì DevOps không tuỳ biến được kit; không có T6 thì áp dụng không có việc thật.

| Mã | Artifact | Nội dung | Chủ | Phần của DevOps |
|---|---|---|---|---|
| T1 | Hồ sơ team một trang | Pha hiện tại, tuần bàn giao, role và số người, ba việc tốn thời gian nhất mỗi role, tool access | **Phối hợp**: DevOps viết từ buổi khảo sát | PL xác nhận |
| T2 | Kho artifact mẫu | Ba mẫu đã duyệt cho mỗi loại: thiết kế chi tiết, đặc tả test, module code đã qua review, mã test; template khách của từng loại; tài liệu API nếu có | Team dự án | DevOps đưa danh sách cần gì |
| T3 | Bộ rule hiện hành | Coding standard, naming, review checklist, quy tắc tài liệu, framework test và ngưỡng coverage | Team dự án | |
| T4 | Số nền | Giờ làm một thiết kế, một bộ test case, một hạng mục code, một bộ unit test; lỗi review gần nhất | Team dự án | DevOps đưa mẫu điền |
| T5 | Khu vực team trong repo | Ngữ cảnh dự án, rule, template bốn đầu ra, cấu hình; có phiên bản và ghi chú khác lõi ở đâu | **Phối hợp**: v0.1 DevOps dựng cùng champion | Từ v0.2 champion giữ, DevOps review |
| T6 | Danh sách task thật cho bốn tuần áp dụng | Mỗi việc trong bốn việc có ít nhất một task thật, ai làm, gate nào đo | PL | |
| T7 | Danh sách "đã triển khai" đã ký và ghi chú phản hồi tuần | M7 đã điền; ghi chú từ buổi xem lại output hằng tuần | Team dự án | DevOps đọc để sửa M4, M5, T5 |
| T8 | Output thật có AI tham gia đã được duyệt | Ít nhất một cho mỗi việc; là bằng chứng cho đánh giá và ví dụ cho M5 | Team dự án | |

### 1.3 Artifact kỹ thuật và kết quả của DevOps

| Mã | Artifact | Nội dung | Chủ | Khi |
|---|---|---|---|---|
| K1 | CLI Jira/Confluence v1 | Cùng envelope JSON với skill MK, `--dry-run`, bản xem trước cho lệnh ghi; hướng dẫn cài và cấp token | DevOps | 19/09 |
| K2 | Bản Kiro đầy đủ của kit | Có wrapper cho workflow skill | DevOps | 19/09 |
| K3 | Định hướng lõi và khu vực team của MK | Một trang: cái gì nằm đâu, ai giữ, skill tìm khuôn thế nào; chưa sửa kit | DevOps | 26/09 |
| K4 | Skill sinh test case qua CLI | Nhận đầu vào là tài liệu thiết kế, ra theo template team | DevOps | 03/10 |
| R1 | Báo cáo triển khai một trang | Tỷ lệ đạt bốn điều kiện hai team, việc chưa xong, số ban đầu | DevOps | 31/10 |
| R2 | Báo cáo đánh giá hai trang | Bốn chiều so với số nền, quyết định từng use case, việc ở lõi | DevOps | 12/2026 |
| R3 | Trang use case chuẩn | Một trang mỗi use case đạt, đủ để team khác dùng | DevOps | 12/2026 |
| R4 | Playbook v1 | Quy trình bốn việc, checklist, prompt template, governance, cách dựng khu vực team | DevOps; dàn ý 31/10 | 12/2026 |
| R5 | Case study | Thành công, thất bại, số liệu, cho chia sẻ nội bộ | **Phối hợp**: DevOps viết | Team dự án góp số liệu; đầu 2027 |

## 2. Việc phải làm

Cột Đầu ra trỏ mã artifact ở mục 1.

### A. Quyết định và chính sách

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| A1 | Duyệt phạm vi: bốn use case dev là lõi, role khác chỉ ý tưởng | Phía khách *(xác nhận)* | DevOps đề xuất | 12/09 | Phạm vi chốt |
| A2 | Xác nhận gói Rovo, bật xem usage trong Atlassian admin | Phía khách *(xác nhận)* | DevOps | 19/09 | Số usage ban đầu vào M8 |
| A3 | Cấp Kiro Pro hoặc Pro+ cho thành viên hai team theo danh sách | Phía khách *(xác nhận)* | Team dự án lập danh sách | 19/09 | Mọi người có seat |
| A4 | Cho phép dùng artifact của dự án làm hands-on, phạm vi và điều kiện | Phía khách | PL đề xuất | 26/09 | Điều kiện ghi vào M2, T2 |
| A5 | Chấp nhận output có AI tham gia trong deliverable nộp khách, với người duyệt | Phía khách | DevOps soạn điều kiện | 03/10 | Quy tắc duyệt trong M2 |
| A6 | Quyết định đường Slack: MCP chính thức, CLI cookie, hay không | Phía khách *(xác nhận)* | DevOps | 03/10 | Ghi vào M3; mặc định là không |
| A7 | Lộ trình bật MCP trong Kiro | Phía khách *(xác nhận)* | DevOps | Khi có | Không đổi lịch đợt này |

### B. Nền kỹ thuật

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| B1 | Chuẩn hoá CLI Jira/Confluence | DevOps | | 19/09 | K1 |
| B2 | Dựng bản Kiro đầy đủ của kit | DevOps | | 19/09 | K2 |
| B3 | Viết định hướng lõi và khu vực team | DevOps | | 26/09 | K3 |
| B4 | Chuyển skill sinh test case sang CLI, đầu vào là tài liệu thiết kế | DevOps | | 03/10 | K4 |
| B5 | Bật cách đo: MK Observe trên máy hai team, usage Rovo | DevOps | Champion | 10/10 | Số chảy vào M8 |

### C. Khảo sát team

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| C1 | Cử một đến hai champion mỗi team; báo pha hiện tại, tuần bàn giao, danh sách role | Team dự án | DevOps | 12/09 | Đầu vào T1 |
| C2 | Gom artifact mẫu và template khách cho bốn việc | Team dự án | DevOps đưa danh sách | 19/09 | T2 |
| C3 | Gom rule hiện hành | Team dự án | | 19/09 | T3 |
| C4 | Đo số nền | Team dự án | DevOps đưa mẫu | 19/09 | T4 |
| C5 | Viết hồ sơ team, PL xác nhận | DevOps | PL | 19/09 | T1 |

### D. Tuỳ biến kit và chạy thử bốn việc

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| D1 | Dựng khu vực team A v0.1 từ T2, T3 | DevOps | Champion A | 26/09 | T5 của A |
| D2 | Chạy thử bốn việc trên task thật của team A, ghi khoảng cách | DevOps | Champion A ký | 26/09 | Bốn output đầu; đầu vào cho M4 |
| D3 | Dựng khu vực team B v0.1 từ bản của A | DevOps | Champion B | 03/10 | T5 của B |
| D4 | Chạy thử bốn việc trên task thật của team B | DevOps | Champion B ký | 03/10 | Bốn output; đầu vào cho M4 của B |
| D5 | Sửa khu vực team theo phản hồi áp dụng, ra v0.2, chuyển quyền giữ cho champion | Champion | DevOps review | 31/10 | T5 v0.2 |

### E. Soạn và bàn giao material

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| E1 | Dựng cây material chung và trang gốc cho từng team; hướng dẫn cài đặt | DevOps | Champion điền phần của team | 26/09 khung, 03/10 đủ link | M0, M3 |
| E2 | Soạn buổi mở đầu | DevOps | | 03/10 | M1 |
| E3 | Soạn governance guide từ A4, A5, A6 | DevOps | Phía khách ban hành | 03/10 | M2 |
| E4 | Viết bốn module hands-on trên artifact của từng team | DevOps | Champion cung cấp artifact, chạy thử | 03/10 cho A, 10/10 cho B | M4 |
| E5 | Viết bảng ý tưởng role ngoài dev | DevOps | | 10/10 | M6 |
| E6 | Làm mẫu checklist "đã triển khai" và bảng theo dõi | DevOps | | 03/10 | M7, M8 |
| E7 | Dựng trang nơi hỏi, giờ office hours | DevOps | Champion giữ | 03/10 | M9 |
| E8 | **Bàn giao** cây material cho champion: đi hết M0 đến M9 trên máy champion, mọi link mở được, bài hands-on chạy được | DevOps | Champion xác nhận | 03/10 cho A, 10/10 cho B | M0 được champion xác nhận |
| E9 | Viết năm prompt template từ hands-on và output đã duyệt | DevOps | Champion góp T8 | 24/10 | M5 |
| E10 | Dàn ý playbook | DevOps | | 31/10 | R4 dàn ý |

### F. Triển khai và áp dụng

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| F1 | Dành nửa ngày cho toàn team trong tuần triển khai | Team dự án | DevOps dạy theo M1, M4 | 06–10/10 A, 13–17/10 B | Lịch buổi |
| F2 | Kiểm tra máy từng người theo M3 | Champion | DevOps hỗ trợ | Tuần triển khai | Danh sách máy đạt |
| F3 | Kiểm bốn điều kiện theo M7, PL ký | PL | Champion | 10/10 A, 17/10 B | T7 |
| F4 | Chọn task thật cho từng việc | PL | | Từ 13/10 | T6 |
| F5 | Office hours hai lần mỗi tuần; buổi 30 phút mỗi tuần xem lại output có AI | Champion | DevOps dự | Từ 13/10 | Ghi chú vào T7; output vào T8 |
| F6 | Dạy bù người vắng theo M4 | Champion | DevOps | 20–24/10 | T7 đủ 100% |

### G. Theo dõi, đánh giá, chuẩn hoá

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| G1 | Cập nhật bảng theo dõi hằng tuần | DevOps | Champion cấp số output | Từ 13/10 | M8 |
| G2 | Báo cáo triển khai tại mốc | DevOps | PL xác nhận | 31/10 | R1 |
| G3 | Đánh giá sau bốn tuần áp dụng | DevOps | PL, champion | 12/2026 | R2 |
| G4 | Đưa use case đạt lên Confluence; đóng góp phần dùng chung ngược lên lõi MK | DevOps | | 12/2026 | R3; lõi phiên bản mới |
| G5 | Playbook v1 và case study | DevOps | Team dự án góp số liệu | 12/2026, đầu 2027 | R4, R5 |

## 3. Tóm tắt theo bên

| Bên | Artifact là chủ | Việc là PIC | Nặng nhất |
|---|---|---|---|
| DevOps | M0 đến M9 trừ phần của team; K1 đến K4; R1 đến R5 | 27 | D1 đến D4 và E4: tuỳ biến, chạy thử và viết module trên artifact của hai team |
| Team dự án | T2, T3, T4, T6, T7, T8; T5 từ v0.2 | 11 | C2 artifact mẫu và T4 số nền trước 19/09; F1 nửa ngày; F4 task thật |
| Phía khách | Ban hành M2 | 7 | A4 và A5 trước 03/10 |
| Phối hợp | M4, M5, M9, T1, T5 v0.1, R5 | | M4: không có artifact của team thì không có module |

**Câu hỏi mở**

- Các việc A1 đến A3, A6, A7 đúng là phía khách quyết, hay lãnh đạo phía offshore? Xác nhận trước khi gửi bảng này đi.
- Champion có được tính giờ không? Nếu không, F5, F6 và việc giữ T5, M9 khó bền.
- Cây material đặt trong space của DevOps hay space của từng team? Ảnh hưởng đến quyền sửa và include trang chung.
