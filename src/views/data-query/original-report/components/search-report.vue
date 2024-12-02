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
    <el-button style="float: right" type="primary" plain @click="getDownload">批量下载</el-button>
  </el-form>
</template>

<script setup>
// 导入reactive函数
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { getDownloadFile } from '@/api/data-query/original-report';
import { timelist } from '@/api/board/index';

// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
const emit = defineEmits(['getSearch']);
// 定义组件的props，接收父组件传递的值
const props = defineProps(['selectionList']);
const ids = computed(() => {
  return props.selectionList.map(item => String(item.id)).join(',');
});
// 创建一个响应式对象form，包含user和date两个属性
const form = ref({ keyword: '', fileTime: '' });
const fileTimeData = ref([]);
const fileTimeList = ref([]);

//
const getTimeData = () => {
  timelist().then(res => {
    console.log(res.data.data);
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
// 批量下载
const getDownload = () => {
  if (props.selectionList.length === 0) {
    return ElMessage.warning('请选择至少一条数据');
  }

  getDownloadFile({ recordIds: ids.value }).then(res => {
    // 如果返回的状态码为200
    if (res.status == 200) {
      // 创建一个Blob对象，将返回的数据作为参数传入
      const url = window.URL.createObjectURL(new Blob([res.data]));
      // 创建一个a标签
      const link = document.createElement('a');
      // 设置a标签的样式为不显示
      link.style.display = 'none';
      // 设置a标签的href属性为Blob对象的URL
      link.href = url;
      // 设置a标签的download属性为row对象的deviceFileName属性
      link.setAttribute('download', '信通院报表数据.xlsx');
      // 将a标签添加到body中
      document.body.appendChild(link);
      // 模拟点击a标签，触发下载
      link.click();
      // 将a标签从body中移除
      document.body.removeChild(link);
      // 释放Blob对象的URL
      window.URL.revokeObjectURL(link.href);
    } else {
      // 如果返回的状态码不为200，则弹出错误提示
      ElMessage.error('下载失败，请稍后再试。');
    }
  });
};
</script>

