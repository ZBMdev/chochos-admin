<template>
  <div class="adminList">
    <PageHeading title="Administrators" />

    <Card>
      <template #content>
        <DataTable
          class="p-datatable-sm"
          dataKey="id"
          :value="admins"
          :loading="loading"
          :rows="10"
          v-model:filters="filters"
          filterDisplay="row" 
          :globalFilterFields="['firstName','lastName','username','email', 'languages', 'address']"
          :paginator="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10,20, 50, 100, 200]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} admins"
          :scrollable="true"
          :rowHover="true"
          responsiveLayout="scroll"
        >
          <template #header>
            <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
              <div class="p-mb-2 p-m-md-0 p-as-md-center">
                <Button
                  label="New Admin"
                  icon="pi pi-plus"
                  class="p-button-success p-mr-2"
                  @click="displayCreateForm = true"
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
          </template> <template #empty>
            No admin found.
          </template>
          <template #loading>
            Loading admins data. Please wait.
          </template>
          <Column headerStyle="width: 3rem; height: 50px; font-weight: bold;">
            <template #body={data}>
              <Avatar
                :label="`${data.firstName.charAt(0).toUpperCase()}${data.lastName.charAt(0).toUpperCase()}`"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029"
                shape="circle"
              />
            </template>
          </Column>
          
          <Column
            field="firstName"
            header="First Name"
            style="min-width: 250px"
            headerStyle="height: 50px; font-weight: bold;"
            :sortable="true"
            filterMode="contains"
          ></Column>
          <Column
            field="lastName"
            header="Surname"
            style="min-width: 250px"
            headerStyle="height: 50px; font-weight: bold;"
            :sortable="true"
            filterMode="contains"
          ></Column>
          <Column
            field="email"
            header="Email"
            style="min-width: 250px"
            headerStyle="height: 50px; font-weight: bold;"
            :sortable="true"
            filterMode="contains"
          ></Column>
          <Column
            field="username"
            header="Username"
            style="min-width: 150px"
            headerStyle="height: 50px; font-weight: bold;"
            :sortable="true"
            filterMode="contains"
          ></Column>
          <Column headerStyle="width: 100px;height: 50px; font-weight: bold;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-raised p-button-success p-mr-2"
                @click="$router.push('/admins/' + slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      :modal="true"
      v-model:visible="displayCreateForm"
      class="p-fluid p-dialog-sm"
      :style="{ width: '450px' }"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
    >
      <template #header>
        <h3>Admin Details</h3>
      </template>
      <div>
        <div class="p-field p-fluid">
          <label>
            First Name
          </label>
          <InputText
            v-model="newAdmin.firstName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Last Name
          </label>
          <InputText
            v-model="newAdmin.lastName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="newAdmin.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Password
          </label>
          <Password
            v-model="newAdmin.password"
            toggleMask
            :feedback="false"
            placeholder="*******"
          >
          </Password>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="newAdmin.email"
          >
          </InputText>
        </div>
        <Button @click="createAdmin" label="Submit"></Button>
      </div>      
    </Dialog>

    <Dialog
      :modal="true"
      v-model:visible="editDialog"
      class="p-fluid p-dialog-sm"
      :style="{ width: '450px' }"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
    >
      <template #header>
        <h3>Admin Details</h3>
      </template>
      <div class="p-d-flex p-jc-center p-ai-center ">
          <!--  harsh <Avatar
            :label="`${admin.firstName.charAt(0).toUpperCase()}${admin.lastName.charAt(0).toUpperCase()}`" 
            class="p-mr-2"
            style="margin-top: 10px; padding: 10px; background-color:#c8e6c9; color:#256029; min-width:6rem; min-height:6rem; font-size:4rem;"
            shape="circle"
          /> -->
      </div>
      <div>
        <div class="p-field p-fluid">
          <label>
            First Name
          </label>
          <InputText
            v-model="admin.firstName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Last Name
          </label>
          <InputText
            v-model="admin.lastName"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Username
          </label>
          <InputText
            v-model="admin.username"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Email
          </label>
          <InputText
            v-model="admin.email"
          >
          </InputText>
        </div>
        <div class="p-d-flex p-field">
          <LButton
            icon="pi pi-save"
            :loading="isSubmitting"
            @click="onSubmit"
            label="Save"
            loadingText="Saving"
          />
        </div>
      </div>      
    </Dialog>

    <Dialog
      v-model:visible="deleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="admin"
          >Are you sure you want to delete <b>{{ admin.firstName }} {{ admin.lastName }}</b>
        </span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteAdmin(admin)"
        />
      </template>
    </Dialog>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import AdminService from '@/services/AdminService'
import { AdminData, AdminsData, AdminCreateParam } from '@/types/admin'
// import AdminCreate from "@/components/users/AdminCreate.vue";
// import AdminEdit from "@/components/users/AdminEdit.vue";
import { useToast } from 'primevue/usetoast';
import {FilterMatchMode} from 'primevue/api';

export default defineComponent({
  // components: { AdminCreate, AdminEdit },
  data() {
    return {
      loading: false,
      newAdmin: {} as AdminCreateParam,
      admin: {} as AdminData,
      displayCreateForm: false,
      admins: [] as AdminData[],
      service: new AdminService(),
      toast: useToast(),
      deleteDialog: false,
      editDialog: false,
      editForm : {
        firstName: '',
        lastName: '',
        email: '',
        username: ''
      },
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      },
      matchModeOptions:  [
        {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
      ]
    }
  },
  mounted() {
    this.getData();

    
      this.editForm = {
        firstName: this.admin.firstName,
        lastName: this.admin.lastName,
        email: this.admin.email,
        username: this.admin.username
      }
  },
  methods: {
    getData() {
      this.loading = true;
      this.service.getAll()
        .then((adminsList) => { this.admins = adminsList })
        .finally(() => {
          this.loading = false;
          this.editDialog = false;
        });
    },
    confirmDelete(admin: AdminData) {
      this.admin = admin;
      this.deleteDialog = true;
      // this.toast.add({ life: 5000 })
    },
    editAdmin(admin: AdminData) {
      this.admin = admin;
      this.editDialog = true;
    },
    deleteAdmin(admin: AdminsData) {
      this.loading = true;
      this.service.delete(admin.id)
        .then(() => {
          this.toast.add({ severity: "info", detail: "Admin deleted successfully", life: 3000 })
        })
        .finally(() => {
          this.loading = false;
          location.reload();
        });
    },
    createAdmin() {
      this.service.create(this.newAdmin)
        .then((newAdmin) => {
          this.toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Admin was created successfully",
            life: 3000
          });
          this.$emit("Admin-created", newAdmin);
        }).finally(() => {
          this.displayCreateForm = false;
          location.reload();
        });
    },

    onSubmit(admin: AdminData) {
      this.admin = admin;
      const adminForm = this.editForm;
      this.service.update(admin.id, adminForm)
        .then((admin) => {
          console.log("It will soon work");
          console.log(admin);
          this.toast.add({ severity: "info", detail: "Editing successful", life: 3000 })
        })
        .finally(() => {
          this.loading = false;
          // location.reload();
        });
    }
  },
})

</script>
