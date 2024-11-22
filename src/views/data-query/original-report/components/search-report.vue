<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="选择月份：">
      <el-date-picker
        v-model="form.date"
        type="month"
        placeholder="请选择选择月份"
        clearable
        value-format="YYYY-MM"
        :disabled-date="disabledDate"
        @change="changeData(form.date)"
      />
    </el-form-item>
    <el-form-item label="关键字：">
      <el-input v-model="form.user" placeholder="请选择关键字" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getSearchForm">查询</el-button>
      <el-button @click="getResetForm">重置</el-button>
    </el-form-item>
    <el-button style="float: right" type="primary" plain @click="getDownload">批量下载</el-button>
  </el-form>
</template>

<script setup>
// 导入reactive函数
import { reactive, defineEmits, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
const emit = defineEmits(['getSearch']);
// 定义组件的props，接收父组件传递的值
const props = defineProps(['selectionList']);
// 创建一个响应式对象form，包含user和date两个属性
const form = reactive({ user: '', date: '' });
// 定义禁用未来日期的函数
/* eslint-disable no-unused-vars */
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};
// 解决 再带清空返回 null 情况
/* eslint-disable no-unused-vars */
const changeData = val => {
  // 如果传入的值为空，则将表单中的日期置为空
  if (!val) {
    form.date = '';
  }
};
// 重置表单
/* eslint-disable no-unused-vars */
const getResetForm = () => {
  // 将表单中的用户名和日期重置为空
  form.user = '';
  form.date = '';
  // 打印表单中的用户名和日期
  emit('getSearch', form);
};

// 获取搜索报告
/* eslint-disable no-unused-vars */
const getSearchForm = () => {
  // 打印表单中的用户名和日期
  emit('getSearch', form);
};
// 批量下载
/* eslint-disable no-unused-vars */
const getDownload = () => {
  if (props.selectionList.length === 0) {
    return ElMessage.warning('请选择至少一条数据');
  }
  console.log('正在现在批量下载...');
};
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
