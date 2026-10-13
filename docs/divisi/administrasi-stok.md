---
title: Pencatatan Stok
description: Di mana saja barang dicatat (database, ERP, catatan manual rak, laporan) dan cara menjaga catatan tetap akurat.
status: ditinjau
dasar: materi presentasi Gudang Teknik dan catatan alur proses
diperbarui: 2026-10-13
kategori: Gudang Teknik
sumber: [ppt-gudang-teknik, catatan-alur]
kata_kunci: [administrasi, pencatatan stok, kontrol stok, master material, database, ERP, catatan manual rak, laporan OS/PPIC, stock opname, laporan stok, mutasi, saldo, akurasi stok, selisih]
---

# Pencatatan Stok

<p class="lead">Catatan harus selalu sama dengan kondisi barang di rak. Kalau catatannya salah, gudang tidak bisa diandalkan.</p>

## Di mana saja barang dicatat?

| Catatan | Isinya | Kapan diisi |
| --- | --- | --- |
| **Database barang** | Jumlah, jenis barang, tipe barang, tanggal masuk, dan lokasi rak | Saat barang masuk sudah diterima |
| **ERP perusahaan** | Permintaan dari divisi lain dan laporan barang keluar | Saat staff menyetujui permintaan |
| **Catatan manual di rak** | Barang yang ditaruh atau diambil dari rak itu | Setiap kali barang ditaruh atau diambil |
| **Laporan ke OS/PPIC** | Barang sudah masuk dan sesuai | Setelah input database |
| **Stock opname** | Hasil hitung fisik dibandingkan dengan catatan | Sesuai jadwal penghitungan |
| **Laporan stok** | Saldo, mutasi, dan stok minimum | Berkala, sebagai dasar keputusan |

Semua data mengacu pada **master material**, yaitu daftar induk berisi kode, nama, spesifikasi, satuan, dan lokasi setiap barang.

## Rumus dasar stok

> **Stok akhir = stok awal + barang masuk − barang keluar**

Kalau hasil hitung di rak berbeda dengan angka di catatan, berarti ada barang yang belum dicatat, salah catat, atau berpindah tanpa catatan.

## Kebiasaan baik

- **Catat saat itu juga.** Jangan menunda sampai akhir hari.
- **Isi catatan manual di rak** setiap kali menaruh atau mengambil barang.
- **Pakai kode barang, bukan nama.** Nama bisa ditulis berbeda-beda, kode tidak.
- **Kembalikan barang ke rak yang benar**, sesuai lokasi di database.
- **Laporkan selisih, jangan mengubah angka sendiri.** Perbaikan catatan harus disetujui.

## Mengukur ketepatan stok

Salah satu ukuran gudang yang baik adalah **stock accuracy**: seberapa sama jumlah barang di rak dengan catatan.

> **Akurasi stok (%) = jumlah barang yang cocok ÷ jumlah barang yang dihitung × 100**

Latihannya ada di [Mencatat Hitung Fisik](/tutorial/hitung-fisik).
