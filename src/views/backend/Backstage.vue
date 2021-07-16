<template>
  <div v-if="$store.getters.isLogIn">
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
import { apiGetUser, apiPostCheck } from '@/api';
import BackendNavbar from '@/components/backend/BackendNavbar.vue';
import Sidebar from '@/components/backend/Sidebar.vue';
import { useToast } from '@/methods';
import backReq from '@/api/backReq';

export default {
  name: 'Backstage',
  components: {
    BackendNavbar,
    Sidebar,
  },
  data() {
    return {
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
    getUser() {
      apiGetUser().then((res) => {
        if (res.status === 200) {
          const data = res.data.results[0];
          this.user.username = `${data.name.first} ${data.name.last}`;
          this.user.photo = data.picture.medium;
        }
      });
    },
    setHeaders() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)LatteCake\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      backReq.defaults.headers.common.Authorization = token;
    },
    checkLoginStatus(from) {
      this.setHeaders();
      apiPostCheck()
        .then(({ data }) => {
          console.log('驗證');
          if (data.success) {
            this.$store.dispatch('handLogInStatus', true);
            this.$router.push('/admin');
          } else {
            this.$store.dispatch('handLogInStatus', false);
            this.$router.push('/login');
            if (from.path !== '/login') {
              useToast('請重新登入', 'danger');
            }
          }
          return data;
        })
        .then(({ success }) => {
          if (success) this.getUser();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.checkLoginStatus(from);
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
