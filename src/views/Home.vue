<template>
	<v-container>
		<v-row tag="section">
			<v-col cols="12">
				<h2 class="display-2 text-center">About me</h2>
			</v-col>
			<v-col cols="12" md="8" offset-md="1" class="text-justify">
				<p>
					My name is Adam Kliś, I'm currently {{ age }}.
					I've been gaming since I was 6 and coding for over 7 years now.
					What's different about me, is that I learn by practice, trial-and-error.
					That allows me to understand the code 'my way'.
					I've started with Java, followed by C++, C, Android, C# and later webdev in order.
				</p>
				<p>
					People tell me, that I know way too many languages and that I'm probably a
					<i>'jack of all trades master of none'</i>.
					However, think of my programming skills as a toolbox full of fun things.
					As you learn more and more languages you begin to see not only similarities between them but differences as well.
					Some of them want to kill you <i><b>*cough*</b>C++<b>*cough*</b></i>, some of them offer great packaging systems.
					Another has an almost infinite amount of libraries.
					You begin to see differences between them and choose the right tool for the right job.
					Why learn how to use only one tool?
					Do we really have to use the favorite screwdriver, when a nailgun would solve the problem 10x faster?
				</p>
				<p>In my free time, I like to play guitar, collect old coins and play computer games with my friends.</p>
			</v-col>
			<v-col cols="12" md="2" :class="{'pl-3': $vuetify.breakpoint.mdAndUp}" contain>
				<v-img contain :src="require('@/assets/mecrop.webp')" max-height="30vh" />
			</v-col>
		</v-row>
		<v-row tag="section">
			<v-col>
				<h2 class="display-2 text-center">My projects</h2>
				<ProjectsDisplay />
			</v-col>
		</v-row>
		<v-row tag="section">
			<v-col>
				<h2 class="display-2 text-center">Games I play</h2>
				<ImageDisplay :data="games" />
			</v-col>
		</v-row>
		<v-row tag="section">
			<v-col>
				<h2 class="display-2 text-center">Technologies I use</h2>
				<ImageDisplay :data="tech" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ProjectsDisplay from "@/components/ProjectsDisplay";
import ImageDisplay, { Props as ImageDisplayProps } from "@/components/ImageDisplay";
import IconsGames from "@/assets/icons-games";
import IconsTech from "@/assets/icons-tech";

export default {
	name: "Home",
	data: () => ({
		// dirty one liner from SO https://stackoverflow.com/a/24181701
		age: Math.abs(new Date(Date.now() - new Date(1999, 1, 7)).getUTCFullYear() - 1970),
		games: new ImageDisplayProps(IconsGames),
		tech: new ImageDisplayProps(IconsTech)
	}),
	components: {
		ProjectsDisplay,
		ImageDisplay
	}
};
</script>