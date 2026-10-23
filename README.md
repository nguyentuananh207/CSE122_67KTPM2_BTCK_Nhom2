# CraftLink – Sàn sản phẩm sáng tạo & Đồ thủ công tùy biến (BTL-11)

Dự án đồ án website bán hàng đồ thủ công với đầy đủ các vai trò: **Khách hàng (Buyer)**, **Người sáng tạo (Maker)**, **Quản trị viên điều hành (Admin)** và **Kiểm duyệt viên (Moderator)**.

---

## 🌟 Tính năng nổi bật

1. **Giỏ hàng & Quét mã QR Thanh toán trước (VietQR):**
   - **Giỏ hàng thuận tiện (`page/buyer/cart.html`):** Icon giỏ hàng hiển thị trên Header toàn trang kèm số lượng badge realtime; cho phép tăng/giảm số lượng, xem ghi chú tùy biến và tổng tiền tự động.
   - **Thanh toán trước & Quét mã QR (`page/buyer/checkout.html`):**
     + Tạo mã VietQR chuẩn ngân hàng tự động điền số tiền và cú pháp `CRAFTLINK [MÃ ĐƠN HÀNG]`.
     + Đa dạng hình thức: Thanh toán trước 100% (miễn phí ship), Đặt cọc trước 50% tiền phôi vật liệu, hoặc COD.
     + Tiện ích sao chép nhanh Số tài khoản, Số tiền và Cú pháp chuyển khoản.
     + Đơn hàng thanh toán xong được chuyển ngay sang trạng thái "Đang chế tác" và hiển thị tức thì trên **Admin Dashboard**.

2. **Hạn chế Khách vãng lai & Phân quyền bảo mật:**
   - Khách chưa đăng nhập chỉ được xem danh sách sản phẩm và chi tiết sản phẩm.
   - Khi bấm vào các tính năng như *Tạo yêu cầu tùy biến*, *Lưu yêu thích*, *Đặt làm riêng* hoặc cố tình truy cập các đường dẫn nội bộ, hệ thống sẽ tự động hiển thị thông báo và điều hướng về trang Đăng nhập (`page/auth/login.html?redirect=...`).

3. **Hệ thống Đăng nhập / Đăng ký / Đổi mật khẩu đa năng (`page/auth/login.html`):**
   - Đăng nhập với Username/Email + Mật khẩu.
   - Hỗ trợ lựa chọn đối tượng đăng nhập (Buyer / Maker / Admin).
   - Đăng ký thêm tài khoản mới và Đổi/Quên mật khẩu lưu trữ trực tiếp vào `LocalStorage`.
   - **Cung cấp sẵn 2 tài khoản Quản trị viên (Admin) riêng biệt** cùng các tài khoản mẫu với nút bấm 1-click tiện lợi.

4. **Trang Quản trị viên điều hành (Admin Dashboard):**
   - Nắm bắt **TOÀN BỘ** dữ liệu mà các đối tượng khác đưa vào:
     + Thống kê số lượng Người dùng, Nghệ nhân, Khách hàng.
     + Tổng hợp tất cả Listing đang bán và chờ duyệt.
     + Tổng hợp tất cả Brief yêu cầu tùy biến từ Buyer.
     + Tổng hợp Đơn hàng và Doanh thu phát sinh từ các thanh toán trước qua QR.
     + Hàng chờ kiểm duyệt sản phẩm và Trung tâm khiếu nại báo cáo.
     + Bảng nhật ký hoạt động realtime tự động đồng bộ từ `LocalStorage`.

5. **Trọn bộ 3 tính năng AI độc lập:**
   - 🤖 **AI Brief Builder (Khách hàng):** Tự động chuẩn hóa ý tưởng, đề xuất thông số kỹ thuật, vật liệu và mức ngân sách tối ưu.
   - 🤖 **AI Style Matcher (Nghệ nhân):** Đánh giá độ tương thích phong cách chế tác của Xưởng với Brief của khách hàng.
   - 🤖 **AI Revision Summarizer (Quản trị viên / Kiểm duyệt):** So khớp và tóm tắt những thay đổi trong Quy chuẩn nội dung.

---

## 🔑 Danh sách tài khoản thử nghiệm

