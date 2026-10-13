<script setup lang="ts">
// Layout utama: memakai layout bawaan VitePress lalu menambahkan
// breadcrumb, catatan singkat status halaman, dan halaman 404 khusus.
// (Label kolom tabel untuk tampilan ponsel ditambahkan saat build, lihat config.mts.)
import DefaultTheme from 'vitepress/theme-without-fonts'
import Breadcrumb from './components/Breadcrumb.vue'
import StatusHalaman from './components/StatusHalaman.vue'
import HalamanTidakDitemukan from './components/HalamanTidakDitemukan.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <Breadcrumb />
      <StatusHalaman />
    </template>
    <template #not-found>
      <HalamanTidakDitemukan />
    </template>
  </Layout>
</template>
