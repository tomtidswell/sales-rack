<template>
  <div class="hello">
    <h2>Products</h2>
    <div class="grid">
      <Product v-for="product in productData" :data="product" :key="product._id"/>
    </div>
  </div>
</template>

<script>
import Product from './Product.vue'

export default {
  name: 'Products',
  components: {
    Product
  },
  props: {
    msg: String
  },
  data(){
    return{
      message: 'Hello',
      productData: []
    }
  },
  created() {
      this.getData()
    },
  computed: {
    csvData: function () {
      return ''//this.$papa.parse('../../data/marksandspencer-home.csv', {delimiter: ",", newline: ""})
    }
  },
  methods: {
    async getData () {
      console.log('Product data:', this.productData)
      const res = await fetch('./products')
      this.productData = await res.json()
      console.log('Data:', this.productData)
      // const data = this.$papa.parse(csv, {download: true, delimiter: ",", newline: "", complete: function(results, file) {
      //   console.log("Parsing complete:", results, file)
      // }})
      // console.log(data)
      // this.unparsedResults = this.$papa.unparse(this.sampleData, {
      //   delimiter: ","
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px,1fr));
  grid-gap: 20px;
  padding: 0 20px;
}
</style>
