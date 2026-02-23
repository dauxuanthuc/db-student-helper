# DB Student Helper

Công cụ web hỗ trợ sinh viên thiết kế nhanh cấu trúc cơ sở dữ liệu, sinh script SQL, và xem sơ đồ ERD trực quan.

## 1) Giới thiệu đề tài

**DB Student Helper** là một dự án phục vụ học tập môn Cơ sở dữ liệu/Đồ án, giúp:

- Tạo và chỉnh sửa bảng dữ liệu theo giao diện trực quan.
- Sinh script SQL nhanh cho SQL Server/MySQL.
- Tạo dữ liệu mẫu (test data) theo ngữ cảnh cột.
- Xem và chỉnh quan hệ ERD theo thời gian thực.
- Nhập schema từ script SQL và xuất project để chia sẻ.

Mục tiêu là giảm thời gian viết tay SQL, giúp sinh viên tập trung vào logic nghiệp vụ và báo cáo đồ án.

## 2) Tính năng chính

- **Template mẫu đa lĩnh vực**: Sinh viên, Bán hàng, Thư viện, Rạp phim, Khách sạn.
- **CRUD bảng cục bộ**: Thêm/sửa/xóa bảng, cột, khóa chính trong modal.
- **ERD editor**: Chọn bảng cha/con, loại quan hệ (1-1, 1-n, n-1, n-n), thêm nhãn quan hệ.
- **Sinh SQL + dữ liệu mẫu**:
  - Tạo `CREATE DATABASE`, `USE`, `CREATE TABLE`.
  - Sinh dữ liệu test thông minh theo tên cột (`HoTen`, `Email`, `TenLop`, `TenKhoa`, `TenPhong`, ...).
- **Export/Import**:
  - Xuất Schema Only (JSON).
  - Xuất Full Project (JSON đầy đủ metadata).
  - Nhập script SQL (`.sql`) để dựng lại schema.
- **Chụp ERD PNG** để đưa vào báo cáo.
- **Google Analytics (GA4)**:
  - Theo dõi lượt dùng web.
  - Có dropdown “Bạn đến từ trường nào?” để gửi event tùy chọn `school_select`.

## 3) Công nghệ sử dụng

- **HTML/CSS/JavaScript thuần** (không cần backend).
- **Bootstrap 5** cho giao diện.
- **Mermaid 10.9.5** để render ERD.
- **localStorage** để lưu project theo template.
- **Google Analytics 4** để theo dõi truy cập.

## 4) Cấu trúc thư mục

```text
.
├── index.html      # Giao diện chính
├── script.js       # Logic xử lý dữ liệu, SQL, ERD, import/export
├── style.css       # Tùy biến giao diện
└── README.md
```

## 5) Cách chạy dự án (local)

Vì đây là dự án frontend tĩnh, có thể chạy bằng một trong các cách:

### Cách 1: Mở trực tiếp
- Mở file `index.html` bằng trình duyệt.

### Cách 2 (khuyến nghị): Chạy local server
- Dùng VS Code extension như **Five Server** / **Live Server**.
- Hoặc dùng lệnh:

```bash
npx serve .
```

Sau đó truy cập URL local được in ra terminal.

## 6) Hướng dẫn sử dụng nhanh

1. Nhập tên database, chọn hệ quản trị và template.
2. Tùy chỉnh bảng ở cột trái: thêm bảng, sửa cột, sửa quan hệ.
3. Bấm **SINH SQL & ERD** để tạo script + sơ đồ.
4. Dùng **Copy SQL** hoặc **Tải file** để xuất script.
5. Dùng **Xuất Full Project** để lưu trạng thái làm việc.
6. Khi cần, **Nhập Script SQL** để khôi phục từ file `.sql`.

## 7) Deploy GitHub Pages

1. Push code lên GitHub repo.
2. Vào **Settings → Pages**.
3. Chọn:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (hoặc `master`), thư mục `/root`
4. Lưu cấu hình và đợi build.
5. Truy cập URL Pages được cấp.

> Nếu vừa cập nhật JS/CSS mà web chưa đổi, hãy `Ctrl + F5` để xóa cache trình duyệt.

## 8) Google Analytics (GA4)

Trong `index.html`, nhúng GA4 Measurement ID:

- Script `gtag.js` trong `<head>`.
- `gtag('config', 'G-XXXXXXXXXX')` để bật tracking.

Dropdown trường sẽ gửi event:

- Event name: `school_select`
- Params: `school_name`

Dữ liệu xem trong GA4:
- **Realtime**: kiểm tra event ngay khi chọn.
- **Reports**: tổng hợp theo thời gian.
- **Explore**: lọc theo `school_name` để xem phân bố người dùng theo trường.

## 9) Hạn chế hiện tại

- Chưa có backend, mọi dữ liệu lưu trên trình duyệt người dùng.
- Mermaid ERD nhạy với một số ký tự Unicode trong nhãn quan hệ.
- Parser SQL tập trung vào các cú pháp `CREATE TABLE` phổ biến.

## 10) Định hướng phát triển

- Thêm xác thực schema nâng cao (constraint/index/check).
- Cải thiện parser SQL cho nhiều dialect hơn.
- Hỗ trợ import/export theo nhiều định dạng hơn.
- Bổ sung dashboard thống kê sử dụng theo trường trực tiếp trong UI.

## 11) Tác giả

- **Thực (HUTECH IT)**
- GitHub: https://github.com/dauxuanthuc
- Facebook: https://web.facebook.com/Dauxuanthuc12
- Email: thangthuc31@gmail.com

---

Nếu bạn là sinh viên đang làm đồ án CSDL, dự án này giúp bạn lên schema nhanh hơn, giảm sai sót cú pháp SQL và tăng tốc phần triển khai demo.