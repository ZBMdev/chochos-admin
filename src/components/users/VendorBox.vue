<!--<template>
  <div class="p-fluid">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="name">Vendor Image</label>
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
        v-model.trim="fullName"
        required="true"
        autofocus
      />
      <small class="p-invalid" v-if="errors['fullName']">
        {{ errors["fullName"] }}
      </small>
    </div>
    <div class="p-field">
      <label for="address">Address</label>
      <Textarea
        id="address"
        v-model="address"
        required="true"
        rows="3"
        cols="20"
        :class="{ 'p-invalid': errors['address'] }"
      />
      <small class="p-invalid" v-if="errors['address']">
        {{ errors["address"] }}
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
      <label for="languages">Languages</label>
      <InputText
        id="languages"
        v-model.trim="languages"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['languages'] }"
      />
      <small class="p-invalid" v-if="errors['languages']">
        {{ errors["languages"] }}
      </small>
    </div>

    <div class="p-field">
      <label for="rating">Reviews</label>
      <InputText
        id="rating"
        v-model.trim="rating"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['rating'] }"
      />
      <small class="p-invalid" v-if="errors['rating']">
        {{ errors["rating"] }}
      </small>
    </div>

    <div class="p-field">
      <label for="lastLogin">Last Login</label>
      <InputText
        id="lastLogin"
        v-model.trim="lastLogin"
        required="true"
        autofocus
        :class="{ 'p-invalid': errors['lastLogin'] }"
      />
      <small class="p-invalid" v-if="errors['lastLogin']">
        {{ errors["lastLogin"] }}
      </small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import VendorService from '@/services/VendorService';
import { VendorData } from "@/types/vendors"

export default defineComponent({
  props: {
    vendor: { type: Object, required: true },
    vendors: { type: Array, required: true },
  },

  setup(props, context) {
    const schema = yup.object({
      fullName: yup.string().required().label("Vendor's name"),
      address: yup.string().label('Address'),
      email: yup.string().label('email'),
      languages: yup.string().label('languages'),
      rating: yup.number().label('rating'),
      lastLogin: yup.string().label('lastLogin'),
      username: yup.string().label('username'),
      image_url: yup.string().when("is_featured", { is: true, then: yup.string().required("The category image is required when the category is featured") }),
    });

    const { value: fullName } = useField<string>("fullName");
    const { value: email } = useField<string>("email");
    const { value: username } = useField<string>("username");
    const { value: address } = useField<string>("address");
    const { value: rating } = useField<number>("rating");
    const { value: image_url } = useField<string>("image_url");
    const { value: languages } = useField<string>("languages");
    const { value: lastLogin } = useField<Date>("lastLogin");


     return {
      fullName,
      email,
      languages,
      rating,
      address,
      image_url,
      lastLogin,
      username
    };
  }
})


/*
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
  setup(props, context) {
    const schema = yup.object({
      fullName: yup.string().required().label("Vendor's name"),
      address: yup.string().label('Address'),
      email: yup.string().label('email'),
      languages: yup.string().label('languages'),
      rating: yup.number().label('rating'),
      lastLogin: yup.string().label('lastLogin'),
      username: yup.string().label('username'),
      is_activated: yup.bool().label('Activated'),
      is_featured: yup.bool(),
      parent_id: yup.number().oneOf([undefined, ...(props.categories as CategoryData[]).map((cat) => cat.id)]),
      image_url: yup.string().when("is_featured", { is: true, then: yup.string().required("The category image is required when the category is featured") }),
      tags: yup.array().of(yup.string()).required("Category tags are required"),
    });

    const formValues = { is_featured: false, ...props.category, tags: props.category.tags.split(",") } as Record<keyof CategoryCreateParam, any>;
    const { errors, handleSubmit, setFieldValue } = useForm({ validationSchema: schema, initialValues: formValues, });

    const { value: name } = useField<string>("name");
    const { value: email } = useField<string>("description");
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
}); */
</script>

<style lang="scss" scoped>
</style>
-->

<template>
  <div class="p-fluid">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="name">Vendor Image</label>
      </div>  
      <div class="p-col-12 p-md-6">
        <img
          :src="vendor.photoUrl"
          :alt="name"
        />
      </div>
    </div>
    <div>
      <div class="p-field p-fluid">
        <label>
          Name
        </label>
        <InputText @input="syncVendor" v-model="vendor.fullName"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Username
        </label>
        <InputText @input="syncVendor" v-model="vendor.username"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Email
        </label>
        <InputText @input="syncVendor" v-model="vendor.email"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Address
        </label>
        <InputText @input="syncVendor" v-model="vendor.address"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Mobile
        </label>
        <InputText @input="syncVendor" v-model="vendor.mobile"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Reviews
        </label>
        <InputText @input="syncVendor" v-model="vendor.rating"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Languages
        </label>
        <InputText @input="syncVendor" v-model="vendor.languages"></InputText>
      </div>
      <div class="p-field p-fluid">
        <label>
          Last Login
        </label>
        <InputText @input="syncVendor" v-model="vendor.lastLogin"></InputText>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Vendor from '@/models/Vendor';
import VendorService from '@/services/VendorService';
import { VendorData } from '@/types/vendors'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import DynamicForm from "@/components/elements/DynamicForm.vue";
import { profileFormSchema, passwordFormSchema } from '@/models/Admin';
/* eslint-disable */


export default defineComponent({
  name: "VendorBox",
  emits: ['update:modelValue', "vendor-updated"],
  props: {
    modelValue: {
      type: Object,
      required: true,
    }
  },
  //   modelValue: {} as AdminUpdateParam,
  data() {
    return {
      vendor: {} as VendorData,
      service: new VendorService(),
      isLoading: false,
    }

  },
  mounted() {
    this.getData();
    this.vendor = reactive<VendorData>({
      id: this.modelValue.id,
      fullName: this.modelValue.fullName,
      username: this.modelValue.username,
      address: this.modelValue.address,
      email: this.modelValue.email,
      languages: this.modelValue.languages,
      rating: this.modelValue.rating,
      mobile: this.modelValue.mobile,
      photoUrl: this.modelValue.photoUrl,
      lastLogin: this.modelValue.lastLogin
    } as unknown as VendorData);
  },
  methods: {
    getData() {
      this.isLoading = true;
    },
    // eslint-disable-next-line
    syncVendor(event: any) {
      this.$emit("update:modelValue", this.vendor)
    }

  }
});
</script>

