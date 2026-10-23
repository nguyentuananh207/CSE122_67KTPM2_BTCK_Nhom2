/**
 * CraftLink – Admin & Platform Controller
 * Quản trị viên điều hành: Nắm bắt TOÀN BỘ dữ liệu người dùng, listing, brief, đơn hàng & kiểm duyệt
 */

import { StorageService } from "../modules/storage.js";
import { showToast, openModal, closeModal, formatVND, formatDate } from "../modules/ui-utils.js";
import { aiRevisionSummarizer } from "../modules/ai-services.js";

/* ===================================================================
   1. BẢNG ĐIỀU KHIỂN NỀN TẢNG (PLATFORM DASHBOARD)
   Nắm bắt HẾT các thông tin mà các đối tượng khác nhập và thêm vào
   =================================================================== */
export function initDashboard() {
  const users = StorageService.getList("users");
  const listings = StorageService.getList("listings");
  const briefs = StorageService.getList("briefs");
  const orders = StorageService.getList("orders");
  const modQueue = StorageService.getList("modQueue");
  const reports = StorageService.getList("reports");

  const totalUsers = users.length;
  const totalMakers = users.filter(u => u.role === "maker").length;
  const totalBuyers = users.filter(u => u.role === "buyer").length;
  const totalListings = listings.length;
  const totalBriefs = briefs.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
  const totalCompletedOrders = orders.filter(o => o.status === "completed" || o.status === "in_production").length;
  const pendingMod = modQueue.filter(m => m.status === "pending").length;
  const openReports = reports.filter(r => r.status !== "resolved").length;

  const statMap = {
    "stat-users": totalUsers.toLocaleString(),
    "stat-makers": totalMakers.toLocaleString(),
    "stat-buyers": totalBuyers.toLocaleString(),
    "stat-listings": totalListings.toLocaleString(),
    "stat-briefs": totalBriefs.toLocaleString(),
    "stat-revenue": formatVND(totalRevenue),
    "stat-orders": totalCompletedOrders.toLocaleString(),
    "stat-mod-pending": pendingMod.toLocaleString(),
    "stat-reports": openReports.toLocaleString()
  };

  for (const [id, value] of Object.entries(statMap)) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // Render Danh sách hoạt động mới nhất trên hệ thống
  const activityContainer = document.getElementById("recent-activity-list");
  if (activityContainer) {
    const combinedActivities = [
      ...briefs.slice(0, 3).map(b => ({
        icon: "✍️",
        title: `Khách hàng <strong>${b.buyerName}</strong> đã gửi brief tùy biến: "${b.title}"`,
        meta: `Ngân sách: ${formatVND(b.budget)} · ${formatDate(b.createdAt)}`
      })),
      ...listings.slice(0, 3).map(l => ({
        icon: "📦",
        title: `Nghệ nhân <strong>${l.maker}</strong> đăng sản phẩm: "${l.title}"`,
        meta: `Giá: ${formatVND(l.price)} · Trạng thái: ${l.status === 'active' ? 'Đang bán' : 'Chờ duyệt'}`
      })),
      ...orders.slice(0, 3).map(o => ({
        icon: "🛒",
        title: `Đơn hàng mới giữa <strong>${o.makerName}</strong> và <strong>${o.buyerName}</strong>`,
        meta: `Giá trị: ${formatVND(o.totalPrice)} · ${o.statusLabel || o.status}`
      }))
    ];

    if (combinedActivities.length === 0) {
      activityContainer.innerHTML = `<p class="text-muted">Chưa có hoạt động mới ghi nhận.</p>`;
    } else {
      activityContainer.innerHTML = combinedActivities.map(item => `
        <div class="activity-item">
          <div class="activity-icon">${item.icon}</div>
          <div class="activity-content">
            <div>${item.title}</div>
            <div class="activity-time">${item.meta}</div>
          </div>
        </div>
      `).join("");
    }
  }
}

/* ===================================================================
   2. QUẢN LÝ DANH MỤC SẢN PHẨM
   =================================================================== */
