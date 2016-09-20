<template lang="html">
    <div class="container">
        <nav class="nav nav-inline">
            <router-link class="nav-link" to="/"><button type="button" class="btn btn-sm btn-outline-secondary">Back to selection</button></router-link>
            <span class="nav-link text-muted" v-if="isGenre"><small>Genre / {{ $route.params.genre }}</small></span>
            <span class="nav-link text-muted" v-if="isArtist"><small>Artist / {{ $route.params.artist }}</small></span>
            <span class="nav-link text-muted" v-if="isRandom"><small>Random vinyl</small></span>
            <hr>
        </nav>

        <div class="spinnerWrapper" v-if="!fetched">
            <spinner></spinner>
        </div>

        <div class="row" v-if="fetched">
            <div class="col-md-3">
                <div class="card">
                    <img class="card-img-top" :src="vinylData.images[0].uri" alt="Card image cap" width="100%">
                    <div class="card-block">
                        <h6 class="card-title" style="margin-bottom: 5px;">{{ vinylData.title }}</h6>
                        <p class="card-text text-muted"><small>by {{ vinylData.artists[0].name }}</small></p>
                    </div>
                    <div class="card-footer">
                        Discogs
                    </div>
                </div>
                <button type="button" class="btn btn-outline-danger btn-lg btn-block" v-on:click="fetchVinylList">Nope, next!</button>
            </div>
            <div class="col-md-9">
                <div class="videoWrapper">
                    <iframe id="ytplayer" type="text/html" width="100%" height="auto" :src="vinylData.videoUri" frameborder="0"/>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'

export default {
  data () {
    return {
        fetched: false,
        error: false,
        vinylData: {},
        vinylList: {
            page: 0
        },
        rateLimit: 10000
    }
  },
  computed: {
      isGenre() {
          if(this.$route.name == 'genre') return true;
          return false;
      },
      isArtist() {
          if(this.$route.name == 'artist') return true;
          return false;
      },
      isRandom() {
          if(this.$route.name == 'random') return true;
          return false;
      }
  },
  mounted() {
     this.fetchVinylList();
  },
  ready () {},
  attached () {},
  methods: {
      fetchVinylList() {
          console.log("fetching new vinyl...");
          this.fetched = false;

          let url = '';

          if(this.$route.params.genre) var page = Math.floor(Math.random() * (1000 - 1) + 1) + '&per_page=100';
          if(this.$route.params.artist) var page = '1&per_page=100';

          if(this.$route.params.artist) url = 'https://api.discogs.com/database/search?type=release&format=vinyl&artist=' + this.$route.params.artist + '&token=oXTNwXoHFojhFqXDzcLIfXjnzoiBkgTHYnIAiynU&page=' + page;
          if(this.$route.params.genre) url = 'https://api.discogs.com/database/search?type=release&format=vinyl&genre=' + this.$route.params.genre + '&token=oXTNwXoHFojhFqXDzcLIfXjnzoiBkgTHYnIAiynU&page=' + page;
          if(this.$route.params.random) url = 'https://api.discogs.com/database/search?type=release&format=vinyl&token=oXTNwXoHFojhFqXDzcLIfXjnzoiBkgTHYnIAiynU&page=' + page;

          var request = new XMLHttpRequest();

          request.open('GET', url, true);

          request.onload = () => {
              if (request.status >= 200 && request.status < 400) {
                  // Success!
                  this.error = false;
                  var resp = JSON.parse(request.responseText);
                  let randomId = Math.floor(Math.random() * (resp.results.length - 1) + 1);
                  let uri = resp.results[randomId].resource_url;
                  this.fetchVinylData(uri);
              } else {
                  // We reached our target server, but it returned an error
                  this.error = true;
              }
          };

          request.onerror = () => {
              console.log('god damn...');
              this.error = true;
              setTimeout(() => {
                  this.fetchVinylList();
              }, this.rateLimit);
          };

          request.send();
      },
      fetchVinylData(uri) {
          var request = new XMLHttpRequest();

          request.open('GET', uri + '?token=oXTNwXoHFojhFqXDzcLIfXjnzoiBkgTHYnIAiynU', true);

          request.onload = () => {
              if (request.status >= 200 && request.status < 400) {
                  // Success!
                  this.error = false;
                  var resp = JSON.parse(request.responseText);
                  console.log(resp);
                  if(resp.videos && resp.images) {
                      this.vinylData = resp;
                      this.vinylData.videoUri = 'http://www.youtube.com/embed/' + resp.videos[0].uri.substr(resp.videos[0].uri.length - 11) + '?autoplay=1';
                      this.fetched = true;
                  }
                  else{
                      setTimeout(() => {
                          this.fetchVinylList();
                      }, this.rateLimit);
                  }
              } else {
                  // We reached our target server, but it returned an error
                  this.error = true;
                  this.fetched = false;
              }
          };

          request.onerror = () => {
              console.log('god damn...');
              setTimeout(() => {
                  this.fetchVinylList();
              }, this.rateLimit);
              this.error = true;
              this.fetched = false;
          };

          request.send();
      }


  },
  components: {
      spinner: Spinner
  }
}
</script>

<style lang="css">
    .spinnerWrapper {
        margin-top: 100px;
    }
    .videoWrapper {
    	position: relative;
    	padding-bottom: 56.25%; /* 16:9 */
    	padding-top: 25px;
    	height: 0;
    }
    .videoWrapper iframe {
    	position: absolute;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    }
</style>
