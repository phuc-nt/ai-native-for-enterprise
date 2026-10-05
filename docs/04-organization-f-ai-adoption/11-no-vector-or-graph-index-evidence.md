# No Vector or Graph Index for Project Code and Documents

Cập nhật 2026-10-05. Bản nháp, chưa duyệt.

Tài liệu này gom bằng chứng bên ngoài cho một luận điểm trong [Knowledge Platform Design Review](10-knowledge-platform-design-review.md): các cụm C1 đến C4 (embedding và graph cho code, cho tài liệu) không nên làm ở giai đoạn đầu.

## 1. Luận điểm

Với code và tài liệu của một dự án, coding agent hiện nay tự tìm context bằng **agentic search** (grep, glob, đọc file, gọi thẳng wiki và ticket, lặp nhiều vòng) cho kết quả ngang hoặc tốt hơn **RAG trên vector DB**, và không cần **knowledge graph** dựng sẵn. Vì vậy không nên dựng vector DB và graph DB trước khi có số đo cho thấy agentic search không đủ.

Luận điểm này **không** nói:

- Semantic search vô dụng. Có bằng chứng nó giúp thêm trên codebase lớn (mục 4).
- Graph vô dụng. Nó vẫn có lợi cho multi-hop reasoning (mục 4).
- Retrieval không quan trọng. Nó chỉ đổi chỗ: từ pipeline dựng sẵn sang tool do agent tự gọi.

## 2. Bằng chứng ủng hộ

| # | Nguồn | Loại | Nội dung | Giới hạn |
|---|---|---|---|---|
| 1 | Claude Code (Anthropic), phát biểu của người phát triển, 2025 | Kinh nghiệm sản phẩm | Bản đầu dùng RAG; thử nghiệm nội bộ cho thấy "agentic search out-performed RAG for the kinds of things people use Code for", nên bỏ index | Không công bố số liệu |
| 2 | Anthropic, *Building agents with the Claude Agent SDK*, 2025-09 | Hướng dẫn chính thức | Khuyên "starting with agentic search, and only adding semantic search if you need faster results". Semantic search nhanh hơn nhưng "less accurate, more difficult to maintain, and less transparent" | Khuyến nghị, không phải benchmark |
| 3 | Cline, *Why Cline Doesn't Index Your Codebase*, 2025-05 | Quyết định thiết kế sản phẩm | Ba lý do: chunking cắt vụn logic của code; index là snapshot nên luôn stale; embedding là một bản sao thứ hai của source phải bảo vệ | Lập luận của vendor, không có số đo |
| 4 | Amazon Science, *Keyword search is all you need*, arXiv 2602.23368 | Paper | Agent chỉ có keyword search tool, không vector DB, đạt trung bình trên 90% chỉ số của RAG truyền thống trên bộ tài liệu văn bản | Tài liệu là PDF tiếng Anh; paper tự nêu giới hạn với tài liệu lớn và câu hỏi mơ hồ |
| 5 | SWE-Explore, arXiv 2606.07297 | Benchmark, 848 issue, 10 ngôn ngữ, 203 repo | "Agentic explorers form a clear tier above classical retrieval" khi tìm vùng code liên quan tới một issue | Repo open source; chưa đo trên codebase doanh nghiệp |
| 6 | SWE-bench leaderboard | Quan sát | Baseline đầu tiên của benchmark là RAG; các hệ thống dẫn đầu hiện nay là agent dùng tool để duyệt repo | Quan sát, không phải thí nghiệm có đối chứng |
| 7 | *Do We Still Need GraphRAG?*, arXiv 2604.09666 | Benchmark | Agentic search "substantially improves dense RAG and narrows the performance gap to GraphRAG" | Cùng paper kết luận GraphRAG vẫn hơn ở multi-hop phức tạp |
| 8 | *When to use Graphs in RAG* (GraphRAG-Bench), arXiv 2506.05690 | Benchmark | "GraphRAG frequently underperforms vanilla RAG on many real-world tasks" | So graph với vector, không so với agentic search |
| 9 | *RAG vs. GraphRAG: A Systematic Evaluation*, arXiv 2502.11371 | Benchmark | Hai cách mạnh ở hai loại câu hỏi khác nhau; graph không thắng toàn diện và tốn thêm chi phí dựng | Như trên |
| 10 | Letta, *Is a Filesystem All You Need?*, 2025-08 | Benchmark của vendor | Agent với file tool đạt 74.0% trên LoCoMo, cao hơn mức 68.5% được công bố của một memory system dùng graph | Bài toán là agent memory, không phải tài liệu dự án; agent này có cả semantic search tool |

