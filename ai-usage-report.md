# Bản khai báo sử dụng công cụ AI (AI Usage Report)

**Dự án:** CraftLink – Sàn sản phẩm sáng tạo & Đồ thủ công tùy biến (BTL-11)
**Môn học:** CSE122 – phát triển web cơ bản
**Sinh viên thực hiện:**Nhóm 2:
- Nguyễn Tuấn Anh – MSSV: 2551170853 – Lớp: 67KTPM2;
- Trần Đức Anh - MSSV: 2551170858 - Lớp: 67KTPM2;
- Nguyễn Việt	Anh - MSSV: 2551170855 - Lớp: 67KTPM2;


**Công cụ AI đã dùng:** Qoder, Antigravity, Claude code (AI coding assistant, chế độ Agent) 
**Thời gian thực hiện:** khoảng 15/10/2026 – 26/10/2026
**Phạm vi:** Toàn bộ phần frontend: 17 màn hình, 3 tính năng AI mô phỏng, design board 20 ảnh, README và video demo.
**Mức độ sử dụng AI (tự đánh giá):** khoảng **20–30%** khối lượng công việc.


## 1. Cam kết và phạm vi khai báo

Tôi khai báo trung thực rằng trong quá trình làm đồ án, tôi **có sử dụng AI để hỏi – tham khảo – nhờ gợi ý**, nhưng **phần lớn code là do tôi tự viết, tự ghép và tự sửa**. AI đóng vai trò như một người hướng dẫn và một cuốn sách tham khảo nhanh.

- Tôi **không dùng AI để làm hộ phần thuyết trình, video demo hay dữ liệu cá nhân**.
- Tôi **không dùng AI để tạo nội dung sai lệch bản chất kỹ thuật**: 3 tính năng AI trong dự án là **mô phỏng**, không gọi mô hình AI thật; tôi ghi rõ điều này trong báo cáo để tránh hiểu nhầm.
- Tôi là người **quyết định nghiệp vụ, bố cục, nội dung tiếng Việt, dữ liệu sản phẩm, kiểm thử và sửa lỗi**.
- AI là công cụ hỗ trợ, **không thay thế việc tôi hiểu code**.

**Những gì AI hỗ trợ nhiều nhất (khoảng 20–30%):** giải thích khái niệm, gợi ý cấu trúc thư mục, đưa vài đoạn mẫu ngắn, gợi ý cách sửa lỗi, soạn bản nháp README.
**Những gì tôi làm chủ yếu (khoảng 70–80%):** viết HTML/CSS/JS, ghép các trang, biên tập toàn bộ nội dung tiếng Việt, chọn ảnh/dữ liệu, chạy thử, phát hiện lỗi và quyết định sửa hay bỏ tính năng.

---

## 2. Thang mức độ sử dụng AI

| Mức | Tên | Mô tả |
|---|---|---|
| 0 | Không dùng AI | Tôi tự làm hoàn toàn |
| 1 | AI gợi ý / giải thích | AI giải thích khái niệm, tôi tự viết code |
| 2 | AI sinh khung | AI sinh khung/mẫu, tôi viết lại phần lớn nội dung |
| 3 | AI sinh phần lớn | AI sinh phần lớn code, tôi đọc hiểu, sửa lỗi, chạy thử |
| 4 | AI sinh gần như toàn bộ | Tôi chủ yếu dán vào và chỉ sửa nhỏ |

Trong dự án này, phần lớn hạng mục ở **Mức 1–2**; chỉ một vài phần nhỏ (một số component CSS, nội dung gợi ý của 3 tính năng AI, bản nháp README) ở **Mức 2–3**.

---

## 3. Tổng hợp mức độ AI theo hạng mục

