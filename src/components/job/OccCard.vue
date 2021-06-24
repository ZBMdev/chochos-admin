<template>
<div>
    <PageHeading
      title="All Users"
      :subtitle="`${totalRecords} users in total`" />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="userCat-dt"
          :value="userCat"
          v-model:selection="selectedUsers"
          dataKey="id"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['user_id','occupation','userType', 'address']"
          :paginator="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          :scrollable="true"
          :rowHover="true"
          responsiveLayout="scroll"
        >
          <template #header>
            <!--<div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>-->
          </template> <template #empty>
            No user found.
          </template>
          <template #loading>
            Loading users data. Please wait.
          </template>
          <Column
            field="fullName"
            style="min-width: 12rem"
            header="User ID"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 12rem"
            header="email"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
          
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Occupation from '@/models/Occupation';
import OccupationService from '@/services/OccupationService';
import { OccupationData } from '@/types/occupation'
import OccupationArtisan from '@/models/OccupationArtisan';
import OccupationArtisanService from '@/services/OccupationArtisanService';
import { OccupationArtisanData } from '@/types/occupationArtisan'
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
// import {FilterMatchMode} from 'primevue/api';

interface UserCategoryLazyParameters {
  page: number;
  limit: number;
  name: string;
  pageSize:   number;
  totalCount: number;
}


@Options<UserCatList>({
  components: { MainLayout, },
})

export default class UserCatList extends Vue {
  isLoading = false;
  totalRecords = 0;
  userCat: OccupationArtisan[] = [];
  datasource: OccupationArtisan[] = [];
  service: OccupationArtisanService = new OccupationArtisanService();
  selectedUsers: OccupationArtisan[] = [];
  // filters = {
  //   'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
  //   'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  // };
  // matchModeOptions =  [
  //   {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  // ]
  submitted = false;
  toast = useToast();
  lazyParams: Partial<UserCategoryLazyParameters> = {};
  firstRecordIndex = 0;
  // rowstoDisplay = 10;
  rowstoDisplay = 100000;

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
    // this.lazyParams = { page: 1, limit: this.rowstoDisplay }
    this.lazyParams = { page: 1, limit: 1000000 }
    this.loadLazyData();
  }
  
  loadLazyData() {
    this.isLoading = true;
    this.service.getAllPaginated(this.service.allOccupations)
      .then(data => {
        this.userCat = data.items.map((prod) => new OccupationArtisan(prod));
        this.totalRecords = data.totalCount;
        // this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        // this.rowstoDisplay = data.pageSize * 100000 ;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({
        severity: "error",
        summary: "There was an error fetching the artisans",
        detail: "Please check your internet connection and refresh the page"
      })
      console.log(e);
    });
  }

}
</script>

<style>

</style>