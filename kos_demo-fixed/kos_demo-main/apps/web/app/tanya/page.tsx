'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Sparkles, Bot, User } from 'lucide-react';
import { NavigasiBawahPublik } from '@/components/NavigasiBawahPublik';
import { dataKosAwal, formatRupiah } from '@/lib/data-sumber';

interface PesanChat {
  pengirim: 'bot' | 'user';
  teks: string;
}

const PERTANYAAN_SARAN = [
  'Berapa harga sewa kamar per bulan?',
  'Apakah ada fasilitas WiFi dan dapur?',
  'Jam malam di kos sampai jam berapa?',
  'Masih ada kamar kosong?',
];

export default function HalamanTanyaPublik() {
  const [pesan, setPesan] = useState('');
  const [riwayatChat, setRiwayatChat] = useState<PesanChat[]>([
    {
      pengirim: 'bot',
      teks: `Halo! Saya asisten informasi ${dataKosAwal.nama}. Mau tanya apa seputar kos? Anda bisa ketik pertanyaan atau tekan salah satu pilihan di bawah ya.`,
    },
  ]);

  const tanganiKirim = (teksKirim: string) => {
    if (!teksKirim.trim()) return;

    const pesanPengguna = teksKirim.trim();
    setPesan('');

    // Tambah pesan pengguna
    setRiwayatChat((lama) => [...lama, { pengirim: 'user', teks: pesanPengguna }]);

    // Logika jawaban berbasis template dan kata kunci (Rule-based tanpa LLM, aman & cepat)
    setTimeout(() => {
      let jawaban = '';
      const t = pesanPengguna.toLowerCase();

      if (t.includes('harga') || t.includes('biaya') || t.includes('sewa') || t.includes('tarif')) {
        jawaban = `Harga sewa kamar mulai dari ${formatRupiah(850000)} (Tipe Standar), ${formatRupiah(1300000)} (Tipe Menengah), hingga ${formatRupiah(1850000)} (Tipe Utama dengan AC & KM Dalam). Sudah termasuk air dan kebersihan bersama.`;
      } else if (t.includes('wifi') || t.includes('fasilitas') || t.includes('dapur') || t.includes('parkir') || t.includes('ac')) {
        jawaban = `Fasilitas kami mencakup WiFi 100 Mbps, dapur bersama, parkir motor luas beratap, penjaga & CCTV 24 jam, serta mesin cuci bersama.`;
      } else if (t.includes('aturan') || t.includes('jam malam') || t.includes('tamu') || t.includes('tutup') || t.includes('gerbang')) {
        jawaban = `Gerbang utama ditutup pukul 23.00 WIB untuk keamanan bersama (akses kunci darurat ada bila lembur). Tamu lawan jenis tidak diperkenankan masuk ke dalam kamar tidur.`;
      } else if (t.includes('kamar') || t.includes('kosong') || t.includes('tersedia') || t.includes('ready')) {
        jawaban = `Saat ini tersedia 4 unit kamar kosong siap huni (2 Tipe Standar, 1 Tipe Menengah, dan 1 Tipe Utama).`;
      } else {
        jawaban = `Maaf, saya belum paham pertanyaan tersebut. Topik yang bisa saya bantu jawab: harga sewa, fasilitas kos, aturan jam malam, dan kamar kosong. Atau hubungi WhatsApp pengelola di ${dataKosAwal.kontak_tanya.whatsapp}.`;
      }

      setRiwayatChat((lama) => [...lama, { pengirim: 'bot', teks: jawaban }]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 selection:bg-blue-200 flex flex-col">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xs border-x border-slate-200/60 flex flex-col flex-1">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="target-sentuh p-2 -ml-2 text-slate-700 hover:text-blue-700 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-bold text-slate-900">Tanya Jawab Kos</h1>
              <p className="text-[11px] text-emerald-600 font-medium">Asisten Otomatis Tanpa LLM</p>
            </div>
          </div>
        </header>

        {/* Ruang Obrolan */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {riwayatChat.map((chat, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${chat.pengirim === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {chat.pengirim === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[82%] text-sm leading-relaxed ${
                  chat.pengirim === 'user'
                    ? 'bg-blue-700 text-white rounded-tr-xs'
                    : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200'
                }`}
              >
                {chat.teks}
              </div>
              {chat.pengirim === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* 4 Saran Tombol Cepat Ramah Jempol */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-500 mb-2">Pilihan Pertanyaan Cepat:</p>
            <div className="flex flex-col gap-1.5">
              {PERTANYAAN_SARAN.map((saran, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => tanganiKirim(saran)}
                  className="text-left p-2.5 bg-blue-50/70 hover:bg-blue-100/70 active:bg-blue-200 text-blue-900 text-xs font-semibold rounded-xl border border-blue-200 transition-colors"
                >
                  {saran}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Input Chat */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tanganiKirim(pesan);
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            maxLength={300}
            className="flex-1 text-sm bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-blue-600 focus:bg-white"
          />
          <button
            type="submit"
            className="target-sentuh p-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl shadow-xs shrink-0"
            aria-label="Kirim pesan"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <NavigasiBawahPublik />
      </div>
    </div>
  );
}
