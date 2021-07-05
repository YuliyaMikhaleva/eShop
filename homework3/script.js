"use strict";
//у нас есть API(путь к нашему ресурсу в интернете), из которого мы будем брать товары
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Функция запроса на промисах
function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

//Создадим класс ТОВАР КАТАЛОГА, на основе которого будут создаваться другие однотипные товары: на вход будут
// поступать имя продукта и цена, а возвращаться будет разметка на каждый товар
class GoodsItem {
  constructor(id_product, product_name, price, img = "img/standart.jpg") {
    this.id_product = id_product; //id товара
    this.product_name = product_name; //название товара
    this.price = price; //цена товара
    this.img = img; //изображение товара
  }
  render() {
    return `
      <div class="main-products-product">
        <img class="main-products-product-img" src=${this.img} alt="photo" height="189">
        <span class="main-products-product-name">${this.product_name}</span>
        <span class="main-products-product-price" id="this.id_product" > ${this.price}</span><span> руб.</span>
        <button class="main-products-product-button" data-productId="${this.id_product}">Добавить в корзину</button>
      </div>
    `;
  }
}

//СПИСОК ТОВАРОВ КАТАЛОГА
class GoodsList {
    constructor() {
        this.goods = [];// массив объектов с товарами из JSON документа
    }
    // fetchGoods(){
    //     return fetch (`${API_URL}/catalogData.json`)
    //     .then (data => data.json())
    //     .catch (error => {
    //         console.log("error: ", error);
    //     });
    // }
    fetchGoods() {//считывание данных с сервера и отрисовка на странице
        makeGETRequest( `${API_URL}/catalogData.json`, (good) => { //принимает на вход ссылку сервера.
            this.goods = JSON.parse(good); //преобразовываем json-строку и прописываем в массив
            this.render(); //отрисовываем на странице
            this.calcAllGoods(); //считаем сумму товаров на страницу
            this.init();//назначаем обработчика клика всем кнопкам "добавить в корзину"
        })
    }
    render() {//вывод всех товаров
        let listHtml = ''; // объявляем ListHTML как пустую строку
        this.goods.forEach((good) => {//перебираем весь массив наших товаров и для каждого товара
            //создаем goodItem на основе класса GoodsItem
          const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
          listHtml += goodItem.render();//отрисованный каждый товар добавляем в listHtml
        });
        //и этот listHtml записываем в блок с классом main-products на страницу
        document.querySelector('.main-products').innerHTML = listHtml;
    }

    calcAllGoods() {//подсчет суммы всех товаров
        let totalPrice = 0;//изначально итоговая сумма равна 0
        this.goods.forEach((good) => {//перебираем все товары в каталоге
            if (good.price !== undefined) {//Если цена известна
                totalPrice += good.price;//то добавляем ее к итоговой сумме
            }
        });
        let totalGoodsAnswer = "Все товары на сумму " + totalPrice + " рублей"; //итоговая строка
        document.querySelector('.main-sum').innerHTML = totalGoodsAnswer; //записать ее надо в указанном блоке
    }
    init(){
        //перебираем все кнопки с атрибутом productId и каждой из них по нажатию кнопки назначаем метод addToCart
        document.querySelectorAll('button[data-productId]').forEach(function (button) {
            button.addEventListener('click', function (event) {
                basket.addToCart(event);
            })
        });
    }
}

// Класс ЭЛЕМЕНТ КОРЗИНЫ
class BasketItem {
    constructor(id_product, product_name, price, img = "img/standart.jpg", ) {
        this.id_product = id_product; //id товара
        this.product_name = product_name; //название товара
        this.price = price; //цена товара
        this.img = img; //изображение товара
    }
    render(){
        return `
          <div class="basket-item" id="${this.id_product}">
           <span class="cart_part">${this.product_name}</span>
           <span class="cart_part"><span id="${this.id_product}"  class="product_number">1</span> шт.</span>
           <span class="cart_part"><span id="${this.id_product}"  class="product_price">${this.price}</span> руб.</span>
           <span class="cart_part"><span class = "summOfRow" id="${this.id_product}"  class="product_price">${this.price}</span> руб.</span>
           <button class="deleteProduct" id="${this.id_product}" data-productId="${this.id_product}">Удалить товар</button>
          </div>
        `;
    }
}

