<template>
  <div class="hello">
    <b>count: {{ this.$store.state.app.count }}</b>
    <button @click="increment_m()"> + </button>
    <button @click="decrement_m()"> - </button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  created() {
    console.log(this.$store.state)
  },
  methods: {
    increment_m () {
      this.$store.commit('increment')
    },
    decrement_m () {
      this.$store.commit('decrement')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
