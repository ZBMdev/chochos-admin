<template>
  <h3 class="p-mb-2">Delivery Methods</h3>
  <div class="p-mb-4">Click to edit delivery method</div>
  <ProgressSpinner v-if="isLoading" />
  <div v-else class="p-grid gutter-8">
    <div
      class="p-col-12 p-md-6 p-lg-4 p-fluid"
      v-for="delivery in deliveryMethods"
      :key="delivery.id"
    >
      <Button
        class="p-button-link p-p-0 p-text-left p-shadow-2 delivery-method-card"
        style="height: 100%;width: 100%;"
        @click="editDeliveryMethod(delivery)"
      >
        <Card class="" style="height: 100%;width: 100%;">
          <template class="p-text-left" #title>
            {{ delivery.name }} <br />
            <span v-if="delivery.activated" class="item-activated">
              <i class="pi pi-check-circle"></i>
              Active
            </span>
            <span v-else class="item-deactivated">
              <i class="pi pi-times-circle"></i>
              Inactive
            </span>
          </template>
          <template #content>
            <p>{{ delivery.description }}</p>
            <div class="">Delivery Fee: {{ delivery.amount }}</div>
          </template>
        </Card>
      </Button>
    </div>
    <div class="p-col-12 p-md-6 p-lg-4 p-fluid">
      <Button
        class="p-button-outlined p-button-secondary"
        style="height: 100%"
        @click="openNew"
      >
        <div
          class="p-d-flex p-flex-column p-mr-auto p-ml-auto p-ai-stretch p-jc-center p-text-center"
        >
          <span class="pi pi-pw pi-plus" style="fontSize: 1.5rem"></span>
          <div>Add delivery method</div>
        </div>
      </Button>
    </div>
  </div>

  <Dialog
    header="Delivery Method Details"
    :modal="true"
    class="p-fluid"
    :style="{ width: '450px' }"
    v-model:visible="displayCreateForm"
  >
    <div class="p-fluid p-field">
      <label for="name">Name</label>
      <InputText
        id="name"
        name="name"
        type="text"
        v-model.trim="deliveryMethod.name"
        :class="{ 'p-invalid': submitted && !deliveryMethod.name }"
      />
    </div>
    <div class="p-fluid p-field">
      <label for="description">Description</label>
      <Textarea
        id="description"
        name="description"
        v-model="deliveryMethod.description"
      />
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-fluid p-field p-col p-mr-2">
        <label for="amount">Delivery Fee</label>
        <InputNumber
          id="amount"
          name="amount"
          v-model="deliveryMethod.amount"
          mode="currency"
          currency="NGN"
          locale="en-NG"
          :min="0"
          :class="{ 'p-invalid': submitted && deliveryMethod.amount < 0 }"
        />
      </div>
      <div class="p-fluid p-field p-col">
        <label for="name">Activated</label>
        <InputSwitch class="p-d-block" v-model="deliveryMethod.activated" />
      </div>
    </div>
    <template #footer>
      <Button
        class="p-button-text"
        icon="pi pi-save"
        @click="saveDeliveryMethod"
        label="Save"
      />
      <Button
        class="p-button-danger p-button-text"
        icon="pi pi-times"
        @click="hideDialog"
        label="Close"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import DeliveryMethodService from '@/services/DeliveryMethodService';
import DeliveryMethod from '@/models/DeliveryMethod';
import { useToast } from 'primevue/usetoast';
import { reactive } from 'vue';

@Options({
  components: { MainLayout, },
})
export default class DeliveryMethods extends Vue {
  displayCreateForm = false;
  submitted = false;
  isLoading = false;
  deliveryMethodService = new DeliveryMethodService();
  deliveryMethods: DeliveryMethod[] = [];
  deliveryMethod!: DeliveryMethod;
  toast = useToast();

  mounted() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    new DeliveryMethodService("/delivery-methods").getAll()
      .then((data) => {
        this.deliveryMethods = reactive(data.map((cat) => new DeliveryMethod(cat))) as DeliveryMethod[];
        this.isLoading = false;
      });
  }

  editDeliveryMethod(deliveryMethod: DeliveryMethod) {
    this.deliveryMethod = reactive(new DeliveryMethod({ ...deliveryMethod }));
    console.log(this.deliveryMethod);
    this.displayCreateForm = true;
  }

  openNew() {
    this.deliveryMethod = reactive(new DeliveryMethod({}));
    this.submitted = false;
    this.displayCreateForm = true;
  }
  hideDialog() {
    this.displayCreateForm = false;
    this.submitted = false;
  }

  saveDeliveryMethod() {
    this.submitted = true;
    this.isLoading = true;

    if (this.deliveryMethod.name.trim()) {
      if (this.deliveryMethod.id) {
        // udpate
        this.deliveryMethodService.update(this.deliveryMethod.id, this.deliveryMethod.toCreateParam())
          .then((newDeliveryMethod) => {
            this.deliveryMethod = reactive(new DeliveryMethod(newDeliveryMethod));
            this.deliveryMethods[this.findIndexById(this.deliveryMethod.id)] = this.deliveryMethod;
            this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Delivery Method Updated', life: 3000 });
          }).catch(() => {
            this.toast.add({ severity: 'error', summary: 'Error', detail: 'Updating failed', life: 3000 });
          }).finally(() => {
            this.isLoading = false
          });
      }

      else {
        //create
        this.deliveryMethodService.create(this.deliveryMethod.toCreateParam())
          .then((newDeliveryMethod) => {
            this.deliveryMethod = reactive(new DeliveryMethod(newDeliveryMethod));
            this.deliveryMethods.push(this.deliveryMethod);
            this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Delivery Method Created', life: 3000 });
          }).catch(() => {
            this.toast.add({ severity: 'error', summary: 'Error', detail: 'Creating failed', life: 3000 });
          }).finally(() => {
            this.isLoading = false
          });
      }

      this.displayCreateForm = false;
    }

  }

  findIndexById(id: number): number {
    return this.deliveryMethods.findIndex((cat) => cat.id === id)
  }
}
</script>

<style>
.delivery-method-card:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.delivery-methods .p-card .p-card-title {
  font-size: 1.1rem;
}
.delivery-methods .p-card .p-card-content {
  padding: 0;
}
</style>