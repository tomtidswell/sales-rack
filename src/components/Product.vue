<template>
  <div class="product" v-show="lastSeen !== 'Not recently'">
    <a :href="url" class="name">{{name}}</a>
    <img class="main" :src="image" >
    <div class="prices">
        {{salePrice}}
        <span class="prices previous-price" v-if="prevPrice">{{prevPrice}}</span>
    </div>
    <div class="badge">{{badge}}</div>
    <div>⏱{{lastSeen}}</div>
  </div>
</template>

<script>
import {timeDiffToNow} from '../../lib/time'
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
    name: function () { return this.data.name },
    salePrice: function () { return this.data.sale_price },
    prevPrice: function () { return this.data.prev_price },
    url: function () { return this.data.url },
    badge: function () { return this.data.badge },
    image: function () { return this.data.main_image },
    lastSeen: function () { 
        return timeDiffToNow(this.data.updatedAt)
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
  box-shadow: 10px 10px 14px 0px #d6c2c266, -10px -10px 14px 0px #fff8f873;
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
img.main{
  width: 100%;
  object-fit: contain;
}
.prices{
        display: flex;
    align-items: center;
    justify-content: flex-end;
}
.previous-price{
    text-decoration: line-through;
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
