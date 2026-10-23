/**
 * CraftLink – Buyer Page Controller
 * Marketplace, Chi tiết sản phẩm, Tạo yêu cầu tuỳ biến, Giỏ hàng, Thanh toán trước (VietQR) & Đơn hàng
 */

import { StorageService } from "../modules/storage.js";
import { showToast, openModal, closeModal, formatVND, formatDate } from "../modules/ui-utils.js";
import { validateForm, clearAllErrors } from "../modules/validation.js";
import { aiBriefBuilder } from "../modules/ai-services.js";
import { getSession, addToCart, getCart, updateHeaderCartBadge, getLoginUrl, getAssetPath } from "../main.js";

/**
 * Helper: Kiểm tra nếu là khách vãng lai thì chặn và chuyển hướng sang login
 */
function guardGuestAction(actionName = "thực hiện tác vụ này") {
  const session = getSession();
  if (!session) {
    showToast(`⚠️ Bạn đang là khách vãng lai! Vui lòng đăng nhập để ${actionName}.`, "warning", 3500);
    setTimeout(() => {
      window.location.href = getLoginUrl();
    }, 1000);
    return false;
  }
  return true;
}

/* ===================================================================
   1. MARKETPLACE
   =================================================================== */
export function initMarketplace() {
  const grid = document.getElementById("listing-grid");
  const catFilter = document.getElementById("cat-filter");
  const searchInput = document.getElementById("mp-search");

  const categories = StorageService.getList("categories");
  let listings = StorageService.getList("listings").filter(l => l.status === "active");
  let activeCat = "";

  if (catFilter) {
    catFilter.innerHTML = `
      <button class="cat-btn active" data-cat="">✨ Tất cả danh mục</button>
      ${categories.map(c => `
        <button class="cat-btn" data-cat="${c.id}">${c.icon} ${c.name}</button>
      `).join("")}
    `;

    catFilter.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;
      catFilter.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCat = btn.dataset.cat;
      renderListings();
    });
  }

  function renderListings() {
    if (!grid) return;

    let filtered = [...listings];
    if (activeCat) {
      filtered = filtered.filter(l => l.category === activeCat);
    }

    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (keyword) {
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(keyword) ||
        l.description.toLowerCase().includes(keyword) ||
        l.maker.toLowerCase().includes(keyword) ||
        (l.tags && l.tags.some(t => t.toLowerCase().includes(keyword)))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🔍</div>
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác xem sao nhé!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="card product-card" data-id="${item.id}">
        <div class="product-media">
          <img src="${getAssetPath(item.thumbnail)}" alt="${item.title}" loading="lazy" />
          ${item.customisable ? '<span class="badge badge-custom badge-overlay">✨ Tùy biến được</span>' : ''}
        </div>
        <div class="product-body">
          <div class="maker-name">bởi ${item.maker}</div>
          <h3 class="product-title">${item.title}</h3>
          <div class="product-footer">
            <span class="price">${formatVND(item.price)}</span>
            <span class="rating">⭐ ${item.rating} (${item.reviewCount || 0})</span>
          </div>
          <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
            <button class="btn btn-outline btn-sm btn-quick-cart" data-id="${item.id}" style="flex:1;" title="Thêm vào giỏ">
              🛒 Thêm giỏ
            </button>
            <button class="btn btn-primary btn-sm btn-quick-buy" data-id="${item.id}" style="flex:1;">
              ⚡ Mua ngay
            </button>
          </div>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        const id = card.dataset.id;
        const isBuyerDir = window.location.pathname.includes("/buyer/");
        const detailUrl = isBuyerDir ? `product-detail.html?id=${id}` : `buyer/product-detail.html?id=${id}`;
        window.location.href = detailUrl;
      });
    });

    // Thêm nhanh vào giỏ hàng: kiểm tra khách vãng lai
    grid.querySelectorAll(".btn-quick-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!guardGuestAction("thêm sản phẩm vào giỏ hàng")) return;
        const id = btn.dataset.id;
        const item = listings.find(l => l.id === id);
        if (item) {
          addToCart(item, 1);
        }
      });
    });

    // Mua ngay & dẫn tới thanh toán: kiểm tra khách vãng lai
    grid.querySelectorAll(".btn-quick-buy").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!guardGuestAction("mua hàng và thanh toán")) return;
        const id = btn.dataset.id;
        const item = listings.find(l => l.id === id);
        if (item) {
          addToCart(item, 1);
          const isBuyerDir = window.location.pathname.includes("/buyer/");
          window.location.href = isBuyerDir ? "cart.html" : "buyer/cart.html";
        }
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderListings();
    });
  }

  renderListings();
}

