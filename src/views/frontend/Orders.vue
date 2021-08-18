<template>
  <div class="nav-bg"></div>
  <section class="orders-panel bg-white rounded shadow-sm container p-10">
    <h2 class="mb-3">訂單查詢</h2>
    <div class="row align-items-center">
      <div class="col-sm-9">
        <input
          type="text"
          class="w-100 rounded px-2 py-1"
          placeholder="請輸入訂單編號"
          v-model="orderCode"
        />
      </div>
      <div class="col-sm-3">
        <router-link :to="`/order/${orderCode}`" class="d-block">
          <Button class="w-100 h-100 mt-2 mt-sm-0">查詢</Button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { apiGetCustOrders } from '@/api';
import TranslateTime from '@/mixins/TranslateTime.vue';
import { useToast } from '@/methods';
import Button from '@/components/frontend/Button.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  mixins: [TranslateTime],
  components: {
    Button,
  },
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {},
      orderCode: '',
    };
  },
  methods: {
    async getOrders(page) {
      this.isLoading = true;
      const { data } = await apiGetCustOrders(page);
      if (data.success) {
        this.orders = data.orders;
        this.pagination = data.pagination;
      } else useToast('無法取得訂單!', 'danger');
      this.isLoading = false;
    },
    showOrderDetail(order) {
      this.$router.push(`/order/${order.id}`);
    },
    handPage(page) {
      this.getOrders(page);
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.nav-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
  background-size: cover;
}
.orders-panel {
  max-width: 800px;
  transform: translateY(-50px);
}
.table-panel {
  overflow: scroll;
  padding-bottom: 30px;
}
.table {
  min-width: 1200px;
}
tbody {
  th,
  td {
    line-height: 38px;
  }
}
tr:last-child {
  border-bottom: 1px solid $black;
}
</style>
