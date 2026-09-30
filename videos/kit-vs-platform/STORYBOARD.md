---
format: 1920x1080
duration: 207.78s
message: "Harness và LLM thì mua; tổ chức đầu tư vào kit và dữ liệu AI-ready — thứ bên ngoài không có."
arc: concept-explainer with process
audience: "Lãnh đạo phân bổ nguồn lực giữa các team AI của tổ chức, và team kit. Đã quen khái niệm automation level L1–L5, platform, harness."
mode: autonomous
music: refined corporate keynote underscore, confident and calm, warm felt piano, soft strings and gentle synth pads, unobtrusive
---

## Video direction

- **Palette system**
  - Lấy nguyên từ frame.md (Blue Professional): nền kem `#fdfae7` trên mọi khung; thẻ tinted cobalt (fill `rgba(30,43,250,0.04)`, viền 1.5px `rgba(30,43,250,0.2)`, bo 10–14px, KHÔNG shadow); mực tiêu đề `#111111`, chữ phụ `#6b6b6b`, chữ nhạt `#9a9a9a`.
  - Cobalt `#1e2bfa` là màu nhấn duy nhất: eyebrow, số, pill, thanh tiến độ. Ngoài phần chrome đó, mỗi khung chỉ có **một** khoảnh khắc nhấn cobalt đậm (ghi ở trường `cobalt:`). Tiêu đề luôn gần-đen, không bao giờ cobalt.
  - `#059669` (xanh lá) và `#dc2626` (đỏ) chỉ dùng làm màu chữ inline cho "làm / không mất" và "mất / không làm", không tô nền.
  - Không có màu tối/navy; không có khối code tối.
- **Type**
  - Space Grotesk cho tiêu đề (700, tracking −0.02em), mọi con số, eyebrow (600, IN HOA, tracking 0.08em, cobalt) và pill.
  - Inter cho câu thân và nhãn phụ (400–500, màu muted).
  - Font tiếng Việt trong `assets/fonts/` (frame.md § Font faces): `SpaceGrotesk-VN.woff2`, `Inter-VN.woff2`, `JetBrainsMono-VN.woff2`. Line-height tiêu đề ≥ 1.1 (h1 1.12), không cắt chiều dọc hộp chữ (dấu tiếng Việt cao).
  - Space Grotesk KHÔNG có ✓ ✗ ✱ ● ■: nếu cần ký hiệu đó, đặt trong Inter hoặc vẽ bằng CSS/SVG.
- **Motion grammar**
  - Vào cảnh bằng `power3.out` / `expo.out`, 0.5–0.8s, dịch ngắn 16–32px + fade. Không bounce, không elastic, không xoay.
  - Mỗi chi tiết hiện đúng lúc giọng đọc nói tới (mốc ở từng dòng Scene); sau lần hiện cuối thì đứng yên để đọc.
  - Đường kẻ/gạch bỏ vẽ bằng scaleX từ trái sang (0.4–0.6s). Làm mờ phần đã qua xuống ~45% khi ý mới tới.
  - Mọi khung có slide-header: eyebrow cobalt bên trái + pill đếm "NN / 16" bên phải (trừ khung 1 và 16); thanh tiến độ cobalt 3px ở mép dưới rộng N/16.
- **Rhythm / held frames**
  - Khung dừng để đọc: 2 (luận điểm), 6 (bốn phần của agent), 16 (chốt). Ít chuyển động, hold dài.
  - Khung dày nhất: 11 và 12 (tách layer, tách feature). Nhịp đều, từng dòng tới đúng lời.
- **Framing variety**
  - 1 bìa bất đối xứng · 2 hai cột mua/đầu tư · 3 cầu thang 5 bậc · 4 hai thẻ đối xứng · 5 cặp số + trích dẫn · 6 dải 4 khối ngang · 7 danh sách 3 bước dọc · 8 câu hỏi trên + hai cột mất/không mất · 9 hai đường ống ngang · 10 ba thẻ cột "luận điểm vs thực tế" · 11 chồng 4 layer + phán quyết · 12 lưới 13 ô · 13 ba hàng điểm yếu → cách bù · 14 ba làn phân vai · 15 lưới 2×2 bằng chứng · 16 bìa chốt.
  - Không lặp cùng một bố cục ở hai khung liền nhau.
- **Caption keep-out**
  - Phụ đề nằm ở ~17% dưới cùng (y > 896). Mọi nội dung chính phải nằm trên y = 880.
  - Thanh tiến độ 3px ở mép dưới là ngoại lệ duy nhất. Nền full-bleed và atmosphere đặt trên lớp `.clip`.
- **Language + Negative list**
  - Chữ trên hình là tiếng Việt; thuật ngữ giữ tiếng Anh như lời đọc (harness, LLM, kit, skill, workflow, connector, layer, feature, headless, approval gate, gateway, RBAC, CI, Claude Code, Kiro).
  - Không tên người, không tên dự án nội bộ, không số liệu tự bịa (chỉ dùng số có trong lời: 5 mức, 4 layer, 13 feature, 6, 3, 4 bằng chứng, 2 harness). Không dữ liệu cá nhân, token hay đường dẫn riêng.
  - Không gradient tím/xanh kiểu "AI", không robot/não/mạch điện, không icon clip-art, không shadow.
  - Không `repeat` / `yoyo` / `Math.random` / `@keyframes`.
  - Cấm hai kiểu hỏng: "slideshow" (hiện hết trong 25% đầu rồi đứng im) và "screensaver" (nhiều thứ trôi lung tung).

