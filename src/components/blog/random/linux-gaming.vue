<template>
	<v-layout align-space-around justify-space-around column text-xs-justify>
		<!-- Goal -->
		<v-flex>
			<h1 class="display-3 text-xs-center">Gaming on Linux</h1>
			In this blog post, I'm going to describe how I play games on my linux machine.
			<v-img :src="require('@/assets/blog/linux-gaming00.webp')" contain max-height="30vh"/>
		</v-flex>
		
		<v-divider class="my-3"/>

		<!-- is it viable -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Is it viable</h2>
			Most important question is: is this even viable?
			In my opinion, yes. You can play pretty much all games that do not have anti-cheat.
			Another question is - how much time and knowledge do you need, to get it working?
			Turns out, the answer is again, yes.
		</v-flex>

		<v-divider class="my-3"/>

		<!-- how to -->
		<v-flex>
			<h2 class="display-2 text-xs-center">How to</h2>
			In this tutorial I will be usinga arch linux. I will not cover how to install specific packages on distro.

			<!-- steam play -->
			<v-layout wrap fill-height align-center>
				<v-flex md2 hidden-sm-and-down pr-2>
					<v-img :src="require('@/assets/blog/linux-gaming01.webp')" contain max-height="20vh"/>
				</v-flex>
				<v-flex xs12 md10>
					<h4 class="headline">Steam Play</h4>
					Easiest way, to play games on linux is to run them via Steam Play - which is nicely packed and already configurated
					setup, that I will show you in next steps. It allows you to run pretty much any steam game (except those with anticheat)
					on linux. 
					<!-- insert steam play dialog -->
				</v-flex>
				<v-flex xs12 hidden-md-and-up>
					<v-img :src="require('@/assets/blog/linux-gaming01.webp')" contain max-height="20vh"/>
				</v-flex>
			</v-layout>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- Lutris -->
		<v-flex>
			<v-layout wrap fill-height align-center>
				<v-flex md2 hidden-sm-and-down pr-2>
					<v-img :src="require('@/assets/blog/linux-gaming02.svg')" contain max-height="20vh"/>
				</v-flex>
				<v-flex xs12 md10>
					<h4 class="headline">Lutris</h4>
					Lutris is a community driven platform that does similar thing as Steam Play.
					Difference is, that lutris contains community driven install scripts for wide range of games,
					which automate what I'm going to describe below. Just install lutris client, go to
					<a href="https://lutris.net/">Lutris website</a>, look up a game you want to play,
					choose your preset and click install. After that you can play your installed games from lutris menu.
					<!-- insert steam play dialog -->
				</v-flex>
				<v-flex xs12 hidden-md-and-up>
					<v-img :src="require('@/assets/blog/linux-gaming02.svg')" contain max-height="20vh"/>
				</v-flex>
			</v-layout>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- DIY -->
		<v-flex>
			<h2 class="display-2 text-xs-center">DIY</h2>
			How hard can it be to configure it by yourself? Do we need to recompile games from windows to linux?
			No! We can games made for windows directly on your linux machine! Let's hop in!

			<!-- wine -->
			<h3 class="headline">wine</h3>
			wine (<b>W</b>ine <b>I</b>s	<b>N</b>ot <b>E</b>mulator) is the bread and butter.
			It takes winapi (windows OS api) and translates it into Linux API.
			This allows you to run .exe files on linux!
			For games we need performance, so install <code>wine-staging</code>, as it has
			a lot of patches that massively improve performance (and is pretty stable at the same time).
			To prevent games from interacting with one another we're going to use "bottles".
			You can think of them like a windows install (just much much smaller).
			I setup one bottle for one game (to avoid any library or config conflicts).<br/>
			Process of creating a bottle looks like this (as per usual replace all <code>{}</code> tags with actual values):
			<b>NOTE:</b> before doing anything with particular bottle, be sure to set correct environment variables:
			<ul>
				<li><code>export WINEPREFIX={dir}</code> - will set env var</li>
				<li>set x32 or x64 bit prefix - if you're going to use only 32-bit aplications,
					you might want to set prefix to be 32-bit, since some bugs <b>might</b> occur,
					when you open it in 64-bit prefix. If you're going to run 64-bit apps, you <b>need</b>
					a 64-bit Linux and 64-bit bottle.
					<ul>
						<li>if x32 - <code>export WINEARCH=win32</code></li>
						<li>if x64 - <code>export WINEARCH=win64</code></li>
					</ul>
				</li>
			</ul>
			Now, we are ready to create the bottle itself:
			<ul>
				
				<li><code>wineboot -u</code> - to create actual bottle</li>
			</ul>
			Done! Next!

			<!-- winetricks -->
			<h3 class="headline">dependencies</h3>
			Some programs might need some dependencies (like .NET framework). You can install them manually
			(remember about env vars!), or you can use helper tool like
			<a href="https://github.com/Winetricks/winetricks"><code>winetricks</code></a>.
			E.g. to install .NET framework 4.6.2, you can run <code>winetricks dotnet462</code>.
			<br/>NEEEEEXT.

			<!-- graphics -->
			<h3 class="headline">DirectX</h3>
			Since we want to run games, we want graphics. Since we're running windows games,
			which usually use DirectX. And of course, DirectX doesn't work on Linux.
			But since Linux is community driven platform, someone came up with briliant idea.
			What if we wrote our own "DirectX" library, that exposes same API as DirectX,
			but uses OpenGL/Vulkan on the inside? Of course, that's ridiculously hard to do.
			So, some <b>very</b> smart heroes, created:
			<ul>
				<li>
					<a href="https://github.com/Joshua-Ashton/d9vk"><code>d9vk</code></a>
					 - a DirectX 9 to Vulkan implementation
				</li>
				<li>
					<a href="https://github.com/doitsujin/dxvk"><code>dxvk</code></a>
					 - a DirectX 10 and 11 to Vulkan implementation
				</li>
			</ul>
			To use it you need to know what your game uses, just google it.
			When you know which one you'll be using, just do a simple
			<ul>
				<li>dxvk - <code>setup_dxvk install --without-dxgi --symlink</code></li>
				<li>d9vk - <code>setup_d9vk install --without-dxgi --symlink</code></li>
			</ul>
			<code>--symlink</code> parameter makes it auto update all bottles whenever you
			update your dxvk/d9vk version on your system (probably from some package manager).
			You can read about <code>--without-dxgi</code> parameter
			<a href="https://github.com/doitsujin/dxvk/wiki/DXGI">here</a>.
			<br/>Yay, we have graphics!
		</v-flex>

		<v-divider class="my-2"/>

		<v-flex>
			<h2 class="display-2 text-xs-center">Playing actual games</h2>
			So, we created a proper bottle, but how do we run our games?
			Simply run <code>wine {exe_file}</code> (remember about env vars).
			It's that simple!
		</v-flex>

		<v-divider class="my-2"/>

		<!-- bonus -->
		<v-flex>
			<v-expansion-panel>
				<v-expansion-panel-content>
					<template v-slot:header>
						<span>
							<h4 class="headline">Bonus</h4>
							How about some cool debug additional config?
						</span>
					</template>

					<v-card>
						<v-card-text>
							You can set additional env vars. Here are some that you might find usefull:<br/>
							<code>DXVK_HUD</code> - this makes dxvk/d9vk display more info on your screen.
							Here are options (which you should add as string, comma separated).
							<ul>
								<li><code>devinfo</code> - name of the GPU and the driver version</li>
								<li><code>fps</code> - current frame rate</li>
								<li><code>frametimes</code> - frame time graph</li>
								<li><code>submissions</code> - number of command buffers submitted per frame</li>
								<li><code>drawcalls</code> - number of draw calls and render passes per frame</li>
								<li><code>pipelines</code> - total number of graphics and compute pipelines</li>
								<li><code>memory</code> - amount of device memory allocated and used</li>
								<li><code>version</code> - dxvk/d9vk version</li>
								<li><code>api</code> - D3D feature level used by the application. Does not work correctly for D3D10 at the moment.</li>
							</ul>
							<code>WINEDEBUG=-all</code> and <code>DXVK_LOG_LEVEL=none</code> will reduce amount of messages,
							that games spam into the console. This actually might increase your FPS!
							<!-- TODO: add more config here -->
						</v-card-text>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-flex>

		<v-divider class="my-2"/>

		<!-- Done! -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Done!</h2>
			Not much more to say. Go and have fun!
		</v-flex>
	</v-layout>
</template>