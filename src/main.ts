import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "font-awesome/css/font-awesome.css";
Vue.use(Buefy, { defaultIconPack: "fa" });

import KonamiCode from "./konami-code";
Vue.use(KonamiCode, () => {
	new Audio(require("@/assets/snake.webm")).play();
});

import HighlightJS from "./highlightjs";
import 'highlight.js/styles/default.css';
Vue.use(HighlightJS);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");