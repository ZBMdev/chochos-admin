<template>
  <div class="dashboard">
    <PageHeading title="Dashboard" />
    <div class="stats p-mt-2 p-mb-4">
      <h4 class="p-mb-2">Hi {{}}, welcome back!</h4>
      <div class="p-grid">
        <div class="p-col-12 p-md-6">
          <Card>
            <template #title>
              Users
            </template>
            <template #content>
              <Chart
                type="line"
                :data="basicData"
                :options="basicOptions"
              />
            </template>
          </Card>
        </div>
        <div class="card">
          <h5>Basic</h5>
          <Chart type="line" :data="basicData" :options="basicOptions" />
        </div>
      </div>
      <div class="p-grid">
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="All Users"
            :loading="summaryLoading"
            :value="`${summary.registeredUsers}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-2"
            title="Active Users"
            :loading="summaryLoading"
            :value="`${summary.activeUsers}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-3"
            title="Blocked Users"
            :loading="summaryLoading"
            :value="`${summary.blockedUsers}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-4"
            title="Flagged Users"
            :loading="summaryLoading"
            :value="`${summary.flaggedUsers}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Public Topics"
            :loading="summaryLoading"
            :value="`${summary.publicTopics}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-3"
            title="Private Topics"
            :loading="summaryLoading"
            :value="`${summary.privateTopics}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
      </div>

      <div>
        <h3>Topics </h3>
        <div class="p-grid">
          <div class="p-col-12 p-md-4">
            <FancyCard
              class="fancy-card-3"
              title="Private Topics"
              :loading="summaryLoading"
              :value="`${summary.privateTopics}`"
              :action="() => {}"
              :stat="{}"
            />
          </div>
          <div class="p-col-12 p-md-4">
            <FancyCard
              class="fancy-card-1"
              title="Public Topics"
              :loading="summaryLoading"
              :value="`${summary.publicTopics}`"
              :action="() => {}"
              :stat="{}"
            />
          </div>
          <div class="p-col-12 p-md-4">
            <FancyCard
              class="fancy-card-1"
              title="Groups"
              :loading="summaryLoading"
              :value="`${summary.publicTopics}`"
              :action="() => {}"
              :stat="{}"
            />
          </div>
        </div>
      </div>

      <div class="p-grid">
        <div class="p-col-12 p-md-6">
          <Card>
            <template #title class="p-flex">
              Flagged users
              <Button
                class="p-button-raised p-button-warning"
                :badge="summary.privateTopics"
              />
            </template>
            <template #content>
              <p>Flagged users will show here</p>
            </template>
          </Card>
        </div>
        <div class="p-col-12 p-md-6">
          <Card>
            <template #title>
              Blocked users {{ summary.activeUsers}}
            </template>
            <template #content>
              <p>Blocked users will show here</p>
            </template>
          </Card>
        </div>
      </div>
      <div class="card">
            <h5>Charts</h5>
            <Chart type="line" :data="basicData" :options="basicOptions" />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FancyCard from '@/views/dashboard/FancyCard.vue'
import { DashboardSummary, TimeSummary } from '@/types/dashboard';
import DashboardService from '@/views/dashboard/DashboardService';
// import Dashboard from '@/models/Dashboard'
// import Chart from 'primevue/chart'

export default defineComponent({
  // components: { FancyCard, Chart },
  components: { FancyCard },
  
  name: "dashboard",

  
  mounted() {
    this.summaryLoading = true;
    (new DashboardService()).getSummary()
      .then((data) => {
        this.summary = data;
        //this.registeredUsers = data.registeredUsers
      }).finally(() => {
        this.summaryLoading = false;
      });
  },

  data() {
    return {
      summaryLoading: false,
      summary: {} as DashboardSummary,

      basicData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Registered Users',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: 'Active Users',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726'
          }
        ]
      },
      basicOptions: null
    }
  },

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



