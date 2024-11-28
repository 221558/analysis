<template>
  <TabbedContent :tabs="tabs" :default-active="defaultActive">
    <template #first>
      <networkQualityBar />
    </template>
    <template #second>
      <businessQualityBar />
    </template>
  </TabbedContent>
</template>

<script setup>
import TabbedContent from '@/components/tabbed-content/main.vue';
// 网络质量
import networkQualityBar from './components/network-quality-bar.vue'; // NOSONAR
// 业务质量
import businessQualityBar from './components/business-quality-bar.vue'; // NOSONAR
const tabs = [
  { label: '网络质量', name: 'first' },
  { label: '业务质量', name: 'second' },
];
const defaultActive = 'first';
</script>
