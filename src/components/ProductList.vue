<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif." alt="">
    <ul>
      <li v-for="product in products" :key="product.title"> {{product.title}} - {{product.price  | currency }} -{{product.inventory}}

        <button
        :disabled="!productIsInStock(product)"
        @click="addProductToCart(product)">
        Add To Cart
        </button>
        <!--<button
        :disabled="!product.inventory > 0"
        @click="addProductToCart(product)">
        Add To Cart
        </button>-->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      loading: false,
      productIndex: 1
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.items
    }),




    ...mapGetters({
      productIsInStock: 'productIsInStock'
    }),

  },
  methods:{
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart',
    }),

    addProductToCart(product){
      this.$store.dispatch('addProductToCart', product)
    }
  },
  created(){
    this.loading = true
    this.fetchProducts()
    //this.$store.dispatch('fetchProducts')
      .then(() => this.loading = false )
  }
}

</script>

<style scoped>

</style>