/**
 * CraftLink – UI Utilities
 * Toast notifications, Modal dialogs, Formatter
 */

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
}

/**
 * Hiển thị thông báo Toast
 * @param {string} message - Nội dung thông báo
 * @param {'success'|'error'|'info'|'warning'} type - Loại thông báo
 * @param {number} duration - Thời gian hiển thị (ms)
 */
export function showToast(message, type = "info", duration = 3000) {
  const container = ensureToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  };

  toast.innerHTML = `<span>${iconMap[type] || "•"}</span> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, duration);
}

/**
 * Khởi tạo sự kiện đóng Modal
 */
export function initModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("modal-overlay")) {
        closeModal(modal);
      }
    });

    modal.querySelectorAll(".modal-close, [data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(modal));
    });
  });
}

export function openModal(modalOrId) {
  const modal = typeof modalOrId === "string" ? document.getElementById(modalOrId) : modalOrId;
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

export function closeModal(modalOrId) {
  const modal = typeof modalOrId === "string" ? document.getElementById(modalOrId) : modalOrId;
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

export function formatVND(amount) {
  if (isNaN(amount) || amount === null) return "0 ₫";
  return Number(amount).toLocaleString("vi-VN") + " ₫";
}

export function formatDate(isoString) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return isoString;
  }
}
