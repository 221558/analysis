<template>
  <div>
    <basic-container class="base-operation">
      <div class="content-top">
        <div class="top">
          <el-row>
            <el-col :span="4" class="top-col">
              <div class="top-circle" :class="isActiveClassFrom(1)">
                <span>1</span>
              </div>
              <el-date-picker
                class="date-picker"
                :class="isActiveClass >= 1 ? 'date-picker-active' : ''"
                style="width: 80%;"
                prefix-icon="icon"
                v-model="month"
                type="month"
                placeholder="时间选择"
                :disabled-date="disabledDate"
                value-format="YYYY-MM"
                @change="handleMonthChange($event, 1)"
              />
            </el-col>
            <el-col :span="1" class="top-col">
              <el-icon :size="20" :color="iconColor(1)"><ArrowRightBold /></el-icon>
            </el-col>
            <el-col :span="4" class="top-col">
              <div class="top-circle" :class="isActiveClassTwo(2)">
                <span>2</span>
              </div>
              <el-select
                v-model="type"
                clearable
                collapse-tags
                placeholder="类型选择"
                class="custom-select"
                :class="isActiveClass + 1 === 2 ? 'custom-select' : isActiveClass >= 2 ? 'custom-select-active' : 'custom-select-inactive'"
                :max-collapse-tags="1"
                style="width: 80%;"
                @change="handleMonthChange($event, 2)"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="1" class="top-col">
              <el-icon :size="20" :color="iconColor(2)"><ArrowRightBold /></el-icon>
            </el-col>
            <el-col :span="4" class="top-col">
              <div class="top-circle" :class="isActiveClassTwo(3)">
                <span>3</span>
              </div>
              <el-select
                v-model="business"
                clearable
                collapse-tags
                placeholder="业务选择"
                class="custom-select"
                :class="isActiveClass + 1 === 3 ? 'custom-select' : isActiveClass >= 3 ? 'custom-select-active' : 'custom-select-inactive'"
                :max-collapse-tags="1"
                style="width: 80%;"
                @change="handleMonthChange($event, 3)"
              >
                <el-option
                  v-for="item in businessList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="1" class="top-col">
              <el-icon :size="20" :color="iconColor(3)"><ArrowRightBold /></el-icon>
            </el-col>
            <el-col :span="4" class="top-col">
              <div class="top-circle" :class="isActiveClassTwo(4)">
                <span>4</span>
              </div>
              <el-select
                v-model="area"
                multiple
                clearable
                collapse-tags
                placeholder="省份选择"
                class="custom-select"
                :class="isActiveClass + 1 === 4 ? 'custom-select' : isActiveClass >= 4 ? 'custom-select-active' : 'custom-select-inactive'"
                :max-collapse-tags="1"
                style="width: 80%;"
                @change="handleMonthChange($event, 4)"
              >
                <template #header>
                  <el-checkbox
                    v-model="checkAll"
                    :indeterminate="indeterminate"
                    @change="handleCheckAll"
                  >一键全选
                  </el-checkbox>
                </template>
                <el-option
                  v-for="item in areaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="1" class="top-col">
              <el-icon :size="20" :color="iconColor(4)"><ArrowRightBold /></el-icon>
            </el-col>
            <el-col :span="4" class="top-col">
              <div class="top-circle" :class="isActiveClassTwo(4)">
                <span>5</span>
              </div>
              <el-select
                v-model="target"
                clearable
                collapse-tags
                placeholder="指标选择"
                class="custom-select"
                :class="isActiveClass + 1 === 5 ? 'custom-select' : isActiveClass >= 5 ? 'custom-select-active' : 'custom-select-inactive'"
                :max-collapse-tags="1"
                style="width: 80%;"
                @change="handleMonthChange($event, 5)"
              >
                <el-option
                  v-for="item in targetList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="bottom">
          <el-button color="#0068FF" type="primary">查询</el-button>
          <el-button class="reset-btn">重置</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <basic-title title="查询结果" />
    </basic-container>
  </div>
</template>

