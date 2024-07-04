<template>
    <div>
        <h1 class="text-center white">Product List</h1>
        <button @click="routeAddProduct">Add Product</button>
        <table class="table text-center">
            <thead>
                <tr>
                    <td>No.</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td class="desc">Description</td>
                    <td class="category">Category</td>
                    <!-- <td colspan="3" class="img">Image</td> -->
                    <td class="img">Image</td>
                    <td>Aksi</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="9" v-if="!this.downloading">Sedang mengunduh data</td>
                </tr>
                <tr v-for="(item, index) in dataProductList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.title}}</td>
                    <td>{{ item.price}}</td>
                    <td class="desc">{{ item.description}}</td>
                    <td class="category">{{ item.category}}</td>
                    <!-- <td class="img"><img :src="item.image" alt="" style="width: 100px;"></td> -->
                    <td class="img"><img :src="item.image1" alt="" style="width: 100px;"></td>
                    <!-- <td class="img"><img :src="item.image2" alt="" style="width: 100px;"></td> -->
                    <!-- <td class="img"><img :src="item.image3" alt="" style="width: 100px;"></td> -->
                    <td>
                        <button
                        class="edit"
                        @click="routeToEdit(item.id)"
                        >Edit</button>
                        <button
                        class="delete"
                        @click="deleteItem(item.id)"
                        >Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default{
    name: 'addProduct',
    data() {
        return {
            downloading: false,
            dataProductList: []
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
    },
    mounted() {
        this.getListDataProduct();
    }
}
</script>