## Frame 1 — Câu hỏi mở màn

- scene: Bìa briefing: câu hỏi "Có cần tự viết nền tảng agent riêng?" dựng dần, pill L4 cobalt bật lên, rồi câu trả lời "Không cần." hạ xuống dứt khoát
- voiceover: "Muốn AI tự làm tới mức L4, có cần tự viết một nền tảng agent riêng không? Đề xuất này trả lời: không cần."
- duration: 7.8s
- transition_in: cut
- status: animated
- src: compositions/frames/01-cau-hoi-mo-man.html
- type: hook
- persuasion: Provocative question + Direct answer
- beat: Curiosity → clarity
- blueprint: kinetic-type-beats (Adapt)
- focal: câu trả lời "Không cần." — h1 Space Grotesk 700 gần-đen, lớn nhất khung
- roles: câu trả lời = foreground subject · câu hỏi + pill L4 = supporting · eyebrow + accent line = chrome · panel chéo cobalt-tint + lưới chấm 3×3 = atmosphere (chỉ khung bìa)
- cobalt: pill "L4" đặc (nền cobalt, chữ kem)
- sfx: pop
- sfx_at: 6.6

narrativeRole: Mở bằng câu hỏi mà lãnh đạo đang cân nhắc, và trả lời ngay.
keyMessage: Đạt L4 không đòi hỏi tự viết nền tảng agent.

Adapt: bìa bất đối xứng, khối chữ lệch trái (~60% rộng), atmosphere bên phải; câu hỏi dựng theo nhịp lời, câu trả lời là payoff.
Scene 1 (0.0–1.8s): panel chéo cobalt-tint trượt vào mép phải, lưới chấm 3×3 fade lên góc trên phải; accent line 60×4 vẽ ra, eyebrow "ĐỀ XUẤT CHIẾN LƯỢC · TỔ CHỨC F" fade lên; dòng h3 muted "Muốn AI tự làm tới mức" hiện ra (0.0).
Scene 2 (1.8–5.3s): trên "L4" (1.8s) pill cobalt "L4" bật lên cuối dòng (scale 0.9→1, power3); trên "tự viết" (2.9s) dòng h2 "Có cần tự viết một nền tảng agent riêng?" hiện từng cụm, xong ở "không?" (4.6s).
Scene 3 (5.3–7.8s): trên "trả lời" (5.8s) câu hỏi mờ xuống ~45%; trên "không cần" (6.6s) h1 "Không cần." hạ vào dưới câu hỏi (y 24→0, expo.out). Đứng yên tới hết khung.

## Frame 2 — Luận điểm

- scene: Hai cột: MUA (Harness, LLM) và ĐẦU TƯ (Kit, Dữ liệu AI-ready); cuối cùng pill trạng thái "Đề xuất · chưa được duyệt"
- voiceover: "Harness và LLM thì mua. Tổ chức đầu tư vào thứ bên ngoài không có: kit và dữ liệu, sẵn sàng cho AI. Đây là một đề xuất, chưa được duyệt."
- duration: 11.04s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-luan-diem.html
- type: product_intro
- persuasion: Contrast (buy vs build) + Scarcity (thứ bên ngoài không có)
- beat: Thesis lands
- blueprint: comparison-split (Adapt)
- focal: cột ĐẦU TƯ với hai thẻ Kit và Dữ liệu AI-ready
- roles: cột ĐẦU TƯ = foreground · cột MUA = supporting (muted) · slide-header + pill trạng thái = chrome
- hero_text: "Harness và LLM thì mua. Tổ chức đầu tư vào kit và dữ liệu, sẵn sàng cho AI."
- cobalt: viền trái 4px split-highlight của cột ĐẦU TƯ
- sfx: none

narrativeRole: Nêu luận điểm chính một lần, rõ ràng, để phần sau chứng minh.
keyMessage: Mua cái thị trường có; đầu tư cái chỉ tổ chức có.

Adapt: phẳng, không tilt 3D; hai cột bằng nhau, cột phải nặng hơn về thị giác.
Scene 1 (0.0–2.7s): slide-header vào (eyebrow "LUẬN ĐIỂM", pill "02 / 16"); cột trái nhãn "MUA" (Space Grotesk 600, muted); thẻ "Harness" (0.0s) rồi thẻ "LLM" (1.2s) trượt lên, chữ muted; trên "mua" (2.1s) nhãn phụ "sẵn có trên thị trường" hiện dưới.
Scene 2 (2.7–8.1s): cột phải nhãn "ĐẦU TƯ" (2.7s); dòng Inter "Thứ bên ngoài không có" (4.0s); thẻ "Kit" (5.6s) và thẻ "Dữ liệu AI-ready" (6.0s) vào với chữ gần-đen đậm; split-highlight cobalt bao cột phải vẽ ra ở "sẵn sàng cho AI" (7.1s); cột trái mờ về ~60%.
Scene 3 (8.1–11.04s): trên "đề xuất" (8.6s) pill viền cobalt "Đề xuất · chưa được duyệt" fade vào góc dưới phải vùng nội dung (trên y 880). Đứng yên để đọc.

## Frame 3 — Thang automation

