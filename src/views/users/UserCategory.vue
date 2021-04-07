<!--
<template>
  <div>
    <PageHeading
      title="Customers Category"
      :subtitle="`${totalRecords} products in total`"
    />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive  p-datatable-sm"
          :value="customers"
          :filters="filters"
          scrollable="true"
          :rowHover="true"
          @row-click="editCategory($event.data)"
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

                <Button
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
            field="occupation"
            headerStyle="width: 250px"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #filter>
              <InputText
                type="text"
                v-model="filters['occupation']"
                class="p-column-filter"
                placeholder="Search by occupation"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.occupation }}
            </template>
          </Column>
          <Column
            field="fee"
            header="Amount"
            filterField="fee"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Amount</span>
              {{ currencyFormat(slotProps.data.fee) }}
            </template>
          </Column>
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-mr-2"
                @click="editCategory(slotProps.data)"
              />
              <Button
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
          >Are you sure you want to delete <b>{{ category.occupation }}</b
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
          >Are you sure you want to delete the selected user category?</span
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
import UserCategory from '@/models/UserCategory'
import UserCategoryService from '@/services/UserCategoryService';
import { UserCategoryData } from '@/types/customer'
import { useToast } from 'primevue/usetoast';
import BombsightService from '@/services/BombsightService';
import UserEdit from "@/components/products/UserEdit.vue";
import qs from 'qs';

interface UserCategoryParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      UserCategoryData[];
  totalCount: number;
}

@Options({
  components: { UserEdit },
})

export default class UserCategoryList extends Vue {
  categories: UserCategory[] = [];
  categoryDialog = false;
  deleteCategoryDialog = false;
  deleteCategoriesDialog = false;
  category!: UserCategory;
  selectedCategories: UserCategory[] = [];
  filterValue = '';
  filters: Record<string, unknown> = {};
  submitted = false;
  isLoading = false;
  generalLoading = false;
  toast = useToast();
  totalRecords = 0;
  service: UserCategoryService = new UserCategoryService();
  lazyParams: Partial<UserCategoryParameters> = {};
  file: File & { objectURL: string } | undefined = undefined;
  imageService = new BombsightService();
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
    this.isLoading = true;
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.categories = data.items.map((prod) => new UserCategory(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
        this.generalLoading = false;
      }
    );
  }

   afterUpdateCategory(justUpdated: UserCategoryData) {
    this.categories[this.findIndexById(justUpdated.id)] = new UserCategory(justUpdated);
  }

  afterCreateCategory(justUpdated: UserCategoryData) {
    this.categories.push(new UserCategory(justUpdated));
    this.categoryDialog = false;
  }

  get parentCategory() {
    const parent = this.categories.find((cat) => cat.id === this.category.id);
    return parent ? parent.id : 0;
  }
  set parentCategory(parentId: number) {
    // eslint-disable-next-line
    this.category.id = parentId;
  }

  editCategory(category: UserCategory) {
    this.category = category;
    this.categoryDialog = true;
  }
  onUpload() {
    this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  openNew() {
    this.category = new UserCategory({});
    this.submitted = false;
    this.categoryDialog = true;
    console.log("It will soon work")
  }

  confirmDeleteCategory(category: UserCategory) {
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
      await this.service.delete(cat.id);
    });
    this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
    this.deleteCategoriesDialog = false;
    this.selectedCategories = [];
    this.isLoading = false;
    this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
  }

  deleteCategory() {
    this.isLoading = true
    this.service.delete(this.category.id)
      .then((message) => {
        this.categories = this.categories.filter(val => val.id !== this.category.id);
        this.deleteCategoryDialog = false;
        this.category = new UserCategory({});
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
-->