<!--
 * @Author: 韩鹏涛 sj-hpt@dimpt.com
 * @Date: 2024-11-27 09:42:02
 * @LastEditors: 韩鹏涛 sj-hpt@dimpt.com
 * @LastEditTime: 2024-11-28 17:30:50
 * @FilePath: /analysis-system-frontend/src/views/visual/trend-display.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <TabbedContent :tabs="tabs" :default-active="defaultActive">
    <template #first>
      <networkQualityLine />
    </template>
    <template #second>
      <businessQualityLine />
    </template>
  </TabbedContent>
</template>

<script setup>
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