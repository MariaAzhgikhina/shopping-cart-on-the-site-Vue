/**
 * Created by asus on 03.08.2021.
 */

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        products: [],
        filtered: [],
        catalogURL: '/catalogData.json',
        basketURL: '/getBasket.json',
        searchLine: '',
        showCart: false,
        cartProducts: [],
        catalogIMG: 'http://placehold.it/120x120'
    },
    methods: {
        getJson(url) {
            return fetch(url ? url : `${API+this.url}`)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        addProductToCart(product) {
            this.getJson(`${API}/addToBasket.json`)
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
            this.getJson(`${API}/deleteFromBasket.json`)
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
        filterProducts() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted(){
        this.getJson(`${API+this.catalogURL}`).then(data => {
           for (let d of data) {
               this.products.push(d);
               this.filtered.push(d);
           } 
        });
        this.getJson(`${API+this.basketURL}`).then(data => {
            for (let d of data.contents) {
                this.cartProducts.push(d);
            } 
        });
    }
});