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
import networkParameter from './components/threshold-settings/network-parameter.vue';
import businessParameter from './components/threshold-settings/business-parameters.vue';
const tabs = [
  { label: '网络参数', name: 'first' },
  { label: '业务参数', name: 'second' },
];
const defaultActive = 'first';
</script>
