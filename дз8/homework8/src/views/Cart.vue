<template>
    <div class="home">
        <Products/>
    </div>
        <CartSection/>
</template>

<script>
    import Products from "../components/Products";
    import CartSection from "../components/Basket";

    export default {
        name: "Cart",
        components:{
            Products,
            CartSection
        }
    }
</script>

<style scoped>

</style>


