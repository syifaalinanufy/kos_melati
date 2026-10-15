'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useKonteksDemo } from '@/lib/konteks-demo';
import { LencanaDataContoh } from './LencanaDataContoh';

interface KepalaHalamanPemilikProps {
  judul: string;
  subjudul?: string;
  tampilkanKembali?: boolean;
}

export function KepalaHalamanPemilik({
  judul,
  subjudul,
  tampilkanKembali = false,
}: KepalaHalamanPemilikProps) {
  const { kembalikanDataAwal } = useKonteksDemo();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3.5">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            {tampilkanKembali && (
              <Link
                href="/pemilik"
                className="target-sentuh p-1.5 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg"
                aria-label="Kembali"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )}
            <LencanaDataContoh ukuran="kecil" />
          </div>

          <button
            type="button"
            onClick={kembalikanDataAwal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo</span>
          </button>
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {judul}
          </h1>
          {subjudul && (
            <p className="text-xs text-slate-500 mt-0.5 font-normal leading-relaxed">
              {subjudul}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
