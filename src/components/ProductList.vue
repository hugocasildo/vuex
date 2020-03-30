<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif." alt="">
    <ul>
      <li v-for="product in products" :key="product.title"> {{product.title}} - {{product.price  | currency }} -{{product.inventory}}

        <button @click="addProductToCart(product)">Add To Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>

import shop from '@/api/shop.js'

export default {
  data(){
    return {
      loading: false
    }
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts
      //return this.$.state.products
    }
  },
  methods:{
    addProductToCart(product){
      this.$store.dispatch('addProductToCart', product)
    }
  },
  created(){
    this.loading = true
    this.$store.dispatch('fetchProducts')
      .then(() => this.loading = false )
  }
}

</script>

<style scoped>

</style>