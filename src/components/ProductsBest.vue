<template>
  <div class="products">
    <section class="hero is-bold is-medium">
      <div class="hero-body">
        <Search @newResults="handleResults" />
        <div class="search-results" v-if="searchResults && searchResults.length">
          <ProductMini
            v-for="product in searchResults"
            class="search-result"
            :data="product"
            :key="product._id"
          />
        </div>
      </div>
    </section>
    <section class="section">
      <h1 class="title">Need some inspiration?</h1>
    </section>
    <section class="columns section">
      <div class="column is-9 product-bubble">
        <div class="subtitle">Kitchen deals</div>
        <div class="scroller-wrap">
          <div class="scroller-content is-flex">
            <Product
              v-for="product in productData.slice(0, 8)"
              class="best-product"
              :data="product"
              :key="product._id"
            />
            <div class="more button is-primary is-rounded is-outlined">
              More
            </div>
            <div class="spacer"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="columns section">
      <div class="column is-9 is-offset-3 product-bubble">
        <div class="subtitle">Homeware deals</div>
        <div class="scroller-wrap">
          <div class="scroller-content is-flex">
            <Product
              v-for="product in productData.slice(10, 18)"
              class="best-product"
              :data="product"
              :key="product._id"
            />
            <div class="more button is-primary is-rounded is-outlined">
              More
            </div>
            <div class="spacer"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Product from "./Product.vue";
import ProductMini from "./ProductMini.vue";
import Search from "./Search.vue";

export default {
  name: "ProductsBest",
  components: {
    Product,
    ProductMini,
    Search,
  },
  props: {},
  data() {
    return {
      message: "Hello",
      productData: [],
      searchResults: [],
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  computed: {
    csvData: function () {
      return ""; //this.$papa.parse('../../data/marksandspencer-home.csv', {delimiter: ",", newline: ""})
    },
  },
  watch: {},
  methods: {
    async getData() {
      const res = await fetch("./products")
      this.productData = res.status === 200 ? await res.json() : []
      console.log("Data:", this.productData)
    },
    handleResults(newSearchResults) {
      console.log("Need to draw:", newSearchResults)
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
  font-size: 1.8rem;
}
section.products {
  display: flex;
  flex-direction: column;
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
  margin-right: 15px;
  &:last-child {
    margin-right: 20px;
  }
}
.more {
  align-self: center;
}
.spacer {
  padding: 10px;
}
</style>
