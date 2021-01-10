<template>
  <div class="filters">
    <section class="tags">
        <span class="tag is-primary is-dark is-medium" v-for="(tag, i) in searchArray" :key="i">
          {{tag}}
          <button class="delete is-small"></button>
        </span>
    </section>

    <div class="field">
      <input class="input is-medium search-box" type="text" v-model="searchString" placeholder="Find some amazing deals..." @input="search"/>
      <div class="dropdown-content search-suggestions" v-if="currentWord && currentWord.length > 1 && keyMatches.length">
        <a href="#" class="dropdown-item" v-for="match in keyMatches" :key="match">{{match}}</a>
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
      searchResponse: [],
      sorting: "percent-discount",
      filterOptions: [],
      keys: [],
    }
  },
  created() {
    this.getData()
    this.search()
  },
  computed: {
    searchArray: function () {
      return _.chain(this.searchString).split(' ').filter(v=>v!=="").value()
    },
    currentWord: function () {
      return _.chain(this.searchString).split(' ').nth(-1).value()
    },
    // queryBody: function () {
    //   return _.chain(this.searchString).split(' ').nth(-1).value()
    // },
    keyMatches: function () {
      return _.filter(this.keys, k=>{
        return _.includes(k.toLowerCase(), this.currentWord.toLowerCase())
        })
    },
  },
  methods: {
    async getData() {
      const res = await fetch("./keywords")
      this.keys = res.status === 200 ? await res.json() : []
    },
    async search() {
      const res = await fetch("./products/search", {
        method: 'PUT', // or 'PUT'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.searchArray),
      })
      this.searchResponse = res.status === 200 ? await res.json() : []
      this.$emit('newResults', this.searchResponse)
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
}
.tags {
  position: absolute;
  top: -40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 10px;
}
.field{
  position: relative;
}
.search-box{
    border-radius: 0;
    border: 0;
    border-bottom: 3px solid #d82e4c;
    background: #ffffffa1;
    outline: 0;
    color: #ff6f88;
}
.search-suggestions{
  margin: 0 25px;
  position: absolute;
  z-index: 10;
  width: -webkit-fill-available;
}
.check-option {
  display: block;
}
</style>
