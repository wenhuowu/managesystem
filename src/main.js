import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./api/config";
import "./assets/scss/reset.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import underscore from "vue-underscore";

import "./mock";

Vue.use(ElementUI);
Vue.use(underscore);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit("getToken");
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit("getMenu");
  let token = store.state.user.token;
  console.log(token, 11);
  next();
  // 过滤登录页，防止死循环
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

/* eslint-disable */
new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    this.$store.commit("addMenu", this.$router);
  },
}).$mount("#app");
