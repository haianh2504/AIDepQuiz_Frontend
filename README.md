# AIDepQuiz – Frontend

## 1. Giới thiệu

**AIDepQuiz** là một ứng dụng quiz nhằm giúp người dùng tự đánh giá mức độ phụ thuộc vào việc sử dụng AI trong học tập và công việc. Sau khi hoàn thành bài kiểm tra, người dùng sẽ nhận được điểm số, mức đánh giá và lời khuyên để sử dụng AI một cách có nhận thức và hiệu quả hơn.

Dự án hướng đến mọi người, đặc biệt là học sinh, sinh viên và những người thường xuyên sử dụng các công cụ AI.

> README này mô tả định hướng triển khai frontend. Backend, database schema và API contract hiện chưa hoàn thiện.

## 2. Mục tiêu phiên bản đầu tiên

Phiên bản đầu tiên dự kiến cho phép người dùng:

- Truy cập trang giới thiệu dự án.
- Xem thông tin tại trang About.
- Bắt đầu bài kiểm tra gồm đúng 10 câu hỏi.
- Các câu hỏi được lưu cố định trong database và không được random trong mỗi lượt làm bài.
- Chọn câu trả lời và xem điểm số tương ứng.
- Điều hướng qua các câu hỏi và bảo toàn trạng thái câu trả lời.
- Gửi bài kiểm tra để nhận tổng điểm.
- Xem mức độ phụ thuộc vào AI.
- Nhận lời khuyên được chuẩn bị trước để cải thiện cách sử dụng AI.

## 3. Phạm vi và giới hạn

### Trong phạm vi phiên bản đầu tiên

- Bài kiểm tra không yêu cầu đăng nhập.
- Không lưu lịch sử kết quả cá nhân của người dùng.
- Bài quiz gồm đúng 10 câu hỏi; nội dung được lưu cố định trong database và không random câu hỏi.
- Nội dung câu hỏi, mức điểm, mức đánh giá và lời khuyên được chuẩn bị trước.
- Dữ liệu nội dung dự kiến được quản lý từ file Excel và lưu vào PostgreSQL thông qua backend.

### Chưa thuộc phạm vi hiện tại

- Đăng nhập hoặc đăng ký tài khoản.
- Lưu lịch sử kết quả của từng người dùng.
- Admin dashboard.
- Lời khuyên được cá nhân hóa bằng AI theo thời gian thực.
- Lưu trữ điểm số của người dùng để xác định người dùng thuộc top bao nhiêu phần trăm trong tổng số người đã làm quiz, đồng thời lưu trữ và hiển thị tổng số người đã hoàn thành quiz.
- Backend Spring Boot hoàn chỉnh.
- API contract chính thức.

## 4. Công nghệ dự kiến

- **Framework:** Next.js
- **Ngôn ngữ:** TypeScript
- **Giao diện:** Modern CSS và các UI components phù hợp với design system của dự án
- **Package manager:** npm
- **Runtime:** Node.js v26.7.0
- **Database:** PostgreSQL
- **Database hosting dự kiến:** Supabase
- **Frontend hosting dự kiến:** Vercel
- **Backend dự kiến:** Spring Boot

## 5. Cấu trúc route dự kiến

| Route | Mục đích |
|---|---|
| `/` | Trang chủ, giới thiệu ngắn và bắt đầu bài kiểm tra |
| `/about` | Thông tin về AIDepQuiz và mục tiêu dự án |
| `/quiz` | Hiển thị câu hỏi, lựa chọn câu trả lời và tiến trình làm bài |
| `/result` | Hiển thị tổng điểm, mức độ phụ thuộc vào AI và lời khuyên |

Frontend dự kiến sử dụng Next.js App Router. Các route cần được tách rõ ràng, có thể điều hướng trực tiếp và xử lý đúng trạng thái khi người dùng chuyển trang.

## 6. Luồng sử dụng chính

