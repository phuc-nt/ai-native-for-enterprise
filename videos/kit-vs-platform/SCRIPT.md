# Script — Đầu tư vào kit và dữ liệu, không viết harness mới

## Line 1 — Câu hỏi mở màn (Frame 1)

**Delivery:** điềm tĩnh, nhấn "không cần"

    Muốn AI tự làm tới mức L4, có cần tự viết một nền tảng agent riêng không? Đề xuất này trả lời: không cần.

## Line 2 — Luận điểm (Frame 2)

**Delivery:** chắc chắn, dừng nhẹ sau dấu hai chấm

    Harness và LLM thì mua. Tổ chức đầu tư vào thứ bên ngoài không có: kit và dữ liệu, sẵn sàng cho AI. Đây là một đề xuất, chưa được duyệt.

## Line 3 — Thang automation (Frame 3)

**Delivery:** rõ ràng, liệt kê

    Tổ chức đo automation level trên năm mức, từ L1 hỗ trợ từng thao tác, tới L5 tự vận hành. Mục tiêu kỳ sau: thiết kế đạt L3, coding và testing đạt L4.

## Line 4 — Hai team (Frame 4)

**Delivery:** trung tính

    Hai team được giao việc. Team platform xây một nền tảng AI tập trung trên cloud. Team kit làm skill, workflow và connector cho các harness phổ biến như Claude Code và Kiro.

## Line 5 — Lập luận của platform (Frame 5)

**Delivery:** trình bày khách quan

    Platform có bốn layer và mười ba feature. Tài liệu của nó kết luận: IDE harness chỉ là trợ lý cá nhân, còn platform mới là dây chuyền sản xuất phần mềm.

## Line 6 — Bốn phần của một agent (Frame 6)

**Delivery:** chậm lại, nhấn "tự viết lại harness"

    Nhưng một agent làm việc thật luôn gồm bốn phần: harness, LLM, kit và hạ tầng. Platform, xét cho cùng, cũng là bốn phần này. Chỉ khác ở chỗ tự viết lại harness.

## Line 7 — Đề xuất ba ý (Frame 7)

**Delivery:** đếm rõ một, hai, ba

    Vì vậy, đề xuất có ba ý. Một, harness và LLM thì mua. Hai, đầu tư vào kit và data source AI-ready. Ba, viết chúng trung lập, để gắn vào harness nào cũng được, kể cả khi chạy headless trên cloud.

## Line 8 — Phép thử mất giá (Frame 8)

**Delivery:** đặt câu hỏi, rồi trả lời dứt khoát

    Phép thử đơn giản: nếu quý sau vendor ra đúng feature này, khoản đầu tư có mất trắng không? Orchestration layer và chat UI: mất. Code graph, template, checklist, connector nội bộ: không mất.

## Line 9 — Workflow quyết định mức (Frame 9)

**Delivery:** nhấn "workflow" và "tool"

    Và automation level là tính chất của workflow, không phải của tool. Cùng một harness, dừng hỏi người ở mỗi bước là L3. Chạy trọn chuỗi skill rồi trình draft ở approval gate cuối là L4.

## Line 10 — So sai đối tượng (Frame 10)

**Delivery:** phân tích, từng ý một

    Bảng so sánh của platform đặt harness dùng trong IDE cạnh một hệ thống chạy trên server. Nhưng Claude Code và Kiro đều chạy headless được. Multi-repo là bài toán dữ liệu. Chỉ audit tập trung là khoảng trống thật, và lấp bằng một layer mỏng.

## Line 11 — Bốn layer (Frame 11)

**Delivery:** nhịp đều, nhấn "không làm"

    Tách bốn layer theo bản chất. Knowledge base là dữ liệu: làm. Integration là connector: làm. Governance: mua hoặc cấu hình. Chỉ orchestration là viết lại harness: không làm. Ba trên bốn layer đã trùng với đề xuất.

## Line 12 — Mười ba feature (Frame 12)

**Delivery:** liệt kê, kết dứt khoát

    Mười ba feature cũng vậy. Sáu feature là skill và workflow, giao team kit. Ba feature cần dữ liệu kèm skill. Còn lại là governance và CI. Không feature nào bắt buộc phải có harness tự viết.

## Line 13 — Điểm yếu và cách bù (Frame 13)

**Delivery:** thẳng thắn

    Đề xuất có điểm yếu, và có cách bù. Portable không trọn vẹn: tách core trung lập với adapter mỏng. Governance là nhu cầu thật: dùng LLM gateway. Chạy headless cần license và guardrail: nêu rõ từ đầu.

## Line 14 — Phân vai (Frame 14)

**Delivery:** rõ ràng

    Phân vai rõ ràng. Team platform làm dữ liệu: spec index, code graph, RBAC. Team kit làm skill, connector, guardrail và adapter. Harness, LLM và gateway thì mua.

## Line 15 — Bằng chứng cần có (Frame 15)

**Delivery:** đếm bốn bước

    Trước khi trình, cần bốn bằng chứng: chạy chuỗi thiết kế tới unit test trên một hệ thống thật; chạy headless có approval gate; chạy trên hai harness; và dựng thử một LLM gateway.

## Line 16 — Chốt (Frame 16)

**Delivery:** chậm, trang trọng, dừng lâu ở cuối

    Model đổi được trong một dòng cấu hình. Dữ liệu và dây nối thì không ai làm thay được. Đó là nơi tổ chức nên đầu tư.
