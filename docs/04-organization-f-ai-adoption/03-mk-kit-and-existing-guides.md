# MK Kit and Existing Guides

Cập nhật 2026-09-09. Đọc trước [Roles and Tooling](02-roles-and-tooling.md). Tài liệu này trả lời hai câu: **vì sao dùng MK** thay vì dừng ở prompt instruction, và **hợp nhất guide Confluence đã có vào MK thế nào**.

Giả định của tài liệu: guide Confluence hiện có ở mức **cài đặt Kiro + prompt instruction** cho unit test và test case. Kịch bản hợp nhất ở mục 3 viết cho trường hợp guide đã tồn tại; nếu chưa có trang nào thì bỏ qua bước chuyển đổi và viết thẳng thành skill.

## 1. Ba mức trưởng thành của một hướng dẫn

| Mức | Hình thức | Người dùng nhận được | Vấn đề |
|---|---|---|---|
| 1. Hướng dẫn thao tác | Trang Confluence: cài đặt, dán prompt này | Chạy được một lần | Mỗi người dán một kiểu, kết quả khác nhau |
| 2. Thư viện prompt | Nhiều prompt gom lại, có phân loại | Chọn được prompt hợp việc | Vẫn phải nhớ dùng khi nào, sửa prompt không ai biết |
| 3. Bộ quy trình | Skill gọi bằng lệnh, có bước, có rule, có khuôn đầu ra | Gõ một lệnh, agent đi đúng quy trình | Phải dựng và bảo trì |

Guide hiện có đang ở mức 1. Đích của task là mức 3, vì mục tiêu của tổ chức ghi rõ là **hiểu biết chung và quy trình chuẩn**, không phải "mỗi người biết một mẹo".

## 2. Vì sao dùng MK

MK là bộ quy trình có sẵn từ trước, không phải thứ dựng mới cho tổ chức F. Đưa vào dùng thì được ngay mấy thứ mà tự viết prompt không có:

| MK cho | Cụ thể | Nếu chỉ có prompt instruction |
|---|---|---|
| **Quy trình có bước** | Vòng brainstorm → plan → cook → test → review → ship, mỗi bước một skill có kiểm soát | Người dùng tự nhớ thứ tự, hay nhảy thẳng vào viết code |
| **Rule nạp theo ngữ cảnh** | Coding standard, quy tắc review, quy tắc tài liệu áp tự động | Phải dán lại rule vào từng prompt |
| **Khuôn đầu ra** | Skill mang sẵn khuôn báo cáo, khuôn plan, khuôn test | Mỗi người một định dạng, không tổng hợp được |
| **Chặn việc nguy hiểm** | Hook chặn thao tác rủi ro và rò rỉ dữ liệu | Trông vào ý thức người dùng |
| **Đo được** | MK Observe ghi lại skill nào chạy, bao lâu, bao nhiêu lần | Không có số để báo cáo mức dùng |
| **Sửa một chỗ, lan ra cả team** | Skill là file trong kit, cập nhật rồi phân phối | Sửa trang Confluence xong không ai đọc lại |

Chi phí phải trả: phải dựng khu vực riêng cho từng team và có người bảo trì kit. Đây là lý do [04](04-work-sequence.md) đặt chặng khảo sát trước chặng tuỳ biến.

## 3. Hợp nhất guide đã có vào MK

Prompt instruction trong guide **chính là phần ruột của skill**, nên đây là chuyển đổi, không phải làm lại. Một skill gồm ba phần, guide hiện có đã có sẵn phần giữa:

| Phần của skill | Nội dung | Lấy từ đâu |
|---|---|---|
| Mô tả và điều kiện dùng | Tên lệnh, khi nào gọi | Viết mới, ngắn |
| Các bước và prompt | Agent làm gì theo thứ tự | **Từ prompt instruction trong guide** |
| Khuôn đầu ra và rule | Định dạng kết quả, chuẩn phải theo | Từ template của team, thu ở chặng khảo sát |

Cách làm cho từng trang guide:

1. **Đọc trang guide, tách ba loại nội dung**: phần cài đặt, phần prompt, phần quy ước đầu ra.
2. **Phần cài đặt** không vào skill; gom về một trang cài đặt chung, vì nó là việc làm một lần cho mỗi máy.
3. **Phần prompt** thành các bước trong skill tương ứng. Guide unit test vào skill sinh unit test; guide test case vào skill sinh test case.
4. **Phần quy ước đầu ra** thành khuôn trong khu vực riêng của team, không nhúng cứng vào skill, vì mỗi team một template.
5. **Trang guide cũ không xoá**: rút gọn thành trang giới thiệu, nói rõ giờ gọi bằng lệnh nào và trỏ tới skill. Người đã quen guide cũ vẫn tìm được đường.
6. **Chạy thử trên artifact thật** của team, so kết quả với lúc dán prompt tay. Nếu kém hơn thì giữ lại phần prompt gốc, sửa skill cho khớp.

Kết quả: guide không mất đi, nó trở thành thứ gọi được bằng một lệnh và áp cùng rule cho cả team.

## 4. Lõi dùng chung và khu vực riêng của team

| Phần | Chứa gì | Ai giữ |
|---|---|---|
| **Lõi** | Skill, quy trình, rule chung, hook, cách đo | DevOps, có phiên bản |
| **Khu vực team** | Ngữ cảnh dự án, template đầu ra, coding standard, cấu hình, thuật ngữ | Team dự án, DevOps dựng bản đầu |

Skill tìm khuôn ở khu vực team trước, không thấy mới dùng khuôn mặc định trong lõi. Nhờ vậy hai team dùng chung một quy trình mà vẫn ra đúng định dạng của mình.

**Đợt này chỉ định hình, chưa sửa kit.** Việc sửa kit chờ kết quả khảo sát và một lần duyệt.

**Câu hỏi mở**

- Ai bảo trì lõi MK về lâu dài khi bộ kit vốn là tài sản cá nhân mang vào? Cần thoả thuận rõ trước khi cả tổ chức phụ thuộc vào nó.
- Guide hiện có đã được team nào dùng thật chưa? Nếu rồi thì lấy phản hồi đó làm đầu vào cho skill, đỡ một vòng thử.
