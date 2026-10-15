# spec.md: KosMudah (situs demo untuk pemilik kos)

Versi 1.0. Dibaca bersama `AGENT.md` dan `styleguide.md`.

---

## 1. Tujuan

Membuat situs demo interaktif yang membuat pemilik kos berkata: *"Oh, begini toh bentuknya. Ini mudah dan aman, saya mau coba."*

**Ukuran keberhasilan** (diamati saat demo ke UMKM mitra, 14–20 Desember):
1. Pemilik bisa menyelesaikan tur demo sampai akhir tanpa dibantu.
2. Pemilik bisa menemukan sendiri "siapa yang belum bayar bulan ini" dalam kurang dari 30 detik.
3. Pemilik tidak menyatakan keberatan soal keamanan data (karena memang tidak ada data asli).
4. Pemilik bersedia membahas langkah lanjutan (uji coba dengan data kosnya sendiri).

**Bukan tujuan:** aplikasi produksi, login, penyimpanan data penghuni, pembayaran sungguhan, integrasi WhatsApp, fitur generatif/LLM.

## 2. Pengguna

| Persona | Siapa | Kebutuhan | Implikasi |
| :--- | :--- | :--- | :--- |
| **Pemilik kos** (utama) | Usia 45–70, terbiasa buku catatan, HP dipakai untuk WhatsApp dan telepon | Tahu kondisi kos sekilas, tidak lupa menagih, tidak ribet | Teks besar, bahasa sehari-hari, satu aksi utama per layar, tur terpandu |
| **Calon penghuni** | Mahasiswa atau pekerja muda | Lihat kamar, harga, fasilitas, aturan; bertanya cepat | Landing page modern, chatbot FAQ |
| **Penilai/mentor Asah** | Evaluator | Melihat hasil kerja tim | README dan dokumentasi rapi |

## 3. Cakupan halaman

### Sisi publik (situs kos fiktif "Kos Melati Indah", nama contoh)

| Rute | Isi |
| :--- | :--- |
| `/` | Beranda: hero dengan ajakan **"Coba demo untuk pemilik kos"**, ringkasan kos, kamar unggulan, fasilitas ringkas |
| `/kamar` | Daftar kamar dan harga, penanda tersedia/terisi |
| `/fasilitas` | Fasilitas bersama dan fasilitas per tipe kamar |
| `/aturan` | Aturan kos (jam tamu, listrik, kebersihan, dll.) |
| `/tanya` | Chatbot tanya jawab (juga tersedia sebagai tombol melayang) |

### Sisi pemilik (panel demo, tanpa login)

| Rute | Isi |
| :--- | :--- |
| `/pemilik` | **Dashboard**: ringkasan kalimat, kamar terisi/kosong, tagihan bulan ini |
| `/pemilik/tagihan` | Daftar tagihan dan status bayar, aksi "Tandai sudah bayar" |
| `/pemilik/prediksi` | Perkiraan kamar terisi dan pemasukan 6 bulan ke depan |
| `/pemilik/ulasan` | Ringkasan kesan penghuni dari ulasan (positif/netral/negatif) |
| `/pemilik/pengaduan` | Kotak pengaduan penghuni dan cara pesan otomatis dipilah |

### Lintas halaman
- **Tur demo terpandu** (bagian 4.0).
- Lencana **"Data contoh"** di semua tampilan data penghuni/tagihan/ulasan.
- Tombol **"Kembalikan data contoh"**.

## 4. Fitur dan kriteria penerimaan

Prioritas dari keputusan tim: **P1 Dashboard & tagihan → P2 Prediksi → P3 Sentimen → P4 Pengaduan & chatbot.** Tur demo dan situs publik adalah kerangka, selalu dikerjakan lebih dulu.

### F0. Tur demo terpandu (kerangka, wajib)

Tujuan: menjawab "pemilik belum tahu masalahnya dan ingin lihat solusinya."

**Perilaku**
- Dimulai dari tombol di hero beranda dan dari menu di panel pemilik ("Ulangi tur").
- 6 langkah, satu sorotan per langkah, dengan kotak penjelasan besar: judul, 1–2 kalimat, tombol **Lanjut**, **Kembali**, **Keluar dari tur**.
- Penanda "Langkah 2 dari 6".
- Bisa dioperasikan keyboard (Tab, Enter, Esc). Tidak mengunci pengguna; Esc selalu keluar.
- Bila layar kecil, kotak penjelasan menempel di bawah layar.

**Naskah langkah (draf, boleh dipoles mengikuti styleguide)**

