<template>
  <Navbar v-if="this.$store.state.userdata"/>

  <router-view/>
</template>


<script>
  import Navbar from '@/components/Navbar.vue'

  export default{
      components:{
          Navbar
      }
  }
</script>