/* ===================================================================
   2. CHI TIẾT SẢN PHẨM
   ================================================================== */
export function initProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "lst-001";
  const listings = StorageService.getList("listings");
  const product = listings.find(l => l.id === id) || listings[0];

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Sản phẩm không tồn tại</h3>
        <p><a href="buyer-marketplace.html" class="btn btn-primary">Quay lại Marketplace</a></p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="product-detail-layout">
      <div class="detail-gallery">
        <img src="${getAssetPath(product.thumbnail)}" alt="${product.title}" class="detail-main-img" />
      </div>
      <div class="detail-info">
        <div class="detail-maker-badge">
          <span>🏛️ Nghệ nhân:</span>
          <strong>${product.maker}</strong>
          ${product.customisable ? '<span class="badge badge-custom">Nhận chế tác theo yêu cầu</span>' : ''}
        </div>

        <h1>${product.title}</h1>
        <div class="detail-price">${formatVND(product.price)}</div>

        <div class="rating" style="font-size: 0.95rem;">
          ⭐ <strong>${product.rating}</strong> trên 5 · ${product.reviewCount || 100} đánh giá chân thực từ khách hàng
        </div>

        <div class="detail-desc">
          <p>${product.description}</p>
          ${product.customOptions ? `<p style="margin-top:0.75rem; color:var(--clr-primary); font-weight:500;">🎨 <strong>Khả năng tùy biến:</strong> ${product.customOptions}</p>` : ''}
        </div>

        <div class="specs-grid">
          <div class="specs-item">
            <dt>Chất liệu</dt>
            <dd>${product.categoryName || "Thủ công cao cấp"}</dd>
          </div>
          <div class="specs-item">
            <dt>Thời gian chế tác</dt>
            <dd>5 - 10 ngày</dd>
          </div>
          <div class="specs-item">
            <dt>Thanh toán trước (QR)</dt>
            <dd>Miễn phí giao hàng toàn quốc</dd>
          </div>
          <div class="specs-item">
            <dt>Cam kết</dt>
            <dd>100% làm bằng tay</dd>
          </div>
        </div>

        <!-- SỐ LƯỢNG & GHI CHÚ TÙY BIẾN -->
        <div style="background:#faf6f0; padding:1.25rem; border-radius:var(--radius); margin-top:0.5rem;">
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:0.75rem;">
            <label style="font-weight:600; font-size:0.9rem;">Số lượng:</label>
            <div class="cart-qty-controls">
              <button class="cart-qty-btn" id="detail-qty-minus">-</button>
              <span class="cart-qty-val" id="detail-qty-val">1</span>
              <button class="cart-qty-btn" id="detail-qty-plus">+</button>
            </div>
          </div>
          ${product.customisable ? `
            <div class="form-group" style="margin-bottom:0;">
              <label for="detail-custom-note" style="font-size:0.85rem;">Ghi chú khắc tên / yêu cầu tùy biến riêng:</label>
              <input type="text" id="detail-custom-note" class="form-control" placeholder="VD: Khắc tên 'Lan & Điệp', chọn men rêu..." style="background:#fff;" />
            </div>
          ` : ''}
        </div>

        <!-- CÁC NÚT THAO TÁC -->
        <div style="display: flex; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap;">
          <button id="btn-add-to-cart" class="btn btn-outline btn-lg" style="flex:1;">
            🛒 Thêm vào giỏ hàng
          </button>
          <button id="btn-buy-now-qr" class="btn btn-primary btn-lg" style="flex:1.2;">
            ⚡ Quét QR Thanh toán trước
          </button>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 0.25rem;">
          <button id="btn-create-custom-brief" class="btn btn-outline btn-sm" style="flex:1;">
            ✍️ Gửi yêu cầu tùy biến mẫu riêng
          </button>
          <button id="btn-save-favorite" class="btn btn-outline btn-sm">
            ♡ Lưu yêu thích
          </button>
        </div>

        <div style="background:#fdfaf6; border:1px dashed var(--clr-border); padding:0.85rem; border-radius:var(--radius); font-size:0.825rem; color:var(--clr-text-muted); margin-top:0.75rem;">
          🔒 <strong>Chính sách phân quyền:</strong> Khách vãng lai được tự do xem sản phẩm. Để đặt hàng, lưu giỏ hoặc yêu cầu tùy biến, vui lòng đăng nhập tài khoản.
        </div>
      </div>
    </div>
  `;

  let currentQty = 1;
  const qtyVal = document.getElementById("detail-qty-val");
  document.getElementById("detail-qty-minus")?.addEventListener("click", () => {
    if (currentQty > 1) {
      currentQty--;
      qtyVal.textContent = currentQty;
    }
  });
  document.getElementById("detail-qty-plus")?.addEventListener("click", () => {
    currentQty++;
    qtyVal.textContent = currentQty;
  });

  // Thêm vào giỏ: Chặn khách vãng lai
  document.getElementById("btn-add-to-cart")?.addEventListener("click", () => {
    if (!guardGuestAction("thêm sản phẩm vào giỏ hàng")) return;
    const customNote = document.getElementById("detail-custom-note")?.value.trim() || "";
    addToCart(product, currentQty, customNote);
  });

  // Mua ngay & Quét QR Thanh toán: Chặn khách vãng lai
  document.getElementById("btn-buy-now-qr")?.addEventListener("click", () => {
    if (!guardGuestAction("đặt hàng và thanh toán")) return;
    const customNote = document.getElementById("detail-custom-note")?.value.trim() || "";
    addToCart(product, currentQty, customNote);
    window.location.href = "checkout.html";
  });

  // Tạo brief tùy biến: Chặn khách vãng lai
  document.getElementById("btn-create-custom-brief")?.addEventListener("click", () => {
    if (!guardGuestAction("tạo yêu cầu chế tác theo mong muốn")) return;
    window.location.href = `buyer-custom-brief.html?refId=${product.id}&title=${encodeURIComponent(product.title)}&cat=${product.category}`;
  });

  // Lưu yêu thích: Chặn khách vãng lai
  document.getElementById("btn-save-favorite")?.addEventListener("click", () => {
    if (!guardGuestAction("lưu sản phẩm vào mục Yêu thích")) return;
    showToast("Đã lưu sản phẩm vào mục Yêu thích của bạn!", "success");
  });
}

/* ===================================================================
   3. GIỎ HÀNG (SHOPPING CART)
   =================================================================== */
export function initCartPage() {
  const container = document.getElementById("cart-items-container");
  const summaryBox = document.getElementById("order-summary-box");
  if (!container) return;

  function renderCart() {
    let cart = getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🛒</div>
          <h3>Giỏ hàng của bạn đang trống</h3>
          <p>Hãy khám phá các tác phẩm thủ công độc đáo và thêm vào giỏ nhé!</p>
          <a href="buyer-marketplace.html" class="btn btn-primary">Khám phá Marketplace ngay</a>
        </div>
      `;
      if (summaryBox) summaryBox.style.display = "none";
      return;
    }

    if (summaryBox) summaryBox.style.display = "block";

    container.innerHTML = cart.map((item, index) => `
      <div class="cart-item" data-index="${index}">
        <img src="${getAssetPath(item.thumbnail)}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-maker">Nghệ nhân: ${item.maker}</div>
          <h4 class="cart-item-title">${item.title}</h4>
          ${item.customNote ? `<div style="font-size:0.8rem; color:var(--clr-primary); margin-top:0.2rem;">✍️ Yêu cầu: "${item.customNote}"</div>` : ''}
          <div class="cart-item-price">${formatVND(item.price)}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn btn-cart-minus" data-index="${index}">-</button>
          <span class="cart-qty-val">${item.quantity || 1}</span>
          <button class="cart-qty-btn btn-cart-plus" data-index="${index}">+</button>
        </div>
        <div style="font-weight:700; color:var(--clr-primary); min-width:110px; text-align:right;">
          ${formatVND((item.price || 0) * (item.quantity || 1))}
        </div>
        <button class="btn btn-outline btn-sm btn-cart-remove" data-index="${index}" style="border:none; color:var(--clr-danger);" title="Xóa khỏi giỏ">
          ✕
        </button>
      </div>
    `).join("");

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const shippingFee = 0;
    const total = subtotal + shippingFee;

    const subtotalEl = document.getElementById("summary-subtotal");
    const totalEl = document.getElementById("summary-total");
    if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
    if (totalEl) totalEl.textContent = formatVND(total);

    container.querySelectorAll(".btn-cart-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        if (cart[idx].quantity > 1) {
          cart[idx].quantity--;
        } else {
          cart.splice(idx, 1);
        }
        StorageService.set("cart", cart);
        updateHeaderCartBadge();
        renderCart();
      });
    });

    container.querySelectorAll(".btn-cart-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        cart[idx].quantity = (cart[idx].quantity || 1) + 1;
        StorageService.set("cart", cart);
        updateHeaderCartBadge();
        renderCart();
      });
    });

    container.querySelectorAll(".btn-cart-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        cart.splice(idx, 1);
        StorageService.set("cart", cart);
        updateHeaderCartBadge();
        renderCart();
        showToast("Đã xóa sản phẩm khỏi giỏ hàng", "info");
      });
    });
  }

  // Nút Tiến hành Thanh toán: Kiểm tra khách vãng lai
  document.getElementById("btn-proceed-checkout")?.addEventListener("click", () => {
    if (!guardGuestAction("tiến hành thanh toán đơn hàng")) return;
    window.location.href = "checkout.html";
  });

  renderCart();
}

