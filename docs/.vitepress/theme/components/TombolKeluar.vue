<script setup lang="ts">
// Tombol "Keluar" di menu atas: menghapus sesi login tampilan dan mengunci website lagi.
defineProps<{ layar?: boolean }>()

function keluar() {
  try {
    localStorage.removeItem('bpi-sesi')
  } catch {}
  document.documentElement.classList.add('belum-masuk')
  window.scrollTo(0, 0)
  window.dispatchEvent(new Event('bpi-keluar'))
}
</script>

<template>
  <button type="button" class="keluar" :class="{ layar }" title="Keluar" @click="keluar">
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M16 17l5-5-5-5M21 12H9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span>Keluar</span>
  </button>
</template>

<style scoped>
.keluar {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 16px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: background 0.2s, border-color 0.2s;
}
.keluar:hover {
  border-color: var(--bpi-oranye);
  background: var(--bpi-oranye);
  color: var(--bpi-putih);
}
/* Di HP, tombol di header disembunyikan agar header tidak melebar keluar layar.
   Tombol Keluar tetap ada di dalam menu ☰ (versi "layar" di bawah). */
@media (max-width: 767px) {
  .keluar:not(.layar) {
    display: none;
  }
}
/* Versi di menu layar kecil (latar putih) */
.keluar.layar {
  margin: 24px 0 0;
  width: 100%;
  justify-content: center;
  padding: 10px 12px;
  border-color: var(--vp-c-divider);
  color: var(--bpi-navy);
}
</style>
