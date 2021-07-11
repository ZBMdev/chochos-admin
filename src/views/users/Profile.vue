<!--<template>
  <PageHeading title="Profile" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
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
          {{ user?.firstName }} {{ user?.lastName }}
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
import store from '@/store'
import getUser from "@/utils/users";
import getInitials from "@/utils/getInitials";
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
/* eslint-disable */
store.dispatch("Admin/getUserAd");
store.dispatch("Admin/getToken");

export default defineComponent({
  components: { DynamicForm },
  data() {
    return {
      admin: {
        firstName: '',
        lastName: '',
        username: '',
        push_token: ' ',
        email: ''
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
    this.user = await store.getters.getUserAd();
    if( this.user ) {
      this.admin.firstName = this.user.firstName
    }
    // this.user = await getUser();

    // if (this.user) {
    //   this.admin.firstName = this.user.firstName,
    //   this.admin.username = this.user.username,
    //   this.admin.email = this.user.email
    //   // this.admin.role_id = this.user.role_id
    //   this.loading = false;
    // }

    // this.initials = getInitials(this.user);

    this.user = this.$store.state.user;

    if (this.user) {
      this.admin.firstName = this.user.firstName,
      this.admin.username = this.user.username,
      this.admin.email = this.user.email
      // this.admin.role_id = this.user.role_id
      this.loading = false;
    }

    this.initials = this.$store.getters.getInits(this.user);
  }
})
</script>-->

<template>
  <PageHeading title="Profile" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else>
    <div  id="profile-hero">
      <Card class="p-card">
        <template #header>
          <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              :label="adminInit"
              class="p-mr-2"
              style="background-color:#9c27b0;color:#ffffff;width:8rem;height:8rem;font-size:4rem;"
              shape="circle"
            />
          </div>
        </template>
        <template #title>
          <!-- {{ user?.firstName }}  -->
        </template>
        <template #content>
          <div class="p-text-left">
            <div class="name">
              <p>Name: </p>
              <p> <b> {{ adminFullName }} </b> </p>
            </div>
            <div class="username">
              <p>Username: </p>
              <p> <b> {{ "@" + adminName }} </b> </p>
            </div>
            <div class="email">
              <p>Email: </p>
              <p> <b> {{ adminEmail }} </b> </p>
            </div>
            <div class="languages">
              <p>Languages: </p>
              <p> <b> {{ adminLanguages }} </b> </p>
            </div>
          </div>
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
import store from '@/store'
import getUser from "@/utils/users";
import getInitials from "@/utils/getInitials";
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
// import admin from "@/store/admin";
/* eslint-disable */
store.dispatch("Admin/getAdmin");
store.dispatch("Admin/getToken");


export default defineComponent({
  components: { DynamicForm },
  data() {
    return {
      admin: {
        firstName: '',
        lastName: '',
        username: '',
        push_token: ' ',
        email: ''
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

  computed: {
    adminName() {
      const userName = localStorage.getItem('username');
      return userName
    },

    adminFullName() {
      const fullName = localStorage.getItem('fullName');
      return fullName
    },

    adminInit() {
      const initials = localStorage.getItem('username');
      return initials?.charAt(0).toUpperCase();
    },

    adminEmail() {
      const email = localStorage.getItem('email');
      return email
    },

    adminLanguages() {
      const languages = localStorage.getItem('languages');
      return languages
    },

    // adminDate() {
    //   const adminRegDate = adminDetails
    //   return adminRegDate.created_on
    // }
  },

  setup() {
    return {
      profileSchema: profileFormSchema,
      passwordSchema: passwordFormSchema,
    }
  },

  // async mounted() {
  //   this.loading  = true;

  //   this.user =  await store.getters.getUser;
  //   if (this.user) {
  //     this.admin.firstName = this.user.firstName,
  //     this.admin.username = this.user.username,
  //     this.admin.email = this.user.email
  //     // this.admin.role_id = this.user.role_id
  //     this.loading = false;
  //   }
  //   console.log(this.admin.firstName)
  // }

  // async mounted() {
  //   console.log("It will work")

  //   this.loading = true;
  //   this.user = store.state.admin ;
  //   if( this.user ) {
  //     this.admin.firstName = this.user.firstName
  //   }
    // this.user = await getUser();

    // if (this.user) {
    //   this.admin.firstName = this.user.firstName,
    //   this.admin.username = this.user.username,
    //   this.admin.email = this.user.email
    //   // this.admin.role_id = this.user.role_id
    //   this.loading = false;
    // }

    // this.initials = getInitials(this.user);

    // this.user = this.$store.state.user;

    // if (this.user) {
    //   this.admin.firstName = this.user.firstName,
    //   this.admin.username = this.user.username,
    //   this.admin.email = this.user.email
    //   // this.admin.role_id = this.user.role_id
    //   this.loading = false;
    // }

    // this.initials = this.$store.getters.getInits(this.user);
  // }

})
</script>

<style  scoped>
#profile-hero{
  display: flex;
  justify-content: center;
}
.p-card{
  width: 400px;
}
.name, .username, .email, .languages {
  display: flex;
  justify-content: start;
  padding: 10px 15px;
}
.name p:nth-child(2), .username p:nth-child(2), .email p:nth-child(2), .languages p:nth-child(2) {
  margin-left: 10px;
}
</style>
