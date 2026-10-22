// Data loader: mencari foto kegiatan rutin yang sudah ada di docs/public/images/kegiatan/.
// Hasilnya peta { "meeting-rabu-1": "meeting-rabu-1.jpg", ... }.
// Komponen JadwalMingguan memakai peta ini (lewat FotoSlot) untuk menampilkan foto, atau
// placeholder jika fotonya belum ada. Dibaca ulang otomatis saat file di folder itu berubah (npm run dev).

declare const data: Record<string, string>
export { data }

export default {
  watch: ['../../public/images/kegiatan/*'],
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
