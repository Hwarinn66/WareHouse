<script setup lang="ts">
// Daftar langkah alur kerja (versi tulisan dari flowchart).
// Data dari docs/data/alur.json. Pemakaian: <LangkahAlur alur="barang-masuk" />
import { computed } from 'vue'
import alur from '../../../data/alur.json'
import { gayaAktor } from '../warnaAlur'

const props = defineProps<{ alur: 'barang-masuk' | 'barang-keluar' }>()

type Langkah = { aktor: string; judul: string; teks: string; cek?: { tanya: string; ya: string; tidak: string } }
const langkah = computed(() => (alur as any)[props.alur] as Langkah[])
const namaAktor = (a: string) => (alur.aktor as Record<string, string>)[a] ?? a
</script>

<template>
  <ol class="langkah">
    <li v-for="(l, i) in langkah" :key="i" :style="gayaAktor(l.aktor)">
      <span class="nomor" aria-hidden="true">{{ i + 1 }}</span>
      <div class="isi">
        <p class="atas">
          <strong class="judul">{{ l.judul }}</strong>
          <span class="aktor">{{ namaAktor(l.aktor) }}</span>
        </p>
        <p class="teks">{{ l.teks }}</p>
        <div v-if="l.cek" class="cek">
          <p class="tanya">{{ l.cek.tanya }}</p>
          <div class="jawab">
            <p class="ya"><strong>Ya:</strong> {{ l.cek.ya }}</p>
            <p class="tidak"><strong>Tidak:</strong> {{ l.cek.tidak }}</p>
          </div>
        </div>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.langkah {
  list-style: none;
  margin: 20px 0 8px;
  padding: 0 !important;
  position: relative;
}
.langkah li {
  position: relative;
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 14px;
  margin: 0 !important;
  padding-bottom: 14px;
}
/* garis penghubung antarlangkah */
.langkah li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 40px;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
}
.nomor {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 1rem;
  background: var(--isi);
  color: var(--teks);
  border: 2px solid var(--garis);
  position: relative;
  z-index: 1;
}
.isi {
  padding: 10px 16px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
}
.isi p {
  margin: 0 !important;
}
.atas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
}
.judul {
  font-size: 1.02rem;
  color: var(--bpi-ink);
}
.aktor {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 1px 10px;
  border-radius: 999px;
  background: var(--isi);
  color: var(--teks);
  border: 1px solid var(--garis);
}
.teks {
  margin-top: 4px !important;
  color: var(--vp-c-text-1);
  line-height: 1.6 !important;
}
.cek {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--bpi-safety-pale);
}
.tanya {
  font-weight: 700;
  color: var(--bpi-safety-ink);
  line-height: 1.5 !important;
}
.jawab {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}
.jawab p {
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 0.92rem;
  line-height: 1.5 !important;
}
.ya {
  background: var(--bpi-ok-pale);
  color: var(--bpi-ok);
}
.tidak {
  background: var(--bpi-no-pale);
  color: var(--bpi-no);
}
:global(.dark) .langkah li {
  --isi: var(--isi-gelap);
  --garis: var(--garis-gelap);
  --teks: var(--teks-gelap);
}
@media (max-width: 520px) {
  .jawab {
    grid-template-columns: 1fr;
  }
  .langkah li {
    grid-template-columns: 32px 1fr;
    gap: 10px;
  }
  .nomor {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
  .langkah li:not(:last-child)::before {
    left: 15px;
    top: 32px;
  }
}
</style>
