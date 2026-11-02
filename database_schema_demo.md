# Database Schema Demo – AIDepQuiz

Tài liệu mô tả database schema demo cho ba entity chính của AIDepQuiz:

- `Question`
- `Option`
- `Result`


## 1. Entity: `Question`

### Table: `questions`

| Attribute | Data type | Constraint | Mô tả |
|---|---|---|---|
| `id` | `BIGINT GENERATED ALWAYS AS IDENTITY` | `PRIMARY KEY` | Mã định danh duy nhất của câu hỏi. |
| `content` | `TEXT` | `NOT NULL` | Nội dung câu hỏi. |
| `display_order` | `INTEGER` | `NOT NULL`, `UNIQUE` | Thứ tự hiển thị câu hỏi, từ 1 đến 10. Dùng để đảm bảo câu hỏi không bị random. |

### SQL definition

```sql
CREATE TABLE questions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    display_order INTEGER NOT NULL UNIQUE,

    CONSTRAINT questions_display_order_check
        CHECK (display_order BETWEEN 1 AND 10)
);
```

## 2. Entity: `Option`

### Table: `options`

| Attribute | Data type | Constraint | Mô tả |
|---|---|---|---|
| `id` | `BIGINT GENERATED ALWAYS AS IDENTITY` | `PRIMARY KEY` | Mã định danh duy nhất của lựa chọn. |
| `question_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY` | Mã câu hỏi mà lựa chọn này thuộc về. Tham chiếu đến `questions.id`. |
| `content` | `TEXT` | `NOT NULL` | Nội dung của lựa chọn. |
| `score` | `INTEGER` | `NOT NULL` | Điểm số của lựa chọn khi người dùng chọn đáp án này. |
| `display_order` | `INTEGER` | `NOT NULL` | Thứ tự hiển thị của lựa chọn trong một câu hỏi. |

### SQL definition

```sql
CREATE TABLE options (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    score INTEGER NOT NULL,
    display_order INTEGER NOT NULL,

    CONSTRAINT options_question_id_fk
        FOREIGN KEY (question_id)
        REFERENCES questions (id)
        ON DELETE CASCADE,

    CONSTRAINT options_score_check
        CHECK (score >= 0),

    CONSTRAINT options_question_order_unique
        UNIQUE (question_id, display_order)
);
```

## 3. Entity: `Result`

### Table: `results`

`Result` lưu các khoảng tổng điểm và kết quả tương ứng. Khi người dùng hoàn thành bài quiz, backend tính tổng điểm rồi tìm bản ghi phù hợp trong bảng này.

| Attribute | Data type | Constraint | Mô tả |
|---|---|---|---|
| `id` | `BIGINT GENERATED ALWAYS AS IDENTITY` | `PRIMARY KEY` | Mã định danh duy nhất của mức kết quả. |
| `min_score` | `INTEGER` | `NOT NULL` | Tổng điểm thấp nhất thuộc mức kết quả này. |
| `max_score` | `INTEGER` | `NOT NULL` | Tổng điểm cao nhất thuộc mức kết quả này. |
| `level` | `VARCHAR(150)` | `NOT NULL` | Mức độ phụ thuộc, ví dụ: “Mức độ phụ thuộc cao”. |
| `evaluation` | `JSONB` | `NOT NULL` | Nội dung nhận xét có tiêu đề và danh sách các ý dạng bullet. |
| `advice` | `JSONB` | `NOT NULL` | Lời khuyên có tiêu đề và danh sách các ý dạng bullet. |

### SQL definition

```sql
CREATE TABLE results (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    min_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    level VARCHAR(150) NOT NULL,
    evaluation JSONB NOT NULL,
    advice JSONB NOT NULL,

    CONSTRAINT results_score_range_check
        CHECK (min_score <= max_score)
);
```

## 4. Relationships

```text
questions 1 ─────────── N options
```

- Một `Question` có nhiều `Option`.
- Một `Option` chỉ thuộc về một `Question`.
- `Option.question_id` là **foreign key (FK)** tham chiếu đến `Question.id`.
- `Result` được tìm kiếm dựa trên tổng điểm, không cần foreign key trực tiếp đến `Question` hoặc `Option`.

## 5. Query tìm kết quả theo tổng điểm

```sql
SELECT id, level, evaluation, advice
FROM results
WHERE :sum_total BETWEEN min_score AND max_score;
```

`evaluation` và `advice` dùng cấu trúc JSONB như sau:

```json
{
    "title": "Nhận xét về bạn:",
    "items": [
        "Nhận xét thứ nhất",
        "Nhận xét thứ hai"
    ]
}
```

## 6. Quy tắc dữ liệu chính

- Bài quiz có đúng 10 câu hỏi.
- `questions.display_order` xác định thứ tự câu hỏi và không được random.
- Mỗi `Option` phải tham chiếu đến một `Question` tồn tại thông qua `question_id`.
- Điểm của từng lựa chọn được lưu tại `options.score`.
- Các khoảng điểm trong `results` không được chồng lấn.
- Với mỗi tổng điểm hợp lệ, hệ thống phải tìm được đúng một bản ghi trong `results`.
