<template>
	<div class="has-text-justified content">
		<h1 class="title is-1 has-text-centered">Game Networking</h1>
		<h3 class="title is-4">Intro</h3>Since we want to send data between computers, we should first start off by checking out how we can do that.
		This might be a bit boring, but try to bear with me. It's like a foundation step to more interesting stuff.
		Two most popular ways to send data are:
		<ul>
			<li>TCP</li>
			<li>UDP</li>
			<li>QUIC - (did I say two? I changed my mind.)</li>
		</ul>Ofc, each one of them has it's own advantages and disadvantages. Question is - how do we comprare them?
		I've picked out a few points that are probably most important to you.
		<!-- Comparison -->
		<h4 class="title is-4">Comparison</h4>
		<ul>
			<li>Reliability - how does this protocol handle lost packets?</li>
			<li>Ordering - what happens if packets switch their order during transmission?</li>
			<li>
				Overhead - how
				<i>"heavy"</i> the protocol is?
			</li>
			<li>
				Integrity check - what if packet gets messed up
				<i>"mid air"</i>?
			</li>
			<li>Broadcasts - can you send message to multiple clients at once?</li>
		</ul>
		<div class="control">
			View details:
			<label class="radio">
				<input type="radio" v-model="expand" name="expand" v-bind:value="true">
				Yes
			</label>
			<label class="radio">
				<input type="radio" v-model="expand" name="expand" v-bind:value="false">
				No
			</label>
		</div>
		<table class="table is-dark is-fullwidth is-striped">
			<thead>
				<tr>
					<th>Protocol</th>
					<th>Reliability</th>
					<th>Ordering</th>
					<th>Overhead</th>
					<th>Integrity check</th>
					<th>Broadcasts</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="protocol in table" :key="protocol.title">
					<th>{{ protocol[0] }}</th>
					<td v-for="entry in protocol.slice(1)" :key="entry.description">
						{{ entry.title }}
						<span v-if="expand">{{ entry.description }}</span>
					</td>
				</tr>
			</tbody>
		</table>TCP system is designed to look like a "data pipe", or stream, it deliberately contains little understanding of the data it transmits.
		It has checksum to verify that data arrives uncorrupted, as well as it enforces that packets arrive in correct order.
		TCP connection takes quite a lot of time to initialize and whenever it finds an error (since it needs to go back and resend the data).
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Multiplayer2 extends Vue {
	expand = false;

	table = [
		[
			"TCP",
			{
				title: "Yes",
				description:
					"Strictly only at transport layer, TCP manages message acknowledgment, retransmission and timeout. Multiple attempts to deliver the message are made. If it gets lost along the way, the server will re-request the lost part. In TCP, there's either no missing data, or, in case of multiple timeouts, the connection is dropped."
			},
			{
				title: "Yes",
				description:
					"If two messages are sent over a connection in sequence, the first message will reach the receiving application first. When data segments arrive in the wrong order, TCP buffers delay the out-of-order data until all data can be properly re-ordered and delivered to the application."
			},
			{
				title: "Heavyweight",
				description:
					"TCP requires three packets to set up a socket connection, before any user data can be sent. TCP handles reliability and congestion control."
			},
			{
				title: "Yes",
				description: "TCP does check message integrity."
			},
			{
				title: "No",
				description:
					"TCP tunnels are opened only between 2 clients, so there can only be 1 receiver."
			}
		],
		[
			"UDP",
			{
				title: "No",
				description:
					"When a UDP message is sent, it cannot be known if it will reach its destination; it could get lost along the way. There is no concept of acknowledgment, retransmission, or timeout."
			},
			{
				title: "No",
				description:
					"If two messages are sent to the same recipient, the order in which they arrive cannot be predicted."
			},
			{
				title: "Lightweight",
				description:
					"There is no ordering of messages, no tracking connections, etc. It is a small transport layer designed on top of IP, however, it does not avoid congestions."
			},
			{
				title: "Kinda",
				description:
					"Packets are sent individually and are checked for integrity only if they arrive."
			},
			{
				title: "Yes",
				description:
					"being connectionless, UDP can broadcast - sent packets can be addressed to be receivable by all devices on the subnet."
			}
		]
	];
}
</script>