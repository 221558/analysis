<template>
  <div class="title">{{ props.title }}</div>
</template>
<script setup>
import { defineProps } from 'vue';
/* eslint-disable no-unused-vars */
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss" scoped>
.title {
  width: 300px;
  height: 43px;
  line-height: 43px;
  padding-left: 30px;
  color: white;
  font-size: 19px;
  letter-spacing: 3px;
  margin-bottom: 10px;
  background: url('/board/title_box.png') no-repeat;
  background-size: contain;
}
</style>
