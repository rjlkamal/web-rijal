/* ==========================================================================
   SKILLS.JS — Animasi progress bar skill saat masuk viewport
   Hanya dipakai di skills.html
   ========================================================================== */

function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const value = target.getAttribute('data-value') || '0';
          // beri delay kecil supaya terasa "diisi" bukan instan
          requestAnimationFrame(() => {
            target.style.width = value + '%';
          });
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', initSkillBars);
