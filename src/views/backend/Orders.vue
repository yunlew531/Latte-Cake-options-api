<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div class="d-flex justify-content-center">
      <h2 class="me-auto">訂單</h2>
      <button
        class="btn btn-primary align-self-center"
        @click="deleteAllOrders"
      >
        刪除全部訂單
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">訂單編號</th>
          <th scope="col">成立時間</th>
          <th scope="col">狀態</th>
          <th scope="col">金額</th>
          <th width="80" scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, key) in backstageOrders" :key="order.id + key">
          <th scope="row">
            {{ (pagination.current_page - 1) * 10 + key + 1 }}
          </th>
          <td>{{ order.id }}</td>
          <td>{{ translateTime(order?.create_at, 'string') }}</td>
          <td>
            <p
              v-if="order.is_paid"
              class="text-success d-flex align-items-center m-0"
            >
              <span class="material-icons-outlined"> check </span>
              <span>已付款</span>
            </p>
            <p v-else class="text-primary d-flex align-items-center m-0">
              <span class="material-icons-outlined"> close </span>
              <span>未付款</span>
            </p>
          </td>
          <td>NT$ {{ order.total?.toLocaleString() }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="showOrderDetail(order)"
            >
              詳細
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @handPage="handPage" class="pt-5" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TranslateTime from '@/mixins/TranslateTime.vue';
import Pagination from '@/components/Pagination.vue';
import { apiDeleteAllOrders } from '@/api';
import { useToast } from '@/methods';

export default {
  components: {
    Loading,
    Pagination,
  },
  mixins: [TranslateTime],
  data() {
    return {
      isLoading: false,
      backstageOrders: [],
      pagination: {},
    };
  },
  methods: {
    getOrders(page) {
      this.isLoading = true;
      this.$store
        .dispatch('getBackstageOrders', page)
        .then(({ success }) => {
          this.isLoading = false;
          if (!success) useToast('取得訂單失敗!', 'danger');
        })
        .catch((err) => {
          this.isLoading = false;
          console.dir(err);
        });
    },
    showOrderDetail(order) {
      this.$emit('setOrderDetail', order);
      this.$router.push(`/admin/order/${order.id}`);
    },
    handPage(page) {
      this.getOrders(page);
    },
    async deleteAllOrders() {
      this.isLoading = true;
      const { data } = await apiDeleteAllOrders();
      this.isLoading = false;
      if (data.success) {
        useToast('已刪除全部訂單!');
        this.getOrders();
      } else useToast(data.message, 'danger');
    },
  },
  created() {
    this.getOrders();
  },
  watch: {
    '$store.getters.backstageOrders': {
      handler(data) {
        this.backstageOrders = data.orders;
        this.pagination = data.pagination;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

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
