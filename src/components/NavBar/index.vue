<!--
Visible only on mobile.
This is a small notch in top-left of the mobile screens,
because sliding nav drawer with no indicator is not 100% intuitive on website.
-->

<template>
	<v-app-bar :collapse="true" class="deep-purple accent-4 d-md-none">
		<v-app-bar-nav-icon @click="$emit('update:open', true)"/>
	</v-app-bar>
</template>

<script>
export default {
	name: "NavBar",
	props: {
		open: Boolean
	}
};
</script>