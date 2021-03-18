<template>
  <div class="order-list">
    <PageHeading title="All Orders" subtitle="nothing yet" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          ref="dt"
          :value="orders"
          class="orders"
          v-model:selection="selectedOrders"
          dataKey="order_number"
          :paginator="true"
          :rows="25"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
          :scrollable="true"
          style="width: 100%"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global']"
                  placeholder="Search..."
                />
              </span>
              <div class="p-ml-auto">
                <Button
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openNew"
                />

                <!-- <Button
                  label="Delete"
                  icon="pi pi-trash"
                  class="p-button-danger"
                  @click="confirmDeleteSelected"
                  :disabled="!selectedOrders || !selectedOrders.length"
                /> -->
              </div>
            </div>
          </template>

          <Column
            selectionMode="multiple"
            headerStyle="width: 2.3rem"
            :exportable="false"
          ></Column>
          <Column
            field="order_number"
            headerStyle="min-width: 100px"
            header="Order"
            :sortable="true"
          >
            <template #body="slotProps">
              #{{ slotProps.data.order_number }}
            </template>
          </Column>
          <Column
            field="createdAt"
            headerStyle="min-width: 100px"
            header="Date"
            sortField="created_at"
            filterField="created_at"
            :sortable="true"
          >
          </Column>
          <Column field="status" header="Status" headerStyle="min-width: 150px">
            <template #body="slotProps">
              <span
                :class="
                  'order-badge status-' + slotProps.data.status.toLowerCase()
                "
              >
                {{ slotProps.data.status }}
              </span>
            </template>
          </Column>
          <Column field="total" header="Total" headerStyle="min-width: 150px">
          </Column>
          <Column headerStyle="width: 5rem" :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-mr-2"
                @click="editOrder(slotProps.data)"
              />
              <!-- <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="confirmDeleteOrder(slotProps.data)"
              /> -->
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- This may not be usefull until the endpoints to delete an order is ready -->
    <Dialog
      v-model:visible="deleteOrderDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="order"
          >Are you sure you want to delete <b>{{ order.order_number }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteOrderDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteOrder"
        />
      </template>
    </Dialog>

    <!-- This may not be usefull until the endpoints to delete multiple orders is ready -->
    <Dialog
      v-model:visible="deleteOrdersDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="order"
          >Are you sure you want to delete the selected orders?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteOrderDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedOrders"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Order from '@/models/Order';
import OrderService from '@/services/OrderService';
import { useToast } from 'primevue/usetoast';

@Options({
  components: {},
})
export default class OrderList extends Vue {
  orders: Order[] = [];
  orderDialog = false;
  deleteOrderDialog = false;
  deleteOrdersDialog = false;
  order!: Order;
  selectedOrders: Order[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  orderService = new OrderService();
  isLoading = true;
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
    this.isLoading = true;
    this.orderService.getAllPaginated()
      .then((data) => {
        this.orders = data.data.map((order) => new Order(order))
        this.isLoading = false;
      });
  }

  editOrder(order: Order) {
    this.$router.push({ name: "EditOrder", params: { id: order.id } })
  }

  openNew() {
    this.order = new Order({});
    this.submitted = false;
    this.orderDialog = true;
  }

  confirmDeleteOrder(order: Order) {
    this.order = order;
    this.deleteOrderDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteOrdersDialog = true;
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    return this.orders.findIndex((order) => order.id === id)
  }

  saveOrder() {
    this.submitted = true;
    this.isLoading = true;

    // if (this.order.order_number.trim()) {
    if (this.order.id) {
      // udpate
      this.orderService.put(this.order.id, this.order.toCreateParam())
        .then((newOrder) => {
          this.order = new Order(newOrder);
          this.orders[this.findIndexById(this.order.id)] = this.order;
          this.isLoading = false;
          this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Order Updated', life: 3000 });
        }).catch(() => {
          this.toast.add({ severity: 'error', summary: 'Error', detail: 'Updating failed', life: 3000 });
        }).finally(() => {
          this.isLoading = false
        });
    }

    else {
      //create
      this.orderService.create(this.order.toCreateParam())
        .then((newOrder) => {
          this.order = new Order(newOrder);
          this.orders.push(this.order);
          this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
        }).catch(() => {
          this.toast.add({ severity: 'error', summary: 'Error', detail: 'Creating failed', life: 3000 });
        }).finally(() => {
          this.isLoading = false
        });
    }

    this.orderDialog = false;
    // }

  }

  // This may not be usefull until the endpoint to delete multiple order is ready
  // NB: I'm not doint it right we should have an endpoint to delete multiple items
  deleteSelectedOrders() {
    this.isLoading = true;
    // delete 
    this.selectedOrders.forEach(async (order) => {
      await this.orderService.delete(order.id);
    });
    this.orders = this.orders.filter(val => !this.selectedOrders.includes(val));
    this.deleteOrdersDialog = false;
    this.selectedOrders = [];
    this.isLoading = false;
    this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Orders Deleted', life: 3000 });
  }

  // This may not be usefull until the endpoint to delete an order is ready
  deleteOrder() {
    this.isLoading = true
    this.orderService.delete(this.order.id)
      .then((message) => {
        this.orders = this.orders.filter(val => val.order_number !== this.order.order_number);
        this.deleteOrderDialog = false;
        this.order = new Order({});
        this.toast.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
      }).catch(() => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Deleting Failed', life: 3000 });
      }).finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<style scoped>
.order-badge.status-delivered {
  background: #c8e6c9;
  color: #256029;
}
.order-badge.status-processing {
  background: #feedaf;
  color: #8a5340;
}
.order-badge.status-pending {
  background: #ffcdd2;
  color: #c63737;
}
.order-badge.status-shipped {
  background: #dbe6c8;
  color: #446025;
}
.order-badge.status-cancelled {
  background: #3c3c3c;
  color: #bababa;
}
.order-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
</style>