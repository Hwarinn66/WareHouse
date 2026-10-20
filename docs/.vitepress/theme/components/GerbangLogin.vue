<script setup lang="ts">
// Halaman login tampilan (tanpa back end).
// Skrip kecil di <head> (lihat config.mts) menambahkan class "belum-masuk" pada <html>
// sebelum halaman tampil jika belum ada sesi yang sah. Selama class itu ada,
// isi website disembunyikan dan halaman ini yang tampil.
// Akun diatur dengan "npm run atur-login" (docs/data/login.json).
// Ingat: ini hanya pengunci tampilan, bukan pengaman data.
//
// Transisi setelah login (lihat transisiMasuk):
//   1. panel navy melebar menutup layar, formulir memudar,
//   2. isi website dibuka di balik panel (event "bpi-tampil"),
//   3. panel menyusut tepat ke kotak sambutan beranda (atau ke header di halaman lain),
//   4. panel memudar dan animasi beranda dimulai (event "bpi-masuk").
import { onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'
import dataLogin from '../../../data/login.json'

const KUNCI = 'bpi-sesi'

const nama = ref('')
const sandi = ref('')
const lihatSandi = ref(false)
const galat = ref('')
const proses = ref(false)
const inputNama = ref<HTMLInputElement | null>(null)
const akar = ref<HTMLElement | null>(null)
const merek = ref<HTMLElement | null>(null)
const merekIsi = ref<HTMLElement | null>(null)
const lapisPolos = ref<HTMLElement | null>(null)
const bagianForm = ref<HTMLElement | null>(null)

const umumkan = (nama: string) => window.dispatchEvent(new Event(nama))
const duaBingkai = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))
const px = (n: number) => `${Math.round(n)}px`

