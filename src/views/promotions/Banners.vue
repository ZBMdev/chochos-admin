<template>
  <div class="banners">
    <page-heading title="Banners" subtitle="Drag to reorder the banners" />
    <ProgressSpinner v-if="isLoading" />
    <template v-else>
      <draggable
        v-model="banners"
        item-key="id"
        :sort="true"
        @change="reorderBanners"
      >
        <template #header>
          <div class="p-d-flex p-jc-between p-ai-end p-mb-4">
            <div>
              <!-- hash <h4>Reorder Banners</h4> -->
            </div>
            <Button
              class="p-button-primary"
              @click="openNew"
              icon="pi pi-pw pi-plus"
              label="Add Banner"
            />
          </div>
        </template>
        <template #item="{element}">
          <div
            :key="element.id"
            class="p-grid p-jc-center p-ai-center banner-item"
            style="width: 100%"
          >
            <div
              class="p-col-1 p-row-2 handle p-d-flex p-jc-center p-ai-center"
            >
              <i class="pi pi-bars" style="font-size: 1.5rem" />
            </div>
            <div class="p-col-4 card-image">
              <img
                :src="element.image_url"
                :alt="element.name"
                style="width: 100%; height: 9rem;object-fit: cover;"
              />
            </div>
            <div class="p-col-7 card-description p-text-left">
              <h5 class="">
                {{ element.name }}
                <span v-if="element.activated" class="item-activated">
                  <i class="pi pi-check-circle"></i>
                  Activated
                </span>
                <span v-else class="item-deactivated">
                  <i class="pi pi-times-circle"></i>
                  Deactivated
                </span>
              </h5>
              <div v-if="element.description">
                <p>{{ element.description }}</p>
                <Button
                  class="p-button-small"
                  label="Edit"
                  icon="pi pi-pencil"
                  @click="editBanner(element)"
                />
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </template>

    <Dialog
      header="Banner Details"
      :modal="true"
      class="p-fluid"
      :style="{ width: '450px' }"
      v-model:visible="displayCreateForm"
    >
      <BannerEdit
        :banner="{ ...banner }"
        @updated="afterBannerUpdate"
        @created="afterBannerCreate"
      />
      <template #footer>
        <Button
          class="p-button-danger p-button-text"
          icon="pi pi-save"
          @click="deleteBannerDialog = true"
          label="Delete Banner"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteBannerDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="banner"
          >Are you sure you want to delete <b>{{ banner.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text p-button-danger"
          @click="deleteBannerDialog = false"
        />
        <LButton
          :loading="isDeleting"
          loadingLabel="Deleting"
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteBanner"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import BombsightService from '@/services/BombsightService';
// import ProductService from '@/services/ProductService';
import BannerService from '@/services/BannerService';
import Banner from '@/models/Banner';
import { useToast } from 'primevue/usetoast';
import Draggable from 'vuedraggable';
// import qs from 'qs';
import Product from '@/models/Product';
import { reactive } from 'vue';
import { BannerData } from '@/types/banner';
import BannerEdit from "@/components/promotions/BannerEdit.vue";

@Options({
  components: { Draggable, BannerEdit }
})
export default class Banners extends Vue {
  isLoading = false;
  displayCreateForm = false;
  submitted = false;
  bannerService = new BannerService();
  banners: Banner[] = [];
  banner!: Banner;
  toast = useToast();
  file!: File;
  allProducts!: Product[];
  isDeleting = false;
  bannerDialog = false;
  deleteBannerDialog = false;

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.getData();
      },
      { immediate: true }
    )
  }

  getData() {
    this.isLoading = true;
    this.bannerService.getAll()
      .then((data) => {
        this.banners = data.map((cat) => new Banner(cat))
        this.isLoading = false;
      })
    // this.getProducts("");
  }

  editBanner(banner: Banner) {
    this.updateBannerObj(banner);
    this.displayCreateForm = true;
  }


  confirmDeleteBanner(banner: Banner) {
    this.banner = banner;
    this.deleteBannerDialog = true;
  }

  updateBannerObj(value: Banner) {
    this.banner = reactive(value) as Banner;
  }

  openNew() {
    this.updateBannerObj(new Banner({}));
    this.submitted = false;
    this.displayCreateForm = true;
  }
  hideDialog() {
    this.displayCreateForm = false;
    this.submitted = false;
  }


  afterBannerUpdate(newBanner: BannerData) {
    this.isLoading = true;
    this.updateBannerObj(new Banner(newBanner));
    this.banners[this.findIndexById(this.banner.id)] = this.banner;
    this.isLoading = false;
    this.displayCreateForm = false;
  }

  afterBannerCreate(newBanner: BannerData) {
    this.isLoading = true;
    this.updateBannerObj(new Banner(newBanner));
    this.banners.push(this.banner);
    this.isLoading = false;
    this.displayCreateForm = false;
  }

  findIndexById(id: number): number {
    return this.banners.findIndex((cat) => cat.id === id)
  }

  // eslint-disable-next-line
  async reorderBanners({ moved }: any) {
    console.log(moved);
    this.banner = moved.element
    this.banner.order = moved.newIndex + 1
    this.updateBanner();
  }

  async updateBanner() {
    return this.bannerService.update(this.banner.id, this.banner.toCreateParam())
      .then((newBanner) => {
        this.updateBannerObj(new Banner(newBanner));
        this.banners[this.findIndexById(this.banner.id)] = this.banner;
        this.isLoading = false;
        return this.banner;
      }).finally(() => {
        this.isLoading = false
      });
  }

  deleteBanner() {
    this.isDeleting = true;
    this.bannerService.delete(this.banner.id)
      .then(() => {
        this.banners.splice(this.findIndexById(this.banner.id), 1)
        this.deleteBannerDialog = false
        this.hideDialog();
        this.toast.add({ severity: "info", detail: "Banner deleted successfully", life: 3000 })
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

}
</script>

<style>
.banner-item {
  background-color: var(--surface-a);
  margin: 0 0 1rem 0;
}
.banner-item .handle {
  color: var(--text-color-secondary);
  background: var(--surface-c);
  height: 10rem;
}
.banner-item .handle:hover {
  color: var(--text-color);
  background: var(--surface-d);
}
.multiselect-custom .item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin-right: 0.5rem;
  background-color: #6db26f;
  color: var(--primary-color-text);
}
.multiselect-custom .item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.multiselect-custom img {
  width: 1.5rem;
  height: 1.5rem;
  object-fit: cover;
  border-radius: 0.2rem;
  margin-right: 0.5rem;
}
</style>