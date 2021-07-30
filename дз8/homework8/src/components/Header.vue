<template>
    <header class="page-header">
        <navbar class="page-header-navbar">
            <router-link to="/" class="page-header-navbar-img">
                <img src="img/logo.png" alt="logo">
            </router-link>
            <div class="page-header-navbar-txt">

                <search ref="search" :products="products" :searchLine="searchLine" ></search>

                <a class="page-header-navbar-txt-link" href="#">Products</a>
                <router-link to="Cart" class="cart-button" type="button" @click="isVisibleCart = !isVisibleCart">
                    <i class="fas fa-shopping-cart cart-button-basket"></i>
                    <span class="counter">{{ cartCount }}</span>
                </router-link>
            </div>
        </navbar>
        <span class="page-header-txt">Trekking</span>
    </header>
</template>

<script>
    export default {
        name: "Header",

        computed:{
            cartCount(){
                return this.$store.getters.getCart.reduce((acc,good) => acc + good.count, 0)
            }
        }
    }
</script>

<style scoped>

</style>