```text
Homepage
   ↓
Bắt đầu quiz
   ↓
Trả lời đúng 10 câu hỏi theo thứ tự cố định
   ↓
Theo dõi tiến trình và bảo toàn lựa chọn
   ↓
Gửi bài kiểm tra
   ↓
Tính tổng điểm
   ↓
Hiển thị mức độ phụ thuộc vào AI và lời khuyên
```

## 7. Hướng dẫn khởi tạo và chạy local

Project frontend hiện đang ở giai đoạn khởi tạo. Sau khi Next.js project được tạo và các npm scripts được thiết lập, workflow dự kiến trên macOS và Windows là:

```bash
npm install
npm run dev
```

Frontend thường sẽ chạy tại:

```text
http://localhost:3000
```

Các lệnh kiểm tra dự kiến:

```bash
tsc --noEmit
npm run lint
npm run build
```

Các lệnh trên cần được đối chiếu với `package.json` sau khi project được khởi tạo chính thức.

## 8. Cấu hình môi trường

Frontend dự kiến sử dụng hai file:

```text
.env.example   # commit với giá trị mẫu, không chứa secret
.env.local      # dùng local, không commit
```

Các biến môi trường dự kiến cho Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Không đưa secret key hoặc service-role key vào code chạy trên browser. Database schema, RLS policies và cách import dữ liệu từ Excel sẽ được định nghĩa trong tài liệu backend sau.

## 9. Định hướng dữ liệu và tích hợp backend

### Nguồn dữ liệu dự kiến

Các nội dung sau được chuẩn bị trước thông qua file Excel:

- Câu hỏi.
- Các lựa chọn trả lời.
- Điểm số của từng lựa chọn.
- Mức đánh giá theo khoảng điểm.
- Lời khuyên tương ứng.

### Quy tắc bài quiz

- Tổng số câu hỏi của một bài quiz là **10 câu**.
- Thứ tự câu hỏi được lưu cố định trong database; frontend không tự random câu hỏi.
- Mỗi câu hỏi trả về các lựa chọn tương ứng. Điểm của lựa chọn không nên được frontend tự suy đoán mà cần được backend/API contract quy định.

### Use cases/API dự kiến

| Mã | Use case | Mục đích |
|---|---|---|
| UC01 | GET quiz questions and options | Lấy 10 câu hỏi theo thứ tự cố định cùng các lựa chọn của từng câu. |
| UC02 | POST submit quiz answers and get result | Gửi đáp án của đủ 10 câu hỏi để backend tính kết quả. Response trả tổng điểm, mức đánh giá, nhận xét và lời khuyên. |


Các điểm cần chốt thêm trong API contract:
- UC02 sử dụng `POST`; request phải chứa `questionId` cùng `optionId` tương ứng cho từng câu hỏi.
- Người dùng bắt buộc trả lời đủ 10 câu trước khi submit.
- Cách xử lý câu hỏi/đáp án không tồn tại, thiếu đáp án hoặc submit lặp lại.
- Response kết quả gồm: `sum total`, mức đánh giá, nhận xét và lời khuyên.

UC01 và UC02 đã bao phủ luồng nghiệp vụ chính. Kết quả được trả ngay trong response của UC02.

### Luồng tích hợp dự kiến

```text
Next.js page/component
        ↓
Feature API hoặc hook
        ↓
API client
        ↓
Spring Boot backend
        ↓
PostgreSQL trên Supabase
```

API contract và backend repository: **To be defined**.

Frontend không được tự suy đoán endpoint, request body hoặc response shape trước khi API contract được thống nhất.

## 10. Quy tắc giao diện

Các quy tắc chi tiết về màu sắc, typography, spacing, component, responsive behavior, hover, focus và transition sẽ được quản lý tại:

```text
docs/design-system.md
```

File design system sẽ được tạo hoặc cập nhật trong quá trình triển khai UI bằng skill `frontend-vibe-coding`.

Các component mới cần tuân thủ design system thay vì tự tạo style riêng không có lý do rõ ràng.

## 11. Kiểm thử và kiểm tra chất lượng

### 11.1. TypeScript và static analysis

