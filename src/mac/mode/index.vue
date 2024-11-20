<template>
  <!-- 定义一个div，用于显示背景 -->
  <div
    class="moveBg"
    v-show="isShow"
    @click="handleFocus"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    @mouseleave.stop="mouseLeave"
    :style="{ pointerEvents: isBoxResizing || isBoxMoving ? 'auto' : 'none' }"
  >
    <!-- 定义一个div，用于显示盒子 -->
    <div
      class="box"
      :style="{
        left: nowRect.left + 'px',
        top: nowRect.top + 'px',
        bottom: nowRect.bottom + 'px',
        right: nowRect.right + 'px',
      }"
      :class="getExtBoxClasses()"
    >
      <!-- 定义盒子的顶部 -->
      <div class="box-top">
        <!-- 定义盒子的左上角 -->
        <div class="box-top-left" @mousedown="resizeMouseDown"></div>
        <!-- 定义盒子的中间 -->
        <div class="box-top-center" @mousedown="resizeMouseDown"></div>
        <!-- 定义盒子的右上角 -->
        <div class="box-top-right" @mousedown="resizeMouseDown"></div>
      </div>
      <!-- 定义盒子的中间 -->
      <div class="box-center">
        <!-- 定义盒子的左中 -->
        <div class="box-center-left" @mousedown="resizeMouseDown"></div>
        <!-- 定义盒子的中间 -->
        <div class="box-center-center loader">
          <!-- 定义盒子的顶部栏 -->
          <div class="app-bar" :style="{ backgroundColor: app.tabbarBgColor }" @mousedown.stop="positionMouseDown" v-on:dblclick="appBarDoubleClicked">
            <!-- 定义控制按钮 -->
            <div class="controll">
              <!-- 定义关闭按钮 -->
              <div class="close" @click.stop="close"></div>
              <!-- 定义全屏按钮 -->
              <div class="full" :class="app.disableResize ? 'full-disabled' : ''" @click.stop="switchFullScreen"></div>
            </div>
            <!-- 定义标题 -->
            <div class="title" :style="{ color: app.tabbarTextColor }">{{ app.title }}</div>
          </div>
          <!-- 定义iframe -->
          <iframe title="" :src="location + app.path" frameborder="0" class="iframe"></iframe>
        </div>
        <!-- 定义盒子的右中 -->
        <div class="box-center-right" @mousedown="resizeMouseDown"></div>
      </div>
      <!-- 定义盒子的底部 -->
      <div class="box-bottom">
        <!-- 定义盒子的左下角 -->
        <div class="box-bottom-left" @mousedown="resizeMouseDown"></div>
        <!-- 定义盒子的中间 -->
        <div class="box-bottom-center" @mousedown="resizeMouseDown"></div>
        <!-- 定义盒子的右下角 -->
        <div class="box-bottom-right" @mousedown="resizeMouseDown"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入isURL函数，用于验证URL
import { isURL } from 'utils/validate';
// 导入defineAsyncComponent函数，用于定义异步组件
import { defineAsyncComponent } from 'vue';

