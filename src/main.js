import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {i18n} from './plugins/i18n'
import vuetify from './plugins/vuetify'
import './plugins/i18n'
import router from './router'
import {Trans} from './plugins/translation'
import 'flag-icons/css/flag-icons.css'

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)

Vue.config.productionTip = false

new Vue({
    i18n,
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