| # | Hạng mục | Tệp / khu vực | Mức AI | Ước lượng AI hỗ trợ | Tôi đã làm gì với phần đó |
|---|---|---|---|---|---|
| 1 | Ý tưởng, phạm vi, luồng nghiệp vụ | README (bảng phân chia) | 1 | ~10% | Tự chọn đề tài, tự chốt 4 vai trò, tự quyết định 3 tính năng AI |
| 2 | Cấu trúc thư mục | `assets/`, `css/`, `js/`, `page/` | 2 | ~25% | Tự đổi `pages/` → `page/`, tự sắp xếp lại file |
| 3 | CSS nền tảng (token, reset, typography) | `css/base/*` | 2 | ~25% | Tự viết CSS, tự đổi bảng màu, kiểm tra responsive |
| 4 | CSS component | `css/components/*` | 2–3 | ~30% | AI gợi ý mẫu; tôi tự chỉnh kích thước, màu, trạng thái hover/disabled |
| 5 | Layout dùng chung | `css/layout/*` | 2 | ~20% | Tự viết layout, sửa header trên mobile, kiểm tra menu theo role |
| 6 | HTML 17 màn hình | `page/**/*.html` | 2 | ~25% | Tự viết/sửa HTML, nội dung tiếng Việt, đường dẫn, bố cục, ảnh thật |
| 7 | Dữ liệu mẫu | `js/mock-data.js` | 1–2 | ~15% | Tự chọn sản phẩm, giá, mô tả, ảnh; tự sửa id cho khớp |
| 8 | LocalStorage CRUD | `js/modules/storage.js` | 2 | ~25% | Tự viết module theo gợi ý; thêm tiền tố `craftlink_`, kiểm tra lỗi JSON |
| 9 | Validation, toast, modal | `js/modules/validation.js`, `ui-utils.js` | 2 | ~25% | Tự viết, tự chỉnh vị trí lỗi, nội dung thông báo, thời gian toast |
| 10 | Điều hướng, session, phân quyền | `js/main.js` | 2 | ~25% | AI gợi ý hướng; tôi tự viết và sửa logic đường dẫn tương đối |
| 11 | Luồng Buyer | `js/pages/buyer.js` | 2 | ~25% | Tự viết luồng, thêm chặn khách vãng lai, empty state, sửa giỏ hàng/QR |
| 12 | Luồng Maker | `js/pages/maker.js` | 2 | ~20% | Tự viết, kiểm tra brief → proposal, sửa hiển thị điểm tương thích |
| 13 | Luồng Admin/Moderator | `js/pages/admin.js` | 2 | ~20% | Tự viết, kiểm tra số liệu realtime, sửa trạng thái duyệt/từ chối |
| 14 | 3 tính năng AI | `js/modules/ai-services.js`, `css/components/ai-modal.css` | 2–3 | ~30% | AI gợi ý mẫu; tôi tự triển khai, làm rõ đây là mô phỏng, thêm nút Bỏ qua/Áp dụng |
| 15 | README, design board | `README.md`, `design-board/` | 2–3 | ~30% | AI viết nháp README; tôi tự kiểm tra, sửa thông tin sai, tự chụp 20 ảnh |
| 16 | Kiểm thử, sửa lỗi | Toàn dự án | 1 | ~10% | Tự chạy từng màn hình, đọc Console, tự sửa lỗi và ghi lại |
| 17 | Video OBS, thuyết trình | — | 0 | 0% | Tự quay, tự nói |

**Tổng thể (tự đánh giá):** khoảng **20–30% khối lượng công việc có AI hỗ trợ** (gợi ý, giải thích, đoạn mẫu, soát lỗi); khoảng **70–80% tôi tự viết và tự hoàn thiện** (đường dẫn, dữ liệu, trạng thái rỗng, lỗi hiển thị, nội dung tiếng Việt, kiểm thử).

---

## 4. Nhật ký chi tiết: prompt – AI hỗ trợ – tôi tự kiểm chứng

### Giai đoạn 1 – Phân tích đề tài và chốt phạm vi

**Mục tiêu:** biết bắt đầu từ đâu, chia nhỏ đồ án thành các màn hình.

**Prompt đã dùng:**
```text
Tôi là sinh viên mới học HTML/CSS/JS, đang làm đồ án cuối kỳ về sàn bán đồ thủ công
có 4 vai trò: khách, người sáng tạo, quản trị viên, kiểm duyệt viên. Tôi không được
dùng framework, chỉ HTML/CSS/JS thuần. Hãy giúp tôi chia dự án thành các màn hình,
gợi ý cấu trúc thư mục và thứ tự làm. Giải thích bằng tiếng Việt, đừng viết code vội.
```

**AI đã hỗ trợ:** gợi ý danh sách màn hình theo vai trò, cây thư mục `assets/css/js/page`, gợi ý thứ tự làm từ layout → dữ liệu → từng luồng.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự chốt lại đề tài **CraftLink**, tự viết mô tả sản phẩm và 3 tính năng AI (Brief Builder, Style Matcher, Revision Summarizer).
- Cắt bớt màn hình AI gợi ý nhưng đề bài không yêu cầu (ví dụ trang blog, wishlist riêng).
- Tự đổi thư mục `pages/` → `page/` cho khớp cách tôi đặt tên; **AI vẫn dùng `pages/` trong bản nháp README**, tôi phát hiện khi bấm link bị 404.
- Tự lập bảng phân chia 17 màn hình + 3 trạng thái AI = 20 ảnh design board.

