'use client';

import React from 'react';
import { KepalaHalamanPemilik } from '@/components/KepalaHalamanPemilik';
import { daftarUlasanAwal } from '@/lib/data-sumber';
import { Smile, Meh, Frown } from 'lucide-react';

export default function HalamanUlasanPemilik() {
  const totalUlasan = daftarUlasanAwal.length;
  const jumlahPositif = daftarUlasanAwal.filter((u) => u.label === 'positif').length;
  const jumlahNetral = daftarUlasanAwal.filter((u) => u.label === 'netral').length;
  const jumlahNegatif = daftarUlasanAwal.filter((u) => u.label === 'negatif').length;

  const persenPositif = Math.round((jumlahPositif / totalUlasan) * 100);
  const persenNetral = Math.round((jumlahNetral / totalUlasan) * 100);
  const persenNegatif = Math.round((jumlahNegatif / totalUlasan) * 100);

  return (
    <div className="pb-10">
      <KepalaHalamanPemilik
        judul="Kesan & Ulasan Penghuni"
        subjudul="Ketahui apa yang disukai dan hal yang perlu diperbaiki"
        tampilkanKembali
      />

      <div className="p-4 space-y-4">
        {/* Ringkasan Kesan Utama */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tingkat Kepuasan ({totalUlasan} Ulasan)
          </h2>

          {/* 3 Kotak Persentase */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <Smile className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
              <p className="text-xl font-black text-emerald-800">{persenPositif}%</p>
              <p className="text-[11px] font-bold text-emerald-700">Puas</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <Meh className="w-5 h-5 text-slate-600 mx-auto mb-1" />
              <p className="text-xl font-black text-slate-800">{persenNetral}%</p>
              <p className="text-[11px] font-bold text-slate-600">Biasa Saja</p>
            </div>
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl">
              <Frown className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <p className="text-xl font-black text-rose-700">{persenNegatif}%</p>
              <p className="text-[11px] font-bold text-rose-700">Ada Keluhan</p>
            </div>
          </div>

          {/* 3 Topik Paling Sering Disebut */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-700 mb-1.5">Topik Paling Banyak Disebut:</p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200">
                1. WiFi (312 ulasan)
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200">
                2. Kebersihan (240 ulasan)
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium border border-slate-200">
                3. Air Bersih (198 ulasan)
              </span>
            </div>
          </div>
        </div>

        {/* Contoh Ulasan Terbaru */}
        <section className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Daftar Ulasan Penghuni</h3>
          <div className="space-y-2">
            {daftarUlasanAwal.slice(0, 6).map((u) => {
              const positif = u.label === 'positif';
              const negatif = u.label === 'negatif';

              return (
                <div key={u.id} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{u.nama_penulis}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[11px] ${
                        positif
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : negatif
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {u.label_awam}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{u.teks}</p>
                  <p className="text-[10px] text-slate-400">{u.tanggal}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
