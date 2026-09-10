# Work Sequence and Dependencies

Cập nhật 2026-09-09. Đọc trước [MK Kit and Existing Guides](03-mk-kit-and-existing-guides.md).

Tài liệu này không đặt ngày. Nó cho thấy **thứ tự việc, ai chờ ai, cần input gì, ra output gì**. Ba bên:

- **DevOps**: định hướng, dựng công cụ, soạn material, đào tạo.
- **Phía khách**: cấp license tool AI cho team dự án, ra quyết định chính sách. Team DevOps đã có license sẵn để research và soạn material.
- **Team dự án**: cung cấp bối cảnh và artifact thật, cử người, áp dụng.

Chỗ chưa chắc đúng người đánh dấu *(xác nhận)*.

## Chặng 1 — Chốt nền

Không có chặng này thì mọi việc sau đều đoán mò.

| Việc | PIC | Cần input | Ra output | Chờ ai |
|---|---|---|---|---|
| Duyệt phạm vi: bốn việc dev là lõi, role khác chỉ đề xuất | Phía khách *(xác nhận)* | Tài liệu [01](01-context-and-direction.md), [02](02-roles-and-tooling.md) | Phạm vi chốt | — |
| **Cấp license Kiro cho thành viên team dự án** | Phía khách | Danh sách thành viên từ team dự án | Mọi người đăng nhập được | Danh sách team |
| **Cấp license Rovo cho thành viên team dự án** | Phía khách | Danh sách thành viên, quyết định cấp cho role nào | Mọi người dùng được Rovo trong Jira/Confluence | Danh sách team |
| Xác nhận M365 Copilot đã cấp tới role nào, và chính sách dùng nội dung họp với khách | Phía khách *(xác nhận)* | Matrix ở [02](02-roles-and-tooling.md) mục 3 | Biết cắt phần nào của matrix; điều kiện dùng transcript họp | — |
| Chọn team pilot và cử người phụ trách mỗi team | Team dự án | Phạm vi chốt | Tên người phụ trách, pha hiện tại của dự án | Phạm vi chốt |
| Quyết cho phép dùng artifact thật của dự án làm bài tập | Phía khách | Đề xuất điều kiện từ DevOps | Điều kiện thành văn | — |

DevOps làm song song, không chờ: chuẩn hoá CLI nối Jira/Confluence, dựng bản Kiro đầy đủ của kit, viết định hướng lõi và khu vực team.

## Chặng 2 — Khảo sát team

DevOps chờ team dự án ở chặng này. Thiếu artifact mẫu thì không tuỳ biến được kit, và mọi thứ sau đều lùi.

| Việc | PIC | Cần input | Ra output |
|---|---|---|---|
| Gom artifact mẫu đã duyệt cho bốn việc: thiết kế, tài liệu API, đặc tả test, code, unit test | Team dự án | Danh sách cần gì, do DevOps đưa | Kho mẫu và template khách của từng loại |
| Gom rule hiện hành: coding standard, quy tắc review, quy ước tài liệu, framework test, ngưỡng coverage | Team dự án | — | Bộ rule của team |
| Đo số nền: giờ làm một tài liệu thiết kế, một bộ test case, một hạng mục code, một bộ unit test | Team dự án | Mẫu điền do DevOps đưa | Số trước khi có AI, để sau này so |
| Viết hồ sơ team một trang: pha hiện tại, role và số người, việc tốn thời gian nhất | DevOps | Buổi khảo sát với team | Hồ sơ được người phụ trách xác nhận |
| Rà guide Confluence đã có, tách phần cài đặt / prompt / quy ước đầu ra | DevOps | Trang guide hiện có | Danh sách phần sẽ chuyển thành skill, theo [03](03-mk-kit-and-existing-guides.md) mục 3 |

## Chặng 3 — Dựng công cụ

Toàn bộ do DevOps làm, chờ đầu ra chặng 2.

