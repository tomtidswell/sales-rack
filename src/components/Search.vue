<template>
  <div class="filters">
    <section class="tags">
        <span class="tag is-primary is-dark is-medium" v-for="(tag, i) in searchArray" :key="i">
          {{tag}}
          <button class="delete is-small"></button>
        </span>
    </section>

    <div class="field search-field">
      <div class="icon">O</div>
      <input class="input is-medium search-box" type="text" v-model="searchString" placeholder="Find some amazing deals..." 
             @input.prevent="debouncedSearch()" @focus="searchFocusHandler" @blur="searchFocusHandler"/>
      <div class="dropdown-content search-suggestions" v-if="currentWord && currentWord.length > 1 && keyMatches.length">
        <a href="#" class="dropdown-item" v-for="match in keyMatches" :key="match">{{match}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'


export default {
  name: "Search",
  components: {},
  props: {
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
    // this.search()
    this.debouncedSearch = _.debounce(this.search.bind(this), 300)
  },
  computed: {
    searchArray: function () {
      return _.chain(this.searchString).split(' ').filter(v=>v!=="").value()
    },
    currentWord: function () {
      return _.chain(this.searchString).split(' ').nth(-1).value()
    },
    keyMatches: function () {
      return _.filter(this.keys, k=>{
        return _.includes(k.toLowerCase(), this.currentWord.toLowerCase())
        })
    },
  },
  methods: {
    searchFocusHandler({type}){
      this.$emit('focussed', type==='focus' || this.searchString)
    },
    async getData() {
      const res = await fetch("./keywords")
      this.keys = res.status === 200 ? await res.json() : []
    },
    async search() {
      if(this.searchString === "") this.$emit('newResults', [])
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
<style lang="scss" scoped>
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
.field.search-field{
  position: relative;
  .icon{
    position: absolute;
    height: 100%;
    left: -30px;
  }
}
.search-box{
    border-radius: 0;
    border: 0;
    border-color: white;
    border-bottom: 3px solid white;
    background: transparent;
    outline: 0;
    color: white;
    box-shadow: none;
    &::placeholder{
      color: white;
    }
    &:active,
    &:focus,
    &:hover{
      border-color: white;
      box-shadow: none;
    }
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
