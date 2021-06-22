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
            field="user_id"
            style="min-width: 12rem"
            header="User ID"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.user_id }}
            </template>
          </Column>
          <Column
            field="occupation"
            style="min-width: 12rem"
            header="Occupation"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.occupation }}
            </template>
          </Column>
          <Column
            field="userCategory"
            style="min-width: 12rem"
            header="Category"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              <span
                :class="
                  'product-badge status-' +
                    slotProps.data.userType
                "
              >{{ slotProps.data.userType }}
              </span>
            </template>
          </Column>
          <Column
            field="address"
            style="min-width: 12rem"
            header="Address"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.address }}
            </template>
          </Column>
          <Column
            field="about"
            style="min-width: 12rem"
            header="About"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.about }}
              <!--<span
                v-html="`${ slotProps.data.about.substr(0, 20)}...`"
              >
              </span>-->
            </template>
          </Column>
          <Column
            field="isActive"
            style="min-width: 10rem"
            header="Status"
            sortField="isActive"
            :sortable="true"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.isActive" class="item-activated">
                active
              </span>
              <span v-else class="item-deactivated"> inactive </span>
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
import UserCategory from '@/models/UserCategory';
import UserCategoryService from '@/services/UserCategoryService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { UserCategoryData } from '@/types/customer';
// import {FilterMatchMode} from 'primevue/api';

interface UserCategoryLazyParameters {
  page: number;
  limit: number;
  name: string;
  pageSize:   number;
  items:      UserCategoryData[];
  totalCount: number;
}


@Options<UserCatList>({
  components: { MainLayout, },
})

export default class UserCatList extends Vue {
  isLoading = false;
  totalRecords = 0;
  userCat: UserCategory[] = [];
  datasource: UserCategory[] = [];
  service: UserCategoryService = new UserCategoryService();
  selectedUsers: UserCategory[] = [];
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
    this.service.getAllPaginated(this.service.allUsersCategory)
      .then(data => {
        this.userCat = data.items.map((prod) => new UserCategory(prod));
        this.totalRecords = data.totalCount;
        // this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        // this.rowstoDisplay = data.pageSize * 100000 ;
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({
        severity: "error",
        summary: "There was an error fetching the customers",
        detail: "Please check your internet connection and refresh the page"
      })
      console.log(e);
    });
  }

}
</script>

<style>

</style>