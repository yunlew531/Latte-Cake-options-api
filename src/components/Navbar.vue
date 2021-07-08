<template>
  <header class="d-block position-absolute z-30 top-0 start-0 end-0 p-0">
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
        py-0
        z-20
      "
      :class="{ active: isScrollDown }"
    >
      <div class="container-fluid">
        <h1 class="m-0 pt-1 pb-2px">
          <router-link
            to="/home"
            class="navbar-brand d-block"
            :class="{ active: isScrollDown }"
          >
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
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link active px-5"
                aria-current="page"
                >首頁</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                to="/products"
                class="nav-link d-block px-5"
                aria-current="page"
                href="#"
                >商品</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/aboutUs" class="nav-link d-block px-5"
                >關於我們</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link d-block px-5"
                >購物車</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/checkout" class="nav-link d-block px-5"
                >結帳</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/orders" class="nav-link d-block px-5"
                >多筆訂單</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/order/123" class="nav-link d-block px-5"
                >單筆訂單</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link d-block px-5"
                >登入</router-link
              >
            </li>
          </ul>
          <button
            type="button"
            class="cart-btn lh-1 bg-transparent border-0 position-relative"
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
          <form class="d-flex position-relative ms-3">
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
              v-model="searchText"
            />
            <button
              class="search-btn btn position-absolute end-0"
              type="button"
            >
              <span class="material-icons"> search </span>
            </button>
          </form>
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
    scroll: {
      handler(scroll) {
        if (scroll.Y >= 100) this.isScrollDown = true;
        else this.isScrollDown = false;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.navbar-brand {
  width: 136px;
  height: 56px;
  background: center no-repeat;
  background-size: cover;
  background-image: url(~@/assets/images/logo_transparent_medium.png);
  .logo-icon {
    padding-bottom: $spacer * 1;
  }
  .logo-icon-text {
    bottom: $spacer * 0.25;
  }
  &.active {
    width: 117px;
    height: 48px;
    background-image: url(~@/assets/images/logo_transparent_small.png);
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
  &.active {
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
