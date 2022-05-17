<template>
  <v-navigation-drawer permanent :expand-on-hover="!$vuetify.breakpoint.mobile" mini-variant-width="56px" :mini-variant="$vuetify.breakpoint.mobile">

    <v-list dense nav>
      <v-list-item link @click="$vuetify.theme.dark=!$vuetify.theme.dark">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.theme.dark ? 'mdi-moon-waxing-crescent' : 'mdi-weather-sunny' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('menu.theme.'+ ($vuetify.theme.dark ?'dark':'light')) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item link :to="$i18nRoute({name: 'Calculator'})">
        <v-list-item-icon>
          <v-icon>mdi-calculator</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('navigation.calc') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="$i18nRoute({name: 'Currencies'})">
        <v-list-item-icon>
          <v-icon>mdi-currency-usd</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('navigation.curr') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <LocaleSwitcher/>
  </v-navigation-drawer>
</template>

<script>
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default {
  name: "Navigation",
  components: {
    LocaleSwitcher
  }
}
</script>