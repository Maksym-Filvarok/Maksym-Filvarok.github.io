document.addEventListener("DOMContentLoaded", () => {
  // Swiper
  const aboutSwiperElement = document.querySelector(".aboutSwiper");

  if (aboutSwiperElement) {
    new Swiper(".aboutSwiper", {
      loop: true,
      speed: 700,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: {
        el: ".about-section__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".about-section__next",
        prevEl: ".about-section__prev",
      },
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        0: {
          spaceBetween: 16,
        },
        768: {
          spaceBetween: 24,
        },
      },
    });
  }

  // Burger menu
  const burger = document.querySelector(".hero__burger");
  const menu = document.querySelector(".hero__nav-links");
  const menuLinks = document.querySelectorAll(".hero__nav-link");

  if (burger && menu) {
    const openMenu = () => {
      burger.classList.add("is-active");
      menu.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      burger.classList.remove("is-active");
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    burger.addEventListener("click", () => {
      const isOpen = menu.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) closeMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 992 &&
        menu.classList.contains("is-open") &&
        !e.target.closest(".hero__nav")
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) closeMenu();
    });
  }

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top");

  if (scrollTopBtn) {
    const toggleScrollButton = () => {
      scrollTopBtn.classList.toggle("is-visible", window.scrollY > 300);
    };

    let boltTimeout = null;

    window.addEventListener("scroll", toggleScrollButton, { passive: true });
    toggleScrollButton();

    scrollTopBtn.addEventListener("click", () => {
      scrollTopBtn.classList.add("is-bolt");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      clearTimeout(boltTimeout);
      boltTimeout = setTimeout(() => {
        scrollTopBtn.classList.remove("is-bolt");
      }, 450);
    });
  }
});