<script setup lang="ts">
// Beranda. Semua teks diambil dari docs/data/beranda.json.
// Bagian-bagian muncul perlahan saat digulir, ditambah animasi bergerak dan efek parallax
// (gulir dan gerak mouse). Semua gerakan dimatikan jika pembaca memilih "kurangi gerak".
import { onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'
import data from '../../../data/beranda.json'
import TombolCari from './TombolCari.vue'
import Ikon from './Ikon.vue'

const akar = ref<HTMLElement | null>(null)
const sambut = ref<HTMLElement | null>(null)
const angkaTampil = ref(data.angka.map((a) => a.nilai))

const bagianJudul = (() => {
  const i = data.judul.indexOf(data.judulSorot)
  return i < 0
    ? { depan: data.judul, sorot: '', belakang: '' }
    : { depan: data.judul.slice(0, i), sorot: data.judulSorot, belakang: data.judul.slice(i + data.judulSorot.length) }
})()

const kataJudul = bagianJudul.depan.trim().split(/\s+/).filter(Boolean)

let pengamat: IntersectionObserver | null = null
let rafGulir = 0
const pakaiGerak = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Parallax gulir: --gulir (px dari atas) untuk sambutan, --moto-p (-1..1) untuk kotak moto.
function perbaruiGulir() {
  rafGulir = 0
  const el = akar.value
  if (!el) return
  el.style.setProperty('--gulir', String(Math.min(window.scrollY, 1200)))
  const moto = el.querySelector<HTMLElement>('.moto')
  if (moto) {
    const r = moto.getBoundingClientRect()
    const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
    moto.style.setProperty('--moto-p', Math.max(-1.5, Math.min(1.5, p)).toFixed(3))
  }
}
const saatGulir = () => {
  if (!rafGulir) rafGulir = requestAnimationFrame(perbaruiGulir)
}

// Parallax mouse di sambutan: --mx dan --my bernilai -1 sampai 1.
function saatMouse(e: PointerEvent) {
  const s = sambut.value
  if (!s) return
  const r = s.getBoundingClientRect()
  s.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
  s.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
}
function saatMouseKeluar() {
  sambut.value?.style.setProperty('--mx', '0')
  sambut.value?.style.setProperty('--my', '0')
}

function hitungNaik() {
  const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (kurangiGerak) return
  const mulai = performance.now()
  const lama = 1400
  const langkah = (t: number) => {
    const p = Math.min(1, (t - mulai) / lama)
    const halus = 1 - Math.pow(1 - p, 3)
    angkaTampil.value = data.angka.map((a) => (a.hitung ? Math.round(a.nilai * halus) : a.nilai))
    if (p < 1) requestAnimationFrame(langkah)
  }
  requestAnimationFrame(langkah)
}

onMounted(() => {
  const el = akar.value
  if (!el) return
  el.classList.add('animasi')
  pengamat = new IntersectionObserver(
    (entri) => {
      for (const e of entri) {
        if (!e.isIntersecting) continue
        e.target.classList.add('tampil')
        if ((e.target as HTMLElement).dataset.angka !== undefined) hitungNaik()
        pengamat?.unobserve(e.target)
      }
    },
    { threshold: 0.15 }
  )
  el.querySelectorAll('[data-muncul], [data-garis]').forEach((n) => pengamat!.observe(n))

  if (pakaiGerak()) {
    el.classList.add('bergerak')
    perbaruiGulir()
    window.addEventListener('scroll', saatGulir, { passive: true })
    window.addEventListener('resize', saatGulir, { passive: true })
    if (window.matchMedia('(pointer: fine)').matches) {
      sambut.value?.addEventListener('pointermove', saatMouse)
      sambut.value?.addEventListener('pointerleave', saatMouseKeluar)
    }
  }
})
onUnmounted(() => {
  pengamat?.disconnect()
  window.removeEventListener('scroll', saatGulir)
  window.removeEventListener('resize', saatGulir)
  sambut.value?.removeEventListener('pointermove', saatMouse)
  sambut.value?.removeEventListener('pointerleave', saatMouseKeluar)
  if (rafGulir) cancelAnimationFrame(rafGulir)
})
</script>

<template>
  <div ref="akar" class="beranda">
    <!-- ================= Sambutan ================= -->
    <header ref="sambut" class="sambut">
      <div class="latar" aria-hidden="true">
        <span class="cincin" />
      </div>

      <!-- Bentuk melayang: penampang pipa dan titik seperti logo BPI -->
      <div class="bentuk" aria-hidden="true">
        <span class="b b1" style="--dalam: 14; --cepat: 0.18" />
        <span class="b b2" style="--dalam: 26; --cepat: -0.1" />
        <span class="b b3" style="--dalam: 34; --cepat: 0.3" />
        <span class="b b4" style="--dalam: 20; --cepat: 0.24" />
        <span class="b b5" style="--dalam: 10; --cepat: 0.12" />
        <span class="b b6" style="--dalam: 30; --cepat: -0.16" />
      </div>

      <!-- Garis aliran pipa di dasar sambutan -->
      <svg class="aliran" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <path class="aliran-dasar" d="M0 52 C 180 20, 360 76, 600 46 S 1020 18, 1200 50" />
        <path class="aliran-arus" d="M0 52 C 180 20, 360 76, 600 46 S 1020 18, 1200 50" />
      </svg>

      <div class="teks">
        <p class="sapaan muncul-awal" style="--tunda: 0.05s">
          <img :src="withBase('/images/logo-perusahaan.png')" alt="" width="20" height="25" />
          {{ data.sapaan }}
        </p>
        <h1>
          <span v-for="(k, i) in kataJudul" :key="k + i" class="kata-bungkus"><span class="kata" :style="{ '--i': i }">{{ k }}</span>{{ ' ' }}</span>
          <span class="sorot"><span class="kata" :style="{ '--i': kataJudul.length }">{{ bagianJudul.sorot }}</span></span>{{ bagianJudul.belakang }}
        </h1>
        <p class="pengantar muncul-awal" style="--tunda: 0.25s">{{ data.pengantar }}</p>
        <div class="muncul-awal" style="--tunda: 0.35s">
          <TombolCari :contoh="data.contohPencarian" />
        </div>
      </div>

      <div class="foto-tumpuk muncul-awal" style="--tunda: 0.3s" aria-hidden="true">
        <img class="foto belakang" :src="withBase(data.fotoSambut[0].src)" :alt="data.fotoSambut[0].alt" />
        <img class="foto depan" :src="withBase(data.fotoSambut[1].src)" :alt="data.fotoSambut[1].alt" />
        <span class="chip chip-lokasi">
          <Ikon nama="peta" :ukuran="16" />
          {{ data.lokasiSambut }}
        </span>
        <span class="chip chip-catat">
          <span class="centang">
            <svg viewBox="0 0 24 24" width="12" height="12"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          Barang tercatat
        </span>
      </div>
    </header>

    <!-- ================= Angka ================= -->
    <section class="angka" aria-label="Gudang Teknik dalam angka" data-muncul data-angka>
      <div v-for="(a, i) in data.angka" :key="a.label" class="angka-item" :style="{ '--tunda': `${i * 0.08}s` }">
        <p class="nilai">
          <span v-if="a.awalan" class="awalan">{{ a.awalan }}</span>
          {{ angkaTampil[i] }}
        </p>
        <p class="label">{{ a.label }}</p>
      </div>
    </section>

    <!-- ================= Topik ================= -->
    <section class="blok" aria-labelledby="topik-judul">
      <div class="kepala" data-muncul>
        <p class="eyebrow">Jelajahi handbook</p>
        <h2 id="topik-judul">Mau belajar apa hari ini?</h2>
      </div>
      <ul class="topik">
        <li v-for="(t, i) in data.topik" :key="t.link" data-muncul :style="{ '--tunda': `${(i % 3) * 0.08}s` }">
          <a :href="withBase(t.link)">
            <span class="tile"><Ikon :nama="t.ikon" :ukuran="26" /></span>
            <span class="judul">{{ t.judul }}</span>
            <span class="ket">{{ t.ket }}</span>
            <span class="buka">
              Buka
              <Ikon nama="kanan" :ukuran="16" />
            </span>
          </a>
        </li>
      </ul>
    </section>

    <!-- ================= Perjalanan barang ================= -->
    <section class="blok perjalanan" aria-labelledby="jalan-judul">
      <div class="kepala" data-muncul>
        <p class="eyebrow">Gambaran besar</p>
        <h2 id="jalan-judul">Perjalanan sebuah barang di gudang</h2>
      </div>
      <ol class="jalur" data-garis>
        <span class="paket" aria-hidden="true" />
        <li v-for="(p, i) in data.perjalanan" :key="p.judul" data-muncul :style="{ '--tunda': `${i * 0.1}s` }">
          <a :href="withBase(p.link)">
            <span class="titik"><Ikon :nama="p.ikon" :ukuran="22" /></span>
            <span class="urut">Tahap {{ i + 1 }}</span>
            <span class="judul">{{ p.judul }}</span>
            <span class="ket">{{ p.ket }}</span>
          </a>
        </li>
      </ol>
    </section>

    <!-- ================= Langkah awal ================= -->
    <section class="blok" aria-labelledby="awal-judul">
      <div class="kepala" data-muncul>
        <p class="eyebrow">Untuk peserta baru</p>
        <h2 id="awal-judul">Baru pertama kali? Mulai dari sini</h2>
      </div>
      <ol class="awal">
        <li v-for="(l, i) in data.langkahAwal" :key="l.link" data-muncul :style="{ '--tunda': `${i * 0.1}s` }">
          <a :href="withBase(l.link)">
            <span class="nomor" aria-hidden="true">{{ i + 1 }}</span>
            <span class="judul">{{ l.judul }}</span>
            <span class="ket">{{ l.ket }}</span>
          </a>
        </li>
      </ol>
    </section>

    <!-- ================= Moto ================= -->
    <figure class="moto" data-muncul>
      <span class="pola" aria-hidden="true" />
      <span class="kutip" aria-hidden="true">“</span>
      <blockquote>
        <p>{{ data.moto }}</p>
      </blockquote>
      <figcaption>{{ data.motoSumber }}</figcaption>
    </figure>

    <!-- ================= Penutup ================= -->
    <section class="penutup" data-muncul>
      <p>{{ data.penutup }}</p>
      <div class="tombol">
        <a v-for="t in data.tautanPenutup" :key="t.link" :href="withBase(t.link)" :class="{ utama: t.utama }">
          {{ t.teks }}
          <Ikon nama="kanan" :ukuran="16" />
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.beranda {
  max-width: 1160px;
  max-width: clamp(1160px, 70vw, 1560px);
  margin: 0 auto;
  padding: 28px 24px 88px;
}

/* ---------- Animasi masuk ---------- */
@keyframes naik {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animasi .muncul-awal {
  animation: naik 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: var(--tunda, 0s);
}
.animasi [data-muncul],
.animasi [data-muncul] > .angka-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--tunda, 0s);
}
.animasi [data-muncul].tampil,
.animasi [data-muncul].tampil > .angka-item {
  opacity: 1;
  transform: none;
}

