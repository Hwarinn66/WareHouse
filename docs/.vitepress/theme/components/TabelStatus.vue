<script setup lang="ts">
// Daftar halaman otomatis dari frontmatter (judul, status, nomor dokumen, versi).
// Contoh pemakaian di Markdown:
//   <TabelStatus awalan="/sop/" kolom="sop" />
//   <TabelStatus awalan="/tutorial/" kolom="tutorial" />
//   <TabelStatus kolom="status" />   (semua halaman)
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as halaman } from '../halaman.data'
import daftarStatus from '../../../data/status.json'

const props = withDefaults(defineProps<{ awalan?: string; kolom?: 'sop' | 'tutorial' | 'status' }>(), {
  awalan: '/',
  kolom: 'status'
})

const baris = computed(() =>
  halaman.filter((h) => h.url.startsWith(props.awalan) && h.url !== props.awalan && h.url !== '/404')
)

const labelStatus = (s: string | null) =>
  s ? ((daftarStatus as Record<string, any>)[s]?.label ?? s) : 'Tidak ada status'
const nadaStatus = (s: string | null) =>
  s ? ((daftarStatus as Record<string, any>)[s]?.nada ?? 'waspada') : 'waspada'
</script>

<template>
  <div class="bungkus">
    <table class="tabel-tumpuk tabel-status">
      <thead>
        <tr>
          <th scope="col">{{ kolom === 'sop' ? 'Prosedur' : kolom === 'tutorial' ? 'Tutorial' : 'Halaman' }}</th>
          <th v-if="kolom === 'sop'" scope="col">Nomor & versi</th>
          <th v-if="kolom === 'tutorial'" scope="col">Tingkat</th>
          <th v-if="kolom !== 'status'" scope="col">Ringkasan</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="h in baris" :key="h.url">
          <td :data-label="kolom === 'sop' ? 'Prosedur' : kolom === 'tutorial' ? 'Tutorial' : 'Halaman'">
            <a :href="withBase(h.url)">{{ h.judul }}</a>
          </td>
          <td v-if="kolom === 'sop'" data-label="Nomor & versi">
            {{ h.nomorDokumen ?? 'Belum ada nomor resmi' }}<template v-if="h.versi"> · v{{ h.versi }}</template>
          </td>
          <td v-if="kolom === 'tutorial'" data-label="Tingkat">{{ h.tingkat ?? '—' }}</td>
          <td v-if="kolom !== 'status'" data-label="Ringkasan">{{ h.deskripsi }}</td>
          <td data-label="Status">
            <span class="status" :class="`nada-${nadaStatus(h.status)}`">{{ labelStatus(h.status) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.status {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 3px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}
.nada-waspada {
  background: var(--bpi-safety-pale);
  color: var(--bpi-safety-ink);
}
.nada-aman {
  background: var(--bpi-ok-pale);
  color: var(--bpi-ok);
}
.nada-info {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
