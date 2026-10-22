---
title: Riwayat Versi
description: Catatan perubahan handbook dari versi ke versi.
status: ditinjau
diperbarui: 2026-10-20
kategori: Tentang Handbook
kata_kunci: [versi, riwayat, changelog, perubahan]
---

# Riwayat Versi

<p class="lead">Setiap perubahan penting dicatat di sini. Nomor versi juga tercantum di menu atas dan di <code>package.json</code>.</p>

## v0.4.1 (22 Oktober 2026)

- **STTB tidak dipakai lagi.** Langkah "STTB diberikan ke vendor" dihapus dari alur barang masuk, lalu urutannya menjadi GRN terbit (langkah 6) dan input ke database (langkah 7). Alur barang masuk sekarang 9 langkah. Foto flowchart ikut digeser ke nomor barunya.
- SOP Penerimaan Barang, flowchart Alur Warehouse, Kamus Istilah, Pencatatan Stok, FAQ, dan beranda ikut disesuaikan.
- **Tampilan HP diperbaiki.** Header tidak lagi lebih lebar dari layar (sisi kanan tidak kosong lagi dan halaman tidak bisa di-zoom out melebihi layar): judul dibuat dua baris di HP, dan tombol Keluar pindah ke menu ☰. Tautan di menu ☰ yang sebelumnya putih di atas putih kini terbaca, dan kata panjang di kotak "Tidak" pada flowchart boleh dipatahkan. Semua halaman diperiksa di lebar 320, 360, 375, 390, dan 412 px.

- **Halaman baru: Kegiatan Rutin** di menu Mulai. Isinya linimasa satu minggu kerja (Senin sampai Jumat) dengan penanda "Hari ini": meeting setiap Rabu, kerja bakti setiap Kamis, dan stock opname harian, lengkap dengan hal yang perlu disiapkan.
- Jadwal diatur lewat `docs/data/kegiatan.json`. Jam dan tempat masih menunggu konfirmasi pembimbing.
- Setiap kartu kegiatan punya slot foto (3 untuk meeting dan kerja bakti, 2 untuk stock opname harian). Fotonya ditaruh di `docs/public/images/kegiatan/`.
- Panduan Magang Baru, FAQ, Yang Perlu Dikonfirmasi, dan Cara Memperbarui Handbook ikut diperbarui.

## v0.4.0 (20 Oktober 2026)

- **Login tampilan** tanpa backend: seluruh website terkunci sampai pengunjung masuk, browser mengingat login selama 7 hari, dan ada tombol **Keluar** di menu atas.
- Akun diatur dengan `npm run atur-login`. Kata sandi disimpan sebagai hash, bukan teks asli.
- **Transisi setelah login**: panel navy melebar menutup layar, lalu menyusut menjadi kotak sambutan beranda, dan animasi beranda menyambung. Di halaman lain, panel menyusut ke header.
- Checklist Publikasi dan Cara Memperbarui Handbook menjelaskan batasan login ini.

## v0.3.2 (20 Oktober 2026)

- Laporan barang masuk ke divisi OS/PPIC dihapus dari alur, SOP, FAQ, dan Kamus Istilah, karena Gudang Teknik tidak melapor ke divisi tersebut.
- Diagram "Dengan siapa gudang bekerja?" kini menampilkan laboratorium dan buyer procurement/purchasing.
- Tabel catatan di halaman Pencatatan Stok disesuaikan dengan instruksi kerja (STTB, GRN, reservasi, kartu stok, dan stock opname harian).
- Foto GRN ditambahkan di langkah 8 alur barang masuk dan sebagai contoh di SOP Penerimaan Barang.

## v0.3.1 (20 Oktober 2026)

Alur kerja disamakan dengan instruksi kerja resmi dari perusahaan. Jumlah dan urutan langkah tetap, sehingga foto yang sudah ada tetap cocok.

