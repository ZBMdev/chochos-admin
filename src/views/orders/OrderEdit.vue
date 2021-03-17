<template>
  <div class="order-edit">
    <PageHeading
      :title="`${thereIsAnID ? 'Edit' : 'Create'} Order`"
      subtitle="we would be needing a route on the server to update and get a single an order for this to work"
    />
    <!-- <ProgressSpinner v-if="isLoading" /> -->
    <div class="p-grid p-gutter-8">
      <div class="p-col-12 p-md-8">
        <Card class="p-mb-4">
          <template class="p-text-left" #title>
            Order #{{ order.order_number }} details
            <small class="p-text-secondary subtitle">
              via Debit/Credit Cards (1075_1597271447). Paid on August 12, 2020
              @ 10:33 pm
            </small>
          </template>
          <template #content>
            <div class="p-field">
              <label>Date Created </label>
              <span class="">{{ order.createdAt }}</span>
            </div>
            <div class="p-field p-fluid">
              <label for="status">Status</label>
              <Dropdown
                :options="statusOptions"
                v-model="order.status"
                class=""
              />
            </div>
            <div class="p-field p-fluid">
              <label for="customer">Customer</label>
              <InputText readonly :value="order.user?.name" />
            </div>
            <div class="p-grid">
              <div class="p-col-12 p-lg-6">
                <h4>Billing</h4>
                <div class="">
                  <p>
                    Busola Okeowo <br />
                    9, Tunse Street <br />
                    Ilara, Epe <br />
                    Lagos <br />
                  </p>
                  <p>
                    Email address: <br />
                    busolaokemoney@gmail.com <br />
                  </p>
                  <p>
                    Phone: <br />
                    08026910113 <br />
                  </p>
                </div>
              </div>
              <div class="p-col-12 p-lg-6">
                <h4>Shipping</h4>
                <div class="">
                  <p>
                    Busola Okeowo <br />
                    9, Tunse Street <br />
                    Ilara, Epe <br />
                    Lagos <br />
                  </p>
                  <p>
                    Phone: <br />
                    08026910113 <br />
                  </p>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <Card class="p-mb-4">
          <template class="p-text-left" #title>
            Order items
          </template>
          <template #content>
            <DataTable
              dataKey="id"
              class="p-datatable-responsive"
              :value="order.order_items"
            >
              <template #empty>
                No products found.
              </template>
              <template #loading>
                Loading products data. Please wait.
              </template>
              <Column field="name" header="Name" :sortable="true">
                <template #body="slotProps">
                  <span class="p-column-title">Name</span>
                  {{ slotProps.data.name }}
                </template>
              </Column>
              <Column header="Image">
                <template #body="slotProps">
                  <span class="p-column-title">Image</span>
                  <img
                    :src="'https://picsum.photos/300/220'"
                    :alt="slotProps.data.name"
                    class="product-image"
                  />
                  <!-- image_url -->
                </template>
              </Column>
              <Column field="price" header="Price" :sortable="true">
                <template #body="slotProps">
                  <span class="p-column-title">Price</span>
                  {{ slotProps.data.priceCurrency }}
                </template>
              </Column>
              <Column field="quantity" header="Quantity" :sortable="true">
                <template #body="slotProps">
                  <span class="p-column-title">Quantity</span>
                  {{ slotProps.data.quantity }}
                </template>
              </Column>
              <Column field="amount" header="Amount" :sortable="true">
                <template #body="slotProps">
                  <span class="p-column-title">Amount</span>
                  {{ slotProps.data.amount }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
      <div class="p-col-12 p-md-4">
        <Card class="p-mb-4">
          <template class="p-text-left" #title>
            <!-- Order items -->
          </template>
          <template #content>
            <!-- <DataTable></DataTable> -->
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Order from '@/models/Order';
import OrderService from '@/services/OrderService';
import { OrderStatus } from '@/types/orders';
import CustomerService from '@/services/CustomerService';
import Customer from '@/models/Customer';

@Options({
  components: {},
})
export default class OrderEdit extends Vue {
  isLoading = false;
  order = new Order();
  ordertService = new OrderService();
  statusOptions = [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.shipped, OrderStatus.Delivered]

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
    this.getOrder();
  }

  getUser() {
    new CustomerService().getOne(this.order.user_id).then((userData) => {
      this.order.user = new Customer(userData);
    })
  }

  getOrder() {
    this.isLoading = true;
    this.ordertService.getOne(+this.$route.params.id)
      .then((orderData) => {
        this.order = new Order(orderData);
        this.getUser();
        this.isLoading = false;
      });
  }
}
</script>

<style scoped>
.subtitle {
  display: block;
  font-size: 1rem;
  font-weight: normal;
}
.text-muted {
  color: #999;
}
</style>