'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { NavigasiBawahPublik } from '@/components/NavigasiBawahPublik';
import { dataKosAwal } from '@/lib/data-sumber';

export default function HalamanFasilitasPublik() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-blue-200">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xs border-x border-slate-200/60">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="target-sentuh p-2 -ml-2 text-slate-700 hover:text-blue-700 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Fasilitas Kos</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-900 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>Fasilitas Bersama Gratis</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              Semua penghuni dapat menikmati fasilitas ini tanpa biaya tambahan bulanan.
            </p>
          </div>

          <div className="space-y-2">
            {dataKosAwal.fasilitas_umum.map((fasilitas, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs"
              >
                <div className="p-1 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{fasilitas}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NavigasiBawahPublik />
      </div>
    </div>
  );
}