| Vai trò | Username | Mật khẩu | Họ tên đại diện | Quyền hạn chính |
|---|---|---|---|---|
| 👑 **Admin 1** | `admin1` | `admin123` | **Nguyễn Tuấn Anh** | Tổng quản trị hệ thống, KPI realtime, quản lý user, danh mục & theo dõi doanh thu thanh toán QR |
| ⚙️ **Admin 2** | `admin2` | `admin123` | **Trần Quang Huy** | Quản trị viên điều hành nội dung, kiểm duyệt sản phẩm & trung tâm báo cáo |
| 🎨 **Maker 1** | `maker1` | `maker123` | Xưởng Gốm Bát Tràng | Quản lý listing, nhận Brief tùy biến, nhận đơn hàng thanh toán trước, soạn Proposal |
| 🎨 **Maker 2** | `maker2` | `maker123` | Leather Art Studio | Quản lý đồ da, duyệt brief từ khách |
| 🛒 **Buyer 1** | `buyer1` | `buyer123` | Lê Phương Thảo | Duyệt Marketplace, giỏ hàng, quét VietQR thanh toán trước, gửi Brief tùy biến |
| 🛒 **Buyer 2** | `buyer2` | `buyer123` | Hoàng Đức Anh | Đặt làm đồ da, theo dõi báo giá |
| 🛡️ **Moderator** | `mod1` | `mod123` | Phạm Minh Hoàng | Hàng chờ kiểm duyệt sản phẩm, xử lý báo cáo, quy chuẩn nội dung |

---

## 📁 Cấu trúc thư mục

```text
craftlink/
├── assets/
│   ├── icon/ (card-list.png, iconbacham.png, iconbook.png, iconclother.png, iconlaptop.png, icontulanh.png, iconxedap.png)
│   └── images/ (banner1.png -> Banner8.png, logoCraftlink.png)
├── css/
│   ├── base/ (reset.css, typography.css, variables.css)
│   ├── components/ (ai-modal.css, badges.css, buttons.css, cards.css, forms.css, tables.css)
│   ├── layout/ (footer.css, header.css, sidebar.css)
│   ├── pages/ (brief-custom.css, dashboard.css, marketplace.css, style.css)
│   └── style.css
├── js/
│   ├── modules/ (ai-services.js, storage.js, ui-utils.js, validation.js)
│   ├── pages/ (admin.js, buyer.js, maker.js)
│   ├── main.js
│   └── mock-data.js
├── page/
│   ├── admin/
│   │   ├── admin-category-management.html
│   │   ├── admin-platform-dashboard.html
│   │   └── admin-user-management.html
│   ├── auth/
│   │   └── login.html
│   ├── buyer/
│   │   ├── cart.html (Giỏ hàng thuận tiện)
│   │   ├── checkout.html (Quét mã VietQR thanh toán trước)
│   │   ├── buyer-custom-brief.html
│   │   ├── buyer-marketplace.html
│   │   ├── buyer-orders.html
│   │   └── product-detail.html
│   ├── maker/
│   │   ├── maker-brief-inbox.html
│   │   ├── maker-listing-management.html
│   │   └── maker-proposal-editor.html
│   ├── moderator/
│   │   ├── moderator-content-guidelines.html
│   │   ├── moderator-moderation-queue.html
│   │   └── moderator-report-center.html
│   └── index.html
├── index.html (Root redirect)
└── README.md
```

---

## 🚀 Hướng dẫn khởi chạy

1. Mở thư mục dự án bằng **VS Code**.
2. Chuột phải vào `index.html` (ở thư mục gốc) hoặc `page/index.html` và chọn **Open with Live Server**.
3. Thử nghiệm:
   - Thêm sản phẩm vào giỏ hàng 🛒 -> Bấm **Quét QR Thanh toán trước** -> Xem mã VietQR tự động sinh theo số tiền và tài khoản MBBank.
   - Bấm **"Tôi đã quét mã và chuyển khoản xong"** -> Đơn hàng tự động lưu vào hệ thống.
   - Đăng nhập với tài khoản **Admin 1 (`admin1` / `admin123`)** để xem doanh thu và đơn hàng vừa thanh toán hiển thị theo thời gian thực!
