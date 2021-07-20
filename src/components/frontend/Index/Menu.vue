<template>
  <section ref="menu" class="bg-info overflow-hidden">
    <div
      class="menu-panel bg-white-100 px-5 px-md-0 py-25"
      :class="{ active: playAnime }"
      @transitionend="playProductScale = true"
    >
      <div class="container">
        <h3 class="text-center text-danger fs-2 fw-bold m-0">菜單</h3>
        <ul class="d-flex justify-content-center list-unstyled py-5">
          <li
            v-for="(category, key) in categories"
            :key="`category${key}`"
            class="category-item px-2 px-sm-5"
            :class="{ active: nowCategory === category }"
            @click="(nowCategory = category), (pages.currentPage = 1)"
          >
            {{ category }}
          </li>
        </ul>
        <ul class="row g-5 g-md-8 list-unstyled">
          <li
            v-for="(product, key) in displayProducts.displayProducts"
            :key="product"
            class="product-item col-md-6"
            :class="{ show: playProductScale }"
            @animationend="removeAnime(key)"
          >
            <div class="d-flex align-items-center">
              <h2 class="fs-5 fw-light m-0">
                <router-link
                  :to="`/product/${product.id}`"
                  class="text-danger text-decoration-none"
                >
                  {{ product.title }}
                </router-link>
              </h2>
              <div class="dash-line flex-grow-1 mx-5"></div>
              <span class="fs-6">NT${{ product.price?.toLocaleString() }}</span>
            </div>
            <p class="fs-6 text-black-300 fw-light m-0">
              {{ product.description }}
            </p>
          </li>
        </ul>
        <ul
          class="
            page-item
            d-flex
            justify-content-center
            align-items-end
            list-unstyled
          "
        >
          <li
            v-for="page in pages.totalPage"
            :key="page"
            class="fs-5 lh-1 ps-5"
            :class="{ 'text-danger fs-4': page === pages.currentPage }"
            @click="pages.currentPage = page"
          >
            {{ page }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  inject: ['scroll'],
  emits: {
    handStatus: (status) => typeof status.status === 'boolean',
  },
  data() {
    return {
      products: [],
      categories: [],
      nowCategory: '全部',
      pages: {
        currentPage: 1,
        totalPage: 1,
      },
      playAnime: false,
      playProductScale: false,
    };
  },
  methods: {
    setCategories() {
      const categories = this.products.map((product) => product.category);
      this.categories = ['全部', ...new Set(categories)];
    },
    removeAnime(key) {
      if (key === 0) {
        this.playProductScale = false;
      }
    },
  },
  computed: {
    displayProducts() {
      let filterProducts = null;
      let displayProducts = null;
      if (this.nowCategory === '全部') filterProducts = this.products;
      else {
        filterProducts = this.products.filter(
          (product) => product.category === this.nowCategory
        );
      }
      displayProducts = filterProducts.filter(
        (product, key) =>
          key >= (this.pages.currentPage - 1) * 8 &&
          key <= this.pages.currentPage * 8 - 1
      );
      return { filterProducts, displayProducts };
    },
  },
  watch: {
    '$store.getters.allProducts': {
      handler(products) {
        this.products = products;
        this.setCategories();
        this.$emit('handStatus', { title: 'isMenuRes', status: true });
      },
    },
    'displayProducts.filterProducts': {
      handler(products) {
        this.pages.totalPage = Math.floor(products.length / 8) + 1;
      },
    },
    scroll: {
      handler(scroll) {
        if (scroll.Y > 1000 && scroll.Y < 2000) this.playAnime = true;
      },
      deep: true,
    },
    nowCategory() {
      this.playProductScale = true;
    },
    'pages.currentPage': {
      handler() {
        this.playProductScale = true;
      },
    },
  },
  created() {
    this.$store.dispatch('getAllProducts');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.menu-panel {
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  transform: translateY(50%);
  &.active {
    transform: translateY(0%);
  }
}
.dash-line {
  height: 1px;
  border: 1px dashed rgba($black-300, 0.3);
}
.category-item {
  cursor: pointer;
  padding: 4px 20px;
  color: $white;
  background: $danger;
  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }
  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }
  &.active {
    background: $primary;
    font-weight: bold;
  }
}
.product-item {
  &.show {
    animation: scale 0.3s forwards;
  }
}
@keyframes scale {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.page-item {
  cursor: pointer;
}
</style>
