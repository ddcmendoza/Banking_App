/* Test JS
alert("Start pushing"); */
// DOM Variables
let InitialDataBtn = document.querySelector("#loadDataBtn");
let clearLocalBtn = document.querySelector("#clearLocal");
let hoverHere = document.querySelector("#hover-here");


//Initial and Registered Users Arrays
let InitUserArr = [];
let UsersArr = [];

//Users Object
let Users = {
    "registeredUsers": UsersArr
}

//DOM click Events


//On-click Events template
/* <buttonName>.addEventListener(
    'click',
    function () {
    }
); */

if (InitialDataBtn !== null) {
    InitialDataBtn.addEventListener(
        'click',
        function () {
            loadInitialData();
        }
    );
}

if (hoverHere !== null) {
    hoverHere.addEventListener(
        'mouseover',
        function () {
            InitialDataBtn.style.display = 'block';
            clearLocalBtn.style.display = 'block';
            setTimeout(function() {
                InitialDataBtn.style.display = 'none';
            clearLocalBtn.style.display = 'none';
              }, 1000);
        }
    ,false);
}


if (clearLocalBtn !== null) {
    clearLocalBtn.addEventListener(
        'click',
        function () {
            window.localStorage.clear();
            window.localStorage.setItem('history',JSON.stringify({'transactions':[]}));
            alert("Local Storage cleared!");
        }
    );
}

//Users Object Constructor
class User {
    constructor(user, balance = 0, obj = null) {
        if (obj === null) {
            this.user = user;
            this.balance = balance;
        }
        else {
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

    alert("Registering 5 Initial Users into Local Storage Complete !");
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
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
        return "There are no users registered currently...";
    }
}