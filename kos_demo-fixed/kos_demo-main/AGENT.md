# AGENT.md

Panduan kerja untuk AI agent di repo ini. Baca file ini dulu, lalu `spec.md` (apa yang dibangun) dan `styleguide.md` belum ada tapi bisa kamu generate intinya mau tampilan biru gitu, buat styleguide.md dengan arahan dari skill UI UX PRO MAX (bagaimana tampilannya dan bunyinya). Jika ketiganya bertentangan, urutan prioritasnya: **AGENT.md > spec.md > styleguide.md**.

> Nama proyek: **KosMudah** (nama sementara, ganti bila tim sudah sepakat).

---

## 1. Konteks proyek

Tim Capstone Asah 2026 (UMKM Impact Track): 3 Full Stack, 2 AI, 1 Data Science.
Mitra: UMKM kos-kosan. Kami **tidak** membangun aplikasi produksi. Kami membangun **situs demo interaktif** agar pemilik kos bisa melihat sendiri seperti apa solusinya.

Tiga hambatan nyata dari pemilik kos, dan artinya untuk kode:

| Hambatan                                        | Konsekuensi untuk agent                                                                                                                          |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Tidak percaya menaruh data pribadi penghuni     | **Tidak ada data pribadi asli, di mana pun.** Semua data fiktif dan berlabel "Data contoh". Tidak ada form yang mengumpulkan data asli.          |
| Nyaman dengan cara tradisional                  | Antarmuka pemilik harus sangat sederhana: teks besar, sedikit menu, bahasa sehari-hari. Jangan membuat pemilik merasa harus "belajar teknologi". |
| Belum tahu masalahnya & ingin melihat solusinya | **Tur demo terpandu** adalah fitur penentu. Pemilik harus bisa mencoba tanpa daftar dan tanpa memasukkan data sendiri.                           |

Pengguna utama panel pemilik adalah **orang tua yang bukan pengguna teknologi mahir**. Pengunjung landing page adalah siapa saja. Setiap keputusan desain dan teks diuji dengan pertanyaan: _"Apakah orang tua pemilik kos paham ini tanpa dijelaskan?"_

## 2. Stack (sudah diputuskan, jangan diganti tanpa izin)

| Lapisan              | Teknologi                                                                           | Hosting                         |
| :------------------- | :---------------------------------------------------------------------------------- | :------------------------------ |
| Web (UI + API route) | Next.js (App Router), TypeScript, Tailwind CSS, Zod                                 | Vercel atau Netlify (free tier) |
| Layanan AI/DS        | Python, FastAPI, scikit-learn, statsmodels, joblib                                  | Render (free tier)              |
| Data                 | File JSON/seed statis di repo. **Tanpa database.**                                  | n/a                             |
| Chatbot              | Klasifikasi intent + jawaban template. **Tanpa LLM, tanpa API eksternal berbayar.** | n/a                             |
| Uji                  | Vitest, Playwright (web); pytest (layanan AI)                                       | n/a                             |

Catatan:

- GitHub Pages **tidak** dipakai untuk web utama karena Next.js butuh server. Boleh dipakai untuk dokumentasi saja.
- Render free tier tidur setelah tidak aktif, jadi respons pertama bisa lambat (puluhan detik). Lihat aturan fallback di bagian 5.
- Jangan menambah dependensi baru tanpa alasan tertulis di PR. Prinsip: kode sependek mungkin, pakai API bawaan browser dan Next.js sebelum menambah library.

## 3. Struktur repo

```
/
├─ AGENT.md  spec.md  styleguide.md  README.md
├─ apps/web/                 # Next.js
│  ├─ app/                   # halaman & route handler (/api/v1/...)
│  ├─ components/
│  ├─ lib/                   # zod schema, helper, klien layanan AI
│  └─ data/                  # salinan seed JSON yang dipakai web
├─ services/ai/              # FastAPI
│  ├─ app/                   # router, schema (pydantic), loader model
│  ├─ models/                # artefak model (.joblib), kecil (<50 MB total)
│  └─ tests/
├─ ml/                       # skrip & notebook tim AI/DS
│  ├─ generate_data.py       # pembuat data dummy (seed tetap)
│  ├─ train_*.py  evaluate_*.py
│  └─ reports/               # tabel metrik & perbandingan model
├─ data/                     # sumber kebenaran seed JSON + data_dictionary.md
└─ docs/                     # kontrak API, catatan keputusan
```

