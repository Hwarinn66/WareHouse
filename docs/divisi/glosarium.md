---
title: Kamus Istilah
description: Arti istilah pergudangan dan teknik yang sering dipakai di Gudang Teknik.
status: ditinjau
dasar: materi presentasi Gudang Teknik, Kumpulan Instruksi Kerja Gudang Teknik, prosedur write off QP-4.3.3, dan istilah umum pergudangan
diperbarui: 2026-10-20
kategori: Gudang Teknik
sumber: [ppt-gudang-teknik, ik-gudang-teknik, qp-write-off]
outline: 2
kata_kunci: [glosarium, istilah, kamus, definisi, singkatan]
---

# Kamus Istilah

<p class="lead">Istilah yang sering kamu dengar di Gudang Teknik, dijelaskan dengan bahasa sederhana. Gunakan pencarian (<kbd>Ctrl</kbd> + <kbd>K</kbd>) untuk langsung menuju istilah tertentu.</p>

## Umum

### Gudang Teknik (warehouse)
Tempat menerima, menyimpan, mengelola, memelihara, dan menyalurkan barang teknik untuk mendukung operasional perusahaan.

### User
Orang atau bagian yang meminta dan memakai material dari gudang, misalnya teknisi perawatan.

### Vendor / supplier
Pihak luar yang menjual dan mengantar barang ke perusahaan.

### ERP / WMS
*Enterprise Resource Planning*, yaitu sistem komputer perusahaan yang menghubungkan data antardivisi. WMS (*Warehouse Management System*) adalah bagian sistem untuk mengelola gudang. Di Gudang Teknik, sistem ini dipakai untuk reservasi barang, mencatat barang masuk dan keluar, dan menyimpan data material.

### OS/PPIC
Divisi yang menerima laporan bahwa barang sudah masuk dan sesuai. PPIC (*Production Planning and Inventory Control*) adalah bagian yang merencanakan produksi dan persediaan.

### Good Received
Bagian penerimaan Gudang Teknik. Bertugas menerima, memeriksa, dan mendokumentasikan material yang datang, lalu menempatkannya di lokasi simpan.

### Stock Keeper
Petugas gudang yang menyiapkan dan menyerahkan material sesuai reservasi, serta menghitung stok fisik saat stock opname.

### Buyer procurement/purchasing
Bagian pembelian yang memesan barang ke vendor. Ketidaksesuaian barang dan klaim ke vendor disampaikan lewat bagian ini.

### NIP
Nomor Induk Pegawai. Saat barang diambil, NIP di reservasi dicocokkan dengan ID card karyawan yang mengambil.

### Surat tanda terima (STTB)
Surat Tanda Terima Barang. Ditandatangani staff gudang dan diberikan ke vendor sebagai bukti barang sudah diterima dalam kondisi dan jumlah yang sesuai, lalu diinput ke database.

### Rak reservasi
Rak khusus tempat barang yang sudah disiapkan untuk divisi pemesan, sampai karyawan divisi itu datang mengambilnya.

### Catatan manual rak
Catatan tertulis yang ada di setiap rak. Diisi setiap kali barang ditaruh atau diambil dari rak tersebut. Di instruksi kerja disebut **kartu stok** (*stock card*).

### TPS
Tempat penampungan sementara. Material yang sudah lolos pemeriksaan bisa ditaruh di sini dulu jika lokasi simpannya belum bisa dipakai. Di Blok B juga ada TPS khusus barang scrap.

### Gudang B3
Gudang untuk Bahan Berbahaya dan Beracun, misalnya bahan kimia. Wajib berventilasi baik, punya exhaust fan, bak kontrol tumpahan, MSDS, eyewash station, dan APAR.

### APD (alat pelindung diri) / PPE
Perlengkapan untuk melindungi tubuh saat bekerja, seperti helm, sarung tangan, safety shoes, dan goggles. PPE adalah singkatan bahasa Inggrisnya (*personal protective equipment*).

### K3
Keselamatan dan Kesehatan Kerja, yaitu upaya mencegah kecelakaan dan penyakit akibat kerja.

## Inventory

### Inventory (persediaan)
Seluruh material yang disimpan dan dicatat oleh gudang.

### Stock item
Material yang rutin dipakai, sehingga stoknya selalu dijaga.

### Non-stock item
Material yang jarang dipakai, sehingga tidak disimpan sebagai stok dan baru dibeli saat dibutuhkan.

### Fast moving
Material yang diminta 2 kali atau lebih dalam sebulan.

### Slow moving
Material yang diminta 1 kali dalam sebulan.

### Cycle counting
Metode menghitung sebagian stok secara bergiliran dan berkala, bukan menghitung seluruh gudang sekaligus. Materi Gudang Teknik juga memakai cara ini untuk menentukan fast dan slow moving.

### Critical stock
Material slow moving yang harus selalu tersedia (minimal 1 unit) karena dibutuhkan mendadak, misalnya suku cadang mesin penting.

### Write off
Penghapusbukuan, yaitu penghapusan catatan aktiva tetap dari pembukuan BPI karena barangnya tidak bisa dipakai lagi. Di gudang, istilah ini juga dipakai untuk persediaan yang sudah tidak terpakai, misalnya karena salah prediksi, mesinnya sudah tidak dipakai, atau barangnya kedaluwarsa. Lihat [SOP Write Off](/sop/dead-stock).

### Overstock
Stok berlebih yang tersimpan terlalu lama hingga mutunya bisa turun.

### Stok minimum
Batas bawah stok. Jika stok di bawah angka ini, risiko kehabisan barang tinggi.