/* ---------- Sambutan ---------- */
.sambut {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;
  min-height: 540px;
  padding: 56px 56px 96px;
  border-radius: 32px;
  color: var(--bpi-putih);
  background: linear-gradient(140deg, #24407a 0%, var(--bpi-navy) 45%, var(--bpi-navy-tua) 100%);
  box-shadow: 0 30px 60px -30px rgba(20, 38, 71, 0.55);
}
.latar {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  /* pola titik halus */
  background-image: radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1.5px);
  background-size: 22px 22px;
  mask-image: linear-gradient(120deg, transparent 10%, #000 60%);
}
.cincin {
  position: absolute;
  left: -180px;
  bottom: -260px;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: repeating-radial-gradient(circle, transparent 0 38px, rgba(255, 255, 255, 0.06) 38px 40px);
}

.sapaan {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 6px 14px 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 0.92rem;
  font-weight: 600;
  color: #ffd2bb;
}
.sapaan img {
  height: 22px;
  width: auto;
}
h1 {
  margin: 20px 0 0;
  font-weight: 800;
  font-size: clamp(2.4rem, 5.4vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: var(--bpi-putih);
}
.sorot {
  position: relative;
  display: table; /* baris sendiri, lebar mengikuti teks (untuk garis bawah) */
  color: #ff8a4c;
}
/* Garis oranye yang tergambar di bawah "Gudang Teknik" */
.sorot::after {
  content: '';
  position: absolute;
  left: 2px;
  right: 2px;
  bottom: -2px;
  height: 6px;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--bpi-oranye), #ff8a4c);
  transform-origin: left;
}
.animasi .sorot::after {
  transform: scaleX(0);
  animation: gambar-garis 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.9s forwards;
}
@keyframes gambar-garis {
  to {
    transform: scaleX(1);
  }
}
/* Judul muncul kata demi kata */
.kata-bungkus,
.sorot {
  overflow: hidden;
  padding-bottom: 0.08em;
}
.kata-bungkus {
  display: inline-block;
  vertical-align: top;
}
.sorot {
  overflow: visible;
}
.kata {
  display: inline-block;
}
.animasi .kata {
  animation: kata-naik 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(0.15s + var(--i) * 0.12s);
}
@keyframes kata-naik {
  from {
    opacity: 0;
    transform: translateY(70%) rotate(3deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.pengantar {
  margin: 20px 0 28px;
  max-width: 34em;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
}
.sambut :deep(.kolom) {
  border-color: transparent;
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.4);
}
.sambut :deep(.contoh) {
  color: rgba(255, 255, 255, 0.85);
}
.sambut :deep(.contoh button) {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: var(--bpi-putih);
}
.sambut :deep(.contoh button:hover) {
  background: var(--bpi-oranye);
  border-color: var(--bpi-oranye);
}

/* Tumpukan foto landscape 4:3 */
.foto-tumpuk {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 0.92;
}
.foto {
  position: absolute;
  object-fit: cover;
  border-radius: 22px;
  border: 5px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 24px 50px -12px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), translate 0.35s ease-out;
}
.foto.belakang {
  width: 84%;
  aspect-ratio: 4 / 3;
  right: 0;
  top: 2%;
  transform: rotate(4deg);
}
.foto.depan {
  width: 72%;
  aspect-ratio: 4 / 3;
  left: 0;
  bottom: 2%;
  transform: rotate(-4deg);
}
.foto-tumpuk:hover .foto.belakang {
  transform: rotate(7deg) translate(10px, -6px);
}
.foto-tumpuk:hover .foto.depan {
  transform: rotate(-6deg) translate(-8px, 6px);
}
.chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 14px;
  font-size: 0.86rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--bpi-navy);
  background: var(--bpi-putih);
  box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.45);
  animation: melayang 5s ease-in-out infinite;
}
.chip :deep(svg) {
  color: var(--bpi-oranye);
}
.chip-lokasi {
  right: 0;
  bottom: 14%;
}
.chip-catat {
  left: 0;
  top: 8%;
  animation-delay: -2.5s;
}
.centang {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: var(--bpi-putih);
  background: var(--bpi-oranye);
}
@keyframes melayang {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* ---------- Angka ---------- */
.angka {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: -44px 32px 0;
  border-radius: 22px;
  background: var(--bpi-putih);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 20px 44px -22px rgba(20, 38, 71, 0.35);
}
.animasi .angka[data-muncul] {
  opacity: 1;
  transform: none;
}
.angka-item {
  padding: 22px 24px;
}
.angka-item + .angka-item {
  border-left: 1px solid var(--vp-c-divider);
}
.nilai {
  margin: 0;
  font-size: 2.3rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--bpi-navy);
  font-variant-numeric: tabular-nums;
}
.awalan {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--bpi-oranye-teks);
}
.label {
  margin: 6px 0 0;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

/* ---------- Blok umum ---------- */
.blok {
  margin-top: 72px;
}
.kepala {
  margin-bottom: 22px;
}
.eyebrow {
  margin: 0 0 6px;
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
.blok h2 {
  margin: 0;
  font-weight: 800;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  letter-spacing: -0.02em;
  color: var(--bpi-navy);
}

/* ---------- Kartu topik ---------- */
.topik {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.topik a {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--bpi-putih);
  color: var(--vp-c-text-1);
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s, border-color 0.3s;
}
.topik a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 4px;
  background: var(--bpi-oranye);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.topik a:hover {
  transform: translateY(-6px);
  border-color: transparent;
  box-shadow: 0 22px 40px -18px rgba(20, 38, 71, 0.35);
}
.topik a:hover::after {
  transform: scaleX(1);
}
.tile {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  color: var(--bpi-oranye);
  background: var(--bpi-oranye-pucat);
  transition: background 0.3s, color 0.3s, transform 0.3s;
}
.topik a:hover .tile {
  color: var(--bpi-putih);
  background: var(--bpi-oranye);
  transform: rotate(-6deg) scale(1.05);
}
.topik .judul {
  margin-top: 18px;
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--bpi-navy);
}
.topik .ket {
  margin-top: 6px;
  flex: 1;
  font-size: 0.93rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
.buka {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--bpi-navy);
}
.buka :deep(svg) {
  transition: transform 0.3s;
}
.topik a:hover .buka :deep(svg) {
  transform: translateX(5px);
}

/* ---------- Perjalanan barang ---------- */
.perjalanan {
  padding: 40px;
  border-radius: 28px;
  background: var(--bpi-navy-tipis);
  border: 1px solid var(--vp-c-divider);
}
.jalur {
  position: relative;
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}
/* garis penghubung di belakang lingkaran */
.jalur::before {
  content: '';
  position: absolute;
  left: 10%;
  right: 10%;
  top: 27px;
  border-top: 2px dashed rgba(30, 53, 100, 0.25);
  transform-origin: left;
}
/* Garis penghubung tergambar dari kiri ke kanan saat terlihat */
.animasi .jalur::before {
  transform: scaleX(0);
  transition: transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) 0.3s;
}
.animasi .jalur.tampil::before {
  transform: scaleX(1);
}
/* Paket kecil yang berjalan melewati kelima tahap */
.paket {
  display: none;
}
.bergerak .jalur.tampil .paket {
  display: block;
  position: absolute;
  z-index: 0;
  top: 21px;
  left: 10%;
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--bpi-oranye);
  box-shadow: 0 0 0 4px rgba(235, 78, 0, 0.18), 0 6px 14px -4px rgba(235, 78, 0, 0.7);
  animation: paket-jalan 7s cubic-bezier(0.45, 0, 0.55, 1) 1.6s infinite;
  opacity: 0;
}
@keyframes paket-jalan {
  0% {
    left: 10%;
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  94% {
    opacity: 1;
  }
  100% {
    left: calc(90% - 14px);
    opacity: 0;
  }
}
.jalur li {
  position: relative;
  z-index: 1;
}
.jalur a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 6px 6px;
  color: inherit;
  text-decoration: none;
}
.titik {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: var(--bpi-putih);
  background: var(--bpi-navy);
  box-shadow: 0 0 0 6px var(--bpi-navy-tipis), 0 10px 20px -8px rgba(20, 38, 71, 0.5);
  transition: background 0.3s, transform 0.3s;
}
.jalur a:hover .titik {
  background: var(--bpi-oranye);
  transform: translateY(-4px) scale(1.06);
}
.urut {
  margin-top: 14px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bpi-oranye-teks);
}
.jalur .judul {
  margin-top: 4px;
  font-weight: 700;
  color: var(--bpi-navy);
}
.jalur .ket {
  margin-top: 4px;
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

/* ---------- Langkah awal ---------- */
.awal {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  counter-reset: none;
}
.awal a {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  height: 100%;
  padding: 22px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--bpi-putih);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
.awal a:hover {
  border-color: var(--bpi-oranye);
  transform: translateY(-3px);
  box-shadow: 0 16px 32px -18px rgba(235, 78, 0, 0.45);
}
.nomor {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--bpi-oranye);
  color: var(--bpi-putih);
  font-size: 1.2rem;
  font-weight: 800;
}
.awal .judul {
  font-weight: 700;
  color: var(--bpi-navy);
}
.awal .ket {
  margin-top: 4px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* ---------- Moto ---------- */
.moto {
  position: relative;
  overflow: hidden;
  margin: 72px 0 0;
  padding: 56px 48px;
  border-radius: 28px;
  text-align: center;
  color: var(--bpi-putih);
  background:
    radial-gradient(circle at 92% 110%, rgba(235, 78, 0, 0.28), transparent 40%),
    linear-gradient(135deg, var(--bpi-navy) 0%, var(--bpi-navy-tua) 100%);
}
.kutip {
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translateX(-50%);
  font-size: 12rem;
  line-height: 1;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.06);
  pointer-events: none;
}
.moto blockquote {
  margin: 0;
  border: 0;
  padding: 0;
  background: none;
}
.moto p {
  position: relative;
  margin: 0 auto;
  max-width: 18em;
  font-weight: 800;
  font-size: clamp(1.6rem, 3.6vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: var(--bpi-putih);
}
.moto figcaption {
  position: relative;
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #ffd2bb;
}
.moto figcaption::before,
.moto figcaption::after {
  content: '';
  width: 28px;
  height: 2px;
  border-radius: 2px;
  background: var(--bpi-oranye);
}

/* ---------- Penutup ---------- */
.penutup {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 24px;
  padding: 24px 28px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--bpi-putih);
}
.penutup p {
  margin: 0;
  max-width: 36em;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.tombol {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tombol a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1.5px solid var(--bpi-navy);
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--bpi-navy);
  text-decoration: none;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}
