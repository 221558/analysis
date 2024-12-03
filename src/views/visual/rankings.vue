<!-- 排名展示 -->
<template>
  <!-- 使用TabbedContent组件，传入tabs和defaultActive属性 -->
  <TabbedContent :tabs="tabs" :default-active="defaultActive">
    <!-- 使用插槽，将网络质量组件放在first插槽中 -->
    <template #first>
      <networkQualityBar />
    </template>
    <!-- 使用插槽，将业务质量组件放在second插槽中 -->
    <template #second>
      <businessQualityBar />
    </template>
  </TabbedContent>
</template>

<script setup>
// 引入TabbedContent组件
import TabbedContent from '@/components/tabbed-content/main.vue';
// 网络质量
import networkQualityBar from './components/network-quality-bar.vue'; // NOSONAR
// 业务质量
import businessQualityBar from './components/business-quality-bar.vue'; // NOSONAR
// 定义一个tabs数组，包含两个对象，每个对象包含label和name属性
const tabs = [
  { label: '网络质量', name: 'first' },
  { label: '业务质量', name: 'second' },
];
// 定义一个默认激活的tab，值为'first'
const defaultActive = 'first';
</script>
