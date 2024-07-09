<template>
   <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;  height: 100vh;">
     
     
      <span class=" px-2" style="text-align: center; font-size: 20px;">Toko X</span>
   
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li >
        <RouterLink to="/product" class="nav-link  align-items-center gap-2 text-white " aria-current="page">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>
                Products</RouterLink>     
      </li>
      <li>
        <RouterLink to="/category"  class="nav-link align-items-center gap-2 text-white " aria-current="page">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>
            Categories</RouterLink>     
      </li>
      <li>
        <RouterLink to="/user"   class="nav-link align-items-center gap-2 text-white ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            user</RouterLink>
      
      </li>
      <li>
        <RouterLink to="/addProduct"   class="nav-link align-items-center gap-2 text-white ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add Produk</RouterLink>
      
      </li>
      <li>
        <RouterLink to="/addUser"   class="nav-link align-items-center gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            Add User</RouterLink>
      
      </li>    
    </ul>
    <hr>
    <button @click="logout"class="nav-link align-items-center gap-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        Logout</button>
    
  </div>
    </template>

<script>
export default {
    methods: {
        logout() {
      this.$store.dispatch("logout", this.$router);
    },
}
}
</script>
<style>
.nav-link {
    margin-top: 0.6rem;
}
.nav-link:hover{
    background-color: gray
}
</style>
