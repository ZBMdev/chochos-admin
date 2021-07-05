<template>
  <div class="init-reset-password container">
    <PageHeading
      title="Forgot password?"
      subtitle="Enter your email to reset your password"
    />
    <Card>
      <template #content>
        <form @submit.prevent="handleInitResetPassword">
          <div class="p-field p-fluid">
            <label for="email">Email</label>
            <InputText
              type="email"
              id="email"
              placeholder="yourname@email.com"
              required
              v-model="email"
            />
          </div>

          <div class="p-field p-fluid p-d-flex p-jc-center">
            <LButton
              :loading="isLoading"
              loadingText="Submiting..."
              label="Submit"
              @click="handleInitResetPassword"
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
import { defineComponent } from "vue";
import AdminService from "@/services/AdminService";
import { useToast } from 'primevue/usetoast';
import AuthNav from "@/components/elements/AuthNav.vue";

export default defineComponent({
  components: { AuthNav },
  name: "InitResetPassword",
  data() {
    return {
      isLoading: false,
      email: "",
      service: new AdminService(),
      toast: useToast(),
    };
  },
  methods: {
    validateInput() {
      //   const emailValid = !!this.email;
      //   const passValid = !!this.password;
      //   return emailValid && passValid;
      return true;
    },
    handleInitResetPassword() {
      this.isLoading = true
      const data = {
        email: this.email,
      };

      if (this.validateInput()) {
        this.service.initResetPassword(data).then(message => {
          this.toast.add({ severity: "success", summary: "Successful!", detail: message });
          window.sessionStorage.setItem("email", this.email);
          this.$router.push({ name: "reset-password" });
        })
          .finally(() => {
            this.isLoading = false;
          });
        return;
      }
      // this.toast.add({ severity: "error", summary: "Invalid input", detail: "Please check you input and try again" });
      return;
    }
  }
});
</script>

<style>
#lbutton{
  background: green;
}
</style>