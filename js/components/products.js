/**
 * Created by asus on 10.08.2021.
 */
Vue.component('products', {
    data: function () {
        return {
            products: [],
            filtered: [],
            catalogURL: '/catalogData.json',
            catalogIMG: 'http://placehold.it/120x120'
        }
    },
    methods: {
        filterProducts() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API+this.catalogURL}`).then(data => {
            for (let d of data) {
                this.products.push(d);
                this.filtered.push(d);
            }
        });
    },
    template: `<div class="products">
                    <product v-for="prod of filtered" :key="prod.id_product" :img="catalogIMG" :product="prod"></product>
                </div>`
});


Vue.component('product', {
    props: ['img', 'product'],
    template: `<div class="product-item">
                    <img :src="img" alt="">
                    <div class="description">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }}</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addProductToCart(product)">Добавить</button>
                    </div>
               </div>`
});