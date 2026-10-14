# Cleanova Login Demo

Giao diện đăng nhập Cleanova được xây dựng bằng HTML, CSS và JavaScript thuần. Cleanova là ý tưởng ứng dụng đặt lịch và quản lý dịch vụ vệ sinh nhà cửa. Đây là demo front-end để học tập, không phải hệ thống xác thực an toàn và không kết nối backend.

## Chạy bằng VS Code và Live Server

1. Mở thư mục `cleannova` bằng VS Code.
2. Cài extension **Live Server** nếu máy chưa có.
3. Mở `index.html`, nhấn chuột phải và chọn **Open with Live Server** (hoặc chọn **Go Live** ở thanh trạng thái).
4. Trình duyệt sẽ mở trang demo. Không cần cài Node.js, framework hay thư viện.

Bạn cũng có thể mở trực tiếp `index.html` bằng trình duyệt.

## Tài khoản demo

- Email: `demo@nova.app`
- Mật khẩu: `NovaDemo2026!`

Nhập đúng cả hai giá trị này để mở Dashboard demo. Thông tin khác sẽ hiển thị lỗi đăng nhập.

## Ngôn ngữ

Giao diện mặc định bằng Tiếng Việt. Dùng nút **VI / EN** ở góc trên của form để chuyển ngay giữa Tiếng Việt và English. Nội dung, nhãn hỗ trợ tiếp cận, lỗi nhập liệu, trạng thái đang đăng nhập và Dashboard đều được dịch.

## Phạm vi và quyền riêng tư

- Tài khoản demo được so sánh trong JavaScript chạy trên trình duyệt. Đây **không** phải hệ thống đăng nhập thật; không dùng để bảo vệ tài khoản hay dữ liệu.
- Không có backend, không có kết nối Google và không có chức năng tạo tài khoản/khôi phục mật khẩu. Các thao tác này chỉ hiển thị thông báo minh họa.
- Checkbox **Remember me** chỉ là giao diện; không lưu email, mật khẩu hay thông tin đăng nhập vào `localStorage` hoặc `sessionStorage`.
- Mật khẩu không được lưu sau khi đóng trang. Nút đăng xuất xóa các giá trị trong form demo.
- Tài khoản demo vẫn được giữ nguyên từ phiên bản Nova trước để không làm thay đổi thông tin đăng nhập hiện có.

## Cấu trúc

```text
cleannova/
├── index.html
├── style.css
├── script.js
└── README.md
```
