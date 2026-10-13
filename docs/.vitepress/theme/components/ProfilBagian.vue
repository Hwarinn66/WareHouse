<script setup lang="ts">
// Satu bagian profil perusahaan (mis. kegiatan usaha, nilai kerja).
// Data yang statusnya 'perlu-verifikasi' tidak ditampilkan sama sekali.
import { computed } from 'vue'
import { ambilField, bolehTampil } from './profil'

const props = defineProps<{ kunci: string; bentuk?: 'daftar' | 'label' }>()

const f = computed(() => ambilField(props.kunci))
const tampil = computed(() => bolehTampil(f.value))
const daftar = computed(() => (Array.isArray(f.value?.nilai) ? (f.value!.nilai as string[]) : []))
</script>

<template>
  <div v-if="f && tampil" class="bagian">
    <ul v-if="Array.isArray(f.nilai) && bentuk === 'label'" class="label-nilai">
      <li v-for="n in daftar" :key="n">{{ n }}</li>
    </ul>
    <ul v-else-if="Array.isArray(f.nilai)">
      <li v-for="n in daftar" :key="n">{{ n }}</li>
    </ul>
    <p v-else>{{ f.nilai }}</p>
    <p v-if="f.catatan" class="catatan">{{ f.catatan }}</p>
  </div>
</template>

<style scoped>
.bagian {
  margin: 12px 0 20px;
}
.catatan {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 6px !important;
}
.label-nilai {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 !important;
  list-style: none;
}
.label-nilai li {
  margin: 0 !important;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--bpi-steel-pale);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}
</style>
