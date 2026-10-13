<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import dataSumber from '../../../data/sumber.json'
import { bukaPencarian } from '../utils'

const { frontmatter } = useData()

const kataKunci = computed<string[]>(() =>
  Array.isArray(frontmatter.value.kata_kunci) ? frontmatter.value.kata_kunci : []
)
const kategori = computed(() => frontmatter.value.kategori as string | undefined)

const sumber = computed(() => {
  const ids: string[] = Array.isArray(frontmatter.value.sumber) ? frontmatter.value.sumber : []
  return ids.map((id) => {
    const s = dataSumber.sumber.find((x) => x.id === id)
    return s ? { id, judul: s.judul, penerbit: s.penerbit } : { id, judul: id, penerbit: '(id sumber tidak ditemukan di sumber.json)' }
  })
})

const tampil = computed(() => kataKunci.value.length || sumber.value.length || kategori.value)
</script>

<template>
  <section v-if="tampil" class="info" aria-label="Informasi halaman">
    <div v-if="sumber.length" class="baris">
      <h2 class="judul">Sumber halaman ini</h2>
      <ul class="sumber">
        <li v-for="s in sumber" :key="s.id">
          <a :href="withBase('/referensi#' + s.id)">{{ s.judul }}</a>
          <span class="penerbit"> — {{ s.penerbit }}</span>
        </li>
      </ul>
    </div>
    <div v-if="kataKunci.length" class="baris">
      <h2 class="judul">Kata kunci</h2>
      <ul class="chip">
        <li v-for="k in kataKunci" :key="k">
          <button type="button" @click="bukaPencarian(k)" :aria-label="`Cari '${k}' di handbook`">{{ k }}</button>
        </li>
      </ul>
    </div>
    <p v-if="kategori" class="kategori">Kategori: {{ kategori }}</p>
  </section>
</template>

<style scoped>
.info {
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}
.baris + .baris {
  margin-top: 16px;
}
.judul {
  margin: 0 0 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border: 0;
  padding: 0;
  font-family: var(--vp-font-family-base);
}
.sumber {
  margin: 0;
  padding-left: 18px;
}
.sumber a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.penerbit {
  color: var(--vp-c-text-2);
}
.chip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chip button {
  min-height: 36px;
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
}
.chip button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.kategori {
  margin: 16px 0 0;
  color: var(--vp-c-text-2);
}
</style>