- scene: Cầu thang 5 bậc L1→L5, nhãn hai đầu; rồi hai cờ mục tiêu: thiết kế ở L3, coding và testing ở L4
- voiceover: "Tổ chức đo automation level trên năm mức, từ L1 hỗ trợ từng thao tác, tới L5 tự vận hành. Mục tiêu kỳ sau: thiết kế đạt L3, coding và testing đạt L4."
- duration: 12.24s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/03-thang-automation.html
- type: benefit_highlight
- persuasion: Shared frame of reference
- beat: Orientation
- blueprint: dataviz-countup (Adapt)
- focal: bậc L4 tô cobalt với cờ "Coding · Testing"
- roles: 5 bậc = subject · cờ mục tiêu = payload · nhãn hai đầu = supporting · slide-header = chrome
- cobalt: fill đặc của bậc L4
- sfx: click-soft
- sfx_at: 11.1

narrativeRole: Đặt thước đo chung mà cả video dựa vào.
keyMessage: Mục tiêu là L3 cho thiết kế, L4 cho coding và testing.

Adapt: không count-up số; "dữ liệu" là 5 bậc cao dần từ trái sang phải (bar-track tinted), nhãn Space Grotesk.
Scene 1 (0.0–3.0s): slide-header (eyebrow "BỐI CẢNH", pill "03 / 16"), h2 "Automation level: năm mức" (1.0s); năm bậc tinted mọc lên từ đường nền, stagger 0.12s, bắt đầu ở "năm mức" (2.2s); nhãn L1…L5 Space Grotesk dưới chân bậc.
Scene 2 (3.0–7.0s): trên "L1" (3.1s) nhãn Inter "hỗ trợ từng thao tác" hiện dưới bậc L1; trên "L5" (5.2s) nhãn "tự vận hành" hiện trên đỉnh bậc L5.
Scene 3 (7.0–12.24s): trên "Mục tiêu kỳ sau" (7.0s) eyebrow nhỏ "MỤC TIÊU KỲ SAU" hiện; trên "L3" (9.1s) bậc L3 viền cobalt đậm + cờ "Thiết kế" cắm trên đỉnh; trên "L4" (11.1s) bậc L4 tô cobalt đặc + cờ "Coding · Testing". L1, L2, L5 mờ ~50%. Đứng yên.

## Frame 4 — Hai team

- scene: Hai thẻ đối xứng: Team platform (nền tảng AI tập trung trên cloud) và Team kit (skill, workflow, connector cho Claude Code, Kiro)
- voiceover: "Hai team được giao việc. Team platform xây một nền tảng AI tập trung trên cloud. Team kit làm skill, workflow và connector cho các harness phổ biến như Claude Code và Kiro."
- duration: 12.96s
- transition_in: crossfade
- status: animated
- src: compositions/frames/04-hai-team.html
- type: product_intro
- persuasion: Neutral framing of both sides
- beat: Setup
- blueprint: comparison-split (Adapt)
- focal: hai thẻ team ngang hàng
- roles: thẻ Team platform, thẻ Team kit = subjects (bằng nhau) · chip skill/workflow/connector + chip harness = supporting · slide-header = chrome
- cobalt: chip "Claude Code · Kiro" viền cobalt
- sfx: whoosh-short
- sfx_at: 5.4

narrativeRole: Giới thiệu hai bên đang được giao việc, trung lập.
keyMessage: Một bên xây nền tảng, một bên làm kit cho harness có sẵn.

Adapt: hai thẻ card-tinted bằng nhau, vào từ hai phía (trái x −40, phải x +40), không tilt; pill số hiệu "1"/"2" bật ở mép trong.
Scene 1 (0.0–1.9s): slide-header (eyebrow "HAI TEAM", pill "04 / 16"); h2 "Hai team được giao việc" (0.0s).
Scene 2 (1.9–5.4s): trên "Team platform" (1.9s) thẻ trái vào; tiêu đề thẻ "Team platform"; trên "nền tảng AI" (3.4s) dòng Inter "Nền tảng AI tập trung"; trên "cloud" (4.9s) pill "trên cloud" bật dưới.
Scene 3 (5.4–12.96s): trên "Team kit" (5.4s) thẻ phải vào; ba chip lần lượt "skill" (6.6s), "workflow" (7.4s), "connector" (8.4s); trên "harness phổ biến" (9.2s) dòng Inter "cho các harness phổ biến"; trên "Claude Code" (10.7s) chip "Claude Code · Kiro" viền cobalt. Đứng yên.

## Frame 5 — Lập luận của platform

- scene: Bên trái hai số lớn "4 layer" và "13 feature"; bên phải trích dẫn kết luận của tài liệu platform
- voiceover: "Platform có bốn layer và mười ba feature. Tài liệu của nó kết luận: IDE harness chỉ là trợ lý cá nhân, còn platform mới là dây chuyền sản xuất phần mềm."
- duration: 10s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-lap-luan-platform.html
- type: pain_point
- persuasion: Steelman the other side
- beat: Tension
- blueprint: dataviz-countup (Adapt)
- focal: trích dẫn blockquote với dấu ngoặc lớn
- roles: trích dẫn = subject · hai metric = supporting · nhãn nguồn "Kết luận trong tài liệu platform" = supporting · slide-header = chrome
- cobalt: hai metric-value "4" và "13"
- sfx: click-soft
- sfx_at: 4.6

narrativeRole: Trình bày trung thực lập luận của bên platform trước khi phản biện.
keyMessage: Platform tự định vị là dây chuyền, xem harness chỉ là trợ lý.

