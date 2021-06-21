<template>
  <div>
    <PageHeading
      title="Artisans' Categories"/>
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="artisan-dt"
          :value="categories"
          v-model:selection="selectedCategories"
          dataKey="id"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name']"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :scrollable="true"
          responsiveLayout="scroll"
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
              <!-- <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span> -->
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
                {{ slotProps.data.description }}
            </template>
          </Column>
          <Column
            field="created_on"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Created On"
            sortField="last_login_date"
          >
            <template #body="slotProps">
              {{ slotProps.data.createdAt }}
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
    
    <Dialog v-model:visible="categoryDialog" :style="{width: '450px'}" header="New Category Details" :modal="true" class="p-fluid">
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
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveCategory" loadingText="Saving" />
      </template>
    </Dialog>

    <Dialog v-model:visible="categoryEditDialog" :style="{width: '450px'}" header="Category Details" :modal="true" class="p-fluid">
      <div class="p-field">
        <label for="name">Name</label>
        <InputText id="name" v-model="category.name" required="true" autofocus :class="{'p-invalid': submitted && !category.name}" />
        <small class="p-error" v-if="submitted && !category.name">Name is required.</small>
      </div>
      <div class="p-field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="category.description" required="true" rows="3" cols="20" />
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateCategory" loadingText="Saving" />
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
import { ref, onMounted } from 'vue';
import ArtisanCategory from '@/models/ArtisanCategory';
import ArtisanCategoryService from '@/services/ArtisanCategoryService';
import { ArtisanCategoryData } from '@/types/artisanCategory'
import { useToast } from 'primevue/usetoast';
// import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';

export default {
    setup() {   
        const toast = useToast();
        const dt = ref();
        const isLoading = ref(false);
        const categories = ref();
        const categoryDialog = ref(false);
        const deleteCategoryDialog = ref(false);
        const deleteCategoriesDialog = ref(false);
        const category = ref();
        const service = ref(new ArtisanCategoryService());
        const selectedCategories = ref();
        // const filters = ref({
        //   'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        // });
        const submitted = ref(false);
        const lazyParams = ref({});
        const totalRecords = ref(0);
        const firstRecordIndex = ref(0);
        const rowstoDisplay = ref(10);
        const categoryEditDialog = ref(false);

        const loadLazyData = () => {
          isLoading.value = true;
          service.value.getAllPaginated(`${qs.stringify(lazyParams.value)}`)
            .then(data => {
              categories.value = data.items.map((prod) => new ArtisanCategory(prod));
              totalRecords.value = data.totalCount;
              firstRecordIndex.value = data.page > 1 ? data.pageSize * data.page - 1 : 0;
              rowstoDisplay.value = data.pageSize;
              isLoading.value = false;
            }).catch((e) => {
            toast.add({ severity: "error", summary: "There was an error fetching the artisans", detail: "Please check your internet connection and refresh the page" })
            console.log(e);
            });
        };

        const findIndexById = (id: number) => {
          return categories.value.findIndex((cat: { id: number }) => cat.id === id)
        }

        const openNew = () => {
          category.value = {};
          submitted.value = false;
          categoryDialog.value = true;
        };

        const hideDialog = () => {
          categoryDialog.value = false;
          submitted.value = false;
        };

        const saveCategory = () => {
          submitted.value = true;
          service.value.create(category.value)
            .then(() => {
              categories.value.push(category.value);
              toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Category was created successfully",
                life: 3000
              });
              // console.log(category.value)
              }).finally(() => {
                categoryDialog.value = false;
              });
        }

        const updateCategory = () => {
          submitted.value = true;
          service.value.put(category.value.id, category.value)
            .then(() => {
              toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Category was updated successfully",
                life: 3000
              });
            // console.log(category.value)
            }).finally(() => {
              categoryEditDialog.value = false;
            });
        }

        const editCategory = (cat: ArtisanCategory) => {
          category.value = cat;
          categoryEditDialog.value = true;
        };

        const confirmDeleteCategory = (cat: ArtisanCategory) => {
          category.value = cat;
          deleteCategoryDialog.value = true;
        };

        const confirmDeleteSelected = ()=>  {
          deleteCategoriesDialog.value = true;
        }

        const deleteCategory = () =>{
          isLoading.value = true
          service.value.delete(category.value.id)
            .then(() => {
              categories.value = categories.value.filter((val: { id: any }) => val.id !== category.value.id);
              deleteCategoryDialog.value = false;
              category.value = new ArtisanCategory({});
              // toast.add({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
              toast.add({ severity: 'success', summary: 'Successful', detail: 'Category deleted successfully', life: 3000 });
            }).catch(() => {
              toast.add({ severity: 'error', summary: 'Error', detail: 'Deleting failed', life: 3000 });
            }).finally(() => {
              isLoading.value = false
            })
        }
      
        const deleteSelectedCategories = ()=> {
            isLoading.value = true;
            // delete 
            selectedCategories.value.forEach(async (cat: { id: number }) => {
            await service.value.delete(cat.id);
            });
            categories.value = categories.value.filter((val: any) => !selectedCategories.value.includes(val));
            deleteCategoriesDialog.value = false;
            selectedCategories.value = [];
            isLoading.value = false;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
        }
        
        onMounted(() => {
           loadLazyData(),
           saveCategory(),
           openNew(),
           hideDialog()
        })
        
        return {
            dt, categories, categoryDialog, category, isLoading, deleteCategoryDialog,
            // selectedCategories, filters, submitted, deleteCategoriesDialog, deleteSelectedCategories,
            selectedCategories, submitted, deleteCategoriesDialog, deleteSelectedCategories,
            service,openNew, hideDialog, saveCategory, editCategory, findIndexById, updateCategory, categoryEditDialog, confirmDeleteCategory, confirmDeleteSelected, deleteCategory,
        }
    }
}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>