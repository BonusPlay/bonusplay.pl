<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 md6 v-for="(side, index) in data" :key="`side-${index}`">
				<v-list>
					<v-list-group
						v-for="category in side"
						:key="category.value"
						v-model="category.active"
						no-action
					>
						<template v-slot:activator>
							<v-list-tile>
								<v-list-tile-content>
									<v-list-tile-title>{{ category.title }}</v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
						</template>

						<v-list-tile v-for="item in category.items" :key="item.value">
							<v-list-tile-content>
								<v-list-tile-title>
									{{ item.title }}
								</v-list-tile-title>
								<v-list-tile-sub-title>
									{{ item.value }}
								</v-list-tile-sub-title>
							</v-list-tile-content>
							<v-list-tile-action-text v-if="item.type === 'copy'" v-clipboard='item.value'>
								<v-btn round outline>copy</v-btn>
							</v-list-tile-action-text>
							<v-list-tile-action-text v-else-if="item.type === 'link'">
								<v-btn round outline :href="item.value">link</v-btn>
							</v-list-tile-action-text>
						</v-list-tile>
					</v-list-group>
				</v-list>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Notes extends Vue {

	data = [[
		{
			title: "Useful commands",
			items: [{
				type: "copy",
				title: "Bind port via SSH",
				value: "ssh -nNT -L port:localhost:port user@domain"
			}]
		},
		{
			title: "Useful links",
			items: [{
				type: "link",
				title: "HTTP request bin",
				value: "https://webhook.site"
			}, {
				type: "link",
				title: "local JSON REST server",
				value: "https://github.com/typicode/json-server"
			}, {
				type: "link",
				title: "tunnel localhost to a temp domain",
				value: "https://ngrok.com"
			}]
		}
	], [
		{
			title: "Nothing here"
		}
	]];
}
</script>