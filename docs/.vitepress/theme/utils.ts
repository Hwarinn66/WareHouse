// Fungsi bantu yang dipakai beberapa komponen.

/** Buka kotak pencarian bawaan VitePress, opsional dengan kata kunci awal. */
export function bukaPencarian(kata?: string) {
  if (typeof window === 'undefined') return
  if (kata !== undefined) {
    try {
      sessionStorage.setItem('vitepress:local-search-filter', kata)
    } catch {
      /* sessionStorage bisa tidak tersedia (mode privat); pencarian tetap dibuka */
    }
  }
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))
}

/** Ubah path file Markdown (mis. "divisi/index.md") menjadi tautan ("/divisi/"). */
export function pathKeTautan(relativePath: string): string {
  const p = relativePath.replace(/\.md$/, '')
  if (p === 'index') return '/'
  if (p.endsWith('/index')) return '/' + p.slice(0, -'index'.length)
  return '/' + p
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Markdown sederhana untuk teks dari file JSON (FAQ, dll.):
 * **tebal**, *miring*, `kode`, dan [teks](tautan). HTML mentah tidak diizinkan.
 */
export function markdownSederhana(teks: string, withBase: (p: string) => string): string {
  let html = escapeHtml(teks)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
    const internal = href.startsWith('/')
    const url = internal ? withBase(href) : href
    const ext = internal ? '' : ' target="_blank" rel="noreferrer"'
    return `<a href="${url}"${ext}>${label}</a>`
  })
  return html
}

export function formatTanggal(iso?: string | Date | null): string | null {
  if (!iso) return null
  const d = typeof iso === 'string' ? new Date(iso) : iso
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
