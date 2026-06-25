/* ==========================================================================
   MAIN.JS — Logic global: page loader, navbar, search, scroll reveal,
   scroll progress bar, back-to-top.
   Dipakai di semua halaman.
   ========================================================================== */

/* ---------- 1. Page load animation ---------- */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Fallback: jika event load lambat/gagal, paksa hilangkan loader setelah 1.8s
setTimeout(() => {
  document.body.classList.add('loaded');
}, 1800);

/* ---------- 2. Navbar: scrolled state + mobile toggle ---------- */
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 12) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
handleNavbarScroll();
window.addEventListener('scroll', handleNavbarScroll, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Tutup menu mobile saat link diklik
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

/* ---------- 3. Fitur Search di Navbar ---------- */
/*
  Index pencarian sederhana: setiap halaman & section penting didaftarkan
  di sini supaya search bisa mengarahkan user ke halaman + anchor yang tepat.
*/
const SEARCH_INDEX = [
  { title: 'Home', tag: 'Bagian', url: 'index.html#home', keywords: 'home utama beranda landing' },
  { title: 'Tentang Saya', tag: 'Bagian', url: 'index.html#about', keywords: 'about tentang biodata profil mahasiswa teknik mesin untirta' },
  { title: 'Skills & Kemampuan', tag: 'Bagian', url: 'index.html#skills', keywords: 'skill kemampuan keahlian software tools' },
  { title: 'Kontak', tag: 'Bagian', url: 'index.html#contact', keywords: 'contact kontak whatsapp wa instagram linkedin email' },
  { title: 'Portfolio & Dokumen', tag: 'Halaman', url: 'portfolio.html', keywords: 'portfolio cv sertifikat dokumen unduh download' },
  { title: 'WhatsApp', tag: 'Kontak', url: 'index.html#contact', keywords: 'whatsapp wa nomor hp telepon' },
  { title: 'Instagram', tag: 'Kontak', url: 'index.html#contact', keywords: 'instagram ig sosial media' },
  { title: 'LinkedIn', tag: 'Kontak', url: 'index.html#contact', keywords: 'linkedin profesional networking' },
  { title: 'Email', tag: 'Kontak', url: 'index.html#contact', keywords: 'email surel gmail' },
  { title: 'Riwayat Pendidikan', tag: 'Tentang', url: 'index.html#journey', keywords: 'pendidikan universitas sultan ageng tirtayasa semester' },
  { title: 'Keahlian Teknik', tag: 'Skills', url: 'index.html#technical', keywords: 'autocad solidworks teknik mesin perhitungan' },
];

function initSearch() {
  const searchWrap = document.querySelector('.nav-search');
  const searchToggle = document.querySelector('.nav-search-toggle');
  const searchInput = document.querySelector('.nav-search-form input');
  const searchForm = document.querySelector('.nav-search-form');
  const resultsBox = document.querySelector('.nav-search-results');

  if (!searchWrap || !searchToggle || !searchInput || !resultsBox) return;

  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchWrap.classList.toggle('open');
    if (searchWrap.classList.contains('open')) {
      setTimeout(() => searchInput.focus(), 200);
    } else {
      resultsBox.classList.remove('show');
    }
  });

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsBox.classList.remove('show');
      resultsBox.innerHTML = '';
      return;
    }

    const matches = SEARCH_INDEX.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    }).slice(0, 6);

    if (matches.length === 0) {
      resultsBox.innerHTML = '<div class="no-result">Tidak ada hasil ditemukan untuk "' + escapeHtml(query) + '"</div>';
    } else {
      resultsBox.innerHTML = matches
        .map(
          (m) =>
            `<a href="${m.url}"><span class="result-tag">${m.tag}</span>${escapeHtml(m.title)}</a>`
        )
        .join('');
    }
    resultsBox.classList.add('show');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  searchInput.addEventListener('input', (e) => renderResults(e.target.value));

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const first = resultsBox.querySelector('a');
      if (first) window.location.href = first.getAttribute('href');
    });
  }

  // Tutup dropdown jika klik di luar
  document.addEventListener('click', (e) => {
    if (!searchWrap.contains(e.target)) {
      searchWrap.classList.remove('open');
      resultsBox.classList.remove('show');
    }
  });

  // ESC untuk menutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchWrap.classList.remove('open');
      resultsBox.classList.remove('show');
    }
  });
}
initSearch();

/* ---------- 4. Scroll reveal animation (Intersection Observer) ---------- */
let revealObserver = null;

function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal:not(.reveal-observed), .reveal-left:not(.reveal-observed), .reveal-right:not(.reveal-observed), .reveal-scale:not(.reveal-observed), .stagger:not(.reveal-observed)'
  );
  if (!revealEls.length) return;

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
  }

  revealEls.forEach((el) => {
    el.classList.add('reveal-observed');
    revealObserver.observe(el);
  });
}
initScrollReveal();

// Diekspos secara global supaya skrip lain (mis. portfolio.js setelah membuat
// kartu dokumen secara dinamis) bisa memicu ulang reveal untuk elemen baru.
window.refreshScrollReveal = initScrollReveal;

/* ---------- 5. Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = percent + '%';
    },
    { passive: true }
  );
}
initScrollProgress();

/* ---------- 6. Back to top button ---------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 480) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    },
    { passive: true }
  );
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
initBackToTop();

/* ---------- 7. Active nav link ---------- */
/*
  Di portfolio.html (halaman terpisah): tandai aktif berdasarkan nama file.
  Di index.html (single-page Home/About/Skills/Contact): tandai aktif
  berdasarkan section mana yang sedang terlihat di viewport (scroll-spy).
*/
function setActiveNavLinkByFile() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

function initScrollSpy() {
  const sectionLinks = document.querySelectorAll('.nav-link-item[data-section]');
  if (!sectionLinks.length) return; // bukan halaman single-page (mis. portfolio.html)

  const sections = Array.from(sectionLinks)
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  if (!sections.length) return;

  function updateActive() {
    const scrollPos = window.scrollY + window.innerHeight * 0.3;
    let currentId = sections[0].id;

    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    });

    sectionLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  updateActive();
  window.addEventListener('scroll', updateActive, { passive: true });
}

setActiveNavLinkByFile();
initScrollSpy();
