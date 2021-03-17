<template>
  <div class="dashboard">
    <PageHeading
      title="Dashboard"
      subtitle="all of these don't work yet, just UI"
    />

    <!-- Stats -->
    <div class="stats">
      <h3 class="p-mb-2">Stats</h3>
      <div class="p-grid">
        <div class="p-col-12 p-md-4">
          <div class="p-card stats-card p-component p-p-3">
            <div class="stats-number p-card-title">2</div>
            <div class="stats-detail p-d-flex p-jc-between p-ai-center">
              <span>New orders</span>
              <Button
                icon="pi pi-angle-right"
                iconPos="right"
                label="View"
                class="p-button-text"
              />
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-4">
          <div class="p-card stats-card p-component p-p-3">
            <div class="stats-number p-card-title">&#8358; 73,1560.00</div>
            <div class="stats-detail p-d-flex p-jc-between p-ai-center">
              <span>Sales</span>
              <Button
                icon="pi pi-angle-right"
                iconPos="right"
                label="View"
                class="p-button-text"
              />
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-4">
          <div class="p-card stats-card p-component p-p-3">
            <div class="stats-number p-card-title">372</div>
            <div class="stats-detail p-d-flex p-jc-between p-ai-center">
              <span>Customers</span>
              <Button
                icon="pi pi-angle-right"
                iconPos="right"
                label="View"
                class="p-button-text"
              />
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-4">
          <div class="p-card stats-card p-component p-p-3">
            <div class="stats-number p-card-title">1200</div>
            <div class="stats-detail p-d-flex p-jc-between p-ai-center">
              <span>Products sold</span>
              <Button
                icon="pi pi-angle-right"
                iconPos="right"
                label="View"
                class="p-button-text"
              />
            </div>
          </div>
        </div>
        <div class="p-col-12 p-md-4">
          <div class="p-card stats-card p-component p-p-3">
            <div class="stats-numbe p-card-title">15</div>
            <div class="stats-detail p-d-flex p-jc-between p-ai-center">
              <span>Products in low stock</span>
              <Button
                icon="pi pi-angle-right"
                iconPos="right"
                label="View"
                class="p-button-text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Others -->
    <div class="stats">
      <h3 class="p-mb-2">Latest Reviews</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
})
export default class Dashboard extends Vue { }
</script>
