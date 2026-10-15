"""
Skrip pembuat data tiruan (sintetis) untuk proyek KosMudah.
Menghasilkan data JSON seed yang konsisten dan dapat direproduksi (seed tetap).

File yang dihasilkan di folder /data:
1. kos.json - Informasi profil kos contoh (Kos Melati Indah)
2. kamar.json - Daftar 24 kamar (3 tipe: Standar, Menengah, Utama)
3. penghuni.json - Daftar penghuni fiktif yang aktif
4. tagihan.json - Catatan tagihan 6 bulan terakhir
5. riwayat_bulanan.json - Okupansi dan pendapatan 24 bulan dengan pola musiman
6. ulasan.json - Sekitar 600 ulasan tiruan berlabel sentimen (positif, netral, negatif)
7. niat.json - Data latih klasifikasi intent percakapan (6 kategori)
8. perkiraan.json - Hasil prakiraan pra-hitung untuk cadangan (fallback) offline
"""

import json
import math
import os
import random
from datetime import datetime, timedelta

BENIH_ACAK = 2026
random.seed(BENIH_ACAK)

FOLDER_DATA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
os.makedirs(FOLDER_DATA, exist_ok=True)

METADATA_DASAR = {
    "sintetis": True,
    "dibuat_oleh": "ml/buat_data.py",
    "benih": BENIH_ACAK,
    "keterangan": "Semua data fiktif untuk keperluan situs demo KosMudah. Tidak ada data pribadi asli."
}

# 1. kos.json
def buat_data_kos():
    return {
        **METADATA_DASAR,
        "id": "kos-melati-indah",
        "nama": "Kos Melati Indah",
        "tagline": "Kos Bersih, Tenang, dan Nyaman Dekat Kampus",
        "deskripsi": "Kos contoh percontohan untuk mahasiswa dan pekerja muda dengan lingkungan asri, aman 24 jam, dan fasilitas lengkap.",
        "tipe_kos": "Campur / Tersedia Paviliun Putra & Putri",
        "total_kamar": 24,
        "alamat": {
            "jalan": "Jl. Mawar Melati No. 88 (Alamat Contoh)",
            "kecamatan": "Kecamatan Contoh",
            "kota": "Kota Pelajar",
            "patokan": "5 menit jalan kaki dari gerbang kampus utama"
        },
        "fasilitas_umum": [
            "WiFi kecepatan tinggi 100 Mbps",
            "Dapur bersama (kompor, gas, kulkas)",
            "Area parkir motor luas beratap",
            "Penjaga & CCTV 24 jam",
            "Ruang santai / belajar bersama",
            "Mesin cuci bersama & tempat jemuran luas"
        ],
        "aturan": [
            "Gerbang utama ditutup pukul 23.00 WIB (akses kunci pribadi jika lembur)",
            "Tamu lawan jenis dilarang masuk ke dalam kamar tidur pribadi",
            "Menjaga ketenangan bersama setelah pukul 22.00 WIB",
            "Dilarang merokok di dalam kamar dan area ber-AC",
            "Pembayaran sewa paling lambat tanggal 5 setiap bulannya"
        ],
        "kontak_tanya": {
            "whatsapp": "0800-0000-0001 (Nomor Fiktif Demo)",
            "jam_tanya": "08.00 - 20.00 WIB"
        }
    }

# 2. kamar.json
def buat_data_kamar():
    tipe_kamar_info = {
        "Standar": {
            "harga": 850000,
            "ukuran": "3x3 meter",
            "fasilitas": ["Kasur busa empuk", "Lemari pakaian 2 pintu", "Meja belajar & kursi", "Kipas angin gantung", "Kamar mandi luar bersih"]
        },
        "Menengah": {
            "harga": 1300000,
            "ukuran": "3x4 meter",
            "fasilitas": ["Kasur springbed", "Lemari pakaian cermin", "Meja kerja luas", "Kamar mandi dalam", "Kipas angin / ventilasi lega"]
        },
        "Utama": {
            "harga": 1850000,
            "ukuran": "4x4 meter",
            "fasilitas": ["Kasur springbed queen", "AC hemat listrik", "Kamar mandi dalam + shower air hangat", "Meja kerja ergonomis", "Smart TV mini"]
        }
    }

    kamar_list = []
    nomor_urut = 1

    distribusi = [
        ("Standar", 8),   # Kamar 1-8
        ("Menengah", 10), # Kamar 9-18
        ("Utama", 6)      # Kamar 19-24
    ]

    for tipe, jumlah in distribusi:
        for _ in range(jumlah):
            kamar_id = f"KMR-{nomor_urut:02d}"
            nomor_kamar = f"Kamar {nomor_urut:02d}"
            lantai = 1 if nomor_urut <= 12 else 2
            
            kamar_list.append({
                "id": kamar_id,
                "nomor": nomor_kamar,
                "lantai": lantai,
                "tipe": tipe,
                "harga_bulanan": tipe_kamar_info[tipe]["harga"],
                "ukuran": tipe_kamar_info[tipe]["ukuran"],
                "fasilitas": tipe_kamar_info[tipe]["fasilitas"],
                "terisi": False  # Akan disinkronkan dengan penghuni
            })
            nomor_urut += 1

    return kamar_list

