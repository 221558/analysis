<template>
  <!-- 基础容器 -->
  <basic-container>
    <!-- 首页内容 -->
    <el-row class="home">
      <!-- 遍历数据 -->
      <div
        class="property"
        v-for="item in data"
        :key="item.label"
        :style="{ backgroundColor: item.color }"
        @click="getJumpRelatedPage(item.url)"
      >
        <!-- 显示标签 -->
        <span>{{ item.label }}</span>
        <!-- 显示图片 -->
        <img :src="item.image" :alt="item.label" />
      </div>
    </el-row>
  </basic-container>
</template>

<script setup>
// 导入getCurrentInstance函数  onMounted, ref, getCurrentInstance
import { getCurrentInstance } from 'vue';
// 导入ElMessage组件
// import { ElMessage } from 'element-plus';
// 导入getCurrentInstance函数
const { proxy } = getCurrentInstance();
// 获取当前实例的代理对象
const _this = proxy;

// 定义一个响应式数据，包含多个对象，每个对象包含label、url、image和color属性
const data = [
  {
    // 大屏展示
    label: '大屏展示',
    // 图片链接
    url: '/board/board',
    // 图片路径
    image: '/image/large_screen_display.png',
    // 图片颜色
    color: '#eaf2ff',
  },
  {
    // 数据录入
    label: '数据录入',
    // 路径
    url: '/entry/index',
    // 图片路径
    image: '/image/data_entry.png',
    // 颜色
    color: '#eaf9f9',
  },
  // 数据查询
  {
    label: '数据查询',
    url: '/data-query/original-report/index',
    image: '/image/data_query.png',
    color: '#eff1ff',
  },
  {
    // 可视化展示
    label: '可视化展示',
    // 图片链接
    url: '/visual/rankings',
    // 图片路径
    image: '/image/visual_display.png',
    // 图片颜色
    color: '#fff5eb',
  },
  {
    // 业务预警
    label: '业务预警',
    // 链接
    url: '/business-warning/threshold-settings',
    // 图片路径
    image: '/image/business_warning.png',
    // 颜色
    color: '#f0faef',
  },
  // 根因分析
  { label: '根因分析', url: '1', image: '/image/cause_analysis.png', color: '#eaf2ff' },
  // 系统管理
  {
    label: '系统管理',
    // 路径
    url: '/system/user',
    // 图片路径
    image: '/image/system_management.png',
    // 颜色
    color: '#eaf9f9',
  },
  // 大模型问答
  {
    label: '大模型问答',
    // 路径
    url: 'http://172.31.55.21:18889/report-nl2/#/login',
    // 图片路径
    image: '/image/answers_large.png',
    // 颜色
    color: '#eaf2ff',
  },
];

// 跳转相关模块
const getJumpRelatedPage = url => {
  // 跳转大模型问答
  if (url.indexOf('http') !== -1) {
    window.open(url);
    return;
  }
  // 跳转到 url
  _this.$router.push({ path: url });
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100vh - 180px);
  display: flex;
  /* 允许子元素换行 */
  flex-wrap: wrap;
  /* 使子元素在垂直方向上对齐到顶部 */
  align-items: flex-start;
  /* 设置内容在交叉轴上的对齐方式为起始位置 */
  align-content: flex-start;

  .property {
    /* 设置宽度为300px */
    width: 300px;
    /* 设置高度为145px */
    height: 145px;
    /* 设置边框圆角为8px */
    border-radius: 8px;
    /* 设置底部外边距为20px */
    margin-bottom: 20px;
    /* 设置背景颜色为粉色 */
    background: pink;
    /* 调整左边距，使元素居中对齐 */
    margin-left: 10px;
    /* 调整右边距，使元素居中对齐 */
    margin-right: 10px;
    /* 设置为弹性布局 */
    display: flex;
    /* 垂直居中对齐 */
    align-items: center;
    /* 水平分布对齐 */
    justify-content: space-around;
    /* 设置字体大小为20px */
    font-size: 20px;
    /* 设置字体粗细为500 */
    font-weight: 500;
    /* 设置鼠标悬停时为手型 */
    cursor: pointer;
    img {
      /* 设置图片宽度为60px */
      width: 60px;
      /* 设置图片高度为50px */
      height: 50px;
      /* 设置图片垂直居中对齐 */
      vertical-align: middle;
    }
  }
}
</style>
