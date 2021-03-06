<template>
  <div>
    <PageHeading
      title="Job Requests"
    />
    <ProgressSpinner style="display:flex; justify-content: center; margin-top: 200px" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="jobRequests"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['executorName', 'customerName', 'productsAmount', 'status']"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :totalRecords="totalRecords"
          :loading="isLoading"
          :first="firstRecordIndex"
          responsiveLayout="scroll"
          :scrollable="true"
          :rowHover="true"
          @row-click="openRequest($event.data.id)"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <template #empty>
            No job found.
          </template>
          <template #loading>
            Loading jobs data. Please wait.
          </template>
          <Column
            field="customerName"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Customer"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.customerName }}
            </template>
          </Column>
          <Column
            field="executorName"
            headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
            style="min-width: 14rem"
            header="Executor"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.executorName }}
            </template>
          </Column>
           <Column
            ref="quantity"
            header="Products"
            style="min-width: 14rem"
            headerStyle="height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.productsName != null" v-html="`${slotProps.data.productsName?.substr(0, 15)}...`"
              ></span>
            </template>
          </Column> 
          <Column
            ref="quantity"
            field="billOfQuantities.quantity"
            header="Quantity"
            style="min-width: 14rem"
            headerStyle="height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Quantity</span>
              {{ slotProps.data.productQuantity}}
            </template>
          </Column> 
          <Column
            ref="totalAmount"
            field="totalAmount"
            header="Amount"
            style="min-width: 14rem"
            headerStyle="height: 50px; font-weight: bold;"
            filterField="price"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Amount</span>
              {{ formatCurrency(slotProps.data.totalAmount) }}
            </template>
          </Column>
          <Column
            ref="date"
            field="date"
            header="Start Date"
            style="min-width: 14rem"
            headerStyle="height: 50px; font-weight: bold;"
            filterField="date"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Start Date</span>
              {{ slotProps.data.start_date }}
            </template>
          </Column>  
          <Column
            ref="status"
            field="status"
            header="Job Status"
            style="min-width: 14rem"
            headerStyle="height: 50px; font-weight: bold;"
            filterField="status"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Job Status</span>
              <span
                :class="
                  'product-badge status-' +
                    slotProps.data.jobStatus
                "
                >{{ slotProps.data.jobStatus }}
                </span>
            </template>
          </Column>  
          <Column
            field="rating"
            header="Job Reviews"
            filterField="rating"
            filterMatchMode="contains"
            style="min-width: 14rem"
            headerStyle="height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Job Reviews</span>
              <Rating
                :modelValue="slotProps.data.executorReview"
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
import JobRequest from '@/models/JobRequest'
import Rating from 'primevue/rating';
import JobRequestService from '@/services/JobRequestService';
import { JobRequestData } from '@/types/jobRequest';
import {FilterMatchMode} from 'primevue/api';

import qs from 'qs';

interface JobLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      JobRequestData[];
  totalCount: number;
}

export default class ProductList extends Vue {
  jobRequests: JobRequest[] = [];
  selectedJobRequests: JobRequest[] = [];
  filterValue = '';
  isLoading = false;
  generalLoading = false;
  totalRecords = 0;
  service: JobRequestService = new JobRequestService();
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
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
        this.jobRequests = data.items.map((prod) => new JobRequest(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
        this.generalLoading = false;
      });
  }

  openRequest(id: number) {
    this.$router.push({ path: `/job-requests/${id}`});
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

.product-badge.status-New {
  background: #8089da;
  color: #0d0a2b;
}
.product-badge.status-Approved {
  background: #feedaf;
  /* color: #e1f061; */
  color: #443602
}
.product-badge.status-Declined {
  background: #ffcdd2;
  color: #c63737;
}
.product-badge.status-SendBill {
  background: #d9d9f8;
  color: #100ea1;
}
.product-badge.status-ConfirmBill {
  background: #c8e6c9;
  color: #256029;
}
.product-badge.status-RejectBill {
  background: #ffe1cd;
  color: #ff8c00;
}

@media only screen and (max-width: 766px){
  .p-card {
    width: 350px;
  }
}
</style>

