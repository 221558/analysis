<!-- 业务预警:预警提醒 -->
<template>
    <TabbedContent :tabs="tabs" :default-active="defaultActive">
      <template #first>
        <networkQuality />
      </template>
      <template #second>
        <businessQuality />
      </template>
    </TabbedContent>
  </template>
  
  <script setup>
  import TabbedContent from '@/components/tabbed-content/main.vue';
  import networkQuality from './components/network-quality.vue';
  import businessQuality from './components/business-quality.vue';
  const tabs = [
    { label: '网络质量', name: 'first' },
    { label: '业务质量', name: 'second' },
  ];
  const defaultActive = 'first';
  </script>
  