# CraftLink – Sàn sản phẩm sáng tạo & Đồ thủ công tùy biến (BTL-11)

Dự án đồ án website bán hàng đồ thủ công với đầy đủ các vai trò: **Khách hàng (Buyer)**, **Người sáng tạo (Maker)**, **Quản trị viên điều hành (Admin)** và **Kiểm duyệt viên (Moderator)**.

---
Bảng phân chia công việc: https://trello.com/b/5sQKE51c/b%E1%BA%A3ng-trello-c%E1%BB%A7a-toi

## Bảng phân chia giao diện

| Role | Màn hình | Tệp | Nghiệp vụ / trạng thái chính | AI |
|---|---|---|---|---|
| Khách vãng lai / dùng chung | Marketplace công khai | `index.html` | Duyệt, tìm kiếm listing và bắt đầu khám phá sản phẩm | Không bắt buộc |
| Khách vãng lai / dùng chung | Chi tiết sản phẩm | `pages/buyer/product-detail.html` | Xem thông tin chi tiết listing | Không bắt buộc |
| Dùng chung | Đăng nhập & Chọn Role | `pages/auth/login.html` | Đăng nhập và chọn role demo để mở các tác vụ được phân quyền | Không bắt buộc |
| Khách hàng (Buyer) | Marketplace | `pages/buyer/buyer-marketplace.html` | Duyệt listing, tìm kiếm và bắt đầu brief | Không bắt buộc |
| Khách hàng (Buyer) | Yêu cầu tùy chỉnh | `pages/buyer/buyer-custom-brief.html` | Tạo, sửa, lưu nháp brief; validation | **AI Brief Builder** |
| Khách hàng (Buyer) | Đơn hàng | `pages/buyer/buyer-orders.html` | Đọc và theo dõi proposal/đơn | Không bắt buộc |
| Người sáng tạo (Maker) | Quản lý listing | `pages/maker/maker-listing-management.html` | Đọc, tìm kiếm và lưu trữ listing | Không bắt buộc |
| Người sáng tạo (Maker) | Hộp thư brief | `pages/maker/maker-brief-inbox.html` | Nhận, chọn và mở brief | **AI Style Matcher** |
| Người sáng tạo (Maker) | Soạn proposal | `pages/maker/maker-proposal-editor.html` | Tạo, sửa và lưu proposal | Không bắt buộc |
| Vận hành & quản trị | Hàng chờ kiểm duyệt | `pages/moderator/moderator-moderation-queue.html` | Duyệt, từ chối và xử lý listing chờ | Không bắt buộc |
| Vận hành & quản trị | Trung tâm báo cáo | `pages/moderator/moderator-report-center.html` | Tạo, phân loại và cập nhật report | Không bắt buộc |
| Vận hành & quản trị | Quy chuẩn nội dung | `pages/moderator/moderator-content-guidelines.html` | Tạo, sửa và lưu quy tắc nội dung | **AI Revision Summarizer** |
| Vận hành & quản trị | Quản lý danh mục | `pages/admin/admin-category-management.html` | Tạo, sửa và lưu trữ taxonomy | Không bắt buộc |
| Vận hành & quản trị | Quản lý người dùng | `pages/admin/admin-user-management.html` | Đọc, tìm kiếm và cập nhật trạng thái user | Không bắt buộc |
| Vận hành & quản trị | Bảng điều khiển nền tảng | `pages/admin/admin-platform-dashboard.html` | Theo dõi chỉ số và tín hiệu vận hành | Không bắt buộc |

## Phạm vi hiện thực

- **Kiến trúc CSS mô-đun:** Sử dụng thư mục `css/` gồm `css/base/` (variables, reset, typography), `css/components/` (buttons, cards, forms, tables, badges, ai-modal), `css/layout/` (header, sidebar, footer) và `css/pages/` (marketplace, brief-custom, dashboard) kết nối qua `css/style.css` để chứa token màu, layout dùng chung và responsive mobile.
- **Dữ liệu phân tách (`mock-data.js` & `storage.js`):** `js/mock-data.js` chứa nguồn dữ liệu JSON mẫu được chia nhỏ theo luồng nghiệp vụ của từng thành viên, kết hợp với module `js/modules/storage.js` để xử lý thao tác LocalStorage (CRUD) giữ trạng thái trên trình duyệt.
- **Lập trình JavaScript mô-đun (`js/`):** 
  - `js/main.js`: Khởi chạy ứng dụng và điều phối bộ chọn Role demo.
  - `js/modules/ui-utils.js`: Tiện ích chung (Toast thông báo, quản lý Modal).
  - `js/modules/validation.js`: Kiểm tra tính hợp lệ của biểu mẫu (Form validation).
  - `js/modules/ai-services.js`: Chứa mã nguồn của 3 tính năng AI độc lập.
  - Các tệp điều phối riêng theo trang (`js/pages/admin.js`, `js/pages/buyer.js`, `js/pages/maker.js`).
