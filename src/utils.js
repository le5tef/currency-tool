import store from './store'


export function getCurrencyRate(currency) {
    currency = currency.toUpperCase();
    if (currency === store.state.money.base) {
        return 1
    }
    return store.state.money.rates[currency]
}


export function convert(factor, from_, to) {
    let digits = 2;
    let result = 0;
    while (result === 0) {
        result = Math.floor((factor * getCurrencyRate(to)) / getCurrencyRate(from_) * Math.pow(10, digits)) / Math.pow(10, digits)
        digits++
    }
    return result
}