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
          <Title title="运营商总体情况" />
          <div class="left_top_content">
            <div style="display: flex; justify-content: center">
              <div class="left_top_item num1">
                <div class="item1">91.23</div>
                <div class="item2">综合指数</div>
                <div class="item3">中国移动</div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-around; margin-top: 7vh">
              <div class="left_top_item num2"></div>
              <div class="left_top_item num3"></div>
            </div>
          </div>
        </div>
        <div class="left_btm">
          <Title title="业务趋势" />
          <LineChart :title="'联通业务体验指数变化趋势'" />
        </div>
      </div>
      <div class="center">
        <div></div>
      </div>
      <div class="right">
        <Title title="省排名情况" />
        <div class="scroll-wrap">
          <div class="scroll-header">
            <span>排名</span>
            <span>省份</span>
            <span>体验指数</span>
          </div>
          <div class="scroll-content">
            <vue3-seamless-scroll
              class="scroll-list"
              :list="list"
              :hover="true"
              :step="0.5"
              :wheel="true"
              :isWatch="true"
              limitScrollNum="5"
            >
              <div
                v-for="(item, index) in list"
                :key="index"
                :class="['scroll-item', index % 2 == 0 ? 'item1' : 'item2']"
              >
                <span :class="getTop(index)" v-if="index < 3"></span>
                <span>{{ index + 1 }}</span>
                <span>{{ item.title }}</span>
                <span>{{ item.date }}</span>
              </div>
            </vue3-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getTime } from '@/utils/util';
/* eslint-disable no-unused-vars */
import Title from './components/title.vue';
/* eslint-disable no-unused-vars */
import LineChart from './components/lineChart.vue';
/* eslint-disable no-unused-vars */
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const list = ref([]);
const time = ref('');
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
onMounted(() => {
  for (let i = 0; i < 34; i++) {
    list.value.push({
      title: `Vue3.0 无缝滚动组件展示数据第${i + 1}条`,
      date: `${i + 50}`,
    });
  }
  setInterval(() => {
    time.value = getTime();
  }, 1000);
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
  padding: 0 1vw;
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
            width: 10vw;
            height: 15vh;
            text-align: center;
            color: white;
            .item1 {
              color: rgba(247, 219, 30, 1);
              font-size: 32px;
              margin: 4vh 0 0.6vh;
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
      width: 52vw;
      height: 90vh;
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
