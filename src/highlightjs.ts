// based on https://github.com/metachris/vue-highlightjs
import Vue from "vue";
import hljs from "highlight.js";

export default {
	install(vue: typeof Vue, options: hljs.IOptions): void {
		hljs.configure(options);
		Vue.directive("highlightjs", {
			bind: function bind(el, binding) {
				// on first bind, highlight all targets
				const targets = el.querySelectorAll("code");

				for (let i = 0; i < targets.length; i += 1)
				{
					const target = targets[i];

					if (typeof binding.value === "string")
						// if a value is directly assigned to the directive, use this
						// instead of the element content.
						target.textContent = binding.value;

					hljs.highlightBlock(target);
				}
			},
			componentUpdated(el, binding): void {
				// after an update, re-fill the content and then highlight
				const targets = el.querySelectorAll("code");

				for (let i = 0; i < targets.length; i += 1)
				{
					const target = targets[i];
					if (typeof binding.value === "string")
					{
						target.textContent = binding.value;
						hljs.highlightBlock(target);
					}
				}
			}
		});
	}
};