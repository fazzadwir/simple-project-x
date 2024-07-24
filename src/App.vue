<template>
  <Navbar v-if="this.$store.state.userdata"/>
  <Sidebar v-if="this.$store.state.userdata"/>
  <router-view/>
</template>


<script>
  import Navbar from '@/components/Navbar.vue'
  import Sidebar from '@/components/Sidebar.vue'

  export default{
      components:{
          Navbar,
          Sidebar
      }
  }
</script>
