<template>
    <div class="cart">
        <div class="cart_parametrs">
            <span class="cart_part">Название товара</span>
            <span class="cart_part">Количество</span>
            <span class="cart_part">Цена за шт.</span>
            <span class="cart_part">Итого</span>
            <span class="cart_part"></span>
        </div>
        <BasketItem v-bind:key="good.id" v-for="good of basket" v-bind:good="good" />
        <!--        Здесь будут добавлены товары в корзине-->
        <div class="newProducts">
        </div>
        <div class="cart_summ">
            <span>Товаров в корзине на сумму:<span class="basket_summ">{{ totalSumm }}</span>рублей</span>
        </div>

    </div>
</template>




<script>
    import BasketItem from "./BasketItem";

    export default {
        name: "Basket",
        components:{
            BasketItem
        },
        computed:{
            basket(){
                return this.$store.getters.getCart
            },
            totalSumm(){
                return this.$store.getters.getCart.reduce((acc, good) => acc + good.finishprice, 0)
            }
        },

    }
</script>

<style scoped>

</style>

//при запросе методом GET при открытии страницы  '/cart'
app.get('/api/cart', (req, res) => {
fs.readFile('./server/data/cart.json', 'utf-8', (err, data) => {
res.send(data);//выведется наша корзина
});
});