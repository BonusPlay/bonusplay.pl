<template>
	<v-layout align-space-around justify-space-around column text-xs-justify>
		<!-- Intro -->
		<v-flex>
			<h1 class="display-3 text-xs-center">Counter-Bonus</h1>In this blog post, I'm going to describe how I made my CS:GO cheat (for
			<b>educational</b> reasons only).
			In the video (sorry for potato quality) you can see me using bhop and no recoil cheats.
			<IconButton text="source" url="https://github.com/BonusPlay/CounterBonus" icon="fab fa-github" type="href" rounded/>
			<YoutubeVideo url="https://www.youtube-nocookie.com/embed/ldCezTRB_0o" />
		</v-flex>
		<!-- Goal -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Goal</h2>Goal of this project was to put my reverse-engineering
			<i>"skills"</i> to use, by writing a CS:GO cheat. Anything will do. There are may different cheat types:
			<ul>
				<li>
					Aimbot - the most obvious one. I wrote one, but didn't publish it online (since I'm not proud of it).
					My implementation wasn't subtle at all. Instant headshots on every player that enters
					the area of my monitor.
				</li>
				<li>
					Wallhack - I almost instantly crossed this one out, since I had no idea how to approach problem of rendering
					on someone else's thread.
				</li>
				<li>RCS - name comes from Recoil Control System, usually a cheat that removes recoil from your gun.</li>
				<li>
					Bhop - Bunny Hop is a type of script that allows faster movement by abousing jumping mechanic in Source Engine.
					There is a common misconception, that bhoping can be achieved by using scripts and macros (for example on mouse).
					Proper reliable Bhop cheat requires memory manipulation.
				</li>
				<li>Radar hack - excluded for same reasons as wallhack.</li>
			</ul>
		</v-flex>

		<!-- External vs Internal -->
		<v-flex>
			<h2 class="display-2 text-xs-center">External or Internal</h2>There are different ways to write a cheat:
			<ul>
				<li>External - executable file, which reads from/writes to game's memory.</li>
				<li>
					Internal - shared library, which you need to
					<a href="https://en.wikipedia.org/wiki/DLL_injection">inject</a> into game's process using an injector program.
				</li>
				<li>
					Driver - advanced technique that I haven't explored yet, but it gives you
					<a href="https://en.wikipedia.org/wiki/Protection_ring">ring1</a> privileges.
					Most anti-cheats don't allow unsigned drivers, so you'll have to get a signing certificate, that you have to buy.
				</li>
			</ul>In this post, we'll only talk about #1 and #2. Generally speaking, external cheats are easier to write (since they ususally use simple OS api to interact with game's memory),
			but don't offer as much flexibility as internal, which can e.g. hook functions.
			<!-- External -->
			<h3 class="display-1">External</h3>The easier way (and also, the way I started).
			I used
			<a href="https://docs.microsoft.com/en-us/windows/desktop/api/tlhelp32/nf-tlhelp32-createtoolhelp32snapshot"><code>CreateToolhelp32Snapshot</code></a>
			to find correct process and modules
			(<a href="https://docs.microsoft.com/en-us/windows/desktop/ToolHelp/taking-a-snapshot-and-viewing-processes">example</a>)
			and a simple
			<a href="https://docs.microsoft.com/en-us/windows/desktop/api/processthreadsapi/nf-processthreadsapi-openprocess"><code>OpenProcess</code></a>
			with
			<code>PROCESS_ALL_ACCESS</code> to obtain process to handle. Some anticheats detect this as cheat, but most don't, since that would
			flag most antivirus' software as cheats as well. Let's not focuss on detection for now, since that's entierly different topic of it's own.
			<a href="https://docs.microsoft.com/en-us/windows/desktop/api/memoryapi/nf-memoryapi-readprocessmemory"><code>ReadProcessMemory</code></a>
			and
			<a href="https://docs.microsoft.com/en-us/windows/desktop/api/memoryapi/nf-memoryapi-writeprocessmemory"><code>WriteProcessMemory</code></a>
			functions to interact with game's memory. I later switched to pattern matching, to minimize amount of work required to update cheat between versions.
			<!-- Internal -->
			<h3 class="display-1">Internal</h3>
			<!-- VFT -->
			<h4 class="headline">VFT</h4>This is the hard way, but it also allows to have more fun. First, you need to reverse engineer some part of code, you want to edit.
			After that, you can hook the function, by editing
			<b>V</b>irtual
			<b>F</b>unction
			<b>T</b>able (or
			<b>V</b>irtual
			<b>M</b>ethod
			<b>T</b>able).
			This way, whenever game tries to call specific function it will actually call your function instead of the original one (<a	href="https://github.com/gfreivasc/VMTHook">example</a>). This is extremly powerfull.
			<!-- Injecting -->
			<h4 class="headline">Injecting</h4>As internal cheat is in library format, it needs to be injected into target executable. Some ways to do that include:
			<ul>
				<li>
					Standard - This is the injection technique used in nearly every injector out there. It uses
					<a href="https://docs.microsoft.com/en-us/windows/desktop/api/processthreadsapi/nf-processthreadsapi-createremotethread"><code>CreateRemoteThread</code></a>
					and
					<a href="https://docs.microsoft.com/en-us/windows/desktop/api/libloaderapi/nf-libloaderapi-loadlibrarya"><code>LoadLibrary</code></a>
					and is the most reliable injection technique.
				</li>
				<li>Process Hollowing - Idea is simple. Create target process and suspend it. Unmap from memory and allocate space in hollowed process. Write headers and sections into the remote process. Resume remote thread. Profit.</li>
				<li>
					Manual Map - One of best, stealthiest ways to inject. Pretty hard tho. You can find plenty of reference online though
					(<a href="http://www.rohitab.com/discuss/topic/40761-manual-dll-injection/">example</a>).
				</li>
			</ul>There are plenty more ways detailed
			<a href="https://github.com/rootm0s/Injectors">here</a>.
			The most popular (and probably the best) public injector is
			<a href="http://extremeinjector.net">Extreme Injector</a>.
		</v-flex>

		<!-- Memory searching -->
		<h2 class="display-2 text-xs-center">Memory searching and reverse engineering</h2>This section requires it's own article (that I'm going to write soon&trade;).
		<!-- Cheat itself -->
		<v-flex>
			<v-layout wrap fill-height align-center>
				<v-flex md1 hidden-sm-and-down>
					<v-img :src="require('@/assets/blog/counter-bonus00.webp')" contain max-height="20vh" />
				</v-flex>
				<v-flex xs12 md11>
					<h2 class="display-2 text-xs-center">The cheat itself</h2>Turns out, for bhop you only need to set one flag. Pretty easy.
					No recoil, huh. That's a big harder (but stil pretty easy, compared to what some people can do).
					First, I hooked a function that's called every frame (<code>CreateMove</code>), which handles all movement.
					First, I get local player pointer. Then I check punch angles for local player.
					The clever trick, is to multiply punch angles by -2 and subtract them from actual view angles.
					Black dot represents view angles, blue represent punch angles and pink represents what we subtract from our view angles.
					The reason why on my video bullets go in 1 spot, but camera moves just as if I hadn't controlled recoil, is because I modified
					angles that I send to server, not angles that are rendered on screen.
				</v-flex>
				<v-flex xs12 hidden-md-and-up>
					<v-img :src="require('@/assets/blog/counter-bonus00.webp')" contain max-height="20vh" />
				</v-flex>
			</v-layout>
		</v-flex>

		<!-- Afterword -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Afterword</h2>If you want to dive into cheating (for educational purposes), feel free to use:
			<ul>
				<li v-for="link in links" :key="link.description">
					<IconButton :data="link.button" />
					<span>{{ link.description }}</span>
				</li>
			</ul>
			Good luck!
		</v-flex>
	</v-layout>
