---
format: 1920x1080
duration: 338.6s
message: "Đừng tự xây platform có harness riêng. Chuẩn hoá dữ liệu và quy trình, nối chúng vào harness có sẵn qua chuẩn mở."
arc: concept-explainer with argument
audience: "Lãnh đạo, người duyệt ngân sách và kiến trúc sư ở tổ chức đang cân nhắc xây một AI platform nội bộ."
mode: autonomous
music: refined corporate keynote underscore, confident and calm, warm felt piano, soft strings and gentle synth pads, unobtrusive
---

# Storyboard — Chuẩn hoá và kết nối, thay vì xây một AI platform

## Video direction

- **Palette system**
  - Lấy nguyên từ frame.md (Blue Professional): nền kem `#fdfae7` trên mọi khung; thẻ tinted cobalt (fill `rgba(30,43,250,0.04)`, viền 1.5px `rgba(30,43,250,0.2)`, bo 10–14px, KHÔNG shadow); mực tiêu đề `#111111`, chữ phụ `#6b6b6b`, chữ nhạt `#9a9a9a`.
  - Cobalt `#1e2bfa` là màu nhấn duy nhất: eyebrow, số, pill, thanh tiến độ. Ngoài phần chrome đó, mỗi khung chỉ có **một** khoảnh khắc nhấn cobalt đậm (ghi ở trường `cobalt:`). Tiêu đề luôn gần-đen, không bao giờ cobalt.
  - `#059669` (xanh lá) và `#dc2626` (đỏ) chỉ dùng làm màu chữ inline cho "giữ / không mất" và "mất / rủi ro", không tô nền.
  - Không có màu tối/navy; không có khối code tối.
- **Type**
  - Space Grotesk cho tiêu đề (700, tracking −0.02em), mọi con số, eyebrow (600, IN HOA, tracking 0.08em, cobalt) và pill.
  - Inter cho câu thân và nhãn phụ (400–500, màu muted). Nhãn phụ không nhỏ hơn 22px; chữ thân trong thẻ 26–34px.
  - Font tiếng Việt trong `assets/fonts/` (frame.md § Font faces): `SpaceGrotesk-VN.woff2`, `Inter-VN.woff2`, `JetBrainsMono-VN.woff2`. Line-height tiêu đề ≥ 1.1 (h1 1.12), không cắt chiều dọc hộp chữ (dấu tiếng Việt cao).
  - Space Grotesk KHÔNG có ✓ ✗ ✱ ● ■ → ≠: nếu cần ký hiệu đó, đặt trong Inter hoặc vẽ bằng CSS/SVG.
- **Motion grammar**
  - Vào cảnh bằng `power3.out` / `expo.out`, 0.5–0.8s, dịch ngắn 16–32px + fade. Không bounce, không elastic, không xoay.
  - Mỗi chi tiết hiện đúng lúc giọng đọc nói tới (mốc ở từng dòng Scene); sau lần hiện cuối thì đứng yên để đọc.
  - Đường kẻ, mũi tên, gạch bỏ vẽ bằng scaleX từ trái sang hoặc stroke-dashoffset (0.4–0.6s). Làm mờ phần đã qua xuống ~45% khi ý mới tới.
  - Mọi khung 2–23 có slide-header: eyebrow cobalt bên trái + pill đếm "NN / 24" bên phải; thanh tiến độ cobalt 3px ở mép dưới rộng N/24 (khung 1 và 24 không có pill; khung 24 có thanh đầy).
  - Eyebrow theo chương: khung 2–8 "BỐI CẢNH 2025–2026" · 9–13 "BA KHÁI NIỆM" · 14–17 "ĐỀ XUẤT" · 18–21 "LẬP LUẬN" · 22–23 "PHẠM VI VÀ LỘ TRÌNH" · 24 "CẦN QUYẾT ĐỊNH".
- **Rhythm / held frames**
  - Khung dừng để đọc: 4 (hệ quả), 10 (phép so sánh hệ điều hành), 14 (đề xuất), 21 (platform của tài sản), 24 (chốt). Ít chuyển động, hold dài.
  - Khung dày nhất: 15, 16 (năm việc) và 18 (phép thử mất giá). Nhịp đều, từng dòng tới đúng lời.
- **Framing variety**
  - 1 bìa bất đối xứng + hai thẻ lựa chọn · 2 lưới 6 tên + dải nhịp tháng · 3 hai ổ cắm + panel foundation · 4 một khối tài sản toả ra nhiều harness + câu hero · 5 hub-and-spoke 4 nơi chạy · 6 số lớn đếm lên + hai thanh so sánh · 7 ba cột "chết ở đâu" · 8 chuỗi 3 skill + dải quản trị · 9 dải 5 khối ngang với hai ngoặc nhóm · 10 bảng ánh xạ 3 hàng + trích dẫn · 11 hai cột mạnh/chê + dải nguyên nhân · 12 khối monolith 5 tầng · 13 monolith tách thành 3 cột · 14 ba dòng mệnh đề với chip động từ · 15 thanh 5 bước + hai thẻ lớn · 16 hai hàng sơ đồ (connector, gateway) · 17 hai harness + đường ống headless tới gate · 18 thẻ câu hỏi + hai cột mất/không mất · 19 ba hàng đánh số · 20 bảng 4 hàng lo ngại → đáp ứng · 21 nền 3 tầng + câu hero · 22 lưới 2×2 + dải kết · 23 timeline 4 giai đoạn · 24 checklist 5 điều rồi câu chốt.
  - Không lặp cùng một bố cục ở hai khung liền nhau.
- **Caption keep-out**
  - Phụ đề nằm ở ~17% dưới cùng (y > 896). Mọi nội dung chính phải nằm trên y = 880.
  - Thanh tiến độ 3px ở mép dưới là ngoại lệ duy nhất. Nền full-bleed và atmosphere đặt trên lớp `.clip`.
- **Language + Negative list**
  - Chữ trên hình là tiếng Việt; thuật ngữ giữ tiếng Anh như lời đọc (harness, LLM, kit, skill, workflow, connector, data source, MCP, Agent Skills, headless, CI, SDK, IDE, gateway, RBAC, guardrail, approval gate, lock-in, registry, layer).
  - Tên công khai được phép: Claude Code, Codex, Gemini CLI, Copilot, Cursor, Kiro, Linux Foundation, Agentic AI Foundation, MIT NANDA, AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI. Không dùng logo; chỉ chữ.
  - Không tên người, không số liệu tự bịa: chỉ dùng số có trong lời hoặc tài liệu (95%, 67%, một phần ba, 5 phần, 5 việc, 1–2 harness, 4 giai đoạn, 2–4 tuần, 1–3 tháng, 1–2 tháng, 5 quyết định, 12/2025). Không dữ liệu cá nhân, token hay đường dẫn riêng.
  - Không gradient tím/xanh kiểu "AI", không robot/não/mạch điện, không icon clip-art, không shadow.
  - Không `repeat` / `yoyo` / `Math.random` / `@keyframes`.
  - Cấm hai kiểu hỏng: "slideshow" (hiện hết trong 25% đầu rồi đứng im) và "screensaver" (nhiều thứ trôi lung tung).

## Frame 1 — Câu hỏi mở màn

- scene: Bìa briefing: tiêu đề "Chuẩn hoá và kết nối" dựng lên; hai thẻ lựa chọn hiện theo lời; thẻ thứ hai được chọn
- voiceover: "Muốn đưa AI agent vào công việc của cả tổ chức, nên tự xây một platform có harness riêng, hay chuẩn hoá tài sản nội bộ rồi nối vào harness có sẵn? Đề xuất này chọn cách thứ hai."
- duration: 12.62s
- transition_in: cut
- status: animated
- src: compositions/frames/01-cau-hoi-mo-man.html
- type: hook
- persuasion: Framed dilemma + Direct answer
- beat: Curiosity → clarity
- blueprint: titlecard-reveal (Adapt)
- focal: thẻ lựa chọn B "Chuẩn hoá tài sản, nối vào harness có sẵn" khi được chọn
- roles: tiêu đề = foreground subject · hai thẻ A/B = supporting · eyebrow + accent line = chrome · panel chéo cobalt-tint + lưới chấm 3×3 bên phải = atmosphere (chỉ khung bìa)
- cobalt: viền 2px cobalt + pill đặc "ĐỀ XUẤT" gắn lên thẻ B
- sfx: pop
- sfx_at: thứ hai

