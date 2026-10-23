/**
 * CraftLink – Mock Data
 * Dữ liệu tĩnh và cấu trúc khởi tạo cho toàn hệ thống
 */

export const INITIAL_USERS = [
  // 2 Tài khoản Quản trị viên điều hành (Admin)
  {
    id: "usr-admin-1",
    username: "admin1",
    email: "admin1@craftlink.vn",
    password: "admin123",
    name: "Nguyễn Tuấn Anh",
    role: "admin",
    roleLabel: "Tổng quản trị viên",
    status: "active",
    joinedAt: "2024-01-10",
    phone: "0901234567"
  },
  {
    id: "usr-admin-2",
    username: "admin2",
    email: "admin2@craftlink.vn",
    password: "admin123",
    name: "Trần Quang Huy",
    role: "admin",
    roleLabel: "Quản trị viên điều hành",
    status: "active",
    joinedAt: "2024-03-15",
    phone: "0912345678"
  },

  // Tài khoản Người sáng tạo (Maker)
  {
    id: "usr-maker-1",
    username: "maker1",
    email: "maker1@craftlink.vn",
    password: "maker123",
    name: "Xưởng Gốm Bát Tràng",
    role: "maker",
    roleLabel: "Nghệ nhân gốm sứ",
    status: "active",
    joinedAt: "2024-04-12",
    phone: "0987654321",
    bio: "Nghệ nhân đời thứ 4 tại làng gốm Bát Tràng, chế tác thủ công bằng tay với men ngọc truyền thống."
  },
  {
    id: "usr-maker-2",
    username: "maker2",
    email: "maker2@craftlink.vn",
    password: "maker123",
    name: "Leather Art Studio",
    role: "maker",
    roleLabel: "Thợ da thủ công",
    status: "active",
    joinedAt: "2024-05-20",
    phone: "0976543210",
    bio: "Chuyên đồ da thuộc thảo mộc thủ công, khâu tay từng đường chỉ với độ tinh xảo cao."
  },

  // Tài khoản Khách hàng (Buyer)
  {
    id: "usr-buyer-1",
    username: "buyer1",
    email: "buyer1@craftlink.vn",
    password: "buyer123",
    name: "Lê Phương Thảo",
    role: "buyer",
    roleLabel: "Khách hàng thân thiết",
    status: "active",
    joinedAt: "2025-01-05",
    phone: "0934567890"
  },
  {
    id: "usr-buyer-2",
    username: "buyer2",
    email: "buyer2@craftlink.vn",
    password: "buyer123",
    name: "Hoàng Đức Anh",
    role: "buyer",
    roleLabel: "Khách hàng doanh nghiệp",
    status: "active",
    joinedAt: "2025-02-18",
    phone: "0945678901"
  },

  // Moderator
  {
    id: "usr-mod-1",
    username: "mod1",
    email: "mod1@craftlink.vn",
    password: "mod123",
    name: "Phạm Minh Hoàng",
    role: "moderator",
    roleLabel: "Kiểm duyệt viên",
    status: "active",
    joinedAt: "2024-06-01",
    phone: "0923456789"
  }
];

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Gốm sứ thủ công", slug: "gom-su", icon: "🏺", count: 24, description: "Bình gốm, ấm chén, đĩa trang trí nung củi và phủ men tự nhiên." },
  { id: "cat-2", name: "Đồ da handmade", slug: "do-da", icon: "👜", count: 18, description: "Ví da, túi xách, dây đồng hồ khâu tay từ da thật 100%." },
  { id: "cat-3", name: "Trang sức thủ công", slug: "trang-suc", icon: "💍", count: 32, description: "Nhẫn bạc 925, dây chuyền đá quý và phụ kiện độc bản." },
  { id: "cat-4", name: "Gỗ mỹ nghệ", slug: "go-my-nghe", icon: "🪵", count: 15, description: "Khay trà, tượng trang trí, đĩa gỗ óc chó lau dầu an toàn." },
  { id: "cat-5", name: "Vải & Dệt truyền thống", slug: "vai-det", icon: "🧵", count: 21, description: "Khăn lụa tơ tằm, túi vải canvas thêu tay, thổ cẩm dân tộc." },
  { id: "cat-6", name: "Nến & Hương liệu", slug: "nen-huong", icon: "🕯️", count: 12, description: "Nến sáp ong, tinh dầu thiên nhiên thơm dịu thư giãn." }
];

