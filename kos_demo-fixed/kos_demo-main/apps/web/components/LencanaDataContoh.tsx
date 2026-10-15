import React from 'react';

export function LencanaDataContoh({ ukuran = 'sedang' }: { ukuran?: 'kecil' | 'sedang' }) {
  const kelas = ukuran === 'kecil'
    ? 'text-[11px] px-2 py-0.5'
    : 'text-xs px-2.5 py-1 font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-slate-100 text-slate-600 border border-slate-300 font-medium ${kelas}`}
      title="Data simulasi demo"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
      <span>Data Contoh</span>
    </span>
  );
}
