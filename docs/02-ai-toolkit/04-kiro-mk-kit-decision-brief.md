# Kiro + MK Kit for the Dev Team: Decision Brief

Dành cho lãnh đạo đơn vị và tech lead của một dự án mà khách hàng yêu cầu Kiro. Cập nhật 2026-09-06.

Tình huống áp dụng: khách hàng yêu cầu **Kiro** (AWS) làm harness chính cho team dev. Câu hỏi cần quyết không phải "dùng Kiro hay không", mà là **dùng Kiro trần hay Kiro bọc trong bộ quy trình MK** mà team đã có trên Claude Code ([MK Kit Introduction](02-mk-kit-introduction.md)).

Căn cứ: bản Kiro của bộ MK đã được dựng và chạy thử thật trên `kiro-cli 2.21.1`, 14 lượt chạy trên một project mẫu, đọc log phiên từ cơ sở dữ liệu của Kiro và log hook của kit. Chi tiết kỹ thuật ở [Kiro + MK Kit: Engineering Guide](05-kiro-mk-kit-engineering-guide.md).

---

## 1. Kết luận trong 30 giây

Kiro mặc định là một trợ lý code tốt nhưng **không mang theo quy trình**: mỗi kỹ sư tự nhớ luật, không có chốt chặn trước khi AI đọc hay ghi file, không có trí nhớ giữa các phiên, đầu ra mỗi người một kiểu.

Bọc Kiro bằng bộ MK giữ nguyên model, license và cách gõ lệnh của Kiro, nhưng thêm:

- Luật của team nạp tự động mỗi lượt, và Kiro nâng chúng thành chỉ thị bắt buộc.
- Chốt chặn chạy trước mỗi tool call: AI không đọc được `.env`, thư mục sinh ra khi đóng gói, không quét toàn repo.
- Cùng một bộ kỹ năng (fix, test, review, plan, ship…) và trợ lý chuyên trách cho cả team.
- Trạng thái phiên được ghi lại, phiên sau tiếp tục đúng chỗ dở.
- Báo cáo và kế hoạch rơi đúng thư mục, đúng tên, audit được.

Giá phải trả: một lệnh cài, thêm khoảng 0,1 đến 0,2 giây mỗi prompt và khoảng 4 KB context mỗi lượt.

**Đề xuất:** pilot một team, một repo, hai tuần; đo bốn chỉ số ở mục 5 rồi quyết định mở rộng.

---

## 2. Năm lý do, nhìn từ phía quản lý

**Kiểm soát rủi ro nằm ở tầng hệ thống, không phụ thuộc AI "nhớ".** Với Kiro trần, AI có đọc file bí mật hay không tuỳ model có nghe lời hay không. Với MK, hook chặn đường dẫn chạy trước mỗi tool call; đường dẫn cấm thì tool không chạy, Kiro báo lý do và model tự đổi hướng. Đã kiểm chứng: lệnh quét toàn repo bị chặn, model tự thu hẹp về thư mục nguồn. Chính sách bảo mật dữ liệu là file cấu hình trong repo, review được, bắt buộc được.

**Chất lượng đồng đều giữa các kỹ sư.** "Sửa bug", "chạy test", "review code" cho cùng một cấu trúc đầu ra vì đi qua cùng một skill. Kỹ sư mới vào dùng ngay quy trình của người giỏi nhất, không phụ thuộc ai viết prompt hay hơn.

**Tri thức không thất thoát khi đóng terminal.** Mỗi phiên kết thúc, kit ghi lại việc đã làm và việc còn dở; phiên sau đọc lại. Đã kiểm chứng: mở phiên mới, hỏi "còn gì chưa làm", AI trả lời đúng mà không cần đọc lại file. Báo cáo test, kế hoạch, review lưu vào `plans/` theo quy ước đặt tên, là dấu vết audit khi cần truy vì sao một thay đổi được đưa vào.

**Chi phí dự đoán được.** Chi phí đo trên các lượt chạy thật nằm trong khoảng 0,07 đến 0,86 credit mỗi tác vụ; nặng nhất là chạy test và viết báo cáo. Hook thêm dưới 0,2 giây mỗi prompt, không đáng kể so với thời gian model suy nghĩ.

**Không bị khoá vào một công cụ.** Cùng bộ kit chạy trên Claude Code, Kiro và OpenCode ([Agent Kit Portability](03-agent-kit-multi-harness-kiro-opencode.md)). Khách hàng đổi harness, team không phải đổi quy trình. Toàn bộ kit là file văn bản trong repo, sở hữu hoàn toàn.

---

## 3. So sánh trực tiếp, cho tech lead

| Hạng mục | Kiro mặc định | Kiro + MK (agent `mk`) |
|---|---|---|
| Luật của team | Không có sẵn, tự viết steering từ đầu | 4 file rule + 1 steering về cơ chế kit, nạp mỗi lượt |
| Hook | Không có | 5 sự kiện, 7 hook script: khởi tạo phiên, nhắc luật, chặn đường dẫn, ghi trạng thái, hai gate tuỳ chọn |
| Chặn đường dẫn | Không | Trước mỗi tool call, kể cả bên trong subagent |
| Kỹ năng | Không, prompt tay từng lần | 29 skill của bản lite; 9 skill quan trọng nhúng toàn văn; gợi ý tự động theo từ khoá |
| Trợ lý chuyên trách | Không định nghĩa | 12 subagent (planner, tester, code-reviewer…) có hook riêng |
| Trí nhớ giữa phiên | Không | Ghi trạng thái lúc kết thúc, đọc lại lúc khởi động |
| Quy ước đầu ra | Tuỳ model | Báo cáo, kế hoạch theo naming trong cấu hình kit, đúng thư mục `plans/` |
| Chọn agent | Gõ `--agent` mỗi lần | Cấu hình workspace đặt `mk` làm mặc định, `kiro-cli chat` là đủ |
| Model cho subagent | Một model cho tất cả | Map theo vai trò: model nhẹ cho việc nhẹ, model mạnh cho việc nặng |

