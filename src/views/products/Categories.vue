<template>
  <div class="categories">
    <PageHeading
      title="Categories"
      subtitle="create edit, delete your categories"
    />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          ref="dt"
          :value="categories"
          class="p-datatable-responsive"
          v-model:selection="selectedCategories"
          dataKey="id"
          :paginator="true"
          :rows="25"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100, 200]"
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
              <span v-html="slotProps.data.description"></span>
            </template>
          </Column>
          <Column header="Status">
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
                <span
                  v-if="slotProps.data.is_featured"
                  class="categories-badge status-featured"
                >
                  Featured
                </span>
              </span>
            </template>
          </Column>
          <Column header="Count" headerStyle="width: 5.5rem">
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
        <label for="name">Category Image</label>
        <img
          :src="category.imageURL"
          :alt="category.name"
          class="category-image"
          v-if="category.imageURL"
        />
        <FileUpload
          v-else
          mode="basic"
          name="images[]"
          url="./upload"
          :multiple="true"
          :auto="true"
          accept="image/*"
          :maxFileSize="2000"
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>
      <div class="p-field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="category.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !category.name }"
        />
        <small class="p-invalid" v-if="submitted && !category.name"
          >Name is required.</small
        >
      </div>
      <div class="p-field">
        <label for="description">Description</label>
        <Textarea
          id="description"
          v-model="category.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="p-field">
        <label class="p-mb-3">Parent Category</label>
        <Dropdown
          :options="categories.filter(cat => cat.id !== category.id)"
          v-model="parentCategory"
          optionLabel="name"
          optionValue="id"
          placeholder="Select Category"
          :filter="true"
        />
      </div>
      <div class="p-d-flex p-fluid">
        <div class="p-col p-d-flex p-field">
          <label for="is_activated">
            <InputSwitch
              id="is_activated"
              class="p-mr-2"
              v-model="category.is_activated"
            />Activated</label
          >
        </div>
        <div class="p-col p-d-flex p-field">
          <label for="is_featured">
            <InputSwitch
              id="is_featured"
              class="p-mr-2"
              v-model="category.is_featured"
            />Featured</label
          >
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveCategory"
        />
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
import Category from '@/models/Category';
import CategoryService from '@/services/CategoryService';
import { useToast } from 'primevue/usetoast';

@Options({
  components: {},
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
    this.categoryService.getWithProducts()
      .then((data) => {
        this.categories = data.map((cat) => new Category(cat))
        this.isLoading = false;
      });
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

  saveCategory() {
    this.submitted = true;
    this.isLoading = true;

    if (this.category.name.trim()) {
      if (this.category.id) {
        // udpate
        this.categoryService.put(this.category.id, this.category.toCreateParam())
          .then((newCategory) => {
            this.category = new Category(newCategory);
            this.categories[this.findIndexById(this.category.id)] = this.category;
            this.isLoading = false;
            this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
          }).catch(() => {
            this.toast.add({ severity: 'error', summary: 'Error', detail: 'Updating failed', life: 3000 });
          }).finally(() => {
            this.isLoading = false
          });
      }

      else {
        //create
        this.categoryService.create(this.category.toCreateParam())
          .then((newCategory) => {
            this.category = new Category(newCategory);
            this.categories.push(this.category);
            this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
          }).catch(() => {
            this.toast.add({ severity: 'error', summary: 'Error', detail: 'Creating failed', life: 3000 });
          }).finally(() => {
            this.isLoading = false
          });
      }

      this.categoryDialog = false;
    }

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
  width: 5rem;
  height: 4rem;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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