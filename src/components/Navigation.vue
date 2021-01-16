<template>
  <b-navbar :mobile-burger="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <header>SaleRack</header>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Search
      </b-navbar-item>
      <b-navbar-dropdown label="Categories" collapsible>
        <b-navbar-item 
          v-for="(data, name) in categories"
          :key="name"
          tag="router-link"
          :to="{ path: `/category/${data.websafeName}` }"> {{data.displayName}} </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Shops" collapsible>
        <b-navbar-item 
          v-for="(data, name) in retailers"
          :key="name"
          tag="router-link"
          :to="{ path: `/retailer/${data.websafeName}` }"> {{data.displayName}} </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Admin" collapsible>
        <b-navbar-item tag="router-link" :to="{ path: '/scraping/settings' }"> Scrape settings </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/scraping/history' }"> Scrape history </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/admin/categorymap' }"> Category map config </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">Sign up</a>
          <a class="button is-light"> Log in </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import {retailer_config} from '../../lib/retailers'
import {category_config} from '../../lib/categories'

export default {
  name: "Navigation",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      shop: null,
      category: null,
      filterOptions: [],
    }
  },
  created() {
    
  },
  computed: {
    retailers: function () {
      return retailer_config
    },
    categories: function () {
      return category_config
    },
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  line-height: 1em;
  font-size: 1.2em;
}

</style>