| # | Halaman | Sorotan | Pesan inti |
| :--- | :--- | :--- | :--- |
| 1 | `/pemilik` | Lencana "Data contoh" | "Semua yang Anda lihat adalah data contoh. Tidak ada data penghuni sungguhan di sini." |
| 2 | `/pemilik` | Kalimat ringkasan + kartu kamar | "Sekali lihat, Anda tahu berapa kamar terisi dan kosong, tanpa membuka buku catatan." |
| 3 | `/pemilik/tagihan` | Daftar tagihan | "Yang belum bayar ditandai jelas. Coba tekan 'Tandai sudah bayar' pada satu penghuni." |
| 4 | `/pemilik/prediksi` | Grafik perkiraan | "Perkiraan kamar terisi dan pemasukan beberapa bulan ke depan, supaya Anda bisa bersiap." |
| 5 | `/pemilik/pengaduan` | Contoh pesan masuk | "Pesan penghuni dipilah otomatis: pertanyaan dijawab sendiri, keluhan sampai ke Anda." |
| 6 | `/pemilik` | Tombol "Kembalikan data contoh" | "Silakan coba-coba sepuasnya. Kapan saja bisa dikembalikan seperti semula." |

**Kriteria penerimaan**
- [ ] Tur bisa diselesaikan di ponsel 390px tanpa elemen tertutup.
- [ ] Keluar di tengah jalan tidak merusak state.
- [ ] Teks kotak penjelasan ≥ 18px dan lolos kontras AA.
- [ ] Uji e2e Playwright: tur selesai 6 langkah; tur bisa dibatalkan dengan Esc.

### F1. Dashboard hunian dan tagihan (P1)

**Dashboard (`/pemilik`)**
- Kalimat ringkasan dalam bahasa biasa, contoh: *"Bulan ini 20 dari 24 kamar terisi. 3 penghuni belum bayar."* Dihasilkan dari data, bukan statis.
- Kartu: Kamar terisi, Kamar kosong, Sudah bayar, Belum bayar (angka besar + label jelas).
- Denah/daftar kamar dengan status (terisi/kosong) memakai **warna + ikon + teks**.
- Satu aksi utama jelas: "Lihat siapa yang belum bayar".

**Tagihan (`/pemilik/tagihan`)**
- Daftar tagihan bulan berjalan: nama (fiktif), kamar, jumlah, tanggal jatuh tempo, status (**Sudah bayar / Belum bayar / Terlambat**).
- Filter sederhana: Semua / Belum bayar / Terlambat. Tidak ada filter lain.
- Aksi **Tandai sudah bayar** dengan konfirmasi singkat dan umpan balik jelas ("Tersimpan: Bu Rina sudah bayar"). Hanya mengubah state browser.
- Bisa dilihat per bulan (maks. 6 bulan terakhir).

**Kriteria penerimaan**
- [ ] Angka dashboard konsisten dengan daftar tagihan dan data kamar (satu sumber data).
- [ ] Menandai lunas langsung memperbarui kalimat ringkasan dan kartu.
- [ ] "Kembalikan data contoh" mengembalikan semua angka.
- [ ] Tanpa scroll horizontal di 360px.
- [ ] Status tidak hanya dibedakan warna (ada ikon dan teks).

### F2. Prediksi okupansi dan pendapatan (P2)

- Halaman `/pemilik/prediksi` menampilkan dua perkiraan: **kamar terisi** dan **pemasukan sewa**, 6 bulan ke depan, di atas riwayat 24 bulan.
- Tampilkan sebagai garis + pita rentang, dengan kalimat penjelas: *"Ini perkiraan, bukan kepastian."*
- Di bawah grafik, tabel angka per bulan (alternatif teks untuk grafik).
- Satu kalimat insight otomatis, contoh: *"Agustus biasanya paling ramai. Siapkan kamar yang kosong."*
- Sumber: `GET /api/v1/forecast`. Fallback ke `forecast.json` pra-hitung (bagian 5, AGENT.md).

**Kriteria penerimaan**
- [ ] Dua seri (okupansi, pendapatan) tampil dengan label langsung pada grafik, bukan hanya legenda.
- [ ] Tabel angka tersedia dan sinkron dengan grafik.
- [ ] Saat layanan AI mati: halaman tetap tampil dengan hasil pra-hitung dan catatan kecil.
- [ ] Hasil perbandingan model terdokumentasi (bagian 7).

### F3. Kesan penghuni / analisis sentimen (P3)

