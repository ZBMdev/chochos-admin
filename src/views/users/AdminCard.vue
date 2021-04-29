<template>
  <PageHeading :title="`${admin.firstName}'s Profile`"  />
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
              Username: <b>{{ admin?.username }}</b>
            </p>
            <p>
              Email: <b>{{ admin?.email }}</b>
            </p>
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
import Admin from '@/models/Admin';
import AdminService from '@/services/AdminService';
import { AdminData } from '@/types/admin'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
/* eslint-disable */

/*
export default defineComponent({
  components: { DynamicForm },
  data() {
    return {
      admin: {
        fullName: '',
        username: '',
        about: ' ',
        email: '',
        products: ''
      },
      initials: '',
      service: new adminService(),
      Toast: useToast(),
      adminName: reactive(new admin({})) as admin,
      currentadmin: undefined as adminData | undefined,
      loading: false,
    }
  },
  async mounted() {

    this.loading = true;
    // this.currentadmin = await this.adminName;

    
      this.admin.fullName,
      this.admin.username,
      this.admin.email,
      // this.admin.role_id = this.user.role_id
      this.loading = false;
    

    // this.initials = this.adminName.fullName.charAt(0).toUpperCase();
  }
})   */  



@Options<AdminCard>({
  components: { DynamicForm  },
})

export default class AdminCard extends Vue {

  isLoading = false;
  admins: Admin[] = [];
  admin = reactive(new Admin({})) as Admin;
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
}
</script>

