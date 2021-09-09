import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store.js";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import "es6-promise/auto";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(store);
appInstance.use(VueSweetalert2);
appInstance.mount("#app");
