# Tool Mapping by Role

Cập nhật 2026-09-09. Đọc trước [README](README.md) để biết hiện trạng. Chi tiết bộ MK và 10 workflow skill ở [AI Toolkit](../02-ai-in-sdlc/01-ai-toolkit-offshore-team.md); bản Kiro ở [Kiro + MK Kit](../02-ai-in-sdlc/04-kiro-mk-kit-guide.md). Facts về Rovo và Kiro lấy từ tài liệu công khai đến 2026-09; chỗ chưa tự chạy thử ghi **[chưa kiểm chứng]**.

## 1. Chia tool theo nơi việc sống

| Việc sống ở đâu | Tool | Ví dụ |
|---|---|---|
| Trong Jira, Confluence: đọc, tìm, tóm tắt, hỏi đáp, soạn nháp trang | **Rovo** | Tóm tắt epic, tìm trang thiết kế liên quan, nháp biên bản |
| Trong repo: thiết kế, code, test, review | **Kiro + MK** | `/mk-plan`, `/mk-cook`, `/mk-test`, `/mk-review` |
| Xuyên hai bên: từ ticket ra code, từ code ra ticket hoặc báo cáo | **Workflow skill của MK trên Kiro**, gọi CLI Jira/Confluence | Story → test case lên Confluence; finding review → Jira bug; báo cáo tiến độ |

Mỗi use case một tool chính. Rovo và Kiro không thay nhau: Rovo không thấy repo, Kiro không hỏi đáp tự do trên Confluence.

## 2. Ba tool trong một bảng

| | Rovo | Kiro | MK |
|---|---|---|---|
| Là gì | AI của Atlassian trong Jira, Confluence: Search, Chat, Agents | IDE và CLI của AWS cho agent viết code | Bộ quy trình của đơn vị cài lên Kiro: 29 skill lõi, 10 workflow skill, rule, hook chặn |
| Mạnh ở | Đọc theo quyền người dùng, không cài gì | Spec, steering, hook; Claude qua Bedrock, không huấn luyện trên code | Kỷ luật quy trình, kết quả lặp lại, đo được |
| Giới hạn hiện tại | Gói chưa xác nhận; tiếng Nhật chưa có tài liệu chính thức | MCP chưa bật; nối ra ngoài bằng CLI | 10 workflow skill viết cho MCP, phải chuyển sang CLI |
| Cấp phép | Trong gói Atlassian; giả định dùng thoải mái, xác nhận bằng usage sau hai tuần | Pro hoặc Pro+ theo người | Kèm kit |

## 3. Role nào dùng gì

| Role | Việc AI đỡ được nhiều nhất | Tool chính |
|---|---|---|
| PM, PMO | Tóm tắt tiến độ từ Jira, nháp báo cáo cho khách | Rovo; `stakeholder-status-update` |
| BA | Rút yêu cầu từ biên bản và bảng hỏi đáp, tìm mâu thuẫn giữa spec | Rovo; `meeting-notes-to-actions` |
| BrSE, comtor | Dịch và soạn tài liệu song ngữ, giữ thuật ngữ dự án | Rovo cho tra cứu; Kiro với ngữ cảnh team cho văn bản dài |
| Architect, dev lead | Nháp thiết kế theo template, rà chéo yêu cầu và thiết kế | Kiro `/mk-plan` với template của team |
| Developer | Code theo thiết kế và rule của team, tự review trước khi nộp | Kiro `/mk-cook`, `/mk-review`, `/mk-test` |
| Tester, QA | Sinh test case từ story và thiết kế, gom lỗi từ nhiều nguồn | `jira-story-test-case-generation`; `cross-tracker-bug-triage` |
| DevOps | Duy trì kit, CLI, đo mức dùng | Kiro + MK Observe |

Bảng đầy đủ theo từng role và từng task lập sau khảo sát team, khi biết role nào thật sự có trong hai team pilot.

## 4. Năm use case ưu tiên

| Use case | Ai | Đo bằng |
|---|---|---|
| Sinh test case từ story và thiết kế | Tester | Tỷ lệ test case AI sinh được duyệt |
| Sinh và chạy unit test theo thiết kế chi tiết | Developer | Coverage tại gate test đơn vị |
| Nháp tài liệu thiết kế theo template khách | Dev lead | Số chỉ trích ở review thiết kế |
| Báo cáo tiến độ và cập nhật cho khách | PM, BrSE | Giờ làm báo cáo mỗi tuần |
| Biên bản họp thành việc và ticket | BA, PM | Số việc bị sót sau họp |

## 5. Nguyên tắc và governance

- **Kiro là agent code duy nhất.** Không cấp Rovo Dev; một chuẩn, một bộ log, một chỗ đo.
- **Dữ liệu đi đường đã duyệt.** Rovo đọc theo quyền người dùng; Kiro đọc repo và gọi CLI với token cá nhân của chính người đó; hook của MK chặn credential và đường dẫn cấm.
- **Output gửi khách phải có người duyệt.** AI viết nháp, người ký.
- **Token, cookie không vào repo, không vào log.** Slack chỉ thêm khi admin đồng ý; mặc định skill báo cáo dừng ở Confluence.
- **Đo từ ngày đầu.** MK Observe cho Kiro, usage trong Atlassian admin cho Rovo.

## 6. Đường kỹ thuật

Hiện tại: CLI Jira/Confluence in ra cùng envelope JSON mà skill MK đã quen, nên skill giữ nguyên logic, chỉ đổi lời gọi. Khi Kiro được bật MCP: chuyển sang Atlassian MCP Server chính thức, cùng CLI có thể bọc thành MCP server mà không sửa skill lần nữa. Slack: MCP chính thức nếu admin duyệt và Kiro có MCP; nếu không, CLI bằng cookie chỉ cho pilot. Bảng so sánh chi tiết các đường nối bổ sung khi đi vào kỹ thuật.

**Câu hỏi mở**

- Gói Atlassian thực tế là gì? Giả định "dùng thoải mái" phải xác nhận bằng usage.
- Admin Slack cho đường nào?
- Khi nào MCP trong Kiro được bật?
- Chất lượng tiếng Nhật của Rovo với BrSE và comtor: cần pilot có đo.
