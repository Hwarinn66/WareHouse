<script setup lang="ts">
// Ikon garis sederhana (inline SVG, tanpa library luar).
// Pemakaian: <Ikon nama="gudang" />
const props = withDefaults(defineProps<{ nama: string; ukuran?: number }>(), { ukuran: 24 })

const PATH: Record<string, string> = {
  gudang: 'M3 21V9l9-6 9 6v12M7 21v-8h10v8M7 17h10',
  masuk: 'M12 3v11m0 0l-4-4m4 4l4-4M4 15v5h16v-5',
  keluar: 'M12 14V3m0 0L8 7m4-4l4 4M4 15v5h16v-5',
  kotak: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
  kode: 'M3 12V4h8l10 10-8 8L3 12zM7.5 7.5h.01',
  grafik: 'M4 20V11M10 20V5M16 20v-6M2 20h20',
  daftar: 'M10 6h10M10 12h10M10 18h10M4 6l1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17',
  opname: 'M9 3h6v3H9zM7 4.5H5V21h14V4.5h-2M9 14l2 2 4-4',
  denah: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15',
  perisai: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  tanya: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.2a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.6v.6M12 17h.01',
  buku: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5',
  gedung: 'M4 21V5l8-2v18M12 9l8 2v10M7.5 8h.01M7.5 12h.01M7.5 16h.01M16 14h.01M16 18h.01M2 21h20',
  alur: 'M4 3h7v5H4zM13 16h7v5h-7zM7.5 8v4h9v4',
  latihan: 'M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4',
  peta: 'M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  kalender: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2',
  rapat: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 11a2.5 2.5 0 1 0 0-5M17.5 14.5A5 5 0 0 1 21 20',
  sapu: 'M20 4l-7.5 7.5M9 10.5l4.5 4.5M4 20c.8-4 2.6-7 5-9.5l4.5 4.5C11 17.4 8 19.2 4 20zM7.5 16.5 5.5 19',
  jam: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  kanan: 'M5 12h14M13 6l6 6-6 6'
}
</script>

<template>
  <svg
    class="ikon"
    :width="props.ukuran"
    :height="props.ukuran"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="PATH[props.nama] ?? PATH.buku" />
  </svg>
</template>