- **Trải nghiệm AI trọn gói:** Mỗi tính năng AI tương ứng (`AI Revision Summarizer`, `AI Brief Builder`, `AI Style Matcher`) đều được thiết kế theo luồng chuẩn: `nhập -> đang xử lý -> kết quả -> chấp nhận/bỏ qua`, kèm theo phần giải thích lý do và độ tin cậy mô phỏng.

## Trạng thái đã bao phủ

| Chức năng | Bình thường | Đang xử lý | Rỗng | Thành công | Lỗi / từ chối |
|---|---:|---:|---:|---:|---:|
| AI | Có | Có | Có | Có | Có thao tác bỏ qua |
| Form brief/proposal | Có | Không áp dụng | Có validation | Có toast | Validation bắt buộc |
| Danh sách / bảng | Có | Không áp dụng | Có placeholder | Có | Có lọc rỗng qua search |
| Moderation / report | Có | Không áp dụng | Có thể mở rộng | Có toast hành động | Badge trạng thái |

## Phân công gợi ý cho nhóm 3

- **Leader (SV1):** Toàn bộ luồng vận hành Quản trị / Kiểm duyệt (5 tệp: `admin-platform-dashboard.html`, `admin-category-management.html`, `admin-user-management.html`, `moderator-moderation-queue.html`, `moderator-content-guidelines.html`), khung hệ thống `main.js`/`ui-utils.js`, điều phối Git Merge và tích hợp trọn gói **AI Revision Summarizer**.
- **Thành viên 2 (SV2):** Toàn bộ luồng Khách hàng và Trang chủ (5 tệp: `index.html`, `product-detail.html`, `buyer-marketplace.html`, `buyer-custom-brief.html`, `buyer-orders.html`), hệ thống CSS Design System, Form Validation (`validation.js`) và tích hợp trọn gói **AI Brief Builder**.
- **Thành viên 3 (SV3):** Toàn bộ luồng Người sáng tạo, Đăng nhập và Báo cáo (5 tệp: `login.html`, `maker-listing-management.html`, `maker-brief-inbox.html`, `maker-proposal-editor.html`, `moderator-report-center.html`), cấu trúc `ai-modal.css`, quản lý dữ liệu luồng Maker và tích hợp trọn gói **AI Style Matcher**.
- Mỗi sinh viên cần ghi rõ tên nhánh cá nhân, lịch sử commit, yêu cầu hợp nhất (PR) do Leader duyệt, và quay đủ số lượng video OBS tương ứng cho 5 màn hình phần mình phụ trách trong bảng quản lý nhóm.
# CraftLink

Frontend prototype cho đề tài BTL-11 - CraftLink, sàn sản phẩm sáng tạo tùy biến.

## Chạy thử

Mở `index.html` bằng trình duyệt hoặc dùng Live Server trong VS Code. Đây là Marketplace công khai của ứng dụng.

## Luồng truy cập và phân quyền frontend

- `index.html`: Marketplace công khai cho khách vãng lai.
- `pages/auth/login.html`: màn hình đăng nhập và chọn role demo để mở khóa tác vụ.
- Chưa đăng nhập: xem listing, Marketplace và các khu vực chung; tác vụ tạo brief, đơn hàng và quản lý listing sẽ chuyển tới trang đăng nhập.
- Đăng nhập vai trò **Khách hàng** hoặc **Người sáng tạo**: dùng chung khung giao diện hệ thống, nhưng menu tác vụ được mở theo đúng quyền hạn.
- Đăng nhập role **Vận hành & quản trị**: dùng chung khu vực cho moderation và admin.
- Truy cập trực tiếp sai role sẽ được điều hướng về Marketplace hoặc trang đăng nhập
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
