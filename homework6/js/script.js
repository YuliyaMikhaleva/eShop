"use strict";
//у нас есть API(путь к нашему ресурсу в интернете), из которого мы будем брать товары
const API_URL = 'https://raw.githubusercontent.com/YuliyaMikhaleva/online-store-api/master/response';
//создаем объект vue
const app = new Vue({
    el: "#app",
    data: {//глобальные свойства объекта (поля класса)
        catalogUrl: "/catalogData.json",//файл, откуда мы берем товары
        products: [],//массив каталога товаров, который будет заполняться
        imgCatalog: "img/standart.jpg",//путь к изображению для всех товаров
        searchLine: "",//свойство для фильтра: то, что введем в инпут, моментально становится доступным в этом свойстве
        isVisibleCart: false,//свойство для корзины, отвечающие за видимость корзины
        cartItems: [],//товары корзины
        counter: 0, //счетчик товаров в корзине
        dataError: false//по умолчанию ошибки нет
    },
    components: {products, basket, search, footerform, error},
    methods: {
        getJson(url) {//метод, который дает возможность преобразовать наш url, извлекать из него данные
            // и преобразовать в объект js
            return fetch(url)//передаем ссылку
                .then(result => result.json())//в случае успешного выполнения преобразовываем данные в формат json
                .catch(error => {//в случае ошибки в консоли выведется ошибка
                    console.log(error);//выводим ошибку в консоль
                    this.dataError = true; //меняем о
                })
        },
    },

    mounted() {//c этого свойства начинается работа программы
        console.log(this.searchLine);
    },
})


