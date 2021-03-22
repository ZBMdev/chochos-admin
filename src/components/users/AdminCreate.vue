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
          Email
        </label>
        <InputText @input="syncAdmin" v-model="admin.email"></InputText>
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
          Password
        </label>
        <InputText @input="syncAdmin" v-model="admin.password"></InputText>
      </div>
      <Button @click="createAdmin" label="Submit"></Button>
    </template>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue'
import AdminService from '@/services/AdminService'
import { useToast } from 'primevue/usetoast'
import { AdminCreateParam } from '@/types/admin';
// import Role from '@/models/Role';
// import RoleService from '@/services/RoleService';


export default defineComponent({
  name: "AdminCreate",
  emits: ['update:modelValue', "admin-created"],
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        name: '',
        username: '',
        email: '',
        /* eslint-disable */
        role_id: null,
        password: '',
      }),
    }
  },
  data() {
    return {
      admin: {} as AdminCreateParam,
      service: new AdminService(),
      // roleService: new RoleService(),
      Toast: useToast(),
      // roles: [] as Role[],
      isLoading: false,
    }

  },
  mounted() {
    this.getData();
    this.admin = reactive<AdminCreateParam>(this.modelValue as AdminCreateParam);
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
    createAdmin() {
      this.service.create(this.admin)
        .then((admin) => {
          this.Toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Admin was created successfully",
            life: 3000
          });
          this.$emit("admin-created", admin);
        })
    },
    // eslint-disable-next-line
    syncAdmin(event: any) {
      this.$emit("update:modelValue", this.admin)
    }

  }
});
</script>