narrativeRole: Đặt câu hỏi đầu tư mà lãnh đạo đang cân nhắc, và nêu ngay lựa chọn của đề xuất.
keyMessage: Hai con đường; đề xuất chọn chuẩn hoá và kết nối.

Adapt: bìa bất đối xứng, khối chữ lệch trái (~62% rộng), atmosphere bên phải; hai thẻ lựa chọn nằm ngang dưới tiêu đề.
Scene 1 (0.0–3.6s): panel chéo cobalt-tint trượt vào mép phải, lưới chấm fade lên; accent line 60×4 vẽ ra; eyebrow "PROPOSAL · DÀNH CHO LÃNH ĐẠO VÀ KIẾN TRÚC SƯ" fade lên; h1 hai dòng "Chuẩn hoá và kết nối," / "thay vì xây một AI platform" dựng từng dòng (0.2, 0.9); dòng muted "Đưa AI agent vào công việc của cả tổ chức" hiện ở "công việc" (1.3).
Scene 2 (3.6–10.0s): trên "tự xây" (3.7) thẻ A trượt lên: nhãn "A" + "Tự xây platform, harness riêng"; trên "chuẩn hoá" (7.2) thẻ B trượt lên cạnh đó: nhãn "B" + "Chuẩn hoá tài sản, nối vào harness có sẵn".
Scene 3 (10.0–12.62s): trên "chọn" (10.9) thẻ A mờ xuống ~45%; trên "thứ hai" (11.5) thẻ B nhận viền cobalt và pill "ĐỀ XUẤT" bật lên góc trên (scale 0.9→1). Đứng yên tới hết khung.

## Frame 2 — Harness đã thành hàng hoá

- scene: Sáu tên harness bật vào lưới theo lời; dải nhịp theo tháng với các vạch feature; một ô "đội nội bộ" tụt lại phía sau
- voiceover: "Bối cảnh thứ nhất: harness đã thành hàng hoá. Claude Code, Codex, Gemini CLI, Copilot, Cursor, Kiro, gần như tháng nào cũng ra feature mới. Không đội nội bộ nào đuổi kịp tốc độ đó."
- duration: 13.14s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/02-harness-thanh-hang-hoa.html
- type: context
- persuasion: Market evidence
- beat: Recognition
- blueprint: grid-card-assemble (Adapt)
- focal: lưới 6 tên harness
- roles: lưới tên = foreground subject · dải nhịp tháng = supporting · ô "đội nội bộ" = supporting · slide-header + thanh tiến độ = chrome
- cobalt: các vạch "feature mới" trên dải tháng
- sfx: click-soft
- sfx_at: Kiro,

narrativeRole: Bối cảnh 1: phần harness đã là thứ mua được, và vendor chạy đua theo tháng.
keyMessage: Không đội nội bộ nào đuổi kịp tốc độ ra feature của vendor.

Adapt: tiêu đề trên cùng; lưới 3×2 thẻ tên ở nửa trên; dải tháng ngang ở nửa dưới.
Scene 1 (0.0–3.0s): header vào; h2 "Harness đã thành hàng hoá" hiện ở "harness" (1.4); dòng muted "Phần chung: mua được, không cần tự viết" ở "hàng hoá" (2.3).
Scene 2 (3.0–8.2s): từng thẻ tên bật vào lưới đúng lời: "Claude Code" (3.0), "Codex" (4.1), "Gemini CLI" (4.8), "Copilot" (6.3), "Cursor" (7.0), "Kiro" (7.8); thẻ thêm dòng nhỏ "+ OpenCode, goose (open source)" hiện cùng Kiro.
Scene 3 (8.2–10.2s): trên "tháng nào" (8.6) dải ngang 12 ô tháng vẽ ra từ trái (scaleX); trên "feature mới" (9.4) các vạch cobalt nhỏ mọc lên ở từng ô, lần lượt trái sang phải (stagger 0.05s); nhãn các loại feature nhỏ "subagent · skill · hook · sandbox · headless · SDK · cloud agent".
Scene 4 (10.2–13.14s): trên "Không đội nội bộ" (10.2) một ô viền nét đứt "Đội nội bộ" xuất hiện ở ô tháng thứ 3, cách xa đầu dải; trên "đuổi kịp" (11.5) một đoạn khoảng cách được đo bằng mũi tên hai đầu với nhãn đỏ "luôn đi sau". Đứng yên.

## Frame 3 — Các ổ cắm đã được chuẩn hoá

- scene: Hai thẻ "ổ cắm" MCP và Agent Skills; panel Linux Foundation với mốc 12/2025 và dãy thành viên
- voiceover: "Thứ hai, các ổ cắm đã được chuẩn hoá. MCP nối agent với tool và dữ liệu. Agent Skills đóng gói quy trình. Cuối năm 2025, MCP được chuyển về Linux Foundation, và thành chuẩn chung của cả ngành."
- duration: 13.98s
- transition_in: crossfade
- status: animated
- src: compositions/frames/03-o-cam-chuan-hoa.html
- type: context
- persuasion: Authority signal
- beat: Reassurance
- blueprint: comparison-split (Adapt)
- focal: panel Agentic AI Foundation
- roles: panel foundation = foreground subject · hai thẻ ổ cắm = supporting · dãy chip thành viên = supporting · header = chrome
- cobalt: mốc "12/2025" dạng pill đặc trên panel
- sfx: ping
- sfx_at: Linux

narrativeRole: Bối cảnh 2: các chuẩn nối agent với tool và quy trình đã thành chuẩn ngành.
keyMessage: MCP và Agent Skills là chuẩn chung, được bảo trợ trung lập.

Adapt: cột trái 45% hai thẻ ổ cắm xếp dọc; cột phải 55% panel foundation.
Scene 1 (0.0–3.0s): header vào; h2 "Các ổ cắm đã được chuẩn hoá" hiện ở "ổ cắm" (0.9).
Scene 2 (3.0–7.5s): trên "MCP" (3.0) thẻ 1 trượt vào: tiêu đề "MCP" + "Nối agent với tool và dữ liệu" + dòng nhỏ "Model Context Protocol"; một biểu tượng ổ cắm vẽ bằng CSS (hai chấu) nối một đường ngắn ra mép thẻ; trên "Agent Skills" (5.5) thẻ 2 trượt vào: "Agent Skills" + "Đóng gói quy trình" + dòng nhỏ "một thư mục có SKILL.md".
Scene 3 (7.5–11.2s): trên "Cuối năm 2025" (7.5) panel phải mở ra (viền vẽ theo chu vi); pill cobalt "12/2025" bật lên; trên "chuyển về" (9.6) hai đường nối từ hai thẻ trái chạy vào panel; trên "Linux Foundation" (10.5) tiêu đề panel "Agentic AI Foundation" + dòng "thuộc Linux Foundation".
Scene 4 (11.2–13.98s): trên "chuẩn chung" (11.8) dãy chip chữ thành viên hiện stagger: AWS · Anthropic · Block · Bloomberg · Cloudflare · Google · Microsoft · OpenAI; nhãn nhỏ "thành viên hạng cao nhất". Đứng yên.

## Frame 4 — Hệ quả của chuẩn mở

- scene: Một khối "Tài sản của tổ chức" toả đường nối tới bốn harness; câu hero hiện dưới
- voiceover: "Hệ quả là tài sản viết theo các chuẩn này gắn được vào nhiều harness. Muốn sở hữu phần tích hợp, không còn phải sở hữu harness."
- duration: 8.16s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/04-he-qua-chuan-mo.html
- type: thesis
- persuasion: Reframe
- beat: Insight
- blueprint: kinetic-type-beats (Adapt)
- focal: câu hero "Sở hữu phần tích hợp, không cần sở hữu harness."
- roles: câu hero = foreground subject · khối tài sản + 4 harness + đường nối = supporting · header = chrome
- cobalt: các đường nối từ khối tài sản ra bốn harness
- hero_text: "Muốn sở hữu phần tích hợp, không còn phải sở hữu harness."
- sfx: none

