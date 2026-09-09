# Work Items and PIC

Cập nhật 2026-09-09. Đọc trước [Direction and Scope](01-direction-and-scope.md) và [Four Core Use Cases](02-four-core-use-cases.md). Việc chia theo bảy luồng A đến G. **PIC** là bên chịu trách nhiệm ra kết quả; **Phối hợp** là bên phải góp phần. Ba bên:

- **DevOps**: team DevOps, chủ task.
- **Team dự án**: PL, champion và thành viên của mỗi team pilot.
- **Phía khách**: người có quyền về công cụ, chính sách và artifact của dự án. Việc nào PIC là phía khách mà chưa chắc đúng người thì đánh dấu *(xác nhận)*.

Tuần ghi theo [Rollout Roadmap](04-rollout-roadmap.md).

## A. Quyết định và chính sách

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| A1 | Duyệt phạm vi: bốn use case dev là lõi, role khác chỉ ý tưởng | Phía khách *(xác nhận)* | DevOps đề xuất | 12/09 | Phạm vi được chốt |
| A2 | Xác nhận gói Rovo, bật xem usage trong Atlassian admin | Phía khách *(xác nhận)* | DevOps | 19/09 | Gói và số usage ban đầu |
| A3 | Cấp Kiro Pro hoặc Pro+ cho thành viên hai team theo danh sách | Phía khách *(xác nhận)* | Team dự án lập danh sách | 19/09 | Mọi người có seat |
| A4 | Cho phép dùng artifact của dự án làm hands-on, phạm vi và điều kiện | Phía khách | PL đề xuất | 26/09 | Văn bản cho phép hoặc danh sách artifact được dùng |
| A5 | Chấp nhận output có AI tham gia trong deliverable nộp khách, với điều kiện người duyệt | Phía khách | DevOps soạn điều kiện | 03/10 | Quy tắc duyệt |
| A6 | Quyết định đường Slack: MCP chính thức, CLI cookie, hay không | Phía khách *(xác nhận)* | DevOps | 03/10 | Quyết định; mặc định là không |
| A7 | Lộ trình bật MCP trong Kiro | Phía khách *(xác nhận)* | DevOps | Khi có | Không đổi lịch đợt này |

## B. Nền kỹ thuật

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| B1 | Chuẩn hoá CLI Jira/Confluence: cùng envelope JSON với skill MK, `--dry-run`, bản xem trước cho lệnh ghi | DevOps | | 19/09 | CLI v1, hướng dẫn cài |
| B2 | Dựng bản Kiro đầy đủ của kit, có wrapper cho workflow skill | DevOps | | 19/09 | Bản Kiro của kit chạy trên máy DevOps |
| B3 | Viết định hướng lõi và khu vực team của MK: cái gì nằm đâu, ai giữ, skill tìm khuôn thế nào | DevOps | | 26/09 | Một trang định hướng; **chưa sửa kit** |
| B4 | Chuyển skill sinh test case sang gọi CLI và nhận đầu vào là tài liệu thiết kế | DevOps | | 03/10 | Skill chạy thử trên artifact team A |
| B5 | Chuẩn bị cách đo: MK Observe cho Kiro, usage Rovo, mẫu bảng theo dõi một trang | DevOps | | 10/10 | Bảng theo dõi trống, sẵn sàng điền |

## C. Khảo sát team

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| C1 | Cử một đến hai champion mỗi team; báo pha hiện tại, tuần bàn giao, danh sách role | Team dự án | DevOps | 12/09 | Tên champion, lịch pha |
| C2 | Cung cấp artifact mẫu cho bốn việc: ba mẫu mỗi loại thiết kế chi tiết, đặc tả test, module code đã qua review, mã test; kèm template khách | Team dự án | DevOps liệt kê cần gì | 19/09 | Kho artifact |
| C3 | Cung cấp coding standard, review checklist, quy tắc tài liệu, framework test | Team dự án | | 19/09 | Bộ rule hiện hành |
| C4 | Đo số nền: giờ làm một thiết kế, một bộ test case, một hạng mục code, một bộ unit test; lỗi review gần nhất | Team dự án | DevOps đưa mẫu | 19/09 | Số nền trong hồ sơ team |
| C5 | Viết hồ sơ team một trang, PL xác nhận | DevOps | PL | 19/09 | Hồ sơ team A, B |

