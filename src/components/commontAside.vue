<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="border: none;"
    :collapse="iscollapse"
  >
    <!-- eslint-disable  -->
    <h3 v-show="!iscollapse">后台管理系统</h3>
    <h3 v-show="iscollapse">后台</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="1" v-for="(item, index3) in hasChildren" :key="index3">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          style="min-width: 198px;"
          :index="subitem.path"
          v-for="(subitem, index1) in item.children"
          @click="clickMenu(subitem)"
          :key="index1"
        >
          <i :class="'el-icon-' + subitem.icon"></i>
          <span slot="title">{{ subitem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  /* eslint-disable */

  computed: {
    hasChildren() {
      return this.menu.filter(v => v.children);
    },
    noChildren() {
      return this.menu.filter(v => !v.children);
    },
    ...mapState({
      iscollapse: state => state.tab.iscollapse,
      menu: state => state.tab.menu
    })
  },
  created() {},

  data() {
    return {
      asideMenu: [
        { path: "/home", label: "首页", icon: "s-home" },
        { path: "/video", label: "视频管理", icon: "video-play" },
        { path: "/user", label: "用户管理", icon: "user" },
        {
          label: "其他",
          icon: "more",
          children: [
            { path: "/page1", label: "页面一", icon: "takeaway-box" },
            { path: "/page2", label: "页面二", icon: "setting" }
          ]
        }
      ]
    };
  },
  methods: {
    clickMenu(item) {
      this.$router.push(item.path);
      this.$store.commit("selectMenu", item);
    },
    changeCollapse() {
      this.collapse = !this.collapse;
    }
  }
};
</script>

<style lang="scss">
.el-menu {
  height: 100%;
  h3 {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
}
.el-menu .elMenuItem {
  width: 150px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
