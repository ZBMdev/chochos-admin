<!--<template>
  <div>
    <PageHeading
      title="Customers" 
      :subtitle="`${totalRecords} users in total`"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="customers"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :lazy="true"
          responsiveLayout="scroll"
          :scrollable="true"
          paginatorPosition="both"
          :totalRecords="totalRecords"
          :loading="isLoading"
          :first="firstRecordIndex"
          :rowHover="true"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global']"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <template #empty>
            No user found.
          </template>
          <template #loading>
            Loading users data. Please wait.
          </template>
          <Column
            field="name"
            headerStyle="width: 3rem;"
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
            field="name"
            style="min-width: 14rem"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['name']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
          </Column>
          <Column
            field="username"
            style="min-width: 14rem"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['username']"
                class="p-column-filter"
                placeholder="Search by username"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 14rem"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['email']"
                class="p-column-filter"
                placeholder="Search by email"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>        
          <Column
            field="address"
            style="min-width: 14rem"
            header="Address"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['address']"
                class="p-column-filter"
                placeholder="Search by address"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.address }}
            </template>
          </Column>
          <Column
            field="languages"
            style="min-width: 10rem"
            header="Languages"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['languages']"
                class="p-column-filter"
                placeholder="Search by languages"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.languages }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Customer from '@/models/Customer';
import CustomerService from '@/services/CustomerService';
import { useToast } from 'primevue/usetoast';
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
  datasource: Customer[] = [];
  service: CustomerService = new CustomerService();
  selectedCustomers: Customer[] = [];
  filters: Record<string, unknown> = {};
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
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
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

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>
-->

<template>
  <div>
    <PageHeading
      title="Customers" 
      :subtitle="`${totalRecords} users in total`"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          ref="dt"
          :value="customers"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll"
          :scrollable="true"
          paginatorPosition="both"
          :totalRecords="totalRecords"
          :loading="isLoading"
          :first="firstRecordIndex"
          :rowHover="true"
          :lazy="true"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global']"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <template #empty>
            No user found.
          </template>
          <template #loading>
            Loading users data. Please wait.
          </template>
          <Column
            field="name"
            headerStyle="width: 3rem;"
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
            style="min-width: 14rem"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['fullName']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
          </Column>
          <Column
            ref="username"
            field="username"
            style="min-width: 14rem"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['username']"
                class="p-column-filter"
                placeholder="Search by username"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column>
          <Column
            ref="email"
            field="email"
            style="min-width: 14rem"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['email']"
                class="p-column-filter"
                placeholder="Search by email"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>        
          <Column
            ref="address"
            field="address"
            style="min-width: 14rem"
            header="Address"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['address']"
                class="p-column-filter"
                placeholder="Search by address"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.address }}
            </template>
          </Column>
          <Column
            ref="languages"
            field="languages"
            style="min-width: 10rem"
            header="Languages"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['languages']"
                class="p-column-filter"
                placeholder="Search by languages"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.languages }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Customer from '@/models/Customer';
import CustomerService from '@/services/CustomerService';
import { useToast } from 'primevue/usetoast';
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
  datasource: Customer[] = [];
  service: CustomerService = new CustomerService();
  selectedCustomers: Customer[] = [];
  filters: Record<string, unknown> = {};
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
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
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

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>
