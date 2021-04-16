<!--<template>
  <div>
    <PageHeading
      title="Artisans"
      :subtitle="`${totalRecords} artisans in total`" />
    <ProgressSpinner style="display:flex; justify-content: center" v-if="isLoading" />
    <Card v-else>
      <template #content>
        <DataTable
          class="p-datatable-responsive p-datatable-sm"
          ref="artisan-dt"
          :value="artisans"
          v-model:selection="selectedArtisans"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artisans"
          :scrollable="true"
          responsiveLayout="scroll"
          :rowHover="true"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global']"
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
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['name']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column
            field="username"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['username']"
                class="p-column-filter"
                placeholder="Search by username"
              />
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['email']"
                class="p-column-filter"
                placeholder="Search by email"
              />
            </template>
          </Column>
          <Column
            field="about"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="About"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span
                v-html="`${slotProps.data.about.substr(0, 15)}...`"
              ></span>
            </template>
          </Column>
          <Column
            field="last_login"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Last active"
            sortField="last_login_date"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.lastLogin }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['last_login']"
                class="p-column-filter"
                placeholder="Search by last active"
              />
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
            :sortable="true"
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
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.address}}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['address']"
                class="p-column-filter"
                placeholder="Search by address"
              />
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
import Artisan from '@/models/Artisan';
import ArtisanService from '@/services/ArtisanService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface ArtisanLazyParameters {
  page: number;
  limit: number;
  name: string;
}

@Options({
  components: { MainLayout, },
}) 

export default class Artisans extends Vue {
  isLoading = false;
  artisans: Artisan[] = [];
  datasource: Artisan[] = [];
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  selectedArtisans: Artisan[] = [];
  filters: Record<string, unknown> = {};
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

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>
-->

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
          :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50, 100, 200]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <template #header>
            <div class="table-header p-d-flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global']"
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
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.fullName }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['name']"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column
            field="username"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Username"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['username']"
                class="p-column-filter"
                placeholder="Search by username"
              />
            </template>
          </Column>
          <Column
            field="email"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="Email"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['email']"
                class="p-column-filter"
                placeholder="Search by email"
              />
            </template>
          </Column>
          <Column
            field="about"
            style="min-width: 14rem"
            headerStyle="min-width: 14rem"
            header="About"
            :sortable="true"
            filterMode="contains"
          >
            <template #body="slotProps">
              <span
                v-html="`${slotProps.data.about.substr(0, 15)}...`"
              ></span>
            </template>
          </Column>
          <Column
            field="last_login"
            style="min-width: 10rem"
            headerStyle="min-width: 10rem"
            header="Last active"
            sortField="last_login_date"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.lastLogin }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['last_login']"
                class="p-column-filter"
                placeholder="Search by last active"
              />
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
            :sortable="true"
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
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.address}}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['address']"
                class="p-column-filter"
                placeholder="Search by address"
              />
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
import Artisan from '@/models/Artisan';
import ArtisanService from '@/services/ArtisanService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
// import { toast } from '@/utils/helper';

interface ArtisanLazyParameters {
  page: number;
  limit: number;
  name: string;
}

@Options({
  components: { MainLayout, },
}) 

export default class Artisans extends Vue {
  isLoading = false;
  artisans: Artisan[] = [];
  datasource: Artisan[] = [];
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  selectedArtisans: Artisan[] = [];
  filters: Record<string, unknown> = {};
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

}
</script>


<style scoped>
.filter-by {
  min-width: 300px;
}
</style>
