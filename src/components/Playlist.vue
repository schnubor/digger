<template lang="html">
    <div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <p class="lead">
                    Next up:
                </p>
            </div>
            <div class="col-md-3" v-for="vinyl in vinyls">
                <div class="card">
                    <img class="card-img-top" :src="vinyl.images[0].uri" alt="Card image cap" width="100%">
                    <div class="card-block">
                        <h6 class="card-title" style="margin-bottom: 5px;">{{ vinyl.title }}</h6>
                        <p class="card-text text-muted"><small>by {{ vinyl.artists[0].name }}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['vinyls'],
    data() {
        return {}
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {},
    components: {}
}
</script>

<style lang="css">
</style>