Sumber kebenaran data ada di `/data`. Skrip sinkronisasi menyalinnya ke `apps/web/data`. Jangan mengedit salinan di `apps/web/data` secara manual.

## 4. Cara kerja agent (Superpowers)

Untuk setiap tugas non-trivial, ikuti urutan ini:

1. **Brainstorm singkat.** Tulis 2–3 pendekatan dan pilih satu, beserta alasan.
2. **Rencana.** Daftar langkah kecil yang bisa diverifikasi satu per satu. Rujuk bagian spec yang relevan (misalnya "F1: Dashboard").
3. **TDD (Red → Green → Refactor).** Tulis tes yang gagal dulu, buat lulus, lalu rapikan. Untuk komponen UI, tes minimal: render, interaksi utama, dan aksesibilitas dasar.
4. **Verifikasi nyata.** Jalankan tes. Untuk perubahan UI, jalankan Playwright dan lihat tangkapan layar di ukuran ponsel (390px) dan desktop (1280px).
5. **Ringkas.** Tuliskan apa yang berubah, apa yang diuji, dan apa yang belum.

Jika permintaan ambigu atau bertentangan dengan spec, **tanya dulu**. Jangan menebak.

### Pemakaian skill terpasang

| Skill                       | Dipakai untuk                                                                                                                             |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| Superpowers                 | Alur di atas: brainstorming, rencana, TDD.                                                                                                |
| UI UX Pro Max               | Hanya sebagai referensi. **Palet, tipografi, dan gaya ditentukan `styleguide.md`.** Jangan memilih dari 79 gaya atau 192 palet bawaannya. |
| Ponytail & Modern Web       | Kode ringkas, API native, tanpa bloatware.                                                                                                |
| OWASP Secure Coding         | Validasi Zod di setiap route handler, header keamanan, CORS allowlist, tanpa `dangerouslySetInnerHTML`, tanpa rahasia di sisi klien.      |
| Playwright                  | Uji alur utama (lihat spec bagian 9) dan tangkapan layar responsif.                                                                       |
| Next.js Modern Architecture | Aktif. App Router, Server Components sebagai default, `"use client"` hanya bila perlu.                                                    |
| Coolify Deployment          | **Tidak dipakai** (tidak ada VPS). Ambil bagian yang relevan saja: Dockerfile ringan dan healthcheck untuk layanan FastAPI di Render.     |

## 5. Aturan teknis

### Privasi dan data

- **Dilarang** memakai, menyalin, atau mengarang data yang meniru orang sungguhan (nama nyata, nomor telepon, alamat nyata). Gunakan nama fiktif umum dan nomor telepon yang jelas palsu (contoh: `0800-000-xxxx`).
- Semua data dihasilkan oleh `ml/generate_data.py` dengan **seed tetap**, jadi hasilnya reproduksibel. Jangan menulis data dummy tangan di banyak tempat.
- Setiap halaman yang menampilkan data penghuni, tagihan, atau ulasan menampilkan lencana **"Data contoh"** (lihat styleguide).
- Tidak ada analitik pihak ketiga, tidak ada cookie pelacak, tidak ada form yang mengirim data ke server pihak lain.

### Perubahan data selama demo

- Aksi seperti "Tandai sudah bayar" atau "Kirim pengaduan" hanya mengubah **state di browser** (memory/`sessionStorage`). Tidak ada penulisan ke server.
- Wajib ada tombol **"Kembalikan data contoh"** yang mengembalikan semuanya ke seed.

### API dan validasi

- Semua endpoint web ada di `/api/v1/...`, divalidasi Zod (input dan output).
- Format galat seragam: `{ "error": { "code": "STRING_KONSTAN", "message": "Pesan manusiawi dalam Bahasa Indonesia" } }`.
- Web **tidak** pernah mengekspos URL internal layanan AI ke klien. Klien hanya memanggil route handler Next.js, dan route handler yang memanggil FastAPI.
- Kontrak API ada di `docs/api-contract.md` dan diubah lebih dulu sebelum implementasi (lihat spec bagian 6).

### Fallback saat layanan AI lambat atau mati

Layanan AI bisa tidur (cold start) atau tidak terjangkau. Demo **tidak boleh rusak**:

