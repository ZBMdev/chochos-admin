<template>
  Artisan Card
      <Card>
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
                  @click="openNew"
                />
              </div>
              <!-- 
          @row-click="openArtisan($event.data.id)"
              @row-click="openArtisan($event.data)"-->
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

          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false">
            <!--<template #body="slotProps">
              <Button
                @click="$router.push('/artisans/' + slotProps.data.id)"
              />
            </template>-->
          </Column>
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
          <!--<Column
            field="userCategoryRecord.occupationNmae"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Job Name"
            sortable
            filterMatchMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.jobName }}
            </template>
          </Column>-->
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

    <div>
      <Dialog
      v-model:visible="categoryDialog"
      :style="{ width: '450px' }"
      header="Artisan Details"
      :modal="true"
      class="p-fluid"
    >
        <div class="p-field p-fluid">
          <label>
           Job
          </label>
          <InputText
            v-model="artisan.userCategoryRecord.occupationName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           About
          </label>
          <InputText
            v-model="artisan.userCategoryRecord.about"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           Firstname
          </label>
          <InputText
            v-model="artisan.firstName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           Lastname
          </label>
          <InputText
            v-model="artisan.lastName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="artisan.email"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="artisan.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Address
          </label>
          <InputText
            v-model="artisan.address"
          >
          </InputText>
        </div>
    </Dialog>
    </div>

    <div>
      <div :value="artisan">
        <div class="p-field p-fluid">
          <label>
           Job
          </label>
          <InputText
            v-model="slotProps.data.userCategoryRecord.occupationName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           About
          </label>
          <InputText
            v-model="artisan.userCategoryRecord.about"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           Firstname
          </label>
          <InputText
            v-model="artisan.firstName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
           Lastname
          </label>
          <InputText
            v-model="artisan.lastName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="artisan.email"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="artisan.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Address
          </label>
          <InputText
            v-model="artisan.address"
          >
          </InputText>
        </div>
    </div>
    </div>

</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Artisan from '@/models/Artisan';
import { ArtisanRegisterParams, ArtisanData } from '@/types/artisan';
import ArtisanService from '@/services/ArtisanService';
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import ArtisanCreate from "@/views/users/ArtisanCreate.vue";
import qs from 'qs';

interface ArtisanLazyParameters {
  page: number;
  limit: number;
  name: string;
  pageSize:   number;
  totalCount: number;
}

@Options({
  components: { MainLayout, ArtisanCreate},
}) 

export default class Artisans extends Vue {
  isLoading = false;
  artisans: Artisan[] = [];
  artisan!: Artisan;
  datasource: Artisan[] = [];
  newArtisan = {} as ArtisanRegisterParams;
  // artCat = {};
  // artCat = {} as ArtisanRegisterParams.userCategories;
  artisanDialog = false;
  categoryDialog = false;
  newArtisanDialog = false;
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  // userCat: 
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
  userCat = [
    {name: 'Artisan', code: 1},
  ]

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
    // this.artCat = 1
    this.isLoading = true
    this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.loadLazyData();
  }
  
  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(this.service.allArtisans)
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
}
</script>

<style>

</style>