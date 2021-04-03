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
import LButton from '@/components/elements/LButton.vue'

export default defineComponent({
  components: { AuthNav, LButton },
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
      console.log(data)

      this.service.login(data)
        .then((loginData) => {
          window.localStorage.setItem('token', loginData.token);
          // redirect to previous link
          const redirectTo = this.$route.query.redirect as string || '/dashboard';
          // this.$router.push(redirectTo);
          // I'm using this because I need the page to refresh
          window.location.href = redirectTo;
          // this.$router.push('dashboard');
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
});
</script>

<style>
</style>