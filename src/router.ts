import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Blog from "./views/Blog.vue";
import E404 from "./views/404.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/blog",
			component: Blog
		},
		{
			path: "*",
			component: E404
		}
	]
});
