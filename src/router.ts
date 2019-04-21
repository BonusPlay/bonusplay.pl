import Vue from "vue";
import { default as Router, RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import Blog from "./views/Blog.vue";
import E404 from "./views/404.vue";
import Api from "./views/Api.vue";

import BlogPost from "./components/blog/post.vue";
import BlogWebsite from "./components/blog/website.vue";
import BlogMultiplayer0 from "./components/blog/multiplayer/0.vue";
import BlogMultiplayer1 from "./components/blog/multiplayer/1.vue";

Vue.use(Router);

function withPrefix(prefix: string, routes: RouteConfig[]): RouteConfig[] {
	return routes.map(route => {
		route.path = prefix + route.path;
		return route;
	});
}

export default new Router({
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
			component: BlogPost,
			children: [
				{
					path: "website",
					component: BlogWebsite
				},
				...withPrefix("multiplayer", [
					{
						path: "/0",
						component: BlogMultiplayer0
					},
					{
						path: "/1",
						component: BlogMultiplayer1
					}
				])
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
