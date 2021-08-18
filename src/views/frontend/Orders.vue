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
        <Button class="w-100 h-100 mt-2 mt-sm-0" @click="searchOrder" :disabled="!orderCode"
          >查詢</Button
        >
      </div>
    </div>
  </section>
</template>

<script>
import Button from '@/components/frontend/Button.vue';

export default {
  components: {
    Button,
  },
  data() {
    return {
      orderCode: '',
    };
  },
  methods: {
    searchOrder() {
      if (this.orderCode) this.$router.push(`/order/${this.orderCode}`);
    },
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
