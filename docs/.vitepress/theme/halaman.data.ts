// Data loader VitePress: membaca frontmatter semua halaman saat build,
// dipakai komponen TabelStatus untuk daftar SOP/tutorial dan rekap status.
import { createContentLoader } from 'vitepress'

export interface InfoHalaman {
  url: string
  judul: string
  status: string | null
  kategori: string | null
  nomorDokumen: string | null
  versi: string | null
  tingkat: string | null
  deskripsi: string | null
}

declare const data: InfoHalaman[]
export { data }

export default createContentLoader('**/*.md', {
  transform(raw): InfoHalaman[] {
    return raw
      .map(({ url, frontmatter: fm }) => ({
        url,
        judul: fm.title ?? fm.judul ?? url,
        status: fm.status ?? null,
        kategori: fm.kategori ?? null,
        nomorDokumen: fm.nomor_dokumen ?? null,
        versi: fm.versi != null ? String(fm.versi) : null,
        tingkat: fm.tingkat ?? null,
        deskripsi: fm.description ?? null
      }))
      .sort((a, b) => a.url.localeCompare(b.url))
  }
})
