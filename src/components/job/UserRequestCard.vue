<template>
  <!-- <PageHeading :title="`${.fullName} request`" style="display:flex; justify-content: center; margin-bottom: 30px" /> -->
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else id="hero"> 
    <div class="requestCard">
      <div class="about">
        <h4> Customer </h4>
        <div class="customer-card">
          <img :src="customerImg">
          <p> {{ customerName}} </p>
        </div>
      </div>
      <div class="about">
        <h4> Executor </h4>
        <div class="executor-card">
          <img :src="executorImg">
          <p> {{ executorName }} </p>
        </div>
      </div>
      <div class="about">
        <h4> Request title </h4>
        <p class="about-card">
          {{ requestTitle }}
        </p>
      </div>
      <div class="about">
        <h4> Location </h4>
        <p class="about-card">
          {{ location }}
        </p>
      </div>
      <div class="about">
        <h4> Workman Fee </h4>
        <p class="about-card">
          {{ formatCurrency( workmanFee) }}
        </p>
      </div>
    </div> 
      <h3>Products </h3>
      <div class="products-table">
        <DataTable
            class="p-datatable-responsive p-datatable-sm"
            :value="requests"
            :paginator="true"
            :rows="10"
            v-model:filters="filters"
            filterDisplay="row" 
            :globalFilterFields="['productName','product.description','quantity','unitPrice', 'totalPrice']"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50, 100, 200]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            :scrollable="true"
            :rowHover="true"
            responsiveLayout="scroll"
            @row-click="openProduct($event.data)"
          >
            <!-- <template #header>
              <div class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filters['global'].value"
                    placeholder="Search..."
                  />
                </span>
              </div>
            </template> -->
            <template #empty>
              No product found.
            </template>
            <template #loading>
              Loading products. Please wait.
            </template>

            <Column
              field="productName"
              style="min-width: 14rem; height: 48px;"
              headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
              header="Name"
              sortable
              filterMatchMode="contains"
            >
            </Column>
            <Column
              field="product.description"
              style="min-width: 14rem; height: 48px;"
              headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
              header="Description"
              sortable
              filterMode="contains"
            >
              <template #body="slotProps">
                <span v-if="slotProps.data.product.description != null" v-html="`${slotProps.data.product.description?.substr(0, 15)}...`"
                ></span>
              </template>
            </Column>
            <Column
              field="quantity"
              style="min-width: 10rem"
              headerStyle="min-width: 10rem; height: 50px; font-weight: bold;"
              header="Quantity"
              sortable
            >
              <template #body="slotProps">
                {{ slotProps.data.quantity }}
              </template>
            </Column>
            <Column
              field="unitPrice"
              style="min-width: 14rem; height: 48px;"
              headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
              header="Price"
              sortable
            >
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.unitPrice) }}
            </template>
          </Column>
          <Column
              field="totalPrice"
              style="min-width: 14rem; height: 48px;"
              headerStyle="min-width: 14rem; height: 50px; font-weight: bold;"
              header="Total"
              sortable
            >
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.totalPrice) }}
            </template>
          </Column>

          <template #footer>
            <div class="p-d-flex p-jc-between" id="amount">
              <span class="p-column-title">Amount Due</span>
              <span>
                {{ formatCurrency( grandSum ) }}
              </span>
            </div>
            <div class="p-d-flex p-jc-between" id="amount">
              <span class="p-column-title">Workman Fee</span>
              <span>
                {{ formatCurrency( workmanFee) }}
              </span>
            </div>
            <div class="p-d-flex p-jc-between" id="amount">
              <span class="p-column-title">Total Amount</span>
              <span>
                <!-- {{ formatCurrency( grandSum + workmanFee) }} -->
                {{ formatCurrency( grandTotal) }}
              </span>
            </div>
          </template>
        </DataTable>
      </div>
    
    <!-- <div id="card-holder">
      <div v-for="user in requests" :key="user" id="userCard" class="p-col-12 p-md-6">
        <div
          class="p-text-center"
          :value="requests"
          id="userCard2"
        >
          <div class="products">
              <div class="product-details">
                  <div class="productImgs">
                      <div v-for="productImg in user.product.productImages.slice(0,1)" :key="productImg" class="productImg">
                        <img v-if="productImg.url != null && productImg.url" :src="productImg.url" alt="image" id="BigImg">
                        <img v-else src="assets/images/default-placeholder-image.png" >
                      </div>
                  </div>
                  <h4 class="name"> {{ user.productName }} </h4>
                  <div class="description">
                    <h4>Description </h4>
                    <p class="description-card">
                      {{ user.product.description }}
                    </p>
                  </div>
                  <div class="quantity">
                    <h4> Quantity </h4>
                    <p>
                      {{ user.quantity }}
                    </p>
                  </div>
                  <div class="price">
                    <h4>Unit price</h4>
                    <p>
                      {{ formatCurrency(user.unitPrice) }}
                    </p>
                  </div>
                  <div class="price">
                    <h4>Total</h4>
                    <p>
                      {{ formatCurrency(user.totalPrice) }}
                    </p>
                  </div>
                  
                  <div class="rating">
                    <h4> Product rating </h4>
                    <Rating
                      :modelValue="user.product.rating"
                      :readonly="true"
                      :cancel="false"
                      :stars="5"
                      class="ratingNumber"
                    />
                  </div>
                  <img :src="user.product.productImages.url" alt="">
                </div>
              </div>
            </div>
        </div>
    </div> -->

    <Dialog
      v-model:visible="productDialog"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}"
      :style="{width: '450px'}"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <div>
        <div class="p-field p-fluid">
          <label>
           Name
          </label>
          <InputText
            v-model="request.productName"
          >
          </InputText>
         </div>
        <div class="p-field p-fluid">
          <label>
           Description
          </label>
          <InputText
            v-model="request.product.description"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Quantity
          </label>
          <InputText
            v-model="request.quantity"
          >
          </InputText>
        </div>
        <div class="p-field p-fluid">
          <label>
            Price
          </label>
         <InputNumber
            v-model="request.unitPrice"
            mode="currency"
            currency="NGN"
            locale="en-NG"
          >
          </InputNumber>
        </div>
        <div class="p-field p-fluid">
          <label>
            Total
          </label>
          <InputNumber
            v-model="request.totalPrice"
            mode="currency"
            currency="NGN"
            locale="en-NG"
          >
          </InputNumber>
        </div>
        <div class="p-field p-fluid">
          <label>
            Amount Due
          </label>
          <InputNumber
            v-model="grandSum"
            mode="currency"
            currency="NGN"
            locale="en-NG"
          >
          </InputNumber>
        </div>
        <div class="p-field p-fluid">
          <label>
            Workman Fee
          </label>
          <InputNumber
            v-model="workmanFee"
            mode="currency"
            currency="NGN"
            locale="en-NG"
          >
          </InputNumber>
        </div>
        <div class="p-field p-fluid">
          <label>
            Total Amount
          </label>
          <InputNumber
            v-model="grandTotal"
            mode="currency"
            currency="NGN"
            locale="en-NG"
          >
          </InputNumber>
        </div>
      </div> 
    </Dialog>

  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import UserRequestModel from '@/models/UserRequest';
