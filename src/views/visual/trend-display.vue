<!-- 趋势展示 -->
<template>
  <!-- 使用TabbedContent组件，传入tabs和defaultActive属性 -->
  <TabbedContent :tabs="tabs" :default-active="defaultActive">
    <!-- 使用插槽，将网络质量组件放在first插槽中 -->
    <template #first>
      <networkQualityLine />
    </template>
    <!-- 使用插槽，将业务质量组件放在second插槽中 -->
    <template #second>
      <businessQualityLine />
    </template>
  </TabbedContent>
</template>

<script setup>
// 引入TabbedContent组件
import TabbedContent from '@/components/tabbed-content/main.vue';
// 网络质量
import networkQualityLine from './components/network-quality-line.vue'; // NOSONAR
// 业务质量
import businessQualityLine from './components/business-quality-line.vue'; // NOSONAR
const tabs = [
  { label: '网络质量', name: 'first' },
  { label: '业务质量', name: 'second' },
];
const defaultActive = 'first';
</script>