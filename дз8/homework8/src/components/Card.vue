<template>
    <div class="main-products-product">
        <img class="main-products-product-img" :src="good.img" alt="photo" height="189">
        <span class="main-products-product-name"> {{ good.product_name }}</span>
        <span class="main-products-product-price"> {{ good.price }}<span> рублей</span></span>
        <button v-on:click="addToCart" class="main-products-product-button">Добавить в корзину</button>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props:['good'],
        methods: {
            addToCart() {
                this.$store.dispatch('loadToCart', this.good);//dispatch вызывает action
                // console.log(this.good)
            }
        }
    }
</script>

<style scoped>

</style>