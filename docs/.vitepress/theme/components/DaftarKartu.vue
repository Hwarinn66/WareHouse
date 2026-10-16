<script setup lang="ts">
// Daftar kartu tautan dengan ikon. Dipakai di Beranda dan halaman daftar.
// Pemakaian di Markdown:
//   <DaftarKartu :items="[{ judul: 'Barang Masuk', ket: 'Penjelasan singkat', link: '/alur-kerja/barang-masuk', ikon: 'masuk' }]" />
import { withBase } from 'vitepress'
import Ikon from './Ikon.vue'

defineProps<{ items: { judul: string; ket?: string; link: string; ikon?: string }[]; kolom?: 1 | 2 | 3 }>()
</script>

<template>
  <ul class="kartu" :class="kolom === 3 ? 'k3' : kolom === 1 ? 'k1' : 'k2'">
    <li v-for="it in items" :key="it.link">
      <a :href="withBase(it.link)">
        <span v-if="it.ikon" class="tile"><Ikon :nama="it.ikon" /></span>
        <span class="teks">
          <span class="judul">{{ it.judul }}</span>
          <span v-if="it.ket" class="ket">{{ it.ket }}</span>
        </span>
        <span class="panah"><Ikon nama="kanan" :ukuran="18" /></span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.kartu {
  list-style: none;
  padding: 0 !important;
  margin: 20px 0 !important;
  display: grid;
  gap: 12px;
}
.k1 {
  grid-template-columns: 1fr;
}
.k2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.k3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.kartu li {
  margin: 0 !important;
}
.kartu a {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 100%;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.kartu a:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--bpi-steel-pale);
}
.tile {
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: var(--bpi-oranye-pucat);
  color: var(--bpi-oranye);
}
.kartu a:hover .tile {
  background: var(--vp-c-bg);
}
.teks {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.judul {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.35;
  color: var(--bpi-ink);
}
.ket {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}
.panah {
  flex: none;
  color: var(--vp-c-text-3);
}
.kartu a:hover .panah {
  color: var(--vp-c-brand-1);
}
@media (max-width: 760px) {
  .k2,
  .k3 {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 761px) and (max-width: 1100px) {
  .k3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
