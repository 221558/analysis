<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <!-- <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input @keyup.enter="handleLogin" v-model="loginForm.tenantId" auto-complete="off" :placeholder="$t('login.tenantId')">
        <template #prefix>
          <em class="icon-quanxian"></em>
        </template>
      </el-input>
    </el-form-item> -->
    <el-form-item prop="username">
      <el-input
        @keyup.enter="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        :placeholder="$t('login.username')"
      >
        <template #prefix>
          <em class="icon-yonghu"></em>
          <el-divider direction="vertical"></el-divider>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter="handleLogin"
        type="password"
        show-password
        v-model="loginForm.password"
        auto-complete="off"
        :placeholder="$t('login.password')"
      >
        <template #prefix>
          <em class="icon-mima"></em>
          <el-divider direction="vertical"></el-divider>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" class="login-code" v-if="captchaMode">
      <el-input
        @keyup.enter="handleLogin"
        v-model="loginForm.code"
        auto-complete="off"
        :placeholder="$t('login.code')"
      >
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
    <!-- <el-checkbox v-model="checked" class="login-checkbox">记住密码</el-checkbox> -->
    <el-form-item>
      <el-button type="primary" @click.prevent="handleLogin" class="login-submit">{{
        $t('login.submit')
      }}</el-button>
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
      // 是否选中
      checked: false,
      // 登录验证规则
      loginRules: {
        // 租户ID验证规则
        tenantId: [{ required: false, message: '请输入租户ID', trigger: 'blur' }],
        // 用户名验证规则
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        // 密码验证规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '密码长度最少为5位', trigger: 'blur' },
        ],
        // 验证码验证规则
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '验证码长度为5位', trigger: 'blur' },
        ],
      },
    };
  },
  // 在组件创建时调用getTenant和refreshCode方法
  created() {
    this.loadCredentials();
    this.getTenant();
    this.refreshCode();
  },
  // 使用mapGetters将tagWel映射到computed属性中
  computed: { ...mapGetters(['tagWel']) },
  methods: {
    // 加载用户名和密码
    loadCredentials() {
      // 从localStorage中获取保存的用户名
      const savedUsername = localStorage.getItem('savedUsername');
      // 从localStorage中获取保存的密码
      const savedPassword = localStorage.getItem('savedPassword');
      // 如果用户名和密码都存在
      if (savedUsername && savedPassword) {
        // 将用户名和密码赋值给loginForm
        this.loginForm.username = savedUsername;
        this.loginForm.password = savedPassword;
        // 将checked设置为true
        this.checked = true;
      }
    },
    // 保存用户名和密码
    saveCredentials() {
      // 如果选中了保存密码选项
      if (this.checked) {
        // 将用户名和密码保存到localStorage中
        localStorage.setItem('savedUsername', this.loginForm.username);
        localStorage.setItem('savedPassword', this.loginForm.password);
      } else {
        // 如果没有选中保存密码选项，则从localStorage中移除保存的用户名和密码
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
      }
    },
    // 刷新验证码
    refreshCode() {
      // 调用getCaptcha方法获取验证码
      getCaptcha().then(res => {
        // 解构res.data，获取data
        const { data } = res.data;
        // 将data中的key赋值给loginForm的key
        this.loginForm.key = data.key;
        // 将data中的image赋值给loginForm的image
        this.loginForm.image = data.image;
      });
    },
    // 处理登录
    handleLogin() {
      // 验证登录表单
      this.$refs.loginForm.validate(valid => {
        // 如果验证通过
        if (valid) {
          // 保存登录凭证
          this.saveCredentials();
          // 调用登录方法
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              // 跳转到欢迎页面
              this.$router.push(this.tagWel);
              // 获取字典数据
              this.$store.dispatch('GetDictionary');
            })
            .catch(() => {
              this.refreshCode();
            });
        }
      });
    },
    getTenant() {
      const domain = getTopUrl();
      // 临时指定域名，方便测试
      // domain = "https://bladex.cn";
      info(domain).then(res => {
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