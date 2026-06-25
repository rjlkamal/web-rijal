/* ==========================================================================
   PORTFOLIO.JS — Generate kartu dokumen otomatis + preview asli file
   Hanya dipakai di portfolio.html

   CARA MENAMBAH DOKUMEN BARU:
   1. Letakkan file (PDF / JPG / PNG) di folder assets/docs/
   2. Tambahkan satu object baru di array DOCUMENTS di bawah ini, isi:
      - file     : nama file persis seperti di folder assets/docs/
      - title    : judul yang ditampilkan
      - desc     : deskripsi singkat
      - category : "cv" | "sertifikat" | "lainnya" (dipakai untuk filter tab)
   3. Simpan — preview thumbnail akan otomatis muncul:
      - File gambar (.jpg/.jpeg/.png/.webp) → ditampilkan langsung sebagai foto
      - File PDF (.pdf) → halaman pertama dirender otomatis jadi gambar preview
   ========================================================================== */

const DOCUMENTS = [
  {
    file: 'CV RIJAL_DUTAA.pdf',
    title: 'Curriculum Vitae',
    desc: 'Riwayat singkat pendidikan, pengalaman, dan kemampuan saya dalam format CV.',
    category: 'cv',
  },
  {
    file: 'SERTIFIKAT BERPRESTASI .pdf',
    title: 'Sertifikat Seminar / Pelatihan',
    desc: 'Sertifikat partisipasi dalam seminar, workshop, atau pelatihan yang pernah saya ikuti.',
    category: 'sertifikat',
  },
  {
    file: 'Sertifikat FLP 2 _660.pdf',
    title: 'Sertifikat Organisasi / Kepanitiaan',
    desc: 'Sertifikat keikutsertaan dalam kegiatan organisasi kampus atau kepanitiaan acara.',
    category: 'sertifikat',
  },
  {
    file: 'penghargaan olimpiade rijal.pdf',
    title: 'Transkrip Nilai Sementara',
    desc: 'Rekap nilai akademik selama menjalani perkuliahan di semester berjalan.',
    category: 'lainnya',
  },
  {
    file: 'sertifikat ketua rohis (1).pdf',
    title: 'Kartu Tanda Mahasiswa',
    desc: 'Bukti identitas resmi sebagai mahasiswa aktif Teknik Mesin UNTIRTA.',
    category: 'lainnya',
  },
  {
    file: 'Sertifikat lkmm td.pdf',
    title: 'Surat Keterangan Mahasiswa Aktif',
    desc: 'Surat resmi dari kampus yang menerangkan status keaktifan sebagai mahasiswa.',
    category: 'lainnya',
  },
  {
    file: 'sertifikat smanli expo .pdf',
    title: 'Surat Keterangan Mahasiswa Aktif',
    desc: 'Surat resmi dari kampus yang menerangkan status keaktifan sebagai mahasiswa.',
    category: 'lainnya',
  },
  {
    file: 'sertifikat_rijal_2.jpg.jpeg',
    title: 'Surat Keterangan Mahasiswa Aktif',
    desc: 'Surat resmi dari kampus yang menerangkan status keaktifan sebagai mahasiswa.',
    category: 'lainnya',
  },
];

const DOCS_FOLDER = 'assets/docs/';
const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

// Konfigurasi worker PDF.js (wajib supaya proses render PDF tidak macet di thread utama)
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

function getExt(filename) {
  return filename.split('.').pop().toLowerCase();
}

function iconForCategory() {
  return `<svg class="doc-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`;
}

