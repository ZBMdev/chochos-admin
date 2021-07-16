<template>
  <PageHeading :title="`${occupation.name}`" style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else class="p-d-grid p-jc-center p-ai-center">
    <div v-if="artisanNo < 1">
      <p class="NoArtisan">No available artisan</p>
    </div>
    <div v-else id="card-holder">
      <div v-for="user in occupationArtisans" :key="user" class="p-col-12 p-md-6">
        <!-- <div v-if="user === null">
          <p>No available artisan</p>
        </div> -->
        <div
          class="p-text-center"
          :value="occupationArtisans"
          id="userCard"
        >
          
            <div
              class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
              id="avatar"
            >
              <Avatar
                v-if="user.photoUrl === '' || user.photoUrl === null "
                :label="user.fullName.charAt(0).toUpperCase()"
                class="p-mr-2"
                style="background-color:#c8e6c9;color:#256029;width:8rem;height:8rem;font-size:4rem;"
                shape="circle"
              />
              <img v-else
                :src="user.photoUrl"
                :alt="user.photoUrl"
                style="width:8rem;height:8rem;font-size:4rem;border-radius:50%;"
              />
            </div>
          
            <div class="p-text-left" id="demoDetail">
              <h3 class="name">
                <b>{{ user?.fullName }}</b>
              </h3>
              <p class="email">
                {{ user?.email }}
              </p>
              <p class="mobile">
                {{ user?.mobile }}
              </p>
              <span> <i class="pi pi-map-marker"></i> <p> {{ user?.address }} </p> </span>
            </div>
            <div class="jobDetail">
              <div class="jobs">
                <p> Jobs completed </p>
                <p class="jobNumber"> {{ user.userCategoryRecord.jobsCompleted }}  </p>
              </div>
              <div class="rating">
                <p> Average rating </p>
                <Rating
                  :modelValue="user.rating"
                  :readonly="true"
                  :cancel="false"
                  :stars="5"
                  class="ratingNumber"
                />
              </div>
              <div class="price">
                <p> Average price </p>
                <h4> {{ formatCurrency(user.userCategoryRecord.fee) }} </h4>
              </div>
            </div>
            <div class="p-text-left" id="jobDetail">
              <div class="about">
                <p> <b>About </b> </p>
                <p class="about-text">
                  {{ user?.userCategoryRecord.about }}
                </p>
              </div>
            </div>
            <div class="portfolio">
              <!-- <div v-if="user.portfolios === null">
                <p> No portfolio available </p>
              </div> -->
              <div v-if="!user.portfolios">
                <h3>Portfolio</h3>
                <p> No available portfolio  </p>
              </div>
              <div v-else-if="!user.portfolios.length">
                <h3>Portfolio</h3>
                <p> No available portfolio  </p>
              </div>
              <div v-else>
                <h3>Portfolio</h3>
                <div v-for="port in user.portfolios" :key="port"  class="singlePortfolio">
                  <div class="portImg">
                    <img :src="port.url" alt="">
                  </div>
                  <h4> {{ port.name }} </h4>
                  <p> {{ port.description }} </p>
                </div>
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
import Occupation from '@/models/Occupation';
import OccupationService from '@/services/OccupationService';
import { OccupationData } from '@/types/occupation'
import OccupationArtisan from '@/models/OccupationArtisan';
import OccupationArtisanService from '@/services/OccupationArtisanService';
import { OccupationArtisanData } from '@/types/occupationArtisan'
import PortfolioModel from '@/models/Portfolio';
import PortfolioService from '@/services/PortfolioService';
import { Portfolio, Row } from '@/types/portfolio'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';
// import { number } from "yup/lib/locale";


export default class OccupationCard extends Vue {

  isLoading = false;
  occupations: Occupation[] = [];
  occupation = reactive(new Occupation({})) as Occupation;  
  occupationArtisans: OccupationArtisan[] = [];
  occupationArtisan!: OccupationArtisan; 
  portfolios: PortfolioModel[] = [];
  portfolio!: PortfolioModel;
  // datasource: Occupation[] = [];
  totalRecords = 0;
  service: OccupationService = new OccupationService();
  artisanservice: OccupationArtisanService = new OccupationArtisanService();
  portfolioservice: PortfolioService = new PortfolioService();
  selectedOccupations: Occupation[] = [];
  filters: Record<string, unknown> = {};
  submitted = false;
  toast = useToast();
  imageService = new BombsightService();
  imageLoading = false;
  firstRecordIndex = 0;
  rowstoDisplay = 10;
  artisanNo = 10;


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
    this.getOccupation();
    this.getOccupationArtisan();
    this.getPortfolio();
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

  getOccupation() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((occupationData) => {
        this.setOccupation(new Occupation(occupationData));
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading artisans",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  setOccupation(value: Occupation) {
    this.occupation = reactive(value) as Occupation;
  }

  getOccupationArtisan() {
    this.isLoading = true;
    this.artisanservice.occupationArtisans(+this.$route.params.id)
      .then((data) => {
        this.occupationArtisans = data.items.map((prod) => new OccupationArtisan(prod))
        this.artisanNo = this.occupationArtisans.length;
        this.isLoading = false;
        console.log(this.artisanNo)
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading artisans",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  getPortfolio() {
    this.isLoading = true;
    this.portfolioservice.userPortfolio(+this.$route.params.id)
      .then((data) => {
        this.portfolios = data.items.rows.map((prod) => new PortfolioModel(prod))
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading portfolios",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

  setOccupationArtisan(value: OccupationArtisan) {
    this.occupationArtisan = reactive(value) as OccupationArtisan;
  }
}
</script>

<style scoped>
#card-holder{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  padding-top: 80px;
}
#userCard{
  display: grid;
  background: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  width: 400px;
  border-radius: 10px;
  margin: auto;
}
.btns{
    display: flex;
    justify-content: space-around;
}
.NoArtisan{
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
#avatar{
  margin-top: -95px;
}
#demoDetail{
  display: grid;
  justify-content: center;
  text-align: center;
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
#demoDetail span{
  display: flex;
  font-size: 12px;
}
#demoDetail span i {
  margin-right: 10px;
}
#demoDetail span p {
  margin-top: 0;
}
.jobDetail {
  padding: 10px;
}
.jobs{
  display: flex;
  justify-content: space-between;
  text-align: left;
}
.jobs p{
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
  margin-top: 15px;
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
.about {
  display: grid;
  padding: 10px;
}
.about-text {
  background: rgb(209, 202, 209);
  color: rgb(100, 87, 100);
  padding: 10px;
  border-radius: 5px;
  margin-top: -5px;
}
.portfolio{
  width: 95%;
  margin: auto;
}
.singlePortfolio{
  background: white;
  border-radius: 10px;
}
.portImg{
  width: 100%;
  height: 200px;
}
.singlePortfolio img {
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
}
.singlePortfolio p{
  text-align: left;
}
@media only screen and (max-width: 768px){
  #userCard {
    width: 350px;
    margin-bottom: 100px;
  }
  #card-holder{
    display: grid;
  }
}
</style>