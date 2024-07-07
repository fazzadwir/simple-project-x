<template>
    <div>
        <h1 class="text-center white">Edit Product</h1>
    </div>

    <table class="table text-center">
        <tbody>
            <tr>
                <td v-if="!this.downloading">Sedang Memproses</td>
            </tr>
            <tr>
                <td v-if="this.downloading">
                    <form>
                        Title: <br><input type="text" v-model="title"><br>
                        Category: <br>
                        <select v-model="category" disabled>
                                <option v-for="(item, index) in categoryProductList" :key="index" :value="item.id">{{ item.name }}</option>
                        </select><br>
                        Description: <br><textarea v-model="description"/><br>
                        Price: <br><input type="number" v-model="price"><br>
                        <img :src="this.images" alt=""><br>
                        <input type="file" @change="listenFile" multiple>
                        <!-- Image URL: <br><input type="text" v-model="images"><br> -->
                            <br><button @click="routeToPageHome">Back</button><button class="submit" @click="editData">Submit</button>
                    </form>
                </td>
            </tr>
        </tbody>
    </table>

    

</template>

<script>

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

            file: null
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
            let image = null;

            if(this.file !== null){
                let formData = new FormData();
                formData.append("file", this.file[0]);

                this.$axios.post('files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then((response) =>{
                    alert('FIle ditambah!')
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
                        alert('Data diubah!')
                        this.$router.push({path: '/product'})
                    }) 
        }
    },
    mounted(){
        this.getMainId();
        this.getListDataCategory();
    }
}

</script>