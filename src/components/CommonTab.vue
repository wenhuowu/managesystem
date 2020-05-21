<template>
  <div>
    <!-- eslint-disable -->
    <el-tag
      :key="tag.name"
      size="small"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :type="tag.type"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="clickTab(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >{{ tag.label }}</el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  /* eslint-disable */
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabs
    })
  },
  methods: {
    clickTab(tag) {
      this.$router.push(tag.path);
    },
    handleClose(tag, index) {
      let length = this.tags.length - 1;
      this.$store.commit("removeTag", index);
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return;
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name });
      } else {
        // 否则往右边跳转
        this.$router.push({ name: this.tags[index].name });
      }
    }
  }
};
</script>

<style>
.el-tag {
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>