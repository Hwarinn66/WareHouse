---
title: Membaca Kode & Spesifikasi
description: Menguraikan nomor material, deskripsi, dan lokasi pada label, lalu mencocokkannya dengan barang fisik.
status: ditinjau
dasar: Standard Penomoran dan Deskripsi Material Cataloguing Warehouse BPI dan materi presentasi Gudang Teknik (slide 11)
diperbarui: 2026-10-20
kategori: Tutorial
tingkat: Pemula
sumber: [ik-gudang-teknik, ppt-gudang-teknik]
kata_kunci: [tutorial, kode barang, nomor material, deskripsi, spesifikasi, label, lokasi, material type, identifikasi, cocokkan, bearing, 2RS]
---

# Membaca Kode & Spesifikasi

<p class="lead">Di latihan ini kamu belajar menguraikan nomor material, deskripsi, dan lokasi pada label, lalu memastikan barang fisik benar-benar sama dengan yang tertulis.</p>

::: tip Sebelum mulai
- **Setelah latihan ini, kamu bisa** menguraikan nomor material sampai ke type, group, dan sub group-nya, membaca deskripsi, lalu mencocokkannya dengan barang.
- **Tingkat:** Pemula, sekitar 20 menit.
- **Baca dulu:** [Kode Barang](/divisi/kode-barang) dan [Layout Gudang](/alur-kerja/layout-gudang).
- **Siapkan:** akses ke database barang (minta ke pembimbing), dan satu barang berlabel di gudang.
:::

## Langkah

1. **Temukan label.** Cari label pada rak atau kemasan barang. Kalau label tidak ada, berhenti dan laporkan ke pembimbing.
2. **Baca nomor material per karakter.** Contoh: `SA9A00098`. Hati-hati, angka 0 dan huruf O mudah tertukar.
3. **Uraikan nomornya.**
   - Huruf pertama adalah **material type**: `S` berarti stationary & office supply.
   - Tiga karakter pertama adalah **group**: `SA9`.
   - Lima karakter pertama adalah **sub group**: `SA9A0`.
   - Empat digit terakhir adalah **nomor urut**: `0098`.
4. **Baca deskripsinya.** Contoh: `FORM;OVERTIME;WORK;F4`. Bagian pertama adalah nama utama barang, bagian berikutnya spesifikasinya.
5. **Baca lokasi dan satuannya.** Contoh: lokasi `B.09.02.025`, satuan *Buku*. Cocokkan blok dan areanya dengan [Layout Gudang](/alur-kerja/layout-gudang). Area B.09 memang tempat alat tulis dan perlengkapan kantor.
6. **Cocokkan dengan master material.** Cari nomor yang sama di master material. Pastikan deskripsi, satuan, dan lokasinya sama dengan label.
7. **Cocokkan dengan barang fisik.** Periksa tulisan tipe atau ukuran pada barangnya.
8. **Catat temuan yang tidak cocok**, misalnya label berbeda dengan tulisan di barang, lalu laporkan ke pembimbing.

<figure>

![Placeholder: foto contoh label barang di rak](/images/placeholder/screenshot-placeholder.svg)

<figcaption>Placeholder. Ganti dengan foto label barang di Gudang Teknik.</figcaption>
</figure>

## Latihan

Uraikan data barang berikut, yang diambil dari dokumen Material Reservation Gudang Teknik:

```
CF3A00010  –  SAFETY EQUIPMENT;EAR PLUGS;ROPE;MAX-30/3301130;100PR/CORDED  –  Set  –  B.04.09.007
```

1. Apa material type barang ini?
2. Apa kode group dan sub group-nya?
3. Berapa nomor urutnya?
4. Di blok dan area mana barang ini disimpan, dan apa isi area itu menurut layout gudang?
5. Pada deskripsi `BEARING;BALL;6205-2RS`, apa arti akhiran `2RS`?

::: details Lihat jawaban
1. `C`, yaitu consumable.
2. Group `CF3`, sub group `CF3A0`.
3. `0010`.
4. Blok B, area 04. Menurut layout, B.04 berisi material parts seperti bearing, lock nut, lock washer, dan perlengkapan keselamatan (*safety equipment*), jadi cocok untuk ear plug.
5. Bearing memakai seal karet di kedua sisinya.
:::

## Tips

- Bacakan nomor material dengan suara saat mengambil barang. Cara sederhana ini mengurangi salah ambil.
- Kalau dua barang sangat mirip, bandingkan deskripsinya berdampingan sebelum memilih.

## Kesalahan umum

- Mencocokkan berdasarkan nama saja tanpa melihat spesifikasinya.
- Menganggap label rak pasti benar, padahal barang bisa saja diletakkan di rak yang salah.
- Membaca nomor material sekilas, sehingga angka 0 tertukar dengan huruf O.

## Hasil yang diharapkan

Kamu bisa menjelaskan arti setiap bagian nomor material, membaca deskripsi dan lokasinya, dan menemukan setidaknya satu barang yang nomor, deskripsi, dan lokasinya cocok di label, master material, dan barang fisik.