# 3. penghuni.json dan sinkronisasi status kamar
NAMA_DEPAN = ["Budi", "Siti", "Rian", "Dewi", "Agus", "Rina", "Dimas", "Ayu", "Fajar", "Nadia", "Rizky", "Maya", "Doni", "Tiara", "Andi", "Putri", "Hendra", "Intan", "Bayu", "Lestari", "Eko", "Fitri"]
NAMA_BELAKANG = ["Santoso", "Rahayu", "Pratama", "Kusuma", "Saputra", "Wulandari", "Hidayat", "Lestari", "Setiawan", "Utami", "Wijaya", "Permata", "Ramadhan", "Nugroho", "Gunawan"]

def buat_data_penghuni_dan_kamar(daftar_kamar):
    # Target 20 kamar terisi dari 24 kamar
    jumlah_kamar = len(daftar_kamar)
    indeks_kamar_terpilih = sorted(random.sample(range(jumlah_kamar), 20))
    
    penghuni_list = []
    penghuni_ke = 1
    
    for idx in indeks_kamar_terpilih:
        kamar = daftar_kamar[idx]
        kamar["terisi"] = True
        
        nama_lengkap = f"{random.choice(NAMA_DEPAN)} {random.choice(NAMA_BELAKANG)}"
        no_telepon_fiktif = f"0800-00{penghuni_ke:02d}-{random.randint(1000, 9999)}"
        bulan_masuk_mundur = random.randint(1, 14)
        tanggal_masuk = (datetime(2026, 10, 1) - timedelta(days=bulan_masuk_mundur * 30)).strftime("%Y-%m-%d")
        
        penghuni_list.append({
            "id": f"PNH-{penghuni_ke:02d}",
            "nama": nama_lengkap,
            "nomor_telepon": no_telepon_fiktif,
            "kamar_id": kamar["id"],
            "nomor_kamar": kamar["nomor"],
            "tipe_kamar": kamar["tipe"],
            "harga_sewa": kamar["harga_bulanan"],
            "tanggal_masuk": tanggal_masuk,
            "status": "aktif"
        })
        penghuni_ke += 1

    return penghuni_list, daftar_kamar

