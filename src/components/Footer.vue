<template>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>SaleRack</strong> by <a href="">Tom Tidswell</a>
    </p>
  </div>
</footer>
</template>

<script>

export default {
  name: "Navigation",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      var1: null,
    }
  },
  created() {
    
  },
  computed: {
    retailers: function () {
      return ""
    },
  },
  methods: {
    method1() {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
  line-height: 1em;
  font-size: 1.2em;
}

</style>
