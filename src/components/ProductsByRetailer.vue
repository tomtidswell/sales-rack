<template>
  <section class="products">
      <div class="section">
        <div class="columns">
          <div class="column">
              <div class="subtitle">
                  {{ retailerData.displayName }}
              </div>
          </div>
          <Filters class="column" @sort="handleSort" />
          <b-button class="refresh" @click="refreshData">Refresh data</b-button>
        </div>
      </div>
    <div class="grid">
      <Product
        v-for="product in productData"
        :data="product"
        :key="product._id"
      />
    </div>
  </section>
</template>

<script>

import _ from 'lodash'
import {retailer_config} from '../../lib/retailers'
import Product from "./Product.vue"
import Filters from "./Filters.vue"

export default {
  name: "ProductsByRetailer",
  components: {
    Product,
    Filters,
  },
  props: {
  },
  data() {
    return {
      productDataResponse: [],
      productData: [],
    };
  },
  created() {
    this.getData()
  },
  computed: {
    retailer: function () {
      return this.$route.params.id
    },
    retailers: function () {
      return retailer_config
    },
    retailerData: function () {
      return this.retailers[this.retailer] || {}
    },
  },
  watch: {
    '$route.params': function () {
      this.getData()
    }
  },
  methods: {
    refreshData() {
      this.getData()
    },
    async getData() {
      const res = await fetch(`../api/retailer/${this.retailer}`)
      // console.log("Endpoint response:", res)
      this.productDataResponse = res.status === 200 ? await res.json() : []
      // console.log("Data:", this.productData)
      this.productDataResponse = _.filter(this.productDataResponse, 'price') //make sure we have price data for the item
      this.productData = _.orderBy(this.productDataResponse, 'price.discount.%','desc')
      // console.log("Sorted data:", this.productData)
    },
    handleSort: function (e) {
      const [field, direction] = e
      // console.log(field, direction)
      this.productData = _.orderBy(this.productDataResponse, field, direction)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
a {
  color: #42b983;
}
.subtitle{
  font-size: 1.8rem;
}
section.products{
    display: flex;
    flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 20px;
  padding: 0 20px 60px 20px;
}
</style>
