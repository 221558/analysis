<template>
  <div id="board">
    <div class="header">
      <div class="title">
        <div class="title1">网页质量多维分析系统</div>
        <div class="title2" @click="$router.push('/')">主页</div>
        <div class="title2">更多</div>
      </div>
      <div class="user">
        <div class="time">{{ time }}</div>
        <div class="user_icon"></div>
        <div>{{ '你好,admin' }}</div>
        <el-dropdown>
          <em></em>
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
          <Title title="国内排名" />
          <div class="left_top_content">
            <div style="display: flex; justify-content: center; align-items: center">
              <div class="left_top_item num1">
                <div class="item1"><span>No.</span>{{ busList[0].rank }}</div>
                <div class="item2">综合指数</div>
                <div class="item3">{{ busList[0].indexName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left_btm">
          <Title title="综合业务趋势" />
          <LineChart :title="'综合业务体验指数变化趋势'" :chartData="trandData[0]" />
        </div>
      </div>
      <div class="center">
        <div class="time_select" ref="dropdownWrapper1" @click="showDropdown1 = !showDropdown1">
          <span style="color: rgba(150, 210, 239, 0.8); margin-right: 1vw; font-size: 14px"
            >时间 |
          </span>
          <span class="time_box">{{ params.fileTime }} <em></em></span>
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
        <div class="business_types">
          <div
            class="business_item"
            :class="bgList[index]"
            v-for="(item, index) in busList.slice(1)"
            :key="index"
          >
            <div class="detail">
              <div>
                <div class="business_name">{{ busCode.slice(1)[index].label }}</div>
                <div style="margin-top: 0.6vh">
                  综合指数
                  <span style="color: rgba(127, 223, 255); font-size: 28px; padding-left: 0.5vw">{{
                    item.experience
                  }}</span>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 2vw;
                  padding-top: 1vh;
                "
              >
                <span
                  style="
                    font-size: 70px;
                    font-weight: 600;
                    color: rgba(247, 192, 30, 1);
                    padding-right: 0.5vw;
                  "
                  >{{ item.rank }}</span
                ><span style="padding-top: 3vh">名</span>
              </div>
            </div>
          </div>
        </div>
        <Title title="业务趋势" />
        <div class="business_lines">
          <div
            v-for="(item, index) in trandData.slice(1)"
            :key="index"
            :class="['business_lines_items']"
          >
            <div class="business_name">{{ busCode.slice(1)[index].label }}</div>
            <LineChart :name="index + ''" :province="true" :chartData="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { ElMessageBox, ElMessage } from 'element-plus';
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { getTime } from '@/utils/util';
/* eslint-disable no-unused-vars */
import Title from './components/title.vue';
import LineChart from './components/lineChart.vue';
import { timelist, provinces, trend, businesstypelist } from '@/api/board';

const time = ref('');
const dropdownWrapper1 = ref();
const showDropdown1 = ref(false);
const busList = ref([]);
const bgList = reactive([
  'business1',
  'business2',
  'business3',
  'business4',
  'business5',
  'business6',
]);
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
  // ElMessageBox.confirm('退出系统，是否继续？', '提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // }).then(() => {
  //   ElMessage({
  //     type: 'success',
  //     message: 'Delete completed',
  //   });
  // });
};
const handleClickOutside = event => {
  if (dropdownWrapper1.value && !dropdownWrapper1.value.contains(event.target)) {
    showDropdown1.value = false;
  }
};

const busCode = ref([]);
const businesstypelistApi = async () => {
  const { data } = await businesstypelist();
  busCode.value = data.data;
};
const params = reactive({
  province: '北京',
  fileTime: '',
});
const timeChange = async item => {
  params.fileTime = item.value;
  await provinceApi();
  await trendApi();
};
const timeList = ref([]);
const timelistApi = async () => {
  const { data } = await timelist();
  timeList.value = data.data.reverse();
  params.fileTime = timeList.value[0].value;
};
const provinceApi = async () => {
  const { data } = await provinces(params);
  busList.value = data.data;
};
const trandData = ref([]);
const trendApi = async () => {
  const { data } = await trend();
  trandData.value = data.data;
};
onMounted(async () => {
  setInterval(() => {
    time.value = getTime();
  }, 1000);
  document.addEventListener('click', handleClickOutside);
  await businesstypelistApi();
  await timelistApi();
  await provinceApi();
  await trendApi();
});
</script>
<style lang="scss" scoped>
#board {
  width: 100%;
  height: 100%;
  background-color: rgba(1, 30, 70);
  //   background: url('/board/country_bg.png') no-repeat center center;
  //   background-size: cover;
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
      line-height: 3.3vh;
      display: flex;
      align-items: center;
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
      i,em {
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
            width: 15vw;
            height: 42vh;
            text-align: center;
            color: white;
            .item1 {
              color: rgba(247, 219, 30, 1);
              font-size: 60px;
              margin: 14vh 0 0.6vh;
            }
            .item2 {
              font-size: 18px;
              letter-spacing: 0.1vw;
              margin-bottom: 10vh;
            }
            .item3 {
              font-size: 42px;
              letter-spacing: 0.1vw;
            }
          }
          .num1 {
            background: url('/board/第一名.png') no-repeat center center;
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
      background: linear-gradient(to top, rgba(1, 45, 105, 1), transparent 30%);
      border-radius: 10px;
      width: 73vw;
      height: 90vh;
      margin-left: 1vw;
      box-sizing: border-box;
      padding-top: 1vh;
      padding-right: 2vw;
      .time_select {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.5vw;
        height: 3.5vh;
        line-height: 3.5vh;
        color: white;
        background: url('/board/select_bg.png') no-repeat;
        background-size: cover;
        position: relative;
        cursor: pointer;
        .dropdown_content {
          position: absolute;
          z-index: 999;
          top: 4vh;
          .dropdown_item {
            margin-bottom: 0.5vh;
            width: 6.5vw;
            height: 3vh;
            font-size: 18px;
            line-height: 3vh;
            text-align: center;
            background: url('/board/select_item.png') no-repeat;
            background-size: cover;
            &:hover {
              color: rgba(150, 210, 239, 0.8);
            }
          }
        }
        .time_box {
          font-size: 18px;
          i,em {
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 12px solid rgba(150, 210, 239, 0.8);
            margin-left: 0.1vw;
            cursor: pointer;
          }
        }
      }
      .business_types {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 2vw;
        .business_item {
          color: white;
          width: 20.3vw;
          height: 10.4vh;
          margin-bottom: 1vh;
          position: relative;
          .detail {
            width: 12vw;
            height: 4vh;
            display: flex;
            position: absolute;
            justify-content: space-between;
            left: 7vw;
            top: 3vh;
            .business_name {
              font-size: 24px;
              background-image: linear - gradient(to top, rgba(100, 154, 226) 10%, #ffffff 30%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }
          }
        }

        .business1 {
          background: url('/board/business1.png') no-repeat;
          background-size: cover;
        }
        .business2 {
          background: url('/board/business2.png') no-repeat;
          background-size: cover;
        }
        .business3 {
          background: url('/board/business3.png') no-repeat;
          background-size: cover;
        }
        .business4 {
          background: url('/board/business4.png') no-repeat;
          background-size: cover;
        }
        .business5 {
          background: url('/board/business5.png') no-repeat;
          background-size: cover;
        }
        .business6 {
          background: url('/board/business6.png') no-repeat;
          background-size: cover;
        }
      }
      .business_lines {
        display: flex;
        flex-wrap: wrap;
        padding-left: 1vw;
        justify-content: space-between;
        .business_lines_items {
          width: 22vw;
          height: 23vh;
          color: white;
          margin-bottom: 2vh;
          .business_name {
            margin-bottom: 1vh;
            color: rgba(127, 223, 255, 0.8);
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
