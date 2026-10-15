'use client';

import React, { useState } from 'react';
import { KepalaHalamanPemilik } from '@/components/KepalaHalamanPemilik';
import { dataPerkiraanAwal, formatRupiah } from '@/lib/data-sumber';
import { TrendingUp, AlertCircle, Calendar, Sparkles } from 'lucide-react';

export default function HalamanPrediksiPemilik() {
  const [tabMetrik, setTabMetrik] = useState<'okupansi' | 'pendapatan'>('okupansi');

  const dataOkupansi = dataPerkiraanAwal.okupansi;
  const dataPendapatan = dataPerkiraanAwal.pendapatan;

  // Nama bulan ramah baca
  const formatBulan = (kode: string) => {
    const [tahun, bln] = kode.split('-');
    const namaBulan = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${namaBulan[parseInt(bln, 10)]} ${tahun}`;
  };

  return (
    <div className="pb-10">
      <KepalaHalamanPemilik
        judul="Perkiraan 6 Bulan ke Depan"
        subjudul="Bantu Anda bersiap menghadapi musim ramai dan sepi"
        tampilkanKembali
      />

      <div className="p-4 space-y-4">
        {/* Wawasan Otomatis Berbahasa Awam */}
        <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                Wawasan Perkiraan
              </p>
              <p className="text-sm font-medium text-blue-950 leading-relaxed">
                {dataPerkiraanAwal.wawasan}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Pilihan Metrik Ramah Jempol */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-300">
          <button
            type="button"
            onClick={() => setTabMetrik('okupansi')}
            className={`target-sentuh flex-1 text-sm font-bold rounded-xl transition-all ${
              tabMetrik === 'okupansi'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Kamar Terisi
          </button>
          <button
            type="button"
            onClick={() => setTabMetrik('pendapatan')}
            className={`target-sentuh flex-1 text-sm font-bold rounded-xl transition-all ${
              tabMetrik === 'pendapatan'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Pemasukan Sewa
          </button>
        </div>

        {/* Catatan Penjelasan Ramah */}
        <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Ini adalah perkiraan tren pola musiman, bukan kepastian mutlak.</span>
        </div>

        {/* Tampilan Visual Sederhana (Bar Graph Horisontal Ramah Mobile) */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            {tabMetrik === 'okupansi' ? 'Prakiraan Kamar Terisi (Unit)' : 'Prakiraan Pemasukan (Rupiah)'}
          </h2>

          <div className="space-y-3 pt-1">
            {(tabMetrik === 'okupansi' ? dataOkupansi.perkiraan : dataPendapatan.perkiraan).map((item) => {
              const persentase = tabMetrik === 'okupansi' 
                ? (item.nilai / 24) * 100 
                : (item.nilai / 30000000) * 100;

              return (
                <div key={item.bulan} className="space-y-1">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-slate-800">{formatBulan(item.bulan)}</span>
                    <strong className="text-sm font-extrabold text-blue-700">
                      {tabMetrik === 'okupansi' ? `${item.nilai} Kamar` : formatRupiah(item.nilai)}
                    </strong>
                  </div>

                  {/* Batang Grafis */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(10, persentase))}%` }}
                    />
                  </div>

                  {/* Rentang Keyakinan */}
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Perkiraan rentang:</span>
                    <span>
                      {tabMetrik === 'okupansi'
                        ? `${item.batas_bawah} - ${item.batas_atas} kamar`
                        : `${formatRupiah(item.batas_bawah)} - ${formatRupiah(item.batas_atas)}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabel Ringkas Angka (Alternatif Teks Aksesibilitas WCAG) */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Rincian Tabel Angka
          </h3>
          <div className="divide-y divide-slate-200 text-xs">
            {(tabMetrik === 'okupansi' ? dataOkupansi.perkiraan : dataPendapatan.perkiraan).map((item) => (
              <div key={item.bulan} className="py-2 flex items-center justify-between">
                <span className="font-medium text-slate-700">{formatBulan(item.bulan)}</span>
                <span className="font-bold text-slate-900">
                  {tabMetrik === 'okupansi' ? `${item.nilai} kamar` : formatRupiah(item.nilai)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
