// Pembaca data profil perusahaan (docs/data/company-profile.json).
import profil from '../../../data/company-profile.json'
import dataSumber from '../../../data/sumber.json'

export type StatusProfil = 'terverifikasi' | 'dokumen-internal' | 'perlu-verifikasi'

export interface FieldProfil {
  label: string
  nilai: string | string[] | null
  status: StatusProfil
  sumber: string[]
  catatan?: string
}

export function ambilField(kunci: string): FieldProfil | null {
  const f = (profil as Record<string, unknown>)[kunci]
  if (!f || typeof f !== 'object') return null
  return f as FieldProfil
}

/** Field boleh ditampilkan sebagai fakta jika statusnya bukan 'perlu-verifikasi' dan nilainya terisi. */
export function bolehTampil(f: FieldProfil | null): boolean {
  if (!f || f.status === 'perlu-verifikasi') return false
  if (f.nilai == null) return false
  if (Array.isArray(f.nilai)) return f.nilai.length > 0
  return String(f.nilai).trim().length > 0
}

/** Nomor urut sumber sesuai urutan di sumber.json, untuk penanda [1], [2], ... */
export function infoSumber(id: string) {
  const i = dataSumber.sumber.findIndex((s) => s.id === id)
  const s = dataSumber.sumber[i]
  return { id, nomor: i + 1, judul: s?.judul ?? id, internal: s?.jenis === 'internal' }
}
