<template>
  <div class="products">
    <section class="hero is-bold is-danger is-medium" :class="{ 'is-large': searchFocussed }">
      <div class="hero-body">
        <Search @newResults="handleResults" @focussed="searchFocusHandler"/>
        <!-- <div class="search-results" v-if="searchResults && searchResults.length">
          <ProductMini
            v-for="product in searchResults"
            class="search-result"
            :data="product"
            :key="product._id" />
        </div> -->
      </div>
    </section>

    <section class="section">
      <!-- <h1 class="title">We've found you some cracking deals</h1> -->
      <h2 class="subtitle">Homeware deals</h2>
      <b-carousel-list :data="productData.slice(0, 8)" :items-to-show="showTiles" :arrow="true" :arrow-hover="false" :repeat="true">
        <template slot="item" slot-scope="product">
          <div class="image-header" v-if="product.header">I'm the header</div>
          <Product v-else
            class="best-product"
            :data="product"
            :key="product._id"
          />
        </template>
      </b-carousel-list>
    </section>


    <section class="section">
      <h2 class="subtitle">Kitchen deals</h2>
      <b-carousel-list :data="kitchenDeals" :items-to-show="showTiles" :arrow="true" :arrow-hover="false" :repeat="true">
      <template slot="item" slot-scope="product">
        <div class="image-header" v-if="product.header">Kitchen deals</div>
        <Product v-else
          class="best-product"
          :data="product"
          :key="product._id"
        />
      </template>
      </b-carousel-list>
    </section>



    <section class="section">
      <div class="subtitle">Tableware deals</div>
      <b-carousel-list :data="productData.slice(18, 27)" :items-to-show="showTiles" :arrow="true" :arrow-hover="false" :repeat="true">
      <template slot="item" slot-scope="product">
          <Product
            class="best-product"
            :data="product"
            :key="product._id"
          />
      </template>
      </b-carousel-list>
    </section>


    <section class="section">
    <nav class="level">
      <div class="level-item has-text-centered">
        <div class="card">
          <div class="card-content">
            <p class="title">LOGO</p>
          </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <p class="subtitle">M&S</p>
            </div>
          </div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div class="card">
          <div class="card-content">
            <p class="title">LOGO</p>
          </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <p class="subtitle">John Lewis</p>
            </div>
          </div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div class="card">
          <div class="card-content">
            <p class="title">LOGO</p>
          </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <p class="subtitle">Next</p>
            </div>
          </div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div class="card">
          <div class="card-content">
            <p class="title">LOGO</p>
          </div>
          <div class="card-footer">
            <div class="card-footer-item">
              <p class="subtitle">Matalan</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </section>


  </div>
</template>

<script>
import Product from "./Product.vue";
// import ProductMini from "./ProductMini.vue";
import Search from "./Search.vue";

export default {
  name: "ProductsBest",
  components: {
    Product,
    // ProductMini,
    Search,
  },
  props: {},
  data() {
    return {
      windowWidth: null,
      productData: [],
      searchResults: [],
      searchFocussed: false,
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.element = this.$el.clientWidth
    this.onResize()
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    kitchenDeals: function () {
      const products = this.productData.slice(9, 18)
      return [{header:true},...products]
    },
    showTiles: function () {
      if(!this.windowWidth) return 4
      return Math.floor(this.windowWidth / 200)
    },
  },
  watch: {},
  methods: {
    onResize(){
      this.windowWidth = this.$el.clientWidth
    },
    searchFocusHandler(e){
      console.log(e)
      this.searchFocussed = e
    },
    async getData() {
      const res = await fetch("./api/products")
      this.productData = res.status === 200 ? await res.json() : []
      console.log("Data:", this.productData)
    },
    handleResults(newSearchResults) {
      // console.log("Need to draw:", newSearchResults)
      this.searchResults = newSearchResults
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}
.subtitle {
  font-size: 1.6rem;
}
section.products {
  display: flex;
  flex-direction: column;
}

.image-header{
  background-image: url(../assets/kitchen.jpeg);
  height: 100%;
  background-size: cover;
  background-position: center;
  color: #ce3c3c;
  font-size: 3em;
  display: flex;
  align-items: flex-start;
  text-align: center;
  letter-spacing: -2px;
  text-shadow: 0px 0px 2px #84118c;
  line-height: 1em;
  padding-top: 40px;
}

.hero-body{
  transition: all 1s;
}

.search-results{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 80px 20px 40px 20px;
  .search-result{

  }
}

.product-bubble {
  padding: 10px 20px;
  background-color: white;
  border-radius: 10px;
  .subtitle {
    margin: 0;
    font-size: 1.5em;
  }
}
.scroller-wrap {
  overflow-x: auto;
  padding: 14px;
}
.scroller-content {
  max-width: 100%;
}
.best-product {
  min-width: 150px;
}
.more {
  align-self: center;
}
.spacer {
  padding: 10px;
}

</style>
