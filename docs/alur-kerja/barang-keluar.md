---
title: Alur Barang Keluar
description: Langkah dari permintaan barang lewat ERP sampai barang diambil karyawan divisi pemesan.
status: ditinjau
dasar: diagram presentasi Gudang Teknik dan catatan alur proses dari peserta magang
diperbarui: 2026-10-13
kategori: Alur Kerja
sumber: [ppt-gudang-teknik, catatan-alur]
kata_kunci: [barang keluar, pengeluaran, permintaan, reservasi, order, ERP, WMS, material reservation list, NIP, notifikasi, persetujuan, 3 hari, laporan barang keluar, rak reservasi, catatan manual, tukar barang, divisi pemesan]
---

# Alur Barang Keluar

<p class="lead">Alur ini dimulai saat divisi lain memesan barang lewat ERP dan selesai saat karyawan divisi tersebut membawa barangnya. Barang disiapkan dulu di rak reservasi sebelum diambil.</p>

## Flowchart

```mermaid
flowchart TD
  accTitle: Flowchart alur barang keluar
  accDescr: 1 divisi lain membuat reservasi di ERP yang disetujui Foreman atau Supervisornya, 2 reservasi muncul di Material Reservation List, 3 staff memproses reservasi dan memotong stok, 4 laporan barang keluar tercatat di ERP, 5 staff mencari barang, 6 mengambil barang, 7 mencatat di catatan manual rak, 8 menaruh barang di rak reservasi, 9 karyawan divisi pemesan datang dan NIP-nya dicocokkan, 10 staff menyerahkan barang, 11 karyawan mengecek barang. Jika tidak sesuai, barang ditukar lalu diserahkan lagi. Jika sesuai, karyawan membawa barang.
  L1(["1. Divisi membuat reservasi di ERP,<br/>disetujui Foreman/Supervisor-nya"]):::divisi --> L2["2. Reservasi muncul di Material Reservation List"]:::sistem
  L2 --> L3["3. Staff memproses reservasi dan memotong stok"]:::staff
  L3 --> L4[("4. Laporan barang keluar tercatat di ERP")]:::sistem
  L4 --> L5["5. Staff mencari barang sesuai orderan"]:::staff
  L5 --> L6["6. Staff mengambil barang dari rak"]:::staff
  L6 --> L7[/"7. Potong stok di kartu stok rak"/]:::dokumen
  L7 --> L8["8. Barang ditaruh di rak reservasi<br/>(maksimal 3 hari)"]:::staff
  L8 --> L9["9. Karyawan datang, NIP dicocokkan<br/>dengan ID card"]:::divisi
  L9 --> L10["10. Staff menyerahkan barang ke karyawan"]:::staff
  L10 --> L11{"11. Barang sesuai orderan?"}:::cek
  L11 -- Tidak --> T11["Barang dikembalikan dan ditukar dengan yang sesuai"]:::tolak
  T11 --> L10
  L11 -- Ya --> SELESAI(["Selesai: karyawan membawa barang"]):::selesai
```

<LegendaAlur />

## Langkah demi langkah dengan foto

Setiap kotak di flowchart punya kartu bernomor yang sama di bawah ini, lengkap dengan fotonya.

<LangkahAlur alur="barang-keluar" />

## Hal yang sering terlewat

- **Mengambil barang yang mirip tetapi beda tipe.** Selalu cocokkan kode dan spesifikasi dengan orderan di ERP.
- **Lupa mencatat di catatan manual rak.** Jumlah di rak dan di ERP jadi tidak sama.
- **Barang di rak reservasi tidak diberi keterangan.** Tandai untuk divisi atau orderan mana barang itu, agar tidak tertukar.
- **Menyerahkan tanpa dicek bersama.** Minta karyawan mengecek barang saat itu juga, supaya kesalahan langsung ketahuan.
- **Tidak mencocokkan NIP.** Barang hanya diserahkan ke karyawan yang NIP-nya tercantum di reservasi.
- **Barang reservasi dibiarkan lebih dari 3 hari.** Reservasinya batal, dan barang harus dikembalikan ke stok.

Langkah kerja yang lebih rinci ada di [SOP Pengeluaran Barang](/sop/pengeluaran-barang).
