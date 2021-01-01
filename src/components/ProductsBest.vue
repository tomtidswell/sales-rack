<template>
  <section class="products">
      <div class="section">
        <div class="columns">
        <div class="column">
            <div class="subtitle">
                Browse our best deals
            </div>
        </div>
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
import Product from "./Product.vue"

export default {
  name: "ProductsBest",
  components: {
    Product,
  },
  props: {
    retailer: String,
  },
  data() {
    return {
      message: "Hello",
      productData: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    csvData: function () {
      return ""; //this.$papa.parse('../../data/marksandspencer-home.csv', {delimiter: ",", newline: ""})
    },
  },
  methods: {
    async getData() {
      const res = await fetch("./products")
      console.log("Endpoint response:", res)
      this.productData = res.status === 200 ? await res.json() : []
      console.log("Data:", this.productData)
    },
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
