import { createStore } from 'vuex'
import ProductService from '@/services/ProductService.js';

export default createStore({
  state: {
    isLoading: false,
    products: [],
    product: {}
  },
  getters: {
      getProductById: state => id => {
        return state.products.find(product => product.id === id);
    }
  },
  mutations: {
    SET_PRODUCT(state, payload) {
    state.product = payload;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    SET_LOADING_STATUS(state) {
      state.isLoading = !state.isLoading;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    REMOVE_PRODUCT(state, id) {
      state.products = state.products.filter(product => product.id != id);
    }
  },
  actions: {
    addProduct({commit}, newProduct) {
      return ProductService.insertProduct(newProduct)
        .then(() => {
          commit('ADD_PRODUCT', newProduct);
        })
    },
    deleteProduct({ commit }, product) {
      return ProductService.deleteProduct(product).then(() => {
        commit("REMOVE_PRODUCT", product.id);
      });
    },
    fetchProduct({commit,getters}, id) {
      let p = getters.getProductById(id);
      if(p == null) {
        ProductService.getProduct(id)
          .then(response => {
            commit('SET_PRODUCT', response.data);
          })
      } else {
        commit('SET_PRODUCT', p);
      }
    },
    fetchProducts({commit}) {
      commit('SET_LOADING_STATUS');
      return ProductService.getProducts()
        .then(response => {
          commit('SET_PRODUCTS', response.data);
        })
        .finally(() => commit('SET_LOADING_STATUS'));
    }
  },
  modules: {
  }
})