<script setup>
import BasicTitle from '@/components/basic-title/main.vue'
import { ref, watch } from 'vue'
const month = ref('')
const isActiveClass = ref(0)

// 业务类型数据
const type = ref('')
const typeList = ref([
  { label: '网络质量', value: 1 },
  { label: '业务质量', value: 2 },
])

// 业务数据
const business = ref('')
const businessList = ref([])
const networkList = ref([
  { label: '省间联通网内互访时延', value: 1 },
  { label: '省间联通网内互访丢包', value: 2 },
])
const businessListData = ref([
  { label: '网站业务', value: 3 },
  { label: '网站(IDC)业务', value: 4 },
  { label: '国际网站业务', value: 5 },
  { label: '视频业务', value: 6 },
  { label: '文件业务', value: 7 },
  { label: '游戏业务', value: 8 },
])

// 省份数据
const checkAll = ref(false)
const indeterminate = ref(false)
const area = ref([])
const areaList = ref([
  { label: '北京', value: 1 },
  { label: '天津', value: 2 },
  { label: '河北', value: 3 },
  { label: '山西', value: 4 },
  { label: '内蒙古', value: 4 },
  { label: '辽宁', value: 4 },
  { label: '吉林', value: 4 },
  { label: '黑龙江', value: 4 },
  { label: '上海', value: 4 },
  { label: '江苏', value: 4 },
  { label: '浙江', value: 4 },
  { label: '安徽', value: 4 },
  { label: '福建', value: 4 },
  { label: '江西', value: 4 },
  { label: '山东', value: 4 },
  { label: '河南', value: 4 },
  { label: '湖北', value: 4 },
  { label: '湖南', value: 4 },
  { label: '广东', value: 4 },
  { label: '广西', value: 4 },
  { label: '海南', value: 4 },
  { label: '重庆', value: 4 },
  { label: '四川', value: 4 },
  { label: '贵州', value: 4 },
  { label: '云南', value: 4 },
  { label: '西藏', value: 4 },
  { label: '陕西', value: 4 },
  { label: '甘肃', value: 4 },
  { label: '青海', value: 4 },
  { label: '宁夏', value: 4 },
  { label: '新疆', value: 4 },
])

// 指标数据
const target = ref('')
const targetList = ref([])
const targetIPList = ref([
  { label: 'IPv4', value: 1 },
  { label: 'IPv6', value: 2 },
])
const targetBasicsList = ref([
  { label: '体验指数', value: 3 },
  { label: 'DNS解析时延', value: 4 },
  { label: 'DNS解析成功率', value: 5 },
  { label: 'TCP连接时延', value: 6 },
])
const targetWebList = ref([
  { label: '首包响应时延', value: 7 },
  { label: '首屏时延', value: 8 },
  { label: '首页时延', value: 9 },
  { label: '访问成功率', value: 10 },
])
const targetVideoList = ref([
  { label: '首次播放时延', value: 11 },
  { label: '卡顿率', value: 12 },
  { label: '平均下载速率', value: 13 },
  { label: '视频播放成功率', value: 14 },
])
const targetFileList = ref([
  { label: '文件下载速率', value: 15 },
  { label: '文件下载成功率', value: 16 },
])
const targetGameList = ref([
  { label: '体验指数', value: 3 },
  { label: '平均时延', value: 17 },
  { label: '平均丢包率', value: 18 },
  { label: '抖动时延', value: 19 },
])

