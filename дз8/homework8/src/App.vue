<!--App.vue - стартовый корневой компонент, в котором подключаются все остальные-->

<!--шаблон-->
<!--router-view - компонент который предоставлен нам плагином router: внутри него отрисовываются наши компоненты страницы-->
<!--внутри папки src есть папка router - Внутри нее есть файлик Index.js - конфигурация наших страниц-->
<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";

  export default {
    components: {
      Header,
      Footer
    },
    //метод dispatch вызывает actions
    mounted() {
      this.$store.dispatch('loadCatalog');//автоматически будет вызываться прогрузка каталога
      this.$store.dispatch('loadBasket');//автоматические будет вызываться прогрузка корзины
    }
  }
</script>

<!--стили нашего компонента (атрибу lang отвечает за препроцессор, атрибут scoped за использование только внутри компонента-->
<style lang="scss">
/*@import url('@/assets/style/style.scss');*/
</style>
