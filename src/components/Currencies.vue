<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="6" md="8">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('currencies.search')"
              single-line
              hide-details
          />
        </v-col>
        <v-spacer/>
        <v-col cols="6" md="3">
          <v-select v-model="userBase" :items="currencies"/>
        </v-col>
      </v-row>
      <v-data-table
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
          :search="search"
          :headers="headers"
          :items="ratesList"/>
      <v-pagination v-model="page" :length="pageCount"/>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  name: "Currencies",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      factor: 1,
      search: ''
    }
  },
  computed: {
    ...mapState('money', ['rates']),
    ...mapGetters('money', ['ratesList', 'currencies']),
    userBase: {
      get() {
        return this.$store.state.money.userBase
      },
      set(val) {
        this.$store.commit('money/setUserBase', val)
      }
    },
    headers() {
      return [
        {text: this.$t('currencies.currency'), value: 'currency'},
        {text: this.$t('currencies.price'), value: 'rate'},
      ]
    }
  }
}
</script>