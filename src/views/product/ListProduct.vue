<template>
    <div class="container">
            <button v-if="userRole !== 'customer'" class="btn_primary btn-wide" @click="routeAddProduct">Tambah Produk</button>
            <div class="bar_container">
                <div class="search">
                    <input type="text" v-model="search_value">
                    <button class="btn_search" @click="search">Cari</button>
                </div>
                <div class="filter">
                    <b-dropdown text="Urutkan">
                        <b-dropdown-item value="1" class="primary_hover" @click="listenToSort(1)">Semua</b-dropdown-item>
                        <b-dropdown-item  value="2" class="primary_hover" @click="listenToSort(2)">Termahal</b-dropdown-item>
                        <b-dropdown-item  value="3" class="primary_hover" @click="listenToSort(3)">Termurah</b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
            <div class="product_container">
                <div class="boxs" v-for="(item, index) in dataProductList" :key="index" @click="routeToEdit(item.id)">
                    <div class="detail"></div>
                    <div class="up">
                        <div class="image">
                            <img :src="item.image1" alt="product image">
                        </div>
                        <div class="wide">
                            <h3>{{item.title}}</h3>
                        </div>
                    </div>
                    <div class="down">
                        <div class="others"><span class="price">{{ item.price }}</span></div>
                        <div class="others">{{ item.category}}</div>
                    </div>
                </div>
            </div>
    </div>

</template>

<script>
import cookie from "js-cookie";

export default{
    name: 'addProduct',
    data() {
        return {
            downloading: false,
            dataProductList: [],
            input: "",
            search_value: "",
            temp: [],
            sort: "",
            userRole: "",
        }
    },
    methods: {
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
                            'title': item.title?this.limitText(item.title, 20):'no title',
                            'price': item.price?item.price:0,
                            'description': item.description?item.description:'no description',
                            'category': item.category.name?this.limitText(item.category.name, 15):'no category',
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
                    this.$Swal.fire({
                        title: "Produk Ditambah!",
                        icon: "success"
                    }).then(window.location.reload())
                })
            }
        },
        limitText(text, max){
            if(text.length > 10){
                const limitedText = text.slice(0, max)

                return limitedText + "..."
            }else{
                return text
            }
        },
        search(){
            if(this.search_value){
                let search = this.search_value.toLowerCase().replaceAll(" ", "")
                this.dataProductList = [...this.temp].filter((product) =>
                    product.title.toLowerCase().replaceAll(" ", "").includes(search)
                );
            }else{
                this.dataProductList = this.temp;
            }
        },
        listenToSort(data){
            switch (data) {
                case 1:
                    this.dataProductList = [...this.temp]
                    break;
                case 2:
                    this.dataProductList = [...this.temp].sort((a, b) => b.price - a.price)
                    break;
                default:
                    this.dataProductList = [...this.temp].sort((a, b) => a.price - b.price)
                    break;
            }
        },
        fetchUserRole() {
        const userdata = cookie.getJSON("userdata");
            if (userdata && userdata.role) {
                this.userRole = userdata.role.toLowerCase();
            } else {
                console.error("User role is not available in the cookie");
            }
        },

    },
    mounted() {
        this.getListDataProduct();
        this.temp = this.dataProductList;
    },
    created(){
        this.fetchUserRole();
    }
}
</script>