- **Alur barang masuk** mengikuti Instruksi Kerja Penerimaan Material: cek dokumen dan pesanan, area inspeksi, pemeriksaan oleh gudang, laboratorium, atau user, Material Reject, STTB, GRN, penyimpanan sesuai klasifikasi, dan kartu stok.
- **Alur barang keluar** mengikuti Instruksi Kerja Pelayanan Barang: reservasi dan persetujuan Foreman/Supervisor, potong stok di sistem, cetak reservasi, batas 3 hari di rak reservasi, dan **verifikasi NIP** sebagai titik pengecekan baru (tempat foto baru `barang-keluar-09-tidak`).
- Flowchart Alur Warehouse, nomor langkah SOP Penerimaan Barang, dan teks beranda ikut diselaraskan.

## v0.3.0 (20 Oktober 2026)

Isi SOP dan materi Gudang Teknik diselaraskan dengan dokumen resmi: Kumpulan Instruksi Kerja & Standard Gudang Teknik dan Prosedur Penghapusbukuan Aktiva Tetap (Write Off) QP-4.3.3.

- **SOP ditulis ulang dari instruksi kerja**: penerimaan (siapa memeriksa apa, STTB, GRN, Material Reject), penyimpanan (penempatan per klasifikasi, FIFO dan FEFO, Gudang B3), pengeluaran (reservasi, persetujuan Foreman/Supervisor, verifikasi NIP, batas 3 hari), dan stock opname harian bergilir.
- **SOP baru: Permintaan Kode Material Baru** untuk stock item dan non-stock item.
- **SOP Write Off** mengikuti prosedur QP-4.3.3, lengkap dengan alur, peran, dan format nomor surat.
- **Kode Barang dan tutorialnya** memakai struktur nomor material resmi 9 karakter (material type, group, sub group, nomor urut) dan format deskripsi material.
- Langkah flowchart barang masuk dan keluar, Manajemen Stok, Alur Stock Opname, K3 (APD dan Gudang B3), Kamus Istilah, FAQ, dan daftar sumber ikut diperbarui.

Sejak v0.2.1 juga ada perubahan tampilan: tema navy, oranye, dan putih, logo BPI, beranda baru dengan animasi dan parallax, denah gudang, foto alur dan profil perusahaan, serta tampilan yang menyesuaikan monitor lebar.

## v0.2.1 (13 Oktober 2026)

- **Tempat foto di setiap kotak flowchart** barang masuk dan barang keluar, termasuk kotak "Tidak". Selama foto belum ada, yang tampil placeholder.
- Kotak flowchart diberi nomor yang sama dengan kartu langkah. Kotak bernomor bisa diklik untuk melompat ke kartu fotonya.
- Langkah dipecah agar satu kotak flowchart sama dengan satu kartu: barang masuk 10 langkah, barang keluar 11 langkah.
- Daftar nama file foto dan statusnya ada di halaman Cara Memperbarui Handbook.

## v0.2.0 (13 Oktober 2026)

Tampilan dibuat lebih sederhana dan ramah, serta alur kerja disesuaikan dengan alur asli Gudang Teknik.

- **Alur barang masuk dan barang keluar** sekarang mengikuti diagram presentasi dan catatan alur proses Gudang Teknik (ERP, rak reservasi, catatan manual rak, surat tanda terima, laporan ke OS/PPIC).
- **Flowchart baru**: alur warehouse lengkap, barang masuk, dan barang keluar, berwarna sesuai pelaku, ditambah daftar langkah bernomor.
- **Beranda baru**: kolom pencarian, enam topik utama, dan tiga langkah untuk peserta baru.
- **Lebih sederhana**: label status, catatan kaki sumber, tombol kata kunci, filter FAQ, tabel identitas SOP, dan menu versi dihapus dari tampilan. Menu atas tinggal empat.
- **Font Plus Jakarta Sans**, sudut kartu lebih bulat, dan bahasa disapa dengan "kamu".
- SOP Penerimaan dan Pengeluaran Barang ditulis ulang sesuai alur asli. FAQ dan Kamus Istilah ditambah (ERP, OS/PPIC, rak reservasi, surat tanda terima, catatan manual rak).

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
