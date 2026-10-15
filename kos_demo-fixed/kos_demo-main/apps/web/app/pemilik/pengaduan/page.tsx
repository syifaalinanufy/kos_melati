'use client';

import React, { useState } from 'react';
import { KepalaHalamanPemilik } from '@/components/KepalaHalamanPemilik';
import {
  AlertTriangle,
  CheckCircle2,
  Wifi,
  Droplets,
  Zap,
  Volume2,
  Trash2,
  HelpCircle,
} from 'lucide-react';

interface Pengaduan {
  id: string;
  penghuni: string;
  kamar: string;
  kategori: 'air' | 'wifi' | 'listrik' | 'kebisingan' | 'kebersihan';
  teks: string;
  waktu: string;
  status: 'perlu_tindakan' | 'sudah_ditangani';
}

const CONTOH_PENGADUAN_AWAL: Pengaduan[] = [
  {
    id: 'ADU-01',
    penghuni: 'Budi Santoso',
    kamar: 'Kamar 03',
    kategori: 'air',
    teks: 'Air kran di kamar mandi mampet sejak tadi pagi.',
    waktu: 'Hari ini, 08.15 WIB',
    status: 'perlu_tindakan',
  },
  {
    id: 'ADU-02',
    penghuni: 'Rina Wulandari',
    kamar: 'Kamar 07',
    kategori: 'wifi',
    teks: 'Sinyal WiFi lantai 1 tidak bisa terhubung sama sekali.',
    waktu: 'Kemarin, 21.00 WIB',
    status: 'perlu_tindakan',
  },
  {
    id: 'ADU-03',
    penghuni: 'Dimas Setiawan',
    kamar: 'Kamar 12',
    kategori: 'listrik',
    teks: 'Lampu lorong depan kamar mati, gelap kalau malam.',
    waktu: '2 hari lalu',
    status: 'sudah_ditangani',
  },
];

export default function HalamanPengaduanPemilik() {
  const [daftarPengaduan, setDaftarPengaduan] = useState<Pengaduan[]>(CONTOH_PENGADUAN_AWAL);

  const tanganiSelesai = (id: string) => {
    setDaftarPengaduan((lama) =>
      lama.map((p) => (p.id === id ? { ...p, status: 'sudah_ditangani' } : p))
    );
  };

  const ambilIkonKategori = (kategori: Pengaduan['kategori']) => {
    switch (kategori) {
      case 'air':
        return <Droplets className="w-4 h-4 text-blue-600" />;
      case 'wifi':
        return <Wifi className="w-4 h-4 text-indigo-600" />;
      case 'listrik':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'kebisingan':
        return <Volume2 className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="pb-10">
      <KepalaHalamanPemilik
        judul="Kotak Pengaduan Masuk"
        subjudul="Keluhan fasilitas yang otomatis dipilah untuk Anda"
        tampilkanKembali
      />

      <div className="p-4 space-y-4">
        {/* Penjelasan Alur Cerdas */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
          <p className="font-bold text-sm text-blue-950 mb-1">Cara Pesan Bekerja:</p>
          Pertanyaan umum calon penghuni (harga, aturan) langsung dijawab oleh asisten. Hanya keluhan penting yang diteruskan langsung ke layar Anda di sini.
        </div>

        {/* Daftar Keluhan */}
        <div className="space-y-3">
          {daftarPengaduan.map((aduan) => {
            const selesai = aduan.status === 'sudah_ditangani';

            return (
              <div
                key={aduan.id}
                className={`p-4 rounded-2xl border transition-all ${
                  selesai ? 'bg-slate-50/80 border-slate-200' : 'bg-white border-red-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-slate-100 rounded-lg">
                      {ambilIkonKategori(aduan.kategori)}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{aduan.penghuni}</h3>
                      <p className="text-[11px] text-slate-500 font-medium">{aduan.kamar} • {aduan.waktu}</p>
                    </div>
                  </div>

                  {selesai ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selesai
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Perlu Tindakan
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3 leading-relaxed">
                  &ldquo;{aduan.teks}&rdquo;
                </p>

                {!selesai && (
                  <button
                    type="button"
                    onClick={() => tanganiSelesai(aduan.id)}
                    className="target-sentuh w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tandai Sudah Ditangani</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
