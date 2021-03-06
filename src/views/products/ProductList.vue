<template>
  <div class="product-list">
    <PageHeading
      title="All Products"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="products-dt"
          :value="products"
          v-model:selection="selectedProducts"
          dataKey="id"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name','unitPrice','stockAvailability']"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="[10,20,50, 100, 200]"
          :first="firstRecordIndex"
          responsiveLayout="scroll"
          :scrollable="true"
          :rowHover="true"
          @row-click="openProduct($event.data)"
        >
          <template #header>
            <!-- <div class="table-header"> -->
            <div class="p-mb-4"> 
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search products"
                />
              </span>
            </div>
          </template>
          <template #empty>
            No products found.
          </template>
          <template #loading>
            Loading products data. Please wait.
          </template>
          <Column
            field="name"
            style="min-width: 16rem"
            headerStyle="min-width:16rem; height: 50px; font-weight: bold;"
            header="Name"
            filterField="name"
            :filterMatchModeOptions="matchModeOptions"
            ref="name"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            header="Image"
            style="min-width: 6rem"
            headerStyle="min-width:6rem; height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Image</span>
              <img
                :src="slotProps.data.mainImage"
                :alt="slotProps.data.name"
                class="product-image"
              />
            </template>
          </Column>
          <Column
            ref="unitPrice"
            field="unitPrice"
            header="Price"
            filterField="unitPrice"
            filterMatchMode="contains"
            filterMode="contains"
            style="min-width: 12rem"
            headerStyle="min-width:12rem; height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ formatCurrency(slotProps.data.unitPrice) }}
            </template>
          </Column>
          <Column
            field="userId"
            header="Vendor ID"
            filterField="userId"
            filterMatchMode="contains"
            style="min-width: 12rem"
            headerStyle="min-width:12rem; height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Vendor</span>
              {{ slotProps.data.userId }}
            </template>
          </Column>
          <Column
            field="rating"
            header="Reviews"
            filterField="rating"
            filterMatchMode="contains"
            style="min-width: 10rem"
            headerStyle="min-width:10rem; height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Reviews</span>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            header="Status"
            filterField="quantity"
            filterMatchMode="contains"
            filterMode="contains"
            style="min-width: 8rem"
            headerStyle="min-width:8rem; height: 50px; font-weight: bold;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Status</span>
              <span
                :class="
                  'product-badge status-' +
                    slotProps.data.stockAvailability.toLowerCase()
                "
                >{{ slotProps.data.stockAvailability }}</span
              >
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >

    <div class="p-fluid">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-col-12 p-md-6">
          <label for="productImg">Product Image</label>
          <img
            :src="product.mainImage"
            :alt="name"
            id="productImg"
            style="width: 200px; height: 160px; border-radius: 10px;"
          />
        </div>
      </div>
      <div class="p-field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model="product.name"
        />
      </div>
      <div class="p-field">
        <label for="price">Price</label>
        <InputNumber
          id="price"
          v-model="product.unitPrice"
          mode="currency"
          currency="NGN"
          locale="en-NG"
        >
        </InputNumber>
      </div>

      <div class="p-field">
        <label for="vendor">Vendor ID</label>
        <InputNumber
          id="vendor"
          v-model="product.userId"
        />
      </div>

      <div class="p-field">
        <label for="rating">Reviews</label>
        <Rating
          :modelValue="product.rating"
          :readonly="true"
          :cancel="false"
        />
      </div>

      <div class="p-field" id="productStat">
        <label for="status"> Status</label>
        <span
          :class="
          'product-badge status-' +
          product.stockAvailability.toLowerCase()
          "
          >{{ product.stockAvailability }}</span
        >
      </div>
    </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import Product from '@/models/Product'
import ProductService from '@/services/ProductService';
import { ProductData, StockStatus } from '@/types/product';
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';

interface ProductLazyParameters {
  page:       number;
  pageSize:   number;
  items:      ProductData[];
  totalCount: number;
  limit:  number;
  name: string;   
  maxPrice: string;
  minPrice: string;
  first: number;
  rows: number;
}

export default class ProductList extends Vue {
  products: Product[] = [];
  product!: Product;
  selectedProducts: Product[] = [];
  loading = false;
  generalLoading = false;
  totalRecords = 0;
  productDialog = false;
  service: ProductService = new ProductService();
  statuses = [StockStatus.INSTOCK, StockStatus.LOWSTOCK, StockStatus.OUTOFSTOCK];
  lazyParams: Partial<ProductLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  toast = useToast();
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]

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
    this.generalLoading = true
    this.loading = true;
    // this.lazyParams = { first: 0, page: 1, limit: this.rowstoDisplay }
    // this.lazyParams = {  page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  loadLazyData() {
    this.loading = true;
    this.service.getAllPaginated(this.service.allProducts)
      .then(data => {
        this.products = data.items.map((prod) => new Product(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        // this.rowstoDisplay = data.pageSize;
        this.loading = false;
        this.generalLoading = false;
        console.log(this.products);
        console.log(this.products.length)
        console.log(data)
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the all products", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }

  // openProduct() {
  //   this.product = new Product({});
  //   // this.submitted = false;
  //   this.productDialog = true;
  //   console.log(this.product)
  // }

  openProduct(product: Product) {
    this.product = product;
    // this.submitted = false;
    this.productDialog = true;
  }

}
</script>


<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 50px;
  height: 3rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: cover;
  object-position: center;
}
.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 40em) {
  .p-datatable.p-datatable-responsive-demo .p-datatable-thead > tr > th,
  .p-datatable.p-datatable-responsive-demo .p-datatable-tfoot > tr > td {
    display: none !important;
  }
  .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td {
    text-align: left;
    display: block;
    border: 0 none !important;
    width: 100% !important;
    float: left;
    clear: left;
  }
  .p-datatable.p-datatable-responsive-demo
    .p-datatable-tbody
    > tr
    > td
    .p-column-title {
    padding: 0.4rem;
    min-width: 30%;
    display: inline-block;
    margin: -0.4em 1em -0.4em -0.4rem;
    font-weight: bold;
  }
}

.product-badge.status-instock {
  background: #c8e6c9;
  color: #256029;
}
.product-badge.status-lowstock {
  background: #feedaf;
  color: #8a5340;
}
.product-badge.status-outofstock {
  background: #ffcdd2;
  color: #c63737;
}
.product-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
#productStat {
  display: grid;
  justify-content: start;
}
</style>