| Việc | Cần input | Ra output |
|---|---|---|
| Dựng khu vực riêng cho từng team: ngữ cảnh, rule, template bốn đầu ra | Kho mẫu, bộ rule của team | Khu vực team bản đầu |
| Hợp nhất prompt trong guide cũ vào skill tương ứng | Phần prompt đã tách ở chặng 2 | Skill sinh unit test và sinh test case có ruột từ guide |
| Bổ khoảng cách của bốn việc: khuôn thiết kế, đổi đầu vào test case sang tài liệu thiết kế, chế độ sinh unit test | Đánh giá khoảng cách ở [02](02-roles-and-tooling.md) mục 2 | Bốn việc chạy được đầu cuối |
| Chạy thử bốn việc trên task thật của từng team | Task thật do team chọn | Bốn output đầu tiên; danh sách chỗ còn lệch |
| Rút gọn trang guide cũ thành trang giới thiệu trỏ tới lệnh mới | Skill đã có | Guide cũ không mồ côi |

**Cổng quyết định**: bốn output chạy thử có khớp template của team không. Chưa khớp thì thu hẹp, ưu tiên ba việc còn lại và để việc sinh thiết kế lại sau.

## Chặng 4 — Soạn material

Chạy được rồi mới viết material, để tài liệu tả đúng thứ thật sự hoạt động.

| Material | PIC | Cần input | Ghi chú |
|---|---|---|---|
| Trang gốc cho từng team, gắn link mọi thứ còn lại | DevOps | Toàn bộ mục dưới | Người phụ trách team kiểm tra thứ tự đọc |
| Buổi mở đầu: mindset, governance tóm tắt, cách hỏi | DevOps | Nguyên tắc governance ở [01](01-context-and-direction.md) mục 5 | |
| Hướng dẫn cài đặt và kiểm tra máy | DevOps | Phần cài đặt tách từ guide cũ | Người phụ trách điền đường dẫn repo, tên project của team |
| Bốn module hands-on, mỗi việc một module | DevOps | Artifact thật của team; kết quả chạy thử chặng 3 | Người phụ trách chạy thử trước, xác nhận ra đúng khuôn |
| Governance guide | DevOps soạn, phía khách ban hành | Quyết định chặng 1 | |
| Năm prompt template trở lên | DevOps | Prompt trong skill sau khi chạy thật | Bốn từ bốn việc dev, ít nhất một cho Rovo |
| Bảng đề xuất tool cho role ngoài dev | DevOps | [02](02-roles-and-tooling.md) mục 3 | |
| Checklist coi là đã triển khai, bảng theo dõi | DevOps làm mẫu | Cách đo ở [05](05-rollout-plan.md) | Team dự án điền |
| Trang nơi hỏi: ai hỏi, hỏi ở đâu, giờ hỗ trợ | DevOps dựng, team dự án giữ | | |

**Bàn giao**: đi hết cây material cùng người phụ trách của team, trên máy của họ. Mọi link mở được, bài hands-on chạy được thì mới coi là giao xong.

## Chặng 5 — Rollout và theo dõi

Chi tiết ở [05](05-rollout-plan.md). Tóm tắt thứ tự: team dự án dành nửa ngày cho cả team → kiểm máy từng người → kiểm bốn điều kiện và người phụ trách ký → chọn task thật để áp dụng → hỗ trợ tại chỗ và xem lại output hằng tuần → báo cáo tại mốc → đánh giá và chuẩn hoá use case.

## Ai chờ ai

```
Phía khách: cấp license ──┐
                          ├─▶ Team dự án: cử người, nộp artifact và rule
Team dự án: danh sách  ───┘                    │
                                               ▼
                          DevOps: khu vực team + hợp nhất guide vào skill
                                               │
                                               ▼
                                  Chạy thử bốn việc trên task thật
                                               │
                                               ▼
                                        Soạn material
                                               │
                                               ▼
                                Bàn giao ──▶ Rollout ──▶ Đo và đánh giá
```

Hai chỗ dễ tắc nhất: **license về muộn** thì không ai thực hành được dù material đã xong; **artifact mẫu về muộn** thì mọi thứ phía sau lùi theo, vì đây là đầu vào của cả kit lẫn material.

**Câu hỏi mở**

- Các quyết định chặng 1 do phía khách hay lãnh đạo phía offshore ra? Xác nhận trước khi gửi bảng này đi.
- Người phụ trách mỗi team có được tính giờ cho việc hỗ trợ không? Nếu không thì chặng 5 khó bền.
