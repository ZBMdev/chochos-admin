<template>
  <div>
    <PageHeading
      title="All Skills"
    />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="skills"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :lazy="true"
          responsiveLayout="scroll"
          :scrollable="true"
          :totalRecords="totalRecords"
          :loading="isLoading"
          :first="firstRecordIndex"
          :rowHover="true"
        >
        <Column
            field="name"
            headerStyle="width: 250px"
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
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="description"
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
import Skills from '@/models/Skills'
import Rating from 'primevue/rating';
import SkillsService from '@/services/SkillsService';
import { SkillsData } from '@/types/skills'
import qs from 'qs';

interface SkillsLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  totalCount: number;
}

export default class SkillsList extends Vue {
  skills: Skills[] = [];
  selectedCategories: Skills[] = [];
  filterValue = '';
  loading = false;
  generalLoading = false;
  service: SkillsService = new SkillsService();
  filters = {
    name: "",
    price: undefined,
    rating: undefined,
    status: "",
  };
  lazyParams: Partial<SkillsLazyParameters> = {};
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
    this.service.getAll(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.skills = data.map((prod) => new Skills(prod));
        this.loading = false;
        this.generalLoading = false;
      });
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
