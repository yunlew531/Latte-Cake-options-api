import { createStore } from 'vuex';
import { apiGetCarts, apiGetPageProducts } from '@/api';

export default createStore({
  state: {
    isLoading: false,
    cartsData: [],
    shopPosition: 'Taipei',
    pageProductsData: {},
    pagination: {}
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
    setPagination(state, pages) {
      state.pagination = pages;
    },
    setIsLoading(state, boolean) {
      state.isLoading = boolean;
    }
  },
  actions: {
    async getCarts({ commit }) {
      try {
        const { data } = await apiGetCarts();
        if (data.success) commit('setCarts', data.data);
      } catch (err) {
        console.dir('err');
      }
    },
    handDisplayCity({ commit }, city) {
      commit('setShopPosition', city);
    },
    async getProducts({ commit }, page) {
      try {
        const { data } = await apiGetPageProducts(page);
        if (data.success) {
          commit('setPageProductsData', data.products);
          commit('setPagination', data.pagination);
        }
        return true;
      } catch (err) {
        console.dir(err);
        return false;
      }
    },
    handIsLoading({ commit }, boolean) {
      commit('setIsLoading', boolean);
    }
  },
  modules: {},
  getters: {
    isLoading: (state) => state.isLoading,
    cartsData: (state) => state.cartsData,
    shopPosition: (state) => state.shopPosition,
    pageProductsData: (state) => state.pageProductsData,
    pagination: (state) => state.pagination
  }
});
