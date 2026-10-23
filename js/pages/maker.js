/**
 * CraftLink – Maker Page Controller
 * Quản lý Listing, Hộp thư brief tuỳ biến & Soạn thảo Proposal
 */

import { StorageService } from "../modules/storage.js";
import { showToast, openModal, closeModal, formatVND, formatDate } from "../modules/ui-utils.js";
import { aiStyleMatcher } from "../modules/ai-services.js";
import { getSession, getAssetPath } from "../main.js";

/* ===================================================================
   1. QUẢN LÝ LISTING CỦA MAKER
   =================================================================== */
export function initListingManagement() {
  const tbody = document.getElementById("listing-tbody");
  const searchInput = document.getElementById("listing-search");
  const btnAddNew = document.getElementById("btn-add-listing");
  const modalAdd = document.getElementById("modal-add-listing");
  const formAdd = document.getElementById("form-add-listing");

  const session = getSession();
  let listings = StorageService.getList("listings");

  function render(keyword = "") {
    if (!tbody) return;

    let items = listings.filter(l => !session || l.makerId === session.id || !l.makerId);
    if (keyword) {
      items = items.filter(l =>
        l.title.toLowerCase().includes(keyword.toLowerCase()) ||
        l.categoryName?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <p>Chưa có sản phẩm nào trong danh sách.</p>
          </td>
        </tr>
      `;
      return;
    }

    const statusBadge = {
      active: '<span class="badge badge-active">Đang bán</span>',
      pending: '<span class="badge badge-pending">Chờ kiểm duyệt</span>',
      archived: '<span class="badge badge-archived">Đã lưu trữ</span>'
    };

    tbody.innerHTML = items.map(item => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${getAssetPath(item.thumbnail)}" alt="" style="width:48px; height:48px; object-fit:cover; border-radius:var(--radius-sm);" />
            <div>
              <strong>${item.title}</strong>
              <div style="font-size:0.785rem; color:var(--clr-text-light);">${item.categoryName || "Thủ công"}</div>
            </div>
          </div>
        </td>
        <td><strong>${formatVND(item.price)}</strong></td>
        <td>${statusBadge[item.status] || item.status}</td>
        <td>${(item.views || 0).toLocaleString()}</td>
        <td>${item.orders || 0}</td>
        <td>${item.customisable ? '<span class="badge badge-custom">Có</span>' : '<span class="text-muted">Không</span>'}</td>
        <td>
          <div class="table-actions">
            ${item.status !== "archived" ? `
              <button class="btn btn-outline btn-sm" data-action="archive" data-id="${item.id}" title="Lưu trữ tạm thời">Lưu trữ</button>
            ` : `
              <button class="btn btn-primary btn-sm" data-action="restore" data-id="${item.id}">Mở lại</button>
            `}
          </div>
        </td>
      </tr>
    `).join("");

    // Xử lý nút lưu trữ / khôi phục
    tbody.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const newStatus = action === "archive" ? "archived" : "active";

        StorageService.update("listings", l => l.id === id, { status: newStatus });
        listings = StorageService.getList("listings");
        render(searchInput?.value || "");
        showToast(action === "archive" ? "Đã lưu trữ listing!" : "Đã kích hoạt lại sản phẩm!", "success");
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => render(e.target.value));
  }

  // Mở modal thêm sản phẩm mới
  if (btnAddNew && modalAdd) {
    btnAddNew.addEventListener("click", () => {
      openModal(modalAdd);
    });
  }

  // Xử lý thêm sản phẩm mới
  if (formAdd) {
    // Nạp danh mục vào select
    const catSelect = formAdd.elements["category"];
    if (catSelect) {
      const categories = StorageService.getList("categories");
      catSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join("");
    }

    formAdd.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(formAdd);
      const catId = fd.get("category");
      const categories = StorageService.getList("categories");
      const catObj = categories.find(c => c.id === catId);

      const thumbnailsByCategory = {
        "cat-1": ["assets/images/Binh-Hoa-Nghe-Thuat-Bat-Trang-Men-Ngoc.webp", "assets/images/bo-am-chen.jpg"],
        "cat-2": ["assets/images/vi-da-bo-khac-laser.jpg"],
        "cat-3": ["assets/images/vong-tay-bac-925.jpg"],
        "cat-4": ["assets/images/khay-go-oc-cho-sap-ong.jpg"],
        "cat-5": ["assets/images/khan-lua-to-tam.jpg", "assets/images/tui-note-theu.jpg"],
        "cat-6": ["assets/images/nen-thom-sap-ong.jpg"]
      };
      const categoryThumbnails = thumbnailsByCategory[catId] || thumbnailsByCategory["cat-1"];
      const randomThumb = categoryThumbnails[Math.floor(Math.random() * categoryThumbnails.length)];

      const newListing = {
        id: "lst-" + Date.now(),
        title: fd.get("title").trim(),
        maker: session ? session.name : "Xưởng Gốm Bát Tràng",
        makerId: session ? session.id : "usr-maker-1",
        category: catId,
        categoryName: catObj ? catObj.name : "Thủ công",
        price: Number(fd.get("price")),
        currency: "VND",
        thumbnail: randomThumb,
        rating: 5.0,
        reviewCount: 0,
        description: fd.get("description").trim(),
        tags: ["thủ công", catObj ? catObj.slug : "handmade"],
        status: "pending", // Đưa vào hàng chờ duyệt
        customisable: fd.get("customisable") === "on",
        customOptions: fd.get("customOptions") || "Liên hệ trực tiếp nghệ nhân để thống nhất.",
        views: 0,
        orders: 0,
        createdAt: new Date().toISOString()
      };

      // Đưa vào listings
      StorageService.prepend("listings", newListing);

      // Đồng thời tự động đẩy vào hàng chờ duyệt của Admin/Moderator
      const modItem = {
        id: "mod-" + Date.now(),
        listingId: newListing.id,
        title: newListing.title,
        maker: newListing.maker,
        makerId: newListing.makerId,
        type: "Tạo listing mới",
        submittedAt: new Date().toISOString(),
        flags: ["Sản phẩm mới chờ phê duyệt"],
        status: "pending"
      };
      StorageService.prepend("modQueue", modItem);

      listings = StorageService.getList("listings");
      render();
      closeModal(modalAdd);
      formAdd.reset();
      showToast("Sản phẩm mới đã được gửi vào hàng chờ kiểm duyệt của Quản trị viên!", "success", 4000);
    });
  }

  render();
}

