<script setup lang="ts">
// Tabel fakta singkat perusahaan. Field yang belum terverifikasi
// tidak ditampilkan sebagai fakta; diganti keterangan "sedang dikonfirmasi".
import { computed } from 'vue'
import { ambilField, bolehTampil } from './profil'
import RujukanSumber from './RujukanSumber.vue'

const props = defineProps<{ kunci: string[] }>()

const baris = computed(() =>
  props.kunci
    .map((k) => ({ k, f: ambilField(k) }))
    .filter((x) => x.f)
    .map(({ k, f }) => ({ k, f: f!, tampil: bolehTampil(f) }))
)
</script>

<template>
  <dl class="profil">
    <div v-for="b in baris" :key="b.k" class="baris">
      <dt>{{ b.f.label }}</dt>
      <dd v-if="b.tampil">
        <template v-if="Array.isArray(b.f.nilai)">{{ b.f.nilai.join(', ') }}</template>
        <template v-else>{{ b.f.nilai }}</template>
        <RujukanSumber :ids="b.f.sumber" />
        <span v-if="b.f.status === 'dokumen-internal'" class="catatan">Dari dokumen internal.</span>
      </dd>
      <dd v-else class="belum">Sedang dikonfirmasi ke pembimbing</dd>
    </div>
  </dl>
</template>

<style scoped>
.profil {
  margin: 24px 0;
  border-top: 2px solid var(--bpi-ink);
}
.baris {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  gap: 4px 20px;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
dt {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
dd {
  margin: 0;
}
.belum {
  color: var(--vp-c-text-2);
  font-style: italic;
}
.catatan {
  display: block;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
@media (max-width: 560px) {
  .baris {
    grid-template-columns: 1fr;
  }
}
</style>
