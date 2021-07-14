<template>
  <div>
    <PageHeading
      title="Jobs"
      :subtitle="`${totalRecords} jobs in total`"
    />
    <ProgressSpinner style="display:flex; justify-content: center; margin-top: 200px" v-if="isLoading" />
    <div v-else>
      <TabView :value="vendor">
        <TabPanel header="All Jobs">
          <AllJobs />
        </TabPanel>
        <TabPanel header="New Jobs">
          <NewJobs />
        </TabPanel>
        <TabPanel header="Payment-Successful Jobs">
          <PaySuccessJobs />
        </TabPanel>
        <TabPanel header="Payment-Failed Jobs">
          <PayFailedJobs />
        </TabPanel>
        <TabPanel header="Started Jobs">
          <StartedJobs />
        </TabPanel>
        <TabPanel header="Paused Jobs">
          <PausedJobs />
        </TabPanel>
        <TabPanel header="Completed Jobs">
          <CompletedJobs />
        </TabPanel>
        <TabPanel header="Disputed Jobs">
          <DisputedJobs />
        </TabPanel>
      </TabView>
    </div>    
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Job from '@/models/Job'
import AllJobs from '@/views/jobs/AllJobs.vue'
import NewJobs from '@/views/jobs/NewJobs.vue'
import PaySuccessJobs from '@/views/jobs/PaymentSuccessJobs.vue'
import PayFailedJobs from '@/views/jobs/PaymentFailedJobs.vue'
import StartedJobs from '@/views/jobs/StartedJobs.vue'
import PausedJobs from '@/views/jobs/PausedJobs.vue'
import CompletedJobs from '@/views/jobs/CompletedJobs.vue'
import DisputedJobs from '@/views/jobs/DisputedJobs.vue'
// import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';
import { defineComponent } from 'vue';
import JobService from '@/services/JobService';

interface JobLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  totalCount: number;
}

@Options({
  components: { AllJobs, NewJobs, PaySuccessJobs, PayFailedJobs,
    StartedJobs, PausedJobs, CompletedJobs, DisputedJobs
  }
})

export default class Jobs extends Vue {
  jobs: Job[] = [];
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

  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(this.service.allJobs)
      .then(data => {
        this.jobs = data.items.map((prod) => new Job(prod));
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

