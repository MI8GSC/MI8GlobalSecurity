document.addEventListener("DOMContentLoaded", function () {
  // ===== PILLAR NAVIGATION =====
  const pillarItems = document.querySelectorAll(".pillar_nav_item");
  const detailCards = document.querySelectorAll(".pillar_detail");

  pillarItems.forEach((item) => {
    item.addEventListener("click", function () {
      const pillarId = this.getAttribute("data-pillar");

      // Remove active class from all items and cards
      pillarItems.forEach((i) => i.classList.remove("active"));
      detailCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked item and corresponding card
      this.classList.add("active");
      document
        .querySelector(`[data-detail="${pillarId}"]`)
        .classList.add("active");
    });
  });

  // ===== MOBILE MENU TOGGLE =====
  const mobileToggle = document.querySelector(".mobile_menu_toggle");
  const navMenu = document.querySelector(".nav_menu");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // ===== ADVISOR SLIDER =====
  const advisorSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll(".advisor_card"),
    dots: document.querySelectorAll(".slider_dot"),
    autoPlayInterval: null,

    init() {
      // Only initialize if slider exists on page
      if (this.slides.length === 0) return;

      const prevBtn = document.querySelector(".slider_prev");
      const nextBtn = document.querySelector(".slider_next");

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => this.prev());
        nextBtn.addEventListener("click", () => this.next());
      }

      this.dots.forEach((dot, index) => {
        dot.addEventListener("click", () => this.goToSlide(index));
      });

      // Auto-advance every 8 seconds
      this.autoPlayInterval = setInterval(() => this.next(), 8000);

      // Pause auto-play on hover
      const sliderContainer = document.querySelector(".advisors_slider");
      if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", () =>
          this.pauseAutoPlay()
        );
        sliderContainer.addEventListener("mouseleave", () =>
          this.resumeAutoPlay()
        );
      }
    },

    goToSlide(index) {
      this.slides[this.currentSlide].classList.remove("active");
      this.dots[this.currentSlide].classList.remove("active");

      this.currentSlide = index;

      this.slides[this.currentSlide].classList.add("active");
      this.dots[this.currentSlide].classList.add("active");
    },

    next() {
      const nextSlide = (this.currentSlide + 1) % this.slides.length;
      this.goToSlide(nextSlide);
    },

    prev() {
      const prevSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevSlide);
    },

    pauseAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
    },

    resumeAutoPlay() {
      this.autoPlayInterval = setInterval(() => this.next(), 8000);
    },
  };

  // Initialize advisor slider
  advisorSlider.init();

  // ===== SMOOTH SCROLL FOR NAVIGATION =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });
});
