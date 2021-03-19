<template>
  <div class="p-grid">
    <div class="p-col-12 p-md-6">
      <Card>
        <template #title>Top Grossing Products</template>
        <template #content>
          <Chart type="doughnut" label="Products" :data="chartData" />
        </template>
      </Card>
    </div>
    <div class="p-col-12 p-md-6">
      <Card>
        <template #title>Top Page Views</template>
        <template #content>
          <Chart type="horizontalBar" :data="basicData" />
        </template>
      </Card>
    </div>
    <div class="p-col-12 p-md-6">
      <Card>
        <template #title>Monthly Orders</template>
        <template #content>
          <Chart type="line" :data="lineStylesData" />
        </template>
      </Card>
    </div>
    <div class="p-col-12 p-md-6">
      <Card>
        <template #title>Monthly Recurring Revenue (MRR) </template>
        <template #content>
          <Chart type="bar" :data="stackedData" :options="stackedOptions"/>
        </template>
      </Card>
    </div>
    <div class="p-col-12 p-md-6">
      <Card>
        <template #title>Orders Breakdown</template>
        <template #content>
          <Chart type="pie" :data="chartData" />
        </template>
      </Card>
    </div>
    <div class="p-col-12 p-md-6">
      <Card>
        <template #title>Web Vs Mobile Purchases</template>
        <template #content>
          <Chart type="line" :data="devices" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from 'primevue/chart'
import { DashboardSummary, TimeSummary } from '@/types/dashboard';
import DashboardService from '@/services/DashboardService';

export default defineComponent({
  components: { Chart },
  name: 'Analytics',
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
      productDuration: null,
      timeOptions: [
        { name: 'Hourly', value: 1 },
        { name: 'Daily', value: 2 },
        { name: 'Weekly', value: 3 },
        { name: 'Monthly', value: 4 }
      ],
      chartData: {
        labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
        datasets: [
          {
            data: [300, 50, 100, 250, 120],
            backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726",
              "#660066",
              "#4d3319"
            ],
            hoverBackgroundColor: [
              "#64B5F6",
              "#81C784",
              "#FFB74D",
              "#660066",
              "#4d3319"
            ]
          }
        ]
      },
      lineStylesData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: "Product 1",
            data: [65, 59, 80, 81, 55, 56, 40],
            fill: false,
            borderColor: '#42A5F5'
          },
          {
            label: "Product 2",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#66BB6A'
          },
          {
            label: "Product 3",
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: '#FFA72G',
            backgroundColor: 'rgba(255, 167, 38, 0.2)'
          },
          {
            label: "Product 4",
            data: [65, 59, 80, 81, 55, 56, 40],
            fill: false,
            borderColor: '#660066'
          },
          {
            label: "Product 5",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            borderColor: '#4d3319'
          },
        ]
      },
      basicData: {
        labels: ['Home', 'About', 'Products', 'Contact Us'],
        datasets: [
          {
            label: 'Page Name',
            backgroundColor: '#42A5F5',
            data: [110, 39, 100, 50]
          }
        ]
      },
      devices: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Web',
            fill: false,
						borderColor: '#42A5F5',
            data: [80, 81, 56, 55]
          },
          {
            label: 'Mobile',
            fill: false,
						borderColor: '#FFA726',
            data: [40, 19, 86, 27]
          }
        ]
      },
      stackedData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            type: 'bar',
						label: 'Product 1',
						backgroundColor: '#42A5F5',
						data: [ 12,48, 90, 76 ]
          },
          {
            type: 'bar',
						label: 'Product 2',
						backgroundColor: '#66BB6A',
						data: [20, 84, 24, 75 ]
          },
          {
            type: 'bar',
						label: 'Product 3',
						backgroundColor: '#FFA726',
						data: [42, 52, 23,21 ]
          },
          {
            type: 'bar',
						label: 'Product 4',
						backgroundColor: '#66BB6A',
						data: [52, 84, 24, 75 ]
          },
        ]
      },
      stackedOptions: {
				tooltips: {
					mode: 'index',
					intersect: false
				},
				responsive: true,
				scales: {
					xAxes: [{
						stacked: true,
					}],
					yAxes: [{
            stacked: true,
					}]
				}
			}
    }
  }
})

</script>

<style scoped>
.table-footer span{
  float: right;
  margin-right: 60px;
}
</style>
