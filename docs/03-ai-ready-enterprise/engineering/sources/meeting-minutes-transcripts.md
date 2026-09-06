# Source: Meeting Minutes and Transcripts

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 3.*

## 1. Khó ở đâu

- Transcript tự động: người nói gán sai, JA/VI/EN xen kẽ qua thông dịch, câu
  của thông dịch viên bị ghi thành câu của khách.
- Quyết định nói ngầm (「そうですね」 rồi chuyển chủ đề); action không có chủ,
  không có hạn.
- 議事録 chính thức gửi khách và transcript thật đôi khi khác nhau; cái nào là
  sự thật cho agent?
- Recording là dữ liệu nhạy cảm và nặng; có khách tham dự là dữ liệu khách.

## 2. Lớp 1 — nguyên bản

| Việc | Cách làm |
|---|---|
| Lấy gì | Transcript (file gốc của công cụ họp), metadata lịch (tiêu đề, giờ, người tham dự), 議事録 chính thức (là một [tài liệu](japanese-spec-documents.md) hoặc trang [Confluence](confluence.md)), ghi chú tay của BrSE nếu có |
| Phân vùng | `(meeting_id)`; `meeting_id` từ lịch |
| Ledger | `(meeting, meeting_id)` sau khi có transcript + 議事録 (hoặc đánh dấu "không có 議事録") |
| Idempotent | Transcript mới cho cùng meeting = version mới, không đè |
| Giới hạn | Recording: hạn lưu N ngày rồi xóa, transcript giữ; họp có khách: phân loại dữ liệu khách; không đưa recording lên dịch vụ ngoài ranh giới |

## 3. Lớp 2 — bảng có kiểu

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `meetings` | `meeting_id`, `title`, `start`, `end`, `attendees_json`, `customer_present`, `minutes_ref`, `transcript_version` | `customer_present` quyết định phân loại |
| `transcript_segments` | `meeting_id`, `version`, `seq`, `start_sec`, `speaker_label`, `lang`, `text` | `speaker_label` là nhãn của công cụ, **không phải** danh tính xác nhận |
| `minutes_items` | `item_id`, `meeting_id`, `item_type` (decision / action / question / info), `text`, `owner`, `due`, `source` (minutes / transcript_extracted), `source_segment_seq`, `confirmed_by`, `confirmed_at`, `state` | Append-only; mục trích tự động có `source = transcript_extracted` và `confirmed_by` null cho đến khi BrSE xác nhận |
| `meeting_refs` | `meeting_id`, `item_id`, `ref_type`, `ref_id` | Issue key, doc item → `xref` |

Bẫy:

| Điểm | Bẫy | Quy ước |
|---|---|---|
| Người nói | Tin `speaker_label` | Chỉ nói "theo transcript, người được gán là…"; danh tính do BrSE xác nhận |
| Thông dịch | Câu dịch ghi thành lời khách | Đoạn `lang = vi` trong họp với khách JA mặc định là lời thông dịch |
| Owner/due | Điền cho đủ | Null là null; quy tắc "không bịa chủ, không bịa hạn" (chung với skill `meeting-notes-to-actions`) |
| 議事録 vs transcript | Coi cái nào cũng được | 議事録 đã gửi khách là bản **có hiệu lực**; transcript là bằng chứng để đối chiếu |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Action mở theo tuổi | `minutes_items` type action, state open, ngày kể từ họp | `MEASURED` |
| Action quá hạn | `due < today` hoặc không due và > 10 ngày làm việc | Phần sau là `CONVENTION` |
| Quyết định chưa có ticket | Decision confirmed không có `meeting_refs` tới Jira | `MEASURED` |
| Mục chưa xác nhận | `confirmed_by IS NULL` sau 24 giờ | `MEASURED`; 24 giờ là `CONVENTION` |
| Trích xuất tự động | LLM đọc transcript → nháp `minutes_items` | Không phải chỉ số; là **nháp**, có `source_segment_seq` làm bằng chứng |

## 5. Lớp 4 — bộ tri thức

Data map:

| Câu hỏi | Bảng | Cách trả lời |
|---|---|---|
| Họp hôm qua quyết gì | `minutes_items` decision, `confirmed_by` không null | Liệt kê; mục chưa xác nhận đưa riêng, ghi "trích tự động, chưa xác nhận" |
| Action của tôi còn gì | `minutes_items` action open theo owner | Có hạn/không hạn tách riêng |
| Khách đã nói gì về X trong họp | `transcript_segments` theo từ khóa | Trích kèm `seq`, cảnh báo speaker_label; ưu tiên 議事録 nếu có |
| Quyết định nào chưa vào Jira | `decisions_without_ticket` | Danh sách để BrSE tạo ticket ở chế độ tương tác |

Guardrail (biên bản/transcript **không** nói được gì):

- Transcript không phải thỏa thuận; thỏa thuận là 議事録 khách đã nhận không
  phản đối, hoặc văn bản.
- Không suy đồng ý từ 「はい」/「そうですね」.
- Không gán owner theo "người nói nhiều nhất về chủ đề".
- Họp có khách: nội dung là dữ liệu khách, không đi qua kênh ngoài phân loại.

Playbook: trong 24 giờ sau họp, agent gửi BrSE bản nháp mục trích (chế độ
tương tác, skill `meeting-notes-to-actions`); BrSE xác nhận/sửa → mục thành
confirmed → ticket Jira và trang Confluence tạo từ mục confirmed, không từ
transcript.

## 6. Lệnh và tool

```text
meetings: {
  status: ok,
  meetings_since_last_sync: n,
  unconfirmed_items: [ { item_id, meeting_id, age_hours } ],
  open_actions: n, overdue_actions: n,
  decisions_without_ticket: n
}
```

Tool ghi một tham số: `confirm-item 'item=…; by=…'`,
`log-minutes-item 'meeting=…; type=…; text=…; owner=…; due=…'` (owner/due để
trống được).

## 7. Nghiệm thu

- AI-friendly: dựng lại `minutes_items` từ 議事録 và transcript offline;
  transcript có `seq` liên tục, không mất đoạn.
- AI-ready: với 5 cuộc họp gần nhất, BrSE so danh sách quyết định/action của
  mình với của agent: agent không thiếu quyết định nào đã confirmed, không bịa
  owner/hạn; mục chưa xác nhận luôn được đánh dấu.

## 8. Bẫy

- Tạo ticket Jira thẳng từ transcript.
- Giữ recording vô thời hạn trong thư mục chia sẻ.
- Tin `speaker_label`.
- Để mục "trích tự động" lẫn với mục đã xác nhận trong cùng một câu trả lời.
