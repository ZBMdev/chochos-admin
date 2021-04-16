<template>
  <div>
    <PageHeading
      title="Artisans' Categories"
      :subtitle="`${totalRecords} in total`" />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="artisan-dt"
          :value="artisansCat"
          v-model:selection="selectedArtisansCat"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :scrollable="true"
          responsiveLayout="scroll"
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
          <template #empty>
            No category found.
          </template>
          <template #loading>
            Loading categories data. Please wait.
          </template>
          <Column
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['name']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column
            field="description"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Description"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span
                v-html="`${slotProps.data.description.substr(0, 25)}...`"
              ></span>
            </template>
          </Column>
          <Column
            field="created_on"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Created On"
            sortField="last_login_date"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.createdAt }}
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
      <ArtisanEdit
        :category="category"
        :artisansCat="artisansCat.filter(cat => cat.id !== category.id)"
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
          >Are you sure you want to delete the selected artisan category?</span
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
import MainLayout from '@/components/layouts/MainLayout.vue';
import ArtisanCategory from '@/models/ArtisanCategory';
import ArtisanCategoryService from '@/services/ArtisanCategoryService';
import { ArtisanCategoryData } from '@/types/artisanCategory'
import ArtisanEdit from "@/components/category/ArtisanEdit.vue";
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface ArtisanCatLazyParameters {
  page: number;
  limit: number;
  name: string;
  totalCount:  number;
  items:      ArtisanCategoryData[];
}

@Options({
  components: { MainLayout, ArtisanEdit },
}) 

export default class ArtisanList extends Vue {
  isLoading = false;
  artisansCat: ArtisanCategory[] = [];
  datasource: ArtisanCategory[] = [];
  totalRecords = 0;
  service: ArtisanCategoryService = new ArtisanCategoryService();
  selectedArtisans: ArtisanCategory[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  lazyParams: Partial<ArtisanCatLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  // categories: ArtisanCategory[] = [];
  categoryDialog = false;
  deleteCategoryDialog = false;
  deleteCategoriesDialog = false;
  category!: ArtisanCategory;
  selectedCategories: ArtisanCategory[] = [];

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
    this.isLoading = true
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }
  
  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.artisansCat = data.items.map((prod) => new ArtisanCategory(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the artisans", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }

  afterUpdateCategory(justUpdated: ArtisanCategoryData) {
    this.artisansCat[this.findIndexById(justUpdated.id)] = new ArtisanCategory(justUpdated);
  }

  afterCreateCategory(justUpdated: ArtisanCategoryData) {
    this.artisansCat.push(new ArtisanCategory(justUpdated));
    this.categoryDialog = false;
  }

  get parentCategory() {
    const parent = this.artisansCat.find((cat) => cat.id === this.category.id);
    return parent ? parent.id : 0;
  }
  set parentCategory(parentId: number) {
    // eslint-disable-next-line
    this.category.id = parentId;
  }

  editCategory(category: ArtisanCategory) {
    this.category = category;
    this.categoryDialog = true;
  }
  onUpload() {
    this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  openNew() {
    this.category = new ArtisanCategory({});
    this.submitted = false;
    this.categoryDialog = true;
    console.log("It will soon work")
  }

  confirmDeleteCategory(category: ArtisanCategory) {
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
    return this.artisansCat.findIndex((cat) => cat.id === id)
  }

  deleteSelectedCategories() {
    this.isLoading = true;
    // delete 
    this.selectedCategories.forEach(async (cat) => {
      await this.service.delete(cat.id);
    });
    this.artisansCat = this.artisansCat.filter(val => !this.selectedCategories.includes(val));
    this.deleteCategoriesDialog = false;
    this.selectedCategories = [];
    this.isLoading = false;
    this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
  }

  deleteCategory() {
    this.isLoading = true
    this.service.delete(this.category.id)
      .then((message) => {
        this.artisansCat = this.artisansCat.filter(val => val.id !== this.category.id);
        this.deleteCategoryDialog = false;
        this.category = new ArtisanCategory({});
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
.filter-by {
  min-width: 300px;
}
</style>