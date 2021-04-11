import  store from '../store'
import ru from '../locales/ru-RU.json'
import en from '../locales/en-US.json'

const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    const locale = store.getters.info.locale || 'ru-RU'
    return locales[locale][key] || `[Localize error]: key ${key} not found`
}