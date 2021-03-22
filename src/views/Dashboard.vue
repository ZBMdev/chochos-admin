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
            title="New orders"
            :loading="summaryLoading"
            :value="`${summary.newOrders}`"
            :action="() => $router.push({ name: 'orders' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-2"
            title="Sales"
            :loading="summaryLoading"
            :value="`&#8358; ${summary.sales}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-3"
            title="Customers"
            :loading="summaryLoading"
            :value="`${summary.customers}`"
            :action="() => $router.push({ name: 'customers' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-3"
            title="Artisans"
            :loading="summaryLoading"
            :value="`${summary.artisans}`"
            :action="() => $router.push({ name: 'customers' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-3"
            title="Vendors"
            :loading="summaryLoading"
            :value="`${summary.vendors}`"
            :action="() => $router.push({ name: 'customers' })"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-4"
            title="Products sold"
            :loading="summaryLoading"
            :value="`${summary.productSold}`"
            :action="() => {}"
            :stat="{}"
          />
        </div>
        <div class="p-col-12 p-md-4">
          <FancyCard
            class="fancy-card-1"
            title="Products in low stock"
            :loading="summaryLoading"
            :value="`${summary.lowStockProduct}`"
            :action="() => {}"
            :stat="undefined"
          />
        </div>
      </div>
    </div>

    <!-- Others -->
    <div class="p-grid">
      <div class="p-col-12 p-md-6">
        <Card>
          <template #title>
            Top Orders
          </template>
          <template #content>
            <Chart
              type="pie"
              :data="chartData"
              :loading="summaryLoading"
              :value="chartData.datasets.data"
              :action="() => {}"
              :stat="{}"
            />
          </template>
        </Card>
      </div>
      <div class="p-col-12 p-md-6">
        <Card>
          <template #title>
            Overview Today
          </template>
          <template #content>
            <Chart
              type="line"
              :data="multiAxisData"
              :options="multiAxisOptions"
              :loading="timeLoading"
              :value="`${time.hourly}`"
              :action="() => {}"
              :stat="{}"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FancyCard from '@/components/dashboard/FancyCard.vue'
import Chart from 'primevue/chart'
import { DashboardSummary, TimeSummary } from '@/types/dashboard';
import DashboardService from '@/services/DashboardService';

export default defineComponent({
  components: { FancyCard, Chart },
  name: "Dashboard",
  
  mounted() {
    this.summaryLoading = true;
    (new DashboardService()).getSummary()
      .then((data) => {
        this.summary = data;
      }).finally(() => {
        this.summaryLoading = false;
      });

    this.timeLoading = true;
    (new DashboardService()).getTime()
      .then((data) => {
        this.time = data;
      }).finally(() => {
        this.timeLoading = false;
      });
  },
  data() {
    return {
      summaryLoading: false,
      summary: {} as DashboardSummary,
      timeLoading: false,
      time: {} as TimeSummary,
      chartData: {
        labels: ['Product 1', 'Product 2', 'Product 3'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726"
            ],
            hoverBackgroundColor: [
              "#64B5F6",
              "#81C784",
              "#FFB74D"
            ]
          }
        ]
      },
      multiAxisData: {
        labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
        datasets: [
          {
            label: "Product 1",
            data: [65, 59, 80, 81, 55, 56, 40],
            fill: false,
          },
          {
            label: "Product 2",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#66BB6A',
            yAxisID: 'y-axis-2',
          },
          {
            label: "Product 3",
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: false,
            borderColor: '#FFA72G',
            yAxisID: 'y-axis-3',
          }
        ]
      },
      multiAxisOptions: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1'
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                drawOnChartArea: false
              }
            },
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-3'
            },
          ]
        }
      }
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



