/**
 * CraftLink – Form Validation
 * Kiểm tra tính hợp lệ biểu mẫu và hiển thị thông báo lỗi inline
 */

export function validateForm(form, rules) {
  let isValid = true;
  const errors = {};

  for (const [fieldName, validateFn] of Object.entries(rules)) {
    const field = form.elements[fieldName];
    if (!field) continue;

    const value = field.value ? field.value.trim() : "";
    const errorMsg = validateFn(value, form);

    if (errorMsg) {
      isValid = false;
      errors[fieldName] = errorMsg;
      showFieldError(field, errorMsg);
    } else {
      clearFieldError(field);
    }
  }

  return { isValid, errors };
}

export function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add("input-error");

  const errorSpan = document.createElement("span");
  errorSpan.className = "field-error";
  errorSpan.textContent = message;

  if (field.parentElement) {
    field.parentElement.appendChild(errorSpan);
  }
}

export function clearFieldError(field) {
  field.classList.remove("input-error");
  if (field.parentElement) {
    const existing = field.parentElement.querySelector(".field-error");
    if (existing) existing.remove();
  }
}

export function clearAllErrors(form) {
  form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
  form.querySelectorAll(".field-error").forEach((el) => el.remove());
}
