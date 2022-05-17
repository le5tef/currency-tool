import Vue from 'vue'
import VueRouter from 'vue-router'
import Calculator from '../views/Calculator.vue'
import {Trans} from '@/plugins/translation'
import Default from "@/layouts/default";

Vue.use(VueRouter)

const routes = [
    {
        path: '/:locale',
        component: Default,
        beforeEnter: Trans.routeMiddleware,
        children: [
            {
                path: 'calculator',
                name: 'Calculator',
                component: Calculator
            },
            {
                path: 'rates',
                name: 'Currencies',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/Currencies.vue')
            },
            {
                path: '',
                redirect() {
                    return Trans.i18nRoute({name: "Calculator"});
                }
            }
        ],
    },
    {
        path: '*',
        redirect() {
            return Trans.defaultLocale;
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