/* ===================================================================
   2. HỘP THƯ BRIEF TÙY BIẾN CỦA MAKER + AI STYLE MATCHER
   =================================================================== */
export function initBriefInbox() {
  const container = document.getElementById("brief-list");
  const aiModal = document.getElementById("ai-modal");
  const aiResult = document.getElementById("ai-result");

  const session = getSession();
  let briefs = StorageService.getList("briefs");

  function render() {
    if (!container) return;

    if (briefs.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📥</div>
          <h3>Hộp thư brief hiện đang trống</h3>
          <p>Khi khách hàng gửi yêu cầu tùy biến trên sàn, bạn sẽ nhận được thông báo tại đây.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = briefs.map(b => `
      <div class="card" style="margin-bottom: 1.25rem; border-left: 4px solid var(--clr-primary);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
          <div>
            <span class="badge badge-primary">${b.categoryName || "Thủ công mỹ nghệ"}</span>
            <h3 style="margin-top:0.35rem;">${b.title}</h3>
            <p class="text-muted" style="font-size:0.875rem;">
              👤 Khách hàng: <strong>${b.buyerName}</strong> · Gửi lúc: ${formatDate(b.createdAt)}
            </p>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.2rem; font-weight:700; color:var(--clr-primary);">
              Ngân sách: ${formatVND(b.budget)}
            </div>
            <span class="badge badge-match" style="margin-top:0.25rem;">AI Match: ${b.aiMatch || 92}%</span>
          </div>
        </div>

        <div style="background:#faf7f2; padding:1rem; border-radius:var(--radius); margin-bottom:1rem; font-size:0.9rem; line-height:1.6; white-space:pre-line;">
          ${b.description}
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem; flex-wrap:wrap;">
          <button class="btn btn-outline btn-sm" data-ai-match="${b.id}">
            🤖 AI Phân tích phong cách
          </button>
          <button class="btn btn-primary btn-sm" data-proposal="${b.id}">
            ✍️ Soạn báo giá / Proposal
          </button>
        </div>
      </div>
    `).join("");

    // TÍCH HỢP AI STYLE MATCHER
    container.querySelectorAll("[data-ai-match]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const briefId = btn.dataset.aiMatch;
        const b = briefs.find(item => item.id === briefId);
        if (!b || !aiModal || !aiResult) return;

        openModal(aiModal);
        aiResult.innerHTML = `
          <div class="ai-loading">
            <div class="ai-spinner"></div>
            <div>
              <strong>AI Style Matcher đang so khớp phong cách nghệ nhân...</strong>
              <p class="text-muted" style="font-size:0.85rem; margin-top:0.35rem;">Đang đối chiếu lịch sử hoàn thiện sản phẩm, chất liệu và kỹ thuật của bạn với brief</p>
            </div>
          </div>
        `;

        try {
          const matchResult = await aiStyleMatcher(b, session);

          aiResult.innerHTML = `
            <div class="ai-result-box">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <h4 style="color:var(--clr-primary); margin:0;">Chỉ số phù hợp:</h4>
                <span style="font-size:1.5rem; font-weight:800; color:var(--clr-success);">${matchResult.matchScore}%</span>
              </div>
              <ul style="padding-left:1.25rem; font-size:0.875rem; color:var(--clr-text); line-height:1.6; list-style-type:disc;">
                ${matchResult.reasons.map(r => `<li>${r}</li>`).join("")}
              </ul>
              <div style="background:var(--clr-surface); border:1px solid var(--clr-border); padding:0.75rem; border-radius:var(--radius); margin-top:0.75rem; font-size:0.875rem;">
                💡 <strong>Khuyến nghị từ AI:</strong> ${matchResult.recommendation}
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.25rem;">
              <button class="btn btn-outline btn-sm modal-close" onclick="document.getElementById('ai-modal').classList.remove('open')">Đóng</button>
              <button class="btn btn-primary btn-sm" id="btn-proceed-proposal" data-brief-id="${b.id}">Tiến hành Soạn Proposal ngay</button>
            </div>
          `;

          document.getElementById("btn-proceed-proposal").addEventListener("click", () => {
            closeModal(aiModal);
            window.location.href = `maker-proposal-editor.html?briefId=${b.id}`;
          });
        } catch (err) {
          aiResult.innerHTML = `<p class="text-danger">Lỗi: ${err.message}</p>`;
        }
      });
    });

    // Chuyển sang soạn Proposal
    container.querySelectorAll("[data-proposal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const briefId = btn.dataset.proposal;
        window.location.href = `maker-proposal-editor.html?briefId=${briefId}`;
      });
    });
  }

  render();
}