Adapt: count-up ngắn 0→4 và 0→13 (0.6s, snap số nguyên) trong hai metric-card xếp dọc bên trái (~30% rộng); trích dẫn chiếm 60% bên phải.
Scene 1 (0.0–2.6s): slide-header (eyebrow "LẬP LUẬN CỦA PLATFORM", pill "05 / 16"); metric-card "4 · layer" count-up ở "bốn layer" (0.8s); metric-card "13 · feature" ở "mười ba" (1.6s).
Scene 2 (2.6–4.6s): dấu ngoặc lớn (opacity 0.15) fade vào; nhãn nguồn Inter muted "Kết luận trong tài liệu platform" (3.7s).
Scene 3 (4.6–10.0s): blockquote dựng hai vế: "IDE harness chỉ là trợ lý cá nhân," (4.6s), "còn platform mới là dây chuyền sản xuất phần mềm." (7.0s). Đứng yên từ ~9.1s.

## Frame 6 — Bốn phần của một agent

- scene: Dải 4 khối ngang harness · LLM · kit · hạ tầng dưới nhãn "Agent làm việc thật"; một ngoặc "Platform" ôm cùng bốn khối; khối harness được đánh dấu "tự viết lại"
- voiceover: "Nhưng một agent làm việc thật luôn gồm bốn phần: harness, LLM, kit và hạ tầng. Platform, xét cho cùng, cũng là bốn phần này. Chỉ khác ở chỗ tự viết lại harness."
- duration: 12.12s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/06-bon-phan-agent.html
- type: feature_showcase
- persuasion: Reframing (same parts, different build choice)
- beat: Aha
- blueprint: kinetic-type-beats (Adapt)
- focal: dải 4 khối, sau đó khối harness có nhãn "tự viết lại"
- roles: 4 khối = subject · ngoặc Platform = supporting · nhãn "tự viết lại" = payload · slide-header = chrome
- hero_text: "Chỉ khác ở chỗ tự viết lại harness."
- cobalt: viền 2px + nhãn "tự viết lại" trên khối harness
- sfx: none

narrativeRole: Đòn xoay chuyển: platform không phải thứ khác loài, chỉ là cùng bốn phần.
keyMessage: Khác biệt duy nhất là tự viết lại harness.

Adapt: khung dừng để đọc; bốn khối card-tinted cao 180px dàn ngang giữa khung, mỗi khối một từ Space Grotesk 600.
Scene 1 (0.0–3.0s): slide-header (eyebrow "BẢN CHẤT", pill "06 / 16"); nhãn h3 "Một agent làm việc thật" (0.7s); đường ray mảnh vẽ ngang (2.4s).
Scene 2 (3.0–6.1s): bốn khối rơi vào ray đúng lời: "Harness" (3.0s), "LLM" (3.6s), "Kit" (4.5s), "Hạ tầng" (5.2s).
Scene 3 (6.1–8.8s): trên "Platform" (6.1s) một ngoặc vuông mảnh vẽ ôm dưới cả bốn khối, nhãn "Platform" Space Grotesk dưới ngoặc; trên "bốn phần này" (8.0s) nhãn phụ "= cùng bốn phần".
Scene 4 (8.8–12.12s): trên "tự viết lại" (9.9s) ba khối LLM/kit/hạ tầng mờ ~45%, khối harness giữ đậm, viền cobalt vẽ ra và nhãn cobalt "tự viết lại" hiện trên khối. Đứng yên để đọc.

## Frame 7 — Đề xuất ba ý

- scene: Danh sách dọc 3 bước với step-circle 1-2-3: mua harness và LLM; đầu tư kit và data source AI-ready; viết trung lập, gắn vào harness nào cũng được, kể cả headless trên cloud
- voiceover: "Vì vậy, đề xuất có ba ý. Một, harness và LLM thì mua. Hai, đầu tư vào kit và data source AI-ready. Ba, viết chúng trung lập, để gắn vào harness nào cũng được, kể cả khi chạy headless trên cloud."
- duration: 15.24s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/07-de-xuat-ba-y.html
- type: feature_showcase
- persuasion: Rule of three
- beat: Structure
- blueprint: grid-card-assemble (Adapt)
- focal: hàng thứ ba với hai chip "trong IDE" và "headless trên cloud"
- roles: ba hàng bước = subject · chip môi trường = supporting · slide-header = chrome
- cobalt: step-circle (1.0 → 0.85 → 0.7 theo frame.md)
- sfx: click-soft
- sfx_at: 9.0

narrativeRole: Đóng gói đề xuất thành ba ý dễ nhớ.
keyMessage: Mua, đầu tư, viết trung lập.

Adapt: danh sách dọc 3 hàng, mỗi hàng: step-circle 56px + tiêu đề h3 + dòng phụ Inter; hàng cũ mờ nhẹ ~70% khi hàng mới tới.
Scene 1 (0.0–2.3s): slide-header (eyebrow "ĐỀ XUẤT", pill "07 / 16"); h2 "Đề xuất có ba ý" (0.8s).
Scene 2 (2.3–5.3s): hàng 1 trên "Một" (2.3s): circle "1", tiêu đề "Harness và LLM: mua" (3.0s).
Scene 3 (5.3–9.0s): hàng 2 trên "Hai" (5.3s): circle "2", tiêu đề "Đầu tư vào kit và data source" (6.4s), pill "AI-ready" (8.3s).
Scene 4 (9.0–15.24s): hàng 3 trên "Ba" (9.0s): circle "3", tiêu đề "Viết trung lập" (10.2s), dòng phụ "gắn vào harness nào cũng được" (11.2s); hai chip "trong IDE" (12.5s) và "headless trên cloud" (14.0s). Đứng yên.

