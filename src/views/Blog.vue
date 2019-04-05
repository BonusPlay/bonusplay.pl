<template>
    <div id="content">
        <section class="hero">
            <div class="hero-body">
                <div class="title">Blog about everything and nothing</div>
            </div>
        </section>
        <section class="container">
            <wip/>
            <!--
            <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical">
                    <article v-for="section in sections" :key="section.title" class="tile is-child message is-dark">
                        <div class="message-header">
                            {{ section.title }}
                        </div>
                            {{ section.subtitle }}
                        <ul>
                            <router-link v-for="article in section.articles" :key="article.title" :to="`/blog/${article.to}`" tag="li">{{ article.title }}</router-link>
                        </ul>
                    </article>
                    <article class="tile is-child message is-dark">
                        <div class="message-header">
                            Random
                        </div>
                        sdfg;kjfgsdjkl;
                    </article>
                </div>
            </div>
            -->
        </section>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import wip from "@/components/wip.vue";

    @Component({
        components: {
            wip
        }
    })
    export default class Home extends Vue {
        sections = [
            {
                title: "Reverse Engineering",
                subtitle: "Random articles about the art of reverse engineering, they require programming experience prior to reading.",
                articles: [
                    {to: "article1", title: "title1"}
                ]
            },
            {
                title: "Webdev",
                subtitle: "My adventures in webdev, how it sucks, how to make it suck less, and many many more...",
                articles: [
                    {to: "website", title: "Making of bonusplay.pl"}
                ]
            }
        ];

        mounted(): void {
            // console.log(this.$route);
        }
    }
</script>

<style lang="less" scoped>
    .hero {
        margin-top: 10vh;
        margin-bottom: 2vh;
        background-color: #6b1b80;
    }

    .message.is-dark {
        background-color: transparent;
    }
</style>
