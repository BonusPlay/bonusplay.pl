import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Blog from "./views/Blog.vue";
import E404 from "./views/404.vue";
import Api from "./views/Api.vue";
import Notes from "./views/Notes.vue";

Vue.use(Router);

function withPrefix(prefix, routes) {
	return routes.map(route => {
		route.path = prefix + route.path;
		return route;
	});
}

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			path: "/api",
			component: Api
		},
		{
			path: "/n",
			component: Notes
		},
		{
			// registers blog route as PostList
			path: "/blog",
			component: Blog
		},
		{
			// registers blog posts with BlogPost base
			path: "/blog",
			component: () => import(/* webpackChunkName: "blog" */ "./views/blog/post.vue"),
			children: [
				...withPrefix("reverse-engineering", [
					{
						path: "/counter-bonus",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/reverse-engineering/counter-bonus.vue")
					}
				]),
				...withPrefix("web", [
					{
						path: "/website",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/web/website.vue")
					}
				]),
				...withPrefix("networking", [
					{
						path: "/hsmod",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/networking/hsmod.vue")
					},
					{
						path: "/0",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/networking/0.vue")
					},
					{
						path: "/1",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/networking/1.vue")
					}
				]),
				...withPrefix("random", [
					{
						path: "/git-deploy",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/random/git-deploy.vue")
					},
					{
						path: "/mail-server",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/random/mail-server.vue")
					},
					{
						path: "/linux-gaming",
						component: () => import(/* webpackChunkName: "blog" */ "./views/blog/random/linux-gaming.vue")
					}
				])
			]
		},
		{
			path: "*",
			component: E404
		}
	]
});
