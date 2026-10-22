import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'

// Font disimpan lokal (tidak memanggil layanan eksternal).
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'

import './custom.css'
import './components.css'

import Layout from './Layout.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import Beranda from './components/Beranda.vue'
import FaqList from './components/FaqList.vue'
import ProfilTabel from './components/ProfilTabel.vue'
import ProfilBagian from './components/ProfilBagian.vue'
import DaftarSumber from './components/DaftarSumber.vue'
import DaftarMaterial from './components/DaftarMaterial.vue'
import TombolCari from './components/TombolCari.vue'
import TabelStatus from './components/TabelStatus.vue'
import LangkahAlur from './components/LangkahAlur.vue'
import LegendaAlur from './components/LegendaAlur.vue'
import DaftarKartu from './components/DaftarKartu.vue'
import DaftarFotoAlur from './components/DaftarFotoAlur.vue'
import JadwalMingguan from './components/JadwalMingguan.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Komponen yang bisa dipakai langsung di file Markdown.
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('Beranda', Beranda)
    app.component('FaqList', FaqList)
    app.component('ProfilTabel', ProfilTabel)
    app.component('ProfilBagian', ProfilBagian)
    app.component('DaftarSumber', DaftarSumber)
    app.component('DaftarMaterial', DaftarMaterial)
    app.component('TombolCari', TombolCari)
    app.component('TabelStatus', TabelStatus)
    app.component('LangkahAlur', LangkahAlur)
    app.component('LegendaAlur', LegendaAlur)
    app.component('DaftarKartu', DaftarKartu)
    app.component('DaftarFotoAlur', DaftarFotoAlur)
    app.component('JadwalMingguan', JadwalMingguan)
  }
} satisfies Theme
