<script setup lang="ts">
// Flowchart bergambar: setiap kotak flowchart ditampilkan sebagai kartu
// bernomor dengan foto. Data dari docs/data/alur.json.
// Pemakaian: <LangkahAlur alur="barang-masuk" />
import { computed } from 'vue'
import alur from '../../../data/alur.json'
import { gayaAktor } from '../warnaAlur'
import FotoSlot from './FotoSlot.vue'

const props = defineProps<{ alur: 'barang-masuk' | 'barang-keluar' }>()

type Langkah = { aktor: string; judul: string; teks: string; cek?: { tanya: string; ya: string; tidak: string } }
const data = computed(() => (alur as any)[props.alur] as { selesai: string; langkah: Langkah[] })
const namaAktor = (a: string) => (alur.aktor as Record<string, string>)[a] ?? a
const nn = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <ol class="flow">
    <li
      v-for="(l, i) in data.langkah"
      :id="`langkah-${i + 1}`"
      :key="i"
      class="kotak"
      :class="{ cek: !!l.cek }"
      :style="gayaAktor(l.aktor)"
      tabindex="-1"
    >
      <FotoSlot :kunci="`${props.alur}-${nn(i)}`" :alt="`Langkah ${i + 1}: ${l.judul}`" />
      <div class="isi">
        <p class="atas">
          <span class="nomor" aria-hidden="true">{{ i + 1 }}</span>
          <strong class="judul"><span class="sr-only">Langkah {{ i + 1 }}: </span>{{ l.judul }}</strong>
        </p>
        <span class="aktor">{{ namaAktor(l.aktor) }}</span>
        <p class="teks">{{ l.teks }}</p>

        <div v-if="l.cek" class="periksa">
          <p class="tanya">
            <span class="ketupat" aria-hidden="true" />
            {{ l.cek.tanya }}
          </p>
          <div class="cabang">
            <div class="ya">
              <strong>Ya</strong>
              <span>{{ l.cek.ya }}</span>
            </div>
            <div class="tidak">
              <FotoSlot kecil :kunci="`${props.alur}-${nn(i)}-tidak`" :alt="`Langkah ${i + 1}, jika tidak: ${l.cek.tidak}`" />
              <div>
                <strong>Tidak</strong>
                <span>{{ l.cek.tidak }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="akhir">{{ data.selesai }}</li>
  </ol>
</template>

<style scoped>
.flow {
  list-style: none;
  margin: 20px 0 8px;
  padding: 0 !important;
}
.flow > li {
  margin: 0 !important;
  position: relative;
}
/* Panah penghubung antar kotak */
.flow > li:not(:last-child) {
  margin-bottom: 40px !important;
}
.flow > li:not(:last-child)::after {
  content: '';
  position: absolute;
  left: var(--panah-x, 50%);
  bottom: -34px;
  width: 2px;
  height: 26px;
  background: var(--vp-c-text-3);
  transform: translateX(-50%);
}
.flow > li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: var(--panah-x, 50%);
  bottom: -40px;
  border: 6px solid transparent;
  border-top: 8px solid var(--vp-c-text-3);
  border-bottom: 0;
  transform: translateX(-50%);
}

.kotak {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 18px;
  padding: 14px;
  border: 1.5px solid var(--garis);
  border-radius: 18px;
  background: var(--vp-c-bg);
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
  outline: none;
  transition: box-shadow 0.3s ease;
}
.kotak.sorot {
  box-shadow: 0 0 0 4px var(--bpi-safety);
}
.kotak.cek {
  border-width: 2px;
  border-color: color-mix(in srgb, var(--bpi-safety) 55%, var(--bpi-safety-ink));
}
.isi {
  min-width: 0;
}
.isi p {
  margin: 0 !important;
}
.atas {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nomor {
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  background: var(--isi);
  color: var(--teks);
  border: 2px solid var(--garis);
}
.judul {
  font-size: 1.08rem;
  line-height: 1.35;
  color: var(--bpi-ink);
}
.aktor {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 1px 10px;
  border-radius: 999px;
  background: var(--isi);
  color: var(--teks);
  border: 1px solid var(--garis);
}
.teks {
  margin-top: 8px !important;
  line-height: 1.6 !important;
}
.periksa {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--bpi-safety-pale);
}
.tanya {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: var(--bpi-safety-ink);
  line-height: 1.45 !important;
}
.ketupat {
  flex: none;
  width: 11px;
  height: 11px;
  transform: rotate(45deg);
  border: 2px solid currentColor;
}
.cabang {
  display: grid;
  gap: 8px;
  margin-top: 8px;
}
.ya,
.tidak {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 0.92rem;
  line-height: 1.45;
}
.ya strong,
.tidak strong {
  margin-right: 6px;
}
.ya {
  background: var(--bpi-ok-pale);
  color: var(--bpi-ok);
}
.tidak {
  background: var(--bpi-no-pale);
  color: var(--bpi-no);
}
.akhir {
  width: fit-content;
  margin: 0 auto !important;
  padding: 10px 22px;
  border-radius: 999px;
  background: var(--bpi-ink);
  color: var(--vp-c-bg);
  font-weight: 700;
  text-align: center;
}
:global(.dark) .flow .kotak {
  --isi: var(--isi-gelap);
  --garis: var(--garis-gelap);
  --teks: var(--teks-gelap);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Layar kecil: foto di atas, teks di bawah */
@media (max-width: 640px) {
  .kotak {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
}
</style>