export default {
  // 定义组件的属性
  props: {
    // 应用对象
    app: Object,
    // 销毁函数
    onDestroy: Function,
  },
  data() {
    return {
      // 是否显示
      isShow: true,
      // 默认索引
      defaultIndex: 10,
      // 活动索引
      activeIndex: 20,
      // 是否正在移动
      isBoxMoving: false,
      // 起始位置
      startPosition: { x: 0, y: 0 },
      // 当前矩形
      nowRect: {
        // 左边距
        left: 100,
        // 右边距
        right: 100,
        // 上边距
        top: 100,
        // 下边距
        bottom: 100,
      },
      // 起始矩形
      startRect: {
        // 设置元素的左边距为0
        left: 0,
        // 设置元素的右边距为0
        right: 0,
        // 设置元素的上边距为0
        top: 0,
        // 设置元素的下边距为0
        bottom: 0,
      },
      // 是否正在调整大小
      isBoxResizing: false,
      // 移动方向
      moveDirection: false,
      // 是否正在显示最大窗口
      isMaxShowing: false,
      // 是否全屏
      isFullScreen: false,
    };
  },
  computed: {
    // 计算属性，用于判断app.path是否为URL，如果是则返回空字符串，否则返回window.location.origin
    location() {
      // 判断this.app.path是否为URL，如果是，则返回空字符串，否则返回window.location.origin
      return isURL(this.app.path) ? '' : window.location.origin;
    },
  },
  // 在组件创建时执行
  created() {
    // 如果app的宽度存在
    if (this.app.width) {
      // 将nowRect的left和right属性设置为（document.body.clientWidth - this.app.width）的一半
      this.nowRect.left = this.nowRect.right = (document.body.clientWidth - this.app.width) / 2;
    }
    // 如果app的高度存在
    if (this.app.height) {
      // 将nowRect的bottom属性设置为（document.body.clientHeight - this.app.height）的一半加上50
      this.nowRect.bottom = (document.body.clientHeight - this.app.height) / 2 + 50;
      // 将nowRect的top属性设置为（document.body.clientHeight - this.app.height）的一半减去50
      this.nowRect.top = (document.body.clientHeight - this.app.height) / 2 - 50;
    }
  },
  methods: {
    // 处理焦点事件
    handleFocus() {
      // 获取所有class为moveBg的元素
      const list = document.getElementsByClassName('moveBg');
      // 如果只有一个元素，则直接返回
      if (list.length == 1) return;
      // 初始化最大zIndex为0
      let max = 0;
      // 遍历所有元素
      for (let i = 0; i < list.length; i++) {
        const ele = list[i];
        // 获取box元素的style
        const box = ele.getElementsByClassName('box')[0].style;
        // 将zIndex转换为数字
        const zIndex = Number(box.zIndex);
        // 如果当前zIndex大于max，则更新max
        if (max < zIndex) {
          // 将zIndex赋值给max
          max = zIndex;
        }
      }
      // 将max加1
      max += 1;
      // 将当前元素的zIndex设置为max
      this.$el.getElementsByClassName('box')[0].style.zIndex = max;
    },
    close() {
      // 关闭弹窗
      this.isShow = false;
      // 调用销毁函数
      this.onDestroy();
    },
    switchFullScreen() {
      // 如果应用禁止调整大小，则返回
      if (this.app.disableResize) {
        return;
      }
      // 切换全屏状态
      this.isFullScreen = !this.isFullScreen;
      // 如果全屏状态为true，则设置最大显示状态为true
      if (this.isFullScreen) {
        this.isMaxShowing = true;
      } else {
        // 否则设置最大显示状态为false
        this.isMaxShowing = false;
      }
    },
    getExtBoxClasses() {
      // 获取扩展框的类名
      let str = '';
      // 如果扩展框没有正在调整大小和移动
      if (!this.isBoxResizing && !this.isBoxMoving) {
        // 添加box-animation类名
        str += 'box-animation ';
      }
      // 如果扩展框正在显示最大化
      if (this.isMaxShowing) {
        // 添加isMaxShowing类名
        str += 'isMaxShowing ';
      }
      // 如果扩展框正在全屏显示
      if (this.isFullScreen) {
        // 添加isFullScreen类名
        str += 'isFullScreen ';
      }
      // 如果扩展框禁止调整大小
      if (this.app.disableResize) {
        // 添加resize-disabled类名
        str += 'resize-disabled ';
      }
      // 如果扩展框在顶部
      if (this.app.isTop) {
        // 添加isTop类名
        str += 'isTop ';
      }
      // 返回类名字符串
      return str;
    },
    appBarDoubleClicked() {
      // 如果扩展框禁止调整大小
      if (this.app.disableResize) {
        // 返回
        return;
      }
      // 切换扩展框的显示状态
      this.isMaxShowing = !this.isMaxShowing;
      // 如果扩展框没有显示最大化
      if (!this.isMaxShowing) {
        // 将扩展框的显示状态设置为非全屏
        this.isFullScreen = false;
      }
    },
    // 鼠标按下事件
    positionMouseDown(e) {
      // 如果当前窗口是全屏或最大化状态，则不执行
      if (this.isFullScreen || this.isMaxShowing) {
        return;
      }
      // 记录当前窗口的位置
      this.startRect = {
        left: this.nowRect.left,
        right: this.nowRect.right,
        top: this.nowRect.top,
        bottom: this.nowRect.bottom,
      };
      // 记录鼠标按下的位置
      this.startPosition.x = e.clientX;
      this.startPosition.y = e.clientY;
      // 设置窗口正在移动状态
      this.isBoxMoving = true;
    },
    // 鼠标松开事件
    mouseUp() {
      // 设置窗口不再移动状态
      this.isBoxMoving = false;
      // 设置窗口不再调整大小状态
      this.isBoxResizing = false;
      // 设置窗口移动方向
      this.moveDirection = false;
    },
    // 鼠标离开事件
    mouseLeave() {
      // 设置窗口不再移动状态
      this.isBoxMoving = false;
      // 设置窗口不再调整大小状态
      this.isBoxResizing = false;
      // 设置窗口移动方向
      this.moveDirection = false;
    },
    mouseMove(e) {
      if (this.isBoxResizing) {
        // 如果正在调整盒子大小
        this.isFullScreen = false;
        // 取消全屏
        this.isMaxShowing = false;
        // 取消最大化
        switch (this.moveDirection) {
          case 'box-top-left':
            // 如果是左上角
            this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y);
            // 更新top值
            this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x);
            // 更新left值
            break;
          case 'box-top-center':
            // 如果是上中
            this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y);
            // 更新top值
            break;
          case 'box-top-right':
            // 如果是右上角
            this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y);
            // 更新top值
            this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x);
            // 更新right值
            break;
          case 'box-center-left':
            // 如果是左中
            this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x);
            // 更新left值
            break;
          case 'box-bottom-left':
            // 如果是左下角
            this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x);
            // 更新left值
            this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y);
            // 更新bottom值
            break;
          case 'box-bottom-center':
            // 如果是下中
            this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y);
            // 更新bottom值
            break;
          case 'box-center-right':
            // 如果是右中
            this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x);
            // 更新right值
            break;
          case 'box-bottom-right':
            // 如果是右下角
            this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x);
            // 更新right值
            this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y);
            // 更新bottom值
            break;
          default:
        }
        return;
      }
      // 如果盒子正在移动
      if (this.isBoxMoving) {
        // 将全屏状态设置为false
        this.isFullScreen = false;
        // 将最大化状态设置为false
        this.isMaxShowing = false;
        // 计算当前盒子的左边界
        this.nowRect.left = this.startRect.left + (e.clientX - this.startPosition.x);
        // 计算当前盒子的右边界
        this.nowRect.right = this.startRect.right - (e.clientX - this.startPosition.x);
        // 计算当前盒子的上边界
        this.nowRect.top = this.startRect.top + (e.clientY - this.startPosition.y);
        // 计算当前盒子的下边界
        this.nowRect.bottom = this.startRect.bottom - (e.clientY - this.startPosition.y);
      }
    },
    // 鼠标按下时触发resizeMouseDown函数
    resizeMouseDown(e) {
      // 如果app.disableResize为true，则返回
      if (this.app.disableResize) {
        return;
      }
      // 如果isFullScreen或isMaxShowing为true，则返回
      if (this.isFullScreen || this.isMaxShowing) {
        return;
      }
      // 将nowRect的值赋给startRect
      this.startRect = {
        // 设置当前矩形的左边距
        left: this.nowRect.left,
        // 设置当前矩形的上边距
        top: this.nowRect.top,
        // 设置当前矩形的右边距
        right: this.nowRect.right,
        // 设置当前矩形的下边距
        bottom: this.nowRect.bottom,
      };
      // 将鼠标的x坐标赋给startPosition.x
      this.startPosition.x = e.clientX;
      // 将鼠标的y坐标赋给startPosition.y
      this.startPosition.y = e.clientY;
      // 将isBoxResizing设置为true
      this.isBoxResizing = true;
      // 将e.target.className赋给moveDirection
      this.moveDirection = e.target.className;
    },
  },
};
</script>
<style scoped>
.iframe {
  /* 设置iframe的宽度为100% */
  width: 100%;
  /* 设置iframe的高度为100%减去50px */
  height: calc(100% - 50px);
  /* 设置iframe的顶部外边距为5px */
  margin-top: 5px;
  /* 设置iframe的右边框宽度为5px */
  border-right: 5px;
}
.moveBg {
  /* 设置moveBg的定位为绝对定位 */
  position: absolute;
  /* 设置moveBg的左边距为0 */
  left: 0;
  /* 设置moveBg的右边距为0 */
  right: 0;
  /* 设置moveBg的顶部外边距为0 */
  top: 0;
  /* 设置moveBg的底部外边距为0 */
  bottom: 0;
}

