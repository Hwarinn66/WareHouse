---
title: Alur Warehouse
description: Gambaran besar alur kerja Gudang Teknik, dari barang datang sampai barang diambil divisi pemesan.
status: ditinjau
dasar: diagram presentasi Gudang Teknik dan catatan alur proses dari peserta magang
diperbarui: 2026-10-13
kategori: Alur Kerja
sumber: [ppt-gudang-teknik, catatan-alur]
kata_kunci: [alur warehouse, alur kerja, flowchart, diagram, proses gudang, barang masuk, barang keluar, ERP, rak reservasi]
---

# Alur Warehouse

<p class="lead">Pekerjaan Gudang Teknik terdiri dari dua alur utama: <strong>barang masuk</strong> dari vendor dan <strong>barang keluar</strong> ke divisi yang membutuhkan. Keduanya bertemu di stok gudang.</p>

## Flowchart lengkap

```mermaid
flowchart TD
  accTitle: Flowchart alur warehouse Gudang Teknik
  accDescr: Barang masuk dari vendor dicek, diterima, dicatat di database, dilaporkan ke OS/PPIC, lalu disimpan di rak sebagai stok. Barang keluar dimulai dari reservasi divisi di ERP yang disetujui Foreman atau Supervisor divisi itu, diproses staff, diambil dari stok, ditaruh di rak reservasi, lalu diserahkan dan dicek oleh karyawan divisi pemesan.
  subgraph MASUK["Barang masuk"]
    direction TB
    M1(["Vendor mengantar barang"]):::vendor --> M2{"Sesuai pesanan?"}:::cek
    M2 -- Tidak --> MR["Dikembalikan ke vendor"]:::tolak
    M2 -- Ya --> M3["Bawa masuk dan terima barang"]:::staff
    M3 --> M4{"Kondisi baik dan jumlah sesuai?"}:::cek
    M4 -- Tidak --> MR
    M4 -- Ya --> M5[/"Surat tanda terima ke vendor"/]:::dokumen
    M5 --> M6[("Input database barang")]:::sistem
    M6 --> M7[/"Laporan ke divisi OS/PPIC"/]:::dokumen
    M7 --> M8["Simpan di rak dan catat di catatan manual"]:::staff
  end
  M8 --> S[("Stok Gudang Teknik")]:::sistem
  subgraph KELUAR["Barang keluar"]
    direction TB
    K1(["Divisi membuat reservasi di ERP,<br/>disetujui atasannya"]):::divisi --> K2["Staff memproses reservasi,<br/>laporan keluar tercatat di ERP"]:::staff
    K2 --> K3["Cari dan ambil barang, catat di catatan manual"]:::staff
    K3 --> K4["Taruh di rak reservasi"]:::staff
    K4 --> K5["Serahkan ke karyawan divisi pemesan"]:::staff
    K5 --> K6{"Sesuai orderan?"}:::cek
    K6 -- Tidak --> K7["Tukar dengan barang yang sesuai"]:::tolak
    K7 --> K5
    K6 -- Ya --> K8(["Barang dibawa divisi pemesan"]):::selesai
  end
  S -- "siap dipesan" --> K1
```

<LegendaAlur />

## Pelajari per bagian

<DaftarKartu :items="[
  { judul: 'Alur barang masuk', ket: 'Dari vendor datang sampai barang tersimpan di rak.', link: '/alur-kerja/barang-masuk', ikon: 'masuk' },
  { judul: 'Alur barang keluar', ket: 'Dari permintaan di ERP sampai barang diambil divisi.', link: '/alur-kerja/barang-keluar', ikon: 'keluar' },
  { judul: 'Stock opname', ket: 'Menghitung stok fisik dan mencocokkannya dengan catatan.', link: '/alur-kerja/stock-opname', ikon: 'opname' },
  { judul: 'Layout gudang', ket: 'Denah area dan rak penyimpanan.', link: '/alur-kerja/layout-gudang', ikon: 'denah' }
]" />

## Tiga hal yang selalu dicatat

Setiap barang yang bergerak meninggalkan jejak di tiga tempat. Ketiganya harus selalu cocok.

1. **Database / ERP.** Barang masuk diinput ke database, dan barang keluar tercatat di ERP saat staff menyetujui permintaan.
2. **Catatan manual di rak.** Setiap barang yang ditaruh atau diambil dari rak dicatat di catatan yang ada di rak itu.
3. **Laporan.** Laporan barang masuk dikirim ke divisi OS/PPIC, sedangkan laporan barang keluar tersimpan di ERP.
