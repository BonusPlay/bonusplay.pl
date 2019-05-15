<template>
	<div class="has-text-justified content">
		<h1 class="title is-3 has-text-centered">Deploy with git</h1>In this blog post, I'm going to describe how I deploy my website via git, without a single additional command.
		<div class="has-text-centered">
			<img :src="require('@/assets/blog/git-deploy00.webp')">
		</div>
		<!-- Goal -->
		<h3 class="title is-3 has-text-centered">Goal</h3>When I push
		<code>master</code> branch to my github repo, I want it to deploy to production. Also, when I push
		<code>dev</code>
		branch it will deploy to development environment.
		<!-- How to -->
		<h3 class="title is-3 has-text-centered">How to</h3>Setup is divided into two parts,
		<i>"client"</i> (your PC) and
		<i>"server"</i>
		(server you want to deploy to). All data in <code>{}</code> is placeholder and need to be replaced!
		<h4 class="title is-4">Server side</h4>
		<ul>
			<li><code>git init --bare {folder}</code> - we initialize a bare git repo</li>
			<li>look up how to do a "git shared repository" if you want multiple people pushing to same repo</li>
			<li>create a file <code>{folder}/hooks/post-receive</code> - this is a bash script, that will be executed whenever you push</li>
		</ul>
		My hook looks like this:
		<pre v-highlightjs><code class="bash">
#!/bin/sh

# temp folder used for building
TEMP="/tmp/{folder}"

# path to the bare repo
REPO="{repo}"

# fetches branch name
branch=$(git --git-dir=$REPO branch | grep '*' | sed 's/* //' | tr '_' '/')

if [ "$branch" == "master" ]; then
	TARGET="{prod_folder}"
elif [ "$branch" == "dev" ]; then
	TARGET="{dev_folder}"
else
	echo "Not master/develop branch, ignoring."
	exit 1
fi

mkdir -p $TEMP
cd $TEMP
git --work-tree=$TEMP --git-dir=$REPO checkout -f

# execute all your build scripts here
# example for my website:
npm install
npm run build

# copy your project to target here
# in my example
rm -rf $TARGET/*
mv ./dist/* $TARGET/

# cleanup
rm -rf $TEMP
		</code></pre>
		<h4 class="title is-4">Client side</h4>
		Here, the <code>{folder}</code> is an absolute path of folder created in previous steps.
		<ul>
			<li><code>git remote add deploy ssh://{user}@{ip}/{folder}</code> - if you want to have a separate remote</li>
			<li><code>git remote add-url {remote} ssh://{user}@{ip}/{folder}</code> - if you want to deploy when you push to specified remote</li>
		</ul>
		<!-- Done! -->
		<h1 class="title is-3 has-text-centered">Done!</h1>
		Nothing more. Enjoy your easy deploys!
		<div class="has-text-centered">
			<img :src="require('@/assets/blog/git-deploy01.webp')">
		</div>
	</div>
</template>