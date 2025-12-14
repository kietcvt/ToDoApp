# ToDoApp

Ứng dụng quản lý công việc (ToDo) fullstack đơn giản gồm **backend Node.js/Express + MongoDB** và **frontend React/Vite/TailwindCSS**.

## Cấu trúc thư mục

```
ToDoApp/
├── docker-compose.dev.yml
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── taskController.js
│       ├── models/
│       │   └── Task.js
│       └── routes/
│           └── taskRouters.js
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       ├── lib/
│       └── pages/
└── .dist/
```

## Tính năng chính

- **Quản lý nhiệm vụ**
  - Thêm, sửa, xoá task.
  - Cập nhật trạng thái: *active* / *completed*.
- **Bộ lọc nhiệm vụ**
  - Lọc theo trạng thái: *All / Active / Completed*.
  - Lọc theo khoảng thời gian (thông qua `DateTimeFilter`, dùng query `dateQuery`).
- **Phân trang danh sách công việc**
  - Giới hạn số task hiển thị trên mỗi trang (`visibleTaskLimit`).
  - Điều hướng bằng nút **Trước / Sau** và chọn số trang.
  - Tự động cập nhật tổng số trang theo bộ lọc.
- **Thống kê nhanh**
  - Đếm số task đang active.
  - Đếm số task đã hoàn thành.
- **Thông báo UX**
  - Sử dụng `sonner` để hiển thị toast khi có lỗi gọi API.

## Kiến trúc dự án

Thư mục chính:

- `backend/`
  - API server viết bằng **Node.js + Express**.
  - Lưu trữ dữ liệu bằng **MongoDB** thông qua **Mongoose**.
  - Điểm vào chính: `src/server.js`.
- `frontend/`
  - Ứng dụng web viết bằng **React** chạy với **Vite**.
  - Giao diện sử dụng **TailwindCSS** + các component phong cách shadcn (button, pagination, dialog, popover...).
  - Trang chính: `src/pages/HomePage.jsx` (chứa layout, phân trang, filter, stats,...).

## Công nghệ sử dụng

### Backend
- **Node.js**, **Express**
- **MongoDB**, **Mongoose**
- **.env** để quản lý biến môi trường
- **cors** để cho phép frontend truy cập API

### Frontend
- **React 19**, **React DOM**
- **Vite** (dev server và build tool)
- **TailwindCSS** + `tailwind-merge`
- **Radix UI** (`@radix-ui/react-dialog`, `@radix-ui/react-popover`, ...)
- **lucide-react** (icon)
- **axios** (gọi API tới backend)
- **react-router** (điều hướng)
- **sonner** (toast notification)

## Cài đặt & Chạy dự án

### 1. Yêu cầu

- **Node.js** (khuyến nghị >= 18)
- **MongoDB** đang chạy cục bộ hoặc connection string đến MongoDB Atlas

### 2. Clone repository

```bash
git clone https://github.com/kietcvt/ToDoApp.git
cd ToDoApp
```

### 3. Cài đặt & chạy Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/` dựa trên .env_example, ví dụ:

```env
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

Chạy server backend (development):

```bash
npm run dev
```

Hoặc chạy production đơn giản:

```bash
npm start
```

Mặc định API sẽ chạy ở `http://localhost:5001` (hoặc theo PORT bạn cấu hình).

### 4. Cài đặt & chạy Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

Chạy ứng dụng frontend (development):

```bash
npm run dev
```

Theo mặc định Vite sẽ chạy ở: `http://localhost:5173/`.

> Lưu ý: Hãy đảm bảo URL backend (ví dụ `http://localhost:5001`) trùng với cấu hình trong file axios client (`frontend/src/lib/axios`).

## Build production

Từ thư mục `frontend/`:

```bash
npm run build
```

Đầu ra build production sẽ nằm trong thư mục `frontend/dist`.

## Chạy với Docker

Dự án hỗ trợ chạy bằng Docker Compose để dễ dàng triển khai.

### Yêu cầu

- **Docker** và **Docker Compose**
- **MongoDB** đang chạy trên máy host (hoặc cấu hình MONGODB_URI phù hợp)

### Chạy development

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Frontend sẽ chạy ở `http://localhost:5173`, backend ở `http://localhost:5001`.

### Chạy production

```bash
docker-compose up --build
```

Frontend sẽ chạy ở `http://localhost:80`.

Để dừng:

```bash
docker-compose down
```

---

Nếu bạn muốn mở rộng dự án (ví dụ: đăng nhập, nhiều danh sách todo, ưu tiên nhiệm vụ, v.v.), có thể tiếp tục phát triển dựa trên kiến trúc hiện tại.
