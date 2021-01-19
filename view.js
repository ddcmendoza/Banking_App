const USERCONTAINER = document.getElementsByClassName("user-container")[0];

for(let i = 0; i < window.localStorage.length; i++){
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let obj = JSON.parse(localStorage[i]);
    h2.innerHTML = obj.user;
    p.innerHTML = "Balance : Php " + obj.balance;
    div.appendChild(h2);
    div.appendChild(p);
    div.id = "userbox";
    div.classList.add("user" + i);
    USERCONTAINER.appendChild(div);
}

