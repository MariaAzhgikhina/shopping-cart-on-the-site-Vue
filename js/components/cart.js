/**
 * Created by asus on 10.08.2021.
 */
Vue.component('cart', {
    data() {
        return {
            basketURL: '/getBasket.json',
            catalogIMG: 'http://placehold.it/120x120',
            showCart: false,
            cartProducts: [],
        }
    },
    methods: {
        addProductToCart(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartProducts.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let product_new = Object.assign({quantity: 1}, product);
                            this.cartProducts.push(product_new);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeProductFromCart(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartProducts.find(el => el.id_product === product.id_product);
                        if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
                            find.quantity--;
                        } else { // удаляем
                            this.cartProducts.splice(this.cartProducts.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API+this.basketURL}`).then(data => {
            for (let d of data.contents) {
                this.cartProducts.push(d);
            }
        });
    },
    template: `<div>
                <button class="cart-btn" @click="showCart = !showCart">Корзина</button>
                <div class="cart-drop" v-show="showCart">
                    <cart-item class="cart-item" v-for="prod of cartProducts" 
                    :key="prod.id_product" 
                    :product="prod" 
                    :img="catalogIMG"
                    @remove="removeProductFromCart"></cart-item>
                    <div v-if="!cartProducts.length">Корзина пуста</div>
                </div>
                </div>`
});




Vue.component('cart-item', {
    props: ['img', 'product'],
    data: function () {
        return {

        }
    },
    template: `<div><img class="cart-img" :src="img">
                <div class="cart-text"> 
                    <p class="cart-title">{{ product.product_name }}</p>
                    <p class="cart-count">Кол-во: <span class="count-item">{{ product.quantity }}</span></p>
                    <p><span class="cart-price">{{ product.price }}</span> за ед.</p>
                    <p class="cart-allprice">{{ product.quantity*product.price }}</p>
                </div>
                <div class="delete-btn" @click="$emit('remove',product)">x</div>
                </div>`
});