watch(area, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === areaList.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

const handleCheckAll = (val) => {
  handleMonthChange(val, 4)
  indeterminate.value = false
  if (val) {
    area.value = areaList.value.map((_) => _.value)
  } else {
    area.value = []
  }
}

// 禁用日期
function disabledDate(time) {
  return time.getTime() > Date.now()
}

// 清空选择框数据
function clearData(typeData) {
  switch (typeData) {
    case 1:
      type.value = ''
      business.value = ''
      area.value = []
      checkAll.value = false
      indeterminate.value = false
      target.value = ''
      break
    case 2:
      business.value = ''
      area.value = []
      checkAll.value = false
      indeterminate.value = false
      target.value = ''
      break
    case 3:
      area.value = []
      checkAll.value = false
      indeterminate.value = false
      target.value = ''
      break
    case 4:
      target.value = ''
      break
  }
}

/**
 * 月份选择变化时触发
 * @param val 选择的数据值
 * @param step 第几步
 */
function handleMonthChange(val, step) {
  clearData(step)
  if (!val) {
    isActiveClass.value = step - 1
    return
  }
  if (step === 2 && val === 1) {
    businessList.value = networkList.value
    targetList.value = targetIPList.value
  }
  if (step === 2 && val === 2) {
    businessList.value = businessListData.value
  }
  if (step === 3 && [3, 4, 5].includes(val)) {
    targetList.value = [...targetBasicsList.value, ...targetWebList.value]
  }
  if (step === 3 && val === 6) {
    targetList.value = [...targetBasicsList.value, ...targetVideoList.value]
  }
  if (step === 3 && val === 7) {
    targetList.value = [...targetBasicsList.value, ...targetFileList.value]
  }
  if (step === 3 && val === 8) {
    targetList.value = [...targetBasicsList.value, ...targetGameList.value]
  }
  isActiveClass.value = step
}

// 图标颜色
function iconColor(step) {
  return isActiveClass.value >= step ? '#6DA9FF' : '#D7D7D7'
}

// 图标是否激活
function isActiveClassFrom(step) {
  return isActiveClass.value >= step ? 'top-circle-active' : 'top-circle-default'
}
function isActiveClassTwo(step) {
  if (isActiveClass.value + 1 === step) {
    return 'top-circle-default'
  } else if (isActiveClass.value >= step) {
    return 'top-circle-active'
  }
  return 'top-circle-inactive'
}

</script>

<style lang="scss" scoped>
:deep.base-operation {
  .content-top {
    padding: 40px;
    .top {
      .top-col {
        display: flex;
        align-items: center;
        justify-content: center;
        .date-picker {
          height: 45px;
          .el-input__prefix {
            display: none;
          }
          .el-input__wrapper {
            border: 1px solid #0068FF;
          }
          input {
            text-align: center;
            &::placeholder {
              // 设置placeholder的文字颜色
              color: #0068FF;
            }
          }
        }
        .date-picker-active {
          .el-input__wrapper {
            border: none;
            background: #0068FF;
            color: #fff;
          }
          input {
            text-align: center;
            color: #fff;
          }
        }

        .custom-select {
          .el-select__wrapper {
            height: 45px;
            border: 1px solid #0068FF;
            .el-select__selected-item {
              text-align: center;
              color: #0068FF;
            }
            .el-select__icon {
              color: #0068FF;
            }
          }
        }

        .custom-select-inactive {
          .el-select__wrapper {
            background: #BEBEBE;
            border: none;
            .el-select__selected-item {
              color: #FFFFFF;
            }
            .el-select__icon {
              color: #FFFFFF;
            }
          }
        }

        .custom-select-active {
          .el-select__wrapper {
            background: #0068FF;
            border: none;
            .el-select__selected-item {
              color: #FFFFFF;
            }
            .el-select__icon {
              color: #FFFFFF;
            }
          }
        }

        .el-tag {
          background: #0068FF;
          color: #fff;
        }
        .el-tag__close {
          background: #fff;
        }
      }

      .top-circle {
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        border-radius: 50%;
        margin-right: 10px;
      }

      .top-circle-default {
        border: 2px solid #6DA9FF;
        span {
          display: none;
        }
      }

      .top-circle-active {
        background-color: rgba(0, 104, 255, 1);
        color: #fff;
      }

      .top-circle-inactive {
        border: 2px solid #5E5E5E;
        color: #5E5E5E;
      }
    }
  }

  .bottom {
    width: 140px;
    margin: 40px auto 0;

    .reset-btn {
      border: 1px solid #0068FF;
      color: #0068FF;
    }
  }
}
</style>
