<script setup lang="ts">
// Menampilkan satu bagian profil perusahaan (mis. visi, misi, kegiatan usaha).
// - terverifikasi     → ditampilkan dengan nomor sumber
// - dokumen-internal  → ditampilkan dengan keterangan asal dokumennya
// - perlu-verifikasi  → TIDAK ditampilkan sebagai fakta; muncul keterangan sopan
import { computed } from 'vue'
import { ambilField, bolehTampil } from './profil'
import RujukanSumber from './RujukanSumber.vue'

const props = defineProps<{ kunci: string; bentuk?: 'daftar' | 'paragraf' | 'label' }>()

const f = computed(() => ambilField(props.kunci))
const tampil = computed(() => bolehTampil(f.value))
const daftar = computed(() => (Array.isArray(f.value?.nilai) ? (f.value!.nilai as string[]) : []))
</script>

<template>
  <div v-if="f" class="bagian">
    <template v-if="tampil">
      <ul v-if="Array.isArray(f.nilai) && bentuk === 'label'" class="label-nilai">
        <li v-for="n in daftar" :key="n">{{ n }}</li>
      </ul>
      <ul v-else-if="Array.isArray(f.nilai)">
        <li v-for="n in daftar" :key="n">{{ n }}</li>
      </ul>
      <p v-else>{{ f.nilai }}</p>
      <p class="meta">
        <span v-if="f.status === 'dokumen-internal'">Sumber: dokumen internal</span>
        <span v-else>Sumber</span>
        <RujukanSumber :ids="f.sumber" />
      </p>
      <p v-if="f.catatan" class="catatan">{{ f.catatan }}</p>
    </template>
    <div v-else class="belum" role="note">
      <p>
        <strong>{{ f.label }}</strong> belum ditampilkan karena belum ditemukan sumber resmi yang bisa diverifikasi.
        Informasi ini sedang dikonfirmasi ke pembimbing.
      </p>
    </div>
  </div>
</template>

<style scoped>
.bagian {
  margin: 12px 0 20px;
}
.meta {
  margin: 4px 0 0 !important;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.catatan {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 6px !important;
}
.belum {
  padding: 12px 16px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
}
.belum p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
.label-nilai {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 !important;
  list-style: none;
}
.label-nilai li {
  margin: 0 !important;
  padding: 6px 14px;
  border: 1.5px solid var(--bpi-ink);
  border-radius: 3px;
  font-family: var(--bpi-font-display);
  font-weight: 600;
  font-size: 1.05rem;
}
</style>
