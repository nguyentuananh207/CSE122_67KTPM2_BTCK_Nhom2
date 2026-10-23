/**
 * CraftLink – Main Script & Session Dispatcher
 * Điều phối phiên đăng nhập, phân quyền truy cập chặt chẽ, Header, Giỏ hàng và Không gian làm việc
 */

import { StorageService } from "./modules/storage.js";
import { showToast, initModals } from "./modules/ui-utils.js";
import {
  INITIAL_USERS,
  INITIAL_CATEGORIES,
  INITIAL_LISTINGS,
  INITIAL_BRIEFS,
  INITIAL_ORDERS,
  INITIAL_MOD_QUEUE,
  INITIAL_REPORTS,
  INITIAL_GUIDELINES
} from "./mock-data.js";

const SESSION_KEY = "session";
const CART_KEY = "cart";

/**
 * Tính đường dẫn tương đối an toàn tới bất kỳ tài nguyên nào trong dự án
 * @param {string} targetPath Đường dẫn tương đối từ thư mục 'page/', ví dụ: 'auth/login.html', 'buyer/cart.html', 'index.html'
 */
export function getRelativePath(targetPath) {
  const currentPath = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  const isSubdir = currentPath.includes("/page/admin/") ||
                   currentPath.includes("/page/maker/") ||
                   currentPath.includes("/page/moderator/") ||
                   currentPath.includes("/page/buyer/") ||
                   currentPath.includes("/page/auth/");

  if (isSubdir) {
    return "../" + targetPath;
  } else if (currentPath.includes("/page/")) {
    return targetPath;
  } else {
    return "page/" + targetPath;
  }
}

export function getAssetPath(assetPath) {
  if (/^(?:[a-z]+:|\/|#)/i.test(assetPath)) return assetPath;

  const normalizedPath = assetPath.replace(/^(?:\.\.\/|\.\/)+/, "");
  const assetRelativePath = normalizedPath.startsWith("assets/")
    ? normalizedPath
    : `assets/${normalizedPath}`;

  return getRelativePath(`../${assetRelativePath}`);
}

/**
 * Tính đường dẫn an toàn tới trang đăng nhập login.html
 */
export function getLoginUrl(redirectUrl = "") {
  const loginPath = getRelativePath("auth/login.html");
  if (redirectUrl) {
    return `${loginPath}?redirect=${encodeURIComponent(redirectUrl)}`;
  }
  return loginPath;
}

/**
 * Tính đường dẫn an toàn tới trang chủ Marketplace
 */
export function getHomeUrl() {
  return getRelativePath("index.html");
}

/**
 * Tính đường dẫn an toàn tới Không gian làm việc tương ứng của từng vai trò
 */
export function getRoleHomeUrl(role = "buyer") {
  const paths = {
    admin: getRelativePath("admin/admin-platform-dashboard.html"),
    maker: getRelativePath("maker/maker-listing-management.html"),
    buyer: getRelativePath("buyer/buyer-marketplace.html"),
    moderator: getRelativePath("moderator/moderator-moderation-queue.html")
  };
  return paths[role] || getHomeUrl();
}

export const ROLE_LABELS = {
  admin: "Quản trị viên điều hành",
  maker: "Người sáng tạo (Maker)",
  buyer: "Khách hàng (Buyer)",
  moderator: "Kiểm duyệt viên"
};

/**
 * Khởi tạo dữ liệu mẫu lần đầu vào LocalStorage
 */
export function initDatabase() {
  if (!StorageService.get("users")) {
    StorageService.set("users", INITIAL_USERS);
  }
  if (!StorageService.get("categories")) {
    StorageService.set("categories", INITIAL_CATEGORIES);
  }
  if (!StorageService.get("listings")) {
    StorageService.set("listings", INITIAL_LISTINGS);
  }

  const seededThumbnails = new Map(INITIAL_LISTINGS.map(({ id, thumbnail }) => [id, thumbnail]));
  const listings = StorageService.getList("listings");
  let listingsChanged = false;
  const syncedListings = listings.map((listing) => {
    const thumbnail = seededThumbnails.get(listing.id);
    if (!thumbnail || listing.thumbnail === thumbnail) return listing;
    listingsChanged = true;
    return { ...listing, thumbnail };
  });
  if (listingsChanged) {
    StorageService.set("listings", syncedListings);
  }

  if (!StorageService.get("briefs")) {
    StorageService.set("briefs", INITIAL_BRIEFS);
  }
  if (!StorageService.get("orders")) {
    StorageService.set("orders", INITIAL_ORDERS);
  }
  if (!StorageService.get("modQueue")) {
    StorageService.set("modQueue", INITIAL_MOD_QUEUE);
  }
  if (!StorageService.get("reports")) {
    StorageService.set("reports", INITIAL_REPORTS);
  }
  if (!StorageService.get("guidelines")) {
    StorageService.set("guidelines", INITIAL_GUIDELINES);
  }
  if (!StorageService.get(CART_KEY)) {
    StorageService.set(CART_KEY, [
      {
        id: "lst-001",
        title: "Bình gốm men ngọc Bát Tràng",
        maker: "Xưởng Gốm Bát Tràng",
        makerId: "usr-maker-1",
        price: 850000,
        thumbnail: "assets/images/Binh-Hoa-Nghe-Thuat-Bat-Trang-Men-Ngoc.webp",
        quantity: 1,
        customNote: "Khắc tên: Tuấn Anh & Phương Thảo"
      }
    ]);
  }

  const cart = StorageService.getList(CART_KEY);
  let cartChanged = false;
  const syncedCart = cart.map((item) => {
    const thumbnail = seededThumbnails.get(item.id);
    if (!thumbnail || item.thumbnail === thumbnail) return item;
    cartChanged = true;
    return { ...item, thumbnail };
  });
  if (cartChanged) {
    StorageService.set(CART_KEY, syncedCart);
  }
}

/**
 * Quản lý Giỏ hàng (Cart Helpers)
 */
export function getCart() {
  return StorageService.getList(CART_KEY);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

export function addToCart(product, quantity = 1, customNote = "") {
  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
    if (customNote) cart[existingIndex].customNote = customNote;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      maker: product.maker,
      makerId: product.makerId,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity,
      customNote
    });
  }

  StorageService.set(CART_KEY, cart);
  updateHeaderCartBadge();
  showToast(`Đã thêm "${product.title}" vào giỏ hàng!`, "success");
}

