<template>
  <div>
    <PageHeading
      title="All Skills"
    />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive p-datatable-sm"
          :value="categories"
          :paginator="true"
          :rows="10"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20,50, 100, 200]"
          :first="firstRecordIndex"
          responsiveLayout="scroll"
          :scrollable="true"
          :rowHover="true"
          
        >
          <template #header>
            <div class="table-header p-d-flex">
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
            headerStyle="width: 250px"
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
            header="Description"
            filterField="description"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Description</span>
              {{ slotProps.data.description }}
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
                class="p-button-raised p-button-danger p-ml-2"
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
      header="Skills Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">Name</label>
          <InputText
            id="name"
            v-model="category.name"
            required="true"
            autofocus
          />
          <small class="p-error" v-if="submitted && !category.name">Name is required.</small>
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
        
        <div class="p-d-flex p-field">
          <LButton
            icon="pi pi-save"
            :loading="isSubmitting"
            @click="saveCategory"
            label="Save"
            loadingText="Saving"
          />
        </div>
      </div>
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
          >Are you sure you want to delete the selected skill category?</span
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
import Skills from '@/models/Skills'
import Rating from 'primevue/rating';
import SkillsService from '@/services/SkillsService';
import { SkillsData, CreateSkillsParam } from '@/types/skills'
import SkillsEdit from "@/components/category/SkillsEdit.vue";
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';

export default{
    setup() {   
        const toast = useToast();
        const dt = ref();
        const isLoading = ref(false);
        const categories = ref();
        const categoryDialog = ref(false);
        const deleteCategoryDialog = ref(false);
        const deleteCategoriesDialog = ref(false);
        const category = ref();
        const service = ref(new SkillsService());
        const selectedCategories = ref();
        const filters = ref({
          'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });
        const submitted = ref(false);
        const lazyParams = ref({});
        const totalRecords = ref(0);
        const firstRecordIndex = ref(0);
        const rowstoDisplay = ref(10);
        const categoryEditDialog = ref(false);

        const loadLazyData = () => {
          isLoading.value = true;
          service.value.getAll(`${qs.stringify(lazyParams.value)}`)
            .then(data => {
              categories.value = data.map((prod) => new Skills(prod));
              isLoading.value = false;
            }).catch((e) => {
            toast.add({ severity: "error", summary: "There was an error fetching skills", detail: "Please check your internet connection and refresh the page" })
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
          
          console.log(category.value)
          
          service.value.create(category.value)
            .then(() => {
              categories.value.push(category.value);
              toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Skill was created successfully",
                life: 3000
              });
              console.log(category.value)
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
                detail: "Skill was updated successfully",
                life: 3000
              });
            // console.log(category.value)
            }).finally(() => {
              categoryEditDialog.value = false;
            });
        }

        const editCategory = (cat: Skills) => {
          category.value = cat;
          categoryEditDialog.value = true;
        };

        const confirmDeleteCategory = (cat: Skills) => {
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
              category.value = new Skills({});
              toast.add({ severity: 'success', summary: 'Successful', detail: 'Skill deleted successfully', life: 3000 });
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
            selectedCategories, filters, submitted, deleteCategoriesDialog, deleteSelectedCategories,
            service,openNew, hideDialog, saveCategory, editCategory, findIndexById, updateCategory, categoryEditDialog,
            confirmDeleteCategory, confirmDeleteSelected, deleteCategory,
        }
    }
}
</script>

<style>

</style>