1. Timeout pemanggilan: 8 detik.
2. Saat menunggu: tampilkan status jelas ("Sedang menyiapkan, mohon tunggu sebentar").
3. Bila timeout atau galat: pakai hasil **pra-hitung** (`forecast.json`, label sentimen di seed, intent berbasis aturan kata kunci) dan tampilkan catatan kecil bahwa ini hasil contoh yang disimpan.
4. Jangan pernah menampilkan stack trace atau pesan teknis ke pengguna.

### Keamanan minimum

- Header keamanan (CSP, X-Content-Type-Options, Referrer-Policy) di `next.config`.
- Batasi panjang input teks (maks. 500 karakter) di Zod dan Pydantic.
- Batasi laju sederhana di FastAPI (misalnya 30 permintaan/menit per IP).
- CORS FastAPI hanya mengizinkan domain web yang di-deploy.
- Rahasia hanya lewat environment variable. Jangan commit `.env`. Sediakan `.env.example`.

### Kualitas

- TypeScript `strict`. Tanpa `any` kecuali ada komentar alasan.
- Aksesibilitas adalah syarat lulus, bukan nilai tambah: kontras WCAG AA, target sentuh ≥ 48px di panel pemilik, fokus keyboard terlihat, semua gambar/ikon bermakna punya teks alternatif.
- Responsif sampai 360px. Diuji di ponsel karena banyak pemilik membuka lewat HP.
- Hormati `prefers-reduced-motion`.

## 6. Bahasa

| Hal                                           | Bahasa                                                                   |
| :-------------------------------------------- | :----------------------------------------------------------------------- |
| Teks antarmuka (UI copy), pesan galat         | Bahasa Indonesia, sederhana, sapaan "Anda"                               |
| Nama file, folder, variabel, fungsi, komentar | Bahasa Indonesia (kecuali jika diharuskan konvensi framework/library)    |
| Commit message                                | Conventional Commits dengan deskripsi Bahasa Indonesia / Inggris        |
| Dokumentasi (README, spec, catatan keputusan) | Bahasa Indonesia                                                         |

Gunakan istilah awam di UI, bukan istilah teknis. Daftar padanan ada di `styleguide.md` bagian Bahasa dan Tulisan.

## 7. Perintah umum

Perintah di bawah adalah **target**. Jika belum ada, buatlah sebagai bagian dari setup awal dan sesuaikan dokumen ini.

```bash
# web
pnpm install
pnpm --filter web dev            # pengembangan
pnpm --filter web test           # Vitest
pnpm --filter web e2e            # Playwright
pnpm --filter web build && pnpm --filter web lint

# layanan AI
cd services/ai && pip install -r requirements.txt
uvicorn app.main:app --reload
pytest

# data & model
python ml/generate_data.py       # menulis /data/*.json (seed tetap)
python ml/train_all.py           # melatih & menyimpan model ke services/ai/models
python ml/evaluate_all.py        # menulis ml/reports/*.md
pnpm run sync-data               # salin /data ke apps/web/data
```

## 8. Definition of Done (per fitur)

- [ ] Memenuhi kriteria penerimaan di `spec.md`.
- [ ] Tes unit/komponen lulus, ada tes e2e untuk alur utama bila fitur menyentuh alur demo.
- [ ] Diuji di 390px dan 1280px, tanpa scroll horizontal.
- [ ] Lolos cek aksesibilitas dasar (kontras, fokus, label).
- [ ] Teks UI mengikuti `styleguide.md`, tanpa istilah teknis.
- [ ] Ada lencana "Data contoh" bila menampilkan data penghuni/tagihan/ulasan.
- [ ] Perilaku fallback saat layanan AI mati sudah diuji.
- [ ] Tidak ada rahasia atau data nyata di commit.

## 9. Yang tidak boleh dilakukan

- Menambah database, login/autentikasi sungguhan, atau penyimpanan data pengguna.
- Memanggil LLM atau API AI eksternal (ChatGPT, Gemini, dll.).
- Mengubah stack, palet warna, atau font tanpa persetujuan tim.
- Menambah fitur di luar spec "biar bagus". Catat sebagai usulan di `docs/ideas.md`.
- Mengklaim kinerja model pada data nyata. Data bersifat sintetis (lihat spec bagian 7).
- Memakai teks lorem ipsum atau placeholder generik di tampilan akhir.
