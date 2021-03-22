<template>
  <div class="p-fluid">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="name">Category Image</label>
        <FileUpload
          mode="basic"
          name="file[]"
          :showCancelButton="true"
          chooseLabel="Browse"
          :customUpload="true"
          @uploader="uploadImage"
          accept="image/*"
          :maxFileSize="1000000"
          :auto="true"
          :class="{ 'p-invalid': errors['image_url'] }"
        />
        <small class="p-invalid" v-if="errors['image_url']">
          {{ errors["image_url"] }}
        </small>
      </div>
      <div class="p-col-12 p-md-6">
        <img
          :src="uploadedImage || image_url"
          :alt="name"
          v-if="image_url || uploadedImage"
        />
      </div>
    </div>
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

    <div class="p-field">
      <label class="p-mb-3">Parent Category</label>
      <Dropdown
        :options="categories"
        v-model="parent_id"
        optionLabel="name"
        optionValue="id"
        placeholder="Select Category"
        :filter="true"
        :class="{ 'p-invalid': errors['parent_id'] }"
      />
      <small class="p-invalid" v-if="errors['parent_id']">
        {{ errors["parent_id"] }}
      </small>
    </div>
    <div class="p-d-flex p-fluid">
      <div class="p-col p-d-flex p-field">
        <label for="is_activated">
          <InputSwitch
            id="is_activated"
            class="p-mr-2"
            v-model="is_activated"
            :class="{ 'p-invalid': errors['is_activated'] }"
          />
          Activated
        </label>
        <small class="p-invalid" v-if="errors['is_activated']">
          {{ errors["is_activated"] }}
        </small>
      </div>
      <div class="p-col p-d-flex p-field">
        <label for="is_featured">
          <InputSwitch
            id="is_featured"
            class="p-mr-2"
            v-model="is_featured"
            :class="{ 'p-invalid': errors['is_featured'] }"
          />
          Featured
        </label>
        <small class="p-invalid" v-if="errors['is_featured']">
          {{ errors["is_featured"] }}
        </small>
      </div>
    </div>
    <div class="p-field">
      <label for="description">Tags</label>
      <Chips
        id="description"
        v-model="tags"
        required="true"
        separator=","
        :addOnBlur="true"
        :allowDuplicate="false"
        :class="{ 'p-invalid': errors['tags'] }"
      />
      <small class="p-invalid" v-if="errors['tags']">
        {{ errors["tags"] }}
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
/* eslint-disable */

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
      is_activated: yup.bool().label('Activated'),
      is_featured: yup.bool(),
      parent_id: yup.number().oneOf([undefined, ...(props.categories as CategoryData[]).map((cat) => cat.id)]),
      image_url: yup.string().when("is_featured", { is: true, then: yup.string().required("The category image is required when the category is featured") }),
      tags: yup.array().of(yup.string()).required("Category tags are required"),
    });

    const formValues = { is_featured: false, ...props.category, tags: props.category.tags.split(",") } as Record<keyof CategoryCreateParam, any>;
    const { errors, handleSubmit, setFieldValue } = useForm({ validationSchema: schema, initialValues: formValues, });

    const { value: name } = useField<string>("name");
    const { value: description } = useField<string>("description");
    const { value: is_activated } = useField<boolean>("is_activated");
    const { value: is_featured } = useField<boolean>("is_featured");
    const { value: parent_id } = useField<number>("parent_id");
    const { value: image_url } = useField<string>("image_url");
    const { value: tags } = useField<string>("tags");

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

      let values = { ...formValues, tags: formValues.tags?.join(",") }

      if (file.value) {
        const formData = new FormData();
        formData.append('file', file.value, file.value.name);
        const image = await imageService.upload(formData);
        setFieldValue("image_url", image.url, { force: true })
        values = { ...values, image_url: image.url }
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
      is_activated,
      is_featured,
      parent_id,
      image_url,
      tags,
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
