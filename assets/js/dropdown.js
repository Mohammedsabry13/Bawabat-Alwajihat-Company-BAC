class CustomDropdown {
  constructor(element) {
    this.dropdown = element;
    this.toggle = this.dropdown.querySelector(".custom-dropdown-toggle");
    this.menu = this.dropdown.querySelector(".custom-dropdown-menu");
    this.options = this.dropdown.querySelectorAll(".dropdown-option");
    this.selectedText = this.dropdown.querySelector(".selected-text");
    this.hiddenInput = this.dropdown.querySelector('input[type="hidden"]');
    this.arrow = this.dropdown.querySelector(".dropdown-arrow");

    this.init();
  }

  init() {
    // فتح/إغلاق القائمة
    this.toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // دعم لوحة المفاتيح
    this.toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleMenu();
      }
    });

    // اختيار خيار
    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectOption(option);
      });
    });

    // إغلاق عند الضغط خارج الـ dropdown
    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.closeMenu();
      }
    });

    // إغلاق عند الضغط على ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    const isActive = this.dropdown.classList.contains("active");
    if (isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.dropdown.classList.add("active");
    this.toggle.setAttribute("aria-expanded", "true");
  }

  closeMenu() {
    this.dropdown.classList.remove("active");
    this.toggle.setAttribute("aria-expanded", "false");
  }

  selectOption(option) {
    const value = option.dataset.value;
    const text = option.textContent;

    // تحديث النص المعروض
    this.selectedText.textContent = text;
    this.toggle.classList.remove("placeholder");
    this.toggle.classList.add("selected");

    // تحديث الـ hidden input
    this.hiddenInput.value = value;

    // إزالة التحديد من كل الخيارات
    this.options.forEach((opt) => opt.classList.remove("selected"));

    // تحديد الخيار الحالي
    option.classList.add("selected");

    // إغلاق القائمة
    this.closeMenu();

    // Trigger change event
    this.hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

// تفعيل الـ Dropdown عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const projectDropdown = document.getElementById("projectTypeDropdown");
  if (projectDropdown) {
    new CustomDropdown(projectDropdown);
  }
});
