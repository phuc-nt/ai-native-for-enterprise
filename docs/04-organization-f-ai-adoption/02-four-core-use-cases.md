# Four Core Use Cases

Cập nhật 2026-09-09. Đọc trước [Direction and Scope](01-direction-and-scope.md). Bốn việc của team dev là lõi của đợt này; role khác ở mục 6 dưới dạng ý tưởng. Skill của MK nêu tên để biết điểm xuất phát; mức sẵn sàng đánh giá từ nội dung skill, chưa chạy trên artifact của team nào nên đều là **[chưa kiểm chứng]** cho tới bước khảo sát.

## 1. Chuỗi bốn việc

```
Thiết kế cơ bản ──▶ [1] Sinh thiết kế chi tiết ──▶ [3] Sinh code ──▶ [4] Sinh unit test
                              │
                              └──▶ [2] Sinh test case
```

Đầu ra của việc trước là đầu vào của việc sau. Khuôn đầu ra phải khớp template của team từ việc đầu, nếu không ba việc sau nhận đầu vào lệch.

## 2. Sinh thiết kế chi tiết

| | |
|---|---|
| Ai | Dev lead, architect |
| Đầu vào thật | Tài liệu yêu cầu, thiết kế cơ bản, code hiện có nếu là dự án đang chạy |
| Đầu ra phải khớp | Thiết kế chi tiết theo template của khách, thường song ngữ, có mục bắt buộc; nếu team có tài liệu API thì gộp vào đây |
| Điểm xuất phát trong MK | `mk-plan` với phần solution-design và codebase-understanding |
| Khoảng cách | **Xa nhất trong bốn việc.** Plan của MK là kế hoạch cho agent triển khai, không phải tài liệu thiết kế nộp khách. Cần khuôn thiết kế của team trong khu vực team và một luồng sinh theo khuôn đó |
| Cần từ team | Ba mẫu thiết kế chi tiết đã được duyệt; danh sách mục bắt buộc; ai duyệt thiết kế |
| Đo | Số chỉ trích ở review thiết kế trên một tài liệu; giờ làm một tài liệu, trước và sau |

## 3. Sinh test case

| | |
|---|---|
| Ai | Tester, QA |
| Đầu vào thật | Thiết kế chi tiết hoặc thiết kế cơ bản; trong waterfall hiếm khi là story Jira |
| Đầu ra phải khớp | Đặc tả test theo template của khách, thường là bảng có cột điều kiện, bước, kết quả mong đợi |
| Điểm xuất phát trong MK | `jira-story-test-case-generation` |
| Khoảng cách | Trung bình. Logic sinh, kỷ luật không bịa số liệu và bước đăng lên Confluence đã có. Phải đổi nguồn vào từ story sang tài liệu thiết kế, và đổi khuôn ra theo template của team |
| Cần từ team | Ba mẫu đặc tả test đã duyệt; quy tắc đặt tên và độ mịn của test case; ai duyệt |
| Đo | Tỷ lệ test case do AI sinh được duyệt trên tổng test case của pha; giờ làm |

## 4. Sinh code

| | |
|---|---|
| Ai | Developer |
| Đầu vào thật | Thiết kế chi tiết, coding standard, code hiện có |
| Đầu ra phải khớp | Code qua review của team theo checklist hiện hành |
| Điểm xuất phát trong MK | `cook` với rule của dự án; `mk-code-review` để tự review trước khi nộp |
| Khoảng cách | **Gần nhất.** Chủ yếu là lớp ngữ cảnh và rule: đưa coding standard, naming, cấu trúc repo, review checklist của team vào khu vực team |
| Cần từ team | Coding standard, review checklist, một module mẫu đã qua review, cách chạy build |
| Đo | Lỗi review trên nghìn dòng; giờ code một hạng mục, trước và sau |

## 5. Sinh unit test

| | |
|---|---|
| Ai | Developer |
| Đầu vào thật | Thiết kế chi tiết, code vừa sinh hoặc code hiện có |
| Đầu ra phải khớp | Mã test chạy được trên framework của team và đặc tả test đơn vị theo template khách, nếu khách yêu cầu tài liệu này |
| Điểm xuất phát trong MK | `test`; sinh test hiện nằm trong quality gate của `cook` |
| Khoảng cách | Trung bình. Skill `test` thiên về chạy và đo coverage. Cần chế độ sinh test theo framework và quy ước của team, và khuôn đặc tả test đơn vị nếu phải nộp |
| Cần từ team | Framework test, cấu trúc thư mục test, ngưỡng coverage, mẫu đặc tả test đơn vị nếu có |
| Đo | Coverage tại gate test đơn vị; tỷ lệ dự án có unit test tự động; giờ viết test |

## 6. Role khác: ý tưởng đề xuất, chưa pilot

| Role | Việc AI đỡ được | Tool | Ghi chú |
|---|---|---|---|
| PM, PL, PMO | Tóm tắt tiến độ từ Jira, nháp báo cáo tuần cho khách | Rovo; sau này `stakeholder-status-update` | Prompt template thứ năm lấy từ đây |
| BA | Rút yêu cầu từ biên bản và bảng hỏi đáp, tìm mâu thuẫn giữa spec | Rovo | Cần thử chất lượng trên tài liệu song ngữ |
| BrSE, comtor | Dịch và soạn tài liệu song ngữ giữ thuật ngữ dự án | Rovo cho tra cứu; Kiro với ngữ cảnh team cho văn bản dài | Chất lượng tiếng Nhật của Rovo chưa có tài liệu, phải đo |
| Tester ngoài sinh test case | Gom lỗi từ nhiều nguồn, nháp báo cáo test | `cross-tracker-bug-triage` khi có CLI | Sau đợt này |
| Architect | Review thiết kế theo checklist, so thiết kế với yêu cầu | Kiro với khuôn review của team | Ứng viên use case thứ năm khi mở rộng |
| Mọi role | Biên bản họp thành việc và ticket | Rovo; sau này `meeting-notes-to-actions` | |

Bảng này đủ để đưa vào tài liệu đào tạo giai đoạn 2 ở dạng "AI làm được gì cho role của bạn"; hands-on cho các role này lập ở đợt sau.

**Câu hỏi mở**

- Team nào có tài liệu API riêng? Quyết định việc 1 có phải ôm thêm khuôn API không.
- Khách có yêu cầu đặc tả test đơn vị dạng tài liệu không, hay chỉ cần mã test và coverage?
