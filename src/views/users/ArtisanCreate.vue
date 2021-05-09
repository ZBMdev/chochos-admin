<template>
  <div class="p-fluid">
    <div class="p-field">
      <label for="firstName">First Name</label>
      <InputText
        id="firstName"
        v-model.trim="firstName"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['firstName'] }"
      />
      <small class="p-invalid" v-if="errors['firstName']">
        {{ errors["firstName"] }}
      </small>
    </div>
    <div class="p-field">
      <label for="lastName">Last Name</label>
      <InputText
        id="lastName"
        v-model.trim="lastName"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['lastName'] }"
      />
      <small class="p-invalid" v-if="errors['lastName']">
        {{ errors["lastName"] }}
      </small>
    </div>
    <div class="p-field">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model.trim="email"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['email'] }"
      />
      <small class="p-invalid" v-if="errors['email']">
        {{ errors["email"] }}
      </small>
    </div>
    <div class="p-field">
      <label for="username">Username</label>
      <InputText
        id="username"
        v-model.trim="username"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['username'] }"
      />
      <small class="p-invalid" v-if="errors['username']">
        {{ errors["username"] }}
      </small>
    </div>
    <div class="p-field">
      <label for="password">Password</label>
      <InputText
        id="password"
        v-model.trim="password"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['password'] }"
      />
      <small class="p-invalid" v-if="errors['password']">
        {{ errors["password"] }}
      </small>
    </div>
    
    <div class="p-d-flex p-field">
      <LButton
        icon="pi pi-save"
        :loading="isSubmitting"
        :disabled="!!errors.name?.length"
        @click="onSubmit"
        label="Save"
        loadingText="Saving"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import BombsightService from '@/services/BombsightService';
import ArtisanService from '@/services/ArtisanService';
import { useToast } from 'primevue/usetoast';
import { ArtisanRegisterParams} from '@/types/artisan';

/* eslint-disable */

export default defineComponent({
  props: {
    artisan: { type: Object, required: true },
    artisans: { type: Array, required: true },
  },
  emits: ["updated", "created"],
  setup(props, context) {
    const schema = yup.object({
      firstName: yup.string().required().label('First Name'),
      lastName: yup.string().required().label('Last Name'),
      email: yup.string().required().label('Email'),
      username: yup.string().required().label('Username'),
      password: yup.string().label('Password'),
    });

    const formValues = { ...props.artisan } as Record<keyof ArtisanRegisterParams, any>;
    const { errors, handleSubmit, setFieldValue } = useForm({ validationSchema: schema, initialValues: formValues });

    const { value: firstName } = useField<string>("firstName");
    const { value: lastName } = useField<string>("lastName");
    const { value: email } = useField<string>("email");
    const { value: username } = useField<string>("username");
    const { value: password } = useField<string>("password");

    const toast = useToast();
    const file = ref<File>();
    const uploadedImage = ref<string>();
    const isSubmitting = ref(false);

    // eslint-disable-next-line
    const uploadImage = (event: any) => {
      file.value = event.files[0];
      uploadedImage.value = window.URL.createObjectURL(file.value);
    }

    const onSubmit = handleSubmit(async (formValues) => {
      isSubmitting.value = true;
      const service = new ArtisanService();
      const imageService = new BombsightService();

      let values = { ...formValues }

      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value, file.value.name);
        const image = await imageService.upload(formData);
        // setFieldValue("image_url", image.url, { force: true })
        values = { ...values }
      }

      if (props.artisan?.id) {
        service.put(props.artisan?.id, values)
          .then((artisan) => {
            context.emit("updated", artisan);
            toast.add({ severity: "success", summary: "Successfull!", detail: "Category updated", life: 3000 });
          })
          .finally(() => {
            isSubmitting.value = false;
            if (uploadedImage.value) {
              window.URL.revokeObjectURL(uploadedImage.value);
              uploadedImage.value = undefined;
            }
          });
      } else {
        service.create(values)
          .then((newArtisan) => {
            context.emit("created", newArtisan);
            toast.add({ severity: "success", summary: "Successful !!", detail: "Artisan created", life: 3000 });
          })
          .finally(() => {
            isSubmitting.value = false;
            if (uploadedImage.value) {
              window.URL.revokeObjectURL(uploadedImage.value);
              uploadedImage.value = undefined;
            }
          })
      }

    })

    return {
      uploadedImage,
      uploadImage,
      isSubmitting,
      onSubmit,
      errors,
      firstName,
      lastName,
      email,
      password,
      username
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