export const INITIAL_LISTINGS = [
  {
    id: "lst-001",
    title: "Bình gốm men ngọc Bát Tràng",
    maker: "Xưởng Gốm Bát Tràng",
    makerId: "usr-maker-1",
    category: "cat-1",
    categoryName: "Gốm sứ thủ công",
    price: 850000,
    currency: "VND",
    thumbnail: "assets/images/Binh-Hoa-Nghe-Thuat-Bat-Trang-Men-Ngoc.webp",
    rating: 4.9,
    reviewCount: 124,
    description: "Bình gốm men ngọc truyền thống, nung ở 1280°C, họa tiết vân rạn tự nhiên, thích hợp trang trí phòng khách hoặc cắm hoa.",
    tags: ["gốm", "men ngọc", "Bát Tràng", "nung củi"],
    status: "active",
    customisable: true,
    customOptions: "Có thể khắc tên, chọn màu men xanh rêu hoặc kem ngọc.",
    views: 1420,
    orders: 34,
    createdAt: "2025-03-10"
  },
  {
    id: "lst-002",
    title: "Ví da bò sáp khâu tay khắc laser tên",
    maker: "Leather Art Studio",
    makerId: "usr-maker-2",
    category: "cat-2",
    categoryName: "Đồ da handmade",
    price: 620000,
    currency: "VND",
    thumbnail: "assets/images/vi-da-bo-khac-laser.jpg",
    rating: 4.8,
    reviewCount: 89,
    description: "Ví da bò sáp nhập khẩu thật 100%, cắt gọt và khâu thủ công từng mũi chỉ sáp. Khắc tên và chữ ký miễn phí theo yêu cầu của quý khách.",
    tags: ["da bò", "ví nam", "khắc tên", "khâu tay"],
    status: "active",
    customisable: true,
    customOptions: "Khắc laser họ tên, chọn màu chỉ sáp (nâu/đen/vàng bơ).",
    views: 980,
    orders: 45,
    createdAt: "2025-03-15"
  },
  {
    id: "lst-003",
    title: "Vòng tay bạc 925 hoa văn cổ truyền",
    maker: "Silver Moon Workshop",
    makerId: "usr-maker-1",
    category: "cat-3",
    categoryName: "Trang sức thủ công",
    price: 480000,
    currency: "VND",
    thumbnail: "assets/images/vong-tay-bac-925.jpg",
    rating: 4.9,
    reviewCount: 203,
    description: "Vòng tay bạc thái 925 uốn đan thủ công, bề mặt đánh xước cổ điển, dễ dàng điều chỉnh kích cỡ theo cổ tay.",
    tags: ["bạc 925", "vòng tay", "thủ công"],
    status: "active",
    customisable: true,
    customOptions: "Khắc ngày kỷ niệm ở mặt trong vòng tay.",
    views: 1850,
    orders: 62,
    createdAt: "2025-03-20"
  },
  {
    id: "lst-004",
    title: "Khay gỗ óc chó walnut phủ sáp ong",
    maker: "Mộc Việt Studio",
    makerId: "usr-maker-2",
    category: "cat-4",
    categoryName: "Gỗ mỹ nghệ",
    price: 350000,
    currency: "VND",
    thumbnail: "assets/images/khay-go-oc-cho-sap-ong.jpg",
    rating: 4.7,
    reviewCount: 67,
    description: "Khay phục vụ trà bánh bằng gỗ walnut nguyên khối, phủ dầu tự nhiên an toàn tuyệt đối cho thực phẩm.",
    tags: ["gỗ óc chó", "khay trà", "tối giản"],
    status: "active",
    customisable: false,
    customOptions: "Không tùy biến số đo lẻ.",
    views: 640,
    orders: 19,
    createdAt: "2025-03-22"
  },
  {
    id: "lst-005",
    title: "Khăn lụa tơ tằm dệt tay Vạn Phúc",
    maker: "Tơ Lụa Hà Đông",
    makerId: "usr-maker-1",
    category: "cat-5",
    categoryName: "Vải & Dệt truyền thống",
    price: 720000,
    currency: "VND",
    thumbnail: "assets/images/khan-lua-to-tam.jpg",
    rating: 4.8,
    reviewCount: 156,
    description: "Khăn lụa tơ tằm nguyên chất 100%, dệt tay thủ công trên khung cửi truyền thống, nhuộm màu thực vật nhã nhặn.",
    tags: ["lụa Vạn Phúc", "khăn choàng", "nhuộm tự nhiên"],
    status: "active",
    customisable: true,
    customOptions: "Thêu tay hoa sen hoặc tên viết tắt ở góc khăn.",
    views: 1200,
    orders: 28,
    createdAt: "2025-03-25"
  },
  {
    id: "lst-006",
    title: "Nến thơm sáp ong hoa nhài & quế",
    maker: "Hive & Light Studio",
    makerId: "usr-maker-2",
    category: "cat-6",
    categoryName: "Nến & Hương liệu",
    price: 195000,
    currency: "VND",
    thumbnail: "assets/images/nen-thom-sap-ong.jpg",
    rating: 4.6,
    reviewCount: 42,
    description: "Nến đổ tay từ sáp ong rừng nguyên chất, kết hợp tinh dầu hoa nhài thơm ngọt và quế ấm áp cho không gian thư giãn.",
    tags: ["nến thơm", "sáp ong", "tinh dầu"],
    status: "active",
    customisable: false,
    customOptions: "Có thiệp viết tay theo yêu cầu.",
    views: 450,
    orders: 15,
    createdAt: "2025-03-28"
  },
  {
    id: "lst-007",
    title: "Bộ 6 chén trà gốm phong cách Raku độc bản",
    maker: "Xưởng Gốm Bát Tràng",
    makerId: "usr-maker-1",
    category: "cat-1",
    categoryName: "Gốm sứ thủ công",
    price: 1200000,
    currency: "VND",
    thumbnail: "assets/images/bo-am-chen.jpg",
    rating: 5.0,
    reviewCount: 78,
    description: "Bộ chén trà phong cách hỏa biến Raku, nung nhanh và sốc nhiệt tạo lớp men rạn khói độc nhất vô nhị trên từng chén.",
    tags: ["chén trà", "Raku", "độc bản", "trà đạo"],
    status: "active",
    customisable: true,
    customOptions: "Tặng kèm hộp quà gỗ bọc lụa.",
    views: 890,
    orders: 22,
    createdAt: "2025-04-02"
  },
  {
    id: "lst-008",
    title: "Túi tote canvas thêu họa tiết dân gian thủ công",
    maker: "Needle & Thread Co.",
    makerId: "usr-maker-2",
    category: "cat-5",
    categoryName: "Vải & Dệt truyền thống",
    price: 280000,
    currency: "VND",
    thumbnail: "assets/images/tui-note-theu.jpg",
    rating: 4.7,
    reviewCount: 35,
    description: "Túi canvas dày dặn kèm khóa kéo an toàn, thêu tay họa tiết cá chép hoa sen mang phong vị văn hóa truyền thống Việt Nam.",
    tags: ["canvas", "túi tote", "thêu tay", "cá chép"],
    status: "active",
    customisable: true,
    customOptions: "Thêu thêm tên hoặc thông điệp nhỏ.",
    views: 730,
    orders: 31,
    createdAt: "2025-04-05"
  }
];

