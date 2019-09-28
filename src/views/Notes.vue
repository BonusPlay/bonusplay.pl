<template>
	<v-container>
		<v-row>
			<v-col cols="6">
				<v-list>
					<v-list-group
						v-for="category in data"
						:key="category.value"
						v-model="category.active"
						no-action
					>
						<template v-slot:activator>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title>{{ category.title }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>

						<v-list-item v-for="item in category.items" :key="item.value">
							<v-list-item-content>
								<v-list-item-title>{{ item.title }}</v-list-item-title>
								<v-list-item-sub-title>{{ item.value }}</v-list-item-sub-title>
							</v-list-item-content>

							<v-list-item-action-text v-if="item.type === 'copy'" v-clipboard="item.value">
								<v-btn rounded outline>copy</v-btn>
							</v-list-item-action-text>
							
							<v-list-item-action-text v-else-if="item.type === 'link'">
								<v-btn rounded outline :href="item.value">link</v-btn>
							</v-list-item-action-text>
						</v-list-item>
					</v-list-group>
				</v-list>
			</v-col>
			<v-col>
				Something will be here eventually™
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
class Item
{
	/**
	 * @param {String} title
	 * @param {String} value
	 * @param {("copy"|"link")} type
	 */
	constructor(title, value, type)
	{
		this.title = title;
		this.value = value;
		this.type = type;
	}
}

export default {
	name: "Notes",
	data: () => ({
		data: [
			{
				title: "Useful commands",
				items: [
					new Item("Bind port via SSH", "ssh -nNT -L port:localhost:port user@domain", "copy")
				]
			},
			{
				title: "Useful links",
				items: [
					new Item("HTTP request bin", "https://webhook.site", "link"),
					new Item("local JSON REST server", "https://github.com/typicode/json-server", "link"),
					new Item("tunnel localhost to a temp domain", "https://ngrok.com", "link"),
					new Item("Substitute cipher solver", "https://quipqiup.com", "link"),
					new Item("Binary file parser/editor", "https://ide.kaitai.io", "link")
				]
			}
		]
	})
};
</script>