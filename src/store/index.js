import { createStore } from 'vuex';
import {
  apiGetCarts, apiGetPageProducts, apiGetOrders, apiGetAllProducts,
} from '@/api';
import { useToast } from '@/methods';

export default createStore({
  state: {
    isLogIn: false,
    isLoading: false,
    cartsData: [],
    shopPosition: 'Taipei',
    pageProductsData: [],
    allProducts: [],
    backstageOrders: {},
    navSearchText: '',
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
    },
    setNavSearchText(state, text) {
      state.navSearchText = text;
    },
  },
  actions: {
    async getCarts({ commit }) {
      try {
        const { data } = await apiGetCarts();
        if (data.success) commit('setCarts', data.data);
        else useToast('無法取得購物車!', 'danger');
      } catch (err) {
        useToast('無法取得購物車!', 'danger');
      }
    },
    async getProducts({ commit }, page) {
      let data = null;
      try {
        ({ data } = await apiGetPageProducts(page));
        if (data.success) commit('setPageProductsData', data);
      } catch (err) {
        data = err;
      }
      return data;
    },
    async getAllProducts({ commit }) {
      let data = null;
      try {
        ({ data } = await apiGetAllProducts());
        if (data.success) commit('setAllProducts', data.products);
      } catch (err) {
        data = err;
      }
      return data;
    },
    async getBackstageOrders({ commit }, page) {
      let data = null;
      try {
        ({ data } = await apiGetOrders(page));
        if (data.success) {
          commit('setBackstageOrders', data);
        }
      } catch (err) {
        data = err;
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
    },
    handNavSearchText({ commit }, text) {
      commit('setNavSearchText', text);
    },
  },
  modules: {},
  getters: {
    isLoading: (state) => state.isLoading,
    cartsData: (state) => state.cartsData,
    shopPosition: (state) => state.shopPosition,
    pageProductsData: (state) => state.pageProductsData,
    backstageOrders: (state) => state.backstageOrders,
    allProducts: (state) => state.allProducts,
    isLogIn: (state) => state.isLogIn,
    navSearchText: (state) => state.navSearchText,
  },
});
