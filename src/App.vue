<template>
 
  <SidebarView/>
  <div :style = "{ 'margin-left':sidebarWidth}"> 
  <router-view></router-view>
  
  </div>

  

</template>

<script>
  import * as d3 from "d3";
  import SidebarView from '@/components/sidebar/SidebarView.vue'
  import { sidebarWidth} from '@/components/sidebar/state'
  import Home from '@/views/Home.vue'
  import HelloHome from './components/Football_Components/TopTwentyFive.vue'
  // import axios from 'axios'
  // import VueAxios from 'vue-axios'


 

 



export default {
  name: 'App',
  components: {
    SidebarView,
    Home,
    HelloHome
    
    
  },
  data() {
    return {
      posts: []
    };
  },
  setup() {
   
    return { sidebarWidth }

  },
   mounted() {

  },
  methods:{


   

  }
}




 

  


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

@font-face{
  src: url('Proxima/Proxima\ Nova\ Black\ Italic.otf');
  font-family: proximaNovaBlack;

}

@font-face{
  src: url('Proxima/Proxima\ Nova\ Bold.otf');
  font-family: proximaNovaBold;

}@font-face{
  src: url('Proxima/Proxima\ Nova\ Bold\ Italic.otf');
  font-family: proximaNovaBoldItalic;

}

@font-face{
  src: url('Proxima/Proxima\ Nova\ Condensed\ Bold.otf');
  font-family: proximaNovaCondensedBold;

}

@font-face{
  src:url('Proxima/Proxima\ Nova\ Condensed\ Bold.otf');
  font-family: proximaNovaCondensedBlack;

}

@font-face{
  src: url('Proxima/Proxima\ Nova\ Condensed\ Thin.otf');
  font-family: proximaNovaCondensedThin;

}

</style>
