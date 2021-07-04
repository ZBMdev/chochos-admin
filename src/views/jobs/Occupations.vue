<template>
  <div>
    <PageHeading
      title="All Occupations"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="occupations"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name']"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :rowsPerPageOptions="[10,20,50, 100, 200]"
          responsiveLayout="scroll"
          :scrollable="true"
          :rowHover="true"
        >
          <template #header>
            <div class="table-header">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search occupations"
                />
              </span>
            </div>
          </template>
          <Column
            field="name"
            style="min-width: 14rem"
            header="Name"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            header="Image"
            style="min-width: 14rem">
            <template #body="slotProps">
              <span class="p-column-title">Image</span>
              <img
                :src="slotProps.data.image"
                class="product-image"
              />
            </template>
          </Column>
          <Column
            field="description"
            style="min-width: 14rem"
            header="Description"
            filterField="description"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Description</span>
              {{ slotProps.data.description }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Occupation from '@/models/Occupation'
import OccupationService from '@/services/OccupationService';
import { OccupationData } from '@/types/occupation'
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';

interface OccupationLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
}

export default class OccupationList extends Vue {
  occupations: Occupation[] = [];
  selectedCategories: Occupation[] = [];
  filterValue = '';
  loading = false;
  generalLoading = false;
  service: OccupationService = new OccupationService();
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  lazyParams: Partial<OccupationLazyParameters> = {};
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
    this.generalLoading = true
    this.loading = true;
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  loadLazyData() {
    this.loading = true;
    this.service.getAll(this.service.allOccupations)
      .then(data => {
        this.occupations = data.map((prod) => new Occupation(prod));
        this.loading = false;
        this.generalLoading = false;
      });
  }

  openOccupation(id: number) {
    this.$router.push({ path: `/occupations/${id}`});
  }

}
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 50px;
  height: 3rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: cover;
  object-position: center;
}
.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 40em) {
  .p-datatable.p-datatable-responsive-demo .p-datatable-thead > tr > th,
  .p-datatable.p-datatable-responsive-demo .p-datatable-tfoot > tr > td {
    display: none !important;
  }
  .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td {
    text-align: left;
    display: block;
    border: 0 none !important;
    width: 100% !important;
    float: left;
    clear: left;
  }
  .p-datatable.p-datatable-responsive-demo
    .p-datatable-tbody
    > tr
    > td
    .p-column-title {
    padding: 0.4rem;
    min-width: 30%;
    display: inline-block;
    margin: -0.4em 1em -0.4em -0.4rem;
    font-weight: bold;
  }
}

.product-badge.status-instock {
  background: #c8e6c9;
  color: #256029;
}
.product-badge.status-lowstock {
  background: #feedaf;
  color: #8a5340;
}
.product-badge.status-outofstock {
  background: #ffcdd2;
  color: #c63737;
}
.product-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
</style>
