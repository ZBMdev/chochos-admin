<template>
  <div>
    <PageHeading
      title="Artisans"
      :subtitle="`${totalRecords} artisans in total`" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="artisan-dt"
          :value="artisans"
          v-model:selection="selectedArtisans"
          dataKey="id"
          :paginator="true"
          :rows="15"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[15, 30, 45, 60, 75]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artisans"
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
          <template #empty>
            No artisan found.
          </template>
          <template #loading>
            Loading artisans data. Please wait.
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
              {{ slotProps.data.fullName }}
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
            headerStyle="width: 250px"
            header="Name"
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
            field="about"
            headerStyle="width: 150px"
            header="About"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span
                v-html="`${slotProps.data.about.substr(0, 10)}...`"
              ></span>
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
            field="rating"
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
import Artisan from '@/models/Artisan';
import ArtisanService from '@/services/ArtisanService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface ArtisanLazyParameters {
  page: number;
  limit: number;
  name: string;
  maxPrice: string;
  minPrice: string;
  rating: number;
  discount: number;
  isPublished: boolean;
}

@Options({
  components: { MainLayout, },
})
export default class Artisans extends Vue {
  isLoading = false;
  artisans: Artisan[] = [];
  datasource: Artisan[] = [];
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  selectedArtisans: Artisan[] = [];
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
    this.service.getAllPaginated(this.service.allArtisans).then(data => {
      this.datasource = data.items.map((cust) => new Artisan(cust));
      this.totalRecords = data.totalCount;
      this.isLoading = false;
      console.log("users will soon show")
    }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the artisans", detail: "Please check your internet connection and refresh the page" })
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