import { defineConfig, type DefaultTheme } from 'vitepress'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import navigasi from '../data/navigasi.json'
import { tambahanIndeksPencarian } from './search-extra'

const root = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(resolve(root, '../../package.json'), 'utf-8'))

// Jalur dasar (base). Untuk hosting di subfolder, mis. GitHub Pages:
//   BASE_PATH=/nama-repo/ npm run build
const base = process.env.BASE_PATH || '/'

// Logo resmi perusahaan: taruh file di docs/public/images/ dengan salah satu
// nama di bawah. Jika tidak ada, header hanya menampilkan judul teks.
const kandidatLogo = ['logo-perusahaan.svg', 'logo-perusahaan.png', 'logo-perusahaan.webp']
const fileLogo = kandidatLogo.find((f) => existsSync(resolve(root, '../public/images', f)))

export default defineConfig({
  lang: 'id-ID',
  title: 'Handbook Gudang Teknik',
  titleTemplate: ':title · Handbook Gudang Teknik',
  description:
    'Division Handbook Gudang Teknik (Warehouse) PT Bakrie Pipe Industries — panduan belajar mandiri untuk peserta magang dan PKL.',
  base,
  cleanUrls: true,
  lastUpdated: false,

  // Gagal build jika ada tautan internal yang rusak.
  ignoreDeadLinks: false,

  // Folder & file yang bukan halaman website.
  srcExclude: ['data/**', '**/README.md', '**/_*.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}images/favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#1b4b7a' }],
    // Handbook internal: minta mesin pencari tidak mengindeks selama belum disetujui publik.
    ['meta', { name: 'robots', content: 'noindex, nofollow' }]
  ],

  markdown: {
    lineNumbers: false,
    container: {
      tipLabel: 'Tips',
      warningLabel: 'Perhatian',
      dangerLabel: 'Bahaya',
      infoLabel: 'Info',
      detailsLabel: 'Detail'
    },
    config(md) {
      // Daftar periksa: item list yang diawali "[ ] " ditampilkan dengan kotak centang.
      md.core.ruler.after('inline', 'daftar-periksa', (state) => {
        const t = state.tokens
        for (let i = 2; i < t.length; i++) {
          if (t[i].type !== 'inline') continue
          if (t[i - 1].type !== 'paragraph_open' || t[i - 2].type !== 'list_item_open') continue
          const first = t[i].children?.[0]
          if (!first || first.type !== 'text' || !/^\[ \]\s+/.test(first.content)) continue
          first.content = first.content.replace(/^\[ \]\s+/, '')
          for (let j = i - 2; j >= 0; j--) {
            if (t[j].type === 'bullet_list_open' && t[j].level === t[i - 2].level - 1) {
              if (!(t[j].attrGet('class') || '').includes('daftar-periksa')) t[j].attrJoin('class', 'daftar-periksa')
              break
            }
          }
        }
      })

      // Tabel yang semua judul kolomnya kosong (tabel "label | isi") diberi kelas
      // agar baris judul kosong tidak ditampilkan.
      // Semua tabel juga diberi label kolom (data-label) agar di layar kecil
      // bisa ditampilkan bertumpuk seperti kartu.
      md.core.ruler.push('tabel-responsif', (state) => {
        const t = state.tokens
        for (let i = 0; i < t.length; i++) {
          if (t[i].type !== 'table_open') continue
          const judul: string[] = []
          let j = i + 1
          for (; j < t.length && t[j].type !== 'thead_close'; j++) {
            if (t[j].type === 'inline') judul.push(t[j].content.replace(/[*_`]/g, '').trim())
          }
          t[i].attrJoin('class', 'tabel-tumpuk')
          if (judul.every((x) => !x)) t[i].attrJoin('class', 'tanpa-kepala')
          t[i].attrSet('tabindex', '0')
          let kolom = 0
          for (; j < t.length && t[j].type !== 'table_close'; j++) {
            if (t[j].type === 'tr_open') kolom = 0
            if (t[j].type === 'td_open') {
              if (judul[kolom]) t[j].attrSet('data-label', judul[kolom])
              kolom++
            }
          }
        }
      })

      // VitePress menulis <table tabindex="0"> tanpa atribut lain; tampilkan juga kelasnya.
      md.renderer.rules.table_open = (tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options)

      // Blok ```mermaid diubah menjadi komponen diagram interaktif.
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          return `<MermaidDiagram code="${encodeURIComponent(token.content)}" />`
        }
        return fence(tokens, idx, options, env, self)
      }
    }
  },

  themeConfig: {
    logo: fileLogo ? { src: `/images/${fileLogo}`, alt: 'Logo PT Bakrie Pipe Industries' } : undefined,
    siteTitle: 'Handbook Gudang Teknik',

    nav: [
      ...(navigasi.nav as DefaultTheme.NavItem[]),
      {
        text: `v${pkg.version}`,
        items: [
          { text: 'Riwayat versi', link: '/tentang-handbook/riwayat-versi' },
          { text: 'Checklist publikasi', link: '/tentang-handbook/checklist-publikasi' }
        ]
      }
    ],

    sidebar: navigasi.sidebar as DefaultTheme.SidebarItem[],

    outline: { level: [2, 3], label: 'Di halaman ini' },
    docFooter: { prev: 'Sebelumnya', next: 'Berikutnya' },
    darkModeSwitchLabel: 'Tampilan',
    lightModeSwitchTitle: 'Ganti ke mode terang',
    darkModeSwitchTitle: 'Ganti ke mode gelap',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Kembali ke atas',
    langMenuLabel: 'Bahasa',
    externalLinkIcon: true,

    notFound: {
      title: 'Halaman tidak ditemukan',
      quote: 'Alamat yang Anda buka tidak ada di handbook ini.',
      linkLabel: 'Kembali ke beranda',
      linkText: 'Kembali ke beranda'
    },

    footer: {
      message: 'Dokumen internal Gudang Teknik · PT Bakrie Pipe Industries. Status: draf, belum disetujui untuk publikasi umum.',
      copyright: `Handbook v${pkg.version}`
    },

    search: {
      provider: 'local',
      options: {
        detailedView: 'auto',
        miniSearch: {
          searchOptions: { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
        },
        translations: {
          button: { buttonText: 'Cari dokumentasi', buttonAriaLabel: 'Cari dokumentasi' },
          modal: {
            displayDetails: 'Tampilkan cuplikan',
            resetButtonTitle: 'Hapus pencarian',
            backButtonTitle: 'Tutup pencarian',
            noResultsText: 'Tidak ada hasil. Coba kata lain, misalnya bearing, FIFO, opname, atau ROP. Kata yang dicari:',
            footer: {
              selectText: 'pilih',
              selectKeyAriaLabel: 'enter',
              navigateText: 'pindah',
              navigateUpKeyAriaLabel: 'panah atas',
              navigateDownKeyAriaLabel: 'panah bawah',
              closeText: 'tutup',
              closeKeyAriaLabel: 'escape'
            }
          }
        },
        // Tambahkan isi dari file data (FAQ, profil perusahaan, material)
        // dan kata kunci halaman ke indeks pencarian.
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          return html + tambahanIndeksPencarian(env.relativePath, env.frontmatter ?? {}, md)
        }
      }
    }
  },

  vite: {
    build: { chunkSizeWarningLimit: 1500 }
  }
})