narrativeRole: Rút ra hệ quả chiến lược từ các chuẩn mở.
keyMessage: Giá trị nằm ở tài sản gắn được vào nhiều harness, không ở việc sở hữu harness.

Adapt: sơ đồ ở nửa trên (khối trái, 4 ô harness xếp dọc bên phải), câu hero lớn ở dưới.
Scene 1 (0.0–4.0s): header vào; khối "Tài sản của tổ chức" (dòng nhỏ "kit · connector · data source") trượt vào bên trái ở "tài sản" (0.5); trên "chuẩn này" (1.8) nhãn "chuẩn mở" gắn lên mép phải khối; trên "nhiều harness" (3.3) bốn đường cobalt vẽ ra tới bốn ô "Claude Code", "Codex", "Kiro", "Copilot" (stagger 0.1s).
Scene 2 (4.0–8.16s): sơ đồ mờ xuống ~55%; trên "Muốn sở hữu" (4.0) câu hero dòng 1 "Sở hữu phần tích hợp," hiện; trên "không còn phải" (5.5) dòng 2 "không cần sở hữu harness." hiện, "không cần" đậm. Đứng yên tới hết khung.

## Frame 5 — Harness chạy ở mọi nơi

- scene: Hub "Một harness" ở giữa, bốn nan toả tới IDE, CI headless, SDK, cloud; dưới cùng "Tool cá nhân = Hệ thống tập trung" khác ở cách triển khai
- voiceover: "Thứ ba, cùng một harness chạy được ở mọi nơi: trong IDE, headless trong CI, nhúng qua SDK, hay trên cloud. Tool cá nhân và hệ thống tập trung giờ chỉ khác nhau ở cách triển khai."
- duration: 13.5s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/05-harness-chay-moi-noi.html
- type: context
- persuasion: Reframe
- beat: Recognition
- blueprint: grid-card-assemble (Adapt)
- focal: hub "Một harness"
- roles: hub = foreground subject · bốn nơi chạy = supporting · dòng so sánh dưới = supporting · header = chrome
- cobalt: viền hub khi bốn nan đã nối đủ
- sfx: click-soft
- sfx_at: cloud.

narrativeRole: Bối cảnh 3: ranh giới "tool cá nhân" và "hệ thống tập trung" đã mờ.
keyMessage: Cùng một harness, chỉ khác cách triển khai.

Adapt: hub tròn-bo ở tâm trên (khoảng y 300–560), bốn thẻ nơi chạy ở bốn góc quanh hub; dòng so sánh ngang ở y ~760.
Scene 1 (0.0–3.8s): header vào; h2 "Một harness, chạy ở mọi nơi" hiện ở "Thứ ba" (0.2); hub "Một harness" scale 0.94→1 ở "harness" (1.5).
Scene 2 (3.8–9.1s): từng nan vẽ ra và thẻ hiện đúng lời: "IDE · tương tác" (4.5), "Headless trong CI" (5.1), "Nhúng qua SDK" (7.3), "Agent trên cloud" (8.6); khi nan cuối nối xong, viền hub chuyển cobalt.
Scene 3 (9.1–13.5s): trên "Tool cá nhân" (9.1) thẻ nhỏ "Tool cá nhân" hiện trái; trên "hệ thống tập trung" (9.8) thẻ "Hệ thống tập trung" hiện phải; giữa hai thẻ ký hiệu "=" (Inter); trên "cách triển khai" (12.1) nhãn dưới "chỉ khác ở cách triển khai". Đứng yên.

## Frame 6 — Tín hiệu từ MIT

- scene: Số 95% đếm lên; hai thanh so sánh mua/hợp tác ~67% và tự xây ≈ một phần ba mức đó
- voiceover: "Còn doanh nghiệp thì vẫn khó ra kết quả. Báo cáo của MIT năm 2025 ghi nhận khoảng 95% tổ chức chưa thấy lợi nhuận đo được từ generative AI. Mua hoặc hợp tác thành công khoảng 67%. Tự xây chỉ bằng một phần ba mức đó."
- duration: 18.7s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-tin-hieu-mit.html
- type: evidence
- persuasion: Data point + Contrast
- beat: Concern
- blueprint: dataviz-countup (Adapt)
- focal: số "95%"
- roles: số 95% = foreground subject · hai thanh so sánh = supporting · dòng nguồn = chrome · header = chrome
- cobalt: thanh "Mua hoặc hợp tác ~67%"
- sfx: click-soft
- sfx_at: 67%.

narrativeRole: Bằng chứng rằng khó khăn của doanh nghiệp không nằm ở model, và tự xây kém hơn mua.
keyMessage: Mua/hợp tác thành công gấp khoảng ba lần tự xây.

Adapt: bố cục hai cột: trái 42% số lớn 95% + nhãn; phải 58% hai thanh ngang có nhãn; dòng nguồn nhỏ dưới cùng bên trái.
Scene 1 (0.0–4.0s): header vào; h2 "Doanh nghiệp vẫn khó ra kết quả" hiện ở "doanh nghiệp" (0.4); trên "Báo cáo" (2.8) dòng nguồn "MIT NANDA · The GenAI Divide · 2025 · báo cáo sơ bộ" fade lên.
Scene 2 (4.0–11.6s): trên "khoảng" (6.5) số "0%" xuất hiện rồi đếm lên tới "95%" xong ở (7.8), Space Grotesk 700 rất lớn, chữ đen; trên "chưa thấy" (8.6) nhãn dưới "tổ chức chưa thấy lợi nhuận đo được từ generative AI" hiện.
Scene 3 (11.6–15.4s): trên "Mua" (11.6) nhãn "Mua hoặc hợp tác" + thanh cobalt mọc theo scaleX tới 67% chiều rộng khung chứa; trên "67%" (14.8) số "~67%" hiện ở đầu thanh.
Scene 4 (15.4–18.7s): trên "Tự xây" (15.4) nhãn "Tự xây nội bộ" + thanh xám mọc tới đúng 1/3 độ dài thanh trên; trên "một phần ba" (16.6) nhãn "≈ ⅓ mức đó" hiện đầu thanh (ký hiệu trong Inter). Đứng yên.

## Frame 7 — Chết ở dữ liệu, không chết ở model

- scene: Pill cảnh báo "sơ bộ · mẫu nhỏ · tín hiệu"; ba cột Model / Dữ liệu / Nối vào quy trình, hai cột sau được đánh dấu "thường chết ở đây"
- voiceover: "Mẫu của báo cáo không lớn, nên chỉ đọc như một tín hiệu. Nhưng tín hiệu đó trùng với thực tế: dự án AI thường chết ở dữ liệu và ở phần nối vào quy trình, hiếm khi chết ở model."
- duration: 13.08s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/07-chet-o-du-lieu.html
- type: insight
- persuasion: Honest caveat + Pattern match
- beat: Insight
- blueprint: comparison-split (Adapt)
- focal: hai cột "Dữ liệu" và "Nối vào quy trình"
- roles: ba cột = foreground subject · pill cảnh báo = supporting · header = chrome
- cobalt: viền và thẻ nhãn "thường chết ở đây" trên hai cột
- sfx: click-soft
- sfx_at: quy trình,

narrativeRole: Thừa nhận giới hạn của số liệu, rồi nối nó với quan sát thực tế.
keyMessage: Dự án AI chết ở dữ liệu và phần nối vào quy trình, hiếm khi ở model.

Adapt: pill cảnh báo trên cùng dưới header; ba cột thẻ cao bằng nhau chiếm giữa khung.
Scene 1 (0.0–4.2s): header vào; pill viền muted "Báo cáo sơ bộ · mẫu không lớn" hiện ở "Mẫu" (0.0); trên "tín hiệu" (3.1) pill thứ hai "Chỉ đọc như một tín hiệu" nối sau.
Scene 2 (4.2–6.2s): trên "trùng với thực tế" (5.1) h2 "Dự án AI thường chết ở đâu?" hiện; ba thẻ cột trượt lên stagger: "Model", "Dữ liệu", "Nối vào quy trình", đều muted.
Scene 3 (6.2–10.6s): trên "dữ liệu" (7.8) thẻ "Dữ liệu" nhận viền cobalt và nhãn "thường chết ở đây"; trên "quy trình" (9.9) thẻ "Nối vào quy trình" cũng vậy.
Scene 4 (10.6–13.08s): trên "hiếm khi" (10.6) thẻ "Model" mờ xuống ~45% và nhận nhãn muted "hiếm khi". Đứng yên.

