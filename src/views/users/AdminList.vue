<template>
  <div class="adminList">
    <page-heading title="Administrators"> </page-heading>

    <Card>
      <template #content>
        <DataTable
          class="p-datatable-sm"
          dataKey="id"
          :value="admins"
          :loading="loading"
          :scrollable="true"
          style="width: 100%"
        >
          <template #header>
            <div class="p-d-flex p-jc-end">
              <Button
                class="s"
                label="New Admin"
                icon="pi pi-plus"
                @click="displayCreateForm = true"
              />
            </div>
          </template>
          <!-- 
          scrollHeight="flex"
          scrollDirection="both"-->
          <Column field="name" headerStyle="width: 3rem;">
            <template #body="{data}">
              <Avatar
                :label="data.name.charAt(0)"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029"
                shape="circle"
              />
            </template>
          </Column>
          <Column
            field="name"
            header="Name"
            headerStyle="width: 200px;"
          ></Column>
          <Column
            field="email"
            header="Email"
            headerStyle="width: 250px;"
          ></Column>
          <Column
            field="role.name"
            header="Role"
            headerStyle="width: 150px;"
          ></Column>
          <Column
            field="username"
            header="Username"
            headerStyle="width: 150px;"
          ></Column>
          <Column field="activated" header="Status" headerStyle="width: 100px;">
            <template #body="slotProps">
              <span v-if="slotProps.data.activated" class="item-activated">
                active
              </span>
              <span v-else class="item-deactivated"> inactive </span>
            </template>
          </Column>
          <Column headerStyle="width: 100px;">
            <template #body="{data}">
              <Button icon="pi pi-pencil" @click="editAdmin(data)" />
              <!-- <Button
                icon="pi pi-trash"
                class="p-button-warning"
                @click="confrimDelete(data)"
              /> -->
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
    >
      <template #header>
        <h3>Admin Details</h3>
      </template>

      <AdminCreate v-model="newAdmin" @admin-created="getData" />
    </Dialog>

    <Dialog
      :modal="true"
      v-model:visible="editDialog"
      class="p-fluid p-dialog-sm"
      :style="{ width: '450px' }"
    >
      <template #header>
        <h3>Admin Details</h3>
      </template>

      <AdminEdit v-model="admin" @admin-updated="getData" />
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
          >Are you sure you want to delete <b>{{ admin.name }}</b>
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
import { AdminData, AdminCreateParam } from '@/types/admin'
import AdminCreate from "@/components/users/AdminCreate.vue";
import AdminEdit from "@/components/users/AdminEdit.vue";
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  components: { AdminCreate, AdminEdit },
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
    }
  },
  mounted() {
    this.getData();
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
    },
    editAdmin(admin: AdminData) {
      this.admin = admin;
      this.editDialog = true;
    },
    deleteAdmin(admin: AdminData) {
      this.loading = true;
      this.service.delete(admin.id)
        .then(() => {
          this.toast.add({ severity: "info", detail: "deleted successfully" })
        })
        .finally(() => { this.loading = false; });
    },
  },
})

</script>
