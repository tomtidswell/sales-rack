<template>
  <section class="products">
      <div class="section">
        <div class="columns">
        <div class="column">
            <div class="subtitle">
                {{ categoryData.displayName }}
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

import _ from 'lodash'
import {category_config} from '../../lib/categories'
import Product from "./Product.vue"
import Filters from "./Filters.vue"

export default {
  name: "ProductsByCategory",
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
    category: function () {
      return this.$route.params.id.toLowerCase()
    },
    categories: function () {
      return category_config
    },
    categoryData: function () {
      return this.categories[this.category] || {}
    },
  },
  watch: {
    '$route.params': function () {
      this.getData()
    }
  },
  methods: {
    async getData() {
      const res = await fetch(`../category/${this.category}`)
      // console.log("Endpoint response:", res)
      this.productDataResponse = res.status === 200 ? await res.json() : []
      // console.log("Data:", this.productDataResponse)
      this.productData = _.orderBy(this.productDataResponse, 'latestPrice.discount.%','desc')
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
  padding: 0 20px;
}
</style>
