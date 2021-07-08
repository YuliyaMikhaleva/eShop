"use strict";

//Создадим  Hamburger, на основе которого будут создаваться однотипные объекты
class Hamburger {
    constructor(name,price,kkal) {
        this.name = name;
        this.price = price;
        this.kkal = kkal;
    }
    addHamburger(){
        let markup = `
        <p>
        <input type="radio" name="hamburger_size" data-price="${this.price}" data-kkal="${this.kkal}" class="products">${this.name}
        </p>
        `;
        let part1 = document.querySelector('.size');
        part1.insertAdjacentHTML('beforeend',markup);
    }
}

let NewHamburger1 = new Hamburger('Маленький',50, 20);
NewHamburger1.addHamburger();
let NewHamburger2 = new Hamburger('Большой',100, 40);
NewHamburger2.addHamburger();

//Класс Stuffing будет наследовать все свойства класса Hamburger
class Stuffing extends Hamburger{
    constructor(name,price, kkal) {
        super(name, price, kkal);
    }
    addStaffing(){
        let markup = `
        <p>
            <input type="checkbox" name="hamburger_staffing" data-price="${this.price}" data-kkal="${this.kkal}" class="products">${this.name}
        </p>        
        `;
        let part2 = document.querySelector('.staffing');
        part2.insertAdjacentHTML('beforeend',markup);
    }
}

let NewStaffing1 = new Stuffing('Сыр',10, 20);
NewStaffing1.addStaffing();
let NewStaffing2 = new Stuffing('Салат',20, 5);
NewStaffing2.addStaffing();
let NewStaffing3 = new Stuffing('Картофель',15, 10);
NewStaffing3.addStaffing();

//Класс Topping будет наследовать все свойства класса Hamburger
class Topping extends Hamburger{
    constructor(name,price, kkal) {
        super(name, price, kkal);
    }
    addTopping(){
        let markup = `
        <p>
            <input type="checkbox" name="hamburger_topping" data-price="${this.price}" data-kkal="${this.kkal}" class="products">${this.name}
        </p>        
        `;
        let part3 = document.querySelector('.topping');
        part3.insertAdjacentHTML('beforeend',markup);
    }

}

let NewTopping1 = new Topping('Приправа',15, 0);
NewTopping1.addTopping();
let NewTopping2 = new Topping('Майонез',20, 5);
NewTopping2.addTopping();

//Создадим объект кнопки Рассчитать
let button = document.querySelector('button');
//По нажатию кнопки срабатывает функция getResult
button.addEventListener('click', getResult);
let products = document.querySelectorAll('.products');

/**
 * Функция перебирает все элементы массива и если элемент отмечен (в позиции checked), то значение атрибута добавляется
 * к сумме. Эта сумма записывается на страницу
 */
function getResult() {
    let price = 0;
    let kkal = 0;
for (let i = 0; i < products.length; i++) {//перебираем все элементы объекта продуктов
    if (products[i].checked){
        price += +(products[i].getAttribute('data-price'));
        kkal += +(products[i].getAttribute('data-kkal'));
    }
}
    let finishPrice = document.querySelector('.finish_price');
    finishPrice.innerHTML = price;
    let finishKkal = document.querySelector('.finish_kkal');
    finishKkal.innerHTML = kkal;
}

