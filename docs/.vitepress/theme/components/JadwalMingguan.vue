<script setup lang="ts">
// Linimasa kegiatan rutin dalam satu minggu kerja. Data dari docs/data/kegiatan.json.
// Pemakaian: <JadwalMingguan />
// Baris pertama menjelaskan kegiatan "setiap hari", lalu satu baris per hari kerja.
// Hari yang punya kegiatan langsung berisi penjelasan, jam, tempat, persiapan, dan slot foto.
// "Hari ini" dihitung di browser (setelah halaman dimuat), bukan saat build.
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import data from '../../../data/kegiatan.json'
import Ikon from './Ikon.vue'
import FotoSlot from './FotoSlot.vue'

type Kegiatan = {
  id: string
  hari: string
  judul: string
  ikon?: string
  ket: string
  jam: string | null
  tempat: string | null
  foto?: number
  tautan?: string
  persiapan?: string[]
}
type Baris = { id: string; nama: string; harian: boolean; kegiatan: Kegiatan[] }

const NAMA: Record<string, string> = {
  senin: 'Senin',
  selasa: 'Selasa',
  rabu: 'Rabu',
  kamis: 'Kamis',
  jumat: 'Jumat',
  sabtu: 'Sabtu',
  minggu: 'Minggu'
}
// getDay(): 0 = Minggu, 1 = Senin, ...
const DARI_JS = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']

const semua = data.kegiatan as Kegiatan[]
const hariKerja = ((data as { hariKerja?: string[] }).hariKerja ?? ['senin', 'selasa', 'rabu', 'kamis', 'jumat']) as string[]
const harian = semua.filter((k) => k.hari === 'setiap-hari')

const baris: Baris[] = [
  ...(harian.length ? [{ id: 'setiap-hari', nama: 'Setiap hari kerja', harian: true, kegiatan: harian }] : []),
  ...hariKerja.map((id) => ({ id, nama: NAMA[id] ?? id, harian: false, kegiatan: semua.filter((k) => k.hari === id) }))
]

const hariIni = ref<string | null>(null)
onMounted(() => {
  hariIni.value = DARI_JS[new Date().getDay()]
})
</script>

<template>
  <ol class="linimasa">
    <li
      v-for="b in baris"
      :id="b.harian ? undefined : `hari-${b.id}`"
      :key="b.id"
      class="baris"
      :class="{ harian: b.harian, ada: b.kegiatan.length, kini: hariIni === b.id }"
    >
      <div class="label">
        <span class="titik" aria-hidden="true" />
        <span class="nama">{{ b.nama }}</span>
        <span v-if="hariIni === b.id" class="lencana-kini">Hari ini</span>
      </div>

      <div class="isi">
        <article v-for="k in b.kegiatan" :id="k.id" :key="k.id" class="kegiatan">
          <h3 class="judul">
            <span class="tile"><Ikon :nama="k.ikon ?? 'kalender'" :ukuran="22" /></span>
            {{ k.judul }}
          </h3>
          <p class="ket">{{ k.ket }}</p>

          <dl class="info">
            <div>
              <dt><Ikon nama="jam" :ukuran="16" /> Jam</dt>
              <dd :class="{ kosong: !k.jam }">{{ k.jam ?? 'Tanyakan ke pembimbing' }}</dd>
            </div>
            <div>
              <dt><Ikon nama="peta" :ukuran="16" /> Tempat</dt>
              <dd :class="{ kosong: !k.tempat }">{{ k.tempat ?? 'Tanyakan ke pembimbing' }}</dd>
            </div>
          </dl>

          <div v-if="k.persiapan?.length" class="persiapan">
            <p class="sub">{{ b.harian ? 'Yang disiapkan' : 'Yang perlu kamu siapkan' }}</p>
            <ul>
              <li v-for="p in k.persiapan" :key="p">{{ p }}</li>
            </ul>
          </div>

          <div v-if="k.foto" class="galeri" :class="`isi-${Math.min(k.foto, 3)}`">
            <FotoSlot v-for="n in k.foto" :key="n" folder="kegiatan" :kunci="`${k.id}-${n}`" :alt="`Foto ${k.judul} ${n}`" />
          </div>

          <a v-if="k.tautan" class="lanjut" :href="withBase(k.tautan)">
            Baca langkah lengkapnya
            <Ikon nama="kanan" :ukuran="16" />
          </a>
        </article>

        <template v-if="!b.harian">
          <p v-if="!b.kegiatan.length" class="biasa">Pekerjaan gudang seperti biasa.</p>
          <a v-for="k in harian" :key="k.id" class="rutin" :href="`#${k.id}`">
            <Ikon :nama="k.ikon ?? 'kalender'" :ukuran="16" />
            {{ k.judul }}
          </a>
        </template>
      </div>
    </li>
  </ol>
