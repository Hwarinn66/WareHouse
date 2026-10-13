#!/usr/bin/env node
// Pemeriksaan sebelum publikasi.
//
//   npm run cek-publikasi          → laporan saja (tidak gagal)
//   npm run cek-publikasi:ketat    → gagal (exit 1) jika ada masalah
//
// Yang diperiksa:
//   1. Status setiap halaman Markdown (hanya 'disetujui' / 'terverifikasi' dianggap siap).
//   2. File di docs/public/ yang jenisnya berisiko (dokumen kantor, arsip, data mentah).
//   3. Pola yang mirip kata sandi / token / kunci API di seluruh isi.
//   4. Isi folder hasil build (docs/.vitepress/dist) jika sudah ada.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const ketat = process.argv.includes('--ketat')
const akar = fileURLToPath(new URL('..', import.meta.url))
const docs = join(akar, 'docs')
const publik = join(docs, 'public')
const dist = join(docs, '.vitepress', 'dist')

const STATUS_SIAP = new Set(['disetujui', 'terverifikasi'])
const EKSTENSI_BERISIKO = new Set([
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.xlsm', '.csv', '.ppt', '.pptx',
  '.zip', '.rar', '.7z', '.sql', '.db', '.sqlite', '.env', '.key', '.pem', '.json', '.txt'
])
const NAMA_BERISIKO = /(rahasia|confidential|internal|password|sandi|gaji|salary|karyawan|pelanggan|customer)/i
const POLA_RAHASIA = [
  /(api[_-]?key|secret|token|password|passwd|kata[_ ]?sandi)\s*[:=]\s*['"][^'"]{6,}['"]/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/
]

function jelajah(dir, abaikan = []) {
  if (!existsSync(dir)) return []
  const hasil = []
  for (const nama of readdirSync(dir)) {
    const p = join(dir, nama)
    if (abaikan.some((a) => p.includes(a))) continue
    const st = statSync(p)
    if (st.isDirectory()) hasil.push(...jelajah(p, abaikan))
    else hasil.push(p)
  }
  return hasil
}

let masalah = 0
const garis = (t = '') => console.log(t)

// ---------- 1. Status halaman ----------
garis('1. STATUS HALAMAN')
const md = jelajah(docs, ['node_modules', `${join('.vitepress', 'dist')}`, `${join('.vitepress', 'cache')}`]).filter(
  (f) => f.endsWith('.md')
)
const belumSiap = []
for (const f of md.sort()) {
  const { data } = matter(readFileSync(f, 'utf-8'))
  const status = data.status ?? '(tidak ada)'
  const siap = STATUS_SIAP.has(status)
  if (!siap) belumSiap.push(f)
  garis(`   ${siap ? '✓' : '•'} ${String(status).padEnd(17)} ${relative(docs, f)}`)
}
garis(`   → ${md.length - belumSiap.length} dari ${md.length} halaman siap publikasi.`)
if (belumSiap.length) masalah++

// ---------- 2. File di folder public ----------
garis('\n2. FILE DI docs/public (akan ikut ter-deploy dan bisa diakses langsung)')
const filePublik = jelajah(publik)
for (const f of filePublik) {
  const rel = relative(publik, f)
  const kb = (statSync(f).size / 1024).toFixed(0)
  const peringatan = []
  if (EKSTENSI_BERISIKO.has(extname(f).toLowerCase())) peringatan.push('jenis file perlu dicek')
  if (NAMA_BERISIKO.test(rel)) peringatan.push('nama file mencurigakan')
  if (statSync(f).size > 1024 * 1024) peringatan.push('ukuran > 1 MB')
  if (peringatan.length) masalah++
  garis(`   ${peringatan.length ? '!' : ' '} /${rel} (${kb} KB)${peringatan.length ? '  ← ' + peringatan.join(', ') : ''}`)
}
if (!filePublik.length) garis('   (kosong)')

// ---------- 3. Pola rahasia ----------
garis('\n3. POLA KATA SANDI / TOKEN')
const semuaTeks = jelajah(akar, ['node_modules', join('.vitepress', 'dist'), join('.vitepress', 'cache'), '.git']).filter((f) =>
  ['.md', '.json', '.ts', '.mts', '.js', '.mjs', '.vue', '.css', '.env', '.yml', '.yaml', '.txt'].includes(
    extname(f).toLowerCase()
  ) && !f.endsWith('package-lock.json') && !f.endsWith('cek-publikasi.mjs')
)
let temuan = 0
for (const f of semuaTeks) {
  const isi = readFileSync(f, 'utf-8')
  for (const pola of POLA_RAHASIA) {
    if (pola.test(isi)) {
      temuan++
      garis(`   ! ${relative(akar, f)} cocok dengan pola ${pola}`)
    }
  }
}
if (temuan) masalah++
else garis('   ✓ Tidak ditemukan.')

// ---------- 4. Hasil build ----------
garis('\n4. HASIL BUILD (docs/.vitepress/dist)')
if (existsSync(dist)) {
  const fileDist = jelajah(dist)
  const perJenis = {}
  for (const f of fileDist) {
    const e = extname(f).toLowerCase() || '(tanpa ekstensi)'
    perJenis[e] = (perJenis[e] ?? 0) + 1
  }
  garis(`   ${fileDist.length} file: ` + Object.entries(perJenis).map(([e, n]) => `${e} ${n}`).join(', '))
  const asing = fileDist.filter((f) => EKSTENSI_BERISIKO.has(extname(f).toLowerCase()) && !f.endsWith('hashmap.json'))
  for (const f of asing) garis(`   ! /${relative(dist, f)} ← periksa apakah boleh dipublikasikan`)
  if (asing.length) masalah++
} else {
  garis('   Belum ada. Jalankan "npm run build" lebih dulu untuk memeriksa hasil build.')
}

// ---------- Ringkasan ----------
garis('\nRINGKASAN')
if (masalah === 0) {
  garis('   ✓ Tidak ada temuan. Tetap lengkapi checklist persetujuan di /tentang-handbook/checklist-publikasi.')
} else {
  garis(`   ${masalah} kelompok temuan perlu ditinjau sebelum publikasi.`)
  garis('   Lihat juga: /tentang-handbook/checklist-publikasi')
}
if (ketat && masalah > 0) process.exit(1)
