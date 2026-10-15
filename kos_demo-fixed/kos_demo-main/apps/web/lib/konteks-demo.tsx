'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  daftarKamarAwal,
  daftarTagihanAwal,
  type Kamar,
  type Tagihan,
} from './data-sumber';

const BULAN_INI = '2026-10';

interface Ringkasan {
  totalKamar: number;
  kamarTerisi: number;
  kamarKosong: number;
  sudahBayarBulanIni: number;
  belumBayarBulanIni: number;
  terlambatBulanIni: number;
  nominalSudahBayar: number;
  nominalBelumBayar: number;
}

interface KonteksDemo {
  daftarKamar: Kamar[];
  daftarTagihan: Tagihan[];
  bulanTerpilih: string;
  setBulanTerpilih: (bulan: string) => void;
  tandaiSudahBayar: (idTagihan: string) => void;
  kembalikanDataAwal: () => void;
  ringkasan: Ringkasan;
  pesanNotifikasi: string | null;
  tutupNotifikasi: () => void;
}

const Konteks = createContext<KonteksDemo | null>(null);

export function PenyediaDemo({ children }: { children: React.ReactNode }) {
  const [daftarTagihan, setDaftarTagihan] = useState<Tagihan[]>(daftarTagihanAwal);
  const [bulanTerpilih, setBulanTerpilih] = useState<string>(BULAN_INI);
  const [pesanNotifikasi, setPesanNotifikasi] = useState<string | null>(null);

  const tandaiSudahBayar = useCallback((idTagihan: string) => {
    const hariIni = new Date().toISOString().slice(0, 10);
    setDaftarTagihan((lama) =>
      lama.map((t) =>
        t.id === idTagihan ? { ...t, status: 'sudah_bayar', tanggal_bayar: hariIni } : t,
      ),
    );
    setPesanNotifikasi('Tagihan berhasil ditandai sudah dibayar.');
  }, []);

  const kembalikanDataAwal = useCallback(() => {
    setDaftarTagihan(daftarTagihanAwal);
    setBulanTerpilih(BULAN_INI);
    setPesanNotifikasi('Data demo dikembalikan ke kondisi awal.');
  }, []);

  const tutupNotifikasi = useCallback(() => setPesanNotifikasi(null), []);

  const ringkasan = useMemo<Ringkasan>(() => {
    const bulanIni = daftarTagihan.filter((t) => t.bulan === BULAN_INI);
    const sudah = bulanIni.filter((t) => t.status === 'sudah_bayar');
    const belum = bulanIni.filter((t) => t.status === 'belum_bayar');
    const telat = bulanIni.filter((t) => t.status === 'terlambat');
    const jumlah = (arr: Tagihan[]) => arr.reduce((n, t) => n + t.jumlah, 0);
    const terisi = daftarKamarAwal.filter((k) => k.terisi).length;
    return {
      totalKamar: daftarKamarAwal.length,
      kamarTerisi: terisi,
      kamarKosong: daftarKamarAwal.length - terisi,
      sudahBayarBulanIni: sudah.length,
      belumBayarBulanIni: belum.length,
      terlambatBulanIni: telat.length,
      nominalSudahBayar: jumlah(sudah),
      nominalBelumBayar: jumlah(belum) + jumlah(telat),
    };
  }, [daftarTagihan]);

  const nilai: KonteksDemo = {
    daftarKamar: daftarKamarAwal,
    daftarTagihan,
    bulanTerpilih,
    setBulanTerpilih,
    tandaiSudahBayar,
    kembalikanDataAwal,
    ringkasan,
    pesanNotifikasi,
    tutupNotifikasi,
  };

  return <Konteks.Provider value={nilai}>{children}</Konteks.Provider>;
}

export function useKonteksDemo(): KonteksDemo {
  const ctx = useContext(Konteks);
  if (!ctx) throw new Error('useKonteksDemo harus dipakai di dalam <PenyediaDemo>');
  return ctx;
}