## Frame 8 — Phép thử mất giá

- scene: Câu hỏi phép thử ở trên; dưới là hai cột: MẤT (orchestration layer, chat UI) bị gạch, KHÔNG MẤT (code graph, template, checklist, connector nội bộ)
- voiceover: "Phép thử đơn giản: nếu quý sau vendor ra đúng feature này, khoản đầu tư có mất trắng không? Orchestration layer và chat UI: mất. Code graph, template, checklist, connector nội bộ: không mất."
- duration: 13.6s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-phep-thu-mat-gia.html
- type: feature_showcase
- persuasion: Decision heuristic + Loss aversion
- beat: Test
- blueprint: kinetic-type-beats (Adapt)
- focal: cột KHÔNG MẤT
- roles: câu hỏi = frame · cột MẤT = contrast (gạch bỏ, đỏ) · cột KHÔNG MẤT = payload (xanh lá) · slide-header = chrome
- cobalt: viền split-highlight của câu hỏi phép thử
- sfx: click-soft
- sfx_at: 8.5

narrativeRole: Cho người xem một công cụ ra quyết định dùng lại được.
keyMessage: Đầu tư nào vendor có thể ra thay trong một quý thì sẽ mất giá.

Adapt: câu hỏi trong split-highlight rộng toàn khung phía trên; hai cột thẻ bên dưới, trái hẹp (40%), phải rộng (60%).
Scene 1 (0.0–6.2s): slide-header (eyebrow "PHÉP THỬ MẤT GIÁ", pill "08 / 16"); split-highlight vẽ ra; câu hỏi h3 dựng hai vế: "Nếu quý sau vendor ra đúng feature này," (1.4s), "khoản đầu tư có mất trắng không?" (4.1s).
Scene 2 (6.2–9.2s): cột trái tiêu đề "MẤT" màu `#dc2626` (6.2s); thẻ "Orchestration layer" (6.2s), "Chat UI" (7.7s); trên "mất." (8.5s) đường gạch vẽ qua cả hai thẻ, thẻ mờ ~45%.
Scene 3 (9.2–13.6s): cột phải tiêu đề "KHÔNG MẤT" màu `#059669`; bốn thẻ lần lượt "Code graph" (9.2s), "Template" (10.1s), "Checklist" (10.7s), "Connector nội bộ" (11.3s); trên "không mất" (12.4s) cả cột nhích đậm lên. Đứng yên.

## Frame 9 — Workflow quyết định mức

- scene: Câu khẳng định trên cùng; một khối harness chung; hai đường ống: L3 dừng hỏi người ở mỗi bước, L4 chạy trọn chuỗi skill rồi trình draft ở approval gate cuối
- voiceover: "Và automation level là tính chất của workflow, không phải của tool. Cùng một harness, dừng hỏi người ở mỗi bước là L3. Chạy trọn chuỗi skill rồi trình draft ở approval gate cuối là L4."
- duration: 13.16s
- transition_in: crossfade
- status: animated
- src: compositions/frames/09-workflow-quyet-dinh-muc.html
- type: feature_showcase
- persuasion: Mechanism reveal
- beat: Understanding
- blueprint: kinetic-type-beats (Adapt)
- focal: đường ống L4 với một approval gate ở cuối
- roles: câu khẳng định = headline · khối "Cùng một harness" = anchor bên trái · hai đường ống = subject · slide-header = chrome
- cobalt: approval gate cuối đường ống L4
- sfx: ping
- sfx_at: 12.0

narrativeRole: Tách mức tự động hoá khỏi công cụ: đó là cách thiết kế workflow.
keyMessage: Cùng harness, workflow khác cho mức khác.

Adapt: anchor "Cùng một harness" bên trái giữa hai đường ống; mỗi ống là chuỗi 4 nút tròn nhỏ nối bằng đường mảnh, nhãn L3 / L4 ở đầu phải.
Scene 1 (0.0–4.2s): slide-header (eyebrow "AUTOMATION LEVEL", pill "09 / 16"); h2 "Là tính chất của workflow," (0.3s), vế sau muted "không phải của tool." (3.4s).
Scene 2 (4.2–8.0s): trên "Cùng một harness" (4.2s) khối anchor card-tinted vào bên trái; ống trên vẽ từ anchor: 4 nút, giữa mỗi nút có một điểm dừng hình người-duyệt (vòng tròn rỗng nhỏ + nhãn "người duyệt") hiện ở "dừng hỏi người" (5.3s) và "mỗi bước" (6.7s); nhãn "L3" ở cuối ống (7.7s).
Scene 3 (8.0–13.16s): ống dưới trên "Chạy trọn chuỗi skill" (8.0s): 4 nút "skill" nối liền không dừng, vẽ liền một mạch; nút "draft" (10.4s); approval gate cobalt ở cuối (10.9s) với nhãn "approval gate"; nhãn "L4" (12.2s). Ống trên mờ ~50%. Đứng yên.

## Frame 10 — So sai đối tượng

