import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Blog from "./views/Blog.vue";
import E404 from "./views/404.vue";
import Api from "./views/Api.vue";

import website from "./components/blog/website.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/blog",
			component: Blog,		
			children: [
				{
					path: "/home",
					component: website
				},
				{
					path: "website",
					component: website
				}
			]
		},
		{
			path: "/api",
			component: Api
		},
		{
			path: "*",
			component: E404
		}
	]
});
