<template>
  <h3 class="p-mb-2">Payment Methods</h3>
  <div class="p-mb-4">Click to edit payment method</div>
  <ProgressSpinner v-if="isLoading" />
  <div v-else class="p-grid gutter-8">
    <div
      class="p-col-12 p-md-6 p-lg-4 p-fluid"
      v-for="payment in paymentMethods"
      :key="payment.id"
    >
      <Button
        class="p-button-link p-p-0 p-text-left p-shadow-2 payment-method-card"
        style="height: 100%;width: 100%;"
        @click="editPaymentMethod(payment)"
      >
        <Card class="" style="height: 100%;width: 100%;">
          <template #header>
            <img :src="payment.image_url" :alt="payment.name" />
          </template>
          <template class="p-text-left" #title>
            <div class="p-d-flex">
              <div>
                {{ payment.name }} <br />
                <span v-if="payment.activated" class="item-activated">
                  <i class="pi pi-check-circle"></i>
                  Active
                </span>
                <span v-else class="item-deactivated">
                  <i class="pi pi-times-circle"></i>
                  Inactive
                </span>
              </div>
            </div>
          </template>
          <template v-if="payment.description" #content>
            <p>{{ payment.description }}</p>
          </template>
          <template #footer> </template>
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
          <div>Add payment method</div>
        </div>
      </Button>
    </div>
  </div>

  <Dialog
    header="Payment Method Details"
    :modal="true"
    class="p-fluid"
    :style="{ width: '450px' }"
    v-model:visible="displayCreateForm"
  >
    <PaymentMethodEditDialog
      @updated="afterUpdatePaymentMethod"
      @created="afterCreatePaymentMethod"
      :paymentMethod="paymentMethod"
    />
    <template #footer>
      <Button
        v-if="paymentMethod"
        class="p-button-text p-button-danger"
        icon="pi pi-trash"
        label="Delete"
        @click="deleteDialog = true"
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="deleteDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span v-if="paymentMethod"
        >Are you sure you want to delete <b>{{ paymentMethod.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text p-button-danger"
        @click="deleteDialog = false"
      />
      <LButton
        :loading="isDeleting"
        loadingLabel="Deeleing"
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="deletePaymentMethod()"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PaymentMethodService from '@/services/PaymentMethodService';
import PaymentMethod from '@/models/PaymentMethod';
import { useToast } from 'primevue/usetoast';
import BombsightService from '@/services/BombsightService';
import PaymentMethodEditDialog from "@/components/settings/PaymentMethodEditDialog.vue";

@Options({
  components: { PaymentMethodEditDialog },
})
export default class PaymentMethods extends Vue {
  displayCreateForm = false;
  submitted = false;
  isLoading = false;
  service = new PaymentMethodService();
  paymentMethods: PaymentMethod[] = [];
  paymentMethod!: PaymentMethod;
  toast = useToast();
  file!: File;
  imageService = new BombsightService();
  deleteDialog = false;
  isDeleting = false;

  mounted() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    new PaymentMethodService("/payment-methods").getAll()
      .then((data) => {
        this.paymentMethods = data.map((cat) => new PaymentMethod(cat))
        this.isLoading = false;
      });
  }

  editPaymentMethod(paymentMethod: PaymentMethod) {
    this.paymentMethod = new PaymentMethod({ ...paymentMethod });
    console.log(this.paymentMethod);
    this.displayCreateForm = true;
  }

  openNew() {
    this.paymentMethod = new PaymentMethod({});
    this.submitted = false;
    this.displayCreateForm = true;
  }
  hideDialog() {
    this.displayCreateForm = false;
    this.submitted = false;
  }

  afterUpdatePaymentMethod(justUpdated: PaymentMethod) {
    this.paymentMethods[this.findIndexById(justUpdated.id)] = justUpdated;
  }

  afterCreatePaymentMethod(justUpdated: PaymentMethod) {
    this.paymentMethods.push(justUpdated);
    this.displayCreateForm = false;
  }

  findIndexById(id: number): number {
    return this.paymentMethods.findIndex((cat) => cat.id === id);
  }

  deletePaymentMethod() {
    this.isDeleting = true;
    this.service.delete(this.paymentMethod.id)
      .then(() => {
        this.paymentMethods.splice(this.findIndexById(this.paymentMethod.id), 1)
        this.deleteDialog = false
        this.toast.add({ severity: "info", detail: "Payment method deleted successfully", life: 3000 })
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

}
</script>

<style>
.payment-method-card:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.payment-methods .p-card .p-card-title {
  font-size: 1.1rem;
}
.payment-methods .p-card .p-card-content {
  padding: 0;
}
</style>