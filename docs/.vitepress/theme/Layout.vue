<script setup lang="ts">
// Layout utama: memakai layout bawaan VitePress lalu menambahkan
// breadcrumb, catatan singkat status halaman, info baca, bilah progres baca,
// tombol kembali ke atas, dan halaman 404 khusus.
// (Label kolom tabel untuk tampilan ponsel ditambahkan saat build, lihat config.mts.)
import DefaultTheme from 'vitepress/theme-without-fonts'
import Breadcrumb from './components/Breadcrumb.vue'
import StatusHalaman from './components/StatusHalaman.vue'
import InfoBaca from './components/InfoBaca.vue'
import BilahBaca from './components/BilahBaca.vue'
import TombolAtas from './components/TombolAtas.vue'
import HalamanTidakDitemukan from './components/HalamanTidakDitemukan.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <BilahBaca />
    </template>
    <template #layout-bottom>
      <TombolAtas />
    </template>
    <template #doc-before>
      <Breadcrumb />
      <StatusHalaman />
      <InfoBaca />
    </template>
    <template #not-found>
      <HalamanTidakDitemukan />
    </template>
  </Layout>
</template>
