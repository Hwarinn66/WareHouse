---
title: Alur Barang Masuk
description: Langkah dari barang datang dari vendor sampai tersimpan di rak dan tercatat.
status: ditinjau
dasar: diagram presentasi Gudang Teknik dan catatan alur proses dari peserta magang
diperbarui: 2026-10-13
kategori: Alur Kerja
sumber: [ppt-gudang-teknik, catatan-alur]
kata_kunci: [barang masuk, penerimaan, receiving, vendor, supplier, surat tanda terima, database, OS/PPIC, PPIC, laporan, rak, catatan manual, dikembalikan, retur]
---

# Alur Barang Masuk

<p class="lead">Alur ini dimulai saat vendor mengantar barang dan selesai saat barang tersimpan di rak. Ada dua kali pengecekan. Jika barang tidak lolos salah satunya, barang dikembalikan ke vendor.</p>

## Flowchart

```mermaid
flowchart TD
  accTitle: Flowchart alur barang masuk
  accDescr: Barang datang dari vendor, dicek kesesuaiannya dengan pesanan, dibawa masuk dan diterima staff, lalu dicek kondisi dan jumlahnya. Jika lolos, surat tanda terima diberikan ke vendor, data diinput ke database, laporan dikirim ke OS/PPIC, barang disimpan di rak dan dicatat di catatan manual rak. Barang yang tidak lolos pengecekan dikembalikan ke vendor.
  A(["Barang datang dari vendor / supplier"]):::vendor --> B{"Barang sesuai dengan pesanan?"}:::cek
  B -- Tidak --> R1["Barang dikembalikan ke vendor"]:::tolak
  B -- Ya --> C["Barang dibawa masuk ke dalam gudang"]:::staff
  C --> D["Staff menerima barang"]:::staff
  D --> E{"Kondisi baik dan jumlah sesuai?"}:::cek
  E -- "Tidak: rusak atau kurang" --> R2["Barang dikembalikan ke vendor"]:::tolak
  E -- Ya --> F[/"Surat tanda terima diberikan ke vendor"/]:::dokumen
  F --> G[("Input database barang: jumlah, jenis, tipe, tanggal masuk")]:::sistem
  G --> H[/"Laporan barang masuk dikirim ke divisi OS/PPIC"/]:::dokumen
  H --> I["Barang disimpan di rak sesuai lokasi di database"]:::staff
  I --> J[/"Dicatat di catatan manual rak"/]:::dokumen
  J --> K(["Selesai: barang tersimpan di gudang"]):::selesai
```

<LegendaAlur />

## Langkah demi langkah

<LangkahAlur alur="barang-masuk" />

## Hal yang sering terlewat

- **Menerima barang tanpa mengecek.** Cek dulu sebelum surat tanda terima diberikan. Setelah surat diserahkan, kekurangan barang jadi sulit diklaim.
- **Lupa input database.** Barang sudah ada di rak tetapi tidak tercatat, sehingga terlihat seperti stok kosong.
- **Lokasi rak tidak sesuai database.** Barang jadi sulit ditemukan saat ada permintaan.
- **Lupa mengisi catatan manual di rak.** Catatan di rak dan database jadi tidak sama.

Langkah kerja yang lebih rinci ada di [SOP Penerimaan Barang](/sop/penerimaan-barang).
