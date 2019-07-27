import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import "@fortawesome/fontawesome-free/css/all.css";

import Vuetify from "vuetify";
import Vcolors from "vuetify/es5/util/colors";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify, {
	theme: {
		primary: Vcolors.purple,
		secondary: Vcolors.grey.darken1,
		accent: colors.shades.black,
		error: colors.red.accent3
	},
	iconfont: "fa"
});

import KonamiCode from "./konami-code";
Vue.use(KonamiCode, () => {
	new Audio(require("@/assets/snake.webm")).play();
});

import Prism from "prismjs";
import colors from "vuetify/es5/util/colors";
Prism.highlightAll();

import Clipboard from "v-clipboard";
Vue.use(Clipboard);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