**Bằng chứng:** `README.md` (bảng phân chia), cây thư mục thật trong `page/`.

---

### Giai đoạn 2 – Hệ thống CSS (design system)

**Mục tiêu:** CSS gọn, dễ sửa, không dồn hết vào một file.

**Prompt đã dùng:**
```text
Giải thích cho tôi cách chia CSS thành nhiều file nhỏ cho dễ bảo trì. Cho tôi ví dụ
variables.css chứa màu/khoảng cách, reset.css, typography.css, rồi components và
layout. Chỉ tôi cách @import trong style.css và thứ tự import đúng.
```

**AI đã hỗ trợ:** giải thích mô hình `base/components/layout/pages`, ví dụ ngắn về token màu/font/spacing.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết CSS cho các file base và component, tự đặt tên biến cho dễ nhớ (`--clr-primary`, `--clr-text`…).
- Thử import sai thứ tự → component bị ghi đè; tự sửa lại thứ tự **base → components → layout → pages** trong `css/style.css`.
- Tự kiểm tra ở 375px / 768px / 1440px, sửa các chỗ chữ bị tràn và nút bị chồng.
- Tự tách `css/components/ai-modal.css` vì modal AI dùng lại ở 3 màn hình.

**Bằng chứng:** `css/style.css` (danh sách `@import`), `css/base/variables.css`.

---

### Giai đoạn 3 – Header, sidebar, footer dùng chung

**Mục tiêu:** một khung giao diện dùng cho nhiều vai trò, menu thay đổi theo role.

**Prompt đã dùng:**
```text
Viết giúp tôi header có logo, ô tìm kiếm, icon giỏ hàng kèm badge số lượng và menu
theo vai trò. Trang nào cũng dùng được. Giải thích từng phần CSS, nhất là cách làm
header dính trên cùng và menu trên mobile.
```

**AI đã hỗ trợ:** gợi ý bố cục header, cách dùng `position: sticky`, vài đoạn CSS mẫu.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết HTML/CSS cho header, sidebar, footer và áp dụng cho các trang.
- Kiểm tra badge giỏ hàng có cập nhật khi thêm/xóa sản phẩm (nối với `updateHeaderCartBadge` trong `js/main.js`).
- Sửa menu bị hiện sai mục khi đang ở trang con (so khớp theo đường dẫn hiện tại).
- Tự viết lại logo/nội dung footer, thêm thông tin liên hệ mẫu.
- Phát hiện header bị che nội dung trên mobile, tự thêm khoảng đệm đầu trang.

**Bằng chứng:** mở 3 trang ở 3 độ sâu khác nhau, kiểm tra menu và badge.

---

### Giai đoạn 4 – Dữ liệu mẫu và LocalStorage

**Mục tiêu:** có dữ liệu để demo, không cần backend.

**Prompt đã dùng:**
```text
Tôi muốn lưu dữ liệu demo bằng localStorage để không cần backend. Viết giúp tôi một
module storage có get/set/remove và các hàm CRUD cho mảng (thêm, sửa, xóa, lấy danh sách).
Giải thích tại sao nên dùng tiền tố cho key và cách tránh lỗi JSON hỏng.
```

**AI đã hỗ trợ:** giải thích cơ chế localStorage, gợi ý cấu trúc module và vài dòng mẫu try/catch.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết `js/modules/storage.js` với `StorageService`, tự thêm tiền tố `craftlink_` và xử lý JSON hỏng.
- Tự viết `js/mock-data.js`: users, categories, listings, briefs, orders, moderation queue, reports, guidelines.
- Tự chọn và biên tập **sản phẩm, giá, mô tả, ảnh** (gốm Bát Tràng, đồ da, bạc 925, gỗ óc chó, lụa, nến thơm).
- Tự đặt 7 tài khoản demo (`admin1`, `admin2`, `maker1`, `maker2`, `buyer1`, `buyer2`, `mod1`) và mật khẩu demo.
- Phát hiện: sau khi thay ảnh sản phẩm, trình duyệt vẫn hiện **ảnh cũ** vì localStorage giữ dữ liệu cũ → tự thêm bước đồng bộ thumbnail từ `mock-data.js` mỗi lần khởi tạo (`initDatabase`).
- Tự xóa localStorage nhiều lần để kiểm tra dữ liệu có seed lại đúng không.

