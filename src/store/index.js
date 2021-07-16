import { createStore } from 'vuex';
import { apiGetCarts, apiGetPageProducts, apiGetOrders, apiGetAllProducts } from '@/api';

export default createStore({
  state: {
    isLogIn: false,
    isLoading: false,
    cartsData: [],
    shopPosition: 'Taipei',
    pageProductsData: [],
    allProducts: [],
    backstageOrders: []
  },
  mutations: {
    setCarts(state, payload) {
      state.cartsData = payload;
    },
    setShopPosition(state, city) {
      state.shopPosition = city;
    },
    setPageProductsData(state, products) {
      state.pageProductsData = products;
    },
    setIsLoading(state, boolean) {
      state.isLoading = boolean;
    },
    setBackstageOrders(state, orders) {
      state.backstageOrders = orders;
    },
    setAllProducts(state, products) {
      state.allProducts = products;
    },
    setLogInStatus(state, status) {
      state.isLogIn = status;
    }
  },
  actions: {
    async getCarts({ commit }) {
      try {
        const { data } = await apiGetCarts();
        if (data.success) commit('setCarts', data.data);
      } catch (err) {
        console.dir(err);
      }
    },
    async getProducts({ commit }, page) {
      let data = null;
      try {
        ({ data } = await apiGetPageProducts(page));
        if (data.success) commit('setPageProductsData', data);
      } catch (err) {
        console.dir(err);
      }
      return data;
    },
    async getAllProducts({ commit }) {
      try {
        const { data } = await apiGetAllProducts();
        if (data.success) commit('setAllProducts', data.products);
      } catch (err) {
        console.dir(err);
      }
    },
    async getBackstageOrders({ commit }) {
      let data = null;
      try {
        ({ data } = await apiGetOrders());
        if (data.success) {
          commit('setBackstageOrders', data.orders);
        }
      } catch (err) {
        console.dir(err);
      }
      return data;
    },
    handDisplayCity({ commit }, city) {
      commit('setShopPosition', city);
    },
    handIsLoading({ commit }, boolean) {
      commit('setIsLoading', boolean);
    },
    handLogInStatus({ commit }, status) {
      commit('setLogInStatus', status);
    }
  },
  modules: {},
  getters: {
    isLoading: (state) => state.isLoading,
    cartsData: (state) => state.cartsData,
    shopPosition: (state) => state.shopPosition,
    pageProductsData: (state) => state.pageProductsData,
    backstageOrders: (state) => state.backstageOrders,
    allProducts: (state) => state.allProducts,
    isLogIn: (state) => state.isLogIn
  }
});
