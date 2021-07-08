<template>
  <div>
    <div>
      <div v-for="review in reviews" :key="review" class="review-card">
        <div>
          <img :src="review.reviewer.photoUrl">
        </div>
        <div>
          <div class="review-header">
            <div>
              <h3> {{ review.reviewer.fullName }} </h3>
              <p> {{ review.createdAt }} </p>
            </div>
            <!-- <div class="rating">
            <Rating
              :modelValue="review.rating"
              :readonly="true"
              :cancel="false"
              :stars="5"
              class="p-rating"
              id="ratingNumber"
            />
          </div> -->
          </div>
          <div class="rating">
            <Rating
              :modelValue="review.rating"
              :readonly="true"
              :cancel="false"
              :stars="5"
              class="p-rating"
              id="ratingNumber"
            />
          </div>
          <p> {{ review.message}} </p>
        </div>
      </div>
    </div>
    <!-- <div>
      <div v-for="review in reviews" :key="review" class="review-card">
        <div v-if="review in reviews != null">  
          <div>
            <img :src="review.reviewer.photoUrl">
          </div>
          <div>
            <div class="review-header">
              <div>
                <h3> {{ review.reviewer.fullName }} </h3>
                <p> {{ review.createdAt }} </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No reviews </p>
        </div>
      </div>
    </div> -->
    <!-- <div v-for="review in reviews" :key="review" >
      <div v-if="review === []" class="review-card">
        <p> No reviews </p>
      </div>
      <div v-else class="review-card">
        <p> {{ review.rating }} </p>
        <p> {{ review.message}} </p>
        <img :src="review.reviewer.photoUrl" style="border-radius: 50%; width: 30px; height: 30px">
        <p> {{ review.reviewer.fullName }} </p>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from 'vue-class-component';
import MainLayout from '@/components/layouts/MainLayout.vue';
import Artisan from '@/models/Artisan';
import ArtisanService from '@/services/ArtisanService';
import { ArtisanData } from '@/types/artisan'
import Reviews from '@/models/Reviews';
import PortfolioModel from '@/models/Portfolio';
import PortfolioService from '@/services/PortfolioService';
import { Portfolio, Row } from '@/types/portfolio'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class ArtisanReview extends Vue {

  isLoading = false;
  artisans: Artisan[] = [];
  artisan = reactive(new Artisan({})) as Artisan;
  allArtisans: Artisan[] = [];
  allArtisan = reactive(new Artisan({})) as Artisan;
  //artisan!: Artisan;
  datasource: Artisan[] = []; 
  reviews: Reviews[] = [];
  review!: Reviews;
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
    this.getReview();
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

  getReview() {
    this.isLoading = true;
    this.service.getReviews(+this.$route.params.id)
      .then((data) => {
        this.reviews = data.ratings.map((prod) => new Reviews(prod))
        this.isLoading = false;
      }).catch((e) => {
        this.toast.add({
          severity: "error",
          summary: "There was an error loading reviews",
          detail: "Please check your internet connection and refresh the page"
        })
        console.log(e);
      });
  }

}
</script>

<style>
.review-card {
  background: whitesmoke;
  border-radius: 20px;
  padding: 10px 0;
  display: flex;
}
.review-card div img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 20px ;
}
.review-header{
  display: flex;
  justify-content: space-between;
}
.review-header h3{
  margin-left: 5px;
}
.review-header p {
  font-size: 13px;
  color: gray;
  margin-top: -10px;
}
.review-card p {
  text-align: left;
  padding: 0 10px;
}
.rating, #ratingNumber {
  margin: 0 0 5px 5px;
}
.p-rating .p-rating-icon.pi-star  {
  color: gold;
  font-size: 14px;
}
</style>