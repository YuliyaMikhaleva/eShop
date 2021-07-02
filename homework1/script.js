"use strict";
//Массив со списком товаров. Для каждого товара определим название и цену:
const goods = [
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

//Функция, которая будет возвращать разметку для конкретного товара, подставляя его название и цену.

const renderGoodsItem = (img="img/standart.jpg", title="товар на изображении", price) => {
  return `
  <div class="main-products-product">
    <img class="main-products-product-img" src=${img} alt="photo" height="189">
    <span class="main-products-product-name">${title}</span>
    <span class="main-products-product-price"> ${price}<span> рублей</span></span>
    <button class="main-products-product-button">Добавить в корзину</button>
</div>
  `;
};

//Функция, которая будет собирать все товары в один и записывать его в контейнер .main-products:
//const renderGoodsList = (list) => {//в переменную renderGoodsList запишем функцию, в которой параметр - массив с товарами
//  let goodsList = list.map(item => renderGoodsItem(item.img, item.title, item.price));//в переменную goodsList будет записваться, как каждый элемент массива будет отрисовываться в html-разметке
//  document.querySelector('.main-products').innerHTML = goodsList;//а затем вставляться в блок с классом main-products
//}
//1) list можно указывать не в скобках, тк параметр только один
//2) можно убрать лишнюю переменную goodsList, и вставить одно выражение в другое.


//Функция, которая будет собирать все товары в один и записывать его в контейнер .main-products:
const renderGoodsList = list => {
  document.querySelector('.main-products').innerHTML = list.map(item => renderGoodsItem(item.img, item.title, item.price)).join("");//а затем вставляться в блок с классом main-products
}

renderGoodsList(goods);//так мы вызываем вышестоящую функцию






