<template>
  <PageHeading title="Profile" />
  <ProgressSpinner v-if="loading" />
  <div v-else class="p-grid">
    <div class="p-col-12 p-md-6">
      <Card class="p-text-center">
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              :label="initials"
              class="p-mr-2"
              style="background-color:#9c27b0;color:#ffffff;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
          </div>
        </template>
        <template #title>
          {{ user?.fullName }}
        </template>
        <template #content>
          <div class="p-text-left">
            <p>
              Username: <b>{{ "@" + user?.username }}</b>
            </p>
            <p>
              Email: <b>{{ user?.email }}</b>
            </p>
            <p>
              Joined since:
              <b>{{ user ? new Date(user.created_on).toDateString() : "" }}</b>
            </p>
          </div>
        </template>
      </Card>
    </div>
    <div class="p-col-12 p-md-6">
      <Card class="">
        <template #content>
          <TabView>
            <TabPanel>
              <template #header>
                <i class="pi pi-cog"></i>
                <span class="p-ml-2">Edit Profile</span>
              </template>
              <div>
                <DynamicForm
                  :schema="{ ...profileSchema, values: admin }"
                  @submit="updateProfile"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <template #header>
                <i class="pi pi-cog"></i>
                <span class="p-ml-2">Change Password</span>
              </template>
              <div>
                <DynamicForm
                  :schema="{ ...passwordSchema, values: change_password }"
                  @submit="updatePassword"
                />
              </div>
            </TabPanel>
          </TabView>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminService from "@/services/AdminService";
import { useToast } from 'primevue/usetoast';
import { AdminsData, AdminCreateParam, AdminChangePassword } from "@/types/admin";
import getUser from "@/utils/users";
import getInitials from "@/utils/getInitials";
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
/* eslint-disable */

export default defineComponent({
  components: { DynamicForm },
  data() {
    return {
      admin: {
        fullName: '',
        username: '',
        push_token: ' ',
        email: ''
        // role_id: undefined as number | undefined,
      },
      change_password: {
        old_password: '',
        new_password: '',
        confirm_password: '',
        email: ''
      },
      initials: '',
      service: new AdminService(),
      Toast: useToast(),
      user: undefined as AdminsData | undefined,
      loading: false,
    }
  },

  setup() {
    return {
      profileSchema: profileFormSchema,
      passwordSchema: passwordFormSchema,
    }
  },
  methods: {

    updateProfile(values: AdminCreateParam) {
      this.loading = true;
      if (this.user) {
        this.admin = { ...this.admin, ...values };
        this.service.update(this.user.id, this.admin)
          .then((admin) => {
            window.localStorage.setItem("user", JSON.stringify(admin))
            this.$store.dispatch("Admin/getUser");
            this.Toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Admin profile was updated successfully",
              life: 3000
            })
          }).finally(() => {
            this.loading = false;
          });
      }
    },

    updatePassword(values: AdminChangePassword) {
      if (this.user) {
        this.loading = true;

        this.change_password = { ...values }
        this.change_password.email = this.user.email
        this.service.changepassword(this.user.id, this.change_password)
          .then(() => {
            this.$store.dispatch("Admin/getUser");
            this.$store.dispatch("Admin/getToken");
            this.change_password = { ...this.change_password, old_password: "", new_password: "", confirm_password: "" };

            this.Toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Admin password was updated successfully",
              life: 3000
            })
          }).finally(() => {
            this.loading = false;
          });
      }
    }
  },
  async mounted() {

    this.loading = true;
    this.user = await getUser();

    if (this.user) {
      this.admin.fullName = this.user.fullName,
      this.admin.username = this.user.username,
      this.admin.email = this.user.email
      // this.admin.role_id = this.user.role_id
      this.loading = false;
    }

    this.initials = getInitials(this.user);
  }
})
</script>












