<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import daftarStatus from '../../../data/status.json'
import { formatTanggal } from '../utils'

type Status = { label: string; nada: string; keterangan: string }

const { frontmatter } = useData()

const status = computed<(Status & { kunci: string }) | null>(() => {
  const kunci = frontmatter.value.status as string | undefined
  if (!kunci) return null
  const s = (daftarStatus as Record<string, any>)[kunci]
  if (!s || kunci.startsWith('_')) {
    return { kunci, label: kunci, nada: 'waspada', keterangan: 'Status tidak dikenal. Periksa nilai "status" di frontmatter.' }
  }
  return { kunci, ...(s as Status) }
})

const keterangan = computed(() => frontmatter.value.catatan_status || status.value?.keterangan)
const dasar = computed(() => frontmatter.value.dasar as string | undefined)
const tanggal = computed(() => formatTanggal(frontmatter.value.diperbarui))
</script>

<template>
  <aside v-if="status" class="status" :class="`nada-${status.nada}`" aria-label="Status dokumen">
    <span class="tag"><span class="lubang" aria-hidden="true" />{{ status.label }}</span>
    <p class="teks">
      <span v-if="dasar">Disusun dari {{ dasar }}. </span>{{ keterangan }}
      <span v-if="tanggal" class="tanggal">Diperbarui {{ tanggal }}.</span>
    </p>
  </aside>
</template>

<style scoped>
.status {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin: 0 0 24px;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
}
.tag {
  /* Bentuk label barang gudang: ujung kiri bertakik dengan lubang tali. */
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 12px 3px 10px;
  font-family: var(--bpi-font-display);
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.4;
  border-radius: 3px 4px 4px 3px;
  clip-path: polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%);
  padding-left: 16px;
}
.lubang {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-bg-alt);
  box-shadow: inset 0 0 0 1.5px rgba(0, 0, 0, 0.25);
}
.teks {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.55;
  color: var(--vp-c-text-1);
}
.tanggal {
  color: var(--vp-c-text-2);
}
.nada-waspada {
  border-color: color-mix(in srgb, var(--bpi-safety) 55%, var(--vp-c-divider));
  background: var(--bpi-safety-pale);
}
.nada-waspada .tag {
  background: var(--bpi-safety);
  color: #2b2100;
}
.nada-waspada .lubang {
  background: var(--bpi-safety-pale);
}
.nada-aman .tag {
  background: var(--bpi-ok-pale);
  color: var(--bpi-ok);
  box-shadow: inset 0 0 0 1px currentColor;
}
.nada-info .tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
@media (max-width: 480px) {
  .status {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
