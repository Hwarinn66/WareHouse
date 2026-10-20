---
title: SOP Stock Opname
description: Stock opname harian secara bergilir (cycle count) untuk mencocokkan stok fisik dengan catatan sistem.
status: ditinjau
dasar: Instruksi Kerja Stock Opname Harian Gudang Teknik
nomor_dokumen: null
versi: 0.3
pemilik: Gudang Teknik
pengesah: null
diperbarui: 2026-10-20
kategori: SOP
sumber: [ik-gudang-teknik, ppt-gudang-teknik]
kata_kunci: [SOP, stock opname, stock opname harian, hitung fisik, cycle count, cycle counting, stock sheet, kartu stok, selisih, stock discrepancy, akar masalah, penyesuaian, akurasi stok, stock keeper, supervisor, kepala gudang, fast moving]
---

# SOP Stock Opname

<p class="lead">Di Gudang Teknik, stock opname dilakukan <strong>setiap hari secara bergilir</strong> (<em>cycle count</em>). Setiap hari, sebagian barang dihitung, bukan seluruh gudang sekaligus. Isinya diringkas dari Instruksi Kerja Stock Opname Harian Gudang Teknik.</p>

## Tujuan

Memastikan catatan stok di sistem sama dengan jumlah fisik barang di gudang. Pengecekan rutin ini membantu:

- mendeteksi kehilangan atau kerusakan barang dengan cepat,
- mencegah kekosongan stok,
- menemukan kesalahan input data.

## Berlaku untuk

Penghitungan fisik sebagian persediaan setiap hari secara bergilir. Fokusnya:

- barang **fast moving** (perputarannya cepat),
- barang **bernilai tinggi**,
- **verifikasi barang masuk dan keluar** hari itu.

## Peran

| Peran | Tanggung jawab |
|---|---|
| **Stock Keeper** | Menghitung fisik barang langsung di lapangan, memeriksa kondisinya (rusak atau kedaluwarsa), dan memberi label jika perlu. |
| **Supervisor atau Kepala Gudang** | Memvalidasi hasil hitung harian, mengawasi agar sesuai SOP, dan mengecek ulang jika ada anomali atau selisih. |

## Yang perlu disiapkan

- Komputer, printer, dan sistem ERP/WMS.
- Daftar stok harian (*stock sheet*) atau kartu stok untuk kategori yang dijadwalkan.
- Alat tulis: pulpen, pensil, dan clipboard.

## Langkah-langkah

1. **Siapkan daftar.** Cetak atau siapkan *stock sheet* harian atau kartu stok untuk kategori barang yang dijadwalkan hari itu.
2. **Hentikan atau batasi transaksi.** Hentikan sementara penerimaan dan pengeluaran barang di area yang akan dihitung, supaya tidak ada selisih karena transaksi yang sedang berjalan.
3. **Hitung fisik** barang secara langsung (*actual count*).
4. **Tulis jumlah aktual** di lembar kerja stock opname, dan pastikan kondisi fisik barang baik. Beri label jika ada barang rusak atau kedaluwarsa.
5. **Bandingkan** jumlah fisik dengan saldo di sistem atau pembukuan harian.
6. **Kalau ada selisih** (barang kurang atau lebih):
   - cari akar masalahnya, misalnya salah input, barang tidak ditaruh di tempatnya, atau barang yang diambil tidak sesuai,
   - hitung ulang,
   - telusuri dokumen transaksinya.
7. **Serahkan hasil ke Supervisor atau Kepala Gudang** untuk divalidasi. Penyesuaian di sistem dilakukan setelah penyebab selisih ditemukan dan hasilnya divalidasi.

## Penyebab selisih yang sering terjadi

| Penyebab | Contoh |
|---|---|
| Salah input | Jumlah atau nomor material salah ketik saat mencatat barang masuk atau keluar. |
| Barang tidak di tempatnya | Barang ditaruh di rak lain, sehingga tidak terhitung di lokasinya. |
| Pengambilan tidak sesuai | Barang yang diambil berbeda jenis atau jumlahnya dengan reservasi. |

## Cek sebelum selesai

- [ ] Transaksi di area yang dihitung sudah dihentikan atau dibatasi.
- [ ] Semua barang dalam daftar hari ini sudah dihitung.
- [ ] Kondisi barang sudah dicek, dan barang rusak atau kedaluwarsa sudah diberi label.
- [ ] Item yang selisih sudah dihitung ulang dan dokumennya ditelusuri.
- [ ] Hasil sudah divalidasi Supervisor atau Kepala Gudang sebelum sistem disesuaikan.

## Perhatian keselamatan

::: warning Saat menghitung di rak
- Jangan memanjat rak untuk menghitung barang di atas. Gunakan tangga yang stabil.
- Kembalikan barang ke posisi semula dengan stabil setelah dihitung.
:::

## Baca juga

- [Alur Stock Opname](/alur-kerja/stock-opname)
- [Mencatat Hasil Hitung Fisik](/tutorial/hitung-fisik)
