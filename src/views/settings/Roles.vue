<template>
  <DataTable :value="roles" dataKaey="id">
    <template #header>
      <div class="p-d-flex p-jc-end">
        <Button @click="newRole" label="New" icon="pi pi-plus" />
      </div>
    </template>
    <Column header="Name" field="name" />
    <Column header="Actions">
      <template #body="{data}">
        <Button icon="pi pi-pencil" @click="editRole(data)" />
        <Button
          class="p-button-warning"
          @click="confirmDeleteRole(data)"
          icon="pi pi-trash"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="roleNewDialog"
    :modal="true"
    :style="{ width: '450px' }"
    header="Role Details"
  >
    <div class="p-field p-fluid">
      <label for="name">Name</label>
      <InputText id="name" name="name" v-model="role.name" />
    </div>
    <template #footer>
      <Button @click="saveRole" label="Save" icon="pi pi-save" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="roleDeleteDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span v-if="role"
        >Are you sure you want to delete <b>{{ role.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <LButton
        label="No"
        icon="pi pi-times"
        class="p-button-text p-button-danger"
        @click="roleDeleteDialog = false"
      />
      <LButton
        :loading="isDeleting"
        loadingLabel="Deleting"
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteRole()"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RoleService from '@/services/RoleService';
import Role from '@/models/Role';
import { useToast } from 'primevue/usetoast';
// import RoleEdit from '@/components/settings/RoleEdit.vue';

export default defineComponent({
  // components: { RoleEdit },
  data() {
    const service = new RoleService()
    const toast = useToast();
    return {
      roles: [] as Role[],
      role: new Role(),
      roleNewDialog: false,
      roleDeleteDialog: false,
      isDeleting: false,
      service,
      toast,
    };
  },
  methods: {
    getData() {
      this.service.getAll().then((roles) => {
        this.roles = roles.map((role) => new Role(role));
      })
    },
    editRole(data: Role) {
      this.$router.push({ name: "role-edit", params: { id: data.id, role: JSON.stringify(data) } });
    },
    newRole() {
      this.role = new Role();
      this.roleNewDialog = true;
    },
    saveRole() {
      this.service.create(this.role.toCreateParam()).then((role) => {
        this.role = new Role(role);
        this.editRole(this.role);
      })
    },
    confirmDeleteRole(data: Role) {
      this.role = new Role({ ...data });
      this.roleDeleteDialog = true;
    },
    deleteRole() {
      this.isDeleting = true
      this.service.delete(this.role.id).then((message) => {
        this.roles = this.roles.splice(this.roles.findIndex((r) => r.id == this.role.id), 1);
        this.role = new Role();
        this.roleDeleteDialog = false;
        this.isDeleting = false
        this.toast.add({ severity: "info", detail: message, life: 3000 });
      })
    },
  },
  mounted() {
    this.getData();
  },
})
</script>

<style scoped>
</style>