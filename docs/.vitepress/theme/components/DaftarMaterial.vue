<script setup lang="ts">
// Kelompok material dari docs/data/material.json, ditampilkan seperti label rak.
import material from '../../../data/material.json'
</script>

<template>
  <ul class="rak">
    <li v-for="k in material.kelompok" :id="`material-${k.id}`" :key="k.id" class="label">
      <h3 class="nama">{{ k.nama }}</h3>
      <p class="arti">{{ k.arti }}</p>
      <p class="contoh"><span class="sr-only">Contoh: </span>{{ k.contoh.join(', ') }}</p>
    </li>
  </ul>
</template>

<style scoped>
.rak {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0;
  list-style: none;
  padding: 0 !important;
  margin: 24px 0;
  border-top: 2px solid var(--bpi-ink);
}
.label {
  margin: 0 !important;
  padding: 14px 16px 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.nama {
  margin: 0 !important;
  font-family: var(--bpi-font-display);
  font-size: 1.2rem !important;
  font-weight: 600;
  line-height: 1.3;
  color: var(--bpi-ink);
}
.arti {
  margin: 2px 0 6px !important;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.contoh {
  margin: 0 !important;
  font-size: 0.95rem;
  line-height: 1.5 !important;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
