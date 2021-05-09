<template>
  <div>
    <PageHeading
      title="Artisans"/>
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          :value="artisans"
          :paginator="true"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['fullName','username','email','address', 'languages']"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20,50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :scrollable="true"
          :rowHover="true"
          responsiveLayout="scroll"
          @row-click="openArtisan($event.data)"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              <div class="p-mb-2 p-m-md-0 p-as-md-center">
                <Button
                  label="New"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="openArtisan"
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
          <template #empty>
            No artisan found.
          </template>
          <template #loading>
            Loading artisans data. Please wait.
          </template>
          <Column field="name" headerStyle="width: 3rem;">
            <template #body="slotProps">
              <Avatar
                :label="slotProps.data.name.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029"
                shape="circle"
              />
            </template>
          </Column>
          <Column
            field="name"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Name"
            sortable
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
          </Column>
          <Column
            field="username"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Username"
            sortable
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Email"
            sortable
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
          <Column
            field="about"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="About"
            sortable
            filterMode="contains"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.about != null" v-html="`${slotProps.data.about?.substr(0, 15)}...`"
              ></span>
            </template>
          </Column>
          <Column
            field="last_login"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Last active"
            sortField="last_login_date"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.lastLogin }}
            </template>
          </Column>
          <Column
            field="rating"
            header="Reviews"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            filterField="rating"
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Reviews</span>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              />
            </template>
          </Column>
          <Column
            field="languages"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Languages"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.languages }}
            </template>
          </Column>
          <Column
            field="address"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Address"
            sortable
          >
            <template #body="slotProps">
              {{ slotProps.data.address}}
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- <Dialog
      v-model:visible="newArtisanDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '50vw'}"
      header="New Artisan"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div class="card">
          <Steps :model="items" :readonly="true" />
        </div>

        <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </Dialog> -->
    
    <Dialog
      v-model:visible="artisanDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '50vw'}"
      header="Artisan Details"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div class="p-field p-fluid">
          <label>
           Firstname
          </label>
          <InputText
            v-model="newArtisan.firstName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           Lastname
          </label>
          <InputText
            v-model="newArtisan.lastName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="newArtisan.email"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="newArtisan.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Address
          </label>
          <InputText
            v-model="newArtisan.address"
          >
          </InputText>
        </div>
      </div> 
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveArtisan" />
      </template>     
    </Dialog>
  </div> 
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Artisan from '@/models/Artisan';
import { ArtisanRegisterParams} from '@/types/artisan'
import ArtisanService from '@/services/ArtisanService';
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface ArtisanLazyParameters {
  page: number;
  limit: number;
  name: string;
  pageSize:   number;
  totalCount: number;
}

@Options({
  components: { MainLayout, },
}) 

export default class Artisans extends Vue {
  isLoading = false;
  artisans: Artisan[] = [];
  artisan!: Artisan;
  datasource: Artisan[] = [];
  newArtisan = {} as ArtisanRegisterParams;
  artisanDialog = false;
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  selectedArtisans: Artisan[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  submitted = false;
  toast = useToast();
  lazyParams: Partial<ArtisanLazyParameters> = {};
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
    this.isLoading = true
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }
  
  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.artisans = data.items.map((prod) => new Artisan(prod));
        this.totalRecords = data.totalCount;
        this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pageSize;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the artisans", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }

  /* openArtisan(artisan: Artisan) {
    this.artisan = artisan;
    this.artisanDialog = true;
  } */

  openArtisan(artisan: Artisan) {
    this.artisan = artisan;
    this.artisanDialog = true;
  }

  hideDialog() {
    this.artisanDialog = false;
    this.submitted = false;
  }

  saveArtisan() {
    this.submitted = true;
    console.log(this.newArtisan)
    /* this.service.create(this.newArtisan)
      .then((newArtisan) => {
      this.toast.add({
        severity:'success',
        summary: 'Successful',
        detail: 'Artisan Created',
        life: 3000
      });
      this.$emit("Artisan created", newArtisan);
    }).finally(() => {
      this.artisanDialog = false;
    }); */
  }
}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}

::v-deep(b) {
    display: block;
}

::v-deep(.p-card-body) {
    padding: 2rem;
}
</style>