Kit gốc viết cho Claude Code. Một adapter duy nhất dịch payload của Kiro sang payload Claude Code để các hook gốc chạy **không cần sửa**. Khi kit gốc nâng cấp, bản Kiro chỉ cần dựng lại bằng script.

---

## 4. Rủi ro cần biết trước khi quyết

| Rủi ro | Mức | Đối ứng |
|---|---|---|
| Kit chỉ chạy trên engine v2 của Kiro CLI (bản mặc định hiện nay). Engine v3 (early release) từ chối agent v2 | Trung bình | Có script dựng lại; khi Kiro đổi mặc định sang v3 thì dựng lại theo schema mới. Cần hỏi khách đang chuẩn hoá phiên bản nào |
| Bug của Kiro: chạy headless, khi hook chặn 1 trong 2 tool gọi song song thì phiên chết | Trung bình, chỉ ảnh hưởng CI | Adapter có chế độ cảnh báo mềm cho CI. Phiên tương tác tự phục hồi. Steering đã dặn model tránh đường dẫn cấm nên hiếm gặp |
| Bản Kiro dựng từ bản lite gốc, **chưa gồm 10 skill tích hợp Jira/Confluence/Slack và các MCP server đi kèm bộ toolkit** | Trung bình | Việc phải làm trước pilot, ước 1 đến 2 ngày; xem mục 6 của hướng dẫn kỹ thuật |
| Hook thêm 50 đến 100 ms mỗi tool call; khoảng 4 KB context mỗi lượt | Thấp | Chấp nhận; cửa sổ context của Kiro là 1M token |
| Gợi ý skill theo từ khoá có thể gợi thừa | Thấp | Tắt bằng biến môi trường hoặc gọi thẳng `/mk-…` |
| Hai gate chất lượng (simplify, review artifact) tắt mặc định | Thấp | Bật trong cấu hình kit khi team sẵn sàng |
| Slash `/mk-…` chỉ dùng được ở chế độ tương tác | Thấp | Headless dùng câu tự nhiên, gợi ý skill dẫn đúng chỗ |
| Cần một người sở hữu kit trong team | Trung bình | Nêu rõ vai trò từ đầu pilot. Kit là file văn bản, không cần hạ tầng |

---

## 5. Lộ trình pilot đề xuất

1. **Tuần 0, một ngày.** Bổ sung 10 skill tích hợp và cấu hình MCP vào bản Kiro; chọn một team và một repo đang hoạt động; cài kit, commit `.kiro/` và `.claude/`. Từ đây `kiro-cli chat` tự dùng agent `mk`.
2. **Tuần 1 và 2.** Team làm việc bình thường. Đào tạo chỉ cần một trang 10 lệnh (mục 3 của hướng dẫn kỹ thuật).
3. **Cuối tuần 2.** Đọc bốn chỉ số rồi quyết định mở rộng, bật thêm gate, hoặc dừng.

| Chỉ số | Lấy từ đâu | Kỳ vọng sau 2 tuần |
|---|---|---|
| Số lần hook chặn truy cập file cấm | Log hook của kit trong repo | Lớn hơn 0 |
| Tỷ lệ tác vụ test và review có báo cáo trong `plans/reports/` | Đếm file | Trên 80% |
| Credit trung bình mỗi tác vụ | Metadata lượt chạy của Kiro | Trong khoảng 0,1 đến 1,0 |
| Thời gian kỹ sư mới làm được tác vụ đầu tiên đúng quy trình | Quan sát | Dưới 1 giờ |

Hai chỉ số đầu đọc được từ skill đo lường của kit thay vì đếm tay, xem [MK Observe, mục 5](06-mk-observe-agent-metrics.md#5-dùng-cho-pilot-kiro); chỉ số credit vẫn phải đọc từ Kiro.

Nếu dừng: xoá `.kiro/` và `.claude/`, repo không còn dấu vết gì.

---

## 6. Cần quyết định gì hôm nay

1. Đồng ý pilot theo mục 5, chỉ định team, repo và người sở hữu kit.
2. Xác nhận với khách: Kiro CLI hay IDE, phiên bản nào, có bật engine v3 chưa. Câu trả lời quyết định bản kit nào được dựng.
3. Xác nhận gói Kiro và ai trả: chạy nền cho CI cần gói Pro trở lên.
4. Chốt nơi lưu mã nguồn bản Kiro của kit (hiện nằm ngoài repo này, chưa vào git) để đơn vị triển khai sở hữu và dựng lại được.

## Câu hỏi mở

- Khách có cho phép cài hook chạy lệnh cục bộ (Node) trong repo của họ không? Toàn bộ chốt chặn dựa vào điều này.
- Khách làm việc theo spec của Kiro hay theo `plans/` của MK? Ảnh hưởng nơi lưu kế hoạch và báo cáo.
