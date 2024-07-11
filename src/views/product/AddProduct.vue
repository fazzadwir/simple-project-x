<template>
    <div class="container">
        <div class="single_add_container">
            <div class="title">
                <h1 class="text-center white">Tambah Produk</h1>
            </div>
            <div class="body">
                <form>
                    <div class="input">
                        <span>Nama Produk</span>
                        <b-form-input v-model="title" class="in"></b-form-input>
                    </div>
                    <div class="input">
                        <span>Kategori</span>
                        <b-form-select v-model="category" class="in mb-3">
                            <b-form-select-option v-for="(item, index) in categoryProductList" :key="index" :value="item.id">>{{ item.name }}</b-form-select-option>
                        </b-form-select>
                    </div>
                    <div class="input">
                        <span>Deskripsi</span>
                        <b-form-textarea v-model="description" class="in"></b-form-textarea>
                    </div>
                    <div class="input">
                        <span>Harga</span>
                        <b-form-input type="number" v-model="price" class="in"></b-form-input>
                    </div>
                    <div class="input">
                        <span>Gambar</span>
                        <b-form-file @change="listenFile" class="in" accept="image/*"></b-form-file>
                    </div>

                    <div class="btn_group">
                        <button class="btn_primary btn-wide" @click="addData">Tambah Produk</button>
                        <button class="btn_secondary btn-wide" @click="routeToPageHome">Kembali</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'Edit',
    data() {
        return {
            mainId: "",
            dataProduct: [],
            categoryProductList: [],

            title: "",
            price: "",
            description: "",
            category: "",
            images: "",

            file: null
        }
    },
    methods: {
        listenFile(event) {
            this.file = event.target.files;
            console.log('file', this.file[0]);
        },
        routeToPageHome(){
            this.$router.push('/product');
        },
        addData(){

            console.log('tes', this.file[0])

            let formData = new FormData();
                formData.append("file", this.file[0]);

                let image = null;

            this.$axios.post('files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then((response) =>{
                    console.log('response', response.data.location)
                    image = response.data.location;

                    this.$axios.post('products/' + this.mainId, {
                    title: this.title,
                    price: this.price,
                    description: this.description,
                    categoryId: this.category,
                    images: [image]

                    }).then(() =>{
                        this.$Swal.fire({
                            title: "Produk Ditambah!",
                            icon: "success"
                        });
                        this.$router.push({path: '/product'})
                    })


                })
            
        },
        getListDataCategory(){
            this.$axios.get('categories')
            .then(res => {
                this.categoryProductList = res.data;
                console.log(this.categoryProductList)
            })
        },
    },
    mounted(){
        this.getListDataCategory();
    }
}

</script>