### Stok maksimum
Batas atas stok agar barang tidak menumpuk dan memakan tempat.

### ROP (reorder point)
Titik pemesanan ulang. Saat stok turun sampai angka ini, material perlu dipesan kembali.

### Safety stock
Stok cadangan untuk berjaga-jaga jika pemakaian melonjak atau pengiriman terlambat.

### Lead time
Waktu tunggu sejak barang dipesan sampai barang tiba di gudang.

### FIFO (first in, first out)
Barang yang masuk lebih dulu dikeluarkan lebih dulu, agar tidak ada barang yang terlalu lama tersimpan.

### FEFO (first expired, first out)
Barang yang lebih dulu kedaluwarsa dikeluarkan lebih dulu, walaupun masuknya belakangan.

### Reservasi
Permintaan material oleh user di ERP/WMS, berisi nomor material, jumlah, dan NIP karyawan yang akan mengambil. Reservasi disetujui Foreman atau Supervisor divisi pemesan, dan barangnya harus diambil paling lambat 3 hari.

## Administrasi

### Master material
Daftar induk semua material (*Material Master List*): kode, nama, spesifikasi, satuan, dan lokasi.

### Kode barang (nomor material)
Kode unik 9 karakter sebagai identitas satu jenis material, misalnya `SA9A00098`. Terdiri dari material type, group, sub group, dan nomor urut. Lihat [Kode Barang](/divisi/kode-barang).

### Cataloguing
Penyusunan data material secara terstruktur: nomor material, deskripsi, dan satuan. Tujuannya mencegah kode ganda dan memudahkan perencanaan serta pelaporan.

### Surat jalan
Dokumen dari vendor yang menyertai barang saat dikirim.

### PO (purchase order)
Dokumen pesanan pembelian dari perusahaan ke vendor. Barang yang datang dicocokkan dengan PO.

### PR (purchase request)
Permintaan pembelian dari dalam perusahaan, yang menjadi dasar dibuatnya PO.

### GRN (Good Received Note)
Laporan penerimaan material. Diterbitkan setelah material dinyatakan sesuai secara visual, spesifikasi, mutu, dan jumlah.

### Material Reject
Tanda untuk material yang tidak sesuai saat diterima. Material ini dipisahkan dan diklaim ke vendor.

### CAR (Corrective Action Report)
Laporan tindakan perbaikan yang diterbitkan laboratorium jika material yang diperiksanya tidak sesuai.

### CoA dan Mill Test Certificate
Sertifikat dari produsen yang menyatakan hasil uji mutu material. CoA adalah *Certificate of Analysis*.

### MSDS
*Material Safety Data Sheet*, yaitu lembar data keselamatan bahan kimia: bahaya, cara menyimpan, dan cara menangani tumpahan.

### Aktiva tetap
Aset berwujud milik perusahaan yang dibeli atau dibangun untuk dipakai dalam operasional.

### CAPEX
*Capital Expenditure* atau pembelanjaan modal, yaitu anggaran untuk memperoleh atau meningkatkan aktiva tetap.

### Berita Acara Kesepakatan Write Off
Dokumen kesepakatan untuk me-write off barang, dibuat oleh Chief terkait bersama Chief Logistic dan disetujui CFO serta CEO.

### Scrap / ex pakai
Barang bekas pakai atau sisa yang tidak dipakai lagi. Pengelolaannya mengikuti prosedur barang scrap dan penjualan scrap.

### Spesifikasi
Data teknis yang membedakan satu barang dari barang lain, misalnya tipe dan ukuran.

### Satuan
Ukuran yang dipakai untuk menghitung barang, misalnya pcs, set, meter, kilogram, atau liter.

### Mutasi
Perubahan stok akibat barang masuk, barang keluar, atau perpindahan lokasi.

### Saldo
Jumlah stok yang tercatat pada suatu waktu.

### Stock opname
Kegiatan menghitung stok fisik lalu membandingkannya dengan catatan.

### Selisih
Perbedaan antara jumlah stok fisik dan jumlah di catatan.

## Material dan teknik

### Bearing
Komponen yang menopang poros berputar agar gesekannya kecil. Ukurannya biasanya ditulis diameter dalam × diameter luar × tebal.

### Seal dan gasket
Komponen perapat untuk mencegah kebocoran. Seal umumnya untuk bagian yang bergerak, sedangkan gasket untuk sambungan yang diam.

### Coupling
Penghubung antara dua poros, misalnya poros motor dan poros gearbox.

### Fastener
Komponen pengikat, seperti baut, mur, washer, dan screw.

### Fitting, flange, dan valve
Fitting adalah sambungan pipa (elbow, tee). Flange adalah sambungan pipa berbentuk piringan yang dibaut. Valve adalah katup untuk membuka, menutup, atau mengatur aliran.

### Consumable
Bahan habis pakai, seperti oli, grease, amplas, dan cutting disc.

### Instrumentasi
Alat ukur dan sensor, seperti pressure gauge, thermometer, dan transmitter.

### ERW
*Electric Resistance Welding*, yaitu proses pengelasan pipa baja menggunakan arus listrik. Lihat [Profil Perusahaan](/perusahaan/).

### Coating
Lapisan pelindung pada permukaan pipa untuk mencegah korosi.

## Indikator kinerja gudang

### Order fulfillment
Seberapa tepat permintaan user dipenuhi.

### On-time
Material tersedia tepat waktu saat dibutuhkan.

### Space utilization
Seberapa efisien ruang gudang dimanfaatkan.

### Stock accuracy
Seberapa sesuai stok fisik dengan catatan sistem.
