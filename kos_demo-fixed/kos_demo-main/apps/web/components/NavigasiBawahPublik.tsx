'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BedDouble, Sparkles, BookOpen, MessageSquare } from 'lucide-react';

const MENU_PUBLIK = [
  { nama: 'Beranda', rute: '/', ikon: Home },
  { nama: 'Kamar', rute: '/kamar', ikon: BedDouble },
  { nama: 'Fasilitas', rute: '/fasilitas', ikon: Sparkles },
  { nama: 'Aturan', rute: '/aturan', ikon: BookOpen },
  { nama: 'Tanya', rute: '/tanya', ikon: MessageSquare },
];

export function NavigasiBawahPublik() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi Pengunjung"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 pb-safe"
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {MENU_PUBLIK.map((item) => {
          const aktif = pathname === item.rute;
          const Ikon = item.ikon;

          return (
            <Link
              key={item.rute}
              href={item.rute}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 min-w-[56px] transition-colors ${
                aktif
                  ? 'text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-blue-600 font-medium'
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-7 rounded-full mb-0.5 transition-all ${
                  aktif ? 'bg-blue-100 text-blue-700' : 'text-slate-600'
                }`}
              >
                <Ikon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-[12px] leading-tight tracking-tight">
                {item.nama}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
