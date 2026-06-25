# Website Portfolio — Rijal Kamaluddin

Struktur file dipisah rapi: HTML, CSS, dan JavaScript masing-masing punya file sendiri.

## 📁 Struktur Halaman

- **`index.html`** → Satu halaman berisi 4 bagian: **Home, About, Skills, Contact**.
  Klik menu navigasi akan otomatis scroll halus ke bagian yang dituju.
- **`portfolio.html`** → Halaman terpisah khusus dokumen (CV, sertifikat, dll) — bisa dilihat & diunduh.

## 📁 Struktur Folder

```
portfolio/
├── index.html             → Home + About + Skills + Contact (satu halaman)
├── portfolio.html           → Halaman dokumen (CV, sertifikat, dll)
│
└── assets/
    ├── css/
    │   ├── main.css            → Style global (navbar, animasi, footer) — wajib di semua halaman
    │   ├── home.css             → Style bagian Home
    │   ├── about.css             → Style bagian About
    │   ├── skills.css             → Style bagian Skills
    │   ├── contact.css             → Style bagian Contact
    │   └── portfolio.css           → Style halaman Portfolio
    │
    ├── js/
    │   ├── main.js                → Logic global (loader, navbar, search, scroll-spy, scroll animasi)
    │   ├── skills.js                → Animasi progress bar skill
    │   ├── contact.js                → Validasi form kontak
    │   └── portfolio.js               → Generate kartu dokumen otomatis + preview file
    │
    ├── images/
    │   └── profile.jpg                 → GANTI dengan foto Anda di sini
    │
    └── docs/
        └── (letakkan CV, sertifikat, dll di sini)
```

## 🛠️ Cara Pakai / Edit

### 1. Mengganti Foto Profil
Simpan foto Anda dengan nama **`profile.jpg`** ke folder `assets/images/`.
Foto ini otomatis muncul di:
- Strip di bawah navbar (selalu tampil)
- Hero section di bagian Home
- Foto besar di bagian About

> Jika foto belum ada, otomatis muncul placeholder abu-abu bertuliskan "RK" — tidak akan error.

### 2. Menambahkan Dokumen di Halaman Portfolio (dengan Preview Otomatis) ⭐
Ini bagian penting — sekarang **preview thumbnail dokumen muncul otomatis** begitu Anda
menambahkan file, tanpa perlu screenshot atau edit gambar preview manual.

**Langkahnya:**
1. Simpan file Anda (PDF/JPG/PNG) ke folder `assets/docs/`.
2. Buka `assets/js/portfolio.js`, cari array `DOCUMENTS` di bagian atas file.
3. Tambah atau sesuaikan entry, contoh:
   ```js
   {
     file: 'CV-Rijal-2026.pdf',       // nama file PERSIS seperti di assets/docs/
     title: 'Curriculum Vitae',
     desc: 'Riwayat pendidikan dan kemampuan saya.',
     category: 'cv',                  // 'cv' | 'sertifikat' | 'lainnya'
   },
   ```
4. Simpan. Selesai — tidak perlu edit HTML sama sekali.

**Bagaimana preview-nya bekerja:**
- File **gambar** (jpg/jpeg/png/webp) → langsung ditampilkan sebagai foto asli di kartu.
- File **PDF** → halaman pertama PDF otomatis "difoto" (di-render) jadi thumbnail asli oleh
  library PDF.js — jadi orang yang membuka website bisa melihat sekilas isi dokumen
  sebelum mengklik "Lihat" atau "Unduh".
- Jika nama file di `DOCUMENTS` belum ada filenya di folder `assets/docs/`, kartu akan
  menampilkan ikon + teks "File belum ditemukan" (tidak error/rusak tampilannya).

Tombol **"Lihat"** membuka file di tab baru, tombol **"Unduh"** langsung mengunduh ke perangkat.

### 3. Mengubah Link Kontak
Buka `index.html`, cari bagian `id="contact"`, lalu ganti:
- Link WhatsApp: `https://wa.me/62NOMOR_ANDA`
- Link Instagram: `https://instagram.com/USERNAME_ANDA`
- Link LinkedIn: `https://linkedin.com/in/USERNAME_ANDA`
- Email: ganti `rijalkamaluddin@email.com` (ada di link `mailto:` dan teks yang ditampilkan)

Email tujuan form kontak juga perlu diganti di file `assets/js/contact.js` pada baris:
```js
const mailtoLink = `mailto:rijalkamaluddin@email.com?subject=${subject}&body=${body}`;
```

### 4. Mengubah Persentase Skill
Buka `index.html`, cari bagian `id="skills"`, cari `data-value="60"` pada setiap skill bar,
ubah angkanya (0–100), lalu ubah juga teks `<span class="skill-percent">60%</span>` agar sesuai.

### 5. Fitur Search di Navbar
Kotak pencarian di navbar mengindeks bagian & topik penting. Untuk menambah kata kunci baru,
edit array `SEARCH_INDEX` di `assets/js/main.js`.

## ✨ Fitur yang Sudah Tersedia
- Warna tema biru & putih dengan aksen garis "blueprint" teknik
- Navigasi satu halaman (Home/About/Skills/Contact) dengan smooth-scroll + scroll-spy
  (menu otomatis menandai bagian mana yang sedang dilihat)
- Halaman Portfolio terpisah dengan **preview asli dokumen otomatis** (gambar & PDF)
- Animasi saat pertama masuk web (page loader)
- Animasi muncul elemen saat di-scroll (fade/slide halus)
- Navbar dengan fitur search (klik ikon kaca pembesar)
- Foto + nama dengan animasi di bawah navbar
- Progress bar scroll di bagian atas
- Tombol "kembali ke atas"
- Filter kategori dokumen (CV / Sertifikat / Lainnya) di halaman Portfolio
- Form kontak yang membuka aplikasi email otomatis
- Responsive: tampil rapi di HP, tablet, maupun desktop

## ▶️ Cara Membuka
Cukup buka file `index.html` langsung di browser (double click), tidak perlu server khusus.

> **Catatan koneksi internet:** Preview PDF memakai library PDF.js yang dimuat dari CDN
> (cdnjs.cloudflare.com). Pastikan perangkat terhubung internet agar preview PDF muncul.
> Preview gambar (jpg/png) tetap berfungsi normal tanpa internet karena sudah ada di file lokal.

