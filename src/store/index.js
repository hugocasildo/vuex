import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  //data
  state: {
    products:[],
    //{id, quantity}
    cart:[],
    checkoutStatus: null
  },

  // Igual a ComputedProperties
  getters: {
    availableProducts(state, getters){
      return state.products.filter(product => product.inventory > 0);
    },
    cartProducts(state){
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        {
          return {
            title: product.title,
            price: product.price,
            quantity: cartItem.quantity
          }
        }
      })
    },
    cartTotal(state, getters){
      /*let total = 0
      getters.cartProducts.forEach(product => {
        total += product.price * product.quantity
      })
      return total;*/
      return getters.cartProducts.reduce( (total, product) => total + product.price * product.quantity, 0)
    }
  },

  // Diferencia entre actions y mutatios
  //
  //Igual a metodos
  actions: {
    fetchProducts({commit}){
      return new Promise((resolve, reject) => {
        shop.getProducts( products => {
          commit('setProducts', products);
          resolve();
        });

      });
    //fetchProducts(context){
      //make the call
      //run setProducts mutation
    },
    /*addToCar(context, product){
      if (product.inventory > 0){
        context.commit('pushProductToCart', product);
      }else{

      }
    }*/

    addProductToCart(context, product){
      if (product.inventory > 0){
        const cartItem = context.state.cart.find(item => item.id === product.id )
        //fin cartitem
        if (!cartItem){
          context.commit('pushProductToCart', product.id)
          //pushprodcuttoCart
        } else{
          context.commit('incrementItemQuantity',  cartItem)
          //incrementItemQuantity
        }
        context.commit('decrementProductInventory', product)
      }
    },
    checkout({state, commit}) {
    // se va a usar state y commit en lugar de context
    //checkout(context){

      shop.buyProducts(
        state.cart,
        //context.state.cart,
        () => {
          commit('emptyCart')
          //context.commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )

    }
  },
  //Responsable de setear la información
  //Responsables para simples cambios
  mutations: {
    setProducts( state, products){
      // update products
      state.products = products;
    },
    pushProductToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cartItem){
      cartItem.quantity++
    },
    decrementProductInventory(state, product){
      product.inventory--
    },
    setCheckoutStatus(state, status){
      state.checkoutStatus = status
    },
    emptyCart( state ){
      state.cart=[]
    }
  },
  modules: {}
});