.tombol a:hover {
  background: var(--bpi-navy);
  color: var(--bpi-putih);
}
.tombol a.utama {
  background: var(--bpi-oranye);
  border-color: var(--bpi-oranye);
  color: var(--bpi-putih);
}
.tombol a.utama:hover {
  background: var(--bpi-navy);
  border-color: var(--bpi-navy);
}

/* ---------- Motion graphics & parallax di sambutan ----------
   --gulir  : posisi gulir halaman (px), diisi skrip
   --mx/--my: posisi mouse di sambutan (-1..1), diisi skrip
   --dalam  : seberapa jauh lapisan bergeser mengikuti mouse
   --cepat  : seberapa cepat lapisan bergeser saat digulir */
.sambut {
  --mx: 0;
  --my: 0;
}
.bentuk {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
.b {
  position: absolute;
  border-radius: 50%;
  translate: calc(var(--mx) * var(--dalam) * 1px) calc(var(--my) * var(--dalam) * 1px + var(--gulir, 0) * var(--cepat) * 1px);
  transition: translate 0.4s ease-out;
  animation: melayang-pelan 9s ease-in-out infinite alternate;
}
/* penampang pipa (cincin) */
.b1 {
  width: 150px;
  height: 150px;
  left: 44%;
  top: -40px;
  border: 14px solid rgba(255, 255, 255, 0.06);
}
.b2 {
  width: 64px;
  height: 64px;
  right: 3%;
  bottom: 16%;
  border: 6px solid rgba(235, 78, 0, 0.55);
  animation-duration: 7s;
}
.b5 {
  width: 40px;
  height: 40px;
  left: 4%;
  top: 58%;
  border: 3px solid rgba(255, 255, 255, 0.18);
  animation-duration: 11s;
}
/* titik seperti logo BPI */
.b3 {
  width: 12px;
  height: 12px;
  left: 41%;
  bottom: 24%;
  background: var(--bpi-oranye);
  animation-duration: 6s;
}
.b4 {
  width: 9px;
  height: 9px;
  right: 42%;
  top: 14%;
  background: rgba(255, 255, 255, 0.7);
  animation-duration: 8s;
}
.b6 {
  width: 18px;
  height: 18px;
  right: 30%;
  bottom: 8%;
  background: rgba(255, 255, 255, 0.16);
  animation-duration: 10s;
}
@keyframes melayang-pelan {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(10px, -16px) scale(1.06);
  }
}

