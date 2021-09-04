import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

//здесь мы перечисляем какие вообще в приложении есть страницы. Сейчас их 2: home и about
const routes = [
  {
    path: '/',//на главной страничке
    name: 'Home',//имя страницы
    component: Home// какой компонент мы загружаем в router-view - компонент Home.vue в папке views
  },
  {
    path: '/cart',
    name: 'Cart',//имя страницы
    component: Cart// какой компонент мы загружаем в router-view - компонент Cart.vue в папке views
  },

]

//в App.vue есть тег <router-view/> - туда загружаются уже компоненты наших страниц, которые мы загрузили в папку views (в каждой странице есть свой template,script,styles)
//Если внутри другого нужно вывести еще один компонент то просто <Названиекомпонента/>
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
