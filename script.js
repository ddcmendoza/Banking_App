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
function User(user, balance = 0) {
    this.user = user;
    this.balance = balance;
}

//Initial Users Adding/Registering function
function AddInitialUser(user, balance) {
    let initUser = new User(user, balance);
    InitUserArr.push(initUser);
}

//Check if user's name being added has a number
function validateName(str) {
    var re = /^[A-Za-z]+$/;
    if (re.test(str)) {
        return true;
    }
    else {
        return false;
    }
}


//User Adding/Registering function with conditions
function AddUser(user, balance = 0) {
    let names = ScanUsers();

    if (names.includes(user.toLowerCase()) || names.includes(user.capitalize())) {
        console.log("User Already Exists");
    }
    else {
        if (validateName(user) === true && balance >= 0) {
            let userObj = new User(user, balance);
            let UserObjToStr = JSON.stringify(userObj);
            let strToObj = JSON.parse(UserObjToStr);
            UsersArr.push(strToObj);
        }
        else {
            console.log("A User's name can't contain a number and initial balance can't be negative !");
        }
    }

}

//contains string.uppercase, lowercase, capitalize
//Function for checking names of users
function ScanUsers() {
    let namesArr = [];

    for (i = 0; i < UsersArr.length; i++) {
        namesArr.push(UsersArr[i].user)
    }

    return namesArr;
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

    alert("Loading 5 Initial Data into Local Storage and Registered Users Complete !");
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


//DOM click Events

//On-click Events template
/* <buttonName>.addEventListener(
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