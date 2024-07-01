<template>
    <div>
        <h1 class="text-center white">Category List</h1>
        <table class="table text-center">
            <thead>
                <tr>
                    <td>No.</td>
                    <td>Name</td>
                    <td>Image</td>
                    <!-- <td>Aksi</td> -->
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="9" v-if="!this.downloading">Sedang mengunduh data</td>
                </tr>
                <tr v-for="(item, index) in categoryProductList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.name}}</td>
                    <td><img :src="item.image?item.image:'no-image'" alt="" style="width: 100px;"></td>
                    <!-- <td>
                        <button
                        @click="routeToEdit(item.id)"
                        >Edit</button>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default{
    name: 'category',
    data() {
        return {
            downloading: false,
            categoryProductList: []
        }
    },
    methods: {
        getListDataCategory(){
            const timeout = 500;

            this.$axios.get('categories')
            .then(res => {

                setTimeout(() => {

                    this.downloading = true;
                    this.categoryProductList = res.data;
                     
                }, timeout);
            })
            
            this.downloading = false;


        },
        // routeToEdit(id){
        //     this.$router.push('edit/' + id);
        // }
    },
    mounted() {
        this.getListDataCategory();
    }
}
</script>