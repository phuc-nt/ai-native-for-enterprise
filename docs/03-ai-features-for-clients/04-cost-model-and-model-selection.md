# Cost Model and Model Selection

> **Chưa viết.** File giữ chỗ, tạo 2026-09-07.
>
> **Phục vụ:** mục tiêu 2; phần token và bảng giá dùng chung với mục tiêu 1.
> **Người đọc:** người viết proposal phải trả lời "tốn bao nhiêu"; tech lead chọn model cho tính năng.
> **Trả lời:** công thức ước tính chi phí một tính năng từ số lượt, token vào ra, tỷ lệ cache; chọn model theo bậc (nhẹ cho phân loại và trích xuất, mạnh cho suy luận) và routing đo được; gọi trực tiếp, qua gateway, hay qua Bedrock và ảnh hưởng tới chi phí, dữ liệu, hợp đồng; ngân sách nhiều lớp và ước giá trước khi chạy; theo dõi chi phí khi vận hành. Bảng giá không nằm trong tài liệu, chỉ có công thức và chỗ điền.
> **Rút từ:** budget ba lớp và routing funnel trong [Portfolio, mục 9](../00-foundations/ai-experience-portfolio.md#9-chủ-đề-xuyên-suốt--triết-lý-kỹ-thuật); token theo model và công thức chi phí trong [MK Observe, mục 4](../02-ai-in-sdlc/05-mk-observe-agent-metrics.md#4-đọc-số-liệu); lựa chọn harness và provider trong [Harness and Frontends](../01-ai-ready-enterprise/engineering/02-harness-and-frontends.md).
> **Khi viết:** một bảng tính mẫu đi kèm, tài liệu chỉ giải thích cột.
