<script setup lang="ts">
// Beranda. Semua teks diambil dari docs/data/beranda.json.
import { withBase } from 'vitepress'
import data from '../../../data/beranda.json'
import TombolCari from './TombolCari.vue'
import DaftarKartu from './DaftarKartu.vue'
</script>

<template>
  <div class="beranda">
    <header class="sambut">
      <div class="teks">
        <p class="sapaan">{{ data.sapaan }}</p>
        <h1>{{ data.judul }}</h1>
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

    <section class="blok" aria-labelledby="topik-judul">
      <h2 id="topik-judul">Mau belajar apa hari ini?</h2>
      <DaftarKartu :items="data.topik" :kolom="3" />
    </section>

    <section class="blok" aria-labelledby="awal-judul">
      <h2 id="awal-judul">Baru pertama kali? Mulai dari sini</h2>
      <ol class="awal">
        <li v-for="(l, i) in data.langkahAwal" :key="l.link">
          <a :href="withBase(l.link)">
            <span class="nomor" aria-hidden="true">{{ i + 1 }}</span>
            <span class="judul">{{ l.judul }}</span>
            <span class="ket">{{ l.ket }}</span>
          </a>
        </li>
      </ol>
    </section>

    <p class="penutup">{{ data.penutup }}</p>
  </div>
</template>

<style scoped>
.beranda {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

/* ---------- Sambutan ---------- */
.sambut {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;
  padding: 36px 40px;
  border-radius: 24px;
  background: var(--bpi-steel-pale);
}
.sapaan {
  margin: 0;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
h1 {
  margin: 6px 0 0;
  font-weight: 800;
  font-size: clamp(2rem, 4.5vw, 2.9rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--bpi-ink);
}
.pengantar {
  margin: 14px 0 24px;
  max-width: 36em;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
.sambut :deep(.kolom) {
  background: var(--vp-c-bg);
  border-color: transparent;
  box-shadow: 0 2px 10px rgba(20, 50, 90, 0.08);
}

/* Moto dengan garis kuning seperti marka lantai gudang */
.moto {
  margin: 0;
  padding: 6px 0 6px 22px;
  border-left: 8px solid var(--bpi-safety);
}
.moto blockquote {
  margin: 0;
}
.moto p {
  margin: 0;
  font-weight: 800;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--bpi-ink);
  text-wrap: balance;
}
.moto figcaption {
  margin-top: 10px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* ---------- Blok ---------- */
.blok {
  margin-top: 48px;
}
.blok h2 {
  margin: 0;
  font-weight: 800;
  font-size: 1.45rem;
  letter-spacing: -0.01em;
  color: var(--bpi-ink);
}

/* Tiga langkah awal (urutan nyata, jadi bernomor) */
.awal {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.awal a {
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  height: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.awal a:hover {
  border-color: var(--vp-c-brand-1);
}
.nomor {
  grid-row: span 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--bpi-safety);
  color: #2b2100;
  font-weight: 800;
}
.awal .judul {
  font-weight: 700;
  color: var(--bpi-ink);
}
.awal .ket {
  margin-top: 2px;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.penutup {
  margin: 40px 0 0;
  padding: 14px 18px;
  border-radius: 14px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  text-align: center;
}

/* ---------- Responsif ---------- */
@media (max-width: 900px) {
  .sambut {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 24px;
  }
  .awal {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .beranda {
    padding: 16px 16px 56px;
  }
  .sambut {
    padding: 24px 18px;
    border-radius: 20px;
  }
}
</style>
