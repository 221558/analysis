<template>
  <!-- 错误页面 -->
  <div class="error-page">
    <!-- 图片 -->
    <div class="img" style="background-image: url('/img/500.svg')"></div>
    <!-- 内容 -->
    <div class="content">
      <!-- 标题 -->
      <h1>500</h1>
      <!-- 描述 -->
      <div class="desc">抱歉，服务器出错了</div>
      <!-- 操作 -->
      <div class="actions">
        <router-link :to="{ path: '/' }">
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
  name: 'error-500',
};
</script>
<style lang="scss" scoped>
// 导入样式文件
@import './style.scss';
</style>
