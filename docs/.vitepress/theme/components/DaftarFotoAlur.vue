<script setup lang="ts">
// Untuk pengelola: daftar semua nama file foto alur kerja dan apakah fotonya sudah ada.
import alur from '../../../data/alur.json'
import { data as fotoAlur } from '../fotoAlur.data'

type Langkah = { judul: string; cek?: unknown }
const baris: { alur: string; langkah: string; file: string; ada: boolean }[] = []
for (const kunci of ['barang-masuk', 'barang-keluar'] as const) {
  const daftar = (alur as any)[kunci].langkah as Langkah[]
  daftar.forEach((l, i) => {
    const nn = String(i + 1).padStart(2, '0')
    const nama = `${kunci}-${nn}`
    baris.push({ alur: kunci, langkah: `${i + 1}. ${l.judul}`, file: nama, ada: !!fotoAlur[nama] })
    if (l.cek) {
      baris.push({ alur: kunci, langkah: `${i + 1}. ${l.judul} (jika Tidak)`, file: `${nama}-tidak`, ada: !!fotoAlur[`${nama}-tidak`] })
    }
  })
}
const jumlahAda = baris.filter((b) => b.ada).length
</script>

<template>
  <p>Foto terpasang: <strong>{{ jumlahAda }} dari {{ baris.length }}</strong>.</p>
  <table class="tabel-tumpuk">
    <thead>
      <tr>
        <th>Langkah</th>
        <th>Nama file</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="b in baris" :key="b.file">
        <td data-label="Langkah">{{ b.alur === 'barang-masuk' ? 'Masuk' : 'Keluar' }} · {{ b.langkah }}</td>
        <td data-label="Nama file"><code>{{ b.file }}.jpg</code></td>
        <td data-label="Status">{{ b.ada ? 'Sudah ada' : 'Belum ada' }}</td>
      </tr>
    </tbody>
  </table>
</template>
