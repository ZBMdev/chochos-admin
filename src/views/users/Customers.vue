<template>
  <div>
    <PageHeading title="Customers" subtitle="" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <!-- <Toolbar>
          <template #left>
          </template>
        </Toolbar> -->
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
              <div class="p-ml-auto">
                <span class="p-mr-2">Filter By</span>
                <Dropdown
                  class="filter-by p-ml-2"
                  v-model="selectedFilter"
                  :options="fitlterOptions"
                  placeholder="Filter By"
                  @change="filterTable"
                />
                <!-- <Button
                label="New"
                icon="pi pi-plus"
                class="p-button-success p-mr-2"
                @click="openNew"
              />

              <Button
                label="Delete"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedCategories || !selectedCategories.length"
              /> -->
              </div>
            </div>
          </template>

          <Column
            selectionMode="multiple"
            headerStyle="width: 2.3rem"
            :exportable="true"
          ></Column>
          <Column
            field="name"
            headerStyle="width: 250px"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['name']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column
            field="user_name"
            headerStyle="width: 150px"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.user_name }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['user_name']"
                class="p-column-filter"
                placeholder="Search by username"
              />
            </template>
          </Column>
          <Column
            field="last_login"
            headerStyle="width: 150px"
            header="Last active"
            sortField="last_login_date"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.last_login }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['last_login']"
                class="p-column-filter"
                placeholder="Search by last active"
              />
            </template>
          </Column>
          <Column
            field="dateRegistered"
            headerStyle="width: 150px"
            header="Date registered"
            sortField="created_at"
            filterMode="contains"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.dateRegistered }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['dateRegistered']"
                class="p-column-filter"
                placeholder="Search by date registered"
              />
            </template>
          </Column>
          <Column
            field="email"
            headerStyle="width: 250px"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['email']"
                class="p-column-filter"
                placeholder="Search by email"
              />
            </template>
          </Column>
          <Column
            field="orders"
            headerStyle="width: 150px"
            header="Orders"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.orders }}
            </template>
          </Column>
          <Column
            field="totalspent"
            headerStyle="width: 150px"
            header="Total Spent"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.totalspent }}
            </template>
          </Column>
          <Column
            field="aov"
            headerStyle="width: 150px"
            header="Average Order Value"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.aov }}
            </template>
          </Column>
          <Column
            field="address"
            headerStyle="width: 150px"
            header="Address"
            :sortable="true"
          >
            <!-- <template #body="slotProps">
              {{ slotProps.data.name }}
            </template> -->
            <template #filter>
              <InputText
                type="text"
                v-model="filters['address']"
                class="p-column-filter"
                placeholder="Search by address"
              />
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
import { LoginType, CustomerFilter } from '@/types/customer';
// import { toast } from '@/utils/helper';

@Options({
  components: { MainLayout, },
})
export default class Customers extends Vue {
  isLoading = false;
  customers: Customer[] = [];
  datasource: Customer[] = [];
  customerService = new CustomerService();
  selectedCustomers: Customer[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  selectedFilter = CustomerFilter.REGISTERED;
  fitlterOptions = [CustomerFilter.ALL, CustomerFilter.REGISTERED, CustomerFilter.ANONYMOUS]
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
    this.customerService.getAll(this.customerService.allUsers).then(data => {
      this.datasource = data.map((cust) => new Customer(cust));
      this.filterTable();
      this.isLoading = false;
    }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the customers", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }

  filterTable() {
    switch (this.selectedFilter) {
      case CustomerFilter.ALL:
        this.customers = this.datasource;
        break;
      case CustomerFilter.REGISTERED:
        this.customers = this.datasource.filter((user) => user.login_type !== LoginType.ANONYMOUS);
        break;
      case CustomerFilter.ANONYMOUS:
        this.customers = this.datasource.filter((user) => user.login_type === LoginType.ANONYMOUS);
        break;
      default:
        break;
    }
  }

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>