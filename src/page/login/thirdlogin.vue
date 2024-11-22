<template>
  <div class="third">
    <div class="box">
      <em class="iconfont icon-QQ" @click="handleClick('qq')" style="color: #53a4d8"></em>
      <em class="iconfont icon-weixinicon2x" @click="handleClick('wechat_open')" style="color: #71c252"></em>
      <em class="iconfont icongithub" @click="handleClick('github')" style="color: #62676c"></em>
      <em class="iconfont icongitee2" @click="handleClick('gitee')" style="color: #c73420"></em>
    </div>
  </div>
</template>

<script>
import { openWindow } from 'utils/util';

export default {
  name: 'thirdLogin',
  methods: {
    handleClick(source) {
      window.location.href = `${website.authUrl}/${source}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.third {
  padding: 10px 0;
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  em {
    font-size: 36px;
    margin: 0 10px;
  }
}
</style>
