<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <h2 class="mb-5">{{ boardStatus }}產品</h2>
    <Form v-slot="{ errors }" @submit="addProduct">
      <div class="row">
        <div class="col-lg-4">
          <div class="mb-3">
            <label for="imgs" class="form-label mb-1">新增多圖</label>
            <div class="input-group">
              <input
                id="imgs"
                name="imgs"
                type="text"
                class="form-control"
                placeholder="輸入圖片網址"
                v-model.trim="product.imgsTemp"
              />
              <button type="button" class="text-black btn btn-outline-secondary" @click="addImg">
                新增
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="img" class="form-label mb-1">圖片上傳</label>
            <input ref="fileInput" @change="upLoadImg" type="file" class="form-control" />
          </div>
          <ul class="product-img-list d-flex flex-wrap list-unstyled py-sm-5 m-0">
            <li v-if="product.imageUrl" class="product-img position-relative mb-2">
              <img :src="product.imageUrl" class="img-fluid" :alt="product.title" />
              <button
                type="button"
                class="img-close-btn btn p-0 lh-1 position-absolute end-0 top-0"
                @click="product.imageUrl = ''"
              >
                <span class="material-icons-outlined"> close </span>
              </button>
            </li>
            <li
              v-for="(img, key) in product.imagesUrl"
              :key="img + key"
              class="product-img position-relative mb-2"
            >
              <img :src="img" class="img-fluid" :alt="product.title" />
              <button
                type="button"
                class="img-close-btn btn p-0 lh-1 position-absolute end-0 top-0"
                @click="removeImg(key)"
              >
                <span class="material-icons-outlined"> close </span>
              </button>
            </li>
          </ul>
        </div>
        <div class="col-lg-8">
          <div class="mb-3">
            <label for="title" class="form-label mb-1">名稱</label>
            <Field
              id="title"
              name="名稱"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['名稱'] }"
              placeholder="請輸入 名稱"
              rules="required"
              v-model.trim="product.title"
            />
            <ErrorMessage name="名稱" class="invalid-feedback" />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label for="category" class="form-label mb-1">分類</label>
                <Field
                  id="category"
                  name="分類"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['分類'] }"
                  placeholder="請輸入 分類"
                  rules="required"
                  v-model.trim="product.category"
                />
                <ErrorMessage name="分類" class="invalid-feedback" />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="unit" class="form-label mb-1">單位</label>
                <Field
                  id="unit"
                  name="單位"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['單位'] }"
                  placeholder="請輸入 單位"
                  rules="required"
                  v-model.trim="product.unit"
                />
                <ErrorMessage name="單位" class="invalid-feedback" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label for="origin_price" class="form-label mb-1">原價</label>
                <Field
                  id="origin_price"
                  name="原價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['原價'] }"
                  placeholder="請輸入 原價"
                  rules="required"
                  min="0"
                  v-model.number="product.origin_price"
                />
                <ErrorMessage name="原價" class="invalid-feedback" />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="price" class="form-label mb-1">售價</label>
                <Field
                  id="price"
                  name="售價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['售價'] }"
                  placeholder="請輸入 售價"
                  rules="required"
                  min="0"
                  v-model.number="product.price"
                />
                <ErrorMessage name="售價" class="invalid-feedback" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <label class="form-label">
                熱量
                <input
                  type="text"
                  class="form-control mt-1"
                  placeholder="請輸入 熱量"
                  v-model.number="product.calories"
                />
              </label>
            </div>
            <div class="col-4">
              <label class="form-label">
                蛋白質
                <input
                  type="text"
                  class="form-control mt-1"
                  placeholder="請輸入 蛋白質"
                  v-model.number="product.protein"
                />
              </label>
            </div>
            <div class="col-4">
              <label class="form-label">
                脂肪
                <input
                  type="text"
                  class="form-control mt-1"
                  placeholder="請輸入 脂肪"
                  v-model.number="product.fat"
                />
              </label>
            </div>
          </div>

          <div class="dropdown-divider my-5"></div>
          <div class="mb-3">
            <label for="description" class="form-label mb-1">產品描述</label>
            <textarea
              id="description"
              name="產品描述"
              class="form-control"
              placeholder="請輸入
            產品描述"
              v-model.trim="product.description"
              cols="30"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label mb-1">產品內容</label>
            <textarea
              id="content"
              name="產品內容"
              class="form-control"
              placeholder="請輸入 產品內容"
              v-model.trim="product.content"
              cols="30"
              rows="3"
            ></textarea>
          </div>
          <div class="d-flex align-items-center mt-4">
            <div class="me-auto">
              <input
                id="freeDelivery"
                type="checkbox"
                class="form-check-input"
                v-model="product.freeDelivery"
              />
              <label for="freeDelivery" class="ms-2 me-10 me-sm-0">免運費</label>
              <input
                id="is_enabled"
                type="checkbox"
                class="form-check-input ms-0 ms-sm-5"
                v-model="product.is_enabled"
              />
              <label for="is_enabled" class="ms-2">啟用上架</label>
            </div>
            <button
              v-if="boardStatus === '編輯'"
              @click="handStatus"
              class="btn btn-outline-primary text-nowrap mx-3"
              type="button"
            >
              取消
            </button>
            <button class="btn btn-primary text-nowrap" type="submit">
              送出
            </button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { useToast } from '@/methods';
