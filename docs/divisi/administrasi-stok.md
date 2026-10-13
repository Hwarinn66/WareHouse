---
title: Administrasi & Kontrol Stok
description: Lima jenis catatan gudang dan fungsinya, dari master material sampai laporan stok.
status: draf
dasar: materi presentasi Gudang Teknik (slide 12–13)
catatan_status: Nama formulir, aplikasi, dan format laporan yang dipakai di gudang belum dikonfirmasi.
diperbarui: 2026-10-13
kategori: Gudang Teknik
sumber: [ppt-gudang-teknik]
kata_kunci: [administrasi, kontrol stok, master material, barang masuk, barang keluar, stock opname, laporan stok, mutasi, saldo, stock accuracy, akurasi stok, selisih]
---

# Administrasi & Kontrol Stok

<p class="lead">Dokumen dan data harus mendukung kondisi fisik di lapangan. Jika catatan dan barang di rak tidak sama, gudang tidak bisa diandalkan.</p>

## Lima catatan utama

| Catatan | Isi | Hasilnya |
| --- | --- | --- |
| **Master material** | Kode, nama, spesifikasi, satuan, lokasi | Identitas material yang konsisten |
| **Barang masuk** | Tanggal, supplier, jumlah, dokumen | Riwayat penerimaan |
| **Barang keluar** | User, jumlah, tujuan, tanggal | Riwayat pemakaian |
| **Stock opname** | Hitungan fisik dibandingkan catatan sistem | Selisih yang teridentifikasi |
| **Laporan stok** | Saldo, mutasi, stok minimum | Dasar pengambilan keputusan |

## Bagaimana catatan saling terhubung

```mermaid
flowchart LR
  accTitle: Alur data administrasi stok
  accDescr: Master material menjadi acuan. Catatan barang masuk menambah saldo dan catatan barang keluar mengurangi saldo. Stock opname membandingkan saldo dengan fisik, lalu hasilnya masuk ke laporan stok.
  MM[(Master material)] -.acuan kode.-> BM[Barang masuk]
  MM -.acuan kode.-> BK[Barang keluar]
  BM -- menambah --> SAL[Saldo stok]
  BK -- mengurangi --> SAL
  SAL --> SO[Stock opname<br/>fisik vs catatan]
  SO --> LAP[Laporan stok]
  SAL --> LAP
```

Rumus dasarnya:

> **Saldo akhir = saldo awal + total barang masuk − total barang keluar**

Jika saldo akhir di catatan berbeda dengan hasil hitung fisik, ada transaksi yang belum tercatat, salah catat, atau barang yang berpindah tanpa catatan.

## Kebiasaan yang menjaga catatan tetap akurat

- **Catat saat itu juga.** Jangan menunda pencatatan sampai akhir hari.
- **Satu transaksi, satu dokumen.** Setiap barang masuk atau keluar harus punya bukti.
- **Gunakan kode, bukan nama.** Nama bisa ditulis berbeda-beda, sedangkan kode tidak.
- **Kembalikan barang ke lokasinya.** Barang yang dipindahkan tanpa catatan sama saja dengan hilang.
- **Laporkan selisih, jangan mengubah angka sendiri.** Penyesuaian stok harus melalui persetujuan.

## Mengukur akurasi stok

Salah satu indikator gudang yang baik adalah **stock accuracy**, yaitu kesesuaian stok fisik dengan catatan sistem. Cara umum menghitungnya:

> **Akurasi stok (%) = jumlah item yang cocok ÷ jumlah item yang dihitung × 100**

Contoh latihannya ada di tutorial [Mencatat Hasil Hitung Fisik](/tutorial/hitung-fisik).
