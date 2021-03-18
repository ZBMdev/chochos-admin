<template>
  <BlockUI :blocked="isLoading" :baseZIndex="99999" :fullscreen="true">
    <div>
      <DynamicForm
        @submit="saveBanner"
        :schema="bannerCreateForm(products, banner)"
      >
        <div class="p-col-12 p-formgrid p-grid">
          <div class="p-col p-fluid p-field p-mr-2">
            <label for="name">Image</label>
            <img
              v-if="uploadedImage || banner.image_url"
              :src="uploadedImage || banner.image_url"
            />
            <FileUpload
              mode="basic"
              name="file[]"
              :customUpload="true"
              @uploader="uploadImage"
              chooseLabel="Browse"
              accept="image/*"
              :maxFileSize="1000000"
              :auto="true"
            />
          </div>
          <div class="p-col p-fluid p-field">
            <label for="name">Activated</label>
            <InputSwitch class="p-d-block" v-model="isActivated" />
          </div>
        </div>
        <div class="p-col-12 p-fluid p-field">
          <label for="products">Products</label>
          <MultiSelect
            id="products"
            v-model="selectedProducts"
            :options="products"
            optionLabel="name"
            :filter="true"
            @filter="getProducts($event.value)"
            class="multiselect-custom"
            placeholder="Select products"
            dataKey="id"
          >
            <template #value="slotProps">
              <div
                class="item-value"
                v-for="option of slotProps.value"
                :key="option.id"
              >
                <img :src="option.mainImage" />
                <span>{{ option.name }}</span>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Select Products
              </template>
            </template>
            <template #option="slotProps">
              <div class="item">
                <img :src="`https://picsum.photos/70/50`" />
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </MultiSelect>
        </div>
      </DynamicForm>
    </div>
  </BlockUI>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { bannerCreateForm } from "@/models/Banner";
import Product from "@/models/Product";
import Banner from "@/models/Banner";
import ProductService from '@/services/ProductService';
import BannerService from '@/services/BannerService';
import BombsightService from '@/services/BombsightService';
import qs from "qs";
import { BannerData } from '@/types/banner';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  components: { DynamicForm },
  props: {
    banner: {
      type: Object,
      required: true,
    },
  },
  emits: ["created", "updated"],
  data() {
    return {
      selectedProducts: reactive(this.banner.products),
      products: [] as Product[],
      productService: new ProductService(),
      bannerService: new BannerService(),
      imageService: new BombsightService(),
      isLoading: false,
      isActivated: this.banner.activated,
      toast: useToast(),
      file: undefined as File | undefined,
      uploadedImage: undefined as string | undefined
    }
  },
  setup() {
    return {
      bannerCreateForm
    };
  },
  methods: {
    getProducts(value: string) {
      this.productService.search(qs.stringify({ isPublished: true, name: value, limit: 30 }))
        .then((products) => {
          this.products = products.data.map((prod) => new Product(prod));
        });
    },
    saveBanner(value: BannerData) {
      this.isLoading = true;

      this.saveFiletoBombsight().then(() => {

        const data = new Banner({ ...this.banner, ...value, activated: this.isActivated, products: this.selectedProducts });
        if (data.id) {
          // udpate
          this.updateBanner(data).then(() => {
            this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Banner Updated', life: 3000 });
          });

        } else {

          //create
          this.bannerService.create(data.toCreateParam())
            .then((newBanner) => {
              this.$emit('created', newBanner)
              this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Banner Created', life: 3000 });
            }).finally(() => {
              this.isLoading = false
            });
        }
      })
        .finally(() => {
          this.isLoading = false;

        })
    },
    async updateBanner(data: Banner) {
      return this.bannerService.update(data.id, data.toCreateParam())
        .then((newBanner) => {
          this.$emit('updated', newBanner)
        }).finally(() => {
          this.isLoading = false
        });
    },
    async saveFiletoBombsight() {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        const image = await this.imageService.upload(formData);
        // eslint-disable-next-line
        this.banner.image_url = image.url;
        if (this.uploadedImage) {
          window.URL.revokeObjectURL(this.uploadedImage);
          this.uploadedImage = undefined;
        }
      }
    },
    // uploadImage(event: any) {
    uploadImage(event: { files: (File|undefined)[] }) {
      //event.files == files to upload
      this.file = event.files[0];
      this.uploadedImage = window.URL.createObjectURL(this.file);
    },
  }
})
</script>