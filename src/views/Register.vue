<template>
    <div class="register">
        <h1>Register</h1>
         <form @submit.prevent="handleSubmit">
            <InputText type="text" placeholder="username" v-model="username" />
            <InputText type="text" placeholder="email" v-model="email"/>
            <Password v-model="value4">
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
            <Button label="Register" @click="handleSubmit" />
            <p>Have an account? <router-link to="/login">Login here</router-link></p>
        </form>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import {defineComponent} from "vue";

export default defineComponent({
    name: 'Register',
    data(){
        return {
            name: '',
            username: '',
            email: '',
            password: ''
        }
    },
    methods:{
        handleSubmit(){
            const data = {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password
            };

            console.log(data);
        }
    }
})

</script>