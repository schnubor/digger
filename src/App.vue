<template>
<div id="app">
    <div class="conainer">
        <header>
            <router-link to="/"><h1>Digger</h1></router-link>
            <h2>Digging from <span :key="loading">{{ loading ? '... uhm ...' : count }}</span> vinyls.</h2>
        </header>
    </div>
    <router-view class="view"></router-view>
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

<style lang="sass">
body {
    font-family: Helvetica, sans-serif;
    padding: 0;
    margin: 0;
}

header {
    text-align: center;

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
        margin-bottom: 10px;
        margin-top: 50px;
    }
    h2 {
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        font-weight: 100;
        border-top: 1px solid #d6d6d6;
        padding-top: 20px;
        width: 300px;
        margin: 30px auto;

        span {
            color: red;
            font-weight: normal;
        }
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