- scene: Ba thẻ cột "luận điểm → thực tế": IDE vs server → Claude Code và Kiro chạy headless được; multi-repo → bài toán dữ liệu; audit tập trung → khoảng trống thật, lấp bằng layer mỏng
- voiceover: "Bảng so sánh của platform đặt harness dùng trong IDE cạnh một hệ thống chạy trên server. Nhưng Claude Code và Kiro đều chạy headless được. Multi-repo là bài toán dữ liệu. Chỉ audit tập trung là khoảng trống thật, và lấp bằng một layer mỏng."
- duration: 16.2s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/10-so-sai-doi-tuong.html
- type: pain_point
- persuasion: Rebuttal by reframing
- beat: Correction
- blueprint: grid-card-assemble (Adapt)
- focal: thẻ thứ ba "Audit tập trung" — khoảng trống thật
- roles: ba thẻ = subjects · nửa trên mỗi thẻ (luận điểm, muted) · nửa dưới (thực tế, gần-đen) · slide-header = chrome
- cobalt: viền 2px thẻ "Audit tập trung" và nhãn "layer mỏng"
- sfx: click-soft
- sfx_at: 11.3

narrativeRole: Phản biện bảng so sánh của platform từng điểm.
keyMessage: Hầu hết khoảng cách là so sai đối tượng; chỉ audit tập trung là thật.

Adapt: ba thẻ cột bằng nhau; mỗi thẻ có nửa trên nhãn "Luận điểm" muted, đường chia mảnh, nửa dưới nhãn "Thực tế".
Scene 1 (0.0–5.7s): slide-header (eyebrow "PHẢN BIỆN", pill "10 / 16"); h2 "So sai đối tượng" (0.0s); thẻ 1 nửa trên: "Harness trong IDE" (2.2s) và "vs hệ thống trên server" (4.8s).
Scene 2 (5.7–8.8s): thẻ 1 nửa dưới trên "Nhưng" (5.7s): "Claude Code và Kiro chạy headless được" (5.9s); nửa trên mờ ~50%.
Scene 3 (8.8–11.3s): thẻ 2 vào: trên "Multi-repo" (8.8s), dưới "Bài toán dữ liệu" (10.5s).
Scene 4 (11.3–16.2s): thẻ 3 vào: trên "Audit tập trung" (11.5s), dưới "Khoảng trống thật" (12.6s); viền cobalt vẽ quanh thẻ ở "khoảng trống thật"; pill cobalt "lấp bằng layer mỏng" ở "layer mỏng" (14.8s). Đứng yên.

## Frame 11 — Bốn layer

- scene: Chồng 4 layer của platform bên trái, mỗi layer nhận phán quyết bên phải: làm, làm, mua hoặc cấu hình, không làm; cuối cùng số "3 / 4 layer trùng với đề xuất"
- voiceover: "Tách bốn layer theo bản chất. Knowledge base là dữ liệu: làm. Integration là connector: làm. Governance: mua hoặc cấu hình. Chỉ orchestration là viết lại harness: không làm. Ba trên bốn layer đã trùng với đề xuất."
- duration: 19.16s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/11-bon-layer.html
- type: feature_showcase
- persuasion: Common ground (the proposal already agrees on 3 of 4)
- beat: Convergence
- blueprint: grid-card-assemble (Adapt)
- focal: metric "3 / 4" ở cuối
- roles: 4 slab layer = subject · chip phán quyết = payload · metric 3/4 = conclusion · slide-header = chrome
- cobalt: metric-value "3 / 4"
- sfx: pop
- sfx_at: 16.0

narrativeRole: Cho thấy hai bên gần nhau hơn tưởng.
keyMessage: Chỉ layer orchestration là bất đồng thật.

Adapt: 4 slab card-tinted xếp chồng (rộng ~55%, lệch trái); bên phải mỗi slab: nhãn bản chất (Inter muted) + chip phán quyết (Space Grotesk 600, chữ màu xanh lá/đỏ/gần-đen, không tô nền); metric xuất hiện góc phải trên cùng khi xong.
Scene 1 (0.0–2.3s): slide-header (eyebrow "BỐN LAYER CỦA PLATFORM", pill "11 / 16"); h2 "Tách theo bản chất" (0.2s); bốn slab tên layer rơi vào chồng từ trên xuống, stagger 0.15s (0.7s): Knowledge base, Integration, Governance, Orchestration.
Scene 2 (2.3–9.3s): slab 1 sáng lên ở "Knowledge base" (2.3s): nhãn "dữ liệu" (3.2s), chip xanh lá "làm" (4.8s); slab 2 ở "Integration" (5.3s): nhãn "connector" (7.8s), chip xanh lá "làm" (8.4s).
Scene 3 (9.3–16.0s): slab 3 ở "Governance" (9.3s): chip gần-đen "mua / cấu hình" (10.2s); slab 4 ở "orchestration" (12.4s): nhãn "viết lại harness" (13.6s), chip đỏ "không làm" (15.2s) và đường gạch vẽ qua slab 4, slab mờ ~45%.
Scene 4 (16.0–19.16s): metric-value cobalt "3 / 4" + nhãn "layer đã trùng với đề xuất" hiện ở "Ba trên bốn" (16.0s); ba slab đầu viền đậm hơn. Đứng yên.

## Frame 12 — Mười ba feature

