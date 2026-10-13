<script setup lang="ts">
// FAQ dari docs/data/faq.json, ditampilkan sebagai tanya-jawab yang bisa dibuka-tutup.
// Pertanyaan berstatus selain 'terjawab' tidak ditampilkan sampai jawabannya diisi.
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import faq from '../../../data/faq.json'
import { markdownSederhana } from '../utils'

const kategori = faq.kategori
  .map((k) => ({ ...k, pertanyaan: k.pertanyaan.filter((q) => q.status === 'terjawab' && q.jawab?.trim()) }))
  .filter((k) => k.pertanyaan.length)

const jawabHtml = (teks: string) => markdownSederhana(teks, withBase)

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
  <div class="faq">
    <section v-for="k in kategori" :key="k.id" class="kategori">
      <h2 :id="k.id" tabindex="-1">
        {{ k.nama }}
        <a class="header-anchor" :href="`#${k.id}`" :aria-label="`Tautan langsung ke ${k.nama}`">&#8203;</a>
      </h2>
      <details v-for="q in k.pertanyaan" :id="q.id" :key="q.id" class="item">
        <summary>{{ q.tanya }}</summary>
        <div class="jawab">
          <p v-html="jawabHtml(q.jawab)" />
        </div>
      </details>
    </section>
  </div>
</template>

<style scoped>
.kategori h2 {
  margin-top: 36px;
}
.item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  margin: 10px 0;
  background: var(--vp-c-bg);
  scroll-margin-top: calc(var(--vp-nav-height) + 16px);
}
.item[open] {
  border-color: var(--vp-c-brand-1);
  background: var(--bpi-steel-pale);
}
summary {
  position: relative;
  min-height: 52px;
  padding: 14px 48px 14px 18px;
  cursor: pointer;
  list-style: none;
  font-weight: 600;
  line-height: 1.5;
}
summary::-webkit-details-marker {
  display: none;
}
summary::after {
  content: '+';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--bpi-steel-pale);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1;
}
.item[open] summary::after {
  content: '−';
  background: var(--vp-c-bg);
}
.jawab {
  padding: 0 18px 14px;
}
.jawab p {
  margin: 0;
}
</style>
