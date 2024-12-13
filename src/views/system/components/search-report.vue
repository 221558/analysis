<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="起始日期">
      <el-date-picker
        v-model="form.createTimeStart"
        type="datetime"
        :clearable="false"
        placeholder="选择日期时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        :disabled-date="disabledDateStart"
      />
    </el-form-item>
    <el-form-item label="截止日期">
      <el-date-picker
        v-model="form.createTimeEnd"
        type="datetime"
        :clearable="false"
        placeholder="选择日期时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        :disabled-date="disabledDate"
      />
    </el-form-item>
    <el-form-item label="用户类型：">
      <el-select
        style="width: 220px"
        v-model="form.roleId"
        multiple
        placeholder="请选择用户类型"
        clearable
      >
        <el-option
          v-for="item in userTypeOptions"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getSearchForm">查询</el-button>
      <el-button @click="getResetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
// 导入reactive函数
import { onMounted, ref } from 'vue';
import { getRoleTree } from '@/api/system/role';

const emit = defineEmits(['getSearch']);
// 创建一个响应式对象form，包含user和date两个属性
const form = ref({ createTimeStart: '', createTimeEnd: '', roleId: '' });
const userTypeOptions = ref([]);

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return (
    time.getTime() > Date.now() || time.getTime() < Date.parse(new Date(form.value.createTimeStart))
  );
};
//已选择截止日期后，起始日期只能选择截止日期之前
const disabledDateStart = time => {
  return (
    time.getTime() > Date.now() || time.getTime() > Date.parse(new Date(form.value.createTimeEnd))
  );
};
// 重置表单
const getResetForm = () => {
  // 将表单中的用户名和日期重置为空
  form.value.createTimeStart = '';
  form.value.createTimeEnd = '';
  form.value.userType = '';
  // 打印表单中的用户名和日期
  emit('getSearch', form.value);
};
onMounted(() => {
  // 获取用户类型
  getRoleTree().then(res => {
    userTypeOptions.value = res.data.data;
  });
});

// 获取搜索报告
const getSearchForm = () => {
  // 打印表单中的用户名和日期
  emit('getSearch', form.value);
};
</script>
