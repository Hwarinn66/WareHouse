---
title: Checklist Sebelum Publikasi
description: Pemeriksaan dan persetujuan yang wajib selesai sebelum handbook dibuka untuk umum.
status: ditinjau
dasar: ketentuan keamanan informasi proyek handbook
diperbarui: 2026-10-20
kategori: Tentang Handbook
kata_kunci: [publikasi, deploy, checklist, persetujuan, keamanan informasi, data sensitif, rilis]
---

# Checklist Sebelum Publikasi

<p class="lead">Website ini statis dan hanya memakai <strong>login tampilan</strong> tanpa backend. Login menyembunyikan isi dari pengunjung biasa, tetapi siapa pun yang tahu alamat sebuah file (misalnya gambar) tetap bisa membukanya langsung. Login ini <strong>tidak</strong> membuat website aman untuk data rahasia.</p>

## Persetujuan

- [x] **1. Persetujuan pembimbing atau penanggung jawab.** Ada persetujuan tertulis (email atau pesan) bahwa website boleh dipublikasikan, dan ke mana (publik, intranet, atau terbatas).
- [ ] **2. Informasi perusahaan diperiksa.** Semua fakta di [Profil Perusahaan](/perusahaan/) sesuai dan sumbernya bisa dibuka.
- [ ] **3. Visi, misi, dan bidang usaha diperiksa.** Isinya sama persis dengan dokumen resmi, atau tidak ditampilkan.
- [ ] **4. SOP dan prosedur keselamatan diperiksa.** Setiap SOP berstatus `disetujui`, atau ditandai jelas sebagai draf. Tidak ada ketentuan keselamatan resmi yang dihilangkan.
- [x] **5. Gambar dan dokumen diperiksa.** Setiap foto, screenshot, dan dokumen sudah diizinkan untuk dimuat.
- [ ] **6. Data sensitif dihapus.** Tidak ada nama dan nomor telepon karyawan, data supplier atau harga, data stok asli, kredensial, maupun denah keamanan.
- [ ] **7. Logo dan identitas perusahaan disetujui.** Ada izin memakai logo dan warna perusahaan.
- [ ] **8. Semua URL dan file yang ikut ter-deploy diperiksa.** Jalankan `npm run build`, lalu `npm run cek-publikasi`, dan periksa daftar file di folder `docs/.vitepress/dist/`.

## Pemeriksaan teknis

- [ ] `npm run build` berhasil tanpa error.
- [ ] `npm run cek-publikasi:ketat` lolos. Perintah ini gagal jika masih ada halaman yang belum disetujui atau ada file yang mencurigakan.
- [ ] Hapus tag `noindex` di `docs/.vitepress/config.mts` hanya jika website memang boleh muncul di mesin pencari.
- [ ] Ubah teks status di `footer` pada `config.mts` sesuai status publikasi.
- [ ] Hapus atau sembunyikan halaman yang belum siap.

## Yang tidak boleh dilakukan

- Menaruh file rahasia di `docs/public/` dengan anggapan "tidak ditautkan, jadi aman".
- Menaruh kata sandi, token, atau kunci API di file mana pun di proyek ini.
- Mengunggah salinan SOP resmi atau dokumen internal tanpa izin tertulis.
