"use strict";
//Компонент для каждого продукта
const product = {
    props: ['product'],//передали массив товаров и картинку с помощью атрибутов, принимаем с помощью props
    template: `
             <div class="main-products-product" >
               <img class="main-products-product-img" :src="product.img" alt="photo" height="189">
               <span class="main-products-product-name">{{ product.product_name }}</span>
               <span class="main-products-product-price" > {{ product.price }} </span><span> руб.</span>
               <button class="main-products-product-button" @click="$root.$refs.basket.addProducts(product)">Добавить в корзину</button>
             </div>
    `
}

//Компонент для всех товаров каталога
const products = {
    components:{product},//вложенный компонент товар
    // props: ['products','userSearch'];
    data(){//глобальные свойства
        return{
            catalogUrl: "/catalogData.json",//файл, откуда мы берем товары
            products: [],//массив каталога товаров, который будет заполняться
            userSearch:"",//свойство для фильтра: то, что введем в инпут, моментально становится доступным в этом свойстве
        }
    },
    methods: {
        filterProducts(userSearch){//фильтрование товаров
            console.log('метод filterProducts действует');
            this.userSearch = userSearch;
            console.log(this.userSearch);
        }
    },

    mounted() {//c этого метода всё начинается
        this.$parent.getJson(`${API_URL + this.catalogUrl}`)//запускаем метод из главного скрипта
            .then(data => {//берем оттуда данные в формате JSON
                for (let element of data){//Проходимся по ним в цикле
                    this.products.push(element);//добавляем каждый элемент в массив продуктов
                }
            })
            .catch(error => {//если возникает ошибка, выводим ее в консоль
                console.log(error);
            })
    },

    computed: {//автоматически вычисляемое свойство
        filteredProducts() {//массив продуктов, отфильтрованный по значению поля поиска
                console.log('метод computed  - filteredProducts действует');
                const regexp = new RegExp(this.userSearch, 'i');
                return this.products.filter(product => regexp.test(product.product_name));
        }
    },
    template: `
    <div class="main-products container">
        <product v-for="product of filteredProducts" :product="product"></product>
    </div>
    `
}
