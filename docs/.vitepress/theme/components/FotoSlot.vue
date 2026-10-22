<script setup lang="ts">
// Tempat foto untuk satu kotak flowchart atau kartu kegiatan.
// Jika file docs/public/images/<folder>/<kunci>.jpg (atau .jpeg/.png/.webp) ada, fotonya tampil.
// Jika belum ada, yang tampil adalah placeholder berisi nama file yang diharapkan.
// folder: 'alur' (bawaan) untuk flowchart, 'kegiatan' untuk halaman Kegiatan Rutin.
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as fotoAlur } from '../fotoAlur.data'
import { data as fotoKegiatan } from '../fotoKegiatan.data'

const props = defineProps<{ kunci: string; alt: string; kecil?: boolean; folder?: 'alur' | 'kegiatan' }>()

const folder = computed(() => props.folder ?? 'alur')
const peta = computed(() => (folder.value === 'kegiatan' ? fotoKegiatan : fotoAlur))
const file = computed(() => peta.value[props.kunci.toLowerCase()] ?? null)
const src = computed(() => (file.value ? withBase(`/images/${folder.value}/${file.value}`) : null))
</script>

<template>
  <figure class="foto" :class="{ kecil }">
    <a v-if="src" :href="src" target="_blank" rel="noopener" :title="`Buka foto: ${alt}`">
      <img :src="src" :alt="alt" loading="lazy" decoding="async" />
    </a>
    <div v-else class="kosong" role="img" :aria-label="`Foto belum tersedia: ${alt}`">
      <svg viewBox="0 0 24 24" :width="kecil ? 22 : 30" :height="kecil ? 22 : 30" aria-hidden="true">
        <path
          d="M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
      </svg>
      <span class="teks">Foto belum ada</span>
      <code v-if="!kecil" class="nama">{{ kunci }}.jpg</code>
    </div>
  </figure>
</template>

<style scoped>
.foto {
  margin: 0;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}
.foto.kecil {
  width: 96px;
  flex: none;
  border-radius: 10px;
}
.foto a,
.foto img {
  display: block;
  width: 100%;
  height: 100%;
}
.foto img {
  object-fit: cover;
  border: 0 !important;
  border-radius: 0 !important;
}
.kosong {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border: 2px dashed var(--vp-c-divider);
  border-radius: inherit;
  color: var(--vp-c-text-3);
  text-align: center;
}
/* Ikon kamera tidak ikut mengecil walau nama file panjang */
.kosong svg {
  flex: none;
}
.teks {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.kecil .teks {
  font-size: 0.7rem;
  line-height: 1.2;
}
.nama {
  font-size: 0.72rem !important;
  padding: 1px 6px !important;
  border-radius: 6px;
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-2) !important;
  word-break: break-all;
}
</style>
