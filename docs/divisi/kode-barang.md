---
title: Kode Barang
description: Struktur nomor material 9 karakter dan cara menulis deskripsi material sesuai standar cataloguing Warehouse BPI.
status: ditinjau
dasar: Standard Penomoran dan Deskripsi Material Cataloguing Warehouse BPI, serta materi presentasi Gudang Teknik (slide 11)
diperbarui: 2026-10-20
kategori: Gudang Teknik
sumber: [ik-gudang-teknik, ppt-gudang-teknik]
kata_kunci: [kode barang, nomor material, material number, cataloguing, material type, material group, material sub group, nomor urut, deskripsi material, SA9A00098, spesifikasi, identifikasi, label, UoM, satuan, lokasi, salah ambil, kode ganda]
---

# Kode Barang

<p class="lead">Setiap material di Gudang Teknik punya <strong>nomor material</strong> (kode barang) dan <strong>deskripsi</strong> yang ditulis menurut standar cataloguing Warehouse BPI. Dengan standar ini, satu jenis material hanya punya satu kode, sehingga barang mudah dicari, tidak ada kode ganda, dan stok bisa dijaga optimal.</p>

## Tiga unsur

| Unsur | Penjelasan | Contoh |
| --- | --- | --- |
| **Nomor material** | Kode unik 9 karakter yang menjadi identitas satu jenis material | `SA9A00098` |
| **Deskripsi** | Nama dan spesifikasi material, ditulis dengan format standar | `FORM;OVERTIME;WORK;F4` |
| **Identifikasi** | Proses mengenali barang dari nomor, deskripsi, label, dan lokasinya | `SA9A00098` di lokasi `B.09.02.025` |

## Struktur nomor material

Nomor material terdiri dari **9 karakter alfanumerik**, disusun bertingkat dari kelompok paling besar ke paling kecil:

<figure>

```
S   A9   A0   0098
│   │    │    └── nomor urut (4 digit)
│   │    └─────── sub group      → SA9A0
│   └──────────── group          → SA9
└──────────────── material type  → S = Stationary & Office Supply
```

<figcaption>Contoh nomor material SA9A00098 (FORM;OVERTIME;WORK;F4) dari dokumen Material Reservation Gudang Teknik.</figcaption>
</figure>

| Tingkat | Panjang | Isi |
|---|---|---|
| **Material type** | 1 huruf | Kelompok paling besar, lihat tabel di bawah. |
| **Material group** | 3 karakter | Huruf type + 2 karakter. Mengelompokkan nama utama material, misalnya bearing atau valve. |
| **Material sub group** | 5 karakter | Kode group + 2 karakter. Menunjukkan jenis, fungsi, atau sifat utamanya, misalnya bearing ball atau bearing cylinder. |
| **Nomor urut** | 4 digit | Membedakan material yang spesifik di dalam sub group yang sama. |

### Material type

| Kode | Type | Contoh material |
|---|---|---|
| **R** | Raw material / pendukung | HRC, varnish, DOP pipe |
| **E** | Material unit / equipment | Pump, gear box, blower, motor, valve |
| **P** | Material part | Bearing, seal, impeller, coupling, bolt & nut |
| **N** | Material non-part / konstruksi | Steel profile (UNP, H-beam, WF-beam, angle bar, round bar, plate), material sipil |
| **C** | Consumable | Fuel, oli, grease, pahat (*chisel*), gas, elektroda las |
| **T** | Tool | Kunci (*wrench*), obeng, tool set |
| **S** | Stationary & office supply | Alat tulis, kertas, meja, kursi, PC |
| **F** | Finish good | Pipa minyak dan gas, pipa umum |
| **Z** | Other | Material yang tidak masuk ke type di atas |

### Contoh group dan sub group

| Group | Arti | Contoh sub group |
|---|---|---|
| `EA0` | VALVE | `EA0A0` VALVE;SOLENOID, `EA0A1` VALVE;DIRECTIONAL |
| `EA2` | MOTOR | |
| `PA0` | BEARING | `PA0A0` BEARING;PILLOW BLOCK, `PA0A1` BEARING;BALL, `PA0A2` BEARING;CYLINDER |
| `NA0` | PLATE | `NA0A0` PLATE;STAINLESS STEEL, `NA0A1` PLATE;CARBON STEEL |
| `CA0` | SAND PAPER | |

