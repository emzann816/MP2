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

function selectCategory() {
    let categories = document.querySelectorAll(".category");
    categories.forEach(function(category) {
        category.addEventListener("click", function(choose) {
            //set active category
            localStorage.setItem("category", choose.target.getAttribute("data-key"));
            window.location.href = "catalogue.html";
        })
    })
}

function showQuantity(){
    let quantityList = document.getElementById("quantity");
    let bilang = 0;
    let quantity = JSON.parse(localStorage.getItem("order"));
    if (quantity == null || quantity == ""){
        quantityList.innerHTML = bilang;
    }else{
        quantity.forEach(
            () => {
                bilang += 1;
            }
        );
        quantityList.innerHTML = bilang;
    }
}


function loginBtn(){
    let user = JSON.parse(sessionStorage.getItem("login"));

    if(user == null || user == ""){
        window.location.href = "login.html";
    }else{
        alert(`Already Logged In, Please Log-out to Proceed on other account`);
    }   
}

function logout(){
    let user = JSON.parse(sessionStorage.getItem("login"));
    let btn = document.getElementById("logoutBtn");
    let logoutBtn = "";

    if(user){
        logoutBtn = `<!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" style="font-size:12px;" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
         Log off <i class="fa fa-sign-out"></i>
        </button>
      
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">LOGOFF?</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Are you sure, you want to Log-out?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="proceedLogout()">Confirm</button>
              </div>
            </div>
          </div>
        </div>`;
        btn.innerHTML = logoutBtn;
    }
}

function proceedLogout(){
    localStorage.removeItem("order");
    sessionStorage.removeItem("login");
    window.location.href = "index.html";
    logout();
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position){
    let x = document.getElementById("location");
    x.innerHTML = `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`;
}

user();
selectCategory();
showQuantity();
logout();
getLocation();