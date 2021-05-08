<template>
  <div class="p-fluid">
    <div class="p-field">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model.trim="name"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['name'] }"
      />
      <small class="p-invalid" v-if="errors['name']">
        {{ errors["name"] }}
      </small>
    </div>
    <div class="p-field">
      <label for="description">Description</label>
      <Textarea
        id="description"
        v-model="description"
        required="true"
        rows="3"
        cols="20"
        :class="{ 'p-invalid': errors['description'] }"
      />
      <small class="p-invalid" v-if="errors['description']">
        {{ errors["description"] }}
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
import CategoryService from '@/services/CategoryService';
import { useToast } from 'primevue/usetoast';
import { CategoryCreateParam, CategoryData } from '@/types/category';

export default defineComponent({
  props: {
    category: { type: Object, required: true },
    categories: { type: Array, required: true },
  },
  emits: ["updated", "created"],
  setup(props, context) {
    const schema = yup.object({
      name: yup.string().required().label('Category name'),
      description: yup.string().label('Description'),
    });

    const formValues = {  ...props.category } as Record<keyof CategoryCreateParam, any>;
    const { errors, handleSubmit, setFieldValue } = useForm({ validationSchema: schema, initialValues: formValues, });

    const { value: name } = useField<string>("name");
    const { value: description } = useField<string>("description");

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
      const service = new CategoryService();
      const imageService = new BombsightService();

      let values = { ...formValues}

      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value, file.value.name);
        const image = await imageService.upload(formData);
        // setFieldValue("image_url", image.url, { force: true })
        values = { ...values }
      }

      if (props.category?.id) {
        service.put(props.category?.id, values)
          .then((category) => {
            context.emit("updated", category);
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
          .then((newCategory) => {
            context.emit("created", newCategory);
            toast.add({ severity: "success", summary: "Successfull!", detail: "Category created", life: 3000 });
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
      name,
      description,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
