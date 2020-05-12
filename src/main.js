import Vue from "vue";
import App from "./App.vue";
import router from "./routes.js";
import { guest } from "./plugins/axios";
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  router,
  guest,
  store,
  render: (h) => h(App),
}).$mount("#app");
