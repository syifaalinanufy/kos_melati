'use client';

import React from 'react';
import { useKonteksDemo } from '@/lib/konteks-demo';
import { CheckCircle2, X } from 'lucide-react';

export function NotifikasiAksi() {
  const { pesanNotifikasi, tutupNotifikasi } = useKonteksDemo();

  if (!pesanNotifikasi) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-18 left-4 right-4 z-50 max-w-md mx-auto"
    >
      <div className="flex items-center justify-between gap-3 p-4 bg-emerald-900 text-white rounded-2xl shadow-xl border border-emerald-700 animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
          <p className="text-sm font-semibold leading-snug">{pesanNotifikasi}</p>
        </div>
        <button
          type="button"
          onClick={tutupNotifikasi}
          className="p-1.5 -mr-1 text-emerald-200 hover:text-white rounded-lg focus:outline-hidden"
          aria-label="Tutup notifikasi"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
