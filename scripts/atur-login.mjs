// Mengatur akun login tampilan handbook (docs/data/login.json).
//
// Pemakaian:
//   npm run atur-login -- <nama> <sandi>     tambah akun, atau ganti sandi akun yang sudah ada
//   npm run atur-login -- --hapus <nama>     hapus akun
//   npm run atur-login                        lihat daftar akun
//
// Kata sandi tidak disimpan apa adanya, hanya hash SHA-256 dari "garam:nama:sandi".
// Ingat: ini login TAMPILAN. Website tetap statis, jadi file di dalamnya (termasuk
// gambar dan file JavaScript) masih bisa dibuka langsung oleh orang yang tahu alamatnya.

import { createHash, randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const FILE = resolve(dirname(fileURLToPath(import.meta.url)), '../docs/data/login.json')

const data = existsSync(FILE)
  ? JSON.parse(readFileSync(FILE, 'utf-8'))
  : {
      _catatan: [
        'Akun login tampilan handbook. Jangan diedit manual: pakai "npm run atur-login".',
        'hash = SHA-256 dari "garam:nama:sandi" (nama huruf kecil). Kata sandi aslinya tidak disimpan.',
        'ingatHari = berapa hari browser mengingat login sebelum diminta masuk lagi.',
        'Ini hanya pengunci tampilan: file website tetap bisa dibuka langsung lewat alamatnya.'
      ],
      garam: randomBytes(12).toString('hex'),
      ingatHari: 7,
      akun: []
    }

const hash = (nama, sandi) => createHash('sha256').update(`${data.garam}:${nama}:${sandi}`).digest('hex')
const simpan = () => writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n')

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log(data.akun.length ? 'Akun terdaftar:\n' + data.akun.map((a) => `  - ${a.username}`).join('\n') : 'Belum ada akun.')
  console.log('\nTambah atau ganti sandi:  npm run atur-login -- <nama> <sandi>')
  console.log('Hapus akun:               npm run atur-login -- --hapus <nama>')
  process.exit(0)
}

if (args[0] === '--hapus') {
  const nama = (args[1] ?? '').trim().toLowerCase()
  const sebelum = data.akun.length
  data.akun = data.akun.filter((a) => a.username !== nama)
  if (data.akun.length === sebelum) {
    console.error(`Akun "${nama}" tidak ditemukan.`)
    process.exit(1)
  }
  if (data.akun.length === 0) console.warn('Peringatan: tidak ada akun tersisa, jadi tidak ada yang bisa masuk.')
  simpan()
  console.log(`Akun "${nama}" dihapus.`)
  process.exit(0)
}

const [namaMentah, sandi] = args
const nama = (namaMentah ?? '').trim().toLowerCase()
if (!nama || !sandi) {
  console.error('Pemakaian: npm run atur-login -- <nama> <sandi>')
  process.exit(1)
}
if (sandi.length < 8) {
  console.error('Kata sandi minimal 8 karakter.')
  process.exit(1)
}

const ada = data.akun.find((a) => a.username === nama)
if (ada) ada.hash = hash(nama, sandi)
else data.akun.push({ username: nama, hash: hash(nama, sandi) })
simpan()
console.log(`${ada ? 'Kata sandi diganti' : 'Akun ditambahkan'}: ${nama}`)
console.log('Jalankan ulang "npm run dev" atau build, lalu commit dan push agar berlaku di website.')
