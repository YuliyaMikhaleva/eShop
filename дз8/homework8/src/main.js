//main.js - это входной файл
import { createApp } from 'vue'// импортируется функция createApp
import App from './App.vue'//импортируется стартовый компонент App.vue - корневой компонент, внутри которого подключаются все остальные
import router from './router'//доп плагин, в нем будут храниться наши странички
import store from './store'//это vuex

//С помощью функции createApp говорим, что мы создаем приложение на основе базового компонента App.vue используя store
// и router, и подключаем всё это в элемент с id="app", который у нас в index.html
createApp(App).use(store).use(router).mount('#app')
