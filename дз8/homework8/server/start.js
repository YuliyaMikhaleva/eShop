"use strict";
let express = require('express');//импортируем модуль express
let fs = require('fs');//импортируем модуль связанный с работой с файлами
var bodyParser = require ('body-parser'); //используем боди-парсер чтобы правильно раскодировать запрос

const app = express();//с помощью app вызываем конструктор express

var jsonParser = bodyParser.json()// он раскодирует json запрос
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

const moment = require('moment'); //импортируем модуль, который отвчает за время

// app.use (bodyParser.json());//Указываем, что содержимое - JSON
app.use(express.static('./dist'));//используем некий плагин, чтоб автоматически считывались статические файлы (сразу же откроется наш html)
// app.use('/', express.static('public'));//автоматически запускается index.html

//при запросе методом GET на странице '/catalog'
app.get('/api/good', (req, res) => {//путь прописывается не от файла,
                                // в котором прописываются, а от той директории из которой мы запускаем
    fs.readFile('./server/data/catalog.json', 'utf-8', (err, data) => {
        res.send(data);//выведется наш каталог из файлика на страницу
    });
});

//при запросе методом GET при открытии страницы  '/cart'
app.get('/api/cart', (req, res) => {
    fs.readFile('./server/data/cart.json', 'utf-8', (err, data) => {
        res.send(data);//выведется наша корзина
    });
});

// при запросе методом POST при открытии страницы '/cart', на вход ставим jsonParse вторым параметром
app.post('/api/cart', jsonParser, (req, res) => {
    fs.readFile('./server/data/cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;

        const productInCart = cart.find((el) => el.id_product === item.id_product)
        if (productInCart){
            productInCart.count++;
            productInCart.finishprice = productInCart.count * productInCart.finishprice;
        } else {
            const element = Object.assign({count:1 }, item, {finishprice:item.price})
            cart.push(element);
        }



        fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, 4), (err) => {
            // console.log('done');
            console.log(cart)
            // res.send('ok')
        });
    },

    //одновременно записываем статистику действий пользователей
    fs.readFile('./server/data/stat.json', 'utf-8', (err, data) => { //файловая система считывает файл stat.json
        const stat = JSON.parse(data);// массив товаров корзины
        const product = {//создаем объект product (товар, который мы покупаем) со следующими полями
            "название товара": req.body.product_name,
            "действие": "добавлено",
            "время": moment().locale('RU').format('DD MMMM YYYY, HH:mm:ss')
        };
        stat.push(product);//этот товар добавляем в массив корзины

        //записываем в файл stat.json
        fs.writeFile('./server/data/stat.json', JSON.stringify(stat, null, 4), (err) => {
            console.log('done');//в консоль выводим done
            // res.send('ok')//в ответ выводим ок
        });
    }))})





// при запросе методом DELETE при открытии страницы '/cart', на вход ставим jsonParse вторым параметром
//Удаление товара
app.delete('/api/cart', jsonParser, (req, res) => {
    fs.readFile('./server/data/cart.json', 'utf-8', (err, data) => { //файловая система считывает файл cart.json

        const cart = JSON.parse(data);// массив товаров корзины

        const item = req.body;//это данные файла, которые мы покупаем

        let find = cart.find((element) => element.id_product === item.id_product);//проверяем есть ли тот товар на который мы нажали уже в корзине
        if (find.count > 1){//если количество этого товара в корзине >1
                find.count --;//уменьшаем его на 1
        } else {// иначе
            cart.splice(cart.indexOf(find),1);//удаляем из массива корзины 1 товар начиная с индекса выбранного товара
        }

        //записываем в файл cart.json (в файл корзины товаров) строку Json
        fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, 4), (err) => {
            console.log('done');//в консоль выводим done
            // res.send('ok')//в ответ выводим ок
        });
    });

    //одновременно записываем статистику действий пользователей
    fs.readFile('./server/data/stat.json', 'utf-8', (err, data) => { //файловая система считывает файл cart.json
        const stat = JSON.parse(data);// массив товаров корзины
        const product = {//создаем объект product (товар, который мы покупаем) со следующими полями
            "название товара": req.body.product_name,
            "действие": "удалено",
            "время": moment().locale('RU').format('DD MMMM YYYY, HH:mm:ss')
        };
        stat.push(product);//добавляем файл, который мы покупаем, в этот массив

        //записываем в файл cart.json (файл корзины товаров) строку Json
        fs.writeFile('./server/data/stat.json', JSON.stringify(stat, null, 4), (err) => {
            console.log('done');//в консоль выводим done
            // res.send('ok')//в ответ выводим ок
        });
    });
});

// при запросе методом PUT при открытии страницы '/cart', на вход ставим jsonParse вторым параметром
//обновление количества товара
app.put('/api/cart', jsonParser, (req, res) => {
    fs.readFile('./server/data/cart.json', 'utf-8', (err, data) => { //файловая система считывает файл cart.json
        const cart = JSON.parse(data);// массив товаров корзины
        const item = req.body;//это данные файла, которые мы покупаем
        let find = cart.find((element) => element.id_product === item.id_product);//проверяем есть ли тот товар на который мы нажали уже в корзине
        if (find){//если такой товар в корзине найден
            find.count++;//увеличиваем его количество на 1
        }

        //записываем в файл cart.json (файл корзины) строку Json
        fs.writeFile('./server/data/cart.json', JSON.stringify(cart, null, 4), (err) => {
            console.log('done');//в консоль выводим done
            // res.send('ok')//в ответ выводим ок
        });
    });

    //одновременно записываем статистику действий пользователей
    fs.readFile('./server/data/stat.json', 'utf-8', (err, data) => { //файловая система считывает файл cart.json
        const stat = JSON.parse(data);// массив товаров корзины
        const product = {//создаем объект product (товар, который мы покупаем) со следующими полями
            "название товара": req.body.product_name,
            "действие": "добавлено",
            "время": moment().locale('RU').format('DD MMMM YYYY, HH:mm:ss')
        };
        stat.push(product);//этот товар добавляем в массив корзины

        //записываем в файл cart.json (файл корзины товаров) строку Json
        fs.writeFile('./server/data/stat.json', JSON.stringify(stat, null, 4), (err) => {
            console.log('done');//в консоль выводим done
            // res.send('ok')//в ответ выводим ок
        });
    });
});



//запускаем сервер через слушатель
app.listen(3000, () => {
    console.log('server is running on port 3000!');
});












