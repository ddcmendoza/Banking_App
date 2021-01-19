/*
TO DO:
Repair Implementation so history will not be display here or will not be accounted for.
n => n-1 for key
[done]
*/

const ADD = document.getElementById('add');
const ADDS = document.getElementById('batch-add');

const ADDCONTAINER = document.getElementsByClassName('add-container');
const ADDSCONTAINER = document.getElementsByClassName('adds-container')[0];

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let users = [];

for (let i = 0; i < window.localStorage.length-1; i++) {
    let obj = JSON.parse(localStorage[i]);
    users.push(obj.user);
}
console.log(users);

//Add capitalize method into String Object prototype
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

function isIn(user, users) {
    for (let i = 0; i < users.length; i++) {
        if (user.capitalize() === users[i].capitalize()) {
            return true;
        }
    }
    return false;
}


ADD.addEventListener(
    'click',
    () => {
        ADDCONTAINER[0].style.display = 'inherit';

        ADD.style.display = 'none';

        ADDS.style.display = 'none';

        let submit = ADDCONTAINER[0].lastElementChild;

        submit.addEventListener('click',
            () => {
                // insert code for pushing to local storage
                let names = document.getElementsByClassName('name');
                let balances = document.getElementsByClassName('balance');
                let user = names[0].value.capitalize();

                if (user === '' || isIn(user[0], NUMS)) {
                    alert("Name can't be empty or start with a number");
                    location.reload();
                    return "Invalid Name and/or User Already Exists...";
                }

                if (isIn(user, users)) {
                    alert("User Already Exists...");
                    location.reload();
                    return "User Already Exists...";
                }

                //if balance field is empty, value is 0 , else it's entered value.
                let balance = (balances[0].value === "") ? 0 : parseFloat(balances[0].value);
                if (balance < 0) {
                    alert("Initial balance can't be negative, Please Leave it blank to initialize a balance of 0 !");
                    location.reload();
                    return "Initial balance can't be negative, Please Leave it blank to initialize a balance of 0 !";
                }

                let obj = {
                    "user": user,
                    "balance": balance
                }

                obj = JSON.stringify(obj);
                let n = window.localStorage.length-1;
                localStorage.setItem(n, obj);

                location.reload();
            });
    }
);


ADDS.addEventListener(
    'click',
    () => {
        let submitAllContainer = document.createElement('div');
        let submitAll = document.createElement('button');
        let submit = document.getElementsByClassName('addusers');

        //Ask how many users are to be added at once
        let num = prompt("Number of users to be added:");

        while (num <= 0 || isNaN(parseInt(num))) {
            num = prompt("Must be a number and greater than 0");
        }

        for (let i = 0; i < num - 1; i++) {
            let cln = ADDCONTAINER[0].cloneNode(true);
            ADDSCONTAINER.appendChild(cln);
        }

        for (let i = 0; i < num; i++) {
            ADDCONTAINER[i].style.display = 'inherit';
        }

        for (let i = 0; i < submit.length; i++) {
            submit[i].style.display = 'none';
        }

        submitAllContainer.id = 'submitAllContainer';

        submitAll.innerHTML = "Submit All";
        submitAll.id = 'submitAll';
        submitAllContainer.appendChild(submitAll);
        ADDSCONTAINER.appendChild(submitAllContainer);
        ADD.style.display = 'none';
        ADDS.style.display = 'none';

        submitAll.addEventListener('click',
            () => {
                let names = document.getElementsByClassName('name');
                let balances = document.getElementsByClassName('balance');
                let errors = "Errors";
                // code for pushing to local storage
                for (let i = 0; i < names.length; i++) {

                    let user = names[i].value.capitalize();
                    if (user === '' || isIn(user[0], NUMS)) {
                        errors += "\n Entry for '" + user + "' : Name Can't be Empty or start with number";
                        continue;
                    }
                    if (isIn(user, users)) {
                        errors += "\n Entry for '" + user + "' : User Already Exists...";
                        continue;
                    }

                    let balance = (balances[i].value === "") ? 0 : parseFloat(balances[i].value);
                    if (balance < 0) {
                        errors += "\n Entry for '" + user + "' : Balance Can't be negative, Leave blank for 0";
                        continue;
                    }
                    let obj = {
                        "user": user,
                        "balance": balance
                    }
                    obj = JSON.stringify(obj);
                    let n = window.localStorage.length-1;
                    localStorage.setItem(n, obj);

                }
                alert(errors);
                location.reload();
            });

    }
);