- `/pemilik/ulasan`: ringkasan jumlah ulasan **positif, netral, negatif** (diagram batang sederhana), lalu daftar ulasan dengan label.
- Label tiap ulasan dihitung model dan disimpan pra-hitung di seed; fallback aman bila layanan mati.
- Kotak **"Coba tulis ulasan"** (opsional di UI): pengguna mengetik kalimat, mendapat label dan tingkat keyakinan dalam bahasa awam ("Terdengar puas"). Memanggil `POST /api/v1/sentiment`.
- Menampilkan 3 hal yang paling sering disebut (kata kunci sederhana, misalnya "wifi", "bersih", "air").

**Kriteria penerimaan**
- [ ] Jumlah per kelas konsisten dengan daftar ulasan.
- [ ] Input dibatasi 500 karakter, input kosong ditolak dengan pesan jelas.
- [ ] Label ditampilkan dengan kata awam, bukan "positive/negative".

### F4. Pengaduan dan chatbot (P4)

**Klasifikasi intent**
Model mengelompokkan pesan ke minimal 5 intent:

| Intent | Contoh pesan | Tindakan |
| :--- | :--- | :--- |
| `tanya_harga` | "Sewa kamar AC berapa sebulan?" | Jawab otomatis dari template |
| `tanya_fasilitas` | "Ada wifi dan parkir motor?" | Jawab otomatis |
| `tanya_aturan` | "Boleh bawa tamu menginap?" | Jawab otomatis |
| `tanya_kamar_kosong` | "Masih ada kamar kosong?" | Jawab otomatis dari data kamar |
| `keluhan` | "Air di kamar 5 mati dari pagi" | **Diteruskan ke pemilik** (masuk daftar pengaduan) |
| `lainnya` | "Halo" / di luar konteks | Jawaban sopan: tidak dapat membantu, tawarkan topik yang bisa |

**Chatbot publik (`/tanya`)**
- Menjawab dari template dan data kos. **Tanpa LLM.** Menampilkan 4 saran pertanyaan sebagai tombol besar.
- Pesan di luar konteks ditolak dengan sopan dan diarahkan ke topik yang bisa dijawab.
- Bila keyakinan model rendah (< 0.5): jawaban aman "Maaf, saya belum paham. Mau coba salah satu pertanyaan ini?" + saran.

**Pengaduan (`/pemilik/pengaduan`)**
- Daftar pesan masuk contoh. Keluhan ditandai dan punya kategori (air, listrik, wifi, kebersihan, kebisingan, lainnya) dari aturan kata kunci.
- Penjelasan visual singkat alurnya: pesan masuk → dipilah → dijawab sendiri atau diteruskan.
- Aksi "Tandai sudah ditangani". Hanya state browser.

**Kriteria penerimaan**
- [ ] 6 intent dikenali dengan akurasi uji sesuai bagian 7.
- [ ] Minimal 10 pertanyaan di luar konteks diuji dan ditolak dengan sopan (hasil di README).
- [ ] Saat layanan AI mati, chatbot beralih ke pencocokan kata kunci dan tetap menjawab.
- [ ] Tidak ada panggilan ke LLM atau API eksternal.

## 5. Arsitektur

```
Browser ──► Next.js (Vercel/Netlify)
              ├─ halaman (Server/Client Components)
              ├─ /api/v1/*  (route handler + Zod)
              └─ data JSON seed (read-only)
                    │  HTTPS, timeout 8 detik
                    ▼
              FastAPI (Render)  ── model .joblib
                 /v1/intent  /v1/sentiment  /v1/forecast  /health
```

- Browser hanya bicara dengan Next.js.
- Perubahan selama demo hidup di state browser. Tidak ada penulisan ke server.
- Bila FastAPI tidak merespons: lihat aturan fallback di AGENT.md.
- Variabel lingkungan: `AI_SERVICE_URL` (hanya server), `ALLOWED_ORIGIN` (FastAPI).

## 6. Kontrak API (draf awal, final di `docs/api-contract.md`)

Disepakati tim FS dan AI/DS **sebelum** implementasi.

**Web (Next.js)**

| Method & Path | Request | Response sukses | Galat |
| :--- | :--- | :--- | :--- |
| `GET /api/v1/forecast?metric=okupansi\|pendapatan&horizon=6` | query | `{ metric, history:[{bulan,nilai}], forecast:[{bulan,nilai,bawah,atas}], source:"live"\|"cached" }` | `400 VALIDATION_ERROR` |
| `POST /api/v1/sentiment` | `{ text }` (1–500 karakter) | `{ label:"positif"\|"netral"\|"negatif", confidence, source }` | `400 VALIDATION_ERROR` |
| `POST /api/v1/chat` | `{ message }` (1–500 karakter) | `{ intent, answer, confidence, suggestions:[string], source }` | `400 VALIDATION_ERROR`, `429 RATE_LIMITED` |