export const INITIAL_BRIEFS = [
  {
    id: "br-001",
    buyerId: "usr-buyer-1",
    buyerName: "Lê Phương Thảo",
    title: "Bình hoa gốm dáng Wabi-Sabi mộc mạc",
    category: "cat-1",
    categoryName: "Gốm sứ thủ công",
    budget: 1500000,
    description: "Tôi muốn một chiếc bình gốm mộc không tráng men bóng, cao 25-28cm để cắm cành khô mang phong cách thiền.",
    status: "submitted",
    createdAt: "2025-04-20T08:30:00",
    aiMatch: 95
  },
  {
    id: "br-002",
    buyerId: "usr-buyer-2",
    buyerName: "Hoàng Đức Anh",
    title: "Ví đựng passport da veg khắc logo công ty",
    category: "cat-2",
    categoryName: "Đồ da handmade",
    budget: 900000,
    description: "Cần đặt may ví da đựng hộ chiếu kèm ngăn thẻ, da màu nâu hạt dẻ, dập chìm họa tiết chim Lạc Việt ở góc phải.",
    status: "proposal_sent",
    createdAt: "2025-04-22T14:15:00",
    aiMatch: 88
  },
  {
    id: "br-003",
    buyerId: "usr-buyer-1",
    buyerName: "Lê Phương Thảo",
    title: "Cặp nhẫn bạc tối giản khắc ngày kỷ niệm",
    category: "cat-3",
    categoryName: "Trang sức thủ công",
    budget: 1200000,
    description: "Cặp nhẫn bạc 925 bản dẹt 4mm, bề mặt chải xước mờ, khắc ngày 20/10/2026 ở lòng trong.",
    status: "matched",
    createdAt: "2025-04-24T09:00:00",
    aiMatch: 92
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ord-001",
    briefId: "br-003",
    buyerId: "usr-buyer-1",
    buyerName: "Lê Phương Thảo",
    makerId: "usr-maker-1",
    makerName: "Xưởng Gốm Bát Tràng",
    title: "Cặp nhẫn bạc tối giản khắc ngày kỷ niệm",
    status: "in_production",
    statusLabel: "Đang chế tác",
    totalPrice: 1150000,
    timeline: "7 ngày",
    message: "Xưởng đã chuẩn bị xong phôi bạc và đang tiến hành khắc chữ theo yêu cầu của bạn.",
    createdAt: "2025-04-25T10:00:00",
    estimatedDelivery: "2025-05-05"
  },
  {
    id: "ord-002",
    briefId: "br-002",
    buyerId: "usr-buyer-2",
    buyerName: "Hoàng Đức Anh",
    makerId: "usr-maker-2",
    makerName: "Leather Art Studio",
    title: "Ví đựng passport da veg khắc logo công ty",
    status: "proposal_sent",
    statusLabel: "Đã gửi báo giá",
    totalPrice: 880000,
    timeline: "5 ngày",
    message: "Tôi đã chọn phôi da veg ý cao cấp nhất cho chiếc ví của bạn, giá trọn gói đã gồm khắc logo.",
    createdAt: "2025-04-26T15:30:00",
    estimatedDelivery: "2025-05-08"
  }
];

