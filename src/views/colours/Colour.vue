<template>
  <div class="colours">
    <PageHeading title="Colours" />
    <ProgressSpinner v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          ref="dt"
          :value="colours"
          class="p-datatable-responsive  p-datatable-sm"
          v-model:selection="selectedColours"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          :rowHover="true"
          @row-click="editColour($event.data)"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} colours"
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
          <Column field="name" header="Hex" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Hex</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column field="name" header="Name2" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-mr-2"
                @click="editColour(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="confirmDeleteColour(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog v-model:visible="colourDialog" :style="{width: '450px'}" header="New Colour Details" :modal="true" class="p-fluid">
      <div class="p-field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="colour.name" required="true" autofocus :class="{'p-invalid': submitted && !colour.name}" />
        <small class="p-error" v-if="submitted && !colour.name">Name is required.</small>
      </div>
      <div class="p-field">
        <label for="hex">Hex</label>
        <Textarea id="hex" v-model="colour.hex" required="true" rows="3" cols="20" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveColour" loadingText="Saving" />
      </template>
    </Dialog>

    <Dialog v-model:visible="colourEditDialog" :style="{width: '450px'}" header="Colour Details" :modal="true" class="p-fluid">
      <div class="p-field">
        <label for="name">Name</label>
        <InputText id="name" v-model="colour.name" required="true" autofocus :class="{'p-invalid': submitted && !colour.name}" />
        <small class="p-error" v-if="submitted && !colour.name">Name is required.</small>
      </div>
      <div class="p-field">
        <label for="hex">Hex</label>
        <Textarea id="hex" v-model="colour.hex" required="true" rows="3" cols="20" />
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateColour" loadingText="Saving" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteColourDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="colour"
          >Are you sure you want to delete <b>{{ colour.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteColourDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteColour"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteColoursDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="colour"
          >Are you sure you want to delete the selected colour?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteColourDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedColours"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Colour from '@/models/Colour';
import { NewColourData, ColourData } from '@/types/colour'
import ColourService from '@/views/colours/ColourService';
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import ColourCreate from "@/views/users/ColourCreate.vue";
import qs from 'qs';

interface ColourLazyParameters {
    currentPage:  number;
    totalCounts:  number;
    totalPages:   number;
    page: number;
  limit: number;
  name: string;
  pageSize:   number;
  totalCount: number;
}

export default class Colours extends Vue {
  isLoading = false;
  // colours= [] as ColourData[];
  // service= new ColourService();
  colours: Colour[] = [];
  colour!: Colour;
  datasource: Colour[] = [];
  newColour = {} as NewColourData;
  totalRecords = 0;
  service: ColourService = new ColourService();
  selectedColours: Colour[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  submitted = false;
  toast = useToast();
  lazyParams: Partial<ColourLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  colourDialog = false;
  deleteColourDialog = false;
  deleteColoursDialog = false;
  colourEditDialog = false;

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
    this.service.getAllColours(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.colours = data.data.map((col) => new Colour(col));
        this.totalRecords = data.pagination.totalCounts;
        //this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        // this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the colours", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }
  
    findIndexById (id: number) {
        return this.colours.findIndex((col: { id: number }) => col.id === id)
    }

    openNew() {
        // this.colour = {};
        this.submitted= false;
        this.colourDialog = true;
    }

    hideDialog() {
        this.colourDialog = false;
        this.submitted = false;
    }

    saveColour() {
        this.submitted = true;
        this.service.create(this.colour)
            .then(() => {
              this.colours.push(this.colour);
              this.toast.add({
                severity: "success",
                summary: "Successful",
                detail: "colour was created successfully",
                life: 3000
              });
              console.log(this.colour)
            }).finally(() => {
               this.colourDialog = false;
            });
    }

    updateColour() {
        this.submitted = true;
        this.service.put(this.colour.id, this.colour)
            .then(() => {
              this.toast.add({
                severity: "success",
                summary: "Successful",
                detail: "colour was updated successfully",
                life: 3000
              });
            console.log(this.colour)
            }).finally(() => {
              this.colourEditDialog = false;
            });
    }

    editColour = (col: Colour) => {
        this.colour = col;
        this.colourEditDialog = true;
    };

    confirmDeleteColour = (col: Colour) => {
        this.colour = col;
        this.deleteColourDialog = true;
    };

    confirmDeleteSelected = ()=>  {
        this.deleteColoursDialog = true;
    }

    deleteColour = () =>{
        this.isLoading = true
        this.service.delete(this.colour.id)
            .then(() => {
              this.colours = this.colours.filter((val: { id: any }) => val.id !== this.colour.id);
              this.deleteColourDialog = false;
              this.colour = new Colour({});
              this.toast.add({ severity: 'success', summary: 'Successful', detail: 'colour deleted successfully', life: 3000 });
            }).catch(() => {
              this.toast.add({ severity: 'error', summary: 'Error', detail: 'Deleting failed', life: 3000 });
            }).finally(() => {
              this.isLoading = false
            })
        }
      
        deleteSelectedColours = ()=> {
            this.isLoading = true;
            // delete 
            this.selectedColours.forEach(async (cat: { id: number }) => {
            await this.service.delete(cat.id);
            });
            this.colours = this.colours.filter((val: any) => !this.selectedColours.includes(val));
            this.deleteColoursDialog = false;
            this.selectedColours = [];
            this.isLoading = false;
            this.toast.add({ severity: 'success', summary: 'Successful', detail: 'colours Deleted', life: 3000 });
        }
        
}
</script>

<style>

</style>