export function updateHeaderCartBadge() {
  const badge = document.getElementById("header-cart-count");
  if (badge) {
    const session = getSession();
    if (!session) {
      badge.style.display = "none";
      return;
    }
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

/**
 * Lấy session người dùng hiện tại
 */
export function getSession() {
  return StorageService.get(SESSION_KEY);
}

/**
 * Thiết lập session
 */
export function setSession(user) {
  StorageService.set(SESSION_KEY, {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    roleLabel: user.roleLabel || ROLE_LABELS[user.role] || user.role,
    timestamp: Date.now()
  });
}

/**
 * Xóa session đăng xuất
 */
export function clearSession() {
  StorageService.remove(SESSION_KEY);
}

/**
 * KIỂM TRA PHÂN QUYỀN CHẶT CHẼ
 */
export function requireRole(allowedRoles = []) {
  const session = getSession();

  // Khách vãng lai chưa đăng nhập
  if (!session) {
    document.documentElement.style.display = "none";
    sessionStorage.setItem("craftlink_redirect_reason", "⚠️ Tác vụ yêu cầu quyền đăng nhập! Khách vãng lai không được phép truy cập.");
    const loginUrl = getLoginUrl(window.location.pathname + window.location.search);
    window.location.replace(loginUrl);
    return false;
  }

  // Đã đăng nhập nhưng không đủ quyền tác vụ
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    document.documentElement.style.display = "none";
    sessionStorage.setItem("craftlink_redirect_reason", `⚠️ Tài khoản (${session.roleLabel}) không có quyền truy cập tác vụ này!`);
    const homeUrl = getRoleHomeUrl(session.role);
    window.location.replace(homeUrl);
    return false;
  }

  return true;
}

/**
 * Tự động kiểm tra trang hiện tại: nếu là trang nội bộ mà chưa đăng nhập thì chặn ngay
 */
export function checkProtectedPages() {
  const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
  const session = getSession();

  const isProtectedAdmin = path.includes("/page/admin/");
  const isProtectedMaker = path.includes("/page/maker/");
  const isProtectedModerator = path.includes("/page/moderator/");
  const isProtectedBuyerOps = path.includes("buyer-custom-brief.html") ||
                              path.includes("buyer-orders.html") ||
                              path.includes("cart.html") ||
                              path.includes("checkout.html");

  if (!session) {
    if (isProtectedAdmin || isProtectedMaker || isProtectedModerator || isProtectedBuyerOps) {
      document.documentElement.style.display = "none";
      sessionStorage.setItem("craftlink_redirect_reason", "⚠️ Quyền truy cập bị từ chối: Khách vãng lai chưa đăng nhập không thể truy cập khu vực này!");
      window.location.replace(getLoginUrl(window.location.pathname + window.location.search));
      return false;
    }
  } else {
    // Đã đăng nhập nhưng cố vào trang Admin mà không phải admin
    if (isProtectedAdmin && session.role !== "admin") {
      document.documentElement.style.display = "none";
      sessionStorage.setItem("craftlink_redirect_reason", "⚠️ Chỉ Quản trị viên mới có quyền vào khu vực này!");
      window.location.replace(getRoleHomeUrl(session.role));
      return false;
    }
    // Cố vào Maker mà không phải maker hoặc admin
    if (isProtectedMaker && session.role !== "maker" && session.role !== "admin") {
      document.documentElement.style.display = "none";
      sessionStorage.setItem("craftlink_redirect_reason", "⚠️ Khu vực dành riêng cho Người sáng tạo (Maker)!");
      window.location.replace(getRoleHomeUrl(session.role));
      return false;
    }
  }

  return true;
}

/**
 * Chuyển nhanh giữa các Không gian làm việc (Demo Switcher)
 */
export function switchDemoRole(targetRoleKey) {
  const users = StorageService.getList("users");

  if (targetRoleKey === "guest") {
    clearSession();
    showToast("Đã chuyển sang chế độ Khách vãng lai (Chưa đăng nhập)!", "info");
    setTimeout(() => {
      window.location.href = getHomeUrl();
    }, 400);
    return;
  }

  let user = null;
  if (targetRoleKey === "admin1") {
    user = users.find(u => u.username === "admin1") || users.find(u => u.role === "admin");
  } else if (targetRoleKey === "admin2") {
    user = users.find(u => u.username === "admin2");
  } else if (targetRoleKey === "maker") {
    user = users.find(u => u.role === "maker");
  } else if (targetRoleKey === "buyer") {
    user = users.find(u => u.role === "buyer");
  } else if (targetRoleKey === "moderator") {
    user = users.find(u => u.role === "moderator");
  }

  if (user) {
    setSession(user);
    showToast(`Đã chuyển sang Không gian làm việc: ${user.name} (${user.roleLabel || user.role})`, "success");
    setTimeout(() => {
      window.location.href = getRoleHomeUrl(user.role);
    }, 450);
  }
}

/**
 * Đồng bộ thanh Header (Hiển thị nổi bật Không gian làm việc cho từng Role)
 */
function renderHeader() {
  const authContainer = document.getElementById("header-auth");
  const navContainer = document.querySelector(".header-nav");
  const session = getSession();

  const cartUrl = getRelativePath("buyer/cart.html");
  const loginUrl = getLoginUrl();

  if (document.body.dataset.page === "auth-login") {
    document.body.classList.add("auth-page");
    if (navContainer) navContainer.replaceChildren();
    if (authContainer) {
      authContainer.innerHTML = `
        <a href="${getHomeUrl()}" class="btn btn-outline btn-sm">← Về trang chủ</a>
      `;
    }
    return;
  }

  // 1. CẬP NHẬT THANH MENU ĐIỀU HƯỚNG CHÍNH THEO VAI TRÒ
  if (navContainer) {
    const currentPath = window.location.pathname.replace(/\\/g, "/").toLowerCase();

    if (session?.role === "admin") {
      navContainer.innerHTML = `
        <a href="${getHomeUrl()}">Trang chủ Sàn</a>
        <a href="${getRelativePath('admin/admin-platform-dashboard.html')}" style="color:#b91c1c; font-weight:700;">📊 Bảng điều khiển Quản trị</a>
        <a href="${getRelativePath('admin/admin-category-management.html')}">📁 Danh mục</a>
        <a href="${getRelativePath('admin/admin-user-management.html')}">👥 Người dùng</a>
        <a href="${getRelativePath('moderator/moderator-moderation-queue.html')}">🛡️ Kiểm duyệt</a>
      `;
    } else if (session?.role === "maker") {
      navContainer.innerHTML = `
        <a href="${getHomeUrl()}">Trang chủ Sàn</a>
        <a href="${getRelativePath('maker/maker-listing-management.html')}" style="color:#7e22ce; font-weight:700;">🎨 Quản lý Listing</a>
        <a href="${getRelativePath('maker/maker-brief-inbox.html')}">📥 Hộp thư Brief</a>
        <a href="${getRelativePath('maker/maker-proposal-editor.html')}">✍️ Soạn Proposal</a>
      `;
    } else if (session?.role === "moderator") {
      navContainer.innerHTML = `
        <a href="${getHomeUrl()}">Trang chủ Sàn</a>
        <a href="${getRelativePath('moderator/moderator-moderation-queue.html')}" style="color:#b45309; font-weight:700;">🛡️ Hàng chờ duyệt</a>
        <a href="${getRelativePath('moderator/moderator-report-center.html')}">🚩 Báo cáo vi phạm</a>
        <a href="${getRelativePath('moderator/moderator-content-guidelines.html')}">📝 Quy chuẩn</a>
      `;
    } else if (session?.role === "buyer") {
      navContainer.innerHTML = `
        <a href="${getHomeUrl()}">Khám phá sản phẩm</a>
        <a href="${getRelativePath('buyer/buyer-marketplace.html')}">Bộ sưu tập</a>
        <a href="${getRelativePath('buyer/buyer-custom-brief.html')}">✍️ Đặt làm theo yêu cầu</a>
        <a href="${getRelativePath('buyer/buyer-orders.html')}">📦 Đơn hàng & Proposal</a>
      `;
    } else {
      // Khách vãng lai: Khóa các chức năng yêu cầu tác quyền
      navContainer.innerHTML = `
        <a href="${getHomeUrl()}">Khám phá sản phẩm</a>
        <a href="${getRelativePath('buyer/buyer-marketplace.html')}">Bộ sưu tập</a>
        <a href="#" class="guest-restricted-nav" data-target="brief" title="Đăng nhập để đặt làm theo yêu cầu">✍️ Đặt làm theo yêu cầu <span style="font-size:0.7rem; color:#b91c1c; font-weight:700;">(Khóa)</span></a>
        <a href="#" class="guest-restricted-nav" data-target="orders" title="Đăng nhập để xem đơn hàng">📦 Đơn hàng <span style="font-size:0.7rem; color:#b91c1c; font-weight:700;">(Khóa)</span></a>
      `;
    }

    // Đánh dấu active cho link đang đứng
    navContainer.querySelectorAll("a").forEach(a => {
      const href = a.getAttribute("href");
      if (href && href !== "#" && currentPath.endsWith(href.replace("../", ""))) {
        a.classList.add("active");
      }
    });

    // Bắt sự kiện khi khách vãng lai click vào menu bị khóa
    navContainer.querySelectorAll(".guest-restricted-nav").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        const targetPage = target === "brief" ? getRelativePath("buyer/buyer-custom-brief.html") : getRelativePath("buyer/buyer-orders.html");
        showToast("⚠️ Tác vụ này yêu cầu quyền đăng nhập! Đang chuyển đến trang đăng nhập...", "warning", 3000);
        setTimeout(() => {
          window.location.href = getLoginUrl(targetPage);
        }, 600);
      });
    });
  }

  // 2. CẬP NHẬT KHU VỰC TÀI KHOẢN VÀ KHÔNG GIAN LÀM VIỆC Ở GÓC PHẢI
  if (authContainer) {
    if (session) {
      // ĐÃ ĐĂNG NHẬP: Hiển thị Nút Không gian làm việc tương ứng của Role
      let workspaceButtonHtml = "";
      if (session.role === "admin") {
        workspaceButtonHtml = `
          <a href="${getRoleHomeUrl('admin')}" class="btn btn-primary btn-sm" style="background:#b91c1c; border-color:#991b1b; font-weight:700;" title="Vào không gian quản trị hệ thống">
            👑 Không gian Quản trị viên
          </a>
        `;
      } else if (session.role === "maker") {
        workspaceButtonHtml = `
          <a href="${getRoleHomeUrl('maker')}" class="btn btn-primary btn-sm" style="background:#7e22ce; border-color:#6b21a8; font-weight:700;" title="Vào không gian xưởng sáng tạo">
            🎨 Không gian Người sáng tạo
          </a>
        `;
      } else if (session.role === "moderator") {
        workspaceButtonHtml = `
          <a href="${getRoleHomeUrl('moderator')}" class="btn btn-primary btn-sm" style="background:#b45309; border-color:#92400e; font-weight:700;" title="Vào không gian kiểm duyệt">
            🛡️ Không gian Kiểm duyệt
          </a>
        `;
      } else if (session.role === "buyer") {
        workspaceButtonHtml = `
          <a href="${getRoleHomeUrl('buyer')}" class="btn btn-outline btn-sm" style="font-weight:700;" title="Vào không gian khách hàng">
            🛒 Kênh Khách hàng
          </a>
        `;
      }

      authContainer.innerHTML = `
        <div class="header-account-actions">
          ${workspaceButtonHtml}
          <a href="${cartUrl}" class="header-cart-btn" id="header-cart-btn" title="Xem giỏ hàng & Thanh toán">
            🛒 Giỏ hàng
            <span class="cart-badge" id="header-cart-count">${getCartCount()}</span>
          </a>
          <div class="user-chip" title="Tài khoản: ${session.username || session.name}">
            <span class="user-chip-avatar">${session.name.charAt(0).toUpperCase()}</span>
            <span>${session.name}</span>
            <span class="badge badge-${session.role}">${session.roleLabel}</span>
          </div>
          <button id="btn-logout" class="btn btn-outline btn-sm" title="Đăng xuất khỏi hệ thống">Đăng xuất</button>
        </div>
      `;

      // Xử lý Đăng xuất
      const logoutBtn = document.getElementById("btn-logout");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          clearSession();
          showToast("Đã đăng xuất tài khoản thành công!", "info");
          setTimeout(() => {
            window.location.href = getHomeUrl();
          }, 450);
        });
      }
    } else {
      // KHÁCH VÃNG LAI: Khóa Giỏ hàng và hiển thị nút Đăng nhập
      authContainer.innerHTML = `
        <div class="guest-header-actions">
          <button type="button" class="header-cart-btn" id="header-cart-guest-btn" title="Vui lòng đăng nhập để xem giỏ hàng">
            🛒 Giỏ hàng
          </button>
          <span class="badge guest-status">👤 Khách vãng lai</span>
          <a href="${loginUrl}" class="btn btn-primary btn-sm guest-login-btn">Đăng nhập</a>
        </div>
      `;

      // Bắt click Giỏ hàng của khách vãng lai
      document.getElementById("header-cart-guest-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("⚠️ Khách vãng lai chưa thể dùng giỏ hàng. Vui lòng đăng nhập để tiếp tục!", "warning", 3500);
        setTimeout(() => {
          window.location.href = getLoginUrl(cartUrl);
        }, 600);
      });
    }
  }

  updateHeaderCartBadge();
}

