function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username.length < 6){
        alert(`Need to input ${6 - password.length} more characters for your username.`)
        }
    
    if(password.length < 9){
        alert(`Need to input ${9 - password.length} more characters for your password.`)
        }
    else{let login_arr = [];
        login_arr.push({email: username});
        sessionStorage.setItem("login", JSON.stringify(login_arr));
        window.location.href = "catalogue.html";
    }
    
}
