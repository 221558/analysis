<template>
  <div class="chart-box">
    <!-- 省间互访时延排名（IPv4） -->
    <div class="border">
      <el-row class="headers">
        <el-col :span="8">
          <div class="title">省间互访时延排名（IPv4）</div>
        </el-col>
        <el-col :span="16" class="flex-center">
          <el-form-item class="search" label="时间选择">
            <el-date-picker v-model="value2" type="month" placeholder="选择月份" />
            <span class="detail">详情</span>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form-item>
        </el-col>
      </el-row>
      <div ref="delayIpv4" style="height: 350px" />
    </div>

    <!-- 省间互访时延排名（IPv6） -->
    <div class="border">
      <el-row class="headers">
        <el-col :span="10">
          <div class="title">省间互访时延排名（IPv6）</div>
        </el-col>
        <el-col :span="14" class="flex-center">
          <el-form-item class="search" label="时间选择">
            <el-date-picker v-model="value2" type="month" placeholder="选择月份" />
            <span class="detail">详情</span>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form-item>
        </el-col>
      </el-row>
      <div ref="delayIpv6" style="height: 350px" />
    </div>

    <!-- 省间互访丢包排名（IPv4） -->
    <div class="border">
      <el-row class="headers">
        <el-col :span="10">
          <div class="title">省间互访丢包排名（IPv4）</div>
        </el-col>
        <el-col :span="14" class="flex-center">
          <el-form-item class="search" label="时间选择">
            <el-date-picker v-model="value2" type="month" placeholder="选择月份" />
            <span class="detail">详情</span>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form-item>
        </el-col>
      </el-row>
      <div ref="loserIpv4" style="height: 350px" />
    </div>

    <!-- 省间互访丢包排名（IPv6） -->
    <div class="border">
      <el-row class="headers">
        <el-col :span="10">
          <div class="title">省间互访丢包排名（IPv6）</div>
        </el-col>
        <el-col :span="14" class="flex-center">
          <el-form-item class="search" label="时间选择">
            <el-date-picker v-model="value2" type="month" placeholder="选择月份" />
            <span class="detail">详情</span>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form-item>
        </el-col>
      </el-row>
      <div ref="loserIpv6" style="height: 350px" />
    </div>
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
// 定义一个响应式变量，用于存储当前激活的标签页名称
const activeName = ref('first');
// 定义一个响应式变量，用于存储IPv4的延迟时间
const delayIpv4 = ref(null);
// 定义一个响应式变量，用于存储IPv6的延迟时间
const delayIpv6 = ref(null);
// 定义一个响应式变量，用于存储IPv4的丢包率
const loserIpv4 = ref(null);
// 定义一个响应式变量，用于存储IPv6的丢包率
const loserIpv6 = ref(null);
// 定义一个响应式变量，用于存储输入框的值
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
  // getDelayIpv4(data, delayIpv4.value);
  // getDelayIpv6(data, delayIpv6.value);
  // getLoserIpv4(data, loserIpv4.value);
  // getLoserIpv6(data, loserIpv6.value);

  handleData(data, delayIpv4.value);
  handleData(data, delayIpv6.value);
  handleData(data, loserIpv4.value);
  handleData(data, loserIpv6.value);
});

// const getDelayIpv4 = (data, ref) => {
//   handleData(data, ref);
// };
// const getDelayIpv6 = (data, ref) => {
//   handleData(data, ref);
// };
// const getLoserIpv4 = (data, ref) => {
//   handleData(data, ref);
// };
// const getLoserIpv6 = (data, ref) => {
//   handleData(data, ref);
// };

const handleData = (data, ref) => {
  // 将data中的每个元素的label属性提取出来，存入labels数组中
  const labels = data.map(item => item.label);
  // 将data中的每个元素的value属性提取出来，存入values数组中
  const values = data.map(item => item.value);
  // 初始化echarts实例，ref为容器，null为配置项，{ renderer: 'canvas', useDirtyRect: false }为渲染器
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
  // 监听窗口大小变化事件，当窗口大小变化时，重新调整图表大小
  window.addEventListener('resize', myChart.resize);
};

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  // 设置高度为40px，并且强制应用
  height: 40px !important;
  // 设置行高为40px，并且强制应用
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
          // 设置外边距为0
          margin: 0;
        }
        .search {
          // 设置宽度为400px
          width: 400px;
          // 设置定位方式为绝对定位
          position: absolute;
          // 设置顶部距离为0
          top: 0;
          // 设置右侧距离为0
          right: 0;
          .detail {
            // 设置左边距为20px
            margin-left: 20px;
          }
          .icon,
          .detail {
            // 设置字体颜色为蓝色
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