/* Test JS
alert("Start pushing"); */

// DOM Variables
let InitialDataBtn = document.querySelector("#loadDataBtn");

//Initial and Registered Users Arrays
let InitUserArr = [];
let UsersArr = [];

//Users Object
let Users = {
    "registeredUsers": UsersArr
}

//Users Object Constructor
function User(name, balance) {
    this.name = name;
    this.balance = balance;
}

//Initial Users Adding/Registering function
function AddInitialUser(name, balance) {
    let initUser = new User(name, balance);
    InitUserArr.push(initUser);
}

//User Adding/Registering function
function AddUser(name, balance) {
    let user = new User(name, balance);
    let UserObjToStr = JSON.stringify(user);
    let strToObj = JSON.parse(UserObjToStr);
    UsersArr.push(strToObj);
}


//function for Loading 5 initial data into localStorage
function loadInitialData() {
    localStorage.clear();
    AddInitialUser("Peter", 200);
    AddInitialUser("Alain", 20);
    AddInitialUser("James", 1000);
    AddInitialUser("Judy", 300);
    AddInitialUser("Rachel", 2000);

    for (i = 0; i < InitUserArr.length; i++) {
        let initialUser = JSON.stringify(InitUserArr[i]);
        localStorage.setItem(i, initialUser);
        UsersArr.push(JSON.parse(initialUser));
    }

    alert("Loading Initial Data into Local Storage and Registered Users Complete !");
}

//On-click Events template
/* InitialDataBtn.addEventListener(
    'click',
    function () {
    }
); */

InitialDataBtn.addEventListener(
    'click',
    function () {
        loadInitialData();
    }
);