export function initCategoryManagement() {
  let categories = StorageService.getList("categories");
  const listings = StorageService.getList("listings");
  const tbody = document.getElementById("cat-tbody");
  const form = document.getElementById("cat-form");

  function render() {
    if (!tbody) return;

    tbody.innerHTML = categories.map((cat, idx) => {
      const productCount = listings.filter(l => l.category === cat.id).length;
      return `
        <tr>
          <td style="font-size: 1.5rem; text-align: center;">${cat.icon}</td>
          <td><strong>${cat.name}</strong></td>
          <td><code>${cat.slug}</code></td>
          <td><span class="badge badge-primary">${productCount} sản phẩm</span></td>
          <td>${cat.description || "—"}</td>
          <td>
            <button class="btn btn-sm btn-outline" data-delete-cat="${cat.id}">Lưu trữ / Xóa</button>
          </td>
        </tr>
      `;
    }).join("");

    tbody.querySelectorAll("[data-delete-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        const catId = btn.dataset.deleteCat;
        if (confirm("Bạn có chắc chắn muốn lưu trữ danh mục này?")) {
          categories = categories.filter(c => c.id !== catId);
          StorageService.set("categories", categories);
          render();
          showToast("Đã lưu trữ danh mục thành công!", "success");
        }
      });
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get("name").trim();
      const slug = fd.get("slug").trim() || name.toLowerCase().replace(/\s+/g, "-");
      const icon = fd.get("icon").trim() || "🎨";
      const description = fd.get("description").trim() || "";

      if (!name) {
        showToast("Vui lòng nhập tên danh mục!", "error");
        return;
      }

      const newCategory = {
        id: "cat-" + Date.now(),
        name,
        slug,
        icon,
        count: 0,
        description
      };

      categories.unshift(newCategory);
      StorageService.set("categories", categories);
      form.reset();
      render();
      showToast("Đã thêm danh mục sản phẩm mới!", "success");
    });
  }

  render();
}

/* ===================================================================
   3. QUẢN LÝ NGƯỜI DÙNG (TẤT CẢ CÁC ROLE)
   =================================================================== */
