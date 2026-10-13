<script setup lang="ts">
// Kolom pencarian besar (dipakai di Beranda dan halaman 404).
// Membuka pencarian lokal bawaan VitePress; tidak memanggil server.
import { bukaPencarian } from '../utils'

defineProps<{ contoh?: string[] }>()
</script>

<template>
  <div class="cari">
    <button type="button" class="kolom" @click="bukaPencarian()" aria-label="Cari dokumentasi">
      <svg class="ikon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <span class="teks">Cari topik, istilah, atau nama barang</span>
      <kbd class="pintas">Ctrl K</kbd>
    </button>
    <p v-if="contoh?.length" class="contoh">
      <span>Coba cari:</span>
      <button v-for="c in contoh" :key="c" type="button" @click="bukaPencarian(c)">{{ c }}</button>
    </p>
  </div>
</template>

<style scoped>
.kolom {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 560px;
  min-height: 54px;
  padding: 10px 16px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 1rem;
  text-align: left;
  cursor: text;
}
.kolom:hover {
  border-color: var(--vp-c-brand-1);
}
.ikon {
  flex: none;
  color: var(--vp-c-text-2);
}
.teks {
  flex: 1;
}
.pintas {
  flex: none;
  font-family: var(--vp-font-family-base);
  font-size: 0.8rem;
  padding: 2px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
}
.contoh {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;
  margin: 10px 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.contoh button {
  min-height: 34px;
  padding: 2px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-weight: 500;
  cursor: pointer;
}
.contoh button:hover {
  background: var(--vp-c-brand-3);
  color: #fff;
}
@media (max-width: 480px) {
  .pintas {
    display: none;
  }
}
</style>
