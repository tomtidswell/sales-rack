<template>
  <div class="hello">
    <h2>Products</h2>
    <select v-model="sorting" @change="$emit('sort', sorting)">
      <option value="relevant">Relevant</option>
      <option value="price">Price ascending</option>
    </select>
    <label>
        <input type="checkbox" id="checkbox" value="recent" v-model="filterOptions" />
        Recently seen
    </label>
    {{sorting}}
    {{filterOptions}}
  </div>
</template>

<script>
export default {
  name: "Products",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      message: "Hello",
      sorting: "",
      filterOptions: [],
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
      console.log("Product data:", this.productData);
      const res = await fetch("./products");
      this.productData = await res.json();
      console.log("Data:", this.productData);
      // const data = this.$papa.parse(csv, {download: true, delimiter: ",", newline: "", complete: function(results, file) {
      //   console.log("Parsing complete:", results, file)
      // }})
      // console.log(data)
      // this.unparsedResults = this.$papa.unparse(this.sampleData, {
      //   delimiter: ","
      // })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  padding: 0 20px;
}
</style>
