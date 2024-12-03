<!-- 趋势展示-网络质量 -->
<template>
  <div class="chart-box">
    <el-row :gutter="24">
      <el-col :span="isSmallScreen ? 24 : 12">
        <!-- IPv4省间互访时延 -->
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv4省间互访时延</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="delayIpv4Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="delayIpv4Form.province"
                    placeholder="全国"
                    @change="getDelayIpv4Data(delayIpv4Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="delayIpv4TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getDelayIpv4Data(delayIpv4Form)"
                    :disabled-date="disabledDate"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="delayIpv4" style="height: 350px" />
        </div>
      </el-col>
      <!-- IPv6省间互访时延 -->
      <el-col :span="isSmallScreen ? 24 : 12">
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv6省间互访时延</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="delayIpv6Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="delayIpv6Form.province"
                    placeholder="全国"
                    @change="getDelayIpv6Data(delayIpv6Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="delayIpv6TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getDelayIpv6Data(delayIpv6Form)"
                    :disabled-date="disabledDate"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="delayIpv6" style="height: 350px" />
        </div>
      </el-col>
      <!-- IPv4省间互访丢包 -->
      <el-col :span="isSmallScreen ? 24 : 12">
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv4省间互访丢包</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="loserIpv4Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="loserIpv4Form.province"
                    placeholder="全国"
                    @change="getLoserIpv4Data(loserIpv4Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="loserIpv4TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getLoserIpv4Data(loserIpv4Form)"
                    :disabled-date="disabledDate"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="loserIpv4" style="height: 350px" />
        </div>
      </el-col>
      <!-- IPv6省间互访丢包 -->
      <el-col :span="isSmallScreen ? 24 : 12">
        <div class="border">
          <!-- 头部 -->
          <el-row class="headers">
            <!-- 左侧标题 -->
            <el-col :span="6">
              <div class="title">IPv6省间互访丢包</div>
            </el-col>
            <!-- 右侧搜索框 -->
            <el-col :span="18">
              <el-form class="form" :inline="true" :model="loserIpv6Form">
                <el-form-item label="省份">
                  <el-select
                    style="width: 90px"
                    v-model="loserIpv6Form.province"
                    placeholder="全国"
                    @change="getLoserIpv6Data(loserIpv4Form)"
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="loserIpv6TimeList"
                    value-format="YYYY-MM"
                    :unlink-panels="true"
                    :clearable="false"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    @change="getLoserIpv6Data(loserIpv4Form)"
                    :disabled-date="disabledDate"
                  />
                </el-form-item>
                <div class="detail">详情</div>
                <el-icon class="icon"><ArrowRight /></el-icon>
              </el-form>
            </el-col>
          </el-row>
          <!-- 体验指数排名图表 -->
          <div ref="loserIpv6" style="height: 350px" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
// 引入echarts库
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from 'vue';
import {
  getDelayIpv4,
  getDelayIpv6,
  getLossIpv4,
  getLossIpv6,
  getProvinceList,
} from '@/api/visual/trend-display';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// monthDataList
const { monthDataList } = useMixins();
// 定义一个响应式变量来存储屏幕宽度
const screenWidth = ref(window.innerWidth);
const isSmallScreen = ref(screenWidth.value < 768);
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};
watchEffect(() => {
  isSmallScreen.value = screenWidth.value < 1566;
});
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

const provinceList = ref([]);
const delayIpv4Form = ref({ province: '', startTime: '', endTime: '' });
const delayIpv6Form = ref({ province: '', startTime: '', endTime: '' });
const loserIpv4Form = ref({ province: '', startTime: '', endTime: '' });
const loserIpv6Form = ref({ province: '', startTime: '', endTime: '' });
const delayIpv4TimeList = ref([]);
const delayIpv6TimeList = ref([]);
const loserIpv4TimeList = ref([]);
const loserIpv6TimeList = ref([]);

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  const [provinceRes] = await Promise.all([getProvinceList()]);
  provinceList.value = provinceRes.data.data;
  // 确保数据已经加载完成后再调用 getHandleData
  nextTick(() => {
    getHandleData();
  });
});

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};

