<template>
	<div class="has-text-justified content">
		<h1 class="title is-1 has-text-centered">Game Networking</h1>
		<h4 class="title is-4">Intro</h4>
		I will (try to) cover:
		<ul>
			<li>TCP vs UDP - the battle of packets</li>
			<li>p2p vs client-server</li>
			<li>gamestate vs input</li>
			<li>predicting the future</li>
			<li>authentication</li>
		</ul>
		I will not cover:
		<ul>
			<li>Code implementation - This is a general purpose tutorial for everyone interested (not just programmers)</li>
			<li>
				Very complex methods used by companies (in AAA titles) - I don't have enough experience and knowledge to talk about.
				There are plenty of amazing talks (looking at you, GDC) made by much more competent people than me.
			</li>
			<li>DDOS - a topic that deserves it's own separate series, but sadly I don't know enough to make it 😞.</li>
			<li>Anticheat - we won't dive deep into this topic, as it's too complicated for now + it's more of reverse-engineering than networking.</li>
		</ul>
		<router-link to="2" class="button is-dark">
			<b-icon icon="link"/>
			<span>next part</span>
		</router-link>
	</div>
</template>