import cookie from "js-cookie";

let store = {
  /* eslint-disable */
  state: {
    menu: [],
    currentMenu: JSON.parse(localStorage.getItem("currentMenu")) || null,
    tabs: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
        type: "info",
      },
    ],
    iscollapse: false,
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val;
      cookie.set("menu", JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      cookie.remove("menu");
    },
    addMenu(state, router) {
      if (!cookie.get("menu")) {
        return;
      }
      let menu = JSON.parse(cookie.get("menu"));
      state.menu = menu; //防止刷新页面数据丢失
      //这里相当于把route.js里的配置路由抽出来，根据服务端返回参数动态添加
      let currentMenu = [
        {
          path: "/",
          redirect: "/Home",
          component: () => import("@/views/layout"),
          children: [],
        },
      ];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      router.addRoutes(currentMenu);
    },

    selectMenu(state, val) {
      if (val.label === "首页") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let result = state.tabs.findIndex((v) => v.label === val.label);
        result === -1 ? state.tabs.push({ ...val, type: "info" }) : "";
        cookie.set("tagList", JSON.stringify(state.tabs));
      }
    },
    getMenu(state) {
      if (cookie.get("tagList")) {
        console.log(1);
        let tagList = JSON.parse(cookie.get("tagList"));
        state.tabs = tagList;
      }
    },
    removeMenu(state) {
      cookie.remove("tagList");
    },
    removeTag(state, index) {
      state.tabs.splice(index, 1);
      cookie.set("tagList", JSON.stringify(state.tabs));
    },
    closeBread(state) {
      state.currentMenu = null;
    },
    changeCollapse(state) {
      state.iscollapse = !state.iscollapse;
    },
  },
  actions: {},
  modules: {},
};

export default store;
