<template>
  <h4 class="title">{{ title }}</h4>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style scoped>
.title {
  color: rgba(16, 16, 16, 1);
  font-size: 15px;
  text-align: left;
  font-weight: bold;
  font-family: SourceHanSansSC-medium;
}
</style>
