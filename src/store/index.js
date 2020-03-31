import Vue from "vue";
import Vuex from "vuex";
//import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex);

export default new Vuex.Store ({
  modules: {
    cart,
    products
  },
  // Igual a ComputedProperties
  getters: {

  },

  // Diferencia entre actions y mutatios
  //
  //Igual a metodos
  //actions,
  //Responsable de setear la información
  //Responsables para simples cambios
  mutations: {

  }
});
