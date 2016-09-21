<template>
<div id="app">
    <div class="container">
        <header>
            <router-link to="/"><h1>Digger</h1></router-link>
        </header>
        <hr class="m-b-2">
        <router-view class="view"></router-view>
        <hr class="m-t-2">
        <footer>
            <small>
                Digging from <span :key="loading">{{ loading ? '... uhm ...' : count }}</span> vinyls using the <a href="https://www.discogs.com/developers/" target="_blank">Discogs API</a>.
                Build with <a href="http://rc.vuejs.org" target="_blank">Vue.js v2.0</a> by <a href="http://twitter.com/schnubor" target="_blank">@schnubor</a>.
                Source on <a href="http://github.com/schnubor/digger" target="_blank">Github</a>.
            </small>
        </footer>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            count: 0
        }
    },
    mounted() {
        this.fetchReleaseCount();
    },
    methods: {
        fetchReleaseCount() {
            var request = new XMLHttpRequest();
            request.open('GET', 'https://api.discogs.com/database/search?type=release&format=vinyl&token=oXTNwXoHFojhFqXDzcLIfXjnzoiBkgTHYnIAiynU', true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    var data = JSON.parse(request.responseText);
                    this.loading = false;
                    this.count = data.pagination.items;
                } else {
                    // We reached our target server, but it returned an error

                }
            };

            request.onerror = () => {
                console.log('fock!');
            };

            request.send();
        }
    }
}
</script>

<style lang="sass" scoped>
body {
    font-family: Helvetica, sans-serif;
    padding: 0;
    margin: 0;
}

header {
    width: 100%;
    display: inline-block;

    &.after {
        content: ".";
        display: block;
        clear: both;
        visibility: hidden;
        line-height: 0;
        height: 0;
    }

    a {
        text-decoration: none;
        color: #373a3c;

        &:hover, &:active, &:visited, &:focus {
            text-decoration: none;
            color: #373a3c;
        }
    }

    h1 {
        font-size: 72px;
        font-family: 'Playball', cursive;
        margin-bottom: 0px;
        margin-top: 50px;
        float: left;
    }
    h2 {
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        font-weight: 100;
        margin-top: 110px;
        width: 300px;
        float: right;
        text-align: right;
        margin-bottom: 0;

        span {
            color: #373a3c;
            font-weight: normal;
        }
    }
}

footer {
    color: #8a9399;

    span {
        color: #373a3c;
        font-weight: bold;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}</style>
