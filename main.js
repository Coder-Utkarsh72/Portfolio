/**
 * portfolio/js/main.js
 * ─────────────────────────────────────────────────────
 * Sections:
 *  1. Custom Cursor
 *  2. Scroll Progress Bar
 *  3. Navigation (scroll + active link)
 *  4. Mobile Hamburger Menu
 *  5. Scroll-Reveal Animations
 *  6. Skill Bar Animations
 *  7. Counter Animation (hero stats)
 *  8. Contact Form Handler
 *  9. Parallax Orbs (mouse movement)
 * ─────────────────────────────────────────────────────
 */

/* ── 1. CUSTOM CURSOR ──────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mouseX = -100, mouseY = -100;
  let curX   = -100, curY   = -100;

  /** Track raw mouse position */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /** Enlarge cursor on interactive elements */
  const hoverTargets = [
    'a', 'button',
    '.skill-category', '.project-card', '.edu-card',
    '.contact-link-item', '.achievement-item',
    '.chip', '.tech-pill'
  ].join(',');

  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  /** Click scale effect */
  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

  /** Smooth lerp follow loop */
  function animateCursor() {
    curX += (mouseX - curX) * 0.14;
    curY += (mouseY - curY) * 0.14;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();


/* ── 2. SCROLL PROGRESS BAR ────────────────────────── */
(function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled  = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


/* ── 3. NAVIGATION ─────────────────────────────────── */
(function initNav() {
  const nav      = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  if (!nav) return;

  window.addEventListener('scroll', () => {
    /* Frosted-glass effect after scrolling past 40px */
    nav.classList.toggle('scrolled', window.scrollY > 40);

    /* Highlight active nav link */
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 130) {
        current = sec.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === '#' + current;
      link.style.color = isActive ? 'var(--txt)' : '';
    });
  }, { passive: true });
})();


/* ── 4. MOBILE HAMBURGER MENU ──────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close when a mobile link is tapped */
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ── 5. SCROLL-REVEAL ANIMATIONS ───────────────────── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
})();


/* ── 6. SKILL BAR ANIMATIONS ───────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill      = entry.target;
          const targetPct = fill.dataset.width || '0';
          /* Small delay so the reveal animation plays first */
          setTimeout(() => {
            fill.style.width = targetPct + '%';
          }, 150);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  fills.forEach((fill) => observer.observe(fill));
})();


/* ── 7. COUNTER ANIMATION (hero stats) ─────────────── */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  /**
   * Animate a numeric element from 0 to its target value.
   * Preserves any non-numeric suffix stored in its child <span>.
   */
  function animateCounter(el) {
    /* Extract suffix from inner <span> (e.g. "+", "×") */
    const suffixEl = el.querySelector('span');
    const suffix   = suffixEl ? suffixEl.textContent : '';

    /* Remove the span so we can replace the whole textContent */
    if (suffixEl) suffixEl.remove();

    const rawText = el.textContent.trim();
    const target  = parseFloat(rawText);
    if (isNaN(target)) return;

    const duration  = 1400; /* ms */
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out cubic */
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  statNums.forEach((el) => observer.observe(el));
})();

/* ── 8. CONTACT FORM HANDLER ───────────────────────── */
(function initContactForm() {
  const btn = document.getElementById('formSubmitBtn');
  if (!btn) return;

  // EmailJS load karo
  emailjs.init('nzI67TBspz7aewVg0');

  btn.addEventListener('click', () => {
    const form   = document.getElementById('contactForm');
    const inputs = form ? form.querySelectorAll('input, textarea') : [];
    let   allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = 'rgba(255,80,80,0.6)';
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!allFilled) return;

    const [firstNameEl, lastNameEl, emailEl, subjectEl] = form.querySelectorAll('input');
    const messageEl = form.querySelector('textarea');

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    emailjs.send('service_g8nshdr', 'template_sduilvd', {
      from_name:  firstNameEl.value.trim() + ' ' + lastNameEl.value.trim(),
      from_email: emailEl.value.trim(),
      to_email:   'utkarshchaurasiya7272@gmail.com',
      subject:    subjectEl.value.trim(),
      message:    messageEl.value.trim(),
    })
    .then(() => {
      btn.textContent      = '✓ Message Sent!';
      btn.style.background = '#4cffb0';
      btn.style.color      = '#0a0a0f';
    })
    .catch(() => {
      btn.textContent      = '✕ Failed. Try again';
      btn.style.background = '#ff5050';
      btn.style.color      = '#ffffff';
    })
    .finally(() => {
      setTimeout(() => {
        btn.textContent      = 'Send Message →';
        btn.style.background = '';
        btn.style.color      = '';
        btn.disabled         = false;
        inputs.forEach((input) => (input.value = ''));
      }, 3000);
    });
  });
})();


/* ── 9. PARALLAX ORBS (mouse movement) ─────────────── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth  - 0.5) * 24;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 24;

    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 0.4;
      orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
    });
  }, { passive: true });
})();
