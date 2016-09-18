import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vinyl from '../views/Vinyl.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/random',
        name: 'random',
        component: Vinyl
    }, {
        path: '/genre/:genre',
        name: 'genre',
        component: Vinyl
    }, {
        path: '/artist/:artist',
        name: 'artist',
        component: Vinyl
    }, {
        path: '*',
        redirect: '/'
    }]
})
