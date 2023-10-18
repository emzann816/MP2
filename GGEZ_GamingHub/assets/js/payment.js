// import { formatCurrency, user } from './utils.js';

function cartList(){
    let array = JSON.parse(localStorage.getItem("order"));
    let uniqueArray = [... new Map(array.map(item => [item["id"], item])).values()];
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
        totalCost.innerHTML = `-----`;
        totalShipping.innerHTML = `-----`;
        totalVat.innerHTML = `-----`;
        sumOfall.innerHTML = `-----`;
    }else{
        uniqueArray.forEach(
            (item) => {

              itemCount = array.filter(existingItem).length;
              function existingItem(items){
                  return items.id == item.id;
              }
              let multiPrice = Number(itemCount * item.price);

            product += `<div class="col-3 text-center p-1 summary"><img src="${item.img}"/></div>
            <div class="col-4 text-start p-1 summary">${item.product}</div>
            <div class="col-3 text-center p-1 summary">${item.category}</div>
            <div class="col-2 text-end p-1 summary">Qty.${itemCount}</div>`;
            totalPrice += Number(multiPrice);
            totalTax = Number((totalPrice + totalSf) * 0.12);
            totalSum = Number(totalPrice + totalSf + totalTax);
        })
        let output = formatCurrency(totalPrice, "php");
        showItem.innerHTML = product;
        totalCost.innerHTML = output;
        let output2 = formatCurrency(totalSf, "php");
        totalShipping.innerHTML = output2;
        let output3 = formatCurrency(totalTax, "php");
        totalVat.innerHTML = output3;
        let output4 = formatCurrency(totalSum,"php");
        sumOfall.innerHTML = output4
        
    }
}

function currentDate(){
    let date = new Date();
    date.setDate(date.getDate() + 5);
    let result = date.toString().slice(0, 15);
    let current = document.getElementById("arrivalDate");

    current.innerHTML = `Estimated arrival date is by <strong>${result}</strong>.`
};

function initialize() {

  const card = document.querySelector('.debitCredit');
  const paypal = document.querySelector('.paypal');
  const ewallet = document.querySelector('.ewallet');
  const cod = document.querySelector('.cod');
  const lbc = document.querySelector('.lbc');
  const jt = document.querySelector('.jt');
  const lala = document.querySelector('.lalamove');
  let fname = document.getElementById('firstname').value;
  let lname = document.getElementById('lastname').value;
  let mobnum = document.getElementById('mobilenum').value;
  let bdate = document.getElementById('date').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;
  let province = document.getElementById('province').value;
  
      if( fname == "" || lname == "" || mobnum == "" || bdate == "" || address == "" || city == "" || province == ""){
          alert('Please fill up required form');
      }
  
      if(!lbc.checked && !jt.checked && !lala.checked){
          alert('Please choose your Delivery Options');
        }
      if(!card.checked && !paypal.checked && !ewallet.checked && !cod.checked){
        alert('Please choose your Payment Options');
      }else{
        showModal("YOUR PAID");
        return;
      }

}

function showModal(message) {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

function closeModal() {
  let itemArray = JSON.parse(localStorage.getItem("order"));
  let orderList = itemArray;

  localStorage.setItem("listofOrder", JSON.stringify(orderList));
  localStorage.removeItem("order");
  window.location.href = "catalogue.html";
}



function formatCurrency(value, currency){
  let userLanguage = window.navigator.language;
       return new Intl.NumberFormat(userLanguage,{
           style: "currency",
           currency: currency,
       }).format(value);
};


currentDate();
cartList();