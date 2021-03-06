<template>
  <div class="product-list">
    <PageHeading
      title="Total Sale"
      :subtitle="`${totalRecords} products in total`"
    />
    <ProgressSpinner v-if="generalLoading" />

    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="products"
          :paginator="true"
          :rows="rowstoDisplay"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :lazy="true"
          paginatorPosition="both"
          :totalRecords="totalRecords"
          :loading="loading"
          @page="onPage($event)"
          @sort="onSort($event)"
          :filters="filters"
          :first="firstRecordIndex"
          :rowHover="true"
        >
          <template #header>
            <div class="table-header">
              Products
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filterValue"
                  placeholder="Search products"
                  @keypress.enter="filterProducts"
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
            header="Name"
            filterMatchMode="contains"
            ref="name"
            headerStyle="width:14rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="quantity"
            header="Quantity"
            filterField="quantity"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Quantity</span>
              {{ slotProps.data.quantity }}
            </template>
          </Column>
          <Column
            ref="price"
            field="price"
            header="Price"
            filterField="price"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Amount Sold</span>
              {{ formatCurrency(slotProps.data.amount * slotProps.data.quantity) }}
            </template>
          </Column>
          <template #footer>
            <div class="table-footer">
              Total Revenue
              <span
                :loading="summaryLoading"
                :value="`&#8358; ${summary.sales}`"
              >
                N {{ summary.sales }}
              </span>
            </div>
          </template>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Product from '@/models/Product'
import Rating from 'primevue/rating';
import ProductService from '@/services/ProductService';
import { StockStatus } from '@/types/product';
import qs from 'qs';
import { DashboardSummary, TimeSummary } from '@/types/dashboard';
import DashboardService from '@/services/DashboardService';
import { OrderItemData } from '@/types/orders'

interface ProductLazyParameters {
  page: number;
  limit: number;
  name: string;
  maxPrice: string;
  minPrice: string;
  rating: number;
  discount: number;
  isPublished: boolean;
}

@Options<ProductList>({
  components: { Rating },
})
export default class ProductList extends Vue {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  filterValue = '';
  loading = false;
  generalLoading = false;
  totalRecords = 0;
  service: ProductService = new ProductService();
  statuses = [StockStatus.INSTOCK, StockStatus.LOWSTOCK, StockStatus.OUTOFSTOCK];
  filters = {
    name: "",
    price: undefined,
    rating: undefined,
    status: "",
  };
  lazyParams: Partial<ProductLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  summaryLoading = false;
  summary = {} as DashboardSummary;

   mounted() {
    this.summaryLoading = true;
    (new DashboardService()).getSummary()
      .then((data) => {
        this.summary = data;
      }).finally(() => {
        this.summaryLoading = false;
      });
  }

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
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
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
    // if (event.keyCode === 13) {
    this.loading = true;
    if (this.filterValue) {
      this.lazyParams = { name: this.filterValue, limit: 1000000000000, }
      this.searchData();
    }
    // }
  }

  searchData() {
    this.loading = true;
    this.service.search(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.products = data.data.map((prod) => new Product(prod));
        this.totalRecords = data.total;
        this.firstRecordIndex = 0;
        this.loading = false;
        this.generalLoading = false;
      });
  }

  loadLazyData() {
    this.loading = true;
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.products = data.data.map((prod) => new Product(prod));
        this.totalRecords = data.total;
        this.firstRecordIndex = data.current_page > 1 ? data.limit * data.current_page - 1 : 0;
        this.rowstoDisplay = data.limit;
        this.loading = false;
        this.generalLoading = false;
      });
  }

  // eslint-disable-next-line
  onPage(event: any) {
    //event.page: New page number
    //event.first: Index of first record
    //event.rows: Number of rows to display in new page
    //event.pageCount: Total number of pages
    // console.log(event);
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as ProductLazyParameters;
    this.loadLazyData();
  }

  // eslint-disable-next-line
  onSort(event: any) {
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as ProductLazyParameters;
    this.loadLazyData();
  }

  // eslint-disable-next-line
  onFilter(event: any) {
    if (event.keyCode === 13) {
      this.loading = true;
      this.lazyParams = { ...this.lazyParams, ...this.filters, maxPrice: this.filters.price, minPrice: this.filters.price };
      this.loadLazyData();
    }
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
.table-footer span{
  float: right;
  margin-right: 60px;
}
</style>