# 4. tagihan.json (6 bulan terakhir: Mei 2026 s/d Oktober 2026)
def buat_data_tagihan(daftar_penghuni):
    daftar_bulan = [
        ("2026-05", "Mei 2026"),
        ("2026-06", "Juni 2026"),
        ("2026-07", "Juli 2026"),
        ("2026-08", "Agustus 2026"),
        ("2026-09", "September 2026"),
        ("2026-10", "Oktober 2026"), # Bulan berjalan saat ini
    ]

    tagihan_list = []
    id_tagihan = 1

    for kode_bulan, nama_bulan in daftar_bulan:
        tahun, bln = map(int, kode_bulan.split("-"))
        jatuh_tempo = f"{kode_bulan}-05"
        
        for p in daftar_penghuni:
            # Periksa apakah penghuni sudah masuk pada bulan ini
            tgl_masuk = datetime.strptime(p["tanggal_masuk"], "%Y-%m-%d")
            tgl_tagihan = datetime(tahun, bln, 1)
            if tgl_tagihan < datetime(tgl_masuk.year, tgl_masuk.month, 1):
                continue
            
            # Tentukan status bayar
            if kode_bulan == "2026-10":
                # Bulan berjalan: 3 belum bayar (1 terlambat, 2 belum bayar), sisanya sudah lunas
                if id_tagihan % 7 == 0:
                    status = "terlambat"
                    tgl_bayar = None
                elif id_tagihan % 5 == 0:
                    status = "belum_bayar"
                    tgl_bayar = None
                else:
                    status = "sudah_bayar"
                    tgl_bayar = f"{kode_bulan}-0{random.randint(1, 4):02d}"
            else:
                # Bulan-bulan lampau: hampir semua lunas
                if random.random() < 0.95:
                    status = "sudah_bayar"
                    tgl_bayar = f"{kode_bulan}-0{random.randint(2, 5):02d}"
                else:
                    status = "terlambat"
                    tgl_bayar = f"{kode_bulan}-1{random.randint(0, 5):02d}"

            tagihan_list.append({
                "id": f"TGH-{id_tagihan:04d}",
                "penghuni_id": p["id"],
                "nama_penghuni": p["nama"],
                "kamar_id": p["kamar_id"],
                "nomor_kamar": p["nomor_kamar"],
                "bulan": kode_bulan,
                "nama_bulan": nama_bulan,
                "jumlah": p["harga_sewa"],
                "jatuh_tempo": jatuh_tempo,
                "status": status,
                "tanggal_bayar": tgl_bayar
            })
            id_tagihan += 1

    return tagihan_list

# 5. riwayat_bulanan.json (24 bulan: Nov 2024 s/d Okt 2026)
def buat_riwayat_bulanan():
    riwayat = []
    tahun_mulai = 2024
    bulan_mulai = 11

    total_kamar = 24
    rata_harga = 1250000

    for i in range(24):
        bln_idx = (bulan_mulai - 1 + i) % 12 + 1
        thn = tahun_mulai + (bulan_mulai - 1 + i) // 12
        kode_bulan = f"{thn}-{bln_idx:02d}"

        # Pola musiman kos-kosan dekat kampus:
        # Puncak: Juli - September (Ajaran baru / mahasiswa masuk)
        # Rendah: Desember - Januari & Juni (Libur semester)
        faktor_musim = 0
        if bln_idx in [7, 8, 9]:
            faktor_musim = 3.5
        elif bln_idx in [12, 1, 6]:
            faktor_musim = -2.5
        
        noise = random.uniform(-1.0, 1.0)
        okupansi = int(round(18 + faktor_musim + noise))
        okupansi = max(12, min(total_kamar, okupansi))

        pendapatan = int(okupansi * rata_harga * random.uniform(0.96, 1.04))
        # Pembulatan ke ribuan terdekat
        pendapatan = round(pendapatan / 50000) * 50000

        riwayat.append({
            "bulan": kode_bulan,
            "kamar_terisi": okupansi,
            "total_kamar": total_kamar,
            "tingkat_hunian_persen": round((okupansi / total_kamar) * 100, 1),
            "pendapatan": pendapatan
        })

    return riwayat

# 6. perkiraan.json (Prakiraan 6 bulan ke depan: Nov 2026 s/d Apr 2027)
def buat_data_perkiraan(riwayat):
    perkiraan_okupansi = []
    perkiraan_pendapatan = []

    bulan_depan = [
        ("2026-11", 20, 18, 22, 25000000, 22500000, 27500000),
        ("2026-12", 17, 15, 19, 21500000, 19000000, 24000000), # Libur semester
        ("2027-01", 18, 16, 20, 22500000, 20000000, 25000000),
        ("2027-02", 21, 19, 23, 26000000, 23500000, 28500000), # Masuk semester baru
        ("2027-03", 21, 19, 23, 26000000, 23500000, 28500000),
        ("2027-04", 20, 18, 22, 25000000, 22500000, 27500000),
    ]

    for kode_bln, ok_nilai, ok_bawah, ok_atas, p_nilai, p_bawah, p_atas in bulan_depan:
        perkiraan_okupansi.append({
            "bulan": kode_bln,
            "nilai": ok_nilai,
            "batas_bawah": ok_bawah,
            "batas_atas": ok_atas
        })
        perkiraan_pendapatan.append({
            "bulan": kode_bln,
            "nilai": p_nilai,
            "batas_bawah": p_bawah,
            "batas_atas": p_atas
        })

    riwayat_okupansi = [{"bulan": r["bulan"], "nilai": r["kamar_terisi"]} for r in riwayat]
    riwayat_pendapatan = [{"bulan": r["bulan"], "nilai": r["pendapatan"]} for r in riwayat]

    return {
        **METADATA_DASAR,
        "sumber": "pra_hitung",
        "wawasan": "Bulan Desember diprediksi sedikit menurun karena masa libur semester. Hunian akan kembali ramai pada bulan Februari saat perkuliahan dimulai.",
        "okupansi": {
            "satuan": "kamar",
            "riwayat": riwayat_okupansi,
            "perkiraan": perkiraan_okupansi
        },
        "pendapatan": {
            "satuan": "rupiah",
            "riwayat": riwayat_pendapatan,
            "perkiraan": perkiraan_pendapatan
        }
    }

