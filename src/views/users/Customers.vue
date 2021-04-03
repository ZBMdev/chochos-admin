<template>
  <div>
    <PageHeading
      title="Customers" 
      :subtitle="`${totalRecords} users in total`"
    />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="customers p-datatable-sm"
          ref="customer-dt"
          :value="customers"
          v-model:selection="selectedCustomers"
          dataKey="id"
          :paginator="true"
          :rows="25"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers"
          :scrollable="true"
          responsiveLayout="scroll"
          style="width: 100%"
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

          <Column
            selectionMode="multiple"
            headerStyle="width: 2.3rem"
            :exportable="true"
          ></Column>
          <Column
            field="fullName"
            headerStyle="width: 250px"
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
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="username"
            headerStyle="width: 250px"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['username']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column><Column
            field="email"
            headerStyle="width: 250px"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['email']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.items.email }}
            </template>
          </Column>        
          <Column
            field="address"
            headerStyle="width: 250px"
            header="Address"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['address']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.items.address }}
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
// import { toast } from '@/utils/helper';

@Options({
  components: { MainLayout, },
})
export default class Customers extends Vue {
  isLoading = false;
  totalRecords = 0;
  fullNames = '';
  customers: Customer[] = [];
  datasource: Customer[] = [];
  customerService = new CustomerService();
  selectedCustomers: Customer[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();

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
    this.isLoading = true;
    this.customerService.getAllPaginated(this.customerService.allUsers).then(data => {
      this.datasource = data.items.map((cust) => new Customer(cust));
      this.totalRecords = data.totalCount;
      this.isLoading = false;
      console.log("users will soon show")
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