import { apiPostUploadImg, apiPostAddProduct, apiPutEditProduct } from '@/api';

export default {
  name: 'AddProduct',
  props: {
    boardStatus: {
      type: String,
      default: '新增',
    },
    tempProduct: {
      type: String,
    },
  },
  emits: {
    handStatus: (status) => status.status === '新增',
  },
  data() {
    return {
      product: { imgs: [] },
      fileInput: null,
      isLoading: false,
    };
  },
  methods: {
    addImg() {
      if (!this.product.imagesUrl) this.product.imagesUrl = [];
      if (!this.product.imgsTemp) {
        useToast('請輸入網址!', 'danger');
      } else if (
        (this.product.imageUrl && this.product.imagesUrl.length >= 4)
        || (!this.product.imageUrl && this.product.imagesUrl.length >= 5)
      ) {
        useToast('已達圖片上限!', 'danger');
      } else this.product.imagesUrl.push(this.product.imgsTemp);
      this.product.imgsTemp = '';
    },
    async addProduct() {
      this.isLoading = true;
      const productData = {
        title: this.product.title,
        category: this.product.category,
        origin_price: this.product.origin_price,
        price: this.product.price,
        unit: this.product.unit,
        description: this.product.description,
        content: this.product.content,
        is_enabled: this.product.is_enabled,
        imageUrl: this.product.imageUrl,
        imagesUrl: this.product.imagesUrl,
        freeDelivery: this.product.freeDelivery,
        calories: this.product.calories,
        protein: this.product.protein,
        fat: this.product.fat,
      };
      const method = this.boardStatus === '新增' ? apiPostAddProduct : apiPutEditProduct;
      const { id } = this.product;
      try {
        const { data } = await method(productData, id);
        if (data.success) {
          useToast(this.boardStatus === '新增' ? '新增成功!' : '完成更新!', 'success');
          this.$router.push('/admin/products');
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        useToast('發生錯誤!', 'danger');
      }
      this.isLoading = false;
    },
    removeImg(key) {
      this.product.imagesUrl.splice(key, 1);
    },
    async upLoadImg() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('file-to-upload', this.$refs.fileInput.files[0]);
      try {
        const { data } = await apiPostUploadImg(formData);
        if (data.success) {
          this.product.imageUrl = data.imageUrl;
          this.$refs.fileInput.value = '';
          useToast('成功上傳!', 'success');
        } else useToast(data.message, 'danger');
      } catch (err) {
        useToast('發生錯誤!', 'danger');
      }
      this.isLoading = false;
    },
    handStatus() {
      this.$emit('handStatus', { status: '新增' });
      this.$router.push('/admin/products');
    },
  },
  watch: {
    boardStatus: {
      handler(val) {
        if (val === '編輯') {
          this.product = JSON.parse(this.tempProduct);
          this.$emitter.emit('handStatus', '編輯');
        }
      },
      immediate: true,
    },
  },
  unmounted() {
    this.$emit('handStatus', { status: '新增' });
    this.$emitter.emit('handStatus', '新增');
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.img-close-btn {
  color: $black;
  &:hover {
    color: $primary;
  }
}
.product-img-list {
  margin-right: -10px !important;
}
.product-img {
  width: calc((100% - 20px) / 2);
  margin-right: 10px;
}
</style>
