<template>
  <header class="d-block position-absolute z-999 top-0 start-0 end-0 p-0">
    <ul
      class="
        container
        fs-7
        list-unstyled
        fw-light
        text-white
        d-flex
        align-items-center
        w-100
        py-1
        mb-0
      "
    >
      <li class="d-flex align-items-center">
        <span class="fs-6 material-icons text-danger"> phone_iphone </span>
        <span class="ps-1">02-23164516</span>
      </li>
      <li class="d-flex align-items-center">
        <span class="fs-6 material-icons text-danger ps-5"> schedule </span>
        <span class="ps-1">每日早上8點 ~ 晚上10點</span>
      </li>
    </ul>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        shadow
        duration-200
        position-fixed
        start-0
        end-0
        px-sm-6 px-md-12
        py-2
        z-20
        overflow-hidden
      "
      :class="{ 'scroll-down': isScrollDown }"
    >
      <div class="container-fluid">
        <h1 class="lh-1 mb-0 me-auto">
          <router-link
            to="/home"
            class="navbar-brand fw-bolder text-danger d-block p-0"
            :class="{ 'scroll-down': isScrollDown }"
            >PastaHouse
          </router-link>
        </h1>
        <button
          type="button"
          class="
              cart-btn
              lh-1
              bg-transparent
              border-0
              bottom-n1
              position-relative
              d-block d-lg-none
              me-3
            "
          @click="showCartCanvas"
        >
          <span class="material-icons h-100 w-100"> shopping_cart </span>
          <span
            class="
                fs-7
                text-white
                bg-danger
                p-1
                rounded-pill
                position-absolute
                top-0
                end-0
                translate-middle-y
              "
            >{{ cartsData.carts?.length }}</span
          >
        </button>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#carouselNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ps-8" id="carouselNavbar" ref="carouselNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-for="link in navLinks" :key="link" class="nav-item">
              <router-link :to="link.url" class="narbar-link nav-link px-xl-5" aria-current="page">
                {{ link.title }}
              </router-link>
            </li>
          </ul>
          <button
            type="button"
            class="
              cart-btn
              lh-1
              bg-transparent
              border-0
              bottom-n1
              position-relative
              d-none d-lg-block
            "
            @click="showCartCanvas"
          >
            <span class="material-icons h-100 w-100"> shopping_cart </span>
            <span
              class="
                fs-7
                text-white
                bg-danger
                p-1
                rounded-pill
                position-absolute
                top-0
                end-0
                translate-middle-y
              "
              >{{ cartsData.carts?.length }}</span
            >
          </button>
          <div class="d-flex position-relative ms-lg-3">
            <input
              class="
                search-input
                form-control
                border-0 border-bottom border-2 border-white
                me-2
                ps-3
              "
              :class="{ active: isSearchFocus }"
              type="search"
              placeholder="搜尋商品"
              aria-label="Search"
              v-model.trim="searchText"
              @keyup.enter="searchProduct"
            />
            <button
              type="button"
              class="search-btn btn position-absolute end-0"
              @click="searchProduct"
            >
              <span class="material-icons"> search </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  inject: ['scroll'],
  data() {
    return {
      navLinks: [
        { title: '首頁', url: '/' },
        { title: '商品', url: '/products' },
        { title: '關於我們', url: '/aboutUs' },
        { title: '購物車', url: '/cart' },
        { title: '歷史訂單', url: '/orders' },
        { title: '登入', url: '/login' },
      ],
      cartsData: {},
      isScrollDown: false,
      searchText: '',
      isSearchFocus: false,
    };
  },
  methods: {
    showCartCanvas() {
      this.$store.dispatch('getCarts');
      this.$emitter.emit('showCartCanvas');
    },
    searchProduct() {
      window.scrollTo(0, 0);
      this.$store.dispatch('handNavSearchText', this.searchText);
      this.$router.push('/products');
    },
  },
  created() {
    this.$store.dispatch('getCarts');
    this.cartsData = this.$store.getters.cartsData;
  },
  watch: {
    searchText() {
      if (this.searchText) this.isSearchFocus = true;
      else this.isSearchFocus = false;
    },
    '$store.getters.cartsData': {
      handler(val) {
        this.cartsData = val;
      },
    },
    '$store.getters.navSearchText': {
      handler(val) {
        this.searchText = val;
      },
    },
    scroll: {
      handler(scroll) {
        if (scroll.Y >= 100) this.isScrollDown = true;
        else this.isScrollDown = false;
      },
      deep: true,
    },
    '$route.path': {
      handler(path) {
        if (path !== '/products') this.$store.dispatch('handNavSearchText', '');
        this.$refs.carouselNavbar.classList.remove('show');
      },
    },
    '$store.getters.isLogIn': {
      handler(status) {
        this.navLinks.forEach((item, key) => {
          if (status && item.url === '/login') {
            this.navLinks[key].title = '管理頁';
          } else if (!status && item.url === '/login') this.navLinks[key].title = '登入';
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.narbar-link {
  position: relative;
  &::before {
    content: '';
    width: 0;
    height: 1px;
    background: $white;
    position: absolute;
    bottom: 0;
    right: 0;
    transition: 0.3s;
  }
  &:hover {
    &::before {
      width: 100%;
      left: 0;
    }
  }
}

.navbar-brand {
  font-family: 'Nothing You Could Do', cursive;
  font-size: $h4-font-size;
  text-shadow: 0.05rem 0.05rem 0.2rem $white;
  transition: 0.3s;
  margin-top: 12px;
  &::first-letter {
    font-size: 48px;
  }
  &.scroll-down {
    font-size: $h5-font-size;
    margin-top: 6px;
    &::first-letter {
      font-size: $h2-font-size;
    }
  }
}
.navbar-nav {
  transform: translateY(-150%) rotate3d(0, 1, 0, 45deg);
  animation: navbar-nav 0.8s forwards cubic-bezier(0.17, 0.67, 0.71, 1.26);
}
@keyframes navbar-nav {
  100% {
    transform: translateY(0) rotate3d(0, 0, 0, 45deg);
  }
}
.cart-btn {
  color: $white;
  &:hover {
    color: shade-color($white, 20%);
  }
}
.navbar {
  background-color: rgba(28, 28, 28, 0.6);
  top: $spacer * 1.75;
  &.scroll-down {
    top: 0;
    background-color: rgba(28, 28, 28, 0.9);
  }
  @include media-breakpoint-down(lg) {
    background-color: rgba(28, 28, 28, 1);
    padding-bottom: 100px;
    &.scroll-down {
      background-color: rgba(28, 28, 28, 1);
    }
  }
}
.search-input {
  caret-color: $white;
  background-color: transparent;
  transition: 0.2s ease-in;
  position: relative;
  &::placeholder {
    color: $white;
  }
  &:focus {
    box-shadow: 0 0 0 $white;
    background-color: rgba(255, 255, 255, 0.5);
    &::placeholder {
      opacity: 0;
    }
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.5);
    &::placeholder {
      opacity: 0;
    }
  }
}
.search-btn {
  color: $white;
  &:hover {
    color: shade-color($white, 20%);
  }
  &:active {
    color: shade-color($white, 30%);
  }
  &:focus {
    box-shadow: 0 0 0 $white;
  }
}
</style>
