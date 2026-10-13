<script setup lang="ts">
// Tabel identitas SOP, dibaca dari frontmatter halaman:
// nomor_dokumen, versi, berlaku_sejak, pemilik, pengesah.
import { computed } from 'vue'
import { useData } from 'vitepress'
import { formatTanggal } from '../utils'

const { frontmatter: fm } = useData()

const baris = computed(() => {
  const disetujui = fm.value.status === 'disetujui'
  return [
    { label: 'Nomor dokumen', nilai: fm.value.nomor_dokumen || 'Belum ada (draf handbook)' },
    { label: 'Versi', nilai: fm.value.versi != null ? `${fm.value.versi}${disetujui ? '' : ' (draf)'}` : '—' },
    { label: 'Tanggal berlaku', nilai: formatTanggal(fm.value.berlaku_sejak) || 'Belum berlaku' },
    { label: 'Pemilik dokumen', nilai: fm.value.pemilik || 'Belum ditentukan' },
    { label: 'Pengesah', nilai: fm.value.pengesah || 'Belum ditentukan' }
  ]
})
</script>

<template>
  <dl class="identitas" aria-label="Identitas dokumen">
    <div v-for="b in baris" :key="b.label">
      <dt>{{ b.label }}</dt>
      <dd>{{ b.nilai }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.identitas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0;
  margin: 16px 0 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}
.identitas div {
  padding: 10px 14px;
  border-right: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  margin-right: -1px;
  margin-bottom: -1px;
}
dt {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
dd {
  margin: 2px 0 0;
  font-size: 0.95rem;
}
</style>
