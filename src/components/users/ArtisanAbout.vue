<template>
    <div class="userCard">
        <div
            class="p-d-flex p-jc-center p-ai-center p-pt-4 p-pl-4 p-pr-4 p-pb-0"
          >
            <Avatar
              v-if="artisan.photoUrl === '' || artisan.photoUrl === null " 
              icon="pi pi-user"
              class="p-mr-2"
              id="avatar"
              shape="circle"
            />
            <img v-else-if="artisan.photoUrl != '' || artisan.photoUrl != null "
              :src="artisan.photoUrl"
              :alt="artisan.photoUrl"
              id="avatar"
            />
            <Avatar 
              v-else
              :label="artisan.fullName.charAt(0).toUpperCase()"
              class="p-mr-2"
              id="avatar"
              shape="circle"
            />        
          </div>
          <div class="p-text-left" id="details">
            <h3 class="name">
              {{ artisan?.fullName }}
            </h3>
            <p class="email">
              {{ artisan?.email }}
            </p>
            <p class="mobile">
              {{ artisan?.mobile }}
            </p>
            <span> <i class="pi pi-map-marker"></i> <p> {{ artisan?.address }} </p> </span>
          </div>
          <div class="details2">
            <div class="occupation">
              <p> Occupation </p>
              <p class="occName"> {{ artisan?.jobName  }}  </p>
            </div>
            <div class="jobs">
              <p> Jobs completed </p>
              <p class="jobNumber"> {{ formatCurrency(artisan?.jobNumber) }} </p>
            </div>    
            <div class="rating">
              <p> Average rating </p>
              <Rating
                :modelValue="artisan.rating"
                :readonly="true"
                :cancel="false"
                :stars="5"
                class="ratingNumber"
              />
            </div>
            <div class="price">
              <p> Average price </p>
              <p> ₦ {{ formatCurrency(artisan?.jobPrice) }} </p>
            </div>
            <div class="status">
              <p> Status: </p>
              <div v-if="artisan.isActive === true">
                <p class="userActive"> Active </p>
              </div>
              <div v-else>
                <p class="block"> Inactive </p>
              </div>
            </div>
            <div class="about">
              <h4>About </h4>
              <p class="about-card">
                {{ artisan.aboutArtisan }}
              </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Artisan from '@/models/Artisan';
import ArtisanService from '@/services/ArtisanService';
import { ArtisanData } from '@/types/artisan'
import PortfolioModel from '@/models/Portfolio';
import PortfolioService from '@/services/PortfolioService';
import { Portfolio, Row } from '@/types/portfolio'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class ArtisanAbout extends Vue {

  isLoading = false;
  artisans: Artisan[] = [];
  artisan = reactive(new Artisan({})) as Artisan;
  allArtisans: Artisan[] = [];
  allArtisan = reactive(new Artisan({})) as Artisan;
  // artisan!: Artisan;
  datasource: Artisan[] = []; 
  portfolios: PortfolioModel[] = [];
  portfolio!: PortfolioModel;
  totalRecords = 0;
  service: ArtisanService = new ArtisanService();
  portfolioservice: PortfolioService = new PortfolioService();
  selectedArtisans: Artisan[] = [];
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
    this.getArtisan();
    this.getAllArtisans();
    this.getPortfolio();
  }

  getArtisan() {
    this.isLoading = true;
    this.service.getOne(+this.$route.params.id)
      .then((artisanData) => {
        this.setArtisan(new Artisan(artisanData));
        this.isLoading = false;
      });
  }

  setArtisan(value: Artisan) {
    this.artisan = reactive(value) as Artisan;
  }

  getAllArtisans() {
    this.service.getAllPaginated(this.service.allArtisans)
      .then(data => {
        this.allArtisans = data.items.map((prod) => new Artisan(prod));
        this.isLoading = false;
      }).catch((e) => {
      this.toast.add({ severity: "error", summary: "There was an error fetching the artisans", detail: "Please check your internet connection and refresh the page" })
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

  formatCurrency(value: number) {
    return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
  }

}
</script>

<style>

.userCard{
  /* display: grid;
  justify-content: center; */
  width: 400px;
  /* height: 100vh; */
  background: white;
  border-radius: 10px;
  box-shadow: whitesmoke;
  margin-top: 150px;
  margin-bottom: 150px;
  margin-left: auto;
  margin-right: auto;
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
.occupation, .jobs, .price, .rating, .status {
  display: flex;
  justify-content: space-between;
}
.ratingNumber {
  margin-top: 10px;
}
.userActive {
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
  margin-bottom: 10px;
}
</style>