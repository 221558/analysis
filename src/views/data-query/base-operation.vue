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
              <el-select
                v-model="month"
                clearable
                collapse-tags
                placeholder="时间选择"
                class="custom-select"
                :class="isActiveClass + 1 === 1 ? 'custom-select' : isActiveClass >= 1 ? 'custom-select-active' : 'custom-select-inactive'"
                :max-collapse-tags="1"
                style="width: 80%;"
                @change="handleMonthChange($event, 1)"
              >
                <el-option
                  v-for="item in monthList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
                :multiple="type === 2"
                collapse-tags
                placeholder="指标选择"
                class="custom-select"
                :class="isActiveClass + 1 === 5 ? 'custom-select' : isActiveClass >= 5 ? 'custom-select-active' : 'custom-select-inactive'"
                :max-collapse-tags="1"
                style="width: 80%;"
                @change="handleMonthChange($event, 5)"
              >
                <template v-if="type === 2" #header>
                  <el-checkbox
                    v-model="checkTypeAll"
                    :indeterminate="indeterminateType"
                    @change="handleCheckTypeAll"
                  >一键全选
                  </el-checkbox>
                </template>
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
          <el-button color="#0068FF" type="primary" @click="handleQuery">查询</el-button>
          <el-button class="reset-btn" @click="handleMonthChange('', 0)">重置</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <basic-title title="查询结果" />
      <vue-office-excel style="height: 50vh;" v-if="customBlobContent" :src="customBlobContent"> </vue-office-excel>
    </basic-container>
  </div>
</template>

<script setup>
import BasicTitle from '@/components/basic-title/main.vue'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import { ref, watch } from 'vue'
import {
  fetchAreaList,
  fetchBusinessList,
  fetchSelectResult,
  fetchTargetList,
  fetchTimeList,
  fetchTypeList
} from '@/api/data-query/base-operation'
import { ElMessage } from 'element-plus'

// 文件预览
let customBlobContent = ref()

// 月份选择
const month = ref('')
const monthList = ref([])
const isActiveClass = ref(0)

// 业务类型数据
const type = ref('')
const typeList = ref([])

// 业务数据
const business = ref('')
const businessList = ref([])

// 省份数据
const checkAll = ref(false)
const indeterminate = ref(false)
const area = ref([])
const areaList = ref([])

// 指标全选
const checkTypeAll = ref(false)
const indeterminateType = ref(false)

// 指标数据
const target = ref(null)
const targetList = ref([])

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

watch(target, (val) => {
  if (val.length === 0) {
    checkTypeAll.value = false
    indeterminateType.value = false
  } else if (val.length === targetList.value.length) {
    checkTypeAll.value = true
    indeterminateType.value = false
  } else {
    indeterminateType.value = true
  }
})

// 获取月份列表
const getMonthList = () => {
  fetchTimeList().then((res) => {
    monthList.value = res.data.data
  })
}
getMonthList()

// 获取类型列表
const getTypeList = () => {
  fetchTypeList().then((res) => {
    typeList.value = res.data.data
  })
}
getTypeList()

// 获取省份列表
const getAreaList = () => {
  fetchAreaList({ fileTime: month.value }).then((res) => {
    areaList.value = res.data.data
  })
}

// 类型变化时业务列表变化
watch(type, (val) => {
  if (!val) {
    businessList.value = []
    return
  }
  if (val === 2) {
    target.value = []
  }
  fetchBusinessList({ code: val }).then((res) => {
    businessList.value = res.data.data
  })
})

// 业务变化时指标列表变化
watch(business, (val) => {
  if (!val) {
    targetList.value = []
    return
  }
  fetchTargetList({ code: val }).then((res) => {
    targetList.value = res.data.data
  })
})

// 省份全选
const handleCheckAll = (val) => {
  handleMonthChange(val, 4)
  indeterminate.value = false
  if (val) {
    area.value = areaList.value.map((_) => _.value)
  } else {
    area.value = []
  }
}

// 指标全选
const handleCheckTypeAll = (val) => {
  handleMonthChange(val, 5)
  indeterminateType.value = false
  if (val) {
    target.value = targetList.value.map((_) => _.value)
  } else {
    target.value = []
  }
}

// 禁用日期
function disabledDate(time) {
  return time.getTime() > Date.now()
}

// 清空选择框数据
function clearData(typeData) {
  switch (typeData) {
    case 0:
      month.value = ''
      type.value = ''
      business.value = ''
      area.value = []
      checkAll.value = false
      indeterminate.value = false
      target.value = ''
      customBlobContent.value = ''
      break
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

// 选择框变化时触发
function checkChange(step) {
  let flag = false
  switch (step) {
    case 2:
      if (!month.value) {
        flag = true
      }
      break
    case 3:
      if (!month.value) {
        flag = true
      }
      if (!type.value) {
        flag = true
      }
      break
    case 4:
      if (!month.value) {
        flag = true
        area.value = []
      }
      if (!type.value) {
        flag = true
        area.value = []
      }
      if (!business.value) {
        flag = true
        area.value = []
      }
      break
    case 5:
      if (!month.value) {
        flag = true
      }
      if (!type.value) {
        flag = true
      }
      if (!business.value) {
        flag = true
      }
      if (!(area.value && area.value.length)) {
        flag = true
      }
      break
  }
  return flag
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
  if (checkChange(step)) {
    ElMessage.warning('请先选择前面所有选项')
    return
  }
  if (step === 1) {
    getAreaList()
  }
  isActiveClass.value = step
}

// 查询
const handleQuery = () => {
  if (checkChange(5)) {
    ElMessage.warning('请先选择前面所有选项')
    return
  }
  const params = {
    fileTime: month.value,
    type: type.value,
    serviceType: business.value,
    provinces: area.value,
    indexs: Array.isArray(target.value) ? target.value : [target.value]
  }
  fetchSelectResult(params).then((res) => {
    customBlobContent.value = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel 文件类型
    })
  }).catch((err) => {
    console.log(err)
  })
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
