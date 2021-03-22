<template>
  <div class="admin-edit">
    <ProgressSpinner v-if="isLoading" />
    <template v-else>
      <div class="p-field p-fluid">
        <label>
          Name
        </label>
        <InputText @input="syncAdmin" v-model="admin.name"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Username
        </label>
        <InputText @input="syncAdmin" v-model="admin.username"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Role
        </label>
        <Dropdown
          :options="roles"
          optionLabel="name"
          optionValue="id"
          @input="syncAdmin"
          v-model="admin.role_id"
        />
      </div>
      <div class="p-field p-fluid">
        <label>
          <Checkbox
            @input="syncAdmin"
            :binary="true"
            v-model="admin.activated"
          />
          Activated
        </label>
      </div>
      <Button @click="updateAdmin" label="Submit"></Button>
    </template>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue'
import AdminService from '@/services/AdminService'
import { useToast } from 'primevue/usetoast'
import { AdminUpdateParam } from '@/types/admin';
// import Role from '@/models/Role';
// import RoleService from '@/services/RoleService';


export default defineComponent({
  name: "AdminEdit",
  emits: ['update:modelValue', "admin-updated"],
  props: {
    modelValue: {
      type: Object,
      required: true,
    }
  },
  //   modelValue: {} as AdminUpdateParam,
  data() {
    return {
      admin: {} as AdminUpdateParam,
      service: new AdminService(),
      // roleService: new RoleService(),
      Toast: useToast(),
      // roles: [] as Role[],
      isLoading: false,
    }

  },
  mounted() {
    this.getData();
    this.admin = reactive<AdminUpdateParam>({
      id: this.modelValue.id,
      name: this.modelValue.name,
      username: this.modelValue.username,
      activated: this.modelValue.activated,
      push_token: this.modelValue.push_token,
      role_id: this.modelValue.role_id,
    } as unknown as AdminUpdateParam);
  },
  methods: {
    getData() {
      this.isLoading = true;
      /* this.roleService.getAll()
        .then((roles) => {
          this.roles = roles.map((role) => new Role(role));
        }).finally(() => {
          this.isLoading = false;
        }) */
    },
    updateAdmin() {
      this.service.update(this.modelValue.id, this.admin)
        .then((admin) => {
          this.Toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Admin was updated successfully",
            life: 3000
          });
          this.$emit("admin-updated", admin);
        })
    },
    // eslint-disable-next-line
    syncAdmin(event: any) {
      this.$emit("update:modelValue", this.admin)
    }

  }
});
</script>