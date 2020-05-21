<template>
  <!-- eslint-disable -->
  <header id="header">
    <div class="left">
      <el-button type="info " icon="el-icon-menu" size="small" @click="changeCollapse"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <span @click="closeItem">首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: currentMenu.path }"
          v-if="currentMenu"
        >{{ currentMenu.label }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>用户管理</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img :src="userImg" alt />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  data() {
    return {
      collapse: false,
      userImg: require("../assets/images/user.png")
    };
  },
  computed: {
    ...mapState({
      currentMenu: state => state.tab.currentMenu
    })
  },
  methods: {
    exit() {
      this.$store.commit("clearToken");
      this.$store.commit("removeMenu");
      this.$store.commit("clearMenu");
      localStorage.removeItem("currentMenu");
      location.reload();
    },
    closeItem() {
      this.$store.commit("closeBread");
    },
    changeCollapse() {
      this.$store.commit("changeCollapse");
    }
  }
};
</script>

<style lang="scss">
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .left {
    width: 500px;
    display: inline-block;
    display: flex;
    align-items: center;
    .el-button {
      font-size: 12px;
      padding: 7px 10px;
    }
    .el-breadcrumb {
      margin-left: 20px;
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-size: 14px;
          color: #666666;
          font-weight: normal;
        }
        &:last-child {
          .el-breadcrumb__inner {
            color: #ffffff;
          }
        }
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-dropdown {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
