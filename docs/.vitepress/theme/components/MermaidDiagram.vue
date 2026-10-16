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
const kanvas = ref<HTMLElement | null>(null)
const layarSvg = ref<HTMLElement | null>(null)
const adaTautan = ref(false)
let urutan = 0

// Kotak flowchart ber-id L1, L2, ... (dan T2, T5, ... untuk cabang "Tidak")
// bisa diklik untuk melompat ke kartu langkah bergambar (#langkah-1, dst.) di halaman yang sama.
function lompatKe(nomor: string) {
  const el = document.getElementById(`langkah-${nomor}`)
  if (!el) return
  if (dialog.value?.open) dialog.value.close()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  el.classList.add('sorot')
  el.focus({ preventScroll: true })
  setTimeout(() => el.classList.remove('sorot'), 1800)
}

function pasangTautan(wadah: HTMLElement | null) {
  if (!wadah) return 0
  let n = 0
  wadah.querySelectorAll<SVGGElement>('g.node').forEach((node) => {
    const m = node.id.match(/-flowchart-[LT](\d+)-\d+$/)
    if (!m || !document.getElementById(`langkah-${m[1]}`)) return
    n++
    node.classList.add('bisa-klik')
    node.setAttribute('tabindex', '0')
    node.setAttribute('role', 'link')
    node.setAttribute('aria-label', `Lihat foto dan penjelasan langkah ${m[1]}`)
    node.onclick = () => lompatKe(m[1])
    node.onkeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        lompatKe(m[1])
      }
    }
  })
  return n
}

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
        primaryColor: warna('--bpi-steel-pale', isDark.value ? '#1b2a40' : '#e8ebe8'),
        primaryBorderColor: warna('--bpi-steel', '#415a77'),
        primaryTextColor: warna('--vp-c-text-1', '#1b263b'),
        lineColor: warna('--vp-c-text-2', '#4a5568'),
        background: warna('--vp-c-bg', '#fbf9f1'),
        edgeLabelBackground: warna('--vp-c-bg', '#fbf9f1'),
        clusterBkg: warna('--bpi-concrete', isDark.value ? '#112032' : '#f4f1de'),
        clusterBorder: warna('--bpi-rule', '#e4dcc8')
      }
    })
    const isi = /^\s*(flowchart|graph)\b/.test(kode.value) ? `${kode.value}\n${classDefMermaid(isDark.value)}` : kode.value
    const { svg: hasil } = await mermaid.render(`${uid}-${nomor}`, isi)
    if (nomor === urutan) {
      svg.value = hasil
      galat.value = ''
      await nextTick()
      adaTautan.value = pasangTautan(kanvas.value) > 0
      pasangTautan(layarSvg.value)
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
    <div v-if="svg" ref="kanvas" class="kanvas" v-html="svg" />
    <div v-else-if="galat" class="galat" role="alert">
      <p><strong>Flowchart tidak dapat ditampilkan.</strong> Periksa penulisan kode Mermaid di file Markdown.</p>
      <p class="pesan">{{ galat }}</p>
    </div>
    <div v-else class="memuat">Memuat flowchart…</div>

    <p v-if="svg && adaTautan" class="petunjuk">Ketuk kotak bernomor untuk melihat fotonya.</p>
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
        <div ref="layarSvg" class="layar-svg" v-html="svgBesar" />
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
.diagram :deep(g.node.bisa-klik) {
  cursor: pointer;
}
.diagram :deep(g.node.bisa-klik:hover) > :is(rect, path, polygon, circle, ellipse),
.diagram :deep(g.node.bisa-klik:focus-visible) > :is(rect, path, polygon, circle, ellipse) {
  stroke-width: 3px !important;
  filter: drop-shadow(0 2px 4px rgba(20, 40, 70, 0.25));
}
.diagram :deep(g.node.bisa-klik:focus) {
  outline: none;
}
.petunjuk {
  position: absolute;
  left: 16px;
  bottom: 20px;
  margin: 0;
  max-width: calc(100% - 220px);
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}
@media (max-width: 520px) {
  .petunjuk {
    position: static;
    max-width: none;
    padding: 0 16px 62px;
    margin-top: -48px;
  }
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
  background: rgba(13, 27, 42, 0.6);
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
