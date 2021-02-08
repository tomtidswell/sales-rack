<template>
  <div class="filters">
    <div class="select">
      <select v-model="sorting" @change="handleSort">
        <option v-for="(opt, name) in sortOptions" :value="name" :key="name">{{opt.description}}</option>
      </select>
    </div>
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
      sorting: "default",
      filterOptions: [],
      sortOptions: {
        "default": { description: 'Recommended', set: ['score', 'desc']},
        "percent-discount": { description: 'Best discount (%)', set: ['disc%', 'desc']},
        "price-discount": { description: 'Most money off (£)', set: ['disc£', 'desc']},
        "price-asc": { description: 'Price ascending', set: ['price', 'asc']},
        "price-desc": { description: 'Price descending', set: ['disc£', 'desc']},
      }
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
      this.sorting
      this.$emit('sort', ['disc%', 'desc'])
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
