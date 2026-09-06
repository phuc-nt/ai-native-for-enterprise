# Source: Jira

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 1.*

## 1. Khó ở đâu

- Custom field có tên mã (`customfield_10016` là story point ở instance này,
  số khác ở instance khác). Tên hiển thị đổi được, id thì không.
- Status là của từng workflow/dự án ("In Review", "Waiting Customer"...);
  chỉ `statusCategory` (`new` / `indeterminate` / `done`) ổn định.
- Trường sprint là **mảng**: một issue nằm trong nhiều sprint chính là
  carry-over. Jira không lưu "scope sprint lúc mở"; muốn có phải chụp lúc đó.
- Mọi biến động (chuyển trạng thái, đổi assignee, đổi estimate) chỉ có trong
  changelog; JQL không truy vấn được lịch sử.
- `updated` nhảy khi ai đó comment; không phải tiến độ.

## 2. Lớp 1 — nguyên bản

| Việc | Cách làm |
|---|---|
| Lấy gì | Issue JSON đầy đủ kèm `expand=changelog`; danh sách board, sprint theo board; danh sách field (`/field`) để dựng `field_map` |
| Phân vùng | `(project, ngày)`: JQL `project = KEY AND updated >= -1d` phân trang hết; snapshot issue của sprint **ngay khi sprint mở và ngay khi đóng** (cron riêng, theo `startDate`/`completeDate`) |
| Ledger | Đánh dấu `(jira, project, ngày)` sau khi parse hết trang; snapshot sprint đánh dấu `(jira_sprint_snapshot, sprint_id, open|close)` |
| Idempotent | Upsert theo `(issue_id, updated)`; chạy hai lần một ngày không tạo bản sao |
| Giới hạn | Rate limit theo token; tài khoản kỹ thuật riêng cho chế độ nền; token hết hạn → `status: token_expired`, không phải lỗi |

Lần đầu: backfill toàn bộ dự án theo `created` từng tháng để không đụng rate
limit.

## 3. Lớp 2 — bảng có kiểu

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `issues` | `id`, `key`, `project`, `issuetype`, `status`, `statusCategory`, `priority`, `assignee_accountId`, `reporter_accountId`, `created`, `updated`, `resolutiondate`, `duedate`, `parent_key`, `customfield_10016`, `labels`, `components` | Giữ tên trường Jira; `customfield_*` giữ nguyên id, nghĩa nằm ở `field_map` |
| `field_map` | `field_id`, `name`, `schema_type`, `custom` | Sinh từ `/field`; truy vấn mẫu tra tên qua bảng này |
| `sprints` | `id`, `board_id`, `name`, `state`, `startDate`, `endDate`, `completeDate`, `goal` | `completeDate` null = chưa đóng |
| `issue_sprints` | `issue_id`, `sprint_id`, `in_open_snapshot`, `in_close_snapshot` | Hai cờ đến từ snapshot; là nền của velocity thật và carry-over |
| `changelog` | `issue_id`, `created`, `author_accountId`, `field`, `fromString`, `toString` | Một dòng một thay đổi trường |
| `issue_links` | `from_key`, `to_key`, `link_type` | Blocks / is blocked by |
| `users` | `accountId`, `displayName`, `active` | Không lưu email nếu không cần |

Bẫy kiểu và sentinel:

| Trường | Bẫy | Quy ước ghi trong schema doc |
|---|---|---|
| `resolutiondate` | null ≠ chưa xong nếu workflow không đặt resolution | "Done" = `statusCategory = done`; `resolutiondate` chỉ để tính thời điểm |
| `customfield_10016` | null (chưa estimate) ≠ 0 (estimate bằng 0) | Giữ null; chỉ số dùng `COALESCE` phải nói rõ |
| Thời gian | API trả UTC có offset; PM nhìn JST | Lưu ISO gốc; view hiển thị JST; as-of luôn kèm múi giờ |
| `sprint` | Mảng; issue ở backlog là null | `issue_sprints` nhiều dòng; backlog không có dòng |
| Subtask | Có story point riêng → đếm đôi | Chỉ số sprint tính trên `issuetype` không phải subtask, ghi rõ |
| Epic | Qua `parent` (team-managed) hoặc `Epic Link` (company-managed) | `parent_key` chuẩn hóa cả hai, ghi nguồn |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Velocity thật | Σ story point của issue `in_open_snapshot AND statusCategory = done` tại close snapshot | `MEASURED` |
| Carry-over | Issue `in_open_snapshot AND NOT done` lúc đóng; cả số lượng và điểm | `MEASURED` |
| Scope thêm giữa sprint | Issue `in_close_snapshot AND NOT in_open_snapshot` | `MEASURED` |
| Baseline velocity | Trung vị 6 sprint đóng gần nhất | Giá trị `MEASURED`, cửa sổ 6 là `CONVENTION` |
| Tuổi blocker | Ngày kể từ khi `flagged` bật hoặc status vào nhóm "Blocked" (từ changelog), đến nay | `MEASURED` |
| Blocker đỏ | Tuổi > 3 ngày làm việc | `CONVENTION` |
| Cycle time | `changelog` lần đầu vào `indeterminate` → lần cuối vào `done` | `MEASURED` |
| Tỷ lệ bug/story trong sprint | Đếm theo `issuetype` trên close snapshot | `MEASURED` |
| Calibrating | Dưới 3 sprint đóng | `CONVENTION` |

