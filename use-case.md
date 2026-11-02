# Use Case – AIDepQuiz

## 1. Phạm vi

Phiên bản đầu tiên của AIDepQuiz có hai use case chính:

- **UC01:** Lấy danh sách câu hỏi và các lựa chọn.
- **UC02:** Gửi đáp án và nhận kết quả bài kiểm tra.

Bài kiểm tra gồm đúng **10 câu hỏi**. Các câu hỏi được lưu cố định trong database và được trả về theo đúng thứ tự; hệ thống không random câu hỏi.

## 2. UC01 – Lấy câu hỏi và các lựa chọn

| Thuộc tính | Mô tả |
|---|---|
| Mã | UC01 |
| Tên | Lấy câu hỏi và các lựa chọn |
| Actor chính | Người dùng |
| Mục tiêu | Hiển thị 10 câu hỏi cùng các lựa chọn để người dùng làm bài kiểm tra |
| Phương thức | `GET` |

### Tiền điều kiện

- Hệ thống có sẵn 10 câu hỏi và các lựa chọn tương ứng trong database.
- Người dùng đang ở màn hình bắt đầu bài kiểm tra.

### Main flow

1. Người dùng nhấn nút **“Bắt đầu bài test”**.
2. Frontend gửi request UC01 đến server.
3. Server nhận request và lấy 10 câu hỏi cùng các lựa chọn theo thứ tự cố định.
4. Server trả về API response. Mỗi câu hỏi và mỗi lựa chọn phải có `id`.
5. Frontend nhận response và hiển thị các câu hỏi theo đúng thứ tự.

### Alternative flow

Không có alternative flow trong phạm vi hiện tại.

## 3. UC02 – Gửi đáp án và nhận kết quả

| Thuộc tính | Mô tả |
|---|---|
| Mã | UC02 |
| Tên | Gửi đáp án và nhận kết quả |
| Actor chính | Người dùng |
| Mục tiêu | Tính điểm và trả về mức độ phụ thuộc, nhận xét và lời khuyên |
| Phương thức | `POST` |

### Tiền điều kiện

- Người dùng đã nhận đủ 10 câu hỏi từ UC01.
- Người dùng đã chọn đáp án cho tất cả 10 câu hỏi.

### Main flow

1. Người dùng trả lời các câu hỏi theo thứ tự được hiển thị.
2. Khi trả lời câu hỏi cuối cùng, người dùng nhấn nút **“Hoàn thành”**.
3. Frontend tạo request gồm danh sách 10 đáp án. Mỗi phần tử chứa `questionId` và `optionId`.
4. Frontend gửi request UC02 đến server.
5. Server kiểm tra danh sách đáp án có đúng 10 câu hỏi hay không.
6. Server kiểm tra mỗi câu hỏi có đúng một đáp án được chọn hay không.
7. Server lấy điểm tương ứng của từng đáp án.
8. Server cộng điểm của 10 đáp án để có tổng điểm.
9. Server xác định mức độ phụ thuộc dựa trên tổng điểm.
10. Server lấy nhận xét và lời khuyên tương ứng từ database.
11. Server trả về kết quả cho frontend.
12. Frontend hiển thị tổng điểm, mức độ phụ thuộc, nhận xét và lời khuyên.

### Request dữ liệu dự kiến

```json
{
  "answers": [
    { "questionId": 1, "optionId": 3 },
    { "questionId": 2, "optionId": 1 }
  ]
}
```

Request thực tế phải chứa đủ 10 phần tử, tương ứng với 10 câu hỏi.

### Response dữ liệu dự kiến

```json
{
  "sumTotal": 32,
  "dependencyLevel": "Mức độ phụ thuộc trung bình",
  "comment": "Nhận xét về kết quả của người dùng.",
  "advice": "Lời khuyên tương ứng với mức độ phụ thuộc."
}
```

Tên field chính thức cần được thống nhất trong API contract.

### Alternative flow

#### AF01 – Số lượng câu hỏi không hợp lệ

- Nếu request có ít hơn hoặc nhiều hơn 10 câu hỏi, server từ chối request.
- Server trả về lỗi validation phù hợp.
- Frontend thông báo người dùng chưa thể hoàn thành bài kiểm tra.

#### AF02 – Có câu hỏi chưa được trả lời hoặc có đáp án không hợp lệ

- Nếu một hoặc nhiều câu hỏi không có đáp án, server từ chối request.
- Nếu một câu hỏi có nhiều hơn một đáp án, server từ chối request.
- Nếu `questionId` hoặc `optionId` không tồn tại hoặc không thuộc cùng một câu hỏi, server cũng từ chối request.
- Server trả về lỗi validation phù hợp.

## 4. Các điểm nên chốt trong API contract

- Tên chính thức của các field trong request và response.
- Cấu trúc lỗi validation và HTTP status code khi request không hợp lệ.
- Có cho phép gửi lại UC02 hay không. Vì kết quả không được lưu theo người dùng, request có thể được xử lý lại nếu frontend gửi lại cùng danh sách đáp án.
- Quy tắc ánh xạ tổng điểm sang mức độ phụ thuộc.
- Cấu trúc database cho điểm của lựa chọn, mức đánh giá, nhận xét và lời khuyên.

## 5. Quy tắc nghiệp vụ cốt lõi

- Mỗi bài kiểm tra luôn có đúng 10 câu hỏi.
- Câu hỏi không được random.
- Mỗi câu hỏi phải có đúng một đáp án khi submit.
- Điểm được tính ở backend; frontend chỉ hiển thị dữ liệu kết quả do server trả về.
- UC02 không bắt buộc phải lưu đáp án hoặc kết quả vào database; backend có thể chỉ đọc dữ liệu cần thiết từ database, tính toán trong memory và trả response.
