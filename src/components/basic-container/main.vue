<template>
  <!-- 基础容器 -->
  <div class="basic-container" :style="styleName" :class="{ 'basic-container--block': block }">
    <!-- 卡片 -->
    <el-card class="basic-container__card">
      <!-- 插槽 -->
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'basicContainer',
  // 定义组件的属性
  props: {
    // 圆角半径，可以是字符串或数字，默认值为10
    radius: {
      type: [String, Number],
      default: 10,
    },
    // 背景颜色，类型为字符串
    background: {
      type: String,
    },
    // 是否为块级元素，类型为布尔值，默认值为false
    block: {
      type: Boolean,
      default: false,
    },
  },
  // 计算属性
  computed: {
    // 返回样式对象
    styleName() {
      return {
        // 圆角半径
        borderRadius: `${this.radius}px`,
        // 背景颜色
        background: this.background,
      };
    },
  },
};
</script>

<style lang="scss">
// 基础容器
.basic-container {
  // 内边距
  padding: 10px 6px;
  // 盒子模型
  box-sizing: border-box;
  // 块级容器
  &--block {
    // 高度
    height: 100%;
    // 基础容器卡片
    .basic-container__card {
      // 高度
      height: 100%;
    }
  }
  // 基础容器卡片
  &__card {
    // 宽度
    width: 100%;
  }
  // 第一个子元素
  &:first-child {
    // 上边距
    padding-top: 0;
  }
}
</style>
