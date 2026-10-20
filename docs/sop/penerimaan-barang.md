---
title: SOP Penerimaan Barang
description: Langkah menerima material dari vendor, mulai dari cek dokumen dan inspeksi, STTB dan GRN, sampai barang tersimpan dan tercatat.
status: ditinjau
dasar: Instruksi Kerja Penerimaan Material Gudang Teknik dan alur barang masuk Gudang Teknik
nomor_dokumen: null
versi: 0.3
pemilik: Gudang Teknik
pengesah: null
diperbarui: 2026-10-20
kategori: SOP
sumber: [ik-gudang-teknik, ppt-gudang-teknik, catatan-alur]
kata_kunci: [SOP, penerimaan barang, receiving, barang masuk, vendor, good received, surat jalan, PO, purchase order, STTB, surat tanda terima, GRN, good received note, inspektor laboratorium, material reject, CAR, non stock item, klaim, OS/PPIC, kartu stok]
---

# SOP Penerimaan Barang

<p class="lead">Dipakai setiap kali vendor atau supplier mengantar material ke Gudang Teknik. Isinya diringkas dari Instruksi Kerja Penerimaan Material Gudang Teknik.</p>

## Tujuan

Memastikan setiap material yang datang ke PT Bakrie Pipe Industries sudah diperiksa dan memenuhi kriteria serta spesifikasi teknis yang diminta, sebelum disimpan dan dicatat.

## Siapa memeriksa apa

Tidak semua material diperiksa oleh orang yang sama:

| Kelompok material | Diperiksa oleh |
|---|---|
| ATK, consumable, dan material part | Bagian penerimaan Gudang Teknik (Good Received) |
| Plastik transparan, dop plastic protector, dop end cup protector, dop metal protector, varnish, zinc ingot, cat meni, dan material coating | Inspektor Laboratorium, sesuai instruksi kerja verifikasi pembelian WI.QP-07 |
| Material non-stock item | User yang memesan, paling lambat **3 hari kerja** |

Material part yang perlu dicek dimensi dan kekerasannya, misalnya U-ring seal atau discutter, diperiksa oleh Maintenance CAD Center dan Inspektor Laboratorium, lengkap dengan laporan hasil pemeriksaannya.

## Peran

| Peran | Tanggung jawab |
|---|---|
| **Supervisor Gudang** | Mengawasi kepatuhan terhadap instruksi kerja. |
| **Good Received** | Menerima dan mendokumentasikan kedatangan material, lalu meneruskan ketidaksesuaian ke buyer procurement/purchasing. |
| **Inspektor Laboratorium** | Memeriksa material kelompok laboratorium. Teknisi atau engineer laboratorium berhak menerbitkan Corrective Action Report (CAR) jika material tidak sesuai. |
| **User** | Memeriksa material non-stock item yang dipesannya. |

## Yang perlu disiapkan

- Komputer, printer, dan akses ke sistem ERP.
- Kamera saku untuk dokumentasi kedatangan barang.
- Alat ukur: jangka sorong (*vernier caliper*), durometer, *stick sounding* untuk tangki atau drum, dan timbangan.
- Alat bantu: troli, tangga portabel, dan forklift. Forklift hanya dioperasikan oleh orang yang berwenang.
- Form ceklis penerimaan barang **HSE-PP-K3L-01D** (revisi terakhir).

## Langkah-langkah

1. **Cek dokumen.** Pastikan setiap kedatangan barang disertai surat jalan dan dokumen pendukung lainnya, misalnya PO (*purchase order*).
2. **Cocokkan barang dengan pesanan.** Bandingkan barang dengan PO dan surat jalan. Kalau tidak sesuai, barang dikembalikan ke vendor.
3. **Bawa barang masuk** ke area inspeksi, lalu terima barangnya.
4. **Periksa jumlah, kondisi, dan mutunya** sesuai tabel di atas.
   - ATK, consumable, dan material part langsung diperiksa bagian penerimaan, lalu form ceklis penerimaan barang diisi.
   - Material kelompok laboratorium diteruskan ke Inspektor Laboratorium.
   - Material non-stock item diteruskan ke user, yang lalu melengkapi administrasi pengebonan barang sementara.
5. **Berikan Surat Tanda Terima Barang (STTB)** yang sudah ditandatangani kepada vendor.
6. **Input STTB ke database** sesuai alur sistem penerimaan barang dari tim IT: jumlah, jenis barang, tipe barang, dan tanggal masuk.
7. **Terbitkan Good Received Note (GRN)**, yaitu laporan penerimaan material, jika material sudah memenuhi syarat visual, spesifikasi, mutu, dan jumlah.
8. **Kirim laporan ke divisi OS/PPIC** bahwa barang sudah masuk dan sesuai.
9. **Simpan barang** di lokasi yang tercatat di database, sesuai [SOP Penyimpanan Barang](./penyimpanan-barang).
10. **Catat di kartu stok** di rak tempat barang disimpan.

Flowchart-nya ada di [Alur Barang Masuk](/alur-kerja/barang-masuk).

## Kalau material tidak sesuai

- Barang yang tidak sesuai **dipisahkan dan diberi tanda Material Reject**.
- **Stock item:** Good Received memberi tahu buyer procurement/purchasing bahwa barang tidak sesuai spesifikasi permintaan pembelian dan akan dikembalikan.
- **Material kelompok laboratorium:** laboratorium membuat laporan ketidaksesuaian beserta hasil pemeriksaannya, dan bisa menerbitkan CAR.
- **Non-stock item:** user memberi tahu Good Received, lalu Good Received meneruskan proses klaim ke vendor melalui buyer procurement/purchasing.
- Laporan ketidaksesuaian ditujukan ke departemen procurement/purchasing untuk disampaikan ke vendor.

Kalau ragu apakah barang sesuai, jangan memutuskan sendiri. Tanyakan ke Good Received atau pembimbing.

## Cek sebelum selesai

- [ ] Surat jalan dan PO sudah dicek.
- [ ] Barang sesuai pesanan, kondisinya baik, dan jumlahnya lengkap.
- [ ] Material sudah diperiksa oleh pihak yang tepat (penerimaan, laboratorium, atau user).
- [ ] STTB sudah diberikan ke vendor dan diinput ke database.
- [ ] GRN sudah terbit.
- [ ] Laporan sudah dikirim ke OS/PPIC.
- [ ] Barang ada di rak yang benar dan kartu stok sudah diisi.
- [ ] Barang yang tidak sesuai sudah dipisahkan dan diberi tanda Material Reject.

## Perhatian keselamatan

::: warning Saat membongkar dan membawa barang
- Cek berat barang sebelum mengangkat. Minta bantuan atau pakai alat angkut untuk barang berat.
- Alat angkut bermesin hanya boleh dipakai oleh orang yang berwenang.
- Pakai sarung tangan saat membuka kemasan yang tajam atau diikat strapping.
:::

## Acuan

Instruksi kerja ini merujuk API Spec Q1, ISO 9001, QP-07, drawing Maintenance CAD Center, dan Technical Specification, masing-masing edisi atau revisi terakhir.
