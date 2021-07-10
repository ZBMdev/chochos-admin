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
      <!-- <div class="about">
        <h4> Cost of items </h4>
        <p class="about-card">
          {{ formatCurrency( sumAmount) }}
        </p>
      </div> -->
      <p>Total Charge: <span> {{ formatCurrency( totalAmount) }} </span> </p> 
      <!-- <div v-for="price in requests" :key="price">
        <p> {{ price.totalPrice+ }} </p>
      </div>12 -->
    </div> 
    <h3>Products </h3>
    <div id="card-holder">
      <div v-for="user in requests" :key="user" id="userCard" class="p-col-12 p-md-6">
        <div
          class="p-text-center"
          :value="requests"
          id="userCard2"
        >
          <div class="products">
              <!-- <div v-if="user.portfolios === null">
                <p> No portfolio available </p>
              </div> -->
              <div class="product-details">
                  <div class="productImg">
                    <!-- <div v-for="product in requests.product" :key="product"> -->
                      <div v-for="productImg in user.product.productImages" :key="productImg" class="productImg">
                        <img v-if="productImg.url != null && productImg.url" :src="productImg.url" alt="image">
                        <!-- <img v-else src="require(@/assets/images/default-placeholder-image.png)"> -->
                        <img v-else src="../../assets/images/default-placeholder-image.png" >
                      </div>
                    <!-- </div> -->
                    <!-- <div
                      v-for="(productImg, index) in user.product.productImages"
                      :key="index" class="productImg"
                      :style="{ display: active_card.productImg.id != productImg.id ? 'none' : '' }"
                    >
                      <img :src="productImg.url" alt="">
                    </div>
                    <div class="dots">
                      <span
                        :class="{ dot: true, active: dot.id == active_slide }"
                        v-for="dot in user.product.productImages"
                        :key="dot"
                        @click="this.activate(dot.id)"
                      >
                      </span>
                    </div> -->
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
                  <!-- <div v-for="(productImg, index) in user.product.productImages" :key="index" >
                    <img v-show="index[1]" :src="productImg.url" alt="">
                  </div> -->
                  <!-- <ul v-for="items in requests" :key="items"> 
                    {{ items.product.rating}} 
                    {{ items.product.updatedOn }}
                    {{ items.product.productImages[0] }} 
                  </ul> -->
                </div>
              </div>
            </div>
        </div>
    </div>
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


export default class UserRequestCard extends Vue {

  isLoading = false;
  requests: UserRequestModel[] = [];
  request = reactive(new UserRequestModel({})) as UserRequestModel;
  productImg: [] = [];
  datasource: UserRequestModel[] = [];
  totalRecords = 0;
  service: JobRequestService = new JobRequestService();
  selectedrequests: UserRequestModel[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
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
  totalAmount = 0;
  auto_animate= true;
  interval = 0;
  active_slide = 1;


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

.requestCard {
  padding: 20px;
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
.productImg {
  border-radius: 10px 10px 0 0;
  height: 150px;
  overflow: hidden;
}
.productImg .img{
  border-radius: 10px 10px 0 0;
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

</style>
