<template>
  <v-container fluid class="main-container">
    <Navigation/>
    <v-container class="d-flex align-center justify-center">
      <router-view></router-view>
    </v-container>
  </v-container>
</template>

<script>
import Navigation from '../components/Navigation'

export default {
  name: "default",
  components: {
    Navigation
  }
}
</script>