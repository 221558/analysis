<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <!-- <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input @keyup.enter="handleLogin" v-model="loginForm.tenantId" auto-complete="off" :placeholder="$t('login.tenantId')">
        <template #prefix>
          <em class="icon-quanxian"></em>
        </template>
      </el-input>
    </el-form-item> -->
    <el-form-item prop="username">
      <el-input @keyup.enter="handleLogin" v-model="loginForm.username" auto-complete="off" :placeholder="$t('login.username')">
        <template #prefix>
          <em class="icon-yonghu"></em>
          <el-divider direction="vertical"></el-divider>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter="handleLogin" type="password" show-password v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.password')">
        <template #prefix>
          <em class="icon-mima"></em>
          <el-divider direction="vertical"></el-divider>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" class="login-code" v-if="captchaMode">
      <el-input @keyup.enter="handleLogin" v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.code')">
        <template #prefix>
          <em class="icon-yanzhengma"></em>
          <el-divider direction="vertical"></el-divider>
        </template>
        <template #append>
          <div class="login-code-box">
            <img :src="loginForm.image" class="login-code-img" @click="refreshCode" alt="" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-checkbox v-model="checked" class="login-checkbox">记住密码</el-checkbox>
    <el-form-item>
      <el-button type="primary" @click.prevent="handleLogin" class="login-submit">{{ $t('login.submit') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getTopUrl } from 'utils/util';
import { mapGetters } from 'vuex';
import website from '@/config/website';
import { getCaptcha } from '@/api/user';
import { info } from '@/api/system/tenant';

export default {
  name: 'userlogin',
  data() {
    return {
      tenantMode: website.tenantMode,
      captchaMode: website.captchaMode,
      loginForm: {
        // 租户ID
        tenantId: '000000',
        // 用户名
        username: '',
        // 密码
        password: '',
        // 账户类型
        type: 'account',
        // 验证码的值
        code: '',
        // 验证码的索引
        key: '',
        // 预加载白色背景
        image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      },
      checked: false,
      loginRules: {
        tenantId: [{ required: false, message: '请输入租户ID', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '密码长度最少为5位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '验证码长度为5位', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getTenant();
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(['tagWel']),
  },
  props: [],
  methods: {
    refreshCode() {
      getCaptcha().then((res) => {
        const { data } = res.data;
        this.loginForm.key = data.key;
        this.loginForm.image = data.image;
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.$router.push(this.tagWel);
              this.$store.dispatch('GetDictionary');
            })
            .catch(() => {});
        }
      });
    },
    getTenant() {
      const domain = getTopUrl();
      // 临时指定域名，方便测试
      // domain = "https://bladex.cn";
      info(domain).then((res) => {
        const { data } = res;
        if (data.success && data.data.tenantId) {
          this.tenantMode = false;
          this.loginForm.tenantId = data.data.tenantId;
        }
      });
    },
  },
};
</script>

<style>

</style>
