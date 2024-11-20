<template>
  <!-- 定义一个div，class为basic-block，style属性绑定styleName -->
  <div class="basic-block" :style="styleName">
    <!-- 定义一个div，class为box，style属性绑定boxStyleName -->
    <div class="box" :style="boxStyleName">
      <!-- 定义一个router-link，to属性绑定to -->
      <router-link :to="to">
        <!-- 定义一个span，v-text属性绑定text -->
        <span v-text="text"></span>
        <!-- 定义一个p，v-text属性绑定dept -->
        <p v-text="dept"></p>
        <!-- 定义一个em，class属性绑定icon -->
        <em :class="icon"></em>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basicBlock',
  props: {
    // 图标
    icon: {
      type: String,
    },
    // 背景颜色
    background: {
      type: String,
    },
    // 跳转链接
    to: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 文字
    text: {
      type: String,
    },
    // 部门
    dept: {
      type: String,
    },
    // 时间
    time: {
      type: [Number, String],
    },
    // 间距
    gutter: {
      type: [Number, String],
      default: 5,
    },
    // 颜色
    color: {
      type: String,
    },
    // 宽度
    width: {
      type: [Number, String],
    },
    // 高度
    height: {
      type: [Number, String],
    },
  },
  computed: {
    // 计算属性，返回一个对象，包含动画延迟时间、宽度、高度和间距
    styleName() {
      return {
        // 动画延迟时间为time属性除以25，单位为秒
        animationDelay: `${this.time / 25}s`,
        // 宽度为width属性，单位为像素
        width: `${this.width}px`,
        // 高度为height属性，单位为像素
        height: `${this.height}px`,
        // 间距为gutter属性，单位为像素
        margin: `${this.gutter}px`,
      };
    },
    // 计算属性，返回一个对象，包含背景颜色和背景图片
    boxStyleName() {
      return {
        // 背景颜色为color属性
        backgroundColor: this.color,
        // 背景图片为background属性
        backgroundImage: `url('${this.background}')`,
      };
    },
  },
};
</script>

<style lang="scss">
.basic-block {
  opacity: 0;

  box-sizing: border-box;
  color: #fff;
  animation: mymove 1s;
  animation-fill-mode: forwards;
  .box {
    /* 设置相对定位 */
    position: relative;
    /* 设置盒模型为border-box */
    box-sizing: border-box;
    /* 设置内边距为15px */
    padding: 15px;
    /* 设置宽度为100% */
    width: 100%;
    /* 设置高度为100% */
    height: 100%;
    /* 设置过渡效果，所有属性在1秒内完成 */
    transition: all 1s;
    /* 设置背景图片大小为cover */
    background-size: cover;
    /* 鼠标悬停时，旋转360度 */
    &:hover {
      transform: rotateY(360deg);
    }
  }

  /* 设置a标签的字体颜色为白色 */
  a {
    color: #fff;
  }
  /* 设置a标签的字体颜色为白色 */
  span {
    display: block;
    font-size: 16px;
  }
  /* 设置span标签的display属性为block，字体大小为16px */
  p {
    // 设置宽度为80%
    width: 80%;
    // 设置字体大小为10px
    font-size: 10px;
    // 设置字体颜色为#eee
    color: #eee;
    // 设置行高为22px
    line-height: 22px;
  }
  /* 设置p标签的宽度为80%，字体大小为10px，字体颜色为#eee，行高为22px */
  em {
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 50px !important ;
  }
  /* 设置em标签的position属性为absolute，bottom属性为15px，right属性为15px，字体大小为50px，并且使用!important来覆盖其他样式 */
  @keyframes mymove {
    from {
      // 设置初始状态，透明度为0，缩放为0
      opacity: 0;
      transform: scale(0);
    }
    to {
      // 设置结束状态，透明度为1，缩放为1
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