```bash
tsc --noEmit
```

Mục tiêu là kiểm tra type safety trên các component, feature và API utilities.

### 11.2. Linting

```bash
npm run lint
```

Mục tiêu là duy trì code style nhất quán và phát hiện các cảnh báo cú pháp hoặc logic.

### 11.3. Production build

```bash
npm run build
```

Build cần chạy thành công trước khi triển khai lên Vercel, đặc biệt để phát hiện lỗi type, lỗi import giữa Server/Client Component và lỗi build-time.

### 11.4. Manual quiz-flow testing

Kiểm tra thủ công toàn bộ luồng:

- Khởi tạo quiz.
- Chọn câu trả lời.
- Chuyển giữa các câu hỏi.
- Bảo toàn trạng thái đã chọn.
- Tính điểm.
- Gửi bài kiểm tra.
- Hiển thị kết quả và lời khuyên.

### 11.5. Error và edge cases

Kiểm tra:

- Network timeout.
- Response không hợp lệ.
- HTTP `400` và `500`.
- Session expiration nếu backend sau này có session.
- Không có dữ liệu câu hỏi.
- Người dùng chưa hoàn thành bài kiểm tra.

### 11.6. Responsive và browser testing

Kiểm tra bằng Chrome DevTools trên:

- Desktop: `1920x1080`.
- Tablet: iPad Air viewport.
- Mobile: iPhone 12/14/15 viewport.

Browser compatibility mục tiêu:

- Google Chrome.
- Safari.

## 12. Deployment

Vercel là **planned deployment target** cho frontend.

Chi tiết kết nối repository, cấu hình environment variables và quy trình deploy sẽ được bổ sung sau khi project được khởi tạo và cấu hình hoàn chỉnh.

## 13. Cấu trúc thư mục dự kiến

```text
Frontend/
├── README.md
├── docs/
│   └── design-system.md
├── app/
│   ├── about/
│   ├── quiz/
│   ├── result/
│   └── page.tsx
├── components/
├── features/
├── lib/
├── public/
├── .env.example
├── package.json
└── tsconfig.json
```

Cấu trúc thực tế có thể điều chỉnh theo quy ước được thống nhất trong quá trình triển khai.

## 14. Thành viên nhóm

**Nhóm 4 – Môn Kỹ năng nghề nghiệp**

| MSSV | Họ và tên | Vai trò |
|---|---|---|
| 25520012 | Lê Đức An | To be defined |
| 25520058 | Lê Nguyễn Hoàng Anh | To be defined |
| 25520093 | Phan Hải Anh | Lập trình frontend hiện tại |
| 25520150 | Nguyễn Trần Gia Bảo | To be defined |
| 25520220 | Huỳnh Chí Cường | To be defined |
| 25520222 | Lê Quốc Cường | To be defined |
| 25520362 | Nguyễn Anh Dũng | To be defined |

Phân công chi tiết của các thành viên sẽ được cập nhật sau.

## 15. Hướng dẫn triển khai tiếp theo

1. Khởi tạo Next.js project với TypeScript và npm.
2. Thiết lập App Router và bốn route chính.
3. Xác định design system trong `docs/design-system.md` từ các ảnh thiết kế và thông số UI.
4. Xây dựng các component giao diện và quiz flow.
5. Tạo Supabase project và thống nhất PostgreSQL schema.
6. Chuẩn bị dữ liệu câu hỏi, điểm số, rating và lời khuyên từ Excel.
7. Hoàn thiện backend Spring Boot và API contract.
8. Kết nối frontend với mock API trước, sau đó chuyển sang backend thật.
9. Chạy typecheck, lint, build và manual flow testing.
10. Chuẩn bị cấu hình Vercel sau khi frontend và backend integration ổn định.

## 16. Trạng thái tài liệu

README này là tài liệu định hướng cho frontend trong giai đoạn khởi tạo. Các phần được ghi `To be defined` cần được cập nhật khi backend, database schema, API contract, design system và phân công nhóm hoàn tất.
