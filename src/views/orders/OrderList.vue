<template>
  <div class="order-list">
    <PageHeading title="All Orders" />
    <ProgressSpinner v-if="generalLoading" />

    <Card v-else>
      <template #content>
        <DataTable
          ref="dt"
          :value="orders"
          class="orders p-datatable-sm"
          dataKey="order_number"
          v-model:selection="selectedOrders"
          filterDisplay="orders"
          :globalFilterFields="['order.code', 'order.name', 'date', 'pending']"
          :paginator="true"
          :rows="rowstoDisplay"
          :filters="filters"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :scrollable="true"
          :lazy="true"
          paginatorPosition="both"
          :totalRecords="totalRecords"
          :loading="isLoading"
          @page="onPage($event)"
          @sort="onSort($event)"
          :first="firstRecordIndex"
          :rowHover="true"
          style="width: 100%"
          @row-click="editOrder($event.data)"
        >
          <template #header>
            <div class="p-d-flex p-jc-between">
              <span class="p-input-icon-left">
                <!-- <i class="pi pi-search" />
                <InputText
                  v-model="filterValue"
                  placeholder="Search..."
                  @keypress.enter="filterOrders"
                /> -->
              </span>
              <div class="p-ml-auto">
                <!-- <Button
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openNew"
                /> -->

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

          <template #empty>
            No orders found.
          </template>
          <template #loading>
            Loading order data. Please wait.
          </template>

          <!-- <Column
            selectionMode="multiple"
            headerStyle="width: 2.3rem"
            :exportable="false"
          ></Column> -->
          <Column
            field="order_number"
            headerStyle="width: 180px"
            header="Order"
            filterMatchMode="contains"
            ref="name"
          >
            <template #body="slotProps">
              #{{ slotProps.data.order_number }} {{ slotProps.data.user?.name }}
            </template>
          </Column>
          <Column
            field="createdAt"
            headerStyle="width: 120px"
            header="Date"
            sortField="created_at"
            filterField="created_at"
          >
          </Column>
          <Column
            field="status"
            header="Status"
            headerStyle="width: 100px"
            filterMatchMode="contains"
            ref="name"
          >
            <template #body="slotProps">
              <span
                :class="
                  'order-badge status-' + slotProps.data.status.toLowerCase()
                "
              >
                <!-- <i
                  :class="
                    statusDecorations[slotProps.data.status].icon + ' p-mr-2'
                  "
                ></i> -->
                {{ slotProps.data.status }}
              </span>
            </template>
          </Column>
          <Column
            field="total"
            header="Total"
            headerStyle="width: 100px"
            filterMatchMode="contains"
            ref="name"
          >
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
import qs from 'qs';
import { statusDecorations } from '@/types/orders';

interface OrderLazyParameters {
  page: number;
  limit: number;
  name: string;
}

@Options({
  components: {},
})
export default class OrderList extends Vue {
  orders: Order[] = [];
  deleteOrderDialog = false;
  deleteOrdersDialog = false;
  order!: Order;
  selectedOrders: Order[] = [];
  filterValue = "";
  filters = {
    // order_number: "",
    orderNumber: "",
    date: "",
    status: "",
  };
  submitted = false;
  orderService = new OrderService();
  isLoading = true;
  toast = useToast();
  totalRecords = 0;
  firstRecordIndex = 0;
  lazyParams: Partial<OrderLazyParameters> = {};
  rowstoDisplay = 10;
  generalLoading = false;
  statusDecorations = statusDecorations;

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.getData();
      },
      { immediate: true }
    )
  }

  getData() {
    this.generalLoading = true;
    this.isLoading = true;
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }


  /**
   *  filter event is not triggered in lazy mode instead use the event you prefer on your 
   * form elements such as input, change, blur to make a remote call by passing the filters 
   * property to update the displayed data. 
   */

  // eslint-disable-next-line
  filterOrders(event: any) {
    // if (event.keyCode === 13) {
    this.isLoading = true;
    if (this.filterValue) {
      this.lazyParams = { name: this.filterValue, limit: 1000000000000, }
      this.searchData();
    }
    // }
  }

  loadLazyData() {
    this.isLoading = true;
    this.orderService.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.orders = data.data.map((order) => new Order(order));
        this.totalRecords = data.total;
        this.firstRecordIndex = data.current_page > 1 ? data.limit * data.current_page - 1 : 0;
        this.rowstoDisplay = data.limit;
        this.isLoading = false;
        this.generalLoading = false;
      });
  }

  searchData() {
    this.isLoading = true;
    this.orderService.search(`${qs.stringify(this.lazyParams)}`)
      .then((data) => {
        if (data) {
          this.orders = data.data.map((order) => new Order(order));
          this.totalRecords = data.total;
          this.firstRecordIndex = 0;
          this.isLoading = false;
          this.generalLoading = false;
        }
      });
  }

  // eslint-disable-next-line
  onPage(event: any) {
    // console.log(event);
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as OrderLazyParameters;
    this.loadLazyData();
  }

  // eslint-disable-next-line
  onSort(event: any) {
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as OrderLazyParameters;
    this.loadLazyData();
  }

  editOrder(order: Order) {
    this.$router.push({ name: "edit-order", params: { id: order.id } })
  }

  confirmDeleteOrder(order: Order) {
    this.order = order;
    this.deleteOrderDialog = true;
  }

  findIndexById(id: number): number {
    return this.orders.findIndex((order) => order.id === id)
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

  // eslint-disable-next-line
  onFilter(event: any) {
    if (event.keyCode === 13) {
      this.isLoading = true;
      this.lazyParams = { ...this.lazyParams, ...this.filters };
      this.loadLazyData();
    }
  }
}
</script>

<style>
</style>