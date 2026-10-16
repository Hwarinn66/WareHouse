<script setup lang="ts">
// Baris kecil di atas judul: perkiraan waktu baca, tanggal diperbarui,
// dan tombol untuk memperkecil / memperbesar ukuran teks artikel.
// Pilihan ukuran teks disimpan di browser pembaca (localStorage).
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

// Pengali ukuran teks dasar (--bpi-teks), yang sendiri sudah menyesuaikan lebar layar.
const UKURAN = [0.92, 1, 1.1]
const KUNCI = 'bpi-ukuran-teks'
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const menit = ref(0)
const tingkat = ref(1)

const tanggal = computed(() => {
  const d = String(frontmatter.value.diperbarui ?? '')
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/)
  return m ? `${Number(m[3])} ${BULAN[Number(m[2]) - 1]} ${m[1]}` : ''
})

function hitungWaktuBaca() {
  const teks = document.querySelector('.vp-doc')?.textContent ?? ''
  const kata = teks.trim().split(/\s+/).filter(Boolean).length
  menit.value = Math.max(1, Math.round(kata / 180))
}

function terapkan() {
  document.documentElement.style.removeProperty('--bpi-teks')
  document.documentElement.style.setProperty('--bpi-skala', String(UKURAN[tingkat.value]))
}

function ubah(arah: number) {
  tingkat.value = Math.min(UKURAN.length - 1, Math.max(0, tingkat.value + arah))
  terapkan()
  try {
    localStorage.setItem(KUNCI, String(tingkat.value))
  } catch {}
}

onMounted(() => {
  try {
    const simpan = Number(localStorage.getItem(KUNCI))
    if (simpan >= 0 && simpan < UKURAN.length) tingkat.value = simpan
  } catch {}
  terapkan()
  nextTick(hitungWaktuBaca)
})

watch(
  () => route.path,
  () => nextTick(() => setTimeout(hitungWaktuBaca, 0))
)
</script>

<template>
  <div class="info-baca">
    <span v-if="menit" class="butir">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" />
        <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      ± {{ menit }} menit baca
    </span>
    <span v-if="tanggal" class="butir">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" />
        <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      Diperbarui {{ tanggal }}
    </span>
    <span class="ukuran" role="group" aria-label="Ukuran teks">
      <button type="button" :disabled="tingkat === 0" aria-label="Perkecil teks" title="Perkecil teks" @click="ubah(-1)">A−</button>
      <button type="button" :disabled="tingkat === UKURAN.length - 1" aria-label="Perbesar teks" title="Perbesar teks" @click="ubah(1)">A+</button>
    </span>
  </div>
</template>

<style scoped>
.info-baca {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  margin: 0 0 18px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.butir {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.butir svg {
  color: var(--bpi-oranye);
}
.ukuran {
  display: inline-flex;
  margin-left: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  overflow: hidden;
}
.ukuran button {
  min-width: 40px;
  padding: 3px 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  transition: background 0.2s, color 0.2s;
}
.ukuran button + button {
  border-left: 1px solid var(--vp-c-divider);
}
.ukuran button:hover:not(:disabled) {
  background: var(--bpi-concrete);
  color: var(--bpi-ink);
}
.ukuran button:disabled {
  opacity: 0.4;
  cursor: default;
}
@media (max-width: 480px) {
  .ukuran {
    margin-left: 0;
  }
}
</style>