**Bằng chứng:** `js/modules/storage.js`, `js/mock-data.js`, `initDatabase()` trong `js/main.js`.

---

### Giai đoạn 5 – Điều hướng, session, phân quyền và lỗi đường dẫn

**Mục tiêu:** mở trang ở bất kỳ độ sâu nào cũng không lỗi ảnh/link; chưa đăng nhập thì bị chặn đúng chỗ.

**Prompt đã dùng:**
```text
Trang của tôi nằm trong page/buyer/, ảnh nằm ở assets/images/. Khi mở bằng Live Server
thì ảnh và link sang trang khác bị 404. Giải thích vì sao và hướng dẫn tôi cách tính
đường dẫn tương đối dùng được cho cả trang ở gốc, ở page/ và ở page/buyer/.
```

**AI đã hỗ trợ:** giải thích nguyên nhân 404 và gợi ý hướng dùng đường dẫn tương đối theo độ sâu thư mục.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết `getRelativePath()`, `getAssetPath()`, `getLoginUrl()`, `getHomeUrl()`, `getRoleHomeUrl()` trong `js/main.js`.
- Mở thử 3 độ sâu: `index.html`, `page/index.html`, `page/buyer/buyer-marketplace.html` → phát hiện trang gốc bị cộng `../` sai, tự sửa điều kiện nhận diện thư mục con.
- `getAssetPath` xử lý thêm link tuyệt đối (`http`, `/`, `#`) và bỏ `../`/`./` thừa.
- Tự thêm `guardGuestAction()`: khách vãng lai bấm "Tạo brief"/"Đặt làm riêng" thì hiện toast cảnh báo rồi chuyển sang `login.html?redirect=...`.
- Tự thử đăng nhập từng role và truy cập sai role để xem có bị đá về đúng chỗ không.
- Ghi chú: `getAssetPath` hiện hơi rối (ghép `../assets` rồi gọi lại `getRelativePath`), nếu có thời gian tôi sẽ tách rõ hơn.

**Bằng chứng:** `js/main.js`, `guardGuestAction()` trong `js/pages/buyer.js`.

---

### Giai đoạn 6 – Luồng Khách hàng (Buyer)

**Mục tiêu:** duyệt sản phẩm, lọc/tìm kiếm, xem chi tiết, tạo brief tùy biến có validation.

**Prompt đã dùng:**
```text
Viết giúp tôi trang marketplace có lọc theo danh mục, tìm kiếm theo tên/mô tả/tag và
trạng thái khi không tìm thấy sản phẩm. Trang tạo yêu cầu tùy biến có kiểm tra bắt buộc
tên, ngân sách, mô tả. Giải thích cách giữ trạng thái lọc khi render lại.
```

**AI đã hỗ trợ:** gợi ý cách lọc/tìm kiếm và cách giữ biến trạng thái khi render lại.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết phần lớn `js/pages/buyer.js` và HTML các trang buyer.
- Tự viết lại câu chữ empty state và toast cho tự nhiên.
- Thử tìm từ khóa không tồn tại → tự thêm khối "Không tìm thấy sản phẩm phù hợp" thay vì để trống.
- Sửa lỗi mất trạng thái danh mục sau khi tìm kiếm (giữ biến `activeCat`).
- Thử submit form rỗng, ngân sách âm, mô tả quá ngắn; tự chỉnh thông báo lỗi hiển thị dưới đúng ô.
- Kiểm tra ảnh sản phẩm hiển thị đúng sau khi đổi sang ảnh thật trong `assets/images`.

**Bằng chứng:** `js/pages/buyer.js`, `page/buyer/buyer-marketplace.html`, `page/buyer/buyer-custom-brief.html`.

---

### Giai đoạn 7 – Giỏ hàng và thanh toán trước (VietQR)

**Mục tiêu:** thêm vào giỏ, tăng/giảm số lượng, chọn hình thức thanh toán, tạo đơn.

**Prompt đã dùng:**
```text
Tôi cần làm giỏ hàng lưu bằng localStorage: thêm, tăng giảm số lượng, xóa, tính tổng.
Trang thanh toán có 3 hình thức: trước 100%, cọc 50%, COD. Với VietQR, tôi muốn hiện
số tài khoản, số tiền và nội dung chuyển khoản dạng CRAFTLINK [mã đơn]. Giải thích
cách tạo mã đơn và cách tính tiền cọc.
```