</template>

<style scoped>
/* ---------- Linimasa ---------- */
.linimasa {
  position: relative;
  list-style: none;
  margin: 28px 0 !important;
  padding: 0 !important;
}
/* garis vertikal penghubung hari */
.linimasa::before {
  content: '';
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 9px;
  width: 2px;
  border-radius: 2px;
  background: var(--vp-c-divider);
}
.baris {
  position: relative;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 20px;
  margin: 0 !important;
  padding: 0 0 28px;
}
.baris:last-child {
  padding-bottom: 0;
}

/* Label hari di kiri */
.label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 2px 0 0 34px;
}
.titik {
  position: absolute;
  top: 4px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-divider);
  background: var(--bpi-putih);
}
.baris.ada .titik,
.baris.harian .titik {
  border-color: var(--bpi-navy);
}
.baris.kini .titik {
  border-color: var(--bpi-oranye);
  background: var(--bpi-oranye);
  box-shadow: 0 0 0 5px rgba(235, 78, 0, 0.18);
}
.nama {
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.3;
  color: var(--bpi-navy);
}
.baris:not(.ada):not(.harian) .nama {
  color: var(--vp-c-text-2);
}
.baris.harian .nama {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bpi-oranye-teks);
}
.lencana-kini {
  display: inline-block;
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--bpi-putih);
  background: var(--bpi-oranye);
}

/* Isi hari di kanan */
.isi {
  display: grid;
  gap: 12px;
  align-content: start;
  min-width: 0;
}
.kegiatan {
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
  padding: 20px 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--bpi-putih);
}
.baris.kini .kegiatan {
  border-color: var(--bpi-oranye);
}
.baris.harian .kegiatan {
  background: var(--bpi-navy-tipis);
  border-color: transparent;
}
.judul {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  font-size: 1.2rem !important;
  font-weight: 800;
  color: var(--bpi-navy);
}
.judul::before {
  display: none;
}
.tile {
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  color: var(--bpi-oranye);
  background: var(--bpi-oranye-pucat);
}
.ket {
  margin: 12px 0 0 !important;
}
.info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 14px 0 0;
}
.info > div {
  padding: 9px 14px;
  border-radius: 12px;
  background: var(--bpi-navy-tipis);
}
.baris.harian .info > div {
  background: var(--bpi-putih);
}
.info dt {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}
.info dt :deep(svg) {
  color: var(--bpi-oranye);
}
.info dd {
  margin: 2px 0 0;
  font-weight: 700;
  color: var(--bpi-navy);
}
.info dd.kosong {
  font-weight: 500;
  font-style: italic;
  color: var(--vp-c-text-2);
}
.persiapan {
  margin-top: 14px;
}
.sub {
  margin: 0 !important;
  font-weight: 700;
  color: var(--bpi-navy);
}
.persiapan ul {
  margin: 6px 0 0 !important;
}
.galeri {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}
.galeri.isi-1 {
  grid-template-columns: minmax(0, 1fr);
}
.galeri.isi-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.galeri :deep(.foto) {
  border-radius: 12px;
}
.lanjut {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-weight: 700;
  text-decoration: none !important;
}

/* Hari tanpa kegiatan khusus */
.biasa {
  margin: 0 !important;
  color: var(--vp-c-text-2);
}
.rutin {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--bpi-navy) !important;
  background: var(--bpi-navy-tipis);
  text-decoration: none !important;
  transition: background 0.2s, color 0.2s;
}
.rutin :deep(svg) {
  color: var(--bpi-oranye);
}
.rutin:hover {
  color: var(--bpi-putih) !important;
  background: var(--bpi-navy);
}
.rutin:hover :deep(svg) {
  color: var(--bpi-putih);
}

/* ---------- Layar kecil: label hari di atas isinya ---------- */
@media (max-width: 760px) {
  .baris {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }
  .label {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .titik {
    top: 50%;
    transform: translateY(-50%);
  }
  .isi {
    padding-left: 34px;
  }
  .kegiatan {
    padding: 16px;
  }
  .info {
    grid-template-columns: 1fr;
  }
  .galeri,
  .galeri.isi-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
