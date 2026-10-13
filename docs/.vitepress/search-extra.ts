// Menambahkan isi file data (JSON) ke indeks pencarian lokal.
// Halaman seperti FAQ dan Profil Perusahaan dirender oleh komponen Vue dari
// file JSON, sehingga isinya perlu "disuntikkan" agar bisa ditemukan lewat pencarian.
import faq from '../data/faq.json'
import profil from '../data/company-profile.json'
import material from '../data/material.json'
import alur from '../data/alur.json'

type MarkdownIt = { render: (src: string, env?: any) => string; utils: { escapeHtml: (s: string) => string } }

const judul = (level: number, id: string, teks: string, esc: (s: string) => string) =>
  `<h${level} id="${id}">${esc(teks)} <a class="header-anchor" href="#${id}" aria-hidden="true">#</a></h${level}>`

function bagianFaq(md: MarkdownIt): string {
  const esc = md.utils.escapeHtml
  let html = ''
  for (const kat of faq.kategori) {
    // Hanya pertanyaan yang sudah terjawab (yang lain tidak tampil di halaman FAQ).
    const terjawab = kat.pertanyaan.filter((q) => q.status === 'terjawab' && q.jawab?.trim())
    if (!terjawab.length) continue
    html += judul(2, kat.id, kat.nama, esc) + `<p>${esc(kat.nama)}</p>`
    for (const q of terjawab) {
      html += judul(3, q.id, q.tanya, esc) + md.render(q.jawab)
    }
  }
  return html
}

function bagianProfil(md: MarkdownIt): string {
  const esc = md.utils.escapeHtml
  let html = ''
  for (const [kunci, isi] of Object.entries(profil)) {
    if (kunci.startsWith('_') || typeof isi !== 'object' || isi === null) continue
    const f = isi as { label: string; nilai: unknown; status: string }
    if (f.status === 'perlu-verifikasi' || f.nilai == null) continue
    const nilai = Array.isArray(f.nilai) ? f.nilai.join(' ') : String(f.nilai)
    if (!nilai.trim()) continue
    html += `<p>${esc(f.label)}: ${esc(nilai)}</p>`
  }
  return html
}

function bagianMaterial(md: MarkdownIt): string {
  const esc = md.utils.escapeHtml
  let html = ''
  for (const k of material.kelompok) {
    html += `<p>${esc(k.nama)} (${esc(k.arti)}): ${esc(k.contoh.join(', '))}</p>`
  }
  return html
}

function bagianAlur(kunci: 'barang-masuk' | 'barang-keluar', md: MarkdownIt): string {
  const esc = md.utils.escapeHtml
  return (alur[kunci] as any[])
    .map((l, i) => {
      const cek = l.cek ? ` ${l.cek.tanya} Ya: ${l.cek.ya} Tidak: ${l.cek.tidak}` : ''
      return `<p>${i + 1}. ${esc(l.judul)}. ${esc(l.teks)}${esc(cek)}</p>`
    })
    .join('')
}

export function tambahanIndeksPencarian(
  relativePath: string,
  frontmatter: Record<string, any>,
  md: MarkdownIt
): string {
  let tambahan = ''
  if (relativePath === 'faq.md') tambahan += bagianFaq(md)
  if (relativePath === 'perusahaan/index.md') tambahan += bagianProfil(md)
  if (relativePath === 'divisi/jenis-material.md') tambahan += bagianMaterial(md)
  if (relativePath === 'alur-kerja/barang-masuk.md') tambahan += bagianAlur('barang-masuk', md)
  if (relativePath === 'alur-kerja/barang-keluar.md') tambahan += bagianAlur('barang-keluar', md)

  const kk = frontmatter.kata_kunci
  if (Array.isArray(kk) && kk.length) {
    tambahan += `<p>Kata kunci: ${md.utils.escapeHtml(kk.join(', '))}</p>`
  }
  return tambahan
}
