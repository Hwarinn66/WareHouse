---
title: SOP Permintaan Kode Material Baru
description: Cara mengajukan kode material baru untuk stock item dan non-stock item, sesuai standar cataloguing Warehouse BPI.
status: ditinjau
dasar: Instruksi Kerja Permintaan Kode Material Baru Gudang Teknik
nomor_dokumen: null
versi: 0.3
pemilik: Gudang Teknik
pengesah: null
diperbarui: 2026-10-20
kategori: SOP
sumber: [ik-gudang-teknik]
kata_kunci: [SOP, kode material baru, nomor material, cataloguing, material master list, stock item, non stock item, PR, purchase request, memo, admin cataloguing, foreman control material master, head of division, internal control, level stock, ROP, duplikasi kode]
---

# SOP Permintaan Kode Material Baru

<p class="lead">Dipakai ketika sebuah departemen membutuhkan barang yang belum punya kode di sistem ERP/WMS. Isinya diringkas dari Instruksi Kerja Permintaan Kode Material Baru Gudang Teknik.</p>

## Tujuan

Menjadi pedoman Gudang Teknik dalam membuat atau menambah kode material baru ke Material Master List dan database sistem, dengan deskripsi yang jelas, spesifikasi yang tepat, dan **tanpa kode ganda**. Kode dibuat sesuai [standar cataloguing Warehouse BPI](/divisi/kode-barang).

## Berlaku untuk

Pembuatan kode material baru untuk **stock item** maupun **non-stock item**. Berlaku untuk semua departemen (user) yang membutuhkan barang baru yang belum punya kode di sistem.

## Peran

| Peran | Tanggung jawab |
|---|---|
| **Supervisor Gudang** | Mengawasi kepatuhan terhadap instruksi kerja. |
| **Foreman Control Material Master & Cataloguing** | Mengontrol material master dan level stok sesuai perhitungan yang ditetapkan, serta menganalisanya sesuai kegiatan produksi yang sedang berjalan (*job order*). |
| **Admin Cataloguing** | Memverifikasi data, mengecek apakah sudah ada kode serupa, lalu menginput kode baru ke sistem. |
| **Admin Pembuat PR Stock Item** | Membuat dan menerbitkan PR (*purchase request*) untuk material stock item. |
| **User (pemohon)** | Melengkapi data spesifikasi barang, mengajukan permintaan, dan menerbitkan PR untuk material non-stock item. |

## Sebelum mengajukan

1. **Pastikan materialnya memang belum ada** di sistem WMS. Ini mencegah satu barang punya dua kode.
2. **Tentukan jenisnya**: dijadikan stock item di gudang, atau cukup non-stock item. Pertimbangkan seberapa sering material itu dipakai. Lihat [Manajemen Stok](/divisi/manajemen-inventory#stock-item-dan-non-stock-item).

## Untuk stock item

1. **User membuat memo pengajuan** kode material baru untuk dijadikan stock item. Memo disetujui dan ditandatangani Head of Division terkait, dan perlu persetujuan Section Head of Internal Control.
2. **Isi memo menjelaskan secara rinci:**
   - tujuan material dijadikan stock item,
   - deskripsi detail dan spesifikasi lengkap,
   - analisa pemakaian **3 tahun ke belakang** dan perkiraan pemakaian per bulan.
3. **Kode dibuat** setelah memo disetujui Supervisor atau Section Head of Warehouse, sesuai standar cataloguing. Sekaligus ditentukan level stoknya (stok maksimum, stok minimum, jumlah pesan, lead time, dan ROP) serta lokasi penyimpanannya.
4. **Kode diinput ke ERP**, lalu Admin Pembuat PR langsung menerbitkan PR untuk material tersebut.

## Untuk non-stock item

1. **User mengisi format "Pengajuan Permintaan dan Monitoring Kode Material Baru"**, dengan data:
   - nama material,
   - jenis atau bahan,
   - spesifikasi,
   - fungsi atau sifat,
   - dimensi,
   - jumlah dan satuan (UoM).

   Permintaan dikirim ke Warehouse lewat email yang diketahui atasan terkait, atau lewat sistem aplikasi perusahaan.
2. **Kalau datanya belum lengkap**, Admin Cataloguing berhak mengembalikan pengajuan ke user untuk diperbaiki. Lampirkan foto barang atau brosur teknis jika perlu, supaya deskripsinya jelas.
3. **Kode dibuat** setelah permintaan disetujui Indirect Material Supervisor Warehouse, sesuai standar cataloguing.
4. **Admin Cataloguing memberi tahu user** kode yang baru lewat email atau sistem aplikasi perusahaan. Setelah itu, user membuat dan menerbitkan PR.

## Ringkasan perbedaan

| | Stock item | Non-stock item |
|---|---|---|
| Bentuk pengajuan | Memo | Format pengajuan lewat email atau sistem |
| Persetujuan pengajuan | Head of Division dan Section Head of Internal Control | Atasan terkait mengetahui |
| Persetujuan di Warehouse | Supervisor atau Section Head of Warehouse | Indirect Material Supervisor Warehouse |
| Data tambahan | Analisa pemakaian 3 tahun dan perkiraan pemakaian per bulan | Foto atau brosur teknis jika perlu |
| Level stok dan lokasi | Ditentukan saat kode dibuat | Tidak disimpan sebagai stok |
| Yang menerbitkan PR | Admin Pembuat PR Stock Item | User (pemohon) |

## Baca juga

- [Kode Barang: struktur nomor material dan cara menulis deskripsi](/divisi/kode-barang)
- [Manajemen Stok](/divisi/manajemen-inventory)