Chạy tiến về trước theo ngày; sprint đã đóng không đổi giá trị trừ khi
`reparse` có chủ đích. Story point "done" do Jira/sprint report tính sẵn được
lưu để **đối chiếu**, không dùng làm nguồn.

## 5. Lớp 4 — bộ tri thức

Data map (trích):

| Câu hỏi | Bảng / view | Truy vấn mẫu |
|---|---|---|
| Sprint này rủi ro gì | `sprint_metrics` sprint đang mở + `project_events` mở | "Truy vấn sẵn sàng hằng ngày" — copy, đừng viết lại |
| Blocker nào quá 3 ngày chưa ai động | `blocker_age` join `changelog` lần cập nhật cuối | Có sẵn, tham số `project` |
| Carry-over so với baseline | `sprint_metrics` 7 sprint gần nhất | Có sẵn |
| Ticket X đang ở đâu, ai giữ, bao lâu rồi | `issues` + `changelog` | Có sẵn, tham số `key` |
| Story point field là gì ở instance này | `field_map` | Có sẵn |

Guardrail (Jira **không** nói được gì):

- Vì sao ticket đứng yên. Chỉ nói "không đổi trạng thái N ngày", không suy
  diễn lý do; lý do tìm ở `project_events` hoặc Slack.
- "Done" trong Jira không phải khách chấp nhận, trừ khi workflow có status
  riêng cho việc đó — ghi rõ status nào là chấp nhận.
- Story point không so được giữa team; baseline chỉ so với chính team đó.
- Dưới 3 sprint đóng: trạng thái `calibrating`, không kết luận xu hướng.
- `updated` không phải hoạt động; dùng changelog.

Playbook: trạng thái sprint On track / At risk / Delayed tính từ carry-over dự
kiến so với baseline và số blocker đỏ (ngưỡng ghi nhãn `CONVENTION`); agent
không được đổi Delayed thành At risk khi soạn cho khách.

## 6. Lệnh và tool

Khối của Jira trong `sync --json`:

```text
jira: {
  status: ok | token_expired | rate_limited,
  latest_sprint: { id, name, state, day_n_of_m },
  data_age_hours,
  sprint_metrics: { committed_points, done_points, carry_over_points, scope_added, blockers_red, calibrating },
  blockers: [ { key, age_days, assignee, last_change } ]
}
```

| Chế độ | Dùng gì | Quyền |
|---|---|---|
| Tương tác (kỹ sư/PM trong Claude Code) | MCP Jira: `listBoards`, `listSprints`, `getSprintIssues`, `getIssue`, `createIssue`, `transitionIssue`; skill `jira-sprint-management`, `daily-standup-report` | Quyền của người dùng; người xem trước khi ghi |
| Nền (cron) | Connector dùng cùng MCP server làm client, đổ vào lớp 1; agent đọc `sync --json` và truy vấn mẫu | Tài khoản kỹ thuật chỉ đọc; không JQL tự do |

Tool ghi cho agent nền: **không có** tool ghi vào Jira. Tạo issue từ kết quả
agent là việc của chế độ tương tác (`code-review-findings-to-jira`,
`meeting-notes-to-actions`).

## 7. Nghiệm thu

- AI-friendly: xóa `issues`, `sprints`, `issue_sprints`, `changelog`; `reparse`
  không mạng ra cùng số dòng và cùng checksum. PM trả lời 10 câu bằng truy vấn
  mẫu, không sửa truy vấn.
- AI-ready: người mới đọc brief + `sync --json`, trả lời 8/10 trong 15 phút,
  mỗi câu có số, as-of, nhãn. Velocity thật của 3 sprint gần nhất khớp với con
  số PM tính tay (hoặc lệch có giải thích được bằng subtask/scope thêm).

## 8. Bẫy

- Không chụp snapshot lúc mở sprint → không bao giờ tính được velocity thật;
  sprint report của Jira không bù được vì không lưu nguyên bản.
- Đếm subtask vào velocity.
- Để agent viết JQL mỗi lượt: đoán tên custom field, quên `statusCategory`.
- Đổi tên cột `customfield_10016` thành `story_points` trong bảng — mất đối
  chiếu khi instance khác dùng id khác; đặt tên ở view, không ở bảng.
- Dùng `updated` làm "có hoạt động".
