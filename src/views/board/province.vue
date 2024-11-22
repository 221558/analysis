<template>
  <div id="board">
    <div class="header">
      <div class="title">
        <div class="title1">网页质量多维分析系统</div>
        <div class="title2">主页</div>
        <div class="title2">更多</div>
      </div>
      <div class="user">
        <div class="time">{{ time }}</div>
        <div class="user_icon"></div>
        <div>{{ '你好，admin' }}</div>
        <div>{{ '退出' }}</div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="left_top">
          <Title title="国内排名" />
          <div class="left_top_content">
            <div style="display: flex; justify-content: center; align-items: center">
              <div class="left_top_item num1">
                <div class="item1">91.23</div>
                <div class="item2">综合指数</div>
                <div class="item3">中国移动</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left_btm">
          <Title title="综合业务趋势" />
          <LineChart :title="'综合业务体验指数变化趋势'" />
        </div>
      </div>
      <div class="center">
        <div class="time_select">
          <span style="color: rgba(127, 223, 255); margin-right: 1vw; font-size: 14px"
            >时间 |
          </span>
          <span style="font-size: 18px">本月</span>
        </div>
        <div class="business_types">
          <div
            class="business_item"
            :class="bgList[index]"
            v-for="(item, index) in busList"
            :key="index"
          >
            <div class="detail">
              <div>
                <div class="business_name">{{ item.name }}</div>
                <div style="margin-top: 0.6vh">
                  综合指数
                  <span style="color: rgba(127, 223, 255); font-size: 28px; padding-left: 0.5vw">{{
                    item.score
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
          <div v-for="(item, index) in busList" :key="index" :class="['business_lines_items']">
            <div class="business_name">{{ item.name }}</div>
            <LineChart :name="index" :province="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getTime } from '@/utils/util';
/* eslint-disable no-unused-vars */
import Title from './components/title.vue';
import LineChart from './components/lineChart.vue';
const time = ref('');
const busList = reactive([
  { name: '网站业务', score: 91.23, rank: '12' },
  { name: '网站(IDC)业务', score: 91.23, rank: '12' },
  { name: '国际网站业务', score: 91.23, rank: '12' },
  { name: '视频业务', score: 91.23, rank: '12' },
  { name: '文件业务', score: 91.23, rank: '12' },
  { name: '游戏业务', score: 91.23, rank: '12' },
]);
const bgList = reactive([
  'business1',
  'business2',
  'business3',
  'business4',
  'business5',
  'business6',
]);
onMounted(() => {
  setInterval(() => {
    time.value = getTime();
  }, 1000);
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
    }
    .user {
      width: 23vw;
      height: 4vh;
      line-height: 3.3vh;
      .time {
        margin-right: 3vw;
        letter-spacing: 0.06vw;
      }
      .user_icon {
        width: 3vw;
        height: 3vh;
        background: url('/board/admin.png') no-repeat center center;
        background-size: contain;
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
              font-size: 32px;
              margin: 15vh 0 0.6vh;
            }
            .item2 {
              font-size: 12px;
              letter-spacing: 0.1vw;
              margin-bottom: 12.5vh;
            }
            .item3 {
              font-size: 26px;
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
      padding-left: 1vw;
      padding-right: 2vw;
      .time_select {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.5vw;
        height: 3.5vh;
        color: white;
        background: url('/board/select_bg.png') no-repeat;
        background-size: cover;
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
          height: 20vh;
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
