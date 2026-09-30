# Script — Chuẩn hoá và kết nối, thay vì xây một AI platform

## Line 1 — Câu hỏi mở màn (Frame 1)

**Delivery:** điềm tĩnh, dừng nhẹ trước câu cuối

    Muốn đưa AI agent vào công việc của cả tổ chức, nên tự xây một platform có harness riêng, hay chuẩn hoá tài sản nội bộ rồi nối vào harness có sẵn? Đề xuất này chọn cách thứ hai.

## Line 2 — Harness đã thành hàng hoá (Frame 2)

**Delivery:** rõ ràng, liệt kê nhanh các tên

    Bối cảnh thứ nhất: harness đã thành hàng hoá. Claude Code, Codex, Gemini CLI, Copilot, Cursor, Kiro, gần như tháng nào cũng ra feature mới. Không đội nội bộ nào đuổi kịp tốc độ đó.

## Line 3 — Ổ cắm chuẩn hoá (Frame 3)

**Delivery:** trung tính, nhấn "chuẩn chung"

    Thứ hai, các ổ cắm đã được chuẩn hoá. MCP nối agent với tool và dữ liệu. Agent Skills đóng gói quy trình. Cuối năm 2025, MCP được chuyển về Linux Foundation, và thành chuẩn chung của cả ngành.

## Line 4 — Hệ quả của chuẩn mở (Frame 4)

**Delivery:** chậm lại ở câu cuối

    Hệ quả là tài sản viết theo các chuẩn này gắn được vào nhiều harness. Muốn sở hữu phần tích hợp, không còn phải sở hữu harness.

## Line 5 — Harness chạy ở mọi nơi (Frame 5)

**Delivery:** liệt kê, đều nhịp

    Thứ ba, cùng một harness chạy được ở mọi nơi: trong IDE, headless trong CI, nhúng qua SDK, hay trên cloud. Tool cá nhân và hệ thống tập trung giờ chỉ khác nhau ở cách triển khai.

## Line 6 — Tín hiệu từ MIT (Frame 6)

**Delivery:** khách quan, nhấn các con số

    Còn doanh nghiệp thì vẫn khó ra kết quả. Báo cáo của MIT năm 2025 ghi nhận khoảng 95% tổ chức chưa thấy lợi nhuận đo được từ generative AI. Mua hoặc hợp tác thành công khoảng 67%. Tự xây chỉ bằng một phần ba mức đó.

## Line 7 — Chết ở dữ liệu, không chết ở model (Frame 7)

**Delivery:** thận trọng, rồi chắc chắn

    Mẫu của báo cáo không lớn, nên chỉ đọc như một tín hiệu. Nhưng tín hiệu đó trùng với thực tế: dự án AI thường chết ở dữ liệu và ở phần nối vào quy trình, hiếm khi chết ở model.

## Line 8 — Rủi ro chuỗi cung ứng (Frame 8)

**Delivery:** nghiêm túc

    Kèm theo là một rủi ro mới. Khi skill thành chuẩn chung, nó cũng thành đường tấn công, kể cả bằng tổ hợp nhiều skill mà từng cái đều qua kiểm tra. Vì vậy kit phải được quản trị như code.

## Line 9 — Năm phần của một agent (Frame 9)

**Delivery:** chậm, tách rõ hai nhóm

    Một agent làm việc thật gồm năm phần: LLM, harness, kit, data source và hạ tầng. LLM và harness thì vendor có. Kit và data source thì chỉ tổ chức mới có.

## Line 10 — Phép so sánh hệ điều hành (Frame 10)

**Delivery:** nhẹ nhàng, câu cuối như một kết luận hiển nhiên

    Dễ nhớ nhất: LLM giống CPU, harness giống hệ điều hành, còn kit và dữ liệu giống ứng dụng nghiệp vụ. Không doanh nghiệp nào tự viết hệ điều hành chỉ để chạy phần mềm kế toán.

## Line 11 — Harness cá nhân (Frame 11)

**Delivery:** công bằng, nhấn "không phải từ harness"

    Harness cá nhân có năng lực tốt nhất thị trường, nhưng hay bị chê: kết quả phụ thuộc kỹ năng prompt, mỗi người một cấu hình, log nằm trên máy riêng. Phần lớn điểm yếu đó đến từ việc thiếu kit, dữ liệu và governance dùng chung, không phải từ harness.

## Line 12 — Platform tập trung (Frame 12)

**Delivery:** trình bày khách quan

    Còn platform tập trung thường có năm phần: knowledge base, multi-agent orchestration, integration, governance và chat UI. Động cơ đều chính đáng. Vấn đề là nó gộp những thứ khác bản chất vào một khối.

