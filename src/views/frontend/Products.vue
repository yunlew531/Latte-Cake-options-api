<template>
  <div class="nav-bg"></div>
  <section class="container">
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
        <section
          class="products-panel bg-white rounded shadow-sm p-10"
          :class="{ active: isAnimeReset }"
        >
          <ul class="row gx-5 gy-10 list-unstyled">
            <li
              v-for="product in catetgoryFilter"
              :key="product.id"
              class="product-item d-flex flex-column"
              :class="isScrollDown ? 'col-4' : 'col-3'"
              @animationend="isAnimeReset = false"
            >
              <router-link
                :to="`/product/${product.id}`"
                class="
                  text-reset text-decoration-none
                  d-block
                  flex-grow-1
                  d-flex
                  flex-column
                  justify-content-between
                "
              >
                <div>
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
                    <p class="more-info-text text-white duration-500">
                      商品詳細
                    </p>
                  </div>
                  <div
                    class="product-content d-flex justify-content-between mt-2"
                  >
                    <div>
                      <h2 class="fs-5 mb-0 duration-200">
                        {{ product.title }}
                      </h2>
                      <p class="fs-7 text-black-300 m-0">
                        {{ product.description }}
                      </p>
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
                </div>
                <p class="d-flex justify-content-between m-0">
                  <span class="text-decoration-line-through"
                    >原價: NT${{ product.origin_price?.toLocaleString() }}</span
                  ><span class="fs-5"
                    >售價: NT${{ product.price.toLocaleString() }}</span
                  >
                </p>
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
  <Pagination
    class="py-8"
    :class="{ invisible: nowCategory !== '全部' }"
    :pages="pagination"
    @handPage="handPage"
  />
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
      pageProductsData: {},
      allProducts: {},
      pagination: {},
      isScrollDown: false,
      isAnimeReset: false,
    };
  },
  methods: {
    handPage(page) {
      this.$store.dispatch('getProducts', page);
    },
    hand($event) {
      console.log($event);
    },
  },
  computed: {
    catetgoryFilter() {
      let displayData = null;
      if (this.nowCategory === '全部') displayData = this.pageProductsData;
      else {
        displayData = this.allProducts.filter(
          (product) => product.category === this.nowCategory
        );
      }
      return displayData;
    },
  },
  watch: {
    nowCategory() {
      this.isAnimeReset = true;
    },
    '$store.getters.pageProductsData': {
      handler(productsData) {
        this.pageProductsData = productsData.products;
        this.pagination = productsData.pagination;
      },
    },
    '$store.getters.allProducts': {
      handler(data) {
        this.allProducts = data;
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
    this.$store.dispatch('getProducts').then(({ success }) => {
      if (success) this.isAnimeReset = true;
    });
    this.$store.dispatch('getAllProducts');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/views/frontend/Products';
</style>
