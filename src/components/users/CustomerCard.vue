<template>
  <PageHeading :title="`${customer.fullName}'s Profile`" style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-flex p-jc-center p-ai-center">
    <div class="p-col-12 p-md-6" id="hero">
      <Card
        class="p-card"
        :value="customer"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar 
              v-if="customer.photoUrl === '' || customer.photoUrl === null || customer.photoUrl === 'string' " 
              :label="customer.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              id="avatar"
              shape="circle"
            />
            <img
              v-else-if="customer.fullName" 
              :src="customer.photoUrl"
              :alt="customer.photoUrl"
              id="avatar"
            />
            <Avatar
              v-else
              icon="pi pi-user"
              class="p-mr-2"
              id="avatar"
              shape="circle"
            />
          </div>
        </template>
        <template #content>
          <div class="p-text-left" id="details">
            <h3 class="name">
              {{ customer?.fullName }}
            </h3>
            <p class="email">
              {{ customer?.email }}
            </p>
            <p class="mobile">
              {{ customer?.mobile }}
            </p>
            <span> <i class="pi pi-map-marker"></i> <p> {{ customer?.address }} </p> </span>
          </div>
          <div class="details2">      
            <div class="rating">
              <p> Average rating </p>
              <Rating
                :modelValue="customer.rating"
                :readonly="true"
                :cancel="false"
                :stars="5"
                class="ratingNumber"
              />
            </div>
            <div class="status">
              <p> Status: </p>
              <div v-if="customer.isActive === true">
                <p class="active"> Active </p>
              </div>
              <div v-else>
                <p class="block"> Inactive </p>
              </div>
            </div>
            <div class="about">
              <h4>About </h4>
              <p class="about-card">
                {{ customer.about}}
              </p>
            </div>
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

<style scoped>
#hero {
  margin-top: 80px;
}
.p-card{
  border-radius: 20px;
}
#avatar{
  margin-top: -95px;
  background: rgb(209, 202, 209);
  color: purple;
  width:8rem;
  height:8rem;
  font-size:4rem;
  border-radius: 50%;
}
.name{
  display: flex;
  justify-content: center;
}
.email{
  display: flex;
  justify-content: center;
  margin-top: -5px;
  font-weight: 500;
}
.mobile{
  display: flex;
  justify-content: center;
  margin-top: -5px;
  font-size: 14px;
}
#details span{
  display: flex;
  justify-content: center;
  font-size: 12px;
}
#details span i {
  margin-right: 10px;
}
#details span p {
  margin-top: 0;
}
.details2{
  padding: 15px;
}
.rating, .status {
  display: flex;
  justify-content: space-between;
}
.ratingNumber {
  margin-top: 10px;
}
.active {
  background: rgb(178, 228, 178);
  color: green;
  padding: 5px 10px;
  border-radius: 10px;
}
.block {
  background: rgb(240, 202, 202);
  color: red;
  padding: 5px 10px;
  border-radius: 10px;
}
.about {
  display: grid;
}
.about-card {
  background: rgb(209, 202, 209);
  color: rgb(100, 87, 100);
  padding: 10px;
  border-radius: 5px;
  margin-top: -5px;
  margin-bottom: -10px;
}
</style>