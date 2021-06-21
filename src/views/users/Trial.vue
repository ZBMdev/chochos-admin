<!--<template>
    <div>
        <div class="card">
            <Toolbar class="p-mb-4">
                <template #left>
                    <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #right>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="categories" v-model:selection="selectedCategories" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
						<h5 class="p-mb-2 p-m-md-0 p-as-md-center">Manage Products</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>
                
                <Column field="name" header="Name" :sortable="true" style="min-width:16rem"></Column>
                <Column field="description" header="Description" :sortable="true" style="min-width:16rem"></Column>
                <Column field="created_on" header="Created On" :sortable="true" style="min-width:10rem"></Column>
                <Column :exportable="false">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-raised p-button-success p-mr-2" @click="editCategory(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-raised p-button-danger" @click="confirmDeleteCategory(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="categoryDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
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

        <Dialog v-model:visible="deleteCategoryDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="category">Are you sure you want to delete <b>{{category.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCategoryDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCategory" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteCategoriesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected category?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCategoriesDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedCategories" />
            </template>
        </Dialog>
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import ArtisanCategory from '@/models/ArtisanCategory';
import ArtisanCategoryService from '@/services/ArtisanCategoryService';
import { ArtisanCategoryData } from '@/types/artisanCategory'
import ArtisanEdit from "@/components/category/ArtisanEdit.vue";
import { useToast } from 'primevue/usetoast';
import qs from 'qs';

export default {
    data() {
        return {
            categories: null,
            categoryDialog: false,
            deleteCategoryDialog: false,
            deleteCategoriesDialog: false,
            category: {},
            selectedCategories: null,
            filters: {},
            submitted: false,
            lazyParams: {},
            service: ArtisanCategoryService = new ArtisanCategoryService()
        }
    },
    categoryService: null,
    created() {
        this.categoryService = new ArtisanCategoryService();
        this.initFilters();
    },
    mounted() {
        // this.categoryService.then(data => this.categories = data);
        this.categoryService.getCategories().then(data => this.categories = data.items.map((cat) => new ArtisanCategory(cat)));
    },
    methods: {
        getCategories() {
          this.loadLazyData();
        },

        loadLazyData() {
           // this.isLoading = true;
            this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
            .then(data => {
                this.categories = data.items.map((prod) => new ArtisanCategory(prod));
                this.totalRecords = data.totalCount;
                this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
                this.rowstoDisplay = data.pageSize;
                this.isLoading = false;
            }).catch((e) => {
            this.toast.add({ severity: "error", summary: "There was an error fetching the artisans", detail: "Please check your internet connection and refresh the page" })
            console.log(e);
            });
        }, 
        openNew() {
            this.category = {};
            this.submitted = false;
            this.categoryDialog = true;
        },
        hideDialog() {
            this.categoryDialog = false;
            this.submitted = false;
        },
        saveCategory() {
            this.submitted = true;

			if (this.category.name.trim()) {
                if (this.category.id) {
                    this.categories[this.findIndexById(this.category.id)] = this.category;
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'C`ategory Updated', life: 3000});
                }
                else {
                    this.category.id = this.createId();
                    this.category.code = this.createId();
                    this.categories.push(this.category);
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Category Created', life: 3000});
                }

                this.categoryDialog = false;
                this.category = {};
            }
        },
        editCategory(category) {
            this.category = {...category};
            this.categoryDialog = true;
        },
        confirmDeleteCategory(category) {
            this.category = category;
            this.deleteCategoryDialog = true;
        },
        deleteCategory() {
            this.categories = this.categories.filter(val => val.id !== this.category.id);
            this.deleteCategoryDialog = false;
            this.category = {};
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Category Deleted', life: 3000});
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = '';
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( let i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteCategoriesDialog = true;
        },
        deleteSelectedCategories() {
            this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
            this.deleteCategoriesDialog = false;
            this.selectedCategories = null;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000});
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>
-->