import JobRequestService from '@/services/JobRequestService';
import { JobRequestData } from '@/types/jobRequest'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
import {FilterMatchMode} from 'primevue/api';


export default class UserRequestCard extends Vue {

  isLoading = false;
  requests: UserRequestModel[] = [];
  request!: UserRequestModel;
  // request = reactive(new UserRequestModel({})) as UserRequestModel;
  productImg: [] = [];
  datasource: UserRequestModel[] = [];
  totalRecords = 0;
  service: JobRequestService = new JobRequestService();
  selectedrequests: UserRequestModel[] = [];
  filters = {
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
  };
  matchModeOptions =  [
    {label: 'Starts With', value: FilterMatchMode.STARTS_WITH}
  ]
  submitted = false;
  productDialog = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  // lazyParams: Partial<VendorLazyParameters> = {};
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  requestTitle= '';
  description = '';
  location = '';
  workmanFee = 0;
  customerName = '';
  executorName = '';
  customerImg = '';
  executorImg = '';
  grandSum = 0;
  grandTotal = 0;
  auto_animate= true;
  interval = 0;
  active_slide = 1;
  productDesc = '';

  created() {
    // console.log("here");
    // if (this.auto_animate) {
    //   this.interval = setInterval(() => {
    //     this.active_slide =
    //       this.active_slide == this. product.productImages.length
    //         ? 1
    //         : (this.active_slide + 1) % (this.cards.length + 1);
    //   }, 5000);
    // }
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.thereIsAnID) {
          this.getData();
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  }

  get thereIsAnID() {
    return !!this.$route.params.id
  }

  getData() {
    this.getRequest();
  }

