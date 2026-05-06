/* =============================================
   PINNACLE UNIVERSITY — script.js
   ============================================= */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Hamburger menu toggle ──────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Academic Programs Data ──────────────────────
const programs = {
  engineering: [
    { degree: 'B.Tech', name: 'Computer Science & AI',    duration: '4 Years', seats: '120' },
    { degree: 'B.Tech', name: 'Electronics Engineering',  duration: '4 Years', seats: '90' },
    { degree: 'B.Tech', name: 'Mechanical Engineering',   duration: '4 Years', seats: '60' },
    { degree: 'M.Tech', name: 'Data Science',             duration: '2 Years', seats: '40' },
    { degree: 'B.Tech', name: 'Civil Engineering',        duration: '4 Years', seats: '60' },
    { degree: 'B.Tech', name: 'Chemical Engineering',     duration: '4 Years', seats: '45' },
  ],
  science: [
    { degree: 'B.Sc',  name: 'Physics (Honours)',         duration: '3 Years', seats: '60' },
    { degree: 'B.Sc',  name: 'Chemistry (Honours)',       duration: '3 Years', seats: '60' },
    { degree: 'B.Sc',  name: 'Biotechnology',             duration: '3 Years', seats: '45' },
    { degree: 'M.Sc',  name: 'Applied Mathematics',       duration: '2 Years', seats: '30' },
    { degree: 'B.Sc',  name: 'Environmental Science',     duration: '3 Years', seats: '40' },
    { degree: 'PhD',   name: 'Research Programs',         duration: '3–5 Years', seats: '20' },
  ],
  management: [
    { degree: 'MBA',   name: 'Finance & Banking',         duration: '2 Years', seats: '60' },
    { degree: 'MBA',   name: 'Marketing & Strategy',      duration: '2 Years', seats: '60' },
    { degree: 'BBA',   name: 'Business Administration',   duration: '3 Years', seats: '80' },
    { degree: 'MBA',   name: 'Operations & Supply Chain', duration: '2 Years', seats: '40' },
    { degree: 'B.Com', name: 'Commerce (Honours)',        duration: '3 Years', seats: '80' },
    { degree: 'MBA',   name: 'Human Resource Management', duration: '2 Years', seats: '40' },
  ],
  arts: [
    { degree: 'B.A',   name: 'Political Science',         duration: '3 Years', seats: '60' },
    { degree: 'B.A',   name: 'English Literature',        duration: '3 Years', seats: '50' },
    { degree: 'LLB',   name: 'Law (Integrated)',          duration: '5 Years', seats: '60' },
    { degree: 'LLM',   name: 'Constitutional Law',        duration: '2 Years', seats: '30' },
    { degree: 'B.A',   name: 'Mass Communication',        duration: '3 Years', seats: '45' },
    { degree: 'B.A',   name: 'Psychology (Honours)',      duration: '3 Years', seats: '40' },
  ],
};

function renderPrograms(tab) {
  const grid = document.getElementById('programsGrid');
  const data = programs[tab] || [];

  grid.innerHTML = data.map(p => `
    <div class="program-card">
      <span class="prog-degree">${p.degree}</span>
      <h3>${p.name}</h3>
      <div class="prog-meta">
        <span>🕐 ${p.duration}</span>
        <span>🪑 ${p.seats} seats</span>
      </div>
    </div>
  `).join('');
}

// Tab switching
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderPrograms(btn.dataset.tab);
  });
});

// Initial render
renderPrograms('engineering');

// ── Contact form handler ──────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    success.style.display = 'block';
    btn.textContent = 'Send Message';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1200);
}

// ── Intersection Observer — fade-in on scroll ──
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply observer to key cards
document.querySelectorAll(
  '.news-card, .adm-step, .faculty-card, .testi-card, .p-stat, .campus-card'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.animationDelay = `${i * 0.07}s`;
  observer.observe(el);
});

// ── Active nav link highlight on scroll ──────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.fontWeight = link.getAttribute('href') === `#${current}` ? '700' : '500';
  });
}, { passive: true });