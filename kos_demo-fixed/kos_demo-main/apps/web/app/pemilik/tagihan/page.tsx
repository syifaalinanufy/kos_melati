'use client';

import React, { useState } from 'react';
import { useKonteksDemo } from '@/lib/konteks-demo';
import { KepalaHalamanPemilik } from '@/components/KepalaHalamanPemilik';
import { formatRupiah } from '@/lib/data-sumber';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function HalamanTagihanPemilik() {
  const {
    daftarTagihan,
    bulanTerpilih,
    setBulanTerpilih,
    tandaiSudahBayar,
  } = useKonteksDemo();

  const [filterStatus, setFilterStatus] = useState<'semua' | 'belum_bayar' | 'terlambat'>('semua');
  const [idSedangDikonfirmasi, setIdSedangDikonfirmasi] = useState<string | null>(null);

  const daftarBulan = [
    { kode: '2026-10', label: 'Oktober 2026' },
    { kode: '2026-09', label: 'September 2026' },
    { kode: '2026-08', label: 'Agustus 2026' },
    { kode: '2026-07', label: 'Juli 2026' },
    { kode: '2026-06', label: 'Juni 2026' },
    { kode: '2026-05', label: 'Mei 2026' },
  ];

  const tagihanBulanIni = daftarTagihan.filter((t) => t.bulan === bulanTerpilih);

  const tagihanTersaring = tagihanBulanIni.filter((t) => {
    if (filterStatus === 'semua') return true;
    if (filterStatus === 'belum_bayar') return t.status === 'belum_bayar' || t.status === 'terlambat';
    if (filterStatus === 'terlambat') return t.status === 'terlambat';
    return true;
  });

  const tanganiTandaiLunas = (id: string) => {
    tandaiSudahBayar(id);
    setIdSedangDikonfirmasi(null);
  };

  return (
    <div className="pb-10">
      <KepalaHalamanPemilik
        judul="Daftar Tagihan"
        subjudul="Catatan sewa bulanan per penghuni"
        tampilkanKembali
      />

      <div className="p-4 space-y-3.5">
        {/* Pilihan Bulan Sederhana */}
        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 pl-1">Bulan:</span>
          <select
            value={bulanTerpilih}
            onChange={(e) => setBulanTerpilih(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-blue-700"
          >
            {daftarBulan.map((b) => (
              <option key={b.kode} value={b.kode}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3 Tab Filter Minimalis */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setFilterStatus('semua')}
            className={`target-sentuh flex-1 text-xs font-bold rounded-lg transition-all ${
              filterStatus === 'semua'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({tagihanBulanIni.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('belum_bayar')}
            className={`target-sentuh flex-1 text-xs font-bold rounded-lg transition-all ${
              filterStatus === 'belum_bayar'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Belum ({tagihanBulanIni.filter((t) => t.status !== 'sudah_bayar').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('terlambat')}
            className={`target-sentuh flex-1 text-xs font-bold rounded-lg transition-all ${
              filterStatus === 'terlambat'
                ? 'bg-white text-rose-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Terlambat ({tagihanBulanIni.filter((t) => t.status === 'terlambat').length})
          </button>
        </div>

        {/* Daftar Tagihan */}
        <div className="space-y-2.5 pt-1">
          {tagihanTersaring.length === 0 ? (
            <div className="text-center py-10 px-4 bg-white rounded-xl border border-slate-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
              <p className="text-sm font-bold text-slate-800">Tidak ada tagihan yang tertunda</p>
            </div>
          ) : (
            tagihanTersaring.map((tagihan) => {
              const sudahLunas = tagihan.status === 'sudah_bayar';
              const terlambat = tagihan.status === 'terlambat';

              return (
                <div
                  key={tagihan.id}
                  className="p-3.5 rounded-xl border bg-white border-slate-200 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {tagihan.nomor_kamar}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {tagihan.nama_penghuni}
                      </h3>
                    </div>

                    <div>
                      {sudahLunas ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                          <CheckCircle2 className="w-3 h-3" />
                          Lunas
                        </span>
                      ) : terlambat ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-md">
                          <AlertCircle className="w-3 h-3" />
                          Terlambat
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                          <Clock className="w-3 h-3" />
                          Belum Bayar
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Nominal:</span>
                    <strong className="text-sm font-extrabold text-slate-900">
                      {formatRupiah(tagihan.jumlah)}
                    </strong>
                  </div>

                  {!sudahLunas && (
                    <div className="pt-1.5">
                      {idSedangDikonfirmasi === tagihan.id ? (
                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-300 space-y-2">
                          <p className="text-xs text-slate-800 text-center font-medium">
                            Konfirmasi penerimaan sewa dari {tagihan.nama_penghuni}?
                          </p>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => tanganiTandaiLunas(tagihan.id)}
                              className="target-sentuh flex-1 bg-emerald-700 text-white text-xs font-bold rounded-lg"
                            >
                              Ya, Sudah Terima
                            </button>
                            <button
                              type="button"
                              onClick={() => setIdSedangDikonfirmasi(null)}
                              className="target-sentuh px-3 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIdSedangDikonfirmasi(tagihan.id)}
                          className="target-sentuh w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-colors"
                        >
                          Tandai Sudah Bayar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