/* ===================================================================
   4. THANH TOÁN TRƯỚC & QUÉT MÃ QR (PREPAYMENT & VIETQR)
   =================================================================== */
export function initCheckoutPage() {
  const cart = getCart();
  const session = getSession();

  if (cart.length === 0) {
    showToast("Giỏ hàng của bạn đang trống!", "warning");
    setTimeout(() => {
      window.location.href = "cart.html";
    }, 800);
    return;
  }

  if (session) {
    const nameInput = document.getElementById("order-customer-name");
    const emailInput = document.getElementById("order-customer-email");
    if (nameInput) nameInput.value = session.name || "";
    if (emailInput) emailInput.value = session.email || "";
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const depositAmount = Math.round(totalAmount * 0.5);

  const orderCode = "CL" + Math.floor(100000 + Math.random() * 900000);

  let currentPaymentMode = "qr_full";
  let amountToPay = totalAmount;

  function updatePaymentDisplay() {
    amountToPay = currentPaymentMode === "qr_deposit" ? depositAmount : totalAmount;

    document.querySelectorAll(".pay-amount-label").forEach(el => {
      el.textContent = formatVND(amountToPay);
    });

    const bankAccount = "QRGD000103818151801";
    const transferMemo = `CRAFTLINK ${orderCode}`;

    const memoEl = document.getElementById("qr-memo-text");
    if (memoEl) memoEl.textContent = transferMemo;

    const accEl = document.getElementById("qr-acc-text");
    if (accEl) accEl.textContent = bankAccount;
  }

  document.querySelectorAll(".payment-method-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".payment-method-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      currentPaymentMode = card.dataset.method;

      const qrContainer = document.getElementById("qr-payment-box");
      if (currentPaymentMode === "cod") {
        if (qrContainer) qrContainer.style.display = "none";
      } else {
        if (qrContainer) qrContainer.style.display = "block";
        updatePaymentDisplay();
      }
    });
  });

  document.getElementById("btn-copy-acc")?.addEventListener("click", () => {
    navigator.clipboard.writeText("QRGD000103818151801");
    showToast("Đã sao chép số tài khoản: QRGD000103818151801", "success");
  });

  document.getElementById("btn-copy-memo")?.addEventListener("click", () => {
    const memo = document.getElementById("qr-memo-text")?.textContent || "";
    navigator.clipboard.writeText(memo);
    showToast(`Đã sao chép nội dung: ${memo}`, "success");
  });

  document.getElementById("btn-copy-amount")?.addEventListener("click", () => {
    navigator.clipboard.writeText(amountToPay.toString());
    showToast(`Đã sao chép số tiền: ${formatVND(amountToPay)}`, "success");
  });

  document.getElementById("btn-confirm-payment")?.addEventListener("click", () => {
    if (!guardGuestAction("hoàn tất đặt hàng")) return;

    const name = document.getElementById("order-customer-name")?.value.trim() || session?.name || "Khách hàng";
    const phone = document.getElementById("order-customer-phone")?.value.trim();
    const address = document.getElementById("order-customer-address")?.value.trim();
    const note = document.getElementById("order-customer-note")?.value.trim() || "";

    if (!phone || !address) {
      showToast("Vui lòng nhập Số điện thoại và Địa chỉ giao hàng!", "error");
      return;
    }

    let orderStatus = "in_production";
    let statusLabel = "Đang chế tác";
    let paymentStatusLabel = "Đã thanh toán trước 100% qua VietQR";

    if (currentPaymentMode === "qr_deposit") {
      paymentStatusLabel = `Đã cọc 50% qua VietQR (${formatVND(depositAmount)})`;
    } else if (currentPaymentMode === "cod") {
      orderStatus = "proposal_sent";
      statusLabel = "Chờ xác nhận COD";
      paymentStatusLabel = "Thanh toán khi nhận hàng (COD)";
    }

    const newOrder = {
      id: orderCode,
      buyerId: session ? session.id : "usr-buyer-1",
      buyerName: name,
      buyerPhone: phone,
      buyerAddress: address,
      makerId: cart[0].makerId || "usr-maker-1",
      makerName: cart[0].maker || "Xưởng Gốm Bát Tràng",
      title: cart.length === 1 ? cart[0].title : `${cart[0].title} và ${cart.length - 1} món đồ thủ công khác`,
      items: cart,
      totalPrice: totalAmount,
      paidAmount: currentPaymentMode === "cod" ? 0 : amountToPay,
      status: orderStatus,
      statusLabel,
      paymentMethod: currentPaymentMode,
      paymentStatus: paymentStatusLabel,
      message: note ? `Ghi chú đặt hàng: "${note}"` : "Đã thanh toán trước thành công qua mã QR.",
      timeline: "5 - 7 ngày hoàn thiện",
      estimatedDelivery: "7 - 10 ngày tới",
      createdAt: new Date().toISOString()
    };

    StorageService.prepend("orders", newOrder);
    StorageService.set("cart", []);
    updateHeaderCartBadge();

    showToast("🎉 Thanh toán thành công! Nghệ nhân đã nhận đơn và chuẩn bị chế tác.", "success", 5000);

    setTimeout(() => {
      window.location.href = "buyer-orders.html";
    }, 1500);
  });

  updatePaymentDisplay();
}