.box {
  /* 设置box的resize变量为5px */
  --resize: 5px;
  /* 设置box的resize-bg变量为透明 */
  --resize-bg: transparent;
  /* 设置box的resize-main变量为透明 */
  --resize-main: transparent;
  /* 设置box的resize-bg-main变量为透明 */
  --resize-bg-main: transparent;
}

.box {
  /* 设置定位为绝对定位 */
  position: absolute;
  /* 设置鼠标事件为自动 */
  pointer-events: auto;
  /* 设置显示方式为弹性布局 */
  display: flex;
  /* 设置弹性布局方向为垂直方向 */
  flex-direction: column;
}

.box-top {
  /* 设置显示方式为弹性布局 */
  display: flex;
  /* 设置弹性布局方向为水平方向 */
  flex-direction: row;
}

.box-top-left {
  /* 设置宽度为变量--resize */
  width: var(--resize);
  /* 设置高度为变量--resize */
  height: var(--resize);
  /* 设置背景颜色为变量--resize-bg */
  background: var(--resize-bg);
  /* 设置鼠标样式为nw-resize */
  cursor: nw-resize;
}

.box-top-center {
  /* 设置高度为变量--resize */
  height: var(--resize);
  /* 设置背景颜色为变量--resize-bg-main */
  background: var(--resize-bg-main);
  /* 设置鼠标样式为n-resize */
  cursor: n-resize;
  /* 设置弹性增长为1 */
  flex-grow: 1;
}

