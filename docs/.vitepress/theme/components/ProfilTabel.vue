<script setup lang="ts">
// Ringkasan fakta perusahaan dari docs/data/company-profile.json.
// Hanya data yang sudah terverifikasi (atau dari dokumen internal) yang ditampilkan.
import { computed } from 'vue'
import { ambilField, bolehTampil } from './profil'

const props = defineProps<{ kunci: string[] }>()

const baris = computed(() =>
  props.kunci
    .map((k) => ({ k, f: ambilField(k) }))
    .filter((x) => x.f && bolehTampil(x.f))
    .map(({ k, f }) => ({ k, label: f!.label, nilai: Array.isArray(f!.nilai) ? f!.nilai.join(', ') : String(f!.nilai) }))
)
</script>

<template>
  <dl class="profil">
    <div v-for="b in baris" :key="b.k" class="baris">
      <dt>{{ b.label }}</dt>
      <dd>{{ b.nilai }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.profil {
  margin: 20px 0;
  padding: 8px 20px;
  border-radius: 16px;
  background: var(--vp-c-bg-alt);
}
.baris {
  display: grid;
  grid-template-columns: minmax(130px, 180px) 1fr;
  gap: 4px 20px;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.baris:last-child {
  border-bottom: 0;
}
dt {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
dd {
  margin: 0;
  font-weight: 500;
}
@media (max-width: 560px) {
  .baris {
    grid-template-columns: 1fr;
  }
}
</style>
