<template>
  <div class="order-edit">
    <PageHeading
      :title="`${thereIsAnID ? 'Edit' : 'Create'} Order`"
      subtitle=""
    />
    <ProgressSpinner v-if="isLoading" />
    <template v-else>
      <div v-if="order" class="p-grid p-gutter-8">
        <div class="p-col-12 p-md-8">
          <Card class="p-mb-4">
            <template class="p-text-left" #title>
              Order #{{ order.order_number }} details
              <small
                v-if="order.payment_status == 'confirmed'"
                class="p-text-secondary subtitle"
              >
                via {{ order.payment_method.name }} ({{ order.reference }}).
                <!-- <template>
                  Paid on August 12, 2020 @ 10:33 pm
                </template> -->
              </small>
            </template>
            <template #content>
              <div class="p-field">
                <label>Date Created: </label>
                <span class="p-ml-4">{{ order.createdAt }}</span>
              </div>
              <div class="p-field p-fluid">
                <label for="status">Status</label>
                <Dropdown
                  :options="statusOptions"
                  v-model="status"
                  placeholder="pending"
                  class=""
                />
              </div>
              <div class="p-field" v-if="orderHasBeenEdited">
                <div class="p-d-flex p-jc-between p-ai-center">
                  <label for="customer">Comment (optional)</label>
                </div>
                <Textarea style="width:100%;" v-model="comment" />
              </div>
              <div class="p-field">
                <div class="p-d-flex p-jc-between p-ai-center">
                  <label for="customer">Customer</label>
                  <!-- <Button
                    class="p-button-text"
                    @click="
                      $router.push({
                        name: 'customer',
                        params: { id: order.user?.id }
                      })
                    "
                    label="View User"
                  /> -->
                </div>
                <InputText
                  style="width:100%;"
                  readonly
                  :value="order.user?.name"
                />
              </div>
              <div class="p-grid">
                <div class="p-col-12 p-md-6">
                  <h4>Billing</h4>
                  <div class="">
                    <p>
                      Made payment using: <br />
                      <b>{{ order.payment_method.name }}</b>
                    </p>
                    <p>
                      Reference number: <br />
                      <b>{{ order.reference }}</b>
                    </p>
                    <p>
                      Payment status: <br />
                      <b>{{ order.payment_status }}</b>
                    </p>
                  </div>
                </div>
                <div class="p-col-12 p-md-6">
                  <h4>Shipping</h4>
                  <div v-if="order.shipping_address" class="">
                    <p>
                      {{ order.user?.name }} <br />
                      <template v-if="order.shipping_address?.house_number">
                        House {{ order.shipping_address?.house_number }}, <br />
                      </template>
                      {{ order.shipping_address?.address }}, <br />
                      <template v-if="order.shipping_address?.additional_info">
                        {{ order.shipping_address?.additional_info }}, <br />
                      </template>
                      {{ order.shipping_address?.city }}
                      <template v-if="order.shipping_address?.state">
                        , <br />{{ order.shipping_address?.state }}.
                      </template>
                      <template v-if="order.shipping_address?.zip_code">
                        Zip code: {{ order.shipping_address?.zip_code }}.
                      </template>
                    </p>
                    <p>
                      <template v-if="order.shipping_address?.mobile_number">
                        Phone:<br />
                        {{ order.shipping_address?.mobile_number }}.
                      </template>
                    </p>
                  </div>
                  <div v-else>No shipping information</div>
                </div>
              </div>
            </template>
          </Card>

          <Card class="p-mb-4">
            <template class="p-text-left" #title>
              Order items
            </template>
            <template #content>
              <order-items :order="order" />
            </template>
          </Card>
        </div>

        <div class="p-col-12 p-md-4 p-p-2">
          <div class="p-fluid p-mb-4">
            <Button
              @click="updateOrder"
              class="p-button-info"
              label="Update"
              icon="pi pi-save"
            />
          </div>
          <Card class="p-mb-4">
            <template #title>
              Information
            </template>
            <template #content>
              <div>LAST UPDATE: {{ order.updatedAtFormated }}</div>
              <!-- <div>BY {{ order.updated_by.name }}</div> -->
            </template>
          </Card>
          <Card class="p-mb-4">
            <template class="p-text-left" #title>
              Status History
            </template>
            <template #content>
              <StatusHistory :order="order" />
            </template>
          </Card>
        </div>
      </div>
      <div v-else>
        The order you are looking for doesn't seem to exist
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Order from '@/models/Order';
import OrderService from '@/services/OrderService';
import { OrderStatus, OrderUpdateParam, PaymentStatus } from '@/types/orders';
import { useToast } from 'primevue/usetoast';
import CustomerService from '@/services/CustomerService';
import Customer from '@/models/Customer';
import { AdminData } from '@/types/admin';
import { reactive } from 'vue';
import StatusHistory from '@/components/orders/StatusHistory.vue';
import OrderItems from '@/components/orders/OrderItems.vue';

@Options({
  components: { StatusHistory, OrderItems },
})
export default class OrderEdit extends Vue {
  isLoading = false;
  order!: Order;
  ordertService = new OrderService();
  comment = "";
  status = "";
  statusOptions = [OrderStatus.Processing, OrderStatus.Shipped, OrderStatus.Delivered, OrderStatus.Declined]
  toast = useToast();

  setup() {
    return {
      PaymentStatus,
    }
  }

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

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  getData() {
    this.getOrder();
  }

  getOrder() {
    this.isLoading = true;
    this.ordertService.getOne(+this.$route.params.id)
      .then((orderData) => {
        if (orderData) {
          this.order = reactive(new Order(orderData));
          if (!this.order.user) {
            // this.getUser();
          }
          this.status = this.order.status;
        }
        this.isLoading = false;
      });
  }

  getUser() {
    new CustomerService().getOne(this.order.user_id).then((userData) => {
      this.order.user = new Customer(userData);
    })
  }

  get orderHasBeenEdited() {
    return this.status != this.order.status;
  }

  get orderPayload() {
    const user = window.localStorage.getItem('user');
    if (user) {
      return {
        // updated_by: (JSON.parse(user) as AdminData).id,
        status: this.status,
        comment: this.comment,
      } as OrderUpdateParam;
    }
    return null;
  }

  updateOrder() {
    this.isLoading = true;
    if (this.orderPayload) {
      this.ordertService.update(this.order.id, this.orderPayload)
        .then((orderData) => {
          this.order = new Order({ ...orderData });
          this.status = this.order.status;
          this.comment = "";
          this.toast.add({ severity: 'success', summary: "Success", detail: "Order updated." });
        })
        .finally(() => {
          this.isLoading = false;
        });
      return;
    }
    // eslint-disable-next-line
    // @ts-ignore
    this.emmiter.emit("logout");
  }

}
</script>

<style>
.subtitle {
  display: block;
  font-size: 1rem;
  font-weight: normal;
}
.text-muted {
  color: #999;
}
.product-image {
  width: 60px;
  height: 3.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: cover;
  object-position: center;
}
.status-text {
  background-color: var(--surface-c);
}

blockquote {
  background-color: var(--surface-b);
  border-left: 3px solid var(--surface-d);
  font-style: italic;
  padding: 0.6rem;
}
</style>