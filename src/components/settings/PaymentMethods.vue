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
            {{ payment.name }}
            <i
              v-if="payment.activated"
              class="pi pi-check-circle"
              style="color: var(--primary-color)"
            ></i>
          </template>
          <template v-if="payment.description" #content>
            <p>{{ payment.description }}</p>
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
          <span class="pi pi-pw pi-plus" style="fontSize: 3rem"></span>
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
    <div class="p-fluid p-field">
      <label for="name">Name</label>
      <InputText
        id="name"
        name="name"
        type="text"
        v-model.trim="paymentMethod.name"
        :class="{ 'p-invalid': submitted && !paymentMethod.name }"
      />
    </div>
    <div class="p-fluid p-field">
      <label for="description">Description</label>
      <Textarea
        id="description"
        name="description"
        v-model="paymentMethod.description"
      />
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-col p-fluid p-field p-mr-2">
        <label for="name">Image</label>
        <image :src="file" />
        <!-- <FileUpload
          mode="basic"
          name="file[]"
          :customUpload="true"
          @uploader="uploadImage"
          accept="image/*"
          :maxFileSize="1000000"
          :auto="true"
        /> -->
        <input name="image" @change="uploadImage" type="file" />
      </div>
      <div class="p-col p-fluid p-field">
        <label for="name">Activated</label>
        <InputSwitch class="p-d-block" v-model="paymentMethod.activated" />
      </div>
    </div>
    <template #footer>
      <Button
        class="p-button-text"
        icon="pi pi-save"
        @click="savePaymentMethod"
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
import PaymentMethodService from '@/services/PaymentMethodService';
import PaymentMethod from '@/models/PaymentMethod';
import { useToast } from 'primevue/usetoast';
import BombsightService from '@/services/BombsightService';

@Options({
  components: { MainLayout, },
})
export default class PaymentMethods extends Vue {
  displayCreateForm = false;
  submitted = false;
  isLoading = false;
  paymentMethodService = new PaymentMethodService();
  paymentMethods: PaymentMethod[] = [];
  paymentMethod!: PaymentMethod;
  toast = useToast();
  file!: File;
  imageService = new BombsightService();

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.getData();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  getData() {
    this.isLoading = true;
    new PaymentMethodService("/payment-methods").getAll()
      .then((data) => {
        this.paymentMethods = data.map((cat) => new PaymentMethod(cat))
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({ severity: "error", summary: "There was an error fetching the payment methods", detail: "Please check your internet connection and refresh the page" })
        console.log(e);
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

  savePaymentMethod() {
    this.submitted = true;
    this.isLoading = true;

    if (this.paymentMethod.name.trim()) {
      if (this.paymentMethod.id) {
        this.saveFiletoBombsight().then(() => {
          // udpate
          this.paymentMethodService.update(this.paymentMethod.id, this.paymentMethod.toCreateParam())
            .then((newPaymentMethod) => {
              this.paymentMethod = new PaymentMethod(newPaymentMethod);
              this.paymentMethods[this.findIndexById(this.paymentMethod.id)] = this.paymentMethod;
              this.isLoading = false;
              this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Payment Method Updated', life: 3000 });
            }).catch(() => {
              this.toast.add({ severity: 'error', summary: 'Error', detail: 'Updating failed', life: 3000 });
            }).finally(() => {
              this.isLoading = false
            });
        })

      } else {
        this.saveFiletoBombsight().then(() => {
          //create
          this.paymentMethodService.create(this.paymentMethod.toCreateParam())
            .then((newPaymentMethod) => {
              this.paymentMethod = new PaymentMethod(newPaymentMethod);
              this.paymentMethods.push(this.paymentMethod);
              this.toast.add({ severity: 'success', summary: 'Successful', detail: 'Payment Method Created', life: 3000 });
            }).catch(() => {
              this.toast.add({ severity: 'error', summary: 'Error', detail: 'Creating failed', life: 3000 });
            }).finally(() => {
              this.isLoading = false
            });

        })
      }

      this.displayCreateForm = false;
    }

  }

  findIndexById(id: number): number {
    return this.paymentMethods.findIndex((cat) => cat.id === id)
  }

  // eslint-disable-next-line
  uploadImage(event: any) {
    //event.files == files to upload
    this.file = (event.target.files as FileList)[0];
  }
  // // eslint-disable-next-line
  // uploadImage(event: any) {
  //   //event.files == files to upload
  //   console.log("My File", event.files);
  //   this.file = event.files[0].objectURL;
  //   console.log("My File url", this.file);
  // }

  async saveFiletoBombsight() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      const image = await this.imageService.upload(formData);
      // eslint-disable-next-line
      this.paymentMethod.image_url = image.url;
    }
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