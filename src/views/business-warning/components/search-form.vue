<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="省份：">
      <el-select v-model="form.province" placeholder="选择省份" @change="getData(form)" clearable multiple >
        <el-option
          v-for="item in props.provinceList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="监控参数：">
      <el-select
        v-model="form.monitorParam"
        placeholder="选择监控参数"
        @change="getData(form)"
        clearable
        multiple
      >
        <el-option
          v-for="item in props.monitorParamList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
import { reactive, defineEmits, defineProps, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
const emit = defineEmits(['getSearch']);
// 定义组件的props，接收父组件传递的值
const props = defineProps(['provinceList', 'monitorParamList']);
const ids = computed(() => {
  return props.selectionList.map(item => String(item.id)).join(',');
});
// 创建一个响应式对象form，包含user和date两个属性
const form = reactive({ province: [], monitorParam: [] });
// 重置表单
const getResetForm = () => {
  // 将表单中的用户名和日期重置为空
  form.province = [];
  form.monitorParam = [];
  // 打印表单中的用户名和日期
  emit('getSearch', form);
};

// 获取搜索报告
const getSearchForm = () => {
  console.log('form', form);
  // 打印表单中的用户名和日期
  emit('getSearch', form);
};
</script>


<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

