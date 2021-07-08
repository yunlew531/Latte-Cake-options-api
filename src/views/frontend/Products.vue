<template>
  <section class="nav-bg"></section>
  <section class="products-nav-panel container bg-white rounded shadow-sm p-10">
    <ul class="d-flex justify-content-around list-unstyled text-center mb-0">
      <li
        v-for="category in categoryList"
        :key="category"
        class="flex-grow-1 py-3"
        :class="{ active: nowCategory === category }"
        @click="nowCategory = category"
        @mouseenter="nowHoverCategory = category"
        @mouseleave="nowHoverCategory = ''"
      >
        {{ category }}
      </li>
    </ul>
    <div class="progress position-relative">
      <div
        class="progress-bar position-absolute h-100"
        :style="handProgressBarAni"
        role="progressbar"
      ></div>
    </div>
  </section>
  <section class="container bg-white rounded shadow-sm p-10">
    <ul class="row gx-5 gy-10 list-unstyled">
      <li
        class="product-item col-3"
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
          <div class="product-content d-flex justify-content-between mt-2">
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
  <Pagination class="py-8" :pages="pagination" @handPage="handPage" />
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    Pagination,
  },
  data() {
    return {
      categoryList: ['全部', '咖啡', '蛋糕', '其他1', '其他2', '其他3'],
      nowHoverCategory: '',
      nowCategory: '',
      isTitleAniPlay: false,
      pageProductsData: {},
      pagination: {},
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
  computed: {
    handProgressBarAni() {
      const percent = 100 / this.categoryList.length;
      let position = 0;
      // 有 hover nav 時動畫停在 hover 對象，反之動畫停在 nowCategory 對象
      if (this.nowHoverCategory) {
        this.categoryList.forEach((item, idx) => {
          if (item === this.nowHoverCategory) position = idx * percent;
        });
      } else {
        this.categoryList.forEach((item, idx) => {
          if (item === this.nowCategory) position = idx * percent;
        });
      }
      return [
        { width: `${percent}%` },
        { left: `${position}%` },
        { transition: '0.3s' },
      ];
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
  },
  created() {
    this.$store.dispatch('getProducts');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/views/frontend/Products';
</style>
