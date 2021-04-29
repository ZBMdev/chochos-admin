<!-- <template>
  <PageHeading :title="`${admin.fullName}'s Profile`"  />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-grid">
    <div class="p-col-12 p-md-6">
      <Card
        class="p-text-center"
        :value="admin"
      >
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              v-if="admin.photoUrl === '' || admin.photoUrl === null " 
              icon="pi pi-user"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <Avatar 
              v-else-if="admin.firstName"
              :label="admin.firstName.charAt(0).toUpperCase()"
              class="p-mr-2"
              style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
            <img v-else
              :src="admin.photoUrl"
              :alt="admin.photoUrl"
              style="width:8rem;height:8rem;font-size:4rem;"
            />
          </div>
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              First Name: <b>{{ admin?.firstName }}</b>
            </p>
            <p>
              Last Name: <b>{{ admin?.lastName }}</b>
            </p>
            <p>
              Username: <b>{{ "@" + admin?.username }}</b>
            </p>
            <p>
              Email: <b>{{ admin?.email }}</b>
            </p>
          </div>
          <div class="p-d-flex p-field">
            <LButton
              icon="pi pi-save"
              :isLoading="isSubmitting"
              :disabled="!!errors.firstName?.length"
              @click="onSubmit"
              label="Save"
              loadingText="Saving"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Admin from '@/models/admin';
import AdminService from '@/services/AdminService';
import { AdminsData } from '@/types/admin'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
import DynamicForm from "@/components/elements/DynamicForm.vue";
// import { profileFormSchema, passwordFormSchema } from '@/models/Admin';

@Options<AdminEdit>({
  components: { DynamicForm  },
})

export default class AdminEdit extends Vue {

  isLoading = false;
  admins: Admin[] = [];
  admin = reactive(new Admin({})) as Admin;
  // admin = reactive(new Admin({})) as AdminData;
  datasource: Admin[] = [];
  totalRecords = 0;
  service: AdminService = new AdminService();
  selectedadmins: Admin[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  // lazyParams: Partial<adminLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;  


  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.thereIsAnID) {
          this.getData();
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  get thereIsAnID() {
    return !!this.$route.params.id
  }

  getData() {
    this.getAdmin();
  }

  getAdmin() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((adminData) => {
        this.setAdmin(new Admin(adminData));
        this.isLoading = false;
      });
  }

  setAdmin(value: Admin) {
    this.admin = reactive(value) as Admin;
  }

  onSubmit(admin: AdminsData) {
    // this.admin = admin;
    this.service.put(admin.id, admin)
      .then(() => {
        this.toast.add({ severity: "info", detail: "Editing successful", life: 3000 })
      })
      .finally(() => {
        this.isLoading = false;
        location.reload();
      });
  }
}
</script>

-->

<template>
  <div class="admin-edit">
    <ProgressSpinner v-if="isLoading" />
    <template v-else>
      <div class="p-field p-fluid">
        <label>
         First Name
        </label>
        <InputText @input="syncAdmin" v-model="admin.firstName"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
         Last Name
        </label>
        <InputText @input="syncAdmin" v-model="admin.lastName"></InputText>
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
      <Button @click="updateAdmin" label="Submit"></Button>
    </template>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue'
import AdminService from '@/services/AdminService'
import { useToast } from 'primevue/usetoast'
import { AdminUpdateParam } from '@/types/admin';


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
      Toast: useToast(),
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