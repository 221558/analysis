<template>
  <!-- 错误页面 -->
  <div class="error-page">
    <!-- 图片 -->
    <div class="img" style="background-image: url('/img/403.svg')"></div>
    <!-- 内容 -->
    <div class="content">
      <!-- 标题 -->
      <h1>403</h1>
      <!-- 描述 -->
      <div class="desc">抱歉，你无权访问该页面</div>
      <!-- 操作 -->
      <div class="actions">
        <!-- 返回首页 -->
        <router-link :to="{ path: '/' }">
          <!-- 点击按钮返回首页 -->
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// 导出一个默认的组件
export default {
  // 组件的名称
  name: 'error-403',
};
</script>
<style lang="scss" scoped>
// 导入样式文件
@import './style.scss';
</style>
