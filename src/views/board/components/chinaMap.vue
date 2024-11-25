<template>
  <div id="chart-panel" style="width: 45vw; height: 70vh"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import mittBus from '@/utils/mitt';
import chinaMap from './china.json';
const option = reactive({
  title: {
    text: '',
  },
  // tooltip: {
  //   trigger: 'item',
  // },
  geo: {
    map: 'china',
    aspectScale: 0.95, //长宽比
    zoom: 1.2,
    roam: false,
    itemStyle: {
      normal: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'transparent', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(10, 139, 207,1)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: 'rgba(10, 139, 207,1)',
        shadowOffsetX: 7,
        shadowOffsetY: 12,
        borderWidth: 0,
      },
      emphasis: {
        areaColor: '#2AB8FF',
        borderWidth: 0,
        color: 'green',
        label: {
          show: false,
        },
      },
    },
    regions: [
      {
        name: '南海诸岛',
        itemStyle: {
          areaColor: 'rgba(0, 10, 52, 0)',
          borderColor: 'rgba(0, 10, 52, 0)',
          normal: {
            opacity: 0,
            label: {
              show: false,
              color: '#009cc9',
            },
          },
        },
      },
    ],
  },
  series: [
    {
      type: 'map',
      map: 'china',
      zoom: 1.2,
      // geoIndex: 1,
      aspectScale: 0.95,
      // 省份显示
      label: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 15,
            color: 'white',
          },
        },
        emphasis: {
          show: true,
          textStyle: {
            color: 'black',
          },
        },
      },
      // 区域颜色
      itemStyle: {
        normal: {
          borderColor: 'rgba(88, 242, 253,1)',
          borderWidth: 1.2,
          areaColor: 'rgba(53, 115, 208,0.7)',
        },
        emphasis: {
          // 鼠标悬浮上面的样式
          borderColor: 'rgba(88, 242, 253,1)',
          areaColor: 'rgba(65, 180, 237,0.9)',
          borderWidth: 4,
        },
      },
      // selectedMode: false, // 是否支持选中多个区域
      selectedMode: 'single', //选择模式，单选，只能选中一个地市
      select: {
        //鼠标点击后，地图想要展示的配置
        disabled: false, //可以被选中
        itemStyle: {
          areaColor: 'rgba(65, 180, 237,0.9)', //选中
          borderColor: 'rgba(88, 242, 253,1)',
          borderWidth: 4,
        },
      },
      data: [
        { name: '四川', rank: 93.15, top: 18 },
        { name: '西藏', rank: 92.26, top: 23 },
      ],
    },
  ],
});
const initMap = () => {
  echarts.registerMap('china', chinaMap);
  const chart = echarts.init(document.getElementById('chart-panel'));
  chart.setOption(option);
  chart.on('click', function (params) {
    mittBus.emit('clickMap', params.data);
    console.log(params);
    // chart.setOption({
    //   geo: {
    //     regions: [
    //       {
    //         name: params.name,
    //         itemStyle: {
    //           areaColor: 'rgba(53, 115, 208,1)',
    //           borderWidth: 40,
    //         },
    //       },
    //     ],
    //   },
    // });
  });
};
onMounted(() => {
  initMap();
});
</script>