/* ===================================================================
   5. TẠO YÊU CẦU TUỲ BIẾN (BUYER CUSTOM BRIEF) + AI BRIEF BUILDER
   =================================================================== */
export function initCustomBrief() {
  const form = document.getElementById("brief-form");
  const draftsContainer = document.getElementById("brief-drafts");
  const aiBtn = document.getElementById("btn-ai-brief");
  const aiModal = document.getElementById("ai-modal");
  const aiResult = document.getElementById("ai-result");

  const session = getSession();
  const categories = StorageService.getList("categories");
  const briefs = StorageService.getList("briefs");

  const categorySelect = document.getElementById("category");
  if (categorySelect && categories.length > 0) {
    categorySelect.innerHTML = `
      <option value="">— Chọn danh mục sản phẩm —</option>
      ${categories.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join("")}
    `;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const refTitle = urlParams.get("title");
  const refCat = urlParams.get("cat");
  if (refTitle && form.elements["title"]) {
    form.elements["title"].value = `Đặt làm tùy biến: ${refTitle}`;
  }
  if (refCat && categorySelect) {
    categorySelect.value = refCat;
  }

  function renderDrafts() {
    if (!draftsContainer) return;

    const myBriefs = briefs.filter(b => !session || b.buyerId === session.id || !b.buyerId);
    if (myBriefs.length === 0) {
      draftsContainer.innerHTML = `<p class="text-muted" style="font-size:0.875rem;">Bạn chưa có yêu cầu nào.</p>`;
      return;
    }

    draftsContainer.innerHTML = myBriefs.map(b => `
      <div class="brief-draft-card" data-id="${b.id}">
        <h4>${b.title}</h4>
        <p>${(b.description || "").slice(0, 75)}...</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge badge-${b.status}">${b.status === "draft" ? "Bản nháp" : (b.status === "submitted" ? "Đã gửi maker" : "Đã duyệt")}</span>
          <small class="text-muted">${formatVND(b.budget)}</small>
        </div>
      </div>
    `).join("");

    draftsContainer.querySelectorAll(".brief-draft-card").forEach(card => {
      card.addEventListener("click", () => {
        const b = myBriefs.find(item => item.id === card.dataset.id);
        if (b && form) {
          form.elements["title"].value = b.title || "";
          form.elements["category"].value = b.category || "";
          form.elements["budget"].value = b.budget || "";
          form.elements["description"].value = b.description || "";
          showToast(`Đã nạp thông tin: ${b.title}`, "info");
        }
      });
    });
  }

  renderDrafts();

  if (form) {
    const rules = {
      title: v => (!v ? "Vui lòng nhập tiêu đề yêu cầu" : null),
      category: v => (!v ? "Vui lòng chọn danh mục sản phẩm" : null),
      budget: v => (!v || Number(v) <= 0 ? "Vui lòng nhập ngân sách dự kiến hợp lệ" : null),
      description: v => (v.length < 15 ? "Mô tả chi tiết phải có ít nhất 15 ký tự" : null)
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearAllErrors(form);

      const { isValid } = validateForm(form, rules);
      if (!isValid) return;

      const fd = new FormData(form);
      const categoryId = fd.get("category");
      const categoryObj = categories.find(c => c.id === categoryId);

      const newBrief = {
        id: "br-" + Date.now(),
        buyerId: session ? session.id : "usr-buyer-1",
        buyerName: session ? session.name : "Khách hàng",
        title: fd.get("title").trim(),
        category: categoryId,
        categoryName: categoryObj ? categoryObj.name : "Thủ công",
        budget: Number(fd.get("budget")),
        description: fd.get("description").trim(),
        status: "submitted",
        createdAt: new Date().toISOString(),
        aiMatch: 95
      };

      StorageService.prepend("briefs", newBrief);
      showToast("Yêu cầu tuỳ biến đã được gửi thành công đến các nghệ nhân!", "success", 4000);
      form.reset();
      renderDrafts();

      setTimeout(() => {
        window.location.href = "buyer-orders.html";
      }, 1500);
    });
  }

  if (aiBtn && form) {
    aiBtn.addEventListener("click", async () => {
      const title = form.elements["title"].value.trim();
      const category = form.elements["category"].value;
      const budget = Number(form.elements["budget"].value) || 500000;
      const description = form.elements["description"].value.trim();

      if (!description) {
        showToast("Vui lòng nhập sơ lược mong muốn vào ô 'Mô tả chi tiết' trước để AI phân tích!", "warning");
        return;
      }

      openModal(aiModal);
      aiResult.innerHTML = `
        <div class="ai-loading">
          <div class="ai-spinner"></div>
          <div>
            <strong>AI Brief Builder đang phân tích yêu cầu của bạn...</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:0.35rem;">Đang chuẩn hóa thông số kỹ thuật, vật liệu thủ công & đề xuất mức ngân sách tối ưu</p>
          </div>
        </div>
      `;

      try {
        const result = await aiBriefBuilder({ title, category, budget, description });

        aiResult.innerHTML = `
          <div class="ai-result-box">
            <h4 style="margin-bottom:0.5rem; color:var(--clr-primary);">✨ Kết quả phân tích & Đề xuất tiêu chuẩn:</h4>
            <div style="white-space: pre-line; font-size:0.9rem; line-height:1.6; color:var(--clr-text);">
              ${result.enhancedDescription}
            </div>
            <div style="margin-top:1rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
              ${result.suggestedTags.map(t => `<span class="badge badge-primary"># ${t}</span>`).join("")}
            </div>
            <span class="ai-confidence-badge">Độ tin cậy mô hình: ${(result.confidence * 100).toFixed(0)}% · Tìm thấy ${result.recommendedMakers} nghệ nhân có tay nghề phù hợp</span>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.25rem;">
            <button id="btn-reject-ai" class="btn btn-outline btn-sm">Bỏ qua</button>
            <button id="btn-apply-ai" class="btn btn-primary btn-sm">Áp dụng vào bản Brief</button>
          </div>
        `;

        document.getElementById("btn-reject-ai").addEventListener("click", () => closeModal(aiModal));
        document.getElementById("btn-apply-ai").addEventListener("click", () => {
          form.elements["description"].value = result.enhancedDescription;
          closeModal(aiModal);
          showToast("Đã áp dụng đề xuất của AI vào phần mô tả!", "success");
        });
      } catch (err) {
        aiResult.innerHTML = `<p class="text-danger">Lỗi: ${err.message}</p>`;
      }
    });
  }
}

/* ===================================================================
   6. QUẢN LÝ ĐƠN HÀNG CỦA BUYER
   =================================================================== */
export function initOrders() {
  const container = document.getElementById("orders-list");
  if (!container) return;

  const session = getSession();
  const allOrders = StorageService.getList("orders");
  const myOrders = allOrders.filter(o => !session || o.buyerId === session.id || !o.buyerId);

  if (myOrders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <h3>Bạn chưa có đơn đặt làm hoặc proposal nào</h3>
        <p>Hãy khám phá Marketplace hoặc gửi yêu cầu tùy biến để kết nối cùng các nghệ nhân!</p>
        <a href="buyer-custom-brief.html" class="btn btn-primary">+ Tạo yêu cầu tùy biến mới</a>
      </div>
    `;
    return;
  }

  container.innerHTML = myOrders.map(order => `
    <div class="card" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
        <div>
          <span style="font-size: 0.8rem; color: var(--clr-text-light);">Mã đơn: <strong>${order.id}</strong></span>
          <h3 style="margin-top: 0.2rem;">${order.title}</h3>
          <p class="text-muted" style="font-size: 0.875rem;">🏛️ Nghệ nhân chế tác: <strong>${order.makerName}</strong></p>
        </div>
        <div style="text-align: right;">
          <span class="badge badge-${order.status}">${order.statusLabel || order.status}</span>
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--clr-primary); margin-top: 0.35rem;">
            ${formatVND(order.totalPrice)}
          </div>
          ${order.paymentStatus ? `<div style="font-size:0.775rem; color:var(--clr-success); font-weight:600; margin-top:0.25rem;">✓ ${order.paymentStatus}</div>` : ''}
        </div>
      </div>

      <div style="background: #faf7f2; padding: 0.85rem; border-radius: var(--radius); margin-bottom: 1rem; font-size: 0.9rem;">
        <p><strong>Thời gian hoàn thành dự kiến:</strong> ${order.timeline || "7-10 ngày"} (Dự kiến giao: ${order.estimatedDelivery || "Đang cập nhật"})</p>
        ${order.buyerAddress ? `<p style="margin-top:0.25rem; font-size:0.85rem; color:var(--clr-text-muted);">📍 Giao đến: ${order.buyerAddress} (SĐT: ${order.buyerPhone || "—"})</p>` : ''}
        ${order.message ? `<p style="margin-top: 0.35rem; color: var(--clr-text);"><strong>Lời nhắn:</strong> "${order.message}"</p>` : ''}
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button class="btn btn-outline btn-sm" onclick="alert('Đang mở kênh trao đổi trực tiếp với ${order.makerName}')">💬 Nhắn tin cho Maker</button>
        ${order.status === 'proposal_sent' ? `<button class="btn btn-primary btn-sm" data-accept-order="${order.id}">✓ Chấp nhận báo giá & Quét QR đặt cọc</button>` : ''}
        ${order.status === 'in_production' ? `<button class="btn btn-success btn-sm" data-confirm-received="${order.id}">Xác nhận đã nhận hàng</button>` : ''}
      </div>
    </div>
  `).join("");

  container.querySelectorAll("[data-accept-order]").forEach(btn => {
    btn.addEventListener("click", () => {
      const orderId = btn.dataset.acceptOrder;
      StorageService.update("orders", o => o.id === orderId, {
        status: "in_production",
        statusLabel: "Đang chế tác",
        paymentStatus: "Đã xác nhận cọc qua QR"
      });
      showToast("Đã duyệt báo giá! Đơn hàng được chuyển sang giai đoạn Chế tác.", "success");
      initOrders();
    });
  });

  container.querySelectorAll("[data-confirm-received]").forEach(btn => {
    btn.addEventListener("click", () => {
      const orderId = btn.dataset.confirmReceived;
      StorageService.update("orders", o => o.id === orderId, {
        status: "completed",
        statusLabel: "Hoàn tất"
      });
      showToast("Chúc mừng! Đơn hàng đã hoàn tất thành công.", "success");
      initOrders();
    });
  });
}
