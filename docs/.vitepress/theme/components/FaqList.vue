<script setup lang="ts">
// Menampilkan FAQ dari docs/data/faq.json sebagai accordion (<details>),
// yang bisa dibuka dengan keyboard (Enter/Spasi) maupun sentuhan.
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import faq from '../../../data/faq.json'
import { markdownSederhana } from '../utils'

const filter = ref<'semua' | 'terjawab' | 'menunggu-pembimbing'>('semua')
const akar = ref<HTMLElement | null>(null)

const kategori = computed(() =>
  faq.kategori
    .map((k) => ({
      ...k,
      pertanyaan: k.pertanyaan.filter((q) => filter.value === 'semua' || q.status === filter.value)
    }))
    .filter((k) => k.pertanyaan.length)
)

const jumlah = computed(() => {
  const semua = faq.kategori.flatMap((k) => k.pertanyaan)
  return {
    semua: semua.length,
    terjawab: semua.filter((q) => q.status === 'terjawab').length,
    menunggu: semua.filter((q) => q.status !== 'terjawab').length
  }
})

const jawabHtml = (teks: string) => markdownSederhana(teks, withBase)

function aturSemua(buka: boolean) {
  akar.value?.querySelectorAll('details').forEach((d) => (d.open = buka))
}

function bukaDariHash() {
  const id = decodeURIComponent(location.hash.slice(1))
  if (!id) return
  const el = document.getElementById(id)
  if (el instanceof HTMLDetailsElement) {
    el.open = true
    nextTick(() => el.scrollIntoView({ block: 'start' }))
  }
}

onMounted(() => {
  bukaDariHash()
  window.addEventListener('hashchange', bukaDariHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', bukaDariHash))
</script>

<template>
  <div ref="akar" class="faq">
    <div class="alat" role="group" aria-label="Saring dan atur FAQ">
      <div class="saring">
        <span id="label-saring" class="label">Tampilkan:</span>
        <div class="segmen" role="group" aria-labelledby="label-saring">
          <button type="button" :aria-pressed="filter === 'semua'" @click="filter = 'semua'">
            Semua ({{ jumlah.semua }})
          </button>
          <button type="button" :aria-pressed="filter === 'terjawab'" @click="filter = 'terjawab'">
            Terjawab ({{ jumlah.terjawab }})
          </button>
          <button
            type="button"
            
            :aria-pressed="filter === 'menunggu-pembimbing'"
            @click="filter = 'menunggu-pembimbing'"
          >
            Menunggu pembimbing ({{ jumlah.menunggu }})
          </button>
        </div>
      </div>
      <div class="buka-tutup">
        <button type="button" class="teks" @click="aturSemua(true)">Buka semua</button>
        <button type="button" class="teks" @click="aturSemua(false)">Tutup semua</button>
      </div>
    </div>

    <section v-for="k in kategori" :key="k.id" class="kategori">
      <h2 :id="k.id" tabindex="-1">
        {{ k.nama }}
        <a class="header-anchor" :href="`#${k.id}`" :aria-label="`Tautan langsung ke ${k.nama}`">&#8203;</a>
      </h2>
      <details v-for="q in k.pertanyaan" :id="q.id" :key="q.id" class="item">
        <summary>
          <span class="tanya">{{ q.tanya }}</span>
          <span v-if="q.status !== 'terjawab'" class="menunggu">Menunggu jawaban pembimbing</span>
        </summary>
        <div class="jawab">
          <p v-if="q.jawab && q.jawab.trim()" v-html="jawabHtml(q.jawab)" />
          <p v-else class="kosong">
            Jawaban resmi belum tersedia. Sementara itu, tanyakan langsung kepada pembimbing magang.
          </p>
          <p class="tautan"><a :href="`#${q.id}`">Tautan ke pertanyaan ini</a></p>
        </div>
      </details>
    </section>

    <p v-if="!kategori.length" class="kosong">Tidak ada pertanyaan dengan status ini.</p>
  </div>
</template>

<style scoped>
.alat {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 24px 0 8px;
}
.saring {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.segmen {
  display: inline-flex;
  flex-wrap: wrap;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
}
.segmen button {
  min-height: 40px;
  padding: 6px 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
}
.segmen button:last-child {
  border-right: 0;
}
.segmen button[aria-pressed='true'] {
  background: var(--vp-c-brand-3);
  color: #fff;
}
.buka-tutup {
  display: flex;
  gap: 4px;
}
button.teks {
  min-height: 40px;
  padding: 6px 10px;
  color: var(--vp-c-brand-1);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.kategori h2 {
  margin-top: 40px;
}
.item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  margin: 10px 0;
  background: var(--vp-c-bg);
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}
.item[open] {
  border-color: var(--vp-c-brand-1);
}
summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-height: 48px;
  padding: 12px 44px 12px 16px;
  position: relative;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  line-height: 1.45;
}
summary::-webkit-details-marker {
  display: none;
}
summary::after {
  content: '';
  position: absolute;
  right: 18px;
  top: 50%;
  width: 9px;
  height: 9px;
  border-right: 2px solid var(--vp-c-text-2);
  border-bottom: 2px solid var(--vp-c-text-2);
  transform: translateY(-70%) rotate(45deg);
  transition: transform 0.15s ease;
}
.item[open] summary::after {
  transform: translateY(-30%) rotate(-135deg);
}
.menunggu {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 3px;
  background: var(--bpi-safety-pale);
  color: var(--bpi-safety-ink);
}
.jawab {
  padding: 0 16px 12px;
  border-top: 1px solid var(--vp-c-divider);
}
.jawab p {
  margin: 12px 0;
}
.kosong {
  color: var(--vp-c-text-2);
}
.tautan {
  font-size: 0.85rem;
}
.tautan a {
  color: var(--vp-c-text-2);
}
</style>
