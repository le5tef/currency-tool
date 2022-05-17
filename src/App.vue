<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {},
  mounted() {
    this.fetchCurrency()
  },
  methods: {
    ...mapActions('money', ['fetchCurrency'])
  },

};
</script>

<style scoped>
.main-container {
  display: flex;
  padding: 0;
  height: 100%;
}
</style>