/* ===================================================================
   3. SOẠN THẢO PROPOSAL BÁO GIÁ CHO BUYER
   =================================================================== */
export function initProposalEditor() {
  const form = document.getElementById("proposal-form");
  const refBox = document.getElementById("proposal-ref");

  const session = getSession();
  const params = new URLSearchParams(window.location.search);
  const briefId = params.get("briefId");
  const briefs = StorageService.getList("briefs");
  const targetBrief = briefs.find(b => b.id === briefId);

  if (targetBrief && refBox) {
    refBox.innerHTML = `
      <div style="background:#faf7f2; border:1px solid var(--clr-border); border-radius:var(--radius); padding:1rem; margin-bottom:1.5rem;">
        <span class="badge badge-primary">${targetBrief.categoryName || "Thủ công"}</span>
        <h3 style="margin: 0.35rem 0;">Yêu cầu: ${targetBrief.title}</h3>
        <p class="text-muted" style="font-size:0.875rem;">Khách hàng: <strong>${targetBrief.buyerName}</strong> · Ngân sách đề xuất: <strong>${formatVND(targetBrief.budget)}</strong></p>
        <p style="font-size:0.875rem; margin-top:0.5rem; line-height:1.5;">${targetBrief.description}</p>
      </div>
    `;

    if (form && form.elements["price"] && targetBrief.budget) {
      form.elements["price"].value = targetBrief.budget;
    }
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const price = Number(fd.get("price"));
      const timeline = fd.get("timeline") || "7 ngày";
      const message = fd.get("message") || "Xưởng rất sẵn lòng thực hiện sản phẩm tùy biến này cho bạn!";

      if (!price || price <= 0) {
        showToast("Vui lòng nhập giá đề xuất hợp lệ!", "error");
        return;
      }

      // Tạo đơn hàng / proposal mới kết nối trực tiếp với Buyer
      const newOrder = {
        id: "ord-" + Date.now(),
        briefId: targetBrief ? targetBrief.id : null,
        buyerId: targetBrief ? targetBrief.buyerId : "usr-buyer-1",
        buyerName: targetBrief ? targetBrief.buyerName : "Khách hàng",
        makerId: session ? session.id : "usr-maker-1",
        makerName: session ? session.name : "Xưởng Gốm Bát Tràng",
        title: targetBrief ? targetBrief.title : "Sản phẩm đặt làm riêng",
        status: "proposal_sent",
        statusLabel: "Đã gửi báo giá",
        totalPrice: price,
        timeline,
        message,
        createdAt: new Date().toISOString(),
        estimatedDelivery: "7-10 ngày tới"
      };

      StorageService.prepend("orders", newOrder);

      // Cập nhật trạng thái brief
      if (targetBrief) {
        StorageService.update("briefs", b => b.id === targetBrief.id, { status: "proposal_sent" });
      }

      showToast("Đã gửi Proposal và báo giá thành công tới khách hàng!", "success", 4000);

      setTimeout(() => {
        window.location.href = "maker-brief-inbox.html";
      }, 1500);
    });
  }
}
