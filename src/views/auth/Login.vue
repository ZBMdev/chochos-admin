<template>
  <div class='login container'>
    <PageHeading title="Sign In" subtitle="" />
    <Card>
      <template #content>
        <form @submit.prevent="handleLogin">
          <div class="p-field p-fluid">
            <label for="email">Email</label>
            <InputText
              type="email"
              id="email"
              placeholder="yourname@email.com"
              v-model="email"
            />
          </div>
          <div class="p-field p-fluid">
            <label for="password">Password</label>

            <Password
              v-model="password"
              @keypress.enter="handleLogin"
              toggleMask
              :feedback="false"
              placeholder="*******"
            />
          </div>

          <div class="p-field p-fluid p-d-flex p-jc-center">
            <LButton
              :loading="isLoading"
              loadingText="Signing in..."
              label="Sign in"
              @click="handleLogin"
              id="lbutton"
            />
          </div>
          <AuthNav />
        </form>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminService from '@/services/AdminService';
import AuthNav from '@/components/elements/AuthNav.vue';

export default defineComponent({
  components: { AuthNav },
  name: 'Login',
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
      service: new AdminService()
    };
  },
  methods: {
    validateInput() {
      const emailValid = !!this.email;
      const passValid = !!this.password;
      return emailValid && passValid;
    },
    handleLogin() {
      this.isLoading = true
      const data = {
        email: this.email,
        password: this.password
      };

      this.service.login(data)
        .then((loginData) => {
          window.localStorage.getItem("token");
          window.localStorage.setItem("token", loginData.token);
          window.localStorage.getItem("fullName");
          window.localStorage.setItem("fullName", loginData.user.fullName,);
          // window.localStorage.setItem("user", JSON.stringify(loginData.admin));
          localStorage.getItem("username");
          localStorage.setItem("username", loginData.user.username );
          localStorage.getItem("email");
          localStorage.setItem("email", loginData.user.email );
          localStorage.getItem("languages");
          localStorage.setItem("languages", loginData.user.languages )
          
          localStorage.setItem("admin", JSON.stringify(loginData.user));
          localStorage.getItem('admin');
          this.$store.commit('Admin/setAdmin', loginData.user);
          this.$store.commit('Admin/setToken', loginData.token);
          // this.$store.commit('Admin/setRole', loginData.token);
          this.$store.commit('Admin/setUsername', loginData.user.username);
          
          console.log(loginData, "users full details object")
          console.log(loginData.token)
          console.log(loginData.user.firstName, "users first name")
          console.log(loginData.user.username, "users username")
          // console.log(loginData.admin.username)
          // redirect to previous link
          // const redirectTo = this.$route.query.redirect as string || '/';
          // this.$router.push(redirectTo);
          // hash  window.location.href = redirectTo;
          
          const redirectTo = this.$route.query.redirect as string || '/';
          window.location.href = redirectTo;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
});
</script>

<style>
#lbutton {
  background: purple;
  color: white;
}
</style>