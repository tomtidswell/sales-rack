<template>
  <div class="filters">
    <select v-model="sorting" @change="$emit('sort', sorting)" >
      <option value="relevant">Relevant</option>
      <option value="price">Price ascending</option>
    </select>
    <label class="check-option" >
        <input type="checkbox" id="checkbox" value="recent" v-model="filterOptions" />
        Recently seen
    </label>
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
      sorting: "relevant",
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
.filters {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}
.check-option{
    display: block;
}
</style>
