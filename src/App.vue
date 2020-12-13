<template>
  <div id="app">
    <header>SaleRack</header>
    <main>
        <Filters />
        <Products msg="Welcome to Your Vue.js App"/>
    </main>
    <footer>Shop footer</footer>
  </div>
</template>

<script>
import Products from './components/Products.vue'
import Filters from './components/Filters.vue'

export default {
  name: 'App',
  components: {
    Products, Filters
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f7e8ea;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
}
header{
  font-size: 2em;
}
main{
  flex-grow: 1;
}
</style>
