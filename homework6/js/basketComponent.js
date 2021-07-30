"use strict";
//Компонент для 1го товара корзины
const basketItem = {
    props: ['product'],
    template:
        `
    <div class="newProducts">
        <div class="basket-item" id="{{ product.id_product }}">
            <span class="cart_part">{{ product.product_name }}</span>
            <span class="cart_part"><span id="{{ product.id_product }}"  class="product_number">{{ product.count }}</span> шт.</span>
            <span class="cart_part"><span id="{{ product.id_product }}" class="product_price">{{ product.price }}</span> руб.</span>
            <span class="cart_part"><span class = "summOfRow" id="{{ product.id_product }}"  class="product_price">{{ product.finishprice }}</span> руб.</span>
            <button class="deleteProduct" id="{{ product.id_product }}" data-productId="{{ product.id_product }}" @click="$parent.removeProducts(product)">Удалить товар</button>
        </div>
    </div>
    `
}

//Компонент для корзины товаров, вёрстка

const basket = {
    props:['is-visible-cart'],
    components:{basketItem},
    data(){
        return{
            isVisibleCart:false,//свойство для корзины, отвечающие за видимость корзины
            cartItems:[],//товары корзины
            totalSumm:0,//итоговая сумма товаров
        }
    },
    methods: {
        //добавление товара в корзину
        addProducts(product){
            this.$parent.counter++;//будет увеличиваться счетчик товаров в корзине
            console.log(product.id_product);
            this.addInObjectBasket(product); //добавление товара в объект корзины
            this.totalSumm += product.price; //итоговая сумма будет прибавлять цену товара, который добавили
        },

        //добавление товара в объект корзины
        addInObjectBasket(product){
        //ищем в массиве товаров корзины среди элементов корзины такой товар,
        // у которого id будет равно нами выбранному
            let itemId = this.cartItems.find((element) => element.id_product === product.id_product);
            if (itemId){//если такой товар нашли
                itemId.count++;//увеличиваем его количество на 1 (product.count указывали в верстке)
                itemId.finishprice = itemId.count * itemId.price; //пересчитываем сумму за товар сумму этим id
            } else {//иначе
                //создаем объект товара с количеством 1 и суммарной стоимостью равной цене товара
                const good = Object.assign({count: 1, finishprice: product.price}, product);
                this.cartItems.push(good);//добавляем этот товар в массив товаров в корзине
            }
        },
        //Удаление товара из корзины
        removeProducts(product){
            this.$parent.counter--;//уменьшаем счётчик товаров на 1
            if (product.count>1){//Если количество товара больше 0
                product.count--;//уменьшаем количество на единицу
                product.finishprice = product.count * product.price; //пересчитываем стоимость за вид товара
                this.totalSumm -= product.price; //пересчитываем итоговую стоимость за всю корзину товаров
            } else {//иначе
                this.deleteFromObject(product);//удаляем товар с выбранным id из объекта корзины
                this.totalSumm -= product.price;//пересчитываем итоговую стоимость за всю корзину товаров
            }
        },
        //Удаление товара из объекта корзины
        deleteFromObject(product){
            let basketDelete; //создаем новую переменную
            //перебираем массив корзины, и каждому элементу передаем функцию
            this.cartItems.forEach(function (element, i) {//в которую передаем 2 параметра: элемент корзины и число
                  if (element.id_product == product.id_product){//если значение id нажатого товара совпадает с элементом корзины
                      basketDelete = i;// мы будем знать порядковый номер этого элемента
                  }
            })
            //удаляем из корзины товаров 1 товар с порядкового номера това с выбранным id
            this.cartItems.splice(basketDelete, 1);
            console.log(this.cartItems)
        },
    },
    mounted(){

    },
    template://создаем шаблон корзины
        `
        <div class="cart" v-if="isVisibleCart">
            <div class="cart_parametrs">
                <span class="cart_part">Название товара</span>
                <span class="cart_part">Количество</span>
                <span class="cart_part">Цена за шт.</span>
                <span class="cart_part">Итого</span>
                <span class="cart_part"></span>
            </div>
            <p v-if="!cartItems.length">Нет данных</p>
            <basket-item v-for="product of cartItems" :product="product"></basket-item>
        <div class="cart_summ">
            <span>Товаров в корзине на сумму:<span class="basket_summ">{{ totalSumm }}</span>рублей</span>
        </div>
    `
}