`source` menunjukkan apakah hasil dari layanan (`live`) atau pra-hitung/aturan (`cached`).

**Layanan AI (FastAPI)**: `POST /v1/intent`, `POST /v1/sentiment`, `GET /v1/forecast`, `GET /health`. Skema Pydantic setara di atas. Dokumentasi interaktif tersedia otomatis di `/docs` (OpenAPI).

**Kode galat baku:** `VALIDATION_ERROR`, `RATE_LIMITED`, `SERVICE_UNAVAILABLE`, `TIMEOUT`, `INTERNAL_ERROR`. Pesan selalu berbahasa Indonesia yang ramah (lihat styleguide).

## 7. Data dan model

### 7.1 Data dummy (dibuat AI agent, dikelola tim DS)

Semua data sintetis, dibuat oleh `ml/generate_data.py` dengan **seed tetap**, bahasa Indonesia sehari-hari.

| File di `/data` | Isi | Perkiraan ukuran |
| :--- | :--- | :--- |
| `kos.json` | Profil kos, fasilitas, aturan, FAQ | 1 kos |
| `rooms.json` | Kamar (id, nama, tipe, harga, fasilitas, status) | 24 kamar, 3 tipe |
| `tenants.json` | Penghuni fiktif (nama, kamar, tanggal masuk) | ±20 aktif |
| `payments.json` | Tagihan per penghuni per bulan | 6 bulan |
| `monthly_history.json` | Okupansi dan pendapatan bulanan | 24 bulan, pola musiman (naik saat tahun ajaran baru, turun saat libur panjang) + noise |
| `reviews.json` | Ulasan teks + label sentimen | ±600 ulasan, seimbang bertahap (positif > netral > negatif, wajar) |
| `intents.json` | Kalimat latih per intent | ±120 per intent, variasi gaya (formal, santai, typo ringan, campur singkatan) |
| `forecast.json` | Hasil prakiraan pra-hitung (fallback) | 2 metrik × 6 bulan |
| `data_dictionary.md` | Penjelasan tiap kolom | n/a |

**Aturan data**
- Nama fiktif, nomor telepon palsu, tidak meniru orang nyata.
- Setiap file punya metadata `"synthetic": true` dan `"generated_by"`, `"seed"`.
- README menuliskan **cara pembuatan, label dummy, dan keterbatasan**.
- Konsistensi lintas file (kamar terisi di `rooms` = penghuni aktif di `tenants`) diuji otomatis.

**Catatan jujur tentang metrik:** data teks sintetis dari template cenderung membuat skor model terlihat sangat tinggi. Laporan model **wajib** menyatakan bahwa skor tidak mewakili kinerja pada data nyata.

### 7.2 Model (ringan, muat di free tier ±512 MB)

| Tugas | Model dibandingkan (min. 2, metrik sama) | Metrik | Pembagian data |
| :--- | :--- | :--- | :--- |
| Forecasting okupansi & pendapatan | Baseline *seasonal naive* vs Holt-Winters vs SARIMA | MAE, MAPE | 18 bulan latih / 6 bulan uji (urut waktu, tanpa acak) |
| Sentimen (3 kelas) | TF-IDF + Logistic Regression vs TF-IDF + Linear SVM (opsi: Naive Bayes) | F1-macro, confusion matrix | 70/15/15 stratifikasi, tanpa kebocoran (TF-IDF dilatih hanya di data latih) |
| Intent (6 kelas) | TF-IDF + Logistic Regression vs Naive Bayes (opsi: SVM) | F1-macro, akurasi per intent | 70/15/15 stratifikasi |

- Hindari model besar (BERT dan sejenisnya) agar ringan dan cepat menyala di Render.
- Laporan di `ml/reports/` berisi tabel perbandingan dan alasan memilih model terbaik. Ringkasannya disalin ke README.
- Ambang kelulusan untuk tes otomatis: F1-macro ≥ 0.80 pada data uji sintetis; forecasting harus mengalahkan baseline pada MAE.
- Artefak model total < 50 MB.

## 8. Persyaratan non-fungsional

