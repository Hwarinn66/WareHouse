---
title: Alur Barang Masuk
description: Langkah dari barang datang dari vendor sampai tersimpan di rak dan tercatat.
status: ditinjau
dasar: Instruksi Kerja Penerimaan Material dan Penempatan Material Gudang Teknik, dilengkapi diagram presentasi Gudang Teknik dan catatan alur proses
diperbarui: 2026-10-22
kategori: Alur Kerja
sumber: [ik-gudang-teknik, ppt-gudang-teknik, catatan-alur]
kata_kunci: [barang masuk, penerimaan, receiving, vendor, supplier, surat jalan, PO, area inspeksi, inspektor laboratorium, GRN, good received note, material reject, kartu stok, database, laporan, rak, catatan manual, dikembalikan, retur]
---

# Alur Barang Masuk

<p class="lead">Alur ini dimulai saat vendor mengantar barang dan selesai saat barang tersimpan di rak. Urutannya mengikuti Instruksi Kerja Penerimaan Material Gudang Teknik. Ada dua kali pengecekan: dokumen dan pesanan saat barang datang, lalu hasil pemeriksaan material di area inspeksi.</p>

## Flowchart

```mermaid
flowchart TD
  accTitle: Flowchart alur barang masuk
  accDescr: 1 barang datang dengan surat jalan dan PO, 2 dokumen dan kesesuaian pesanan dicek, 3 barang dibawa ke area inspeksi, 4 material diperiksa oleh gudang, laboratorium, atau user, 5 hasil pemeriksaan dicocokkan dengan persyaratan, 6 GRN terbit, 7 data penerimaan diinput ke database, 8 barang disimpan sesuai klasifikasi, 9 dicatat di kartu stok. Barang yang tidak lolos di langkah 2 dikembalikan ke vendor, dan yang tidak lolos di langkah 5 diberi tanda Material Reject lalu diklaim ke vendor.
  L1(["1. Barang datang dengan surat jalan dan PO"]):::vendor --> L2{"2. Dokumen lengkap dan<br/>barang sesuai pesanan?"}:::cek
  L2 -- Tidak --> T2["Dikembalikan ke vendor"]:::tolak
  L2 -- Ya --> L3["3. Barang dibawa ke area inspeksi"]:::staff
  L3 --> L4["4. Pemeriksaan material oleh<br/>gudang, laboratorium, atau user"]:::staff
  L4 --> L5{"5. Memenuhi syarat visual,<br/>spesifikasi, mutu, dan jumlah?"}:::cek
  L5 -- Tidak --> T5["Material Reject,<br/>diklaim ke vendor"]:::tolak
  L5 -- Ya --> L6[/"6. GRN terbit"/]:::dokumen
  L6 --> L7[("7. Input ke database")]:::sistem
  L7 --> L8["8. Disimpan sesuai klasifikasi<br/>(FIFO dan FEFO)"]:::staff
  L8 --> L9[/"9. Dicatat di kartu stok"/]:::dokumen
  L9 --> SELESAI(["Selesai: barang tersimpan di gudang"]):::selesai
```

<LegendaAlur />

## Langkah demi langkah dengan foto

Setiap kotak di flowchart punya kartu bernomor yang sama di bawah ini, lengkap dengan fotonya.

<LangkahAlur alur="barang-masuk" />

## Hal yang sering terlewat

- **Menerbitkan GRN sebelum barang dicek.** Periksa dulu sampai tuntas. Setelah GRN terbit, kekurangan barang jadi sulit diklaim.
- **Memindahkan barang dari area inspeksi terlalu cepat.** Barang baru boleh dipindahkan setelah dinyatakan sesuai.
- **Barang tidak sesuai tidak diberi tanda.** Barang yang ditolak harus dipisahkan dan diberi tanda Material Reject, supaya tidak tercampur dengan stok.
- **Lupa input ke database.** Barang sudah ada di rak tetapi tidak tercatat, sehingga terlihat seperti stok kosong.
- **Lokasi rak tidak sesuai database.** Barang jadi sulit ditemukan saat ada permintaan.
- **Lupa mengisi kartu stok di rak.** Catatan di rak dan database jadi tidak sama.

Langkah kerja yang lebih rinci ada di [SOP Penerimaan Barang](/sop/penerimaan-barang).
