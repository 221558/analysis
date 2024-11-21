<template>
  <div class="avue-logo">
    <!-- 使用transition组件实现淡入淡出效果 -->
    <transition name="fade">
      <!-- 如果屏幕宽度大于768px，则显示网站logo -->
      <span v-if="getScreen(isCollapse)" class="avue-logo_subtitle" key="0">
        <!-- {{ website.logo }} -->
        <img src="/favicon.png" alt="citc" />
      </span>
    </transition>
    <!-- 使用transition-group组件实现淡入淡出效果 -->
    <transition-group name="fade">
      <!-- 如果屏幕宽度小于等于768px，则显示网站标题和图片 -->
      <template v-if="getScreen(!isCollapse)">
        <!-- <span class="avue-logo_title" key="1">{{ website.indexTitle }} </span> -->
        <div class="avue-logo_subtitle">
          <img class="img" src="/image/citc.png" alt="citc" />
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script>
// 引入mapGetters方法，用于将store中的getter映射到组件的计算属性中
import { mapGetters } from 'vuex';

export default {
  name: 'logo',
  data() {
    // 定义组件的数据
    return {};
  },
  computed: {
    // 将store中的getter映射到组件的计算属性中
    ...mapGetters(['isCollapse']),
  },
};
</script>
<style lang="scss" scoped>
// 定义一个.avue-logo_subtitle类
.avue-logo_subtitle {
  // 设置文本居中对齐
  text-align: center;
  // 定义一个img类
  img {
    // 设置宽度为40px
    width: 40px;
    // 设置高度为24px
    height: 24px;
    // 设置垂直居中对齐
    vertical-align: middle;
    // 设置文本居中对齐
    text-align: center;
  }
  // 定义一个.img类
  .img {
    // 设置宽度为226px
    width: 210px;
    // 设置高度为36px
    height: 30px;
    // 设置垂直居中对齐
    vertical-align: middle;
  }
}
</style>