  getRequest() {
    this.isLoading = true;
    this.service.getUserRequest(+this.$route.params.id)
      .then((data) => {
        this.requests = data.jobRequest.billOfQuantities.map((prod) => new UserRequestModel(prod))
        this.requestTitle = data.jobRequest.name;
        this.description = data.jobRequest.description;
        this.location = data.jobRequest.jobLocation;
        this.workmanFee = data.jobRequest.workManFee;
        this.customerName = data.jobRequest.customer.fullName;
        this.executorName = data.jobRequest.executor.fullName;
        this.customerImg = data.jobRequest.customer.photoUrl;
        this.executorImg = data.jobRequest.executor.photoUrl;
        this.workmanFee = data.jobRequest.workManFee;
        this.grandSum = data.jobRequest.billOfQuantities.reduce((acc, obj) => {
          return acc += obj.totalPrice;
          }, 0);
        this.grandTotal = this.grandSum + this.workmanFee;
        // this.productDesc = data.jobRequest.billOfQuantities.reduce((acc, obj) => {
        //   return acc = obj.product.description;
        // }, 0)
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading job request",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  thisImage(smallImg: any) {
    let fullImg = document.getElementById("BigImg");
    fullImg = smallImg;
  }

  openProduct(request: UserRequestModel) {
    this.request = request;
    this.productDialog = true;
  }
  
  // getotalAmount() {
  //       // return `${this.billOfQuantities.totalPrice}`
  //       const sumAmount: number = this.billOfQuantities.reduce((acc, obj) => {
  //           return acc += obj.totalPrice;
  //       }, 0)
  //       return sumAmount;
  //   }
  // activate(id: number) {
  //   const active_slide = ;
  // }

}
</script>

<style scoped>
.p-card{
  border-radius: 20px;
}
/* #hero{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
} */
.allProducts{
  width: 70%;
}
.requestCard {
  padding: 20px;
  /* width: 20%; */
  width: 400px;
  background: white;
  border-radius: 10px;
  /* box-shadow: whitesmoke; */
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  margin-top: 20px;
  margin-bottom: 150px;
  margin-left: auto;
  margin-right: auto;
}
.requestCard p {
  font-weight: 600;
}
.requestCard p span {
  font-weight: lighter;
}
.customer-card, .executor-card {
  background: rgb(209, 202, 209);
  color: rgb(100, 87, 100);
  padding: 10px;
  border-radius: 5px;
  margin-top: -10px;
  margin-bottom: -10px;
  text-align: left;
  display: flex;
}
.customer-card img, .executor-card img{
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-top: 10px;
}
.customer-card p, .executor-card p{
  margin-left: 5px;
}

#hero h3{
  display: flex;
  justify-content: center;
}

#card-holder {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#userCard{
  display: flex;
  justify-content: center;
}
.products {
  display: flex;
  justify-content: center;
}
.products-table {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  margin-bottom: 100px;
  width: 100%;
}

.p-datatable-responsive  { 
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  padding: 10px;
}
#amount{
  font-weight: bold;
  margin: 10px;
}
.product-details{
  width: 400px;
  background: white;
  border-radius: 10px;
  /* box-shadow: whitesmoke; */
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  margin-top: 15px;
  /* margin-bottom: 150px; */
  margin-left: auto;
  margin-right: auto;
}

.productImg, .productImgs {
  border-radius: 10px 10px 0 0;
  height: 150px;
  overflow: hidden;
}
.productImg .img{
  border-radius: 10px 10px 0 0;
}
.small{
  display: flex;
  justify-content: center;
}
/* .smallImg{
  display: flex;
  justify-content: center;
  margin-top: -260px;
} */
.smallImg img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* display: flex;
  justify-content: center; */
}
.name{
  display: flex;
  justify-content: center;
  padding: 10px;
}
.description, .about {
  display: grid;
  padding: 10px;
  margin-top: -10px;
}
.description h4, .about h4{
  text-align: left;
}
.description-card, .about-card {
  background: rgb(209, 202, 209);
  color: rgb(100, 87, 100);
  padding: 10px;
  border-radius: 5px;
  margin-top: -10px;
  margin-bottom: -10px;
  text-align: left;
}
.price, .quantity{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: -10px;
}
.rating, .status {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-top: -10px;
}
.ratingNumber {
  margin-top: 10px;
}
#avatar{
  margin-top: -95px;
  background: rgb(209, 202, 209);
  color: purple;
  width:8rem;
  height:8rem;
  font-size:4rem;
  border-radius: 50%;
}

.email{
  display: flex;
  justify-content: center;
  margin-top: -5px;
  font-weight: 500;
}
.mobile{
  display: flex;
  justify-content: center;
  margin-top: -5px;
  font-size: 14px;
}
#details span{
  display: flex;
  justify-content: center;
  font-size: 12px;
}
#details span i {
  margin-right: 10px;
}
#details span p {
  margin-top: 0;
}
.details2{
  padding: 15px;
}
.active {
  background: rgb(178, 228, 178);
  color: green;
  padding: 5px 10px;
  border-radius: 10px;
}
.block {
  background: rgb(240, 202, 202);
  color: red;
  padding: 5px 10px;
  border-radius: 10px;
}
@media only screen and (max-width: 766px){
  .requestCard {
    width: 340px;
    margin: auto;
  }
  .product-details {
    width: 340px;
  }
}
</style>
