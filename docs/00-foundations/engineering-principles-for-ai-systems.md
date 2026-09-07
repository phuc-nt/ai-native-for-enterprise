# Engineering Principles for AI Systems

> **Chưa viết.** File giữ chỗ, tạo 2026-09-07.
>
> **Phục vụ:** cả hai mục tiêu, nghiêng mục tiêu 2.
> **Người đọc:** người review thiết kế tính năng AI; người viết proposal; tech lead chọn kiến trúc cho kit hoặc cho sản phẩm.
> **Trả lời:** bốn nguyên tắc đã lặp lại trên tám sản phẩm, mỗi nguyên tắc kèm dấu hiệu vi phạm, câu hỏi kiểm tra và ví dụ đã chạy: an toàn bằng kiến trúc không bằng prompt; deterministic ở lõi, LLM ở biên; chi phí là hạng mục kỹ thuật số một; giao diện cho agent là first-class. Bảng đối chiếu nguyên tắc với ba trụ cột và với sáu nguyên tắc bảo mật.
> **Rút từ:** [Portfolio, mục 9](ai-experience-portfolio.md#9-chủ-đề-xuyên-suốt--triết-lý-kỹ-thuật); [Design Patterns](../01-ai-ready-enterprise/engineering/04-design-patterns.md); [Technical Security](../01-ai-ready-enterprise/engineering/05-technical-security.md); hook chặn đường dẫn của kit như ví dụ "an toàn bằng kiến trúc" ở [Kiro + MK Kit, mục 2](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md#2-năm-lý-do-nhìn-từ-phía-quản-lý).
> **Khi viết:** giữ dạng checklist dưới 150 dòng để dùng được trong buổi review.
