<template>
    <h1>The sidebar is {{ collapsed ? 'closed' : 'open' }}</h1>
    <button @click="toggleSidebar">Toggle Sidebar</button>
  </template>
  
  <script>
  import { collapsed, toggleSidebar } from '@/components/sidebar/state'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Dashboard',
    setup() {
        
      return { collapsed, toggleSidebar }
    }
  }
  </script>