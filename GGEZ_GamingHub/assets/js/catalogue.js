// import { formatCurrency, user, showQuantity } from './utils.js';

let dataSources = { 
    "Playstation5" : "./data/psapi.js",
    "Playstation4" : "./data/ps4api.js",
    "Nintendo Switch" : "./data/nwsapi.js",
    "XBOX" : "./data/xboxapi.js",
    "PC Mac" : "./data/pcmacapi.js",
    "Accessories" : "./data/accesoriesapi.js",
    "Digital Store" : "./data/digitalstoreapi.js",
    "Iphones" : "./data/iphonesapi.js"
}

function catalogueTitles(){
    const category = localStorage.getItem("category");
    let title = `${category}`;
    let catalogueName = document.getElementById("catalogueTitle");
    catalogueName.innerText = title;
}


let items = [];

function addToCart(index){
    let logIn = JSON.parse(sessionStorage.getItem("login"));

    if(logIn == null){
        alert(`Please Log-In to proceed your order.`);
        window.location.replace("login.html");
    }else{
        //reference to current item
        let item = items[index];
        let itemArray = JSON.parse(localStorage.getItem("order"));
        let orderList = itemArray || [];

        orderList.push({id: item.id, product: item.product, price: item.price, img: item.img, category: item.category});
        localStorage.setItem("order", JSON.stringify(orderList));
        showQuantity();
    }    
}



function initialize() {
    const category = localStorage.getItem("category");
    document.title = `${category}`;
    const url = dataSources[category];
    fetch(url)
    .then(response => response.json())  //object fetching
    .then(result => {
        items = result;
        let cards = "";
        let cardsArea = document.getElementById("cards");
        result.forEach((item, index) => {
            cards += `<div class="card d-inline-flex me-1 ms-1 mt-2 mb-2" style="width: 11rem; height: 22rem"><div class="bg-warning text-start w-50 " style="font-size:12px; width:110px;" id="price${item.id}"> SAVE ${formatCurrency(item.save, "php")}</div>
                    <center><img src="${item.img}" id="image${item.id}" class="card-img-top mt-3" alt="${item.product}"></center>
                    <div class="card-body">
                    <h5 class="card-title fs-6 fw-bold align-content-center text-center" id="product${item.id}">${item.product}</h5>
                    <p class="card-text  my-1 "style="font-size:17px;" id="price${item.id}">${formatCurrency(item.price, "php")}</p>
                    <p class="card-text my-1 text-decoration-line-through text-muted" style="font-size:13px;" id="price${item.id}">${formatCurrency(item.previous, "php")}</p>
                    <!-- Button trigger modal -->
                    <center><button type="button" class="btn btn-info btn-outline-dark mx-0 ms-0" style="width:90px;" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${item.id}" onclick="proceedCheckout(${index})">
                    Buy now
                    </button>
                    <button type="button" class="btn btn-info btn-outline-dark mx-0" style="width:40px;" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${item.id}" onclick="addToCart(${index})"><i class="fa fa-shopping-cart mx-0"></i></button></center> 

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content ">
                                <div class="modal-header bg-primary-subtle">
                                    
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <br>
                                <div class="modal-body text-center" style="font-size: 20px; font-weight: 500;">
                                    Your Item is Added to Your Cart! <i class="fa fa-thumbs-up text-warning"></i> <i class="fas fa-smile text-warning"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        });
        cardsArea.innerHTML = cards;
    })
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


function loginBtn(){
    let user = JSON.parse(sessionStorage.getItem("login"));

    if(user == null || user == ""){
        window.location.href = "login.html";
    }else{
        alert(`Already Logged In, Please Log-out to Proceed on other account`);
    }   
}



catalogueTitles();
user();
initialize();
showQuantity();
