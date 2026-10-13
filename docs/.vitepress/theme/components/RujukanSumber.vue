<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { infoSumber } from './profil'

const props = defineProps<{ ids: string[] }>()
const daftar = computed(() => props.ids.map(infoSumber).sort((a, b) => a.nomor - b.nomor))
</script>

<template>
  <span v-if="daftar.length" class="rujukan">
    <a
      v-for="s in daftar"
      :key="s.id"
      :href="withBase('/referensi#' + s.id)"
      :title="s.judul"
      :aria-label="`Sumber ${s.nomor}: ${s.judul}`"
      >[{{ s.nomor }}]</a
    >
  </span>
</template>

<style scoped>
.rujukan {
  display: inline-flex;
  gap: 2px;
  margin-left: 4px;
  font-size: 0.8em;
  vertical-align: 0.15em;
}
.rujukan a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-variant-numeric: tabular-nums;
  padding: 2px 1px;
}
.rujukan a:hover {
  text-decoration: underline;
}
</style>
