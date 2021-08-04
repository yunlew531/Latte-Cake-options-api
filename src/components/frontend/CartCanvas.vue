<template>
  <section
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="cartCanvasDom"
    id="cartCanvas"
    data-bs-backdrop="false"
    data-bs-scroll="true"
    aria-labelledby="cartCanvasLabel"
    @click="isNowProgressAnimePlay = false"
  >
    <div class="offcanvas-header">
      <h4 id="cartCanvasLabel">購物車</h4>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div class="px-4 m-0 d-flex align-items-center">
      <span class="me-auto" :class="{ invisible: !cartsData.carts?.length }">
        {{ cartsData.carts?.length }} 個品項
      </span>
      <Button class="py-1" @click="goToPage('cart')">詳細購物車</Button>
    </div>
    <div class="px-4 py-3 border-bottom">
      <div
        class="progress"
        :class="{ active: isNowProgressAnimePlay }"
        v-show="isNowProgressAnimePlay"
      >
        <div class="progress-bar" role="progressbar"></div>
      </div>
    </div>
    <div
      v-if="!cartsData.carts?.length"
      class="offcanvas-body d-flex flex-column justify-content-center align-items-center"
    >
      <h3>購物車沒有餐點!</h3>
      <router-link to="/products">
        <Button class="py-1">立即前往購物</Button>
      </router-link>
    </div>
    <ul v-else class="offcanvas-body list-unstyled mb-0">
      <li
        class="product-item border border-black-300 mb-3"
        v-for="product in cartsData.carts"
        :key="product.id"
      >
        <div>
          <div class="d-flex">
            <div
              class="product-img"
              :style="{
                'background-image': `url(${product.product.imageUrl ||
                  product.product.imagesUrl[0]})`,
              }"
            ></div>
            <div class="p-3 flex-grow-1">
              <h3 class="product-title fs-6" @click="goToPage('product', product.product.id)">
                {{ product.product.title }}
              </h3>
              <div class="d-flex">
                <span class="flex-grow-1"> NT$ {{ product.product.price?.toLocaleString() }} </span>
                <span>x {{ product.qty }} 個</span>
              </div>
              <div class="d-flex">
                <span class="ms-auto"
                  >NT$
                  {{ (product.qty * product.product.price)?.toLocaleString() }}
                  元</span
                >
              </div>
              <div class="d-flex align-items-center mt-1">
                <div class="d-flex align-items-center position-relative me-auto">
                  <span class="qty-btn material-icons" @click="handQty(product, -1)">
                    remove
                  </span>
                  <span
                    class="
                      text-black-100
                      d-block
                      border border-black-300
                      rounded
                      px-5
                    "
                    >{{ product.qty }}</span
                  >
                  <span class="qty-btn material-icons" @click="handQty(product, 1)">
                    add
                  </span>
                </div>
                <Button class="py-2px" @click="removeCart(product.id)">
                  移除
                </Button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="d-flex align-items-center border-top px-4 py-4">
      <span class="fs-5 ms-auto">總金額 NT$ {{ cartsData.total?.toLocaleString() }} 元</span>
    </div>
  </section>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { apiPutCartQty, apiDeleteCart } from '@/api';
import { useToast } from '@/methods';
import Button from '@/components/frontend/Button.vue';

export default {
  name: 'CartCanvas',
  components: {
    Button,
  },
  data() {
    return {
      cartCanvas: null,
      cartsData: {},
      isNowProgressAnimePlay: false,
      progressAniTimeout: null,
    };
  },
  methods: {
    showCartCanvas(playAnime = false) {
      if (this.isNowProgressAnimePlay) {
        clearTimeout(this.progressAniTimeout);
        this.isNowProgressAnimePlay = false;
      } else if (playAnime) {
        this.isNowProgressAnimePlay = true;
        this.progressAniTimeout = setTimeout(() => {
          if (this.isNowProgressAnimePlay === false) return;
          this.isNowProgressAnimePlay = false;
          this.hideCartCanvas();
        }, 8000);
      }
      this.cartCanvas.show();
    },
    hideCartCanvas() {
      this.cartCanvas.hide();
    },
    goToPage(page, id) {
      if (page === 'product') this.$router.push(`/${page}/${id}`);
      else this.$router.push(`/${page}`);
      this.cartCanvas.hide();
    },
    goToCart() {
      this.$router.push('/cart');
      this.cartCanvas.hide();
    },
    async handQty(item, num) {
      const product = { ...item };
      product.qty = item.qty + num <= 1 ? 1 : item.qty + num;
      if (product.qty === item.qty) return;
      this.$store.dispatch('handIsLoading', true);
      try {
        const { data } = await apiPutCartQty(product);
        if (data.success) {
          await this.$store.dispatch('getCarts');
          useToast('成功更新數量!', 'success');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        useToast('操作失敗!', 'danger');
      }
      this.$store.dispatch('handIsLoading', false);
    },
    async removeCart(productId) {
      this.$store.dispatch('handIsLoading', true);
      try {
        const { data } = await apiDeleteCart(productId);
        if (data.success) {
          await this.$store.dispatch('getCarts');
          useToast('成功移除商品!', 'success');
        } else {
          useToast('操作失敗!', 'danger');
        }
      } catch (err) {
        useToast('操作失敗!', 'danger');
      }
      this.$store.dispatch('handIsLoading', false);
    },
  },
  watch: {
    '$store.getters.cartsData': {
      handler(val) {
        this.cartsData = val;
      },
      immediate: true,
    },
  },
  created() {
    this.$emitter.on('showCartCanvas', this.showCartCanvas);
    this.$emitter.on('hideCartCanvas', this.hideCartCanvas);
  },
  mounted() {
    this.cartCanvas = new Offcanvas(this.$refs.cartCanvasDom);
  },
  unmounted() {
    this.$emitter.off('showCartCanvas', this.showCartCanvas);
    this.$emitter.off('hideCartCanvas', this.hideCartCanvas);
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.progress {
  height: 6px;
  &.active {
    .progress-bar {
      animation: progress-ani 8s forwards linear;
    }
  }
}

.progress-bar {
  background: $danger;
  width: 100%;
}

@keyframes progress-ani {
  0% {
    width: 0;
  }
  55% {
    opacity: 1;
  }
  62% {
    opacity: 0;
  }
  69% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  81% {
    opacity: 1;
  }
  86% {
    opacity: 0;
  }
  91% {
    opacity: 1;
  }
  96% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    width: 100%;
  }
}

.qty-btn {
  color: $black-100;
  &:hover {
    color: $danger;
  }
}

.product-item {
  &:hover {
    box-shadow: $box-shadow;
  }
}

.product-title {
  color: $primary;
  cursor: pointer;
  &:hover {
    color: shade-color($primary, 10%);
  }
}

.product-img {
  width: 133px;
  background: center no-repeat;
  background-size: cover;
}
</style>
