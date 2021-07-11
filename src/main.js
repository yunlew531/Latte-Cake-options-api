import { createApp } from 'vue';
import emitter from '@/methods/mitt';
import 'material-icons/iconfont/material-icons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { localize, setLocale } from '@vee-validate/i18n';
import 'mosha-vue-toastify/dist/style.css';
import App from './App.vue';
import router from './router';
import store from './store';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
});
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$emitter = emitter;

app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(store);
app.use(router);

app.mount('#app');