## D. Tuỳ biến kit và chạy thử bốn việc

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| D1 | Khu vực team A v0.1: ngữ cảnh dự án, rule, template bốn đầu ra, cấu hình | DevOps | Champion A | 26/09 | Khu vực team A trong repo team |
| D2 | Chạy thử bốn việc trên task thật của team A: thiết kế, test case, code, unit test | DevOps | Champion A ký | 26/09 | Bốn output đầu tiên, ghi nhận khoảng cách |
| D3 | Khu vực team B v0.1 từ bản của A | DevOps | Champion B | 03/10 | Khu vực team B |
| D4 | Chạy thử bốn việc trên task thật của team B | DevOps | Champion B ký | 03/10 | Bốn output, ghi nhận khoảng cách |
| D5 | Sửa khu vực team theo phản hồi trong áp dụng, ra v0.2 | Champion | DevOps | 31/10 | v0.2 mỗi team |

## E. Tài liệu đào tạo

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| E1 | Buổi mở đầu chung 60 phút: mindset, governance, nơi hỏi | DevOps | | 03/10 | Bộ slide và bài nói |
| E2 | Bốn module hands-on 90 phút trên artifact thật: dev lead sinh thiết kế; tester sinh test case; dev sinh code; dev sinh unit test | DevOps | Champion chạy thử | 03/10 cho A, 10/10 cho B | Bốn module mỗi team |
| E3 | Governance guide: dữ liệu vào, dữ liệu không vào, tool được phép, quy tắc bảo mật | DevOps soạn | Phía khách ban hành | 03/10 | Trang Confluence |
| E4 | Bảng ý tưởng cho role ngoài dev | DevOps | | 10/10 | Trang Confluence |
| E5 | Năm prompt template: bốn từ bốn việc dev, một cho Rovo | DevOps | Champion góp ví dụ đã duyệt | 24/10 | Năm trang template kèm output mẫu |
| E6 | Dàn ý playbook | DevOps | | 31/10 | Dàn ý; bản đầy đủ tháng 12 |

## F. Triển khai và áp dụng

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| F1 | Dành nửa ngày cho toàn team trong tuần triển khai | Team dự án | DevOps dạy | 06–10/10 A, 13–17/10 B | Lịch buổi |
| F2 | Kiểm tra máy từng người: Kiro với khu vực team, CLI với token, Rovo | Champion | DevOps hỗ trợ | Tuần triển khai | Danh sách máy đạt |
| F3 | Kiểm bốn điều kiện "đã triển khai", PL ký danh sách hoặc ngoại lệ | PL | Champion | 10/10 A, 17/10 B | Danh sách ký |
| F4 | Chọn task thật cho từng việc trong bốn tuần áp dụng | PL | | Từ 13/10 | Danh sách task |
| F5 | Office hours hai lần mỗi tuần; buổi 30 phút mỗi tuần xem lại output có AI | Champion | DevOps dự | Từ 13/10 | Ghi chú phản hồi |
| F6 | Dạy bù người vắng | Champion | DevOps | 20–24/10 | 100% đạt |

## G. Theo dõi, đánh giá, chuẩn hoá

| # | Việc | PIC | Phối hợp | Khi | Đầu ra |
|---|---|---|---|---|---|
| G1 | Cập nhật bảng theo dõi hằng tuần: mức dùng, output được duyệt, công sức, chất lượng | DevOps | Champion cấp số output | Từ 13/10 | Bảng một trang |
| G2 | Báo cáo triển khai một trang tại mốc | DevOps | PL xác nhận | 31/10 | Báo cáo |
| G3 | Đánh giá sau bốn tuần áp dụng: từng use case chuẩn hoá, sửa, hay dừng | DevOps | PL, champion | 12/2026 | Báo cáo đánh giá hai trang |
| G4 | Đưa use case đạt lên Confluence làm chuẩn; đóng góp phần dùng chung ngược lên lõi MK | DevOps | | 12/2026 | Trang use case; lõi phiên bản mới |
| G5 | Playbook v1 và case study cho chia sẻ nội bộ | DevOps | Team dự án góp số liệu | 12/2026 và đầu 2027 | Playbook; case study |

## Tóm tắt theo bên

| Bên | Số việc là PIC | Việc nặng nhất |
|---|---|---|
| DevOps | 24 | D1 đến D4: tuỳ biến và chạy thử bốn việc trên hai team |
| Team dự án | 10 | C2 artifact và số nền; F1 nửa ngày; F4 task thật |
| Phía khách | 7 | A4 và A5: cho dùng artifact và chấp nhận output có AI; cả hai phải xong trước 03/10 |

**Câu hỏi mở**

- Các việc A1 đến A3, A6, A7 đúng là phía khách quyết, hay lãnh đạo phía offshore? Cần xác nhận trước khi gửi bảng này đi.
- Champion có được tính giờ cho việc này không? Nếu không, F5 và F6 khó giữ.
