# Kamus Data (Data Dictionary) - KosMudah

Dokumen ini menjelaskan struktur, relasi, dan arti setiap kolom/properti data sintetis pada folder `/data`.
Semua data dihasilkan otomatis oleh `ml/buat_data.py` dengan benih acak tetap (`seed=2026`).

---

## 1. `kos.json`
Menyimpan profil utama kos percontohan (Kos Melati Indah).
- `id` (string): Pengenal unik kos (contoh: `"kos-melati-indah"`).
- `nama` (string): Nama kos fiktif.
- `tagline` (string): Slogan singkat kos.
- `deskripsi` (string): Deskripsi umum properti kos.
- `tipe_kos` (string): Tipe penghuni (Campur/Putra/Putri).
- `total_kamar` (number): Jumlah keseluruhan unit kamar (24).
- `alamat` (object): Rincian alamat fiktif (`jalan`, `kecamatan`, `kota`, `patokan`).
- `fasilitas_umum` (array of string): Daftar fasilitas bersama.
- `aturan` (array of string): Peraturan tata tertib kos.
- `kontak_tanya` (object): Nomor WhatsApp fiktif dan jam operasional.

---

## 2. `kamar.json`
Menyimpan data fisik 24 unit kamar.
- `id` (string): Format `"KMR-01"` sampai `"KMR-24"`.
- `nomor` (string): Label kamar (contoh: `"Kamar 01"`).
- `lantai` (number): Lokasi lantai (Lantai 1: kamar 1–12, Lantai 2: kamar 13–24).
- `tipe` (string): `"Standar"`, `"Menengah"`, atau `"Utama"`.
- `harga_bulanan` (number): Tarif sewa per bulan dalam rupiah.
- `ukuran` (string): Dimensi luas kamar.
- `fasilitas` (array of string): Fasilitas di dalam kamar.
- `terisi` (boolean): `true` jika saat ini ada penghuni, `false` jika kosong.

---

## 3. `penghuni.json`
Menyimpan data penghuni fiktif yang sedang aktif (20 penghuni).
- `id` (string): Format `"PNH-01"` sampai `"PNH-20"`.
- `nama` (string): Nama fiktif penghuni (kombinasi nama Indonesia).
- `nomor_telepon` (string): Nomor telepon fiktif berpola `0800-xxxx-xxxx`.
- `kamar_id` (string): Referensi ke `kamar.json` (`id`).
- `nomor_kamar` (string): Referensi nomor kamar untuk tampilan cepat.
- `tipe_kamar` (string): Tipe kamar yang disewa.
- `harga_sewa` (number): Jumlah tagihan bulanan.
- `tanggal_masuk` (string YYYY-MM-DD): Tanggal mulai menghuni.
- `status` (string): `"aktif"`.

---

## 4. `tagihan.json`
Menyimpan catatan tagihan bulanan selama 6 bulan terakhir (Mei – Oktober 2026).
- `id` (string): Format `"TGH-0001"`.
- `penghuni_id` (string): Referensi ke `penghuni.json`.
- `nama_penghuni` (string): Nama penghuni terkait.
- `kamar_id` (string): ID kamar yang ditempati.
- `nomor_kamar` (string): Nomor kamar.
- `bulan` (string YYYY-MM): Periode tagihan (contoh: `"2026-10"`).
- `nama_bulan` (string): Nama bulan berbahasa Indonesia (contoh: `"Oktober 2026"`).
- `jumlah` (number): Nominal yang harus dibayar.
- `jatuh_tempo` (string YYYY-MM-DD): Batas pembayaran (tanggal 5 setiap bulan).
- `status` (string):
  - `"sudah_bayar"`: Sudah lunas.
  - `"belum_bayar"`: Belum dibayar dalam tenggat wajar.
  - `"terlambat"`: Melewati tanggal jatuh tempo.
- `tanggal_bayar` (string YYYY-MM-DD atau `null`): Tanggal pelunasan jika sudah bayar.

---

## 5. `riwayat_bulanan.json`
Menyimpan tren okupansi kamar dan pemasukan riil selama 24 bulan ke belakang.
- `bulan` (string YYYY-MM): Periode (2024-11 s/d 2026-10).
- `kamar_terisi` (number): Jumlah kamar terisi (memperhitungkan musiman ajaran baru).
- `total_kamar` (number): Kapasitas penuh (24).
- `tingkat_hunian_persen` (number): Persentase okupansi.
- `pendapatan` (number): Total omzet bulanan dalam rupiah.

---

## 6. `perkiraan.json`
Hasil estimasi pra-hitung (*fallback offline*) untuk 6 bulan ke depan (Nov 2026 – Apr 2027).
- `sumber` (string): `"pra_hitung"`.
- `wawasan` (string): Kalimat ringkas interpretasi tren dalam bahasa sehari-hari.
- `okupansi`:
  - `riwayat`: Deret data historis.
  - `perkiraan`: Nilai proyeksi beserta `batas_bawah` dan `batas_atas` rentang keyakinan.
- `pendapatan`:
  - `riwayat`: Deret data pendapatan historis.
  - `perkiraan`: Nilai proyeksi rupiah beserta rentang intervalnya.

---

## 7. `ulasan.json`
Kumpulan ±600 ulasan fiktif untuk analisis sentimen & evaluasi kepuasan.
- `id` (string): Format `"ULS-0001"`.
- `nama_penulis` (string): Nama peninjau (nama depan + inisial).
- `teks` (string): Kalimat ulasan.
- `label` (string): `"positif"`, `"netral"`, atau `"negatif"`.
- `label_awam` (string): `"Terdengar puas"`, `"Biasa saja"`, atau `"Ada keluhan"`.
- `tanggal` (string YYYY-MM-DD): Tanggal ulasan diberikan.

---

## 8. `niat.json`
Koleksi ±720 contoh percakapan untuk klasifikasi intent chatbot dan penyaringan keluhan.
- `teks` (string): Variasi pertanyaan/pesan dalam bahasa sehari-hari.
- `niat` (string):
  - `tanya_harga`
  - `tanya_fasilitas`
  - `tanya_aturan`
  - `tanya_kamar_kosong`
  - `keluhan` (otomatis diarahkan ke panel pengaduan pemilik)
  - `lainnya` (sapaan / di luar lingkup informasi kos)
