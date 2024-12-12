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
import { ref, onMounted, nextTick } from 'vue';
import TabbedContent from '@/components/tabbed-content/main.vue';
import networkQuality from './components/network-quality.vue';
import businessQuality from './components/business-quality.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const tabs = [
  { label: '网络质量', name: 'first' },
  { label: '业务质量', name: 'second' },
];
// const defaultActive = 'second';
const defaultActive = ref('first');

onMounted(() => {
  nextTick(() => {
    console.log('地址参数', route.query.rootCauseType);
    if (route.query.rootCauseType == 'network1') {
      const defaultActive = 'frist';

      // defaultActive.value = 'frist';
      console.log('进入网络tab', defaultActive);
    } else {
      // defaultActive.value = 'second';
      const defaultActive = 'second';
      console.log('进入业务tab', defaultActive);
    }
  });
});
</script>