# 7. ulasan.json (±600 ulasan berimbang bertahap)
TEMPLAT_ULASAN_POSITIF = [
    "Kamar sangat bersih dan nyaman, betah tinggal di sini.",
    "WiFi super kencang, sangat membantu untuk kuliah online dan ngerjain skripsi.",
    "Bapak dan ibu kos ramah sekali, selalu sigap kalau ada kendala fasilitas.",
    "Lingkungan tenang, aman, parkiran motor luas dan ada CCTV.",
    "Fasilitas lengkap sesuai harga, air lancar dan kamar mandi terawat.",
    "Lokasi strategis banget, jalan kaki ke kampus cuma 5 menit.",
    "Dapur bersama bersih dan peralatan masaknya lengkap.",
    "Sangat recommended untuk anak rantau yang butuh suasana belajar tenang.",
    "Sudah setahun ngekos di sini dan selalu puas dengan pelayanannya.",
    "Udara di kos segar, ventilasi kamar bagus dan tidak pengap."
]

TEMPLAT_ULASAN_NETRAL = [
    "Kamar lumayan nyaman, fasilitas standar sesuai harga.",
    "Tempatnya oke, cuma kalau malam parkiran motor agak penuh.",
    "WiFi kadang agak lambat kalau jam sibuk, tapi masih bisa dipakai.",
    "Air lancar, tapi tekanan shower di lantai 2 agak kecil.",
    "Lokasi strategis, hanya saja suara kendaraan dari jalan raya kadang terdengar.",
    "Dapur bersama cukup bersih, tapi sesekali ada yang lupa cuci piring.",
    "Harga sewa tergolong standar di daerah sekitar kampus.",
    "Kamar mandi luar lumayan terawat, jarang antre.",
    "Penjaga kos cukup ramah walau kadang susah ditemui pas siang.",
    "Secara umum biasa saja, tidak ada yang terlalu istimewa tapi cukup baik."
]

TEMPLAT_ULASAN_NEGATIF = [
    "WiFi sering putus nyambung pas jam sibuk malam hari, tolong diperbaiki.",
    "Air sempat mati kemarin pagi dan agak lama nyalanya.",
    "Ada penghuni kamar sebelah yang suka berisik dan stel musik malam-malam.",
    "Tempat sampah di dapur bersama kadang telat diangkut sehingga bau.",
    "Parkiran motor sempit kalau semua penghuni bawa motor.",
    "Lampu lorong lantai 2 sempat mati dua hari belum diganti.",
    "Tekanan air kran kamar mandi sangat kecil kalau pagi hari.",
    "Kunci gerbang utama agak macet dan susah diputar.",
    "Sinyal seluler agak susah di kamar bagian dalam.",
    "Harga naik sedikit tapi kecepatan internet belum ada peningkatan."
]

KATA_VARIASI = ["banget", "sih", "beneran", "pokoknya", "overall", "menurut saya", "sebenarnya", "lumayan", "agak", "cukup"]

