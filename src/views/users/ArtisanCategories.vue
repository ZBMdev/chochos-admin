<template>
  <div>
    <PageHeading
      title="Artisans' Categories"
      :subtitle="`${totalRecords} in total`" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="artisan-dt"
          :value="artisansCat"
          v-model:selection="selectedArtisansCat"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artisans' category"
          :scrollable="true"
          responsiveLayout="scroll"
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
            No category found.
          </template>
          <template #loading>
            Loading categories data. Please wait.
          </template>
          <Column
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
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
            field="description"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Description"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span
                v-html="`${slotProps.data.description.substr(0, 25)}...`"
              ></span>
            </template>
          </Column>
          <Column
            field="created_on"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Created On"
            sortField="last_login_date"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.createdAt }}
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
import ArtisanCategory from '@/models/ArtisanCategory';
import ArtisanCategoryService from '@/services/ArtisanCategoryService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface ArtisanCatLazyParameters {
  page: number;
  limit: number;
  name: string;
  totalCount:  number;
}

@Options({
  components: { MainLayout, },
}) 

export default class Artisans extends Vue {
  isLoading = false;
  artisansCat: ArtisanCategory[] = [];
  datasource: ArtisanCategory[] = [];
  totalRecords = 0;
  service: ArtisanCategoryService = new ArtisanCategoryService();
  selectedArtisans: ArtisanCategory[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  lazyParams: Partial<ArtisanCatLazyParameters> = {};
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
        this.artisansCat = data.items.map((prod) => new ArtisanCategory(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
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