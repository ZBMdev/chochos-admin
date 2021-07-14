<template>
  <div>
    <PageHeading
      title="Vendors"
      :subtitle="`${totalRecords} vendors in total`" />
    <ProgressSpinner style="display:flex; justify-content: center; margin-top: 200px;" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="vendor-dt"
          :value="vendors"
          v-model:selection="selectedVendors"
          dataKey="id"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['fullName','username','email', 'languages', 'address']"
          :paginator="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vendors"
          :scrollable="true"
          :rowHover="true"
          responsiveLayout="scroll"
          @row-click="openVendor($event.data.id)"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              <div class="p-mb-2 p-m-md-0 p-as-md-center">
                <Button
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openNew"
                />
              </div>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template> <template #empty>
            No vendor found.
          </template>
          <template #loading>
            Loading vendors data. Please wait.
          </template>
          <Column headerStyle="width: 3rem; height: 50px; font-weight: bold;">
            <template #body="slotProps">
              <Avatar
                :label="slotProps.data.fullName.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029"
                shape="circle"
              />
            </template>
          </Column>
          <Column
            field="name"
            style="min-width: 12rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span v-html="`${slotProps.data.fullName?.substr(0, 25)}`"
              ></span>
            </template>
          </Column>
          <Column
            field="username"
            style="min-width: 12rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span v-html="`${slotProps.data.username?.substr(0, 15)}`"
              ></span>
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 12rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span v-html="`${slotProps.data.email?.substr(0, 20)}`"
              ></span>
            </template>
          </Column>
          <Column
            field="last_login"
            style="min-width: 10rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Last active"
            sortField="last_login_date"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.lastLogin }}
            </template>
          </Column>
          <Column
            field="rating"
            style="min-width: 12rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Reviews"
            filterField="rating"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Reviews</span>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            field="languages"
            style="min-width: 10rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Languages"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.languages }}
            </template>
          </Column>
          <Column
            field="address"
            style="min-width: 12rem"
            headerStyle="height: 50px; font-weight: bold;"
            header="Address"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.address}}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="newVendorDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '50vw'}"
      header="New Vendor"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div class="p-field p-fluid">
          <label>
           First name
          </label>
          <InputText
            v-model="newVendor.firstName"
          >
          </InputText>
         </div>
        <div class="p-field p-fluid">
          <label>
           Last name
          </label>
          <InputText
            v-model="newVendor.lastName"
            required="true"
            :class="{'p-invalid': submitted && !newVendor.lastName}"
          >
          </InputText>
          <small class="p-error" v-if="submitted && !newVendor.lastName">Lastname is required.</small>  
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="newVendor.email"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="newVendor.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Password
          </label>
          <Password
            v-model="newVendor.password"
            toggleMask
            :feedback="false"
            placeholder="*******"
          >
          </Password>
        </div>
        <!-- <div class="p-field p-fluid">
          <label>
            User Category
          </label>
          <InputNumber id="integeronly"
            v-model="newVendor.userCategory"
            aria-describedby="userCat"/>
            <small id="userCat" >Type in 2.</small>
        </div> -->

        <div class="p-field p-fluid">
          <label>
            User Category
          </label>
          <Dropdown
            v-model="newVendor.userCategory"
            :options="userCat"
            optionLabel="name"
            optionValue="code"
            placeholder="Select vendor"
            required="true"
            :class="{'p-invalid': submitted && !newVendor.userCategory}"
          />
          <small class="p-error" v-if="submitted && !newVendor.userCategory">Selection required.</small>
        </div>

        <Button @click="saveVendor" label="Submit" id="lbutton"></Button>
      </div> 
    </Dialog>

    <Dialog
      v-model:visible="vendorDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '50vw'}"
      header="Vendor Details"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              v-if="vendor.photoUrl === '' || vendor.photoUrl === null " 
              icon="pi pi-user"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <Avatar 
              v-else-if="vendor.fullName"
              :label="vendor.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img v-else
              :src="vendor.photoUrl"
              :alt="vendor.photoUrl"
              style="width:8rem;height:8rem;font-size:4rem;"
            />
          </div>
        <div class="p-field p-fluid">
          <label>
            Name
          </label>
          <InputText
            v-model="vendor.fullName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="vendor.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="vendor.email"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Address
          </label>
          <InputText
            v-model="vendor.address"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Mobile
          </label>
          <InputText
            v-model="vendor.mobile"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Reviews
          </label>
          <Rating
            :modelValue="vendor.rating"
            :readonly="true"
            :cancel="false"
            :stars="5"
          />
        </div>
        <div class="p-field p-fluid">
          <label>
            Languages
          </label>
          <InputText
            v-model="vendor.languages"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Last Login
          </label>
          <InputText
            v-model="vendor.lastLogin"
          >
          </InputText>
        </div>
      </div>      
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Vendor from '@/models/Vendor';
import VendorService from '@/services/VendorService';
import { VendorRegisterParams, VendorData } from '@/types/vendors'
import VendorBox from "@/components/users/VendorBox.vue";
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';
import Dialog from 'primevue/dialog';
import TrialVue from './Trial.vue';
// import { toast } from '@/utils/helper';

interface VendorLazyParameters {
  page: number;
  limit: number;
  name: string;
}

@Options({
  components: { MainLayout, VendorBox, Dialog },
})
export default class Vendors extends Vue {
  isLoading = false;
  vendors: Vendor[] = [];
  vendor!: Vendor;
  datasource: Vendor[] = [];
  newVendor = {} as VendorRegisterParams;
  vendorDialog = false;
  newVendorDialog = false;
  totalRecords = 0;
  service: VendorService = new VendorService();
  selectedVendors: Vendor[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  submitted = false;
  toast = useToast();
  lazyParams: Partial<VendorLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  userCat = [
    {name: 'Vendor', code: 2},
  ]

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.getData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  getData() {
    this.isLoading = true
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }
  
  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(this.service.allUsers)
      .then(data => {
        this.vendors = data.items.map((prod) => new Vendor(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the vendors", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }
  
  openNew(vendor: Vendor) {
    this.newVendorDialog = true;
    this.submitted = false;
  }
  // openVendor(vendor: Vendor) {
  //   this.vendor = vendor;
  //   this.vendorDialog = true;
  // }
  openVendor(id: number) {
    this.$router.push({ path: `/vendors/${id}`});
  }

  hideDialog() {
    this.vendorDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    return this.vendors.findIndex((ven) => ven.id === id)
  }

  saveVendor() {
    /*this.vendors.push(this.newVendor)
    this.toast.add({
          severity:'success',
          summary: 'Successful',
          detail: 'Vendor Created',
          life: 3000
        }); */
    this.submitted = true;
    if( this.submitted ) {

        this.toast.add({
          severity:'success',
          summary: 'Successful',
          detail: 'Vendor Created',
          life: 3000
        });
    }
    else{
      
        this.toast.add({
          severity:'danger',
          summary: 'Successful',
          detail: 'Complete the form',
          life: 3000
        });
    }
    this.service.createVendor(this.newVendor)
      .then((newVendor) => {
        // this.newVendorDialog = false;
        this.$emit("Vendor created", newVendor);
      }).catch((e) => {
        this.toast.add({ severity: 'error', summary: e, detail:"Sorry we could not create an vendor at the moment, please try again", life: 3000 });
      }).finally(() => {
        this.submitted = true;
        console.log(this.newVendor)
      });

      this.newVendorDialog = false;
  }

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
#lbutton {
  background: green;
}
</style>