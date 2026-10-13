<script setup lang="ts">
// Merender blok ```mermaid di Markdown menjadi flowchart SVG.
// Library mermaid dimuat dari paket lokal (node_modules), bukan dari CDN.
// Kelas warna aktor (:::vendor, :::staff, :::sistem, :::divisi, :::dokumen,
// :::cek, :::tolak, :::selesai) ditambahkan otomatis dari warnaAlur.ts.
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import { classDefMermaid } from '../warnaAlur'

const props = defineProps<{ code: string }>()
const { isDark } = useData()

const kode = computed(() => decodeURIComponent(props.code))
const svg = ref('')
const galat = ref('')
const dialog = ref<HTMLDialogElement | null>(null)
let urutan = 0

// Versi untuk layar perbesar: lebar asli diagram, bukan menyesuaikan layar.
const svgBesar = computed(() => {
  const m = svg.value.match(/max-width:\s*([\d.]+)px/)
  if (!m) return svg.value
  const lebar = Math.round(parseFloat(m[1]) * 1.15)
  return svg.value.replace(/width="100%"/, `width="${lebar}"`).replace(/max-width:\s*[\d.]+px;?/, '')
})

const uid = `diagram-${Math.random().toString(36).slice(2, 9)}`

function warna(nama: string, cadangan: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(nama).trim()
  return v || cadangan
}

async function render() {
  const nomor = ++urutan
  try {
    const { default: mermaid } = await import('mermaid')
    // Tunggu font selesai dimuat agar ukuran label dihitung dengan font yang benar.
    if (document.fonts?.ready) await document.fonts.ready
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
      flowchart: { htmlLabels: true, curve: 'basis', useMaxWidth: true, padding: 14, nodeSpacing: 36, rankSpacing: 42, wrappingWidth: 190 },
      themeVariables: {
        darkMode: isDark.value,
        fontSize: '14px',
        primaryColor: isDark.value ? '#1f2a36' : '#eef3f8',
        primaryBorderColor: warna('--bpi-steel', '#1f5fa8'),
        primaryTextColor: warna('--vp-c-text-1', '#1f2d3b'),
        lineColor: warna('--vp-c-text-2', '#555'),
        background: warna('--vp-c-bg', '#ffffff'),
        edgeLabelBackground: warna('--vp-c-bg', '#ffffff'),
        clusterBkg: isDark.value ? '#19212a' : '#f4f7fb',
        clusterBorder: warna('--bpi-rule', '#dde4ec')
      }
    })
    const isi = /^\s*(flowchart|graph)\b/.test(kode.value) ? `${kode.value}\n${classDefMermaid(isDark.value)}` : kode.value
    const { svg: hasil } = await mermaid.render(`${uid}-${nomor}`, isi)
    if (nomor === urutan) {
      svg.value = hasil
      galat.value = ''
    }
  } catch (e: any) {
    galat.value = e?.message ?? String(e)
  }
}

function perbesar() {
  dialog.value?.showModal()
}
function tutup() {
  dialog.value?.close()
}

onMounted(render)
watch(isDark, () => nextTick(render))
</script>

<template>
  <figure class="diagram">
    <div v-if="svg" class="kanvas" v-html="svg" />
    <div v-else-if="galat" class="galat" role="alert">
      <p><strong>Flowchart tidak dapat ditampilkan.</strong> Periksa penulisan kode Mermaid di file Markdown.</p>
      <p class="pesan">{{ galat }}</p>
    </div>
    <div v-else class="memuat">Memuat flowchart…</div>

    <button v-if="svg" type="button" class="tombol-besar" @click="perbesar">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Lihat ukuran besar
    </button>

    <dialog ref="dialog" class="layar" aria-label="Flowchart ukuran besar" @click.self="tutup">
      <div class="layar-bar">
        <span>Geser untuk melihat seluruh flowchart</span>
        <button type="button" class="tutup" @click="tutup">Tutup</button>
      </div>
      <div class="layar-isi">
        <div class="layar-svg" v-html="svgBesar" />
      </div>
    </dialog>
  </figure>
</template>

<style scoped>
.diagram {
  position: relative;
  margin: 20px 0 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  overflow: hidden;
}
.kanvas {
  padding: 20px 16px 64px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
}
.kanvas :deep(svg) {
  height: auto;
  max-width: 100%;
}
.memuat {
  padding: 40px 16px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
.galat {
  padding: 16px;
  font-size: 0.9rem;
}
.galat .pesan {
  color: var(--vp-c-danger-1);
}
.tombol-besar {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(20, 40, 70, 0.08);
}
.tombol-besar:hover {
  border-color: var(--vp-c-brand-1);
}
.layar {
  width: min(1200px, 100vw);
  max-width: 100vw;
  height: min(92vh, 100dvh);
  max-height: 100dvh;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.layar::backdrop {
  background: rgba(10, 16, 24, 0.6);
}
.layar[open] {
  display: flex;
  flex-direction: column;
}
.layar-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.tutup {
  margin-left: auto;
  min-height: 40px;
  padding: 6px 18px;
  border-radius: 999px;
  background: var(--vp-c-brand-3);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.layar-isi {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
.layar-svg {
  width: max-content;
  margin: 0 auto;
}
.layar-svg :deep(svg) {
  max-width: none !important;
  height: auto;
}
</style>
