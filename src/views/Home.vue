<template>
  <div class="container-sm" style = "background-color: #008EF5; margin-top: 0px; border-radius: 25px;">
   <div class="row row-cols-1 row-cols-md-2 g-4 border-radius-sm">
    <div class="col"> 
      <div class = "card-body">
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
  <div class="container-sm" style = "background-color: #008EF5; margin-top: 50px; border-radius: 25px;"> 
    <div class="row row-cols-2 row-cols-md-2 g-4 border-radius-sm">
     
      <div class="col" >
        <div class="col-body" style="margin-bottom: 50px; background: rgba(255, 255, 255, 0.25); border-radius: 25px;">
          <HelloHome/>

        </div>
       
      </div>

    </div>
  </div>
 
</template>

<script>
// @ is an alias to /src
import HelloHome from '@/components/HelloHome.vue';



export default {
  name: 'Home',
  components: {
   HelloHome
  }

  
}
</script>

<style scoped> 

.bg-mycolor{
  background-color: #008EF5;
}

.about-txt {
  margin: 50px; font-family: proximaNovaBlack; opacity: 100%; color: black;

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