**AI đã hỗ trợ:** gợi ý cách tính tổng/tiền cọc, cách sinh mã đơn và cách hiển thị nội dung chuyển khoản.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết luồng cart và checkout trong `js/pages/buyer.js`, tự dựng HTML hai trang.
- **AI gợi ý gọi API sinh QR động, nhưng tôi không có tài khoản/API ngân hàng và không muốn đưa thông tin thật lên mạng** → tôi quyết định dùng **ảnh QR tĩnh** (`assets/images/anhQr_thanhtoan.jpg`) và tự viết phần điền động số tiền/nội dung.
- Tự kiểm tra số tiền cọc = 50% tổng, làm tròn; thử cả 3 phương thức và xem đơn lưu đúng trạng thái (`in_production`, COD chờ xác nhận).
- Sửa lại thông tin ngân hàng hiển thị; phát hiện **README ghi MBBank nhưng ảnh QR/trang checkout là Vietcombank** → ghi nhận để đồng bộ lại tài liệu.
- Thử bấm xác nhận khi chưa nhập SĐT/địa chỉ → tự thêm toast lỗi.
- Kiểm tra đơn vừa tạo hiện trên Admin Dashboard.

**Bằng chứng:** `js/pages/buyer.js` (phần checkout), `page/buyer/cart.html`, `page/buyer/checkout.html`.

---

### Giai đoạn 8 – Luồng Người sáng tạo (Maker)

**Mục tiêu:** quản lý listing, nhận brief, xem điểm tương thích, soạn proposal.

**Prompt đã dùng:**
```text
Viết giúp tôi màn hình hộp thư brief cho người sáng tạo: danh sách brief, bấm vào thì
mở chi tiết, có nút chạy AI đánh giá độ tương thích. Trang soạn proposal cho lưu nháp
và gửi. Giải thích cách nối dữ liệu brief với maker đang đăng nhập.
```

**AI đã hỗ trợ:** gợi ý bố cục danh sách brief và cách lọc theo maker đang đăng nhập.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết `js/pages/maker.js` và HTML các trang maker.
- Tự kiểm tra brief chỉ hiện đúng cho maker tương ứng; sửa chỗ lấy nhầm toàn bộ brief.
- Sửa hiển thị điểm tương thích: chuyển sang ngẫu nhiên 85–99% để giống mô phỏng và ghi rõ "mô phỏng".
- Thử lưu nháp rồi mở lại → kiểm tra dữ liệu còn trong localStorage.
- Tự viết lại mẫu câu proposal và nút hành động.

**Bằng chứng:** `js/pages/maker.js`, `page/maker/*.html`.

---

### Giai đoạn 9 – Luồng Quản trị và Kiểm duyệt

**Mục tiêu:** dashboard số liệu, quản lý danh mục/người dùng, hàng chờ duyệt, báo cáo, quy chuẩn nội dung.

**Prompt đã dùng:**
```text
Viết giúp tôi dashboard admin đọc dữ liệu từ localStorage để hiện số người dùng,
listing, brief, đơn hàng và doanh thu. Trang kiểm duyệt có duyệt/từ chối sản phẩm.
Trang quản lý danh mục và người dùng có thêm/sửa/xóa. Giải thích cách tính doanh thu
từ các đơn đã thanh toán trước.
```

**AI đã hỗ trợ:** gợi ý cách tổng hợp số liệu từ localStorage và cách tính doanh thu.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết `js/pages/admin.js` và HTML các trang admin/moderator.
- Tự đối chiếu số liệu dashboard với dữ liệu thật sau khi tạo đơn ở trang checkout.
- Sửa lỗi doanh thu cộng cả đơn COD/chưa thanh toán → chỉ tính `paidAmount`.
- Thử duyệt/từ chối listing và kiểm tra badge trạng thái đổi đúng.
- Tự viết lại nội dung quy chuẩn nội dung và các mẫu báo cáo.
- Kiểm tra chỉ tài khoản admin/mod mới vào được khu vực này.

**Bằng chứng:** `js/pages/admin.js`, `page/admin/*.html`, `page/moderator/*.html`.

---

### Giai đoạn 10 – Ba tính năng AI mô phỏng

