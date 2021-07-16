<template>
  <div
    class="
      login-panel
      shadow
      rounded
      position-absolute
      start-50
      top-50
      translate-middle
      p-8
    "
  >
    <Form v-slot="{ errors }" @submit="login">
      <div class="mb-3">
        <div class="form-group">
          <label for="email" class="form-label text-white">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="user.email"
          >
          </Field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="form-group">
          <label for="password" class="form-label text-white">密碼</label>
          <Field
            id="password"
            name="密碼"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors['密碼'] }"
            placeholder="請輸入密碼"
            rules="required"
            v-model="user.password"
          ></Field>
          <error-message name="密碼" class="invalid-feedback"></error-message>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary" type="submit">登入</button>
      </div>
    </Form>
  </div>

  <main>
    <section class="navbar-bg"></section>
  </main>
</template>

<script>
import { apiPostLogin, apiPostCheck } from '@/api';
import { useToast } from '@/methods';
import backReq from '@/api/backReq';

export default {
  name: 'Login',
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async login() {
      const userData = {
        username: this.user.email,
        password: this.user.password,
      };
      try {
        const { data } = await apiPostLogin(userData);
        if (data.success) {
          const { expired } = data;
          const { token } = data;
          document.cookie = `LatteCake=${token};expires=${new Date(expired)};`;
          this.$router.push('/admin');
        } else {
          useToast('登入失敗!', 'danger');
        }
      } catch (err) {
        console.dir(err);
      }
    },
    setHeaders() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)LatteCake\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      backReq.defaults.headers.common.Authorization = token;
    },
    checkLoginStatus() {
      this.setHeaders();
      apiPostCheck().then(({ data }) => {
        if (data.success) {
          this.$store.dispatch('handLogInStatus', true);
          this.$router.push('/admin');
        }
      });
    },
  },
  created() {
    if (this.$store.getters.isLogIn) {
      this.$router.push('/admin');
    } else {
      this.checkLoginStatus();
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.navbar-bg {
  height: 100vh;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}
.login-panel {
  width: 400px;
  background: rgba($white, 0.3);
}
.form-group {
  height: 100px;
}
</style>
