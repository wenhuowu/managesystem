/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import tab from "./tab";
import user from "./user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tab,
    user,
  },
});

store.subscribe((mutations, state) => {
  localStorage.setItem("currentMenu", JSON.stringify(state.tab.currentMenu));
});
export default store;
