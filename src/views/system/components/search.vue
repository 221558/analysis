<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="用户权限：">
      <el-select
        style="width: 220px"
        v-model="form.roleIds"
        multiple
        placeholder="请选择用户权限"
        @focus="getRoleList"
        clearable
      >
        <el-option
          v-for="item in roleList"
          :key="item.title"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="状态：">
      <el-select style="width: 220px" v-model="form.status" placeholder="请选择状态" clearable>
        <el-option
          v-for="item in stateList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="用户名：">
      <el-input style="width: 220px" v-model="form.account" placeholder="请输入用户名" clearable />
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
import { getRoleTree } from '@/api/system/role';
const emit = defineEmits(['getSearch']);
// 创建一个响应式对象form，包含user和date两个属性
const form = ref({ roleIds: [], status: '', account: '' });

const roleList = ref([]);
const stateList = ref([
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
]);

// 定义一个函数，用于获取时间数据
const getRoleList = () => {
  getRoleTree().then(res => {
    roleList.value = res.data.data;
  });
};
// 重置表单
const getResetForm = () => {
  form.value = { roleIds: [], status: '', account: '' };
  // 打印表单中的用户名和日期
  emit('getSearch', form.value);
};

// 获取搜索报告
const getSearchForm = () => {
  // 打印表单中的用户名和日期
  emit('getSearch', form.value);
};
</script>

