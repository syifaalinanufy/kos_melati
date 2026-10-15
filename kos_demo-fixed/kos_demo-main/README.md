# KosMudah 🏡

> **Situs Demo Interaktif Pengelolaan Kos-Kosan Khusus Layar HP**  
> Dibuat untuk UMKM pemilik kos dengan prinsip: **Teks Besar, Tampilan Bersih, Ergonomis untuk Satu Jempol, dan 100% Aman Tanpa Data Pribadi.**

---

## 📌 Sekilas Proyek

KosMudah dibangun untuk mengatasi tiga keraguan utama pemilik kos:
1. **Privasi & Keamanan Data:** Tidak ada database atau data pribadi nyata. Seluruh data penghuni, kamar, dan tagihan adalah **data contoh (sintetis)** yang dibuat oleh generator Python dengan seed tetap.
2. **Kenyamanan Orang Tua:** Dirancang khusus untuk layar HP (360px – 430px) dengan sistem navigasi bawah (*bottom navigation*), teks tebal terbaca seketika (*glanceable*), dan alur yang sederhana tanpa membingungkan.
3. **Simulasi Interaktif:** Pemilik kos bisa langsung mencoba aksi seperti *"Tandai Sudah Bayar"* atau *"Tandai Aduan Ditangani"* yang langsung memperbarui ringkasan di layar (disimpan di state browser/`sessionStorage`) dan dapat dikembalikan ke semula dengan satu tombol **"Reset Demo"**.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons
- **Data & Seed:** Python 3 (Generator sintetis konsisten tanpa database)
- **Desain UI/UX:** Gaya *Swiss Minimalist Utility* mengacu pada standar `styleguide.md` & UI/UX Pro Max

---

## 📂 Struktur Folder Monorepo

```text
/
├─ AGENT.md                 # Panduan kerja teknis dan batasan arsitektur
├─ spec.md                  # Spesifikasi fitur dan kriteria keberhasilan
├─ styleguide.md            # Panduan warna, tipografi, dan aksesibilitas mobile
├─ package.json             # Root monorepo pnpm
├─ pnpm-workspace.yaml      # Konfigurasi workspace
├─ data/                    # Sumber kebenaran (Single Source of Truth) data JSON
│  ├─ kos.json              # Profil & aturan kos
│  ├─ kamar.json            # 24 data kamar
│  ├─ penghuni.json         # 20 penghuni fiktif
│  ├─ tagihan.json          # Riwayat tagihan 6 bulan
│  ├─ riwayat_bulanan.json  # Tren 24 bulan
│  ├─ perkiraan.json        # Prakiraan 6 bulan ke depan
│  ├─ ulasan.json           # 600 ulasan kepuasan
│  ├─ niat.json             # Data latih percakapan chatbot
│  └─ data_dictionary.md    # Kamus data lengkap
├─ ml/
│  └─ buat_data.py          # Generator data sintetis berbasis seed
└─ apps/
   └─ web/                  # Aplikasi Web Next.js (Mobile-First)
      ├─ app/               # Halaman publik & panel pemilik (/pemilik)
      ├─ components/        # Komponen UI (Navigasi Bawah, Header, Badge)
      ├─ lib/               # Data loader & Konteks state demo
      └─ data/              # Salinan sinkronisasi data seed
```

---

## 🚀 Panduan Menjalankan Proyek (Cara Run)

### 1. Prasyarat Sistem
Pastikan di komputer Anda sudah terpasang:
- **Node.js** (versi 18 atau lebih baru)
- **Python** (versi 3.9 atau lebih baru)
- **pnpm** (disarankan) atau npm

### 2. Pemasangan Dependensi
Buka terminal pada direktori utama proyek (`D:\Kos (ASAH)`), lalu jalankan:
```bash
pnpm install
```

### 3. Generate & Sinkronkan Data Contoh
Jika ingin memperbarui data seed tiruan ke aplikasi web:
```bash
# Membuat data JSON seed di folder /data
python ml/buat_data.py

# Menyalin data ke apps/web/data
pnpm run salin-data
```

### 4. Menjalankan Server Pengembangan (Dev Mode)
Jalankan perintah berikut:
```bash
pnpm --filter web dev
```
Aplikasi akan aktif di **`http://localhost:3000`**.

### 5. Membangun & Menjalankan Versi Produksi (Production Build)
Untuk performa optimal dan pengujian rilis:
```bash
# Build aplikasi
pnpm --filter web build

# Jalankan server produksi
pnpm --filter web start --port 3000
```

---

## 📱 Cara Mencoba dengan Tampilan HP Terbaik

Karena antarmuka dirancang khusus untuk kenyamanan pengguna HP:
1. Buka **`http://localhost:3000`** di browser Chrome atau Edge.
2. Buka Developer Tools dengan menekan tombol **`F12`** atau **`Ctrl + Shift + I`**.
3. Aktifkan **Device Toolbar** (**`Ctrl + Shift + M`**).
4. Pilih tampilan smartphone seperti **iPhone 14**, **Pixel 7**, atau dimensi layar **390 × 844 px**.
5. Buka menu **Panel Pemilik** di `/pemilik` untuk mencoba:
   - Melihat kalimat kondisi kos hari ini.
   - Buka menu **Tagihan** dan coba tombol **"Tandai Sudah Bayar"**.
   - Coba tombol **"Reset Demo"** di pojok kanan atas untuk mengembalikan data awal.
   - Buka menu **Perkiraan** untuk melihat estimasi tren 6 bulan ke depan.
   - Buka menu **Pengaduan** untuk mencoba menyelesaikan keluhan fasilitas.

---

## 📜 Lisensi & Catatan Etika Data
Semua data identitas, nama orang, nomor kontak, dan kamar pada situs ini adalah sintetis dan dihasilkan secara komputasi. Proyek ini dibuat untuk keperluan Capstone Demo Interaktif.
