/**
 * Hetch - Custom Script
 * Handles Lucide icons, Sticky Nav, and Marquee effects
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // 2. Initialize WOW.js
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  // 2. Sticky Navigation Logic
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.offsetTop;

  window.addEventListener("scroll", function () {
    if (window.scrollY > headerHeight) {
      mainNav.classList.add("sticky-nav");
    } else {
      mainNav.classList.remove("sticky-nav");
    }
  });

  // 3. Simple Marquee Logic (if more complex than CSS)
  // The marquee is handled via CSS animation, but we can pause it on hover
  const marqueeContent = document.querySelector(".marquee-content");
  if (marqueeContent) {
    marqueeContent.addEventListener("mouseenter", () => {
      marqueeContent.style.animationPlayState = "paused";
    });
    marqueeContent.addEventListener("mouseleave", () => {
      marqueeContent.style.animationPlayState = "running";
    });
  }

  // 4. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target && this.getAttribute("href") !== "#") {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // 5. Active Link Highlighting
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 6. Form Submission
  const form = document.getElementById("form");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "df4f3d82-fbc1-4633-b6a8-8f5efbf6d4bd");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your message has been sent.");
        form.reset();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});
