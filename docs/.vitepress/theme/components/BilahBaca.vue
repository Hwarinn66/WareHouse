<script setup lang="ts">
// Bilah tipis di paling atas layar yang menunjukkan seberapa jauh halaman sudah dibaca.
// Hanya tampil di halaman dokumen (bukan beranda).
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const tampil = computed(() => !frontmatter.value.layout || frontmatter.value.layout === 'doc')
const persen = ref(0)

function hitung() {
  const el = document.documentElement
  const sisa = el.scrollHeight - el.clientHeight
  persen.value = sisa > 0 ? Math.min(100, (el.scrollTop / sisa) * 100) : 0
}

onMounted(() => {
  hitung()
  window.addEventListener('scroll', hitung, { passive: true })
  window.addEventListener('resize', hitung, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', hitung)
  window.removeEventListener('resize', hitung)
})
</script>

<template>
  <div v-if="tampil" class="bilah" aria-hidden="true">
    <div class="isi" :style="{ transform: `scaleX(${persen / 100})` }" />
  </div>
</template>

<style scoped>
.bilah {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3px;
  z-index: 100;
  pointer-events: none;
}
.isi {
  height: 100%;
  transform-origin: 0 50%;
  background: var(--bpi-oranye);
  transition: transform 0.1s linear;
}
</style>
