// import { formatCurrency, user, showQuantity } from './utils.js';

let items = [];
function cartList(){
    let array = JSON.parse(localStorage.getItem("order"));
    let showItem = document.getElementById("cartItem");
    let product = "";
    let totalCost = document.getElementById("totalPrice");
    let totalPrice = 0;
    let totalShipping = document.getElementById("totalShipping");
    let totalSf = 125;
    let totalVat = document.getElementById("totalVat");
    let totalTax = 0;
    let sumOfall = document.getElementById("sumOfall");
    let totalSum = 0;
    let itemCount = 0;
    if(array == null || array == ""){
        showItem.innerHTML = `<p class="text-center">No item added to your cart. Please continue shopping.</p>`;
        totalCost.innerHTML = `-----`;
        totalShipping.innerHTML = `-----`;
        totalVat.innerHTML = `-----`;
        sumOfall.innerHTML = `-----`;
    }else{
        let uniqueArray = [... new Map(array.map(item => [item["id"], item])).values()];
        
        uniqueArray.forEach(
            (item, index) => {
            itemCount = array.filter(existingItem).length;
            function existingItem(items){
                return items.id == item.id;
            }
           

            let multiPrice = Number(itemCount * item.price);

            product += `<div class="col-2 text-center p-1 summary"><img src="${item.img}"/></div>
            <div class="col-3 text-center p-1 fw-bold">${item.product}</div>
            <div class="col-3 text-center p-1">${itemCount} pc(s)</div>
            <div class="col-2 text-center p-1">${formatCurrency(multiPrice, "php")}</div>
            <div class="col-1 text-center p-1"><i class="fa-solid fa-trash-can m-lg-1" onclick="del(${index})"></i></div>`
        
            totalPrice += Number(multiPrice);
            totalTax = Number((totalPrice + totalSf) * 0.12);
            totalSum = Number(totalPrice + totalSf + totalTax);
            
        })
        showItem.innerHTML = product;
        totalCost.innerHTML = formatCurrency(Number(totalPrice/1.12), "php");
        totalShipping.innerHTML = formatCurrency(totalSf, "php");
        totalVat.innerHTML = formatCurrency(totalTax, "php");
        sumOfall.innerHTML = formatCurrency(totalPrice, "php");
        
    }
}




function del(id){
    let orderList = JSON.parse(localStorage.getItem("order"));

    orderList.splice(id, 1);
    localStorage.setItem("order", JSON.stringify(orderList));

    cartList();
    showQuantity();
}



function initialize() {
    let url = `./data/checkoutItemapi.js`;
    fetch(url)
    .then(response => response.json())  //object fetching
    .then(result => {
        items = result;
        let cards = "";
        let cardsArea = document.getElementById("cards");
        result.forEach((items, index) => {
            cards += `<div class="card d-inline-flex bg-light w-100 h-100 text-center" style="width: 18rem;">
                    <center><img src="${items.img}" id="image${items.id}" class="card-img-top mx-2" alt="${items.product}"></center>
                    <div class="card-body ">
                    <h5 class="card-title fs-6 fw-bolder" id="product${items.id}">${items.product}</h5>
                    <p class="card-text price" id="price${items.id}">${formatCurrency(items.price, "php")}</p>
                    <a class="btn btn-primary" id="${items.id}" onclick="addTocart(${index})">Add to Cart</a>
                </div> 
            </div>`
        });
        cardsArea.innerHTML = cards;
    })
}

function addTocart(index){
    //reference to current item
      let item = items[index];
        let itemArray = JSON.parse(localStorage.getItem("order"));
        let orderList = itemArray || [];

        orderList.push({id: item.id, product: item.product, price: item.price, img: item.img, category: item.category});
        localStorage.setItem("order", JSON.stringify(orderList));
        showQuantity();
}



function showQuantity(){
    let quantityList = document.getElementById("quantity");
    let bilang = 0;
    let quantity = JSON.parse(localStorage.getItem("order"));
    if (quantity == null || quantity == ""){
        quantityList.innerText = 0;
    }else{
        quantity.forEach(
            () => {
                bilang += 1;
            }
        );
        quantityList.innerHTML = bilang;
    }
}

function formatCurrency(value, currency){
    let userLanguage = window.navigator.language;
         return new Intl.NumberFormat(userLanguage,{
             style: "currency",
             currency: currency,
         }).format(value);
};

function user(){
    let name = JSON.parse(sessionStorage.getItem("login"));
    let userName = document.getElementById("loginName");
    let startName = "";
    if(name) {
        name.forEach(
            (username) => {
                startName = ` Hi ${username.email}`;
            }
        )
    }

    userName.innerText = startName;   
}

function proceedCheckout(){
    let itemArr = JSON.parse(localStorage.getItem("order"));
    let btn = document.getElementById("checkOut")

    if (itemArr == null || itemArr == ""){
        alert(`You have 0 items in your Cart. Please continue Shopping.`)
    }else{
        window.location.href = "payment.html"
    }
}

function loginBtn(){
    let user = JSON.parse(sessionStorage.getItem("login"));

    if(user == null || user == ""){
        window.location.href = "login.html";
    }else{
        alert(`Your are already Logged In, Please Log-out to Proceed on other account`);
    }   
}


user();
initialize();
showQuantity();
cartList();