## Line 13 — Tách khối (Frame 13)

**Delivery:** từng vế một, nhấn "viết lại harness"

    Knowledge base và integration là tài sản chỉ tổ chức có. Governance phần lớn mua hoặc cấu hình được. Còn orchestration và chat UI, xét cho cùng, chính là viết lại harness.

## Line 14 — Đề xuất (Frame 14)

**Delivery:** chắc chắn, dừng sau "đề xuất là"

    Vì vậy, đề xuất là: chuẩn hoá thứ bên ngoài không có, là dữ liệu và quy trình. Nối chúng tới mọi harness qua connector theo chuẩn mở. Harness và LLM thì mua, hoặc dùng bản open source.

## Line 15 — Dữ liệu và kit (Frame 15)

**Delivery:** rõ ràng, đếm "việc một", "việc hai"

    Cụ thể có năm việc. Một: đưa tri thức rải rác thành data source AI-ready, có cấu trúc, có nguồn gốc, có phân quyền. Hai: viết lại quy trình chuẩn thành kit gồm skill và workflow, quản lý như code, có owner, review và version.

## Line 16 — Connector và governance (Frame 16)

**Delivery:** đều nhịp

    Ba: connector trung lập với harness, qua CLI hoặc MCP server, dùng quyền của người gọi. Bốn: governance mỏng, với LLM gateway ghi cost và log, policy phát hành cùng kit, và human gate đặt ở PR review và CI.

## Line 17 — Harness chạy headless (Frame 17)

**Delivery:** trung tính, nhấn "approval gate"

    Năm: chọn một đến hai harness chuẩn, và giữ tài sản ở định dạng mở. Cần tự động hoá cao hơn thì cho chính harness đó chạy headless trong CI, cùng kit, và dừng ở một approval gate cuối.

## Line 18 — Phép thử mất giá (Frame 18)

**Delivery:** đặt câu hỏi chậm, trả lời dứt khoát

    Vì sao không tự viết harness? Hãy dùng phép thử mất giá: nếu quý sau vendor ra đúng thứ này, khoản đầu tư có mất trắng không? Agent loop, orchestration, chat UI: mất. Dữ liệu, kit và connector: không mất.

## Line 19 — Thêm ba lý do (Frame 19)

**Delivery:** liệt kê, nhấn "lock-in lớn nhất"

    Thêm nữa, mức tự động hoá là tính chất của workflow, không phải của tool. Lock-in lớn nhất là một harness tự viết mà chỉ đội làm ra nó bảo trì được. Và người giỏi nhất bị dồn vào phần không tạo khác biệt.

## Line 20 — Lo ngại và cách đáp ứng (Frame 20)

**Delivery:** đều nhịp, từng cặp một

    Những lo ngại về harness đều có cách đáp ứng. Kit cho kết quả đồng đều. Gateway cho audit và chi phí. RBAC cho dữ liệu nhạy cảm. Guardrail trong kit cho việc chạy tự động.

## Line 21 — Platform của tài sản (Frame 21)

**Delivery:** chậm, trang trọng, nhấn "của tài sản"

    Phần thật sự cần xây tập trung chỉ còn data layer, kit registry và governance layer. Đó vẫn là một platform, nhưng là platform của tài sản, không phải platform của harness.

## Line 22 — Khi nào tự làm nhiều hơn (Frame 22)

**Delivery:** thận trọng, công bằng

    Đề xuất này không tuyệt đối. Người dùng phần lớn không phải kỹ sư, môi trường air-gapped, agent là sản phẩm bán cho khách, hay harness thiếu năng lực bắt buộc: khi đó tự làm nhiều hơn, nhưng vẫn bắt đầu từ thứ có sẵn.

## Line 23 — Lộ trình bốn giai đoạn (Frame 23)

**Delivery:** liệt kê, đều nhịp

    Lộ trình gợi ý có bốn giai đoạn. Nền, trong hai đến bốn tuần. Pilot một quy trình, một đến ba tháng. Tự động hoá headless trong CI. Rồi mở rộng liên tục qua kit registry.

## Line 24 — Cần quyết định (Frame 24)

**Delivery:** trang trọng, chậm lại ở câu chốt

    Lãnh đạo cần quyết định năm điều: nguyên tắc đầu tư, owner, chuẩn định dạng, ràng buộc dữ liệu, và pilot. Tóm lại: harness và LLM thì mua. Ngân sách xây dồn vào dữ liệu, kit và connector.