/* Garis aliran pipa */
.aliran {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 36px;
  width: 100%;
  height: 70px;
  z-index: -1;
  pointer-events: none;
}
.aliran path {
  fill: none;
  vector-effect: non-scaling-stroke;
}
.aliran-dasar {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 2;
  stroke-dasharray: 2 10;
  stroke-linecap: round;
  animation: alir 3s linear infinite;
}
.aliran-arus {
  stroke: rgba(235, 78, 0, 0.75);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 90 1400;
  animation: alir-arus 6s linear infinite;
}
@keyframes alir {
  to {
    stroke-dashoffset: -48;
  }
}
@keyframes alir-arus {
  from {
    stroke-dashoffset: 1490;
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* Lapisan parallax: teks, foto, dan label bergerak dengan kecepatan berbeda */
.bergerak .teks {
  translate: 0 calc(var(--gulir, 0) * 0.1px);
}
.bergerak .foto.belakang {
  translate: calc(var(--mx) * -10px) calc(var(--my) * -8px + var(--gulir, 0) * -0.06px);
}
.bergerak .foto.depan {
  translate: calc(var(--mx) * 16px) calc(var(--my) * 12px + var(--gulir, 0) * -0.14px);
}
.bergerak .chip {
  transition: translate 0.35s ease-out;
}
.bergerak .chip-catat {
  translate: calc(var(--mx) * 24px) calc(var(--my) * 18px + var(--gulir, 0) * -0.2px);
}
.bergerak .chip-lokasi {
  translate: calc(var(--mx) * 30px) calc(var(--my) * 22px + var(--gulir, 0) * -0.24px);
}

/* Garis kecil di atas judul bagian memanjang saat muncul */
.animasi .kepala .eyebrow::before {
  width: 0;
  transition: width 0.6s ease 0.25s;
}
.animasi .kepala.tampil .eyebrow::before {
  width: 22px;
}

/* Pola di kotak moto bergeser saat digulir */
.pola {
  position: absolute;
  inset: -80px -40px;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.6px);
  background-size: 26px 26px;
}
.bergerak .pola {
  translate: 0 calc(var(--moto-p, 0) * 50px);
}

/* ---------- Responsif ---------- */
@media (max-width: 1100px) {
  .jalur {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 28px;
  }
  .jalur::before,
  .bergerak .jalur.tampil .paket {
    display: none;
  }
}
@media (max-width: 960px) {
  .sambut {
    grid-template-columns: 1fr;
    padding: 40px 32px 80px;
    min-height: 0;
  }
  .foto-tumpuk {
    max-width: 520px;
    margin: 0 auto;
  }
  .angka {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: -32px 16px 0;
  }
  .angka-item:nth-child(3) {
    border-left: 0;
  }
  .angka-item:nth-child(n + 3) {
    border-top: 1px solid var(--vp-c-divider);
  }
  .topik,
  .awal {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .beranda {
    padding: 16px 16px 64px;
  }
  .sambut {
    padding: 32px 20px 64px;
    border-radius: 24px;
  }
  .chip {
    font-size: 0.78rem;
    padding: 7px 11px;
  }
  .angka {
    margin: -28px 8px 0;
  }
  .angka-item {
    padding: 16px;
  }
  .nilai {
    font-size: 1.8rem;
  }
  .topik,
  .awal,
  .jalur {
    grid-template-columns: 1fr;
  }
  .perjalanan {
    padding: 28px 20px;
  }
  .jalur a {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    text-align: left;
    column-gap: 14px;
  }
  .jalur .titik {
    flex: none;
  }
  .jalur .urut {
    margin-top: 0;
  }
  .jalur .judul,
  .jalur .ket {
    flex-basis: 100%;
    padding-left: 70px;
    margin-top: 2px;
  }
  .moto {
    padding: 44px 24px;
  }
}
</style>
