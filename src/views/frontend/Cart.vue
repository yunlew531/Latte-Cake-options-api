<template>
  <section class="navbar-bg"></section>
  <section class="container cart-panel mb-12">
    <div class="row g-8">
      <div class="col-lg-8">
        <div class="rounded shadow-sm bg-white p-8">
          <div
            v-if="cartsData.carts?.length !== 0"
            class="d-flex align-items-center"
          >
            <span class="fs-4 me-auto"
              >{{ cartsData.carts?.length }} 件商品</span
            >
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="removeAllCarts"
            >
              移除所有商品
            </button>
          </div>
          <div
            v-else
            class="d-flex justify-content-center align-content-center"
          >
            <router-link to="/products" class="btn btn-primary">
              立即前往購物
            </router-link>
          </div>
          <ul class="list-unstyled">
            <li
              class="product-item py-8"
              v-for="product in cartsData.carts"
              :key="product.id"
            >
              <div class="d-flex justify-content-between pb-2">
                <div class="d-flex">
                  <p
                    class="
                      fs-7
                      align-self-start
                      d-flex
                      align-items-center
                      text-primary
                      border border-primary
                      px-1
                      mb-0
                    "
                  >
                    <span class="material-icons ms-2px">
                      local_fire_department
                    </span>
                    <span class="ms-1">熱銷商品</span>
                  </p>
                  <p
                    v-if="product.product.freeDelivery"
                    class="
                      fs-7
                      align-self-start
                      d-flex
                      align-items-center
                      text-success
                      border border-success
                      px-1
                      ms-2
                      mb-0
                    "
                  >
                    <span class="material-icons ms-2px"> local_shipping </span>
                    <span class="ms-1">免運費</span>
                  </p>
                </div>
                <span
                  >單價 NT$
                  {{ product.product.price?.toLocaleString() }} 元</span
                >
              </div>
              <div class="d-flex">
                <div
                  class="product-img"
                  :style="{
                    'background-image': `url(${product.product.imageUrl})`,
                  }"
                ></div>
                <div
                  class="
                    d-flex
                    flex-column
                    justify-content-between
                    ps-5
                    flex-grow-1
                  "
                >
                  <div class="d-flex">
                    <div class="flex-grow-1 flex-shrink-1">
                      <h2 class="fs-3">
                        <router-link
                          :to="`/product/${product.product.id}`"
                          class="text-decoration-none"
                          >{{ product.product.title }}</router-link
                        >
                      </h2>
                      <h4 class="fs-7 text-black-300">
                        {{ product.product.category }}
                      </h4>
                    </div>

                    <div
                      class="
                        align-self-start
                        d-flex
                        align-items-center
                        flex-shrink-0
                      "
                    >
                      <span class="fs-6 text-black-200">購買數量</span>
                      <div class="position-relative">
                        <span
                          class="
                            d-block
                            text-center
                            quantity-text
                            rounded
                            border border-black-300
                            fs-5
                            ms-5
                            pe-6
                            mb-1px
                          "
                          >{{ product.qty }}</span
                        >
                        <button
                          class="
                            quntity-btn
                            h-50
                            border-1 border-black-300
                            position-absolute
                            end-0
                            top-0
                            p-0
                          "
                          @click.stop="handQty(product, 1)"
                        >
                          <span class="material-icons"> arrow_drop_up </span>
                        </button>
                        <button
                          class="
                            quntity-btn
                            h-50
                            border-1 border-black-300
                            position-absolute
                            top-50
                            end-0
                            p-0
                            mt-n1px
                          "
                          @click.stop="handQty(product, -1)"
                        >
                          <span class="material-icons border-0">
                            arrow_drop_down
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="text-black-200">
                    {{ product.product.content }}
                  </p>
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center flex-grow-1">
                      <button
                        class="
                          product-remove-btn
                          border-0
                          bg-transparent
                          d-flex
                          align-items-center
                        "
                        type="button"
                        @click="removeCart(product.id)"
                      >
                        <span class="text-danger material-icons"> delete </span>
                        <span class="ms-1">移除商品</span>
                      </button>
                      <button
                        class="
                          product-remove-btn
                          border-0
                          bg-transparent
                          d-flex
                          align-items-center
                          ms-3
                        "
                        type="button"
                      >
                        <span class="material-icons heart-border">
                          favorite_border
                        </span>
                        <span class="material-icons heart-solid">
                          favorite
                        </span>
                        <span class="btn-text ms-1">移動到想要清單</span>
                      </button>
                    </div>
                    <span class="fs-4"
                      >NT$ {{ product.total?.toLocaleString() }} 元</span
                    >
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rounded shadow-sm bg-white p-8 mt-8">
          <p class="d-flex">
            <span class="fs-4 flex-lg-grow-1">預計到貨日</span
            ><span class="fs-3">{{ deliveryTime }}</span>
          </p>
          <p class="fw-light">
            (下定後預計兩日到貨，如下標時間超過下午5點則再順延一日)
          </p>
        </div>
      </div>
      <div class="col-4">
        <div class="position-sticky top-20">
          <div class="rounded shadow-sm bg-white p-8">
            <p class="fs-4">總金額</p>
            <p class="d-flex text-black-400">
              <span class="flex-grow-1">金額</span
              ><span>NT$ {{ cartsData.total?.toLocaleString() }} 元</span>
            </p>
            <p class="d-flex text-black-400">
              <span class="flex-grow-1">運費</span><span>NT$ 100 元</span>
            </p>
            <router-link
              v-if="cartsData.carts?.length"
              to="/checkout"
              class="checkout-btn fs-5 btn w-100 py-3"
              ><span
                class="
                  checkout-btn-text
                  position-absolute
                  start-50
                  top-50
                  translate-middle
                "
                >結帳</span
              >
              <span class="opacity-0">結帳</span></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useToast } from '@/methods';
