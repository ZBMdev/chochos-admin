<template>
  <div class="p-fluid">
    <div
      class="p-field"
      v-if="uploadedImage || image_url"
      style="height:8rem;width:100%;"
    >
      <img
        :src="uploadedImage || image_url"
        style="height:100%;object-fit:cover;"
        :alt="name"
      />
    </div>
    <div class="p-fluid p-field">
      <label for="name">Name</label>
      <InputText
        id="name"
        name="name"
        type="text"
        v-model.trim="name"
        :class="{ 'p-invalid': !!errors['name'] }"
      />
      <small class="p-invalid">
        {{ errors["name"] }}
      </small>
    </div>
    <div class="p-fluid p-field">
      <label for="description">Description</label>
      <Textarea
        id="description"
        name="description"
        v-model="description"
        :class="{ 'p-invalid': !!errors['description'] }"
      />
      <small class="p-invalid">
        {{ errors["description"] }}
      </small>
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-col p-fluid p-field p-mr-2">
        <label for="name">Image</label>
        <image
          v-if="uploadedImage || image_url"
          :src="uploadedImage || image_url"
        />
        <FileUpload
          mode="basic"
          name="file[]"
          :customUpload="true"
          @uploader="uploadImage"
          chooseLabel="Browse"
          accept="image/*"
          :maxFileSize="1000000"
          :auto="true"
        />
      </div>
      <div class="p-col p-fluid p-field">
        <label for="name">Activated</label>
        <InputSwitch class="p-d-block" v-model="active" />
      </div>
    </div>
    <div class="p-d-flex p-jc-end p-field">
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
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import BombsightService from '@/services/BombsightService';
import { defineComponent, ref } from 'vue';
import PaymentMethodService from '@/services/PaymentMethodService';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  props: {
    paymentMethod: Object
  },
  data() {
    return {
      file: undefined as File | undefined,
    }
  },
  emits: ["updated", "created"],
  setup(props, context) {
    const schema = yup.object({
      name: yup.string().required().label('Payment method name'),
      description: yup.string().label('Description'),
    });
    // Initial values
    const formValues = {
      name: props.paymentMethod?.name,
      description: props.paymentMethod?.description,
    };
    const image_url = ref<string>(props.paymentMethod?.image_url);
    const active = ref(props.paymentMethod?.activated);
    const toast = useToast();
    const file = ref<File>();
    const uploadedImage = ref<string>();

    const { errors, handleSubmit } = useForm({ validationSchema: schema, initialValues: formValues, });
    const { value: name } = useField<string>("name");
    const { value: description } = useField<string>("description");

    // eslint-disable-next-line
    const uploadImage = (event: any) => {
      file.value = event.files[0];
      uploadedImage.value = window.URL.createObjectURL(file.value);
    }

    const isSubmitting = ref(false);

    const onSubmit = handleSubmit(async (values) => {
      isSubmitting.value = true;
      const service = new PaymentMethodService();
      const imageService = new BombsightService();

      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value, file.value.name);
        const image = await imageService.upload(formData);
        image_url.value = image.url;
        if (uploadedImage.value) {
          window.URL.revokeObjectURL(uploadedImage.value);
          uploadedImage.value = undefined;
        }
      }

      if (props.paymentMethod?.id) {
        service.update(props.paymentMethod?.id, { ...values, image_url: image_url.value, activated: active.value })
          .then((paymentMethod) => {
            context.emit("updated", paymentMethod);
            toast.add({ severity: "success", summary: "Successfull!", detail: "Payment method updated", life: 3000 });
          })
          .finally(() => {
            isSubmitting.value = false;
          });
      } else {
        service.create({ ...values, image_url: image_url.value, activated: active.value })
          .then((newPaymentMethod) => {
            context.emit("created", newPaymentMethod);
            toast.add({ severity: "success", summary: "Successfull!", detail: "Payment method created", life: 3000 });
          })
          .finally(() => {
            isSubmitting.value = false;
          })
      }
    });

    return {
      uploadedImage,
      name,
      image_url,
      active,
      errors,
      description,
      onSubmit,
      isSubmitting,
      uploadImage,
    }

  },
});
</script>