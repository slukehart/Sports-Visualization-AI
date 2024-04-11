<template>

    <div class = "sidebar" :style = "{ width: sidebarWidth}" style="margin-right: 100px">
      <div class="title" >

       <h2>
      <span v-if="collapsed">
        <div>S</div>
        <div>V</div>
        <div>Z</div>
      </span>
      
      <span v-else style="">Sports Visualization</span>
      
    </h2> 
  </div>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
    <SidebarLink to="/about" icon="fas fa-chart-bar">Analytics</SidebarLink>
    <SidebarLink to="/friends" icon="fas fa-users">Friends</SidebarLink>
    <SidebarLink to="/image" icon="fas fa-image">Images</SidebarLink>
    

    <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar" style="padding:10px">
      
      <i class="fas fa-angle-double-left"></i>
    </span>
    </div>

</template>

<script>
    import SidebarLink from './SidebarLink.vue';
  
    import {collapsed, toggleSidebar, sidebarWidth} from './state'
    export default{
        name: 'SidebarView', 
        props: {},
  components: { SidebarLink },
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth}
  }

    }
</script>

<style>
    :root {
        --sidebar-bg-color: #008EF5;
        --sidebar-bg-item: black;
        --sidebar-item-active: #FFFDD0;

    }
    

</style>
<style scoped>
   .sidebar {
  color: black;  
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: .5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  font-family: proximaNovaBlack;
     width: 100%;
}
.sidebar h2 {
  padding-top: 0%;
  padding-bottom: 15px;
  font-size: 1.5rem;

}
.title{
  display: flex;
  flex-direction: column;
  
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  padding-left: .75em;
  color: black;
  transition: 0.2s linear;
  
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}



@media screen and (max-width: 380px){


  

  
}

</style>