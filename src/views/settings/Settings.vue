<template>
  <div class="payment-methods">
    <PageHeading title="Settings" subtitle="" />

    <div class="p-grid">
      <div class="p-col-12 p-md-3">
        <Menu style="height: 100%;width: 100%;" :model="items" />
      </div>
      <div class="p-col-12 p-md-9 p-gutters-1">
        <Card>
          <template #content>
            <router-view />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import PaymentMethods from '@/components/settings/PaymentMethods.vue';
// import DeliveryMethods from '@/components/settings/DeliveryMethods.vue';
// import Roles from '@/components/settings/Roles.vue';
import Menu from 'primevue/menu';
import { MenuItem } from '@/types/elements';

@Options({
  components: {  Menu },
})
export default class Settings extends Vue {
  items: Partial<MenuItem>[] = [
    {
      label: 'Roles',
      icon: 'pi pi-cog',
      to: '/settings/roles',
    },
    {
      label: 'Payment Method',
      icon: 'pi pi-wallet',
      to: '/settings/payment-method',
    },
    {
      label: 'Delivery Method',
      icon: 'pi pi-inbox',
      to: '/settings/delivery-method'
    }
  ]
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