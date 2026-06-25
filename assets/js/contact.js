/* ==========================================================================
   CONTACT.JS — Validasi & status form kontak (front-end only)
   Hanya dipakai di contact.html

   CATATAN: Form ini belum terhubung ke server/backend manapun.
   Saat ini hanya menampilkan pesan status di browser dan membuka
   aplikasi email default (mailto) berisi pesan yang diisi.
   Jika ingin form benar-benar terkirim ke email/database, perlu
   ditambahkan layanan backend seperti Formspree, EmailJS, atau server sendiri.
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Mohon lengkapi semua kolom sebelum mengirim.';
      status.className = 'success';
      status.style.background = '#fdeaea';
      status.style.color = '#a3303d';
      status.style.display = 'block';
      return;
    }

    // Susun mailto sebagai jalur kirim sederhana tanpa backend
    const subject = encodeURIComponent('Pesan dari Website Portfolio - ' + name);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    );
    const mailtoLink = `mailto:rijalkamaluddin@email.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    status.textContent = 'Terima kasih! Aplikasi email Anda akan terbuka untuk mengirim pesan ini.';
    status.className = 'success';
    status.style.background = '#e3f6ec';
    status.style.color = '#1b7a47';
    status.style.display = 'block';

    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
