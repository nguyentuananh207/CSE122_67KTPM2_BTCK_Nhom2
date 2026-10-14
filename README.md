# Craftlink
# CraftLink - Phân tích vai trò và bảng kiểm kê màn hình

## Mô hình nghiệp vụ

CraftLink giải quyết khoảng cách giữa ý tưởng tùy biến của khách hàng và khả năng thực thi của người sáng tạo. Luồng chính là:

`Khám phá -> tạo brief -> AI làm rõ -> maker nhận brief -> gửi proposal -> khách phản hồi -> sản xuất -> kiểm duyệt -> hoàn tất`

## Tổng quan số lượng trang

Dự án có **15 tệp HTML**: `index.html` ở thư mục gốc và 14 trang trong `pages/`. Bảng dưới đây phân nhóm toàn bộ trang theo role/chức năng chính. Một số trang như Marketplace và chi tiết sản phẩm được dùng chung giữa khách vãng lai, khách hàng và người sáng tạo.

Giao diện demo: https://www.figma.com/proto/cyNk9LOIg2sY7YexthVUEv/Untitled?node-id=0-1&t=mKQnhsYaIYtVsDoP-1

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

## Phân công cho nhóm 3 thành viên

- **Leader (SV1):** Toàn bộ luồng vận hành Quản trị / Kiểm duyệt (5 tệp: `admin-platform-dashboard.html`, `admin-category-management.html`, `admin-user-management.html`, `moderator-moderation-queue.html`, `moderator-content-guidelines.html`), khung hệ thống `main.js`/`ui-utils.js`, điều phối Git Merge và tích hợp trọn gói **AI Revision Summarizer**.
- **Thành viên 2 (SV2):** Toàn bộ luồng Khách hàng và Trang chủ (5 tệp: `index.html`, `product-detail.html`, `buyer-marketplace.html`, `buyer-custom-brief.html`, `buyer-orders.html`), hệ thống CSS Design System, Form Validation (`validation.js`) và tích hợp trọn gói **AI Brief Builder**.
- **Thành viên 3 (SV3):** Toàn bộ luồng Người sáng tạo, Đăng nhập và Báo cáo (5 tệp: `login.html`, `maker-listing-management.html`, `maker-brief-inbox.html`, `maker-proposal-editor.html`, `moderator-report-center.html`), cấu trúc `ai-modal.css`, quản lý dữ liệu luồng Maker và tích hợp trọn gói **AI Style Matcher**.
- Mỗi sinh viên cần ghi rõ tên nhánh cá nhân, lịch sử commit, yêu cầu hợp nhất (PR) do Leader duyệt, và quay đủ số lượng video OBS tương ứng cho 5 màn hình phần mình phụ trách trong bảng quản lý nhóm.
- Phân chia công việc: https://trello.com/b/5sQKE51c/b%E1%BA%A3ng-trello-c%E1%BB%A7a-toi
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
- Truy cập trực tiếp sai role sẽ được điều hướng về Marketplace hoặc trang đăng nhập.

Session demo được lưu trong `localStorage` với key `craftlinkSession`; nút `Đăng xuất` sẽ xóa session này. Đây là phân quyền mô phỏng phía frontend, chưa thay thế xác thực và authorization ở backend thật.

## Cấu trúc thư mục mô-đun

```text
project-root/
├── README.md
├── index.html
├── pages/
│   ├── admin/
│   │   ├── admin-platform-dashboard.html
│   │   ├── admin-category-management.html
│   │   └── admin-user-management.html
│   ├── moderator/
│   │   ├── moderator-moderation-queue.html
│   │   ├── moderator-report-center.html
│   │   └── moderator-content-guidelines.html
│   ├── buyer/
│   │   ├── product-detail.html
│   │   ├── buyer-marketplace.html
│   │   ├── buyer-custom-brief.html
│   │   └── buyer-orders.html
│   ├── maker/
│   │   ├── maker-listing-management.html
│   │   ├── maker-brief-inbox.html
│   │   └── maker-proposal-editor.html
│   └── auth/
│       └── login.html
├── css/
│   ├── style.css
│   ├── base/ (variables.css, reset.css, typography.css)
│   ├── components/ (buttons.css, cards.css, forms.css, tables.css, badges.css, ai-modal.css)
│   ├── layout/ (header.css, sidebar.css, footer.css)
│   └── pages/ (marketplace.css, brief-custom.css, dashboard.css)
└── js/
    ├── main.js
    ├── mock-data.js
    ├── modules/ (storage.js, ui-utils.js, validation.js, ai-services.js)
    └── pages/ (admin.js, buyer.js, maker.js)
