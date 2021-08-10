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
                        let product_new = Object.assign({quantity:0}, product)
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
})




// class List {
//     constructor(url, container, list = list2) {
//         this.container = container;
//         this.url = url;
//         this.list = list;
//         this.goods = [];
//         this.allProducts = [];
//         this._init();    
//     }

//     _init(){
//         return false;
//     }

    

    

//     calcSumGoods(){
//         return this.allProducts.reduce((accum, item) => accum += item.price*item.quantity, 0)
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new this.list[this.constructor.name](product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('afterbegin', productObj.render());
//         }
//     }
// }


// class Item {
//     constructor (product, img = "http://placehold.it/120x120") {
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.id_product = product.id_product;
//         this.img = img;
//     }

//     render() {
//         return `<div class="product-item" data-id="${this.id_product}">
//                 <img src=${this.img} alt="">
//                 <div class="description">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price}</p>
//                     <button class="buy-btn" 
//                     data-name="${this.product_name}"
//                     data-price="${this.price}"
//                     data-id="${this.id_product}">Добавить</button>
//                 </div>
//             </div>`;
//     }
// }


// class ProductsList extends List{
//     constructor(cart, container = '.products', url = "/catalogData.json") {
//         super(url,container);
//         this.cart = cart;
//         this.getJson().then(data => this.handleData(data));
//     }
//     _init() {
//         document.querySelector(this.container)
//         .addEventListener('click', event => {
//             if (event.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(event.target);  //добавили в корзину
//             }
//         });
//     }
// }

// class ProductItem  extends Item {}

// class Cart extends List{
//     constructor(container = ".cart", url = "/getBasket.json"){
//         super(url, container);
//         this.getJson()
//         .then(data => {
//             this.handleData(data.contents);
//         });
//     }

//     addProduct(element) {
//         this.getJson(`${API}/addToBasket.json`)
//         .then(data => {
//             if (data.result === 1){
//                 let productId = +element.dataset['id'];
//                 let find = this.allProducts.find(product => product.id_product === productId);
//                 if (find){
//                     find.quantity++;
//                     this._updateCart(find);
//                     this._updateTotal();
//                 } else {
//                     let product = {
//                         id_product: productId,
//                         price: +element.dataset['price'],
//                         product_name: element.dataset['name'],
//                         quantity: 1
//                     };
//                     this.goods = [product];
//                     this.render()
//                     this._updateTotal();
//                 }
//             }
//             else {
//                 alert("error");
//             }
//         })
//     }

//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//         .then(data => {
//             if (data.result === 1){
//                 let productId = +element.dataset['id'];
//                 let find = this.allProducts.find(product => product.id_product === productId);
//                 if (find.quantity > 1){
//                     find.quantity--;
//                     this._updateCart(find);
//                     this._updateTotal();
//                 } else {
//                     this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                     document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     this._updateTotal();
//                 }
//             }
//             else{
//                 alert("error");
//             }
//         })
//     }

//     _updateCart(product){

//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.count-item').textContent = product.quantity;
//         block.querySelector('.cart-allprice').textContent = `${product.quantity*product.price}`;
//     }

//     _updateTotal() {
//         document.querySelector(this.container).querySelector('.total').textContent = this.calcSumGoods();
//     }

//     _init() {
        
//         document.querySelector('.cart-btn').addEventListener('click', () => {
//             this._updateTotal();
//             document.querySelector(this.container).classList.toggle('invisible')
//         });

//         document.querySelector(this.container).addEventListener('click', event => {
//             if (event.target.classList.contains('delete-btn')){
//                 this.removeProduct(event.target); 
//             }
//         })
//     }

// }
// class CartItem extends Item {
//     constructor(product, img = "http://placehold.it/120x120"){
//         super(product, img);
//         this.quantity = product.quantity;
//     }

//     render() {
//         return `<div class="cart-item" data-id="${this.id_product}">
//                 <img class="cart-img" src="${this.img}">
//                 <div class="cart-text"> 
//                     <p class="cart-title">${this.product_name}</p>
//                     <p class="cart-count">Кол-во: <span class="count-item">${this.quantity}</span></p>
//                     <p><span class="cart-price">${this.price}</span> за ед.</p>
//                     <p class="cart-allprice">${this.quantity*this.price}</p>
//                 </div>
//                 <div class="delete-btn" data-id="${this.id_product}">x</div>
//                 </div>`;
//     }
// }

// const list2 = {
//     'ProductsList': ProductItem,
//     'Cart': CartItem
//   };

// let cart = new Cart();
// new ProductsList(cart);