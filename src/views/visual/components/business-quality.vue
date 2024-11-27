<template>
  <div class="chart-box">
    <!-- 外层容器 -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="8">
          <div class="title">业务体验指数排名</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="16" class="flex-center">
          <div class="search">
            <!-- 业务选择 -->
            <div style="width: 300px; display: inline-block">
              <el-form-item label="业务选择">
                <el-date-picker v-model="value2" type="month" placeholder="选择业务" />
              </el-form-item>
            </div>
            <!-- 时间选择 -->
            <div style="width: 400px; display: inline-block">
              <el-form-item label="时间选择">
                <el-date-picker v-model="value2" type="month" placeholder="选择月份" />
                <span class="detail">详情</span>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 体验指数排名图表 -->
      <div ref="experienceEanking" style="height: 600px" />
    </div>
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
// 导入onMounted和ref函数
import { onMounted, ref } from 'vue';
// 定义一个响应式变量activeName，初始值为'first'
const activeName = ref('first');
// 定义一个响应式变量experienceEanking，初始值为null
const experienceEanking = ref(null);
// 定义一个响应式变量value2，初始值为空字符串
const value2 = ref('');

// 定义一个函数，用于生成一个1到100之间的随机整数
const getRandomValue = () => {
  // 生成一个1到100之间的随机整数
  return Math.floor(Math.random() * 100) + 1;
};
const data = [
  { label: '北京', value: getRandomValue() },
  { label: '天津', value: getRandomValue() },
  { label: '上海', value: getRandomValue() },
  { label: '重庆', value: getRandomValue() },
  { label: '河北', value: getRandomValue() },
  { label: '山西', value: getRandomValue() },
  { label: '内蒙古', value: getRandomValue() },
  { label: '辽宁', value: getRandomValue() },
  { label: '吉林', value: getRandomValue() },
  { label: '黑龙江', value: getRandomValue() },
  { label: '江苏', value: getRandomValue() },
  { label: '浙江', value: getRandomValue() },
  { label: '安徽', value: getRandomValue() },
  { label: '福建', value: getRandomValue() },
  { label: '江西', value: getRandomValue() },
  { label: '山东', value: getRandomValue() },
  { label: '河南', value: getRandomValue() },
  { label: '湖北', value: getRandomValue() },
  { label: '湖南', value: getRandomValue() },
  { label: '广东', value: getRandomValue() },
  { label: '广西', value: getRandomValue() },
  { label: '海南', value: getRandomValue() },
  { label: '四川', value: getRandomValue() },
  { label: '贵州', value: getRandomValue() },
  { label: '云南', value: getRandomValue() },
  { label: '西藏', value: getRandomValue() },
  { label: '陕西', value: getRandomValue() },
  { label: '甘肃', value: getRandomValue() },
  { label: '青海', value: getRandomValue() },
  { label: '宁夏', value: getRandomValue() },
  { label: '新疆', value: getRandomValue() },
  { label: '香港', value: getRandomValue() },
  { label: '澳门', value: getRandomValue() },
  { label: '台湾', value: getRandomValue() },
];

onMounted(() => {
  // getExperienceEanking(data, experienceEanking.value);
  handleData(data, experienceEanking.value);
});

// const getExperienceEanking= (data, ref) => {
//   handleData(data, ref);
// };

// 定义一个函数，用于处理数据并生成图表
const handleData = (data, ref) => {
  // 获取数据的标签
  const labels = data.map(item => item.label);
  // 获取数据的值
  const values = data.map(item => item.value);
  // 初始化图表
  let myChart = echarts.init(ref, null, { renderer: 'canvas', useDirtyRect: false });
  // 定义图表的配置项
  let option = {
    // 设置图表的网格
    grid: { top: '10%', left: '1%', right: '1%', bottom: '5%', containLabel: true },
    // 设置x轴
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: {
        interval: 0, // 强制显示所有标签
        // rotate: 45, // 旋转标签以防止重叠
        margin: 10, // 标签与轴线的距离
      },
    },
    // 设置y轴
    yAxis: { type: 'value' },
    // 设置图表的系列
    series: [
      {
        data: values,
        type: 'bar',
        barWidth: 20,
        barCategoryGap: 10, // 缩小柱状图之间的间距
        label: { show: true, position: 'top', color: '#909399' },
      },
    ],
  };
  // 如果配置项存在且为对象，则设置图表的配置项
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
  // 监听窗口大小变化，重新调整图表大小
  window.addEventListener('resize', myChart.resize);
};

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  height: 40px !important;
  line-height: 40px !important;
}
.chart-box {
  // 设置背景颜色为白色
  background-color: #fff;
  // 设置内边距为15px
  padding: 15px;
  // 设置左下角圆角半径为5px
  border-bottom-left-radius: 5px;
  // 设置右下角圆角半径为5px
  border-bottom-right-radius: 5px;
  .border {
    /* 设置边框样式为1像素实线，颜色为#ebedf0 */
    border: 1px solid #ebedf0;
    /* 设置边框圆角为5像素 */
    border-radius: 5px;
    /* 设置底部外边距为15像素 */
    margin-bottom: 15px;
    .headers {
      // 设置内边距
      padding: 0 10px;
      // 设置高度
      height: 40px;
      // 设置行高
      line-height: 40px;
      // 设置背景颜色
      background-color: #ebedf0;
      // 设置左上角圆角
      border-top-left-radius: 5px;
      // 设置右上角圆角
      border-top-right-radius: 5px;
      .title {
        // 设置标题字体粗细为500
        font-weight: 500;
      }
      .el-col {
        // 设置el-col的margin为0
        margin: 0;
      }
      .flex-center {
        // 设置高度为40px
        height: 40px;
        // 设置行高为40px
        line-height: 40px;
        // 设置定位为相对定位
        position: relative;
        .el-form-item {
          // 设置表单项的外边距为0
          margin: 0;
        }
        .search {
          // 设置宽度为700px
          width: 700px;
          // 设置定位方式为绝对定位
          position: absolute;
          // 设置距离顶部为0
          top: 0;
          // 设置距离右边为0
          right: 0;
          .detail {
            // 设置左边距为20像素
            margin-left: 20px;
          }
          .icon,
          .detail {
            // 设置文字颜色为蓝色
            color: #409eff;
            /* 设置鼠标悬停时为手型 */
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>