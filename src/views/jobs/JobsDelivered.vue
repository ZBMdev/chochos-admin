<template>
  <div class="order-list">
    <PageHeading title="Jobs Delivered" :subtitle="`${totalRecords} job deliveries in total`"/>
   <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
         :value="jobs"
        >
        <Column
            field="name"
            headerStyle="width: 250px"
            header="Customer"
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
              {{ slotProps.data.customerName }}
            </template>
          </Column> <Column
            field="name"
            headerStyle="width: 250px"
            header="Executor"
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
              {{ slotProps.data.executorName }}
            </template>
          </Column>
          <Column
            ref="price"
            field="totalAmount"
            header="Amount"
            filterField="price"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Amount</span>
              {{ formatCurrency(slotProps.data.amount) }}
            </template>
          </Column>
          <Column
            header="Status"
            filterField="quantity"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Status</span>
              <span
                :class="
                  'product-badge status-' +
                    slotProps.data.stockAvailability.toLowerCase()
                "
                >{{ slotProps.data.stockAvailability }}</span
              >
            </template>
          </Column>
          
        </DataTable>
      </template>
    </Card>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Job from '@/models/Job'
import Rating from 'primevue/rating';
import JobService from '@/services/JobService';
import { JobData } from '@/types/jobs'
import qs from 'qs';

interface JobLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      JobData[];
  totalCount: number;
}

export default class ProductList extends Vue {
  jobs: Job[] = [];
  selectedJobs: Job[] = [];
  filterValue = '';
  loading = false;
  generalLoading = false;
  totalRecords = 0;
  service: JobService = new JobService();
  filters = {
    name: "",
    price: undefined,
    rating: undefined,
    status: "",
  };
  lazyParams: Partial<JobLazyParameters> = {};
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
    this.service.getAllPaginated(this.service.allJobs)
      .then(data => {
        this.jobs = data.items.map((prod) => new Job(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.loading = false;
        this.generalLoading = false;
      });
  }

  // eslint-disable-next-line
  onPage(event: any) {
    //event.page: New page number
    //event.first: Index of first record
    //event.rows: Number of rows to display in new page
    //event.pageCount: Total number of pages
    // console.log(event);
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as JobLazyParameters;
    this.loadLazyData();
  }

  // eslint-disable-next-line
  onSort(event: any) {
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as JobLazyParameters;
    this.loadLazyData();
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