// 定义一个函数，用于设置表单和时间列表
const setFormAndTimeList = (timeList, city) => {
  // 如果monthDataList有值且长度大于0
  if (monthDataList.value && monthDataList.value.length > 0) {
    // 获取monthDataList的最后一个元素的索引
    const length = monthDataList.value.length - 1;
    // 将monthDataList的第一个元素的值赋给timeList的第一个元素
    timeList.value[0] = monthDataList.value[0].value;
    // 将monthDataList的最后一个元素的值赋给timeList的第二个元素
    timeList.value[1] = monthDataList.value[length].value;
    // 将provinceList的第一个元素的值赋给city的province属性
    city.value.province = provinceList.value[0].value;

    // 在下一个tick中执行以下操作
    nextTick(() => {
      // 调用getDelayIpv4Data函数，传入delayIpv4Form的值
      getDelayIpv4Data(delayIpv4Form.value);
      // 调用getDelayIpv6Data函数，传入delayIpv6Form的值
      getDelayIpv6Data(delayIpv6Form.value);
      // 调用getLoserIpv4Data函数，传入loserIpv4Form的值
      getLoserIpv4Data(loserIpv4Form.value);
      // 调用getLoserIpv6Data函数，传入loserIpv6Form的值
      getLoserIpv6Data(loserIpv6Form.value);
    });
  }
};
// 获取处理数据
const getHandleData = () => {
  // 设置IPv4延迟时间和表单
  setFormAndTimeList(delayIpv4TimeList, delayIpv4Form);
  // 设置IPv6延迟时间和表单
  setFormAndTimeList(delayIpv6TimeList, delayIpv6Form);
  // 设置IPv4丢包时间和表单
  setFormAndTimeList(loserIpv4TimeList, loserIpv4Form);
  // 设置IPv6丢包时间和表单
  setFormAndTimeList(loserIpv6TimeList, loserIpv6Form);
};
// 获取IPv4延迟数据
const getDelayIpv4Data = form => {
  // 获取IPv4延迟数据
  getDelayIpv4(handleTime(form, delayIpv4TimeList.value)).then(res => {
    // 下一个tick
    nextTick(() => {
      // 处理数据
      handleData(res.data.data, delayIpv4.value);
    });
  });
};
// 获取IPv6延迟数据
const getDelayIpv6Data = form => {
  // 获取IPv6延迟数据
  getDelayIpv6(handleTime(form, delayIpv6TimeList.value)).then(res => {
    // 下一个tick
    nextTick(() => {
      // 处理数据
      handleData(res.data.data, delayIpv6.value);
    });
  });
};
// 获取输家IPv4数据
const getLoserIpv4Data = form => {
  // 调用getLossIpv4函数，传入处理后的时间和输家IPv4时间列表
  getLossIpv4(handleTime(form, loserIpv4TimeList.value)).then(res => {
    // 在下一个tick中处理数据
    nextTick(() => {
      // 调用handleData函数，传入获取到的数据和输家IPv4
      handleData(res.data.data, loserIpv4.value);
    });
  });
};
// 获取IPv6数据
const getLoserIpv6Data = form => {
  // 调用getLossIpv6函数，传入处理后的时间和loserIpv6TimeList的值
  getLossIpv6(handleTime(form, loserIpv6TimeList.value)).then(res => {
    // 在下一个tick中处理数据
    nextTick(() => {
      // 调用handleData函数，传入res.data.data和loserIpv6的值
      handleData(res.data.data, loserIpv6.value);
    });
  });
};

// 定义一个函数handleTime，用于处理时间
const handleTime = (form, timeList) => {
  // 将timeList的第一个元素赋值给form的startTime属性
  form.startTime = timeList[0];
  // 将timeList的第二个元素赋值给form的endTime属性
  form.endTime = timeList[1];
  // 返回处理后的form对象
  return form;
};

const handleData = (data, ref) => {
  if (!ref) {
    return;
  }

  // 初始化echarts实例，ref为容器，null为配置项，{ renderer: 'canvas', useDirtyRect: false }为渲染器
  let myChart = echarts.init(ref, null, { renderer: 'canvas', useDirtyRect: false });
  // 定义图表的配置项
  let option = {
    color: ['#259eff'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const data = params[0];
        return `${data.name} <br> ${data.marker}${data.seriesName} \u00A0${data.value}ms`;
      },
    },
    // 设置图表的网格
    grid: { top: '10%', left: '1%', right: '1%', bottom: '5%', containLabel: true },
    // 设置x轴
    xAxis: {
      type: 'category',
      data: data.xaxis,
      axisLabel: {
        interval: 0, // 强制显示所有标签
        // rotate: 45, // 旋转标签以防止重叠
        margin: 10, // 标签与轴线的距离
      },
    },
    // 设置y轴
    yAxis: {
      type: 'value',
      // 在每个值后面加上单位 "ms"
      axisLabel: { formatter: '{value}ms' },
    },
    // 设置图表的系列
    series: [
      {
        name: '数据',
        data: data.yaxis,
        type: 'line',
        barWidth: 20,
        barCategoryGap: 10, // 缩小柱状图之间的间距
        label: {
          show: true,
          position: 'top',
          color: '#259eff',
          formatter: params => params.data + 'ms',
        },
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
// 在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
// 导入样式文件
@use '@/styles/bar-line.scss';
</style>