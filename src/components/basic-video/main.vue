<template>
  <!-- 定义一个div，绑定styleName属性，设置class为basic-video -->
  <div :style="styleName" class="basic-video">
    <!-- 定义一个div，设置class为basic-video__border -->
    <div class="basic-video__border">
      <!-- 定义四个span，绑定borderStyleName属性 -->
      <span :style="borderStyleName"></span>
      <span :style="borderStyleName"></span>
      <span :style="borderStyleName"></span>
      <span :style="borderStyleName"></span>
    </div>
    <!-- 定义一个img，绑定imgStyleName属性，设置class为basic-video__img，设置src属性为background，设置alt属性为空 -->
    <img :style="imgStyleName" class="basic-video__img" :src="background" alt="" />
    <!-- 定义一个video，设置class为basic-video__main，设置ref属性为main，设置autoplay属性为true，设置muted属性为true -->
    <video class="basic-video__main" ref="main" autoplay muted></video>
  </div>
</template>

<script>
// 导入RecordVideo组件
import RecordVideo from './plugin';

export default {
  name: 'basic-video',
  // 定义组件的名称
  props: {
    // 定义组件的属性
    background: {
      // 定义背景属性
      type: String,
    },
    width: {
      // 定义宽度属性
      type: [String, Number],
      // 设置默认值为500
      default: 500,
    },
  },
  computed: {
    // 定义计算属性
    styleName() {
      // 返回一个对象，包含宽度属性
      return {
        width: `${this.width}px`,
      };
    },
    imgStyleName() {
      // 返回一个对象，包含宽度属性
      return {
        width: `${this.width / 2}px`,
      };
    },
    borderStyleName() {
      // 返回一个对象，包含宽度、高度和边框宽度属性
      return {
        width: `${this.width / 15}px`,
        height: `${this.width / 15}px`,
        borderWidth: `${5}px`,
      };
    },
  },
  // 定义数据
  data() {
    return {
      // 视频对象
      videoObj: null,
    };
  },
  // 组件挂载后执行
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    // 初始化视频对象
    init() {
      this.videoObj = new RecordVideo(this.$refs.main);
      // 初始化视频对象
      const videoPromise = this.videoObj.init();
      // 当视频对象初始化完成后，添加事件监听器
      videoPromise.then(() => {
        this.videoObj.mediaRecorder.addEventListener('stop', this.getData, false);
      });
    },
    // 开始录制视频
    startRecord() {
      this.videoObj.startRecord();
    },
    // 停止录制视频
    stopRecord() {
      this.videoObj.stopRecord();
    },
    // 获取视频数据
    getData() {
      // 将视频数据转换为Blob对象
      const blob = new Blob(this.videoObj.chunks, {
        type: 'video/mp4',
      });
      // 创建FileReader对象
      const reader = new FileReader();
      // 将Blob对象转换为base64编码
      reader.readAsDataURL(blob);
      // 当转换完成后，触发data-change事件
      reader.addEventListener('loadend', () => {
        const video_base64 = reader.result;
        this.$emit('data-change', video_base64);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.basic-video {
  /* 设置外边距为0，自动居中 */
  margin: 0 auto;
  /* 设置定位为相对定位 */
  position: relative;
  /* 设置溢出内容为隐藏 */
  overflow: hidden;
  &__border {
    span {
      /* 设置span标签的绝对定位 */
      position: absolute;
      /* 设置span标签的宽度 */
      width: 30px;
      /* 设置span标签的高度 */
      height: 30px;
      /* 设置span标签的边框宽度 */
      border-width: 4px;
      /* 设置span标签的边框颜色 */
      color: #0073eb;
      /* 设置span标签的边框样式 */
      border-style: solid;
      /* 设置第一个span标签的位置 */
      &:nth-child(1) {
        /* 设置第一个span标签的左边距 */
        left: 15px;
        /* 设置第一个span标签的上边距 */
        top: 15px;
        /* 设置第一个span标签的右边框宽度为0 */
        border-right: 0;
        /* 设置第一个span标签的下边框宽度为0 */
        border-bottom: 0;
      }
      /* 设置第二个span标签的位置 */
      &:nth-child(2) {
        /* 设置第二个span标签的右边距 */
        right: 15px;
        /* 设置第二个span标签的上边距 */
        top: 15px;
        /* 设置第二个span标签的左边框宽度为0 */
        border-left: 0;
        /* 设置第二个span标签的下边框宽度为0 */
        border-bottom: 0;
      }
      /* 设置第三个span标签的位置 */
      &:nth-child(3) {
        /* 设置第三个span标签的下边距 */
        bottom: 15px;
        /* 设置第三个span标签的左边距 */
        left: 15px;
        /* 设置第三个span标签的右边框宽度为0 */
        border-right: 0;
        /* 设置第三个span标签的上边框宽度为0 */
        border-top: 0;
      }
      /* 设置第四个span标签的位置 */
      &:nth-child(4) {
        /* 设置第四个span标签的下边距 */
        bottom: 15px;
        /* 设置第四个span标签的右边距 */
        right: 15px;
        /* 设置第四个span标签的左边框宽度为0 */
        border-left: 0;
        /* 设置第四个span标签的上边框宽度为0 */
        border-top: 0;
      }
    }
  }
  &__img {
    // 设置图片宽度为100px
    width: 100px;
    // 设置图片位置为绝对定位
    position: absolute;
    // 设置图片左边距为50%
    left: 50%;
    // 设置图片上边距为50%
    top: 50%;
    // 设置图片的水平和垂直居中
    transform: translate(-50%, -50%);
  }
  &__main {
    // 设置主要内容宽度为100%
    width: 100%;
  }
}
</style>
