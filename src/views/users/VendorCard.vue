<template>
  <PageHeading :title="`${vendor.fullName}'s Profile`" style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-flex p-jc-center p-ai-center">
    <div class="p-col-12 p-md-6">
      <Card
        class="p-text-center"
        :value="vendor"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <!-- <img v-if="vendor.photoUrl !== '' || vendor.photoUrl !== null || vendor.photoUrl !== string " 
              :src="vendor.photoUrl"
              :alt="vendor.photoUrl"
              style="width:8rem; height:8rem; font-size:4rem; border-radius: 50%;"
            />
            <Avatar 
              v-else-if="vendor.fullName !== '' || vendor.fullName !== null "
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
            <Avatar 
              v-if="vendor.photoUrl === '' || vendor.photoUrl === null || vendor.photoUrl === 'string' " 
              :label="vendor.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img
              v-else-if="vendor.fullName" 
              :src="vendor.photoUrl"
              :alt="vendor.photoUrl"
              style="width:8rem; height:8rem; font-size:4rem; border-radius: 50%;"
            />
            <Avatar
              v-else
              icon="pi pi-user"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
          </div>
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Name: <span> {{ vendor?.fullName }}</span>
            </p>
            <p>
              Username: <span> {{ "@" + vendor?.username }}</span>
            </p>
            <p>
              Email: <span> {{ vendor?.email }}</span>
            </p>
            <p>
              Mobile: <span> {{ vendor?.mobile }}</span>
            </p>
            <p>
              Address: <span> {{ vendor?.address }}</span>
            </p>
            <p>
              Date joined: <span> {{ vendor?.created_on }}</span>
            </p>
            <p>
              last login: <span> {{ vendor?.lastLogin }}</span>
            </p>
            <div class="rating">
                  <p> Average rating </p>
                  <Rating
                    :modelValue="vendor.rating"
                    :readonly="true"
                    :cancel="false"
                    :stars="5"
                    class="ratingNumber"
                  />
                </div>
            <div class="status">
                  <p> Status: </p>
                  <div v-if="vendor.isActive === true">
                    <p class="active"> Active </p>
                  </div>
                  <div v-else>
                    <p class="block"> Inactive </p>
                  </div>
                </div>
            <div class="about">
              <h4>About </h4>
              <div class="about-card">
                {{ vendor.about}}
              </div>
            </div>
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