def buat_data_ulasan():
    ulasan_list = []
    id_ulasan = 1

    # Distribusi wajar: 330 Positif (55%), 180 Netral (30%), 90 Negatif (15%) = 600 total
    kategori_data = [
        ("positif", TEMPLAT_ULASAN_POSITIF, 330),
        ("netral", TEMPLAT_ULASAN_NETRAL, 180),
        ("negatif", TEMPLAT_ULASAN_NEGATIF, 90)
    ]

    for label, template_list, kuota in kategori_data:
        for _ in range(kuota):
            teks = random.choice(template_list)
            # Berikan variasi ringan
            if random.random() < 0.4:
                tambahan = random.choice(KATA_VARIASI)
                teks = f"{teks} ({tambahan})" if random.random() < 0.2 else f"{tambahan.capitalize()}, {teks.lower()}"

            tgl = (datetime(2026, 10, 15) - timedelta(days=random.randint(1, 180))).strftime("%Y-%m-%d")
            nama_penulis = f"{random.choice(NAMA_DEPAN)} {random.choice(NAMA_BELAKANG)[0]}."

            ulasan_list.append({
                "id": f"ULS-{id_ulasan:04d}",
                "nama_penulis": nama_penulis,
                "teks": teks,
                "label": label,
                "label_awam": "Terdengar puas" if label == "positif" else ("Biasa saja" if label == "netral" else "Ada keluhan"),
                "tanggal": tgl
            })
            id_ulasan += 1

    random.shuffle(ulasan_list)
    return ulasan_list

# 8. niat.json (Dataset Latih Intent Chatbot & Pengaduan, ±120 contoh per kategori)
INTENT_TEMPLATES = {
    "tanya_harga": [
        "Sewa kamar per bulan berapa ya?",
        "Berapa harga kamar paling murah di sini?",
        "Ada rincian harga untuk kamar AC dan non AC?",
        "Biaya per bulan sudah termasuk listrik dan air belum?",
        "Harga sewa kamar utama berapa kak?",
        "Kamar standar harganya berapa sebulan?",
        "Apakah ada potongan harga kalau bayar langsung per tahun?",
        "Berapa tarif sewa kamar mandi dalam?",
        "Bisa bayar sewa per 3 bulan atau harus per bulan?",
        "Info pricelist kamar kos terbaru dong kak."
    ],
    "tanya_fasilitas": [
        "Fasilitas kamarnya apa saja ya?",
        "Apakah ada wifi dan parkiran motor yang aman?",
        "Ada fasilitas dapur bersama dan kulkas?",
        "Kamar mandinya di dalam atau di luar?",
        "Apakah disediakan kasur dan lemari pakaian?",
        "Bisa pasang AC sendiri di kamar standar?",
        "Ada mesin cuci bersama untuk penghuni?",
        "Apakah ada penjaga kos dan CCTV 24 jam?",
        "Kecepatan WiFi di sini berapa Mbps ya?",
        "Tempat parkir muat untuk mobil tidak ya?"
    ],
    "tanya_aturan": [
        "Jam malam di kos sampai jam berapa ya?",
        "Apakah boleh bawa teman menginap di kamar?",
        "Aturan untuk tamu lawan jenis seperti apa kak?",
        "Boleh pasang alat elektronik tambahan seperti dispenser?",
        "Apakah boleh bawa hewan peliharaan seperti kucing?",
        "Gerbang kos dikunci jam berapa kalau pulang malam?",
        "Aturan merokok di kosan bagaimana ya?",
        "Boleh masak di dalam kamar tidak ya?",
        "Bagaimana aturan parkir kendaraan tamu?",
        "Kunci gerbang dipegang masing-masing anak kos atau bagaimana?"
    ],
    "tanya_kamar_kosong": [
        "Apakah masih ada kamar kosong untuk bulan ini?",
        "Kamar tipe menengah masih ada yang ready?",
        "Bisa pesan kamar kosong untuk mulai bulan depan?",
        "Ada sisa berapa kamar kosong sekarang?",
        "Kamar AC lantai satu masih tersedia?",
        "Mau tanya ketersediaan kamar untuk mahasiswa baru.",
        "Apakah kamar mandi dalam masih ada yang kosong?",
        "Saya mau survei, ada kamar kosong yang bisa dilihat?",
        "Kamar kosong tersedia mulai tanggal berapa ya kak?",
        "Masih bisa sewa kamar kosong sekarang?"
    ],
    "keluhan": [
        "Air di kamar mandi saya mati dari pagi tolong dicek.",
        "WiFi kos tidak bisa konek sama sekali dari semalam.",
        "Kran air di wastafel bocor dan menetes terus.",
        "Lampu utama kamar saya kedip-kedip lalu mati.",
        "AC di kamar kurang dingin dan agak berisik suaranya.",
        "Saluran pembuangan air di kamar mandi agak mampet.",
        "Tetangga kamar sebelah berisik banget stel musik larut malam.",
        "Kunci pintu gerbang depan macet susah dibuka.",
        "Tempat sampah di dapur bersama sudah penuh dan bau.",
        "Genteng kamar sepertinya bocor ada rembesan air hujan."
    ],
    "lainnya": [
        "Halo selamat pagi kak",
        "Assalamu alaikum",
        "Permisi mau tanya sesuatu",
        "Selamat siang bapak ibu",
        "Terima kasih atas informasinya ya",
        "Oke baik kak saya catat dulu",
        "Siang kak kosannya buka jam berapa?",
        "Wah tempatnya bagus ya",
        "Siap nanti saya kabari lagi",
        "Sampai jumpa lagi ya kak"
    ]
}

