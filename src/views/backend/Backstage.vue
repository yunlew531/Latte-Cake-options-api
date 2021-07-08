<template>
  <div v-if="isLogIn">
    <BackendNavbar :user="user" />
    <div class="d-flex flex-wrap px-5 pb-8">
      <Sidebar :boardStatus="boardStatus" />
      <router-view
        :boardStatus="boardStatus"
        :tempProduct="tempProduct"
        @handStatus="handStatus"
        class="dashboard-content flex-grow-1"
      />
    </div>
  </div>
</template>

<script>
import backReq from '@/api/backReq';
import { apiPostCheck, apiGetUser } from '@/api';
import { useToast } from '@/methods';
import BackendNavbar from '@/components/backend/BackendNavbar.vue';
import Sidebar from '@/components/backend/Sidebar.vue';

export default {
  name: 'Backstage',
  components: {
    BackendNavbar,
    Sidebar,
  },
  data() {
    return {
      isLogIn: false,
      boardStatus: '新增',
      tempProduct: {},
      user: {},
    };
  },
  methods: {
    handStatus(data) {
      this.boardStatus = data.status;
      this.tempProduct = data.product;
    },
    setHeaders() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)LatteCake\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      backReq.defaults.headers.common.Authorization = token;
    },
  },
  created() {
    this.setHeaders();
    apiPostCheck()
      .then((res) => {
        if (res.data.success) {
          this.isLogIn = true;
        } else {
          useToast('請重新登入', 'danger');
          this.$router.push('/login');
          return false;
        }
        return apiGetUser();
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.results[0];
          this.user.username = `${data.name.first} ${data.name.last}`;
          this.user.photo = data.picture.medium;
        }
      })
      .catch((err) => {
        console.dir(err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.dashboard-content {
  max-width: calc(100% - 390px);
  animation: translate 0.3s forwards;
  margin-bottom: -100px;
  transform: translateY(-100px) scale(0.99);
}
@keyframes translate {
  to {
    transform: translateY(-100px) scale(1);
  }
}
@include media-breakpoint-down(xxl) {
  .dashboard-content {
    max-width: calc(100% - 300px);
  }
}
@include media-breakpoint-down(lg) {
  .dashboard-content {
    max-width: 100%;
    margin-bottom: 0;
    animation: none;
    transform: translateY(0) scale(1);
  }
}
</style>