function buildCard(doc, index) {
  const ext = getExt(doc.file);
  const isImage = IMAGE_EXT.includes(ext);
  const fileUrl = DOCS_FOLDER + doc.file;
  const previewId = `doc-preview-${index}`;

  const card = document.createElement('div');
  card.className = 'doc-card reveal';
  card.setAttribute('data-category', doc.category);

  card.innerHTML = `
    <div class="doc-card-preview" id="${previewId}">
      <span class="doc-ext-tag">${ext.toUpperCase()}</span>
      ${isImage
        ? `<img src="${fileUrl}" alt="Preview ${escapeHtml(doc.title)}" class="doc-preview-img" />`
        : `<div class="doc-preview-loading">${iconForCategory()}</div>`}
    </div>
    <div class="doc-card-body">
      <div class="doc-card-cat">${categoryLabel(doc.category)}</div>
      <h3>${escapeHtml(doc.title)}</h3>
      <p>${escapeHtml(doc.desc)}</p>
      <div class="doc-card-actions">
        <a href="${fileUrl}" target="_blank" class="btn btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Lihat
        </a>
        <a href="${fileUrl}" download class="btn btn-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Unduh
        </a>
      </div>
    </div>
  `;

  // Jika file gambar tidak ditemukan (404), tampilkan placeholder ikon agar tidak broken
  if (isImage) {
    const imgEl = card.querySelector('.doc-preview-img');
    imgEl.addEventListener('error', () => {
      const previewBox = document.getElementById(previewId);
      previewBox.querySelector('.doc-preview-img')?.remove();
      const fallback = document.createElement('div');
      fallback.className = 'doc-preview-missing';
      fallback.innerHTML = `${iconForCategory()}<span>File belum ditemukan</span>`;
      previewBox.appendChild(fallback);
    });
  }

  return { card, ext, fileUrl, previewId, isImage };
}

function categoryLabel(category) {
  const map = { cv: 'CV', sertifikat: 'Sertifikat', lainnya: 'Lainnya' };
  return map[category] || 'Dokumen';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Render thumbnail PDF halaman pertama via PDF.js ---------- */
async function renderPdfPreview(fileUrl, previewId) {
  const previewBox = document.getElementById(previewId);
  if (!previewBox) return;

  if (!window.pdfjsLib) {
    showPdfFallback(previewBox, 'Pratinjau tidak tersedia');
    return;
  }

  try {
    const pdf = await window.pdfjsLib.getDocument(fileUrl).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1 });
    // Skala agar lebar render pas dengan area preview (maks ~500px lebar render)
    const targetWidth = 520;
    const scale = targetWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.className = 'doc-preview-canvas';
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    const ctx = canvas.getContext('2d');

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    const loadingEl = previewBox.querySelector('.doc-preview-loading');
    if (loadingEl) loadingEl.remove();
    previewBox.appendChild(canvas);
  } catch (err) {
    // File belum ada / gagal dimuat → tampilkan fallback ikon dokumen, bukan error ke user
    showPdfFallback(previewBox, 'File belum ditemukan');
  }
}

function showPdfFallback(previewBox, message) {
  const loadingEl = previewBox.querySelector('.doc-preview-loading');
  if (loadingEl) {
    loadingEl.innerHTML = `${iconForCategory()}<span class="doc-preview-msg">${message}</span>`;
    loadingEl.classList.add('doc-preview-missing');
  }
}

/* ---------- Inisialisasi: generate semua kartu + render preview ---------- */
async function initDocumentGrid() {
  const grid = document.getElementById('docGrid');
  const loadingMsg = document.getElementById('docLoadingMsg');
  if (!grid) return;

  const builtCards = DOCUMENTS.map((doc, i) => buildCard(doc, i));

  builtCards.forEach(({ card }) => grid.appendChild(card));

  if (loadingMsg) loadingMsg.style.display = 'none';

  // Render preview PDF satu per satu (tidak blocking UI karena async)
  builtCards
    .filter((b) => !b.isImage)
    .forEach((b) => renderPdfPreview(b.fileUrl, b.previewId));

  // Setelah kartu dibuat, aktifkan reveal animation untuk elemen baru
  if (window.refreshScrollReveal) {
    window.refreshScrollReveal();
  }

  initDocFilter();
}

/* ---------- Filter kategori dokumen (CV / Sertifikat / Lainnya) ---------- */
function initDocFilter() {
  const filterBtns = document.querySelectorAll('.doc-filter-btn');
  const noDocMsg = document.getElementById('noDocMsg');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const docCards = document.querySelectorAll('.doc-card');
      let visibleCount = 0;

      docCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const isMatch = filter === 'all' || category === filter;
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleCount++;
      });

      if (noDocMsg) {
        noDocMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initDocumentGrid);
