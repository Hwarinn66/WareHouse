// Menambahkan isi file data (JSON) ke indeks pencarian lokal.
// Halaman seperti FAQ dan Profil Perusahaan dirender oleh komponen Vue dari
// file JSON, sehingga isinya perlu "disuntikkan" agar bisa ditemukan lewat pencarian.
import faq from '../data/faq.json'
import profil from '../data/company-profile.json'
import material from '../data/material.json'

type MarkdownIt = { render: (src: string, env?: any) => string; utils: { escapeHtml: (s: string) => string } }

const judul = (level: number, id: string, teks: string, esc: (s: string) => string) =>
  `<h${level} id="${id}">${esc(teks)} <a class="header-anchor" href="#${id}" aria-hidden="true">#</a></h${level}>`

function bagianFaq(md: MarkdownIt): string {
  const esc = md.utils.escapeHtml
  let html = ''
  for (const kat of faq.kategori) {
    html += judul(2, kat.id, kat.nama, esc) + `<p>${esc(kat.nama)}</p>`
    for (const q of kat.pertanyaan) {
      const jawab = q.jawab?.trim()
        ? md.render(q.jawab)
        : '<p>Jawaban resmi sedang dilengkapi pembimbing.</p>'
      html += judul(3, q.id, q.tanya, esc) + jawab
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

export function tambahanIndeksPencarian(
  relativePath: string,
  frontmatter: Record<string, any>,
  md: MarkdownIt
): string {
  let tambahan = ''
  if (relativePath === 'faq.md') tambahan += bagianFaq(md)
  if (relativePath === 'perusahaan/index.md') tambahan += bagianProfil(md)
  if (relativePath === 'divisi/jenis-material.md') tambahan += bagianMaterial(md)

  const kk = frontmatter.kata_kunci
  if (Array.isArray(kk) && kk.length) {
    tambahan += `<p>Kata kunci: ${md.utils.escapeHtml(kk.join(', '))}</p>`
  }
  return tambahan
}
