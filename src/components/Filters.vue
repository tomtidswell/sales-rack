<template>
  <div class="filters">
    <select v-model="sorting" @change="handleSort" >
      <option value="percent-discount">Best discount</option>
      <option value="price-discount">Most money off</option>
      <option value="price-asc">Price ascending</option>
      <option value="price-desc">Price descending</option>
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
      sorting: "percent-discount",
      filterOptions: [],
    };
  },
  created() {
  },
  computed: {
    csvData: function () {
      return ""; //this.$papa.parse('../../data/marksandspencer-home.csv', {delimiter: ",", newline: ""})
    },
  },
  methods: {
    handleSort() {
      switch (this.sorting) {
        case "price-discount":
          this.$emit('sort', ['activeMoneyOff', 'desc'])
          break;
        case "price-asc":
          this.$emit('sort', ['latestPrice.price', 'asc'])
          break;
        case "price-desc":
          this.$emit('sort', ['latestPrice.price', 'desc'])
          break;
        default:
          this.$emit('sort', ['activeDiscount', 'desc'])
          break;
      }
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
