<!-- <template>
  <div class="product-list">
    <PageHeading title="All Products" subtitle="A list of all your products" />
    <ProgressSpinner v-if="loading" />

    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive"
          :value="products"
          :paginator="true"
          :rows="25"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :lazy="true"
          :totalRecords="totalRecords"
          :loading="loading"
          @page="onPage($event)"
        >
          <template #header>
            <div class="table-header">
              Products
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filterValue"
                  placeholder="Search products"
                  @input="filterProducts"
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
            </template>
          </Column>
          <Column
            field="price"
            header="Price"
            filterField="product.price"
            filterMatchMode="contains"
            :sortable="true"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Categories</span>
              {{ slotProps.data.categoriesNames }}
            </template>
          </Column>
          <Column field="rating" header="Reviews" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Reviews</span>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column header="Status" :sortable="true">
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
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-mr-2"
                @click="$router.push('/products/' + slotProps.data.id)"
              /> -->
              <!-- harsh <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          /> -->
          <!--  </template>
          </Column>
          <template #footer>
            In total there are {{ products ? products.length : 0 }} products.
          </template>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Product from '@/models/Product'
import Paginator from 'primevue/paginator';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Rating from 'primevue/rating';
import ProductService from '@/services/ProductService';
import { StockStatus } from '@/types/product';

@Options<ProductList>({
  components: { Paginator, Rating, ColumnGroup },
})
export default class ProductList extends Vue {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  filterValue = '';
  loading = false;
  totalRecords = 0;
  datasource: Product[] = [];
  productService: ProductService = new ProductService();
  statuses = [StockStatus.INSTOCK, StockStatus.LOWSTOCK, StockStatus.OUTOFSTOCK];

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
    this.loading = true;
    this.productService.getAll().then(data => {
      this.datasource = data ? data.map((prod) => new Product(prod)) : [];
      this.totalRecords = data ? data.length : 0;
      this.products = this.datasource.slice(0, 10);
      this.loading = false;
    }).catch((e) => {
      console.log(e);
    });
  }

  // eslint-disable-next-line
  onPage(event: any) {
    //event.page: New page number
    //event.first: Index of first record
    //event.rows: Number of rows to display in new page
    //event.pageCount: Total number of pages
    this.loading = true;

    setTimeout(() => {
      this.products = this.datasource.slice(event.first, event.first + event.rows);
      this.loading = false;
    }, 100);
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  /**
   *  filter event is not triggered in lazy mode instead use the event you prefer on your 
   * form elements such as input, change, blur to make a remote call by passing the filters 
   * property to update the displayed data. 
   */
  // eslint-disable-next-line
  filterProducts(event: any) {
    this.loading = true;
    if (event.target.value) {
      this.products = this.datasource.filter((product) => {
        return product.name.toLowerCase().includes(event.target.value.toLowerCase());
      })
    } else {
      this.products = this.datasource.slice(0, 10);
    }
    this.loading = false;
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
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
</style> -->
<template>
  <h2>Product List</h2>
</template>

<script>
export default {

}
</script>

<style>

</style>
