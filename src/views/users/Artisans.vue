<template>
  <div>
    <PageHeading
      title="Artisans"
      :subtitle="`${totalRecords} artisans in total`" />
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
            <div class="table-header p-d-flex">
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

    <Dialog
      v-model:visible="artisanDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '50vw'}"
      header="Artisan Details"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              v-if="artisan.photoUrl === '' || artisan.photoUrl === null " 
              icon="pi pi-user"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <Avatar 
              v-else-if="artisan.fullName"
              :label="artisan.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img v-else
              :src="artisan.photoUrl"
              :alt="artisan.photoUrl"
              style="width:8rem;height:8rem;font-size:4rem;"
            />
          </div>
        <div class="p-field p-fluid">
          <label>
            Name
          </label>
          <InputText
            v-model="artisan.fullName"
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
            Email
          </label>
          <InputText
            v-model="artisan.email"
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
        <div class="p-field p-fluid">
          <label>
            About
          </label>
          <InputText
            v-model="artisan.about"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Mobile
          </label>
          <InputText
            v-model="artisan.mobile"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Languages
          </label>
          <InputText
            v-model="artisan.languages"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Reviews
          </label>
          <Rating
            :modelValue="artisan.rating"
            :readonly="true"
            :cancel="false"
            :stars="5"
          />
        </div>
        <div class="p-field p-fluid">
          <label>
            Last Login
          </label>
          <InputText
            v-model="artisan.lastLogin"
          >
          </InputText>
        </div>
      </div>      
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Artisan from '@/models/Artisan';
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

  openArtisan(artisan: Artisan) {
    this.artisan = artisan;
    this.artisanDialog = true;
  }

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>
