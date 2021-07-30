import { createStore } from 'vuex'

export default createStore({
    //хранилище
    state: {
        catalog:[],
        cart:[]
    },

    //Функции, через которые осуществляется доступ к state на чтение (получить 1 товар, получить список товаров)
    getters: {
        //получение каталога товаров
        getCatalog(state){
            return state.catalog//эта функция возвращает каталог из хранилища state
        },
        //получение корзины
        getCart(state){
            return state.cart//эта функция возвращает корзину из хранилища
        }
    },
    //Методы, которые что-то записывают в этот state (добавить товар, удалить товар)
    mutations: {
        //установка каталога товаров
        setCatalog(state, payload) { state.catalog = [...state.catalog, ...payload]} ,
        //принимает всегда сначала state, а вторым параметром какой-то параметр, который мы передаем в коммит, называет его Payload
        // в квадратных скобках объединение двух массивов чтобы этот action добавлял новые значения(а можно просто  state.catalog = payload)
        //то есть мы в state записываем новый массив как объединение того что было с тем, что добавили
        // addToCart(state, goodId) {//Добавить в корзину
        //     const goodInCart = state.cart.find((good)=> good.id === goodId)//найдем этовар в корзине
        //     if (goodInCart){//если он существует
        //         goodInCart.count++//увеличиваем его количество
        //         console.log (state.cart);
        //     } else {//если его нет, то ищем внутри каталога
        //         const good = state.catalog.find((good)=>good.id === goodId)//найдем этовар в каталоге
        //         state.cart.push({count:1, ...good});//добавляем его в массив в количестве 1 штуки
        //         console.log (state.cart);
        //     }
        // },
        setBasket(state,payload){ state.cart = [...state.cart, ...payload]},
        addToCart(state, good) {//Добавить в корзину
            const goodInCart = state.cart.find((element)=> element.id_product === good.id_product)//найдем этовар в корзине
            if (goodInCart){//если он существует
                goodInCart.count++//увеличиваем его количество
                goodInCart.finishprice = goodInCart.count * goodInCart.price;
                console.log (state.cart);
            } else {//если его нет, то ищем внутри каталога
                const product = Object.assign({count: 1, finishprice: good.price}, good)//создаем объект с количеством 1 и ценой равной продуктовой цены
                state.cart.push(product);
                console.log (state.cart);
            }
        },
        deleteFromCart(state,good){
            if (good.count>1){//Если количество товара больше 0
                good.count--;//уменьшаем количество на единицу
                good.finishprice = good.count * good.price; //пересчитываем стоимость за вид товара
                this.totalSumm -= good.price; //пересчитываем итоговую стоимость за всю корзину товаров
            }   else {
                let find = state.cart.find((element) => element.id_product === good.id_product);
                //удаляем из корзины товаров 1 товар с порядкового номера това с выбранным id
                this.state.cart.splice(state.cart.indexOf(find),1)//удаляем из массива корзины 1 товар начиная с индекса выбранного товара
                console.log(state.cart);
                this.totalSumm -= good.price;//пересчитываем итоговую стоимость за всю корзину товаров
            }
        },


    },

    //действия, которые мы делаем со state - методы для запроса к базе данных или к серверу - асинхронные
    //в основном для работы с API
    actions: {
        //загрузка каталога товаров
        loadCatalog({commit}) {//принимаем объект, в котором есть метод commit, который вызывает мутации
            return fetch('api/good')//вызываем метод fetch который обращается на сервер (когда приходит ответ вызывается функция после then
                .then((response) => {//после запроса мы получаем ответ от сервера (response) в виде текстовой строки в формате json, нам ее надо распарсить
                    return response.json()//эту строку в json формате превращаем в вид обычного объекта и возвращает нам новый промиc (текст ответа парсим из Json Формата в формат массива)
                })
                //поэтому пишем еще один Then куда приходят данные в виде массива goodsList
                .then((goodsList) => {//после этого в state создадим новую переменную catalog
                    commit('setCatalog', goodsList)//и этот goodsList мы передаем с помощью функции commit передаем специальной мутации 'setCatalog', поэтому запишем в mutations
                })
        },
        loadToCart({commit}, good) {
                // commit('addToCart', good)//передаем в коммит good.id, чтобы вызвать мутацию addToCart
                // console.log(good);
                fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *client
                    body: JSON.stringify(good)
                })

                    .then(commit('addToCart', good))
        },
        loadFromCart({commit},good){
            commit('deleteFromCart',good)
            console.log(good);
            fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(good)
            })
        },
        loadBasket({commit}){
            return fetch('/api/cart')
                .then((response) => { return response.json()})
                .then((basketList)=> {
                    commit('setBasket', basketList)
                })
        }

    },
        //modules - если у нас очень большое приложение, мы можем разбивать этот файл на разные файлы
        //чтобы все данные в 1 файле не хранить
        //создадим в папочке store новый файл goods.js (например). В нем пишем
        //export default {state:{}, getters:{}, mutations:{}}
        // и этот объект подключаем в основной компонент - index.js (в папке store)
        // import goods from './goods'
        //и прописываем его в модули: goods
        //и так будут в основном модули подключаться, а в остальных уже свой state, свои getters, mutations, actions
        //но мы сейчас разбивать не будем, т.к. наше приложение небольшое, компонентов немного
        // modules: {}
})


//мы в App.vue в mounted вызываем этот action, он отправляет запрос на сервер, получает данные, эти данные он отправляет в мутацию setCatalog,
// а эта мутация записывает state
//потом пересоберем проект npm run build и запускать с 3000-порта