## Frame 8 — Rủi ro mới: chuỗi cung ứng skill

- scene: Ba thẻ skill, mỗi cái có dấu "qua kiểm tra"; một ngoặc gộp dưới đánh dấu đỏ "tổ hợp → đường tấn công"; dải cuối "Kit được quản trị như code"
- voiceover: "Kèm theo là một rủi ro mới. Khi skill thành chuẩn chung, nó cũng thành đường tấn công, kể cả bằng tổ hợp nhiều skill mà từng cái đều qua kiểm tra. Vì vậy kit phải được quản trị như code."
- duration: 11.5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-rui-ro-chuoi-cung-ung.html
- type: risk
- persuasion: Threat + Remedy
- beat: Caution
- blueprint: grid-card-assemble (Adapt)
- focal: ngoặc tổ hợp dưới ba skill
- roles: ba thẻ skill = foreground subject · ngoặc tổ hợp = supporting · dải quản trị = supporting · header = chrome
- cobalt: dải "Kit được quản trị như code"
- sfx: click-soft
- sfx_at: quản trị

narrativeRole: Một rủi ro mới đi kèm chuẩn chung, và cách xử lý nó.
keyMessage: Skill là chuỗi cung ứng; kit phải được quản trị như code.

Adapt: ba thẻ skill ngang ở giữa trên, ngoặc gộp dưới chúng; dải quản trị ngang dưới cùng vùng nội dung.
Scene 1 (0.0–2.2s): header vào; h2 "Rủi ro mới: skill thành chuỗi cung ứng" hiện ở "rủi ro" (1.1).
Scene 2 (2.2–5.8s): trên "skill" (2.3) thẻ skill đầu tiên hiện với nhãn "chuẩn chung"; trên "đường tấn công" (4.5) một mũi tên đỏ mảnh chạm vào thẻ với nhãn đỏ nhỏ "đường tấn công".
Scene 3 (5.8–8.5s): trên "tổ hợp nhiều skill" (5.8) thẻ 2 và 3 trượt vào cạnh thẻ 1; trên "đều qua" (7.4) mỗi thẻ nhận một dấu ✓ xanh lá (Inter) "qua kiểm tra" stagger; trên "kiểm tra" (7.8) ngoặc dưới cả ba vẽ ra với nhãn đỏ "ghép lại → tấn công".
Scene 4 (8.5–11.5s): trên "Vì vậy" (8.5) phần trên mờ ~55%; trên "quản trị" (9.9) dải cobalt-tint viền cobalt "Kit được quản trị như code" hiện, kèm chip "review · version · owner · registry nội bộ". Đứng yên.

## Frame 9 — Năm phần của một agent

- scene: Dải 5 khối ngang LLM, Harness, Kit, Data source, Hạ tầng; ngoặc "Vendor có" trên hai khối đầu, ngoặc "Chỉ tổ chức có" dưới Kit và Data source
- voiceover: "Một agent làm việc thật gồm năm phần: LLM, harness, kit, data source và hạ tầng. LLM và harness thì vendor có. Kit và data source thì chỉ tổ chức mới có."
- duration: 13.18s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/09-nam-phan-cua-agent.html
- type: concept
- persuasion: Decomposition
- beat: Clarity
- blueprint: grid-card-assemble (Adapt)
- focal: ngoặc "Chỉ tổ chức có"
- roles: năm khối = foreground subject · hai ngoặc nhóm = supporting · header = chrome
- cobalt: ngoặc và nhãn đặc "Chỉ tổ chức có"
- sfx: pop
- sfx_at: chỉ tổ chức

narrativeRole: Khái niệm 1: tách một agent thành năm phần để thấy phần nào là của riêng tổ chức.
keyMessage: LLM và harness vendor có; kit và data source chỉ tổ chức có.

Adapt: năm khối cao bằng nhau xếp hàng ngang ở giữa khung (mỗi khối ~300px rộng), ngoặc trên và dưới.
Scene 1 (0.0–2.5s): header vào; h2 "Một agent làm việc thật gồm năm phần" hiện ở "agent" (0.3).
Scene 2 (2.5–7.0s): từng khối trượt lên đúng lời, có dòng mô tả ngắn: "LLM · sinh câu trả lời" (2.5), "Harness · agent loop, tool, permission" (3.7), "Kit · skill, workflow, guardrail" (4.7), "Data source · tài liệu, code, dữ liệu dự án" (4.9), "Hạ tầng · nơi chạy, gateway, log" (6.0).
Scene 3 (7.0–10.2s): trên "LLM và harness" (7.0) ngoặc trên hai khối đầu vẽ ra; trên "vendor có" (8.6) nhãn "Vendor có" hiện muted; khối "Hạ tầng" nhận nhãn nhỏ "cloud có sẵn, tổ chức cấu hình".
Scene 4 (10.2–13.18s): trên "Kit và data source" (10.2) ngoặc dưới Kit + Data source vẽ ra màu cobalt; trên "chỉ tổ chức" (11.2) pill đặc cobalt "Chỉ tổ chức có" bật lên; hai khối đó sáng lên, ba khối còn lại mờ ~60%. Đứng yên.

## Frame 10 — Phép so sánh hệ điều hành

- scene: Bảng ánh xạ ba hàng LLM→CPU, Harness→Hệ điều hành, Kit và dữ liệu→Ứng dụng nghiệp vụ; câu trích dẫn chốt bên dưới
- voiceover: "Dễ nhớ nhất: LLM giống CPU, harness giống hệ điều hành, còn kit và dữ liệu giống ứng dụng nghiệp vụ. Không doanh nghiệp nào tự viết hệ điều hành chỉ để chạy phần mềm kế toán."
- duration: 12.36s
- transition_in: crossfade
- status: animated
- src: compositions/frames/10-so-sanh-he-dieu-hanh.html
- type: analogy
- persuasion: Analogy
- beat: Aha
- blueprint: kinetic-type-beats (Adapt)
- focal: câu trích dẫn "Không doanh nghiệp nào tự viết hệ điều hành chỉ để chạy phần mềm kế toán."
- roles: câu trích = foreground subject · bảng ánh xạ = supporting · header = chrome
- cobalt: hàng thứ ba "Kit và dữ liệu → Ứng dụng nghiệp vụ" (viền trái 4px cobalt)
- hero_text: "Không doanh nghiệp nào tự viết hệ điều hành chỉ để chạy phần mềm kế toán."
- sfx: none

narrativeRole: Làm cho phép tách năm phần dễ nhớ bằng một phép so sánh quen thuộc.
keyMessage: Tự viết harness giống như tự viết hệ điều hành.

Adapt: ba hàng ánh xạ ở nửa trên (cột trái thuật ngữ agent, mũi tên mảnh, cột phải thuật ngữ máy tính); câu trích lớn ở nửa dưới.
Scene 1 (0.0–1.4s): header vào; eyebrow phụ "DỄ NHỚ NHẤT" hiện ở "Dễ nhớ" (0.0).
Scene 2 (1.4–7.5s): hàng 1: "LLM" (1.4) → mũi tên vẽ → "CPU" (2.6); hàng 2: "Harness" (3.0) → "Hệ điều hành" (3.7); hàng 3: "Kit và dữ liệu" (5.0) → "Ứng dụng nghiệp vụ" (6.3), hàng 3 nhận viền trái cobalt.
Scene 3 (7.5–12.36s): bảng mờ xuống ~55%; trên "Không doanh nghiệp nào" (7.5) câu trích dòng 1 "Không doanh nghiệp nào tự viết hệ điều hành" hiện; trên "chỉ để" (9.4) dòng 2 "chỉ để chạy phần mềm kế toán." hiện. Đứng yên tới hết khung.

## Frame 11 — Harness cá nhân

