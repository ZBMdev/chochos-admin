<template>
  <div class="adminList">
    <PageHeading title="Top Artisans" />

    <Card>
      <template #content>
        <DataTable
          class="p-datatable-sm"
          dataKey="id"
          :value="artisans"
          :loading="loading"
          :scrollable="true"
          style="width: 100%"
        >
         
          <!-- 
          scrollHeight="flex"
          scrollDirection="both"-->
          <Column field="name" headerStyle="width: 3rem;">
            <template #body="slotProps">
              <img :src="slotProps.artisan.image" :alt="slotProps.artisan.image">
            </template>
          </Column>
          <Column
            field="name"
            header="Name"
            headerStyle="width: 200px;"
          ></Column>
          <Column
            field="skills"
            header="Skills"
            headerStyle="width: 150px;"
          ></Column>
          <Column
            field="requests"
            header="Number of Requests"
            headerStyle="width: 200px;"
          ></Column>
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
