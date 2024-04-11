<template>

  <div class="container">
  <div id="" class="container-sm" >
   <div class="flex" style="display: flex">
    <div id="about-col" class="">
      <div id="" class = "flex mb-5">
        <h2 class="card-title about-txt">
          About
        </h2>
        <h5 class="card-text about-txt"> This div will tell the user what is happening in this website and will display a panel of changing photos from an API</h5>

      </div>
      </div>
     <div>
       <div class="col">
         <img src = "@/assets/christian.png" class = "rounded float-end">
       </div>

    </div>

   </div>
   
  </div>
  <div class="container-sm">
    <div class="">
     
      <div class="col" style="display:flex; justify-content: center; align-items: center">
        <div class="col-body" style="margin-bottom: 50px; background: rgba(255, 255, 255, 0.25); border-radius: 25px; max-width: 500px">
          <TopTwentyFive/>

        </div>
       
      </div>


    </div>
  </div>
    <div class="container-sm">
      <div id="barChart" class="col">
        <div class="" style="padding: 20px;display: flex;flex-wrap: wrap;align-content: center; justify-content: center">

          <QuarterbackBarChart/>


        </div>

      </div>
    </div>
  <div class="container-sm">



    <div id="top5Chart" class="col">
      <div class="" style="padding: 20px;display: flex;flex-wrap: wrap;align-content: center; justify-content: center">
        <TopFive_PassingQb/>

      </div>
    </div>

  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopTwentyFive from '@/components/Football_Components/TopTwentyFive.vue';
import QuarterbackBarChart from "@/components/Football_Components/QuarterbackBarChart.vue";
import TopFive_PassingQb from "@/components/Football_Components/TopFive_PassingQb.vue";



export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    QuarterbackBarChart,
    TopTwentyFive,
    TopFive_PassingQb

  }

  
}
</script>

<style scoped>
#barChart{
  width: auto;
}
.bg-mycolor{
  background-color: #008EF5;
}


.about-txt {
  margin: 50px; font-family: proximaNovaBlack; opacity: 100%; color: black;

}
#about-container{
  display: flex;
  flex-direction: row;
}

.container-sm{
  background-color: #008EF5;
  margin-top: 50px;
  border-radius: 25px;
  margin-bottom: 50px;
  display: grid;

}

@media screen and (max-width: 1190px) {
  .container{
    display: flex;
    flex-direction: column;
  }
  .container-sm{
    grid-template-columns: 1fr;
    width: auto;

    justify-content: center;

  }

  #about-col{
    display: flex;
    justify-content: center;
  }


}


@media screen and (max-width: 380px){
  .about-txt { 
    margin: 0px;
  }
  img{
    height: 100px;
   
  }

  
}


</style>