<script setup lang="ts">
// Keterangan warna dan bentuk pada flowchart.
import { gayaAktor } from '../warnaAlur'

const warna = [
  { kunci: 'vendor', label: 'Vendor / supplier' },
  { kunci: 'staff', label: 'Staff gudang' },
  { kunci: 'divisi', label: 'Divisi pemesan' },
  { kunci: 'sistem', label: 'Sistem ERP / database' },
  { kunci: 'dokumen', label: 'Dokumen / catatan' },
  { kunci: 'cek', label: 'Pengecekan (Ya / Tidak)' },
  { kunci: 'tolak', label: 'Dikembalikan' }
]
</script>

<template>
  <details class="legenda">
    <summary>Cara membaca flowchart</summary>
    <div class="isi">
      <p class="judul">Warna menunjukkan siapa yang mengerjakan:</p>
      <ul class="warna">
        <li v-for="w in warna" :key="w.kunci" :style="gayaAktor(w.kunci)">
          <span class="contoh" aria-hidden="true" />{{ w.label }}
        </li>
      </ul>
      <p class="judul">Bentuk kotak:</p>
      <ul class="bentuk">
        <li><span class="b oval" aria-hidden="true" />Mulai atau selesai</li>
        <li><span class="b kotak" aria-hidden="true" />Kegiatan</li>
        <li><span class="b ketupat" aria-hidden="true" />Pengecekan: ikuti panah "Ya" atau "Tidak"</li>
        <li><span class="b jajar" aria-hidden="true" />Dokumen atau laporan</li>
        <li><span class="b tabung" aria-hidden="true" />Data di sistem (ERP / database)</li>
      </ul>
    </div>
  </details>
</template>

<style scoped>
.legenda {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
}
summary {
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 600;
  min-height: 44px;
}
.isi {
  padding: 0 16px 14px;
}
.judul {
  margin: 8px 0 6px !important;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}
ul {
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
}
li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 !important;
  font-size: 0.92rem;
}
.contoh {
  width: 18px;
  height: 14px;
  border-radius: 4px;
  background: var(--isi);
  border: 2px solid var(--garis);
}
:global(.dark) .warna li {
  --isi: var(--isi-gelap);
  --garis: var(--garis-gelap);
}
.b {
  display: inline-block;
  width: 26px;
  height: 14px;
  border: 2px solid var(--vp-c-text-2);
}
.oval {
  border-radius: 999px;
}
.kotak {
  border-radius: 2px;
}
.ketupat {
  width: 14px;
  height: 14px;
  transform: rotate(45deg);
  margin: 0 6px;
}
.jajar {
  transform: skewX(-20deg);
}
.tabung {
  width: 18px;
  height: 16px;
  border-radius: 50% / 22%;
}
</style>
