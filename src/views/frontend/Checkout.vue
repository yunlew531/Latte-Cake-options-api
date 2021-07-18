<template>
  <section class="nav-bg"></section>
  <section class="checkout-panel container position-relative mb-12">
    <router-link to="/cart" class="position-absolute start-0 top-n16">
      <Button class="fs-6 px-5 ms-2">返回購物車</Button>
    </router-link>
    <div class="row gx-8">
      <div class="col-6">
        <Form
          v-slot="{ errors }"
          @submit="onSubmit"
          class="submit-form bg-white rounded p-8 shadow-sm"
        >
          <h3 class="fs-4 text-black-100">資料填寫</h3>
          <div class="form-group text-black-200">
            <label for="orderEmail" class="form-label mb-1">Email</label>
            <Field
              id="orderEmail"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="name" class="form-label mb-1">姓名</label>
            <Field
              id="name"
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入名字"
              rules="required"
              v-model="user.name"
            ></Field>
            <ErrorMessage name="name" class="invalid-feedback" as="span">
              <span>姓名為必填</span>
            </ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="tel" class="form-label mb-1">電話</label>
            <Field
              id="tel"
              name="tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入電話 ex: 0912345678"
              :rules="validateTel"
              v-model="user.tel"
            ></Field>
            <ErrorMessage name="tel" class="invalid-feedback" as="span">
              <span>請填寫正確電話號碼</span>
            </ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="address" class="form-label mb-1">地址</label>
            <Field
              id="address"
              name="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="user.address"
            ></Field>
            <ErrorMessage name="address" class="invalid-feedback" as="span">
              <span>地址為必填</span>
            </ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="payment" class="form-label mb-1">付款方式</label>
            <Field
              id="payment"
              name="payment"
              class="form-control"
              as="select"
              v-model="user.payment"
            >
              <option value="">貨到付款</option>
              <option value="ATM 繳費">ATM 繳費</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Google Pay">Google Pay</option>
            </Field>
          </div>
          <Button btnType="submit" class="fs-6 px-5 ms-2">送出訂單</Button>
        </Form>
      </div>
      <div class="col-6">
        <div class="bg-white shadow-sm rounded p-8">
          <ul class="list-unstyled">
            <li
              v-for="(product, key) in cartsData.carts"
              :key="product.id"
              class="product-item fs-5 shadow-sm rounded mb-2"
              :class="{ show: nowShow.includes(key) }"
              @click="showInfo(key)"
            >
              <button
                type="button"
                class="btn d-flex align-items-end w-100 p-3"
              >
                <h2 class="text-primary fs-5 m-0">
                  {{ product.product.title }}
                </h2>
                <span class="text-primary fs-7 ms-5">x</span>
                <span class="text-primary fs-7 ms-5 me-auto">
                  {{ product.qty }}</span
                >
                <span class="text-primary fs-5"
                  ><span class="fs-7">NT$</span> {{ product.total }}</span
                >
              </button>
              <div class="product-content">
                <div class="fs-7 d-flex justify-content-between">
                  <router-link :to="`/product/${product.product.id}`">
                    商品連結
                  </router-link>
                  <span>售價: NT$ {{ product.product.price }}</span>
                </div>
                <p class="fs-6 fw-light py-1">
                  {{ product.product.content }}
                </p>
              </div>
            </li>
          </ul>
          <div class="d-flex">
            <router-link to="/products" class="me-auto">
              <Button class="px-5 ms-2">選購更多商品</Button>
            </router-link>
            <p class="text-primary fs-5 m-0">
              總金額 NT$ <span class="fs-3">{{ cartsData.final_total }}</span>
            </p>
          </div>
        </div>
        <div class="rounded shadow-sm bg-white p-8 mt-8">
          <h4 class="fs-4">輸入優惠折扣碼</h4>
          <div class="d-flex">
            <input type="text" class="flex-grow-1" />
            <Button class="px-5 ms-2">送出</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiPostCheckout } from '@/api';
import { useToast } from '@/methods';
import Button from '@/components/frontend/Button.vue';

export default {
  name: 'Checkout',
  components: {
    Button,
  },
  data() {
    return {
      cartsData: [],
      user: {},
      nowShow: [],
    };
  },
  methods: {
    validateTel() {
      const rule = /^(09)[0-9]{8}$/;
      return rule.test(this.user.tel) ? true : '需要正確的電話號碼';
    },
    showInfo(key) {
      const idx = this.nowShow.indexOf(key);
      if (idx !== -1) this.nowShow.splice(idx, 1);
      else this.nowShow.push(key);
    },
    async onSubmit(value, { resetForm }) {
      resetForm();
      this.$store.dispatch('handIsLoading', true);
      const data = { user: this.user };
      try {
        const { data: resData } = await apiPostCheckout(data);
        console.log(resData);
        if (resData.success) {
          useToast('訂單成立!', 'success');
          this.$store.dispatch('getCarts');
          this.$router.push('/orders');
        } else useToast('發生錯誤!', 'danger');
        this.$store.dispatch('handIsLoading', false);
      } catch (err) {
        console.dir(err);
      }
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
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.checkout-panel {
  transform: translateY(-50px);
}
.nav-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
  background-size: cover;
}
.page-title {
  > h3 {
    opacity: 0;
  }
  &.active {
    > h3 {
      transform: scale(0);
      animation: scale-ani 0.5s forwards;
      opacity: 1;
    }
  }
}
@keyframes scale-ani {
  to {
    transform: scale(1);
  }
}

.form-group {
  height: 100px;
}
.product-item {
  background: $white;
  border: 1px solid tint-color($primary, 95%);
  &:hover {
    background: shade-color($white, 2%);
  }
  &.show {
    border: 1px solid tint-color($primary, 90%);
    .product-content {
      max-height: 500px;
      border-top: 1px solid $gray-300;
      padding: 12px;
    }
  }
}
.product-content {
  overflow: hidden;
  max-height: 0;
}
</style>
