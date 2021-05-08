<template>
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
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openNew"
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
      <CategoryEdits
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
import CategoryEdits from "@/components/products/CategoryEdits.vue";
import qs from 'qs';
import {FilterMatchMode} from 'primevue/api';

@Options({
  components: { Rating, CategoryEdits },
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


  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getData();
      },
      { immediate: true }
    )
  }

  getData() {
    this.isLoading = true;
    this.categoryService.getAllPaginated()
      .then((data) => {
        this.categories = data.items.map((cat) => new Category(cat))
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
</style>