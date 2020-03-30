import shop from '@/api/shop';

export default {
  fetchProducts({
    commit
  }) {
    return new Promise((resolve, reject) => {
      shop.getProducts(products => {
        commit('setProducts', products);
        resolve();
      });

    });
    //fetchProducts(context){
    //make the call
    //run setProducts mutation
  },

  addProductToCart({
    state,
    getters,
    commit
  }, product) {
    if (getters.productIsInStock(product) > 0) {
      const cartItem = state.cart.find(item => item.id === product.id)
      //fin cartitem
      if (!cartItem) {
        commit('pushProductToCart', product.id)
        //pushprodcuttoCart
      } else {
        commit('incrementItemQuantity', cartItem)
        //incrementItemQuantity
      }
      commit('decrementProductInventory', product)
    }
  },

  checkout({
    state,
    commit
  }) {
    // se va a usar state y commit en lugar de context

    shop.buyProducts(
      state.cart,
      () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      },
      () => {
        commit('setCheckoutStatus', 'fail')
      }
    )

  }
}