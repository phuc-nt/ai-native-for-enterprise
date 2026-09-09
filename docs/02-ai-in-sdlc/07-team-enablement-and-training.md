# Team Enablement and Training

Cập nhật 2026-09-09.

Đọc trước [Role, Task and Tool Mapping](08-role-task-tool-mapping-rovo-kiro-mk.md) để biết role nào dùng tool nào và hiện trạng nối Jira, Confluence; [Kiro + MK Kit](04-kiro-mk-kit-guide.md) để biết bản Kiro của kit; [MK Observe](05-mk-observe-agent-metrics.md) để biết đo bằng gì. Tài liệu này trả lời một câu: **từ lúc có kit và có tool đến lúc một team dự án dùng được trong việc thật, phải đi qua những bước nào, ai làm, ra gì, và biết xong khi nào.**

Tiền đề:

- **Kit MK không dùng ngay được cho một team.** Kit viết cho quy trình chung; team dự án có output, template, rule và cách review riêng. Phải tuỳ biến trước khi đào tạo, và đào tạo trên bản đã tuỳ biến.
- Team làm **waterfall**: pha nối tiếp nhau, output mỗi pha là tài liệu cố định được khách duyệt, có phase gate. Chương trình phải bám pha, không bám sprint.
- Mỗi người có Kiro (Pro hoặc Pro+) và Rovo; Kiro nối Jira và Confluence qua CLI tại máy từng người; MCP chưa bật. Chi tiết ở [tài liệu 08, mục 6](08-role-task-tool-mapping-rovo-kiro-mk.md#6-tiền-đề-kỹ-thuật-kiro--mk-nối-jira-confluence-slack).

## 1. Kết luận 30 giây

Bảy bước, mỗi bước có đầu vào, đầu ra và tiêu chí ra rõ ràng. Ba bước đầu là **chuẩn bị** (khảo sát team, tuỳ biến kit, soạn tài liệu), bước bốn là **triển khai kiến thức**, ba bước cuối là **áp dụng, theo dõi, đánh giá**. Mốc "triển khai kiến thức xong" được định nghĩa bằng bốn điều kiện đo được trên từng người (mục 4.4), không bằng số buổi đã dạy.

Ba nguyên tắc xuyên suốt:

1. **Đào tạo trên artifact thật của team**, không trên ví dụ chung. Bài hands-on lấy đúng spec, đúng template, đúng ticket đang mở.
2. **Kit đi trước tài liệu.** Không viết hướng dẫn cho thứ chưa chạy trên máy của champion.
3. **Mỗi bước có người ra quyết định và tiêu chí ra.** Không có tiêu chí thì không có bước.

## 2. Vì sao phải tuỳ biến kit trước khi dạy

Kit bản lite hướng tới team phát triển chung: skill `plan`, `cook`, `test`, `review`, rule cho code và tài liệu, hook chặn đường dẫn cấm. Team waterfall làm với khách có thêm những thứ kit không biết:

| Team có | Kit chưa biết | Hệ quả nếu không tuỳ biến |
|---|---|---|
| Bộ output theo pha: tài liệu yêu cầu, thiết kế cơ bản, thiết kế chi tiết, đặc tả test đơn vị và tích hợp, bảng quản lý vấn đề, bảng hỏi đáp với khách | Skill sinh ra markdown theo cấu trúc của kit | Output AI không nộp được, người dùng phải chép tay sang template, mất niềm tin ngay tuần đầu |
| Template Excel, Word do khách quy định, thường song ngữ | Kit không có template nào của khách | Như trên |
| Coding standard, naming, cấu trúc repo của dự án | Rule của kit là rule chung | Code sinh ra không qua review của team |
| Quy trình review theo phase gate, người duyệt cố định | Kit giả định review theo PR | Skill review chạy nhưng không khớp luồng duyệt |
| Thuật ngữ nghiệp vụ, tên hệ thống, ngôn ngữ giao tiếp với khách | Không có trong ngữ cảnh | AI dịch sai thuật ngữ, viết sai giọng trong tài liệu gửi khách |

Bốn lớp tuỳ biến, theo thứ tự ít công đến nhiều công:

| Lớp | Tuỳ biến gì | Ai làm | Bằng chứng xong |
|---|---|---|---|
| Ngữ cảnh | Thư mục ngữ cảnh của dự án và steering của Kiro: khách, hệ thống, thuật ngữ, ngôn ngữ, quy ước giao tiếp | Champion của team với người giữ kit | Agent trả lời đúng ba câu hỏi về dự án mà không cần nhắc |
| Rule | Coding standard, naming, review checklist, quy tắc tài liệu của team, thay cho rule chung của kit | Người giữ kit, PL duyệt | Code và tài liệu sinh ra qua review của team không sửa về hình thức |
| Template | Output thật của từng pha đưa vào làm template cho skill: cấu trúc, mục bắt buộc, ngôn ngữ, ví dụ đã duyệt | Champion, người giữ kit | Output AI dán thẳng vào template của khách, chỉ sửa nội dung |
| Skill | Cắt skill không dùng; sửa 10 workflow skill gọi CLI; thêm skill cho output đặc thù của team nếu chưa có | Người giữ kit | Ba task thật của team chạy hết bằng skill, champion ký |

Bản kit sau tuỳ biến gọi là **kit của team**, sống trong repo của team, có phiên bản. Kit chung không đổi; thứ gì tuỳ biến mà team nào cũng cần thì đưa ngược lên kit chung ở bước 7.

## 3. Vai trò

| Vai trò | Là ai | Làm gì | Thời gian |
|---|---|---|---|
| Chủ chương trình | Người được giao đưa AI vào các team | Chạy bảy bước, giữ lịch, viết tài liệu, báo cáo | Toàn thời gian trong đợt triển khai |
| Người giữ kit | Kỹ sư biết kit và Kiro | Tuỳ biến kit theo team, sửa skill, dựng CLI, hỗ trợ kỹ thuật | Nửa thời gian trong hai bước đầu, sau đó theo yêu cầu |
| Champion của team | Một đến hai người trong team, thường dev senior hoặc tester lead | Cung cấp artifact, thử kit trước, dạy lại đồng đội, giữ office hours | Hai đến bốn giờ mỗi tuần |
| PL hoặc PM của team | Người quyết định trong team | Duyệt phạm vi, cho thời gian, chọn task thật để áp dụng, ký tiêu chí ra | Một giờ mỗi tuần |
| Thành viên | Mọi role trong team | Học, làm hands-on, dùng trên task thật, phản hồi | Nửa ngày đào tạo cộng thời gian dùng thật |

Không có champion thì không bắt đầu với team đó. Champion là người biến chương trình từ "buổi đào tạo" thành "cách team làm việc".

## 4. Bảy bước

| Bước | Mục đích | Đầu vào | Đầu ra | Tiêu chí ra | Thời lượng gợi ý |
|---|---|---|---|---|---|
| 4.1 Khảo sát team | Biết team làm gì, ở pha nào, output gì | Buổi làm việc với PL và champion | Hồ sơ team một trang; kho artifact mẫu | PL xác nhận hồ sơ; đủ ba mẫu cho mỗi loại output của hai pha tới | Một tuần |
| 4.2 Tuỳ biến kit | Kit chạy được trên việc của team | Hồ sơ team, artifact, kit chung | Kit của team v0.1 | Ba task thật chạy hết bằng skill, champion ký | Một đến hai tuần một team; team sau nhanh hơn |
| 4.3 Soạn tài liệu theo role | Có bài để dạy | Kit của team, bảng role ở tài liệu 08 mục 4 | Một module cho mỗi role có trong team; prompt template rút ra | Champion chạy thử từng module trên máy mình, không vướng | Một tuần, song song cuối bước 4.2 |
| 4.4 Triển khai kiến thức | Mọi người dùng được | Module, kit của team, lịch của team | Từng người đạt bốn điều kiện | 100% thành viên đạt bốn điều kiện, hoặc PL ký danh sách ngoại lệ | Một tuần một team |
| 4.5 Áp dụng có hỗ trợ | Dùng trên task thật, sửa kit theo thực tế | Danh sách task thật do PL chọn | Output thật có AI tham gia; kit của team v0.2 | Mỗi role có ít nhất một output thật đã được duyệt | Hai đến bốn tuần |
| 4.6 Theo dõi | Biết ai dùng, dùng gì, ra gì | MK Observe, usage Rovo, Jira, phản hồi | Bảng theo dõi một trang, đọc hằng tuần | Có số cho bốn chiều ở mục 4.6, cập nhật mỗi tuần | Liên tục từ 4.4 |
| 4.7 Đánh giá và quyết định | Chuẩn hoá, sửa, hay dừng | Bốn tuần số liệu, phản hồi, output | Báo cáo đánh giá; quyết định cho từng use case; đóng góp ngược lên kit chung | Có quyết định ghi thành văn cho mỗi use case đã dạy | Một tuần sau khi hết 4.5 |

### 4.1 Khảo sát team

Hỏi và ghi lại, không suy đoán:

- Team đang ở pha nào, pha tiếp theo bắt đầu khi nào, tuần nào là tuần bàn giao. Đào tạo tránh tuần bàn giao.
- Role nào có trong team và mỗi role bao nhiêu người. Lấy từ bảng ở tài liệu 08 mục 4, bỏ role không có.
- Với mỗi role: ba việc tốn thời gian nhất tuần vừa rồi. Đây là ứng viên cho hands-on.
- Output của hai pha tới: tên tài liệu, template, ngôn ngữ, ai duyệt, đã có mẫu được duyệt chưa. Xin ba mẫu mỗi loại.
- Rule đang có: coding standard, naming, review checklist, quy tắc tài liệu. Xin file.
- Tool access: ai đã có Kiro và gói nào, ai đã có Rovo, ai đã có API token Jira và Confluence.
- Số nền: thời gian trung bình cho ba việc ở trên, số lỗi review gần đây nếu team có ghi. Không có thì ghi "không có", đừng ước.

Đầu ra là **hồ sơ team một trang** và một thư mục artifact. Hồ sơ này là đầu vào cho mọi bước sau và là thứ để so khi đánh giá.

### 4.2 Tuỳ biến kit

Đi theo bốn lớp ở mục 2. Cách làm giữ cho khỏi lan:

- Chọn **ba task thật** của hai pha tới, mỗi task đại diện một role chính, làm thước đo. Kit của team xong khi ba task này chạy hết bằng skill và champion ký.
- Tuỳ biến theo thứ tự ngữ cảnh, rule, template, skill. Dừng ở lớp nào đủ cho ba task thì dừng.
- Với 10 workflow skill: chỉ chuyển sang CLI những skill team sẽ dùng trong bốn tuần tới, thường là sinh test case từ story, báo cáo tiến độ, ghi biên bản họp thành việc.
- Kit của team nằm trong repo của team, có phiên bản, có file ghi "khác kit chung ở đâu và vì sao". Team thứ hai bắt đầu từ kit của team thứ nhất, không từ kit chung.

### 4.3 Soạn tài liệu theo role

Một **module** là một cặp role và việc, dạy trong tối đa 90 phút: 15 phút khái niệm và quy tắc, 60 phút làm trên artifact của team, 15 phút xem lại output với nhau. Không có module chỉ có lý thuyết. Mỗi module ghi:

- Việc thật đang làm bằng tay và mất bao lâu.
- Tool nào, lệnh nào, theo bảng ở tài liệu 08 mục 4.
- Bài hands-on: đầu vào là artifact thật, đầu ra phải khớp template của khách.
- Prompt template rút ra sau khi chạy, kèm ví dụ đầu ra đã duyệt. Đây là nguồn cho danh sách prompt template của đơn vị.
- Ba lỗi hay gặp và cách nhận ra.

Module dùng chung giữa các team là phần khái niệm và quy tắc; phần hands-on thay theo artifact của từng team. Một buổi mở đầu chung 60 phút cho cả team: mindset (lấy từ [Context Engineering Mindset](../00-foundations/context-engineering-mindset.md)), quy tắc governance ở tài liệu 08 mục 7, và cách hỏi khi vướng.

### 4.4 Triển khai kiến thức

Đây là mốc mà chương trình thường bị đo sai: đếm buổi đã dạy thay vì đếm người đã dùng được. Một người được tính là **đã triển khai** khi đủ bốn điều kiện:

1. **Tool chạy trên máy của người đó**: Kiro với kit của team, CLI Jira và Confluence với token cá nhân, Rovo mở được; xác nhận bằng một lệnh kiểm tra nhanh do người giữ kit chuẩn bị.
2. **Hoàn thành một bài hands-on của đúng role mình**, output khớp template.
3. **Nói được ba quy tắc governance**: dữ liệu nào không đưa vào AI, output nào phải người duyệt trước khi gửi khách, credential giữ ở đâu.
4. **Biết nơi hỏi**: champion, kênh hỗ trợ, tài liệu kit của team.

Lịch cho một team: buổi mở đầu chung, rồi các module theo role trong cùng tuần, rồi một buổi kiểm tra bốn điều kiện. Ai vắng thì champion dạy bù trong tuần kế. PL ký danh sách khi 100% đạt hoặc ghi rõ ngoại lệ.

### 4.5 Áp dụng có hỗ trợ

Từ hai đến bốn tuần ngay sau khi triển khai, không để trống tuần nào giữa hai bước. PL chọn **task thật** cho từng role; không dùng task giả. Champion giữ office hours cố định hai lần mỗi tuần. Mỗi tuần một buổi 30 phút cả team xem lại output có AI tham gia: cái gì được duyệt, cái gì bị trả, vì sao. Phản hồi đi thẳng vào kit của team, ra bản v0.2 vào cuối giai đoạn. Tiêu chí ra: mỗi role có ít nhất một output thật đã được người duyệt của team chấp nhận.

### 4.6 Theo dõi

Bốn chiều, mỗi chiều một hai con số, đọc hằng tuần trong 15 phút:

| Chiều | Số | Nguồn |
|---|---|---|
| Mức dùng | Số người dùng Kiro trong tuần; số lệnh skill; số người dùng Rovo | MK Observe (Adoption); usage Rovo trong Atlassian admin |
| Output | Số artifact có AI tham gia được duyệt; tỷ lệ bị trả | Champion ghi trong buổi xem lại hằng tuần; Confluence và Jira |
| Công sức | Thời gian tự khai cho ba việc đã đo ở bước 4.1, trước và sau | Khai theo task, không ước theo tuần |
| Chất lượng và tuân thủ | Lỗi phát hiện ở review và test trên output có AI; số lần hook chặn; sự cố dữ liệu | Jira; log của kit; báo cáo của champion |

Cách đọc từng chỉ số của MK Observe ở [tài liệu 05, mục 6](05-mk-observe-agent-metrics.md#6-nhịp-đọc-hằng-tuần-cho-người-quản-lý). Bảng theo dõi là một trang Confluence do chủ chương trình cập nhật; không dựng dashboard riêng trong đợt đầu.

### 4.7 Đánh giá và quyết định

Sau bốn tuần áp dụng, cho **từng use case đã dạy**, ra một trong ba quyết định:

- **Chuẩn hoá**: use case có output thật được duyệt đều, công sức giảm rõ so với số nền, không sự cố. Viết thành trang use case chuẩn trên Confluence; phần tuỳ biến dùng chung đưa ngược lên kit chung.
- **Sửa**: có dùng nhưng output hay bị trả hoặc người dùng bỏ giữa chừng. Quay lại bước 4.2 hoặc 4.3 cho use case đó, không đụng cái khác.
- **Dừng**: không ai dùng sau bốn tuần dù đã hỗ trợ, hoặc rủi ro dữ liệu không xử lý được. Ghi lý do, bỏ khỏi module.

Báo cáo đánh giá dài tối đa hai trang: số của bốn chiều so với số nền, quyết định cho từng use case, việc phải làm ở kit chung, và điều sẽ làm khác với team tiếp theo. Báo cáo này là đầu vào cho case study chia sẻ nội bộ.

## 5. Bám theo pha waterfall

| Pha | Việc AI đỡ được nhiều nhất | Skill hoặc tool | Output phải khớp | Điểm đo tự nhiên |
|---|---|---|---|---|
| Yêu cầu | Rút yêu cầu từ biên bản họp và bảng hỏi đáp; tìm mâu thuẫn giữa các phiên bản spec | Rovo Chat trên Confluence; `meeting-notes-to-actions` | Tài liệu yêu cầu, bảng hỏi đáp | Số vòng hỏi đáp với khách |
| Thiết kế cơ bản và chi tiết | Viết nháp tài liệu thiết kế từ yêu cầu theo template; rà chéo yêu cầu và thiết kế | `/mk-plan` với template của team; Rovo cho tra cứu | Tài liệu thiết kế theo template khách | Số chỉ trích ở review thiết kế |
| Coding | Sinh code theo thiết kế và rule của team; review trước khi nộp | `/mk-cook`, `/mk-review`, `code-review-findings-to-jira` | Code qua review; finding thành ticket | Lỗi review trên nghìn dòng |
| Test đơn vị | Sinh test từ thiết kế chi tiết; chạy và sửa | `/mk-test` | Đặc tả và mã test đơn vị | Coverage; lỗi lọt sang tích hợp |
| Test tích hợp và hệ thống | Sinh test case từ yêu cầu và story; gom lỗi từ nhiều nguồn | `jira-story-test-case-generation`; `cross-tracker-bug-triage` | Đặc tả test theo template khách | Test case AI sinh được duyệt trên tổng |
| Mọi pha | Báo cáo tiến độ, cập nhật cho khách, biên bản họp | `daily-standup-report`, `stakeholder-status-update`, `meeting-notes-to-actions` | Báo cáo theo mẫu của team, song ngữ nếu cần | Giờ làm báo cáo mỗi tuần |

Hai lưu ý khi lên lịch:

- Team đang ở pha nào thì dạy module của **pha đó và pha kế tiếp**. Dạy module của pha đã qua là lãng phí; dạy pha xa hơn thì quên trước khi dùng.
- **Phase gate là điểm đo.** Số nền lấy ở gate trước, số sau lấy ở gate sau. Không cần dựng phép đo riêng.

## 6. Dấu hiệu chương trình đang hỏng

| Dấu hiệu | Thường vì | Sửa |
|---|---|---|
| Buổi đào tạo đông, tuần sau không ai chạy lệnh | Hands-on trên ví dụ chung, không phải việc của họ; không có task thật được giao | Quay lại 4.1 lấy task thật; PL giao task cụ thể |
| Output AI bị chép tay lại sang template | Lớp template chưa tuỳ biến | Làm lớp template trước khi dạy tiếp |
| Champion thành người làm hộ | Thiếu điều kiện 1 ở 4.4, tool không chạy trên máy người khác | Kiểm tra máy từng người, sửa cài đặt trước |
| Số dùng cao, output duyệt thấp | Rule và review checklist của team chưa vào kit | Làm lớp rule; xem lại output bị trả cùng nhau |
| Không có số để đánh giá | Bỏ qua số nền ở 4.1 hoặc không đo ở gate | Lấy số ở gate gần nhất; chấp nhận so sánh thô thay vì không có |
| Vướng chính sách giữa chừng | Token, cookie, dữ liệu khách chưa hỏi trước | Chốt governance ở buổi mở đầu; đường Slack chỉ thêm khi admin đồng ý |

## 7. Đi tiếp

- Lịch cụ thể cho từng đợt lập theo bảy bước ở mục 4; lịch của đợt đầu với hai team nằm ở kế hoạch nội bộ, không trong bộ tài liệu này.
- Sau đợt đầu, cập nhật tài liệu này bằng số thật: thời lượng thực tế của từng bước, tỷ lệ đạt bốn điều kiện, use case được chuẩn hoá.
- Tài liệu [AI Across SDLC Phases](06-ai-across-sdlc-phases.md), khi viết, sẽ mở rộng bảng ở mục 5 thành từng pha với ví dụ đầu vào và đầu ra.

**Câu hỏi mở**

- Team sau team thứ hai: ai giữ kit của team khi chủ chương trình rút? Cần một người giữ kit trong mỗi team hay một người giữ chung cho đơn vị?
- Hands-on trên artifact thật của khách: có cần xin phép khách không, hay đã nằm trong phạm vi hợp đồng? Hỏi trước khi bắt đầu 4.1.
- Số nền về công sức tự khai theo task có đủ tin để báo cáo lên trên không, hay cần cách đo khác từ đợt hai?
