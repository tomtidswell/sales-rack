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
// const _ = require('lodash/core')
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
    retailer: String,
  },
  data() {
    return {
      message: "Hello",
      productData: [],
    };
  },
  created() {
    this.getData()
  },
  computed: {
    retailers: function () {
      return retailer_config
    },
    retailerData: function () {
      return this.retailers[this.retailer] || {}
    },
  },
  watch: {
    retailer: function () {
      this.getData()
    }
  },
  methods: {
    async getData() {
      const res = await fetch(`./retailer/${this.retailer.toLowerCase()}`)
      console.log("Endpoint response:", res)
      const prods = res.status === 200 ? await res.json() : []
      console.log("Data:", this.productData)
      console.log("Sorted data:", )
      this.productData = _.orderBy(prods, 'activeDiscount','desc')

      // const data = this.$papa.parse(csv, {download: true, delimiter: ",", newline: "", complete: function(results, file) {
      //   console.log("Parsing complete:", results, file)
      // }})
      // console.log(data)
      // this.unparsedResults = this.$papa.unparse(this.sampleData, {
      //   delimiter: ","
      // })
    },
    handleSort: function (e) {
      const [field, direction] = e
      console.log(field, direction)
      this.productData = _.orderBy(this.productData, field, direction)
      console.log(this.productData)
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
  padding: 0 20px;
}
</style>