- scene: Lưới 13 ô feature tự chia thành ba nhóm: 6 skill và workflow (team kit), 3 cần dữ liệu kèm skill, phần còn lại governance và CI; cuối cùng "0 feature cần harness tự viết"
- voiceover: "Mười ba feature cũng vậy. Sáu feature là skill và workflow, giao team kit. Ba feature cần dữ liệu kèm skill. Còn lại là governance và CI. Không feature nào bắt buộc phải có harness tự viết."
- duration: 13.76s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/12-muoi-ba-feature.html
- type: feature_showcase
- persuasion: Exhaustive accounting
- beat: Proof
- blueprint: grid-card-assemble (Adapt)
- focal: metric "0" ở cuối
- roles: 13 ô = subject · nhãn ba nhóm = supporting · metric 0 = conclusion · slide-header = chrome
- cobalt: metric-value "0"
- sfx: pop
- sfx_at: 10.5

narrativeRole: Kiểm từng feature, không bỏ sót.
keyMessage: Không feature nào đòi hỏi harness tự viết.

Adapt: 13 ô vuông bo 10px (card-tinted, không chữ bên trong) hiện thành một dãy, rồi trượt tách thành ba cụm có khoảng hở, nhãn nhóm đặt dưới mỗi cụm.
Scene 1 (0.0–1.9s): slide-header (eyebrow "MƯỜI BA FEATURE", pill "12 / 16"); 13 ô cascade vào một dãy (stagger 0.06s) từ 0.0s; nhãn "13 feature" nhỏ.
Scene 2 (1.9–5.5s): trên "Sáu feature" (1.9s) 6 ô đầu viền đậm và trượt thành cụm 1; nhãn "Skill và workflow" (2.8s); pill "→ team kit" (4.6s).
Scene 3 (5.5–10.5s): trên "Ba feature" (5.5s) 3 ô kế thành cụm 2, nhãn "Dữ liệu kèm skill" (6.5s); trên "Còn lại" (8.1s) các ô còn lại thành cụm 3, nhãn "Governance và CI" (9.0s).
Scene 4 (10.5–13.76s): trên "Không feature nào" (10.5s) dòng kết: metric cobalt "0" + nhãn "feature cần harness tự viết" (11.2s). Đứng yên.

## Frame 13 — Điểm yếu và cách bù

- scene: Ba hàng điểm yếu → cách bù: portable không trọn vẹn → core trung lập + adapter mỏng; governance là nhu cầu thật → LLM gateway; headless cần license và guardrail → nêu rõ từ đầu
- voiceover: "Đề xuất có điểm yếu, và có cách bù. Portable không trọn vẹn: tách core trung lập với adapter mỏng. Governance là nhu cầu thật: dùng LLM gateway. Chạy headless cần license và guardrail: nêu rõ từ đầu."
- duration: 14.36s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/13-diem-yeu-cach-bu.html
- type: pain_point
- persuasion: Two-sided argument (credibility)
- beat: Candor
- blueprint: grid-card-assemble (Adapt)
- focal: cột "Cách bù" bên phải
- roles: ba hàng = subject · cột điểm yếu (muted) · mũi tên mảnh · cột cách bù (gần-đen, split-highlight) · slide-header = chrome
- cobalt: mũi tên thứ nhất + viền trái split-highlight của cột cách bù
- sfx: click-soft
- sfx_at: 4.8

narrativeRole: Thừa nhận điểm yếu để tăng độ tin cậy.
keyMessage: Mỗi điểm yếu đều có cách bù cụ thể.

Adapt: ba hàng ngang; trái (40%) điểm yếu trong thẻ tinted muted; mũi tên mảnh vẽ ra (→ đặt trong Inter hoặc vẽ SVG); phải (50%) cách bù trong split-highlight.
Scene 1 (0.0–3.2s): slide-header (eyebrow "ĐIỂM YẾU VÀ CÁCH BÙ", pill "13 / 16"); tiêu đề hai cột "Điểm yếu" / "Cách bù" (1.3s, 2.1s).
Scene 2 (3.2–7.2s): hàng 1: "Portable không trọn vẹn" (3.2s); mũi tên vẽ (4.8s); "Core trung lập + adapter mỏng" (5.0s).
Scene 3 (7.2–10.3s): hàng 2: "Governance là nhu cầu thật" (7.2s); mũi tên; "LLM gateway" (8.6s).
Scene 4 (10.3–14.36s): hàng 3: "Headless cần license và guardrail" (10.3s); mũi tên; "Nêu rõ từ đầu" (12.9s). Đứng yên.

## Frame 14 — Phân vai

- scene: Ba làn dọc: Team platform (spec index, code graph, RBAC) · Team kit (skill, connector, guardrail, adapter) · Mua (harness, LLM, gateway)
- voiceover: "Phân vai rõ ràng. Team platform làm dữ liệu: spec index, code graph, RBAC. Team kit làm skill, connector, guardrail và adapter. Harness, LLM và gateway thì mua."
- duration: 13.88s
- transition_in: crossfade
- status: animated
- src: compositions/frames/14-phan-vai.html
- type: benefit_highlight
- persuasion: Clear ownership
- beat: Resolution
- blueprint: grid-card-assemble (Adapt)
- focal: ba tiêu đề làn cân bằng; làn "Mua" được nhấn cuối
- roles: ba làn = subjects · chip việc = items · slide-header = chrome
- cobalt: nền pill tiêu đề làn "Mua" (pill đặc, chữ kem)
- sfx: click-soft
- sfx_at: 10.6

narrativeRole: Biến đề xuất thành phân công cụ thể.
keyMessage: Platform làm dữ liệu, kit làm skill và connector, phần còn lại mua.

