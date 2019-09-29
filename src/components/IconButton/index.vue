<template>
	<v-btn tile :[data.type]="data.url" :rounded="rounded" v-if="data">
		<v-icon left>{{ data.icon }}</v-icon>
		{{ data.text }}
	</v-btn>
	<v-btn tile :[type]="url" :rounded="rounded" v-else>
		<v-icon left>{{ icon }}</v-icon>
		{{ text }}
	</v-btn>
</template>

<script>
export class Props
{
	/**
	 * @param {String} text
	 * @param {String} url
	 * @param {String} icon
	 * @param {('href'|'to')} [type]
	 */
	constructor(text, url, icon, type)
	{
		this.text = text;
		this.url = url;
		this.icon = icon;
		this.type = type;
	}
}

export default {
	name: "IconButton",
	props: {
		// useful for single bind 
		data: Props,

		// passed to vuetify component
		rounded: Boolean,

		// useful for single usage
		text: String,
		url: String,
		icon: String,
		type: String
	}
}
</script>