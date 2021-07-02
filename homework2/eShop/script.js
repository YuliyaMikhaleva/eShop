"use strict";
//Создадим класс GoodsItem для товара, чтобы на его основе создавать другие однотипные товары
class GoodsItem{
  constructor(img, title, price) {
    this.img = img;
    this.title = title;
    this.price = price;
  }
  render(){//вывод 1го товара на страницу
    return `
      <div class="main-products-product">
        <img class="main-products-product-img" src=${this.img} alt="photo" height="189">
        <span class="main-products-product-name">${this.title}</span>
        <span class="main-products-product-price"> ${this.price}<span> рублей</span></span>
        <button class="main-products-product-button">Добавить в корзину</button>
      </div>
    `;
  }
}

//теперь создадидим второй класс GoodsList. В качестве свойства ему добавим массив со списком товаров,
// изначально сделаем его пустым
class GoodsList {
  constructor() {
    this.goods = [];//пустой массив товаров
  }
  fetchGoods(){//метод для заполнения этого списка товаров
    this.goods = [
      { img: "img/1t_shirt.png",title: 'Футболка спортивная', price: 650 },
      { img: "img/2pants.png", title: 'Брюки для треккинга', price: 2000 },
      { img: "img/3backpack.png", title: 'Рюкзак Salomon 20л.', price: 3000 },
      { img: "img/4giacket.png", title: 'Лёгкий пуховик для треккинга', price: 5000 },
      { img: "img/5shoes.png", title: 'Треккинговые ботинки', price: 5500 },
      { img: "img/6t_shirts.png", title: 'Спортивная футболка женская', price: 650 },
      { img: "img/7membran.png", title: 'Куртка мембранная', price: 10000 },
      { img: "img/8очки.png" , title: 'Очки солнцезащитные', price: 2499 },
      { img: "img/9флис.png", title: 'Флисовая кофта', price: 999 },
      { img: "img/10панама.png", title: 'Панама для походов', price: 750 },
      { img: "img/11шорты.png", title: 'Шорты женские', price: 1500 },
      { img: "img/12носки.png", title: 'Носки треккинговые', price: 500 },
    ];
  }
  //Метод для вывода списка товаров на страницу. Для каждого элемента массива goods будем создавать экземпляр класса GoodsItem и запрашивать его разметку
  render(){
    let listHtml = " ";
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.img, good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.main-products').innerHTML = listHtml;
  }

 //Функция определяет суммарную стоимость всех товаров каталога
  calculateSumOfCatalog(){
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price;
    });
    document.querySelector('.main-sum').innerText = `Сумма всех товаров каталога равна: ${sum} рублей`;
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.calculateSumOfCatalog();

//Добавим пустой класс для корзины товаров
class Basket {
  constructor(title,price) {
    this.BasketProducts = [];
  }
  renderNewProduct(){}//отрисовывание в корзине нового продукта в количестве 1 шт
  calculateSum(){}//Подсчитать итоговую сумму выбранных товаров для оплаты
  increaseProductsCount(){}//если данный товар уже добавлен, увеличить количество повторного товара
  recalculateSumOfProducts(){}//подсчет суммы за вид товара за указанное количество
  clearBasket(){}//очистить корзину
}

//Добавим пустой класс для элемента корзины товаров
class BasketProduct{
  constructor() {

  }
  render(){}  //отобразить элемент на странице
}







