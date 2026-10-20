---
title: Alur Warehouse
description: Gambaran besar alur kerja Gudang Teknik, dari barang datang sampai barang diambil divisi pemesan.
status: ditinjau
dasar: Kumpulan Instruksi Kerja Gudang Teknik, dilengkapi diagram presentasi Gudang Teknik dan catatan alur proses
diperbarui: 2026-10-20
kategori: Alur Kerja
sumber: [ik-gudang-teknik, ppt-gudang-teknik, catatan-alur]
kata_kunci: [alur warehouse, alur kerja, flowchart, diagram, proses gudang, barang masuk, barang keluar, ERP, rak reservasi]
---

# Alur Warehouse

<p class="lead">Pekerjaan Gudang Teknik terdiri dari dua alur utama: <strong>barang masuk</strong> dari vendor dan <strong>barang keluar</strong> ke divisi yang membutuhkan. Keduanya bertemu di stok gudang.</p>

## Flowchart lengkap

```mermaid
flowchart TD
  accTitle: Flowchart alur warehouse Gudang Teknik
  accDescr: Barang masuk datang dengan surat jalan dan PO, dicek dokumen dan pesanannya, diperiksa di area inspeksi oleh gudang, laboratorium, atau user, lalu dibuatkan STTB, diinput ke database, diterbitkan GRN, dan disimpan sesuai klasifikasi serta dicatat di kartu stok. Barang keluar dimulai dari reservasi divisi di ERP/WMS yang disetujui Foreman atau Supervisor divisi itu, lalu stock keeper memotong stok, mencetak reservasi, menyiapkan barang di rak reservasi, mencocokkan NIP pengambil, dan menyerahkan barang.
  subgraph MASUK["Barang masuk"]
    direction TB
    M1(["Vendor mengantar barang<br/>dengan surat jalan dan PO"]):::vendor --> M2{"Dokumen dan<br/>pesanan sesuai?"}:::cek
    M2 -- Tidak --> MR["Dikembalikan atau<br/>diklaim ke vendor"]:::tolak
    M2 -- Ya --> M3["Pemeriksaan di area inspeksi<br/>(gudang, laboratorium, atau user)"]:::staff
    M3 --> M4{"Memenuhi syarat?"}:::cek
    M4 -- Tidak --> MR
    M4 -- Ya --> M5[/"STTB ke vendor,<br/>input ke database"/]:::dokumen
    M5 --> M6[/"GRN terbit,<br/>laporan ke OS/PPIC"/]:::dokumen
    M6 --> M7["Simpan sesuai klasifikasi,<br/>catat di kartu stok"]:::staff
  end
  M7 --> S[("Stok Gudang Teknik")]:::sistem
  subgraph KELUAR["Barang keluar"]
    direction TB
    K1(["Divisi membuat reservasi<br/>di ERP/WMS"]):::divisi --> K2["Disetujui Foreman/Supervisor<br/>divisi pemesan"]:::divisi
    K2 --> K3["Stock keeper potong stok di sistem<br/>dan cetak reservasi"]:::staff
    K3 --> K4["Siapkan barang, potong kartu stok,<br/>taruh di rak reservasi (maks. 3 hari)"]:::staff
    K4 --> K5{"NIP pengambil cocok?"}:::cek
    K5 -- Tidak --> K5T["Barang tidak diserahkan"]:::tolak
    K5 -- Ya --> K6["Serahkan barang"]:::staff
    K6 --> K7{"Sesuai reservasi?"}:::cek
    K7 -- Tidak --> K8["Tukar dengan barang yang sesuai"]:::tolak
    K8 --> K6
    K7 -- Ya --> K9(["Barang dibawa,<br/>stock level diperbarui"]):::selesai
  end
  S -- "siap direservasi" --> K1
```

<LegendaAlur />

## Pelajari per bagian

<DaftarKartu :items="[
  { judul: 'Alur barang masuk', ket: 'Dari vendor datang sampai barang tersimpan di rak.', link: '/alur-kerja/barang-masuk', ikon: 'masuk' },
  { judul: 'Alur barang keluar', ket: 'Dari reservasi di ERP sampai barang diambil divisi.', link: '/alur-kerja/barang-keluar', ikon: 'keluar' },
  { judul: 'Stock opname', ket: 'Menghitung stok fisik setiap hari secara bergilir.', link: '/alur-kerja/stock-opname', ikon: 'opname' },
  { judul: 'Layout gudang', ket: 'Denah area dan rak penyimpanan.', link: '/alur-kerja/layout-gudang', ikon: 'denah' }
]" />

## Tiga hal yang selalu dicatat

Setiap barang yang bergerak meninggalkan jejak di tiga tempat. Ketiganya harus selalu cocok.

1. **Sistem ERP/WMS.** Barang masuk diinput lewat STTB, dan stok barang keluar dipotong di sistem saat reservasi diproses.
2. **Kartu stok di rak.** Setiap barang yang ditaruh atau diambil dari rak dicatat di kartu stok (catatan manual) di rak itu, lengkap dengan saldo akhirnya.
3. **Dokumen.** Barang masuk punya STTB dan GRN (laporannya juga diteruskan ke divisi OS/PPIC), sedangkan barang keluar punya reservasi yang dicetak.
