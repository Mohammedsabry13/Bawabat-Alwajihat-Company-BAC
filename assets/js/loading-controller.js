// إعداد وقت شاشة التحميل (بالمللي ثانية)
const LOADING_TIME = 1500;

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreenWrapper");
  const mainContent = document.getElementById("mainContentWrapper");

  // التحقق من وجود العناصر قبل التعامل معها
  if (!loadingScreen) {
    console.warn("Loading screen element not found");
    return;
  }

  // تأخير اختفاء شاشة التحميل
  setTimeout(() => {
    loadingScreen.classList.add("hidden-loading-state");

    if (mainContent) {
      mainContent.classList.add("visible-content-state");
    }

    // إعادة التمرير
    document.body.style.overflow = "auto";
  }, LOADING_TIME);
});
