<template>
  <el-scrollbar class="avue-menu">
    <div v-if="sidebarMenu && sidebarMenu.length == 0 && !isHorizontal" class="avue-sidebar--tip">
      {{ $t('menuTip') }}
    </div>
    <!-- 绑定key解决切换到 horizontal 模式时子菜单不会折叠的问题-->
    <el-menu unique-opened :key="isHorizontal" :default-active="activeMenu" :mode="isHorizontal ? 'horizontal' : 'vertical'" :collapse="getScreen(isCollapse)">
      <sidebar-item :menu="sidebarMenu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import website from '@/config/website';
import sidebarItem from './sidebarItem.vue';

export default {
  name: 'sidebar',
  components: { sidebarItem },
  inject: ['index'],
  created() {
    this.index.openMenu();
  },
  computed: {
    ...mapGetters(['isHorizontal', 'setting', 'topPath', 'menu', 'tag', 'isCollapse', 'menuId']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    iconKey() {
      return this.website.menu.icon;
    },
    sidebarMenu() {
      const { sidebar } = this.setting;
      if (sidebar != 'horizontalVertical') return this.menu;
      const targetMenu = this.menu.find((item) => item.path == this.topPath);
      if (targetMenu) return targetMenu.children;
      else {
        // 如果没有菜单，将当前页面当作菜单返回。（如果不需要这种操作，返回空数组即可）
        const child = this.$route;
        const { icon = website.menu.iconDefault } = child.meta;
        child[this.iconKey] = icon;
        return [child];
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
