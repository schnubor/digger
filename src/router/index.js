import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vinyl from '../views/Vinyl.vue'

Vue.use(VueRouter)

const Foo = {
    template: '<div>foo</div>'
}
const Bar = {
    template: '<div>bar</div>'
}

export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: Home
    }, {
        path: '/random',
        component: Vinyl
    }, {
        path: '/genre',
        component: Vinyl
    }, {
        path: '/artist',
        component: Vinyl
    }, {
        path: '*',
        redirect: '/'
    }]
})
