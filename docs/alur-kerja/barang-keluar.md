---
title: Alur Barang Keluar
description: Urutan kerja dari permintaan user sampai barang diserahkan, dicatat, dan stok dicek terhadap ROP.
status: draf
dasar: praktik umum pergudangan dan data barang keluar dari materi Gudang Teknik
catatan_status: Belum dicocokkan dengan gambar "Alur Proses Barang Keluar" (slide 6). Pihak yang berwenang menyetujui permintaan belum dikonfirmasi.
diperbarui: 2026-10-13
kategori: Alur Kerja
sumber: [ppt-gudang-teknik]
kata_kunci: [barang keluar, pengeluaran, permintaan, request, reservasi, user, serah terima, FIFO, ROP, pemesanan ulang, stok kosong]
---

# Alur Barang Keluar

<p class="lead">Alur ini memastikan user menerima barang yang benar, dalam jumlah dan kondisi yang tepat, dan setiap pengeluaran tercatat sehingga stok bisa dipantau.</p>

## Ringkasan proses

| | |
| --- | --- |
| **Tujuan** | Memenuhi permintaan user dengan tepat (prinsip 4 right) dan mencatat pemakaiannya |
| **Pemicu** | User mengajukan permintaan atau reservasi material |
| **Pihak yang terlibat** | User, pihak yang menyetujui permintaan, petugas Gudang Teknik, bagian pembelian (jika stok perlu dipesan ulang) |
| **Input** | Permintaan berisi user, kode atau nama barang, jumlah, tujuan pemakaian, tanggal |
| **Output** | Barang diserahkan, catatan barang keluar, saldo berkurang, pengajuan pemesanan ulang bila perlu |
| **SOP terkait** | [Pengeluaran Barang](/sop/pengeluaran-barang) |

## Diagram

```mermaid
flowchart TD
  accTitle: Alur barang keluar (draf)
  accDescr: User mengajukan permintaan. Gudang memeriksa kelengkapan dan ketersediaan stok, mengambil barang dengan FIFO, memverifikasi, menyerahkan, mencatat, lalu memeriksa apakah stok sudah mencapai ROP.
  A([User mengajukan permintaan]) --> B{Permintaan lengkap<br/>dan disetujui?}
  B -- Tidak --> R[Kembalikan ke user<br/>untuk dilengkapi]
  B -- Ya --> C{Stok tersedia<br/>di catatan?}
  C -- Tidak --> D{Stock item?}
  D -- Ya --> E[Laporkan stok kosong,<br/>cek status pemesanan ulang]
  D -- Tidak --> F[Ajukan pembelian<br/>non-stock item]
  E --> N[Informasikan user]
  F --> N
  C -- Ya --> G[Ambil barang dari lokasi<br/>dengan prinsip FIFO]
  G --> H[Cocokkan kode, spesifikasi,<br/>jumlah, kondisi]
  H --> I[Serahkan ke user,<br/>tanda tangan serah terima]
  I --> J[(Catat barang keluar:<br/>user, jumlah, tujuan, tanggal)]
  J --> K[(Perbarui saldo stok)]
  K --> L{Stok ≤ ROP?}
  L -- Ya --> M[Ajukan pemesanan ulang]
  L -- Tidak --> Z([Selesai])
  M --> Z
```

## Langkah tertulis

1. **Terima permintaan dari user.** Pastikan permintaan memuat nama user, kode atau nama barang, jumlah, tujuan pemakaian, dan tanggal.
2. **Periksa kelengkapan dan persetujuan.** Permintaan yang belum lengkap atau belum disetujui dikembalikan ke user.
3. **Cek ketersediaan stok** di catatan.
   - Jika **kosong** dan barangnya stock item, laporkan ke pembimbing dan cek apakah pemesanan ulang sudah berjalan.
   - Jika **kosong** dan barangnya non-stock item, ajukan pembelian sesuai prosedur.
   - Sampaikan ke user bahwa barang belum tersedia.
4. **Ambil barang** dari lokasinya. Dahulukan barang yang masuk lebih awal (FIFO).
5. **Verifikasi** kode, spesifikasi, jumlah, dan kondisi barang sebelum diserahkan.
6. **Serahkan barang ke user** dan minta tanda tangan serah terima.
7. **Catat barang keluar**: user, jumlah, tujuan, dan tanggal.
8. **Perbarui saldo stok.**
9. **Bandingkan saldo dengan ROP.** Jika saldo sudah sama dengan atau di bawah ROP, ajukan pemesanan ulang.

## Potensi kesalahan

- **Menyerahkan barang tanpa catatan**, misalnya karena user terburu-buru. Stok di catatan menjadi lebih besar dari fisik.
- **Salah ambil barang yang mirip**, misalnya bearing dengan ukuran berbeda. Selalu cocokkan kode dan spesifikasi.
- **Tidak menerapkan FIFO.** Barang lama tertinggal dan berisiko menjadi dead stock.
- **Lupa memeriksa ROP.** Stok baru disadari habis saat ada permintaan berikutnya.
- **Mencatat tujuan pemakaian secara asal.** Data tujuan dipakai untuk menganalisis pemakaian, jadi tulis dengan jelas.
