/**
 * Pixelasia Productions Dili — Main JS
 * Nav scroll effect · Hamburger menu · Footer year
 */

'use strict';

/* ---- Footer year ---- */
const footerYear = document.getElementById('footerYear');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ---- Nav: scroll shadow ---- */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ---- Nav: hamburger menu ---- */
const hamburger = document.getElementById('navHamburger');
const navMenu   = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click (smooth anchor scroll)
  navMenu.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
}

/* ---- Play button: open video lightbox (stub) ---- */
const playBtn = document.querySelector('.play-btn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    // TODO: Replace with actual video URL / lightbox implementation
    // Example: window.open('https://www.youtube.com/watch?v=VIDEO_ID', '_blank');
    alert('Video player coming soon — add the video URL in js/main.js');
  });
}

/* ---- Netlify form: thank-you message ---- */
// If Netlify redirects to /thank-you, this is handled server-side.
// For custom UX without redirect, remove action="/thank-you" from form
// and handle submit here:
const contactForm = document.getElementById('contactForm');
if (contactForm && !contactForm.hasAttribute('action')) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (res.ok) {
        contactForm.innerHTML = `
          <div style="text-align:center;padding:40px 0;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin:0 auto 16px;display:block;">
              <circle cx="12" cy="12" r="10" stroke="#6B3FA0" stroke-width="1.5"/>
              <path d="M8 12l3 3 5-5" stroke="#6B3FA0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3 style="font-family:'Playfair Display',serif;font-size:24px;margin-bottom:8px;">Thank you!</h3>
            <p style="color:rgba(26,17,40,0.65);">We received your message and will get back to you soon.</p>
          </div>`;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch {
      alert('Something went wrong. Please email us directly at info@pixelasia-dili.com');
    }
  });
}
