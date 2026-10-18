# Portfolio · Nguyễn Minh Trí

Trang giới thiệu cá nhân dựng như một trang sản phẩm trên sàn TMĐT. Chỉ dùng HTML và CSS, không cần cài đặt gì.

## Cấu trúc

```
index.html               Nội dung trang
style.css                Giao diện (màu, font, bố cục) và hiệu ứng
script.js                Hiệu ứng khi cuộn, chạy số doanh thu, phóng to ảnh
assets/nguyen-minh-tri.webp   Ảnh chân dung
assets/qr-lien-he.svg         Mã QR lưu số điện thoại và email vào danh bạ
```

## Xem thử trên máy

Mở `index.html` bằng Chrome hoặc Edge.

## Đưa lên GitHub Pages

1. Tạo repository tên đúng `ten-tai-khoan.github.io`, chọn **Public**.
2. **Add file → Upload files**, kéo toàn bộ file và thư mục `assets` vào, bấm **Commit changes**.
3. **Settings → Pages**, Source chọn **Deploy from a branch**, nhánh **main**, bấm **Save**.
4. Vài phút sau trang chạy ở `https://ten-tai-khoan.github.io`.

## Sửa nhanh

- **Bớt hiệu ứng:** trong `style.css`, mục "HIỆU ỨNG" chia thành từng khối có đánh số, xoá khối nào thì tắt hiệu ứng đó.
- **Đổi màu:** sửa các biến trong `:root` ở đầu `style.css` (ví dụ `--sale` là màu đỏ của con số và nút chính).
- **Đổi ảnh:** thay file `assets/nguyen-minh-tri.webp`, giữ nguyên tên.
- **Sửa nội dung:** mở `index.html`, mỗi khu vực có dòng ghi chú `<!-- ... -->` đánh dấu.
- **Đổi số điện thoại hoặc email:** sửa trong `index.html` và tạo lại mã QR cho khớp.
