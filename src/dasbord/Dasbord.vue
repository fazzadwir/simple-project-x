<template>
  <div class="ini">
    <div class="w-screen h-screen flex">
      <!-- Side bar -->
      <div class="w-[400px] h-full bg-gray-200 text-white" v-show="showSide">
        <div class="h-[65px] bg-gray-900 flex justify-start  items-center ">
          <div class="px-[20px]">
            <h3 >Welcome</h3>
          </div>
        </div>
        <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
          <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
            <div class=" flex flex-col justify-between space-y-[10px]">
              <router-link to="/product" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                </svg>
                <a href="/product" >Table Product</a>
              </router-link>
              <router-link to="/category" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                </svg>
                <a href="/category" >Category</a>
              </router-link>
              <router-link to="/user" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path>
                </svg>
                <a href="/user" >User</a>
              </router-link>
             
  
            </div>  
            <div class="h-[50px]">
              <div>
                <router-link to="/" class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800  transition duration-400 ease-in-out">
                  <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                  </svg>
                  <button @click="logout">Logout</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  <script>
  export default {
    data() {
      return {
        showDropDown: false,
        showSide: true,
        downloading: false,
        dataProductList: []
      }
    },
    methods: {
        logout() {
      this.$store.dispatch("logout", this.$router);
    },
      getListDataProduct(){
            const timeout = 500;

            this.$axios.get('products')
            .then(res => {

                setTimeout(() => {

                    this.downloading = true;
                    let productdata = res.data;
                    

                    productdata.forEach(item =>{
                        this.dataProductList.push({
                            'id': item.id?item.id:-1,
                            'title': item.title?item.title:'no title',
                            'price': item.price?item.price:0,
                            'description': item.description?item.description:'no description',
                            'category': item.category.name?item.category.name:'no category',
                            'image': item.category.image?item.category.image:'no image',
                            'categoryId': item.category.id?item.category.id:-1,
                            'image1': item.images[0]?this.regex(item.images[0]):'no image',
                            // 'image2': item.images[1]?item.images[1]:'no image',
                            // 'image3': item.images[2]?item.images[2]:'no image',
                        })
                    })
                     
                }, timeout);
            })
            
            this.downloading = false;
            console.log("dataProductList", this.dataProductList)


        },
        routeToEdit(id){
            this.$router.push('editProduct/?id=' + id);
        },
        routeAddProduct(){
            this.$router.push('addProduct');
        },
        regex(text) {
            const regex_txt = /(https?:\/\/[^\s"]+)/g;
            const cek = text.match(regex_txt);
            if (cek) {
                return cek[0];
            }
            return "";
        },
        deleteItem(id){
            if(confirm("yakin?")){
                this.$axios.delete('products/' + id).then(()=>{
                    alert("Data Berhasil dihapus!")
                    window.location.reload();
                })
            }
        }
    }
  
  }
  </script>
  
  <style>
.ini{
  margin-top: -20px;
  margin-left: -20px
}
  
  </style>