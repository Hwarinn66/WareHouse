<script setup lang="ts">
// Tombol bulat di pojok kanan bawah untuk kembali ke atas halaman.
// Muncul setelah pembaca menggulir cukup jauh.
import { onMounted, onUnmounted, ref } from 'vue'

const tampil = ref(false)

function cek() {
  tampil.value = window.scrollY > 600
}

function keAtas() {
  const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: kurangiGerak ? 'auto' : 'smooth' })
}

onMounted(() => {
  cek()
  window.addEventListener('scroll', cek, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', cek))
</script>

<template>
  <Transition name="muncul">
    <button v-if="tampil" type="button" class="ke-atas" aria-label="Kembali ke atas" title="Kembali ke atas" @click="keAtas">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.ke-atas {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 30;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: var(--bpi-putih);
  background: var(--bpi-navy);
  box-shadow: 0 6px 20px rgba(13, 27, 42, 0.25);
  transition: background 0.2s, transform 0.2s;
}
.ke-atas:hover {
  background: var(--bpi-oranye);
  transform: translateY(-2px);
}
.muncul-enter-active,
.muncul-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.muncul-enter-from,
.muncul-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
