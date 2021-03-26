<template>
  <div class="reset-password container">
    <PageHeading
      title="Reset your password"
      :subtitle="`Enter the OTP sent to ${formData.email}`"
    />
    <Card>
      <template #content>
        <form @submit.prevent="handleResetPassword">
          <div class="p-field p-fluid">
            <label class="p-d-flex p-jc-between" for="otp">
              <span>OTP</span>
              <Button
                style="width: initial"
                class="p-button-text p-button-primary p-float-right"
                :disabled="this.otpTimer > 0"
                :label="`${otpTimer ? otpTimer + 's' : ''} Resend OTP`"
                @click="handleSendOtp"
              />
            </label>
            <InputText
              id="otp"
              placeholder="One time password"
              required
              v-model="formData.otp"
            />
          </div>
          <div class="p-field p-fluid">
            <label for="new_password">New Password</label>

            <Password
              id="new_password"
              v-model="formData.new_password"
              required
              toggleMask
              :feedback="false"
            />
          </div>
          <div class="p-field p-fluid">
            <label for="confirm_password">Confirm Password</label>

            <Password
              id="confirm_password"
              v-model="formData.confirm_password"
              toggleMask
              :feedback="false"
            />
          </div>

          <div class="p-field p-fluid p-d-flex p-jc-center">
            <LButton
              :loading="isLoading"
              loadingText="Reseting Password..."
              label="Reset Password"
              @click="handleResetPassword"
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
import { AdminResetPassParam } from '@/types/admin';

export default defineComponent({
  components: { AuthNav },
  name: "ResetPassword",
  data() {
    return {
      otpTimer: 60,
      interval: undefined as undefined | number,
      formData: {
        email: "",
        otp: "",
        // eslint-disable-next-line
        new_password: "",
        // eslint-disable-next-line
        confirm_password: "",
      } as AdminResetPassParam,
      service: new AdminService(),
      toast: useToast(),
      isLoading: true,
    };
  },
  mounted() {
    if (!window.sessionStorage.getItem("email")) {
      this.$router.push({ name: "init-reset-password" });
    }
    this.setOtpInterval()
    this.formData.email = window.sessionStorage.getItem("email") || "";
  },
  methods: {
    setOtpInterval() {
      this.interval = setInterval(() => {
        if (this.otpTimer <= 0) {
          clearInterval(this.interval)
          return
        }
        this.otpTimer -= 1
        return
      }, 1000)
    },
    handleSendOtp() {
      if (this.formData.email) {

        if (this.validateInput()) {
          this.service.initResetPassword({ email: this.formData.email }).then(message => {
            this.toast.add({ severity: "success", summary: "Successful!", detail: message });
            window.sessionStorage.setItem("email", this.formData.email);
            this.$router.push({ name: "reset-password" });
          });
          return;
        }
        return;
      }
      this.$router.push({ name: "init-reset-password" });
    },
    validateInput() {
      //   ensure email is valid email
      //   ensure password and confirm_password works
      //   return true if all validations are passed;
      return true;
    },
    handleResetPassword() {
      this.isLoading = true
      if (this.validateInput()) {

        this.service.resetPassword(this.formData)
          .then((loginData) => {
            window.sessionStorage.removeItem("email");
            window.localStorage.setItem("token", loginData.token);
            this.$router.push({ name: "dashboard" });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
      // this.toast.add({ severity: "error", summary: "Invalid input", detail: "Please check you input and try again" });
      console.log(this.formData);
    }
  }
});
</script>

<style>
</style>