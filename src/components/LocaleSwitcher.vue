<template>
  <v-list
      dense
      nav
  >
    <v-list-item v-show="currentLocale!==locale" v-for="locale in supportedLocales" :key="locale"
                 @click="switchLocale(locale)">
      <v-list-item-icon>
        <span class="fi" :class="getIcon(locale)"></span>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ $t('menu.' + locale) }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


  </v-list>

</template>

<script>
import {Trans} from '@/plugins/translation'

export default {
  name: 'LocaleSwitcher',
  computed: {
    supportedLocales() {
      return Trans.supportedLocales
    },
    currentLocale() {
      return Trans.currentLocale
    },
  },
  methods: {
    switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        const to = this.$router.resolve({params: {locale}})
        return Trans.changeLocale(locale).then(() => {
          this.$router.push(to.location)
        })
      }
    },
    getIcon(locale) {
      return 'fi-' + ({
        'en': 'us'
      }[locale] || locale)
    }
  },

}
</script>