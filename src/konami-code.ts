// based on https://github.com/azzra/vue-konami-code
import Vue from "vue";

export default {
	install(vue: typeof Vue, callback: () => void): void {
		const kode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
		const length = kode.length;
		var pos = 0;
		document.addEventListener(
			"keydown",
			function(event) {
				if (event.keyCode === kode[pos++])
				{
					console.log(event.keyCode);
					if (length === pos)
					{
						callback();
						pos = 0; // ability to start over
						return false;
					}
				}
				else
					pos = 0;
			},
			false
		);
	}
};
