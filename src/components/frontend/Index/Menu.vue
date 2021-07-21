<template>
  <section ref="menu" class="bg-info overflow-hidden">
    <div
      class="menu-panel bg-white-100 px-5 px-md-0 py-25"
      :class="{ active: playPanelAnime }"
    >
      <div class="container">
        <div
          class="
            bg-white-200
            rounded-3
            overflow-hidden
            position-relative
            px-3 px-sm-10
            pb-16
          "
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-column align-items-center flex-grow-1">
              <h3 class="text-center text-danger fs-2 fw-bold mb-5">菜單</h3>
              <ul class="d-flex justify-content-center list-unstyled">
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
            </div>
            <img src="@/assets/images/pasta.png" class="pasta-img img-fluid" />
          </div>
          <ul
            class="
              product-list
              row
              g-5 g-md-8
              align-content-start
              list-unstyled
            "
            :class="{ 'fade-in': playProductsListAnime }"
            @animationend="playProductsListAnime = false"
          >
            <li
              v-for="product in displayProducts.displayProducts"
              :key="product"
              class="product-item col-md-6"
            >
              <div class="d-flex flex-wrap align-items-center">
                <h2 class="fs-5 fw-light w-100 w-sm-auto m-0">
                  <router-link
                    :to="`/product/${product.id}`"
                    class="text-danger text-decoration-none"
                  >
                    {{ product.title }}
                  </router-link>
                </h2>
                <div class="dash-line flex-grow-1 mx-5"></div>
                <span class="fs-6"
                  >NT${{ product.price?.toLocaleString() }}</span
                >
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
              pt-2
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
          <div class="d-flex justify-content-end pt-md-10">
            <div class="d-flex justify-content-center w-100 w-md-50">
              <span class="text-primary display-1 material-icons-outlined">
                restaurant_menu
              </span>
              <h3 class="shop-name text-danger fw-bold align-self-end m-0 ps-5">
                PastaHouse
              </h3>
            </div>
          </div>
          <img
            src="@/assets/images/fork.png"
            class="fork-img img-fluid position-absolute"
          />
        </div>
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
      playPanelAnime: false,
      playProductsListAnime: false,
    };
  },
  methods: {
    setCategories() {
      const categories = this.products.map((product) => product.category);
      this.categories = ['全部', ...new Set(categories)];
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
        if (scroll.Y > 1000 && scroll.Y < 2000) this.playPanelAnime = true;
      },
      deep: true,
    },
    nowCategory() {
      this.playProductsListAnime = true;
    },
    'pages.currentPage': {
      handler() {
        this.playProductsListAnime = true;
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
@import '~bootstrap/scss/mixins';

.menu-panel {
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  transform: translateY(50%);
  .pasta-img,
  .fork-img {
    object-fit: cover;
  }
  .shop-name {
    font-family: 'Nothing You Could Do', cursive;
    font-size: 3.5rem;
  }
  .pasta-img {
    width: 200px;
    top: -20px;
    right: 0;
    transform: translateX(300px) rotate(-100deg);
  }
  .fork-img {
    transform: translateX(-600px) rotate(70deg);
    height: 500px;
    left: 80px;
    bottom: -150px;
  }
  &.active {
    transform: translateY(0%);
    .pasta-img {
      animation: translateX-pasta 0.8s 1.8s forwards;
    }
    .fork-img {
      animation: translateX-fork 0.8s 1.8s forwards;
    }
  }
  @include media-breakpoint-down(xl) {
    .fork-img {
      height: 400px;
      bottom: -100px;
    }
  }
  @include media-breakpoint-down(lg) {
    .shop-name {
      font-size: 2rem;
    }
    .pasta-img {
      width: 100px;
      top: -20px;
      right: 0;
      transform: translateX(300px) rotate(-100deg);
    }
    .fork-img {
      height: 300px;
      bottom: -50px;
    }
  }
  @include media-breakpoint-down(md) {
    .pasta-img,
    .fork-img {
      display: none;
    }
  }
}
@keyframes translateX-pasta {
  to {
    transform: translateX(0) rotate(-100deg);
  }
}
@keyframes translateX-fork {
  to {
    transform: translateX(0) rotate(70deg);
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
.product-list {
  min-height: 320px;
  &.fade-in {
    animation: fade-in 0.3s forwards;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.page-item {
  cursor: pointer;
}
</style>
