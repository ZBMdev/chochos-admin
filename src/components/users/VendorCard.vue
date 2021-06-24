<template>
  <PageHeading :title="`${vendor.fullName}'s Profile`"  style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else>
    <TabView :value="vendor">
      <TabPanel header="About">
        <div class="userCard">
              <div
                class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
              >
                <Avatar
                  v-if="vendor.photoUrl === '' || vendor.photoUrl === null || vendor.photoUrl === 'string'  " 
                  icon="pi pi-user"
                  class="p-mr-2"
                  style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                  shape="circle"
                />
                <img v-else-if="vendor.photoUrl != '' || vendor.photoUrl != 'string' || vendor.photoUrl != null "
                  :src="vendor.photoUrl"
                  :alt="vendor.photoUrl"
                  style="width:8rem;height:8rem;font-size:4rem;"
                />
                <Avatar 
                  v-else
                  :label="vendor.fullName.charAt(0).toUpperCase()"
                  class="p-mr-2"
                  style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                  shape="circle"
                />
                
              </div>
              <div class="details1">
                <h3> {{ vendor.fullName }} </h3>
              </div>
              <div class="details2">               
                <div class="username">
                  <p> Username </p>
                  <h4> {{vendor.username }} </h4>
                </div>            
                <div class="email">
                  <p> Email </p>
                  <h4> {{ vendor.email }} </h4>
                </div>               
                <div class="mobile">
                  <p> Mobile </p>
                  <h4> {{ vendor.mobile}} </h4>
                </div>
                <div class="address">
                  <p> Address</p>
                  <p class="jobNumber"> {{  vendor.address }} </p>
                </div> 
                <div class="rating">
                  <p> Average rating </p>
                  <Rating
                    :modelValue="vendor.rating"
                    :readonly="true"
                    :cancel="false"
                    :stars="5"
                    class="ratingNumber"
                  />
                </div>
              </div>
              <div class="details3">                
                <div class="status">
                  <p> Status: </p>
                  <div v-if="vendor.isActive === true">
                    <p class="active"> Active </p>
                  </div>
                  <div v-else>
                    <p class="block"> Inactive </p>
                  </div>
                </div>
                <p>
                  Date registered: <b>{{ vendor?.created_on }}</b>
                </p>
                <p>
                  Last login: <b>{{ vendor?.lastLogin }}</b>
                </p>
              </div>               
              <div class="about">
                <h4>About </h4>
                <div class="about-card">
                  {{ vendor.about}}
                </div>
              </div>
        </div>
      </TabPanel>
      <TabPanel header="Portfolio">
        <!-- <div v-for="(portfolio, index) in portfolios" :key="index">
          <Card style="width: 25em">
            <template #header>
                <img :src="portfolio.url" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                {{ portfolio.name }}
            </template>
            <template #content>
              {{ portfolio.description }}
            </template>
          </Card>
        </div>-->
        <div class="portfolios">
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
          <Card style="width: 25em" class="p-card-portfolio">
            <template #header>
                <img src="" style="height: 15rem" />
            </template>
            <template #subtitle class="subtitle">
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
          </Card>
        </div>
      </TabPanel>
      <TabPanel header="Reviews">
        <div>
          <!--<div v-if="vendor.reviews.length >=1" class="review-card">
            <Card style="width: 25em">
              <template #content>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
              </template>
            </Card>
          </div>
          <div v-else class="review-card">
            No reviews
          </div>-->
          <div class="review-card">
            No reviews
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>

  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Vendor from '@/models/Vendor';
import VendorService from '@/services/VendorService';
import { VendorData } from '@/types/vendors'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class VendorCard extends Vue {

  isLoading = false;
  vendors: Vendor[] = [];
  vendor = reactive(new Vendor({})) as Vendor;
  //Vendor!: Vendor;
  datasource: Vendor[] = [];
  totalRecords = 0;
  service: VendorService = new VendorService();
  selectedVendors: Vendor[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
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
    this.getVendor();
  }

  getVendor() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((vendorData) => {
        this.setVendor(new Vendor(vendorData));
        this.isLoading = false;
      });
  }

  setVendor(value: Vendor) {
    this.vendor = reactive(value) as Vendor;
  }
}
</script>

<style scoped>
.userCard{
  width: 100%;
  height: 100vh;
}
.p-text-center{
  widows: 100%;
}
#userDetails {
  display: flex;
}
.details1, .details2, .details3, .about {
  margin-left: 20px;
  margin-right: 20px;
}
.details1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.details1 h4{
  margin-top: 0;
  font-weight: lighter;
}
.details1 span {
  display: flex;
}
.details1 span p {
  margin-top: 0;
  padding-left: 5px;
}
.username, .email, .mobile, .address{
  display: flex;
  justify-content: space-between;
  text-align: left;
}
.address p{
  text-align: left;
}
.jobNumber {
  font-weight: bold;
  text-align: right;
}
.rating{
  display: flex;
  justify-content: space-between;
}
.rating p{
  text-align: left;
}
.ratingNumber{
  color: gold;
  /*float: right;
  align-items: flex-end; */
}
.price{
  display: flex;
  justify-content: space-between;
}
.price h4{
  color: green;
}
.about-card{
  border-radius: 5px;
  color: purple;
  font-weight: lighter;
  padding: 10px;
}
.status {
  display: flex;
  justify-content: space-between;
}
.status p {
  margin-right: 10px;
}
.active {
  color: green;
}
.block{
  color: black;
}

.portfolios {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.p-card-portfolio {
  margin: 10px;
}
#personalDetails{
  float: left;
  margin-left: 20px;
}
#jobDetails{
  float: right;
  margin-right: 350px;
}
</style>