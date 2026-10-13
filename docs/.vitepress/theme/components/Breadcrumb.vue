<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import navigasi from '../../../data/navigasi.json'
import { pathKeTautan } from '../utils'

interface Item {
  text: string
  link?: string
  items?: Item[]
}

const { page, frontmatter } = useData()

const remah = computed(() => {
  if (frontmatter.value.breadcrumb === false) return []
  const sekarang = pathKeTautan(page.value.relativePath)
  if (sekarang === '/') return []

  for (const grup of navigasi.sidebar as Item[]) {
    const items = grup.items ?? []
    const idx = items.findIndex((it) => it.link === sekarang)
    if (idx === -1) continue
    const induk = items[0]?.link
    const hasil: { text: string; link?: string }[] = [{ text: 'Beranda', link: '/' }]
    if (idx === 0 || !induk || induk === '/') {
      hasil.push({ text: items[idx].text })
    } else {
      hasil.push({ text: grup.text, link: induk })
      hasil.push({ text: items[idx].text })
    }
    return hasil
  }
  // Halaman di luar sidebar
  return [{ text: 'Beranda', link: '/' }, { text: page.value.title }]
})
</script>

<template>
  <nav v-if="remah.length" class="remah" aria-label="Breadcrumb">
    <ol>
      <li v-for="(r, i) in remah" :key="i">
        <a v-if="r.link && i < remah.length - 1" :href="withBase(r.link)">{{ r.text }}</a>
        <span v-else aria-current="page">{{ r.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.remah ol {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.remah li {
  display: inline-flex;
  align-items: center;
}
.remah li + li::before {
  content: '/';
  margin: 0 8px;
  color: var(--vp-c-text-3);
}
.remah a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-decoration-color: var(--vp-c-divider);
  text-underline-offset: 3px;
  padding: 4px 0;
}
.remah a:hover {
  color: var(--vp-c-brand-1);
  text-decoration-color: currentColor;
}
.remah [aria-current] {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
</style>