- scene: Hai cột: trái "Điểm mạnh", phải "Hay bị chê" với ba lời chê; dải nguyên nhân dưới cùng "Thiếu kit, dữ liệu, governance dùng chung"
- voiceover: "Harness cá nhân có năng lực tốt nhất thị trường, nhưng hay bị chê: kết quả phụ thuộc kỹ năng prompt, mỗi người một cấu hình, log nằm trên máy riêng. Phần lớn điểm yếu đó đến từ việc thiếu kit, dữ liệu và governance dùng chung, không phải từ harness."
- duration: 16.06s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/11-harness-ca-nhan.html
- type: concept
- persuasion: Fair assessment + Root cause
- beat: Reframe
- blueprint: comparison-split (Adapt)
- focal: dải nguyên nhân
- roles: dải nguyên nhân = foreground subject · hai cột = supporting · header = chrome
- cobalt: dải nguyên nhân "Thiếu kit · dữ liệu · governance dùng chung"
- sfx: click-soft
- sfx_at: thiếu

narrativeRole: Khái niệm 2: harness cá nhân; điểm yếu của nó không đến từ harness.
keyMessage: Những lời chê harness thực ra là thiếu kit, dữ liệu và governance dùng chung.

Adapt: hai cột thẻ ở nửa trên (trái 40%, phải 60%); dải nguyên nhân ngang toàn chiều rộng ở dưới, có mũi tên từ cột phải xuống.
Scene 1 (0.0–2.9s): header vào; h2 "Harness cá nhân" hiện ở "Harness" (0.2); thẻ trái "Điểm mạnh" hiện với dòng "Năng lực tốt nhất thị trường" ở "tốt nhất" (1.4), thêm dòng nhỏ "Claude Code · Kiro · Cursor · Copilot · Codex CLI".
Scene 2 (2.9–9.0s): trên "hay bị chê" (3.4) thẻ phải "Hay bị chê" hiện; từng dòng chê hiện đúng lời: "Kết quả phụ thuộc kỹ năng prompt" (4.2), "Mỗi người một cấu hình" (6.0), "Log nằm trên máy riêng" (7.7).
Scene 3 (9.0–14.1s): trên "Phần lớn" (9.0) mũi tên mảnh vẽ từ thẻ phải xuống; trên "thiếu" (11.2) dải cobalt-tint "Nguyên nhân: thiếu kit · dữ liệu · governance dùng chung" hiện, ba cụm sáng dần theo lời (kit 11.7, dữ liệu 12.1, governance 12.8).
Scene 4 (14.1–16.06s): trên "không phải" (14.1) nhãn "không phải do harness" hiện cạnh thẻ trái (chữ xanh lá). Đứng yên.

## Frame 12 — Platform tập trung

- scene: Một khối monolith năm tầng dựng lên; ba động cơ chính đáng gắn bên cạnh; viền khối đậm lên ở "một khối"
- voiceover: "Còn platform tập trung thường có năm phần: knowledge base, multi-agent orchestration, integration, governance và chat UI. Động cơ đều chính đáng. Vấn đề là nó gộp những thứ khác bản chất vào một khối."
- duration: 15.26s
- transition_in: crossfade
- status: animated
- src: compositions/frames/12-platform-tap-trung.html
- type: concept
- persuasion: Steelman
- beat: Tension
- blueprint: grid-card-assemble (Adapt)
- focal: khối monolith
- roles: monolith = foreground subject · ba động cơ = supporting · header = chrome
- cobalt: viền ngoài 3px của monolith ở "một khối"
- sfx: click-soft
- sfx_at: một khối.

narrativeRole: Khái niệm 3: trình bày platform tập trung một cách công bằng trước khi mổ xẻ.
keyMessage: Động cơ đúng, nhưng thiết kế gộp năm thứ khác bản chất vào một khối.

Adapt: monolith dọc ở giữa-trái (~560px rộng, năm tầng xếp chồng); cột động cơ ở bên phải.
Scene 1 (0.0–3.1s): header vào; h2 "Platform tập trung" hiện ở "platform" (0.2); nhãn nhỏ "thường có năm phần" ở "năm phần" (2.1).
Scene 2 (3.1–9.2s): năm tầng dựng từ dưới lên đúng lời: "1 · Knowledge base" (3.1), "2 · Multi-agent orchestration" (4.2), "3 · Integration" (6.2), "4 · Governance" (7.3), "5 · Chat UI" (8.5).
Scene 3 (9.2–11.3s): trên "Động cơ" (9.2) cột phải hiện tiêu đề nhỏ "Động cơ chính đáng" và ba dòng stagger: "Kết quả đồng đều", "Kiểm soát", "Tự động hoá cao hơn" (xong ~10.6).
Scene 4 (11.3–15.26s): cột động cơ mờ ~45%; trên "gộp" (12.1) các khe giữa năm tầng khép lại (gap → 0) thành một khối liền; trên "một khối" (14.1) viền ngoài cobalt 3px vẽ quanh khối, nhãn đỏ "năm thứ khác bản chất, một khối". Đứng yên.

## Frame 13 — Tách khối

- scene: Monolith tách thành ba cột: "Chỉ tổ chức có", "Mua hoặc cấu hình", "Chính là viết lại harness"
- voiceover: "Knowledge base và integration là tài sản chỉ tổ chức có. Governance phần lớn mua hoặc cấu hình được. Còn orchestration và chat UI, xét cho cùng, chính là viết lại harness."
- duration: 12.32s
- transition_in: cut
- status: animated
- src: compositions/frames/13-tach-khoi.html
- type: analysis
- persuasion: Decomposition + Reveal
- beat: Aha
- blueprint: comparison-split (Adapt)
- focal: cột "Chính là viết lại harness"
- roles: ba cột = foreground subject · nhãn cột = supporting · header = chrome
- cobalt: tiêu đề cột "Chỉ tổ chức có" (pill đặc)
- sfx: whoosh-short
- sfx_at: 0.3

narrativeRole: Tách khối platform để lộ ra phần thật ra là viết lại harness.
keyMessage: Orchestration và chat UI chính là viết lại harness.

Adapt: khung mở bằng năm tầng ở vị trí giống cuối khung 12 (một khối), rồi chúng trượt tách thành ba cột ngang bằng nhau.
Scene 1 (0.0–0.8s): năm tầng hiện dạng liền khối ở giữa (khớp khung 12) rồi tách ra (0.3), mỗi tầng bay về cột của nó (power3.inOut, 0.7s).
Scene 2 (0.8–4.5s): cột 1 "Knowledge base", "Integration": trên "tài sản" (2.1) tiêu đề cột pill cobalt "Chỉ tổ chức có" bật lên; dòng nhỏ xanh lá "giữ lại, đầu tư".
Scene 3 (4.5–6.8s): cột 2 "Governance": trên "Governance" (4.5) tiêu đề "Mua hoặc cấu hình" hiện; dòng muted "phần lớn có sẵn".
Scene 4 (6.8–12.32s): cột 3 "Orchestration", "Chat UI": trên "xét cho cùng" (8.9) tiêu đề cột hiện; trên "viết lại harness" (10.3) nhãn đỏ đậm "= viết lại harness" hiện và cột 3 nhận viền đứt đỏ. Đứng yên.

## Frame 14 — Đề xuất

- scene: Ba mệnh đề lớn với chip động từ CHUẨN HOÁ, NỐI, MUA
- voiceover: "Vì vậy, đề xuất là: chuẩn hoá thứ bên ngoài không có, là dữ liệu và quy trình. Nối chúng tới mọi harness qua connector theo chuẩn mở. Harness và LLM thì mua, hoặc dùng bản open source."
- duration: 15.12s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/14-de-xuat.html
- type: thesis
- persuasion: Clear recommendation
- beat: Resolution
- blueprint: kinetic-type-beats (Adapt)
- focal: mệnh đề 1 "Chuẩn hoá thứ bên ngoài không có: dữ liệu và quy trình."
- roles: ba mệnh đề = foreground subject · chip động từ = supporting · header = chrome
- cobalt: gạch chân cobalt dưới "dữ liệu và quy trình"
- hero_text: "Chuẩn hoá thứ bên ngoài không có: dữ liệu và quy trình."
- sfx: pop
- sfx_at: đề xuất

narrativeRole: Nêu đề xuất trung tâm thành ba mệnh đề.
keyMessage: Chuẩn hoá dữ liệu và quy trình, nối qua chuẩn mở, mua harness và LLM.

