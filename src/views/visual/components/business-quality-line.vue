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
                placeholder="选择省份"
                @change="getExperienceEanking(form)"
              >
                <el-option
                  v-for="item in provinceList"
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
                placeholder="选择业务"
                @change="getExperienceEanking(form)"
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
                @change="getExperienceEanking(form)"
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
// 定义一个provinceList变量，用于存储省份列表
const provinceList = ref([]);
// 定义一个data变量，用于存储数据
const data = ref([]);
// 定义一个timeList变量，用于存储时间列表
const timeList = ref([]);
// 定义一个form变量，用于存储表单数据
const form = ref({ province: '', businessType: '', startTime: '', endTime: '' });

// 定义禁用未来日期的函数
const disabledDate = time => {
  // 如果传入的时间大于当前时间，则返回true，表示禁用该日期
  return time.getTime() > Date.now();
};

onMounted(async () => {
  const [provinceRes, businessRes] = await Promise.all([getProvinceList(), getBusinesstypeList()]);
  provinceList.value = provinceRes.data.data;
  businesstypeList.value = businessRes.data.data;
  // 确保数据已经加载完成后再调用 getHandleData
  nextTick(() => {
    getHandleData();
  });
});

const getHandleData = async () => {
  // 判断 monthDataList 是否存在且长度大于0
  if (monthDataList.value && monthDataList.value.length > 0) {
    // 获取 monthDataList 的长度减1
    const length = monthDataList.value.length - 1;
    // 回显 开始
    timeList.value[0] = monthDataList.value[0].value;
    // 回显 结束
    timeList.value[1] = monthDataList.value[length].value;

    // 确保 ProvinceList 和 businesstypeList 不为空
    if (provinceList.value && provinceList.value.length > 0) {
      // 将 ProvinceList 的第一个值赋值给 form 的 province
      form.value.province = provinceList.value[0].value;
    }

    if (businesstypeList.value && businesstypeList.value.length > 0) {
      // 将 businesstypeList 的第一个值赋值给 form 的 businessType
      form.value.businessType = businesstypeList.value[0].value;
    }
    // 在 nextTick 中调用 getExperienceEanking 方法，并传入 form 的值
    nextTick(() => {
      getExperienceEanking(form.value);
    });
  }
};

// 根据传入的form参数，获取经验排行榜
const getExperienceEanking = form => {
  // 将时间列表的第一个值赋给form的startTime属性
  form.startTime = timeList.value[0];
  // 将时间列表的第二个值赋给form的endTime属性
  form.endTime = timeList.value[1];
  // 调用getExperience方法，传入form参数，获取经验排行榜
  getExperience(form).then(res => {
    // 处理获取到的数据
    handleData(res.data.data, experienceEanking.value);
  });
};

// 定义一个函数，用于处理数据并生成图表
const handleData = (data, ref) => {
  // 初始化图表
  let myChart = echarts.init(ref, null, {
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