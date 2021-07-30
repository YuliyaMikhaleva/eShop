<template>
    <div class="newProducts">
        <div class="basket-item" id="{{ good.id_product }}">
            <span class="cart_part">{{ good.product_name }}</span>
            <span class="cart_part"><span class="product_number">{{ good.count }}</span> шт.</span>
            <span class="cart_part"><span class="product_price">{{ good.price }}</span> руб.</span>
            <span class="cart_part"><span class = "summOfRow product_price">{{ good.finishprice }}</span> руб.</span>
            <button v-on:click="deleteFromBasket" class="deleteProduct" data-productId="{{ good.id_product }}" >Удалить товар</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BasketItem",
        props: ['good'],
        methods: {
            deleteFromBasket() {
                this.$store.dispatch('loadFromCart', this.good);//dispatch вызывает action
                // console.log(this.good)
            }
        }
    }
</script>

<style scoped>

</style>

