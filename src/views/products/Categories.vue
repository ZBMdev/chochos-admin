<!-- <template>
  <div class="categories">
    <PageHeading title="Categories" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          ref="dt"
          :value="categories"
          class="p-datatable-responsive  p-datatable-sm"
          v-model:selection="selectedCategories"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          :rowHover="true"
          @row-click="editCategory($event.data)"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
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
                  v-if="can(auth.ResourceAction.Create)"
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openNew"
                />

                <Button
                  v-if="can(auth.ResourceAction.Delete)"
                  label="Delete"
                  icon="pi pi-trash"
                  class="p-button-danger"
                  @click="confirmDeleteSelected"
                  :disabled="!selectedCategories || !selectedCategories.length"
                />
              </div>
            </div>
          </template>

          <Column
            selectionMode="multiple"
            headerStyle="width: 3rem"
            :exportable="false"
          ></Column>
          <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Image" headerStyle="width: 5.5rem">
            <template #body="slotProps">
              <span class="p-column-title">Image</span>
              <img
                :src="slotProps.data.imageURL"
                :alt="slotProps.data.name"
                class="categories-image"
              />
            </template>
          </Column>
          <Column header="Description">
            <template #body="slotProps">
              <span class="p-column-title">Description</span>
              <span
                v-html="`${slotProps.data.description.substr(0, 20)}...`"
              ></span>
            </template>
          </Column>
          <Column sortField="is_activated" header="Status" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Status</span>
              <span>
                <span
                  v-if="slotProps.data.is_activated"
                  class="categories-badge status-active"
                >
                  Active
                </span>
                <span v-else class="categories-badge status-inactive">
                  InActive
                </span>
              </span>
            </template>
          </Column>
          <Column sortField="is_featured" header="Featured" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Featured</span>
              <Rating
                :modelValue="Number(slotProps.data.is_featured)"
                :stars="1"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            sortField="products.length"
            header="Count"
            headerStyle="width: 5.5rem"
            :sortable="true"
          >
            <template #body="slotProps">
              <span class="p-column-title">Count</span>
              <span class="">
                {{ slotProps.data.products.length }}
              </span>
            </template>
          </Column>
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                v-if="can(auth.ResourceAction.Update)"
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-mr-2"
                @click="editCategory(slotProps.data)"
              />
              <Button
                v-if="can(auth.ResourceAction.Delete)"
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="confirmDeleteCategory(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <Dialog
      v-model:visible="categoryDialog"
      :style="{ width: '450px' }"
      header="Category Details"
      :modal="true"
      class="p-fluid"
    >
      <CategoryEdit
        :category="category"
        :categories="categories.filter(cat => cat.id !== category.id)"
        @updated="afterUpdateCategory"
        @created="afterCreateCategory"
      />
    </Dialog>

    <Dialog
      v-model:visible="deleteCategoryDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="category"
          >Are you sure you want to delete <b>{{ category.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteCategoryDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteCategory"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteCategoriesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="category"
          >Are you sure you want to delete the selected products?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteCategoryDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedCategories"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Category from '@/models/Category';
import { CategoryData } from '@/types/category';
import CategoryService from '@/services/CategoryService';
import { useToast } from 'primevue/usetoast';
import Rating from 'primevue/rating';
import BombsightService from '@/services/BombsightService';
import CategoryEdit from "@/components/products/CategoryEdit.vue";
// import { useAuth } from '@/utils/users'
// import { ResourceAction } from '@/types/roles'

@Options({
  components: { Rating, CategoryEdit },
})
export default class Categories extends Vue {
  categories: Category[] = [];
  categoryDialog = false;
  deleteCategoryDialog = false;
  deleteCategoriesDialog = false;
  category!: Category;
  selectedCategories: Category[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  categoryService = new CategoryService();
  isLoading = true;
  toast = useToast();
  file: File & { objectURL: string } | undefined = undefined;
  imageService = new BombsightService();
  // auth = useAuth();


  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getData();
      },
      { immediate: true }
    )
  }

  /* can(action: ResourceAction) {
    return this.auth.can(action, this.auth.ResourceModule.Category)
  } */

  getData() {
    this.isLoading = true;
    this.categoryService.getAllCategories()
      .then((data) => {
        this.categories = data.map((cat) => new Category(cat))
        this.isLoading = false;
      });
  }

  afterUpdateCategory(justUpdated: CategoryData) {
    this.categories[this.findIndexById(justUpdated.id)] = new Category(justUpdated);
  }

  afterCreateCategory(justUpdated: CategoryData) {
    this.categories.push(new Category(justUpdated));
    this.categoryDialog = false;
  }

  get parentCategory() {
    const parent = this.categories.find((cat) => cat.id === this.category.parent_id);
    return parent ? parent.id : 0;
  }
  set parentCategory(parentId: number) {
    // eslint-disable-next-line
    this.category.parent_id = parentId;
  }

  editCategory(category: Category) {
    this.category = category;
    this.categoryDialog = true;
  }
  onUpload() {
    this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  openNew() {
    this.category = new Category({});
    this.submitted = false;
    this.categoryDialog = true;
  }

  confirmDeleteCategory(category: Category) {
    this.category = category;
    this.deleteCategoryDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteCategoriesDialog = true;
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    return this.categories.findIndex((cat) => cat.id === id)
  }

  deleteSelectedCategories() {
    this.isLoading = true;
    // delete 
    this.selectedCategories.forEach(async (cat) => {
      await this.categoryService.delete(cat.id);
    });
    this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
    this.deleteCategoriesDialog = false;
    this.selectedCategories = [];
    this.isLoading = false;
    this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
  }

  deleteCategory() {
    this.isLoading = true
    this.categoryService.delete(this.category.id)
      .then((message) => {
        this.categories = this.categories.filter(val => val.id !== this.category.id);
        this.deleteCategoryDialog = false;
        this.category = new Category({});
        this.toast.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
      }).catch(() => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Deleting Failed failed', life: 3000 });
      }).finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<style scoped>
.categories-image {
  width: 50px;
  height: 3rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: cover;
  object-position: center;
}

.categories-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
  margin: 0 0.2rem 0.2rem 0;
}
.categories-badge.status-active {
  background: #c8e6c9;
  color: #256029;
}
.categories-badge.status-featured {
  background: #afb5fe;
  color: #40468a;
}
.categories-badge.status-inactive {
  background: #feedaf;
  color: #8a5340;
}
</style> -->

<template>
  <div>
    <PageHeading
      title="Products Category"
      :subtitle="`${totalRecords} products in total`"
    />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
         :value="categories"
        >
        <Column
            field="name"
            headerStyle="width: 250px"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['name']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="categories"
            header="Date"
            filterField="categories"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Date</span>
              {{ slotProps.data.createdAtFormated }}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Category from '@/models/Category'
import Rating from 'primevue/rating';
import CategoryService from '@/services/CategoryService';
import { CategoryData } from '@/types/category'
import qs from 'qs';

interface CategoriesLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      CategoryData[];
  totalCount: number;
}

export default class ProductList extends Vue {
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  filterValue = '';
  loading = false;
  generalLoading = false;
  totalRecords = 0;
  service: CategoryService = new CategoryService();
  filters = {
    name: "",
    price: undefined,
    rating: undefined,
    status: "",
  };
  lazyParams: Partial<CategoriesLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;

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

  loadLazyData() {
    this.loading = true;
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.categories = data.items.map((prod) => new Category(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
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
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as CategoriesLazyParameters;
    this.loadLazyData();
  }

  // eslint-disable-next-line
  onSort(event: any) {
    this.lazyParams = { ...event.originalEvent, page: event.page + 1, limit: event.rows } as CategoriesLazyParameters;
    this.loadLazyData();
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
</style>
