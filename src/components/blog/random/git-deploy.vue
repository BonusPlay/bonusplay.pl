<template>
	<v-layout align-space-around justify-space-around column text-xs-justify>
		<!-- Goal -->
		<v-flex>
			<h1 class="display-3 text-xs-center">Deploy with git</h1>
			In this blog post, I'm going to describe how I deploy my website via git, without a single additional command.
			When I push
			<code>master</code> branch to my github repo, I want it to deploy to production. Also, when I push
			<code>dev</code> branch it will deploy to development environment.
			<v-img :src="require('@/assets/blog/git-deploy00.webp')" contain max-height="20vh"/>
		</v-flex>
		
		<v-divider class="my-3"/>

		<!-- How to -->
		<v-flex>
			<h2 class="display-2 text-xs-center">How to</h2>Setup is divided into two parts,
			<i>"client"</i> (your PC) and
			<i>"server"</i>
			(server you want to deploy to). All data in
			<code>{}</code> is placeholder and need to be replaced!
			<h3 class="display-1">Server side</h3>
			<ul>
				<li>
					<code>git init --bare {folder}</code> - we initialize a bare git repo
				</li>
				<li>look up how to do a "git shared repository" if you want multiple people pushing to same repo</li>
				<li>
					create a file
					<code>{folder}/hooks/post-receive</code> - this is a bash script, that will be executed whenever you push
				</li>
				<li>
					remember to make <code>{folder}/hooks/post-receive</code> executable (I forgot it so many times I put this in it's own step)
				</li>
			</ul>My hook looks like this:
			<pre class="line-numbers" data-start="0"><code class="lang-bash">{{ code }}</code></pre>
			<h3 class="display-1">Client side</h3>Here, the
			<code>{folder}</code> is an absolute path of folder created in previous steps.
			<ul>
				<li>
					<code>git remote add deploy ssh://{user}@{ip}/{folder}</code> - if you want to have a separate remote
				</li>
				<li>
					<code>git remote set-url --add {remote} ssh://{user}@{ip}/{folder}</code> - if you want to deploy when you push to specified remote
				</li>
			</ul>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- Done! -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Done!</h2>
			Nothing more. Enjoy your easy deploys!
			<v-img :src="require('@/assets/blog/git-deploy01.webp')" contain max-height="20vh"/>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Prism from "prismjs";

@Component({
	mounted() {
		Prism.highlightAll();
	}
})
export default class extends Vue {
	code = `#!/bin/sh

# colors
GREEN="\\033[1;32m"
RED="\\033[1;31m"
YELLOW="\\033[1;33m"
NOCOLOR="\\033[0m"

# temp folder used for building
TEMP="/tmp/{folder}"

# path to the bare repo
REPO="{repo}"

# fetches branch name
while read oldrev newrev refname
branch=$(git rev-parse --symbolic --abbrev-ref $refname 2>/dev/null)

if [ "$branch" == "master" ]; then
	TARGET="{prod_folder}"
	echo -e "\${YELLOW}Pushing to production.\${NOCOLOR}"
elif [ "$branch" == "dev" ]; then
	TARGET="{dev_folder}"
	echo -e "\${YELLOW}Pushing to development.\${NOCOLOR}"
else
	echo -e "\${YELLOW}Not master/develop branch, ignoring.\${NOCOLOR}"
	exit 1
fi

mkdir -p $TEMP
cd $TEMP
git --work-tree=$TEMP --git-dir=$REPO checkout -f $branch

# execute all your build scripts here
# example for my website:
npm install
npm run build

# copy your project to target here
# in my example
rm -rf $TARGET/*
mv ./dist/* $TARGET/

# cleanup
rm -rf $TEMP`;
}
</script>