Adapt: ba hàng lớn xếp dọc, lệch trái; chip động từ (Space Grotesk 600 IN HOA) ở đầu mỗi hàng.
Scene 1 (0.0–2.2s): header vào; eyebrow phụ "ĐỀ XUẤT TRUNG TÂM" hiện ở "đề xuất" (1.0).
Scene 2 (2.2–5.5s): trên "chuẩn hoá" (2.2) chip "CHUẨN HOÁ" + dòng "Thứ bên ngoài không có: dữ liệu và quy trình." hiện; trên "dữ liệu" (4.2) gạch chân cobalt vẽ dưới "dữ liệu và quy trình".
Scene 3 (5.5–10.0s): trên "Nối" (5.5) chip "NỐI" + dòng "Tới mọi harness, qua connector theo chuẩn mở." hiện.
Scene 4 (10.0–15.12s): trên "Harness và LLM" (10.0) chip "MUA" + dòng "Harness và LLM: mua, hoặc dùng open source." hiện; hàng 3 có màu muted hơn hai hàng trên (không phải chỗ đầu tư). Đứng yên tới hết khung.

## Frame 15 — Việc một và hai: dữ liệu và kit

- scene: Thanh 5 bước ở trên; tri thức rải rác hội tụ vào thẻ Data source AI-ready; thẻ Kit AI-ready với chip owner, review, version
- voiceover: "Cụ thể có năm việc. Một: đưa tri thức rải rác thành data source AI-ready, có cấu trúc, có nguồn gốc, có phân quyền. Hai: viết lại quy trình chuẩn thành kit gồm skill và workflow, quản lý như code, có owner, review và version."
- duration: 19.82s
- transition_in: crossfade
- status: animated
- src: compositions/frames/15-du-lieu-va-kit.html
- type: plan
- persuasion: Concrete steps
- beat: Momentum
- blueprint: grid-card-assemble (Adapt)
- focal: hai thẻ lớn Data source và Kit
- roles: hai thẻ = foreground subject · mảnh tri thức rải rác + chip = supporting · thanh 5 bước = chrome
- cobalt: ô bước đang hoạt động trên thanh 5 bước
- sfx: click-soft
- sfx_at: Hai:

narrativeRole: Đi vào cụ thể: hai tài sản trung tâm.
keyMessage: Dữ liệu thành data source AI-ready; quy trình thành kit quản lý như code.

Adapt: thanh 5 bước ngang dưới header (năm ô "1 Data", "2 Kit", "3 Connector", "4 Governance", "5 Harness"); hai thẻ lớn cạnh nhau bên dưới.
Scene 1 (0.0–2.3s): header vào; thanh 5 bước vẽ ra ở "năm việc" (1.1), năm ô hiện stagger.
Scene 2 (2.3–10.2s): trên "Một" (2.3) ô 1 chuyển cobalt; trên "tri thức rải rác" (3.5) sáu mảnh nhãn nhỏ (wiki, issue tracker, chat, source code, spec, biên bản họp) hiện rải rác trong vùng thẻ trái; trên "data source" (5.0) chúng trượt hội tụ vào tiêu đề thẻ "Data source AI-ready"; chip hiện đúng lời: "có cấu trúc" (6.7), "có nguồn gốc" (7.9), "có phân quyền" (9.1).
Scene 3 (10.2–15.1s): thẻ trái mờ ~55%; trên "Hai" (10.2) ô 2 chuyển cobalt, ô 1 về tint; trên "kit" (12.6) thẻ phải "Kit AI-ready" hiện; trên "skill" (13.7) dòng "skill · workflow · template · checklist · guardrail".
Scene 4 (15.1–19.82s): trên "quản lý như code" (15.1) nhãn "Quản lý như code"; chip hiện đúng lời: "owner" (16.8), "review" (17.3), "version" (18.2), thêm chip "kit registry". Đứng yên.

## Frame 16 — Việc ba và bốn: connector và governance mỏng

- scene: Hàng trên: hệ thống nội bộ → connector (CLI, MCP server) → nhiều harness, kèm khoá "quyền người gọi"; hàng dưới: harness → LLM gateway → model, với cost/log, policy cùng kit, human gate ở PR review và CI
- voiceover: "Ba: connector trung lập với harness, qua CLI hoặc MCP server, dùng quyền của người gọi. Bốn: governance mỏng, với LLM gateway ghi cost và log, policy phát hành cùng kit, và human gate đặt ở PR review và CI."
- duration: 16.7s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/16-connector-va-governance.html
- type: plan
- persuasion: Concrete steps
- beat: Momentum
- blueprint: grid-card-assemble (Adapt)
- focal: ô "LLM gateway" ở hàng dưới
- roles: hai hàng sơ đồ = foreground subject · nhãn phụ = supporting · thanh 5 bước = chrome
- cobalt: ô bước đang hoạt động trên thanh 5 bước
- sfx: click-soft
- sfx_at: Bốn:

narrativeRole: Hai việc nối và kiểm soát, không cần harness riêng.
keyMessage: Connector viết một lần dùng cho mọi harness; governance nằm ở gateway và quy trình có sẵn.

Adapt: thanh 5 bước giống khung 15 (ô 3, 4 lần lượt cobalt); hai hàng sơ đồ ngang, mỗi hàng ~230px cao, có nhãn "3" và "4" ở đầu.
Scene 1 (0.0–6.5s): trên "Ba" (0.0) ô 3 chuyển cobalt; hàng trên: ô "Hệ thống nội bộ" hiện trái; trên "connector" (0.3) ô "Connector trung lập" ở giữa, mũi tên vẽ nối; trên "CLI" (3.0) và "MCP server" (3.6) hai chip gắn dưới ô connector; ba ô harness nhỏ bên phải nối bằng ba đường; trên "quyền" (4.5) nhãn "dùng quyền của người gọi" + biểu tượng khoá vẽ bằng CSS.
Scene 2 (6.5–11.5s): hàng trên mờ ~55%; trên "Bốn" (6.5) ô 4 chuyển cobalt; hàng dưới: "Harness" → "LLM gateway" (9.1) → "Model của vendor"; trên "cost" (10.3) và "log" (11.0) hai chip "cost theo user, dự án" và "log request" gắn dưới gateway.
Scene 3 (11.5–16.7s): trên "policy" (11.5) chip "policy phát hành cùng kit"; trên "human gate" (13.7) ô cổng nhỏ "Human gate" hiện cuối hàng; trên "PR review" (15.0) và "CI" (16.2) hai nhãn "PR review", "approval trong CI". Đứng yên.

## Frame 17 — Việc năm: harness chạy headless

- scene: Hai ô harness chuẩn với nhãn "định dạng mở"; đường ống ngang harness → headless trong CI → cùng kit → approval gate cuối
- voiceover: "Năm: chọn một đến hai harness chuẩn, và giữ tài sản ở định dạng mở. Cần tự động hoá cao hơn thì cho chính harness đó chạy headless trong CI, cùng kit, và dừng ở một approval gate cuối."
- duration: 12.66s
- transition_in: crossfade
- status: animated
- src: compositions/frames/17-harness-chay-headless.html
- type: plan
- persuasion: Concrete steps
- beat: Resolution
- blueprint: grid-card-assemble (Adapt)
- focal: ô "Approval gate cuối"
- roles: đường ống = foreground subject · hai ô harness = supporting · thanh 5 bước = chrome
- cobalt: ô "Approval gate cuối" (viền và biểu tượng cổng)
- sfx: ping
- sfx_at: approval gate

narrativeRole: Việc cuối: chọn harness chuẩn, và tự động hoá bằng chính harness đó.
keyMessage: Tự động hoá cao hơn = chạy headless cùng kit, dừng ở approval gate.

Adapt: thanh 5 bước (ô 5 cobalt); nửa trên hai ô harness và nhãn định dạng mở; nửa dưới đường ống ngang bốn chặng.
Scene 1 (0.0–5.0s): trên "Năm" (0.0) ô 5 chuyển cobalt; trên "một đến hai" (1.1) hai ô "Harness chuẩn 1", "Harness chuẩn 2" hiện; trên "định dạng mở" (4.0) nhãn "Tài sản ở định dạng mở · đổi harness được" hiện cạnh chúng.
Scene 2 (5.0–10.3s): phần trên mờ ~55%; trên "tự động hoá" (5.2) tiêu đề nhỏ "Tự động hoá cao hơn"; đường ống vẽ từ trái: "Cùng harness" (7.3), "Headless trong CI" (8.4), "Cùng kit và data source" (9.5), mỗi chặng nối bằng mũi tên.
Scene 3 (10.3–12.66s): trên "approval gate" (11.2) chặng cuối "Approval gate cuối" hiện với viền cobalt, biểu tượng cổng vẽ bằng CSS và nhãn "người duyệt". Đứng yên.