//Класс КОРЗИНЫ
class Basket {
    constructor() {
        this.basketGoods = []; //пустой массив товаров корзины:здесь будет храниться количество каждого товара и цены
    }
    init(){
        //при нажатии на иконку корзины, корзина будет отображаться или скрываться обратно
        document.querySelector('.cart-button').addEventListener('click', () => {
            document.querySelector('.cart').classList.toggle('hidden');
        });
    }
    //добавить в корзину
    addToCart(event) {
        let productId = event.currentTarget.getAttribute('data-productId');//Значение атрибута у элемента по которому мы кликнули
        this.changeOfCounter();//увеличить счетчик товаров корзины на 1
        this.changeButtonStyle(event);//изменить стиль кнопки
        this.addInObject(productId);//добавляем конкретный товар в объект корзины
        this.renderProductsInCard(productId);//отрисовываем объект корзины в виде списка с количеством, ценами и окончательной стоимостью
        this.calculateTotalSumm();//подсчитывает суммарную стоимость товаров в корзине
    }

    //увеличение счетчика товаров корзина на 1 (справа вверху)
    changeOfCounter() {
        let counter = document.querySelector('.counter'); //объект счетчика товаров в верхнем правом углу
        counter.textContent++;
    }

    //изменение стиля кнопки по нажатию
    changeButtonStyle(event) {
        event.target.style.backgroundColor = "green";
        event.target.textContent = "Товар добавлен";
    }

    //добавление товара в объект корзины
    addInObject(productId) {
        let basketCart; //создаем объект basketCart
        list.goods.forEach(function (item) {//перебираем массив товаров каталога и для каждого товара применяем функцию
            if(productId == item.id_product){//если id товара, по которому мы нажали, и id товара каталога в цикле совпадет
                basketCart = { //записываем в объект данный товар со всеми свойствами ниже
                    id_product: item.id_product,
                    img: item.img,
                    product_name: item.product_name,
                    price: item.price
                }
            }
        });
        this.basketGoods.push(basketCart);//добавляем в массив корзины этот объект товара
        console.log(this.basketGoods);//выводим в консоль объект корзины товаров
    }

    //отрисовывание корзины на странице
    renderProductsInCard(productId){//в параметре указываем id товара, чтобы знать, что отрисовывать
        //ищем элемент на странице, отвечающий за количество товара с этим id
        let renderProduct = document.querySelector(`.product_number[id = "${productId}"]`);
        if (renderProduct){//если количество не равно 0
            this.increaseProductsCount(productId);//увеличиваем количество товара с этим id в корзине
            this.recalculateCartSum(productId);//пересчитываем сумму всех товаров этого вида, с этим id в корзине
        } else {
            this.render();//отрисовываем его на странице
        }
    }

    //увеличивание количества товара с выбранным id на 1
    increaseProductsCount(productId){
        let productsCount = document.querySelector(`.product_number[id = "${productId}"]`);
        productsCount.textContent++;
    }

    //пересчитывание суммы за товар с выбранным id
    recalculateCartSum(productId){
        let sumOfKind = document.querySelector(`.summOfRow[id = "${productId}"]`);
        let productsCount = document.querySelector(`.product_number[id = "${productId}"]`);
        let productPrice = document.querySelector(`.product_price[id = "${productId}"]`);
        let sum = productsCount.textContent * productPrice.textContent;
        sumOfKind.textContent = sum;
    }

