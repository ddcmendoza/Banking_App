/*
TO DO:
Repair Implementation so history will not be display here
[done]
*/


//div container for users
const USERCONTAINER = document.getElementsByClassName("user-container")[0];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Php',
    minimumFractionDigits: 2
  })

//Create child div containers for every item in the local storage, append to parent
for (let i = 0; i < window.localStorage.length-1; i++) {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let obj = JSON.parse(localStorage[i]);
    h2.innerHTML = obj.user;
    p.innerHTML = "Balance : " + formatter.format(obj.balance);
    div.appendChild(h2);
    div.appendChild(p);
    div.id = "userbox";
    div.classList.add("user" + i);
    USERCONTAINER.appendChild(div);
}

// Add on click values? notes.