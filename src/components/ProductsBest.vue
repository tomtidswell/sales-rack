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

    <section class="section columns is-vcentered ">
      <article class="column is-half">
        <h2 class="subtitle">Luggage deals</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit modi quis facilis mollitia eligendi a porro harum ipsum at sequi? Tenetur recusandae sed sint veniam in deserunt ut id cum!</p>
      </article>
      <article class="column is-half">
        <ProductCarousel heading="Luggage deals" category="luggage" headerCard half/>
      </article>
    </section>


    <section class="section columns is-vcentered mobile-reorder">
      <article class="column is-half">
          <ProductCarousel heading="Tableware deals" category="tableware"/>
      </article>
      <article class="column is-half">
        <h2 class="subtitle">Tableware deals</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit modi quis facilis mollitia eligendi a porro harum ipsum at sequi? Tenetur recusandae sed sint veniam in deserunt ut id cum!</p>
        <b-button type="" icon-right="arrow-right">Lots more to see</b-button>
      </article>
    </section>


    <section class="section columns is-vcentered ">
      <article class="column is-half">
        <h2 class="subtitle">Kitchenware deals</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit modi quis facilis mollitia eligendi a porro harum ipsum at sequi? Tenetur recusandae sed sint veniam in deserunt ut id cum!</p>
      </article>
      <article class="column is-half">
          <ProductCarousel heading="Kitchenware deals" category="kitchen"/>
      </article>
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
import ProductCarousel from "./ProductCarousel.vue"
import Search from "./Search.vue"

export default {
  name: "ProductsBest",
  components: {
    ProductCarousel,
    Search,
  },
  props: {},
  data() {
    return {
      windowWidth: null,
      productData: [],
      searchResults: [],
      searchFocussed: false,
    }
  },
  created() {
    this.getData()
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
      const res = await fetch("./api/best/luggage")
      this.productData = res.status === 200 ? await res.json() : []
      console.log("Data:", this.productData)
    },
    handleResults(newSearchResults) {
      // console.log("Need to draw:", newSearchResults)
      this.searchResults = newSearchResults
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}
.subtitle {
  font-family: Arvo;
  font-size: 1.6rem;
  letter-spacing: -1px;
}

.hero-body{
  transition: all 1s;
}
article .button{
  margin: 1em 0;
}

/* section.section.half-split{
  display: flex;
  align-items: center;
  padding: 7.5rem 1.5rem;
  article{
    width: 50%;
  }
  article.has-text{
    padding: 2em;
  }
} */

/* .search-results{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 80px 20px 40px 20px;
  .search-result{

  }
} */

@media screen and (max-width: 768px){
  .mobile-reorder{
    display: flex;
    flex-direction: column-reverse;
    *{
      max-width: 100%;
      width: 100%;
    }
  }
}


</style>
