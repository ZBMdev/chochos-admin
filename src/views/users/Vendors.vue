<template>
  <div>
    <PageHeading
      title="Vendors"
      :subtitle="`${totalRecords} vendors in total`" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="vendors p-datatable-sm"
          ref="vendor-dt"
          :value="vendors"
          v-model:selection="selectedVendors"
          dataKey="id"
          :paginator="true"
          :rows="25"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vendors"
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
              {{ slotProps.data.items.fullName }}
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
            field="username"
            headerStyle="width: 150px"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['username']"
                class="p-column-filter"
                placeholder="Search by username"
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
              {{ slotProps.data.items.email }}
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
            field="totalRatingValue"
            headerStyle="width: 150px"
            header="Rating"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.totalRatingValue }}
            </template>
          </Column>
          <Column
            field="languages"
            headerStyle="width: 150px"
            header="Languages"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.languages }}
            </template>
          </Column>
          <Column
            field="address"
            headerStyle="width: 150px"
            header="Address"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.address}}
            </template>
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
import Vendor from '@/models/Vendor';
import VendorService from '@/services/VendorService';
import { useToast } from 'primevue/usetoast';
// import { toast } from '@/utils/helper';

@Options({
  components: { MainLayout, },
})
export default class Vendors extends Vue {
  isLoading = false;
  vendors: Vendor[] = [];
  datasource: Vendor[] = [];
  totalRecords = 0;
  vendorService = new VendorService();
  selectedVendors: Vendor[] = [];
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
    this.vendorService.getAllPaginated(this.vendorService.allUsers).then(data => {
      this.datasource = data.items.map((cust) => new Vendor(cust));
      this.totalRecords = data.totalCount;
      this.isLoading = false;
      console.log("Vendors will soon show")
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