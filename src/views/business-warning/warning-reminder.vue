<!-- 业务预警:预警提醒 -->
<template>
  <TabbedContent :tabs="tabs" :default-active="defaultActive">
    <template #first>
      <networkParameter />
    </template>
    <template #second>
      <businessParameter />
    </template>
  </TabbedContent>
</template>

<script setup>
import TabbedContent from '@/components/tabbed-content/main.vue';
import networkParameter from './components/warning-reminder/network-parameter.vue';
import businessParameter from './components/warning-reminder/business-parameters.vue';
const tabs = [
  { label: '网络预警', name: 'first' },
  { label: '业务预警', name: 'second' },
];
const defaultActive = 'first';
</script>
