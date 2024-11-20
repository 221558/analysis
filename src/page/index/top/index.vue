<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="avue-breadcrumb" :class="[{ 'avue-breadcrumb--active': isCollapse }]" v-if="setting.collapse && !isHorizontal">
        <em class="icon-navicon" @click="setCollapse"></em>
      </div>
    </div>
    <div class="top-bar__title">
      <top-menu ref="topMenu" v-if="setting.sidebar == 'horizontalVertical'"></top-menu>
      <top-search class="top-bar__item" v-if="setting.search"></top-search>
    </div>
    <top-right />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import topMenu from './top-menu.vue';
import topSearch from './top-search.vue';
import topRight from './top-right.vue';

export default {
  components: {
    topMenu,
    topSearch,
    topRight,
  },
  name: 'top',
  data() {
    return {};
  },
  filters: {},
  created() {},
  computed: {
    ...mapGetters(['setting', 'isCollapse', 'isHorizontal']),
  },
  methods: {
    setCollapse() {
      this.$store.commit('SET_COLLAPSE');
    },
  },
};
</script>

<style lang="scss"></style>
