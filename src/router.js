import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./views/Main.vue')
        },
        {
            path: '/about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/library',
            component: () => import('./views/Library.vue')
        },
        {
            path: '/wishlist',
            component: () => import('./views/Wishlist.vue')
        },
        {
            path: '/friends',
            component: () => import('./views/Friends.vue')
        },
        {
            path: '/settings',
            component: () => import('./views/Settings.vue')
        },
    ]
})