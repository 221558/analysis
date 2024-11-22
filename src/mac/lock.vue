<template>
  <!-- 背景图片 -->
  <div class="mac_bg"></div>
  <!-- 登录框 -->
  <div class="login animate__animated" :class="{ animate__bounceOut: pass }">
    <!-- 头像 -->
    <div class="head">
      <img src="https://avatar.gitee.com/uploads/61/632261_smallweigit.jpg!avatar100?1518660401" alt="" />
    </div>
    <!-- 用户名 -->
    <div class="message">{{ userInfo.username }}</div>
    <!-- 表单 -->
    <div class="form">
      <!-- 输入框 -->
      <div class="item" style="width: 320px" :class="passwdError ? 'error' : ''">
        <input class="password" placeholder="password here..." v-model="passwd" type="password" />
        <!-- 登录按钮 -->
        <em class="iconfont el-icon-unlock" @click="handleLogin"></em>
        <!-- 退出按钮 -->
        <em class="iconfont icon-tuichu" @click="handleLogout"></em>
      </div>
    </div>
  </div>
</template>
<script>
// 引入vuex中的mapGetters方法
import { mapGetters } from 'vuex';

export default {
  data() {
    // 定义一个布尔值，用于判断密码是否错误
    return {
      passwdError: false,
      // 定义一个字符串，用于存储密码
      passwd: '',
      // 定义一个布尔值，用于判断是否需要锁定密码
      pass: false,
    };
  },
  computed: {
    // 使用mapGetters方法，将vuex中的userInfo、tag、lockPasswd映射到computed中
    ...mapGetters(['userInfo', 'tag', 'lockPasswd']),
  },
  methods: {
    // 处理登出
    handleLogout() {
      // 调用store中的LogOut方法
      this.$store.dispatch('LogOut').then(() => {
        // 登出成功后跳转到登录页面
        this.$router.push({ path: '/login' });
      });
    },
    // 处理登录
    handleLogin() {
      // 判断密码是否正确
      if (this.passwd != this.lockPasswd) {
        // 密码错误，清空密码，设置密码错误标志
        this.passwd = '';
        this.passwdError = true;
        // 1秒后取消密码错误标志
        setTimeout(() => {
          this.passwdError = false;
        }, 1000);
        return;
      }
      // 密码正确，设置登录标志
      this.pass = true;
      // 1秒后清空登录标志，跳转到指定页面
      // 设置一个定时器，1秒后执行
      setTimeout(() => {
        // 提交一个mutation，清除锁
        this.$store.commit('CLEAR_LOCK');
        // 跳转到指定的路由
        this.$router.push({
          path: this.tag.value,
        });
      }, 1000);
    },
  },
};
</script>
<style scoped>
@import url('./login.css');
</style>