Mức độ tin cậy: mục 4, 5, 7, 8, 9 là paper có phương pháp công khai. Mục 1, 2, 3, 10 là phát biểu của vendor, có lợi ích riêng. Mục 6 là quan sát.

## 3. Vì sao kết quả lại như vậy

### Cấu trúc đã có sẵn trong nguồn

Lý do gốc: code và tài liệu dự án đã mang sẵn cấu trúc liên kết, và agent đi theo được cấu trúc đó trực tiếp. Vector DB và graph DB dựng lại cấu trúc ấy trong một kho thứ hai, kém chính xác hơn và trễ hơn bản gốc.

| Nguồn | Cấu trúc sẵn có | Do ai tạo | Agent đi theo bằng | Chỗ cấu trúc sẵn có không phủ |
|---|---|---|---|---|
| Code | import, call, kế thừa, type | Người viết code; compiler kiểm tra | grep, đọc file, language server (go to definition, find references) | Liên kết ngầm: gọi qua HTTP hoặc queue, tên bảng trong SQL string, config, batch job |
| Tài liệu dự án | Layer (yêu cầu, basic design, detail design), parent-child, reference link, traceability ID | Người viết tài liệu, có chủ đích | Page tree và link của wiki, grep theo ID | Tài liệu không theo chuẩn: nằm trong bảng tính, link bằng tên file, không có ID |
| Wiki và ticket | Search index và quan hệ do platform tự duy trì | Vendor | Agent tích hợp sẵn của platform, hoặc MCP và CLI | Nội dung nằm ngoài platform |

Ba hệ quả:

- **Code graph dựng từ AST là bản sao kém hơn bản gốc.** Language server có type information, AST thì không; language server đọc working tree, graph DB chỉ biết bản đã index.
- **Graph do LLM rút từ tài liệu là suy đoán.** Link và ID do người viết đặt là chủ đích. Bản suy đoán không lặp lại được và khó kiểm tra đúng sai.
- **Index vẫn có ích, nhưng không cần tự dựng.** Agent tích hợp sẵn của wiki platform cũng chạy trên search index và graph riêng. Khác biệt là vendor vận hành nó, nó nằm ngay trên nguồn gốc và giữ đúng quyền của từng người.

Cột cuối của bảng là giới hạn của lập luận này. Với liên kết ngầm trong code, cả code graph dựng từ AST lẫn grep đều yếu. Với tài liệu không theo chuẩn, việc đáng làm là sửa nguồn (chuyển sang Markdown, đặt traceability ID, thêm link), vì index dựng trên nguồn lộn xộn thì thừa hưởng sự lộn xộn đó.

### Cơ chế bổ sung

- **Agent lặp được, pipeline thì không.** RAG lấy một lần rồi trả lời. Agent thấy kết quả chưa đủ thì đổi từ khoá, mở file bên cạnh, đi theo import. Nhiều vòng tìm rẻ bù cho độ chính xác của từng vòng.
- **Code và tài liệu thiết kế giàu định danh chính xác.** Tên hàm, tên bảng, mã màn hình, mã yêu cầu khớp bằng grep tốt hơn bằng độ tương đồng ngữ nghĩa.
- **Chunking làm mất cấu trúc.** Một hàm và nơi gọi nó, một bảng và phần mô tả của nó rơi vào các chunk khác nhau.
- **Index luôn trễ.** Agent đọc working tree đang sửa; index chỉ biết bản đã push và đã chạy pipeline.
- **Quyền truy cập.** Gọi thẳng nguồn thì dùng quyền của người gọi. Đưa vào kho chung thì phải sao chép ACL, sai là lộ dữ liệu giữa các dự án.
- **Graph tốn nhất ở khâu dựng.** Rút entity và relation bằng LLM tốn token, không lặp lại được, và phải dựng lại khi nguồn đổi.

## 4. Bằng chứng ngược chiều

