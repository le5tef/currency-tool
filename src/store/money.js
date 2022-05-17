import axios from "axios";
import {convert} from "@/utils";

export default {
    namespaced: true,
    state: {
        rates: {},
        base: 'RUB',
        userBase: 'RUB',
    },
    getters: {
        ratesList(state, getters) {
            let array = []
            for (let currency of getters.currencies.filter((x) => x !== state.userBase)) {
                array.push({
                    currency,
                    rate: convert(1, currency, state.userBase)
                })
            }
            return array
        },
        currencies(state) {
            return [state.base, ...Object.keys(state.rates)]
        },
    },
    mutations: {
        setRates: (state, data) => {
            state.rates = data;
        },
        setBase: (state, data) => {
            state.base = data;
        },
        setUserBase: (state, data) => {
            state.userBase = data;
        },
    },
    actions: {
        async fetchCurrency({commit}) {
            const response = await axios.get('https://www.cbr-xml-daily.ru/latest.js')
            commit('setRates', response.data.rates)
            commit('setBase', response.data.base)
        },
    },
}
