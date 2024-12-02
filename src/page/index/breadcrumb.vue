<!-- components/Breadcrumb.vue -->
<template>
  <el-breadcrumb separator="/" style="padding: 20px 10px;">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      <div style="font-weight: bold;">{{ item && item.name }}</div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();

    // 根据当前路由动态生成面包屑
    const breadcrumbs = computed(() => { 
      const arr = route.matched.filter(item => item.name)
      return arr.map(routeItem => {
        return {
          name: routeItem.name.split(',')[0],
          path: routeItem.path
        };
      });
    });

    return { breadcrumbs };
  }
};
</script>

<style scoped>
</style>