</template>

<script>
import IconButton, { Props as IconButtonProps } from "@/components/IconButton";
import YoutubeVideo from "@/components/YoutubeVideo";

class Reference
{
	/**
	 * @param {IconButtonProps} button
	 * @param {string} description
	 */
	constructor(button, description) {
		this.button = button;
		this.description = description;
	}
}

export default {
	name: "CounterBonus",
	data: () => ({
		links: [
			new Reference(
				new IconButtonProps(
					"Blackbone",
					"https://github.com/DarthTon/Blackbone",
					"fab fa-github",
					"href"
				),
				"- windows memory hacking library. It should provide you with plenty of boilerplate and ideas."
			),
			new Reference(
				new IconButtonProps(
					"Ghidra",
					"https://ghidra-sre.org",
					"fas fa-link",
					"href"
				),
				"- free IDA Pro alternative (which is SUPER expensive). It even has a decompiler from many languages (C++, Go, etc.)!"
			),
			new Reference(
				new IconButtonProps(
					"UnknownCheats",
					"https://www.unknowncheats.me",
					"fas fa-link",
					"href"
				),
				"- don't be scared to look into the interwebs when you get stuck. There are plenty of threads at that can/will help you a lot. This is a decent forum to start your journey."
			)
		]
	}),
	components: {
		IconButton,
		YoutubeVideo
	}
};
</script>