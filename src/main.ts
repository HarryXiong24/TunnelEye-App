import Vue from "vue";

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import echarts from 'echarts';
import vueEcharts from 'vue-echarts';
import FastClick from 'fastclick'

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(MuseUI)
Vue.use(echarts as any)
Vue.component('v-chart', vueEcharts)
 
Vue.config.productionTip = false;
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
