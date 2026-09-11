/* =============================================================
   Maribel Sosa — Portfolio
   Microinteractions & scroll reveals
   ============================================================= */

(() => {
  'use strict';

  // ----------------------------------------------------------
  // Custom cursor
  // ----------------------------------------------------------
  const cursor = document.querySelector('.cursor');
  const trail = document.querySelector('.cursor-trail');
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (cursor && trail && supportsHover && window.innerWidth > 900) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth trail
    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    // Hide on leave window
    document.addEventListener('mouseleave', () => {
      cursor.classList.add('is-hidden');
      trail.classList.add('is-hidden');
    });
    document.addEventListener('mouseenter', () => {
      cursor.classList.remove('is-hidden');
      trail.classList.remove('is-hidden');
    });

    // Scale on links
    const interactiveSelectors = 'a, button, [data-link], .project, .nav__link';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hover');
        trail.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hover');
        trail.classList.remove('is-hover');
      });
    });
  } else if (cursor && trail) {
    cursor.style.display = 'none';
    trail.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ----------------------------------------------------------
  // Nav background on scroll
  // ----------------------------------------------------------
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----------------------------------------------------------
  // Scroll reveal (Intersection Observer)
  // ----------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ----------------------------------------------------------
  // Smooth scroll for in-page anchors
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ----------------------------------------------------------
  // Update copyright year + last updated
  // ----------------------------------------------------------
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach((el) => { el.textContent = new Date().getFullYear(); });

  // ----------------------------------------------------------
  // Subtle parallax on hero scroll indicator (optional)
  // ----------------------------------------------------------
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < 800) {
        scrollIndicator.style.opacity = Math.max(0, 1 - scroll / 200);
      }
    }, { passive: true });
  }
})();
