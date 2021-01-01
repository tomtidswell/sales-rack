<template>
  <b-navbar :mobile-burger="true">
    <template slot="brand">
      <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }"> -->
      <b-navbar-item @click="homeClick()">
        <header>SaleRack</header>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item @click="homeClick()"> Best deals </b-navbar-item>
      <b-navbar-dropdown label="Categories" collapsible>
        <b-navbar-item @click="categoryClick('Homeware')"> Homeware </b-navbar-item>
        <b-navbar-item @click="categoryClick('Lighting')"> Lighting </b-navbar-item>
        <b-navbar-item @click="categoryClick('Furniture')">
          Furniture
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Shops" collapsible>
        <b-navbar-item @click="shopClick('M&S')"> M&S </b-navbar-item>
        <b-navbar-item @click="shopClick('John Lewis')"> John Lewis </b-navbar-item>
        <b-navbar-item @click="shopClick('Next')"> Next </b-navbar-item>
        <b-navbar-item @click="shopClick('Matalan')"> Matalan </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Questions?" collapsible>
        <b-navbar-item href="#"> About </b-navbar-item>
        <b-navbar-item href="#"> Contact </b-navbar-item>
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
    csvData: function () {
      return ""; //this.$papa.parse('../../data/marksandspencer-home.csv', {delimiter: ",", newline: ""})
    },
  },
  methods: {
    shopClick(e) {
        this.$emit('category', null)
        this.$emit('shop', e)
    },
    categoryClick(e) {
        this.$emit('category', e)
        this.$emit('shop', null)
    },
    homeClick() {
        this.$emit('category', null)
        this.$emit('shop', null)
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
