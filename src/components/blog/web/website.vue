<template>
	<div class="has-text-justified content">
		<h1 class="title is-1 has-text-centered">Website</h1>In this blog post, I'm going to describe the architecture of this very website.
		The goal was to have a high performance, OK looking (I'm not a designer) website and learn a lot of new stuff on the way there.
		Here is a screenshot of my server running 3 different domains, 2 databases, mail server and a few more things that I forgot about.
		I think that ~1% of CPU usage at idle and 155MB of RAM for everything combined (including OS!) is a really good result.
		<div class="has-text-centered">
			<img :src="require('@/assets/blog/website00.webp')">
			<img :src="require('@/assets/power.jpg')">
		</div>
		<h1 class="title is-3 has-text-centered">Frontend</h1>Frontend is written in Vue. The reasony I prefer Vue over React is that it separates all 3
		<i>"layers"</i> of frontend.
		In React, you have JS and HTML mixed. In my opinion that approach only makes code harder to read.
		Libraries and technologies I've used:
		<ul>
			<li>Vuex - state storage (currently unused)</li>
			<li>Vue-router - navigation</li>
			<li>
				Bulma - CSS framework
				<br>I chose Bulma instead of Material Design/Bootstrap, because I wanted to experiment with new framework.
				I wanted a dark theme website, but I didn't want to use Sass CSS (why the hell does a CSS precompiler need C++ build chain???),
				so I had to write some CSS myself.
			</li>
			<li>
				TypeScript - why not
				<br>I've learned, that it's overkill for small project like this, but probably helps
				<b>a lot</b> when working in a team, due to interfaces and types being well known to both sides.
				Also,
				<code>vue-class-component</code> and
				<code>vue-property-decorator</code> are really cool.
			</li>
			<li>LessCSS - just CSS, with a little bit more umph.</li>
			<li>PWA - why not, since webpack + Vue allow to cache a lot of stuff "by default".</li>
		</ul>
		<h2 class="title is-2 has-text-centered">Backend</h2>Here comes the more interesting stuff. I wanted high performance, low cost backend.
		Why?
		<i>"Science isn't about why, it's about why not!"</i> ~ Cave Johnson.
		<br>
		<br>
		<br>
		<h4 class="title is-4">Reverse Proxy</h4>First of all, I wanted to easily host multiple domains on same server. I quickly learned, that I'm going to need a reverse proxy.
		I had previously used nginx, but I wanted something better. After more searching I've found and instantly fell in love with traefik.
		A high performance, low cost reverse proxy written in Go. It even comes with a load balancer! I'm running traefik dashboard on port that's blocked
		from going outside, but I can connect to it with a simple ssh tunnel (
		<code>ssh -nNT -L port:localhost:port user@domain</code>).
		The beauty of traefik is that it takes ~10 LoC in config file to proxy any HTTP website via my server (on custom subdomain with SSL).
		<div class="has-text-centered">
			<img :src="require('@/assets/icons-tech/traefik.svg')">
		</div>
		<h4 class="title is-4">SSL</h4>
		I decided, that in {{ new Date().getFullYear() }} SSL was a must. I wanted a wildcard certificate, but I didn't want to pay for it.
		Luckilly, Let's encrypt had my back. With
		<code>certbot</code> and it's cloudflare plugin I managed to obtain a wildcard certificate for my domain
		without any problems. Don't forget, to add a cron job, otherwise it might expire!
		I'm letting traefik handle SSL connections (so my other applications run on plain HTTP).
		<div class="has-text-centered">
			<img :src="require('@/assets/icons-tech/letsencrypt.svg')">
		</div>
		<h4 class="title is-4">Web Server</h4>So, we've got reverse proxy and load balancer with SSL, but we still haven't served a single file to user.
		I was debating what to use and my thought process looked something like this:
		<ul>
			<li>Java Spring (kotlin) - too heavy</li>
			<li>C# .Net Core - turns out, atm it's just as heavy as Java.</li>
			<li>Python - meh, wanted more power</li>
			<li>Ruby - nope, heard a lot of bad things from friends about it, but maybe I'll give it a shot in the future</li>
			<li>Go - anoying to write in (no generics, poor error handling), but does have the performance</li>
			<li>C++ - nope, nope, nope, nope, nope</li>
		</ul>I chose Go, because I've heard is super popular in the US. It's also
		<b>very</b> appealing as an "easy to use" low level,
		very high performance language, without all the hassle with pointers. It's amazing for backend, but I'd wait with any major
		projects till Go 2.0 release, which is supposed to fix a lot of problems.
		As for framework I used go-chi, because of it's very good performance (and also I just flipped a coin to choose framework).
		<br>Here comes the plot twist. There are actually 3 separate backends for
		<code>bonusplay.pl</code>.
		<ul>
			<li>
				<code>bonusplay.pl</code> - main website.
			</li>
			<li>
				<code>dev.bonusplay.pl</code> - testing environment. This is used to publish future builds of my website.
			</li>
			<li>
				<code>api.bonusplay.pl</code> - API. Used by released applications.
			</li>
		</ul>All 3 websites are actually hosted by same Go executable (with goroutines). The executable also has a very simple service file,
		so it restarts on crash and autostarts on server boot.
		<br>
		<br>
		<h4 class="title is-4">Database</h4>For databases (unused by this project), I chose:
		<ul>
			<li>Redis - great cache</li>
			<li>MariaDB - better MySQL</li>
		</ul>
		<h4 class="title is-4">Mail server</h4>Auch. This bit here took me longest to setup and figure out. No clever tricks, just a ton of guides, even more documentation and
		a lot of time. Dovecot + Postfix. If you have a better way to do it, feel free to contact me. I'm always ready to learn something new!
		<h1 class="title is-3 has-text-centered">Deployment</h1>I have separate post about my way of deploying website, which you can read here:
		<router-link to="/blog/random/git-deploy" class="button is-dark">Git-Deploy</router-link>
		<h1 class="title is-3 has-text-centered">Afterword</h1>I hope this post inspired you to make your own website and will save you a lot of trouble on your way there.
	</div>
</template>

<style lang="less" scoped>
img {
	max-height: 25vh;
}
</style>
