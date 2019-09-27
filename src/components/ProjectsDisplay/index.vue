<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="4" v-for="project in projects" :key="project.title">
				<Project :data="project"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Project, { Props as ProjectProps } from "./Project";
import { Props as IconButtonProps } from "../IconButton";

export default {
	name: "ProjectsDisplay",
	data: () => ({
		projects: [
			new ProjectProps(
				"HSMod",
				`Hearthstone clone made in Unity3D. Fan made project to implement new game mechanics, cards and heroes to the game we all loved. Due to legal reasons we had to make it closed source and take down the website. Maybe in the future it will come back?`,
				[
					new IconButtonProps("YouTube", "https://www.youtube.com/watch?v=0e4Du3KekDo", "youtube", "href"),
					new IconButtonProps("Article", "https://www.polygon.com/2017/4/13/15292266/hearthstone-new-class-classes-death-knight-demon-hunter-monk-arthas-hsmod-fan-gam", "link", "href"),
					new IconButtonProps("Blog", "/blog/networking/hsmod", "link", "to")
				]
			),
			new ProjectProps(
				"BonusPlay.pl",
				"This overcomplicated website, which is a SPA+PWA for no reason at all and it's, over the top, high performance backend architecture.",
				[
					new IconButtonProps("Frontend", "https://github.com/BonusPlay/BonusPlay.pl-frontend", "github", "href"),
					new IconButtonProps("Backend", "https://github.com/BonusPlay/BonusPlay.pl-backend", "github", "href"),
					new IconButtonProps("Blog", "/blog/web/website", "link", "to")
				]
			),
			new ProjectProps(
				"CounterBonus",
				"A CS:GO cheat written along my adventures when I learned (or at the very least attempted) how to reverse engineer x86 assembly.",
				[
					new IconButtonProps("Source", "https://github.com/BonusPlay/CounterBonus", "github", "href"),
					new IconButtonProps("Article", "/blog/reverse-engineering/counter-bonus", "link", "to")
				]
			)
		]
	}),
	components: {
		Project
	}
};
</script>