<template>
  <div class="payment-methods">
    <PageHeading title="Settings" subtitle="" />
    <ProgressSpinner v-if="isLoading" />
    <div v-else class="">
      <TabView>
        <TabPanel>
          <template #header>
            <i class="pi pi-cog"></i>
            <span class="p-ml-2">General</span>
          </template>
          Content III
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-wallet"></i>
            <span class="p-ml-2">Payment Methods</span>
          </template>
          <PaymentMethods />
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-inbox"></i>
            <span class="p-ml-2">Delivery Methods</span>
          </template>
          <DeliveryMethods />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import PaymentMethods from '@/components/settings/PaymentMethods.vue';
import DeliveryMethods from '@/components/settings/DeliveryMethods.vue';
import { useToast } from 'primevue/usetoast';

@Options({
  components: { MainLayout, PaymentMethods, DeliveryMethods },
})
export default class Settings extends Vue {
  isLoading = false;

  toast = useToast();

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
    // this.isLoading = true;
    // new PaymentMethodService("/payment-methods").getAll()
    //   .then((data) => {
    //     this.paymentMethods = data.map((cat) => new PaymentMethod(cat))
    //     this.isLoading = false;
    //   }).catch((e) => {
    //     this.toast.add({ severity: "error", summary: "There was an error fetching the payment methods", detail: "Please check your internet connection and refresh the page" })
    //     console.log(e);
    //   });
  }
}
</script>

<style>
.payment-method-card:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.payment-methods .p-card .p-card-title {
  font-size: 1.1rem;
}
</style>