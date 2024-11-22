<template>
  <!-- 定义一个div元素，类名为mac_bg -->
  <div class="mac_bg"></div>
  <div class="desktop">
    <div class="top">
      <!-- 点击触发下拉菜单 -->
      <el-dropdown trigger="click">
        <!-- logo部分 -->
        <div class="logo"><em class="iconfont icon-pingguo"></em></div>
        <template #dropdown>
          <!-- 下拉菜单 -->
          <el-dropdown-menu>
            <!-- 下拉菜单项 -->
            <el-dropdown-item>
              <!-- 用户名 -->
              <div>{{ userInfo.username }}</div>
            </el-dropdown-item>
            <!-- 下拉菜单项 -->
            <el-dropdown-item>
              <!-- 锁定屏幕 -->
              <top-lock text="锁定屏幕"></top-lock>
            </el-dropdown-item>
            <!-- 下拉菜单项 -->
            <el-dropdown-item>
              <!-- 退出主题 -->
              <div @click="switchTheme">退出主题</div>
            </el-dropdown-item>
            <!-- 下拉菜单项 -->
            <el-dropdown-item @click="logout">{{ $t('navbar.logOut') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 空白区域 -->
      <div class="space"></div>
      <!-- 状态栏 -->
      <div class="status">
        <!-- 音频图标 -->
        <div class="audio">
          <em class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-39"></em>
        </div>
        <!-- 时间 -->
        <div class="datetime">{{ timeString }}</div>
        <!-- 通知图标 -->
        <div class="notification">
          <em class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-25"></em>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- 遍历deskTopAppList数组，生成桌面应用列表 -->
      <div class="desktop-app">
        <template v-for="item in deskTopAppList" :key="item.key">
          <!-- 如果item.hideInDesktop为false，则显示应用 -->
          <div class="app-item" @click="openApp(item)" v-if="!item.hideInDesktop">
            <!-- 应用图标 -->
            <div class="icon" :style="{ backgroundColor: item.iconBgColor, color: item.iconColor }">
              <em class="iconfont" :class="item[iconKey]"></em>
            </div>
            <!-- 应用标题 -->
            <div class="title">{{ item[labelKey] }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="footer">
      <!-- 空白区域 -->
      <div class="space"></div>
      <!-- 应用列表 -->
      <div class="dock">
        <!-- 遍历应用列表 -->
        <template v-for="item in openAppList" :key="item.key">
          <!-- 应用项 -->
          <div class="item" @click="openApp(item)">
            <!-- 应用图标 -->
            <em :style="{ backgroundColor: item.iconBgColor, color: item.iconColor }" class="iconfont" :class="item[iconKey]"></em>
            <!-- 应用名称 -->
            <small style="margin-top: 5px; font-size: 10px">{{ item[labelKey] }}</small>
          </div>
        </template>
      </div>
      <!-- 空白区域 -->
      <div class="space"></div>
    </div>
  </div>
</template>
<script>
// 导入mapGetters函数，用于从Vuex中获取状态
import { mapGetters } from 'vuex';
// 导入$Mode模块
import $Mode from './mode/index';
// 导入index混入
import index from '@/mixins/index';
// 导入topLock组件
import topLock from '@/page/index/top/top-lock.vue';

export default {
  // 引入index混入
  mixins: [index],
  // 引入topLock组件
  components: {
    topLock,
  },
  // 定义data属性
  data() {
    return {
      // 是否显示app
      app: false,
      // 时间字符串
      timeString: '',
    };
  },
  computed: {
    // 将getters中的menu、tagList、tagWel、tag、userInfo、isMacOs映射到当前组件的计算属性中
    ...mapGetters(['menu', 'tagList', 'tagWel', 'tag', 'userInfo', 'isMacOs']),
    // 返回website中的menu的label属性
    labelKey() {
      return this.website.menu.label;
    },
    // 返回website中的menu的path属性
    pathKey() {
      return this.website.menu.path;
    },
    // 返回website中的menu的href属性
    hrefKey() {
      return this.website.menu.href;
    },
    // 返回website中的menu的children属性
    childrenKey() {
      return this.website.menu.children;
    },
    // 返回website中的menu的query属性
    queryKey() {
      return this.website.menu.query;
    },
    // 返回website中的menu的icon属性
    iconKey() {
      return this.website.menu.icon;
    },
    // 返回menuList
    menuList() {
      const result = [];
      // 递归查找menuList
      const findMenu = (list) => {
        list.forEach((ele) => {
          // 如果ele有childrenKey属性且长度不为0，则递归查找
          if (ele[this.childrenKey] && ele[this.childrenKey].length !== 0) {
            findMenu(ele[this.childrenKey]);
          } else {
            // 否则将ele添加到result中
            result.push(ele);
          }
        });
      };
      // 调用findMenu函数
      findMenu(this.menu);
      // 返回result
      return result;
    },
    // 返回deskTopAppList
    deskTopAppList() {
      // 返回menuList
      return this.menuList;
    },
    // 返回openAppList
    openAppList() {
      // 返回空数组
      return [];
    },
  },
  created() {
    // 在组件创建时启动计时器，并获取菜单数据
    this.startTimer();
    this.$store.dispatch('GetMenu');
  },
  methods: {
    // 切换主题
    switchTheme() {
      // 将主题名称设置为空
      this.$store.commit('SET_THEME_NAME', '');
      // 跳转到欢迎页面
      this.$router.push(this.tagWel);
      // 1秒后刷新页面
      setTimeout(() => location.reload());
    },
    // 退出登录
    logout() {
      // 将主题名称设置为空
      this.$store.commit('SET_THEME_NAME', '');
      // 调用退出登录的action
      this.$store.dispatch('LogOut').then(() => {
        // 跳转到登录页面
        this.$router.push({ path: '/login' });
        // 1秒后刷新页面
        setTimeout(() => location.reload());
      });
    },
    // 启动计时器
    startTimer() {
      // 每秒更新一次时间
      setInterval(() => {
        // 将时间格式化为'YYYY年MM月DD日 HH:mm'的字符串
        this.timeString = this.$dayjs().format('YYYY年MM月DD日 HH:mm');
      }, 1000);
    },
    // 打开应用
    openApp(item) {
      // 调用$Mode方法，传入应用的标题和路径
      $Mode({
        // 设置标题
        title: item[this.labelKey],
        // 设置路径，如果hrefKey存在，则使用hrefKey的值，否则使用pathKey的值
        path: item[this.hrefKey] ? item[this.hrefKey] : item[this.pathKey],
      });
    },
  },
};
</script>
<style>
/* 设置.top类下的.el-dropdown的样式 */
.top .el-dropdown {
  /* 设置字体颜色为白色 */
  color: white !important;
  /* 设置高度为100% */
  height: 100% !important;
}
</style>
<style scoped>
.desktop {
  /* 设置为弹性布局，子元素按列排列 */
  display: flex;
  /* 子元素按列排列 */
  flex-direction: column;
  /* 绝对定位 */
  position: absolute;
  /* 左边距为0 */
  left: 0;
  /* 右边距为0 */
  right: 0;
  /* 顶部边距为0 */
  top: 0;
  /* 底部边距为0 */
  bottom: 0;
  /* 文字颜色为白色 */
  color: white;
  /* 超出部分隐藏 */
  overflow: hidden;
  /* 文字阴影 */
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}

.top {
  /* 设置高度为28px */
  height: 28px;
  /* 设置背景颜色为rgba(0, 0, 0, 0.3) */
  background-color: rgba(0, 0, 0, 0.3);
  /* 设置背景模糊度为20px */
  backdrop-filter: blur(20px);
  /* 设置为flex布局 */
  display: flex;
  /* 设置主轴方向为水平 */
  flex-direction: row;
  /* 设置字体大小为14px */
  font-size: 14px;
  /* 设置垂直居中对齐 */
  align-items: center;
  /* 设置水平居中对齐 */
  justify-content: center;
  /* 设置内边距为0px 5px */
  padding: 0px 5px;
  /* 设置z-index为100 */
  z-index: 100;
}

.space {
  /* 设置flex-grow为1，使其占据剩余空间 */
  flex-grow: 1;
}

.logo {
  /* 设置logo的高度为100% */
  height: 100%;
  /* 设置logo的内边距为0px 15px */
  padding: 0px 15px;
  /* 设置鼠标悬停时的光标为指针 */
  cursor: pointer;
  /* 设置logo的位置为相对定位 */
  position: relative;
  /* 设置logo的布局为弹性布局 */
  display: flex;
  /* 设置logo的垂直居中对齐 */
  align-items: center;
  /* 设置logo的水平居中对齐 */
  justify-content: center;
}

.logo .el-select {
  /* 设置el-select的位置为绝对定位 */
  position: absolute;
  /* 设置el-select的透明度为0 */
  opacity: 0;
}

.logo:hover {
  background-color: rgba(255, 255, 255, 0.1);
  /* 鼠标悬停时，背景颜色变为半透明白色 */
}

/* 设置logo下的iconfont字体大小为16px，上边距为-3px */
.logo .iconfont {
  font-size: 16px;
  margin-top: -3px;
}

/* 设置menu下的item在鼠标悬停时的背景颜色为rgba(255, 255, 255, 0.1) */
.menu .item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.status {
  /* 设置元素为弹性布局 */
  display: flex;
  /* 设置主轴方向为水平方向 */
  flex-direction: row;
  /* 设置主轴上的对齐方式为居中对齐 */
  justify-content: center;
  /* 设置交叉轴上的对齐方式为居中对齐 */
  align-items: center;
  /* 设置元素高度为100% */
  height: 100%;
}

.audio .iconfont,
.notification .iconfont {
  /* 设置字体大小为20px */
  font-size: 20px;
}

.datetime,
.audio,
.notification {
  /* 设置鼠标悬停时的样式 */
  cursor: pointer;
  /* 设置内边距 */
  padding: 0px 10px;
  /* 设置高度为100% */
  height: 100%;
  /* 设置弹性布局 */
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 文本居中 */
  text-align: center;
}

.datetime:hover,
.audio:hover,
.notification:hover {
  /* 当鼠标悬停在.datetime、.audio、.notification元素上时，改变背景颜色为半透明的白色 */
  background-color: rgba(255, 255, 255, 0.1);
}

.body {
  /* 设置弹性增长，使元素可以增长以填充剩余空间 */
  flex-grow: 1;
  /* 设置元素为弹性容器 */
  display: flex;
  /* 设置弹性容器的主轴方向为水平方向 */
  flex-direction: row;
  /* 设置元素在主轴方向上的对齐方式为居中 */
  justify-content: center;
  /* 设置元素在交叉轴方向上的对齐方式为居中 */
  align-items: center;
  /* 设置元素为相对定位 */
  position: relative;
}

.footer {
  /* 设置元素为固定定位 */
  position: fixed;
  /* 设置元素距离左边和右边的距离为5px */
  left: 5px;
  right: 5px;
  /* 设置元素距离底部的距离为5px */
  bottom: 5px;
  /* 设置元素在主轴方向上的对齐方式为居中 */
  justify-content: center;
  /* 设置元素在交叉轴方向上的对齐方式为居中 */
  align-items: center;
  /* 设置元素为弹性容器 */
  display: flex;
  /* 设置弹性容器的主轴方向为水平方向 */
  flex-direction: row;
  /* 设置元素的堆叠顺序 */
  z-index: 100;
}

.footer .dock {
  /* 设置背景颜色为半透明白色 */
  background-color: rgba(255, 255, 255, 0.1);
  /* 设置边框颜色为半透明白色 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* 设置阴影效果 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  /* 设置背景模糊效果 */
  backdrop-filter: blur(20px);
  /* 设置边框圆角 */
  border-radius: 10px;
  /* 设置布局方向为水平 */
  flex-direction: row;
  /* 设置为弹性布局 */
  display: flex;
  /* 设置内边距 */
  padding: 2px;
}

.dock .item {
  /* 设置内边距为3px */
  padding: 3px;
  /* 设置显示方式为弹性盒子 */
  display: flex;
  /* 设置水平居中对齐 */
  justify-content: center;
  /* 设置垂直居中对齐 */
  align-items: center;
  /* 设置主轴方向为垂直方向 */
  flex-direction: column;
}

.dock .dot {
  /* 设置宽度为3px */
  width: 3px;
  /* 设置高度为3px */
  height: 3px;
  /* 设置背景颜色为rgba(0, 0, 0, 0.8) */
  background: rgba(0, 0, 0, 0.8);
  /* 设置绝对定位 */
  position: absolute;
  /* 设置底部距离为0px */
  bottom: 0px;
  /* 设置边框圆角为5px */
  border-radius: 5px;
  /* 设置显示方式为内联块 */
  display: inline-block;
  /* 设置字体大小为0 */
  font-size: 0;
}

.dock .item .iconfont {
  /* 鼠标悬停时，指针变为手型 */
  cursor: pointer;
  /* 内边距为2px */
  padding: 2px;
  /* 背景颜色为半透明白色 */
  background-color: rgba(255, 255, 255, 0.1);
  /* 圆角半径为10px */
  border-radius: 10px;
  /* 高度为30px */
  height: 30px;
  /* 宽度为30px */
  width: 30px;
  /* 文字居中对齐 */
  text-align: center;
  /* 字体大小为24px */
  font-size: 24px;
  /* 弹性布局 */
  display: flex;
  /* 垂直居中对齐 */
  align-items: center;
  /* 水平居中对齐 */
  justify-content: center;
  /* 变换和边距的过渡时间为0.3s */
  transition: transform 0.3s, margin 0.3s;
}

.dock .item:hover .iconfont {
  /* 鼠标悬停时，图标放大2倍，向上移动10px */
  transform: scale(2) translateY(-10px);
  /* 鼠标悬停时，图标左右边距为15px */
  margin: 0px 15px;
  /* 鼠标悬停时，图标出现阴影 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.dock .nearby .iconfont {
  /* 缩放图标，向上移动8px */
  transform: scale(1.6) translateY(-8px);
  /* 设置图标左右外边距 */
  margin: 0px 12px;
  /* 设置图标阴影 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.dock .nearby1 .iconfont {
  /* 缩放图标，向上移动6px */
  transform: scale(1.2) translateY(-6px);
  /* 设置图标左右外边距 */
  margin: 0px 9px;
  /* 设置图标阴影 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.dock .nearby2 .iconfont {
  /* 缩放图标，向上移动5px */
  transform: scale(1.1) translateY(-5px);
  /* 设置图标左右外边距 */
  margin: 0px 7px;
  /* 设置图标阴影 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.desktop-app {
  /* 设置绝对定位，右对齐，顶部对齐，底部对齐 */
  position: absolute;
  /* 设置元素的右边界为0 */
  right: 0;
  /* 设置元素的上边界为0 */
  top: 0;
  /* 设置元素的下边界为0 */
  bottom: 0;
  /* 设置弹性布局，垂直排列，内容靠左对齐 */
  display: flex;
  /* 设置主轴方向为垂直方向 */
  flex-direction: column;
  /* 设置交叉轴方向上的对齐方式为顶部对齐 */
  justify-content: flex-start;
  /* 设置交叉轴方向上的对齐方式为右对齐 */
  align-items: flex-end;
  /* 设置内边距 */
  padding: 20px;
  /* 设置换行方式，反向换行 */
  flex-wrap: wrap-reverse;
}

.app-item {
  /* 设置外边距 */
  margin: 5px 10px;
  /* 设置内边距 */
  padding: 5px;
  /* 设置弹性布局，垂直排列 */
  flex-direction: column;
  /* 设置文本居中对齐 */
  text-align: center;
  /* 设置文本阴影 */
  text-shadow: 0px 0px 2px rgb(0 0 0 / 50%);
  /* 设置鼠标悬停时的样式 */
  cursor: pointer;
  /* 设置边框圆角 */
  border-radius: 10px;
  /* 设置边框样式 */
  border: 2px solid transparent;
}

.app-item .icon {
  /* 设置图标的外边框圆角为10px */
  border-radius: 10px;
  /* 设置图标的宽度为50px */
  width: 50px;
  /* 设置图标的高度为50px */
  height: 50px;
  /* 设置图标的内容为弹性布局 */
  display: flex;
  /* 设置图标的内容在主轴上居中对齐 */
  justify-content: center;
  /* 设置图标的内容在交叉轴上居中对齐 */
  align-items: center;
}

.app-item .iconfont {
  /* 设置图标字体的大小为36px */
  font-size: 36px;
}

.app-item .title {
  /* 设置标题的字体大小为12px */
  font-size: 12px;
  /* 设置标题的宽度为50px */
  width: 50px;
  /* 设置标题的上边距为5px */
  margin-top: 5px;
  /* 设置标题的内容不换行 */
  white-space: nowrap;
  /* 设置标题的内容超出部分用省略号表示 */
  text-overflow: ellipsis;
  /* 设置标题的内容超出部分隐藏 */
  overflow: hidden;
}

.app-item:hover {
  /* 设置鼠标悬停时的边框为2px的白色半透明边框 */
  border: 2px solid rgba(255, 255, 255, 0.5);
}
</style>
