---
title: Alur Barang Keluar
description: Langkah dari permintaan barang lewat ERP sampai barang diambil karyawan divisi pemesan.
status: ditinjau
dasar: diagram presentasi Gudang Teknik dan catatan alur proses dari peserta magang
diperbarui: 2026-10-13
kategori: Alur Kerja
sumber: [ppt-gudang-teknik, catatan-alur]
kata_kunci: [barang keluar, pengeluaran, permintaan, order, ERP, notifikasi, persetujuan, laporan barang keluar, rak reservasi, catatan manual, tukar barang, divisi pemesan]
---

# Alur Barang Keluar

<p class="lead">Alur ini dimulai saat divisi lain memesan barang lewat ERP dan selesai saat karyawan divisi tersebut membawa barangnya. Barang disiapkan dulu di rak reservasi sebelum diambil.</p>

## Flowchart

```mermaid
flowchart TD
  accTitle: Flowchart alur barang keluar
  accDescr: Divisi lain membuat permintaan lewat ERP, notifikasi masuk ke ERP Warehouse Teknik, staff menyetujui sehingga laporan barang keluar tercatat di ERP. Staff mencari dan mengambil barang, mencatat di catatan manual rak, lalu menaruh barang di rak reservasi. Karyawan divisi pemesan datang, menerima barang, dan mengeceknya. Jika tidak sesuai, barang ditukar. Jika sesuai, karyawan membawa barang.
  A(["Divisi lain membuat permintaan di ERP"]):::divisi --> B["Notifikasi muncul di ERP Warehouse Teknik"]:::sistem
  B --> C["Staff menyetujui permintaan"]:::staff
  C --> D[("Laporan barang keluar tercatat di ERP")]:::sistem
  D --> E["Staff mencari barang sesuai orderan"]:::staff
  E --> F["Staff mengambil barang dari rak"]:::staff
  F --> G[/"Catat pengeluaran di catatan manual rak"/]:::dokumen
  G --> H["Barang ditaruh di rak reservasi"]:::staff
  H --> I["Karyawan divisi pemesan datang ke warehouse"]:::divisi
  I --> J["Staff menyerahkan barang ke karyawan"]:::staff
  J --> K{"Barang sesuai orderan?"}:::cek
  K -- Tidak --> L["Barang dikembalikan dan ditukar dengan yang sesuai"]:::tolak
  L --> J
  K -- Ya --> M(["Selesai: karyawan membawa barang"]):::selesai
```

<LegendaAlur />

## Langkah demi langkah

<LangkahAlur alur="barang-keluar" />

## Hal yang sering terlewat

- **Mengambil barang yang mirip tetapi beda tipe.** Selalu cocokkan kode dan spesifikasi dengan orderan di ERP.
- **Lupa mencatat di catatan manual rak.** Jumlah di rak dan di ERP jadi tidak sama.
- **Barang di rak reservasi tidak diberi keterangan.** Tandai untuk divisi atau orderan mana barang itu, agar tidak tertukar.
- **Menyerahkan tanpa dicek bersama.** Minta karyawan mengecek barang saat itu juga, supaya kesalahan langsung ketahuan.

Langkah kerja yang lebih rinci ada di [SOP Pengeluaran Barang](/sop/pengeluaran-barang).
