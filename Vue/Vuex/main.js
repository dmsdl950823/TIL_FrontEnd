import Vue from "vue";
import App from "./App.vue";

import store from './store'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),

  // Vue 인스턴스에 등록
  store
}).$mount("#app");