Adapt: ba cột card-tinted cao, tiêu đề làn ở trên, chip việc xếp dọc bên trong, cascade theo lời.
Scene 1 (0.0–1.7s): slide-header (eyebrow "PHÂN VAI", pill "14 / 16"); h2 "Phân vai rõ ràng" (0.0s); ba làn rỗng vẽ khung (0.8s).
Scene 2 (1.7–6.4s): làn 1 tiêu đề "Team platform" (1.7s) + nhãn "dữ liệu" (2.5s); chip "Spec index" (3.4s), "Code graph" (4.6s), "RBAC" (5.5s).
Scene 3 (6.4–10.6s): làn 2 "Team kit" (6.4s); chip "Skill" (7.4s), "Connector" (8.2s), "Guardrail" (8.9s), "Adapter" (9.9s).
Scene 4 (10.6–13.88s): làn 3 pill cobalt "Mua" (10.6s); chip "Harness" (10.6s), "LLM" (11.6s), "Gateway" (12.1s). Đứng yên.

## Frame 15 — Bằng chứng cần có

- scene: Lưới 2×2 bốn thẻ bằng chứng có ô kiểm rỗng: chuỗi thiết kế tới unit test trên hệ thống thật; headless có approval gate; chạy trên hai harness; dựng thử LLM gateway
- voiceover: "Trước khi trình, cần bốn bằng chứng: chạy chuỗi thiết kế tới unit test trên một hệ thống thật; chạy headless có approval gate; chạy trên hai harness; và dựng thử một LLM gateway."
- duration: 12.2s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/15-bang-chung.html
- type: cta
- persuasion: Concrete next steps
- beat: Commitment
- blueprint: grid-card-assemble (Adapt)
- focal: lưới 4 thẻ với số thứ tự lớn
- roles: 4 thẻ = subjects · số 1–4 Space Grotesk cobalt · ô kiểm rỗng vẽ CSS = supporting · slide-header = chrome
- cobalt: số thứ tự 1–4 (stat-num)
- sfx: click-soft
- sfx_at: 11.1

narrativeRole: Nói rõ cần chứng minh gì trước khi đề xuất được trình.
keyMessage: Bốn thử nghiệm cụ thể quyết định đề xuất có đứng vững không.

Adapt: lưới 2×2 card-tinted; mỗi thẻ: số lớn cobalt góc trái, tiêu đề h3, ô kiểm vuông rỗng 28px (viền cobalt 20%) góc phải — rỗng vì chưa làm.
Scene 1 (0.0–2.5s): slide-header (eyebrow "TRƯỚC KHI TRÌNH", pill "15 / 16"); h2 "Cần bốn bằng chứng" (1.2s).
Scene 2 (2.5–6.1s): thẻ 1 (2.5s): "Chuỗi thiết kế → unit test" (→ trong Inter), dòng phụ "trên một hệ thống thật" (5.0s).
Scene 3 (6.1–9.8s): thẻ 2 (6.1s): "Headless có approval gate"; thẻ 3 (8.1s): "Chạy trên hai harness".
Scene 4 (9.8–12.2s): thẻ 4 (9.8s): "Dựng thử LLM gateway" (11.1s). Đứng yên.

## Frame 16 — Chốt

- scene: Bìa chốt: "Model đổi được trong một dòng cấu hình" nhỏ, "Dữ liệu và dây nối thì không ai làm thay được" lớn, rồi "Đó là nơi tổ chức nên đầu tư"; vòng tròn đồng tâm cobalt-tint
- voiceover: "Model đổi được trong một dòng cấu hình. Dữ liệu và dây nối thì không ai làm thay được. Đó là nơi tổ chức nên đầu tư."
- duration: 10.06s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/16-chot.html
- type: branding
- persuasion: Memorable contrast close
- beat: Resolve
- blueprint: titlecard-reveal (Adapt)
- focal: dòng "Dữ liệu và dây nối thì không ai làm thay được."
- roles: câu chốt = subject · dòng model = setup (muted) · dòng "Đó là nơi…" = sign-off · vòng đồng tâm = atmosphere (chỉ khung chốt)
- hero_text: "Dữ liệu và dây nối thì không ai làm thay được. Đó là nơi tổ chức nên đầu tư."
- cobalt: accent line 60×4 trên dòng "Đó là nơi tổ chức nên đầu tư"
- sfx: chime
- sfx_at: 5.0

narrativeRole: Đóng lại bằng một tương phản dễ nhớ.
keyMessage: Model thay được; dữ liệu và dây nối thì không.

Adapt: căn giữa trái, ba dòng; vòng đồng tâm cobalt-tint mảnh ở mép phải, vẽ ra chậm một lần rồi đứng yên. Không slide-header, không pill đếm; thanh tiến độ đầy 16/16.
Scene 1 (0.0–2.3s): vòng đồng tâm vẽ ra (0.0–1.2s); dòng h3 muted "Model đổi được trong một dòng cấu hình." hiện ở 0.2s.
Scene 2 (2.3–5.0s): h1 "Dữ liệu và dây nối" (2.3s), xuống dòng "thì không ai làm thay được." (4.0s); dòng model mờ ~45%.
Scene 3 (5.0–10.06s): accent line cobalt vẽ ra (5.0s), dòng h2 "Đó là nơi tổ chức nên đầu tư." hiện (5.5s). Đứng yên tới hết (khoảng lặng cuối 2.5s).
