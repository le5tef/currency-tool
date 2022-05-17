<template>
  <div class="wrapper d-flex flex-column align-center justify-center">
    <v-card max-width="550px">
      <v-card-title>{{ $t('calculator.title') }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="parseInput" ref="form">
          <v-text-field :rules="rules" :hint="$t('calculator.example')+': 15 usd in rub'" v-model="input"
                        outlined></v-text-field>
          <v-btn width="100%" type="submit">{{ $t('calculator.button') }}</v-btn>
        </v-form>
        <div v-if="result" class="d-flex flex-column flex-md-row align-center">
          <v-row class="no-gutters">
            <v-col cols="8">
              <v-text-field v-model="factor"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select v-model="from_" :items="currencies"></v-select>
            </v-col>
          </v-row>
          <v-btn class="mx-5" icon @click="swap()">
            <v-icon>mdi-arrow-left-right</v-icon>
          </v-btn>
          <v-row class="no-gutters">
            <v-col cols="8">
              <v-text-field v-model="result"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select v-model="to" :items="currencies"></v-select>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {convert} from '@/utils'

const inputRegex = /^(?<factor>[+-]?([0-9]*[.,])?[0-9]+)\s+(?<from_>\w{3})\s+(in)?(to)?\s+(?<to>\w{3})$/i;
export default {
  name: "Converter",
  data() {
    return {
      input: null,
      result: null,
      from_: null,
      to: null,
      factor: null,
      wasSubmitted: false,
    }
  },
  computed: {
    ...mapState('money', ['rates', 'base']),
    ...mapGetters('money', ['currencies']),
    rules() {
      if (!this.wasSubmitted) {
        return []
      }
      return [(val) => {
        const errorMessage = this.$t('calculator.error')
        const match = val.match(inputRegex)
        if (!match) {
          return errorMessage
        }
        if (
            !this.currencies.includes(match.groups.from_.toUpperCase())
            || !this.currencies.includes(match.groups.to.toUpperCase())
        ) return errorMessage
        return true
      }]
    }
  },
  watch: {
    result: 'countRate',
    from_: 'countRate',
    to: 'countRate',
    factor: 'countRate',
  },
  methods: {
    parseInput() {
      this.wasSubmitted = true
      if (this.$refs.form.validate()) {
        const match = this.input.match(inputRegex)
        this.from_ = match.groups.from_.toUpperCase();
        this.to = match.groups.to.toUpperCase();
        this.factor = match.groups.factor;
      }
    },

    countRate() {
      this.result = convert(this.factor, this.from_, this.to)
    },
    swap() {
      [this.from_, this.to] = [this.to, this.from_];
      [this.result, this.factor] = [this.factor, this.result]
    }
  },

}
</script>
