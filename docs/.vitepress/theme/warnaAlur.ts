// Warna untuk setiap pihak (aktor) di flowchart dan daftar langkah alur kerja.
// Dipakai bersama oleh MermaidDiagram (classDef), LangkahAlur, dan LegendaAlur
// agar warna di diagram dan di daftar langkah selalu sama.

export interface Warna {
  isi: string // warna latar kotak
  garis: string // warna garis tepi
  teks: string // warna tulisan
}

type Palet = Record<string, { terang: Warna; gelap: Warna }>

export const WARNA_ALUR: Palet = {
  vendor: {
    terang: { isi: '#fff1e6', garis: '#c2560c', teks: '#6f2c08' },
    gelap: { isi: '#3a2416', garis: '#f59a52', teks: '#fde2c8' }
  },
  staff: {
    terang: { isi: '#e8f1fc', garis: '#1f5fa8', teks: '#123a66' },
    gelap: { isi: '#172b42', garis: '#7fb2ec', teks: '#d8e8fb' }
  },
  sistem: {
    terang: { isi: '#f1ebfb', garis: '#6b48b5', teks: '#36206b' },
    gelap: { isi: '#2a2142', garis: '#b59ded', teks: '#e8defb' }
  },
  divisi: {
    terang: { isi: '#e5f5ec', garis: '#1f7a4a', teks: '#124a2c' },
    gelap: { isi: '#16301f', garis: '#6cc795', teks: '#d4f1df' }
  },
  dokumen: {
    terang: { isi: '#eef1f5', garis: '#56636f', teks: '#1f2933' },
    gelap: { isi: '#222a33', garis: '#9aa6b2', teks: '#e4e8ec' }
  },
  cek: {
    terang: { isi: '#fff7d6', garis: '#b7860b', teks: '#4d3900' },
    gelap: { isi: '#3a2f0c', garis: '#e5b93b', teks: '#f7e6ad' }
  },
  tolak: {
    terang: { isi: '#fdeceb', garis: '#b83a30', teks: '#6d1d17' },
    gelap: { isi: '#3a1a17', garis: '#f0897d', teks: '#f9d5d0' }
  },
  selesai: {
    terang: { isi: '#1b2a3a', garis: '#1b2a3a', teks: '#ffffff' },
    gelap: { isi: '#e6ebf0', garis: '#e6ebf0', teks: '#141a21' }
  }
}

/** Baris classDef Mermaid untuk semua aktor, sesuai mode terang/gelap. */
export function classDefMermaid(gelap: boolean): string {
  return Object.entries(WARNA_ALUR)
    .map(([nama, w]) => {
      const c = gelap ? w.gelap : w.terang
      return `classDef ${nama} fill:${c.isi},stroke:${c.garis},color:${c.teks},stroke-width:1.5px`
    })
    .join('\n')
}

/** Variabel CSS untuk satu aktor (dipakai sebagai style inline). */
export function gayaAktor(nama: string) {
  const w = WARNA_ALUR[nama] ?? WARNA_ALUR.dokumen
  return {
    '--isi': w.terang.isi,
    '--garis': w.terang.garis,
    '--teks': w.terang.teks,
    '--isi-gelap': w.gelap.isi,
    '--garis-gelap': w.gelap.garis,
    '--teks-gelap': w.gelap.teks
  } as Record<string, string>
}
