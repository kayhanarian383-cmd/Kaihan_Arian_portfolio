/* ==========================================================================
   Kaihan Arian — Portfolio interactions

   Features:
   - Mobile navigation
   - Sticky navigation
   - Scroll reveal
   - Active navigation link tracking
   - FAQ accordion
   - Scroll-to-top button
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================================
     Reduced Motion
     ======================================================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ========================================================================
     Mobile Navigation
     ======================================================================== */

  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {

    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
    };

    const openMenu = () => {
      navToggle.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("open");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close mobile menu when clicking a link */

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    /* Close mobile menu with Escape */

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  }


  /* ========================================================================
     Sticky Navigation
     ======================================================================== */

  const nav = document.querySelector(".nav");

  const updateNavState = () => {

    if (!nav) return;

    nav.classList.toggle(
      "scrolled",
      window.scrollY > 12
    );
  };

  updateNavState();

  window.addEventListener(
    "scroll",
    updateNavState,
    { passive: true }
  );


  /* ========================================================================
     Scroll Reveal
     ======================================================================== */

  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {

    revealEls.forEach((el) => {
      el.classList.add("show");
    });

  } else if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.15
      }
    );

    revealEls.forEach((el) => {
      revealObserver.observe(el);
    });

  } else {

    /* Fallback */

    revealEls.forEach((el) => {
      el.classList.add("show");
    });
  }


  /* ========================================================================
     Active Navigation Link Tracking
     ======================================================================== */

  const navLinks = document.querySelectorAll(".navlinks a");

  const sections = Array.from(navLinks)
    .map((link) => {

      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) {
        return null;
      }

      return document.querySelector(href);
    })
    .filter(Boolean);


  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const setActiveLink = (id) => {

      navLinks.forEach((link) => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );

      });
    };


    const sectionObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }

        });

      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
      }
    );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* ========================================================================
     FAQ Accordion
     ======================================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    item.addEventListener("click", () => {

      const isOpen =
        item.getAttribute("aria-expanded") === "true";


      /* Close all FAQ items */

      faqItems.forEach((faq) => {

        faq.setAttribute(
          "aria-expanded",
          "false"
        );

      });


      /* Open clicked FAQ if it was closed */

      if (!isOpen) {

        item.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  /* ========================================================================
     Scroll To Top
     ======================================================================== */

  const scrollTopBtn =
    document.getElementById("scrollTop");


  if (scrollTopBtn) {

    const toggleScrollTop = () => {

      scrollTopBtn.classList.toggle(
        "show",
        window.scrollY > 480
      );

    };


    toggleScrollTop();


    window.addEventListener(
      "scroll",
      toggleScrollTop,
      { passive: true }
    );


    scrollTopBtn.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion
            ? "auto"
            : "smooth"
        });

      }
    );

  }

});