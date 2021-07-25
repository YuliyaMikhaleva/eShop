"use strict";
//поиск на странице
const search = {
    props:['searchLine','products'],
    template:
        `
    <form action="#">
      <input type="text" class="goods-search" v-model="searchLine" @input="$root.$refs.products.filterProducts(searchLine)">
<!--      <button class="buttonSearch">Поиск</button>-->
    </form>  

    `
}

// Vue.component('search', {
//     props:['products', 'userSearch'],
//     template:
//     `
//     <form action="#">
//       <input type="text" class="goods-search" v-model="$parent.userSearch" @input="$parent.filterProducts(userSearch)">
// <!--      <button class="buttonSearch">Поиск</button>-->
//     </form>
//
//     `
// })