<template>
  <div class="top-bar__right">
    <div v-if="setting.lock" class="top-bar__item">
      <top-lock></top-lock>
    </div>
    <div v-if="setting.theme" class="top-bar__item">
      <top-theme></top-theme>
    </div>
    <div v-if="setting.lang" class="top-bar__item">
      <top-lang></top-lang>
    </div>
    <div class="top-bar__item" v-if="setting.fullscren">
      <top-full></top-full>
    </div>
    <div class="top-bar__item" v-if="setting.debug">
      <top-logs></top-logs>
    </div>
    <div class="top-user">
      <!-- <img class="top-bar__img" :src="userInfo.avatar" alt="avatar" /> -->
      <el-icon size="18" color="#0078ff"><Avatar /></el-icon>&nbsp;
      <span style="font-size: 14px; font-weight: bold;">{{ userInfo.userName }}</span>&nbsp;
      <el-dropdown>
        <el-icon class="cursor"><SwitchButton /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/')">
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
            <el-dropdown-item @click="$router.push('/info/index')">
              {{ $t('navbar.userinfo') }}
            </el-dropdown-item>
            <el-dropdown-item @click="logout" divided>{{ $t('navbar.logOut') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <top-setting></top-setting> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import topLock from './top-lock.vue';
import topTheme from './top-theme.vue';
import topLogs from './top-logs.vue';
import topLang from './top-lang.vue';
import topFull from './top-full.vue';
import topSetting from '../setting.vue';

export default {
  components: {
    topLock,
    topTheme,
    topLogs,
    topLang,
    topFull,
    topSetting,
  },
  name: 'top',
  data() {
    return {};
  },
  filters: {},
  created() {},
  computed: {
    ...mapGetters(['setting', 'userInfo']),
  },
  methods: {
    setCollapse() {
      this.$store.commit('SET_COLLAPSE');
    },
    logout() {
      this.$confirm(this.$t('logoutTip'), '提示', {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
