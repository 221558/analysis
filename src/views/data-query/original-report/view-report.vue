<template>
  <basic-container>
    <div class="view-report">
      <el-button class="handle-button top" plain @click="getReturn">返回</el-button>
      <div class="title">[{{ objcet.num }}]:{{ objcet.name }}</div>
      <div class="annotation">上传时间(2024-02-03) 所属月份({{ objcet.month }}) 阅读信息(23)</div>
      <div>121212</div>
      <div>121212</div>
      <div>121212</div>
      <div>121212</div>
      <el-button class="handle-button bottom" type="primary" text @click="getDownload">
        <el-icon><Download /></el-icon>
        <span>下载</span>
      </el-button>
    </div>
  </basic-container>
</template>

<script setup>
// 引入mixin
import { useMixins } from '@/mixins/data.js';
const { _this } = useMixins();
// 获取路由参数
const objcet = _this.$route.query;

console.log(objcet);
// 返回按钮点击事件
/* eslint-disable no-unused-vars */
const getReturn = () => {
  _this.$router.push({ path: '/data-query/original-report/index' });
};

// 下载按钮点击事件
/* eslint-disable no-unused-vars */
const getDownload = () => {
  console.log('下载模板');
};
</script>

<style lang="scss" scoped>
.view-report {
  // 设置高度为视口高度减去180px
  height: calc(100vh - 180px);
  // 设置定位为相对定位
  position: relative;

  // 标题样式
  .title {
    // 设置字体大小为28px
    font-size: 28px;
    // 设置文本居中对齐
    text-align: center;
  }
  // 注释样式
  .annotation {
    // 设置字体大小为14px
    font-size: 14px;
    // 设置文本居中对齐
    text-align: center;
    // 设置行高为21px
    line-height: 21px;
    // 设置颜色为rgba(187, 187, 187, 1)
    color: rgba(187, 187, 187, 1);
  }

  // 处理按钮样式
  .handle-button {
    // 设置定位为绝对定位
    position: absolute;
    // 设置右对齐
    right: 0;
  }
  // 顶部样式
  .top {
    // 设置顶部为0
    top: 0;
  }
  // 底部样式
  .bottom {
    // 设置底部为0
    bottom: 0;
  }
}
</style>