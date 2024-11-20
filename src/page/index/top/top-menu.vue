<template>
  <el-menu class="top-menu" :default-active="topPath" mode="horizontal" text-color="#333">
    <template v-for="(item, index) in items" :key="index">
      <el-menu-item :index="getPath(item)" @click="openMenu(item)">
        <em v-if="showMenuIcon" :class="item[iconKey]"></em>
        <template #title>
          <span>{{ getTitle(item) }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import website from '@/config/website';

export default {
  name: 'top-menu',
  data() {
    return {
      props: website.menu,
      showMenuIcon: false, // 是否展示菜单图标
      isAutoOpen: true, // 是否自动打开子菜单
    };
  },
  inject: ['index'],
  created() {},
  computed: {
    ...mapGetters(['setting', 'tagCurrent', 'menu', 'topPath']),
    items() {
      const { sidebar } = this.setting;
      if (sidebar != 'horizontalVertical') return [];
      return this.menu;
    },
    labelKey() {
      return this.props.label;
    },
    pathKey() {
      return this.props.path;
    },
    queryKey() {
      return this.props.query;
    },
    iconKey() {
      return this.props.icon;
    },
    childrenKey() {
      return this.props.children;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        const { matched = '' } = this.$route;
        if (!matched || !matched.length) return;
        const {path} = matched[0];
        if (path != this.topPath) return this.openMenu(matched[0], false);
      },
    },
  },
  methods: {
    getPath(item) {
      return item[this.pathKey];
    },
    /**
     * 打开菜单
     * @param {*} item
     * @param {boolean} openChildren 是否跳转到第一个子菜单
     */
    openMenu(item, openChildren = true) {
      this.$store.commit('SET_TOPPATH', item.path);
      if (!item.children.length) return this.open(item);
      if (!this.isAutoOpen || !openChildren) return;
      if (item.children[0]?.children?.length) {
        this.open(item.children[0].children[0]);
      } else {
        this.open(item.children[0]);
      }
    },
    open(item) {
      this.$router.push({
        path: item[this.pathKey],
        query: item[this.queryKey],
      });
    },
    getTitle(item) {
      return this.$router.$avueRouter.generateTitle(item, this.props);
    },
  },
};
</script>
