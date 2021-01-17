/* Test JS
alert("Start pushing"); */

// DOM Variables
let InitialDataBtn = document.querySelector("#loadDataBtn");


const ADD = document.getElementById('add');
const DEPOSIT = document.getElementById('deposit');
const WITHDRAW = document.getElementById('withdraw');

const ADDS = document.getElementById('batch-add');
const DEPOSITS = document.getElementById('batch-deposit');
const WITHDRAWS = document.getElementById('batch-withdraw');

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
function addUser(user, balance = 0) {
    let names = ScanUsers();

    if (names.includes(user.toLowerCase()) || names.includes(user.capitalize())) {
        console.log("User Already Exists");
        return "exist";
    }
    else {
        if (validateName(user) === true && balance >= 0) {
            let userObj = new User(user, balance);
            let UserObjToStr = JSON.stringify(userObj);
            let strToObj = JSON.parse(UserObjToStr);
            UsersArr.push(strToObj);
            return 0;
        }
        else {
            console.log("A User's name can't contain a number and initial balance can't be negative !");
            return "invalid";
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

ADD.addEventListener(
    'click',
    function () {
        let name = prompt("Name of Account:");
        let balance = prompt("Initial Balance:");
        while(isNaN(balance) && balance !== ""){
            balance = prompt("Please enter a valid number");
        }
        balance = (balance === "")? 0:parseInt(balance);
        res = addUser(name,balance);
        if (res === 0){
            alert("Added User Successfully!");
        }
        else if(res === "exist")
        {
            alert("User already exists!");
        }
        else if(res === "invalid"){
            alert("A User's name can't contain a number and initial balance can't be negative !");
        }
    }
    
)

InitialDataBtn.addEventListener(
    'click',
    function () {
        loadInitialData();
    }
);