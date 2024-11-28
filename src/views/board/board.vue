<template>
  <div id="board">
    <div class="header">
      <div class="title">
        <div class="title1">网页质量多维分析系统</div>
        <div class="title2" @click="$router.push('/')">主页</div>
        <div class="title2">更多</div>
      </div>
      <div class="user">
        <div class="time">{{ nowTime }}</div>
        <div class="user_icon"></div>
        <div>{{ '你好，admin' }}</div>
        <!-- <i></i> -->
        <el-dropdown>
          <i></i>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item @click="$router.push('/')">
                {{ $t('navbar.dashboard') }}
              </el-dropdown-item>
              <el-dropdown-item @click="$router.push('/info/index')">
                {{ $t('navbar.userinfo') }}
              </el-dropdown-item> -->
              <el-dropdown-item @click="logout" divided>{{ $t('navbar.logOut') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="left_top">
          <Title title="运营商总体情况" />
          <div class="left_top_content">
            <div style="display: flex; justify-content: center">
              <div class="left_top_item num1">
                <div class="item1">{{ top3[0].experience }}</div>
                <div class="item2">综合指数</div>
                <div class="item3">{{ top3[0].indexName }}</div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-around; margin-top: 7vh">
              <div class="left_top_item num2">
                <div class="item1">{{ top3[1].experience }}</div>
                <div class="item2">综合指数</div>
                <div class="item3">{{ top3[1].indexName }}</div>
              </div>
              <div class="left_top_item num3">
                <div class="item1">{{ top3[2].experience }}</div>
                <div class="item2">综合指数</div>
                <div class="item3">{{ top3[2].indexName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left_btm">
          <Title title="业务趋势" />
          <LineChart :title="'联通业务体验指数变化趋势'" :chartData="trendData[0]" />
        </div>
      </div>
      <div class="center">
        <div class="select_box">
          <div
            class="business_type"
            ref="dropdownWrapper"
            @click.self="showDropdown = !showDropdown"
          >
            {{ selectedOption }}
            <div v-show="showDropdown" class="dropdown_content">
              <div
                v-for="item in businessList"
                :key="item"
                class="dropdown_item"
                @click="selectOption(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="business_type" ref="dropdownWrapper1" @click="showDropdown1 = !showDropdown1">
            <span style="color: rgba(150, 210, 239, 0.8); font-size: 14px; padding-right: 1vw"
              >时间 |</span
            ><span class="time_box">{{ params.fileTime }} <i></i></span>
            <div v-show="showDropdown1" class="dropdown_content">
              <div
                v-for="item in timeList"
                :key="item"
                class="dropdown_item"
                @click="timeChange(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <div class="map_box">
          <china-map :provinceRank="provinceRank" />
          <div class="map_tooltip" v-show="isShowTooltip">
            <div class="map_tooltip_title">
              {{ provinceDetail.indexName }}
            </div>
            <div class="map_tooltip_content">
              <div class="map_tooltip_content_item">时间：{{ provinceDetail.month }}</div>
              <div class="map_tooltip_content_item">排名：{{ provinceDetail.rank }}</div>
              <div class="map_tooltip_content_item">体验指数：{{ provinceDetail.experience }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <Title title="省排名情况" />
        <div class="scroll-wrap">
          <div class="scroll-header">
            <span>排名</span>
            <span>省份</span>
            <span>体验指数</span>
          </div>
          <div class="scroll-content" v-if="provinceShow">
            <vue3-seamless-scroll
              class="scroll-list"
              :list="provinceRank"
              :hover="true"
              :step="0.5"
              :wheel="true"
              :isWatch="true"
              :limitScrollNum="5"
            >
              <div
                v-for="(item, index) in provinceRank"
                :key="index"
                :class="['scroll-item', index % 2 == 0 ? 'item1' : 'item2']"
              >
                <span :class="getTop(index)" v-if="index < 3"></span>
                <span style="display: inline-block; width: 1vw; text-align: center">{{
                  item.rank
                }}</span>
                <span>{{ item.indexName }}</span>
                <span>{{ item.experience }}</span>
              </div>
            </vue3-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ChinaMap from './components/chinaMap.vue';
import {
  ref,
  onMounted,
  reactive,
  onUnmounted,
  onBeforeUnmount,
  toRefs,
  getCurrentInstance,
} from 'vue';
import mittBus from '@/utils/mitt';
import { getTime } from '@/utils/util';
/* eslint-disable no-unused-vars */
import Title from './components/title.vue';
/* eslint-disable no-unused-vars */
import LineChart from './components/lineChart.vue';
/* eslint-disable no-unused-vars */
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import dayjs from 'dayjs';
import { operators, businesses, trend, timelist, businesstypelist } from '@/api/board';
const nowTime = ref('');
const dropdownWrapper = ref(null);
const dropdownWrapper1 = ref(null);
const showDropdown = ref(false);
const showDropdown1 = ref(false);
const selectedOption = ref(); //业务类型展示
const provinceDetail = ref({});
const provinceShow = ref(false);
const isShowTooltip = ref(false); // 省份弹框显示

const { proxy } = getCurrentInstance();
const _this = proxy;

const logout = () => {
  _this
    .$confirm(_this.$t('logoutTip'), '提示', {
      confirmButtonText: _this.$t('submitText'),
      cancelButtonText: _this.$t('cancelText'),
      type: 'warning',
    })
    .then(() => {
      _this.$store.dispatch('LogOut').then(() => {
        _this.$router.push({ path: '/login' });
      });
    });
};
const selectOption = item => {
  selectedOption.value = item.label;
  params.businessType = item.value;
  showDropdown.value = false;
  operatorsApi();
  businessesApi();
  trendApi();
};
const handleClickOutside = event => {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target)) {
    showDropdown.value = false;
  }
  if (dropdownWrapper1.value && !dropdownWrapper1.value.contains(event.target)) {
    showDropdown1.value = false;
  }
};
const timeChange = item => {
  params.fileTime = item.value;
  operatorsApi();
  businessesApi();
  trendApi();
};
const businessList = ref([]);
const businesstypelistApi = async () => {
  const { data } = await businesstypelist();
  businessList.value = data.data;
  selectedOption.value = businessList.value[0].label;
};
/* eslint-disable no-unused-vars */
const getTop = index => {
  switch (index) {
    case 0:
      return 'top1';
    case 1:
      return 'top2';
    case 2:
      return 'top3';
  }
};
const provinceInfo = e => {
  console.log('e', e);
  let aa = provinceRank.value.find(item => item.indexName === e);
  if (aa) {
    isShowTooltip.value = true;
    provinceDetail.value = aa;
  } else {
    isShowTooltip.value = false;
  }
};
const params = reactive({
  businessType: '1', //业务类型
  fileTime: '2024-01', //时间
});
const top3 = ref([]); //全国综合指数前三
const operatorsApi = async () => {
  const { data } = await operators(params);
  top3.value = data.data;
};
const provinceRank = ref([]); // 省份排名
const businessesApi = async () => {
  provinceShow.value = false;
  const { data } = await businesses(params);
  provinceRank.value = data.data;
  provinceShow.value = true;
};
const trendData = ref([]); // 趋势
const trendApi = async () => {
  const { data } = await trend(params);
  trendData.value = data.data;
};
const timeList = ref([]);
const timelistApi = async () => {
  const { data } = await timelist();
  timeList.value = data.data.reverse();
  params.fileTime = timeList.value[0].value;
};
onMounted(async () => {
  setInterval(() => {
    nowTime.value = getTime();
  }, 1000);

  mittBus.on('clickMap', provinceInfo);
  document.addEventListener('click', handleClickOutside);
  await businesstypelistApi();
  await timelistApi();
  operatorsApi();
  businessesApi();
  trendApi();
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  mittBus.off('clickMap', provinceInfo());
});
</script>

<style lang="scss" scoped>
.scroll-wrap {
  width: 22.3vw;
  height: 84vh;
  overflow: hidden;
  color: white;
  box-sizing: border-box;
  padding: 0 0.7vw;
}
.scroll-header,
.scroll-content {
  width: 100%;
  display: flex;
}
.scroll-header {
  height: 3vh;
  margin-bottom: 10px;
  border-bottom: 2px solid rgba(9, 134, 223, 1);
  background: linear-gradient(to top, rgba(10, 75, 143, 0.8), rgba(1, 31, 71, 0.8));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1.4vw;
  color: rgba(150, 210, 239, 0.8);
  font-size: 18px;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    border-top: 5px solid rgba(239, 223, 5, 0.8);
    //   border-left: 5px solid rgba(77, 171, 246);
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
}
.scroll-list {
  width: 100%;
  overflow: hidden;
  .scroll-item {
    width: 100%;
    height: 3vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2vw 0 1.5vw;
    border: 1px solid rgba(65, 87, 124, 0.5);
    margin-bottom: 10px;
    position: relative;
    ::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      border-top: 5px solid rgba(77, 171, 246, 1);
      //   border-left: 5px solid rgba(77, 171, 246);
      border-right: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
    .top1,
    .top3 {
      left: 1vw;
      position: absolute;
      width: 1.5vw;
      height: 0.2vh;
      background-color: rgba(239, 223, 5, 1);
      filter: blur(5px) contrast(150%);
    }
    .top2 {
      left: 1vw;
      position: absolute;
      width: 1.5vw;
      height: 0.2vh;
      background-color: white;
      filter: blur(5px) contrast(150%);
    }
  }
  .item1 {
    background-color: rgba(24, 67, 122, 1);
  }
  .item2 {
    background-color: rgba(1, 46, 98, 1);
  }
}
#board {
  width: 100%;
  height: 100%;
  background: url('/board/country_bg.png') no-repeat;
  background-position: 5vw 8vh;
  background-size: 90%;
  background-color: rgba(1, 30, 70, 1);
  .header {
    width: 100%;
    height: 7vh;
    background: url('/board/title_bg_date.png') no-repeat center center;
    background-size: contain;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title,
    .user {
      display: flex;
      color: white;
    }
    .title1 {
      letter-spacing: 0.2vw;
      font-size: 32px;
      margin-left: 2.2vw;
      margin-right: 1.3vw;
    }
    .title2 {
      margin-top: 0.3vh;
      margin-right: 1vw;
      width: 6vw;
      height: 2.5vh;
      letter-spacing: 0.3vw;
      line-height: 2.4vh;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      background: url('/board/title_button.png') no-repeat center center;
      background-size: cover;
      cursor: pointer;
    }
    .user {
      width: 23vw;
      height: 4vh;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-bottom: 0.2vh;
      .time {
        margin-right: 3.5vw;
        letter-spacing: 0.06vw;
      }
      .user_icon {
        width: 3vw;
        height: 3vh;
        background: url('/board/admin.png') no-repeat center center;
        background-size: contain;
      }
      i {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 12px solid rgba(150, 210, 239, 0.8);
        margin-left: 0.3vw;
        cursor: pointer;
      }
    }
  }
  .content {
    width: 99.9vw;
    height: 93vh;
    box-sizing: border-box;
    display: flex;
    padding: 0 1.5vw;
    .left {
      .left_top {
        border-radius: 10px;
        box-sizing: border-box;
        padding-left: 0.3vw;
        padding-top: 1vh;
        width: 22vw;
        height: 50vh;
        background: url('/board/背景框1.png') no-repeat center center;
        background-size: cover;
        margin-bottom: 1vh;
        .left_top_content {
          .left_top_item {
            width: 10vw;
            height: 15vh;
            text-align: center;
            color: white;
            .item1 {
              color: rgba(247, 219, 30, 1);
              font-size: 32px;
              margin: 4vh 0 0.1vh;
            }
            .item2 {
              font-size: 12px;
              letter-spacing: 0.05vw;
              margin-bottom: 5vh;
            }
            .item3 {
              font-size: 22px;
              letter-spacing: 0.1vw;
            }
          }
          .num1 {
            background: url('/board/第一名.png') no-repeat center center;
            background-size: contain;
          }
          .num2 {
            background: url('/board/第二名.png') no-repeat center center;
            background-size: contain;
          }
          .num3 {
            background: url('/board/第三名.png') no-repeat center center;
            background-size: contain;
          }
        }
      }
      .left_btm {
        border-radius: 10px;
        box-sizing: border-box;
        padding-left: 0.3vw;
        padding-top: 1vh;
        width: 22vw;
        height: 39vh;
        background: url('/board/背景框2.png') no-repeat center center;
        background-size: cover;
      }
    }
    .center {
      box-sizing: border-box;
      width: 52vw;
      height: 90vh;
      .select_box {
        display: flex;
        padding: 1vh 0 0 1vw;
        .business_type {
          width: 7vw;
          height: 4vh;
          line-height: 4vh;
          font-size: 18px;
          color: white;
          text-align: center;
          margin-right: 1vw;
          cursor: pointer;
          position: relative;
          background: url('/board/select_bg.png') no-repeat;
          background-size: cover;
          .dropdown_content {
            position: absolute;
            z-index: 999;
            top: 4.5vh;
            .dropdown_item {
              margin-bottom: 0.3vh;
              width: 7vw;
              height: 3vh;
              font-size: 18px;
              line-height: 3vh;
              background: url('/board/select_item.png') no-repeat;
              background-size: cover;
              &:hover {
                color: rgba(150, 210, 239, 0.8);
              }
            }
          }
          .time_box {
            i {
              display: inline-block;
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-top: 12px solid rgba(150, 210, 239, 0.8);
              margin-left: 0.1vw;
            }
          }
        }
        .time_selection {
          position: relative;
          display: flex;
          justify-content: center;
          .time_selection_input {
            position: absolute;
            opacity: 0;
            left: 0.5vw;
            top: -0.3vh;
            ::v-deep .month_input {
              width: 8vw;
              height: 4.5vh;
              //清除输入框首尾icon
              .el-input__prefix,
              .el-input__suffix {
                display: none;
              }
              .el-input__wrapper {
                cursor: pointer;
              }
            }
          }
        }
      }
      .map_box {
        padding-left: 8vw;
        padding-top: 6vh;
        position: relative;
        .map_tooltip {
          position: absolute;
          color: white;
          bottom: 0;
          left: 5vw;
          width: 20vw;
          height: 20vh;
          background: url('/board/province_tip.png') no-repeat;
          background-size: contain;
          .map_tooltip_title {
            font-size: 18px;
            text-align: center;
            padding: 1.5vh 0 0 1vw;
          }
          .map_tooltip_content {
            padding: 1.5vh 0 0 2vw;
          }
          .map_tooltip_content_item {
            margin: 1vh 0;
          }
        }
      }
    }
    .right {
      border-radius: 10px;
      box-sizing: border-box;
      padding-top: 1vh;
      padding-left: 0.3vw;
      background: url('/board/背景框3.png') no-repeat center center;
      background-size: cover;
      width: 23vw;
      height: 90vh;
      .right_content {
        width: 21.5vw;
        height: 83vh;
        margin-left: 0.5vw;
        background-color: aqua;
      }
    }
  }
}
</style>
