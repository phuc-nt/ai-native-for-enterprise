# Source: Customer System Database

*Khung tám mục theo [09](../09-data-source-playbook.md). Ưu tiên pilot: 4.
Đi bằng my-db-mate (xem [hồ sơ kinh nghiệm](../../../00-foundations/ai-experience-portfolio.md#3-my-db-mate--chat-với-database-bi-tự-host)), không tự dựng.*

## 1. Khó ở đâu

- Dữ liệu production của khách: nhạy cảm nhất trong mọi nguồn; sao chép về là
  vi phạm, không phải kỹ thuật.
- Tên bảng/cột mã hóa (`T_ORD01.STS = 3`), đôi khi romaji hoặc kanji; nghĩa
  của mã nằm trong tài liệu khách hoặc trong đầu DBA.
- Lớn, có replica lag; truy vấn sai làm chậm hệ thống khách.
- Cám dỗ: cho LLM viết SQL thẳng vào DB. Đây là điều **không bao giờ** làm với
  agent nền.

## 2. Lớp 1 — nguyên bản

Lớp 1 ở đây **không phải dữ liệu**, mà là **mô tả dữ liệu**:

| Việc | Cách làm |
|---|---|
| Lấy gì | Snapshot catalog (`information_schema`: bảng, cột, kiểu, nullability, comment, FK khai báo), row count theo bảng, và **kết quả** của truy vấn đã xác minh kèm as-of |
| Phân vùng | `(db, ngày)` cho catalog; `(query_id, ngày)` cho kết quả |
| Ledger | Sau khi so catalog với hôm trước và ghi diff |
| Idempotent | Catalog theo ngày; kết quả truy vấn theo `(query_id, params_hash, as_of)` |
| Giới hạn | Role chỉ đọc trên replica; giới hạn dòng và thời gian; danh sách cột PII bị chặn ở role, không ở prompt; mọi truy vấn ghi log ở phía DB |

Mẫu dữ liệu để viết truy vấn: lấy qua view ẩn danh hóa/tổng hợp do khách
duyệt, hoặc dữ liệu giả cùng schema.

## 3. Lớp 2 — bảng có kiểu

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `db_tables` | `db`, `schema`, `table`, `comment`, `row_count`, `as_of` | Tên giữ nguyên |
| `db_columns` | `db`, `table`, `column`, `data_type`, `nullable`, `comment`, `is_pii`, `pii_source` | `is_pii` do người đặt, versioned |
| `code_values` | `table`, `column`, `code`, `meaning`, `source`, `label`, `confirmed_by` | Nghĩa của `STS = 3`; `label` = `LITERATURE` nếu từ tài liệu khách, `CONVENTION` nếu suy từ dữ liệu và chưa khách xác nhận |
| `fk_inferred` | `from`, `to`, `how`, `confidence` | FK không khai báo, suy từ tên/giá trị |
| Semantic layer (my-db-mate) | Entity, quan hệ, metric, dimension | Lớp nghĩa, có version |
| `verified_queries` | `query_id`, `question`, `sql`, `params`, `verified_by`, `verified_at`, `expected_shape` | Kho truy vấn đã xác minh; agent chỉ gọi theo `query_id` |

Bẫy:

| Điểm | Bẫy | Quy ước |
|---|---|---|
| Nghĩa mã | Suy `3 = đã giao` từ vài dòng rồi coi là thật | `CONVENTION` cho đến khi `confirmed_by` khách; agent nói "theo suy đoán chưa xác nhận" |
| Dịch tên cột | `so_luong` thay `QTY` | Giữ gốc, nghĩa trong semantic layer |
| Replica lag | Nói "hiện tại" | `as_of` từ replica; agent luôn nêu |
| NULL vs chuỗi rỗng vs `0` | Legacy trộn cả ba | Ghi trong `db_columns.comment` và trong truy vấn |
| Ký tự | Shift-JIS/全角 | Chuẩn hóa ở tầng đọc, giữ gốc |

## 4. Lớp 3 — dẫn xuất

| Chỉ số | Công thức | Nhãn |
|---|---|---|
| Governed metrics | Định nghĩa trong semantic layer, tính bằng `verified_queries` | `MEASURED`; định nghĩa metric là `LITERATURE` (tài liệu khách) hoặc `CONVENTION` (thỏa thuận với khách) |
| Sức khỏe dữ liệu | Row count đột biến, cột NULL tăng, mã mới xuất hiện ngoài `code_values` | `MEASURED`; ngưỡng `CONVENTION` |
| Mã chưa có nghĩa | Giá trị distinct không có trong `code_values` | `MEASURED` |

## 5. Lớp 4 — bộ tri thức

Data map: **mỗi câu hỏi → một `query_id`**, không → bảng. Ví dụ:

| Câu hỏi | `query_id` | Ghi chú |
|---|---|---|
| Đơn hàng tồn theo trạng thái hôm qua | `orders_by_status_daily` | Params: ngày |
| Bản ghi lỗi import tuần này | `import_errors_weekly` | |
| Mã trạng thái X nghĩa gì | tra `code_values` | Kèm nhãn |

Guardrail (DB khách **không** cho phép gì):

- Agent nền không viết SQL; câu hỏi không có `query_id` → "chưa có truy vấn đã
  xác minh cho câu này", đề nghị analyst thêm.
- Không hiển thị cột `is_pii`; không trả về bản ghi đơn lẻ có định danh cá nhân
  trừ khi tool cho phép và người dùng có quyền.
- Nghĩa mã `CONVENTION` phải được nói là suy đoán.
- Luôn kèm `as_of` và số dòng trả về/giới hạn.

Playbook (vòng tin cậy của my-db-mate): câu hỏi mới → analyst viết và chạy
thử ở chế độ tương tác trên replica → kiểm chứng với chủ nghiệp vụ → đưa vào
`verified_queries` qua PR → từ đó agent nền được gọi.

## 6. Lệnh và tool

```text
db: {
  status: ok | replica_lag_high | unreachable,
  as_of, replica_lag_minutes,
  metrics: { ... theo semantic layer ... },
  unknown_codes: [ { table, column, code, first_seen } ]
}
```

Tool đọc hẹp: `dbq --query-id <id> [--param k=v]` trả JSON `{query_id, as_of,
rows, row_limit, truncated}`. Không có tool ghi.

| Chế độ | Dùng gì |
|---|---|
| Tương tác | my-db-mate: semantic layer, verified queries, governed metrics; analyst có quyền viết SQL trên replica |
| Nền | Chỉ `dbq --query-id`; role DB riêng, không quyền `SELECT *` ngoài view |

## 7. Nghiệm thu

- AI-friendly: catalog dựng lại offline; `code_values` phủ 100% cột trạng thái
  của các bảng trong phạm vi, mỗi mã có nhãn; danh sách PII được khách ký.
- AI-ready: 10 câu hỏi nghiệp vụ trả lời bằng `query_id`; agent từ chối đúng
  cách một yêu cầu SQL tự do và một câu hỏi về cá nhân; mọi câu có `as_of`.

## 8. Bẫy

- Copy dump production về máy để "làm nhanh".
- LLM viết SQL trực tiếp trên prod, dù chỉ đọc.
- Coi nghĩa mã suy đoán là sự thật.
- Prompt liệt kê cột cấm thay vì role DB cấm.
