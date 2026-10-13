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
  accDescr: 1 barang datang dari vendor, 2 dicek kesesuaiannya dengan pesanan, 3 dibawa masuk ke gudang, 4 diterima staff, 5 dicek kondisi dan jumlahnya, 6 surat tanda terima diberikan ke vendor, 7 data diinput ke database, 8 laporan dikirim ke OS/PPIC, 9 barang disimpan di rak, 10 dicatat di catatan manual rak. Barang yang tidak lolos pengecekan di langkah 2 atau 5 dikembalikan ke vendor.
  L1(["1. Barang datang dari vendor / supplier"]):::vendor --> L2{"2. Barang sesuai dengan pesanan?"}:::cek
  L2 -- Tidak --> T2["Barang dikembalikan ke vendor"]:::tolak
  L2 -- Ya --> L3["3. Barang dibawa masuk ke dalam gudang"]:::staff
  L3 --> L4["4. Staff menerima barang"]:::staff
  L4 --> L5{"5. Kondisi baik dan jumlah sesuai?"}:::cek
  L5 -- "Tidak: rusak atau kurang" --> T5["Barang dikembalikan ke vendor"]:::tolak
  L5 -- Ya --> L6[/"6. Surat tanda terima diberikan ke vendor"/]:::dokumen
  L6 --> L7[("7. Input database barang: jumlah, jenis, tipe, tanggal masuk")]:::sistem
  L7 --> L8[/"8. Laporan barang masuk dikirim ke divisi OS/PPIC"/]:::dokumen
  L8 --> L9["9. Barang disimpan di rak sesuai lokasi di database"]:::staff
  L9 --> L10[/"10. Dicatat di catatan manual rak"/]:::dokumen
  L10 --> SELESAI(["Selesai: barang tersimpan di gudang"]):::selesai
```

<LegendaAlur />

## Langkah demi langkah dengan foto

Setiap kotak di flowchart punya kartu bernomor yang sama di bawah ini, lengkap dengan fotonya.

<LangkahAlur alur="barang-masuk" />

## Hal yang sering terlewat

- **Menerima barang tanpa mengecek.** Cek dulu sebelum surat tanda terima diberikan. Setelah surat diserahkan, kekurangan barang jadi sulit diklaim.
- **Lupa input database.** Barang sudah ada di rak tetapi tidak tercatat, sehingga terlihat seperti stok kosong.
- **Lokasi rak tidak sesuai database.** Barang jadi sulit ditemukan saat ada permintaan.
- **Lupa mengisi catatan manual di rak.** Catatan di rak dan database jadi tidak sama.

Langkah kerja yang lebih rinci ada di [SOP Penerimaan Barang](/sop/penerimaan-barang).
