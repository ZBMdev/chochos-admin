<template>
  <div class="dashboard">
    <PageHeading title="Dashboard" />

    <!-- Stats -->
    <div class="stats p-mt-2 p-mb-4">
      <h4 class="p-mb-2">Summary</h4>
      <p>Click to see more details</p>
      <div class="p-grid">
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Jobs"
            :loading="summaryLoading"
            :value="`${job.totalCount}`"
            :action="() => $router.push({ name: 'jobs' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Jobs Requested"
            :loading="summaryLoading"
            :value="`${jobRequests.totalCount}`"
            :action="() => $router.push({ name: 'jobRequests' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Customers"
            :loading="summaryLoading"
            :value="`${customer.totalCount}`"
            :action="() => $router.push({ name: 'customers' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Artisans"
            :loading="summaryLoading"
            :value="`${artisan.totalCount}`"
            :action="() => $router.push({ name: 'artisans' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Vendors"
            :loading="summaryLoading"
            :value="`${vendor.totalCount}`"
            :action="() => $router.push({ name: 'customers' })"
            :stat="{}"
          />
        </div>
        <!-- <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Monthly Earnings"
            :loading="summaryLoading"
            :value="`&#8358; ${summary.monthlyEarning}`"
            :action="() => {}"
            :stat="{}"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FancyCard from '@/components/dashboard/FancyCard.vue'
// import Chart from 'primevue/chart'
// import { DashboardSummary, TimeSummary } from '@/types/dashboard';
import DashboardService from '@/services/DashboardService';
import ArtisanService from '@/services/ArtisanService';
import CustomerService from '@/services/CustomerService';
import VendorService from '@/services/VendorService';
import JobService from '@/services/JobService';
import JobRequestService from '@/services/JobRequestService';
import JobRequest from '@/models/JobRequest'
// import Artisans from '@/views/users/ArtisanList.vue'
// import Vendors from '@/views/users/VendorList.vue'
import { VendorSummary } from '@/types/vendors'
import { ArtisanSummary } from '@/types/artisan'
import { CustomerSummary } from '@/types/customer'
import { JobsSummary } from '@/types/jobs';
import { JobRequestSummary } from '@/types/jobRequest';

export default defineComponent({
  components: { FancyCard },
  name: "Dashboard",
  
  mounted() {
    this.summaryLoading = true;
    /* (new DashboardService()).getSummary()
      .then((data) => {
        this.summary = data;
      }).finally(() => {
        this.summaryLoading = false;
      }); */

    (new ArtisanService()).getSummary()
      .then((data) => {
        this.artisan = data;
      }).finally(() => {
        this.summaryLoading = false;
      });

    (new CustomerService()).getSummary()
      .then((data) => {
        this.customer = data;
      }).finally(() => {
        this.summaryLoading = false;
      });
      
    (new VendorService()).getSummary()
      .then((data) => {
        this.vendor = data;
      }).finally(() => {
        this.summaryLoading = false;
      });
      
    (new JobService()).getSummary()
      .then((data) => {
        this.job = data;
      }).finally(() => {
        this.summaryLoading = false;
      });

     (new JobRequestService()).getSummary()
      .then((data) => {
        this.jobRequests = data;
      })

    /* this.timeLoading = true;
    (new DashboardService()).getTime()
      .then((data) => {
        this.time = data;
      }).finally(() => {
        this.timeLoading = false;
      }); */
  },
  data() {
    return {
      summaryLoading: false,
      // summary: {} as DashboardSummary,
      vendor: {} as VendorSummary,
      artisan: {} as ArtisanSummary,
      customer: {} as CustomerSummary,
      job: {} as JobsSummary,
      jobRequests: {} as JobRequestSummary,
      timeLoading: false,
      // time: {} as TimeSummary,
    }
  }
})
</script>

<style scoped>
.p-md-4 {
  padding: 0.5rem !important;
}
#pie {
  width: 50px;
  height: 50px;
}
</style>



