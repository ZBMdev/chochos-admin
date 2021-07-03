<template>
  <div>
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="user-dt"
          :value="users"
          v-model:selection="selectedUsers"
          dataKey="id"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['name','email', 'languages', 'address']"
          :paginator="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vendors"
          :scrollable="true"
          :rowHover="true"
          responsiveLayout="scroll"
          @row-click="openUser($event.data)"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template> <template #empty>
            No user found.
          </template>
          <template #loading>
            Loading users data. Please wait.
          </template>
          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          >
          </Column>
          <Column
            field="username"
            style="min-width: 12rem"
            header="Name"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 12rem"
            header="User"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.mainDate }}
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 12rem"
            header="Date"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.mainDate }}
            </template>
          </Column>
          <Column
            field="flagged"
            style="min-width: 12rem"
            header="Flagged"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.flagged }}
            </template>
          </Column>
          <Column
            field="status"
            style="min-width: 12rem"
            header="Status"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.status }}
            </template>
          </Column>
          <Column
            field="action"
            style="min-width: 12rem"
            header="Action"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.action }}
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
import Users from '@/models/User';
import UserService from '@/views/users/UserService';
import { UserData } from '@/types/users'
// import UserBox from "@/components/users/UserBox.vue";
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';
import qs from 'qs';
import Dialog from 'primevue/dialog';
// import { toast } from '@/utils/helper';

interface UserLazyParameters {
  page: number;
  limit: number;
  name: string;
}

@Options({
  components: { MainLayout, Dialog },
})
export default class Vendors extends Vue {
  isLoading = false;
  users: Users[] = [];
  user!: Users;
  datasource: Users[] = [];
  userDialog = false;
  totalRecords = 0;
  service: UserService = new UserService();
  selectedUsers: Users[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  submitted = false;
  toast = useToast();
  lazyParams: Partial<UserLazyParameters> = {};
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
  
  /* loadLazyData() {
    this.isLoading = true;
    this.service.getAllColours(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.users = data.data.map((prod) => new Users(prod));
        this.totalRecords = data.pagination.totalCounts
        // this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        this.rowstoDisplay = data.pagination.totalPages
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the all users", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  } */

  loadLazyData() {
    this.isLoading = true;
    this.service.getAllUsers(`${qs.stringify(this.lazyParams)}`)
      .then(data => {
        this.users = data.data.map((prod) => new Users(prod))
        // this.users = data
        // this.totalRecords = data
        // this.firstRecordIndex = data.page > 1 ? data.pageSize * data.page - 1 : 0;
        // this.rowstoDisplay = data.pagination.totalPages
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the all users", detail: "Please check your internet connection and refresh the page" })
      console.log(e);
    });
  }

  openUser(user: Users) {
    this.user = user;
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    return this.users.findIndex((ven) => ven.id === id)
  }

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>