    //вывод всех товаров
    render(){
        let basketHtml = ""; // объявляем basketHTML как пустую строку
        this.basketGoods.forEach((basket) => {//перебираем весь массив наших товаров в корзине и для каждого товара
            //создаем goodItem на основе класса GoodsItem: то есть у каждого элемента будет id,название, цена, изображение
            let basketElement = new BasketItem(basket.id_product, basket.product_name, basket.price, basket.img)
            basketHtml = basketElement.render();//отрисованный каждый товар добавляем в basketHtml
        });

        // вставляем полученный массив в блок с классом newProducts
        document.querySelector('.newProducts').insertAdjacentHTML('afterbegin', basketHtml);

        // назначение обработчика события клика по кнопке "удалить товар"
        document.querySelectorAll('.deleteProduct').forEach(function (button) {
            button.addEventListener('click', function (event) {
                let productId = event.currentTarget.getAttribute('data-productId')
                basket.deleteProduct(productId); //удадить товар
            })
        })
    }

    //удаление товара с выбранным id
    deleteProduct(productId){
        this.changeNumber();//уменьшить счетчик товаров корзины на 1
        this.deleteFromObject(productId);//удаляем товар из объекта
        this.renderProductsInCardAfterDelete(productId);//отрисовываем объект после удаления
    }

    //уменьшение счетчика товаров корзины на 1
    changeNumber(){
        let counter = document.querySelector('.counter'); //объект счетчика товаров в верхнем правом углу
        if (+counter.textContent > 0){ //если значение счетчика >0
            counter.textContent--;// то уменьшаем значение на 1
        } else {
            counter.textContent = "0";//иначе значение равно 0
        }
    }

    //удаление товара из объекта с выбранным id
    deleteFromObject(productId) {
        let basketDelete;//создаем новую переменную
        //перебираем массив корзины. и к каждому элементу корзины применяем функцию (на
        this.basketGoods.forEach(function (item, i) {//2 параметра: элемент корзины и число
            let thisId = item.id_product; //создаем новую переменную = это значение id у элемента
            if (productId == thisId){// если выбранное id(на которое мы нажали) равно id элемента корзины
                basketDelete = i;//новая переменная будет равна порядковому числу
            }
        });
        //удаляем из корзины товаров 1 товар c порядкового номера товара с выбранным id
        this.basketGoods.splice(basketDelete, 1);
        console.log(this.basketGoods);//выводим в консоль объект товаров
    }

    //отрисовывание объекта корзины после удаления товара
    renderProductsInCardAfterDelete(productId){
        //ищем элемент количество товара с выбранным id
        let renderProduct = document.querySelector(`.product_number[id = "${productId}"]`);
        if (renderProduct){// если количество товара с выбранным id не равно 0
            this.calculateTotalSumm();//подсчитываем суммарную стоимость товаров в корзине
            this.reduceProductsCount(productId);//уменьшаем количество товара с выбранным id
            this.recalculateCartSum(productId);//пересчитываем сумму за вид товара
        } else {
            this.render();//отрисовываем на странице
        }
    }

    //уменьшение количества товара с выбранным id
    reduceProductsCount(productId){
        let productsCount = document.querySelector(`.product_number[id = "${productId}"]`);
        productsCount.textContent--;
        if (productsCount.textContent == "0"){//если количество товаров с выбранным id = 0
            this.clearItem(productId);//очистить блок того товара, где количество = 0
        }
    }

    //удаление элементов с выбранным id в корзине
    clearItem(productId){
        let basketHtml = ""; // объявляем basketHTML как пустую строку
        let basketItem = document.querySelector(`.basket-item[id = "${productId}"]`);
        basketItem.innerHTML = basketHtml;
    }

    //подсчет итоговой суммы всех товаров
     calculateTotalSumm(){
         let totalSumm = 0; //изначально сумма = 0
         this.basketGoods.forEach((basket) =>{//перебираем корзину товаров
             totalSumm += basket.price;//и для каждого элемента добавляем к сумме цену
         })
         let basketSumm = document.querySelector('.basket_summ');
         basketSumm.textContent = totalSumm; //записываем итоговую сумму в блоке с классом "basket_summ"
     }

}

const list = new GoodsList(); //создаем каталог товаров на основе класса GoodsList. Здесь же подсчитывается сумма всех товаров
const basket = new Basket(); //создаем корзину товаров на основе класса Basket.
basket.init();//показать корзину или скрыть корзину
list.fetchGoods(); //каталог товаров считывается с сервера и записывается в наш [массив], отрисовывается и подсчитывается сумма всех товаров




