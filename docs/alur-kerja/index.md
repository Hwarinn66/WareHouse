---
title: Ringkasan Alur Kerja
description: Gambaran tiga alur kerja utama Gudang Teknik dan status setiap diagramnya.
status: draf
dasar: materi presentasi Gudang Teknik dan praktik umum pergudangan
catatan_status: Gambar alur di presentasi Gudang Teknik (slide 5 dan 6) belum terbaca. Diagram di bagian ini adalah draf praktik umum yang perlu dicocokkan dengan alur resmi.
diperbarui: 2026-10-13
kategori: Alur Kerja
sumber: [ppt-gudang-teknik]
kata_kunci: [alur kerja, proses, diagram, flowchart, barang masuk, barang keluar, stock opname, layout]
---

# Ringkasan Alur Kerja

<p class="lead">Tiga alur ini adalah inti pekerjaan Gudang Teknik. Setiap halaman memuat diagram, langkah tertulis, titik keputusan, dan kesalahan yang perlu dihindari.</p>

```mermaid
flowchart LR
  accTitle: Siklus material di Gudang Teknik
  accDescr: Barang masuk menambah stok. Barang keluar mengurangi stok. Stock opname memeriksa kecocokan stok dengan catatan. Stok yang menyentuh titik pemesanan ulang memicu pembelian, yang kembali menjadi barang masuk.
  BM[Barang masuk] --> ST[(Stok di gudang)]
  ST --> BK[Barang keluar]
  ST <--> SO[Stock opname]
  BK -- stok mencapai ROP --> PB[Pemesanan ulang]
  PB --> BM
```

| Alur | Dipicu oleh | Hasil akhir | Status diagram |
| --- | --- | --- | --- |
| [Barang masuk](./barang-masuk) | Barang tiba dari supplier | Barang tersimpan dan tercatat | Draf, perlu dicocokkan dengan slide 5 |
| [Barang keluar](./barang-keluar) | Permintaan dari user | Barang diserahkan dan tercatat | Draf, perlu dicocokkan dengan slide 6 |
| [Stock opname](./stock-opname) | Jadwal penghitungan | Selisih teridentifikasi dan dilaporkan | Draf |
| [Layout gudang](./layout-gudang) | — | Denah lokasi penyimpanan | Menunggu gambar slide 7 |

::: warning Diagram masih draf
Urutan langkah di bagian ini disusun dari praktik umum pergudangan dan data yang disebut di materi Gudang Teknik (misalnya tanggal, supplier, jumlah, dan dokumen untuk barang masuk). Sebelum dipakai sebagai pegangan, cocokkan dengan gambar alur di presentasi asli dan minta persetujuan pembimbing.
:::

## Cara membaca diagram

- **Kotak** adalah langkah kerja.
- **Belah ketupat** adalah titik keputusan. Ikuti panah "Ya" atau "Tidak".
- **Silinder** adalah tempat data disimpan, misalnya catatan stok.
- Di layar kecil, ketuk **Perbesar diagram** untuk melihat diagram dalam ukuran penuh, lalu geser untuk membaca.
- Setiap diagram punya versi tertulis di bawahnya. Versi tertulis itulah yang dipakai jika diagram sulit dibaca.
