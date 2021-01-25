<template>
  <div class="filters">
    <div class="field search-field">
      <b-icon icon="magnify" size="is-medium" />
      <input class="input is-medium search-box" type="text" v-model="searchString" placeholder="Find some amazing deals..." 
             @input.prevent="debouncedSearch()" @focus="searchFocusHandler" @blur="searchFocusHandler"/>
      <div class="dropdown-content search-suggestions" v-if="searchString">
        <div class="columns">
          <div class="column is-one-fifth">
            <div class="dropdown-item dropdown-heading">Categories</div>
            <!-- <a href="#" class="dropdown-item" v-for="category in categories" :key="category">{{category}}</a> -->
            <router-link v-for="(data, name) in categories" :key="name" class="dropdown-item" :to="{ path: `/category/${data.websafeName}` }"> 
              {{data.displayName}} 
              <span v-if="searchCatCount[data.websafeName]">({{searchCatCount[data.websafeName]}})</span>
            </router-link>
            <div class="dropdown-item dropdown-heading">Suggestions</div>
            <a href="#" class="dropdown-item" v-for="auto in searchAutocomplete" :key="auto">{{auto}}</a>
          </div>
          <div class="column">
            <div class="dropdown-item dropdown-heading">We found these deals</div>
            <div class="products">
              <ProductMini
                v-for="product in searchProducts"
                class="search-result"
                :data="product"
                :key="product._id" />
            </div>
            <!-- <a href="#" class="dropdown-item" v-for="(product, index) in searchProducts" :key="product.name + index">{{product.category}}{{product.name}}</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {category_config} from '../../lib/categories'
import ProductMini from "./ProductMini.vue";

export default {
  name: "Search",
  components: { ProductMini },
  props: {
  },
  data() {
    return {
      searchString: "",
      searchResponse: {},
      searchProducts: [],
      searchAutocomplete: [],
      searchCatCount: [],
      sorting: "percent-discount",
      filterOptions: [],
      keys: [],
    }
  },
  created() {
    // this.getData()
    // this.search()
    this.debouncedSearch = _.debounce(this.search.bind(this), 300)
  },
  computed: {
    searchArray: function () {
      return _.chain(this.searchString).split(' ').filter(v=>v!=="").value()
    },
    currentWord: function () {
      return _.chain(this.searchString).split(' ').nth(-1).value()
    },
    categories: function () {
      return category_config
    },
  },
  methods: {
    searchFocusHandler({type}){
      this.$emit('focussed', type==='focus' || this.searchString)
    },
    async search() {
      if(this.searchString === "") this.$emit('newResults', [])
      const res = await fetch("./api/search", {
        method: 'PUT', // or 'PUT'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.searchArray),
      })
      this.searchResponse = res.status === 200 ? await res.json() : {}
      this.searchProducts = this.searchResponse.products || []
      this.searchAutocomplete = this.searchResponse.auto || []
      this.searchCatCount = this.searchResponse.categories || []
      this.$emit('newResults', this.searchProducts)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}
.filters {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
}
.field.search-field{
  position: relative;
  .icon{
    position: absolute;
    height: 100%;
    left: -30px;
  }
}
.search-box{
    border-radius: 0;
    border: 0;
    border-color: white;
    border-bottom: 3px solid white;
    background: transparent;
    outline: 0;
    color: white;
    box-shadow: none;
    &::placeholder{
      color: white;
    }
    &:active,
    &:focus,
    &:hover{
      border-color: white;
      box-shadow: none;
    }
}
.dropdown-heading{
  font-weight: 900;
}
.dropdown-content.search-suggestions{
  position: absolute;
  z-index: 10;
  width: -webkit-fill-available;
  margin: 0 25px;
  top: 60px;
}
.check-option {
  display: block;
}
.products{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 0.375rem 1rem;
}
</style>
