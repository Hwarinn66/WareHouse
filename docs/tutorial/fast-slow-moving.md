---
title: Menentukan Fast & Slow Moving
description: Mengklasifikasikan material dari frekuensi permintaan dalam sebulan.
status: draf
dasar: kriteria dari materi presentasi Gudang Teknik (slide 9)
diperbarui: 2026-10-13
kategori: Tutorial
tingkat: Pemula
sumber: [ppt-gudang-teknik]
kata_kunci: [tutorial, fast moving, slow moving, klasifikasi, frekuensi permintaan, reservasi, cycle counting]
---

# Menentukan Fast & Slow Moving

<p class="lead">Kamu akan mengelompokkan material berdasarkan seberapa sering material itu diminta dalam satu bulan.</p>

::: tip Sebelum mulai
- **Setelah latihan ini, kamu bisa** menghitung frekuensi permintaan dan menerapkan kriteria fast/slow moving.
- **Tingkat:** Pemula, sekitar 30 menit.
- **Baca dulu:** [Manajemen Stok](/divisi/manajemen-inventory).
- **Siapkan:** catatan barang keluar selama satu bulan (untuk praktik nyata, minta ke pembimbing).
:::

## Kriteria

| Kategori | Frekuensi permintaan per bulan |
| --- | --- |
| **Fast moving** | 2 kali atau lebih |
| **Slow moving** | 1 kali |

::: warning Yang dihitung adalah frekuensi, bukan jumlah unit
Satu permintaan berisi 50 baut tetap dihitung **1 kali** permintaan. Material yang diminta sekali dalam jumlah besar tetap termasuk slow moving.
:::

## Langkah

1. **Ambil catatan barang keluar** untuk satu bulan penuh.
2. **Kelompokkan per kode barang.** Gunakan kode, bukan nama, agar barang yang sama tidak terhitung dua kali.
3. **Hitung berapa kali** setiap kode muncul sebagai permintaan.
4. **Terapkan kriteria.** 2 kali atau lebih berarti fast moving, 1 kali berarti slow moving.
5. **Pisahkan yang 0 kali.** Materi belum mengatur kategori untuk material ini. Tanyakan ke pembimbing.
6. **Tandai yang termasuk critical stock.** Untuk material slow moving yang penting bagi mesin, pastikan stok minimal 1 unit.

## Contoh dengan data latihan

| Kode (latihan) | Material | Jumlah permintaan bulan ini | Total unit diminta | Kategori |
| --- | --- | --- | --- | --- |
| `CTH-PPE-007` | Sarung tangan kerja | 9 kali | 44 pasang | Fast moving |
| `CTH-CON-012` | Cutting disc 4" | 4 kali | 20 pcs | Fast moving |
| `CTH-MEC-001` | Bearing 6205-2RS | 2 kali | 2 pcs | Fast moving |
| `CTH-FAS-014` | Baut M12 × 50 | 1 kali | 50 pcs | Slow moving |
| `CTH-MEC-030` | Coupling (contoh) | 0 kali | 0 | Tanyakan pembimbing |

Perhatikan baris baut: walaupun 50 unit diminta, permintaannya hanya **1 kali**, sehingga baut tersebut termasuk slow moving.

## Kesalahan umum

- Menghitung unit, bukan frekuensi permintaan.
- Memakai data kurang dari satu bulan.
- Menggabungkan barang yang mirip tetapi berbeda kode.

## Hasil yang diharapkan

Daftar material dengan kategori fast moving, slow moving, atau "perlu ditanyakan", yang bisa dipakai sebagai dasar menentukan stok minimum, stok maksimum, dan ROP pada [tutorial berikutnya](/tutorial/min-max-rop).
