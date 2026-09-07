# LLM Feature Evaluation

> **Chưa viết.** File giữ chỗ, tạo 2026-09-07.
>
> **Phục vụ:** mục tiêu 2; dùng lại được cho mục tiêu 1 khi đánh giá skill sinh code hoặc test.
> **Người đọc:** người nghiệm thu một tính năng LLM trước khi ship; QA của dự án có tính năng AI.
> **Trả lời:** vì sao test truyền thống không đủ; xây bộ eval từ dữ liệu thật ẩn danh; tiêu chí theo loại tính năng (trích xuất, tóm tắt, hỏi đáp có trích dẫn, sinh code, agent nhiều bước); chấm bằng luật, bằng model, bằng người và khi nào dùng cái nào; đo trước và sau mỗi lần đổi prompt hoặc model; ngưỡng đủ tốt và cách trình bày cho khách.
> **Rút từ:** verify layer và AST validation của my-db-mate, error classification của scan-to-ebook, guardrail của my-dandori trong [Portfolio](../00-foundations/ai-experience-portfolio.md); rà soát transcript và phân loại sai lệch trong [Operations and the Improvement Loop](../01-ai-ready-enterprise/engineering/06-operations-and-improvement-loop.md); bốn chiều điểm của [MK Observe](../02-ai-in-sdlc/05-mk-observe-agent-metrics.md#4-đọc-số-liệu) như ví dụ đo agent.
> **Khi viết:** kèm một bộ eval mẫu nhỏ (10 đến 20 ca) cho một mẫu giải pháp trong catalogue.
