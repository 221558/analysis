<template>
  <!-- 基础容器 -->
  <basic-container>
    <!-- iframe标签，用于嵌入外部页面 -->
    <iframe title="" :src="src" class="iframe" ref="iframe" />
  </basic-container>
</template>

<script>
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
// progress bar style
export default {
  // 组件名称
  name: 'AvueIframe',
  data() {
    // 定义组件的数据
    return {};
  },
  created() {
    // 在组件创建时配置NProgress
    NProgress.configure({ showSpinner: false });
  },
  mounted() {
    // 在组件挂载时调用load方法
    this.load();
  },
  watch: {
    // 监听$route的变化，当$route变化时调用load方法
    $route() {
      // 加载
      this.load();
    },
  },
  computed: {
    // 计算属性，返回$route.query.url.replace(/#/g, '&')的值
    src() {
      // 返回当前路由的查询参数中的url，并将所有的#替换为&
      return this.$route.query.url.replace(/#/g, '&');
    },
  },
  methods: {
    // 显示等待框
    show() {
      // 开始进度条
      NProgress.start();
    },
    // 隐藏等待狂
    hide() {
      // 结束进度条
      NProgress.done();
    },
    // 加载组件
    load() {
      this.show();
      // 超时3s自动隐藏等待狂，加强用户体验
      let time = 3;
      // 设置定时器，每秒执行一次
      const timeFunc = setInterval(() => {
        // 时间减一
        time--;
        // 如果时间为0，则隐藏组件，并清除定时器
        if (time == 0) {
          // 隐藏
          this.hide();
          // 清除定时器
          clearInterval(timeFunc);
        }
      }, 1000);
      // 初始化iframe
      this.iframeInit();
    },
    // iframe窗口初始化
    iframeInit() {
      // 获取iframe元素
      const { iframe } = this.$refs;
      // 获取浏览器窗口的高度减去150像素
      const clientHeight = document.documentElement.clientHeight - 150;
      // 如果没有获取到iframe元素，则返回
      if (!iframe) return;
      // 设置iframe的高度为浏览器窗口的高度减去150像素
      iframe.style.height = `${clientHeight}px`;
      // 如果iframe元素支持attachEvent方法，则使用attachEvent方法绑定onload事件
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
        // 在iframe加载完成后，调用hide方法
          this.hide();
        });
        // 否则，使用onload方法绑定onload事件
      } else {
        iframe.onload = () => {
        // 在iframe加载完成后，调用hide方法
          this.hide();
        };
      }
    },
  },
};
</script>

<style lang="scss">
// 定义一个名为iframe的样式
.iframe {
  // 设置宽度为100%
  width: 100%;
  // 设置高度为100%
  height: 100%;
  // 设置边框为0
  border: 0;
  // 设置溢出内容为隐藏
  overflow: hidden;
  // 设置盒模型为border-box
  box-sizing: border-box;
}
</style>
