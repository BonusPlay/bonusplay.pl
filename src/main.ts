import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faDiscord, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHome, faEnvelope, faLink, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faGithub, faDiscord, faFacebook, faYoutube, faHome, faEnvelope, faLink, faArrowLeft);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy, { defaultIconComponent: "font-awesome-icon" });

import KonamiCode from "./konami-code";
Vue.use(KonamiCode, () => {
	new Audio(require("@/assets/snake.webm")).play();
});

import Prism from "prismjs";
Prism.highlightAll();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");