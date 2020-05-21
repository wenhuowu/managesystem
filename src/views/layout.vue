<template>
  <el-container style="height:100%">
    <el-aside width="auto">
      <commontAside />
    </el-aside>
    <el-container>
      <el-header>
        <commontHeader />
      </el-header>
      <el-main>
        <CommonTab />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
import commontAside from "../components/commontAside.vue";
import commontHeader from "../components/commontHeader.vue";
import CommonTab from "../components/CommonTab.vue";
export default {
  components: {
    commontHeader,
    commontAside,
    CommonTab
  }
};
</script>

<style>
.el-header {
  background-color: #333;
}
</style>
