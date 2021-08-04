<template>
  <Modal ref="msgModal" @onDelete="deleteProduct" />
  <div class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div class="d-flex align-items-center">
      <h2>商品列表</h2>
      <div v-if="searchText" class="d-flex align-items-center">
        <div
          class="
            d-flex
            align-items-center
            text-white
            bg-danger
            rounded
            border
            shadow
            ms-5
          "
        >
          <span class="cancel-search-btn material-icons-outlined mt-1px" @click="searchText = ''">
            close
          </span>
          <span class="px-1">{{ searchText }}</span>
        </div>
        <span class="ps-5"
          >搜尋到
          <span class="fs-4 text-danger">{{ displayProducts.length }} </span>
          樣有關 <span class="fs-4 text-danger"> {{ searchText }} </span> 的商品
        </span>
      </div>
    </div>
    <div class="table-panel">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th class="pe-8" scope="col">圖片</th>
            <th class="px-8" width="200" scope="col">商品</th>
            <th class="px-8" width="50%" scope="col">內容</th>
            <th class="px-10" width="130" scope="col">狀態</th>
            <th width="130" scope="col">原價</th>
            <th width="130" scope="col">售價</th>
            <th width="130" scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, key) in displayProducts" :key="product.id">
            <th scope="row">{{ key + 1 }}</th>
            <td class="pe-10">
              <div
                :style="{
                  'background-image': `url(${product.imageUrl || product.imagesUrl[0]})`,
                }"
                class="product-img"
              ></div>
            </td>
            <td class="text-nowrap px-8">{{ product.title }}</td>
            <td class="px-8 lh-1">
              <div class="h-100 d-flex align-items-center">
                <p class="m-0 lh-base tracking-2">
                  {{ product.content }}
                </p>
              </div>
            </td>
            <td class="text-nowrap px-8">
              <span v-if="product.is_enabled" class="text-success">已上架</span>
              <span v-else class="text-danger">未上架</span>
            </td>
            <td class="text-nowrap">NT$ {{ product.origin_price }}</td>
            <td class="text-nowrap">NT$ {{ product.price }}</td>
            <td class="text-nowrap">
              <button type="button" class="btn btn-outline-primary" @click="editProduct(product)">
                編輯
              </button>
              <button type="button" class="btn btn-primary ms-2" @click="showModal">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination v-if="!searchText" class="mt-8" :pages="pagination" @handPage="handPage" />
    </div>
  </div>
</template>

<script>
import { apiGetProducts, apiGetAllAdminProducts, apiDeleteProduct } from '@/api';
import { useToast } from '@/methods';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'BackendProducts',
  props: {
    search: {
      type: String,
    },
  },
  emits: {
    handStatus: (status) => status.status === '編輯',
  },
  components: {
    Modal,
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      allProducts: [],
      pagination: {},
      searchText: '',
    };
  },
  methods: {
    async handPage(page = 1) {
      this.isLoading = true;
      try {
        const { data } = await apiGetProducts(page);
        if (data.success) {
          this.products = data.products;
          this.pagination = data.pagination;
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        useToast('發生錯誤!', 'danger');
      }
      this.isLoading = false;
    },
    async getAllProducts() {
      try {
        const { data } = await apiGetAllAdminProducts();
        if (data.success) {
          const keysArr = Object.keys(data.products);
          const valuesArr = Object.values(data.products);
          const products = keysArr.map((id, key) => ({
            id,
            ...valuesArr[key],
          }));
          this.allProducts = products;
        }
      } catch (err) {
        useToast('發生錯誤!', 'danger');
      }
    },
    async deleteProduct(productId) {
      this.isLoading = true;
      try {
        const { data } = await apiDeleteProduct(productId);
        if (data.success) {
          useToast('成功刪除!', 'success');
          this.handPage();
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        useToast('發生錯誤!', 'danger');
      }
      this.isLoading = false;
    },
    editProduct(product) {
      const tempProduct = JSON.stringify(product);
      this.$router.push({
        name: 'AddProduct',
        params: { boardStatus: '編輯', tempProduct },
      });
    },
    handSearch(text) {
      this.searchText = text;
    },
    showModal() {
      this.$refs.msgModal.showModal({
        title: '刪除訂單',
        content: '是否刪除訂單? 刪除後無法恢復。',
      });
    },
  },
  computed: {
    displayProducts() {
      let products = null;
      if (this.searchText) {
        products = this.allProducts.filter((product) => product.title.match(this.searchText));
      } else products = this.products;
      return products;
    },
  },
  created() {
    this.handPage();
    this.getAllProducts();
    this.handSearch(this.search);
    this.$emitter.on('handSearch', this.handSearch);
  },
  unmounted() {
    this.$emitter.off('handSearch', this.handSearch);
  },
  beforeRouteLeave(to, from, next) {
    this.isLoading = false;
    next();
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/mixins';
@import '~@/assets/styleSheets/custom/variables';

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
    height: 117px;
    overflow: hidden;
    line-height: 100px;
  }
}
.product-img {
  width: 100px;
  height: 100px;
  background: center no-repeat;
  background-size: cover;
}
tr:last-child {
  border-bottom: 1px solid $black;
}
.cancel-search-btn {
  cursor: pointer;
}
</style>
