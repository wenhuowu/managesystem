/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login"),
  },
];
const router = new VueRouter({
  routes,
});

export default router;

//此处在vuex处动态封装，封装成一模一样
// {
//   path: "/",
//   name: "layout",
//   redirect: "/home",
//   component: Layout,
//   children: [
//     {
//       path: "/home",
//       name: "首页",
//       component: () => import("@/views/home/home"),
//     },
//     {
//       path: "user",
//       name: "用户管理",
//       component: () => import("@/views/user/user"),
//     },
//     {
//       path: "video",
//       name: "视频管理",
//       component: () => import("@/views/video/video"),
//     },
//     {
//       path: "page1",
//       name: "页面一",
//       component: () => import("@/views/other/component/page1"),
//     },
//     {
//       path: "page2",
//       name: "页面二",
//       component: () => import("@/views/other/component/page2"),
//     },
//   ],
// },
