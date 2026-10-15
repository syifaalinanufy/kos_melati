'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { NavigasiBawahPublik } from '@/components/NavigasiBawahPublik';
import { dataKosAwal } from '@/lib/data-sumber';

export default function HalamanAturanPublik() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-blue-200">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xs border-x border-slate-200/60">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="target-sentuh p-2 -ml-2 text-slate-700 hover:text-blue-700 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-slate-900">Tata Tertib Kos</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-950 font-bold mb-1">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Untuk Kenyamanan Bersama</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Aturan ini dibuat agar lingkungan kos tetap tenang, aman, dan nyaman untuk istirahat dan belajar.
            </p>
          </div>

          <div className="space-y-2.5">
            {dataKosAwal.aturan.map((aturan, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">{aturan}</p>
              </div>
            ))}
          </div>
        </div>

        <NavigasiBawahPublik />
      </div>
    </div>
  );
}