function syncResponsiveHeader() {
  const header = document.querySelector(".site-header");
  const nav = header?.querySelector(".header-nav");
  const auth = header?.querySelector("#header-auth");
  if (!header || !nav || !auth || document.body.dataset.page === "auth-login" || document.getElementById("sidebar")) {
    return;
  }

  document.body.classList.add("has-collapsible-header");

  let toggle = header.querySelector(".header-menu-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "header-menu-toggle";
    toggle.setAttribute("aria-controls", "header-nav header-auth");
    header.insertBefore(toggle, nav);
  }

  const mediaQuery = window.matchMedia("(max-width: 900px)");
  const updateHeaderMenu = (collapsed) => {
    document.body.classList.toggle("header-menu-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Mở thanh điều hướng" : "Đóng thanh điều hướng");
    toggle.title = collapsed ? "Mở thanh điều hướng" : "Đóng thanh điều hướng";
    toggle.textContent = collapsed ? "☰" : "✕";
  };

  updateHeaderMenu(mediaQuery.matches);
  toggle.addEventListener("click", () => {
    updateHeaderMenu(document.body.classList.contains("header-menu-collapsed") ? false : true);
  });
  mediaQuery.addEventListener("change", (event) => updateHeaderMenu(event.matches));
}

function initHomePromo() {
  const promo = document.getElementById("home-promo");
  const closeButton = promo?.querySelector(".home-promo-close");
  if (!promo || !closeButton) return;

  closeButton.focus();
  closeButton.addEventListener("click", () => {
    promo.hidden = true;
    promo.setAttribute("aria-hidden", "true");
    document.body.focus();
  });
  promo.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      closeButton.focus();
    }
  });
}