VARIASI_GAYA = [
    lambda s: s.lower(),
    lambda s: s + " trims",
    lambda s: "min, " + s.lower(),
    lambda s: s + " yaa",
    lambda s: s.replace("apa saja", "ap aj").replace("berapa", "brp"),
    lambda s: s.replace("tidak", "nggak").replace("bisa", "bs"),
    lambda s: s
]

def buat_data_niat():
    data_niat = []
    
    for intent, list_teks in INTENT_TEMPLATES.items():
        count = 0
        while count < 120:
            teks_dasar = random.choice(list_teks)
            transformasi = random.choice(VARIASI_GAYA)
            teks_akhir = transformasi(teks_dasar)
            
            data_niat.append({
                "teks": teks_akhir,
                "niat": intent
            })
            count += 1

    random.shuffle(data_niat)
    return data_niat

def utama():
    print("Mulai membuat data tiruan KosMudah...")

    data_kos = buat_data_kos()
    with open(os.path.join(FOLDER_DATA, "kos.json"), "w", encoding="utf-8") as f:
        json.dump(data_kos, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/kos.json")

    daftar_kamar_awal = buat_data_kamar()
    daftar_penghuni, daftar_kamar = buat_data_penghuni_dan_kamar(daftar_kamar_awal)

    with open(os.path.join(FOLDER_DATA, "kamar.json"), "w", encoding="utf-8") as f:
        json.dump({"metadata": METADATA_DASAR, "daftar_kamar": daftar_kamar}, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/kamar.json")

    with open(os.path.join(FOLDER_DATA, "penghuni.json"), "w", encoding="utf-8") as f:
        json.dump({"metadata": METADATA_DASAR, "daftar_penghuni": daftar_penghuni}, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/penghuni.json")

    daftar_tagihan = buat_data_tagihan(daftar_penghuni)
    with open(os.path.join(FOLDER_DATA, "tagihan.json"), "w", encoding="utf-8") as f:
        json.dump({"metadata": METADATA_DASAR, "daftar_tagihan": daftar_tagihan}, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/tagihan.json")

    riwayat_bulanan = buat_riwayat_bulanan()
    with open(os.path.join(FOLDER_DATA, "riwayat_bulanan.json"), "w", encoding="utf-8") as f:
        json.dump({"metadata": METADATA_DASAR, "riwayat_bulanan": riwayat_bulanan}, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/riwayat_bulanan.json")

    data_perkiraan = buat_data_perkiraan(riwayat_bulanan)
    with open(os.path.join(FOLDER_DATA, "perkiraan.json"), "w", encoding="utf-8") as f:
        json.dump(data_perkiraan, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/perkiraan.json")

    daftar_ulasan = buat_data_ulasan()
    with open(os.path.join(FOLDER_DATA, "ulasan.json"), "w", encoding="utf-8") as f:
        json.dump({"metadata": METADATA_DASAR, "daftar_ulasan": daftar_ulasan}, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/ulasan.json")

    data_niat = buat_data_niat()
    with open(os.path.join(FOLDER_DATA, "niat.json"), "w", encoding="utf-8") as f:
        json.dump({"metadata": METADATA_DASAR, "data_niat": data_niat}, f, ensure_ascii=False, indent=2)
    print("[V] Berhasil membuat data/niat.json")

    print("\nSemua data seed sintetis berhasil dibuat di folder /data dengan seed tetap!")

if __name__ == "__main__":
    utama()
