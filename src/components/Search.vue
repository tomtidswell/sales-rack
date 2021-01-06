<template>
  <div class="filters">
    <section class="section">
      <div class="tags">
        <span class="tag is-primary is-dark is-medium" v-for="(tag, i) in searchArray" :key="i">
          {{tag}}
          <button class="delete is-small"></button>
        </span>
      </div>
    </section>

    <div class="field">
      <input class="input is-rounded is-medium" type="text" v-model="searchString" placeholder="Find some amazing deals..."/>
      <div class="dropdown-content search-suggestions" v-if="currentWord && currentWord.length > 2">
        <a href="#" class="dropdown-item">{{currentWord}}</a>
        <a href="#" class="dropdown-item">Keyword matches</a>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "Products",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      searchString: "",
      sorting: "percent-discount",
      filterOptions: [],
    };
  },
  created() {},
  computed: {
    searchArray: function () {
      return _.chain(this.searchString).split(' ').filter(v=>v!=="").value()
    },
    currentWord: function () {
      return _.chain(this.searchString).split(' ').nth(-1).value()
    },
  },
  methods: {
    handleSort() {},
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
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
}
.tags {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 5px;
}
.search-suggestions{
  margin: 0 25px;
}
.check-option {
  display: block;
}
</style>
