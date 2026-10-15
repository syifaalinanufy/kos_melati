'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, BedDouble, UserX, UserCheck } from 'lucide-react';
import { NavigasiBawahPublik } from '@/components/NavigasiBawahPublik';
import { LencanaDataContoh } from '@/components/LencanaDataContoh';
import { daftarKamarAwal, formatRupiah } from '@/lib/data-sumber';

export default function HalamanKamarPublik() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-blue-200">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xs border-x border-slate-200/60">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="target-sentuh p-2 -ml-2 text-slate-700 hover:text-blue-700 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Daftar Kamar</h1>
          </div>
          <LencanaDataContoh ukuran="kecil" />
        </header>

        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-500">
            Total 24 unit kamar. Status diperbarui secara otomatis.
          </p>

          <div className="space-y-3">
            {daftarKamarAwal.map((kamar) => {
              const terisi = kamar.terisi;
              return (
                <div
                  key={kamar.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    terisi ? 'bg-slate-50/70 border-slate-200' : 'bg-white border-blue-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900">{kamar.nomor}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        Lantai {kamar.lantai}
                      </span>
                    </div>

                    {terisi ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                        <UserCheck className="w-3.5 h-3.5" />
                        Terisi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <UserX className="w-3.5 h-3.5" />
                        Tersedia
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs text-slate-600 font-medium">
                      Tipe {kamar.tipe} ({kamar.ukuran})
                    </span>
                    <strong className="text-sm font-extrabold text-blue-700">
                      {formatRupiah(kamar.harga_bulanan)}
                      <span className="text-xs font-normal text-slate-500"> /bln</span>
                    </strong>
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                    {kamar.fasilitas.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <NavigasiBawahPublik />
      </div>
    </div>
  );
}
