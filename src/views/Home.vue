<template lang="html">
    <div>
        <div class="card-deck-wrapper">
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top" src="../assets/random.jpg" width="100%" alt="Card image cap">
                    <div class="card-block">
                        <p class="lead" style="margin-bottom: 0;">Random vinyl</p>
                    </div>
                    <div class="card-footer" style="margin-top: 11px;">
                        <router-link to="/random"><button type="button" class="btn btn-outline-primary btn-block">Shuffle</button></router-link>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="../assets/genre.jpg" width="100%" alt="Card image cap">
                    <div class="card-block">
                        <select class="form-control" v-model="genre">
                            <option value="Electronic">Electronic</option>
                            <option value="Rock">Rock</option>
                            <option value="Hip-Hop">Hip-Hop</option>
                            <option value="Reggae">Reggae</option>
                            <option value="Classical">Classical</option>
                            <option value="Folk, World, & Country">Folk, World, & Country</option>
                            <option value="Pop">Pop</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Funk / Soul">Funk / Soul</option>
                        </select>
                    </div>
                    <div class="card-footer">
                        <router-link :to="genrePath"><button type="button" class="btn btn-block btn-outline-success">{{ genre }}</button></router-link>
                    </div>
                </div>
                <div class="card">
                    <img class="card-img-top" src="../assets/artist.jpg" width="100%" alt="Card image cap">
                    <div class="card-block">
                        <input type="text" class="form-control" placeholder="Artist" v-model="artist">

                    </div>
                    <div class="card-footer" style="margin-top: 2px;">
                        <router-link :to="artistPath"><button type="button" class="btn btn-outline-warning btn-block" :disabled="disabledArtistBtn">{{ artist ? artist : 'Artist' }}</button></router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            genre: 'Electronic',
            artist: ''
        }
    },
    computed: {
        disabledArtistBtn() {
            return this.artist ? false : true;
        },
        genrePath() {
            return '/genre/' + this.genre;
        },
        artistPath() {
            return '/artist/' + this.artist;
        }
    },
    ready() {},
    attached() {},
    methods: {},
    components: {}
}
</script>

<style lang="css" scoped>
    hr {
        margin-bottom: 1.6rem;
    }
    a:hover {
        text-decoration: none;
    }
</style>
