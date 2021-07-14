<template>
  <div>
    <div v-if="!portfolios" >
      <p class="noPortfolio" >No available portfolio </p>
    </div>
    <div v-else-if="!portfolios.length" >
      <p class="noPortfolio">No available portfolio </p>
    </div>
    <div v-else class="portfolios">
      <div  v-for="port in portfolios" :key="port" class="singlePortfolio">
        <div class="portImg">
          <img :src="port.url" alt="">
        </div>
        <h4> {{ port.name }} </h4>
        <div class="portDescription">
          <p> {{ port.description }} </p>
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
import PortfolioModel from '@/models/Portfolio';
import PortfolioService from '@/services/PortfolioService';
import { Portfolio, Row } from '@/types/portfolio'
import BombsightService from '@/services/BombsightService';
import { useToast } from 'primevue/usetoast';
import qs from 'qs';
import { reactive } from 'vue';


export default class ArtisanPortfolio extends Vue {

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

<style>

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
.noPortfolio {
  background: white;
  padding: 20px 20px 20px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: left;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
}
.singlePortfolio{
  background: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 10px;
  width: 400px;
  margin: 20px;
}
/* .singlePortfolio {
  display: flex;
  justify-content: center;
} */
/* .singlePortfolioCard{
  background: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 10px;
  width: 400px;
  margin: 20px;
} */
.portImg{
  width: 100%;
  height: 200px;
}
.singlePortfolio img {
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
}
.singlePortfolio h4{
  text-align: left;
  padding: 0 10px;
}
.portDescription {
  padding: 0 10px;
}
.singlePortfolio p{
  background: rgb(209, 202, 209);
  color: rgb(100, 87, 100);
  padding: 20px 20px 20px 10px;
  border-radius: 5px;
  /* margin-top: -5px; */
  margin-bottom: 10px;
  text-align: left;
  /* padding: 0 10px; */
}

@media only screen and (max-width: 768px){
  .portfolios {    
    /* margin-left: -50px;
    margin-right: 0; */
    margin-left: -20px;
  }
  .singlePortfolio{
    display: grid;
    width: 280px;
    margin: 20px 0;
  }
  .singlePortfolioCard {
    width: 300px;
  }
}
</style>