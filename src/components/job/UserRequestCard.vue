<template>
  <!-- <PageHeading :title="`${.fullName} request`" style="display:flex; justify-content: center; margin-bottom: 30px" /> -->
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-flex p-jc-center p-ai-center">
    <div id="card-holder">      
      <h3>Products </h3>
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
                    <div v-for="product in requests.product" :key="product">
                      <div v-for="productImg in user.product.productImages" :key="productImg" >
                        <img :src="productImg" alt="">
                      </div>
                    </div>
                  </div>
                  <h4> {{ user.productName }} </h4>
                  <p> {{ user.product.description }} </p>
                  <p> {{ user.quantity }} </p>
                  <p> {{ user.unitPrice }} </p>
                  <p> {{ user.totalPrice}} </p>
                  <p> {{ user.description }} </p>
                  <p> Reviews {{ user.product.rating }} </p>
                  <p> {{ user.product.productImages.id }} </p>
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


  created() {
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
        // this.productImg = data.jobRequest.billOfQuantities.filter((prod) => {
        //   return prod.product.productImages
        // })
        // this.setRequest(new UserRequestModel(data));
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

}
</script>

<style scoped>
#hero {
  margin-top: 80px;
}
.p-card{
  border-radius: 20px;
}
/* #details p{
  display: flex;
  justify-content: space-between;
  text-align: left;
}
#details p span{
  text-align: left;
} */
#avatar{
  margin-top: -95px;
  background: rgb(209, 202, 209);
  color: purple;
  width:8rem;
  height:8rem;
  font-size:4rem;
  border-radius: 50%;
}
.name{
  display: flex;
  justify-content: center;
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
.rating, .status {
  display: flex;
  justify-content: space-between;
}
.ratingNumber {
  margin-top: 10px;
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
.about {
  display: grid;
}
.about-card {
  background: rgb(209, 202, 209);
  color: rgb(100, 87, 100);
  padding: 10px;
  border-radius: 5px;
  margin-top: -5px;
  margin-bottom: -10px;
}
 #userCard{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin: auto;

}
.product-details{
  width: 200px;
  border: 1px solid purple;
}
</style>
