---
title: Referensi & Sumber
description: Daftar sumber yang dipakai di handbook beserta tanggal akses.
status: terverifikasi
diperbarui: 2026-10-13
kata_kunci: [referensi, sumber, daftar pustaka, rujukan]
---

# Referensi & Sumber

<p class="lead">Semua fakta tentang perusahaan di handbook ini merujuk ke sumber di bawah. Nomor dalam kurung siku, misalnya [1], di halaman lain menunjuk ke daftar ini.</p>

Sumber publik bisa dibuka siapa saja. Sumber internal hanya disebut namanya. Filenya **tidak** diunggah ke website karena semua file di folder publik bisa diakses langsung siapa pun yang tahu alamatnya.

<DaftarSumber />

## Sumber yang belum bisa diakses

- **Situs resmi PT Bakrie Pipe Industries.** Situs ini membatasi akses otomatis, sehingga belum bisa dibaca saat riset awal. Periksa secara manual untuk visi, misi, sejarah, dan daftar produk, lalu tambahkan ke `docs/data/sumber.json`.
- **Gambar slide 5–7 presentasi Gudang Teknik** (alur barang masuk, alur barang keluar, layout gudang). Hanya teks presentasi yang terbaca, jadi diagram terkait di handbook masih berstatus draf.

## Cara menambah sumber

Tambahkan entri baru di `docs/data/sumber.json`, lalu rujuk `id`-nya dari `docs/data/company-profile.json` atau dari frontmatter `sumber:` di halaman Markdown. Panduan lengkapnya ada di [Cara Memperbarui Handbook](/tentang-handbook/cara-memperbarui).
