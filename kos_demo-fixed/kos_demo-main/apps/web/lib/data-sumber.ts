import kosJson from '@/data/kos.json';
import kamarJson from '@/data/kamar.json';
import tagihanJson from '@/data/tagihan.json';
import perkiraanJson from '@/data/perkiraan.json';
import ulasanJson from '@/data/ulasan.json';

export type StatusTagihan = 'sudah_bayar' | 'belum_bayar' | 'terlambat';

export interface Kamar {
  id: string;
  nomor: string;
  lantai: number;
  tipe: string;
  harga_bulanan: number;
  ukuran: string;
  fasilitas: string[];
  terisi: boolean;
}

export interface Tagihan {
  id: string;
  penghuni_id: string;
  nama_penghuni: string;
  kamar_id: string;
  nomor_kamar: string;
  bulan: string;
  nama_bulan: string;
  jumlah: number;
  jatuh_tempo: string;
  status: StatusTagihan;
  tanggal_bayar?: string | null;
}

export interface Ulasan {
  id: string;
  nama_penulis: string;
  teks: string;
  label: 'positif' | 'netral' | 'negatif';
  label_awam: string;
  tanggal: string;
}

export const dataKosAwal = kosJson;
export const daftarKamarAwal = kamarJson.daftar_kamar as Kamar[];
export const daftarTagihanAwal = tagihanJson.daftar_tagihan as Tagihan[];
export const dataPerkiraanAwal = perkiraanJson;
export const daftarUlasanAwal = ulasanJson.daftar_ulasan as Ulasan[];

export function formatRupiah(angka: number): string {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
}
