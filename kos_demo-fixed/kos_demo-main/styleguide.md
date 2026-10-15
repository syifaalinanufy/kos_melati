# Styleguide: KosMudah

Panduan desain visual, sistem token antarmuka, dan gaya bahasa untuk situs demo **KosMudah**. 
Dirancang khusus dengan prinsip aksesibilitas tinggi dan ramah pengguna lanjut usia / non-teknis, berdasar arahan `AGENT.md` dan `spec.md`.

---

## 1. Prinsip Desain Utama

1. **Jelas dan Terbaca Seketika (Elderly-Friendly & High Contrast):**
   - Ukuran teks utama pada panel pemilik kos minimal **18px** (`text-lg`).
   - Kontras warna memenuhi standar **WCAG 2.1 AA** (rasio kontras teks terhadap latar minimal 4.5:1 untuk teks normal, 3:1 untuk teks besar).
   - Target sentuh (tombol, link, kartu interaktif) memiliki ukuran minimal **48px × 48px**.

2. **Mobile-First & Ergonomi Jempol (Thumb-Zone Priority):**
   - **Fokus Utama adalah Layar HP (360px – 430px)**. Tampilan desktop hanya adaptasi/skalabilitas sekunder.
   - Aksi-aksi utama (tombol "Tandai sudah bayar", navigasi tab/tur demo, aksi filter) diletakkan di area yang mudah dijangkau satu jempol (zona bawah layar / *bottom navigation / floating action bar*).
   - Card berjarak renggang, hindari elemen yang berdesakan agar tidak salah tekan oleh jari orang tua.
   - Tidak ada teks yang terpotong atau tabel lebar yang memaksa scroll horizontal di HP (gunakan format *stacked card list* alih-alih tabel biasa di HP).

3. **Tenang dan Terpercaya (Biru Ramah):**
   - Warna dominan biru laut/safir yang memberi kesan stabil, aman, dan dapat dipercaya, dipadukan dengan latar bersih hangat (*warm slate/white*) agar mata tidak cepat lelah.

3. **Status Multimodal (Tidak Bergantung Hanya pada Warna):**
   - Setiap indikator status (Lunas, Belum Bayar, Terisi, Kosong) **wajib** menyertakan kombinasi tiga elemen: **Ikon + Label Teks Jelas + Warna Latar/Teks Kontras**.

4. **Transparan & Tanpa Beban Mental:**
   - Lencana **"Data contoh"** tampil jelas di setiap tabel/data penghuni.
   - Tanpa istilah teknis/asing (misal: gunakan "Perkiraan pemasukan", bukan "Revenue forecast").

---

## 2. Palet Warna (Color Palette)

Tema utama: **Ocean Trust Blue** (Tailwind based).

### A. Warna Utama (Primary - Blue)
- **Primary 700 (Brand/Aksi Utama):** `#1D4ED8` (`blue-700`) — Kontras tinggi untuk teks tombol utama dan heading penting.
- **Primary 600 (Interaksi Hover):** `#2563EB` (`blue-600`) — State hover / fokus.
- **Primary 100 (Aksen Lembut):** `#DBEAFE` (`blue-100`) — Latar belakang kartu sorotan / badge aktif.
- **Primary 50 (Latar Panel/Hero):** `#EFF6FF` (`blue-50`) — Latar belakang section khusus.

### B. Warna Netral (Neutrals)
- **Teks Utama (Headings & Body):** `#0F172A` (`slate-900`) — Hitam slate pekat untuk keterbacaan tajam.
- **Teks Sekunder (Keterangan):** `#334155` (`slate-700`) — Kontras tetap tinggi (> 7:1 di atas putih).
- **Garis Batas (Border):** `#CBD5E1` (`slate-300`) — Pembatas kartu dan tabel yang tegas dan mudah dilihat.
- **Latar Halaman (Background):** `#F8FAFC` (`slate-50`) — Latar lembut tidak menyilaukan.
- **Latar Permukaan (Card Surface):** `#FFFFFF` (`white`).

### C. Warna Status & Semantik (Status Indicators)
*Catatan: Selalu sertakan teks dan ikon bersama warna ini.*

| Status | Teks & Ikon | Latar Badge | Ikon Lucide Rekomendasi |
| :--- | :--- | :--- | :--- |
| **Lunas / Sudah Bayar / Terisi** | `#166534` (`emerald-800`) | `#DCFCE7` (`emerald-100`) | `CheckCircle2` |
| **Belum Bayar / Menunggu** | `#854D0E` (`amber-800`) | `#FEF9C3` (`amber-100`) | `Clock` |
| **Terlambat / Keluhan / Kosong** | `#991B1B` (`red-800`) | `#FEE2E2` (`red-100`) | `AlertCircle` |
| **Data Contoh (Badge Wajib)** | `#1E40AF` (`blue-800`) | `#DBEAFE` (`blue-100`) | `Info` |

