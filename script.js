/* ================================================
   MINDMATE – script.js
   Handles: nav scroll state, mobile menu, reveal animations
   ================================================ */

// --- NAV: add .scrolled class on scroll ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 32) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// --- MOBILE MENU TOGGLE ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- SCROLL REVEAL ---
// Add .reveal class to elements that should animate in
const revealTargets = [
  '.stat-card',
  '.feature-card',
  '.sdg-point',
  '.why-card',
  '.resource-card',
  '.future-item',
  '.flow-step',
  '.about-text',
  '.about-cards',
  '.sdg-badge',
  '.sdg-points',
  '.section-title',
  '.team-card',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
});

// Intersection Observer for reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- SMOOTH ACTIVE NAV HIGHLIGHT ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
