'use client';

import React from 'react';
import Link from 'next/link';
import { NavigasiBawahPublik } from '@/components/NavigasiBawahPublik';
import { LencanaDataContoh } from '@/components/LencanaDataContoh';
import { dataKosAwal, daftarKamarAwal, formatRupiah } from '@/lib/data-sumber';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Check,
  DoorOpen,
} from 'lucide-react';

export default function HalamanBerandaPublik() {
  const kamarKosong = daftarKamarAwal.filter((k) => !k.terisi).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xs flex flex-col">
        {/* Header Bersih */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 block">
              KosMudah Demo
            </span>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              {dataKosAwal.nama}
            </h1>
          </div>
          <LencanaDataContoh ukuran="kecil" />
        </header>

        {/* Hero Section Bersih & Profesional (Bukan AI Gradient) */}
        <section className="p-5 bg-slate-900 text-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
            Untuk Pemilik Kos
          </span>

          <h2 className="text-xl font-black leading-snug tracking-tight mb-2">
            Kelola data kos dan tagihan penghuni langsung di HP Anda.
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Coba demo interaktif tanpa perlu mendaftar atau memasukkan data pribadi apa pun.
          </p>

          <Link
            href="/pemilik"
            className="target-sentuh w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Buka Panel Pemilik Kos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Data Contoh. Tidak ada data pribadi asli.</span>
          </div>
        </section>

        {/* Konten Publik */}
        <div className="p-4 space-y-5">
          {/* Status Ketersediaan Kamar */}
          <section className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                <DoorOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Ketersediaan Kamar</p>
                <p className="text-sm font-bold text-slate-900">
                  {kamarKosong > 0 ? `${kamarKosong} Kamar Kosong` : 'Semua Kamar Penuh'}
                </p>
              </div>
            </div>
            <Link
              href="/kamar"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5"
            >
              <span>Lihat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>

          {/* Lokasi Kos */}
          <section className="p-3 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-slate-900 font-bold block">{dataKosAwal.alamat.jalan}</strong>
              <span className="text-slate-500">{dataKosAwal.alamat.patokan}</span>
            </div>
          </section>

          {/* Fasilitas */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fasilitas Bersama</h3>
              <Link href="/fasilitas" className="text-xs font-semibold text-blue-700">Semua</Link>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {dataKosAwal.fasilitas_umum.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                  <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tipe Kamar */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Pilihan Tipe Kamar</h3>
              <Link href="/kamar" className="text-xs font-semibold text-blue-700">Semua Kamar</Link>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tipe Standar (3x3 m)</h4>
                  <p className="text-[11px] text-slate-500">Kasur busa, lemari pakaian, kipas angin</p>
                </div>
                <strong className="text-xs font-extrabold text-slate-900">{formatRupiah(850000)}/bln</strong>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tipe Utama (4x4 m)</h4>
                  <p className="text-[11px] text-slate-500">Springbed, AC, kamar mandi dalam</p>
                </div>
                <strong className="text-xs font-extrabold text-blue-900">{formatRupiah(1850000)}/bln</strong>
              </div>
            </div>
          </section>
        </div>

        <NavigasiBawahPublik />
      </div>
    </div>
  );
}