### Contoh dari sistem

| Nomor material | Deskripsi | Type |
|---|---|---|
| `SA9A00098` | FORM;OVERTIME;WORK;F4 | S, stationary & office supply |
| `CA4A10001` | PAINT;SPRAY;WHITE;300CC;PB101;WITH-MSDS | C, consumable |
| `CF3A00010` | SAFETY EQUIPMENT;EAR PLUGS;ROPE;MAX-30/3301130;100PR/CORDED | C, consumable |

## Menulis deskripsi material

Deskripsi adalah "nama lengkap" sebuah nomor material, sekaligus pembeda antara satu nomor dan nomor lain. Deskripsi harus jelas dan memuat:

- nama material,
- jenis atau bahan material,
- spesifikasi material,
- fungsi atau sifat material.

Formatnya:

```
OBJEK;SPESIFIKASI;FUNGSI/KONDISI
```

**Objek** adalah nama utama material. Bagian **fungsi/kondisi** boleh tidak diisi.

Aturan penulisan:

- Semua huruf kapital, **kecuali satuan** (UoM) yang ditulis sesuai standar penulisannya, misalnya `kW`, `Hz`, `mm`, atau `l/s`.
- Tidak memakai spasi. Antarbagian dipisahkan tanda titik koma (`;`).

Contoh:

```
BEARING;BALL;6321-2Z
MOTOR;AC;15kW;2P;380V;50Hz;3PH;B
PUMP;CENTRIFUGAL;H100m;Q150l/s;WATER
```

## Kode lokasi

Nomor material menunjukkan **apa** barangnya, sedangkan kode lokasi menunjukkan **di mana** barang disimpan. Contohnya, `SA9A00098` disimpan di `B.09.02.025`, yaitu Blok B, area 09 (alat tulis dan perlengkapan kantor), rak 02. Pembagian area ada di [Layout Gudang](/alur-kerja/layout-gudang).

## Mengapa standar ini dibuat

Standar ini ditetapkan lewat Surat Keputusan CEO No. 196/WRS-BPI/IV/2012, setelah tim katalog spare part meninjau pengodean barang pada April 2012. Sebelumnya, penomoran barang disusun berdasarkan tempat penyimpanan dan huruf awal nama barang, sementara deskripsinya belum terstruktur. Akibatnya, satu barang bisa punya lebih dari satu nomor.

Tujuan standar ini:

- menyeragamkan cara membuat nomor material, deskripsi, dan satuan (*unit of measure*),
- mengurangi nomor material ganda,
- mendapatkan stok yang optimal.

Contoh `BRG-MEC-001` pada materi presentasi Gudang Teknik adalah contoh sederhana untuk belajar. Kode resmi di sistem memakai struktur 9 karakter di halaman ini.

## Kesalahan yang sering terjadi

- **Mengandalkan nama saja.** "Bearing" saja ada puluhan ukuran. Selalu cocokkan nomor material **dan** deskripsinya.
- **Angka 0 tertukar dengan huruf O.** Nomor material berisi huruf dan angka, misalnya `SA9A00098`. Bacalah per karakter.
- **Label rusak atau hilang.** Jangan menebak. Pisahkan barangnya dan laporkan ke pembimbing.
- **Satu barang, dua kode.** Kalau menemukan barang identik dengan nomor berbeda, laporkan. Kode ganda membuat stok tampak lebih sedikit dari kenyataannya.
- **Satuan berbeda.** Pastikan satuan di catatan (Bh, Buku, Set, Klg, meter, liter) sama dengan satuan saat barang dihitung.

Latihan langkah demi langkah ada di tutorial [Membaca Kode & Spesifikasi](/tutorial/membaca-kode-barang). Barang yang belum punya kode diajukan lewat [SOP Permintaan Kode Material Baru](/sop/kode-material-baru).
