<template>
  <PageHeading :title="`${customer.fullName}'s Profile`" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-col-12 p-md-6">
    <div class="p-col-12 p-md-6">
      <Card
        class="p-text-center"
        :value="customer"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <img 
              v-if="customer.photoUrl !== '' || customer.photoUrl !== null " 
                :src="customer.photoUrl"
                :alt="customer.photoUrl"
                style="width:8rem;height:8rem;font-size:4rem; border-radius: 50%;"
            />
            <Avatar 
                v-else-if="customer.fullName !== '' || customer.fullName !== null "
                :label="customer.fullName.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
            />
            <Avatar
                v-else 
                icon="pi pi-user"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
            />
          </div>
        </template>
        <template #body="slotProps">
            <span v-bind="fullName">
                 {{ customer.fullName}}
            </span>
            <p>
              Full Name: <b>{{ slotProps.data.fullName }}</b> 
            </p>
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Name: <b>{{ customer?.fullName }}</b>
            </p>
            <p>
              Username: <b>{{ "@" + customer?.username }}</b>
            </p>
            <p>
              Email: <b>{{ customer?.email }}</b>
            </p>
            <p>
              Products: <b>{{ customer?.about }}</b>
            </p>
            <p>
              Address: <b>{{ customer?.address }}</b>
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Customer from '@/models/Customer';
import CustomerService from '@/services/CustomerService';
import { CustomerData } from '@/types/customer'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
/* eslint-disable */

@Options<CustomerCard>({
  components: { DynamicForm  },
})

export default class CustomerCard extends Vue {

  isLoading = false;
  customers: Customer[] = [];
  customer = reactive(new Customer({})) as Customer;
  datasource: Customer[] = [];
  totalRecords = 0;
  service: CustomerService = new CustomerService();
  selectedCustomers: Customer[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  // lazyParams: Partial<CustomerLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;  


  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.thereIsAnID) {
          this.getData();
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  get thereIsAnID() {
    return !!this.$route.params.id
  }

  getData() {
    this.getCustomer();
  }

  getCustomer() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((customerData) => {
        this.setCustomer(new Customer(customerData));
        this.isLoading = false;
      });
  }

  setCustomer(value: Customer) {
    this.customer = reactive(value) as Customer;
  }
}
</script>












