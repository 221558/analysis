<template>
  <template v-for="item in menu">
    <el-menu-item v-if="validatenull(item[childrenKey]) && validRoles(item)" :index="getPath(item)" @click="open(item)" :key="item[labelKey]">
      <em :class="item[iconKey]"></em>
      <template #title>
        <span :alt="item[pathKey]">{{ getTitle(item) }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else-if="!validatenull(item[childrenKey]) && validRoles(item)" :index="getPath(item)" :key="item[labelKey]">
      <template #title>
        <em :class="item[iconKey]"></em>
        <span>{{ getTitle(item) }}</span>
      </template>
      <template v-for="(child, cindex) in item[childrenKey]" :key="child[labelKey]">
        <el-menu-item :index="getPath(child)" @click="open(child)" v-if="validatenull(child[childrenKey])">
          <em :class="child[iconKey]"></em>
          <template #title>
            <span>{{ getTitle(child) }}</span>
          </template>
        </el-menu-item>
        <sidebar-item v-else :menu="[child]" :key="cindex"></sidebar-item>
      </template>
    </el-sub-menu>
  </template>
</template>
<script>
import { mapGetters } from 'vuex';
import { validatenull } from 'utils/validate';
import website from '@/config/website';

export default {
  name: 'sidebarItem',
  data() {
    return {
      props: website.menu,
    };
  },
  props: {
    menu: Array,
  },
  computed: {
    ...mapGetters(['roles']),
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
  methods: {
    validatenull,
    getPath(item) {
      return item[this.pathKey];
    },
    getTitle(item) {
      return this.$router.$avueRouter.generateTitle(item, this.props);
    },
    validRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    open(item) {
      this.$router.push({
        path: item[this.pathKey],
        query: item[this.queryKey],
      });
    },
  },
};
</script>
