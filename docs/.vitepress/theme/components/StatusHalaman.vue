<script setup lang="ts">
// Catatan singkat di atas judul halaman.
// Hanya muncul jika:
//   - frontmatter punya 'catatan' (teks bebas), atau
//   (tulis 'catatan: false' untuk menyembunyikan catatan di halaman tertentu)
//   - status halaman 'draf' / 'perlu-verifikasi' (teks dari docs/data/status.json).
// Halaman berstatus 'ditinjau', 'disetujui', atau 'terverifikasi' tidak menampilkan apa-apa.
import { computed } from 'vue'
import { useData } from 'vitepress'
import daftarStatus from '../../../data/status.json'

const { frontmatter } = useData()

const teks = computed<string | null>(() => {
  if (frontmatter.value.catatan === false) return null
  if (frontmatter.value.catatan) return frontmatter.value.catatan
  const s = frontmatter.value.status as string | undefined
  if (s === 'draf' || s === 'perlu-verifikasi') return (daftarStatus as Record<string, any>)[s]?.keterangan ?? null
  return null
})
</script>

<template>
  <p v-if="teks" class="catatan" role="note">
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path d="M12 11v5M12 8h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <span>{{ teks }}</span>
  </p>
</template>

<style scoped>
.catatan {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 20px;
  padding: 8px 14px;
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.55;
}
svg {
  flex: none;
  margin-top: 2px;
}
</style>
