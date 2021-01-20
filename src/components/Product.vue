<template>
  <article class="product">
    <a :href="url" class="name" target="_blank">{{ name }}</a>
    <div class="line"></div>
    <div class="prices">
      <span class="price">{{ price }}</span>
      <span class="price prev-price" v-if="prevPrice">{{prevPrice}}</span>
    </div>
    <div class="discount-container">
      <div class="discount" v-if="discount">{{ discount }}</div>
    </div>
    <div class="line"></div>
    <a :href="url" class="img-link" target="_blank">
      <b-image class="main" :src="image" ratio="2by3"></b-image>
    </a>
    <footer class="product-footer">
      <!-- <div class="badge">{{ badge }}</div> -->
      <div class="last-seen">⏱ {{ lastSeen }}</div>
    </footer>
  </article>
</template>

<script>
import { timeDiffToNow } from "../../lib/time"
import _ from 'lodash'

export default {
  name: "Products",
  props: {
    data: Object,
  },
  data() {
    return {
      message: "Hello",
    }
  },
  computed: {
    // a computed getter
    name: function () {
      return this.data.name || 'product name'
    },
    price: function () {
      return _.get(this.data,'price') || 0
    },
    prevPrice: function () {
      return _.get(this.data,'prevPrice') || 0
    },
    discount: function () {
      return _.get(this.data, 'disc%')
    },
    // priceDescription: function () {
    //   return (this.data.latestPrice.priceDescription || '')
    //     .replace("Price", "")
    //     .replace("price", "")
    //     .replace("Current", "")
    //     .trim();
    // },
    url: function () {
      return this.data.url;
    },
    // badge: function () {
    //   return (this.data.latestPrice.badge || this.priceDescription).replace(
    //     "(Price Includes Saving)",
    //     ""
    //   );
    // },
    image: function () {
      return this.data.image;
    },
    lastSeen: function () {
      return timeDiffToNow(this.data.updatedAt);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.product {
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px 14px 0px #9a9a9a2b, -10px -10px 14px 0px #e2e2e221;
  border-radius: 5px;
  overflow: hidden;
  /* padding: 10px; */
  /* backdrop-filter: blur(7px); */
  background-color: #ffffff;
  color: #546e7a;
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
  text-decoration: none;
  color: #546e7a;
}
img.main {
  /* width: 100%;
  object-fit: contain; */
}
.discount-container{
  position: relative;
}
.discount{
  position: absolute;
  z-index: 10;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 0.9em;
  background-color: #ec0202;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  &::before{ content: "-"; }
  &::after{ content: "%"; }
}
.line {
  height: 1px;
  width: 100%;
  background: #d0d9e0;
  align-self: center;
}
.name {
  font-size: 0.9em;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  padding: 4px 6px;
}
.prices {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  padding: 4px 6px;
}
.prev-price {
  text-decoration: line-through;
}
footer.product-footer {
  position: relative;
}
.badge {
  position: absolute;
  bottom: 0;
  font-size: 0.9em;
  background-color: black;
  color: white;
  padding: 2px 8px;
  width: fit-content;
}
.last-seen {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(3px);
  border-radius: 5px;
  font-size: 0.8em;
  padding: 4px;
}
</style>