/**
 * Đánh dấu link active trong Sidebar & điền thông tin Không gian
 */
function syncSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  document.body.classList.add("has-sidebar");

  const header = document.querySelector(".site-header");
  if (header && !header.querySelector(".sidebar-toggle")) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "sidebar-toggle";
    toggle.setAttribute("aria-controls", "sidebar");
    toggle.setAttribute("aria-label", "Thu gọn thanh điều hướng");
    toggle.title = "Thu gọn thanh điều hướng";
    toggle.textContent = "☰";
    header.insertBefore(toggle, header.firstChild);

    let wasMobile = window.matchMedia("(max-width: 900px)").matches;
    let sidebarExpanded = !wasMobile;
    const updateSidebar = () => {
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (header) {
        document.body.style.setProperty(
          "--header-current-height",
          `${header.getBoundingClientRect().height}px`
        );
      }
      sidebar.classList.toggle("mobile-open", isMobile && sidebarExpanded);
      document.body.classList.toggle("sidebar-collapsed", !isMobile && !sidebarExpanded);
      toggle.setAttribute("aria-expanded", String(sidebarExpanded));
      toggle.setAttribute("aria-label", sidebarExpanded ? "Đóng thanh điều hướng" : "Mở thanh điều hướng");
      toggle.title = sidebarExpanded ? "Đóng thanh điều hướng" : "Mở thanh điều hướng";
      toggle.textContent = sidebarExpanded ? "✕" : "☰";
    };
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      if (isMobile !== wasMobile) {
        sidebarExpanded = !isMobile;
        wasMobile = isMobile;
      }
      updateSidebar();
    };

    toggle.addEventListener("click", () => {
      sidebarExpanded = !sidebarExpanded;
      updateSidebar();
    });

    window.addEventListener("resize", handleResize);
    if (header && "ResizeObserver" in window) {
      new ResizeObserver(updateSidebar).observe(header);
    }
    updateSidebar();
  }

  const currentPath = window.location.pathname.toLowerCase();
  sidebar.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const cleanHref = href.split("?")[0].toLowerCase();
    if (currentPath.endsWith(cleanHref) || currentPath.includes(cleanHref.replace("../", ""))) {
      link.classList.add("active");
    }
  });

  const session = getSession();
  const sidebarUser = document.querySelector(".sidebar-footer-user");
  const sidebarRole = document.querySelector(".sidebar-footer-role");
  if (session && sidebarUser) {
    sidebarUser.textContent = session.name;
    if (sidebarRole) sidebarRole.textContent = session.roleLabel;
  }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  initDatabase();
  checkProtectedPages();
  renderHeader();
  syncResponsiveHeader();
  syncSidebar();
  initHomePromo();
  initModals();

  const reason = sessionStorage.getItem("craftlink_redirect_reason");
  if (reason) {
    sessionStorage.removeItem("craftlink_redirect_reason");
    showToast(reason, "warning", 4500);
  }
});
