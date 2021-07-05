
<template>
  <PageHeading :title="`${artisan.fullName}'s Profile`"  style="display:flex; justify-content: center; margin-bottom: 30px" />
  <ProgressSpinner style="display:flex; justify-content: center" v-if="loading" />
  <div v-else >
    <div class="wrapper">
      <input type="radio" name="slider" id="about" checked >
      <input type="radio" name="slider" id="portfolio" >
      <input type="radio" name="slider" id="reviews" >
      <nav>
        <label for="about" class="about"> About </label>
        <label for="portfolio" class="portfolio"> Portfolio  </label>
        <label for="reviews" class="reviews"> Reviews  </label>
        <div class="slider"> </div>        
      </nav>
      <section>
        <div class="content about">
          <ArtisanAbout />
        </div>
        <div class="content portfolio">
          <ArtisanPortfolio />
        </div>
        <div class="content reviews">
          <ArtisanReview />
        </div>
      </section>
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
import ArtisanAbout from '@/components/users/ArtisanAbout.vue'
import ArtisanPortfolio from '@/components/users/ArtisanPortfolio.vue'
import ArtisanReview from '@/components/users/ArtisanReview.vue'

@Options({
  components: { ArtisanAbout, ArtisanPortfolio, ArtisanReview  },

})

export default class ArtisanCard extends Vue {

  isLoading = false;
  artisans: Artisan[] = [];
  artisan = reactive(new Artisan({})) as Artisan;
  allArtisans: Artisan[] = [];
  allArtisan = reactive(new Artisan({})) as Artisan;
  //artisan!: Artisan;
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

}
</script>

<style scoped>
body {
  overflow: hidden;
  font-family: var(--font-family);
}
.wrapper {
  width: 100%;
  margin: 10px auto;
  background: transparent;
  /* padding: 25px 30px 30px 30px; */
  border-radius: 10px;
  margin-left: -5px;
  margin-right: -30px;
  font-family: var(--font-family);
}

.wrapper nav {
  position: relative;
  height: 50px;
  width: 80%;
  display: flex;
  align-items: flex-start;
  background: transparent;
  margin-bottom: 35px;
}
 
.wrapper nav label {
  display: block;
  height: 30px;
  padding: 2px 0;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: #323C47;
  font-size: 17px;
  z-index: 1;
  transition: all 0.3s ease;
}
.wrapper nav .about,
.wrapper nav .portfolio,
.wrapper nav .reviews {
  margin-right: 30px;
  /* padding: 2px 0; */
  padding: 0;
  margin-top: 0;
}
.wrapper nav label span {
  margin-left: 3px;
}

#about:checked ~ nav label.about, 
#portfolio:checked ~ nav label.portfolio,
#reviews:checked ~ nav label.reviews {
  color: #323c47;
  background: #E7E7E7;
  border-radius: 24px;
  padding: 5px 10px;
  line-height: 20px;
}

input[type="radio"] {
  display: none;
}

section .content {
  display: none;
}

#about:checked ~ section .about,
#portfolio:checked ~ section .portfolio,
#reviews:checked ~ section .reviews {
  display: block;
}

/* .p-text-center{
  widows: 100%;
} */
/* #userDetails {
  display: flex;
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
} */

.details3 .dates p{
  display: flex;
  justify-content: space-between;
}


@media screen and (max-width: 450px) {
  /* .users {
    margin-left: 0;
    margin-right: -5px;
    overflow: hidden;
  } */
  .wrapper nav label {
    display: grid;
    height: 60px;
  }

  .about, .portfolios, .reviews {
    font-size: 13px;
  }
}
</style>