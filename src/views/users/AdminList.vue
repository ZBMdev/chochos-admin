<template>
  <div class="admin-list">
    <PageHeading title="All Admins" subtitle="A list of all Admins" />
    <ProgressSpinner v-if="loading" />

    <Card v-else>
      <template #content>
        <DataTable
          dataKey="id"
          class="p-datatable-responsive"
          :value="products"
          :paginator="true"
          :rows="25"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rowsPerPageOptions="[25, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          :lazy="true"
          :totalRecords="totalRecords"
          :loading="loading"
          @page="onPage($event)"
        >
          <template #header>
            <div class="table-header">
              Administrators
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filterValue"
                  placeholder="Search admin"
                  @input="filterAdmins"
                />
              </span>
            </div>
          </template>
          <template #empty>
            No Admin found.
          </template>
          <template #loading>
            Loading Admin data. Please wait.
          </template>
          <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <span class="p-column-title">Image</span>
              <img
                :src="'https://picsum.photos/300/220'"
                :alt="slotProps.data.name"
                class="admin-image"
              />
            </template>
          </Column>
          
         
          <Column :exportable="false">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success p-mr-2"
                @click="$router.push('/admin/' + slotProps.data.id)"
              />
              <!-- hash <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteProduct(slotProps.data)"
          /> -->
          </template>
          </Column>
          <template #footer>
            In total there are {{ admins ? admins.length : 0 }} admins.
          </template>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Admin from '@/models/Admin'
import Paginator from 'primevue/paginator';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import AdminService from '@/services/AdminService';
//import { StockStatus } from '@/types/product';

@Options<AdminList>({
  components: { Paginator, ColumnGroup },
})
export default class AdminList extends Vue {
  admins: Admin[] = [];
  selectedAdmins: Admin[] = [];
  filterValue = '';
  loading = false;
  totalRecords = 0;
  datasource: Admin[] = [];
  adminService: AdminService = new AdminService();
  //statuses = [StockStatus.INSTOCK, StockStatus.LOWSTOCK, StockStatus.OUTOFSTOCK];

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
    this.loading = true;
    this.adminService.getAll().then(data => {
      this.datasource = data ? data.map((prod) => new Admin(prod)) : [];
      this.totalRecords = data ? data.length : 0;
      this.admins = this.datasource.slice(0, 10);
      this.loading = false;
    }).catch((e) => {
      console.log(e);
    });
  }

  // eslint-disable-next-line
  onPage(event: any) {
    //event.page: New page number
    //event.first: Index of first record
    //event.rows: Number of rows to display in new page
    //event.pageCount: Total number of pages
    this.loading = true;

    setTimeout(() => {
      this.admins = this.datasource.slice(event.first, event.first + event.rows);
      this.loading = false;
    }, 100);
  }

  //formatCurrency(value: number) {
    //return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  //}

  /**
   *  filter event is not triggered in lazy mode instead use the event you prefer on your 
   * form elements such as input, change, blur to make a remote call by passing the filters 
   * property to update the displayed data. 
   */
  // eslint-disable-next-line
  filterAdmins(event: any) {
    this.loading = true;
    if (event.target.value) {
      this.admins = this.datasource.filter((admin) => {
        return admin.name.toLowerCase().includes(event.target.value.toLowerCase());
      })
    } else {
      this.admins = this.datasource.slice(0, 10);
    }
    this.loading = false;
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
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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


<!--
<template>
  <v-container>
    <h1>Video List</h1>
    <v-btn text to="/admin/video/new">Add Video</v-btn>

    <div class="flex-table">
      <div>Name</div>
      <div>Description</div>
      <div>Actions</div>
    </div>
    <div v-for="video in videos" :key="video.id" class="flex-table">
      <div>{{ video.name }}</div>
      <div>{{ video.description | abbreviate }}</div>
      <div class="actions">
        <router-link :to="{ name: 'video-watch', params: {id: video.id }}">Watch</router-link> 
        <router-link :to="{ name: 'admin-video-show', params: {id: video.id}}">Show</router-link>
        <router-link :to="{ name: 'admin-video-edit', params: {id: video.id}}">Edit</router-link>
        <v-btn x-small @click="deleteVideo(video)">Delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        videos: state => state.videos.videos
      })
    },
    filters: {
      abbreviate(text) {
        if(text){
          text = text.replace('<p>', '');
          return text.slice(0, 50);
        }
      }
    },
    methods: {
      deleteVideo(video) {
        let response = confirm(`Are you sure you want to delete ${video.name}`)
        if(response){
          this.$store.dispatch('videos/delete', video);
          this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully deleted your video, ${video.name}.`});
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33%);
    padding: 10px;
    border-bottom: 1px black solid;
    &:nth-of-type(2n) {
      background-color: #dedede;
    }
    .actions {
      * {
        padding-right: 15px
      }
    }
  }
</style>-->