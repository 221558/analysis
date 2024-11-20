<template>
  <!-- 弹出框组件 -->
  <el-dialog title="账号注册" append-to-body v-model="accountBox" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="20%">
    <!-- 表单组件 -->
    <el-form :model="form" ref="form" label-width="80px">
      <!-- 租户编号输入框 -->
      <el-form-item label="租户编号">
        <el-input v-model="form.tenantId" placeholder="请输入租户编号"></el-input>
      </el-form-item>
      <!-- 用户姓名输入框 -->
      <el-form-item label="用户姓名">
        <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <!-- 账号名称输入框 -->
      <el-form-item label="账号名称">
        <el-input v-model="form.account" placeholder="请输入账号名称"></el-input>
      </el-form-item>
      <!-- 账号密码输入框 -->
      <el-form-item label="账号密码">
        <el-input v-model="form.password" placeholder="请输入账号密码"></el-input>
      </el-form-item>
      <!-- 确认密码输入框 -->
      <el-form-item label="确认密码">
        <el-input v-model="form.password2" placeholder="请输入确认密码"></el-input>
      </el-form-item>
    </el-form>
    <!-- 弹出框底部 -->
    <template #footer>
      <span class="dialog-footer">
        <!-- 确定按钮 -->
        <el-button type="primary" :loading="loading" @click="handleRegister">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// 导入mapGetters函数，用于将store中的getters映射到组件的计算属性中
import { mapGetters } from 'vuex';
// 导入validatenull函数，用于判断一个值是否为空
import { validatenull } from '@/utils/validate';
// 导入registerGuest函数，用于注册游客
import { registerGuest } from '@/api/user';

export default {
  name: 'thirdRegister',
  // 定义组件的名称
  data() {
    return {
      form: {
        // 定义表单数据
        tenantId: '',
        // 租户ID
        name: '',
        // 用户名
        account: '',
        // 账号
        password: '',
        // 密码
        password2: '',
        // 确认密码
      },
      loading: false,
      // 加载状态
      accountBox: false,
      // 账号框状态
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 使用mapGetters将userInfo映射到computed中
  },
  created() {},
  mounted() {
    // 若未登录则弹出框进行绑定
    if (validatenull(this.userInfo.userId) || this.userInfo.userId < 0) {
      // 如果是，则将this.userInfo.account赋值给this.form.name和this.form.account
      this.form.name = this.userInfo.account;
      this.form.account = this.userInfo.account;
      // 同时将accountBox设置为true
      this.accountBox = true;
    }
  },
  methods: {
    /**
    * 处理用户注册逻辑的方法
    */
    handleRegister() {
      // 判断租户编号是否为空
      if (this.form.tenantId === '') {
        // 弹出警告信息
        this.$message.warning('请先输入租户编号');
        // 返回
        return;
      }
      // 判断账号名称是否为空
      if (this.form.account === '') {
        // 弹出警告信息
        this.$message.warning('请先输入账号名称');
        // 返回
        return;
      }
      // 判断密码是否为空
      if (this.form.password === '' || this.form.password2 === '') {
        // 弹出警告信息
        this.$message.warning('请先输入密码');
        // 返回
        return;
      }
      // 判断两次输入的密码是否一致
      if (this.form.password !== this.form.password2) {
        // 弹出警告信息
        this.$message.warning('两次密码输入不一致');
        // 返回
        return;
      }
      // 设置loading状态为true
      this.loading = true;
      // 调用registerGuest方法，传入form和userInfo.oauthId作为参数
      registerGuest(this.form, this.userInfo.oauthId).then(
        // 注册成功
        (res) => {
          // 设置loading状态为false
          this.loading = false;
          // 获取返回的数据
          const { data } = res;
          // 如果注册成功
          if (data.success) {
            // 设置accountBox为false
            this.accountBox = false;
            // 弹出提示框，提示注册申请已提交，请耐心等待管理员通过
            this.$alert('注册申请已提交,请耐心等待管理员通过!', '注册提示').then(() => {
              // 调用LogOut方法，退出登录
              this.$store.dispatch('LogOut').then(() => {
                // 跳转到登录页面
                this.$router.push({ path: '/login' });
              });
            });
          } else {
            // 如果注册失败，弹出错误提示
            this.$message.error(data.msg || '提交失败');
          }
        },
        // 注册失败
        (error) => {
          // 打印错误信息
          window.console.log(error);
          // 设置loading状态为false
          this.loading = false;
        },
      );
    },
  },
};
</script>