| Aspek | Persyaratan |
| :--- | :--- |
| Aksesibilitas | WCAG 2.1 AA; teks panel pemilik ≥ 18px; target sentuh ≥ 48px; fokus keyboard terlihat; grafik punya alternatif tabel |
| Responsif | 360px sampai desktop; diuji di 390px dan 1280px |
| Performa | LCP < 2,5 detik di jaringan 4G pada halaman beranda; bundel JS halaman publik dijaga kecil |
| Keandalan | Demo tetap berjalan penuh meski FastAPI mati (fallback); tidak ada halaman kosong atau galat teknis terlihat |
| Keamanan | Lihat AGENT.md bagian 5; tanpa data pribadi, tanpa rahasia di klien |
| Bahasa | Seluruh UI Bahasa Indonesia sederhana |
| Peramban | Chrome dan Safari terbaru, Android dan iOS |

## 9. Pengujian

| Level | Alat | Yang diuji |
| :--- | :--- | :--- |
| Unit | Vitest, pytest | Perhitungan ringkasan, filter tagihan, skema Zod/Pydantic, konsistensi data seed |
| Model | pytest | Model termuat, prediksi bentuk benar, ambang metrik |
| e2e | Playwright | (1) Tur demo selesai; (2) tandai lunas mengubah ringkasan; (3) reset data; (4) chatbot menjawab dan menolak di luar konteks; (5) fallback saat AI service dimatikan; (6) tangkapan layar 390px dan 1280px |
| Aksesibilitas | axe via Playwright | Tidak ada pelanggaran serius/kritis pada halaman utama |

## 10. Pembagian peran dan jadwal

### Peran (usulan, sesuaikan di kick-off internal)

| Peran | Tanggung jawab utama |
| :--- | :--- |
| FS 1 | Situs publik (beranda, kamar, fasilitas, aturan), tur demo, penerapan styleguide |
| FS 2 | Panel pemilik: dashboard, tagihan, ulasan, pengaduan, state demo dan reset |
| FS 3 | Route handler `/api/v1`, integrasi FastAPI, fallback, deploy, CI, Playwright |
| AI 1 | FastAPI, model intent, chatbot (template jawaban), uji pertanyaan di luar konteks |
| AI 2 | Model sentimen, perbandingan model, README bagian model, uji kualitas |
| DS | `generate_data.py`, data dictionary, EDA, model forecasting + perbandingan, `forecast.json`, validasi konsistensi data |

### Jadwal (mengacu timeline Asah)

| Periode | Target |
| :--- | :--- |
| Sebelum 15 Nov | Project Plan; kontrak API dan skema data disepakati; seed data v1 |
| 20–27 Nov | Kerangka situs, styleguide terpasang, **F1 selesai**, deploy pertama |
| 28 Nov–6 Des | **F2** dan **F3**, tur demo (F0), integrasi FastAPI + fallback |
| 7–13 Des | **F4**, perapian, uji aksesibilitas dan ponsel, sesi mentoring |
| 14–20 Des | Demo ke UMKM mitra, perbaikan kecil, **Project Brief (20 Des)**, 360 Feedback |

**Aturan potong bila waktu mepet:** korbankan dari bawah (F4 → F3 → F2). F0 dan F1 tidak boleh dipotong. Pada F4, chatbot cukup 4 saran pertanyaan dengan jawaban template bila model belum siap.

## 11. Risiko

| Risiko | Dampak | Penanganan |
| :--- | :--- | :--- |
| Cold start Render | Demo terasa macet saat tampil ke UMKM | Fallback pra-hitung; "bangunkan" layanan (buka `/health`) 5 menit sebelum demo |
| Pemilik menganggap ini data asli kosnya | Salah paham | Lencana "Data contoh" dan langkah 1 tur |
| Pemilik kewalahan dengan banyak menu | Menyerah di tengah | Panel dibatasi 5 menu, satu aksi utama per halaman, uji coba ke 1–2 orang tua sebelum demo |
| Skor model tampak terlalu bagus | Klaim menyesatkan | Catatan wajib di laporan dan README |
| Lingkup terlalu besar untuk 1 bulan | Fitur setengah jadi | Prioritas P1–P4 dan aturan potong di atas |

## 12. Pertanyaan terbuka (diputuskan tim)

- [ ] Nama final proyek dan nama kos fiktif.
- [ ] Domain: pakai subdomain bawaan Vercel/Netlify atau domain sendiri?
- [ ] Apakah ada 1–2 orang tua (pemilik kos mitra) yang bisa mencoba prototipe lebih awal untuk uji keterbacaan?
- [ ] Logo/identitas: cukup wordmark teks atau perlu ikon sederhana?
