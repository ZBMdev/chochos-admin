<template>
  <div>
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="jobs"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['customerName','executorName','customerAddress', 'productsAmount', 'start_date']"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :totalRecords="totalRecords"
          :loading="isLoading"
          :first="firstRecordIndex"
          :rowHover="true"
          :scrollable="true"
          responsiveLayout="scroll"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <!--<span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>-->
            </div>
          </template>
          <template #empty>
            No job found.
          </template>
          <template #loading>
            Loading jobs data. Please wait.
          </template>
          <Column
            field="CustomerName"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Customer"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.customerName }}
            </template>
          </Column>
          <Column
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Executor"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.executorName }}
            </template>
          </Column>
          <Column
            field="address"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Address"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.customerAddress }}
            </template>
          </Column>
          <Column
            ref="price"
            field="totalAmount"
            headerStyle="min-width: 14rem"
            style="min-width: 14rem"
            header="Amount"
            filterField="price"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Amount</span>
              {{ formatCurrency(slotProps.data.productsAmount) }}
            </template>
          </Column>
          <Column
            ref="date"
            field="date"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Start Date"
            filterField="date"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Start Date</span>
              {{ slotProps.data.start_date }}
            </template>
          </Column>
          <Column
            field="rating"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Job Reviews"
            filterField="rating"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Job Reviews</span>
              <Rating
                :modelValue="slotProps.data.customerReview"
                :readonly="true"
                :cancel="false"
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
import Job from '@/models/Job'
import JobService from '@/services/JobService';
import { JobData } from '@/types/jobs'
// import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';

interface JobLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      JobData[];
  totalCount: number;
}

export default class NewJobs extends Vue {
  jobs: Job[] = [];
  selectedJobs: Job[] = [];
  filterValue = '';
  isLoading = false;
  generalLoading = false;
  totalRecords = 0;
  service: JobService = new JobService();
  // filters = {
  //   'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  //   'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  // };
  // matchModeOptions =  [
  //   {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  // ]
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
    this.isLoading = true;
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }


  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(this.service.allJobs)
      .then(data => {
        this.jobs = data.items.map((prod) => new Job(prod));
        const newJobs = this.jobs.filter((ele) => {
          return ele.status === 0;
        });
        this.jobs = newJobs;
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
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

.product-badge.status-New {
  background: #8089da;
  color: #0d0a2b;
}
.product-badge.status-PaymentSuccessful {
  background: #feedaf;
  /* color: #e1f061; */
  color: #443602
}
.product-badge.status-PaymentFailed {
  background: #ffcdd2;
  color: #c63737;
}
.product-badge.status-Started {
  background: #d9d9f8;
  color: #100ea1;
}
.product-badge.status-Paused {
  background: #fad0d4;
  color: #642f2f;
}
.product-badge.status-Completed {
  background: #c8e6c9;
  color: #256029;
}
.product-badge.status-Dispute {
  background: #ffe1cd;
  color: #ff8c00;
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

