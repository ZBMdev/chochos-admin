<template>
    <div class="login">
        <h1>Login</h1>
         <form @submit.prevent="handleLogin">
            <InputText type="text" placeholder="email" v-model="email"/>
            <Password v-model="password">
                <template #header>
                    <h6>Pick a password</h6>
                </template>
                <template #footer>
                    <Divider />
                    <p class="p-mt-2">Suggestions</p>
                    <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                    </ul>
                </template>
            </Password>
            <Button label="Login" @click="handleLogin"/>
        </form>
    </div>
</template>
<script>
import {defineComponent} from "vue";
import AdminService from '@/services/AdminService.ts';

export default defineComponent({
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            service: new AdminService()
        }
    },
    methods:{
        handleLogin(){
            const data = {
                email: this.email,
                password: this.password,
                
            };

            this.service.login(data)
                .then((loginData) => {
                    window.sessionStorage.setItem("token", loginData.token);
                    window.sessionStorage.setItem("user", loginData.admin);
                    console.log(loginData);
                    this.$router.push('/dashboard');
                });

            console.log(data);
        }
    }
})

</script>