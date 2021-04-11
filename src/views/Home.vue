<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Home_Title' | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div class="row" v-else>
      <bill
        :rates="currency.rates"
      />
      <currency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
  import Bill from "../components/home/Bill";
  import Currency from "../components/home/Currency";

  export default {
      name: 'home',
          metaInfo() {
              return {
                title: this.$title('Home_Title')
              }
          },
      data: () => ({
          loading: true,
          currency: null
      }),
      async mounted() {
          this.currency = await this.$store.dispatch('fetchCurrency')
          this.loading = false
      },
      methods: {
          async refresh() {
              this.loading = true
              this.currency = await this.$store.dispatch('fetchCurrency')
              this.loading = false
          }
      },
      components: {
          Currency, Bill
      },
  }
</script>