**Mục tiêu:** có trải nghiệm AI trọn vẹn nhưng không cần API key.

**Prompt đã dùng:**
```text
Đồ án của tôi yêu cầu 3 tính năng AI nhưng tôi không có API key và không muốn gọi dịch vụ
trả phí. Làm sao mô phỏng cho giống thật: có trạng thái đang xử lý, kết quả, độ tin cậy,
nút Áp dụng và Bỏ qua? Gợi ý cho tôi 3 hàm mẫu và modal dùng chung.
```

**AI đã hỗ trợ:** gợi ý 3 hàm mẫu (`aiBriefBuilder`, `aiStyleMatcher`, `aiRevisionSummarizer`), gợi ý 4 trạng thái modal và vài đoạn CSS mẫu.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự triển khai `js/modules/ai-services.js` và `css/components/ai-modal.css` theo hướng dẫn.
- **Ghi rõ trong báo cáo và README:** đây là **mô phỏng**, không phải mô hình AI thật; độ tin cậy và điểm tương thích là số minh họa.
- Tự đổi delay cố định thành ngẫu nhiên 1,2–2,2 giây để không bị "giả quá lộ".
- Kiểm tra nút **Bỏ qua** không làm thay đổi dữ liệu brief; nút **Áp dụng** mới ghi nội dung AI vào form.
- Thêm trạng thái lỗi/không có kết quả và nút đóng modal.
- Tự chỉnh nội dung gợi ý theo từng danh mục (gốm, da, bạc, gỗ, lụa, nến) để demo thuyết phục hơn.

**Bằng chứng:** `js/modules/ai-services.js`, `css/components/ai-modal.css`, 3 ảnh AI trong `design-board/shots/`.

---

### Giai đoạn 11 – Validation, toast, modal, trạng thái rỗng

**Mục tiêu:** phản hồi rõ ràng khi người dùng thao tác sai.

**Prompt đã dùng:**
```text
Viết giúp tôi validation không dùng thư viện: kiểm tra bắt buộc, số tiền tối thiểu,
độ dài mô tả; hiện lỗi ngay dưới ô nhập và xóa lỗi khi người dùng sửa. Kèm hàm toast
thông báo thành công/lỗi/cảnh báo.
```

**AI đã hỗ trợ:** gợi ý cách gắn lỗi inline và cách tạo toast đơn giản.

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự viết `js/modules/validation.js` và phần toast/modal trong `ui-utils.js`.
- Sửa lỗi thông báo cũ không biến mất khi sửa lại form → tự thêm `clearFieldError`.
- Chỉnh vị trí lỗi để không làm nhảy layout.
- Tự viết lại câu thông báo tiếng Việt, thêm emoji phù hợp.
- Kiểm tra toast không chồng lên nhau và tự ẩn sau vài giây.

**Bằng chứng:** `js/modules/validation.js`, `js/modules/ui-utils.js`.

---

### Giai đoạn 12 – Rà soát toàn bộ và sửa lỗi

**Mục tiêu:** tìm lỗi trước khi nộp.

**Prompt đã dùng:**
```text
Rà lại toàn bộ code giúp tôi: tìm lỗi đường dẫn, biến không dùng, chỗ chưa xử lý trường
hợp rỗng, chỗ nào dữ liệu hiển thị sai. Liệt kê theo mức ưu tiên và chỉ rõ file/dòng.
```

**AI đã hỗ trợ:** liệt kê lỗi tiềm năng và gợi ý hướng sửa; tôi tự kiểm chứng từng lỗi.

**Tôi tự kiểm chứng / chỉnh sửa (những lỗi tôi phát hiện khi chạy thử):**

| Lỗi | Cách tôi phát hiện | Cách xử lý |
|---|---|---|
| Ảnh/logo 404 khi mở trang trong `page/buyer/` | Mở Live Server, xem tab Network | Tự viết `getAssetPath` + sửa đường dẫn trong HTML |
| Trang gốc bị cộng `../` sai | Mở `index.html` ở gốc | Tự sửa điều kiện nhận diện thư mục trong `getRelativePath` |
| Ảnh sản phẩm cũ vẫn hiện sau khi thay ảnh | Xóa cache vẫn thấy ảnh cũ | Tự thêm bước đồng bộ thumbnail từ `mock-data` trong `initDatabase` |
| Lọc danh mục không có kết quả nhưng trang trống | Thử chọn danh mục không có sản phẩm | Tự thêm empty state |
| README ghi `pages/` nhưng thư mục thật là `page/` | Bấm link trong README bị 404 | Sửa trong code; **bảng README cần đồng bộ nốt** |
| README ghi MBBank, trang checkout ghi Vietcombank | Đối chiếu README với ảnh QR | Ghi nhận, đồng bộ tài liệu trước khi nộp |
| AI trả kết quả quá nhanh, giống giả | Bấm thử nhiều lần | Tự đổi delay ngẫu nhiên 1,2–2,2 giây |
| Doanh thu admin cộng cả đơn chưa thanh toán | Tạo đơn COD rồi xem dashboard | Tự sửa, chỉ tính `paidAmount` |

