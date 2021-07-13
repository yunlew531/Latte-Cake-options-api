<template>
  <div class="immediate-order-panel bg-info" :class="{ active: playAnime }">
    <div class="container position-relative py-8 py-md-16 mt-50">
      <img
        class="
          spaggetti-img
          img-fluid
          position-absolute
          ms-xl-50
          start-0
          bottom-0
        "
        src="@/assets/images/photo-spaggetti.png"
        alt="cake"
      />
      <div class="overflow-hidden text-end px-xl-50 ps-50">
        <router-link
          to="/products"
          class="
            products-page-link
            border-2
            btn btn-danger
            text-decoration-none
            px-6 px-sm-12
            overflow-hidden
          "
        >
          <span class="position-absolute start-50 top-50 translate-middle w-100"
            >立即點餐</span
          >
          <span class="opacity-0">立即點餐</span></router-link
        >
        <p
          class="
            paragraph
            d-flex
            flex-wrap
            align-items-center
            justify-content-end
            text-white
            fs-2
            tracking-3
            mt-5
            mb-0
          "
        >
          <span class="text-danger fs-5">餓了嗎?</span>
          <span class="ms-5">立即享用餐點</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['scroll'],
  data() {
    return {
      playAnime: false,
    };
  },
  watch: {
    scroll: {
      handler(scroll) {
        if (scroll.Y > 1680 && scroll.Y < 2580) this.playAnime = true;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/mixins';
@import '~@/assets/styleSheets/custom/variables';

.immediate-order-panel {
  &.active {
    .spaggetti-img {
      animation: rotate 3s forwards;
    }
    .products-page-link,
    .paragraph {
      transform: translateY(0);
    }
  }
}

.spaggetti-img {
  transform: translateX(-200%) rotate(-180deg);
  width: 400px;
}
@keyframes rotate {
  to {
    transform: translateX(0) rotate(0);
  }
}
@include media-breakpoint-down(md) {
  .spaggetti-img {
    width: 200px;
  }
}

.products-page-link {
  font-size: $h3-font-size;
  color: $white;
  position: relative;
  transition: 0.7s 3s;
  transform: translateY(230%) rotate3d(0, 1, 0, 90deg);
  &::before {
    content: '';
    position: absolute;
    top: -105%;
    left: 0;
    width: 100%;
    border-radius: $border-radius;
    height: 100%;
    background: $info;
    transition: 0.2s ease-in-out;
  }
  &:hover {
    color: shade-color($white, 10%);
    &::before {
      top: 0;
    }
  }
}
@include media-breakpoint-down(sm) {
  .products-page-link {
    font-size: $h5-font-size;
  }
}
.paragraph {
  transform: translateY(100%) rotate3d(0, 1, 0, 90deg);
  transition: 0.5s 3.5s;
}
</style>
