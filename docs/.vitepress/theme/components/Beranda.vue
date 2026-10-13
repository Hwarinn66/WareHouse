<script setup lang="ts">
// Beranda sebagai dasbor dokumentasi. Semua teks diambil dari docs/data/beranda.json.
import { withBase } from 'vitepress'
import data from '../../../data/beranda.json'
import TombolCari from './TombolCari.vue'
</script>

<template>
  <div class="beranda">
    <header class="kepala">
      <div class="judul-blok">
        <h1>Division Handbook</h1>
        <p class="unit">Gudang Teknik, PT Bakrie Pipe Industries</p>
        <p class="pengantar">{{ data.pengantar }}</p>
        <TombolCari :contoh="data.contohPencarian" />
      </div>
      <figure class="moto">
        <blockquote>
          <p>{{ data.moto }}</p>
        </blockquote>
        <figcaption>{{ data.motoSumber }}</figcaption>
      </figure>
    </header>

    <aside v-if="data.pengumuman?.aktif" class="pengumuman" role="note">
      <p class="pengumuman-judul">{{ data.pengumuman.judul }}</p>
      <p>{{ data.pengumuman.isi }}</p>
    </aside>

    <section class="blok" aria-labelledby="mulai-judul">
      <h2 id="mulai-judul">Mulai dari sini</h2>
      <p class="blok-ket">Urutan belajar yang disarankan untuk minggu pertama magang.</p>
      <ol class="alur">
        <li v-for="(l, i) in data.alurBelajar" :key="l.link">
          <span class="nomor" aria-hidden="true">{{ i + 1 }}</span>
          <a :href="withBase(l.link)" class="alur-judul">{{ l.judul }}</a>
          <p>{{ l.ket }}</p>
        </li>
      </ol>
    </section>

    <section class="blok" aria-labelledby="isi-judul">
      <h2 id="isi-judul">Isi handbook</h2>
      <ul class="indeks">
        <li v-for="b in data.bagian" :key="b.link">
          <a :href="withBase(b.link)">{{ b.judul }}</a>
          <p>{{ b.ket }}</p>
        </li>
      </ul>
    </section>

    <section class="blok" aria-labelledby="saran-judul">
      <h2 id="saran-judul">Bacaan yang disarankan</h2>
      <ul class="saran">
        <li v-for="r in data.rekomendasi" :key="r.link">
          <a :href="withBase(r.link)">{{ r.judul }}</a>
          <span>{{ r.ket }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.beranda {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

/* ---------- Kepala ---------- */
.kepala {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 48px;
  align-items: end;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--vp-c-divider);
}
h1 {
  margin: 0;
  font-family: var(--bpi-font-display);
  font-weight: 700;
  font-size: clamp(2.6rem, 6vw, 4rem);
  line-height: 1;
  color: var(--bpi-ink);
}
.unit {
  margin: 10px 0 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.pengantar {
  margin: 20px 0 28px;
  max-width: 34em;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

/* Moto: elemen yang paling menonjol, dengan garis kuning marka lantai gudang. */
.moto {
  margin: 0;
  padding: 4px 0 4px 28px;
  border-left: 10px solid var(--bpi-safety);
}
.moto blockquote {
  margin: 0;
}
.moto p {
  margin: 0;
  font-family: var(--bpi-font-display);
  font-weight: 600;
  font-size: clamp(1.9rem, 3.6vw, 2.75rem);
  line-height: 1.08;
  color: var(--bpi-ink);
  text-wrap: balance;
}
.moto figcaption {
  margin-top: 14px;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

/* ---------- Pengumuman ---------- */
.pengumuman {
  margin: 32px 0 0;
  padding: 14px 18px;
  border-radius: 6px;
  background: var(--bpi-safety-pale);
  color: var(--bpi-safety-ink);
  max-width: 760px;
}
.pengumuman p {
  margin: 0;
  line-height: 1.55;
}
.pengumuman-judul {
  font-weight: 700;
  margin-bottom: 2px !important;
}

/* ---------- Blok ---------- */
.blok {
  margin-top: 56px;
}
.blok h2 {
  margin: 0;
  font-family: var(--bpi-font-display);
  font-weight: 600;
  font-size: 1.85rem;
  color: var(--bpi-ink);
}
.blok-ket {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
}

/* Alur belajar: urutan nyata, jadi memakai nomor. */
.alur {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 32px;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  counter-reset: none;
}
.alur li {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  padding: 18px 0;
  border-top: 2px solid var(--bpi-ink);
}
.nomor {
  grid-row: span 2;
  font-family: var(--bpi-font-display);
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 1;
  color: var(--vp-c-brand-1);
}
.alur-judul {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  text-decoration: underline;
  text-decoration-color: var(--vp-c-divider);
  text-underline-offset: 4px;
}
.alur-judul:hover {
  color: var(--vp-c-brand-1);
  text-decoration-color: currentColor;
}
.alur p {
  margin: 4px 0 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* Indeks isi */
.indeks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 32px;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}
.indeks li {
  padding: 14px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.indeks a {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-brand-1);
}
.indeks a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.indeks p {
  margin: 2px 0 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.saran {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
}
.saran li {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.saran a {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.saran a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.saran span {
  color: var(--vp-c-text-2);
}

/* ---------- Responsif ---------- */
@media (max-width: 960px) {
  .kepala {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .alur {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .beranda {
    padding: 28px 16px 64px;
  }
  .moto {
    padding-left: 18px;
    border-left-width: 8px;
  }
  .alur,
  .indeks {
    grid-template-columns: 1fr;
  }
  .alur li {
    border-top-width: 1px;
  }
}
</style>
