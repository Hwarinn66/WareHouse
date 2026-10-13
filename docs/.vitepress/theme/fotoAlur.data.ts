// Data loader: mencari foto alur kerja yang sudah ada di docs/public/images/alur/.
// Hasilnya peta { "barang-masuk-01": "barang-masuk-01.jpg", ... }.
// Komponen LangkahAlur memakai peta ini untuk menampilkan foto, atau placeholder
// jika fotonya belum ada. Dibaca ulang otomatis saat file di folder itu berubah (npm run dev).

declare const data: Record<string, string>
export { data }

export default {
  watch: ['../../public/images/alur/*'],
  load(files: string[]): Record<string, string> {
    const peta: Record<string, string> = {}
    for (const f of files) {
      const nama = f.split(/[\\/]/).pop() ?? ''
      const m = nama.match(/^(.+)\.(jpe?g|png|webp)$/i)
      if (m) peta[m[1].toLowerCase()] = nama
    }
    return peta
  }
}
