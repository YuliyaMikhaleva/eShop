"use strict";

//Задание 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

const txt = "Владимир Сергеевич с недоумением посмотрел на своего человека и торопливым шёпотом проговорил: 'Поди узнай, кто это...' ";
const replacetxt = txt.replace(/'/g, '"');
console.log(replacetxt);

//Задание 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
//Вариант 1:
const txt1 = "Владимир Сергеевич Aren't с недоумением посмотрел на своего человека и торопливым шёпотом проговорил: 'Поди узнай, кто это...' ";
const replacetxt1 = txt1.replace(/ '/g, '"');
console.log(replacetxt1);
//Вариант 2:
const txt2 = "Владимир Сергеевич Aren't с недоумением посмотрел на своего человека и торопливым шёпотом проговорил: 'Поди узнай, кто это...' ";
const replacetxt2 = txt2.replace(/'\B/g, '"');//найдет только те слова, где ' это не граница слова
console.log(replacetxt2);

//Задание 3
// Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
//     a. Имя содержит только буквы.
//     b. Телефон имеет вид +7(000)000-0000.
//     c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
//     d. Текст произвольный.
//     e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.


//сначала из всех полей формы формируем объекты
const name = document.querySelector('#name');
const mobile = document.querySelector('#mobile');
const email = document.querySelector('#email');


//Затем создадим блоки ошибок, которые изначально скрыты, и будут отображаться в случае ошибки ввода данных
const nameError = document.querySelector('#nameError');
const mobileError = document.querySelector('#mobileError');
const emailError = document.querySelector('#emailError');

//проверка имени: оно должно состоять из букв русского или английского алфавита
const regestName = /[a-zA-Zа-яА-Я]/g;
//проверка номера телефона: должен иметь вид +7(000)000-0000.
const regestMobile = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
//проверка электронной почты: вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
const regestEmail = /^\w+[.-]?\w+@\w+\.[a-z]+$/;

//проверка произвольного текста не нужна, т.к. можно использовать любой символ
let submit = document.querySelector('#submit');
let form = document.querySelector('form')
form.addEventListener('submit', function(event){
    //проверка имени
    if (regestName.test(name.value)){
        name.style.border = "2px solid green";
    } else {
        name.style.border = "2px solid red";
        nameError.style.display = "block";
    }

    //проверка номера телефона
    if (regestMobile.test(mobile.value)){
        mobile.style.border = "2px solid green";
    } else {
        mobile.style.border = "2px solid red";
        mobileError.style.display = "block";
    }

    //проверка адреса электронной почты
    if (regestEmail.test(email.value)){
        email.style.border = "2px solid green";
    } else {
        email.style.border = "2px solid red";
        emailError.style.display = "block";
    }
});
















// https://github.com/sokoloverov/js-/blob/l4/HomeWorks2/scriptcart.js
//
//
// const arrNames = [];
// const name = document.querySelectorAll('#name');
// name.addEventListener('keyup',function (event) {
//     arrNames.push(event.key);
// })
//
// //затем проверяем заполненные поля
//
// let button = document.querySelector('#submit');
// button.addEventListener('click', function (event) {
//     event.preventDefault();
//     formName.classList.add('submitButton');
//
//     //проверка с регулярными выражениями
//     let nameUser = arrNames.join('');//объединим все слова с пробельным разделителем
//
//
// })