**Bằng chứng:** video demo, ảnh design board, Console không còn lỗi đỏ.

---

### Giai đoạn 13 – README, design board, video

**Mục tiêu:** tài liệu và minh chứng nộp bài.

**Prompt đã dùng:**
```text
Viết giúp tôi README mô tả dự án, tính năng nổi bật, tài khoản demo, cấu trúc thư mục
và cách chạy. Tôi sẽ tự kiểm tra lại thông tin. Gợi ý bố cục design board 20 ảnh.
```

**AI đã hỗ trợ:** bản nháp README và dàn ý design board (khoảng 30% nội dung tài liệu).

**Tôi tự kiểm chứng / chỉnh sửa:**
- Tự kiểm tra từng tài khoản demo bằng cách đăng nhập thật.
- Tự chụp 20 ảnh màn hình (17 màn hình + 3 trạng thái AI), tự đóng gói `CraftLink-design-board.pdf` và `.zip`.
- Sửa các chỗ README nói quá so với code (ví dụ "tự động sinh mã VietQR" trong khi thực tế là ảnh QR tĩnh + điền số tiền/nội dung).
- Tự quay video OBS cho các màn hình tôi phụ trách và tự thuyết trình.

**Bằng chứng:** `README.md`, `design-board/`, video OBS.

---

### Giai đoạn 14 – Những phần tôi làm hoàn toàn không dùng AI

- Chọn đề tài, tên thương hiệu **CraftLink**, logo và bộ nhận diện.
- Chọn và biên tập toàn bộ **nội dung tiếng Việt**: tên sản phẩm, mô tả, quy chuẩn nội dung, thông báo lỗi.
- Chọn ảnh sản phẩm, ảnh banner, ảnh QR và sắp xếp vào `assets/`.
- Quyết định luồng nghiệp vụ: brief → proposal → duyệt → đơn → thanh toán.
- Chạy thử từng màn hình, phát hiện lỗi, quyết định sửa hay bỏ.
- Chụp ảnh design board, quay video OBS, viết kịch bản thuyết trình.

---

## 5. Quy trình kiểm chứng tôi đã thực hiện

- [x] Xóa `localStorage` rồi tải lại để kiểm tra dữ liệu mẫu có seed đúng.
- [x] Mở từng trang ở 3 độ sâu khác nhau để kiểm tra ảnh/link.
- [x] Đăng nhập đủ 7 tài khoản demo, thử truy cập sai role.
- [x] Thử form rỗng, số tiền âm, ngân sách quá nhỏ, mô tả quá ngắn.
- [x] Thử lọc/tìm kiếm không có kết quả.
- [x] Thử 3 tính năng AI ở các trạng thái: nhập → đang xử lý → kết quả → áp dụng/bỏ qua.
- [x] Thử 3 phương thức thanh toán, kiểm tra mã đơn/nội dung chuyển khoản.
- [x] Kiểm tra đơn vừa tạo hiện trên Admin Dashboard.
- [x] Kiểm tra responsive 375px / 768px / 1440px.
- [x] Đọc Console, sửa hết lỗi đỏ trước khi chụp ảnh.

**Cách kiểm chứng nhanh cho người chấm:**
1. Mở `page/index.html` bằng Live Server.
2. Vào `page/auth/login.html`, đăng nhập `buyer1` / `buyer123`.
3. Thêm sản phẩm vào giỏ → checkout → chọn cọc 50% → xác nhận.
4. Đăng nhập `admin1` / `admin123` → xem đơn và doanh thu vừa cập nhật.
5. Vào màn hình AI và thử cả nút **Áp dụng** và **Bỏ qua**.

---

## 6. Tài liệu tham khảo ngoài AI