## Frame 18 — Phép thử mất giá

- scene: Thẻ câu hỏi trên; hai cột "Mất" và "Không mất"; ba mục bên mất bị gạch bỏ; ba mục bên không mất nhận dấu giữ
- voiceover: "Vì sao không tự viết harness? Hãy dùng phép thử mất giá: nếu quý sau vendor ra đúng thứ này, khoản đầu tư có mất trắng không? Agent loop, orchestration, chat UI: mất. Dữ liệu, kit và connector: không mất."
- duration: 17.76s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/18-phep-thu-mat-gia.html
- type: argument
- persuasion: Decision test
- beat: Conviction
- blueprint: comparison-split (Adapt)
- focal: hai cột mất / không mất
- roles: hai cột = foreground subject · thẻ câu hỏi = supporting · header = chrome
- cobalt: viền cột "Không mất"
- sfx: click-soft
- sfx_at: 12.43

narrativeRole: Lập luận chính vì sao không tự viết harness.
keyMessage: Đầu tư vào harness mất giá khi vendor ra feature; dữ liệu, kit, connector thì không.

Adapt: thẻ câu hỏi ngang toàn chiều rộng phía trên; hai cột bằng nhau bên dưới.
Scene 1 (0.0–2.6s): header vào; h2 "Vì sao không tự viết harness?" hiện ở "Vì sao" (0.0).
Scene 2 (2.6–8.7s): trên "phép thử mất giá" (3.0) thẻ câu hỏi hiện với nhãn "PHÉP THỬ MẤT GIÁ"; câu hỏi hiện theo cụm: "Nếu quý sau vendor ra đúng thứ này," (4.1), "khoản đầu tư có mất trắng không?" (7.0).
Scene 3 (8.7–13.1s): cột trái tiêu đề đỏ "Mất" hiện; từng mục hiện đúng lời: "Agent loop" (8.7), "Orchestration" (9.9), "Chat UI" (11.5); trên "mất" (12.4) ba đường gạch bỏ vẽ qua ba mục (stagger 0.08s), chữ mờ ~45%.
Scene 4 (13.1–17.76s): cột phải tiêu đề xanh lá "Không mất" hiện; từng mục: "Dữ liệu" (13.1), "Kit theo quy trình riêng" (14.3), "Connector tới hệ thống nội bộ" (14.8); trên "không mất" (15.9) viền cột chuyển cobalt và nhãn nhỏ "bên ngoài không có". Đứng yên.

## Frame 19 — Thêm ba lý do

- scene: Ba hàng đánh số lớn; mỗi hàng một lý do, hàng trước mờ khi hàng sau tới
- voiceover: "Thêm nữa, mức tự động hoá là tính chất của workflow, không phải của tool. Lock-in lớn nhất là một harness tự viết mà chỉ đội làm ra nó bảo trì được. Và người giỏi nhất bị dồn vào phần không tạo khác biệt."
- duration: 12.62s
- transition_in: crossfade
- status: animated
- src: compositions/frames/19-them-ba-ly-do.html
- type: argument
- persuasion: Stacked reasons
- beat: Conviction
- blueprint: kinetic-type-beats (Adapt)
- focal: hàng đang được đọc
- roles: ba hàng = foreground subject · số thứ tự = supporting · header = chrome
- cobalt: số "02" của hàng lock-in
- sfx: none

narrativeRole: Củng cố lập luận bằng ba lý do phụ.
keyMessage: Tự động hoá thuộc workflow; lock-in thật là harness tự viết; chi phí cơ hội.

Adapt: ba hàng ngang cao bằng nhau, số lớn Space Grotesk bên trái, tiêu đề + dòng phụ bên phải; không lặp bố cục hai cột của khung 18.
Scene 1 (0.0–4.5s): header vào; hàng 01 hiện ở "mức tự động hoá" (0.7): tiêu đề "Tự động hoá là tính chất của workflow" + dòng phụ "không phải của tool: cùng harness, dừng hỏi người mỗi bước hay chạy trọn chuỗi skill" hiện ở "workflow" (3.0).
Scene 2 (4.5–9.4s): hàng 01 mờ ~45%; hàng 02 hiện ở "Lock-in" (4.5): số "02" cobalt, tiêu đề "Lock-in lớn nhất là harness tự viết" + dòng phụ "chỉ đội làm ra nó bảo trì được" ở "bảo trì" (8.4).
Scene 3 (9.4–12.62s): hàng 02 mờ ~45%; hàng 03 hiện ở "người giỏi nhất" (9.7): tiêu đề "Chi phí cơ hội" + dòng phụ "người giỏi nhất bị dồn vào phần không tạo khác biệt" ở "dồn" (10.6). Đứng yên.

## Frame 20 — Lo ngại và cách đáp ứng

- scene: Bảng bốn hàng: lo ngại bên trái, mũi tên, cách đáp ứng bên phải
- voiceover: "Những lo ngại về harness đều có cách đáp ứng. Kit cho kết quả đồng đều. Gateway cho audit và chi phí. RBAC cho dữ liệu nhạy cảm. Guardrail trong kit cho việc chạy tự động."
- duration: 13.06s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/20-lo-ngai-va-dap-ung.html
- type: objection-handling
- persuasion: Objection → Answer
- beat: Reassurance
- blueprint: grid-card-assemble (Adapt)
- focal: cột cách đáp ứng
- roles: bảng 4 hàng = foreground subject · tiêu đề cột = supporting · header = chrome
- cobalt: chip "Guardrail trong kit" ở hàng cuối
- sfx: click-soft
- sfx_at: Guardrail

narrativeRole: Trả lời trước các phản biện hay gặp về harness.
keyMessage: Mọi lo ngại chính đều có cách đáp ứng mà không cần tự viết platform.

Adapt: bảng hai cột với tiêu đề cột "Lo ngại" và "Cách đáp ứng"; mỗi hàng: thẻ lo ngại trái (muted) → mũi tên → chip đáp ứng phải.
Scene 1 (0.0–3.3s): header vào; h2 "Lo ngại chính đáng, và cách đáp ứng" hiện ở "lo ngại" (0.6); tiêu đề cột hiện ở "đáp ứng" (2.7).
Scene 2 (3.3–7.9s): hàng 1 "Kết quả phụ thuộc người" → "Kit" + dòng "kết quả đồng đều" (3.3); hàng 2 "Audit, chi phí" → "LLM gateway" + "audit, budget theo user và dự án" (5.4).
Scene 3 (7.9–13.06s): hàng 3 "Dữ liệu nhạy cảm" → "RBAC" + "connector dùng quyền người gọi" (7.9); hàng 4 "Chạy tự động nguy hiểm" → "Guardrail trong kit" + "permission, hook, sandbox, deny list" (10.2), chip hàng 4 cobalt. Đứng yên.

## Frame 21 — Platform của tài sản

- scene: Nền ba tầng data layer, kit registry, governance layer; câu hero "Platform của tài sản, không phải platform của harness."
- voiceover: "Phần thật sự cần xây tập trung chỉ còn data layer, kit registry và governance layer. Đó vẫn là một platform, nhưng là platform của tài sản, không phải platform của harness."
- duration: 13.2s
- transition_in: crossfade
- status: animated
- src: compositions/frames/21-platform-cua-tai-san.html
- type: thesis
- persuasion: Reframe
- beat: Resolution
- blueprint: kinetic-type-beats (Adapt)
- focal: câu hero
- roles: câu hero = foreground subject · ba tầng = supporting · header = chrome
- cobalt: chữ "tài sản" trong câu hero
- hero_text: "Platform của tài sản, không phải platform của harness."
- sfx: chime
- sfx_at: tài sản,

narrativeRole: Định nghĩa lại "platform" để lãnh đạo không phải chọn giữa có và không.
keyMessage: Vẫn là platform, nhưng của tài sản.

