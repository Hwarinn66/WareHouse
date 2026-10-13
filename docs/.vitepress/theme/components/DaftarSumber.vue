<script setup lang="ts">
import dataSumber from '../../../data/sumber.json'
import { formatTanggal } from '../utils'

const daftar = dataSumber.sumber.map((s, i) => ({ ...s, nomor: i + 1 }))
</script>

<template>
  <ol class="sumber">
    <li v-for="s in daftar" :id="s.id" :key="s.id" tabindex="-1">
      <span class="nomor" aria-hidden="true">[{{ s.nomor }}]</span>
      <div class="isi">
        <p class="judul">
          <a v-if="s.url" :href="s.url" target="_blank" rel="noreferrer">{{ s.judul }}</a>
          <span v-else>{{ s.judul }}</span>
        </p>
        <p class="meta">
          {{ s.penerbit }}<template v-if="s.tanggalTerbit">, terbit {{ s.tanggalTerbit }}</template
          ><template v-if="s.tanggalAkses">. Diakses {{ formatTanggal(s.tanggalAkses) }}</template>.
          <span v-if="s.jenis === 'internal'" class="internal">Dokumen internal, tidak dipublikasikan.</span>
        </p>
        <p class="pakai">Dipakai untuk: {{ s.dipakaiUntuk }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.sumber {
  list-style: none;
  padding: 0 !important;
  margin: 24px 0;
}
.sumber li {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 8px;
  margin: 0 !important;
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}
.sumber li:target {
  background: var(--bpi-safety-pale);
  outline: none;
}
.nomor {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--vp-c-text-2);
  padding-left: 4px;
}
.isi p {
  margin: 0 !important;
}
.judul {
  font-weight: 600;
}
.meta,
.pakai {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 4px !important;
}
.internal {
  display: inline-block;
  margin-left: 4px;
  padding: 0 6px;
  border-radius: 3px;
  background: var(--bpi-safety-pale);
  color: var(--bpi-safety-ink);
  font-weight: 500;
}
</style>
