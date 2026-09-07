# Source: Git / GitHub

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 3.*

## 1. Khó ở đâu

- Hai sự thật: git (commit, nhánh) và GitHub (PR, review, check-run). PR có
  thể đóng không merge; squash merge tạo sha mới không có trong nhánh cũ.
- CI log hết hạn sau vài tuần; check-run của PR cũ mất nếu không lưu.
- Nhiều repo, bot (dependabot, renovate) làm lệch mọi đếm.
- Nối với Jira chỉ qua quy ước (issue key trong tên nhánh/tiêu đề PR), không
  ai ép.
- Cám dỗ lớn nhất: dùng số commit/số dòng để đánh giá người.

## 2. Lớp 1 — nguyên bản

| Việc | Cách làm |
|---|---|
| Lấy gì | `git log` dạng JSON (sha, author, dates, message, numstat); PR đầy đủ qua `gh api` kèm reviews, review comments, check-runs của head sha; deployment/release nếu có |
| Phân vùng | `(repo, ngày)` theo `updated_at` của PR; commit theo ngày commit |
| Ledger | `(github, repo, ngày)` sau khi lấy hết PR cập nhật và check-run; PR đang mở nằm trong cửa sổ lấy lại 14 ngày |
| Idempotent | `(repo, number)` cho PR, `(repo, sha)` cho commit, `(repo, sha, check_name)` cho check-run |
| Giới hạn | Rate limit GraphQL/REST; token của tài khoản kỹ thuật chỉ đọc; repo của khách theo thỏa thuận |

Git repo tự nó là kho nguyên bản của code; phần cần lưu thêm là những gì
GitHub giữ ngoài git và sẽ hết hạn.

## 3. Lớp 2 — bảng có kiểu

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `commits` | `repo`, `sha`, `author_login`, `authored_at`, `committed_at`, `message`, `files_changed`, `additions`, `deletions`, `is_bot`, `is_merge` | `is_bot` từ danh sách login bot, versioned |
| `pull_requests` | `repo`, `number`, `title`, `author_login`, `created_at`, `first_review_at`, `merged_at`, `closed_at`, `state`, `draft`, `base`, `head_sha`, `additions`, `deletions`, `changed_files` | `state = closed` gồm cả merge và không merge |
| `pr_reviews` | `repo`, `number`, `reviewer_login`, `state` (APPROVED / CHANGES_REQUESTED / COMMENTED), `submitted_at` | |
| `pr_review_comments` | `repo`, `number`, `path`, `line`, `body`, `author_login`, `created_at`, `resolved` | Nguồn cho `code-review-findings-to-jira` |
| `check_runs` | `repo`, `sha`, `name`, `conclusion`, `started_at`, `completed_at` | Lưu trước khi log hết hạn |
| `pr_issue_refs` | `repo`, `number`, `issue_key`, `where` (branch / title / body / commit) | Đổ `xref`; `where` quyết định confidence |

Bẫy:

| Điểm | Bẫy | Quy ước |
|---|---|---|
| `merged_at` null | Đọc là "đang mở" | Kết hợp `state`; closed + merged_at null = bỏ |
| Squash merge | Tìm commit của PR trên main không thấy | Nối bằng `merge_commit_sha` lưu riêng |
| Bot | Bot chiếm nửa số PR | Lọc `is_bot` ở mọi chỉ số, ghi rõ |
| Múi giờ | GitHub UTC, team JST/ICT | Lưu ISO; giờ làm việc tính theo `jp_calendar` |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Lead time PR | `merged_at − created_at`, trung vị tuần, bỏ draft và bot | `MEASURED` |
| Chờ review | `first_review_at − created_at` (ready_for_review nếu có) | `MEASURED` |
| Chờ review đỏ | > 1 ngày làm việc | `CONVENTION` |
| Tỷ lệ CI xanh trên main | `check_runs` của commit trên main, theo tuần | `MEASURED` |
| Rework | Số commit sau review CHANGES_REQUESTED đầu tiên | `MEASURED` |
| Truy vết PR ↔ ticket | % PR merged có `pr_issue_refs` | `MEASURED`; mục tiêu ≥ 90% là `CONVENTION` |
| PR quá lớn | `additions + deletions > 400` | `CONVENTION` |
| Sẵn sàng release | Mọi issue của sprint có PR merged + CI xanh + không blocker đỏ | Quy tắc `CONVENTION`, thành phần `MEASURED` |

Chỉ số **theo team và theo repo**, không theo người. Bảng dẫn xuất không có
cột login.

## 5. Lớp 4 — bộ tri thức

Data map:

| Câu hỏi | Bảng | Cách trả lời |
|---|---|---|
| PR nào chờ review lâu | `pr_wait` | Số PR, tuổi, repo; không tên reviewer trừ khi được hỏi trực tiếp trong chế độ tương tác |
| Ticket X đã có code chưa, merge chưa | `xref` → `pull_requests` | PR number, state, merged_at |
| Sprint này release được chưa | `release_readiness` view | Liệt kê phần chưa đạt |
| CI dạo này ổn không | `ci_main_weekly` 4 tuần | Tỷ lệ, xu hướng |

Guardrail (Git/GitHub **không** nói được gì):

- Merged ≠ deployed; cần dữ liệu deployment/release mới nói "đã lên".
- CI xanh ≠ đúng spec; chỉ nói "test tự động qua".
- Số dòng, số commit không phải công sức hay chất lượng; agent không xếp hạng
  cá nhân (quy tắc dùng chung với `team-performance-report`).
- PR không có issue key: nói "không truy vết được", không đoán ticket.

## 6. Lệnh và tool

```text
git: {
  status: ok | token_expired | rate_limited,
  data_age_hours,
  open_prs: n, stale_reviews: [ { repo, number, age_hours } ],
  ci_main_pass_rate_7d,
  release_readiness: { sprint_id, ready: bool, missing: [ ... ] }
}
```

| Chế độ | Dùng gì |
|---|---|
| Tương tác | `gh`; bộ MK (`/mk:review-pr`, `/mk:ship`, `/mk:watzup`, `/mk:retro`); skill `code-review-findings-to-jira` |
| Nền | Connector đọc bằng token chỉ đọc; agent không có quyền ghi lên GitHub |

## 7. Nghiệm thu

- AI-friendly: dựng lại từ raw offline; số PR merged theo tuần khớp GitHub
  Insights ± bot.
- AI-ready: tech lead hỏi 10 câu (chờ review, truy vết, release readiness);
  agent đúng ≥ 8; câu "ai chậm nhất" bị từ chối đúng cách.

## 8. Bẫy

- Không lưu check-run trước khi hết hạn → không tái tạo được lịch sử CI.
- Đếm bot.
- Dựa vào GitHub search thay vì kho.
- Đưa login vào bảng dẫn xuất rồi "vô tình" thành bảng xếp hạng.