export function initUserManagement() {
  let users = StorageService.getList("users");
  const tbody = document.getElementById("user-tbody");
  const searchInput = document.getElementById("user-search");
  const roleFilter = document.getElementById("user-role-filter");

  function render(keyword = "", filterRole = "") {
    if (!tbody) return;

    let items = [...users];
    if (filterRole) {
      items = items.filter(u => u.role === filterRole);
    }
    if (keyword) {
      items = items.filter(u =>
        u.name.toLowerCase().includes(keyword.toLowerCase()) ||
        u.email.toLowerCase().includes(keyword.toLowerCase()) ||
        (u.username && u.username.toLowerCase().includes(keyword.toLowerCase()))
      );
    }

    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Không tìm thấy người dùng phù hợp.</td></tr>`;
      return;
    }

    tbody.innerHTML = items.map(u => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="user-chip-avatar">${u.name.charAt(0).toUpperCase()}</span>
            <div>
              <strong>${u.name}</strong>
              <div style="font-size:0.75rem; color:var(--clr-text-light);">@${u.username || u.email.split('@')[0]}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-${u.role}">${u.roleLabel || u.role}</span></td>
        <td>${u.email}</td>
        <td>${u.phone || "—"}</td>
        <td>
          <span class="badge badge-${u.status}">${u.status === "active" ? "Hoạt động" : "Tạm ngưng"}</span>
        </td>
        <td>${formatDate(u.joinedAt)}</td>
        <td>
          ${u.role !== 'admin' ? `
            <button class="btn btn-sm ${u.status === 'active' ? 'btn-outline' : 'btn-success'}" data-toggle-user="${u.id}">
              ${u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
            </button>
          ` : '<span class="text-muted" style="font-size:0.8rem;">Quản trị viên</span>'}
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll("[data-toggle-user]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.toggleUser;
        users = users.map(u => {
          if (u.id === id) {
            const nextStatus = u.status === "active" ? "suspended" : "active";
            return { ...u, status: nextStatus };
          }
          return u;
        });
        StorageService.set("users", users);
        render(searchInput?.value || "", roleFilter?.value || "");
        showToast("Đã cập nhật trạng thái người dùng thành công!", "success");
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      render(searchInput.value.trim(), roleFilter?.value || "");
    });
  }

  if (roleFilter) {
    roleFilter.addEventListener("change", () => {
      render(searchInput?.value.trim() || "", roleFilter.value);
    });
  }

  render();
}

/* ===================================================================
   4. HÀNG CHỜ KIỂM DUYỆT (MODERATION QUEUE)
   =================================================================== */
export function initModerationQueue() {
  let modQueue = StorageService.getList("modQueue");
  let listings = StorageService.getList("listings");
  const container = document.getElementById("mod-list");

  function render() {
    if (!container) return;

    const pendingItems = modQueue.filter(m => m.status === "pending");
    if (pendingItems.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <h3>Không có mục nào đang chờ kiểm duyệt</h3>
          <p>Tất cả sản phẩm và nội dung đưa lên sàn đã được xét duyệt sạch sẽ!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = pendingItems.map(item => `
      <div class="card" style="margin-bottom: 1.25rem; border-left: 4px solid var(--clr-secondary);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
          <div>
            <span class="badge badge-warning">${item.type}</span>
            <h3 style="margin-top:0.35rem;">${item.title}</h3>
            <p class="text-muted" style="font-size:0.875rem;">
              🏛️ Người gửi: <strong>${item.maker}</strong> · Gửi lúc: ${formatDate(item.submittedAt)}
            </p>
          </div>
          <span class="badge badge-pending">Chờ Admin duyệt</span>
        </div>

        ${item.flags && item.flags.length ? `
          <div style="background:#fee2e2; color:#b91c1c; padding:0.65rem 0.85rem; border-radius:var(--radius-sm); font-size:0.85rem; margin-bottom:1rem;">
            ⚠️ <strong>Lưu ý hệ thống:</strong> ${item.flags.join(", ")}
          </div>
        ` : ''}

        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-danger btn-sm" data-mod-reject="${item.id}">✕ Từ chối</button>
          <button class="btn btn-success btn-sm" data-mod-approve="${item.id}">✓ Phê duyệt & Đăng bán</button>
        </div>
      </div>
    `).join("");

    // Xử lý phê duyệt
    container.querySelectorAll("[data-mod-approve]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.modApprove;
        const item = modQueue.find(m => m.id === id);

        // Đổi trạng thái trong modQueue
        modQueue = modQueue.map(m => m.id === id ? { ...m, status: "approved" } : m);
        StorageService.set("modQueue", modQueue);

        // Kích hoạt listing thành active để hiện trên Marketplace
        if (item && item.listingId) {
          StorageService.update("listings", l => l.id === item.listingId, { status: "active" });
        }

        render();
        showToast("Đã phê duyệt sản phẩm thành công! Sản phẩm đã xuất hiện trên Marketplace.", "success");
      });
    });

    // Xử lý từ chối
    container.querySelectorAll("[data-mod-reject]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.modReject;
        const item = modQueue.find(m => m.id === id);

        modQueue = modQueue.map(m => m.id === id ? { ...m, status: "rejected" } : m);
        StorageService.set("modQueue", modQueue);

        if (item && item.listingId) {
          StorageService.update("listings", l => l.id === item.listingId, { status: "rejected" });
        }

        render();
        showToast("Đã từ chối kiểm duyệt sản phẩm.", "warning");
      });
    });
  }

  render();
}

/* ===================================================================
   5. TRUNG TÂM BÁO CÁO (REPORT CENTER)
   =================================================================== */
export function initReportCenter() {
  let reports = StorageService.getList("reports");
  const tbody = document.getElementById("report-tbody");

  function render() {
    if (!tbody) return;

    if (reports.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Chưa có báo cáo vi phạm nào.</td></tr>`;
      return;
    }

    tbody.innerHTML = reports.map(r => `
      <tr>
        <td><code>${r.id}</code></td>
        <td><span class="badge badge-${r.type}">${r.type === 'listing' ? 'Sản phẩm' : 'Tài khoản'}</span></td>
        <td><strong>${r.targetTitle}</strong></td>
        <td>${r.reason}</td>
        <td><span class="badge badge-${r.status}">${r.status === 'resolved' ? 'Đã xử lý' : 'Đang chờ xử lý'}</span></td>
        <td>
          ${r.status !== 'resolved' ? `
            <button class="btn btn-sm btn-primary" data-resolve-rpt="${r.id}">✓ Đã giải quyết</button>
          ` : '<span class="text-muted">Hoàn tất</span>'}
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll("[data-resolve-rpt]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.resolveRpt;
        reports = reports.map(r => r.id === id ? { ...r, status: "resolved" } : r);
        StorageService.set("reports", reports);
        render();
        showToast("Đã đánh dấu xử lý xong báo cáo vi phạm!", "success");
      });
    });
  }

  render();
}

/* ===================================================================
   6. QUY CHUẨN NỘI DUNG (CONTENT GUIDELINES) + AI REVISION SUMMARIZER
   =================================================================== */
export function initContentGuidelines() {
  let guidelines = StorageService.getList("guidelines");
  const container = document.getElementById("guidelines-list");
  const aiBtn = document.getElementById("btn-ai-summarize");
  const aiModal = document.getElementById("ai-modal");
  const aiResult = document.getElementById("ai-result");

  function render() {
    if (!container) return;

    container.innerHTML = guidelines.map(g => `
      <div class="card" style="margin-bottom: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 style="margin:0;">${g.title}</h3>
          <small class="text-muted">Cập nhật: ${formatDate(g.updatedAt)}</small>
        </div>
        <ul style="padding-left:1.25rem; font-size:0.925rem; line-height:1.7; list-style-type:disc; color:var(--clr-text);">
          ${g.rules.map(r => `<li>${r}</li>`).join("")}
        </ul>
        <div style="margin-top:1rem; display:flex; justify-content:flex-end;">
          <button class="btn btn-outline btn-sm" data-add-rule="${g.id}">+ Thêm quy tắc mới</button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll("[data-add-rule]").forEach(btn => {
      btn.addEventListener("click", () => {
        const gId = btn.dataset.addRule;
        const newRule = prompt("Nhập nội dung quy định / điều khoản mới cho tiêu chuẩn này:");
        if (newRule && newRule.trim()) {
          guidelines = guidelines.map(g => {
            if (g.id === gId) {
              return {
                ...g,
                rules: [...g.rules, newRule.trim()],
                updatedAt: new Date().toISOString()
              };
            }
            return g;
          });
          StorageService.set("guidelines", guidelines);
          render();
          showToast("Đã bổ sung điều khoản mới vào quy chuẩn!", "success");
        }
      });
    });
  }

  // TÍCH HỢP AI REVISION SUMMARIZER
  if (aiBtn) {
    aiBtn.addEventListener("click", async () => {
      if (!aiModal || !aiResult) return;
      openModal(aiModal);

      aiResult.innerHTML = `
        <div class="ai-loading">
          <div class="ai-spinner"></div>
          <div>
            <strong>AI Revision Summarizer đang so khớp và tóm tắt quy chuẩn...</strong>
            <p class="text-muted" style="font-size:0.85rem; margin-top:0.35rem;">Phát hiện các điểm mới, điểm mâu thuẫn và thay đổi ảnh hưởng đến người bán</p>
          </div>
        </div>
      `;

      try {
        const initialRules = [
          "Tối thiểu có 3 ảnh chụp thực tế rõ nét.",
          "Mô tả bắt buộc phải nêu rõ chất liệu chính xác."
        ];
        const currentRules = guidelines.flatMap(g => g.rules);

        const summaryResult = await aiRevisionSummarizer(initialRules, currentRules);

        aiResult.innerHTML = `
          <div class="ai-result-box">
            <h4 style="color:var(--clr-primary); margin-bottom:0.5rem;">📊 Tóm tắt so khớp điều khoản:</h4>
            <p style="font-size:0.925rem; font-weight:600; color:var(--clr-text);">${summaryResult.summary}</p>
            <div style="margin-top:0.75rem;">
              <strong>Các điểm quy tắc đã cập nhật gần đây:</strong>
              <ul style="padding-left:1.25rem; font-size:0.875rem; color:var(--clr-text); line-height:1.6; margin-top:0.35rem;">
                ${summaryResult.added.slice(0, 4).map(r => `<li>${r}</li>`).join("")}
              </ul>
            </div>
            <span class="ai-confidence-badge">Độ chính xác phân tích: ${(summaryResult.confidence * 100).toFixed(0)}% · Trạng thái: Sẵn sàng áp dụng toàn sàn</span>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.25rem;">
            <button class="btn btn-primary btn-sm modal-close" onclick="document.getElementById('ai-modal').classList.remove('open')">Đã rõ & Áp dụng</button>
          </div>
        `;
      } catch (err) {
        aiResult.innerHTML = `<p class="text-danger">Lỗi: ${err.message}</p>`;
      }
    });
  }

  render();
}
