<template>
  <Accordion class="specification-card" :activeIndex="activeTab">
    <AccordionTab v-for="(spec, index) in datasource" :key="spec[0]">
      <template #header>
        <div class="p-d-flex p-ai-center p-jc-between title-action">
          <div class="title">
            {{ datasource[index][0] }}
          </div>
          <div class="actions p-ml-auto">
            <Button
              icon="pi pi-trash"
              @click="deleteSpec(index)"
              class="p-button-outlined p-button-danger"
            />
          </div>
        </div>
      </template>
      <div class="p-d-flex p-fluid">
        <div class="p-field p-mr-2">
          <label>{{ keyLabel }}</label>
          <InputText
            :class="{ 'p-invalid': invalidIndex.includes(index) }"
            v-model="datasource[index][0]"
            autoFocus
            @input="updateSpec()"
          />
          <small v-show="invalidIndex.includes(index)" class="p-invalid"
            >You need to specify a key</small
          >
        </div>
        <div class="p-field">
          <label>{{ valueLabel }}</label>
          <InputText
            :class="{ 'p-invalid': invalidIndex.includes(index) }"
            v-model="datasource[index][1]"
            @input="updateSpec()"
          />
        </div>
      </div>
    </AccordionTab>
  </Accordion>
  <div class="p-fluid p-text-center">
    <Button
      @click="createEntry"
      class="p-button-secondary p-button-outlined"
      icon="pi pi-add"
      :label="buttonLabel"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: {},
    },
    buttonLabel: {
      type: String,
      default: "Create an entry",
    },
    keyLabel: {
      type: String,
      default: "Key",
    },
    valueLabel: {
      type: String,
      default: "Value",
    },
  },
})
export default class SpecificationCard extends Vue {
  modelValue!: Record<string, string>;
  buttonLabel!: string;
  keyLabel!: string;
  valueLabel!: string;
  datasource: string[][] = [];
  activeTab: number | null = null;
  invalidIndex: number[] = [];

  mounted() {
    this.datasource = this.toDatasource();
  }

  toDatasource() {
    return Object.keys(this.modelValue).map((key) => [key, this.modelValue[key]])
  }

  toSpec(data: Map<string, string> | string[][]) {
    return Object.fromEntries(data);
  }

  validateFields() {
    const invalidSpecs = this.datasource.filter((spec) => spec[0].trim() === "");
    this.invalidIndex = invalidSpecs.map((spec) => {
      return this.datasource.findIndex((element) => element == spec);
    });
  }

  get isInvalid() {
    return this.invalidIndex.length > 0;
  }

  createEntry() {
    // add to list
    this.datasource.push(["", ""]);
    // activate tab
    this.activeTab = this.datasource.length - 1
  }

  // eslint-disable-next-line
  updateSpec() {
    this.validateFields();
    if (!this.isInvalid) {
      this.$emit('update:modelValue', this.toSpec(this.datasource));
    }
  }

  deleteSpec(specIndex: number) {
    this.datasource.splice(specIndex, 1)
    this.updateSpec();
  }

  // TODO: Validate if form is empty or not
}

/*
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);
// now prices = { banana: 1, orange: 2, meat: 4 }

let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
*/
</script>

<style scoped>
.title-action {
  width: 100%;
}
</style>