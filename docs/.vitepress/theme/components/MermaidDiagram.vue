<script setup lang="ts">
// Merender blok ```mermaid di Markdown menjadi diagram SVG.
// Library mermaid dimuat dari paket lokal (node_modules), bukan dari CDN.
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ code: string }>()
const { isDark } = useData()

const kode = computed(() => decodeURIComponent(props.code))
const svg = ref('')
// Versi untuk layar perbesar: lebar asli diagram, bukan 100%.
const svgBesar = computed(() => {
  const m = svg.value.match(/max-width:\s*([\d.]+)px/)
  if (!m) return svg.value
  return svg.value.replace(/width="100%"/, `width="${m[1]}"`).replace(/max-width:\s*[\d.]+px;?/, '')
})
const galat = ref('')
const dialog = ref<HTMLDialogElement | null>(null)
const skala = ref(1)
let urutan = 0

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
      fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif',
      flowchart: { htmlLabels: true, curve: 'basis', useMaxWidth: true },
      themeVariables: {
        darkMode: isDark.value,
        fontSize: '15px',
        primaryColor: isDark.value ? '#1f2a36' : '#eef3f8',
        primaryBorderColor: warna('--bpi-steel', '#1b4b7a'),
        primaryTextColor: warna('--vp-c-text-1', '#1c2733'),
        lineColor: warna('--vp-c-text-2', '#555'),
        secondaryColor: isDark.value ? '#3a2f0c' : '#fdf3cf',
        tertiaryColor: isDark.value ? '#1a2129' : '#f3f5f7',
        background: warna('--vp-c-bg', '#ffffff'),
        edgeLabelBackground: warna('--vp-c-bg', '#ffffff'),
        clusterBkg: isDark.value ? '#1a2129' : '#f3f5f7',
        clusterBorder: warna('--bpi-rule', '#d6dde4')
      }
    })
    const { svg: hasil } = await mermaid.render(`${uid}-${nomor}`, kode.value)
    if (nomor === urutan) {
      svg.value = hasil
      galat.value = ''
    }
  } catch (e: any) {
    galat.value = e?.message ?? String(e)
  }
}

function perbesar() {
  skala.value = 1
  dialog.value?.showModal()
}
function tutup() {
  dialog.value?.close()
}
function ubahSkala(d: number) {
  skala.value = Math.min(3, Math.max(0.5, +(skala.value + d).toFixed(2)))
}

onMounted(render)
watch(isDark, () => nextTick(render))
</script>

<template>
  <figure class="diagram">
    <div v-if="svg" class="kanvas" v-html="svg" />
    <div v-else-if="galat" class="galat" role="alert">
      <p><strong>Diagram tidak dapat ditampilkan.</strong> Periksa penulisan kode Mermaid di file Markdown.</p>
      <p class="pesan">{{ galat }}</p>
      <pre><code>{{ kode }}</code></pre>
    </div>
    <div v-else class="memuat">Memuat diagram…</div>

    <div v-if="svg" class="aksi">
      <button type="button" @click="perbesar">Perbesar diagram</button>
    </div>

    <dialog ref="dialog" class="layar" aria-label="Diagram diperbesar" @click.self="tutup">
      <div class="layar-bar">
        <button type="button" @click="ubahSkala(-0.25)" aria-label="Perkecil">−</button>
        <span class="skala" aria-live="polite">{{ Math.round(skala * 100) }}%</span>
        <button type="button" @click="ubahSkala(0.25)" aria-label="Perbesar">+</button>
        <button type="button" class="tutup" @click="tutup">Tutup</button>
      </div>
      <div class="layar-isi">
        <div class="layar-svg" :style="{ zoom: skala }" v-html="svgBesar" />
      </div>
    </dialog>
  </figure>
</template>

<style scoped>
.diagram {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  overflow: hidden;
}
.kanvas {
  padding: 16px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
}
.kanvas :deep(svg) {
  height: auto;
  max-width: 100%;
}
.memuat {
  padding: 32px 16px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.galat {
  padding: 16px;
  font-size: 0.9rem;
}
.galat .pesan {
  color: var(--vp-c-danger-1);
}
.aksi {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}
button {
  min-height: 40px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}
button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.layar {
  width: min(1100px, 100vw);
  max-width: 100vw;
  height: min(90vh, 100dvh);
  max-height: 100dvh;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
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
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}
.layar-bar .skala {
  min-width: 48px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.layar-bar .tutup {
  margin-left: auto;
}
.layar-isi {
  flex: 1;
  overflow: auto;
  padding: 16px;
}
.layar-svg {
  width: max-content;
}
.layar-svg :deep(svg) {
  max-width: none !important;
  width: auto;
  height: auto;
}
</style>
