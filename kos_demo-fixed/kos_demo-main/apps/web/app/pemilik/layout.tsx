'use client';

import React from 'react';
import { PenyediaDemo } from '@/lib/konteks-demo';
import { NavigasiBawahHP } from '@/components/NavigasiBawahHP';
import { NotifikasiAksi } from '@/components/NotifikasiAksi';

export default function TataLetakPemilik({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PenyediaDemo>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-blue-200">
        <NotifikasiAksi />
        <main className="max-w-md mx-auto min-h-screen bg-white shadow-xs border-x border-slate-200/60">
          {children}
        </main>
        <NavigasiBawahHP />
      </div>
    </PenyediaDemo>
  );
}
