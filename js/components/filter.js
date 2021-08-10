/**
 * Created by asus on 10.08.2021.
 */
Vue.component('search', {
    data() {
        return {
            searchLine: '',
        }
    },
    template: ` <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filterProducts(searchLine)">
                    <input type="text" class="search-field" v-model="searchLine">
                    <button class="btn-search" type="submit" @click="$root.$refs.products.filterProducts(searchLine)">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});