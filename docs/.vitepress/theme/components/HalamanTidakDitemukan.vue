<script setup lang="ts">
import { withBase } from 'vitepress'
import TombolCari from './TombolCari.vue'

const tujuan = [
  { judul: 'Beranda', link: '/' },
  { judul: 'Pengenalan Gudang Teknik', link: '/divisi/' },
  { judul: 'Alur kerja', link: '/alur-kerja/' },
  { judul: 'SOP & checklist', link: '/sop/' },
  { judul: 'FAQ', link: '/faq' }
]
</script>

<template>
  <main class="nf">
    <p class="kode">404</p>
    <h1>Halaman tidak ditemukan</h1>
    <p class="ket">
      Alamat yang dibuka tidak ada di handbook ini. Mungkin halamannya sudah dipindahkan, diganti namanya, atau tautannya
      salah ketik. Coba cari topiknya, atau buka salah satu halaman utama di bawah.
    </p>
    <TombolCari :contoh="['bearing', 'stock opname', 'SOP']" />
    <h2>Halaman utama</h2>
    <ul>
      <li v-for="t in tujuan" :key="t.link">
        <a :href="withBase(t.link)">{{ t.judul }}</a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.nf {
  max-width: 640px;
  margin: 0 auto;
  padding: 64px 24px 96px;
}
.kode {
  margin: 0;
  font-family: var(--bpi-font-display);
  font-weight: 700;
  font-size: 5rem;
  line-height: 1;
  color: var(--bpi-safety);
  -webkit-text-stroke: 1.5px var(--bpi-ink);
}
h1 {
  margin: 12px 0 0;
  font-family: var(--bpi-font-display);
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 1.1;
  color: var(--bpi-ink);
}
.ket {
  margin: 16px 0 28px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
h2 {
  margin: 40px 0 8px;
  font-size: 1.1rem;
  font-weight: 600;
}
ul {
  margin: 0;
  padding-left: 20px;
  line-height: 2;
}
a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
