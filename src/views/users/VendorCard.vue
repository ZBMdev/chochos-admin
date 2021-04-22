<template>
  <PageHeading title=" Vendor's Profile" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-grid">
    <div class="p-col-12 p-md-6">
      <Card
        class="p-text-center"
        :value="vendor"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar 
                v-if="vendor.fullName"
                :label="vendor.fullName.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              />
              <Avatar
                v-else
                icon="pi pi-user"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              />
            <!--<div class="p-grid p-gutter-4 product-images">
                <div
                  v-for="image in vendor.photoUrl"
                  :key="image.id"
                  class="p-col-6 p-lg-4"
                >
                <img
                  :src="vendor.photoUrl"
                  :alt="vendor.photoUrl + image.id"
                  style="width:8rem;height:8rem;font-size:4rem;"/>
              </div>
            </div> -->              
            <!--<Avatar 
                v-if="vendor.fullName.charAt(0).toUpperCase()"
                :label="vendor.fullName.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              />
              <Avatar
                v-else
                icon="pi pi-user"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              /> -->
            <!-- <Avatar
                icon="pi pi-user"
                class="p-mr-2"
                style="background-color:#9c27b0;color:#ffffff;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              /> -->
          </div>
        </template>
        <!--<template #title>
            <InputText
                  class="p-inputtext-md vendor-title"
                  id="name"
                  type="text"
                  :required="true"
                  v-model="vendor.fullName"
                />
        </template> -->
        <template #body="slotProps">
            <span v-bind="fullName">
                 {{ vendor.fullName}}
            </span>
            <p>
              Full Name: <b>{{ slotProps.data.fullName }}</b> 
            </p>
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Name: <b>{{ vendor?.fullName }}</b>
            </p>
            <p>
              Username: <b>{{ "@" + vendor?.username }}</b>
            </p>
            <p>
              Email: <b>{{ vendor?.email }}</b>
            </p>
            <p>
              Products: <b>{{ vendor?.about }}</b>
            </p>
            <p>
              Address: <b>{{ vendor?.address }}</b>
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Vendor from '@/models/Vendor';
import VendorService from '@/services/VendorService';
import { VendorData } from '@/types/vendors'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
/* eslint-disable */

/*
export default defineComponent({
  components: { DynamicForm },
  data() {
    return {
      vendor: {
        fullName: '',
        username: '',
        about: ' ',
        email: '',
        products: ''
      },
      initials: '',
      service: new VendorService(),
      Toast: useToast(),
      vendorName: reactive(new Vendor({})) as Vendor,
      currentVendor: undefined as VendorData | undefined,
      loading: false,
    }
  },
  async mounted() {

    this.loading = true;
    // this.currentVendor = await this.vendorName;

    
      this.vendor.fullName,
      this.vendor.username,
      this.vendor.email,
      // this.admin.role_id = this.user.role_id
      this.loading = false;
    

    // this.initials = this.vendorName.fullName.charAt(0).toUpperCase();
  }
})   */  



@Options<VendorCard>({
  components: { DynamicForm  },
})

export default class VendorCard extends Vue {

  isLoading = false;
  vendors: Vendor[] = [];
  vendor = reactive(new Vendor({})) as Vendor;
  datasource: Vendor[] = [];
  totalRecords = 0;
  service: VendorService = new VendorService();
  selectedVendors: Vendor[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  // lazyParams: Partial<VendorLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;  


  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.thereIsAnID) {
          this.getData();
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  get thereIsAnID() {
    return !!this.$route.params.id
  }

  getData() {
    this.getVendor();
  }

  getVendor() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((vendorData) => {
        this.setVendor(new Vendor(vendorData));
        this.isLoading = false;
      });
  }

  setVendor(value: Vendor) {
    this.vendor = reactive(value) as Vendor;
  }
}
</script>












