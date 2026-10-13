---
title: Riwayat Versi
description: Catatan perubahan handbook dari versi ke versi.
status: draf
diperbarui: 2026-10-13
kategori: Tentang Handbook
kata_kunci: [versi, riwayat, changelog, perubahan]
---

# Riwayat Versi

<p class="lead">Setiap perubahan penting dicatat di sini. Nomor versi juga tercantum di menu atas dan di <code>package.json</code>.</p>

## v0.1.0 (13 Oktober 2026)

Versi awal untuk ditinjau pembimbing.

- Struktur website: Beranda, Profil Perusahaan, Gudang Teknik, Alur Kerja, Tutorial, SOP, FAQ, Referensi, dan halaman 404.
- Profil perusahaan dari sumber publik, dengan status verifikasi per bagian. Visi, misi, sejarah, dan struktur organisasi belum ditampilkan karena belum ada sumber resmi.
- Materi Gudang Teknik dari presentasi internal: pengertian, fungsi, jenis material, manajemen inventory, kode barang, administrasi stok, dan indikator kinerja.
- Alur barang masuk, barang keluar, dan stock opname sebagai **draf**. Alur ini belum dicocokkan dengan gambar slide 5–6.
- Enam SOP draf dari praktik umum pergudangan.
- Empat tutorial dengan data latihan.
- Pencarian lokal, breadcrumb, daftar isi, diagram, FAQ accordion, dan tampilan responsif.

## Cara mencatat versi baru

1. Naikkan nomor `version` di `package.json`. Gunakan angka tengah untuk penambahan isi (0.2.0) dan angka akhir untuk perbaikan kecil (0.1.1).
2. Tambahkan bagian baru di atas halaman ini, berisi tanggal dan daftar perubahannya.
