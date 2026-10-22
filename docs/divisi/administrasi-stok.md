---
title: Pencatatan Stok
description: Di mana saja barang dicatat (database, ERP, catatan manual rak, laporan) dan cara menjaga catatan tetap akurat.
status: ditinjau
dasar: materi presentasi Gudang Teknik dan catatan alur proses
diperbarui: 2026-10-13
kategori: Gudang Teknik
sumber: [ppt-gudang-teknik, catatan-alur]
kata_kunci: [administrasi, pencatatan stok, kontrol stok, master material, database, ERP, catatan manual rak, kartu stok, GRN, reservasi, stock opname, laporan stok, mutasi, saldo, akurasi stok, selisih]
---

# Pencatatan Stok

<p class="lead">Catatan harus selalu sama dengan kondisi barang di rak. Kalau catatannya salah, gudang tidak bisa diandalkan.</p>

## Di mana saja barang dicatat?

| Catatan | Isinya | Kapan diisi |
| --- | --- | --- |
| **Database barang (ERP/WMS)** | Data penerimaan: jumlah, jenis barang, tipe barang, tanggal masuk, dan lokasi rak | Setelah GRN terbit |
| **GRN** | Laporan penerimaan material: jumlah diterima, diterima sesuai, ditolak, dan mutunya | Setelah material dinyatakan sesuai |
| **Reservasi di ERP/WMS** | Permintaan dari divisi lain dan pengeluaran barang | Saat reservasi diproses dan stok dipotong |
| **Kartu stok di rak** | Barang yang ditaruh atau diambil dari rak itu, beserta saldo akhirnya | Setiap kali barang ditaruh atau diambil |
| **Stock opname** | Hasil hitung fisik dibandingkan dengan catatan | Setiap hari, secara bergilir |
| **Laporan stok** | Saldo, mutasi, dan stok minimum | Berkala, sebagai dasar keputusan |

Semua data mengacu pada **master material**, yaitu daftar induk berisi kode, nama, spesifikasi, satuan, dan lokasi setiap barang.

## Rumus dasar stok

> **Stok akhir = stok awal + barang masuk − barang keluar**

Kalau hasil hitung di rak berbeda dengan angka di catatan, berarti ada barang yang belum dicatat, salah catat, atau berpindah tanpa catatan.

## Kebiasaan baik

- **Catat saat itu juga.** Jangan menunda sampai akhir hari.
- **Isi kartu stok di rak** setiap kali menaruh atau mengambil barang.
- **Pakai kode barang, bukan nama.** Nama bisa ditulis berbeda-beda, kode tidak.
- **Kembalikan barang ke rak yang benar**, sesuai lokasi di database.
- **Laporkan selisih, jangan mengubah angka sendiri.** Perbaikan catatan harus disetujui.

## Mengukur ketepatan stok

Salah satu ukuran gudang yang baik adalah **stock accuracy**: seberapa sama jumlah barang di rak dengan catatan.

> **Akurasi stok (%) = jumlah barang yang cocok ÷ jumlah barang yang dihitung × 100**

Latihannya ada di [Mencatat Hitung Fisik](/tutorial/hitung-fisik).
