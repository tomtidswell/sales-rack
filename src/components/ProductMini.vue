<template>
  <div class="product" v-show="lastSeen !== 'Not recently'">
    <div class="discount-container">
      <div class="discount" v-if="discount">{{ discount }}</div>
    </div>
    <a :href="url" class="img-link " target="_blank">
      <img class="main image is-128x128" :src="image" />
    </a>
    <article class="details">
      <a :href="url" class="name" target="_blank">{{ name }}</a>
      <div class="prices">
        {{ price }}
        <span class="prices previous-price" v-if="prevPrice">
          {{prevPrice}}
        </span>
      </div>
      <div class="last-seen">⏱{{ lastSeen }}</div>
      <!-- <div class="badge-container" v-if="badge"> -->
        <!-- <div class="badge">{{ badge }}</div> -->
      <!-- </div> -->
    </article>
  </div>
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
      return _.get(this.data, 'name')
    },
    price: function () {
      return _.get(this.data, 'price')
    },
    discount: function () {
      return _.get(this.data, 'disc%')
    },
    priceDescription: function () {
      return (this.data.priceDescription || '')
        .replace("Price", "")
        .replace("price", "")
        .replace("Current", "")
        .trim();
    },
    prevPrice: function () {
      return _.get(this.data, 'prevPrice')
    },
    url: function () {
      return _.get(this.data, 'url')
    },
    image: function () {
      return _.get(this.data, 'image')
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
  flex-direction: row;
  box-shadow: 10px 10px 14px 0px #9a9a9a2b, -10px -10px 14px 0px #e2e2e221;
  border-radius: 5px;
  padding: 5px;
  backdrop-filter: blur(7px);
  background-color: #ffffff;
  color: #546e7a;
}
article.details{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 60%;
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
.img-link{
  flex-basis: 40%;
}
img.main {
  object-fit: contain;
}
.discount-container{
  position: relative;
}
.discount{
  position: absolute;
  z-index: 10;
  top: 5px;
  left: 5px;
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
  width: 80%;
  margin: 10px;
  background: #d0d9e0;
  align-self: center;
}
.name {
  font-size: 0.9em;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.prices {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.previous-price {
  text-decoration: line-through;
}
.badge-container {
  position: relative;
}
.badge {
  bottom: 0;
  font-size: 0.9em;
  background-color: black;
  color: white;
  padding: 2px 8px;
  width: fit-content;
}
.last-seen {
  font-size: 0.8em;
  display: flex;
  justify-content: flex-end;
}
</style>
