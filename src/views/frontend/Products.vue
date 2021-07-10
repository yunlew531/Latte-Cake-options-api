<template>
  <section class="nav-bg"></section>
  <div class="container">
    <div
      id="navbarTeleportTop"
      class="teleport-container-top duration-500 mb-8"
      :class="isScrollDown ? 'w-0' : 'w-100'"
    ></div>
    <div class="row">
      <CategoryNav
        v-model:nowCategory="nowCategory"
        :isScrollDown="isScrollDown"
      />
      <div
        id="navbarTeleportAside"
        class="teleport-container-aside duration-500"
        :class="isScrollDown ? 'col-2' : 'w-0'"
      ></div>
      <div
        class="products-panel-container duration-500"
        :class="isScrollDown ? 'col-10' : 'col-12'"
      >
        <section class="products-panel bg-white rounded shadow-sm p-10">
          <ul class="row gx-5 gy-10 list-unstyled">
            <li
              class="product-item"
              :class="isScrollDown ? 'col-4' : 'col-3'"
              v-for="product in pageProductsData"
              :key="product.id"
            >
              <router-link
                :to="`/product/${product.id}`"
                class="text-reset text-decoration-none d-block"
              >
                <div
                  class="
                    product-img
                    rounded
                    duration-200
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  :style="{ 'background-image': `url(${product.imageUrl})` }"
                >
                  <p class="more-info-text text-white duration-500">商品詳細</p>
                </div>
                <div
                  class="product-content d-flex justify-content-between mt-2"
                >
                  <div>
                    <h2 class="fs-5 mb-0 duration-200">{{ product.title }}</h2>
                    <p class="fs-7 text-black-300 m-0">草莓、白酒</p>
                  </div>
                  <span
                    class="
                      text-danger text-nowrap
                      align-self-start
                      border border-danger
                      px-1
                    "
                    >熱銷商品</span
                  >
                </div>
                <p class="d-flex justify-content-between m-0">
                  <span class="text-decoration-line-through"
                    >原價: NT${{ product.origin_price }}</span
                  ><span class="fs-5">售價: NT${{ product.price }}</span>
                </p>
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
  <Pagination class="py-8" :pages="pagination" @handPage="handPage" />
</template>

<script>
import CategoryNav from '@/components/frontend/Products/CategoryNav.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    CategoryNav,
    Pagination,
  },
  inject: ['scroll'],
  data() {
    return {
      nowCategory: '全部',
      isTitleAniPlay: false,
      pageProductsData: {},
      pagination: {},
      isScrollDown: false,
    };
  },
  methods: {
    handTitleAni(action) {
      if (action === 'removeClass') this.isTitleAniPlay = false;
      else this.isTitleAniPlay = true;
    },
    handPage(page) {
      this.$store.dispatch('getProducts', page);
    },
  },
  watch: {
    nowCategory() {
      this.handTitleAni();
    },
    '$store.getters.pageProductsData': {
      handler(productsData) {
        this.pageProductsData = productsData.products;
        this.pagination = productsData.pagination;
      },
    },
    scroll: {
      handler(scroll) {
        if (scroll.Y > 180) this.isScrollDown = true;
        else this.isScrollDown = false;
      },
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/views/frontend/Products';
</style>
