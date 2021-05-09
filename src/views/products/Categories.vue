<template>
  <div>
    <PageHeading
      title="Products Category"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          :value="categories"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name']"
          responsiveLayout="scroll"
          scrollable="true"
          :rowHover="true"
          @row-click="editCategory($event.data)"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              <div class="p-mb-2 p-m-md-0 p-as-md-center">
                <Button
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openNew"
                />
              </div>   
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>
          <Column
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Name"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="categories"
            header="Date"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            filterField="categories"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Date</span>
              {{ slotProps.data.createdAtFormated }}
            </template>
          </Column>
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-raised p-button-success p-mr-2"
                @click="editCategory(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-raised p-button-danger"
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
import Category from '@/models/Category'
import CategoryService from '@/services/CategoryService';
import { CategoryData } from '@/types/category'
import { useToast } from 'primevue/usetoast';
import BombsightService from '@/services/BombsightService';
import CategoryEdit from "@/components/products/CategoryEdit.vue";
import qs from 'qs';
import {FilterMatchMode} from 'primevue/api';

interface CategoriesLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      CategoryData[];
  totalCount: number;
}

@Options({
  components: { CategoryEdit },
})

export default class ProductList extends Vue {
  categories: Category[] = [];
  categoryDialog = false;
  deleteCategoryDialog = false;
  deleteCategoriesDialog = false;
  category!: Category;
  selectedCategories: Category[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ];
  submitted = false;
  isLoading = false;
  generalLoading = false;
  toast = useToast();
  totalRecords = 0;
  service: CategoryService = new CategoryService();
  lazyParams: Partial<CategoriesLazyParameters> = {};
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
        this.categories = data.items.map((prod) => new Category(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
        this.generalLoading = false;
      }
    );
  }

  afterUpdateCategory(justUpdated: CategoryData) {
    this.categories[this.findIndexById(justUpdated.id)] = new Category(justUpdated);
  }

  afterCreateCategory(justUpdated: CategoryData) {
    this.categories.push(new Category(justUpdated));
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


<!--
<template>
  <div>
    <PageHeading
      title="Products Category"
      :subtitle="`${totalRecords} products in total`"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          :value="categories"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name']"
          responsiveLayout="scroll"
          scrollable="true"
          :rowHover="true"
          @row-click="editCategory($event.data)"
        >
          <template #header><div class="p-mb-4">   
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
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
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Name"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="categories"
            header="Date"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            filterField="categories"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Date</span>
              {{ slotProps.data.createdAtFormated }}
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
      <div class="p-field">
        <label for="name">Name</label>
          <InputText id="name" v-model.trim="category.name" required="true" autofocus :class="{'p-invalid': submitted && !category.name}" />
          <small class="p-error" v-if="submitted && !category.name">Name is required.</small>
      </div>
      <div class="p-field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="category.description" required="true" rows="3" cols="20" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveCategory" />
      </template>
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
import Category from '@/models/Category'
import CategoryService from '@/services/CategoryService';
import { CategoryData } from '@/types/category'
import { useToast } from 'primevue/usetoast';
import BombsightService from '@/services/BombsightService';
import CategoryEdit from "@/components/products/CategoryEdit.vue";
import qs from 'qs';
import {FilterMatchMode} from 'primevue/api';

interface CategoriesLazyParameters {
  page:       number;
  pageSize:   number;
  limit:      number;
  items:      CategoryData[];
  totalCount: number;
}

@Options({
  components: { CategoryEdit },
})

export default class ProductList extends Vue {
  categories: Category[] = [];
  categoryDialog = false;
  deleteCategoryDialog = false;
  deleteCategoriesDialog = false;
  category!: Category;
  selectedCategories: Category[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ];
  submitted = false;
  isLoading = false;
  generalLoading = false;
  toast = useToast();
  totalRecords = 0;
  service: CategoryService = new CategoryService();
  lazyParams: Partial<CategoriesLazyParameters> = {};
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
        this.categories = data.items.map((prod) => new Category(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
        this.generalLoading = false;
      }
    );
  }

  afterUpdateCategory(justUpdated: CategoryData) {
    this.categories[this.findIndexById(justUpdated.id)] = new Category(justUpdated);
  }

  afterCreateCategory(justUpdated: CategoryData) {
    this.categories.push(new Category(justUpdated));
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

  saveCategory() {
    this.submitted = true;

			if (this.category.name.trim()) {
        if (this.category.id) {
          this.categories[this.findIndexById(this.category.id)] = this.category;
          this.categories.save(this.category);
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'category Updated', life: 3000});
        }
        else {
          this.categories.push(this.category);
          this.$toast.add({severity:'success', summary: 'Successful', detail: 'category Created', life: 3000});
        }
        this.categoryDialog = false;
        // this.category = {}; 
      }
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