| Nguồn | Dùng để làm gì |
|---|---|
| MDN Web Docs (HTML/CSS/JavaScript) | Tra cú pháp `localStorage`, `URLSearchParams`, `navigator.clipboard`, CSS Grid/Flexbox |
| Tài liệu VietQR / ứng dụng ngân hàng | Hiểu nội dung chuyển khoản và cách hiển thị mã QR |
| W3C / web.dev | Kiểm tra semantic HTML và responsive |
| [Bổ sung nếu có] | [Bổ sung nếu có] |

---

## 7. Tự đánh giá và cam kết

Tôi đánh giá mức độ sử dụng AI của mình là **thấp – trung bình (khoảng 20–30%)**: chủ yếu là hỏi để hiểu, xin gợi ý cấu trúc và nhờ soát lỗi; phần lớn code, nội dung và quyết định là do tôi tự làm. Tôi đã đọc lại, chạy thử và chỉnh sửa mọi phần có tham khảo AI, và chịu trách nhiệm về sản phẩm cuối cùng.

Tôi cam kết báo cáo trên là trung thực. Nếu nhà trường cần, tôi sẵn sàng giải thích từng đoạn code trong dự án và trình bày quá trình sửa lỗi.

**Ngày:** [Điền ngày nộp]
**Chữ ký:** [Họ và tên]

---

## Phụ lục A – Danh sách file và mức AI tương ứng

| Tệp | Vai trò | Mức AI | Ghi chú của tôi |
|---|---|---|---|
| `js/main.js` | Session, đường dẫn, giỏ hàng, phân quyền | 2 | Tự viết; AI gợi ý hướng sửa đường dẫn |
| `js/modules/storage.js` | CRUD localStorage | 2 | Tự viết theo gợi ý; tự thêm tiền tố và kiểm tra JSON |
| `js/modules/validation.js` | Validate form | 2 | Tự viết, tự sửa vị trí lỗi và thông báo |
| `js/modules/ui-utils.js` | Toast, modal, format tiền/ngày | 2 | Tự viết, tự chỉnh thời gian và câu chữ |
| `js/modules/ai-services.js` | 3 tính năng AI mô phỏng | 2–3 | AI gợi ý mẫu; tôi tự triển khai, sửa delay/điểm số |
| `js/mock-data.js` | Dữ liệu mẫu | 1–2 | Tự chọn sản phẩm, giá, mô tả, ảnh |
| `js/pages/buyer.js` | Luồng Buyer | 2 | Tự viết; thêm chặn khách, empty state, sửa QR |
| `js/pages/maker.js` | Luồng Maker | 2 | Tự viết; sửa lọc brief và điểm tương thích |
| `js/pages/admin.js` | Luồng Admin/Moderator | 2 | Tự viết; sửa doanh thu và trạng thái duyệt |
| `css/base/*` | Token, reset, typography | 2 | Tự viết, tự đổi bảng màu, kiểm tra responsive |
| `css/components/*` | Nút, thẻ, form, bảng, badge, AI modal | 2–3 | AI gợi ý mẫu; tôi tự chỉnh kích thước/màu/trạng thái |
| `css/layout/*` | Header, sidebar, footer | 2 | Tự viết; sửa menu mobile và badge |
| `css/pages/*` | Style riêng từng trang | 2 | Tự viết; sửa khoảng cách và layout |
| `page/**/*.html` | 17 màn hình | 2 | Tự viết/sửa nội dung, đường dẫn, ảnh |
| `README.md` | Tài liệu dự án | 2–3 | AI viết nháp; tôi tự kiểm tra tài khoản và số liệu |
| `design-board/*` | 20 ảnh + PDF + ZIP | 1 | Tự chụp và đóng gói |

## Phụ lục B – Việc còn phải đồng bộ trước khi nộp

- [ ] README đang ghi `pages/...` trong khi thư mục thật là `page/...`.
- [ ] README ghi ngân hàng **MBBank**, trang checkout dùng **Vietcombank** — chọn một thông tin đúng.
- [ ] README mô tả "tự động sinh mã VietQR", thực tế là ảnh QR tĩnh + điền số tiền/nội dung — sửa lại cho đúng.
- [ ] Điền họ tên, MSSV, lớp, giảng viên, ngày nộp.
- [ ] Nếu nộp theo nhóm: chỉ giữ lại các mục thuộc 5 màn hình tôi phụ trách.
- [ ] Đối chiếu lại mốc thời gian với lịch sử commit/nhánh cá nhân (nếu có).
