<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="选择月份：">
      <el-select
        style="width: 220px"
        v-model="fileTimeList"
        multiple
        placeholder="请选择月份"
        @focus="getTimeData"
        clearable
      >
        <el-option
          v-for="item in fileTimeData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="关键字：">
      <el-input style="width: 220px" v-model="form.keyword" placeholder="请输入关键字" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getSearchForm">查询</el-button>
      <el-button @click="getResetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
// 导入reactive函数
import { ref } from 'vue';
import { timelist } from '@/api/board/index';
const emit = defineEmits(['getSearch']);
// 创建一个响应式对象form，包含user和date两个属性
const form = ref({ keyword: '', fileTime: '' });
const fileTimeData = ref([]);
const fileTimeList = ref([]);

// 定义一个函数，用于获取时间数据
const getTimeData = () => {
  // 调用timelist函数，获取时间数据
  timelist().then(res => {
    // 打印获取到的数据
    // 将获取到的数据赋值给fileTimeData
    fileTimeData.value = res.data.data;
  });
};
// 重置表单
const getResetForm = () => {
  // 将表单中的用户名和日期重置为空
  form.value.keyword = '';
  fileTimeList.value = '';
  form.value.fileTime = '';
  // 打印表单中的用户名和日期
  emit('getSearch', form.value);
};

// 获取搜索报告
const getSearchForm = () => {
  form.value.fileTime = fileTimeList.value.join(',');
  // 打印表单中的用户名和日期
  emit('getSearch', form.value);
};
</script>

