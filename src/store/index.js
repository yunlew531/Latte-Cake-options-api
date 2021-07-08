import { createStore } from 'vuex';
import { apiGetCarts, apiGetPageProducts, apiGetOrders } from '@/api';

export default createStore({
  state: {
    isLoading: false,
    cartsData: [],
    shopPosition: 'Taipei',
    pageProductsData: {},
    backstageOrders: {}
  },
  mutations: {
    setCarts(state, data) {
      state.cartsData = data;
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
    handDisplayCity({ commit }, city) {
      commit('setShopPosition', city);
    },
    async getProducts({ commit }, page) {
      try {
        const { data } = await apiGetPageProducts(page);
        if (data.success) {
          commit('setPageProductsData', data);
        }
        return true;
      } catch (err) {
        console.dir(err);
        return false;
      }
    },
    handIsLoading({ commit }, boolean) {
      commit('setIsLoading', boolean);
    },
    async getBackstageOrders({ commit }) {
      try {
        const { data } = await apiGetOrders();
        if (data.success) {
          commit('setBackstageOrders', data.orders);
          return data;
        }
        return false;
      } catch (err) {
        console.dir(err);
        return false;
      }
    }
  },
  modules: {},
  getters: {
    isLoading: (state) => state.isLoading,
    cartsData: (state) => state.cartsData,
    shopPosition: (state) => state.shopPosition,
    pageProductsData: (state) => state.pageProductsData,
    backstageOrders: (state) => state.backstageOrders
  }
});
