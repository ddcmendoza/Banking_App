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
class User{
    constructor(user, balance = 0, obj = null){
        if(obj === null){
            this.user = user;
            this.balance = balance;
        }
        else{
            this.user = obj.user;
            this.balance = obj.balance;
        }

    }
}

//Initial Users Adding/Registering function
function AddInitialUser(user, balance) {
    let initUser = new User(user, balance);
    InitUserArr.push(initUser);
}

//Check if user's name being added has a number
function validateName(str) {
    var firstChar = str[0];
    if (firstChar >= '0' && firstChar <= '9') {
        return false;
    } else {
        return true;
    }
}

//Check if user's name being added exists.
function checkSimilarExists(user) {
    let names = ScanUsers();

    if (names.includes(user.toLowerCase()) || names.includes(user.capitalize())) {
        // return names.indexOf(user.capitalize());
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
            //UsersArr.push(new User('',1,strToObj)); or alternatively we can use Object.assign(new User, {obj}); so we can set them as User Objects instead of generic objects
            UsersArr.push(strToObj);
            return 0;
        }
        else {
            console.log("A User's name can't contain a number and initial balance can't be negative !");
            return "invalid";
//Get index of entered user name
function getIndexOfEnteredName(user) {
    let names = ScanUsers();

    if (names.includes(user.toLowerCase()) || names.includes(user.capitalize())) {
        return names.indexOf(user.capitalize());
    }
    else {
        return false;
    }
}

//User Adding/Registering function with conditions
function create_user(user, balance = 0) {
    if (checkSimilarExists(user) === true) {
        return "User Already Exists";
    }
    else {
        if (validateName(user) === true) {
            if (balance >= 0) {
                let capName = user.capitalize();
                let userObj = new User(capName, balance);
                let UserObjToStr = JSON.stringify(userObj);
                let strToObj = JSON.parse(UserObjToStr);
                UsersArr.push(strToObj);
            }
            else {
                return "Initial balance can't be negative, Please Leave it blank to initialize a balance of 0 !";
            }
        }
        else {
            return "Sorry, a User's name can't contain a number !";
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

function get_balance(user) {
    if (checkSimilarExists(user) === true) {
        return "User: " + user.capitalize() + "\nBalance: ₱" + UsersArr[getIndexOfEnteredName(user)].balance;
    }
    else {
        return "This User Does not exist..";
    }
}

function list_users() {
    console.log("Registered Users \n");

    if (UsersArr.length != 0) {
        /*  for (i = 0; i < UsersArr.length; i++) {
             return "User: '" + UsersArr[i].user + "'  Balance: " + UsersArr[i].balance;
         } */
        let result = '';
        for (let i in UsersArr) {
            result += "User: " + UsersArr[i].user + "  Balance:  ₱" + UsersArr[i].balance + "\n";
        }
        return result;
    }
    else {
        return ("There are no users registered currently...");
    }

}

//DOM click Events

//On-click Events template
/* <buttonName>.addEventListener(
    'click',
    function () {
    }
); */

if(ADD !== null){
    ADD.addEventListener(
        'click',
        function () {
            let name = prompt("Name of Account:");
            let balance = prompt("Initial Balance:");
            while(isNaN(balance) && balance !== ""){
                balance = prompt("Please enter a valid number");
            }
            balance = (balance === "")? 0:parseInt(balance);
            res = create_user(name,balance);
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
    );
}

if(InitialDataBtn !== null){
    InitialDataBtn.addEventListener(
        'click',
        function () {
            loadInitialData();
        }
    );
}
