'use client';

import React from 'react';
import Link from 'next/link';
import { useKonteksDemo } from '@/lib/konteks-demo';
import { KepalaHalamanPemilik } from '@/components/KepalaHalamanPemilik';
import { formatRupiah } from '@/lib/data-sumber';
import {
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default function HalamanBerandaPemilik() {
  const { ringkasan, daftarKamar } = useKonteksDemo();

  return (
    <div className="pb-8">
      <KepalaHalamanPemilik
        judul="Kondisi Kos"
        subjudul="Status hunian dan pembayaran sewa hari ini"
      />

      <div className="p-4 space-y-4">
        {/* Banner Status Berbasis Data Nyata (Bukan Gradient Mencolok) */}
        <section
          aria-label="Ringkasan Status Utama"
          className="p-4 rounded-xl bg-blue-900 text-white shadow-xs"
        >
          <p className="text-xs uppercase tracking-wider font-semibold text-blue-200 mb-1">
            Status Bulan Ini
          </p>
          <p className="text-lg font-bold leading-snug">
            {ringkasan.kamarTerisi} dari {ringkasan.totalKamar} kamar terisi.
          </p>
          <p className="text-sm text-blue-100 mt-1">
            {ringkasan.belumBayarBulanIni + ringkasan.terlambatBulanIni > 0 ? (
              <span className="text-amber-300 font-semibold">
                {ringkasan.belumBayarBulanIni + ringkasan.terlambatBulanIni} penghuni belum melunasi sewa.
              </span>
            ) : (
              <span className="text-emerald-300 font-semibold">
                Semua sewa bulan ini sudah lunas.
              </span>
            )}
          </p>
        </section>

        {/* 4 Kartu Metrik - Desain Minimalis & Terbaca Jelas */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Kamar Terisi */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">Kamar Terisi</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {ringkasan.kamarTerisi}
              </span>
              <span className="text-xs text-slate-400">/ {ringkasan.totalKamar}</span>
            </div>
          </div>

          {/* Kamar Kosong */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">Kamar Kosong</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-amber-600 tracking-tight">
                {ringkasan.kamarKosong}
              </span>
              <span className="text-xs text-slate-400">unit</span>
            </div>
          </div>

          {/* Sudah Lunas */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">Sewa Lunas</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-700 tracking-tight">
                {ringkasan.sudahBayarBulanIni}
              </span>
              <span className="text-xs text-slate-400">orang</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5 truncate">
              {formatRupiah(ringkasan.nominalSudahBayar)}
            </p>
          </div>

          {/* Belum Lunas */}
          <div className="p-3.5 rounded-xl bg-white border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block">Belum Lunas</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-rose-600 tracking-tight">
                {ringkasan.belumBayarBulanIni + ringkasan.terlambatBulanIni}
              </span>
              <span className="text-xs text-slate-400">orang</span>
            </div>
            <p className="text-[11px] font-semibold text-rose-600 mt-0.5 truncate">
              {formatRupiah(ringkasan.nominalBelumBayar)}
            </p>
          </div>
        </div>

        {/* Tombol Aksi Langsung ke Tagihan (Clean & Obvious) */}
        {ringkasan.belumBayarBulanIni + ringkasan.terlambatBulanIni > 0 && (
          <Link
            href="/pemilik/tagihan?filter=belum_bayar"
            className="target-sentuh w-full flex items-center justify-between p-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 rounded-xl font-bold text-sm transition-colors"
          >
            <span>Periksa Daftar Tagihan Belum Lunas</span>
            <ChevronRight className="w-5 h-5 text-rose-700" />
          </Link>
        )}

        {/* Denah Kamar Bersih */}
        <section aria-labelledby="judul-denah" className="mt-5">
          <div className="flex items-center justify-between mb-2 px-0.5">
            <h2 id="judul-denah" className="text-sm font-bold text-slate-900">
              Denah Kamar Kos
            </h2>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Terisi
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> Kosong
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {daftarKamar.map((kamar) => {
              const terisi = kamar.terisi;
              return (
                <div
                  key={kamar.id}
                  className={`py-2 px-1 rounded-lg border text-center transition-all ${
                    terisi
                      ? 'bg-blue-50/60 border-blue-200 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold block">{kamar.nomor.replace('Kamar ', 'K-')}</span>
                  <span className={`text-[10px] font-semibold ${terisi ? 'text-blue-700' : 'text-slate-400'}`}>
                    {terisi ? 'Terisi' : 'Kosong'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tautan Cepat Perkiraan */}
        <section className="pt-2">
          <Link
            href="/pemilik/prediksi"
            className="target-sentuh w-full flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Prakiraan 6 Bulan ke Depan</p>
                <p className="text-[11px] text-slate-500">Kapan waktu ramai & sepi kos</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </section>
      </div>
    </div>
  );
}
