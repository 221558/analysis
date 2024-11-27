<template>
  <!-- 动态id，避免for循环渲染失败 -->
  <div :id="`lineChart${props.name}`" style="width: 100%; height: 90%; border-radius: 10px"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, defineProps, watch, ref, nextTick, reactive } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  province: {
    type: Boolean,
    default: false,
  },
  chartData: {
    type: Object,
    default: () => {},
  },
});
/* 月份对照表 */
const monthCode = reactive({
  '01': '一月',
  '02': '二月',
  '03': '三月',
  '04': '四月',
  '05': '五月',
  '06': '六月',
  '07': '七月',
  '08': '八月',
  '09': '九月',
  10: '十月',
  11: '十一月',
  12: '十二月',
});
const xData = ref([]);
const yData = ref([]);
watch(
  () => props.chartData,
  newVal => {
    console.log('newVal', newVal);
    xData.value = newVal.timeData.map(item => monthCode[item.split('-')[1]]);
    yData.value = newVal.trendData;
    nextTick(() => {
      initChart();
    });
  },
  {
    immediate: true,
    deep: true,
  }
);
let myChart = ref();
const initChart = () => {
  if (myChart.value) {
    myChart.value.dispose(); // 销毁实例
  }
  const chartDom = document.getElementById('lineChart' + props.name);
  myChart.value = echarts.init(chartDom);
  const option = {
    grid: props.province
      ? {
          left: '10%',
          right: '10%',
          bottom: '18%',
          top: '10%',
        }
      : {},
    backgroundColor: props.province ? 'rgba(1, 52, 104, 0.5)' : 'transparent',
    title: {
      text: props.title || '',
      left: 'center',
      top: '2%',
      textStyle: {
        color: 'rgba(179, 232, 254,1)',
        fontSize: 18,
        fontWeight: '400',
        letterSpacing: 10,
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true, // 坐标轴两边留白策略
        axisLabel: {
          // 坐标轴刻度标签的相关设置
          textStyle: {
            color: 'white',
            fontSize: 14,
          },
          interval: 0, // 强制显示所有标签(小屏适配)
          margin: 20, // 单位是px，设置标签文字距离x轴的间距
        },
        axisLine: {
          // x轴底部的线
          show: true,
          lineStyle: {
            type: 'solid',
            color: 'silver',
            width: 2,
          },
        },
        axisTick: {
          show: false, // 不显示x轴底部的刻度线
        },
        data: xData.value,
      },
    ],
    yAxis: [
      {
        name: '',
        min: 50,
        max: 100,
        interval: 10,
        nameTextStyle: {
          color: '#7ec7ff',
          fontSize: 16,
          padding: 10,
        },
        // min: 0, // y轴最小值
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(141, 161, 182,1)',
            type: 'dashed',
          },
        },
        axisLabel: {
          // y轴刻度
          show: true,
          textStyle: {
            color: 'silver',
            padding: 0,
          },
        },
      },
    ],
    series: [
      {
        name: '体验指数',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 3,
            color: 'rgba(13, 229, 240,1)', // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: 'rgba(25,163,223,1)',
          borderColor: '#646ace',
          borderWidth: 2,
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          // 区域填充样式
          normal: {
            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(25,163,223,.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(25,163,223, 0)',
                },
              ],
              false
            ),
            // shadowColor: 'rgba(25,163,223, 1)', // 阴影颜色
            // shadowBlur: 500, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: yData.value,
      },
    ],
  };
  if (option && typeof option === 'object') {
    myChart.value.setOption(option);
  }
  window.addEventListener('resize', myChart.value.resize);
};
onMounted(() => {
  nextTick(() => {
    initChart();
  });
});
</script>
