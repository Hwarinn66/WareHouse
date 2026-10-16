// Warna untuk setiap pihak (aktor) di flowchart dan daftar langkah alur kerja.
// Dipakai bersama oleh MermaidDiagram (classDef), LangkahAlur, dan LegendaAlur
// agar warna di diagram dan di daftar langkah selalu sama.
// Nada warnanya diselaraskan dengan warna utama di custom.css (navy dan oranye).

export interface Warna {
  isi: string // warna latar kotak
  garis: string // warna garis tepi
  teks: string // warna tulisan
}

type Palet = Record<string, { terang: Warna; gelap: Warna }>

export const WARNA_ALUR: Palet = {
  vendor: {
    terang: { isi: '#fdf0e8', garis: '#d24600', teks: '#7a2e05' },
    gelap: { isi: '#2f2219', garis: '#d9a07a', teks: '#f3dccb' }
  },
  staff: {
    terang: { isi: '#eef1f7', garis: '#1e3564', teks: '#1e3564' },
    gelap: { isi: '#1b2a40', garis: '#a3b9d3', teks: '#dfe7f1' }
  },
  sistem: {
    terang: { isi: '#ece8f2', garis: '#6a5a8c', teks: '#33284d' },
    gelap: { isi: '#251f36', garis: '#b3a6d4', teks: '#e6e0f3' }
  },
  divisi: {
    terang: { isi: '#e6ebe2', garis: '#5c7560', teks: '#2f4433' },
    gelap: { isi: '#1b2b28', garis: '#9db3a0', teks: '#dbe7dc' }
  },
  dokumen: {
    terang: { isi: '#eceef0', garis: '#6b7280', teks: '#1f2933' },
    gelap: { isi: '#1f2a38', garis: '#9aa3b0', teks: '#e4e8ec' }
  },
  cek: {
    terang: { isi: '#f6ecd2', garis: '#a8822f', teks: '#4a3810' },
    gelap: { isi: '#33291a', garis: '#dcb76a', teks: '#f4e4bd' }
  },
  tolak: {
    terang: { isi: '#f6e4df', garis: '#9a3b32', teks: '#5a1f19' },
    gelap: { isi: '#3a1f1d', garis: '#e8a79c', teks: '#f6d6d0' }
  },
  selesai: {
    terang: { isi: '#1e3564', garis: '#1e3564', teks: '#ffffff' },
    gelap: { isi: '#f4f1de', garis: '#f4f1de', teks: '#0d1b2a' }
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
