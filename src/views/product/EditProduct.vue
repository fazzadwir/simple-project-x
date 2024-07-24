<template>
    <div class="container">
        <div class="edit_container">
            <div class="left">
                <div class="img_container">
                    <img :src="this.images" alt="Gambar Produk">
                </div>
            </div>
            <div class="right">
                    <div class="title">
                        
                        <h1 v-if="userRole !== 'customer'" class="text-center white">Edit Produk</h1>
                        <h1 v-if="userRole === 'customer'" class="text-center white">Detail Produk</h1>
                    <div class="body">
                        <form>
                            <div class="input">
                                <span>Nama Produk</span>
                                <b-form-input v-model="title" class="in"></b-form-input>
                            </div>
                            <div class="input">
                                <span>Category</span>
                                <b-form-select v-model="category" class="in mb-3" disabled>
                                    <b-form-select-option v-for="(item, index) in categoryProductList" :key="index" :value="item.id">>{{ item.name }}</b-form-select-option>
                                </b-form-select>
                            </div>
                            <div class="input">
                                <span>Description</span>
                                <b-form-textarea v-model="description" class="in"></b-form-textarea>
                            </div>
                            <div class="input">
                                <span>Harga</span>
                                <b-form-input type="number" v-model="price" class="in"></b-form-input>
                            </div>
                            <div class="input" v-if="userRole !== 'customer'">
                                <span>Ubah Gambar</span>
                                <b-form-file @change="listenFile" class="in" accept="image/*"></b-form-file>
                            </div>

                            <div class="btn_group">
                                <button v-if="userRole !== 'customer'" class="btn_primary btn-wide" @click="editData">Ubah Produk</button>
                                <button v-if="userRole !== 'customer'" class="btn_delete btn-wide" @click="deleteItem">Hapus Produk</button>
                                <button class="btn_secondary btn-wide" @click="routeToPageHome">Kembali</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    

</template>

<script>
import cookie from "js-cookie";

export default{
    name: 'Edit',
    data() {
        return {
            mainId: "",
            categoryId: "",
            downloading: false,
            categoryProductList: [],

            title: "",
            price: "",
            description: "",
            category: "",
            images: "",

            file: null,
            userRole: "",
        }
    },
    methods: {
        listenFile(event) {
            this.file = event.target.files;
            console.log('file', this.file[0]);
        },
        getMainId() {
            console.log("id", this.$route.query.id)

            this.mainId = this.$route.query.id;

            this.getProductById(this.mainId);
        },
        getProductById(id){
            const timeout = 500;

            this.$axios.get('products/' + id)
            .then((res) => {

                    this.downloading = true;
                    let productdata = res.data;
                        
                        this.categoryId = productdata.category.id;
                        this.title = productdata.title;
                        this.price = productdata.price;
                        this.description = productdata.description;
                        this.category = this.categoryId;
                        this.images = this.regex(productdata.images[0])

            })

        this.downloading = false;

        },
        routeToPageHome(){
            this.$router.push('/product');
        },
        editData(){

            if(!this.title || !this.category || !this.description || !this.price){
                this.$Swal.fire({
                    title: "Isi Semua Form!",
                });
                return;
            }

            let image = null;

            if(this.file !== null){
                let formData = new FormData();
                formData.append("file", this.file[0]);

                this.$axios.post('files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then((response) =>{
                    console.log('response', response.data.location)
                    image = response.data.location;

                    this.putData(image)
                })
            }else{
                this.putData(false)
            }

            console.log('image', image)

                       
        },
        getListDataCategory(){
            this.$axios.get('categories')
            .then(res => {
                this.categoryProductList = res.data;
            })
        },
        regex(text) {
            const regex_txt = /(https?:\/\/[^\s"]+)/g;
            const cek = text.match(regex_txt);
            if (cek) {
                return cek[0];
            }
            return "";
        },
        putData(image){
            this.$axios.put('products/' + this.mainId, {
                title: this.title,
                price: this.price,
                description: this.description,
                categoryId: this.category,
                images: image?[image]:[this.images]
                }).then(() =>{
                    this.$Swal.fire({
                        title: "Data Diubah!",
                        icon: "success"
                    });
                    this.$router.push({path: '/product'})
                }).catch(error=>{
                    if(error.response.data.message){
                        this.$Swal.fire({
                        icon: "error",
                        title: error.response.data.message,
                        });
                    }else{
                        this.$Swal.fire({
                        icon: "error",
                        title: "Terjadi kesalahan!",
                        });
                    }
                })
        },
        deleteItem(){
            this.$Swal.fire({
                title: "Apakah Anda yakin?",
                showDenyButton: true,
                confirmButtonText: "Tidak",
                denyButtonText: `Ya`
            }).then((result) => {
                if (result.isDenied) {
                    this.$axios.delete('products/' + this.mainId).then(()=>{
                        this.$Swal.fire({
                            title: "Produk Dihapus!",
                            icon: "success"
                        });
                    this.$router.push({path: '/product'})
                    })
                }
            });
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
    mounted(){
        this.getMainId();
        this.getListDataCategory();
    },
    created(){
        this.fetchUserRole();
    }
}

</script>