import { apiPutCartQty, apiDeleteCart, apiDeleteAllCarts } from '@/api';

export default {
  name: 'Cart',
  data() {
    return {
      productNum: 1,
      isQtyLoad: false,
      isRemoveLoad: false,
      cartsData: [],
    };
  },
  methods: {
    async handQty(item, num) {
      const product = { ...item };
      product.qty = item.qty + num <= 1 ? 1 : item.qty + num;
      if (product.qty === item.qty) return;
      this.$store.dispatch('handIsLoading', true);
      try {
        const { data } = await apiPutCartQty(product);
        if (data.success) {
          await this.$store.dispatch('getCarts');
          this.$store.dispatch('handIsLoading', false);
          useToast('成功更新數量!');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
    },
    async removeCart(productId) {
      this.$store.dispatch('handIsLoading', true);
      try {
        const { data } = await apiDeleteCart(productId);
        if (data.success) {
          await this.$store.dispatch('getCarts');
          useToast('成功移除商品!');
        } else {
          useToast('操作失敗!', 'danger');
        }
        this.$store.dispatch('handIsLoading', false);
      } catch (err) {
        console.dir(err);
      }
    },
    async removeAllCarts() {
      this.$store.dispatch('handIsLoading', true);
      try {
        const { data } = await apiDeleteAllCarts();
        if (data.success) {
          useToast('成功移除!');
          await this.$store.dispatch('getCarts');
        } else useToast('操作失敗!', 'danger');
        this.$store.dispatch('handIsLoading', false);
      } catch (err) {
        console.dir(err);
      }
    },
  },
  computed: {
    deliveryTime() {
      const dayTranslate = ['日', '一', '二', '三', '四', '五', '六'];
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const day = date.getDay();
      const hour = date.getHours();
      const deliveryD = hour >= 17 ? d + 3 : d + 2;
      let deliveryDay = hour >= 17 ? day + 3 : day + 2;
      if (deliveryDay === 7) deliveryDay = 0;
      else if (deliveryDay === 8) deliveryDay = 1;
      else if (deliveryDay === 9) deliveryDay = 2;
      const time = `${y} / ${m} / ${deliveryD} 星期${dayTranslate[deliveryDay]}`;
      return time;
    },
  },
  watch: {
    '$store.getters.cartsData': {
      handler(val) {
        this.cartsData = val;
      },
    },
  },
  created() {
    this.$store.dispatch('getCarts');
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styleSheets/views/frontend/Cart';
</style>