---

## 3. Tipografi (Typography)

Menggunakan font sistem sans-serif modern yang bersih dan memiliki legibilitas tinggi (Inter, Plus Jakarta Sans, atau default `system-ui`).

### Skala Tipografi (Panel Pemilik)
- **Judul Halaman (H1):** `text-2xl` sampai `text-3xl` (24px–30px), `font-bold`, `leading-tight`.
- **Judul Kartu/Sub-judul (H2):** `text-xl` (20px), `font-semibold`.
- **Kalimat Ringkasan Dashboard:** `text-xl` (20px), `font-medium`, `text-slate-800`.
- **Teks Isi Normal (Body):** `text-lg` (18px), `font-normal`, `text-slate-900`, `leading-relaxed` (1.6).
- **Teks Keterangan / Label Sekunder:** `text-base` (16px, jangan lebih kecil dari ini di panel pemilik).
- **Angka Metrik Besar (Stat/KPI):** `text-4xl` (36px), `font-extrabold`.

---

## 4. Komponen Antarmuka Utama

### A. Tombol (Buttons)
- **Tinggi Minimal:** `min-h-[48px]`, padding horizontal `px-6 py-3`.
- **Border Radius:** `rounded-lg` atau `rounded-xl` (terasa ramah dan modern).
- **Gaya Utama (Primary):** Background `bg-blue-700 text-white font-semibold hover:bg-blue-800 shadow-sm`.
- **Gaya Sekunder (Secondary/Outline):** `border-2 border-slate-300 bg-white text-slate-800 hover:bg-slate-100 font-semibold`.
- **Fokus Keyboard:** `focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:outline-none`.

### B. Kartu Metrik (Dashboard Cards)
- Border tegas `border border-slate-200 shadow-sm rounded-xl p-6 bg-white`.
- Angka besar di atas, label penjelasan sederhana di bawahnya.
- Menyediakan indikator visual yang jelas.

### C. Lencana "Data Contoh" (Sample Data Badge)
Wajib hadir di bagian header data atau tabel:
```html
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
  <InfoIcon class="w-4 h-4" />
  Data contoh
</span>
```

### D. Tur Demo Terpandu (Guided Tour Modal/Callout)
- Posisi: Melayang di dekat target sorotan (desktop) atau menempel di bawah layar / bottom sheet (mobile).
- Latar kotak: `bg-slate-900 text-white p-6 rounded-2xl shadow-2xl`.
- Ukuran teks penjelasan: `text-lg` (18px) kontras tajam.
- Tombol navigasi besar: **"Lanjut"** (primer putih/biru muda), **"Kembali"**, dan **"Keluar dari tur"** (Esc).

---

## 5. Pedoman Bahasa dan UI Copy (Bahasa Indonesia Sehari-hari)

Gunakan nada bicara yang sopan, hangat, jelas, dan menggunakan sapaan **"Anda"**. Hindari istilah teknis perbankan atau istilah pemrograman.

| ❌ Hindari (Terlalu Teknis / Kaku) | ✅ Gunakan (Bahasa Sehari-hari yang Ramah) |
| :--- | :--- |
| Occupancy Rate | Kamar terisi |
| Vacancy | Kamar kosong |
| Revenue Forecast | Perkiraan pemasukan |
| Due Date | Jatuh tempo bayar |
| Action: Mark as Paid | Tandai sudah bayar |
| Reset to Seed / Default Data | Kembalikan data contoh |
| Positive / Negative Sentiment | Terdengar puas / Ada keluhan |
| Ticket / Issue Tracker | Pengaduan penghuni |
| System Error / Fallback Mode | Sedang menyiapkan, menampilkan data contoh |
| Submit / Process | Simpan / Kirim |

---

## 6. Aksesibilitas & Responsivitas Checklist

- [x] Target interaksi minimal 48px × 48px pada perangkat layar sentuh.
- [x] Teks pada panel pemilik kos minimal 18px (`text-lg`).
- [x] Layout tanpa geser horizontal (*no horizontal scroll*) hingga layar selebar 360px.
- [x] Navigasi keyboard penuh (`Tab`, `Shift+Tab`, `Enter`, `Escape`).
- [x] Dukungan `prefers-reduced-motion` untuk mematikan animasi transisi yang berlebihan.
- [x] Kontras rasio teks terhadap latar belakang minimal 4.5:1 (WCAG 2.1 AA).