export const INITIAL_MOD_QUEUE = [
  {
    id: "mod-01",
    listingId: "lst-009",
    title: "Chậu gốm terrazzo men trắng",
    maker: "Xưởng Gốm Bát Tràng",
    makerId: "usr-maker-1",
    type: "Tạo listing mới",
    submittedAt: "2025-05-01T10:00:00",
    flags: ["Kiểm tra nguồn gốc men"],
    status: "pending"
  },
  {
    id: "mod-02",
    listingId: "lst-010",
    title: "Dao gọt gỗ cán sừng trâu thủ công",
    maker: "Mộc Việt Studio",
    makerId: "usr-maker-2",
    type: "Cập nhật sản phẩm",
    submittedAt: "2025-05-02T14:30:00",
    flags: ["Vật dụng sắc nhọn"],
    status: "pending"
  }
];

export const INITIAL_REPORTS = [
  {
    id: "rpt-001",
    type: "listing",
    targetTitle: "Bình hoa gốm tráng men màu lạ",
    reporter: "user_test_99",
    reason: "Hình ảnh có dấu hiệu sao chép từ thương hiệu quốc tế.",
    status: "open",
    createdAt: "2025-04-29T11:00:00"
  },
  {
    id: "rpt-002",
    type: "user",
    targetTitle: "Tài khoản nghi vấn bán hàng công nghiệp",
    reporter: "thao_le_buyer",
    reason: "Nhắn tin báo giá không đúng cam kết thủ công truyền thống.",
    status: "investigating",
    createdAt: "2025-04-30T16:20:00"
  }
];

export const INITIAL_GUIDELINES = [
  {
    id: "gl-01",
    title: "Quy chuẩn hình ảnh sản phẩm",
    rules: [
      "Tối thiểu có 3 ảnh chụp thực tế rõ nét ở các góc độ khác nhau.",
      "Ảnh đại diện phải rõ chi tiết món đồ thủ công, không chèn watermark số điện thoại gây rối mắt.",
      "Khuyến khích có ít nhất 1 ảnh cận cảnh vân da/men gốm hoặc quá trình gia công thủ công."
    ],
    updatedAt: "2025-04-10"
  },
  {
    id: "gl-02",
    title: "Tiêu chí mô tả & Cam kết tùy biến",
    rules: [
      "Mô tả bắt buộc phải nêu rõ chất liệu chính xác (ví dụ: da bò thật, bạc 925, gốm nung củi).",
      "Nêu rõ phạm vi tùy biến (có thể khắc chữ bao nhiêu ký tự, điều chỉnh kích cỡ nào).",
      "Thời gian gia công dự kiến phải thực tế và có cam kết bồi hoàn nếu trễ hẹn."
    ],
    updatedAt: "2025-04-15"
  }
];
