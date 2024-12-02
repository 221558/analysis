<!-- 趋势展示-业务质量 -->
<template>
  <div class="chart-box">
    <!-- 外层容器 -->
    <div class="border">
      <!-- 头部 -->
      <el-row class="headers">
        <!-- 左侧标题 -->
        <el-col :span="4">
          <div class="title">业务体验指数排名</div>
        </el-col>
        <!-- 右侧搜索框 -->
        <el-col :span="20">
          <el-form class="form" :inline="true" :model="form">
            <el-form-item label="省份">
              <el-select
                style="width: 120px"
                v-model="form.province"
                placeholder="活动区域"
                @change="getExperienceEanking"
              >
                <el-option
                  v-for="item in ProvinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="业务选择">
              <el-select
                style="width: 120px"
                v-model="form.businessType"
                placeholder="活动区域"
                @change="getExperienceEanking"
              >
                <el-option
                  v-for="item in businesstypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="timeList"
                value-format="YYYY-MM"
                :unlink-panels="true"
                type="monthrange"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                :disabled-date="disabledDate"
                @change="getExperienceEanking"
              />
            </el-form-item>
            <div class="detail">详情</div>
            <el-icon class="icon"><ArrowRight /></el-icon>
          </el-form>
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
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// monthDataList
const { monthDataList } = useMixins();
// 导入获取业务类型列表的函数
import { getBusinesstypeList } from '@/api/visual/rankings';
import { getProvinceList, getExperience } from '@/api/visual/trend-display';

// 定义一个响应式变量activeName，初始值为'first'
const activeName = ref('first');
// 定义一个响应式变量experienceEanking，初始值为null
const experienceEanking = ref(null);

// 定义业务类型列表的响应式数据
const businesstypeList = ref([]);
const ProvinceList = ref([{ label: '全国', value: '全国' }]);
const data = ref([]);
const timeList = ref([]);
const form = ref({ province: '', businessType: '', startTime: '', endTime: '' });

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};

onMounted(async () => {
  // const [provinceRes, businessRes] = await Promise.all([getProvinceList(), getBusinesstypeList()]);
  const [businessRes] = await Promise.all([getBusinesstypeList()]);
  // ProvinceList.value = provinceRes.data.data;
  businesstypeList.value = businessRes.data.data;
  // 确保数据已经加载完成后再调用 getHandleData
  nextTick(() => {
    getHandleData();
  });
});

const getHandleData = async () => {
  if (monthDataList.value && monthDataList.value.length > 0) {
    const length = monthDataList.value.length - 1;
    // 回显 开始
    timeList.value[0] = monthDataList.value[0].value;
    // 回显 结束
    timeList.value[1] = monthDataList.value[length].value;

    // 确保 ProvinceList 和 businesstypeList 不为空
    if (ProvinceList.value && ProvinceList.value.length > 0) {
      form.value.province = ProvinceList.value[0].value;
    }

    if (businesstypeList.value && businesstypeList.value.length > 0) {
      form.value.businessType = businesstypeList.value[0].value;
    }
    form.value.startTime = timeList.value[0];
    form.value.endTime = timeList.value[1];

    nextTick(() => {
      getExperienceEanking(form.value);
    });
  }
};

const getExperienceEanking = form => {
  getExperience(form).then(res => {
    handleData(res.data.data);
  });
};

// 定义一个函数，用于处理数据并生成图表
const handleData = data => {
  // 初始化图表
  let myChart = echarts.init(experienceEanking.value, null, {
    renderer: 'canvas',
    useDirtyRect: false,
  });
  // 定义图表的配置项
  let option = {
    color: ['#259eff'],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
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
    yAxis: { type: 'value' },
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
          // formatter: params => params.data + 'ms',
        },
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
</script>

<style lang="scss" scoped>
// 导入样式文件
@use '@/styles/bar-line.scss';
</style>