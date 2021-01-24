<template>
  <section class="section">
    <h2 class="subtitle">{{heading}}</h2>
    <b-carousel-list :data="productData" :items-to-show="showTiles" :arrow="true" :arrow-hover="false" :repeat="true">
      <template slot="item" slot-scope="product">
        <div class="image-header" v-if="product.header">Best {{category}} deals</div>
        <Product v-else
          class="best-product"
          :data="product"
          :key="product._id"
        />
      </template>
    </b-carousel-list>
  </section>
</template>

<script>

import _ from 'lodash'
import Product from "./Product.vue"

export default {
  name: "ProductCarousel",
  components: {
    Product,
  },
  props: {
    headerCard: Boolean,
    heading: String,
    category: String
  },
  data() {
    return {
      windowWidth: null,
      productDataResponse: [],
      productData: [],
    };
  },
  created() {
    this.getData()
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    showTiles: function () {
      if(!this.windowWidth) return 4
      return Math.floor(this.windowWidth / 200)
    },
  },
  watch: {
  },
  methods: {
    refreshData() {
      this.getData()
    },
    async getData() {
      const res = await fetch(`../api/best/${this.category}`)
      // console.log("Endpoint response:", res)
      this.productDataResponse = res.status === 200 ? await res.json() : []
      //make sure we have price data for the item
      const data = _.filter(this.productDataResponse, 'price')
      this.productData = this.headerCard ? [{header:true},...data] : data 
    },
    onResize(){
      this.windowWidth = this.$el.clientWidth
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.subtitle{
  font-size: 1.8rem;
}
.image-header{
  background-image: url(../assets/kitchen.jpeg);
  height: 100%;
  background-size: cover;
  background-position: center;
  color: #f14668;
  font-size: 3em;
  display: flex;
  align-items: flex-start;
  text-align: center;
  letter-spacing: -2px;
  text-shadow: 0px 0px 2px #84118c;
  line-height: 1em;
  padding-top: 40px;
  background-color: #f52b65;
  border-radius: 4px;
}
</style>
