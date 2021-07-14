<template>
  <div>
    <div v-if="!reviews" >
      <p class="noReview" >No available review </p>
    </div>
    <div v-else-if="!reviews.length" >
      <p class="noReview">No available review </p>
    </div>
    <div v-else class="reviews">
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
.noReview {
  background: white;
  padding: 20px 20px 20px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: left;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
}
.reviews{
  display: flex;
  justify-content: center;
  /* margin: auto; */
}
.review-card {
  background: whitesmoke;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 20px;
  padding: 10px 0;
  display: flex;
  /* margin: 20px 0; */
  margin: auto;
  width: 450px;
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
@media screen and (max-width: 450px) {
  .reviews {
    display: grid;
  }
  .review-card {
    width: 300px;
    margin: 15px 0;
  }
}
</style>