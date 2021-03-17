<template>
    <div class="p-grid">
      <div class="p-col-12 p-md-6">
        <Card>
          <template #title>
            Product 1
          </template>
          <template #subtitle>
            Customers rating
          </template>
          <template #content>
            <Chart type="doughnut" :data="chartData" />
            <br>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>5 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar1" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>1234 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>4 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar2" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>200 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>3 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar3" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>50 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>2 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar4" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>23 </p>
                </div>
            </div><div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>1 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar5" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>10 </p>
                </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="p-col-12 p-md-6">
        <Card>
          <template #title>
            Product 2
          </template>
          <template #subtitle>
            Customers rating
          </template>
          <template #content>
            <Chart type="doughnut" :data="chartData" />
            <br>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>5 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar1" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>1234 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>4 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar2" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>200 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>3 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar3" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>50 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>2 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar4" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>23 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>1 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar5" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>10 </p>
                </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="p-col-12 p-md-6">
        <Card>
          <template #title>
            Product 3
          </template>
          <template #subtitle>
            Customers rating
          </template>
          <template #content>
            <Chart type="doughnut" :data="chartData" />
            <br>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>5 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar1" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>1234 </p>
                </div>
              </div>  
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>4 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar2" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>200 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>3 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar3" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>50 </p>
                </div>
            </div>
            <div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>2 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar4" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>23 </p>
                </div>
            </div><div class="p-grid">
                <div class="p-col-fixed" style="width:50px">
                  <p>1 <i class="pi pi-star" style="color:green"></i> </p>
                </div>
                <div class="p-col-fixed" style="width:350px">
                  <ProgressBar :value="rateBar5" :showValue="false" style="height: .5em" class="pBar" />
                </div>
                <div class="p-col">
                  <p>10 </p>
                </div>
            </div>
          </template>
        </Card>
      </div>
    </div>  
</template>

<script lang="ts">
/* eslint-disable */

import { defineComponent } from 'vue'
import Chart from 'primevue/chart'
import ProgressBar from 'primevue/progressbar';

export default defineComponent({
    data() {
		return {
            rateBar1: 80,
            rateBar2: 60,
            rateBar3: 30,
            rateBar4: 10,
            rateBar5: 5,
			chartData: {
				labels: ['1 & 2 stars','3 stars','4 & 5 stars'],
				datasets: [
					{
						data: [300, 50, 100],
						backgroundColor: [
                            "#42A5F5",
                            "#FFA726",
                            "#66BB6A",
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#FFB74D",
                            "#81C784",
                        ]
					}
				]
			}
		}
	},
  components: {
    Chart, ProgressBar
  }
})
</script>

<style>
.pBar{
    margin-top: 20px;
 }
</style>