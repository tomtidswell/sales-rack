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
      <h1 class="title">Get some inspiration</h1>
      <p class="heading">Following</p>
    </section>


    <section class="section">
      <b-carousel-list v-model="test" :data="productData.slice(0, 8)" :items-to-show="4" :arrow="true" :arrow-hover="false" :repeat="true">
        <template slot="item" slot-scope="product">
          <div class="card">
            <Product
              class="best-product"
              :data="product"
              :key="product._id"
            />
          </div>
        </template>
      </b-carousel-list>
    </section>


    <section class="section">
        <div class="subtitle">Kitchen deals</div>
        <figure class="image is-128x128">
          <img src="../assets/kitchen.jpeg">
        </figure>
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
    </section>



    <section class="section">
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
      test: 0,
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
  font-size: 1.6rem;
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