async function transisiMasuk() {
  const html = document.documentElement
  const g = akar.value
  const m = merek.value
  const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!g || !m || !m.animate || kurangiGerak) {
    html.classList.remove('belum-masuk')
    umumkan('bpi-tampil')
    umumkan('bpi-masuk')
    return
  }

  const animasi: Animation[] = []
  const jalan = (el: Element | null, frames: Keyframe[], opsi: KeyframeAnimationOptions) => {
    if (!el) return Promise.resolve()
    const a = el.animate(frames, { fill: 'forwards', ...opsi })
    animasi.push(a)
    return a.finished.then(() => undefined)
  }

  // 1. Panel melebar menutup seluruh layar, formulir memudar.
  const r = m.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  g.classList.add('transisi')
  Object.assign(m.style, { position: 'fixed', left: px(r.left), top: px(r.top), width: px(r.width), height: px(r.height), zIndex: '2', overflow: 'hidden' })
  jalan(bagianForm.value, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(40px)' }], { duration: 380, easing: 'cubic-bezier(0.4, 0, 1, 1)' })
  await jalan(
    m,
    [
      { left: px(r.left), top: px(r.top), width: px(r.width), height: px(r.height) },
      { left: '0px', top: '0px', width: px(vw), height: px(vh) }
    ],
    { duration: 720, easing: 'cubic-bezier(0.7, 0, 0.2, 1)' }
  )

  // 2. Isi panel memudar, lalu isi website dibuka di balik panel.
  await jalan(merekIsi.value, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-16px)' }], { duration: 260, easing: 'ease-in' })
  g.classList.add('lepas')
  html.classList.remove('belum-masuk')
  window.scrollTo(0, 0)
  umumkan('bpi-tampil')
  await duaBingkai()

  // 3. Panel menyusut ke kotak sambutan beranda, atau ke header di halaman lain.
  const sasaran = document.querySelector<HTMLElement>('.beranda .sambut') ?? document.querySelector<HTMLElement>('.VPNav')
  const t = sasaran ? sasaran.getBoundingClientRect() : { left: 0, top: 0, width: vw, height: 64 }
  const sudut = sasaran ? getComputedStyle(sasaran).borderTopLeftRadius : '0px'
  jalan(lapisPolos.value, [{ opacity: 0 }, { opacity: 1 }], { duration: 520, easing: 'ease-out' })
  await jalan(
    m,
    [
      { left: '0px', top: '0px', width: px(vw), height: px(vh), borderRadius: '0px' },
      { left: px(t.left), top: px(t.top), width: px(t.width), height: px(t.height), borderRadius: sudut }
    ],
    { duration: 820, easing: 'cubic-bezier(0.65, 0, 0.25, 1)' }
  )

  // 4. Panel memudar, animasi beranda dimulai bersamaan.
  umumkan('bpi-masuk')
  await jalan(g, [{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: 'ease-out' })

  // Bersihkan, agar halaman login siap dipakai lagi setelah keluar.
  g.classList.remove('transisi', 'lepas')
  m.removeAttribute('style')
  m.style.setProperty('--foto', `url(${withBase('/images/beranda/gudang-dalam.jpg')})`)
  animasi.forEach((a) => a.cancel())
}

async function hashSandi(teks: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(teks))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function masuk() {
  galat.value = ''
  const u = nama.value.trim().toLowerCase()
  if (!u || !sandi.value) {
    galat.value = 'Isi nama pengguna dan kata sandi.'
    return
  }
  if (!globalThis.crypto?.subtle) {
    galat.value = 'Browser ini tidak bisa memproses login. Buka website lewat alamat https.'
    return
  }
  proses.value = true
  try {
    const h = await hashSandi(`${dataLogin.garam}:${u}:${sandi.value}`)
    const cocok = dataLogin.akun.some((a) => a.username === u && a.hash === h)
    if (!cocok) {
      // jeda singkat agar tebakan beruntun terasa lambat
      await new Promise((r) => setTimeout(r, 600))
      galat.value = 'Nama pengguna atau kata sandi salah.'
      sandi.value = ''
      return
    }
    try {
      const k = (window as any).__bpiSesi ?? ''
      localStorage.setItem(KUNCI, JSON.stringify({ u, k, exp: Date.now() + dataLogin.ingatHari * 864e5 }))
    } catch {}
    sandi.value = ''
    lihatSandi.value = false
    await transisiMasuk()
  } finally {
    proses.value = false
  }
}

function fokus() {
  if (document.documentElement.classList.contains('belum-masuk')) inputNama.value?.focus()
}
function saatKeluar() {
  nama.value = ''
  sandi.value = ''
  galat.value = ''
  setTimeout(fokus, 50)
}

onMounted(() => {
  fokus()
  window.addEventListener('bpi-keluar', saatKeluar)
})
onUnmounted(() => window.removeEventListener('bpi-keluar', saatKeluar))
</script>

<template>
  <div ref="akar" class="gerbang">
    <section ref="merek" class="merek" :style="{ '--foto': `url(${withBase('/images/beranda/gudang-dalam.jpg')})` }">
      <span ref="lapisPolos" class="lapis-polos" aria-hidden="true" />
      <div ref="merekIsi" class="merek-isi">
        <img class="logo" :src="withBase('/images/logo-perusahaan.png')" alt="" width="42" height="52" />
        <p class="nama-situs">Handbook<br /><span>Gudang Teknik</span></p>
        <p class="perusahaan">PT Bakrie Pipe Industries</p>
        <p class="moto">“A place for everything and everything in its place.”</p>
      </div>
    </section>

    <section ref="bagianForm" class="isi">
      <form class="kartu" novalidate @submit.prevent="masuk">
        <p class="eyebrow">Masuk</p>
        <p class="judul">Selamat datang</p>
        <p class="ket">Handbook ini khusus untuk peserta magang dan PKL Gudang Teknik. Masuk dengan akun dari pembimbing magang.</p>

        <label class="label" for="login-nama">Nama pengguna</label>
        <input
          id="login-nama"
          ref="inputNama"
          v-model="nama"
          class="input"
          type="text"
          autocomplete="username"
          autocapitalize="none"
          spellcheck="false"
          required
        />

        <label class="label" for="login-sandi">Kata sandi</label>
        <div class="sandi">
          <input
            id="login-sandi"
            v-model="sandi"
            class="input"
            :type="lihatSandi ? 'text' : 'password'"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            class="lihat"
            :aria-label="lihatSandi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
            :aria-pressed="lihatSandi"
            @click="lihatSandi = !lihatSandi"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.8" />
              <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path v-if="lihatSandi" d="M4 4l16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <p v-if="galat" class="galat" role="alert">{{ galat }}</p>

        <button type="submit" class="tombol" :disabled="proses">
          {{ proses ? 'Memeriksa…' : 'Masuk' }}
        </button>

        <p class="kecil">Belum punya akun atau lupa kata sandi? Tanyakan ke pembimbing magang.</p>
      </form>
    </section>
  </div>
</template>

<style scoped>
/* Catatan: di Vue, :global(...) harus membungkus seluruh selektor. */
.gerbang {
  display: none;
}
:global(html.belum-masuk .gerbang),
.gerbang.transisi {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  overflow-y: auto;
  background: var(--bpi-putih);
}

/* Panel kiri: identitas */
.merek {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 56px;
  color: var(--bpi-putih);
  background:
    linear-gradient(160deg, rgba(30, 53, 100, 0.92) 0%, rgba(20, 38, 71, 0.96) 100%),
    var(--foto) center / cover no-repeat,
    var(--bpi-navy);
}
/* Selama transisi: tetap tampil walau class "belum-masuk" sudah dilepas */
.gerbang.transisi {
  overflow: hidden;
}
.gerbang.transisi.lepas {
  background: transparent;
  pointer-events: none;
}
/* Lapisan yang menyamakan warna panel dengan kotak sambutan beranda */
.lapis-polos {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(140deg, #24407a 0%, var(--bpi-navy) 45%, var(--bpi-navy-tua) 100%);
}
.merek::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1.5px);
  background-size: 22px 22px;
}
.logo {
  width: 42px;
  height: auto;
}
.nama-situs {
  margin: 22px 0 0;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
.nama-situs span {
  color: #ff8a4c;
}
.perusahaan {
  margin: 14px 0 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}
.moto {
  margin: 40px 0 0;
  padding-left: 16px;
  max-width: 26em;
  border-left: 4px solid var(--bpi-oranye);
  font-size: 1.05rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
}

/* Panel kanan: formulir */
.isi {
  display: grid;
  place-items: center;
  padding: 40px 24px;
}
.kartu {
  width: 100%;
  max-width: 400px;
}
.eyebrow {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bpi-oranye-teks);
}
.eyebrow::before {
  content: '';
  width: 22px;
  height: 3px;
  border-radius: 3px;
  background: var(--bpi-oranye);
}
.judul {
  margin: 6px 0 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--bpi-navy);
}
.ket {
  margin: 8px 0 28px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.label {
  display: block;
  margin: 16px 0 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--bpi-navy);
}
.input {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1.5px solid var(--vp-c-border);
  border-radius: 12px;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  background: var(--bpi-putih);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input:focus {
  outline: none;
  border-color: var(--bpi-navy);
  box-shadow: 0 0 0 4px rgba(30, 53, 100, 0.12);
}
.sandi {
  position: relative;
}
.sandi .input {
  padding-right: 48px;
}
.lihat {
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  color: var(--vp-c-text-2);
}
.lihat:hover {
  color: var(--bpi-navy);
  background: var(--bpi-navy-tipis);
}
.galat {
  margin: 14px 0 0;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.9rem;
  color: var(--bpi-no);
  background: var(--bpi-no-pale);
}
.tombol {
  width: 100%;
  height: 50px;
  margin-top: 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--bpi-putih);
  background: var(--bpi-navy);
  transition: background 0.2s;
}
.tombol:hover:not(:disabled) {
  background: var(--bpi-oranye);
}
.tombol:disabled {
  opacity: 0.7;
  cursor: wait;
}
.kecil {
  margin: 18px 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  text-align: center;
}

@media (max-width: 860px) {
  :global(html.belum-masuk .gerbang),
  .gerbang.transisi {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  .merek {
    padding: 36px 24px 28px;
  }
  .moto {
    display: none;
  }
  .nama-situs {
    margin-top: 16px;
  }
}
</style>
