<template>
  <Form :validation-schema="schema.validation" :initial-values="schema.values">
    <div class="p-grid p-nogutter">
      <div
        :class="'p-col-12 p-field p-fluid ' + (fieldGroupClass ?? '')"
        v-for="{
          as: tagName,
          name,
          label,
          children,
          fieldGroupClass,
          ...attrs
        } in schema.fields"
        :key="name"
      >
        <label :for="name">{{ label }}</label>
        <Field
          v-if="tagName === 'textarea'"
          :name="name"
          v-bind="attrs"
          v-slot="{ field }"
          :validateOnInput="true"
        >
          <Textarea v-bind="field" :id="name" />
        </Field>
        <Field
          v-else
          :as="tagName"
          :id="name"
          :name="name"
          class="p-inputtext p-component p-filled"
          v-bind="attrs"
          :validateOnInput="true"
        >
          <template v-if="children && children.length">
            <component
              v-for="({ tag, text, ...childAttrs }, idx) in children"
              :key="idx"
              :is="tag"
              v-bind="childAttrs"
            >
              {{ text }}
            </component>
          </template>
        </Field>
        <small class="p-invalid">
          <ErrorMessage :name="name" />
        </small>
      </div>
      <slot></slot>
      <div class="p-field p-fluid p-text-center">
        <button class="p-button p-component">Submit</button>
      </div>
    </div>
  </Form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
// import { Form, Field, ErrorMessage } from 'vee-validate';
// import { FormSchema } from '@/types/dynamicForm';

export default defineComponent({
  name: 'DynamicForm',
  // components: { Form, Field, ErrorMessage },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      multiselectValues: reactive<Record<string, any>>({}),
      multiselectOptions: reactive<Record<string, any[]>>({})
    };
  },
  mounted() {
    // const multiSelectFields = (this.schema as FormSchema).fields.filter((field) => field.as == 'select' && field.multiple);
    // multiSelectFields.forEach((field) => {
    //   this.multiselectValues[field.name] = this.schema.values[field.name]
    // })
    // multiSelectFields.forEach((field) => {
    //   this.multiselectOptions[field.name] = field.options;
    // })
  }
})
</script>