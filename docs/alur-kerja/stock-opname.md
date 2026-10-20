---
title: Alur Stock Opname
description: Urutan kerja menghitung stok fisik, membandingkan dengan catatan, dan menangani selisih.
status: ditinjau
dasar: Instruksi Kerja Stock Opname Harian Gudang Teknik dan materi Gudang Teknik tentang cycle counting
diperbarui: 2026-10-20
kategori: Alur Kerja
sumber: [ik-gudang-teknik, ppt-gudang-teknik]
kata_kunci: [stock opname, stock opname harian, stock sheet, stock keeper, hitung fisik, cycle counting, selisih, penyesuaian stok, adjustment, akurasi stok, cut-off]
---

# Alur Stock Opname

<p class="lead">Stock opname membandingkan jumlah barang di rak dengan jumlah di catatan. Di Gudang Teknik, stock opname dilakukan setiap hari secara bergilir (<em>cycle count</em>). Tujuannya menemukan selisih, mencari penyebabnya, lalu memperbaiki catatan secara sah.</p>

## Ringkasan proses

| | |
| --- | --- |
| **Tujuan** | Menjaga akurasi stok (stock accuracy) |
| **Pemicu** | Jadwal harian bergilir per kategori barang, terutama fast moving, barang bernilai tinggi, dan barang yang baru masuk atau keluar |
| **Pihak yang terlibat** | Stock Keeper (menghitung) dan Supervisor atau Kepala Gudang (memvalidasi) |
| **Input** | Stock sheet harian atau kartu stok, alat tulis, dan clipboard |
| **Output** | Lembar hasil hitung, daftar selisih beserta penyebabnya, laporan opname |
| **SOP terkait** | [Stock Opname](/sop/stock-opname) |

## Diagram

```mermaid
flowchart TD
  accTitle: Alur stock opname harian
  accDescr: Siapkan stock sheet kategori hari ini, hentikan transaksi sementara, hitung fisik, lalu bandingkan dengan catatan. Selisih dihitung ulang, ditelusuri, dilaporkan, dan baru disesuaikan setelah disetujui.
  A([Kategori barang hari ini]) --> B[Siapkan stock sheet<br/>atau kartu stok]
  B --> C[Hentikan sementara transaksi<br/>di area yang dihitung]
  C --> D[Hitung fisik per lokasi,<br/>tulis di lembar hitung]
  D --> E[Bandingkan dengan catatan]
  E --> F{Ada selisih?}
  F -- Tidak --> K[Tandai item cocok]
  F -- Ya --> G[Hitung ulang<br/>oleh orang berbeda]
  G --> H{Masih selisih?}
  H -- Tidak --> K
  H -- Ya --> I[Telusuri penyebab: transaksi belum<br/>dicatat, salah lokasi, salah satuan]
  I --> J[Laporkan selisih & penyebabnya]
  J --> L{Divalidasi Supervisor/<br/>Kepala Gudang?}
  L -- Ya --> M[(Sesuaikan catatan stok)]
  L -- Tidak --> I
  K --> N[Susun laporan opname]
  M --> N
  N --> O([Selesai])
```

## Langkah tertulis

1. **Lihat jadwal hari ini.** Setiap hari, kategori barang yang berbeda dihitung secara bergiliran (*cycle count*), dengan fokus pada barang fast moving, barang bernilai tinggi, dan barang yang baru masuk atau keluar.
2. **Siapkan stock sheet harian atau kartu stok** untuk kategori tersebut.
3. **Hentikan sementara transaksi** di area yang dihitung. Jika tidak memungkinkan, catat waktu batasnya (*cut-off*) agar transaksi setelahnya tidak tercampur.
4. **Hitung fisik per lokasi.** Tulis hasilnya apa adanya, termasuk barang rusak dan barang tanpa label.
5. **Bandingkan** hasil hitung dengan catatan.
6. **Jika ada selisih, hitung ulang** sebaiknya oleh orang lain.
7. **Telusuri penyebab** selisih yang tetap ada: transaksi yang belum dicatat, barang di lokasi lain, salah satuan, atau salah kode.
8. **Laporkan** selisih dan penyebabnya ke Supervisor atau Kepala Gudang. Catatan stok hanya disesuaikan setelah hasilnya divalidasi.
9. **Susun laporan opname**, termasuk temuan lain seperti barang rusak, label hilang, atau calon barang write off.

## Potensi kesalahan

- **Menghitung sambil ada transaksi berjalan.** Hasilnya tidak bisa dibandingkan dengan catatan.
- **Langsung mengubah angka di catatan agar cocok.** Penyebab selisih tidak pernah ditemukan dan bisa terulang.
- **Melewatkan lokasi cadangan**, misalnya barang yang sama disimpan di dua rak.
- **Tidak mencatat kondisi barang.** Barang rusak ikut terhitung sebagai stok yang siap pakai.
