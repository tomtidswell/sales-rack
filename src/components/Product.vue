<template>
  <div class="product">
    <a :href="url" class="name">{{name}}</a>
    <div class="prices">{{prices}}</div>
    <div class="badge">{{badge}}</div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {
    data: Object
  },
  data(){
    return{
      message: 'Hello'
    }
  },
  computed: {
    // a computed getter
    name: function () {
      // `this` points to the vm instance
      return this.data.name
    },
    prices: function () {
      return this.data.prices.join(' ')//.replace('Previous price', "")
    },
    url: function () {
      return this.data.url
    },
    badge: function () {
      return this.data.badge
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product{
  position:relative;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px 14px 0px #d6c2c266, -10px -10px 14px 0px #fff8f8bd;
  border-radius: 10px;
  padding: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.badge{
  background-color: red;
  position: absolute;
  color: white;
  padding: 2px 8px;
  bottom: 5px;
  left: 5px;
}
</style>
