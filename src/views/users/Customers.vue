<template>
  <div>
    <PageHeading
      title="Customers" 
      :subtitle="`${totalRecords} customers in total`"
    />
    <ProgressSpinner style="display:flex; justify-content: center; margin-top: 200px; " v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          ref="dt"
          :value="customers"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['fullName','username', 'email','address', 'languages']"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll"
          :scrollable="true"
          :rowHover="true"
          :totalRecords="totalRecords"
          :first="firstRecordIndex"
          @row-click="openCustomer($event.data.id)"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <template #empty>
            No customer found.
          </template>
          <template #loading>
            Loading customers data. Please wait.
          </template>
          <Column
            field="name"
            headerStyle="width: 3rem; height: 50px; font-weight: bold;"
            style="width: 3rem;"
          >
            <template #body="{data}">
              <Avatar
                :label="data.name.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029"
                shape="circle"
              />
            </template>
          </Column>
          <Column
            ref="fullName"
            field="fullName"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
          </Column>
          <Column
            ref="username"
            field="username"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column>
          <Column
            ref="email"
            field="email"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>        
          <Column
            ref="address"
            field="address"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Address"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.address }}
            </template>
          </Column>
          <Column
            ref="languages"
            field="languages"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Languages"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.languages }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="customerDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '50vw'}"
      header="Customer's Details"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div class="p-d-flex p-jc-center p-ai-center ">
          <Avatar
              v-if="customer.photoUrl === '' || customer.photoUrl === null " 
              icon="pi pi-user"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <Avatar 
              v-else-if="customer.fullName"
              :label="customer.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img v-else
              :src="customer.photoUrl"
              :alt="customer.photoUrl"
              style="width:8rem;height:8rem;font-size:4rem;"
            />
        </div>
        <div class="p-field p-fluid">
          <label>
            Name
          </label>
          <InputText
            v-model="customer.fullName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="customer.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="customer.email"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Address
          </label>
          <InputText
            v-model="customer.address"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Mobile
          </label>
          <InputText
            v-model="customer.mobile"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Languages
          </label>
          <InputText
            v-model="customer.languages"
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
import Customer from '@/models/Customer';
import CustomerService from '@/services/CustomerService';
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface CustomerLazyParameters {
  page: number;
  limit: number;
  name: string;
}


@Options<CustomerList>({
  components: { MainLayout, },
})

export default class CustomerList extends Vue {
  isLoading = false;
  totalRecords = 0;
  customers: Customer[] = [];
  customer!: Customer;
  datasource: Customer[] = [];
  service: CustomerService = new CustomerService();
  selectedCustomers: Customer[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  customerDialog = false;
  submitted = false;
  toast = useToast();
  lazyParams: Partial<CustomerLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;

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
        this.customers = data.items.map((prod) => new Customer(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the customers", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }
  
  // openCustomer(customer: Customer) {
  //   this.customer = customer;
  //   this.customerDialog = true;
  // }

  openCustomer(id: number) {
    this.$router.push({ path: `/customers/${id}`});
  }
}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>
