---
title: SOP Pengeluaran Barang
description: Langkah mengeluarkan material berdasarkan reservasi di ERP/WMS, mulai dari persetujuan dan verifikasi NIP sampai barang diserahkan.
status: ditinjau
dasar: Instruksi Kerja Pelayanan Barang Gudang Teknik dan alur barang keluar Gudang Teknik
nomor_dokumen: null
versi: 0.3
pemilik: Gudang Teknik
pengesah: null
diperbarui: 2026-10-20
kategori: SOP
sumber: [ik-gudang-teknik, ppt-gudang-teknik, catatan-alur]
kata_kunci: [SOP, pengeluaran barang, barang keluar, pelayanan barang, reservasi, good issue, ERP, WMS, material reservation list, NIP, ID card, stock keeper, foreman, supervisor, rak reservasi, 3 hari, material bekas, kartu stok, FIFO, tukar barang]
---

# SOP Pengeluaran Barang

<p class="lead">Dipakai setiap kali divisi lain mengambil material dari gudang. Pengeluaran barang di Gudang Teknik selalu berdasarkan reservasi (<em>good issue to reservation</em>). Isinya diringkas dari Instruksi Kerja Pelayanan Barang Gudang Teknik.</p>

## Tujuan

Menjadi pedoman petugas Warehouse dalam mengeluarkan material berdasarkan reservasi, supaya barang yang diserahkan benar dan setiap pengeluaran tercatat, baik di sistem maupun di kartu stok.

## Berlaku untuk

Seluruh proses reservasi dan pengeluaran material, di sistem ERP/WMS (sesuai nomor reservasi) maupun secara fisik: mulai dari reservasi, persetujuan, verifikasi NIP pengambil, sampai material diserahkan kepada penerima (*recipient*).

## Peran

| Peran | Tanggung jawab |
|---|---|
| **User (divisi pemesan)** | Mengecek ketersediaan material dan membuat reservasi di ERP/WMS. |
| **Foreman/Supervisor divisi pemesan** | Menunjuk karyawan yang ditugaskan mengambil barang, dan menyetujui reservasi di sistem. |
| **Stock Keeper (petugas Warehouse)** | Mencocokkan identitas pengambil, jenis, dan jumlah material yang diserahkan, serta meminta material bekas atau rusak. |

## Yang perlu disiapkan

- Komputer, printer, dan sistem ERP/WMS.
- Kartu stok di rak.
- APD sesuai arahan pembimbing.

## Langkah-langkah

### Di sisi divisi pemesan

1. **Cek ketersediaan material** di ERP/WMS.
2. **Buat reservasi** jika material tersedia, dengan mengisi:
   - nomor material yang dibutuhkan,
   - jumlah (*quantity*) sesuai kebutuhan,
   - NIP (Nomor Induk Pegawai) karyawan yang ditugaskan mengambil barang.
3. **Reservasi disetujui** di sistem, minimal oleh Foreman atau Supervisor divisi tersebut.

### Di Gudang Teknik

4. **Cek Material Reservation List** di ERP/WMS: reservasi yang sudah disetujui, beserta NIP pengambilnya.
5. **Buka nomor reservasi dan cocokkan dengan stok.**
   - Kalau stok ada, stok langsung dipotong di sistem.
   - Kalau stok sudah habis, misalnya sudah direservasi user lain, item tersebut dibatalkan atau dicoret.
6. **Cetak reservasi dan siapkan material** sesuai jenis dan jumlahnya. Ambil barang yang masuk lebih dulu (FIFO), lalu potong stoknya di kartu stok.
7. **Taruh material di rak reservasi.** Batas waktu pengambilan adalah **3 hari**. Kalau lewat dari itu dan material tidak jadi dipakai, reservasi dianggap batal dan material dikembalikan ke stok.
8. **Verifikasi pengambil.** Saat karyawan datang, cocokkan NIP di reservasi dengan ID card pengambil. Minta juga material bekas atau rusak yang diganti, jika ada.
9. **Serahkan material** kalau hasil verifikasi cocok. Minta karyawan mengecek barangnya. Kalau tidak sesuai orderan, terima kembali barangnya dan tukar dengan yang sesuai.
10. **Perbarui stock level** di kartu stok.

Flowchart-nya ada di [Alur Barang Keluar](/alur-kerja/barang-keluar).

## Setelah melayani

Setiap hari, tim gudang menghitung jumlah fisik barang yang keluar dan masuk, lalu membandingkannya dengan saldo di sistem atau kartu stok. Kalau ada selisih, cari akar masalahnya, misalnya salah input, barang tidak ditaruh di tempatnya, atau barang yang diambil tidak sesuai. Caranya ada di [SOP Stock Opname](./stock-opname).

## Cek sebelum selesai

- [ ] Reservasi sudah disetujui Foreman/Supervisor divisi pemesan.
- [ ] Stok sudah dipotong di sistem dan di kartu stok.
- [ ] Kode dan spesifikasi barang sesuai reservasi.
- [ ] NIP pengambil cocok dengan ID card.
- [ ] Material bekas atau rusak sudah diminta, jika ada.
- [ ] Barang sudah dicek karyawan dan dinyatakan sesuai.
- [ ] Barang di rak reservasi yang lewat 3 hari sudah dikembalikan ke stok.

## Perhatian keselamatan

::: warning Saat mengambil barang
- Pakai tangga atau alat bantu untuk rak tinggi. Jangan memanjat rak.
- Angkat barang dengan menekuk lutut dan punggung tetap lurus. Minta bantuan untuk barang berat atau panjang.
- Pakai sarung tangan untuk barang bersudut tajam.
:::
