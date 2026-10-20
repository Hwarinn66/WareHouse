---
title: Alur Barang Keluar
description: Langkah dari permintaan barang lewat ERP sampai barang diambil karyawan divisi pemesan.
status: ditinjau
dasar: Instruksi Kerja Pelayanan Barang Gudang Teknik, dilengkapi diagram presentasi Gudang Teknik dan catatan alur proses
diperbarui: 2026-10-20
kategori: Alur Kerja
sumber: [ik-gudang-teknik, ppt-gudang-teknik, catatan-alur]
kata_kunci: [barang keluar, pengeluaran, permintaan, reservasi, order, ERP, WMS, material reservation list, NIP, notifikasi, persetujuan, 3 hari, laporan barang keluar, rak reservasi, catatan manual, tukar barang, divisi pemesan]
---

# Alur Barang Keluar

<p class="lead">Alur ini dimulai saat divisi lain memesan barang lewat ERP dan selesai saat karyawan divisi tersebut membawa barangnya. Barang disiapkan dulu di rak reservasi sebelum diambil.</p>

## Flowchart

```mermaid
flowchart TD
  accTitle: Flowchart alur barang keluar
  accDescr: 1 divisi mengecek stok dan membuat reservasi di ERP/WMS, 2 reservasi disetujui Foreman atau Supervisor lalu masuk ke Material Reservation List, 3 stock keeper mengecek stok dan memotongnya di sistem, 4 reservasi dicetak, 5 barang dicari, 6 barang diambil dari rak, 7 stok dipotong di kartu stok, 8 barang ditaruh di rak reservasi paling lama 3 hari, 9 NIP pengambil dicocokkan dengan ID card, 10 barang diserahkan, 11 karyawan mengecek barang. Jika NIP tidak cocok, barang tidak diserahkan. Jika barang tidak sesuai, barang ditukar lalu diserahkan lagi. Jika sesuai, karyawan membawa barang dan stock level diperbarui.
  L1(["1. Divisi cek stok dan membuat<br/>reservasi di ERP/WMS"]):::divisi --> L2["2. Disetujui Foreman/Supervisor,<br/>masuk Material Reservation List"]:::sistem
  L2 --> L3["3. Stock keeper cek stok<br/>dan memotongnya di sistem"]:::staff
  L3 --> L4[/"4. Cetak reservasi"/]:::dokumen
  L4 --> L5["5. Cari barang sesuai reservasi"]:::staff
  L5 --> L6["6. Ambil barang dari rak (FIFO)"]:::staff
  L6 --> L7[/"7. Potong stok di kartu stok rak"/]:::dokumen
  L7 --> L8["8. Barang ditaruh di rak reservasi<br/>(maksimal 3 hari)"]:::staff
  L8 --> L9{"9. Karyawan datang:<br/>NIP cocok dengan reservasi?"}:::cek
  L9 -- Tidak --> T9["Barang tidak diserahkan"]:::tolak
  L9 -- Ya --> L10["10. Serahkan barang ke karyawan"]:::staff
  L10 --> L11{"11. Barang sesuai reservasi?"}:::cek
  L11 -- Tidak --> T11["Barang dikembalikan dan<br/>ditukar dengan yang sesuai"]:::tolak
  T11 --> L10
  L11 -- Ya --> SELESAI(["Selesai: barang dibawa,<br/>stock level diperbarui"]):::selesai
```

<LegendaAlur />

## Langkah demi langkah dengan foto

Setiap kotak di flowchart punya kartu bernomor yang sama di bawah ini, lengkap dengan fotonya.

<LangkahAlur alur="barang-keluar" />

## Hal yang sering terlewat

- **Mengambil barang yang mirip tetapi beda tipe.** Selalu cocokkan nomor material dan deskripsinya dengan reservasi.
- **Lupa memotong stok di kartu stok.** Jumlah di rak dan di ERP jadi tidak sama.
- **Barang di rak reservasi tidak diberi keterangan.** Tandai untuk divisi atau nomor reservasi mana barang itu, agar tidak tertukar.
- **Menyerahkan tanpa dicek bersama.** Minta karyawan mengecek barang saat itu juga, supaya kesalahan langsung ketahuan.
- **Tidak mencocokkan NIP.** Barang hanya diserahkan ke karyawan yang NIP-nya tercantum di reservasi.
- **Barang reservasi dibiarkan lebih dari 3 hari.** Reservasinya batal, dan barang harus dikembalikan ke stok.

Langkah kerja yang lebih rinci ada di [SOP Pengeluaran Barang](/sop/pengeluaran-barang).
