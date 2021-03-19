<template>
  <div>
    <DataTable
      dataKey="id"
      class="p-datatable-responsive"
      :value="orderItemList"
    >
      <template #empty>
        No items found.
      </template>
      <template #loading>
        Loading order item data. Please wait.
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
            v-if="slotProps.data.image_url"
            :src="slotProps.data.image_url"
            :alt="slotProps.data.name"
            class="product-image"
          />
          <img
            v-else
            src="@/assets/images/default-placeholder-image.png"
            :alt="slotProps.data.name"
            class="product-image"
          />
        </template>
      </Column>
      <Column field="quantity" header="Quantity" :sortable="true">
        <template #body="slotProps">
          <span class="p-column-title">Quantity</span>
          x{{ slotProps.data.quantity }}
        </template>
      </Column>
      <Column field="amount" header="Price" :sortable="true">
        <template #body="slotProps">
          <span class="p-column-title">Price</span>
          <span style="float: right;">
            {{ formatCurrency(slotProps.data.amount) }}
          </span>
        </template>
      </Column>
      <Column field="amount" header="Total" :sortable="true">
        <template #body="slotProps">
          <span class="p-column-title">Total</span>
          <span style="">
            {{
              formatCurrency(slotProps.data.amount * slotProps.data.quantity)
            }}
          </span>
        </template>
      </Column>

      <template #footer>
        <div class="p-d-flex p-jc-between">
          <span class="p-column-title">Amount Due</span>
          <span>
            {{ formatCurrency(order.sub_total_amount + order.delivery_fee) }}
          </span>
        </div>
        <div class="p-d-flex p-jc-between">
          <span class="p-column-title">Amount Paid</span>
          <span>
            {{ formatCurrency(order.amount_paid) }}
          </span>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { OrderItemData } from '@/types/orders';

export default defineComponent({
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  computed: {
    orderItemList(): OrderItemData[] {
      return [
        ...this.order.order_items,
        {
          name: this.order.delivery_method.name,
          quantity: 1,
          amount: this.order.delivery_fee,
        }
      ]
    },
  },
  methods: {
    formatCurrency(value: number) {
      return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    },
  },
})
</script>