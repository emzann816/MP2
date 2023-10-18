function myOrder(){

    let orderSource = JSON.parse(localStorage.getItem("listofOrder"));
    
    let list = document.getElementById("myorderContainer");
    let greeting = document.getElementById("greeting");
    let greetingText = "";
    let myList = "";
    let itemCount = 0;
    let subTotal = document.getElementById("subtotalOrderprice");
    let subTotal2 = 0;
    let totalDelcharge = document.getElementById("totalDelcharge");
    let delcharge = 125;
    let totalTax = document.getElementById("totalTax");
    let tax = 0;
    let totalPaid = document.getElementById("totalPaid");
    let receiptNum = document.getElementById("receiptNum");
    let receiptNum2 = document.getElementById("receiptNum2");
    let receipt = "";
    let invoiceDate = document.getElementById("invoiceDate");
    let date = new Date();
    date.setDate(date.getDate());
    let result = date.toString().slice(0, 15);

    if (orderSource == null || orderSource == ""){
        list.innerHTML = `<div class="mb-2"><p>You don't have any order yet.</p></div>`;
        subTotal.innerHTML = `Subtotal: -----`;
        totalDelcharge.innerHTML = `Shipping Fee: -----`;
        totalTax.innerHTML = `VAT: -----`;
        totalPaid.innerHTML = `PAID: -----`;
        receiptNum.innerHTML = `Receipt Voucher:`;
        receiptNum2.innerHTML = `Receipt Voucher:`;
        greeting.innerText = `No History of Orders.`;

    }else{
        let uniqueArray = [... new Map(orderSource.map(item => [item["id"], item])).values()];
        uniqueArray.forEach((item) => {

            itemCount = orderSource.filter(existingItem).length;
                function existingItem(item){
                    return item.id == item.id;
                }
                let multiPrice = Number(itemCount * item.price);
    
            myList += `<div class="col-md-2 orderImg mb-1">
                        <!-- contain image of order -->
                        <img src="${item.img}"
                        class="img-fluid" alt="Phone">
                    </div>
                    <div class="col-md-3 text-center fw-bold d-flex justify-content-center align-item-center orderName">
                        <!-- contains order name -->
                        <p class="text-muted mb-2">${item.product}</p>
                    </div>
                    <div class="col-md-3 text-center fw-bold d-flex justify-content-center align-item-center">
                        <!-- contains order category -->
                        <p class="text-muted mb-2  orderCategory">${item.category}</p>
                    </div>
                    <div class="col-md-2 text-center fw-bold d-flex justify-content-center align-item-center orderQty">
                        <!-- contains order qty -->
                        <p class="text-muted mb-2">Qty: ${itemCount}</p>
                    </div>
                    <div class="col-md-2 text-center fw-bold d-flex justify-content-center align-item-center">
                        <!-- contains order price -->
                        <p class="text-muted mb-2 fw-bold" id="orderPrice">${formatCurrency(multiPrice, "php")}</p>
                    </div>`;
                    subTotal2 += Number(multiPrice);
                    tax = Number(multiPrice*0.12);
                    receipt = `Receipt #: GGEZ12019C-A1P`;
                    greetingText = `Thank you for shopping!`;

                    
        });
        list.innerHTML = myList;
        subTotal.innerHTML = `Subtotal: ${formatCurrency(Number(subTotal2/1.12), "php")}`;
        totalDelcharge.innerHTML = `Shipping Fee: ${formatCurrency(delcharge, "php")}`;
        totalTax.innerHTML = `VAT: ${formatCurrency(tax, "php")}`;
        totalPaid.innerHTML = `PAID: ${formatCurrency(subTotal2, "php")}`;
        receiptNum.innerHTML = receipt; 
        receiptNum2.innerHTML = receipt;
        invoiceDate.innerHTML = `<strong>${result}</strong>`;
        greeting.innerText = greetingText;
    } 
}

function formatCurrency(value, currency){
    let userLanguage = window.navigator.language;
         return new Intl.NumberFormat(userLanguage,{
             style: "currency",
             currency: currency,
         }).format(value);
};

function currentDate(){
    let current = document.getElementById("delivDate");
    let array = JSON.parse(localStorage.getItem("listofOrder"));
    let date = new Date();
    date.setDate(date.getDate() + 5);
    let result = date.toString().slice(0, 15);


    if(array == null || array == ""){
        current.innerHTML = "";
    }else{
        current.innerHTML = `<strong>${result}</strong>.`
    }
    
};

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

myOrder();
currentDate();
showQuantity();
user();

