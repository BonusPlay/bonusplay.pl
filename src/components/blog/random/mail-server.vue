<template>
	<v-layout column text-xs-justify>
		<!-- Goal -->
		<v-flex>
			<h1 class="display-3 text-xs-center">Mail server</h1>In this blog post, I'm going to describe how I setup mail server on my server.
			I want to be able to send and receive emails from domains I own (e.g. test@bonusplay.pl). Which means multiple users on multiple domains.
			I advise you to read <a href="https://wiki.archlinux.org/index.php/Mail_server">this page on arch wiki</a>.
			It's short, but it will help you understand everything.
			<v-img :src="require('@/assets/blog/mail-server00.webp')" contain max-height="30vh"/>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- Postfix + Dovecot -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Attempt #1, postfix + dovecot</h2>So, at start I went with the most simple postfix + dovecot setup.
			Tbh, I just followed
			<a
				href="https://www.linode.com/docs/email/postfix/email-with-postfix-dovecot-and-mariadb-on-centos-7/"
			>this</a>
			amazing guide. I got it working pretty quickly.
			Remember to send some emails to your friends and tell them to mark it "not spam", since your domain will most likely be marked as spam.
			<br>
			<br>
			<i>fast forward a month...</i>
			<br>
			<br>
			<div class="has-text-centered">
				<v-img :src="require('@/assets/blog/mail-server01.webp')" contain max-height="10vh"/>
			</div>Sending emails works perfectly, but gmail fetches POP3 emails once per hour?! WTF?!
			Ok, so we need to change our strategy...
		</v-flex>

		<!-- idea -->
		<v-flex>
			<h3 class="display-1 text-xs-center">Idea</h3>The one who gave me the idea is
			<i>Mateusz Maciejewski</i>, so kudos to him. Sending emails works just fine, so we don't have to touch this part.
			We only need to change how we receive emails. What if we don't store emails, but auto-forward them to designated email address?
			It removes waiting time, since email will be instantly forwarded, instead of being received, stored and then checked by gmail servers.
			<br>If so, why do we even need dovecot? Turns out, we need it for authentication. Then why did I switch from dovecot to cyrus?
			Amount of config dovecot needs is incredible, also
			<a
				href="https://serverfault.com/a/137007"
			>this</a> SO answer helped me move.
		</v-flex>

		<v-divider class="my-3"/>

		<!-- postfix + cyrus -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Attempt #2, postfix + cyrus</h2>This part took me so much time. Like WAAAAAAAAAAAAY too much time.
			That's what I get for using arch linux on server. Ok, here it goes.
			<!-- auto forwarding -->
			<h3 class="headline">auto forwarding</h3>This was done using guide above. Just alias one email to another. I'm also using plain simple
			<code>aliases</code>
			file in tandem (but that's not needed).
			<!-- auth -->
			<h3 class="headline">authentication methods</h3>There are a few methods to choose from:
			<ul>
				<li>shadow - nope, since I want to have multiple accounts</li>
				<li>PAM - maybe? (I might switch to this one)</li>
				<li>IMAP server - nope</li>
				<li>sasldb - this is what I chose</li>
				<li>SQL - maybe? (I might switch to this one)</li>
				<li>LDAP - nope</li>
			</ul>First of all, be sure that you have
			<code>saslauthd</code> configured (in my case in
			<code>/etc/conf.d/saslauthd</code>) to actually use
			<code>sasldb</code>.
			You want the runtime argument to be
			<code>-a sasldb</code>.
			<br>Next is main config file (in my case
			<code>/etc/sasl2/smtpd.conf</code>).
			<pre class="line-numbers" data-start="0"><code class="lang-none">{{ code0 }}</code></pre>Now, we need to add our accounts.
			<code>saslpasswd2 -c -u {domain} {username}</code> will do just that.
			<br>Test your accounts with
			<code>testsaslauthd -r {domain} -u {username} -p {password} -s smtp</code>
			.
			<!-- auth postfix -->
			<h3 class="headline">postfix config</h3>Now we just need to connect postfix to cyrus. Add this to
			<code>/etc/postfix/main.cf</code>.
			<pre class="line-numbers" data-start="0"><code class="lang-none">{{ code1 }}</code></pre>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- permissions -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Permissions</h2>I run
			<code>saslauthd</code> service as
			<code>cyrus</code>cyrus user.
			Because postfix needs to communicate with cyrus over socket, I added both,
			<code>postfix</code> and
			<code>cyrus</code> accounts to
			<code>sasl</code> group.
			Be sure that group
			<code>sasl</code> has rw access to
			<code>/run/saslauthd</code> folder and
			<code>/etc/sasldb2</code>.
			Don't forget to set user in the
			<code>saslauthd</code> service file as well!
		</v-flex>

		<v-divider class="my-3"/>

		<!-- finished config -->
		<v-flex>
			<h2 class="display-2 text-xs-center">Done!</h2>
			Really? You might ask, wtf took me so long. I'm not the best sysadmin. Here is entire list of stuff I had problems with:
			<ul>
				<li>
					<code>saslauthd</code> is configured to use PAM by default (
					<code>-a pam</code>) on arch linux
				</li>
				<li>
					there is
					<code>-r</code> param in
					<code>saslauthd</code> which confused me
				</li>
				<li>
					<code>testsaslauthd</code> needed
					<code>-s smtp</code> and
					<code>-r {domain}</code> params
				</li>
				<li>many many more, that I erased from my memory...</li>
			</ul>My hints for debugging are:
			<ul>
				<li>
					check
					<code>/var/log/auth.log</code> and
					<code>/var/log/mail.log</code>
				</li>
				<li>
					use
					<a href="https://wiki.zimbra.com/wiki/Simple_Troubleshooting_For_SMTP_Via_Telnet_And_Openssl">this</a> to check via telnet (often gives some output)
				</li>
			</ul>
			<v-expansion-panel>
				<v-expansion-panel-content>
					<template v-slot:header>
						<span>
							<h4 class="">Bonus</h4>
							Full configuration
						</span>
					</template>

					<v-card>
						<v-card-text>
							<code>postconf -n</code> (all postfix variables that I've changed to not default)
							<pre class="line-numbers" data-start="0"><code class="lang-none">{{ code2 }}</code></pre>or, if you prefer this way:
							<code>/etc/postfix/main.cf</code>
							<pre class="line-numbers" data-start="0"><code class="lang-none">{{ code3 }}</code></pre>and
							<code>/etc/postfix/master.cf</code>
							<pre class="line-numbers" data-start="0"><code class="lang-none">{{ code4 }}</code></pre>
						</v-card-text>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- bonus (gmail) -->
		<v-flex>
			<v-expansion-panel>
				<v-expansion-panel-content>
					<template v-slot:header>
						<span>
							<h4 class="">Bonus #2</h4>
							Did you know gmail has dark theme?
						</span>
					</template>

					<v-card>
						<v-card-text>
							<v-img :src="require('@/assets/blog/mail-server02.webp')" contain />
							Here's how to set it:
							<v-img :src="require('@/assets/blog/mail-server03.webp')" contain/>
							There are also configurable filters. Here is an example filter I use, to label all emails that come from my website.
							<v-img :src="require('@/assets/blog/mail-server04.webp')" contain />
						</v-card-text>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-flex>

		<v-divider class="my-3"/>

		<!-- done -->
		<v-flex>
			<h1 class="display-2 text-xs-center">Done!</h1>
			Nothing more. Enjoy your instant, free emailing!
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Prism from "prismjs";

@Component({
	mounted() {
		Prism.highlightAll();
	}
})
export default class extends Vue {
	code0 = `pwcheck_method: auxprop
auxprop_plugin: sasldb
mech_list: PLAIN LOGIN CRAM-MD5 DIGEST-MD5 NTLM`;

	code1 = `smtpd_sasl_path = smtpd
smtpd_sasl_type = cyrus
smtpd_sasl_auth_enable = yes`;

	code2 = `alias_database = $alias_maps
alias_maps = hash:/etc/postfix/aliases
biff = no
compatibility_level = 2
inet_interfaces = all
inet_protocols = all
invalid_hostname_reject_code = 550
mailbox_size_limit = 0
meta_directory = /etc/postfix
mydestination = localhost
mydomain = bonusplay.pl
myhostname = bonusplay.pl
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
myorigin = $mydomain
non_fqdn_reject_code = 550
recipient_delimiter = +
relayhost =
shlib_directory = /usr/lib/postfix
smtp_tls_security_level = may
smtpd_banner = $myhostname ESMTP $mail_name
smtpd_helo_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_invalid_helo_hostname, reject_non_fqdn_helo_hostname
smtpd_recipient_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_non_fqdn_recipient, reject_unknown_recipient_domain, reject_unlisted_recipient, reject_unauth_destination
smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, defer_unauth_destination
smtpd_sasl_auth_enable = yes
smtpd_sasl_path = smtpd
smtpd_sasl_security_options = noanonymous, noplaintext
smtpd_sasl_tls_security_options = noanonymous
smtpd_sasl_type = cyrus
smtpd_sender_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_non_fqdn_sender, reject_unknown_sender_domain
smtpd_tls_auth_only = yes
smtpd_tls_cert_file = /etc/letsencrypt/live/bonusplay.pl/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/bonusplay.pl/privkey.pem
smtpd_tls_security_level = may
smtpd_use_tls = yes
unknown_address_reject_code = 550
unknown_client_reject_code = 550
unknown_hostname_reject_code = 550
unverified_recipient_reject_code = 550
unverified_sender_reject_code = 550
virtual_alias_domains = $mydomain
virtual_alias_maps = mysql:/etc/postfix/mysql-virtual-alias-maps.cf, mysql:/etc/postfix/mysql-virtual-email2email.cf
virtual_mailbox_base = /var/mail/vhosts
virtual_mailbox_domains = mysql:/etc/postfix/mysql-virtual-mailbox-domains.cf
virtual_mailbox_maps = mysql:/etc/postfix/mysql-virtual-mailbox-maps.cf`;

	code3 = `# SOFT BOUNCE
#
# The soft_bounce parameter provides a limited safety net for
# testing.  When soft_bounce is enabled, mail will remain queued that
# would otherwise bounce. This parameter disables locally-generated
# bounces, and prevents the SMTP server from rejecting mail permanently
# (by changing 5xx replies into 4xx replies). However, soft_bounce
# is no cure for address rewriting mistakes or mail routing mistakes.
#
#soft_bounce = no

smtpd_banner = $myhostname ESMTP $mail_name
biff = no

meta_directory = /etc/postfix
shlib_directory = /usr/lib/postfix

# TLS parameters
smtpd_tls_cert_file=/etc/letsencrypt/live/bonusplay.pl/fullchain.pem
smtpd_tls_key_file=/etc/letsencrypt/live/bonusplay.pl/privkey.pem
smtpd_use_tls=yes
smtpd_tls_auth_only = yes
smtp_tls_security_level = may
smtpd_sasl_auth_enable = yes
smtpd_tls_security_level = may
smtpd_sasl_path = smtpd
smtpd_sasl_type = cyrus
smtpd_sasl_security_options = noanonymous, noplaintext
smtpd_sasl_tls_security_options = noanonymous

# Restrictions
smtpd_helo_restrictions =
        permit_mynetworks,
        permit_sasl_authenticated,
        reject_invalid_helo_hostname,
        reject_non_fqdn_helo_hostname
smtpd_recipient_restrictions =
        permit_mynetworks,
        permit_sasl_authenticated,
        reject_non_fqdn_recipient,
        reject_unknown_recipient_domain,
        reject_unlisted_recipient,
        reject_unauth_destination
smtpd_sender_restrictions =
        permit_mynetworks,
        permit_sasl_authenticated,
        reject_non_fqdn_sender,
        reject_unknown_sender_domain
smtpd_relay_restrictions =
        permit_mynetworks,
        permit_sasl_authenticated,
        defer_unauth_destination

myhostname = bonusplay.pl
mydomain = bonusplay.pl
myorigin = $mydomain
mydestination = localhost
relayhost =
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all
inet_protocols = all

# Aliases
alias_maps = hash:/etc/postfix/aliases
alias_database = $alias_maps

# Virtual domains, users, and aliases
virtual_mailbox_base = /var/mail/vhosts
virtual_mailbox_domains = mysql:/etc/postfix/mysql-virtual-mailbox-domains.cf
virtual_mailbox_maps = mysql:/etc/postfix/mysql-virtual-mailbox-maps.cf
virtual_alias_domains = $mydomain
virtual_alias_maps = mysql:/etc/postfix/mysql-virtual-alias-maps.cf,
        mysql:/etc/postfix/mysql-virtual-email2email.cf

# Reply Rejection Codes
invalid_hostname_reject_code = 550
non_fqdn_reject_code = 550
unknown_address_reject_code = 550
unknown_client_reject_code = 550
unknown_hostname_reject_code = 550
unverified_recipient_reject_code = 550
unverified_sender_reject_code = 550
compatibility_level = 2`;

	code4 = `#
# Postfix master process configuration file.  For details on the format
# of the file, see the master(5) manual page (command: "man 5 master" or
# on-line: http://www.postfix.org/master.5.html).
#
# Do not forget to execute "postfix reload" after editing this file.
#
# ==========================================================================
# service type  private unpriv  chroot  wakeup  maxproc command + args
#               (yes)   (yes)   (no)    (never) (100)
# ==========================================================================
smtp       inet  n       -       n       -       -       smtpd
#smtp      inet  n       -       n       -       1       postscreen
#smtpd     pass  -       -       n       -       -       smtpd
#dnsblog   unix  -       -       n       -       0       dnsblog
#tlsproxy  unix  -       -       n       -       0       tlsproxy
submission inet  n       -       n       -       -       smtpd -v -v
   -o syslog_name=postfix/submission
   -o smtpd_tls_security_level=encrypt
   -o smtpd_sasl_auth_enable=yes
   -o smtpd_tls_auth_only=yes
   -o smtpd_reject_unlisted_recipient=no
   -o smtpd_client_restrictions=permit_sasl_authenticated,reject
#  -o smtpd_client_restrictions=$mua_client_restrictions
#  -o smtpd_helo_restrictions=$mua_helo_restrictions
#  -o smtpd_sender_restrictions=$mua_sender_restrictions
#  -o smtpd_recipient_restrictions=
#  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
   -o milter_macro_daemon_name=ORIGINATING
smtps     inet  n       -       n       -       -       smtpd
   -o syslog_name=postfix/smtps
   -o smtpd_tls_wrappermode=yes
   -o smtpd_sasl_auth_enable=yes
   -o smtpd_sasl_path=private/auth
#  -o smtpd_reject_unlisted_recipient=no
   -o smtpd_client_restrictions=permit_sasl_authenticated,reject
#  -o smtpd_client_restrictions=$mua_client_restrictions
#  -o smtpd_helo_restrictions=$mua_helo_restrictions
#  -o smtpd_sender_restrictions=$mua_sender_restrictions
#  -o smtpd_recipient_restrictions=
#  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
#628       inet  n       -       n       -       -       qmqpd
pickup    unix  n       -       n       60      1       pickup
cleanup   unix  n       -       n       -       0       cleanup
qmgr      unix  n       -       n       300     1       qmgr
#qmgr     unix  n       -       n       300     1       oqmgr
tlsmgr    unix  -       -       n       1000?   1       tlsmgr
rewrite   unix  -       -       n       -       -       trivial-rewrite
bounce    unix  -       -       n       -       0       bounce
defer     unix  -       -       n       -       0       bounce
trace     unix  -       -       n       -       0       bounce
verify    unix  -       -       n       -       1       verify
flush     unix  n       -       n       1000?   0       flush
proxymap  unix  -       -       n       -       -       proxymap
proxywrite unix -       -       n       -       1       proxymap
smtp      unix  -       -       n       -       -       smtp
relay     unix  -       -       n       -       -       smtp
        -o syslog_name=postfix/$service_name
#       -o smtp_helo_timeout=5 -o smtp_connect_timeout=5
showq     unix  n       -       n       -       -       showq
error     unix  -       -       n       -       -       error
retry     unix  -       -       n       -       -       error
discard   unix  -       -       n       -       -       discard
local     unix  -       n       n       -       -       local
virtual   unix  -       n       n       -       -       virtual
lmtp      unix  -       -       n       -       -       lmtp
anvil     unix  -       -       n       -       1       anvil
scache    unix  -       -       n       -       1       scache`;
}
</script>