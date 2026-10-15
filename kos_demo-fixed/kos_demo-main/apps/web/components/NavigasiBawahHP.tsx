'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ReceiptText, TrendingUp, MessageSquareQuote, ShieldAlert } from 'lucide-react';

const DAFTAR_MENU = [
  { nama: 'Ringkasan', rute: '/pemilik', ikon: LayoutGrid },
  { nama: 'Tagihan', rute: '/pemilik/tagihan', ikon: ReceiptText },
  { nama: 'Perkiraan', rute: '/pemilik/prediksi', ikon: TrendingUp },
  { nama: 'Ulasan', rute: '/pemilik/ulasan', ikon: MessageSquareQuote },
  { nama: 'Pengaduan', rute: '/pemilik/pengaduan', ikon: ShieldAlert },
];

export function NavigasiBawahHP() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Menu Utama Pemilik"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 pb-safe"
    >
      <div className="max-w-md mx-auto flex items-center justify-between h-16">
        {DAFTAR_MENU.map((menu) => {
          const aktif = pathname === menu.rute;
          const Ikon = menu.ikon;

          return (
            <Link
              key={menu.rute}
              href={menu.rute}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                aktif
                  ? 'text-blue-900 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  aktif ? 'bg-blue-50 text-blue-900' : 'text-slate-500'
                }`}
              >
                <Ikon className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
              </div>
              <span className={`text-[11px] tracking-tight mt-0.5 ${aktif ? 'text-blue-900 font-bold' : 'text-slate-500'}`}>
                {menu.nama}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