| Nguồn | Nội dung | Ảnh hưởng tới luận điểm |
|---|---|---|
| Cursor, *Improving agent with semantic search*, 2025-11 | Thêm semantic search bên cạnh grep tăng độ chính xác trả lời trung bình 12.5% trên bộ đánh giá nội bộ; code retention tăng 0.3%, và 2.6% trên codebase từ 1,000 file. Kết luận của họ: semantic search "is currently necessary to achieve the best results, especially in large codebases" | Đáng kể. Nhưng kết quả dùng embedding model tự train trên trace của agent, không phải model đa dụng; và là bổ sung cho grep, không thay grep |
| arXiv 2604.09666 (mục 7 ở trên) | GraphRAG vẫn có lợi cho multi-hop reasoning phức tạp khi chi phí dựng được khấu hao | Graph có chỗ đứng nếu câu hỏi multi-hop chiếm phần lớn và nguồn ít đổi |
| arXiv 2602.23368 (mục 4 ở trên) | Keyword search yếu với câu hỏi mơ hồ và tài liệu rất lớn | Tài liệu dùng từ ngữ không thống nhất thì grep hụt |

Đọc chung hai phía: agentic search là điểm xuất phát đúng; semantic search là lớp bổ sung có lợi ích đo được ở quy mô lớn; graph chỉ đáng dựng cho một nhóm câu hỏi multi-hop đã xác định.

## 5. Chỗ chưa có bằng chứng

- **Tài liệu thiết kế dạng bảng tính và văn bản văn phòng, không phải tiếng Anh.** Không nguồn nào ở trên đo trường hợp này. Giả định của bản review là sau khi chuyển sang Markdown thì chúng hành xử như văn bản thường; cần đo.
- **Code graph so với agentic search.** Các benchmark về graph ở trên đo trên văn bản, không phải code. Chưa tìm được phép so trực tiếp giữa code graph dựng từ AST và agent có language server.
- **Phân tích ảnh hưởng xuyên repo và liên kết ngầm** (HTTP, queue, SQL string, config). Chưa có số đo cho cả hai phía.
- **Mức độ tài liệu hiện có theo chuẩn.** Lập luận "cấu trúc đã có sẵn" chỉ đúng tới mức tài liệu thật sự có layer, link và ID. Chưa khảo sát.
- **Chi phí.** Agentic search đổi chi phí hạ tầng lấy chi phí token mỗi phiên. Chi phí vận hành kho (pipeline, đồng bộ quyền, re-index, token cho enrichment) rõ về loại nhưng chưa có con số. Điểm hoà vốn chưa ai tính cho bối cảnh này.

Năm điểm này là lý do mục 5 của bản review đề nghị thử 20 đến 30 câu hỏi thật trước khi quyết.

## 6. Khi nào nên dựng index

| Dấu hiệu đo được | Thứ nên thêm |
|---|---|
| Agent hụt ở câu hỏi mô tả bằng khái niệm, không có định danh để grep | Semantic search bổ sung cho grep, trên một relational database có vector extension |
| Codebase quá lớn để clone, hoặc agent tốn nhiều vòng mới định vị được file | Code search index tập trung |
| Một nhóm câu hỏi multi-hop cụ thể lặp lại và agent trả lời sai ổn định | Graph cho riêng nhóm đó, dựng bằng công cụ tất định (compiler, language server), không rút bằng LLM |

## Nguồn

- Hacker News, phát biểu của người phát triển Claude Code: <https://news.ycombinator.com/item?id=43164253>
- Anthropic, Building agents with the Claude Agent SDK: <https://claude.com/blog/building-agents-with-the-claude-agent-sdk>
- Cline, Why Cline Doesn't Index Your Codebase: <https://cline.bot/blog/why-cline-doesnt-index-your-codebase-and-why-thats-a-good-thing>
- Keyword search is all you need: <https://arxiv.org/abs/2602.23368>
- SWE-Explore: <https://arxiv.org/abs/2606.07297>
- Do We Still Need GraphRAG?: <https://arxiv.org/abs/2604.09666>
- When to use Graphs in RAG: <https://arxiv.org/abs/2506.05690>
- RAG vs. GraphRAG: <https://arxiv.org/abs/2502.11371>
- Letta, Benchmarking AI Agent Memory: <https://www.letta.com/blog/benchmarking-ai-agent-memory/>
- Cursor, Improving agent with semantic search: <https://cursor.com/blog/semsearch>
