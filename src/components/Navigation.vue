<template>
  <b-navbar :mobile-burger="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <header>SaleRack</header>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item @click="homeClick()"> Best deals </b-navbar-item>
      <b-navbar-dropdown label="Categories" collapsible>
        <b-navbar-item tag="router-link" :to="{ path: `/category/Homeware`}"> Homeware </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: `/category/Tableware`}"> Tableware </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: `/category/Lighting`}"> Lighting </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: `/category/Furniture`}"> Furniture </b-navbar-item>
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
      console.log(retailer_config)
      return retailer_config
    },
  },
  methods: {
    shopClick(e) {
        this.$emit('category', null)
        this.$emit('shop', e)
        this.$emit('admin', null)
    },
    categoryClick(e) {
        this.$emit('category', e)
        this.$emit('shop', null)
        this.$emit('admin', null)
    },
    homeClick() {
        this.$emit('category', null)
        this.$emit('shop', null)
        this.$emit('admin', null)
    },
    adminClick(e) {
        this.$emit('category', null)
        this.$emit('shop', null)
        this.$emit('admin', e)
    },
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
