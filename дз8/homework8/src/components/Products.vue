<template>
    <div class="main-products container">
        <div class="main-products container">
            <Card v-bind:key="good.id"  v-bind:good="good" v-for="good of catalog" />
        </div>
<!--        <Product v-for="product of filteredProducts" :product="product" />-->
    </div>
</template>

<script>
    import Card from "./Card";

    export default {
        name: "Catalog",
        components:{
            Card
        },
        computed:{
            catalog(){
                return this.$store.getters.getCatalog
            }

        }


    }
</script>

<style scoped>

</style>