Adapt: ba tầng xếp chồng thấp ở nửa trái (dạng bệ), câu hero lớn ở nửa phải; không lặp bố cục khung 20.
Scene 1 (0.0–2.9s): header vào; nhãn nhỏ "Phần cần xây tập trung" hiện ở "cần xây" (1.1).
Scene 2 (2.9–6.6s): ba tầng dựng từ dưới lên: "Data layer" (2.9), "Kit registry" (3.8), "Governance layer" (5.2).
Scene 3 (6.6–10.4s): trên "vẫn là một platform" (6.9) một khung viền mảnh bao quanh ba tầng với nhãn "platform"; trên "platform của tài sản" (8.9) câu hero dòng 1 "Platform của tài sản," hiện, "tài sản" cobalt ở (9.5).
Scene 4 (10.4–13.2s): trên "không phải" (10.4) dòng 2 "không phải platform của harness." hiện muted, "của harness" bị gạch mảnh ở (11.4). Đứng yên tới hết khung.

## Frame 22 — Khi nào nên tự làm nhiều hơn

- scene: Lưới 2×2 bốn trường hợp, mỗi thẻ có hướng xử lý ngắn; dải kết "vẫn bắt đầu từ thứ có sẵn"
- voiceover: "Đề xuất này không tuyệt đối. Người dùng phần lớn không phải kỹ sư, môi trường air-gapped, agent là sản phẩm bán cho khách, hay harness thiếu năng lực bắt buộc: khi đó tự làm nhiều hơn, nhưng vẫn bắt đầu từ thứ có sẵn."
- duration: 13.66s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/22-khi-nao-tu-lam.html
- type: caveat
- persuasion: Honest boundary
- beat: Trust
- blueprint: grid-card-assemble (Adapt)
- focal: dải kết
- roles: lưới 2×2 = foreground subject · dải kết = supporting · header = chrome
- cobalt: dải kết "Vẫn bắt đầu từ thứ có sẵn"
- sfx: none

narrativeRole: Nêu giới hạn của đề xuất để tăng độ tin cậy.
keyMessage: Có bốn trường hợp tự làm nhiều hơn, nhưng không viết từ đầu.

Adapt: lưới 2×2 thẻ ở giữa; dải kết ngang dưới lưới.
Scene 1 (0.0–2.2s): header vào; h2 "Khi nào nên tự làm nhiều hơn" hiện ở "không tuyệt đối" (0.8).
Scene 2 (2.2–9.7s): bốn thẻ hiện đúng lời, mỗi thẻ tiêu đề + dòng phụ muted: "Người dùng không phải kỹ sư" / "chat doanh nghiệp của vendor, harness đa kênh" (2.2); "Môi trường air-gapped" / "harness open source và model tự host" (4.2); "Agent là sản phẩm bán cho khách" / "Agent SDK hoặc framework; kit dùng lại được" (5.7); "Harness thiếu năng lực bắt buộc" / "vá bằng hook, plugin, MCP server" (7.5).
Scene 3 (9.7–13.66s): trên "tự làm nhiều hơn" (10.1) lưới mờ ~60%; trên "nhưng vẫn" (11.1) dải cobalt-tint viền cobalt "Nhưng vẫn bắt đầu từ thứ có sẵn" hiện. Đứng yên.

## Frame 23 — Lộ trình bốn giai đoạn

- scene: Timeline ngang bốn giai đoạn Nền, Pilot, Tự động hoá, Mở rộng; đường tiến độ cobalt chạy qua
- voiceover: "Lộ trình gợi ý có bốn giai đoạn. Nền, trong hai đến bốn tuần. Pilot một quy trình, một đến ba tháng. Tự động hoá headless trong CI. Rồi mở rộng liên tục qua kit registry."
- duration: 12.86s
- transition_in: crossfade
- status: animated
- src: compositions/frames/23-lo-trinh.html
- type: roadmap
- persuasion: Phased plan
- beat: Momentum
- blueprint: grid-card-assemble (Adapt)
- focal: đường timeline
- roles: bốn giai đoạn = foreground subject · đường tiến độ = supporting · header = chrome
- cobalt: đường tiến độ chạy theo lời qua bốn mốc
- sfx: click-soft
- sfx_at: Pilot

narrativeRole: Biến đề xuất thành lộ trình có thời lượng.
keyMessage: Bắt đầu nhỏ, đo, rồi mở rộng.

Adapt: đường ngang ở y ~420 với bốn mốc tròn; thẻ giai đoạn dưới mỗi mốc (số giai đoạn, tên, thời lượng, đầu ra ngắn).
Scene 1 (0.0–2.0s): header vào; h2 "Lộ trình gợi ý" hiện ở "Lộ trình" (0.0); đường nền xám vẽ ra ở "bốn giai đoạn" (1.1).
Scene 2 (2.0–7.2s): trên "Nền" (2.0) mốc 0 + thẻ "0 · Nền" / "2–4 tuần" (3.6) / "harness chuẩn, LLM gateway, policy"; đường cobalt chạy tới mốc 1; trên "Pilot" (4.9) thẻ "1 · Pilot" / "1–3 tháng" (6.2) / "một quy trình, 1–2 nguồn dữ liệu, đo trước sau".
Scene 3 (7.2–10.1s): trên "Tự động hoá" (7.2) đường cobalt tới mốc 2; thẻ "2 · Tự động hoá" / "1–2 tháng" / "kit headless trong CI, approval gate" (8.6).
Scene 4 (10.1–12.86s): trên "mở rộng" (10.4) đường cobalt tới mốc 3; thẻ "3 · Mở rộng" / "liên tục" (10.9) / "kit registry có owner, review, version" (11.6). Đứng yên.

## Frame 24 — Cần quyết định, và câu chốt

- scene: Checklist năm quyết định hiện theo lời; rồi thu gọn, nhường chỗ câu chốt hai dòng
- voiceover: "Lãnh đạo cần quyết định năm điều: nguyên tắc đầu tư, owner, chuẩn định dạng, ràng buộc dữ liệu, và pilot. Tóm lại: harness và LLM thì mua. Ngân sách xây dồn vào dữ liệu, kit và connector."
- duration: 17.28s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/24-can-quyet-dinh.html
- type: close
- persuasion: Call to decision + Summary
- beat: Resolve
- blueprint: titlecard-reveal (Adapt)
- focal: câu chốt "Ngân sách xây dồn vào dữ liệu, kit và connector."
- roles: câu chốt = foreground subject · checklist = supporting · eyebrow + thanh tiến độ đầy = chrome
- cobalt: cụm "dữ liệu · kit · connector" trong câu chốt
- hero_text: "Harness và LLM thì mua. Ngân sách xây dồn vào dữ liệu, kit và connector."
- sfx: chime
- sfx_at: connector.

narrativeRole: Chốt bằng những quyết định cần đưa ra, và câu tóm tắt đề xuất.
keyMessage: Mua harness và LLM; đầu tư vào dữ liệu, kit, connector.

Adapt: phần 1 checklist năm hàng lệch trái; phần 2 checklist thu nhỏ và mờ về cột trái hẹp, câu chốt lớn chiếm phần phải.
Scene 1 (0.0–8.2s): eyebrow "CẦN QUYẾT ĐỊNH" (không pill), thanh tiến độ đầy; h2 "Năm điều cần quyết định" hiện ở "quyết định" (0.7); năm hàng có ô vuông viền vẽ bằng CSS hiện đúng lời: "1 · Nguyên tắc đầu tư" (2.1), "2 · Owner: data, kit registry, gateway" (3.7), "3 · Chuẩn định dạng: MCP, SKILL.md, AGENTS.md" (4.3), "4 · Ràng buộc dữ liệu" (5.6), "5 · Pilot và chỉ số" (8.0).
Scene 2 (8.2–11.6s): trên "Tóm lại" (8.2) checklist thu về cột trái (scale 0.8, mờ ~40%); trên "harness và LLM" (9.4) câu chốt dòng 1 "Harness và LLM: mua." hiện lớn bên phải.
Scene 3 (11.6–17.28s): trên "Ngân sách" (11.6) dòng 2 "Ngân sách xây:" hiện; "dữ liệu · kit · connector" hiện từng cụm cobalt ở (13.1, 13.9, 14.4). Đứng yên tới hết khung.
