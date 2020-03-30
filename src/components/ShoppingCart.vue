<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.price">
        {{product.title}} - {{product.price | currency }} - {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{total  | currency }}</p>
    <button @click="checkout">
      Checkout
    </button>
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    }),
    /*products(){
      return this.$store.getters.cartProducts
    },*/
    /*total(){
      return this.$store.getters.cartTotal
    }*/
    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })
  },
  methods: {
    ...mapActions(['checkout'])
  }

}
</script>

<style>

</style>