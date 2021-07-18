<template>
  <header class="d-block position-absolute z-999 top-0 start-0 end-0 p-0">
    <p
      class="
        container
        fs-7
        fw-light
        text-white
        d-flex
        align-items-center
        w-100
        py-1
        mb-0
      "
    >
      <span class="fs-6 material-icons text-danger"> phone_iphone </span
      ><span class="ps-1">02-23164516</span>
      <span class="fs-6 material-icons text-danger ps-5"> schedule </span>
      <span class="ps-1">每日早上8點 ~ 晚上10點</span>
    </p>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        shadow
        duration-200
        position-fixed
        start-0
        end-0
        px-12
        py-2
        z-20
        overflow-hidden
      "
      :class="{ 'scroll-down': isScrollDown }"
    >
      <div class="container-fluid">
        <h1 class="m-0 lh-1">
          <router-link
            to="/home"
            class="navbar-brand fw-bolder text-danger d-block p-0"
            :class="{ 'scroll-down': isScrollDown }"
            >PastaHouse
          </router-link>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#carouselNabar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ps-8" id="carouselNabar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <router-link
                to="/"
                class="nav-link active px-5"
                aria-current="page"
                >首頁</router-link
              >
            </li>
            <li>
              <router-link
                to="/products"
                class="nav-link d-block px-5"
                aria-current="page"
                href="#"
                >商品</router-link
              >
            </li>
            <li>
              <router-link to="/aboutUs" class="nav-link d-block px-5"
                >關於我們</router-link
              >
            </li>
            <li>
              <router-link to="/cart" class="nav-link d-block px-5"
                >購物車</router-link
              >
            </li>
            <li></li>
            <li>
              <router-link to="/admin" class="nav-link d-block px-5"
                >登入</router-link
              >
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
          <div class="d-flex position-relative ms-3">
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
              class="search-btn btn position-absolute end-0"
              type="button"
              @click="searchProduct"
            >
              <span class="material-icons"> search </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <slot name="content"></slot>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  inject: ['scroll'],
  data() {
    return {
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
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

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
