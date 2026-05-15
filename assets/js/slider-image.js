// ========================================
// بيانات الـ Slides (مجموعات الصور)
// ========================================
const slides = [
  // المجموعة الأولى (الصور الحالية)
  [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
  ],
  // المجموعة الثانية
  [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
    "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
  ],
  // المجموعة الثالثة
  [
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800",
  ],
];

// ========================================
// المتغيرات والعناصر
// ========================================
let currentSlide = 0;
const gridContainer = document.getElementById("gridContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");

const gridItems = [
  document.querySelector(".luxurious-villa-showcase"),
  document.querySelector(".beachside-relaxation-frame"),
  document.querySelector(".oceanview-pathway-display"),
  document.querySelector(".infinity-paradise-section"),
  document.querySelector(".tropical-resort-panorama"),
];

// ========================================
// إنشاء Indicators
// ========================================
function createIndicators() {
  indicatorsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const indicator = document.createElement("button");
    indicator.className = "slider-indicator";
    indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });
}

// ========================================
// تحديث الصور
// ========================================
function updateSlide(slideIndex) {
  // إضافة تأثير الانتقال
  gridContainer.classList.add("transitioning");

  setTimeout(() => {
    // تحديث background-image لكل عنصر
    slides[slideIndex].forEach((imageUrl, index) => {
      if (gridItems[index]) {
        gridItems[index].style.backgroundImage = `url("${imageUrl}")`;
      }
    });

    // إزالة تأثير الانتقال
    setTimeout(() => {
      gridContainer.classList.remove("transitioning");
    }, 50);
  }, 200);

  // تحديث Indicators
  updateIndicators();

  // تحديث حالة الأزرار
  updateButtons();
}

// ========================================
// تحديث Indicators
// ========================================
function updateIndicators() {
  const indicators = indicatorsContainer.querySelectorAll(".slider-indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

// ========================================
// تحديث حالة الأزرار
// ========================================
function updateButtons() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
}

// ========================================
// الانتقال إلى Slide معين
// ========================================
function goToSlide(index) {
  if (index >= 0 && index < slides.length) {
    currentSlide = index;
    updateSlide(currentSlide);
  }
}

// ========================================
// التنقل للأمام والخلف
// ========================================
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateSlide(currentSlide);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide(currentSlide);
  }
}

// ========================================
// Event Listeners
// ========================================
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// دعم لوحة المفاتيح
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  }
});

// دعم السحب على الشاشات اللمسية (اختياري)
let touchStartX = 0;
let touchEndX = 0;

gridContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

gridContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    nextSlide();
  }
  if (touchEndX - touchStartX > 50) {
    prevSlide();
  }
}

// ========================================
// التهيئة الأولية
// ========================================
createIndicators();
updateButtons();
