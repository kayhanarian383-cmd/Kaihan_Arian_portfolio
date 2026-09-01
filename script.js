/* ==========================================================================
   Kaihan Arian — Portfolio interactions
   Mobile nav, sticky nav, scroll reveal, active link tracking,
   FAQ accordion, scroll-to-top.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------
     Mobile nav toggle
     -------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
    };
    const openMenu = () => {
      navToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* --------------------------------------------------------------------
     Sticky nav background/shadow on scroll
     -------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const updateNavState = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });

  /* --------------------------------------------------------------------
     Scroll reveal (IntersectionObserver)
     Elements animate bottom-to-top the first time they enter the
     viewport while scrolling down; nothing animates on initial load.
     -------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('show'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver support
    revealEls.forEach((el) => el.classList.add('show'));
  }

  /* --------------------------------------------------------------------
     Active nav link tracking
     -------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.navlinks a');
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
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
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* --------------------------------------------------------------------
     FAQ accordion
     -------------------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      item.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* --------------------------------------------------------------------
     Scroll to top
     -------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 480);
    };
    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }
});
