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
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
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
              <!--<span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>-->
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
    
    <Dialog v-model:visible="categoryDialog" :style="{width: '450px'}" header="New Category Details" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="category.name" required="true" autofocus :class="{'p-invalid': submitted && !category.name}" />
                <small class="p-error" v-if="submitted && !category.name">Name is required.</small>
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
import { ref, onMounted } from 'vue';
import { Options, Vue } from 'vue-class-component';
import Category from '@/models/Category'
import CategoryService from '@/services/CategoryService';
import { CategoryData } from '@/types/category'
import { useToast } from 'primevue/usetoast';
import BombsightService from '@/services/BombsightService';
import CategoryEdit from "@/components/products/CategoryEdit.vue";
import qs from 'qs';
// import {FilterMatchMode} from 'primevue/api';


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
        const service = ref(new CategoryService());
        const selectedCategories = ref();
        // const filters = ref({
        //     'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        // });
        const submitted = ref(false);
        const lazyParams = ref({});
        const totalRecords = ref(0);
        const firstRecordIndex = ref(0);
        const rowstoDisplay = ref(10);
        const categoryEditDialog = ref(false);

        const loadLazyData = () => {
            isLoading.value = true;
            service.value.getAllPaginated(service.value.allCategories)
            .then(data => {
                categories.value = data.items.map((prod) => new Category(prod));
                totalRecords.value = data.totalCount;
                firstRecordIndex.value = data.page > 1 ? data.pageSize * data.page - 1 : 0;
                rowstoDisplay.value = data.pageSize;
                isLoading.value = false;
            }).catch((e) => {
            toast.add({ severity: "error", summary: "There was an error fetching the products categories", detail: "Please check your internet connection and refresh the page" })
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
                  detail: "Product Category was created successfully",
                  life: 3000
                });
              }).finally(() => {
                categoryDialog.value = false;
              });
        }

        const updateCategory = () => {
            submitted.value = true;
            service.value.update(category.value.id, category.value)
              .then(() => {
                toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Product Category was updated successfully",
                  life: 3000
                });
                  //console.log(category.value)
              }).finally(() => {
                  categoryEditDialog.value = false;
                });
        }

        const editCategory = (cat: Category) => {
            category.value = cat;
            categoryEditDialog.value = true;
        };

        const confirmDeleteCategory = (cat: Category) => {
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
                category.value = new Category({});
                toast.add({ severity: 'success', summary: 'Successful', detail:'Product Category deleted' , life: 3000 });
            }).catch(() => {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Deleting Failed failed', life: 3000 });
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
           // service.value.getAllCategories().then(data => categories.value = data.map((cat) => new ArtisanCategory(cat)));
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