.box-top-right {
  /* 设置宽度为变量--resize */
  width: var(--resize);
  /* 设置高度为变量--resize */
  height: var(--resize);
  /* 设置背景颜色为变量--resize-bg */
  background: var(--resize-bg);
  /* 设置鼠标样式为ne-resize */
  cursor: ne-resize;
}

.box-center {
  /* 设置盒子居中 */
  display: flex;
  /* 设置盒子方向为水平 */
  flex-direction: row;
  /* 设置盒子可以增长 */
  flex-grow: 1;
}

.box-center-left {
  /* 设置盒子宽度为可变 */
  width: var(--resize);
  /* 设置盒子高度为100% */
  height: 100%;
  /* 设置盒子背景颜色为可变 */
  background: var(--resize-bg-main);
  /* 设置鼠标样式为向右拖动 */
  cursor: w-resize;
}

.box-center-center {
  /* 设置盒子高度为100% */
  height: 100%;
  /* 设置盒子可以增长 */
  flex-grow: 1;
  /* 设置盒子为弹性布局 */
  display: flex;
  /* 设置盒子方向为垂直 */
  flex-direction: column;
  /* 设置盒子圆角为10px */
  border-radius: 10px;
  /* 设置盒子阴影为3px */
  box-shadow: 0px 0px 3px #999;
  /* 设置盒子背景颜色为rgba(255, 255, 255, 0.8) */
  background: rgba(255, 255, 255, 0.8);
  /* 设置盒子背景模糊为20px */
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.isTop .box-center-center {
  /* 设置盒子阴影，阴影大小为20px，颜色为黑色，透明度为0.5 */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  /* 设置滤镜为无 */
  filter: none;
}

/* 设置盒子动画效果 */
.box-animation {
  /* 设置宽度、高度、左边距、右边距、上边距、下边距的过渡效果，过渡时间为0.1秒 */
  transition: width 0.1s, height 0.1s, left 0.1s, right 0.1s, top 0.1s, bottom 0.1s;
}

/* 设置盒子最大显示效果 */
.isMaxShowing {
  /* 设置盒子左边距为-5px */
  left: -5px !important;
  /* 设置盒子右边距为-5px */
  right: -5px !important;
  /* 设置盒子上边距为24px */
  top: 24px !important;
  /* 设置盒子下边距为47px */
  bottom: 47px !important;
  /* 设置盒子高度为100%减去24px */
  height: calc(100% - 24px);
}

/* 设置盒子全屏显示效果 */
.isFullScreen {
  /* 设置盒子为固定定位 */
  position: fixed !important;
  /* 设置盒子的层级为999 */
  z-index: 999 !important;
  /* 设置盒子的底部距离为-5px */
  bottom: -5px !important;
}

.isMaxShowing .box-center-center,
.isFullScreen .box-center-center {
 /* 当.isMaxShowing或.isFullScreen类存在时，box-center-center类的元素的border-radius属性设置为0px */
  border-radius: 0px !important;
}

.box-center-right {
  /* 设置宽度为变量--resize */
  width: var(--resize);
  /* 设置高度为100% */
  height: 100%;
  /* 设置背景为变量--resize-bg-main */
  background: var(--resize-bg-main);
  /* 设置鼠标样式为e-resize */
  cursor: e-resize;
}

.box-bottom {
  /* 设置显示方式为flex */
  display: flex;
  /* 设置主轴方向为row */
  flex-direction: row;
}

.box-bottom-left {
  /* 设置宽度为变量--resize */
  width: var(--resize);
  /* 设置高度为变量--resize */
  height: var(--resize);
  /* 设置背景为变量--resize-bg */
  background: var(--resize-bg);
  /* 设置鼠标样式为sw-resize */
  cursor: sw-resize;
}

.box-bottom-center {
  /* 设置高度为变量--resize */
  height: var(--resize);
  /* 设置背景为变量--resize-bg-main */
  background: var(--resize-bg-main);
  /* 设置鼠标样式为s-resize */
  cursor: s-resize;
  /* 设置弹性增长为1 */
  flex-grow: 1;
}

.box-bottom-right {
  /* 设置宽度 */
  width: var(--resize);
  /* 设置高度 */
  height: var(--resize);
  /* 设置背景颜色 */
  background: var(--resize-bg);
  /* 设置鼠标样式为右下角缩放 */
  cursor: se-resize;
}

/* 加载器样式 */
.loader {
   /* 使用flex布局 */
  display: flex;
  /* 允许元素在容器中增长 */
  flex-grow: 1; 
  /* 子元素垂直排列 */
  flex-direction: column;
  /* 宽度占满父容器 */ 
  width: 100%; 
}

/* 应用栏样式 */
.app-bar {
  /* 高度为40px */
  height: 40px; 
  /* 背景颜色为半透明白色 */
  background: rgba(255, 255, 255, 0.5);
  /* 背景模糊效果 */
  backdrop-filter: blur(20px); 
  /* 使用flex布局 */
  display: flex;
  /* 子元素水平排列 */ 
  flex-direction: row;
  /* 子元素水平居中 */ 
  justify-content: center; 
  /* 子元素垂直居中 */
  align-items: center; 
   /* 不换行 */
  white-space: nowrap;
  /* 超出部分显示省略号 */
  text-overflow: ellipsis; 
  /* 超出部分隐藏 */
  overflow: hidden; 
}

.app-bar .controll {
  /* 设置控制按钮的样式 */
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 左边距 */
  margin-left: 15px;
}

.app-bar .controll div {
  /* 设置控制按钮的样式 */
  border-radius: 100%;
  /* 圆角 */
  height: 11px;
  /* 高度 */
  width: 11px;
  /* 宽度 */
  margin-right: 8px;
  /* 右边距 */
  cursor: pointer;
  /* 鼠标悬停时显示手型 */
}

.app-bar .title {
  /* 设置弹性增长，使元素可以填充剩余空间 */
  flex-grow: 1;
  /* 文本居中对齐 */
  text-align: center;
  /* 设置右边距 */
  margin-right: 80px;
  /* 设置字体粗细 */
  font-weight: 500;
  /* 取消文本阴影 */
  text-shadow: none;
  /* 设置字体大小 */
  font-size: 13px;
  /* 设置鼠标样式为可移动 */
  cursor: move;
  /* 设置文本颜色 */
  color: #333;
}

 /*.controll 类下的 .close 类 */
.controll .close {
  /* 背景颜色 */
  background: #fc605c;
  /* 边框颜色和宽度 */
  border: 1px solid #fc635d; 
}

.controll .min {
  /* 设置背景颜色为#fcbb40 */
  background: #fcbb40;
  /* 设置边框颜色为#f8b438 */
  border: 1px solid #f8b438;
}

.controll .full {
  /* 设置背景颜色为#34c648 */
  background: #34c648;
  /* 设置边框颜色为#2bc03f */
  border: 1px solid #2bc03f;
}

.full-disabled {
  /* 背景颜色 */
  background: #ccc !important;
  /* 边框颜色和宽度 */
  border: 1px solid #ccc !important;
}

.resize-disabled .box-top-left,
.resize-disabled .box-top-center,
.resize-disabled .box-top-right,
.resize-disabled .box-center-left,
.resize-disabled .box-center-right,
.resize-disabled .box-bottom-left,
.resize-disabled .box-bottom-center,
.resize-disabled .box-bottom-right {
  /* 设置鼠标指针样式为默认样式  */
  cursor: default;
}

.app-body {
  /* 设置flex-grow属性，使其在flex容器中占据剩余空间 */
  flex-grow: 1;
  /* 设置display属性，使其成为一个flex容器 */
  display: flex;
  /* 设置flex-direction属性，使其子元素垂直排列 */
  flex-direction: column;
  /* 设置justify-content属性，使其子元素在容器中居中对齐 */
  justify-content: center;
  /* 设置align-items属性，使其子元素在容器中水平居中对齐 */
  align-items: center;
}
</style>
