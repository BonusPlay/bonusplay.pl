import Vue from "vue";
import { default as Router, RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import Blog from "./views/Blog.vue";
import E404 from "./views/404.vue";
import Api from "./views/Api.vue";
import Notes from "./views/Notes.vue";

Vue.use(Router);

function withPrefix(prefix: string, routes: RouteConfig[]): RouteConfig[] {
	return routes.map(route => {
		route.path = prefix + route.path;
		return route;
	});
}

export default new Router({
	mode: 'history',
	routes: [
		{
			path: "/",
			component: Home
		},
		{
			// registers blog route as PostList
			path: "/blog",
			component: Blog
		},
		{
			// registers blog posts with BlogPost base
			path: "/blog",
			component: () => import(/* webpackChunkName: "blog" */ "./components/blog/post.vue"),
			children: [
				...withPrefix("reverse-engineering", [
					{
						path: "/counter-bonus",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/reverse-engineering/counter-bonus.vue")
					}
				]),
				...withPrefix("web", [
					{
						path: "/website",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/web/website.vue")
					}
				]),
				...withPrefix("networking", [
					{
						path: "/hsmod",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/networking/hsmod.vue")
					},
					{
						path: "/0",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/networking/0.vue")
					},
					{
						path: "/1",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/networking/1.vue")
					}
				]),
				...withPrefix("random", [
					{
						path: "/git-deploy",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/random/git-deploy.vue")
					},
					{
						path: "/mail-server",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/random/mail-server.vue")
					},
					{
						path: "/linux-gaming",
						component: () => import(/* webpackChunkName: "blog" */ "./components/blog/random/linux-gaming.vue")
					}
				])
			]
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
			path: "*",
			component: E404
		}
	]
});
