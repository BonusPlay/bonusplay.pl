import Vue from "vue";
import { default as Router, RouteConfig } from "vue-router";
import Home from "./views/Home.vue";
import Blog from "./views/Blog.vue";
import E404 from "./views/404.vue";
import Api from "./views/Api.vue";

import BlogPost from "./components/blog/post.vue";

// web
import BlogWebsite from "./components/blog/web/website.vue";

// RE
import BlogCounterBonus from "./components/blog/reverse-engineering/counter-bonus.vue";

// networking
import BlogHsmod from "./components/blog/networking/hsmod.vue";
import BlogMultiplayer0 from "./components/blog/networking/0.vue";
import BlogMultiplayer1 from "./components/blog/networking/1.vue";

// random
import BlogGitDeploy from "./components/blog/random/git-deploy.vue";
import BlogMailServer from "./components/blog/random/mail-server.vue";

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
				...withPrefix("reverse-engineering", [
					{
						path: "/counter-bonus",
						component: BlogCounterBonus
					}
				]),
				...withPrefix("web", [
					{
						path: "/website",
						component: BlogWebsite
					}
				]),
				...withPrefix("networking", [
					{
						path: "/hsmod",
						component: BlogHsmod
					},
					{
						path: "/0",
						component: BlogMultiplayer0
					},
					{
						path: "/1",
						component: BlogMultiplayer1
					}
				]),
				...withPrefix("random", [
					{
						path: "/git-deploy",
						component: BlogGitDeploy
					},
					{
						path: "/mail-server",
						component: BlogMailServer
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
